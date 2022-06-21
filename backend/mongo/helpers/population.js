export const prePopulate = (property) => {
    return function(next) {
        this.populate(property);
        next();
    }
}