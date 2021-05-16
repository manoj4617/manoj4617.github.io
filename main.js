const canvas = document.getElementById('my-canvas');
const ctx = canvas.getContext('2d');

var x = canvas.width/2;
var y = canvas.height/2;

//Key Actions
var upPressed = false;
var downPressed = false;
var leftPressed = false;
var rightPressed = false;
var outerBoxWidth = 130;
var outerBoxHeight = 130;
var innerBoxHeight = 90;
var innerBoxWidth = 90;
var innerMostHeight = 70;
var innerMostWidth = 70;
var outerX = x - 65;
var outerY = y - 65;
var innerX = x - 45;
var innerY = y - 45;
var innerMostX = x - 35;
var innerMostY = y - 35;
var radius = 15;
var ballDX = 2;
var ballDY = 2;
var outerBoxPoints = 1;
var innerBoxPoints = 2;
var innerMostPoints = 3;
var score = 0;

const keyUpHandler = (e)=>{
    if(e.key == 'Right' || e.key == 'ArrowRight'){
        rightPressed = false;
    }
    if(e.key == 'Left' || e.key == 'ArrowLeft'){
        leftPressed = false;
    }
    if(e.key == 'Up' || e.key == 'ArrowUp'){
        upPressed = false;
    }
    if(e.key == 'Down' || e.key == 'ArrowDown'){
        downPressed = false;
    }
}
const keyDownHandler = (e)=>{
    if(e.key == 'Right' || e.key == 'ArrowRight'){
        rightPressed = true;
    }
    if(e.key == 'Left' || e.key == 'ArrowLeft'){
        leftPressed = true;
    }
    if(e.key == 'Up' || e.key == 'ArrowUp'){
        upPressed = true;
    }
    if(e.key == 'Down' || e.key == 'ArrowDown'){
        downPressed = true;
    }
}

document.addEventListener('keydown',keyDownHandler,false);
document.addEventListener('keyup',keyUpHandler,false);

const drawOuterBox = ()=>{
    ctx.beginPath();
    ctx.rect(outerX, outerY, outerBoxWidth, outerBoxHeight);
    ctx.strokeStyle='red';
    ctx.stroke();
    ctx.closePath();
}

const drawInnerBox = ()=>{
    ctx.beginPath();
    ctx.rect(innerX, innerY, innerBoxWidth, innerBoxHeight);
    ctx.strokeStyle='blue';
    ctx.stroke();
    ctx.closePath();
}

const  drawInnerMostBox = ()=>{
    ctx.beginPath();
    ctx.rect(innerMostX, innerMostY, innerMostWidth, innerMostHeight);
    ctx.strokeStyle='green';
    ctx.stroke();
    ctx.closePath();
}

const drawBall = ()=>{
    ctx.beginPath();
    ctx.arc(x,y,radius,0,Math.PI*2);
    ctx.fillStyle = 'black';
    ctx.fill();
    ctx.closePath();
}
const drawScore = ()=>{
    ctx.fillStyle = '#26648C';
    ctx.font = "30px Quicksand";
    ctx.fillText(`Score: ${score}`, canvas.width - 150,50,100);
}
const draw = () => {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    drawOuterBox();
    drawInnerBox();
    drawInnerMostBox();
    drawBall();
    drawScore();

    //moving the ball
    if(y + ballDY < radius + (outerBoxHeight/4)){
        ballDY = -ballDY;
    }
    else if(y + ballDY > canvas.height - radius - (outerBoxHeight/4)){
        ballDY = -ballDY;
    }

    if(x + ballDX > canvas.width - radius - (outerBoxWidth/4) || x + ballDX < radius + (outerBoxHeight/4)){
        ballDX = -ballDX;
    }

     //getting score
     if(y + ballDY > innerMostY && y + ballDY < innerMostY + innerMostHeight && x + ballDX > innerMostX && x + ballDX < innerX + innerMostWidth ){
        score += innerMostPoints;
        ctx.fillStyle = 'green';
        ctx.fill();
    }
    else if(y + ballDY > innerY && y + ballDY < innerY + innerBoxHeight && x + ballDX > innerX && x + ballDX < innerX + innerBoxWidth ){
        score += innerBoxPoints;
        ctx.fillStyle = 'blue';
        ctx.fill();
    }
    else if(y + ballDY > outerY && y + ballDY < outerY + outerBoxHeight && x + ballDX > outerX && x + ballDX < outerX + outerBoxWidth ){
        score += outerBoxPoints;
        ctx.fillStyle = 'red';
        ctx.fill();
    }

    //defining button actions
    if(rightPressed){
        outerX += 10;
        innerX += 10;
        innerMostX += 10;
        if(outerX + outerBoxWidth > canvas.width){
            outerX = canvas.width - outerBoxWidth;
            innerX = canvas.width - ((outerBoxWidth/2)+(innerBoxWidth/2));
            innerMostX = canvas.width - ((outerBoxWidth/2)+(innerMostWidth/2));
        }
    }
    if(leftPressed){
        outerX -= 10;
        innerX -= 10;
        innerMostX -= 10;
        if(outerX < 0){
            outerX = 0;
            innerX = (outerBoxWidth/2)-(innerBoxWidth/2);
            innerMostX = (outerBoxWidth/2)-(innerMostWidth/2);

        }
    }
    if(upPressed){
        outerY-=10;
        innerY -= 10;
        innerMostY -= 10;
        if(outerY < 0){
            outerY = 0;
            innerY = (outerBoxHeight/2)-(innerBoxHeight/2);
            innerMostY = (outerBoxHeight/2)-(innerMostHeight/2);
        }
    }

    if(downPressed){
        outerY+=10;
        innerY += 10;
        innerMostY += 10;
        if(outerY + outerBoxHeight > canvas.height){
            outerY = canvas.height - outerBoxHeight;
            innerY = canvas.height - (outerBoxHeight/2)-(innerBoxHeight/2);
            innerMostY = canvas.height - (outerBoxHeight/2)-(innerMostHeight/2);
        }
    }


    x += ballDX;
    y += ballDY;
    requestAnimationFrame(draw);
}

draw();

const end = ()=>{
    alert("GAME OVER!");
    drawScore();
    document.location.reload();
}

setTimeout(end,30000)