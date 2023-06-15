var runStart = 0;
var playerScores = {}
var character = 1
function keyCheck(event) {

    /****** START GAME ******/
    if (event.which == 13) {
        if (runWorkerId === 0) {
            runWorkerId = setInterval(run, 100)
            runStart = 1
            backgroundWorkerId = setInterval(moveBackground, 1)
            scoreWorkerID = setInterval(updateScore, 100)

            blockWorkerId = setInterval(createBlock, 1000)
            heartBlockWorkerId = setInterval(createHeartBlock, 1000)
            cashBlockWorkerId = setInterval(createCashBlock, 1000)
            coinBlockWorkerId = setInterval(createCoinBlock, 1000)

            moveHeartBlockId = setInterval(moveHeartBlocks, 50)
            moveBlockWorkerId = setInterval(moveBlocks, 50)
            moveCashBlockId = setInterval(moveCashBlocks, 50)
            moveCoinBlockId = setInterval(moveCoinBlocks, 50)

        }
    }


    /****** JUMP ******/
    if (event.which == 32) {
        if (runStart === 1) {
            if (jumpWorkerId === 0) {
                clearInterval(runWorkerId)
                runSound.pause()
                jumpWorkerId = setInterval(jump, 100)
            }
        }
    }
}

/******************* RUN Section ********************/


var boy = document.getElementById("boy")
var boyHealth = 100
var runImageNumber = 1
var runWorkerId = 0
var jumpWorkerId = 0
var runSound = new Audio("game-assets/sounds/run.mp3")
runSound.loop
function run() {
    runSound.play()
    runImageNumber++

    if (runImageNumber == 9) {
        runImageNumber = 1
    }

    boy.src = `game-assets/C (${character})/run/Run (${runImageNumber}).png`

}

/******************* JUMP Section ********************/
var jumpSound = new Audio("game-assets/sounds/jump.mp3")
var jumpImageNumber = 1
var boyMarginTop = 460
function jump() {
    jumpSound.play()
    jumpImageNumber++

    if (jumpImageNumber <= 6) {
        boyMarginTop = boyMarginTop - 30
        boy.style.marginTop = boyMarginTop + "px"
    }
    if (jumpImageNumber >= 7) {
        boyMarginTop = boyMarginTop + 30
        boy.style.marginTop = boyMarginTop + "px"
    }
    if (jumpImageNumber === 11) {
        jumpImageNumber = 1
        clearInterval(jumpWorkerId)
        jumpWorkerId = 0
        runSound.play()
        runWorkerId = setInterval(run, 100)
    }
    boy.src = `game-assets/C (${character})/jump/Jump (${jumpImageNumber}).png`
}



/*********************************************************** Navigation Section ***************************************************/


//=>start of flow of document : loader
var loaderScreen = document.getElementById("loaderScreen")
var login = document.getElementById("login")
var loginForm = document.getElementById("playerForm")
var formContainer = document.getElementById("formContainer")
var background = document.getElementById("background")
var backgroundX = 0;
var backgroundWorkerId = 0;
var playerName = ""


setTimeout(() => {
    //=>proceed to login page ;
    loaderScreen.style.display = "none"
    login.style.display = "flex";
}, 2000)

/******************* LOGIN Section ********************/

loginForm.addEventListener("submit", (e) => {
    e.preventDefault()

    playerName = document.getElementById("name").value

    // => proceed to startGame Page
    login.style.display = "none"
    startGamePage.style.display = "block"

    playerProfileName.innerHTML = playerName
    playerHScore.innerHTML = `H-Score : ${getCurrentPlayerDetails().playerValue}`
    if (character === 1) {
        characterName.innerHTML = "Naruto"
    } else if (character === 2) {
        characterName.innerHTML = "Red Hat Boy"
    } else if (character === 3) {
        characterName.innerHTML = "Jack O"

    }

    document.getElementById("rank").innerHTML = `Rank  |  ${getCurrentPlayerRank(playerScores, playerName) + 1}`
})


/******************* StartGame Section ********************/

const startGamePage = document.getElementById("startGamePage")
const playerProfileName = document.getElementById("playerProfileName")
const playerHScore = document.getElementById("playerHScore")
const avatar = document.getElementById("avatar")
const startGame = document.getElementById("startGame")
const signOut = document.getElementById("signOut")

