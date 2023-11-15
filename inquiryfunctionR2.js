//inquiry function
//food function needs to be run at least once to change the countContext to 1+
//otherwise  it returns that doggy hasnt been fed

if (flow.get("count") === undefined) { //sets count to 0 if food function hasnt been run
    flow.set("count", 0)
}

let count = flow.get('countContext'); //grabbing variables from flow memory that were set from food function
let previousTime = flow.get('previousTimeContext');

let previousTimeClean = previousTime.toLocaleString("en-US", { //cleans up time to "HH:MM ampm" format
    hour: "numeric",
    minute: "numeric",
    hour12: true,
});



if (count > 0) {
    msg = { payload: 'Roman was fed ' + count + ' times, last at ' + previousTimeClean };  //message payload for tts conversion
}

else //Count is either 0 or undefined. Food function has not been run
{
    msg = { payload: 'Roman has not eaten yet.' };
}

return msg;

