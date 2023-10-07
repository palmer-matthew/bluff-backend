class Game {

    constructor(maxRounds, playersInRoom){
        this.players = playersInRoom;
        this.activePlayers = this.players.slice(0);
        this.eliminatedPlayers = [];
        this.maxRounds = maxRounds;
        this.currentRound = 1;
        this.currentTurn = 1;
        this.currentPlayerTurn = 0;
        this.gamePot = 0;
    }

    get players(){
        return this.players;
    }

    get currentTurn(){
        return this.currentTurn;
    }

    get currentRound(){
        return this.currentRound;
    }

    set players(players){
        this.players = players
    }

    set currentRound(currentRound){
        this.currentRound = currentRound;
    }

    set currentTurn(currentTurn){
        this.currentTurn = currentTurn;
    }

    getCurrentPlayerTurn(){
        return this.currentPlayerTurn;
    }

    
    areThereMorePlayers(){
        return this.currentPlayerTurn() < this.players.length;
    }

    changeToNextPlayerTurn(){
        if(!this.areThereMorePlayers()){
            this.currentPlayerTurn += 1;
            return;
        }
        this.currentPlayerTurn = 0;
    }

    makePlayerFold(playerUsername){
        this.activePlayers = this.activePlayers.filter((value) => value != playerUsername);
        this.eliminatedPlayers.push(playerUsername);
    }

    hasPlayerFolded(playerUsername){
        return this.eliminatedPlayers.includes(playerUsername);
    }

    resetPlayerStatusForNewRound(){
        this.activePlayers = this.players.slice(0);
        this.eliminatedPlayers = [];
    }

    run(){
        //
    }
}