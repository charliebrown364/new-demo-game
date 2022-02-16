class Game {
    constructor(clientSockets) {
        this.clientSockets = clientSockets;

        this.state = null;
    }

    start() {
        setInterval(() => {
            
            this.state = this.generateRandomGameState();

            for(let socketId in this.clientSockets) {
                let socket = this.clientSockets[socketId];

                socket.emit('gameState', { 
                    gameState: this.state
                });        
            }
        }, 50);
    }

    generateRandomGameState() {
        
        let board = {
            numRows: 3,
            numCols: 3
        };

        let gameState = {
            board
        };

        return gameState;
    }

}

module.exports = Game;