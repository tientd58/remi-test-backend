const socketio = require('socket.io');

let instance = null;

class SocketService {
  static Initialize(server) {
    instance = socketio(server, {
      cors: {
        origin: process.env.FRONTEND_URL
      }
    });
    instance.on('connection', socket => {
      console.log('connected');
    });

    return instance;
  }

  static getInstance() {
    return instance;
  }

  // emiter(event, body) {
  //   if(body)
  //     this.io.emit(event, body);
  // }
}

module.exports = SocketService;