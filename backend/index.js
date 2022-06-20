import mongoose from 'mongoose';
import app from "./server.js";
import './models/index.js';
import './utils/global.js';

const { MONGO_USER, MONGO_PWD, MONGO_CLUSTER, MONGO_DBNAME } = process.env;

mongoose.connect(
    `mongodb+srv://${MONGO_USER}:${MONGO_PWD}@${MONGO_CLUSTER}/${MONGO_DBNAME}?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true }
)
  
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error'));
db.once('open', async () => {
    const PORT = process.env.PORT || 4000;
    app.listen(PORT);
    
    console.log('Listening on ' + `localhost:${PORT}`);
})