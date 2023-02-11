

const app = new PIXI.Application({ backgroundColor: '0xffffff' });
document.body.appendChild(app.view);

function createGame() {
    const containerGamer = new PIXI.Container();
    app.stage.addChild(containerGamer);

    app.renderer.resize(window.innerWidth, window.innerHeight);

    // ? SOUND EFFECT
    const sqek = PIXI.sound.Sound.from('./sound/sqek.mp3');
    sqek.volume = 0.1;
    const tada = PIXI.sound.Sound.from('./sound/tada.mp3');
    tada.volume = 0.1;

    let telaW = window.innerWidth;
    let telaH = window.innerHeight;
    const qnts = (telaW > 767 ? 5 : 2);
    let nivel = 1
    let placar = 0;
    let tempo = 30;

    function criandoBugs() {
        for (i = 0; i < qnts; i++) {
            console.log("Criando bichos")
            const bug = PIXI.Sprite.from('../img/bug_swat.png');
            bug.anchor.set(0.5);
            bug.x = app.screen.width - randomNumber(telaW);
            bug.y = app.screen.height - randomNumber(telaH);
            bug.width = 30;
            bug.height = 30;
            bug.interactive = true;
            bug.cursor = 'pointer';
            bug.on('pointerdown', () => {
                placar = placar + 1;
                if (placar % 10 === nivel) {
                    nivel = nivel + 1;
                }
                textPlacar.text = `Placar: ` + placar;
                containerGamer.removeChild(bug);
                sqek.play();
            })
            containerGamer.addChild(bug);
        }
    }
    criandoBugs();

    const textPlacar = new PIXI.Text(`Placar: ` + placar, {
        fontSize: telaW > 767 ? 30 : 20,
        fontFamily: 'Times New Roman'
    });
    textPlacar.anchor.set(0.5);
    textPlacar.x = app.screen.width / 2 - 100;
    textPlacar.y = app.screen.height / 2 - 225;
    containerGamer.addChild(textPlacar);

    const textTimer = new PIXI.Text(`Tempo: ` + tempo, {
        fontSize: telaW > 767 ? 30 : 20,
        fontFamily: 'Times New Roman'
    });
    textTimer.anchor.set(0.5);
    textTimer.x = app.screen.width / 2 + 100;
    textTimer.y = app.screen.height / 2 - 225;
    containerGamer.addChild(textTimer);

    const timerBug = setInterval(() => {
        console.log("Ta pegando")
        if (tempo <= 0) {
            tada.play();
            clearInterval(timerBug);
            containerGamer.destroy();

            const containerscore = new PIXI.Container();
            app.stage.addChild(containerscore);

            // const graphics = new PIXI.Graphics();
            // graphics.beginFill(0xc0c0c0);
            // graphics.lineStyle(2, 0x424242, 1);
            // graphics.drawRect(app.screen.width / 2 - 150, 50, 300, 300);
            // graphics.endFill();
            // containerscore.addChild(graphics);

            const bug = PIXI.Sprite.from('./img/bug_swat.png');
            bug.anchor.set(0.5);
            bug.width = 50;
            bug.height = 50;
            bug.x = app.screen.width / 2;
            bug.y = 100;
            containerscore.addChild(bug);

            const basicText = new PIXI.Text('Score', {
                fontFamily: 'Times New Roman'
            });
            basicText.anchor.set(0.5);
            basicText.x = app.screen.width / 2;
            basicText.y = 150;
            containerscore.addChild(basicText);

            const scoreText = new PIXI.Text(placar, {
                fontFamily: 'Times New Roman',
                fontSize: 40
            });
            scoreText.anchor.set(0.5);
            scoreText.x = app.screen.width / 2;
            scoreText.y = 200;
            containerscore.addChild(scoreText);

            const retryText = new PIXI.Text('Retry', {
                fontFamily: 'Times New Roman',
                fontSize: 36
            });
            retryText.interactive = true;
            retryText.cursor = 'pointer';
            retryText.anchor.set(0.5);
            retryText.x = app.screen.width / 2;
            retryText.y = app.screen.height / 2;
            containerscore.addChild(retryText);
            retryText.on('pointerdown', () => {
                containerscore.destroy();

                createGame();
            })

        }
        else {
            criandoBugs();
            tempo = tempo - 1;
            textTimer.text = `Tempo: ` + tempo;
        }
    }, 1000)

    function randomNumber(max) {
        return Math.floor(Math.random() * max);
    }
}

createGame();