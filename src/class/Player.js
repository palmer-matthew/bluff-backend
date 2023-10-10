require('./Deck.js');

class Player {
    constructor(username){
        this.username = username;
        this.balance = 0;
        this.status = 'Active';
        this.playerDeck = new Deck();
    }

    get username(){
        this.username;
    }

    get balance(){
        return this.balance;
    }

    get status(){
        return this.status;
    }

    set balance(balance){
        this.balance = balance;
    }

    set status(status){
        this.status = status;
    }

    makeFolded(){
        this.status = 'Folded';
    }

    makeActive(){
        this.status = 'Active';
    }

    hasSufficentFunds(amount){
        return this.balance >= amount;
    }

    makeBet(amount){
        this.balance -= amount;
    }

    addWinnings(amount){
        this.balance += amount;
    }

    isFolded(){
        return this.status == 'Folded';
    }

    isActive(){
        return this.status == 'Active';
    }

    pickActiveCards(hiddenCardValue, visibleCardValue){
        this.deck.markCardfromHiddenDeckAsUsed(hiddenCardValue);
        this.deck.markCardfromVisibleDeckAsUsed(visibleCardValue);
    }

}