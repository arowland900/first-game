var $playerOne = $('.player-one-img')
var $playerTwo = $('.player-two-img')

var $gameboard = $('#gameboard')
var $startButton = $('#start-button')
var $timer = $('#timer')
var $score = $('#score')
var $water = $('.water')

var timeLeft = 99
var scoreNum = 0
var movementInterval
var p1left = false
var p1right = false
var p2left = false
var p2right = false

//Prevent moving window with Space and Arrow Keys
document.addEventListener("keydown", function(e) {
    // space and arrow keys
    if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
        e.preventDefault();
    }
}, false);
// when pressing key, character moves
$('body').on('keydown', function(event) {
    const key = event.key; // "ArrowRight", "ArrowLeft"
    if (940 > Number($playerOne.css("left").slice(0,-2))){
         if (key === "ArrowRight") {
            p1right = true
        }
    }
    if(Number($playerOne.css("left").slice(0,-2)) > 20) {
        if (key === "ArrowLeft") {
            p1left = true
        } 
    }
    if (940 > Number($playerTwo.css("left").slice(0,-2))){
        if (key === "c") {
            p2right = true
        }
    }
    if (Number($playerTwo.css("left").slice(0,-2)) > 20){
        if (key === "z") {
            p2left = true
        } 
    }
});
// when not pressing key, character does not move
$('body').on('keyup', function(event) {
    const key = event.key;
    if (key === "ArrowRight") {
        p1right = false
    }
    if (key === "ArrowLeft") {
        p1left = false
    } 
    if (key === "c") {
        p2right = false
    }
    if (key === "z") {
        p2left = false
    } 
})
// make rain fall from sky
function RainSimulator() {
    var $newRain = $('<div>').addClass('blue-box')
    $newRain.css({
        left: Math.random() * 930 + 10
    })
    $gameboard.append($newRain);
    var rainMovement = setInterval(function() {
        $newRain.css({top: '+=2.5px' });
        if(($newRain.offset().top + $newRain.height()) > $gameboard.offset().top + $gameboard.height()) {
            $newRain.remove()
            decrementer()
            clearInterval(rainMovement)
        } 
        else if ($newRain.offset().left < ($playerOne.offset().left + $playerOne.width()) &&
        $newRain.offset().left + $newRain.width() > $playerOne.offset().left &&
        $newRain.offset().top < ($playerOne.offset().top + $playerOne.height()) &&
        $newRain.offset().top + $newRain.height() > $playerOne.offset().top){
            $newRain.remove()
            incrementer()
            incrementer()
            clearInterval(rainMovement)
        }
        // else if ($newRain.offset().left < ($playerTwo.offset().left + $playerTwo.width()) &&
        // $newRain.offset().left + $newRain.width() > $playerTwo.offset().left &&
        // $newRain.offset().top < ($playerTwo.offset().top + $playerTwo.height()) &&
        // $newRain.offset().top + $newRain.height() > $playerTwo.offset().top){
        //     $newRain.remove()
        //     clearInterval(rainMovement)
        // }
    }, 10);
}
// make toxic sludge fall from sky
function DirtSimulator() {
    var $newDirt = $('<div>').addClass('yellow-box')
    $newDirt.css({
        left: Math.random() * 930 + 10
    })
    $gameboard.append($newDirt);
    var dirtMovement = setInterval(function() {
        $newDirt.css({top: '+=3px'});
        if(($newDirt.offset().top + $newDirt.height()) > $gameboard.offset().top + $gameboard.height()) {
            $newDirt.remove()
            decrementer()
            decrementer()
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
            clearInterval(dirtMovement)
        }
    }, 10);
}
// start the game!
function startGame() {
    $startButton.off("click", startGame)
    var moreDirt = setInterval(DirtSimulator, 2500)
    var moreRain = setInterval(RainSimulator, 800)
    var myTimer = setInterval(function(){
        timeLeft -= 1
        $timer.html('Time: '+ timeLeft)
        $timer.css({
            "animation-name": 'colorChange',
            'animation-duration': '90s',
            'animation-delay': '9s'
        });
        if (timeLeft === 0){
            if (scoreNum >= 100){
                winAlert()
            }
            else {
                loseAlert()
            }
            clearInterval(myTimer)
            clearInterval(moreDirt)
            clearInterval(moreRain)
            clearInterval(movementInterval)
            $('.blue-box').remove()
            $('.yellow-box').remove()
            $water.animate({height: 0})
            timeLeft = 99
            $timer.html('Time: '+ timeLeft)
            scoreNum = 0
            $score.html('Score: ' + scoreNum)
            $startButton.on("click", startGame)
        }
    },1000);
    movementInterval = setInterval(function(){
        if(p1right) $playerOne.css("left", "+=2.5")
        if($playerOne.css("left") == "940px") p1right = false

        if(p1left) $playerOne.css("left", "-=2.5")
        if($playerOne.css("left") == "10px") p1left = false

        if(p2right) $playerTwo.css("left", "+=2.5")
        if($playerTwo.css("left") == "940px") p2right = false

        if(p2left) $playerTwo.css("left", "-=2.5")
        if($playerTwo.css("left") == "10px") p2left = false
    }, 1)
}
$startButton.on("click", startGame)
//increment, decrement, and reset score
function incrementer (){
    scoreNum += 1 
    $score.html('Score: ' + scoreNum)
    $water.animate({height: scoreNum + '%'})
}
function decrementer (){
    scoreNum -= 1 
    if (scoreNum <= 0) scoreNum = 0
    $score.html('Score: ' + scoreNum)
    $water.animate({height: scoreNum + '%'})
}
function reset () {
    scoreNum -= 10
    if (scoreNum <= 0) scoreNum = 0
    $score.html('Score: ' + scoreNum)
}
// alert for win or loss
function winAlert () {
    alert(`Victory! Score: ${scoreNum}`)
} 
function loseAlert () {
    alert(`Not enough water collected :( Score: ${scoreNum}`)
}
