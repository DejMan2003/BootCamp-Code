//$("h1").click(function()
//{
 // $("h1").text("Hey Deji!")
//}) Debugger Code.

var gamePattern = [];
var userClickedPattern = [];

var buttonColours = ["red","blue","green","yellow"];
var level = 0;
var started = false;

$(document).keypress(function () {
  if (!started) {
    $("#level-title").text("Level" + level);
    nextSequence();
    started = true;
  }
});

$(".btn").click(function()
{
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  //console.log(userClickedPattern);
  checkAnswer(userClickedPattern.length-1);

});

function nextSequence()
{
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber =  Math.floor(Math.random() * 4);
  randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomChosenColour);
  

}

function playSound(name){
  var audio = new Audio("sounds/" + name + ".mp3");
 audio.play;  
}

function animatePress(currentColour)
{
$("#" + currentColour).click().addClass("pressed");
setTimeout(()=> function(){
$("#" + currentColour).removeClass("pressed");
},100 );
}

checkAnswer(currentLevel)
{
if(userClickedPattern[currentLevel] == gamePattern[currentColour])
  {
    console.log("success");
    console.log(userClickedPattern[currentLevel] + gamePattern[currentLevel]);
  }
  else if(userClickedPattern.length == gamePattern.length)
  {  setTimeout(()=> function()
  {
    nextSequence();
  }, 1000);
  }
  else
  {
    console.log("wrong");
    playSound("wrong");
    $("h1").text("Game Over, Press Any Key to Restart.");
    $("body").addClass("game-over");
    setTimeout(()=> function()
    {
      $("body").removeClass("game-over");
    },200);
   
    startOver();
  }
}

startOver()
{
  level = 0;
  gamePattern = [];
  started = false;
}
