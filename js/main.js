/*global $:false */
/*jslint devel: true, browser:true*/

var createjs;
var soundLoaded = false;
var soundOn = false;
var heartsSound = "Hearts Sound";
var diamondsSound = "Diamonds Sound";
var clubsSound = "Clubs Sound";
var spadesSound = "Spades Sound";

var scoreOn = false;

function loadSound() {
    /*jshint strict: false*/
    createjs.Sound.registerSound("audio/hearts.mp3", heartsSound);
    createjs.Sound.registerSound("audio/diamonds.mp3", diamondsSound);
    createjs.Sound.registerSound("audio/clubs.mp3", clubsSound);
    createjs.Sound.registerSound("audio/spades.mp3", spadesSound);   
}

function playSound(target){
    if(target === "heart"){
        createjs.Sound.play(heartsSound);
    } else if (target === "diamond"){
        createjs.Sound.play(diamondsSound);
    } else if (target === "club"){
        createjs.Sound.play(clubsSound);
    } else {
        createjs.Sound.play(spadesSound);
    }
}

var main = function () {
  
    var newTrump;
    var currentTrump = 'undefined';
    var score1;
    var score2;

  //clicking a suit removes trump if previously set
  //and sets new 
  $('.suit').click(function(){
    
	//sets newTrump to whatever was just clicked
    newTrump = $(this).attr('id');
    
    //did you click to remove trump from a .suit?
    if(newTrump === currentTrump){   
    	//then remove trump and set currentTrump to nothing
    	$('#'+newTrump).removeClass("trump", 100);
    	currentTrump = 'undefined';
    } else {
        //remove .trump from the prevTrump
    	clear();
    	//add .trump to a .suit
        $('#'+newTrump).addClass("trump", 100);
        if (soundOn) { 
            playSound(newTrump);
        }
        //set currentTrump to newTrump for comparison in next click
        currentTrump = newTrump;
    }
  });
  
  $('#clr').click(function(){
	  clear();
	  currentTrump = 'undefined';
  });

  var clear = function(){
      $('#'+currentTrump).removeClass("trump", 100);
  };


  $('#whatIs').click(function(){
	 $('#whatIsP').slideToggle(200); 
  });
    
  $('#info').click(function(){
      $('#infoP').slideToggle(200); 
  });
  
  $('.hide').click(function(){
      $(this).parent().slideToggle(200); 
  });

    $('#soundIcon').click(function(){
        if(!soundLoaded){
            loadSound();
            soundLoaded = true;
        }
        
        if(soundOn){
            soundOn = false;
            $(this).attr("src", "img/mute.png");
        } else {
            soundOn = true;
            $(this).attr("src", "img/speaker.png");
        }
    });
    
    $("#scoreIcon").click(function(){
    
        if(scoreOn === false){
            $('.scoreboard').animate({opacity: 1});
            scoreOn = true;
        } else {
            $('.scoreboard').animate({opacity: 0});
            scoreOn = false;
        }
    });
    
    $('.scoreButton').click(function(){
        var currentPts = parseInt($(this).parent().find('div').text());
        var newPts = parseInt($(this).data("value"));
        
        if(newPts > 0) {
            currentPts += newPts;
            updateScore(this, currentPts);
        } else {
            currentPts = 0;
            updateScore(this, currentPts);
        }
    });    
};

function updateScore(target, currentPts){
    if (currentPts > 9) {
        currentPts = 0;
    }
    $(target).parent().find('div').text(currentPts);
}


$(document).ready(main);