const nextCharacter = document.getElementById("nextCharacter")
const prevCharacter = document.getElementById("prevCharacter")
const characterName = document.getElementById("characterName")




const leaderBoardPlayerScores = document.getElementById("leaderBoard-playerScores")
leaderBoardPlayerScores.innerHTML = generatePlayerScoresHtml(playerScores)

var idleImageNumber = 1
function idle() {
    idleImageNumber++
    if (idleImageNumber == 11) {
        idleImageNumber = 1
    }
    avatar.src = `game-assets/C (${character})/idle/Idle (${idleImageNumber}).png`
}
setInterval(idle, 100)


// => proceed to the game
startGame.addEventListener("click", () => {
    startGamePage.style.display = "none"
    background.style.display = "block"


})


// => proceed to the login page'.
signOut.addEventListener("click", () => {
    document.getElementById("playerForm").reset();
    startGamePage.style.display = "none"
    login.style.display = "flex"
})



nextCharacter.addEventListener("click", () => {

    if (character < 3) {
        character += 1

        if (character === 1) {
            characterName.innerHTML = "Naruto"
            avatar.style.width = ""
            avatar.style.height = ""
        } else if (character === 2) {
            characterName.innerHTML = "Red Hat Boy"
            avatar.style.width = "200px"
            avatar.style.height = ""
            avatar.style.top = "40px"
            avatar.style.right = "20px"

        } else if (character === 3) {
            characterName.innerHTML = "Jack O"

        }
    }

})


prevCharacter.addEventListener("click", () => {
    if (character > 1) {
        character -= 1

        if (character === 1) {
            characterName.innerHTML = "Naruto"
        } else if (character === 2) {
            characterName.innerHTML = "Red Hat Boy"
        } else if (character === 3) {
            characterName.innerHTML = "Jack O"

        }
    }
})











function moveBackground() {
    backgroundX -= 1.5;
    background.style.backgroundPositionX = backgroundX + "px"

}




var score = document.getElementById("score")
var newScore = 0
scoreWorkerID = 0
function updateScore() {
    newScore = (newScore + .1)
    score.innerHTML = `<div class="currentScore">${parseInt(newScore)}</div> <div class="gamePlayInfoContainer">${getHighScoreHtml(playerScores)} ${getCurrentPlayerHighScoreHtml()}</div>`


}


/******************* OBSTACLE Section ********************/

//CREATE FLAME 

var marginLeft = 500
var blockId = 1
var blockWorkerId = 0


function createBlock() {
    var block = document.createElement("div")
    block.className = "block"

    block.id = "block" + blockId;
    blockId++;
    // console.log(blockId)
    var gap = Math.random() * (1000 + 400) + 400;

    marginLeft += gap
    block.style.marginLeft = marginLeft + "px"
    background.appendChild(block)
}

//CREATE HEART
var heartMarginLeft = 5000
var heartBlockId = 1
var heartBlockWorkerId = 0


function createHeartBlock() {
    var heartBlock = document.createElement("div")
    heartBlock.className = "heartBlock"

    heartBlock.id = "heartBlock" + heartBlockId;
    heartBlockId++;
    var gap = Math.random() * (5000 + 400) + 3000;
    heartMarginLeft += gap
    heartBlock.style.marginLeft = heartMarginLeft + "px"
    background.appendChild(heartBlock)
}


var moveHeartBlockId = 0
function moveHeartBlocks() {

    for (var i = 1; i <= heartBlockId; i++) {
        // console.log("heartBlock" + i)
        var currentHeartBlock = document.getElementById("heartBlock" + i)

        var currentMarginLeft = currentHeartBlock.style.marginLeft;
        var newHeartMarginLeft = parseInt(currentMarginLeft) - 20;
        currentHeartBlock.style.marginLeft = newHeartMarginLeft + "px"
        if (newHeartMarginLeft <= 200) {
            console.log("intersected 120")
            if (newHeartMarginLeft >= 0) {
                console.log("intesected 25")
                if (boyMarginTop <= 460) {
                    if (boyMarginTop > 380) {
                        console.log("intersected")
                        boyHealth += 1
                        document.getElementById("playerHealth").style.width = boyHealth + "%"
                    }
                }
            }
        }
    }
    console.log(newHeartMarginLeft)

}



