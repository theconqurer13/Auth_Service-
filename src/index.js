const express = require('express');
const bodyParser = require('body-parser');
const {PORT} = require('./config/server-config')
const apiRoutes = require('./routes/index')
const app = express();
const  db = require('./models/index');
const prepareAndStartServer = () => {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended:true}));

    app.use('/api',apiRoutes);

    app.listen(PORT,()=>{
        console.log(`Server started on port : ${PORT}`);
        if(process.env.DB_SYNC){
            db.sequelize.sync({alter:true});
        }
    })
   

}

prepareAndStartServer(); 