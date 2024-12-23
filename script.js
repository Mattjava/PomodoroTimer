/* 
    Audio made by LIECIO from Pixaby.
    https://pixabay.com/sound-effects/message-alert-190042/
*/
const alert = new Audio(src="media/alert.mp3");
// Icon made by me.
const icon = "media/tomato.png";


var hasStarted = false;
var isPaused = false;
var currentTime = 300000;
var timeLeft = 0;
var isWork = true;
var timeSessions = [1500000, 300000, 1500000, 300000, 1500000, 300000, 1500000, 1800000];
var test = [3000, 5000, 3000, 5000, 3000, 5000, 3000, 10000];
var iter = 0;



// Sleep function
function sleep(time) {    
    return new Promise(resolve => setTimeout(resolve, time));
}

// Runs the timer
async function run()
{
    // Updates isPaused
    isPaused = false;

    // Calculates the time left
    var currentTime = Date.now();
    
    if(timeLeft == 0)
        var futureTime = currentTime + timeSessions[iter];
    else
        var futureTime = currentTime + timeLeft;

    timeLeft = futureTime - currentTime;

    // Updates timer text
    editTimeText();

    // Runs the timer loop
    while(Math.floor(timeLeft) > 0 && !isPaused)
    {
        // Calculates the time left
        currentTime = Date.now();
        timeLeft = futureTime - currentTime;
        if(timeLeft <= 0) {
            timeLeft = 0;
            editTimeText();
            break;
        }
        editTimeText();
        await sleep(1000);
    }

    // Starts finish() if done
    if(!isPaused)
    {
        finish();
    }
    
}

// Runs when the timer reaches 0 seconds
function finish()
{
    var button = document.getElementById("button")
    var sessionText = document.getElementById("action-text");

    // Resets timer
    iter++;
    if(iter >= timeSessions.length)
        iter = 0;

    // Updates isWork variable
    isWork = !isWork;
    
    // Edit page
    if(isWork){
        sessionText.textContent = "WORK";
        var notif = new Notification(title="Time's Up", {
            body: "Time to get back to work!",
            icon: icon
        })
    } else {
        sessionText.textContent = "BREAK";
        var notif = new Notification(title="Time's Up", {
            body: "Enjoy your break!",
            icon: icon
        })
    }

    // Updates button
    hasStarted = false;
    button.textContent = "START";
    button.style.background = "white";
    alert.play();
}

// Updates the timer text
function editTimeText()
{
    var timerText = document.getElementById("timer-text");

    var minute = (timeLeft / 1000) / 60;
    var second = (timeLeft / 1000) % 60;

    if(Math.floor(second) < 10)
        timerText.textContent = "" + Math.floor(minute) + ":0" + Math.floor(second);
    else
        timerText.textContent = "" + Math.floor(minute) + ":" + Math.floor(second);
}

// Runs when the button is pressed. Initiates run()
function start()
{
    var button = document.getElementById("time-button");
    if(!hasStarted)
    {
        // Updates button
        hasStarted = true;
        button.textContent = "PAUSE";
        button.style.background = "tomato";

        // Initiates run()
        run();
        
    } else {
        hasStarted = false;
        button.textContent = "START";
        button.style.background = "white";
        isPaused = true;
    }
}
