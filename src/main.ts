//purposely bad code so students can fix it - can make it worse

import './style.css'

const dino = document.getElementById("dino")
const cactus = document.getElementById("cactus")
const bird1 = document.getElementById("bird")
const bird2 = document.getElementById("bird2")

const scoreText = document.getElementById("scoreText")
let score = 0
let birdSpeed = 4.5
let birdSpeedString = "4.5s"
SetText("click to start!")


var isJumping = false
let gameOver = true

// changed so jump triggers on mousedown instead of click
document.addEventListener('mousedown', () => jump())


setInterval(function () { Main()}, 10)

function Main()
{
    if(gameOver == false)
    {
        score = score + 1;
        SetText("Score: " + score)
        if(birdSpeed > 2.5){
            birdSpeed = 4.5 - (score * 0.0005)
        }
        birdSpeedString = birdSpeed.toString() + "s"
        changeBirdSpeed(birdSpeedString)
        CheckGameOver()
    }
}




function jump(): void
{
    if(gameOver === false)
    {
        if(isJumping == false)
        {
            isJumping = true
            dino?.classList.add("jump")
            setTimeout(RemoveJump, 500)
        }
    }
    else
    {
        StartGame();
    }
    
}


function RemoveJump()
{
    dino?.classList.remove("jump")
    isJumping = false;
    //mainLoop = mainLoop //bug fix?
}

function RemoveObstacles()
{
    cactus?.classList.remove("cactusMove")
    bird1?.classList.remove("birdMove")
    bird2?.classList.remove("bird2Move")
}


function CheckGameOver()
{

    if(gameOver == false && dino != null && cactus != null && bird1 != null && bird2 != null)
    {
        //get is dinosaur jumping
        let dinoTop = parseInt(window.getComputedStyle(dino).getPropertyValue("top"))

        //get cactus position
        let cactusLeft = parseInt(window.getComputedStyle(cactus).getPropertyValue("left"))

        //get bird position
        let birdLeft = parseInt(window.getComputedStyle(bird1).getPropertyValue("left"))

        let bird2Left = parseInt(window.getComputedStyle(bird2).getPropertyValue("left"))

        //detect cactus collision
        if(dinoTop >= 150 && Math.abs(cactusLeft) < 7)
        {
            //end game
            console.log("player died!")
            SetText("Final Score: " + score + "! Click To Play Again!")
            gameOver = true

            //reset player
            RemoveJump()
            
            //reset cactus
            RemoveObstacles()
        }

        //detect bird collision
        if((dinoTop <= 80 && dinoTop >= -20 && birdLeft >= -60 && birdLeft <= 60) || (bird2Left >= -60 && bird2Left <= 60 && dinoTop <= 80 && dinoTop >= -20))
        {
            //end game
            console.log("player died!")
            SetText("Final Score: " + score + "! Click To Play Again!")
            gameOver = true

            //reset player
            RemoveJump()
            
            //reset cactus
            RemoveObstacles()
        }
    }
}


function StartGame()
{
    console.log("Game started!")
    gameOver = false
    score = 0
    cactus?.classList.add("cactusMove")
    bird1?.classList.add("birdMove")
    bird2?.classList.add("bird2Move")
}

function SetText(s: string)
{
    if(scoreText)
    {
        scoreText.textContent = s
    }
}

function changeBirdSpeed(newDuration: string) {
    if(bird1){
        bird1.style.animationDuration = newDuration;
    }
}