
// interface Game {
//     id : number;
//     name: string;
//     player1: WebSocket;
//     player2: WebSocket;

// }

export class GameManager() {
    private games = Game[];
    private pendingUser: WebSocket;
    private users: WebSocket[];

    constructor() {
        this.games = [];
    }

    addUser(socket: WebSocket){
        this.users.push(socket);
        this.addHandler()
    }

    removeUser(socket: WebSocket){
        this.users = this.users.filter(user => user !== socket);
    }

    private addHandler(){

    }

}