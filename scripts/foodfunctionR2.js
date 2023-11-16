//handles undefined context if server were to reset
//flow scope allows other nodes to access these values

//flow context works as persistent memory between function calls
if (flow.get("previousTimeContext") === undefined) {
    flow.set("previousTimeContext", 0)
}

if (flow.get("countContext") === undefined) {
    flow.set("countContext", 0)
}

let currentTime = new Date();  
let previousTime = flow.get('previousTimeContext'); //gets values from context so it persists between calls (context is like memory) 
let count = flow.get('countContext'); 

let previousTimeClean = previousTime.toLocaleString("en-US", { //cleans up time to "HH:MM ampm" format, sounds nice in tts
    hour: "numeric",
    minute: "numeric",
    hour12: true,
});


if ((currentTime.getTime() - previousTime.getTime()) > 300000)  //if has been at least 5 minutes (300000 ms)
{
    if (currentTime.toDateString() == previousTime.toDateString())  //and if this happens on the same day

    {   //Spaces in string help tts enunciate better 
        msg = { payload: 'Roman was fed ' + count + ' times, last at ' + previousTimeClean};
    }

    else  
    {
        msg = { payload: 'This is the first time roman is getting fed.' };
        let count = 0;
    }

    count++;
    flow.set("countContext", count); // saving variables to flow context 
    flow.set("previousTimeContext", currentTime);
}


{
    msg = { payload: "Please stop feeding my dog bro"};  //Come up with better error message
}

return msg;  //returns msg (with msg.payload)

//TODO Ensure it says "time" at count 2 opposed to "times". On 2nd opening it says: Roman was fed 1 times, last at xyz.
//TODO consider moving initializing if statements to "On Start" section\
//TODO figure out what to do when container is opened too many times
