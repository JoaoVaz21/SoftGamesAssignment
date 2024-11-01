import { Application, Container,Text } from 'pixi.js';
import { MainMenu } from './MainMenu';
import { AceOfShadowsProject } from './Projects/AceOfShadowsProject';
import { MagicWordsProject } from './Projects/MagicWordsProject';
import { PhoenixFLameProject } from './Projects/PhoenixFlameProject';
import { IProject } from './Projects/IProject';
import { Group } from 'tweedle.js';

const app = new Application({
    width: 960 ,
    height: 600,
    resolution: window.devicePixelRatio || 1,
    autoDensity: true,
    backgroundColor: 0x000000,
    resizeTo: window,  
});
let currentScene: IProject;
document.body.appendChild(app.view as HTMLCanvasElement);
const rootContainer = new Container();
app.stage.addChild(rootContainer);
const tweenLoop = () => {
    Group.shared.update();
    requestAnimationFrame(tweenLoop);
}
tweenLoop();
let projectNames = ["Ace of Shadows", "Magic Words", "Phoenix Flame"];
const mainMenu = new MainMenu(handleSceneSwitch, projectNames);
let backFunction = ()=>{loadScene(mainMenu)};
const projectScenes: Record<string, Container> = {
    "Ace of Shadows": new AceOfShadowsProject(backFunction),
    "Magic Words": new MagicWordsProject(backFunction),
    "Phoenix Flame": new PhoenixFLameProject(app,backFunction),
};
loadScene(mainMenu);

function handleSceneSwitch(sceneName: string) {
    const newScene = projectScenes[sceneName];
    if (newScene) {
        loadScene(newScene);
    }
}
function resizeApp() {
    const scaleX = window.innerWidth / app.renderer.width;
    const scaleY = window.innerHeight / app.renderer.height;
    const scale = Math.min(scaleX, scaleY);

    app.stage.scale.set(scale);
    app.renderer.resize(window.innerWidth, window.innerHeight);
}
window.addEventListener('resize', resizeApp);
resizeApp();  


function loadScene(scene: Container) {
    if (currentScene) {
        currentScene.stop();
        rootContainer.removeChildren();
    }

    currentScene = scene as unknown as IProject;
    currentScene.start();
    rootContainer.addChild(scene);  
}

const fpsText = new Text('FPS: 0', {
    fill: 'gray',
    fontSize: 14,
    fontFamily: 'Arial',
});
fpsText.position.set(10, 10); // Position in the top-left corner
app.stage.addChild(fpsText);

// Variables to calculate FPS
let frameCount = 0;
let lastTime = performance.now();

app.ticker.add(() => {
    frameCount++;
    const now = performance.now();
    const deltaTime = now - lastTime;

    if (deltaTime >= 1000) { // Update FPS every second
        const fps = Math.round((frameCount * 1000) / deltaTime);
        fpsText.text = `FPS: ${fps}`;
        
        // Reset counters
        frameCount = 0;
        lastTime = now;
    }
});
