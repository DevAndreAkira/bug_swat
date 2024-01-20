const app = new PIXI.Application({ backgroundAlpha: 0 });
document.body.appendChild(app.view);

const sounds = {
    sqek: PIXI.sound.Sound.from('./sound/sqek.mp3'),
    tada: PIXI.sound.Sound.from('./sound/tada.mp3'),
    click: PIXI.sound.Sound.from('./sound/click.wav'),
};

const sizes = {
    desktop: {
        fontSize: 32,
        bugSize: 30,
    },
    mobile: {
        fontSize: 20,
        bugSize: 20,
    },
};

var telaW = window.innerWidth;
var telaH = window.innerHeight;
app.renderer.resize(telaW, telaH);

function convertorResponsivo(firtsValue, secondValue) {
    return telaW < 768 ? secondValue : firtsValue;
}

function createText(text, fontSizeArg, x, y) {
    const newText = new PIXI.Text(text, {
        fontFamily: 'sans-serif',
        fontSize: convertorResponsivo(fontSizeArg.desktop.fontSize, fontSizeArg.mobile.fontSize),
    });
    newText.anchor.set(0.5);
    newText.x = x;
    newText.y = y;
    return newText;
}

function createButton(text, fontSize, x, y, onClick) {
    const button = createText(text, fontSize, x, y);
    button.interactive = true;
    button.cursor = 'pointer';
    button.on('pointerdown', onClick);
    return button;
}

function randomNumber(max) {
    return Math.floor(Math.random() * max);
}

function createGame() {
    const qnts = convertorResponsivo(5, 2)
    let placar = 0;
    let tempo = 30;

    const containerGamer = new PIXI.Container();
    app.stage.addChild(containerGamer);

    createBugs();

    // Texto da pontuação
    const textPlacar = new PIXI.Text(`Score: ` + placar, {
        fontSize: convertorResponsivo(30, 20),
        fontFamily: 'sans-serif'
    });
    textPlacar.anchor.set(0.5);
    textPlacar.x = app.screen.width / 2 - 100;
    textPlacar.y = app.screen.height / 2 - 225;
    containerGamer.addChild(textPlacar);

    // Texto do tempo
    const textTimer = new PIXI.Text(`Time: ` + tempo, {
        fontSize: convertorResponsivo(30, 20),
        fontFamily: 'sans-serif'
    });
    textTimer.anchor.set(0.5);
    textTimer.x = app.screen.width / 2 + 100;
    textTimer.y = app.screen.height / 2 - 225;
    containerGamer.addChild(textTimer);

    // Função do tempo rodando
    const timerBug = setInterval(() => {
        if (tempo <= 0) {
            sounds.tada.play();
            clearInterval(timerBug);
            containerGamer.destroy();

            // Criar tela de score
            const containerScore = new PIXI.Container();
            app.stage.addChild(containerScore);

            const bug = PIXI.Sprite.from('./img/bug_swat.png');
            bug.anchor.set(0.5);
            bug.width = convertorResponsivo(50, 100)
            bug.height = convertorResponsivo(50, 100)
            bug.x = app.screen.width / 2;
            bug.y = 50;
            containerScore.addChild(bug);

            const basicText = new PIXI.Text('Score', {
                fontFamily: 'sans-serif',
                fontSize: convertorResponsivo(30, 20)
            });
            basicText.anchor.set(0.5);
            basicText.x = app.screen.width / 2;
            basicText.y = 150;
            containerScore.addChild(basicText);

            const scoreText = new PIXI.Text(placar, {
                fontFamily: 'sans-serif',
                fontSize: 40
            });
            scoreText.anchor.set(0.5);
            scoreText.x = app.screen.width / 2;
            scoreText.y = 200;
            containerScore.addChild(scoreText);

            const retryText = new PIXI.Text('Retry', {
                fontFamily: 'sans-serif',
                fontSize: 36
            });
            retryText.interactive = true;
            retryText.cursor = 'pointer';
            retryText.anchor.set(0.5);
            retryText.x = app.screen.width / 2;
            retryText.y = app.screen.height / 2;
            containerScore.addChild(retryText);
            retryText.on('pointerdown', () => {
                sounds.click.play();
                containerScore.destroy();
                createGame();
            })
        }
        else {
            createBugs();
            tempo = tempo - 1;
            textTimer.text = `Time: ` + tempo;
        }
    }, 1000)

    //** FEATURES

    function randomNumber(max) {
        return Math.floor(Math.random() * max);
    }

    function createBugs() {
        for (i = 0; i < qnts; i++) {
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
                textPlacar.text = `Score: ` + placar;
                containerGamer.removeChild(bug);
                sounds.sqek.play();
            })
            containerGamer.addChild(bug);
        }
    }
}

const startText = createButton('Começar', sizes, app.screen.width / 2, app.screen.height / 2, () => {
    app.stage.removeChild(startText);
    sounds.click.play();
    createGame();
});

app.stage.addChild(startText);