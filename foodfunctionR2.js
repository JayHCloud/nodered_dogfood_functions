//handles undefined context if server were to reset
//flow scope allows other nodes to access these values
if (flow.get("previousTimeContext") === undefined) {
    flow.set("previousTimeContext", 0)
}

if (flow.get("countContext") === undefined) {
    flow.set("countContext", 0)
}

var currentTime = new Date();  
var previousTime = flow.get('previousTimeContext'); //gets values from contest so it persists between calls (context is like memory) 
var count = flow.get('countContext'); 

const previousTimeClean = previousTime.toLocaleString("en-US", { //cleans up time to "HH:MM ampm" format
    hour: "numeric",
    minute: "numeric",
    hour12: true,
});


if ((currentTime.getTime() - previousTime.getTime()) > 300000)  //if has been at least 5 minutes (300000 ms)
{
    if (currentTime.toDateString() == previousTime.toDateString())  //and if this happens on the same day

    {   //Spaces in string help tts enunciate better 
        msg = { payload: 'Roman was fed ' + count + ' times, last at ' + previousTimeClean};  //message payload for tts conversion
    }

    else  //new day, logs first feed time
    {
        msg = { payload: 'This is the first time roman is getting fed.' };
    }

    count++;
    flow.set("countContext", count); // saving variables to flow context 
    flow.set("previousTimeContext", currentTime);
}

else  //too many triggers in 5 minutes, want tts to say nothing
{
    msg = { payload: " "};
}

return msg;  //returns msg (with msg.payload)

//TODO ensure it says "time" at count 1 opposed to "times"
//TODO consider moving initializing if statements to "On Start" section