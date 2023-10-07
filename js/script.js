const app = new PIXI.Application({ backgroundAlpha: 0 });
document.body.appendChild(app.view);
// A descrição a seguir mais me facilitar transpor para outras linguagens esses jogos

// ? SOUND EFFECT
const sqek = PIXI.sound.Sound.from('./sound/sqek.mp3');
sqek.volume = 0.1;
const tada = PIXI.sound.Sound.from('./sound/tada.mp3');
tada.volume = 0.1;
const click = PIXI.sound.Sound.from('./sound/click.wav');
click.volume = 0.1;

// Tamanho da tela total
let telaW = window.innerWidth;
let telaH = window.innerHeight;

// Caso Redimenssione
app.renderer.resize(window.innerWidth, window.innerHeight);

// Função para diferenciar o tamanho desktop para o mobile
function convertorResponsivo(widthScreen, firtsValue, secondValue) {
    return telaW > widthScreen ? secondValue : firtsValue
}

// Criando texto de "Começar"
const startText = new PIXI.Text('Começar', {
    fontFamily: 'sans serif',
    fontSize: convertorResponsivo(telaW, 32, 20)
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
});

function createGame() {
    const qnts = convertorResponsivo(telaW, 5, 2)
    let placar = 0;
    let tempo = 30;

    const containerGamer = new PIXI.Container();
    app.stage.addChild(containerGamer);

    criandoBugs();

    // Texto da pontuação
    const textPlacar = new PIXI.Text(`Score: ` + placar, {
        fontSize: convertorResponsivo(telaW, 30, 20),
        fontFamily: 'sans serif'
    });
    textPlacar.anchor.set(0.5);
    textPlacar.x = app.screen.width / 2 - 100;
    textPlacar.y = app.screen.height / 2 - 225;
    containerGamer.addChild(textPlacar);

    // Texto do tempo
    const textTimer = new PIXI.Text(`Time: ` + tempo, {
        fontSize: convertorResponsivo(telaW, 30, 20),
        fontFamily: 'sans serif'
    });
    textTimer.anchor.set(0.5);
    textTimer.x = app.screen.width / 2 + 100;
    textTimer.y = app.screen.height / 2 - 225;
    containerGamer.addChild(textTimer);

    // Função do tempo rodando
    const timerBug = setInterval(() => {
        if (tempo <= 0) {
            tada.play();
            clearInterval(timerBug);
            containerGamer.destroy();

            // Criar tela de score
            const containerScore = new PIXI.Container();
            app.stage.addChild(containerScore);

            const bug = PIXI.Sprite.from('./img/bug_swat.png');
            bug.anchor.set(0.5);
            bug.width = convertorResponsivo(telaW, 50, 100)
            bug.height = convertorResponsivo(telaW, 50, 100)
            bug.x = app.screen.width / 2;
            bug.y = 50;
            containerScore.addChild(bug);

            const basicText = new PIXI.Text('Score', {
                fontFamily: 'sans serif',
                fontSize: convertorResponsivo(telaW, 30, 20)
            });
            basicText.anchor.set(0.5);
            basicText.x = app.screen.width / 2;
            basicText.y = 150;
            containerScore.addChild(basicText);

            const scoreText = new PIXI.Text(placar, {
                fontFamily: 'sans serif',
                fontSize: 40
            });
            scoreText.anchor.set(0.5);
            scoreText.x = app.screen.width / 2;
            scoreText.y = 200;
            containerScore.addChild(scoreText);

            const retryText = new PIXI.Text('Retry', {
                fontFamily: 'sans serif',
                fontSize: 36
            });
            retryText.interactive = true;
            retryText.cursor = 'pointer';
            retryText.anchor.set(0.5);
            retryText.x = app.screen.width / 2;
            retryText.y = app.screen.height / 2;
            containerScore.addChild(retryText);
            retryText.on('pointerdown', () => {
                click.play();
                containerScore.destroy();
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
                sqek.play();
            })
            containerGamer.addChild(bug);
        }
    }
}