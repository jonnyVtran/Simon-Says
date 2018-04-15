var greenSound= new Audio("https://s3.amazonaws.com/freecodecamp/simonSound1.mp3");
var redSound= new Audio("https://s3.amazonaws.com/freecodecamp/simonSound2.mp3");
var yellowSound= new Audio("https://s3.amazonaws.com/freecodecamp/simonSound3.mp3");
var blueSound= new Audio("https://s3.amazonaws.com/freecodecamp/simonSound4.mp3");
var on=false;
var strict=false;
var user=[];
var sequence=[];
var count=0;
var correct=true;
var start=false;

//turnOn program, if turned off, will reset all values
function turnOn(){
  if(!on)
    on=true;
  else{
    on=false;
    strict=false;
    user=[];
    sequence=[];
    count=0;
    start=false;
    $("#count").html("Count:00");
  }
}

//if you mess up in strict mode, resets to one and new pattern
function useStrict(){
  if(!strict){
    strict=true;
    user=[];
    sequence=[];
    count=0;
  }
  else{
    strict=false;
    user=[];
    sequence=[];
    count=0;
  }
  if(on)
    playGame();
}

function startGame(){
  if(on&&start===false){
    start=true;
    user=[];

    count++;
    if(count<10)
      $("#count").html("Count:0"+count);
    else
      $("#count").html("Count:"+count);

    var randColor=Math.ceil(Math.random()*4);
    sequence.push(randColor);
    playSounds();

  }
}

//checks if game is on and user is correct in simon says. if correct, adds to counter, adds new part to sequence and plays sounds
function playGame(){
  if(on){
    start=true;
    user=[];

    count++;
    if(count<10)
      $("#count").html("Count:0"+count);
    else
      $("#count").html("Count:"+count);

    var randColor=Math.ceil(Math.random()*4);
    sequence.push(randColor);
    playSounds();

  }
}

//loops through user array, to see if user presses are correct so far
function checkCorrect(){
  var check=true;
  for(var i=0;i<user.length;i++){
    if(sequence[i]!==user[i])
      check=false;
  }
  return check;
}

//plays sounds in sequence. calls first sound after second and starts loop to iterate through the rest.
function playSounds(){
    var length=sequence.length;

    var i=0, howMany=length;
  function delay(){
    if(sequence[i]===1)
      flashGreen();
    else if(sequence[i]===2)
      flashRed();
    else if(sequence[i]===3)
      flashYellow();
    else if(sequence[i]===4)
      flashBlue();
    i++;
    if(i<howMany){
      setTimeout(delay,1000);
    }
  }
  setTimeout(delay,1000);
}

function winGame(){
    $("#count").html("Winner!");
    setTimeout(function(){
      user=[];
      sequence=[];
      count=0;
      $("#count").html("Count:00");
    },3000);
  start=false;
}

function strictFail(){
    user=[];
    sequence=[];
    count=1;

    $("#count").html("Count:01");

    var randColor=Math.ceil(Math.random()*4);
    sequence.push(randColor);
}

//flashes green color and plays sound
function flashGreen(){
  if(on){
    greenSound.play();
    $("#topLeftButton").toggleClass("addGreenFlash");
    var green=setTimeout(function(){
      $("#topLeftButton").toggleClass("addGreenFlash");
    },500);
  }
}

//will check if user is correct so far. if yes and the whole sequence completed, playGame to add count and add another to the sequence. if checkCorrect is not correct thus far, must reinput whole sequence after sounds are played again
function green(){
  if(on){
  flashGreen();
  user.push(1);
  if(sequence.length===20&&sequence[19]===user[19])
    winGame();
  else if(checkCorrect()&&sequence.length===user.length){
    playGame();
  }
  else if(!checkCorrect()){
    user=[];
  $("#count").html("Count:!!");
    setTimeout(function(){
      if(count<10)
        $("#count").html("Count:0"+count);
      else
        $("#count").html("Count:"+count);
      if(strict)
        strictFail();
    },1000);
  playSounds();
  }
  }
}

function flashRed(){
  if(on){
    redSound.play();
    $("#topRightButton").toggleClass("addRedFlash");
    var red=setTimeout(function(){
      $("#topRightButton").toggleClass("addRedFlash");
    },500);
  }
}

function red(){
  if(on){
    flashRed();
        user.push(2);
        if(sequence.length===20&&sequence[19]===user[19])
          winGame();
        else if(checkCorrect()&&sequence.length===user.length){
          playGame();
        }
        else if(!checkCorrect()){
          user=[];
    $("#count").html("Count:!!");
    setTimeout(function(){
      if(count<10)
        $("#count").html("Count:0"+count);
      else
        $("#count").html("Count:"+count);
      if(strict)
        strictFail();
    },1000);
          playSounds();
        }
  }
}

function flashYellow(){
  if(on){
    yellowSound.play();
    $("#bottomLeftButton").toggleClass("addYellowFlash");
    var yellow=setTimeout(function(){
      $("#bottomLeftButton").toggleClass("addYellowFlash");
    },500);
  }
}

function yellow(){
  if(on){
      flashYellow();
        user.push(3);
        if(sequence.length===20&&sequence[19]===user[19])
          winGame();
        else if(checkCorrect()&&sequence.length===user.length){
          playGame();
        }
        else if(!checkCorrect()){
          user=[];
    $("#count").html("Count:!!");
    setTimeout(function(){
      if(count<10)
        $("#count").html("Count:0"+count);
      else
        $("#count").html("Count:"+count);
      if(strict)
        strictFail();
    },1000);
          playSounds();
        }
  }
}

function flashBlue(){
  if(on){
    blueSound.play();
    $("#bottomRightButton").toggleClass("addBlueFlash");
    var yellow=setTimeout(function(){
      $("#bottomRightButton").toggleClass("addBlueFlash");
    },500);
  }
}

function blue(){
  if(on){
        user.push(4);
        if(sequence.length===20&&sequence[19]===user[19])
          winGame();
        else if(checkCorrect()&&sequence.length===user.length){
          playGame();
        }
        else if(!checkCorrect()){
          user=[];
    $("#count").html("Count:!!");
    setTimeout(function(){
      if(count<10)
        $("#count").html("Count:0"+count);
      else
        $("#count").html("Count:"+count);
      if(strict)
        strictFail();
    },1000);
          playSounds();
        }
  flashBlue();
  }
}
