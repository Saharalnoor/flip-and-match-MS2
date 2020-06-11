let maximumTime = 60,
    flipped_cards = 0,
    timeCounter = 0,
    counterFunc,
    first_card,
    second_card,
    first_value,
    clicks = 0,
    second_value,
    matched = 0,
    gameIsRunning = false,
    firstRun = true,
    disabled_cards = [],
    moves = document.querySelector(".moves"),
    btn = document.querySelector(".btn"),
    time = document.querySelector(".time"),
    gameover_cont = document.querySelector(".game-over-container"),
    gameover_header = document.querySelector(".header"),
    gameover_details = document.querySelector(".details"),
    gameover_play_again = document.querySelector(".play_again"),
    cards = document.querySelectorAll(".card");


    //Start game
    function play(){

    if((!gameIsRunning) && (!firstRun)){

        gameIsRunning = true;
        return resume();

    } else if(!firstRun){

        gameIsRunning = false;
        return pause();

    }

    firstRun = false;
    gameIsRunning = true;
    this.innerHTML = "PAUSE";
