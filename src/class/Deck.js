require('./Card.js');

class Deck {
    constructor(){
        this.hiddenCards = this.generateCardDeck();
        this.visibleCards = this.generateCardDeck();
    }

    generateCardDeck(){
        var deck = [];
        for(var i = 0; i < 10; i++){
            deck.push(new Card(i+1));
        }
        return deck;
    }

    findCardInDeck(cardValue, isHiddenDeck){
        if(isHiddenDeck){
            return this.hiddenCards.find((card) => card.value == cardValue);
        }
        return this.visibleCards.find((card) => card.value == cardValue);
    }

    markCardfromHiddenDeckAsUsed(cardValue){
        const hiddenCard = this.findCardInDeck(cardValue, true);
        hiddenCard.markAsUsed();
    }

    markCardfromVisibleDeckAsUsed(cardValue){
        const visibleCard = this.findCardInDeck(cardValue, false);
        visibleCard.markAsUsed(); 
    }
}