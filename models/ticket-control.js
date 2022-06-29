const path = require('path');
const fs = require('fs');

class Ticket {
    constructor(number,desktop){
        this.number = number;
        this.desktop = desktop;
    }
}

class TicketControl {
    constructor(){
        this.latest=0;
        this.today = new Date().getDate();
        this.tickets =[];
        this.latest4 = [];

        this.init();
    }
    get toJson(){
        return {
            latest: this.latest,
            today: this.today,
            tickets: this.tickets,
            latest4: this.latest4
        }
    }
    init(){
        const {latest, today, tickets, latest4} = require('../db/data.json');
        if(today === this.today ){
            this.tickets = tickets;
            this.latest = latest;
            this.latest4 = latest4;
        }else{
            //otro dia
            this.saveDB();
        }
    }
    saveDB(){
        const dbPath = path.join(__dirname,'../db/data.json');
        fs.writeFileSync(dbPath, JSON.stringify(this.toJson))
    }
    next(){
        this.latest += 1;
        const ticket = new Ticket(this.latest, null);
        this.tickets.push(ticket);

        this.saveDB;
        return 'Turno '+ticket.number;
    }
    attendTicket(desktop){
        if(this.tickets.length === 0){
            return null;
        }
        const ticket = this.tickets.shift();
        ticket.desktop = desktop;

        this.latest4.unshift(ticket);
        if(this.latest4.length>4){
            this.latest4.splice(-1,1)
        }
        this.saveDB();

        return ticket;
    }
}

module.exports = TicketControl;