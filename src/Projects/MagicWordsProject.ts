import { Container, Sprite, Text, TextStyle, Texture } from 'pixi.js';
import { IProject } from './IProject';
import { BackButton } from './BackButton';



export class MagicWordsProject extends Container implements IProject {
    private texts: string[] = [
        "Yes, cats are great too",
        "Joao Vaz",
        "SOFTGAMES",
        "PIXI",
        "Just a random text",
        "Games are great",
    ];
    private configurations: string[] = [
        'T',
        'I',
        'TI',
        'IT',
        'TIT',
        'ITI',
        'IIT',
        'TTI',
        'IITI',
        'ITII'
    ]
    private intervalId: number = 0;
    private startX: number = 400;
    private startY: number = 350;
    private offset: number = 20;
    private backFunction: () => void;
    constructor(goToMainMenu: () => void) {
        super();

        this.backFunction = goToMainMenu;

    }
    start(): void {
        const backButton = new BackButton(this.backFunction);
        this.addChild(backButton);
        this.startMixing();
    }
    stop(): void {
        clearInterval(this.intervalId);
        this.removeChildren();
    }


    private startMixing() {
        setInterval(() => {
            this.displayRandomTextAndImages();
            const backButton = new BackButton(this.backFunction);
            this.addChild(backButton);
        }, 2000);
    }

    private displayRandomTextAndImages() {
        // Clear previous content
        this.removeChildren();

        let currentX = this.startX;
        let currentY = this.startY;
        //Split config by letter
        let randomConfig = this.getRandomConfig().split('');

        randomConfig.forEach(letter => {
            if (letter == "I") {
                let image = this.displayImageConfiguration(currentX, currentY);
                currentX += image.width + this.offset;
            }
            if (letter == "T") {
                let text = this.displayTextConfiguration(currentX, currentY);
                currentX += text.width + this.offset;
            }
        });
    }

    private displayImageConfiguration(x: number, y: number): Sprite {
        const imageTexture = Texture.from(this.getRandomImage());
        const imageSprite = new Sprite(imageTexture);
        imageSprite.width = 50;
        imageSprite.height = 50;
        imageSprite.x = x;
        imageSprite.y = y;
        this.addChild(imageSprite);
        return imageSprite
    }

    private displayTextConfiguration(x: number, y: number): Text {
        const randomText = this.getRandomText();
        const fontSize = this.getRandomFontSize();
        const textStyle = new TextStyle({
            fontSize: fontSize,
            fill: '#FFFFFF',
        });
        const textDisplay = new Text(randomText, textStyle);
        textDisplay.x = x;
        textDisplay.y = y;
        this.addChild(textDisplay);
        return textDisplay;
    }

    private getRandomText(): string {
        const randomIndex = Math.floor(Math.random() * this.texts.length);
        return this.texts[randomIndex];
    }

    private getRandomConfig(): string {
        const randomIndex = Math.floor(Math.random() * this.configurations.length);
        return this.configurations[randomIndex];
    }

    private getRandomImage(): string {
        const randomIndex = Math.floor(Math.random() * 4);
        switch (randomIndex) {
            case 0:
                return new URL('/assets/MagicWordsProject/Cat1.png', import.meta.url).href;
            case 1:
                return new URL('/assets/MagicWordsProject/Cat2.png', import.meta.url).href;
            case 2:
                return new URL('/assets/MagicWordsProject/Cat3.png', import.meta.url).href;
            case 3:
                return new URL('/assets/MagicWordsProject/Cat4.png', import.meta.url).href

            default:
                return "";
        }

    }

    private getRandomFontSize(): number {
        return Math.floor(Math.random() * (48 - 20 + 1)) + 20; // Random font size between 20 and 48
    }
}