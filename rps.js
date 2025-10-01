function changeHoverState() {
    const image = this.firstChild;
    image.classList.toggle("img-hover");
}

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
    
    const div = document.querySelector(".results");
    div.innerHTML = '';

    const result = document.createElement("p");
    if (score === 1) {
        result.textContent = `You win this round! ${playerSelection} beats ${computerChoice}`;
        result.classList.add('win-text');
        document.body.classList.remove('lose-bg');
        document.body.classList.add('win-bg');
        setTimeout(() => document.body.classList.remove('win-bg'), 1250);
    }
    else if (score === -1) {
        result.textContent = `You lose this round! ${playerSelection} loses to ${computerChoice}`;
        result.classList.add('lose-text');
        document.body.classList.remove('win-bg');
        document.body.classList.add('lose-bg');
        setTimeout(() => document.body.classList.remove('lose-bg'), 1250);
    }
    else {
        result.textContent = `Draw! You both picked ${playerSelection}`;
    }
    div.appendChild(result);

    const matchInfoPara = document.createElement("p");
    matchInfoPara.textContent = `Score - You: ${matchInfo[0]} | AI: ${matchInfo[1]} | Total Rounds: ${matchInfo[2]}`;
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
    const playerSelection = this.classList.value;
    const computerChoice = getComputerChoice(); 
    const score = checkWin(playerSelection, computerChoice);
    
    updateMatchInfo(score);
    showFeedback(playerSelection, computerChoice, score);
}


let matchInfo = [0, 0, 0];  //[player score, ai score, round];
let currentVolume = 50; // Start at 50%

// Initialize audio
const backgroundMusic = document.getElementById('background-music');
const volumeFill = document.querySelector('.volume-fill');
const volumeText = document.querySelector('.volume-text');

// Set initial volume
backgroundMusic.volume = currentVolume / 100;

// Function to update volume
function updateVolume(change) {
    currentVolume = Math.max(0, Math.min(100, currentVolume + change));
    backgroundMusic.volume = currentVolume / 100;
    volumeFill.style.width = `${currentVolume}%`;
    volumeText.textContent = `Volume: ${currentVolume}%`;
    
    // Add bounce animation to volume container
    const volumeContainer = document.querySelector('.volume-container');
    volumeContainer.classList.add('volume-bounce');
    setTimeout(() => {
        volumeContainer.classList.remove('volume-bounce');
    }, 500);
}

// Start playing music on first interaction
document.body.addEventListener('click', () => {
    if (backgroundMusic.paused) {
        backgroundMusic.play();
    }
}, { once: true });

// Modify updateMatchInfo to handle volume changes
function updateMatchInfo(score) {
    if (score === 1) {
        matchInfo[0]++;    //win
        updateVolume(10);  // Increase volume by 10%
    }
    if (score === -1) {
        matchInfo[1]++;   //lose
        updateVolume(-10); // Decrease volume by 10%
    }
    if (score !== 0) matchInfo[2]++;    //Increment round
    return matchInfo;
}

const buttons = document.querySelectorAll("button");
buttons.forEach(button => {button.addEventListener("click", playRound);});
buttons.forEach(button => {button.addEventListener("mouseover", changeHoverState);});
buttons.forEach(button => {button.addEventListener("mouseout", changeHoverState);});