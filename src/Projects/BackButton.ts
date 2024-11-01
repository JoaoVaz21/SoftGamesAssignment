import { Container, Text, TextStyle } from 'pixi.js';

export class BackButton extends Container {
    constructor(onBack: () => void) {
        super();

        // Set up the button text style
        const textStyle = new TextStyle({
            fontSize: 24,
            fill: '#ffffff',
            fontWeight: 'bold',
        });

        const buttonText = new Text("Back to Main Menu", textStyle);
        buttonText.interactive = true;
        buttonText.anchor.set(0.5);
        buttonText.position.set(580, 600); // Set position as needed

        // Add click event
        buttonText.on('pointerdown', () => {
            onBack();
        });

        this.addChild(buttonText);
    }
}
