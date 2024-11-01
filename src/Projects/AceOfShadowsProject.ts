import { Container, Sprite, Text, Texture, Ticker } from 'pixi.js';
import { IProject } from './IProject';
import { BackButton } from './BackButton';
import { Easing, EasingFunction, Tween } from 'tweedle.js';

interface Vector2{
    x:number,
    y:number,
} 
export class AceOfShadowsProject extends Container implements IProject {
    private cards: Sprite[] = [];
    private topCardIndex: number = 0;
    private stacks: Vector2[] = [];
    private cardsInEachStack: number[] = [];
    private intervalId: number = 0;
    private numberOfCards: number = 144;
    private offsetInStack: number = 10;
    private backFunction: ()=>void;
    constructor(goToMainMenu: () => void) {
        super();
        this.backFunction = goToMainMenu;
    }
    start(): void {
        this.setupCards();
        this.setupStacks();
        const backButton = new BackButton(this.backFunction);
        this.addChild(backButton);
        this.startCardMovement();
    }
    stop(): void {
        this.cards = [];
        this.stacks = [];
        this.cardsInEachStack = [];
        clearInterval(this.intervalId);
        this.removeChildren();
    }
    private setupStacks(){
        this.stacks.push({x:300,y:100});
        this.stacks.push({x:450,y:100});
        this.stacks.push({x:600,y:100});
        this.stacks.push({x:750,y:100});
        this.stacks.push({x:300,y:250});
        this.stacks.push({x:450,y:250});
        this.stacks.push({x:600,y:250});
        this.stacks.push({x:750,y:250});
        this.stacks.push({x:300,y:400});
        this.stacks.push({x:450,y:400});
        this.stacks.push({x:600,y:400});
        this.stacks.push({x:750,y:400});
        for(let i = 0; i< this.stacks.length;i++){
            this.cardsInEachStack.push(0);
        }

    }
    private setupCards() {
        let startX = 100;
        let startY = 350;

        const cardTexture = Texture.from(new URL('/assets/AceOfShadows/Card.png', import.meta.url).href); 
        for (let i = 0; i < this.numberOfCards; i++) {
            const card = new Sprite(cardTexture);

            card.x = startX;
            card.y =  startY +i/this.offsetInStack;
            card.width = 70;
            card.height = 100; 
            this.addChild(card);
            this.cards.push(card);
        }
        //Top card index is the last card we added
        this.topCardIndex = this.numberOfCards-1;
    }

    private startCardMovement() {
        // Move the top card every second
       this.intervalId = setInterval(() => {
            this.moveTopCard();
        }, 1000);
    }

    private moveTopCard() {
        if (this.topCardIndex <= 0) {
            //animation finished, exit
            this.backFunction();
        }

        let topCard = this.cards[this.topCardIndex];
        const targetStackIndex = Math.floor(Math.random() * this.stacks.length); 
        topCard = this.addChild(topCard);
        // Calculate target position and offset
        const targetX = this.stacks[targetStackIndex].x;
        const targetY = this.stacks[targetStackIndex].y + this.cardsInEachStack[targetStackIndex]/this.offsetInStack;

        const animationDuration = 2000;
        new Tween(topCard).to({ x:targetX, y:targetY }, animationDuration).easing(Easing.Quadratic.Out).start(); 
        this.cardsInEachStack[targetStackIndex]++;
        this.topCardIndex--; 
    }
}