//CREATE COINS
var coinMarginLeft = 4000;
var coinBlockId = 1;
var coinBlockWorkerId = 0;

function createCoinBlock() {
    var coinBlock = document.createElement("div");
    coinBlock.className = "coinBlock";

    coinBlock.id = "coinBlock" + coinBlockId;
    coinBlockId++;
    var gap = Math.random() * (3000 + 400) + 400;
    coinMarginLeft += gap;
    coinBlock.style.marginLeft = coinMarginLeft + "px";
    background.appendChild(coinBlock);
}

var moveCoinBlockId = 0;
function moveCoinBlocks() {
    for (var i = 1; i <= coinBlockId; i++) {
        var currentCoinBlock = document.getElementById("coinBlock" + i);

        var currentMarginLeft = currentCoinBlock.style.marginLeft;
        var newCoinMarginLeft = parseInt(currentMarginLeft) - 20;
        currentCoinBlock.style.marginLeft = newCoinMarginLeft + "px";

        if (newCoinMarginLeft <= 200) {
            console.log("intersected 120");
            if (newCoinMarginLeft >= 0) {
                console.log("intersected 25");
                if (boyMarginTop <= 460) {
                    if (boyMarginTop > 380) {
                        console.log("intersected");
                        newScore += 5;
                    }
                }
            }
        }
    }

}




//CREATE CASH

var cashMarginLeft = 7000;
var cashBlockId = 1;
var cashBlockWorkerId = 0;

function createCashBlock() {
    var cashBlock = document.createElement("div");
    cashBlock.className = "cashBlock";

    cashBlock.id = "cashBlock" + cashBlockId;
    cashBlockId++;
    var gap = Math.random() * (9000 + 400) + 4000;
    cashMarginLeft += gap;
    cashBlock.style.marginLeft = cashMarginLeft + "px";
    background.appendChild(cashBlock);
}

var moveCashBlockId = 0;
function moveCashBlocks() {
    for (var i = 1; i <= cashBlockId; i++) {
        var currentCashBlock = document.getElementById("cashBlock" + i);

        var currentMarginLeft = currentCashBlock.style.marginLeft;
        var newCashMarginLeft = parseInt(currentMarginLeft) - 20;
        currentCashBlock.style.marginLeft = newCashMarginLeft + "px";

        if (newCashMarginLeft <= 200) {
            console.log("intersected 120");
            if (newCashMarginLeft >= 0) {
                console.log("intersected 25");
                if (boyMarginTop <= 460) {
                    if (boyMarginTop > 380) {
                        console.log("intersected");
                        newScore = (newScore + 40)

                    }
                }
            }
        }
    }

}







var moveBlockWorkerId = 0;
function moveBlocks() {
    for (var i = 1; i <= blockId; i++) {
        var currentBlock = document.getElementById("block" + i)
        // console.log("normal block id" , currentBlock)
        var currentMarginLeft = currentBlock.style.marginLeft;
        var newMarginLeft = parseInt(currentMarginLeft) - 20;
        currentBlock.style.marginLeft = newMarginLeft + "px"

        /*******DEATH Section **********/
        if (newMarginLeft <= 120) {
            if (newMarginLeft >= 25) {

                if (boyMarginTop <= 460) {
                    if (boyMarginTop > 380) {
                        boyHealth -= 10
                        document.getElementById("playerHealth").style.width = boyHealth + "%"
                        boy.src = `game-assets/C (${character})/hurt/Hurt (1).png`


                        if (boyHealth < 0) {
                            clearInterval(runWorkerId)
                            runSound.pause()
                            clearInterval(jumpWorkerId)
                            runStart = -1
                            clearInterval(backgroundWorkerId)
                            clearInterval(scoreWorkerID)
                            clearInterval(blockWorkerId)
                            clearInterval(moveBlockWorkerId)
                            clearInterval(heartBlockWorkerId)
                            clearInterval(moveHeartBlockId)
                            clearInterval(cashBlockWorkerId)
                            clearInterval(moveCashBlockId)
                            clearInterval(cashBlockWorkerId)
                            clearInterval(moveCoinBlockId)
                            deadWorkerId = setInterval(dead, 100)

                            const prevScore = localStorage.getItem(playerName)


                            if (prevScore < newScore) {
                                localStorage.setItem(playerName, parseInt(newScore))

                            }

                            getPlayerScores()
                        }


                    }
                }
            }
        }
    }
}




