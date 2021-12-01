const IO = require('koa-socket-2');

const properties = require('../properties');

const io = new IO({
  ioOptions: {
    pingInterval: 5000,
    pingTimeout: 10000,
    ...(!properties.PROD && {cors: {}}),
  },
});

const bindWebSocket = (app) => {
  io.attach(app);

  io.on('connection', (socket, data) => {
    console.log('new client connected');
  });

  io.on('message', (ctx, data) => {
    // store session values for each connected client
    // ctx.socket['sessionData'] = data.someData;

    // emit event only to the connected client
    // io.to(ctx.socket.id).emit('event', data);

    // emit event to all the connected clients
    // io.broadcast.emit('event', data);

    // emit event to all connected clients, except the current one
    // ctx.socket.broadcast.emit('event', data);

    // join a room
    // ctx.socket.join(room);

    // leave a room
    // ctx.socket.leave(room);

    // emit event to all clients connected to a room, except the current one
    // ctx.socket.broadcast.to(room).emit('event', data);

    // emit event to all client connected to a room
    // io.to(room).emit('event', data);
  });

  io.on('disconnect', (ctx, data) => {
    // event triggered when the client disconnects
  });
};

module.exports = {
  bindWebSocket,
};
