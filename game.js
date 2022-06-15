//var where the game pattern is gonna be stored
var gamePattern = [];

//game colours
var buttonColours = ["red", "blue", "green", "yellow"];

//var where the button's clicked id is being stored
var userClickedPattern = [];

//var that tracks keypresses
var started = false;

//var that tracks the game level
var level = 0;

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
  //get id (colour) from button clicked
  var userChosenColour = this.id;
  //animate button clicked
  animatePress(userChosenColour);
  //play sound of button clicked by user
  playSound(userChosenColour);
  //store colour in userClickedPattern array
  userClickedPattern.push(userChosenColour);
  //show index of last array element
  lastClickedIndex = userClickedPattern.length -1;
  checkAnswer(lastClickedIndex);
});


// this function runs when user finishes his turn
// selects a random colour from buttonColours and adds it at the end of gamePattern
function nextSequence() {
  //reset userClickedPattern
  userClickedPattern=[];
  //update level and title
  level++;
  $("#level-title").text("Level "+level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  //adds randomChosenColour to the array gamePattern
  gamePattern.push(randomChosenColour);
  //button flash animation
  $("." + randomChosenColour).fadeOut(200).fadeIn(200);
  //play the sound for the button colour
  playSound(randomChosenColour);
}

// function to start over game after user misses button
function startOver() {
  started = false;
  level = 0;
  gamePattern = [];
}

//Check answer function
function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel]===userClickedPattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(() => nextSequence(),1000);
    }
    else {
      console.log("not the last");
    }
  } else { // user fails
    playSound('wrong');
    $("body").addClass("red");
    setTimeout(function(){
      $("body").removeClass("red")
    },200);
    $("#level-title").text("Game Over, Press Any Key to Restart");
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
