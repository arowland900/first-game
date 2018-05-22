console.log("working!")

var $playerOne = $('.player-one-img')
var $playerTwo = $('.player-two-img')

var $gameboard = $('#gameboard')
var $startButton = $('#start-button')
var $timer = $('#timer')
var $score = $('#score')

var timeLeft = 60
var scoreNum = 0

$(window).on('keydown', function(event) {
    const key = event.key; // "ArrowRight", "ArrowLeft", "ArrowUp", or "ArrowDown"
    if (930 > Number($playerOne.css("left").slice(0,-2)) && Number($playerOne.css("left").slice(0,-2)) > 10){
        if (key === "ArrowLeft") {
            $playerOne.css("left", "-=20")
        } 
        else if (key === "ArrowRight") {
            $playerOne.css("left", "+=20")
        }
    }
    else if (Number($playerOne.css("left").slice(0,-2)) === 930) {
        if (key === "ArrowLeft") {
            $playerOne.css("left", "-=20")
        } 
    }
    else if (Number($playerOne.css("left").slice(0,-2)) === 10) {
        if (key === "ArrowRight") {
            $playerOne.css("left", "+=20")
        }
    }
});


$(window).on('keydown', function(event) {
    const key = event.key; // "ArrowRight", "ArrowLeft", "ArrowUp", or "ArrowDown"
    if (940 > Number($playerTwo.css("left").slice(0,-2)) && Number($playerTwo.css("left").slice(0,-2)) > 10){
        if (key === "z") {
            $playerTwo.css("left", "-=30")
        } 
        else if (key === "c") {
            $playerTwo.css("left", "+=30")
        }
    }
    else if (Number($playerTwo.css("left").slice(0,-2)) === 940) {
        if (key === "z") {
            $playerTwo.css("left", "-=30")
        } 
    }
    else if (Number($playerTwo.css("left").slice(0,-2)) === 10) {
        if (key === "c") {
            $playerTwo.css("left", "+=30")
        }
    }
});

function RainSimulator() {
    var $newRain = $('<div>').addClass('blue-box')
    $newRain.css({
        left: Math.random() * 930
    })
    $gameboard.append($newRain);
    var rainMovement = setInterval(function() {
        $newRain.css({top: '+=1px'});
        if(($newRain.offset().top + $newRain.height()) > $gameboard.offset().top + $gameboard.height()) {
            $newRain.remove()
            clearInterval(rainMovement)
        } 
        else if ($newRain.offset().left < ($playerOne.offset().left + $playerOne.width()) &&
        $newRain.offset().left + $newRain.width() > $playerOne.offset().left &&
        $newRain.offset().top < ($playerOne.offset().top + $playerOne.height()) &&
        $newRain.offset().top + $newRain.height() > $playerOne.offset().top){
            $newRain.remove()
            incrementer()
            clearInterval(rainMovement)
        }
        else if ($newRain.offset().left < ($playerTwo.offset().left + $playerTwo.width()) &&
        $newRain.offset().left + $newRain.width() > $playerTwo.offset().left &&
        $newRain.offset().top < ($playerTwo.offset().top + $playerTwo.height()) &&
        $newRain.offset().top + $newRain.height() > $playerTwo.offset().top){
            $newRain.remove()
            clearInterval(rainMovement)
        }
    }, 10);
}

function DirtSimulator() {
    var $newDirt = $('<div>').addClass('yellow-box')
    $newDirt.css({
        left: Math.random() * 930
    })
    $gameboard.append($newDirt);
    var dirtMovement = setInterval(function() {
        $newDirt.css({top: '+=2px'});
        if(($newDirt.offset().top + $newDirt.height()) > $gameboard.offset().top + $gameboard.height()) {
            $newDirt.remove()
            clearInterval(dirtMovement)
        } 
        else if ($newDirt.offset().left < ($playerOne.offset().left + $playerOne.width()) &&
        $newDirt.offset().left + $newDirt.width() > $playerOne.offset().left &&
        $newDirt.offset().top < ($playerOne.offset().top + $playerOne.height()) &&
        $newDirt.offset().top + $newDirt.height() > $playerOne.offset().top){
            $newDirt.remove()
            reset()
            clearInterval(dirtMovement)
        }
        else if ($newDirt.offset().left < ($playerTwo.offset().left + $playerTwo.width()) &&
        $newDirt.offset().left + $newDirt.width() > $playerTwo.offset().left &&
        $newDirt.offset().top < ($playerTwo.offset().top + $playerTwo.height()) &&
        $newDirt.offset().top + $newDirt.height() > $playerTwo.offset().top){
            $newDirt.remove()
            incrementer()
            incrementer()
            clearInterval(dirtMovement)
        }
    }, 10);
}

function AddWater() {
    var $newWater = $('<div>').addClass('water')
    // $newDirt.css({
    //     bottom: Math.random() * 930
    // })
    $bucket.append($newDirt);
    
}
  
function startGame() {
    $startButton.off("click", startGame)
    var moreDirt = setInterval(DirtSimulator, 3300)
    var moreRain = setInterval(RainSimulator, 1500)
    var myTimer = setInterval(function(){
        timeLeft -= 1
        $timer.html('Time Left: '+ timeLeft)
        if (timeLeft === 0){
            if (scoreNum >= 40){
                winAlert()
            }
            else {
                loseAlert()
            }
            clearInterval(myTimer)
            clearInterval(moreDirt)
            clearInterval(moreRain)
            timeLeft = 60
            $timer.html('Time Left: '+ timeLeft)
            scoreNum = 0
            $score.html('Score: ' + scoreNum)
            $startButton.on("click", startGame)
        }
    },1000);
}
$startButton.on("click", startGame)

function incrementer (){
    scoreNum += 1 
    $score.html('Score: ' + scoreNum)
}
function decrementer (){
    scoreNum -= 1 
    $score.html('Score: ' + scoreNum)
}
function reset () {
    scoreNum = 0
    $score.html('Score: ' + scoreNum)
}
function winAlert () {
    alert(`You collected ${scoreNum} clean water units! You saved the day!`)
} 
function loseAlert () {
    alert(`You collected ${scoreNum} clean water units.  Not enough.  MOOGLEBOOK WINS.`)
}


