const app = require('./app');
const port = 3000;
const mongoose = require('mongoose');

//MONGOOSE CONNECTION
//Handling Errors during initial connection
mongoose.connect('mongodb+srv://krishnaj:YkOedaTz3y4ddPiq@cluster0.gk3wd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
    .then(() => {
        console.log("MONGO CONNECTION OPEN!!!");
        app.listen(port, () => {
            console.log(`Serving at Port ${port}`);
        });
    })
    .catch((err) => {
        console.log("MONGO CONNECTION ERROR RECEIVED!!!");
        console.log(err);
    })
