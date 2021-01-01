var setDuration = 0;
var showName = "";
var regionName = "";
var hours = 0;
var minutes = 0;
var seconds = 0;
var timestamp = "";
var duration = 0;
var commandDuration = 0;
var songAmt = 0;
var command = "";
var regions = [];
function addSongFromUrl() {
    document.getElementById("addSongModal").style.display = "none";
    if ((document.getElementById("songUrlInput").value) == "") {} else {
        // Create a non-dom allocated Audio element
        var au = document.createElement('audio');
        // Define the URL of the MP3 audio file
        au.src = document.getElementById("songUrlInput").value;
        const url = new URL(au.src);
        //Github Public Share Link
        if (url.hostname == "github.com") {
            console.log("github");
            if (au.src.includes("?raw=true")) {
                console.log(au.src);
            } else {
                    au.src = au.src + "?raw=true";
                    console.log(au.src);
            }
        }
        //DropBox Public Share Link
        if (url.hostname == "www.dropbox.com") {
            console.log("dropbox");
            url.hostname = "dl.dropboxusercontent.com";
            au.src = url;
            console.log(au.src);
        }
        //Google Drive Public Share Link
        if (url.hostname == "drive.google.com") {
            console.log("google drive");
            au.src = "https://www.docs.google.com//uc?authuser=0&id=" + url.pathname.split(/[/]/)[3] + "&export=download";
            console.log(au.src);
        }

        //YouTube Link
        if (url.hostname == "www.youtube.com") {
            console.log("youtube");
            au.src = "https://oa-yt.snowdns.de/?v=" + au.src.split('=')[1];
            console.log(au.src);
        }

        //YouTube Share Link
        if (url.hostname == "youtu.be") {
            console.log("youtube");
            au.src = "https://oa-yt.snowdns.de/?v=" + url.pathname.split('/')[1];
            console.log(au.src);
        }
        Spinner();
        Spinner.show();
        // Once the metadata has been loaded, display the duration in the console
        au.addEventListener('loadedmetadata', function(){
        // Obtain the duration in seconds of the audio file
        duration = Math.floor(au.duration);
        setDuration = setDuration + duration;
        commandDuration = setDuration - duration;
        //Calculate the timestamp
        hours   = Math.floor(commandDuration / 3600);
        minutes = Math.floor((commandDuration - (hours * 3600)) / 60);
        seconds = commandDuration - (hours * 3600) - (minutes * 60);
        if (hours < 10) {hours = "0"+hours;}
        if (minutes < 10) {minutes = "0"+minutes;}
        if (seconds < 10) {seconds = "0"+seconds;}
        timestamp = (hours + ":" + minutes + ":" + seconds);
        //Get the names of the show & regions
        showName = document.getElementById("showNameInput").value;
        regionName = document.getElementById("regionNameInput").value;
        regions = regionName.split(', ');
        if (showName == "") {showName = "[Show Name Here]";}
        if (regionName == "") {regionName = "[Region Name Here]";}
        for (i = 0; i < regions.length; i++) {
            regionName = regions[i];
            //Creates the song commands
            var commandOutput = document.createElement("p");   
            commandOutput.style.color = "white";
            commandOutput.style.margin = "16px";
            commandOutput.style.marginRight = "16px";
            commandOutput.style.marginBottom = "16px";
            commandOutput.style.padding = "16px";
            commandOutput.style.backgroundColor = "#303030";
            commandOutput.style.overflowWrap = "break-word";
            commandOutput.innerHTML = ("/oa show add " + showName + " " + timestamp + " command oa region temp " + regionName + " " + au.src + " " + duration)                  // Insert text
            document.getElementById("commandsContainer").appendChild(commandOutput); 
        }
        //Creates the now playing commands
        var songName = document.getElementById("songNameInput").value;
        var artistName = document.getElementById("artistNameInput").value;
        var color = document.getElementById("colorSelect").value;
        if (songName == "") {songName = "[Song Name Here]";}
        if (artistName == "") {artistName = "[Artist Name Here]";}
        var nowPlayingOutput = document.createElement("p");   
        nowPlayingOutput.style.color = "white";
        nowPlayingOutput.style.margin = "16px";
        nowPlayingOutput.style.marginRight = "16px";
        nowPlayingOutput.style.marginBottom = "16px";
        nowPlayingOutput.style.padding = "16px";
        nowPlayingOutput.style.backgroundColor = "#303030";
        nowPlayingOutput.style.overflowWrap = "break-word";
        var checkbox = document.getElementById("checkBox");
        if (checkbox.checked == true) {
            nowPlayingOutput.innerHTML = ("/oa show add " + showName + " " + timestamp + " command tellraw @a {\"text\":\"Now Playing: " + songName + " - " + artistName + "\",\"bold\":true,\"color\":\"" + color + "\"}")
        } else {
            nowPlayingOutput.innerHTML = ("/oa show add " + showName + " " + timestamp + " command tellraw @a {\"text\":\"Now Playing: " + songName + " - " + artistName + "\",\"color\":\"" + color + "\"}")
        }
        document.getElementById("nowPlayingCommandsContainer").appendChild(nowPlayingOutput);
        document.getElementById("songNameInput").value = "";
        document.getElementById("artistNameInput").value = "";
        document.getElementById("songUrlInput").value = "";
        document.getElementById("hideNowPlayingCommandsButton").style.display = "block";
        Spinner.hide();
        },false);
    } 
}

