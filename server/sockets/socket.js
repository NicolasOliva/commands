const io = require('../server');

class Socket {

    sendOrder(order) {
        io.emit('sendOrder', {
            order
        });  
    };

}

module.exports = {
    Socket
}
