let paddle =
[
    { xPos: 0, yPos: 0, width: 0, height: 0, xSpd: 0, ySpd: 0 },
    { xPos: 0, yPos: 0, width: 0, height: 0, xSpd: 0, ySpd: 0 }
]
let paddleSpd, w, s, up, down, a, d, left, right

function paddle_config()
{
    //define o tamanho e a posicao das barras de acordo com o canvas
    for(let i = 0; i < 2; i++)
    {
        paddle[i].width = Math.floor(canvas.width * .02)
        paddle[i].height = Math.floor(canvas.height * .2)
        paddle[i].yPos = Math.floor(canvas.height / 2) - Math.floor(paddle[i].height / 2)
    }

    paddle[0].xPos = Math.floor(canvas.width * .02)
    paddle[1].xPos = Math.floor(canvas.width * .96)

    //variaveis para o movimento das barras
    paddleSpd = gamemode === CLASSIC ? Math.floor(canvas.height * .01) : Math.floor(canvas.height * 0.015)

    w = s = up = down = a = d = left = right = false
}

//adiciona os listeners para a movimentacao das barras
function paddle_input()
{
    addEventListener("keydown", paddle_keydown)
    addEventListener("keyup", paddle_keyup)
}

//aumenta a velocidade na direcao da tecla pressionada
function paddle_keydown(event)
{
    if(!event.repeat)
    {
        switch(event.keyCode)
        {
            case 87: w = true // w
            break

            case 83: s = true // s
            break

            case 38: up = true // seta para cima
            break

            case 40: down = true // seta para baixo
            break
        }

        if(gamemode === FRENZY)
        {
            switch(event.keyCode)
            {
                case 65: a = true // a
                break
    
                case 68: d = true // d
                break
    
                case 37: left = true // seta para esquerda
                break
    
                case 39: right = true // seta para direita
                break
            }
        }
    }
}

//aumenta a velocidade na direcao contraria da tecla solta
function paddle_keyup(event)
{
    switch(event.keyCode)
    {
        case 87: w = false // w
        break

        case 83: s = false // s
        break

        case 38: up = false // seta para cima
        break

        case 40: down = false // seta para baixo
        break
    }

    if(gamemode === FRENZY)
    {
        switch(event.keyCode)
        {
            case 65: a = false // a
            break

            case 68: d = false // d
            break

            case 37: left = false // seta para esquerda
            break

            case 39: right = false // seta para direita
            break
        }
    }
}

function paddle_movement()
{
    //config do movimento vertical do p1
    if(w === s) paddle[0].ySpd = 0
    else if(w) paddle[0].ySpd = -paddleSpd
    else if(s) paddle[0].ySpd = paddleSpd

    //config do movimento vertical do p2
    if(up === down) paddle[1].ySpd = 0
    else if(up) paddle[1].ySpd = -paddleSpd
    else if(down) paddle[1].ySpd = paddleSpd

    //move as barras
    paddle[0].yPos += paddle[0].ySpd
    paddle[1].yPos += paddle[1].ySpd

    //garante que as barras nao saiam do canvas por cima
    if(paddle[0].yPos < 0) paddle[0].yPos = 0
    if(paddle[1].yPos < 0) paddle[1].yPos = 0

    //garante que as barras nao saiam do canvas por baixo
    if(paddle[0].yPos > canvas.height - paddle[0].height) paddle[0].yPos = canvas.height - paddle[0].height
    if(paddle[1].yPos > canvas.height - paddle[1].height) paddle[1].yPos = canvas.height - paddle[1].height

    if(gamemode === FRENZY)
    {
        //config do movimento horizontal do p1
        if(a === d) paddle[0].xSpd = 0
        else if(a) paddle[0].xSpd = -paddleSpd
        else if(d) paddle[0].xSpd = paddleSpd
    
        //config do movimento horizontal do p2
        if(left === right) paddle[1].xSpd = 0
        else if(left) paddle[1].xSpd = -paddleSpd
        else if(right) paddle[1].xSpd = paddleSpd

        //move as barras
        paddle[0].xPos += paddle[0].xSpd
        paddle[1].xPos += paddle[1].xSpd

        //garante que as barras nao saiam do canvas pelas laterais
        if(paddle[0].xPos < 0) paddle[0].xPos = 0
        if(paddle[1].xPos > canvas.width - paddle[1].width) paddle[1].xPos = canvas.width - paddle[1].width

        //garante que as barras nao passem para o centro
        if(paddle[0].xPos > Math.floor(canvas.width * .33) - paddle[0].width)
            paddle[0].xPos = Math.floor(canvas.width * .33) - paddle[0].width

        if(paddle[1].xPos < Math.floor(canvas.width * .67))
            paddle[1].xPos = Math.floor(canvas.width * .67)
    }
}