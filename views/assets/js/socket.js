const {io} = require('../../../server/server');

io.emit('takerOrder', {
    message: 'mensaje de prueba',
    user: 'backend'
});