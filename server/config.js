//port
process.env.PORT = process.env.PORT || 3000; 

// Environment
process.env.NODE_ENV = process.env.NODE_ENV || 'dev'; //process.env.NODE_ENV (create variable heroku)

//DB
if(process.env.NODE_ENV === 'dev') {
    process.env.urlDB = 'mongodb://localhost:27017/comandas'; //DB LOCAL
} else {
    process.env.urlDB = '?'; //DB MONGO ATLAS
}

