
var gamePattern = []; // array where the game pattern is gonna be stored
var buttonColours = ["red", "blue", "green", "yellow"]; // game colours
var userClickedPattern = []; // array where button's clicked id is being stored
var started = false; // boolean that tracks if game is started
var level = 0; // tracks levels

//Start the game when a key is pressed
$(document).keydown(function() {
  if (started===false) {
    nextSequence()
  };
  started = true;
  return;
});

//handler function for users' button clicks
$(".btn").click(function() {
  var userChosenColour = this.id; //get id (colour) from button clicked
 
  animatePress(userChosenColour); //animate button clicked
  playSound(userChosenColour); //play sound of button clicked by user
  
  userClickedPattern.push(userChosenColour); //store clicked colour in userClickedPattern array
 
  lastClickedIndex = userClickedPattern.length -1; //show index of last array element
  checkAnswer(lastClickedIndex); // calls function that checks if answer is correct
});


// this function runs when user finishes his turn
// selects a random colour from buttonColours and adds it at the end of gamePattern
function nextSequence() {
  userClickedPattern=[]; // reset userClickedPattern
  level++; // update level
  $("#level-title").text("Level "+level); // update title

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);// adds randomChosenColour to the array gamePattern

  $("." + randomChosenColour).fadeOut(200).fadeIn(200); // button flash animation
  playSound(randomChosenColour); //play the sound for the button colour
}

// function to start over game after user misses button
function startOver() {
  started = false;
  level = 0;
  gamePattern = [];
}

//Check answer function
function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel]===userClickedPattern[currentLevel]) { // compares colur clicked with same index colour in gamePattern
    if (userClickedPattern.length === gamePattern.length) { // if answer is right & it's the last element of the array
      setTimeout(() => nextSequence(),1000);
    }
  } else { // user fails
    playSound('wrong');
    // background turns red animation
    $("body").addClass("red");
    setTimeout(function(){
      $("body").removeClass("red")
    },200);

    $("#level-title").text("Game Over, Press Any Key to Restart"); // change title to Game Over
    startOver(); // resets game variables
  }
}

//Play sound function
function playSound(name) {
  var audio = new Audio('sounds/'+name+'.mp3')
  audio.play()
}

//Adds animation to user clicks
function animatePress(currentColour) {
  $("#"+currentColour).addClass("pressed")
  setTimeout(function(){
      $("#"+currentColour).removeClass("pressed")
  },100);
}
