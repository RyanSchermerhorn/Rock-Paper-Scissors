//init
const st = Date.now(); //start time
let timer = true; //if countdown has not started
let input = -1;



//score tracking
let score = [];
score[0] = 0;
score[1] = 0;
score[2] = 0;

//10 second countdown
function startTimer() {
	let n = Date.now(); //now
	let count = 0;
	let tLimit = 10; //time limit
	let output = "";
	timer = !timer;
	window.setInterval(function t() {
		//checks if timer has started yet 
		if(timer)
		{
			n = Date.now();
			return count;
		}
		else
		{
			//Gives the number of seconds between the start of the timer and now
			count = ((n - Date.now()) % 100000) / -1000;
		}

		//displays output for timer
		if(count < tLimit / 3)
		{
			output = "Time to choose: " + (tLimit - count).toFixed(1) + " " + toWord(0) + "...";
		}
		else if(count < tLimit / 3 * 2)
		{
			output = "Time to choose: " + (tLimit - count).toFixed(1) + " " + toWord(1) + "...";
		}
		else if(count < tLimit)
		{
			output = "Time to choose: " + (tLimit - count).toFixed(1) + " " + toWord(2) + "...";
		}
		else
		{
			output = "Rock...Paper...Scissors...Shoot!";
			timer = true;
			rps(input);
		}
		document.getElementById("timer").innerHTML = output;
	}, 100);
}



function play() {
	if(timer)
	{
		//Displays starting defaults
		document.getElementById("play").disabled = true;
		document.getElementById("player").innerHTML = "None (Random)";
		document.getElementById("ai").innerHTML = "Secret";
		document.getElementById("result").innerHTML = "Game in Progress";


		startTimer();
	}
}

function rps(player) {
	let ai = Math.floor(Math.random() * 3);
	let outcome;
	let noInput = false;
	//if player input nothing
	if(player == -1)
	{
		noInput = true;
		player = Math.floor(Math.random() * 3);
		//alert("No option selected, you've been randomly assigned: " + toWord(player));
	}

	//scoring
	if(player == ai)
	{
		outcome = toWord(player) + " draws with " + toWord(ai) + ": \nTie";
		score[2]++;
	}
	else if((player == 2 && ai == 1) || (player == 1 && ai == 0) || (player == 0 && ai == 2))
	{
		outcome = toWord(player) + " beats " + toWord(ai) + ": \nPlayer Wins!";
		score[0]++;
	}
	else
	{
		outcome = toWord(player) + " loses to " + toWord(ai) + ": \nComputer Wins!";
		score[1]++;
	}
	//Displays outcome
	if(!noInput)
	{
		document.getElementById("player").innerHTML = toWord(player);
	}
	else
	{
		document.getElementById("player").innerHTML = toWord(player) + " (Random)";
	}
	document.getElementById("ai").innerHTML = toWord(ai);
	document.getElementById("result").innerHTML = outcome;
	document.getElementById("score").innerHTML = "Player: " + score[0] + " - Computer: " + score[1] + " - Draws: " + score[2];
	//alert(outcome);

	input = -1;
	document.getElementById("play").disabled = false;
	document.getElementById("play").innerHTML = "Play Again?";
}

function toWord(num) {
	switch(num)
	{
		case -1: 
			return "None (Random)";
		case 0: 
			return "Rock";
		case 1: 
			return "Paper";
		case 2: 
			return "Scissors";
	}
}

function buttonInput(num) {
	//default color
	let active = "";

	//selected color
	let unActive = "#a74a4a";
	if(!timer)
	{
		if(input != num)
		{
			input = num;
		}
		else
		{
			//deselects last option
			input = -1;
			num = -1;
		}
		//Displays Selection
		document.getElementById("player").innerHTML = toWord(num);

		//makes all buttons default colors
		document.getElementById("rock").style.backgroundColor = active;
		document.getElementById("paper").style.backgroundColor = active;
		document.getElementById("scissors").style.backgroundColor = active; 

		//Highlights last button pressed
		switch(num)
		{
			case 0: 
				document.getElementById("rock").style.backgroundColor = unActive;
				break;
			case 1: 
				document.getElementById("paper").style.backgroundColor = unActive;
				break;
			case 2:
				document.getElementById("scissors").style.backgroundColor = unActive;
				break;
		}
	
	}
	else
	{
		document.getElementById("rock").style.backgroundColor = active;
		document.getElementById("paper").style.backgroundColor = active;
		document.getElementById("scissors").style.backgroundColor = active; 
	}
}