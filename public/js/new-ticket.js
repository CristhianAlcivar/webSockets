const lblNewTicket = document.querySelector('#lblNewTicket');
const btnCreate =document.querySelector('button');


const socket = io();

socket.on('connect',()=>{
    //console.log('Conectado al servidor');
    btnCreate.disabled = false;
});
socket.on('disconnect',()=>{
    //console.log('Desconectado al servidor');
    btnCreate.disabled = true;
});
socket.on('latest-ticket',(latest)=>{
    lblNewTicket.innerText = 'Turno ' +latest;
});
btnCreate.addEventListener('click',()=>{
    
    socket.emit('next-ticket',null,(ticket)=>{
        lblNewTicket.innerText=ticket;
    });
});