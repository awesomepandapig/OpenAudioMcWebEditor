var setDuration = 0;
var showName = "";
var regionName = "";
function addSongFromUrl() {
    document.getElementById("addSongModal").style.display = "none";

    if ((document.getElementById("songUrlInput").value) == "") {
        
    } else {
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

        if (url.hostname == "drive.google.com") {
            console.log("google drive");
            au.src = "https://www.docs.google.com//uc?authuser=0&id=" + url.pathname.split(/[/]/)[3] + "&export=download";
            console.log(au.src);
        }




        // Once the metadata has been loaded, display the duration in the console
        au.addEventListener('loadedmetadata', function(){
        // Obtain the duration in seconds of the audio file
        var duration = Math.floor(au.duration);
        
        setDuration = setDuration + duration;
        commandDuration = setDuration - duration;
        
        //Calculate the timestamp
        var hours   = Math.floor(commandDuration / 3600);
        var minutes = Math.floor((commandDuration - (hours * 3600)) / 60);
        var seconds = commandDuration - (hours * 3600) - (minutes * 60);

        if (hours   < 10) {hours   = "0"+hours;}
        if (minutes < 10) {minutes = "0"+minutes;}
        if (seconds < 10) {seconds = "0"+seconds;}

        var timestamp = (hours + ":" + minutes + ":" + seconds);
        
        showName = document.getElementById("showNameInput").value;
        regionName = document.getElementById("regionNameInput").value;
        if (showName == "") {showName = "[Show Name Here]";}
        if (regionName == "") {regionName = "[Region Name Here]";}

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
        
        //TEST
        var checkbox = document.getElementById("checkBox");
        if (checkbox.checked == true) {
            nowPlayingOutput.innerHTML = ("/oa show add " + showName + " " + timestamp + " command tellraw @a {\"text\":\"Now Playing: " + songName + " - " + artistName + "\",\"bold\":true,\"color\":\"" + color + "\"}")
        } else {
            nowPlayingOutput.innerHTML = ("/oa show add " + showName + " " + timestamp + " command tellraw @a {\"text\":\"Now Playing: " + songName + " - " + artistName + "\",\"color\":\"" + color + "\"}")
        }

        //nowPlayingOutput.innerHTML = ("/oa show add " + showName + " " + timestamp + " command tellraw @a {\"text\":\"Now Playing: " + songName + " - " + artistName + "\",\"bold\":true,\"color\":\"" + color + "\"}")


        document.getElementById("nowPlayingCommandsContainer").appendChild(nowPlayingOutput);
        document.getElementById("songNameInput").value = "";
        document.getElementById("artistNameInput").value = "";
        document.getElementById("songUrlInput").value = "";
        document.getElementById("hideNowPlayingCommandsButton").style.display = "block";
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
    document.getElementById("addCommandModal").style.display = "none";
    if ((document.getElementById("commandInput").value) == "") {} else {
        var commandTimestamp = document.getElementById("timeInput").value;
        var command = document.getElementById("commandInput").value;
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
        commandOutput.innerHTML = ("/oa show add " + showName + " " + commandTimestamp + " command " + command);
        document.getElementById("commandsContainer").appendChild(commandOutput);
        document.getElementById("timeInput").value = "";
        document.getElementById("commandInput").value = "";
    }
}