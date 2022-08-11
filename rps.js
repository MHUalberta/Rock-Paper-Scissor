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
