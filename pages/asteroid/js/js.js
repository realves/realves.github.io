var canvas, render, ship_img, asteroid_img, explosion_img, heart_img, heart2_img, button, lives = 3, timer = 0, mousex, mousey, loop = [];
const FPS = 1000/60;
var ship_circle = {x:365, y:565, radius:35, pos:0};
var asteroid_circle = [
    {x:randomInt(25, 575), y:-1050, radius:25, speedY:10, pos:0},
    {x:randomInt(35, 565), y:-1100, radius:35, speedY:9, pos:32},
    {x:randomInt(50, 550), y:-1150, radius:50, speedY:8, pos:0},
    {x:randomInt(40, 560), y:-1200, radius:40, speedY:9, pos:32},
    {x:randomInt(30, 570), y:-1250, radius:30, speedY:10, pos:0},
    {x:randomInt(45, 555), y:-1300, radius:45, speedY:8, pos:32},
    {x:randomInt(25, 575), y:-1350, radius:25, speedY:10, pos:0},
    {x:randomInt(35, 565), y:-1400, radius:35, speedY:9, pos:32},
    {x:randomInt(50, 550), y:-1450, radius:50, speedY:8, pos:0},
    {x:randomInt(40, 560), y:-1500, radius:40, speedY:9, pos:32},
    {x:randomInt(30, 570), y:-1550, radius:30, speedY:10, pos:0},
    {x:randomInt(45, 555), y:-1600, radius:45, speedY:8, pos:32}
];
window.onload = function(){
    canvas = document.getElementById("mycanvas");
    render = canvas.getContext("2d");
    canvas.width = 800;
    canvas.height = 600;
    button = document.getElementById("refresh");
    
    explosion_img = new Image();
    explosion_img.src = "img/explosion.png";
    
    heart_img = new Image();
    heart_img.src = "img/heart.png";
    heart2_img = new Image();
    heart2_img.src = "img/heart2.png";
    
    asteroid_img = new Image();
    asteroid_img.src = "img/asteroid.png";
    
    ship_img = new Image();
    ship_img.src = "img/space_ship.png";
    ship_img.onload = inputStart
}
function initGame(){
    removeEventListener("mouseup", initGame)
    ship_circle.img = ship_img;
    for(i=0; i<asteroid_circle.length; ++i){
        asteroid_circle[i].img = asteroid_img;
    }
    addEventListener("mousemove", mouse_move);
    setInterval(changeShip, 1000/32);
    setInterval(changeAsteroid, 1000/16);
    loop[0] = setInterval(gameloop, FPS);
    loop[1] = setInterval(changeTimer, 1000/1);
}
function gameloop(){
    update();
    draw();
}
function resetGame(){
    removeEventListener("mouseup", resetGame);
    lives = 3;
    timer = 0;
    ship_circle.img = ship_img;
    loop[0] = setInterval(gameloop, FPS);
    loop[1] = setInterval(changeTimer, 1000/1);
}
function update(){
    for(i=0; i<asteroid_circle.length; ++i){
        asteroid_circle[i].y += asteroid_circle[i].speedY;
        if(lives > 0){
            if(asteroid_circle[i].y > canvas.height + asteroid_circle[i].radius){
                asteroid_circle[i].x = randomInt(0, canvas.width - asteroid_circle[i].radius);
                asteroid_circle[i].y = -50 - i*50;;
            }
        }
    }
    if(lives > 0){
        for(i=0; i<asteroid_circle.length; ++i){
            var distance = calcDistance(ship_circle, asteroid_circle[i]);
            var r = ship_circle.radius + asteroid_circle[i].radius;
            if(distance <= r){
                lives--;
                asteroid_circle[i].x = randomInt(0, canvas.width - asteroid_circle[i].radius);
                asteroid_circle[i].y = -50 - i*50;
            }
        }
        canvas.style = "cursor: none";
    }else{
        ship_circle.img = explosion_img;
        canvas.style = "cursor: default";
    }
}
function draw(){
    render.clearRect(0,0, canvas.width, canvas.height);
    drawShip(ship_circle);
    for(i=0; i<asteroid_circle.length; ++i){
        drawAsteroid(asteroid_circle[i]);
    }
    drawHeart(heart_img, heart2_img, lives);
    stopWatch(timer);
}
function changeShip(){
    ship_circle.pos++;
    if(lives > 0){
        if(ship_circle.pos >= 2) ship_circle.pos = 0;
    }
    else if(ship_circle.pos == 72){
        clearInterval(loop[0]);
        clearInterval(loop[1]);
        inputReset();
    }
}
function changeAsteroid(){
    for(i=0; i<asteroid_circle.length; ++i){
        asteroid_circle[i].pos++;
        if(i % 2 == 0){
            if(asteroid_circle[i].pos == 32) asteroid_circle[i].pos = 0;
        }else if(i % 2 == 1){
            if(asteroid_circle[i].pos == 64) asteroid_circle[i].pos = 32;
        }
    }
}
function changeTimer(){
    if(lives > 0) timer++;
}
function mouse_move(event){
    mousex = event.clientX - canvas.offsetLeft;
    mousey = event.clientY - canvas.offsetTop + window.pageYOffset;
    if(lives > 0){
        if(mousex > ship_circle.radius
        && mousex < (canvas.width - ship_circle.radius)) ship_circle.x = mousex;
        if(mousey > ship_circle.radius
        && mousey < (canvas.height - ship_circle.radius)) ship_circle.y = mousey;
    }
}
function drawShip(s){
    if(lives > 0){
        var x = s.pos * 180;
        render.drawImage(s.img, x, 0, 180, 250, s.x - s.radius, s.y - s.radius, 2*s.radius, 2*s.radius);
    }else{
        var x, y;
        switch(true){
            case s.pos < 9:
                x = s.pos * 100; y = 0;
                break;
            case s.pos < 18:
                x = (s.pos - 9) * 100; y = 100;
                break;
            case s.pos < 27:
                x = (s.pos - 18) * 100; y = 200;
                break;
            case s.pos < 36:
                x = (s.pos - 27) * 100; y = 300;
                break;
            case s.pos < 45:
                x = (s.pos - 36) * 100; y = 400;
                break;
            case s.pos < 54:
                x = (s.pos - 45) * 100; y = 500;
                break;
            case s.pos < 63:
                x = (s.pos - 54) * 100; y = 600;
                break;
            case s.pos < 72:
                x = (s.pos - 63) * 100; y = 700;
                break;
            case s.pos < 81:
                x = (s.pos - 72) * 100; y = 800;
                break;
                   }
        render.drawImage(s.img, x, y, 100, 100, s.x - s.radius, s.y - s.radius, 2*s.radius, 2*s.radius);
    }
}
function drawAsteroid(a){
    var x, y;
    if(a.pos < 32){
        if(a.pos < 8){
            x = a.pos * 128;
            y = 0;
        }
        else if(a.pos < 16){
            x = (a.pos - 8) * 128;
            y = 128;
        }
        else if(a.pos < 24){
            x = (a.pos - 16) * 128;
            y = 256;
        }
        else if(a.pos < 32){
            x = (a.pos - 24) * 128;
            y = 384;
        }
    }
    else{
        if(a.pos < 40){
            x = (a.pos - 32) * 128;
            y = 512;
        }
        else if(a.pos < 48){
            x = (a.pos - 40) * 128;
            y = 640;
        }
        else if(a.pos < 56){
            x = (a.pos - 48) * 128;
            y = 768;
        }
        else if(a.pos < 64){
            x = (a.pos - 56) * 128;
            y = 896;
        }
    }
    render.drawImage(a.img, x, y, 128, 128, a.x - a.radius, a.y - a.radius, 2*a.radius, 2*a.radius);
}
function drawHeart(h, h2, l){
    for(i=0; i<lives; ++i){
        render.drawImage(h, 0, 0, h.width, h.height, i*32, 0, 32, 32);
    }
    for(i=3; i>lives; --i){
        render.drawImage(h2, 0, 0, h2.width, h2.height, (i-1)*32, 0, 32, 32);
    }
}
function stopWatch(t){
    render.font = "64px VT323";
    render.textAlign = "center";
    render.fillStyle = "#fafafa";
    render.fillText(t, canvas.width/2, 64);
}
function calcDistance(c1, c2){
    var x1 = c1.x;
    var x2 = c2.x;
    var y1 = c1.y;
    var y2 = c2.y;
    var d = Math.sqrt(Math.pow(x2-x1,2) + Math.pow(y2-y1,2));
    return d;
}
function randomInt(min, max){
    return Math.floor(Math.random() * (max - min +1)) + min;
}
function inputStart(){
    render.font = "64px VT323";
    render.textAlign = "center";
    render.fillStyle = "#fafafa";
    render.fillText("Clique para iniciar", canvas.width/2, canvas.height/2);
    addEventListener("mouseup", initGame);
}
function inputReset(){
    render.font = "64px VT323";
    render.textAlign = "center";
    render.fillStyle = "#fafafa";
    render.fillText("Clique para reiniciar", canvas.width/2, canvas.height/2);
    addEventListener("mouseup", resetGame);
}