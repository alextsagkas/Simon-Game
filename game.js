const buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var clicks = 0;

$(".start-button").click(keyHandler);
$(".btn").click(clickHandler);

function keyHandler(event) {
  event.preventDefault();

  if (level === 0) {
    nextSequence();
    $(".start-button").text("Start");
  }
}

function nextSequence() {
  $("h2").remove();

  clicks = 0;
  level++;
  userClickedPattern = [];

  if (level > 0) {
    $(".start-button").addClass("hidden");
  }
  $("h1").text(`Level ${level}`);

  const randomNumber = Math.floor(Math.random() * 4);
  const randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  $(`.${randomChosenColor}`).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);
}

function clickHandler(event) {
  event.preventDefault();
  clicks++;

  if (level === 0) {
    $("h1").text("Press the Start Button to Start!!!");
    return;
  }

  var id = event.currentTarget.id;
  animatePress(id);
  playSound(id);

  var userChosenColor = id;
  console.log(id);
  userClickedPattern.push(userChosenColor);

  checkAnswer(level);
}

function playSound(name) {
  const audioElement = new Audio(`./sounds/${name}.mp3`);
  audioElement.play();
}

function animatePress(currentColor) {
  $(`.${currentColor}`).addClass("pressed");
  setTimeout(() => {
    $(`.${currentColor}`).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel) {
  var answer = true;

  for (var i = 0; i < currentLevel; i++) {
    if (i + 1 <= clicks && gamePattern[i] !== userClickedPattern[i]) {
      console.log(gamePattern[i], userClickedPattern[i], i);
      answer = false;

      $("h1").text("You Lost!");
      $(".start-button").removeClass("hidden");
      $(".start-button").text("Restart");
      $("h1").after("<h2 class='h1'>Press the Restart Button to Restart</h2>");
      $("body").addClass("game-over");
      playSound("wrong");
      setTimeout(() => {
        $("body").removeClass("game-over");
      }, 100);

      $("button").click(function () {});

      startOver();
    }
  }

  if (answer && clicks === i) {
    setTimeout(() => {
      nextSequence();
    }, 1000);
  }
}

function startOver() {
  level = 0;
  gamePattern = [];
}