function toggleNowPlayingCommands() {
    var commandsDiv = document.getElementById("nowPlayingCommandsContainer");
    if (commandsDiv.style.display === "none") {
    document.getElementById("hideNowPlayingCommandsButton").innerHTML = "Hide Now Playing Commands";
    commandsDiv.style.display = "block";
  } else {
    commandsDiv.style.display = "none";
    document.getElementById("hideNowPlayingCommandsButton").innerHTML = "Show Now Playing Commands";
  }
}


function addCommand() {
    document.getElementById("maxValueLabel").style.display = "none";
    hours = document.getElementById("hourInput").value;
    minutes = document.getElementById("minuteInput").value;
    seconds = document.getElementById("secondInput").value;
    if ((hours != "00") && (hours   < 10)) {hours = "0"+hours;}
    if ((minutes != "00") && (minutes   < 10)) {minutes = "0"+minutes;}
    if ((seconds != "00") && (seconds   < 10)) {seconds = "0"+seconds;}
    timestamp = (hours + ":" + minutes + ":" + seconds);
    if (timestamp == "0:0:0") {timestamp = "00:00:00"}
    if ((hours > 23) || (minutes > 59) || (seconds > 59)) {
        document.getElementById("maxValueLabel").style.display = "block";
    } else {
        document.getElementById("addCommandModal").style.display = "none";
        if ((document.getElementById("commandInput").value) == "") {} else {
            command = document.getElementById("commandInput").value;
            showName = document.getElementById("showNameInput").value;
            regionName = document.getElementById("regionNameInput").value;
            if (showName == "") {showName = "[Show Name Here]";}
            if (regionName == "") {regionName = "[Region Name Here]";}
            var commandOutput = document.createElement("p");   
            commandOutput.style.color = "white";
            commandOutput.style.margin = "16px";
            commandOutput.style.marginRight = "16px";
            commandOutput.style.marginBottom = "16px";
            commandOutput.style.padding = "16px";
            commandOutput.style.backgroundColor = "#303030";
            commandOutput.style.overflowWrap = "break-word";
            commandOutput.innerHTML = ("/oa show add " + showName + " " + timestamp + " command " + command);
            document.getElementById("commandsContainer").appendChild(commandOutput);
            document.getElementById("hourInput").value = "";
            document.getElementById("minuteInput").value = "";
            document.getElementById("secondInput").value = "";
            document.getElementById("commandInput").value = "";
        }
    }
}
/*
//test functionality for bpm of song

function test() {
    var aud = document.createElement('audio');
    aud.src = "https://github.com/awesomepandapig/mcprom.net/blob/master/audio/Latch%20Feat.%20Sam%20Smith-k0jLE7tTwjY.mp3?raw=true";
    aud.addEventListener('loadedmetadata', function() {
            
        // Obtain the duration in seconds of the audio file
        duration = Math.floor(aud.duration);
        showName = "videoshow";
        setDuration = setDuration + duration;
        commandDuration = setDuration - duration;
        
        //Calculate the timestamp
        hours   = Math.floor(commandDuration / 3600);
        minutes = Math.floor((commandDuration - (hours * 3600)) / 60);
        seconds = commandDuration - (hours * 3600) - (minutes * 60);
        while (commandDuration < setDuration) {

            // Define the URL of the MP3 audio file
            

            commandDuration = commandDuration + 1;
            seconds = seconds + 1;
            if (seconds > 59) {
                seconds = 0;
                minutes = minutes + 1;
            }

            if (minutes > 59) {
                minutes = 0;
                hours = hours + 1;
            }

            if (hours > 24) {
                hours = 0;
            }
            if ((hours < 10) && (minutes < 10) && (seconds < 10)) {
                timestamp = ("0" + hours + ":" + "0" + minutes + ":" + "0" + seconds);
            } else if ((hours < 10) && (minutes < 10)) {
                timestamp = ("0" + hours + ":" + "0" + minutes + ":" + seconds);
            } else if ((hours < 10) && (seconds < 10)) {
                timestamp = ("0" + hours + ":" + minutes + ":" + "0" + seconds);
            } else if ((minutes < 10) && (seconds < 10)) {
                timestamp = (hours + ":" + "0" + minutes + ":" + "0" + seconds);
            } else {
                timestamp = (hours + ":" + minutes + ":" + seconds);
            }

            var commandOutput2 = document.createElement("p");     
            var commandOutput3 = document.createElement("p");   
            commandOutput2.innerHTML = ("/oa show add " + showName + " " + timestamp + " command " + "setblock 0 5 0 minecraft:concrete 13");
            commandOutput2.style.color = "white";
            commandOutput3.style.color = "white";
            document.getElementById("main-container").style.display = "none";
            document.getElementById("testBtn").style.display = "none";
            document.getElementById("commandsContainer").appendChild(commandOutput2); 

            commandDuration = commandDuration + 1;
            seconds = seconds + 1;
            if (seconds > 59) {
                seconds = 0;
                minutes = minutes + 1;
            }

            if (minutes > 59) {
                minutes = 0;
                hours = hours + 1;
            }

            if (hours > 24) {
                hours = 0;
            }
            if ((hours < 10) && (minutes < 10) && (seconds < 10)) {
                timestamp = ("0" + hours + ":" + "0" + minutes + ":" + "0" + seconds);
            } else if ((hours < 10) && (minutes < 10)) {
                timestamp = ("0" + hours + ":" + "0" + minutes + ":" + seconds);
            } else if ((hours < 10) && (seconds < 10)) {
                timestamp = ("0" + hours + ":" + minutes + ":" + "0" + seconds);
            } else if ((minutes < 10) && (seconds < 10)) {
                timestamp = (hours + ":" + "0" + minutes + ":" + "0" + seconds);
            } else {
                timestamp = (hours + ":" + minutes + ":" + seconds);
            }

            commandOutput3.innerHTML = ("/oa show add " + showName + " " + timestamp + " command " + "setblock 0 5 0 minecraft:concrete 14");
            document.getElementById("commandsContainer").appendChild(commandOutput3); 
        }
    },false);
}

function addTime() {
    for (i = 0; i < songAmt; i++) {
        if (songAmt == 0) {} else {
            var addTimeInput = document.getElementById("addTimeInput").value;
            var timeType = document.getElementById("timeTypeSelector").value;
            if (addTimeInput > 59) {
                document.getElementById("maxAddValueLabel").style.display = "block";
            } else {
                tempTime = setDuration + addTimeInput + timeType;
                hours   = Math.floor(tempTime / 3600);
                minutes = Math.floor((tempTime - (hours * 3600)) / 60);
                seconds = tempTime - (hours * 3600) - (minutes * 60);
                if (hours < 10) {hours = "0"+hours;}
                if (minutes < 10) {minutes = "0"+minutes;}
                if (seconds < 10) {seconds = "0"+seconds;}
                timestamp = (hours + ":" + minutes + ":" + seconds);
                command = document.getElementById("commandInput").value;
                showName = document.getElementById("showNameInput").value;
                regionName = document.getElementById("regionNameInput").value;
                if (showName == "") {showName = "[Show Name Here]";}
                if (regionName == "") {regionName = "[Region Name Here]";}
                var addCommandOutput = document.createElement("p");   
                addCommandOutput.style.color = "white";
                addCommandOutput.style.margin = "16px";
                addCommandOutput.style.marginRight = "16px";
                addCommandOutput.style.marginBottom = "16px";
                addCommandOutput.style.padding = "16px";
                addCommandOutput.style.backgroundColor = "#303030";
                addCommandOutput.style.overflowWrap = "break-word";
                addCommandOutput.innerHTML = ("/oa show add " + showName + " " + timestamp + " command " + command);
                document.getElementById("commandsContainer").appendChild(addCommandOutput);
                document.getElementById("addTimeInput").value = "";
                document.getElementById("timeTypeSelector").value = "";
                document.getElementById("commandInput").value = "";
            }
        }
    }
}
*/