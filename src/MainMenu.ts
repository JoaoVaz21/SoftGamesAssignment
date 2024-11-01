import { Container, Text, Graphics } from 'pixi.js';
import { IProject } from './Projects/IProject';

export class MainMenu extends Container implements IProject {
    constructor(onButtonClick: (sceneName: string) => void, sceneNames : string[]) {
        super();
        let startY = 300;
        let startX = 480;
        sceneNames.forEach((title, index) => {
            const button = new Graphics();
            button.beginFill(0x666666); 
            button.drawRoundedRect(0, 0, 200, 50,30); 
            button.endFill();
            button.y = startY + index * 80;
            button.x = startX ;
            button.interactive = true; 

            const buttonText = new Text(title, { 
                fill: "#ffffff", 
                fontSize: 24 
            });
            buttonText.anchor.set(0.5); // Center the text
            buttonText.x = button.width / 2; // Center text horizontally
            buttonText.y = button.height / 2; // Center text vertically

            // Add text to the button
            button.addChild(buttonText);

            // Click event
            button.on("pointerdown", () => onButtonClick(title));
            button.on("mouseover", () => {
                button.tint = 0x999999; // Change color on hover
            });
            button.on("mouseout", () => {
                button.tint = 0x666666; // Revert color when not hovering
            });

            // Add the button to the container
            this.addChild(button);
        });
    }
    start(): void {
    }
    stop(): void {
    }
}
