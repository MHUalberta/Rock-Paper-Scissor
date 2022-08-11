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

function playerSelection() {
    let selection;
    let flag = true;
    while (flag || (selection !== "rock" && selection !== "paper" && selection !== "scissor")) {
        if (flag) 
            flag = false;
        else 
            alert("Invalid Input"); //If the user reaches this point in the code again, then they provided invalid input.
        
        selection = prompt("Please choose: rock, paper, or scissor?");
        if (selection === null)
            return null;
        else
            selection = selection.toLowerCase();
    }
    return selection;
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
    
    if (score === 1)
        alert(`You Win! ${playerSelection} beats ${computerChoice}`);
    else if (score === -1)
        alert(`You Lose! ${playerSelection} loses to ${computerChoice}`);
    else
        alert(`Draw! You both picked ${playerSelection}`);
    
    return;
}

function playRound() {
    let selection = playerSelection();
    if (selection === null) {
        alert("U suck y did u quit");
        return;
    }
    let computerChoice = getComputerChoice(); 
    let score = checkWin(selection, computerChoice);
    showFeedback(selection, computerChoice, score);
    return score;
}

function game() {
    alert("You are now playing Rock Paper Scissor with a very intelligent and totally sentient AI. No losers here, first to reach 5 points wins!")
    let yourScore = 0;
    let computerScore = 0;
    let score;
    for (i=0; i<5; i++) {
        score = playRound();
        if (score === 1)
            yourScore += 1;
        else if (score === -1)
            computerScore += 1;
        else if (score === 0)
            i--;
        else    //If user quits
            return;
        alert(`You: ${yourScore}\nComputer: ${computerScore}`);
    }

    if (yourScore > computerScore)
        alert("CONGRATS, you won!")
    else
        alert("YOU LOST, you suck!")
    
    return;
}

game();