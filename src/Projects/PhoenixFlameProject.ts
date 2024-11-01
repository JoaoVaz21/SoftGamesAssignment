import { Application, Container, ParticleContainer, Text, Texture } from 'pixi.js';
import { IProject } from './IProject';
import { Emitter } from '@pixi/particle-emitter';
import { BackButton } from './BackButton';

export class PhoenixFLameProject extends Container implements IProject {
    private app: Application;
    private particleContainer: ParticleContainer;
    private emitter!: Emitter; // Use definite assignment assertion
    private backFunction: ()=>void;
    
    constructor(app: Application,goToMainMenu: () => void) {
        super();
        this.app = app;
        this.particleContainer = new ParticleContainer();
        this.addChild(this.particleContainer);
        this.setupEmitter();
        this.startTicker();
        this.backFunction = goToMainMenu;        
    }
    start(): void {
        this.emitter.emit = true;
        const backButton = new BackButton(this.backFunction);
        this.addChild(backButton);
    }
    stop(): void {
        this.stopEmitter();
    }

    private setupEmitter() {
        const config = {
            lifetime: {
                min: 0.01,
                max: 0.2
            },
            frequency: 0.01,
            emitterLifetime: 0,
            maxParticles: 10,
            addAtBack: false,
            pos: {
                x: 580,
                y: 400
            },
            behaviors: [
                {
                    type: "alpha",
                    config: {
                        alpha: {
                            list: [
                                {
                                    time: 0,
                                    value: 0.65
                                },
                                {
                                    time: 1,
                                    value: 0.1
                                }
                            ]
                        }
                    }
                },
                {
                    type: "moveSpeedStatic",
                    config: {
                        "min": 200,
                        "max": 500
                    }
                },
                {
                    type: "scale",
                    config: {
                        scale: {
                            list: [
                                {
                                    time: 0,
                                    value: 0.1
                                },
                                {
                                    time: 1,
                                    value: 0.2
                                }
                            ]
                        },
                        minMult: 1
                    }
                },
                {
                    type: "color",
                    config: {
                        color: {
                            list: [
                                {
                                    time: 0,
                                    value: "fff191"
                                },
                                {
                                    time: 1,
                                    value: "ff622c"
                                }
                            ]
                        }
                    }
                },
                {
                    type: "rotation",
                    config: {
                        accel: 0,
                        minSpeed: 50,
                        maxSpeed: 50,
                        minStart: 250,
                        maxStart: 255
                    }
                },
                {
                    type: "textureRandom",
                    config: {
                        textures: [
                            "assets/PhoenixFlameProject/Fire.png",
                            "assets/PhoenixFlameProject/Fire.png"
                        ]
                    }
                },
                {
                    type: "spawnShape",
                    config: {
                        type: "torus",
                        data: {
                            x: 0,
                            y: 0,
                            radius: 1,
                            innerRadius: 0,
                            affectRotation: false
                        }
                    }
                }
            ]
        }

        this.emitter = new Emitter(this.particleContainer, config);
    }

    private startTicker() {
        this.app.ticker.add((delta) => {
            if (this.emitter) {
                this.emitter.update(delta * 0.001);
            }
        });
    }

    public stopEmitter() {
        if (this.emitter) {
            this.emitter.emit = false;
        }
    }
}