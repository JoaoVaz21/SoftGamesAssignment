import { Container, Sprite, Text, TextStyle, Texture } from 'pixi.js';
import { IProject } from './IProject';
import { BackButton } from './BackButton';

export enum Configurations {
    Text,
    Image,
    TextText,
    TextImage,
    ImageText,
    TextImageText,
}

export class MagicWordsProject extends Container implements IProject {
    private texts: string[] = [
        "test!",
        "Joao Vaz",
        "SOFTGAMES",
        "PIXI",
        "Just a random text",
        "Games are great",
    ];

    private imageUrls: string[] = [
        '/assets/MagicWordsProject/Cat1.png', 
        '/assets/MagicWordsProject/Cat2.png',
        '/assets/MagicWordsProject/Cat3.png',
        '/assets/MagicWordsProject/Cat4.png',
    ];
    private intervalId: number = 0;
    private startX: number = 400;
    private startY:number = 350;
    private backFunction: ()=>void;
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

        const randomConfig = this.getRandomConfig();
        console.log("random config: " + randomConfig);
        switch (randomConfig) {
            case Configurations.Image:
                this.displayImageConfiguration();
                break;
            case Configurations.Text:
                this.displayTextConfiguration();
                break;
            case Configurations.ImageText:
                this.displayImageTextConfiguration();
                break;
            case Configurations.TextImage:
                this.displayTextImageConfiguration();
                break;
            case Configurations.TextText:
                this.displayTextTextConfiguration();
                break;
            case Configurations.TextImageText:
                this.displayTextImageTextConfiguration();
                break;
        }
    }

    private displayImageConfiguration() {
        const randomImages = this.getRandomImages(1); 
        const imageTexture = Texture.from(new URL(randomImages[0], import.meta.url).href); 
        const imageSprite = new Sprite(imageTexture);
        imageSprite.width = 50; 
        imageSprite.height = 50; 
        imageSprite.x = this.startX;
        imageSprite.y = this.startY; 
        this.addChild(imageSprite);
    }

    private displayTextConfiguration() {
        const randomText = this.getRandomText();
        const fontSize = this.getRandomFontSize();
        const textStyle = new TextStyle({
            fontSize: fontSize,
            fill: '#FFFFFF', 
        });
        const textDisplay = new Text(randomText, textStyle);
        textDisplay.x = this.startX; 
        textDisplay.y = this.startY; 
        this.addChild(textDisplay);
    }
    private displayImageTextConfiguration(){
        const randomImages = this.getRandomImages(1);
        const imageTexture = Texture.from(new URL(randomImages[0], import.meta.url).href); 
        const imageSprite = new Sprite(imageTexture);
        imageSprite.width = 50; 
        imageSprite.height = 50; 
        imageSprite.x = this.startX;
        imageSprite.y = this.startY; 
        this.addChild(imageSprite);

        const randomText = this.getRandomText();
        const fontSize = this.getRandomFontSize();
        const textStyle = new TextStyle({
            fontSize: fontSize,
            fill: '#FFFFFF', 
        });
        const textDisplay = new Text(randomText, textStyle);
        textDisplay.x = this.startX + imageSprite.height; 
        textDisplay.y = this.startY; 
        this.addChild(textDisplay);
    }
    private displayTextImageConfiguration(){
        const randomText = this.getRandomText();
        const fontSize = this.getRandomFontSize();
        const textStyle = new TextStyle({
            fontSize: fontSize,
            fill: '#FFFFFF', 
        });
        const textDisplay = new Text(randomText, textStyle);
        textDisplay.x = this.startX; 
        textDisplay.y = this.startY; 
        this.addChild(textDisplay);

        const randomImages = this.getRandomImages(1); 
        const imageTexture = Texture.from(new URL(randomImages[0], import.meta.url).href); 
        const imageSprite = new Sprite(imageTexture);
        imageSprite.width = 50; 
        imageSprite.height = 50; 
        imageSprite.x = textDisplay.x + textDisplay.width;
        imageSprite.y = this.startY; 
        this.addChild(imageSprite);

    }

    private displayTextTextConfiguration() {
        const randomTextLeft = this.getRandomText();
        const fontSizeLeft = this.getRandomFontSize();
        const textStyleLeft = new TextStyle({
            fontSize: fontSizeLeft,
            fill: '#FFFFFF', 
        });

        const randomTextRight = this.getRandomText();
        const fontSizeRight = this.getRandomFontSize();
        const textStyleRight = new TextStyle({
            fontSize: fontSizeRight,
            fill: '#FFFFFF', 
        });
        const textDisplayRight = new Text(randomTextRight, textStyleRight);
        const textDisplayLeft = new Text(randomTextLeft, textStyleLeft);
        textDisplayLeft.x = this.startX;
        textDisplayRight.x = this.startX + textDisplayLeft.width;
        textDisplayLeft.y = this.startY;
        textDisplayRight.y = this.startY;

        this.addChild(textDisplayRight);
        this.addChild(textDisplayLeft);

    }
    private displayTextImageTextConfiguration() {
        const randomTextLeft = this.getRandomText();
        const fontSizeLeft = this.getRandomFontSize();
        const textStyleLeft = new TextStyle({
            fontSize: fontSizeLeft,
            fill: '#FFFFFF', 
        });

        const randomImages = this.getRandomImages(1); 
        const imageTexture = Texture.from(new URL(randomImages[0], import.meta.url).href); 
        const imageSprite = new Sprite(imageTexture);
        imageSprite.width = 50; 
        imageSprite.height = 50; 


        const randomTextRight = this.getRandomText();
        const fontSizeRight = this.getRandomFontSize();
        const textStyleRight = new TextStyle({
            fontSize: fontSizeRight,
            fill: '#FFFFFF', 
        });
        const textDisplayRight = new Text(randomTextRight, textStyleRight);
        const textDisplayLeft = new Text(randomTextLeft, textStyleLeft);
        textDisplayLeft.x = this.startX;
        imageSprite.x =this.startX + textDisplayLeft.width;
        textDisplayRight.x = this.startX + textDisplayLeft.width + imageSprite.width;
        textDisplayLeft.y = this.startY;
        textDisplayRight.y = this.startY;
        imageSprite.y = this.startY;

        this.addChild(textDisplayRight);
        this.addChild(imageSprite);
        this.addChild(textDisplayLeft);

    }


    private getRandomText(): string {
        const randomIndex = Math.floor(Math.random() * this.texts.length);
        return this.texts[randomIndex];
    }
    private getRandomConfig(): Configurations {
        const configs = Object.keys(Configurations);
        const randomIndex = Math.floor(Math.random() * configs.length/2);
        return randomIndex;
    }

    private getRandomImages(count: number): string[] {
        const selectedImages: string[] = [];
        for (let i = 0; i < count; i++) {
            const randomIndex = Math.floor(Math.random() * this.imageUrls.length);
            selectedImages.push(this.imageUrls[randomIndex]);
        }
        return selectedImages;
    }

    private getRandomFontSize(): number {
        return Math.floor(Math.random() * (48 - 20 + 1)) + 20; // Random font size between 20 and 48
    }
}