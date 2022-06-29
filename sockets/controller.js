const TicketControl = require("../models/ticket-control");

const ticketControl = new TicketControl;

const socketController = (socket) => {

    socket.emit('latest-ticket', ticketControl.latest);
    socket.emit('status-current', ticketControl.latest4);
    socket.emit('ticket-earring', ticketControl.tickets.length);



    socket.on('next-ticket', ( payload,callback ) =>{
        const next = ticketControl.next();
        callback(next);
        socket.broadcast.emit('ticket-earring', ticketControl.tickets.length);
    });
    socket.on('attend-ticket',({desktop},callback)=>{
        if(!desktop){
            return callback({
                ok: false,
                msg: 'the desktop is requiere'
            })
        }
        const ticket = ticketControl.attendTicket(desktop);

        socket.broadcast.emit('status-current', ticketControl.latest4);
        socket.emit('ticket-earring', ticketControl.tickets.length);
        socket.broadcast.emit('ticket-earring', ticketControl.tickets.length);

        if(!ticket){
            callback({
                ok: false,
                msg: 'there is no pending tickets'
            })
        }else{
            callback({
                ok:true,
                ticket
            })
        }
    });

}

module.exports = {
    socketController
};