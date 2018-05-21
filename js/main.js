console.log("working!")

var $playerOne = $('.player-one-img')
var $playerTwo = $('.player-two-img')

var $gameboard = $('gameboard')

// var keys = {}

// $(document).keydown(function (e) {
//     keys[e.jwhich] = true;
    
//     setInterval(printKeys, 1000);
// });




$(window).on('keydown', function(event) {
    const key = event.key; // "ArrowRight", "ArrowLeft", "ArrowUp", or "ArrowDown"
    if (930 > Number($playerOne.css("left").slice(0,-2)) && Number($playerOne.css("left").slice(0,-2)) > 10){
        if (key === "ArrowLeft") {
            $playerOne.css("left", "-=10")
        } 
        else if (key === "ArrowRight") {
            $playerOne.css("left", "+=10")
        }
    }
    else if (Number($playerOne.css("left").slice(0,-2)) === 930) {
        if (key === "ArrowLeft") {
            $playerOne.css("left", "-=10")
        } 
    }
    else if (Number($playerOne.css("left").slice(0,-2)) === 10) {
        if (key === "ArrowRight") {
            $playerOne.css("left", "+=10")
        }
    }
    
});

$(window).on('keydown', function(event) {
    const key = event.key; // "ArrowRight", "ArrowLeft", "ArrowUp", or "ArrowDown"
    if (940 > Number($playerTwo.css("left").slice(0,-2)) && Number($playerTwo.css("left").slice(0,-2)) > 10){
        if (key === "z") {
            $playerTwo.css("left", "-=15")
        } 
        else if (key === "c") {
            $playerTwo.css("left", "+=15")
        }
    }
    else if (Number($playerTwo.css("left").slice(0,-2)) === 940) {
        if (key === "z") {
            $playerTwo.css("left", "-=15")
        } 
    }
    else if (Number($playerTwo.css("left").slice(0,-2)) === 10) {
        if (key === "c") {
            $playerTwo.css("left", "+=15")
        }
    }
});


// $(window).on('keydown', function(event) {
//     const key = event.key; // "ArrowRight", "ArrowLeft", "ArrowUp", or "ArrowDown"
//     if (key === "z") {
//         $playerTwo.css("left", "-=10")
//     } 
//     else if (key === "c") {
//         $playerTwo.css("left", "+=10")
//     }
// });


// function moverFunc(){
//     let position = $playerOne.css('left');
//     // debugger
//     if (!$playerOne.hasClass('flip')){
//         $playerOne.css("left", "-=10")
//     }
//     if ($playerOne.css("left") === "20px"){
//         $playerOne.toggleClass('flip')
//     }
//     if ($playerOne.hasClass('flip')){
//         $playerOne.css("left", "+=10")
//     }
//     if ($playerOne.css("left") === "920px"){
//         $playerOne.toggleClass('flip')
//     }
//     // setTimeout(moverFunc, 30);
// }
// // moverFunc();

// function moverFuncTwo(){
//     if (!$playerTwo.hasClass('flip')){
//         $playerTwo.css("left", "+=10")
//     }
//     if ($playerTwo.css("left") === "920px"){
//         $playerTwo.toggleClass('flip')
//     }
//     if ($playerTwo.hasClass('flip')){
//         $playerTwo.css("left", "-=10")
//     }
//     if ($playerTwo.css("left") === "20px"){
//         $playerTwo.toggleClass('flip')
//     }
//     setTimeout(moverFuncTwo, 30);
// }
// // moverFuncTwo();