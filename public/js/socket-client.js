const lblOnline = document.querySelector('#lblOnline');
const lblOffline = document.querySelector('#lblOffline');
const txtMessage = document.querySelector('#txtMessage');
const btnSend = document.querySelector('#btnSend');

const socket = io();

socket.on('connect',()=>{
    //console.log('Conectado al servidor');
    lblOffline.style.display = 'none';
    lblOnline.style.display = '';
});
socket.on('disconnect',()=>{
    //console.log('Desconectado al servidor');
    lblOnline.style.display = 'none';
    lblOffline.style.display = '';
});
socket.on('message',(payload)=>{
    console.log(payload);
});
btnSend.addEventListener('click',()=>{
    const message = txtMessage.value;
    const payload = {
        message,
        user: 'Juan',
        timestamp: new Date().getTime()
    }
    socket.emit('message',payload,(id)=>{
        console.log('Mensaje enviado con id: ',id);
    });
});