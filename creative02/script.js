/*global fetch*/
/*global moment*/
document.getElementById("movieSubmit").addEventListener("click", function(event) {
    event.preventDefault();
    const value = document.getElementById("movieInput").value;
    if (value === "")
        return;
    console.log(value);
    const url = "http://www.omdbapi.com/?t=" + value + "&apikey=404df8f3";
    fetch(url)
        .then(function(response) {
            return response.json();
        }).then(function(json) {
            console.log(json);
            let result = "";
            result += '<h1>Title: ' + json.Title + "</h1>";
            if (json.Released === "N/A") {
                result += '<h2>Released: ' + json.Year + '    Rated: ' + json.Rated + '</h2>';
            }
            else {
                result += '<h2>Released: ' + json.Released + '    Rated: ' + json.Rated + '</h2>';
            }
            result += '<p>Runtime: ' + json.Runtime + '    Genre: ' + json.Genre;
            result += '<br>PLOT: ' + json.Plot;
            result += '<br>Staring: ' + json.Actors + '</p>';
            
            result += '<br><p><img src="' + json.Poster + '">';
            result += '<br><ul>';
            for (let i = 0; i < json.Ratings.length; i++) {
                result += '<li>' + json.Ratings[i].Source + ": " + json.Ratings[i].Value + '</li>';
            }
            result += '</ul>';
            document.getElementById("movieResult").innerHTML = result;
        });

});
