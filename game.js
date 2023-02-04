// Constants
var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 1;
var firstKeyPRess = true;

function nextSequence() {
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  console.log(gamePattern);
  gamePattern.forEach(function (color) {
    $("#" + color)
      .fadeOut(100)
      .fadeIn(100)
      .fadeOut(100)
      .fadeIn(100);
  });
}

function playSound(color) {
  var audio = new Audio("sounds/" + color + ".mp3");
  audio.play();
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function checkAnswer() {
  if (JSON.stringify(gamePattern) !== JSON.stringify(userClickedPattern)) {
    var audio = new Audio("sounds/wrong.mp3");
    $("#result-title").text("GAME OVER !!!! ");
    setTimeout(function () {
      location.reload(true);
    }, 3000);
    audio.play();
  } else {
    $("#result-title").text("Correct!");
    setTimeout(function () {
      levelReset();
    }, 3000);
  }
}

function levelReset() {
  this.userClickedPattern = [];
  $("#result-title").text("");
  level++;
  nextLevelChangeTitle();
}

function nextLevelChangeTitle() {
  nextSequence();
  $("#level-title").text("Level " + level);
}

$(document).ready(function () {
  $(document).keypress(function (event) {
    if (firstKeyPRess) {
      nextLevelChangeTitle();
      firstKeyPRess = false;
    }

    $(".btn").click(function () {
      var userChosenColor = this.id;
      userClickedPattern.push(userChosenColor);
      playSound(userChosenColor);
      animatePress(userChosenColor);
      if (userClickedPattern.length === level) {
              checkAnswer();
      }
      console.log(userClickedPattern);
    });
  });

});
