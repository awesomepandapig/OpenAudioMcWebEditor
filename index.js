/*var setDuration = 0;

window.onload=function(){

    // Add a change event listener to the file input
    document.getElementById("fileinput").addEventListener('change', function(event){
        var target = event.currentTarget;
        var file = target.files[0];
        var numTracks = $("input:file")[0].files.length;
        var duration = 0;
        //Print number of tracks uploaded to console
        console.log(numTracks);
        for (i = 0; i <= (numTracks - 1); i++) {
            

            var audio = document.createElement('audio');
            audio.id = ("Song " + (i + 1));
            console.log(audio.id);
            audio.src = URL.createObjectURL(document.getElementsByTagName('input')[0].files[i]);
            //Add media players for each track
            audio.setAttribute("controls", "controls");
            document.body.appendChild(audio);
            


            // Obtain the duration in seconds of the audio file (with milliseconds as well, a float value)
            duration = document.getElementById("Song " + (i + 1)).duration;

            console.log("The duration of Song " + (i + 1) + " is: " + duration + " seconds");


            setDuration = setDuration + duration;
            console.log("The duration of Set is " + setDuration + " seconds");
        }
                    
                    

    }, false); 
}*/

var setDuration = 0;
function addSongFromUrl() {
    document.getElementById("myModal").style.display = "none";

    if ((document.getElementById("songUrlInput").value) == "") {
        
    } else {
        // Create a non-dom allocated Audio element
        var au = document.createElement('audio');

        // Define the URL of the MP3 audio file
        au.src = document.getElementById("songUrlInput").value;
        document.getElementById("songUrlInput").innerHTML = "";

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
        
        var showName = document.getElementById("showNameInput").value;
        var regionName = document.getElementById("regionNameInput").value;
        if (showName == "") {showName = "(show)";}
        if (regionName == "") {regionName = "(region)";}
 
        
        var url = au.src;
        
        var output = document.createElement("p");   
        output.style.color = "white";
        output.style.margin = "16px";
        output.style.marginRight = "16px";
        output.style.marginBottom = "16px";
        output.style.padding = "16px";
        output.style.backgroundColor = "#303030";
        output.style.overflowWrap = "break-word";
        output.innerHTML = ("/oa show add " + showName + " " + timestamp + " command oa region temp " + regionName + " " + url + " " + duration)                  // Insert text
        document.body.appendChild(output);       
        
        },false);
    } 
    
}