var setDuration = 0;

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
}

//var showName = document.getElementById("showNameInput").value;
//var regionName = document.getElementById("regionNameInput").value;
//var songUrl = document.getElementById("songUrlInput").value;
//var trackLength = the length of the track that was pulled from url this will be auto propogated onto the site later but i cannot do it rn because im bad.

function addSongFromUrl() {
    
        // Create a non-dom allocated Audio element
        var au = document.createElement('audio');

        // Define the URL of the MP3 audio file
        au.src = document.getElementById("songUrlInput").value;

        // Once the metadata has been loaded, display the duration in the console
        au.addEventListener('loadedmetadata', function(){
        // Obtain the duration in seconds of the audio file (with milliseconds as well, a float value)
        var durationMinutes = Math.floor(au.duration / 60);
        var durationSeconds = Math.floor(au.duration % 60);

        // example 12.3234 seconds
        document.getElementById("urlOutput").innerHTML = au.src;
        document.getElementById("songDuration").innerHTML = (durationMinutes + ":" + durationSeconds);
        // Alternatively, just display the integer value with
        // parseInt(duration)
        // 12 seconds
        },false);
    
}




function requestUserRepo() {
    // create new XMLHttpRequest object
    const xhr = new XMLHttpRequest();
    var username = document.getElementById("githubUsername").value;
    // GitHub endpoint, dynamically passing in specified username
    const url = `https://api.github.com/users/${username}/repos`;

    // Open a new connection, using a GET request via URL endpoint
    // Providing 3 arguments (GET/POST, The URL, Async True/False)
    xhr.open('GET', url, true);

    xhr.onload = function() {
    
        // Parse API data into JSON
        const data = JSON.parse(this.response);
        
        // Log the response
        console.log(data);
    
    }
    
    // Send the request to the server
    xhr.send();
}