function getComputerChoice() {
    let randomNum = Math.random();
    randomNum = Math.floor(randomNum*3); //random integer between 0 and 2
    
    let computerChoice;
    switch (randomNum) {
        case 0: computerChoice = "rock"; break;
        case 1: computerChoice = "paper"; break;
        default: computerChoice = "scissor";
    }
    return computerChoice;
}

function checkWin(playerSelection, computerChoice) {
    //Returns 1 for win, 0 for draw, -1 for loss.
    if (playerSelection === computerChoice) 
        return 0;

    else if (playerSelection === "rock")
        return computerChoice === "paper"? -1: 1;   //R vs P return -1, R vs S return 1.

    else if (playerSelection === "paper")
        return computerChoice === "rock"? 1: -1;    //P vs R return 1, P vs S return -1.
    
    else if (playerSelection === "scissor")
        return computerChoice === "rock"? -1: 1;    //S vs R return -1, S vs P return 1.
    
    else return 0;                                  //If something goes horribly wrong.
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function showFeedback(playerSelection, computerChoice, score) {
    playerSelection = capitalizeFirstLetter(playerSelection);
    computerChoice = capitalizeFirstLetter(computerChoice);
    
    div = document.querySelector(".results");
    div.innerHTML = '';

    result = document.createElement("p");
    if (score === 1)
        result.textContent += `You Win! ${playerSelection} beats ${computerChoice}`;
    else if (score === -1)
        result.textContent += `You Lose! ${playerSelection} loses to ${computerChoice}`;
    else
        result.textContent += `Draw! You both picked ${playerSelection}`;
    div.appendChild(result);

    matchInfoPara = document.createElement("p");
    matchInfoPara.textContent = `The current score is ${matchInfo[0]}-${matchInfo[1]}`;
    div.appendChild(matchInfoPara);
    
    return;
}

function updateMatchInfo(score) {
    if (score === 1) matchInfo[0]++;    //win
    if (score === -1) matchInfo[1]++;   //lose
    if (score !== 0) matchInfo[2]++;                     //Increment round
    return matchInfo;
}

function showWinner() {
    const winP = document.createElement("p");
    if (matchInfo[0] > matchInfo[1])
        winP.textContent = "Match is over, you won!";
    else if (matchInfo[0] < matchInfo[1])
        winP.textContent = "Match is over, you lost!";
    else
        winP.textContent = "Match is over, Draw!"
    
    const div = document.querySelector(".results");
    div.appendChild(winP);
}

function playRound() {
    if (matchInfo[2] >= 5) return;

    const playerSelection = this.classList.value;
    const computerChoice = getComputerChoice(); 
    const score = checkWin(playerSelection, computerChoice);
    
    updateMatchInfo(score);
    showFeedback(playerSelection, computerChoice, score);
    if (matchInfo[2] >= 5) {
        showWinner();
    }
}


let matchInfo = [0, 0, 0];  //[player score, ai score, round];
const buttons = document.querySelectorAll("button");
buttons.forEach(button => {button.addEventListener("click", playRound);});