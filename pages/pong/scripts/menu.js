const MAIN_MENU = "main", GAMEOVER_MENU = "gameover"
let current_menu, title, instructions, options, description, selected

function menu_config(menu)
{
    //define o menu atual
    current_menu = menu

    //caso esteja no menu principal
    if(current_menu === MAIN_MENU)
    {
        title = "Another Pong Clone"
        instructions = "Select the game mode using W S / ARROWS and SPACE"

        options = ["Classic", "Frenzy"]
        description = 
        [
            ["Classic mode of Pong,", "the match ends when", "a player reach 5 points."],
            ["It is faster than Classic, the", "match ends with 10 points,", "has an additional ball,", "and players can move", "forwards and backwards."]
        ]

        selected = 0

        addEventListener("keydown", menu_input)
    }

    //caso esteja no menu pos jogo
    else if(current_menu === GAMEOVER_MENU)
    {
        title = score[0] > score[1] ? "Player 1 wins!" : "Player 2 wins!"
        instructions = "Press SPACE to go back"

        addEventListener("keydown", menu_input)
    }

    //caso o menu inserido nao exista
    else console.log("invalid menu")

    loop = setInterval(menu_update)
}

//atualizacao do menu
function menu_update()
{
    menu_draw()
}

function menu_draw()
{
    //limpa o canvas
    render.clearRect(0, 0, canvas.width, canvas.height)

    //configuracoes do texto
    render.fillStyle = "#fafafa"
    render.textAlign = "center"

    //desenha o titulo do menu
    render.font = Math.floor(canvas.height * .1) + "px Sarpanch"
    render.fillText(title, Math.floor(canvas.width * .5), Math.floor(canvas.height * .15))

    //desenha as instrucoes do menu
    render.font = Math.floor(canvas.height * .04) + "px Sarpanch"
    render.fillText(instructions, Math.floor(canvas.width * .5), Math.floor(canvas.height * .95))

    if(current_menu === MAIN_MENU)
    {
        //desenha as opcoes
        render.textAlign = "left"
        render.font = Math.floor(canvas.height * .05) + "px Sarpanch"
        render.fillText(options[0], Math.floor(canvas.width * .175), Math.floor(canvas.height * .55 - canvas.height * .04))
        render.fillText(options[1], Math.floor(canvas.width * .175), Math.floor(canvas.height * .55 + canvas.height * .04))
    
        //desenha o indicador e a descricao da opcao atual
        render.textAlign = "right"
        render.font = Math.floor(canvas.height * .04) + "px Sarpanch"
        if(selected === 0)
        {
            //indicador
            render.fillRect(Math.floor(canvas.width * .125), Math.floor(canvas.height * .55 - canvas.height * .07), Math.floor(canvas.width * .02), Math.floor(canvas.width * .02))
            //descricao
            render.fillText(description[0][0], Math.floor(canvas.width * .825), Math.floor(canvas.height * .55 - canvas.height * .06))
            render.fillText(description[0][1], Math.floor(canvas.width * .825), Math.floor(canvas.height * .55))
            render.fillText(description[0][2], Math.floor(canvas.width * .825), Math.floor(canvas.height * .55 + canvas.height * .06))
        }
        else
        {
            //indicador
            render.fillRect(Math.floor(canvas.width * .125), Math.floor(canvas.height * .55 + canvas.height * .011), Math.floor(canvas.width * .02), Math.floor(canvas.width * .02))
            //descricao
            render.fillText(description[1][0], Math.floor(canvas.width * .825), Math.floor(canvas.height * .55 - canvas.height * .12))
            render.fillText(description[1][1], Math.floor(canvas.width * .825), Math.floor(canvas.height * .55 - canvas.height * .06))
            render.fillText(description[1][2], Math.floor(canvas.width * .825), Math.floor(canvas.height * .55))
            render.fillText(description[1][3], Math.floor(canvas.width * .825), Math.floor(canvas.height * .55 + canvas.height * .06))
            render.fillText(description[1][4], Math.floor(canvas.width * .825), Math.floor(canvas.height * .55 + canvas.height * .12))
        }
    }
}

function menu_input(event)
{
    if(!event.repeat)
    {
        switch(event.keyCode)
        {
            case 32: // espaco
                //limpa o listener e interrompe o menu_update()
                removeEventListener("keydown", menu_input)
                clearInterval(loop)
    
                //caso esteja no menu principal, inicia o jogo
                if(current_menu === MAIN_MENU)
                {
                    if(selected === 0) initGame(CLASSIC)
                    else initGame(FRENZY)
                }
                //caso esteja no menu pos jogo, leva ao menu principal
                else if(current_menu === GAMEOVER_MENU) menu_config(MAIN_MENU)
                break

            case 38: // seta para cima
            case 87: // w
                if(--selected < 0) selected = 0
                break

            case 40: // seta para baixo
            case 83: // s
                if(++selected > options.length - 1) selected = options.length - 1
                break
        }
    }
}