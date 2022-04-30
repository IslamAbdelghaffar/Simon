/* header */
var level = 0;
var start = false;

/* save user Clicked Pattern */
var userClickedPattern = [];

/* save game random Pattern */
var randomChosenColour;
var gamePattern = [];

/* button colors */
var buttonColours = ["red", "blue", "green", "yellow"];

$(document).keypress(function(event) {
  if (!start) {
    nextSquence();
    start = true;
  }
});

/* start the game */



/* get user clicked button */


$(".btn").click(function(event) {
  var userChosenColour;
  userChosenColour = event.target.id;
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  console.log("user: " + userClickedPattern);


  if (equals()){

    if (userClickedPattern.length == gamePattern.length) {
      /* delete all the user old inputs */
      userClickedPattern = [];
      setTimeout(nextSquence(), 2000);

    }
  } else {
    gameOver();
  }

})




/*create random numbers */
function nextSquence() {
  var randomNumber = Math.floor((Math.random() * 4));
  level++;
  $("#level-title").text("level   " + level);
  randomChosenColour = buttonColours[randomNumber]
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

  var audio = new Audio("sounds/" + randomChosenColour + ".mp3");
  audio.play();


};
/* GAME over */
function gameOver() {
  console.log("game over");



  playSound("wrong");
  $("body").addClass("game-over");
  $("#level-title").text("game over, press any key to start again");
  level = 0;
  gamePattern=[];
  userClickedPattern=[];
  setTimeout(function() {
    $("body").removeClass('game-over');
  }, 100);

  start = false;
}

/* equal  */
function equals() {
  console.log("game :  " + gamePattern);
  console.log("user :  " + userClickedPattern);

  for (var i = 0; i < userClickedPattern.length; i++) {

    if (gamePattern[i] !== userClickedPattern[i]) {

      return false;
    }
  }

  return true;
}

/* play sound */
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

/* animate press */
function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColour).removeClass('pressed');
  }, 100);
}
