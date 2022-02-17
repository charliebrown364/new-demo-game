class Game {
    constructor(clientSockets) {
        this.clientSockets = clientSockets;
    }

    start() {
        setInterval(() => {
            for(let socketId in this.clientSockets) {
                this.clientSockets[socketId].emit('update game', {});   
            }
        }, 50);
    }

}

module.exports = Game;