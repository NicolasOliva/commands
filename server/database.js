const mongoose = require('mongoose');

mongoose.connect(process.env.urlDB, {useNewUrlParser: true})
    .then(db => console.log(`Database is connected`))
    .catch(err => console.error(err));

    mongoose.set('useCreateIndex', true); // (for update of mongoose)