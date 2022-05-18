let colors = ["red", "blue", "green", "yellow"];
let pattern = [];
let userClickedPattern = [];

var started = false;
var level = 0;

$(document).on("keydown", function () {
  if (!started) {
    $("#level-title").text("Level " + level);
    start();
    started = true;
  }
});

function end() {
  level = 0;
  pattern = [];
  started = false;
}


function start() {
  var rand = Math.floor(Math.random() * 4);
  pattern.push(colors[rand]);
  var buttonFlash = "#"+colors[rand];
  $(buttonFlash).fadeOut(100).fadeIn(100);
  playSound(colors[rand]);
}

function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);
  start();
}

$(".btnn").on("click", function (event) {
  let buttonClicked = $(this).attr("id");
  userClickedPattern.push(buttonClicked);
  playSound(buttonClicked);
  animatePress(buttonClicked);
  isLevelPassed(userClickedPattern.length-1);
});

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(ID) {
  $("#"+ID).addClass("pressed");
  setTimeout(function () {
    $("#"+ID).removeClass("pressed");
  }, 90);
}

function isLevelPassed(index) {
  if(pattern[index] === userClickedPattern[index])
  {
    if (userClickedPattern.length === pattern.length){
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  }
  else {
    playSound("wrong");
    $("body").addClass("game-over");
    $("#level-title").text("Game Over, Press Any Key to Restart");

    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    end();
  }
}
