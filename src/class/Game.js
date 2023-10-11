class Game {

    constructor(maxRounds, playersInRoom){
        this.players = playersInRoom;
        this.activePlayers = this.players;
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
        return this.getCurrentPlayerTurn() < this.players.length;
    }

    changeToNextPlayerTurn(){
        if(!this.areThereMorePlayers()){
            this.currentPlayerTurn += 1;
            return;
        }
        this.currentPlayerTurn = 0;
    }

    findActivePlayer(playerUsername){
        return this.activePlayers.find((value) => value.username == playerUsername);
    }

    makePlayerFold(playerUsername){
        const player = this.findActivePlayer(playerUsername);
        player.makeFolded();
    }

    resetPlayerStatusForNewRound(){
        for(var i = 0; i < this.activePlayers.length; i++){
            this.activePlayers[i].makeActive();
        }
    }

    isPlayerEligibleToBet(playerUsername, amount){
        const player = this.findActivePlayer(playerUsername);
        if(player.isFolded() || !player.hasSufficentFunds(amount)){
            return false;
        }
        return true;
    }


    addPlayerBetToPot(playerUsername, betAmount){
        const player = this.findActivePlayer(playerUsername);
        if(this.isPlayerEligibleToBet(playerUsername, betAmount)){
            player.makeBet(betAmount);
            this.gamePot += betAmount;
        }
    }

    addWinningstoPlayerBalance(playerUsername, winningAmount){
        const player = this.findActivePlayer(playerUsername);
        player.addWinnings(winningAmount);
    }

    resetGamePot(){
        this.gamePot = 0;
    }

    run(){
        //
    }
}