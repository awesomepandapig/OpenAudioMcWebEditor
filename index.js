var setDuration = 0;
var worldName = "";
var showName = "";
var regionName = "";
var hours = 0;
var minutes = 0;
var seconds = 0;
var timestamp = 0;
var duration = 0;
var commandDuration = 0;
var cueAmt = 0;
var command = "";
var regions = [];
var bpm = 0;
var incrementValue = 0;
var au = document.createElement('audio');
var show = {"showName":"","cueList":[],"lastTaskTime":0};
function addSongFromUrl() {
    // Create a non-dom allocated Audio element
    var au = document.createElement('audio');
    // Define the URL of the MP3 audio file
    au.src = document.getElementById("songUrlInput").value;
    const url = new URL(au.src);
    if (url.hostname == "github.com") {
        if (!(au.src.includes("?raw=true"))) {
            au.src = au.src + "?raw=true";
        }
    } else if (url.hostname == "www.dropbox.com") {
        url.hostname = "dl.dropboxusercontent.com";
        au.src = url;
    } else if (url.hostname == "drive.google.com") {
        au.src = "https://www.docs.google.com//uc?authuser=0&id=" + url.pathname.split(/[/]/)[3] + "&export=download";
    } else if (url.hostname == "www.youtube.com") {
        au.src = "https://oa-yt.snowdns.de/?v=" + au.src.split('=')[1];
    } else if (url.hostname == "youtu.be") {
        au.src = "https://oa-yt.snowdns.de/?v=" + url.pathname.split('/')[1];
    } else if (document.getElementById("songUrlInput").value == "") {
        document.getElementById("songUrlEmptyWarning").style.display = "block";
    } 
    worldName = document.getElementById("worldNameInput").value;
    showName = document.getElementById("showNameInput").value;
    regionName = document.getElementById("regionNameInput").value;
    if (worldName == "") {
        alert("You must input a world name.");
    }
    if (showName == "") {
        alert("You must input a show name.");
    }
    if (regionName == "") {
        alert("You must input at least one region name.");
    }
    if ((worldName != "") && (showName != "") && (regionName != "") && (document.getElementById("songUrlInput").value != "")) {
        console.log(document.getElementById("songUrlInput").value);
        document.getElementById("addSongModal").style.display = "none";
        Spinner();
        Spinner.show();
        // Once the metadata has been loaded, display the duration in the console
        au.addEventListener('loadedmetadata', function(){
        // Obtain the duration in seconds of the audio file
        duration = Math.floor(au.duration);
        duration *= 1000;
        console.log(duration);
        setDuration += duration;
        timestamp = setDuration - duration;
        console.log(timestamp);
        //Get the names of the show & regions
        regions = regionName.split(', ');
        if (regionName == "") {regionName = "[Region Name Here]";}
        for (i = 0; i < regions.length; i++) {
            regionName = regions[i];
            command = ("oa region temp " + regionName + " " + au.src + " " + (duration/1000));
            addCue();
            //Creates the song commands
            var commandOutput = document.createElement("p");   
            commandOutput.style.color = "white";
            commandOutput.style.margin = "16px";
            commandOutput.style.marginRight = "16px";
            commandOutput.style.marginBottom = "16px";
            commandOutput.style.padding = "16px";
            commandOutput.style.backgroundColor = "#303030";
            commandOutput.style.overflowWrap = "break-word";
            commandOutput.innerHTML = ("/oa show add " + showName + " " + timestamp + "ms " + " command oa region temp " + regionName + " " + au.src + " " + (duration/1000));                  // Insert text
            document.getElementById("commandsContainer").appendChild(commandOutput); 
        }
        //Creates the now playing commands
        if (document.getElementById("enableBox").checked == true) {
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
                command = ("tellraw @a {\"text\":\"Now Playing: " + songName + " - " + artistName + "\",\"bold\":true,\"color\":\"" + color + "\"}");
                addCue();
                nowPlayingOutput.innerHTML = ("/oa show add " + showName + " " + timestamp + "ms " + " command tellraw @a {\"text\":\"Now Playing: " + songName + " - " + artistName + "\",\"bold\":true,\"color\":\"" + color + "\"}");
            } else {
                command = ("tellraw @a {\"text\":\"Now Playing: " + songName + " - " + artistName + "\",\"color\":\"" + color + "\"}");
                addCue();
                nowPlayingOutput.innerHTML = ("/oa show add " + showName + " " + timestamp + "ms " + " command tellraw @a {\"text\":\"Now Playing: " + songName + " - " + artistName + "\",\"color\":\"" + color + "\"}");
            }
            document.getElementById("nowPlayingCommandsContainer").appendChild(nowPlayingOutput);
        }
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
    hideWarnings();
    incrementValue = document.getElementById("timeInput").value;
    var temp = timestamp;
    timestamp = Number(timestamp) + Number(incrementValue);
    worldName = document.getElementById("worldNameInput").value;
    showName = document.getElementById("showNameInput").value;
    regionName = document.getElementById("regionNameInput").value;
    command = document.getElementById("commandInput").value;
    if (worldName == "") {
        alert("You must input a world name.");
    }
    if (showName == "") {
        alert("You must input a show name.");
    }
    if (regionName == "") {
        alert("You must input at least one region name.");
    }
    if ((document.getElementById("timeInput").value) == "") {
        document.getElementById("timeEmptyWarning").style.display = "block";
    }
    if (command == "") {
        document.getElementById("commandEmptyWarning").style.display = "block";
    }
    if  (((document.getElementById("timeInput").value) != "") && (worldName != "") && (showName != "") && (regionName != "") && ((document.getElementById("commandInput").value) != "")) {
        document.getElementById("addCommandModal").style.display = "none";
        var commandOutput = document.createElement("p");   
        commandOutput.style.color = "white";
        commandOutput.style.margin = "16px";
        commandOutput.style.marginRight = "16px";
        commandOutput.style.marginBottom = "16px";
        commandOutput.style.padding = "16px";
        commandOutput.style.backgroundColor = "#303030";
        commandOutput.style.overflowWrap = "break-word";
        commandOutput.innerHTML = ("/oa show add " + showName + " " + timestamp + "ms " + " command " + command);
        document.getElementById("commandsContainer").appendChild(commandOutput);
        if (command[0] == "/") {
            command = command.substring(1,command.length);
        }
        addCue();
        document.getElementById("timeInput").value = "";
        document.getElementById("commandInput").value = "";
    }
    timestamp = temp;
}

function addBpm() {
    hideWarnings();
    au.src = document.getElementById("bpmSongUrlInput").value;
    const url = new URL(au.src);
    if (url.hostname == "github.com") {
        if (!(au.src.includes("?raw=true"))) {
            au.src = au.src + "?raw=true";
        }
    } else if (url.hostname == "www.dropbox.com") {
        url.hostname = "dl.dropboxusercontent.com";
        au.src = url;
    } else if (url.hostname == "drive.google.com") {
        au.src = "https://www.docs.google.com//uc?authuser=0&id=" + url.pathname.split(/[/]/)[3] + "&export=download";
    } else if (url.hostname == "www.youtube.com") {
        au.src = "https://oa-yt.snowdns.de/?v=" + au.src.split('=')[1];
    } else if (url.hostname == "youtu.be") {
        au.src = "https://oa-yt.snowdns.de/?v=" + url.pathname.split('/')[1];
    } else if (document.getElementById("bpmSongUrlInput").value == "") {
        document.getElementById("urlEmptyWarning").style.display = "block";
    }
    worldName = document.getElementById("worldNameInput").value;
    showName = document.getElementById("showNameInput").value;
    bpm = document.getElementById("bpmInput").value
    commands = document.getElementById("commandsInput").value;
    if (worldName == "") {
        alert("You must input a world name.");
    }
    if (showName == "") {
        alert("You must input a show name.");
    }
    if (bpm == "") {
        document.getElementById("bpmEmptyWarning").style.display = "block";
    } else if (bpm < 50) {
        document.getElementById("bpmInvalidWarning").style.display = "block";
    }
    if (commands == "") {
        document.getElementById("bpmCommandEmptyWarning").style.display = "block";
    }
    if ((worldName != "") && (showName != "") && (document.getElementById("bpmSongUrlInput").value != "") && (bpm >= 50) && (commands != "")) {
        document.getElementById("bpmModal").style.display = "none";
        au.addEventListener('loadedmetadata', function() {
            show.showName = document.getElementById("showNameInput").value;
            duration = (Math.floor(au.duration)*1000);
            console.log(duration);
            setDuration += duration;
            console.log(setDuration);
            incrementValue = Math.floor((bpm/60)*20)/4;
            while (timestamp < setDuration) {
                commands = document.getElementById("commandsInput").value.split(', ');
                for (i = 0; i < commands.length; i++) { 
                    command = commands[i];
                    if (command[0] == "/") {
                        command = command.substring(1,command.length);
                    }
                    timestamp = Math.floor(timestamp +=50*incrementValue);
                    addCue();
                    var commandOutput = document.createElement("p");   
                    commandOutput.style.color = "white";
                    commandOutput.style.margin = "16px";
                    commandOutput.style.marginRight = "16px";
                    commandOutput.style.marginBottom = "16px";
                    commandOutput.style.padding = "16px";
                    commandOutput.style.backgroundColor = "#303030";
                    commandOutput.style.overflowWrap = "break-word";
                    commandOutput.innerHTML = ("/oa show add " + showName + " " + Math.floor(timestamp) + "ms" + " command " + command);
                    document.getElementById("commandsContainer").appendChild(commandOutput);
                }
            }
            document.getElementById("bpmSongUrlInput").value = "";
            document.getElementById("bpmInput").value = "";
            document.getElementById("commandsInput").value = "";
        },false);
    }
}

function hideWarnings() {
    document.getElementById("urlEmptyWarning").style.display = "none";
    document.getElementById("timeEmptyWarning").style.display = "none";
    document.getElementById("commandEmptyWarning").style.display = "none";
    document.getElementById("bpmEmptyWarning").style.display = "none";
    document.getElementById("bpmCommandEmptyWarning").style.display = "none";
    document.getElementById("songUrlEmptyWarning").style.display = "none";
}

function addCue() {
    var newCue = { "id": uuidv4(), "timestamp": timestamp, "task": { "type": "com.craftmend.openaudiomc.spigot.modules.show.runnables.CommandRunnable", "payload": { "command": (command + " "), "worldName": worldName, "executedFromRedis": false }}};
    show.cueList[cueAmt] = newCue;
    cueAmt++;
    show.lastTaskTime = timestamp;
}

function download(content, contentType) {
    if (document.getElementById("commandsContainer").innerHTML == "") {
        alert("Show is empty")
    } else {
        var a = document.createElement("a");
        var file = new Blob([content], { type: contentType });
        a.href = URL.createObjectURL(file);
        a.download = showName;
        a.click();
    }
}