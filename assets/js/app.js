$(document).ready(function () {
        var questions = [
            {
                question: "Which of the following is not a Wes Anderson movie?",
                choices: ["Fantastic Mr. Fox", "Mooonrise Kingdom","Napoleon Dynamite", "Hitchcock Truffaut"],
                images: ["assets/img/Wes_Anderson-20140206-85.jpg"],
                answer: 2
            },           
            {
                question: "Which actor appeared in American Graffiti before starring in Star Wars?",
                choices: ["Johnny Depp", "Harrison Ford", "Brad Pitt", "Leonardo DiCaprio"],
                images: ["assets/img/harrison_ford.jpeg"],
                answer: 1
            },
            {
                question: "Which U.S. state is home to the Dazed and Confused students at Lee High School, in the memorable 1993 coming-of-age movie?",
                choices: ["Tennessee","Texas", "Georgia", "California"],
                images: ["assets/img/texas.jpeg"],
                answer: 1
            },
            {
                question: "In the movie, The Wizard of Oz, what did the Scarecrow want from the wizard??",
                choices: ["Friends","New clothes", "Love", "Brain"],
                images: ["assets/img/wizardOfOz.jpeg"],
                answer: 3
            },
            {
                question: "The title role of the 1900's movie, Pretty Woman, was played by which actress?",
                choices: ["Julia Roberts","Sandra Bullock", "Jennifer Aniston", "Uma Thurman"],
                images: ["assets/img/julia_roberts.jpg"],
                answer: 0
            },
            {
                question: "What was the name of the monkey in the Disney movie, Aladdin?",
                choices: ["Kapi","Vanar", "Neal", "Abu"],
                images: ["assets/img/abu.jpeg"],
                answer: 3
            },
       
        ];

        var isRunning = false;
        var timer = 30;
        var tempTime;
        var noAnswer;
        var temp = [];
        var array = [];
        var count = 0;
        var count1 = 0;
        var count2 = 0;
        var count3 = questions.length;
        var userGuess = "";
        var pick;
        var index;
       

        $(".reset").hide();

        $(".start").on("click", function () {
            $(".start").hide();
            displayQuestion();
            runTimer();

            for(var i = 0; i < questions.length; i++) {
                temp.push(questions[i]);
            }
    });

    function runTimer() {
        if(!isRunning) {
            tempTime = setInterval(decrement, 1000);
            isRunning = true;
        }
    }

    function decrement() {
        $(".timer").html("<h4>Time Remaining: " + timer + "</h4>");
        timer--;

        if(timer == 0) {
            noAnswer++; 
            stop();
            $(".answer").html("<h6>Time is up! The correct answer is: " + pick.choices[pick.answer] +  "</h6>");
            hideImage();
        }
    }

    function stop() {
        isRunning = false;
        clearInterval(tempTime);
    }

    function displayQuestion() {
        index = Math.floor(Math.random() * questions.length);
        pick = questions[index];

        if(pick.shown) {
            displayQuestion();
        }
        else {

        $(".question").html("<h3>" + pick.question + "</h3>");
        for(var i = 0; i < pick.choices.length; i++) {
            var input = $("<div>");
            input.addClass("answerChoice");
            input.html(pick.choices[i]);
            input.attr("guess", i);
            console.log(input);
            $(".answer").append(input);   
        }

    }
    
    $(".answerChoice").on("click", function() {
        userGuess = parseInt($(this).attr("guess"));   
        console.log(userGuess);    

        if(userGuess === pick.answer){
            stop();
            count++;
            userGuess = "";
            $(".answer").html("<p>You got it correct!</p>");
            hideImage();
        }
        else {
            stop();
            count1++;
            userGuess = "";
            $(".answer").html("<p>You got it wrong! The correct answer is: " + pick.choices[pick.answer] + "</p>");
            hideImage();
        }
    });

};

    function hideImage () {
        $(".answer").append("<img src =" + pick.images + ">");
        array.push(pick);
        questions.splice(index, 1);

        var temp1 = setTimeout(function() {
            $(".answer").empty();
            timer = 30;
        

        if ((count1 + count + count2) === count3) {
                $(".question").empty();
                $(".question").html("<h3>Game Over!  Here's how you did: </h3>");
                $(".answer").append("<h4> Correct: " + count + "</h4>" );
                $(".answer").append("<h4> Incorrect: " + count1 + "</h4>" );
                $(".answer").append("<h4> Unanswered: " + count2 + "</h4>" );
                $(".reset").show();
                count = 0;
                count1 = 0;
                count2 = 0;
        
            } else {
                runTimer();
                displayQuestion();
            }
            }, 3000);
         
        }
        
        $(".reset").on("click", function() {
            $(".reset").hide();
            $(".answer").empty();
            $(".question").empty();
            for(var i = 0; i < temp.length; i++) {
                questions.push(temp[i]);
            }
            runTimer();
            displayQuestion();
        
        });
        
    });
        
    

    



