let ball = 
[
    { xPos: 1, yPos: 1, width: 0, height: 0, realSpd: 0, xSpd: 0, ySpd: 0, angle: 0, turn: 0 },
    { xPos: 1, yPos: 1, width: 0, height: 0, realSpd: 0, xSpd: 0, ySpd: 0, angle: 0, turn: 0 }
]

function ball_config()
{
    //define o tamanho e a posicao da bola de acordo com o canvas
    ball[0].width = Math.floor(canvas.width * .02)
    ball[0].height = Math.floor(canvas.width * .02)
    ball[0].xPos = Math.floor(canvas.width / 2) - Math.floor(ball[0].width / 2)
    ball[0].yPos = Math.floor(canvas.height / 2) - Math.floor(ball[0].height / 2)

    if(gamemode === CLASSIC)
    {
        //configura a velocidade inicial
        ball[0].realSpd = canvas.height * .0075
    
        //define o lado e o angulo inicial da bola
        //turn garante que a bola nao colida com a mesma barra mais de uma vez seguida
        if(Math.random() < .5)
        {
            ball[0].angle = Math.random() * (1.3 - .7) + .7
            ball[0].turn = 0
        }
        else
        {
            ball[0].angle = Math.random() * (2.3 - 1.7) + 1.7
            ball[0].turn = 1
        }
    }

    else
    {
        //define o tamanho e a posicao da segunda bola de acordo com o canvas
        ball[1].width = Math.floor(canvas.width * .02)
        ball[1].height = Math.floor(canvas.width * .02)
        ball[1].xPos = Math.floor(canvas.width / 2) - Math.floor(ball[1].width / 2)
        ball[1].yPos = Math.floor(canvas.height / 2) - Math.floor(ball[1].height / 2)

        //configura as velocidades iniciais
        ball[0].realSpd = ball[1].realSpd = canvas.height * .01
    
        //define o lado e o angulo inicial das bolas
        ball[0].angle = Math.random() * (1.3 - .7) + .7
        ball[1].angle = Math.random() * (2.3 - 1.7) + 1.7

        //turn garante que a bola nao colida com a mesma barra mais de uma vez seguida
        ball[0].turn = 0
        ball[1].turn = 1
    }
}

//reseta as configuracoes da bola ao pontuar
function ball_reset(index)
{
    //redefine a posicao da bola de acordo com o canvas
    ball[index].xPos = Math.floor(canvas.width / 2) - Math.floor(ball[index].width / 2)
    ball[index].yPos = Math.floor(canvas.height / 2) - Math.floor(ball[index].height / 2)

    //reconfigura a velocidade
    ball[index].realSpd = canvas.height * .0075
    
    //redefine o angulo da bola, tendo a direcao contraria da outra
    if(ball[ (index + 1) % 2 ].turn % 2 === 0)
    {
        ball[index].angle = Math.random() * (2.3 - 1.7) + 1.7
        ball[index].turn = 1
    }
    else
    {
        ball[index].angle = Math.random() * (1.3 - .7) + .7
        ball[index].turn = 0
    }

    console.log(ball[0].turn, ball[1].turn)
}

function ball_movement()
{
    //define a velocidade para cada eixo com base no angulo
    ball[0].xSpd = ball[0].realSpd * Math.cos(ball[0].angle * Math.PI)
    ball[0].ySpd = ball[0].realSpd * -Math.sin(ball[0].angle * Math.PI)
    
    //move a bola
    ball[0].xPos += ball[0].xSpd
    ball[0].yPos += ball[0].ySpd

    //checa a colisao com as barras (apenas com a do turno atual)
    ball_paddleCollision(paddle[ ball[0].turn % 2 ], ball[0])

    //garante que a bola nao saia pelo eixo Y
    if(ball[0].yPos <= 0 || ball[0].yPos >= canvas.height - ball[0].height) ball[0].angle *= -1

    //caso a bola saia pelo eixo X
    if(ball[0].xPos <= 0) updateScore(1, 0)
    if(ball[0].xPos >= canvas.width - ball[0].width) updateScore(0, 0)

    if(gamemode === FRENZY)
    {
        //define a velocidade para cada eixo com base no angulo
        ball[1].xSpd = ball[1].realSpd * Math.cos(ball[1].angle * Math.PI)
        ball[1].ySpd = ball[1].realSpd * -Math.sin(ball[1].angle * Math.PI)
        
        //move a bola
        ball[1].xPos += ball[1].xSpd
        ball[1].yPos += ball[1].ySpd
    
        //checa a colisao com as barras (apenas com a do turno atual)
        ball_paddleCollision(paddle[ ball[1].turn % 2 ], ball[1])
    
        //garante que a bola nao saia pelo eixo Y
        if(ball[1].yPos <= 0 || ball[1].yPos >= canvas.height - ball[1].height) ball[1].angle *= -1
    
        //caso a bola saia pelo eixo X
        if(ball[1].xPos <= 0) updateScore(1, 1)
        if(ball[1].xPos >= canvas.width - ball[1].width) updateScore(0, 1)
    }
}

function ball_paddleCollision(paddle, ball)
{
    //caso a bola colida com alguma barra
    if(ball.xPos + ball.width >= paddle.xPos && ball.xPos <= paddle.xPos + paddle.width &&
        ball.yPos + ball.height >= paddle.yPos && ball.yPos <= paddle.yPos + paddle.height)
    {
        //pega as posicoes do ponto central (eixo y) da bola e da barra
        let ballCenter = ball.yPos + ball.height / 2
        let paddleCenter = paddle.yPos + paddle.height / 2

        //recalcula o angulo da bola com base no local da barra que ela colidiu
        ball.angle = ball.turn++ % 2 === 0 ?
            (paddleCenter - ballCenter) / (paddle.height / 2) * .3 : 
            (ballCenter - paddleCenter) / (paddle.height / 2) * .3 + 1
        
        //aumenta a velocidade da bola
        if(gamemode === CLASSIC)
        {
            if(ball.realSpd < canvas.height * .015) ball.realSpd *= 1.025
        }
        else if(ball.realSpd < canvas.height * .02) ball.realSpd *= 1.05
    }
}