/******************* GAMEOVEr Section ********************/

var deadSound = new Audio("game-assets/sounds/dead.mp3")
var deadImageNumber = 1
var deadWorkerId = 1
function dead() {
    deadSound.play()
    deadImageNumber++;

    if (deadImageNumber == 11) {
        deadImageNumber = 10
        clearInterval(deadWorkerId)
        boy.style.marginTop = "1000px"
        document.getElementById("gameOver").style.visibility = "visible"
        document.getElementById("gameOverContainer").style.visibility = "visible"
        document.getElementById("endScore").innerHTML = parseInt(newScore);
    }

    boy.src = `game-assets/death/Dead (${deadImageNumber}).png`



}






function re() {

    location.reload()
}


function getPlayerScores() {
    var keys = Object.keys(localStorage);

    // Retrieve the corresponding values using a for...of loop

    for (var key of keys) {
        var value = localStorage.getItem(key);
        playerScores[key] = value;

    }
}


function generatePlayerScoresHtml(obj) {
    getPlayerScores();
    const sortedEntries = Object.entries(obj).sort(([, valueA], [, valueB]) => valueB - valueA);

    let html = '';

    for (let i = 0; i < sortedEntries.length; i++) {
        const [key, value] = sortedEntries[i];
        const isFirstEntry = i === 0;
        const imageTag = isFirstEntry ? '<img class="mvp" src="page-assets/crown.svg" />' : '';

        html += `<div class="playerScoreContainer">
                    <span class="playerNameL">${key} ${imageTag}</span>
                    <span class="playerScore">${value}</span>
                </div>`;
    }

    return html;
}


function getCurrentPlayerDetails() {

    var playerValue = localStorage.getItem(playerName)
    return (
        {
            playerValue,
            playerName

        }
    )
}



const getCurrentPlayerRank = (obj, searchKey) => {
    getPlayerScores()
    const sortedEntries = Object.entries(obj).sort(([, valueA], [, valueB]) => valueB - valueA);
    const index = sortedEntries.findIndex(([key]) => key === searchKey);
    return index;
};


function getHighScoreHtml(obj) {
    getPlayerScores()

    let highestValue = -Infinity;
    let highestPerson = '';
    for (const [person, value] of Object.entries(obj)) {
        if (parseInt(value) > highestValue) {
            highestValue = value;
            highestPerson = person;
        }
    }
    const html = `
        <div class="highScoreContainer">
            <div class="highScore">Top player: </div><div class="highScore-player" >${highestPerson} :  ${highestValue}</div>
        </div>
    </div>`;
    return html;

}

function getCurrentPlayerHighScoreHtml(obj) {
    const currentPlayer = getCurrentPlayerDetails()
    const html = `<div class="highScoreContainer">
    <div class="highScore">Your High Score: </div><div class="highScore-player">${currentPlayer.playerValue}</div>
</div>`

    return html

}



function setWindowAspectRatio(width, height) {
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
  
    const currentAspectRatio = windowWidth / windowHeight;
    const targetAspectRatio = width / height;
  
    let newWidth, newHeight;
  
    if (currentAspectRatio > targetAspectRatio) {
      newWidth = Math.floor(windowHeight * targetAspectRatio);
      newHeight = windowHeight;
    } else {
      newWidth = windowWidth;
      newHeight = Math.floor(windowWidth / targetAspectRatio);
    }
  
    const xOffset = Math.floor((windowWidth - newWidth) / 2);
    const yOffset = Math.floor((windowHeight - newHeight) / 2);
  
    window.resizeTo(newWidth, newHeight);
    window.moveTo(xOffset, yOffset);
  }
  
  // Example usage: Set the window aspect ratio to 16:9
  setWindowAspectRatio(16, 9);