function getComputerChoice() {
    let randomNum = Math.random();
    randomNum = Math.floor(randomNum*3); //random integer between 0 and 2
    
    let computerChoice;
    switch (randomNum) {
        case 0: computerChoice = "Rock"; break;
        case 1: computerChoice = "Paper"; break;
        default: computerChoice = "Scissor";
    }

    return computerChoice;
}

function playerSelection() {
    let selection = prompt("Please choose: Rock, Paper, or Scissor?");
    while (selection !== "Rock" && selection !== "Paper" && selection !== "Scissor") {
        if (selection === null) {
            return;
        }
        alert("Invalid choice!");
        selection = prompt("Please choose: Rock, Paper, or Scissor?");
    }
    return selection;
}