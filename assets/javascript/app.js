$(document).ready(function () {
    // create triviaQuestions object.
    var triviaQuestions = [
        {
            question: 'What year did the movie "Doctor Zhivago" come out?',
            answers: ["1965", "1962", "1973", "1970"],
            correctAnswer: "1965"
        },
        {
            question: 'Who is the main character in the movie "12 Monkeys"?',
            answers: ["Denzel Washington", "Ryan Gosling", "Bruce Willis", "Jim Carey"],
            correctAnswer: "Bruce Willis"
        },
        {
            question: 'What state does the 1993 western film "Tombstone" take place?',
            answers: ["Texas", "Arizona", "New Mexico", "California"],
            correctAnswer: "Arizona"
        },
        {
            question: 'Who directed the movie "The Hateful Eight"?',
            answers: ["Steven Spielberg", "Christopher Nolan", "Clint Eastwood", "Quentin Tarantino"],
            correctAnswer: "Quentin Tarantino"
        },
        {
            question: "Which western film won an award for Best Picture?",
            answers: ["In Old Arizona", "No Country For Old Men", "The Alamo", "StageCoach"],
            correctAnswer: "No Country For Old Men"
        },
        {
            question: 'Who directed and played in the western "Unforgiven"?',
            answers: ["Clint Eastwood", "Gene Hackman", "Val Kilmer", "Kurt Russell"],
            correctAnswer: "Clint Eastwood"
        },
        {
            question: 'What year did the first episode of the western tv series "Deadwood" air?',
            answers: ["2000", "2006", "2003", "2004"],
            correctAnswer: "2004"
        },
        {
            question: 'What year did the movie "Once Upon A Time In The West" come out?',
            answers: ["1968", "1960", "1965", "1958"],
            correctAnswer: "1968"
        },

        {
            question: 'Who is the main character in the western film "Django Unchained"?',
            answers: ["Chistoph Waltz", "Leonardo DiCaprio", "Jamie Foxx", "Samuel L. Jackson"],
            correctAnswer: "Jamie Foxx"
        }
    ];
    // create array of image links to images folder
    var winImages = [
        "./assets/images/winning1.jpeg",
        "./assets/images/winning2.png",
        "./assets/images/winning3.png",
        "./assets/images/winning4.png"

    ];
     // create array of image links to images folder
    var lossImages = [
        "./assets/images/lost.jpg",
        "./assets/images/lost1.jpg",
        "./assets/images/lost2.jpg",
        "./assets/images/lost3.png",
    ];
    // set variable to the numbers the user will see
    var counter = 30;
    // create variable to hold which question we are on
    var currentQuestion = 0;
    // variable to keep the number of right answers
    var score = 0;
    // variable to keep the number of wrong questions
    var loss = 0;
    // declare timer variable to set countdown interval
    var timer;
    // function used to move to next question
    function nextQuestion() {
        /* set variable isQuestionOver to the value of the two variable, triviaQuestions.length
        and currentQuestion, being equal*/
        var isQuestionOver = (triviaQuestions.length - 1) === currentQuestion;
        // if isQuestionOver true, run displayResults function
        if (isQuestionOver) {
            displayResults();

            // else add 1 to currentQuestion and run loadQuestion function.
        } else {
            currentQuestion++;
            loadQuestion();
        }
    };

    // create function for if the user doesnt choose an answer.
    function timeUp() {
        // clear the timing interval on the timer function.
        clearInterval(timer);
        // count the non answer as a wrong answer
        loss++;
        /* run preloadImage function with "lost" as argument (still trying to fully understand why calling it
            with the argument lost makes it work, i found this solution online)*/
        preloadImage("lost");
        // set a timeout interval of 3 seconds before the nextquestion is generated
        setTimeout(nextQuestion, 3 * 1000);
    };
    // create function that subtracts one number from counter, to be used with setInterval
    function countDown() {
        counter--;
        // puts the numbers on the users screen
        $("#time").html("Timer: " + counter);
        // if the counter reaches 0, run the timeUp function
        if (counter === 0) {
            timeUp();
        };
    };
    // create loadQuestion function to put the question and the answers on the users screen
    function loadQuestion() {
        // set counter back to 30 for each question
        counter = 30;
        // set variable timer eqaul to setinterval with the countDown function as one argument, and the countDown function is set to 1 second intervals
        timer = setInterval(countDown, 1000);
        /*set variable question equal to the current question in the order of the object*/ 
        var question = triviaQuestions[currentQuestion].question;
        // set variable answers equal to the value of the current questions answer
        var answers = triviaQuestions[currentQuestion].answers;
        // displays the countdown on the users screen
        $("#time").html("Timer: " + counter);
        /*displays the current questions and its choices on the users screen (i found this syntax online as well)
        displays the question in an <h4> tag in the game div and runs the loadAnswers function*/
        $("#game").html(`
            <h4>${question}</h4>
            ${loadAnswers(answers)}
        `);
    };
    //create function to load the answers in the and display on the screen
    function loadAnswers(answers) {
        // create variable result and set it to an empty string
        var result = "";
        // for loop to loop through the answers and create new <p> tags to add to the screen
        for (var i = 0; i < answers.length; i++) {
            /* for each item in answers, create <p> tag with a class of "userPick" and an attribute
            data-answer of the current answer the loop is on. then display the answers in those <p> tags*/
            result += `<p class="userPick" data-answer="${answers[i]}">${answers[i]}</p>`;
        }

        // return the result variable
        return result;
    };
    // on click event for each answer option
    $(document).on("click", ".userPick", function() {
        // clear interval when an answer is picked
        clearInterval(timer);
        // set selectedAnswer to the users pick data-answer value
        var selectedAnswer = $(this).attr("data-answer");
        // set correctAnswer to correct answer from triviaQuestion object
        var correctAnswer = triviaQuestions[currentQuestion].correctAnswer;
        // if correct answer is equal to selected answer
        if (correctAnswer === selectedAnswer) {
            // add 1 to score
            score++;
            // run preloadImage function
            preloadImage("win");
            // set a timing interval of 3 seconds before next question
            setTimeout(nextQuestion, 3 * 1000);
            // else add 1 to loss and load loss image, set 3 second timer, load next question
        } else {
            loss++;
            preloadImage("lost");
            setTimeout(nextQuestion, 3 * 1000);
        };
    });
    // function to display the end results of game
    function displayResults() {
        var result = `
            <p>You get ${score} questions(s) right</p>
            <p>You missed ${loss} questions(s)</p>
            <button class="btn btn-primary" id="reset">Reset Game</button>
        `;

        $("#game").html(result);
    };
    // on click evet for reset button after game is over, reset all variables and load question function
    $(document).on("click", "#reset", function() {
        counter = 30;
        currentQuestion = 0;
        score = 0;
        loss = 0;
        timer = null;

        loadQuestion();
    });
    //function to generate a random image from images array
    function randomImage(pictures) {
        var random = Math.floor(Math.random() * pictures.length);
        var randomPicture = pictures[random];
        return randomPicture;
    };
    // function that uses the correct answer to choose which image to show
    function preloadImage(status) {
        var correctAnswer = triviaQuestions[currentQuestion].correctAnswer;

        if (status === "win") {
            $("#game").html(`
                <p class="preload-image">The correct answer is <b>${correctAnswer}</b></p>
                <img src="${randomImage(winImages)}" />
            `);
        } else {
            $("#game").html(`
                <p class="preload-image">The correct answer was <b>${correctAnswer}</b></p>
                <img src="${randomImage(lossImages)}" />
            `);
        };
    };
    // on click function on the start button that removes the button after pressed, shows timer and runs loadQuestion function
    $("#start").click(function() {
        $("#start").remove();
        $("#time").html(counter);
        loadQuestion();
    });
});