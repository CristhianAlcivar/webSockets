const lblDesktop = document.querySelector('h1');
const btnAttend = document.querySelector('button');
const lblTicket = document.querySelector('small');
const divAlert = document.querySelector('.alert');
const lblEarring = document.querySelector('#lblEarring');

const searchParams = new URLSearchParams(window.location.search);

if(!searchParams.has('desktop')){
    window.location = 'index.html';
    throw new Error('the desktop is requerie');
}

const desktop = searchParams.get('desktop');
lblDesktop.innerText = desktop;

divAlert.style.display = 'none';

const socket = io();

socket.on('connect',()=>{
    //console.log('Conectado al servidor');
    btnAttend.disabled = false;
});
socket.on('disconnect',()=>{
    //console.log('Desconectado al servidor');
    btnAttend.disabled = true;
});
socket.on('ticket-earring',(earring)=>{
    if(earring===0){
        lblEarring.style.display= 'none';
    }else{
        lblEarring.style.display= '';
        divAlert.style.display = 'none';
        lblEarring.innerText = earring;
    }
});
btnAttend.addEventListener('click',()=>{

    socket.emit('attend-ticket',{desktop},({ok,ticket,msg})=>{
        if(!ok){
            lblTicket.innerText = 'Estan atendido todos los tickets.';
            return divAlert.style.display = '';
        }
        lblTicket.innerText = 'Ticket '+ticket.number;
    });
});