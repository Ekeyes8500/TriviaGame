//VARIABLES
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var correct = 0;

var incorrect = 0;

var winvalue = 0;

var userChoice;

var choiceMade = false;

var currentQuestion;

var stage = 0;

var timerTracker;

var failTimer;


var question1 = ["Who commanded the first expedition to complete a circumnavigation (entire trip) around the globe?",
    "Christopher Columbus",
    "Ferdinand Magellan",
    "Alonso de Salazar",
    "Sebastián de Ocampo",
    2];

var question2 = ["Under which Roman Emperor was the Empire at its largest land size?",
    "Domitian",
    "Nero",
    "Augustus",
    "Trajan",
    4];

var question3 = ["In which continent was gunpowder first developed?",
    "Asia",
    "Africa",
    "South America",
    "Europe",
    1]

var question4 = ["In what year was Constantinople famously conquered by the Ottoman Empire?",
    "1453",
    "1492",
    "1865",
    "1519",
    1]

var question5 = ["In what year was the famous inventor, Nikola Tesla, born? (#boycottedison)",
    "1912",
    "1856",
    "1776",
    "1806",
    2]

//FUNCTIONS
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//placer function sets the question and answer into their respective locations in the document
function placement(x) {


    //array is set up specifically to make sure each element goes exactly where it needs to
    for (i = 0; i < x.length; i++) {
        if (i === 0) {

            //first is updated the question field
            $("#holdquestion").text(x[i]);


        }

        //this goes through and displays each answer
        else if (i < 5 && i > 0) {

            var newdiv = $("<div class='textclass answer text-center mx-auto answerborder'>" + x[i] + "</div>");

            //this sets the value for each, allowing us to check for a winner later

            newdiv.attr("data-answervalue", i)

            $("#holdanswer").append(newdiv);
        }
        //this sets what value is needed for a win
        else {

            winvalue = parseInt(x[i]);

            currentQuestion = (x[winvalue]);

            console.log(currentQuestion);

            console.log(winvalue);

        }

    }
    //sets up a timeout to fire if question is not answered in time
    failTimer = setTimeout(checkFail, 1000 * 25)
    choiceMade = false;

}

//this function is a timer that counts down from the seconds it is given (x)
function timer(x) {


    clearInterval(timerTracker);

    originalValue = x;

    newValue = x;

    $("#timer").text(newValue);

    timerTracker = setInterval(secondUpdate, 1000)

    function secondUpdate() {

        newValue = newValue - 1;

        $("#timer").text(newValue);



    }


}




//this function checks the user's answer against the correct one
function answerCheck() {
    clearInterval(failTimer);

    if (winvalue === userChoice) {

        console.log(correct);

        correct = correct + 1;

        stage = stage + 1;

        $("#holdquestion").append("<div class='textclass'>Smashing! " + currentQuestion + " is correct! Well done.</div>")



    }

    else {

        incorrect = incorrect + 1;

        stage = stage + 1;

        console.log(incorrect);

        $("#holdquestion").append("<div class='textclass'>Drats! You were incorrect! " + currentQuestion + " is the correct answer.</div>")

    }
    $(".answer").hide();

    setTimeout(stageChecker, 1000 * 6);
    timer(6);

}

//this function fires if no answer is made by the timeout period
function checkFail() {

    if (choiceMade === false) {

        clearInterval(failTimer);

        $(".answer").hide();

        $("#holdquestion").append("<div class='textclass'>You've run out of time, you lazy sod! " + currentQuestion + " was the correct answer.</div>")

        stage = stage + 1;

        incorrect = incorrect + 1;

        setTimeout(stageChecker, 1000 * 6);
        timer(6);

    }

}

function clickcheck() {
    //when one of the answers is clicked, it will run this function
    $(".answer").on("click", function () {

        userChoice = $(this).attr("data-answervalue")

        userChoice = parseInt(userChoice);

        console.log(userChoice);

        choiceMade = true;

        answerCheck();

    })

}
//this keeps the state of the game moving correctly
function stageChecker() {

    if (stage === 1) {

        placement(question2);

        timer(25);

        clickcheck();

    } else if (stage === 2) {

        placement(question3);

        timer(25);

        clickcheck();

    } if (stage === 3) {

        placement(question4);

        timer(25);

        clickcheck();

    }
    if (stage === 4) {

        placement(question5);

        timer(25);

        clickcheck();

    } if (stage === 5) {

        endGame();

    }


}

function endGame() {
    $("#timer").hide();

    $("#holdquestion").html("<div class='textclass'>You had " + correct + " answers correct, and " + incorrect + " answers incorrect.</div>")

    if (correct > 3) {

        $("#holdquestion").append("<div class='textclass'>Incredible! You will certainly be joining Robert Falcon Scott and his expedition that will absolutely, completely, no-question-about-it, not go wrong!</div>")
        $("#holdquestion").append("<a href='https://en.wikipedia.org/wiki/Terra_Nova_Expedition'>(Click Here!)</a>")
    } else {
        $("#holdquestion").append("<div class='textclass'>Well, with answers like that you're certainly no educated explorer. You will definitely not be joining the expedition.</div>")
        $("#holdquestion").append("<div class='textclass'>As horrible as that sounds, there are worse things... like actually joining Robert Falcon Scott on his expedition to the Arctic.</div>")
        $("#holdquestion").append("<a href='https://en.wikipedia.org/wiki/Terra_Nova_Expedition'>(Click Here!)</a>")


    }
}

//SCRIPT
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
window.onload = function () {

    //when start is clicked it will set up the initial question
    $("#start").on("click", function () {

        timer(25);

        placement(question1)

        $("#start").hide();
        clickcheck();
    })




}



