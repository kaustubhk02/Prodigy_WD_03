const container = document.querySelector(".container");
const game = document.querySelector("#game");
const box1 = document.querySelector("#box1");
const box2 = document.querySelector("#box2");
const box3 = document.querySelector("#box3");
const box4 = document.querySelector("#box4");
const box5 = document.querySelector("#box5");
const box6 = document.querySelector("#box6");
const box7 = document.querySelector("#box7");
const box8 = document.querySelector("#box8");
const box9 = document.querySelector("#box9");

let boxes = [box1, box2, box3, box4, box5, box6, box7, box8, box9];
const b1 = document.querySelector("#b1");

let clickcount = 0;
let start = false;
let chance = true;
let win = false;

b1.addEventListener("mouseenter", ()=>{
    b1.style.cursor = "pointer";
});

b1.addEventListener("click", ()=>{
    if(clickcount === 0){
        start = true;
        // b1.innerText = "RESET";
        b1.style.backgroundColor = "rgb(213, 236, 236)";
        b1.style.color = "rgb(38, 97, 97)";
        b1.style.borderColor = "rgb(38, 97, 97)";
        console.log("Start the Game.........");
        clickcount++;
        player(chance);
    }
    else{
        reset(chance);
    }
});

function player(chance){
    for(let box of boxes){
        box.addEventListener("mouseenter", ()=>{
            if(start === true){
            //  box.style.zIndex = "1000";
                box.style.cursor = "pointer";
                box.style.padding = "0.2rem";
                box.style.backgroundColor = "rgb(50, 110, 100)";
            }
        });
        box.addEventListener("mouseleave", ()=>{
            if(start === true){
                box.style.padding = "0";
                box.style.backgroundColor = "";
            }
        });
        box.addEventListener("click", ()=>{
            if(start === true){
                if(chance === true){
                    b1.innerText = "RE-SET";
                    b1.style.backgroundColor = "rgb(213, 236, 236)";
                    b1.style.color = "rgb(38, 97, 97)";
                    b1.style.borderColor = "rgb(38, 97, 97)";
                    if(box.innerText !== "O"){
                        box.style.color = "wheat";
                        box.innerText = "X";
                        chance = false;
                        checkWin();
                        draw();
                    }
                }
                else{
                    if(box.innerText !== "X"){
                        box.style.color = "wheat";
                        box.innerText = "O"; 
                        chance = true;
                        checkWin();
                        draw();
                    }
                }
            }
        });
    }
}

let wintext = document.createElement("p");

function reset(chance){
    win = false;
    start = false;
    game.style.opacity = "1";
    b1.innerText = "START";
    b1.style.backgroundColor = "rgb(210, 233, 213)";
    b1.style.color = "rgb(37, 93, 93)";
    setTimeout(()=>{
        b1.style.backgroundColor = "";
        b1.style.color = "";
    },150);
    let i = 1;
    for(let box of boxes){
        box.innerText = i;
        box.style.color = "transparent";
        i++;
    }
    player(chance);
    wintext.remove();
    clickcount = 0;
}

function checkWin(){
    if( (box1.innerText === box2.innerText && box2.innerText === box3.innerText) || (box4.innerText === box5.innerText && box5.innerText === box6.innerText) || (box7.innerText === box8.innerText && box8.innerText === box9.innerText) || (box1.innerText === box4.innerText && box4.innerText === box7.innerText) || (box2.innerText === box5.innerText && box5.innerText === box8.innerText) || (box3.innerText === box6.innerText && box6.innerText === box9.innerText) || (box1.innerText === box5.innerText && box5.innerText === box9.innerText) || (box3.innerText === box5.innerText && box5.innerText === box7.innerText) )
        {
            win = true;
            start = false;
            setTimeout(()=>{
                game.style.opacity = "0.5";
                wintext.innerText = `!!! Player WINS !!!`;
                container.before(wintext);
                wintext.style.fontSize = "6vw";
                wintext.style.color = "rgb(104, 24, 37)";
            },800);
        }
}
function draw(){
    let filled = true;
    for(let box of boxes){
        if(box.innerText !== "X" && box.innerText !== "O"){
            filled = false;
            break;
        }
    }
    
    if(filled && !win){
        start = false;
        setTimeout(()=>{
            game.style.opacity = "0.5";
            wintext.innerText = `!!! DRAW !!!`;
            container.before(wintext);
            wintext.style.fontSize = "6vw";
            wintext.style.color = "rgb(130, 95, 21)";
        },800);
    }
}

