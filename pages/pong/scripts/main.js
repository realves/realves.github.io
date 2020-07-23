const fps = 1000/60, CLASSIC = "classic", FRENZY = "frenzy"
let canvas, render, score, loop, gamemode

window.onload = function()
{
    canvas = document.getElementById("canvas")
    render = canvas.getContext("2d")

    //define o tamanho do canvas de acordo com a tela
    canvas.width = window.innerWidth >= window.innerHeight * 1.33 ?
        Math.floor(window.innerHeight * 1.33) : Math.floor(window.innerWidth * .9)

    canvas.height = window.innerWidth >= window.innerHeight * 1.33 ?
        Math.floor(window.innerHeight * .9) : Math.floor(window.innerWidth * .75)

    //abre o menu principal
    menu_config(MAIN_MENU)
}

//configuracoes iniciais para o jogo
function initGame(mode)
{
    gamemode = mode

    score = [0, 0]

    paddle_config()
    ball_config()

    loop = setInterval(updateGame, fps)

    paddle_input()
}

//ciclo de jogo
function updateGame()
{
    paddle_movement()
    ball_movement()
    
    draw()
}

//apos alguem pontuar
function updateScore(player, ball)
{
    //caso o placar maximo seja atingido
    if(gamemode === CLASSIC && ++score[player] >= 5 ||
        gamemode === FRENZY && ++score[player] >= 10)
    {
        //interrompe o updateGame()
        clearInterval(loop)

        //limpa os listeners que movimentam as barras
        removeEventListener("keydown", paddle_keydown)
        removeEventListener("keyup", paddle_keyup)

        //leva ao menu de fim de jogo
        menu_config(GAMEOVER_MENU)
    }

    //reconfigura a bola
    else ball_reset(ball)
}

function draw()
{
    //limpa o canvas
    render.clearRect(0, 0, canvas.width, canvas.height)

    //desenha a divisoria, as barras e a bola, respectivamente
    render.fillRect(Math.floor(canvas.width / 2), 0, 1, canvas.height)

    render.fillRect(paddle[0].xPos, paddle[0].yPos, paddle[0].width, paddle[0].height)
    render.fillRect(paddle[1].xPos, paddle[1].yPos, paddle[1].width, paddle[1].height)

    render.fillRect(ball[0].xPos, ball[0].yPos, ball[0].width, ball[0].height)
    if(gamemode === FRENZY) render.fillRect(ball[1].xPos, ball[1].yPos, ball[1].width, ball[1].height)

    //desenha o placar
    render.textAlign = "center"
    render.font = Math.floor(canvas.height * .1) + "px Sarpanch"
    render.fillText(score[0], Math.floor(canvas.width * .25), Math.floor(canvas.height * .2))
    render.fillText(score[1], Math.floor(canvas.width *.75), Math.floor(canvas.height * .2))
}