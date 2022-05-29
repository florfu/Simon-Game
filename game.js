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
  if (started==false) {
    nextSequence()
  };
  started = true;
});

//handler function for button clicks
$(".btn").click(function() {
  //get id (colour) from button clicked
  var userChosenColour = this.id;
  //animate button clicked
  animatePress(userChosenColour);
  //play sound of button clicked by user
  playSound(userChosenColour);
  //store colour in userClickedPattern array
  userClickedPattern.push(userChosenColour);
  console.log(userClickedPattern);
});


//function that selects a random colour from buttonColours and adds it at the end of gamePattern
function nextSequence() {
  $("#level-title").text("Level "+level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  //button flash animation
  $("." + randomChosenColour).fadeOut(200).fadeIn(200);
  //adds randomChosenColour to the array gamePattern
  gamePattern.push(randomChosenColour);
  //play the sound for the button colour
  playSound(randomChosenColour);
  level++;
}

//Check answer function


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
