

const app = new PIXI.Application({ backgroundColor: '0xffffff' });
document.body.appendChild(app.view);

// ? SOUND EFFECT
const sqek = PIXI.sound.Sound.from('./sound/sqek.mp3');
sqek.volume = 0.1;
const tada = PIXI.sound.Sound.from('./sound/tada.mp3');
tada.volume = 0.1;
const click = PIXI.sound.Sound.from('./sound/click.wav');
click.volume = 0.1;

let telaW = window.innerWidth;
let telaH = window.innerHeight;

app.renderer.resize(window.innerWidth, window.innerHeight);

const startText = new PIXI.Text('Começar', {
    fontFamily: 'Windows',
    fontSize: 36
});
startText.interactive = true;
startText.cursor = 'pointer';
startText.anchor.set(0.5);
startText.x = app.screen.width / 2;
startText.y = app.screen.height / 2;
app.stage.addChild(startText);
startText.on('pointerdown', () => {
    app.stage.removeChild(startText);
    click.play();
    createGame();
})

function createGame() {
    const qnts = (telaW > 767 ? 5 : 2);
    let placar = 0;
    let tempo = 30;

    const containerGamer = new PIXI.Container();
    app.stage.addChild(containerGamer);

    app.renderer.resize(window.innerWidth, window.innerHeight);

    criandoBugs();

    const textPlacar = new PIXI.Text(`Your score: ` + placar, {
        fontSize: telaW > 767 ? 30 : 20,
        fontFamily: 'Windows'
    });
    textPlacar.anchor.set(0.5);
    textPlacar.x = app.screen.width / 2 - 100;
    textPlacar.y = app.screen.height / 2 - 225;
    containerGamer.addChild(textPlacar);

    const textTimer = new PIXI.Text(`Time: ` + tempo, {
        fontSize: telaW > 767 ? 30 : 20,
        fontFamily: 'Windows'
    });
    textTimer.anchor.set(0.5);
    textTimer.x = app.screen.width / 2 + 100;
    textTimer.y = app.screen.height / 2 - 225;
    containerGamer.addChild(textTimer);

    const timerBug = setInterval(() => {
        console.log("Gerando bugs")
        if (tempo <= 0) {
            tada.play();
            clearInterval(timerBug);
            containerGamer.destroy();

            const containerscore = new PIXI.Container();
            app.stage.addChild(containerscore);

            const bug = PIXI.Sprite.from('./img/bug_swat.png');
            bug.anchor.set(0.5);
            bug.width = app.screen.width < 767 ? 100 : 50;
            bug.height = app.screen.width < 767 ? 100 : 50;
            bug.x = app.screen.width / 2;
            bug.y = 100;
            containerscore.addChild(bug);

            const basicText = new PIXI.Text('Score', {
                fontFamily: 'Windows'
            });
            basicText.anchor.set(0.5);
            basicText.x = app.screen.width / 2;
            basicText.y = 150;
            containerscore.addChild(basicText);

            const scoreText = new PIXI.Text(placar, {
                fontFamily: 'Windows',
                fontSize: 40
            });
            scoreText.anchor.set(0.5);
            scoreText.x = app.screen.width / 2;
            scoreText.y = 200;
            containerscore.addChild(scoreText);

            const retryText = new PIXI.Text('Retry', {
                fontFamily: 'Windows',
                fontSize: 36
            });
            retryText.interactive = true;
            retryText.cursor = 'pointer';
            retryText.anchor.set(0.5);
            retryText.x = app.screen.width / 2;
            retryText.y = app.screen.height / 2;
            containerscore.addChild(retryText);
            retryText.on('pointerdown', () => {
                click.play();
                containerscore.destroy();
                createGame();
            })

        }
        else {
            criandoBugs();
            tempo = tempo - 1;
            textTimer.text = `Time: ` + tempo;
        }
    }, 1000)


    //** FEATURES

    function randomNumber(max) {
        return Math.floor(Math.random() * max);
    }

    function criandoBugs() {
        for (i = 0; i < qnts; i++) {
            console.log("Criando bichos")
            const bug = PIXI.Sprite.from('./img/bug_swat.png');
            bug.anchor.set(0.5);
            bug.x = app.screen.width - randomNumber(telaW);
            bug.y = app.screen.height - randomNumber(telaH);
            bug.width = 30;
            bug.height = 30;
            bug.interactive = true;
            bug.cursor = 'pointer';
            bug.on('pointerdown', () => {
                placar = placar + 1;
                textPlacar.text = `Your score: ` + placar;
                containerGamer.removeChild(bug);
                sqek.play();
            })
            containerGamer.addChild(bug);
        }
    }
}