var buttonColors = ["red" , "blue" , "green" , "yellow"];
var gamepattern = [];
var userClickedPattern = [];
var level = 0;

var start = false;
$("*").on('keydown' , function(){
    if(start === false){
        nextSequence();
        start = true;
    }
});

$(".btn").on('click' , function (){
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animateColor(userChosenColor);
    checkAnswer(userClickedPattern.length-1);
});

function playSound(name){
    var sound = new Audio("sounds/" + name + ".mp3");
    sound.play();
}

function animateColor(currentColor){
    $("#" + currentColor).addClass("pressed");
    setTimeout(function(){
        $("#" + currentColor).removeClass("pressed");
    },100);
}

function nextSequence(){
    userClickedPattern = [];
    level++;

    var randomNumber = Math.random();
    randomNumber = Math.round(randomNumber*4);
    
    var randomChosenColor = buttonColors[randomNumber];
    gamepattern.push(randomChosenColor);

    $("h1").text("level "+level);

    $("#"+randomChosenColor).fadeOut(100).fadeIn(100);
    
    playSound(randomChosenColor);

}

function checkAnswer(currentlevel){
   if(userClickedPattern[currentlevel] === gamepattern[currentlevel]){
       if(userClickedPattern.length === gamepattern.length){
           setTimeout(function(){
               nextSequence();
           },1000);
       }
   }
   else{
       var wrong = new Audio("sounds/wrong.mp3")
       wrong.play();
       $("body").addClass("game-over");
       setTimeout(function(){
        $("body").removeClass("game-over");
       },200);
       $("h1").text("Game Over, Press Any Key to Restart");
       startOver();
   }
}

function startOver(){
    level = 0;
    gamepattern = [];
    start = false;
}
