document.addEventListener('DOMContentLoaded', () => {
const dino =document.querySelector('.dino');
const body=document.querySelector('body');
const grid=document.querySelector('.grid');
const alert = document.getElementById('alert');
let isJumping = false;
let gravity = 0.9;
let isGameOver= false;


    //if press spacebar(32)
    function control(e) {
        if (e.keyCode === 32){
            if (!isJumping) {
                isJumping =true;
                jump();
            }
        }
    }

document.addEventListener('keyup', control);

let position = 0;
function jump() {
    let count=0;
    let timerId=setInterval(function() {
//move down
if (count === 15) {
    clearInterval(timerId);
    let downTimerId = setInterval(function() {
        if (count ===0) {
            clearInterval(downTimerId); 
            isJumping=false;
        }
    position -=5;
    count --;
    position = position * gravity;
    dino.style.bottom=position + 'px';
    },20 );
    
}
    //move up    
position +=30;
count ++;
position= position * gravity;
dino.style.bottom =position +'px';
    },20)
}; 

//Hinder på vägen

function generateObstacles() {
    let randomTime = Math.random() * 4000; //4000 ms
    let obstaclePosition=2000;
    const obstacle=document.createElement('div');
    if(!isGameOver) obstacle.classList.add('obstacle');
    grid.appendChild(obstacle);
    obstacle.style.left =obstaclePosition + 'px';
//Om man "dör" så komemr hindrerna fortsätta komma men utan syling, alltså syns de inte.

let timerId=setInterval(function() {
    if (obstaclePosition > 0 && obstaclePosition < 60 && position< 60) {
        clearInterval(timerId);
        document.body.classList.add('effects')
        effects.innerHTML='Game over';    
        isGameOver=true;body.removeChild(body.firstChild)
        //remove all children
        while(grid.firstChild) {
            grid.removeChild(grid.lastChild)
        }
    }

    obstaclePosition -=10;
    obstacle.style.left=obstaclePosition + 'px'
    
},20);

if (!isGameOver)setTimeout(generateObstacles,randomTime);
}
generateObstacles();
});