let bg_sound_path = "assets/audio/bg-Music.mp3",
    victory_sound_path = "assets/audio/victory-sound.wav",
    match_sound_path = "assets/audio/match-sound.wav",
    gameover_sound_path = "assets/audio/fail-sound.wav",
    flip_sound_path = "assets/audio/flip-sound.wav",
    maximumTime = 60,
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
    bg_audio = document.querySelector(".bg_audio"),
    flip_audio = document.querySelector(".flip_audio"),
    activity_audio = document.querySelector(".activity_audio"),
    victory_cont = document.querySelector(".victory-container"),
    victory_header = document.querySelector(".v_header"),
    victory_details = document.querySelector(".v_details"),
    victory_play_again = document.querySelector(".v_play_again"),
     cards = document.querySelectorAll(".card");


    // refresh the page when the game is over after pressing on "PLAY AGAIN"
function reset(){

   window.location.href = window.location.href;

}


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

  //shuffle the cards
  shuffle();

  // add click event listeners
  addEvent()

  // start the time counter
  count()

  bg_audio.src = bg_sound_path;
  bg_audio.currentTime = 23;
  bg_audio.play();

  bg_audio.volume = 0.3;
  activity_audio.volume = 1;

}


// shuffling function
function shuffle(){
   cards.forEach((card)=>{card.style.order = Math.floor(Math.random()*10)});
   return;
}


// function which listens for click events on cards
function addEvent(){

    // add click event listeners to the cards and attach the checkMatch function to it
    cards.forEach((card)=>{card.addEventListener("click",checkMatch)});

    // remove click event listener to the already matched cards
    if(disabled_cards.length > 0){
        disabled_cards.forEach((card)=>{
            card.removeEventListener("click",checkMatch);
        })
    }

    return;

}


// lock the cards to wait for the flipped cards to flip back
function lockCards(){
    cards.forEach((card)=>{card.removeEventListener("click",checkMatch)});
    return;
}




// function which checks for match
function checkMatch(){

    flip_audio.src = flip_sound_path;
    flip_audio.play();

    setTimeout(() => {
        flip_audio.pause();
    }, 300);

    clicks++;

    moves.innerHTML ="Moves: <span>"+clicks+"</span>";

    // flip the card
    this.classList.add("flip");

    // show the image that was hidden under the clicked card
    document.querySelector(".card-"+this.dataset.id).classList.add("show");

    if(flipped_cards == 0){
        first_card = this;
        flipped_cards++;

        return;
    }

    // lock the cards and wait until the cards flip back
    lockCards();


    flipped_cards = 0;
    second_card = this;

    // get the value of first clicked card and second clicked card
    first_value = first_card.dataset.win;
    second_value = second_card.dataset.win;

    if(first_value == second_value){
       
        disabled_cards.push(first_card);
        disabled_cards.push(second_card);

        if(matched == 5) return victory();

        bg_audio.pause();
        activity_audio.src = match_sound_path;
        activity_audio.play();

        matched++;
        first_card.removeEventListener("click",checkMatch);
        second_card.removeEventListener("click",checkMatch);

        // unlock the cards after 2 seconds if its a match
        setTimeout(function(){
            bg_audio.play();
            addEvent();
        },2000);

    } else {

        // flip back the two cards after 1 second if its not a match
        setTimeout(() => {

            first_card.classList.remove("flip");
            second_card.classList.remove("flip");

            // hide the images under the flipped cards
            document.querySelector(".card-"+first_card.dataset.id).classList.remove("show");
            document.querySelector(".card-"+second_card.dataset.id).classList.remove("show");

            //unlock cards after flipping back the cards
            addEvent();

        }, 1000);
        
    }

    return;

}


// pause the game when playing
function pause(){
    bg_audio.pause();
    btn.innerHTML = "RESUME";
    clearInterval(counterFunc);
    cards.forEach((card)=>{card.removeEventListener("click",checkMatch)});
    return;
}


// resume the game if it was paused
function resume(){
    bg_audio.play();
    btn.innerHTML = "PAUSE";
    count();
    addEvent();
    return;
}


function game_over(){

    clearInterval(counterFunc);

    bg_audio.pause();
    activity_audio.src = gameover_sound_path;
    activity_audio.play();

    gameover_cont.style.left = 0;
    gameover_cont.style.top = 0;

    gameover_header.innerHTML = "GAME OVER !!";

    if(timeCounter < 60){
        gameover_details.innerHTML = timeCounter+" SEC |  "+clicks+" MOVES";
      } else {
        gameover_details.innerHTML = (Math.floor(timeCounter/60))+" MIN, "+(timeCounter%60)+" SEC | "+clicks+" MOVES";
    }

    btn.innerHTML = "PLAY";
    cards.forEach((card)=>{card.removeEventListener("click",checkMatch)});

    gameover_play_again.onclick = reset;

    return;
}


function victory(){

    clearInterval(counterFunc);

    bg_audio.pause();
    activity_audio.src = victory_sound_path;
    activity_audio.play();

    victory_cont.style.left = 0;
    victory_cont.style.top = 0;

    victory_header.innerHTML = "CONGRATULATIONS !!";

    if(timeCounter < 60){
        victory_details.innerHTML = "YOU'VE WON IN "+ timeCounter+" SEC WITH  "+clicks+" MOVES";
      } else {
        victory_details.innerHTML = "YOU'VE WON IN"+(Math.floor(timeCounter/60))+" MIN "+(timeCounter%60)+" SEC WITH "+clicks+" MOVES";
    }

    btn.innerHTML = "PLAY";
    cards.forEach((card)=>{card.removeEventListener("click",checkMatch)});

    victory_play_again.onclick = reset;

    return;

}


function count(){

 counterFunc = setInterval(()=>{

   timeCounter++;
    
    if(timeCounter < 60){
        time.innerHTML = "Time: <span> "+timeCounter+" sec </span>";
    } else {
        time.innerHTML = "Time: <span> "+(Math.floor(timeCounter/60))+" min, "+(timeCounter%60)+" sec </span>";
    }

    if((timeCounter == maximumTime)) return game_over();
    

 },1000);

}


btn.onclick = play;
bg_audio.onended = function(){
    this.currentTime = 0;
    this.play();
}

