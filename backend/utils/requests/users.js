const createOrUpdate = async (parent, args, context, info) => {
    const currentUserId = context.userId;
            
    const { password } = args.user;
    const hashedPassword = bcrypt.hashSync(password, 12);
            
    delete args.user._id
            
    try {                
        const result = await User.find({ 
            $or: [
                { _id: currentUserId }
            ]    
        });
        
        if (result.length === 0) {
            const created = await User.create({
                ...args.user,
                ...(password && { password: hashedPassword })
            });
            
            const populated = await User.findById(created._id).populate([
                {
                    path: 'role',
                    populate: ['includes scopes']
                },
            ]);
            console.log({populated})
            return populated;
            
        } else {
            const updated = await User.findByIdAndUpdate(
                currentUserId, 
                {
                    ...args.user,
                    ...(password && { password: hashedPassword })
                }
            ).populate([
                'tribes pins',
                {
                    path: 'role',
                    populate: ['includes scopes']
                },
            ]);
            
            return updated;
        }
    } catch (error) {
        console.log(error)
        throw new Error(error);
    }
}