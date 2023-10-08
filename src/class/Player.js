class Player {
    constructor(username){
        this.username = username;
        this.balance = 0;
        this.status = 'Active';
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

    doesPlayerHaveSufficentFunds(amount){
        return this.balance >= amount;
    }

    makeBet(amount){
        if(doesPlayerHaveSufficentFunds(amount)){
            this.balance -= amount;
        }
    }

    isFolded(){
        return this.status == 'Folded';
    }

    isActive(){
        return this.status == 'Active';
    }

}