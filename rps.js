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
            return;
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