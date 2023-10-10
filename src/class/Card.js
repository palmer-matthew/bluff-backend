class Card {
    constructor(value){
        this.value = value;
        this.isUsed = false;
    }

    get value(){
        return this.value;
    }

    markAsUsed(){
        this.isUsed = true;
    }

    hasBeenUsed(){
        return this.isUsed;
    }
}