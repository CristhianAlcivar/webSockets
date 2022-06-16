const socketController = (socket) => {
    console.log('Cliente desconectado',socket.id);
    socket.on('disconnect', () =>{
        console.log('Cliente desconectado',socket.id);
    });

    socket.on('message', ( payload,callback ) =>{
        const id = 12454564;
        callback(id);

        socket.broadcast.emit('message', payload);
    });
}

module.exports = {
    socketController
};