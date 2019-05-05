$(document).ready(function () {

    var superheros = ["Antman", "Batman", "Superman", "Hulk", "Wonderwoman"]

    // Create divs for each gif
    var gifDiv = $("<div>");

    // Create buttons
    function renderButtons() {
        $("#buttons-view").empty();

        for (var i = 0; i < superheros.length; i++) {
            var a = $("<button>");
            a.addClass("mood");
            a.attr("data-name", superheros[i]);
            a.text(superheros[i])
            // Add to HTML
            $("#buttons-view").append(a); ''
        }
    }

    // User adding a button
    $("#add-mood").on("click", function (event) {
        event.preventDefault();
        // Fills in text from input box
        var superhero = $("#superhero-input").val().trim();
        if (superhero !== "") {
            superheros.push(superhero);
            renderButtons();
        }
    });

    $("body").on("click", ".superhero", function () {

        var giphyQuery = $(this).attr("data-name");

        // URL to search Giphy for superhero name
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
            giphyQuery + "&api_key=..........=10&lang=en";

        // AJAX GET
        $.ajax({
            url: queryURL,
            method: "GET"
        })

            // After data receieved from API
            .then(function (response) {
                var results = response.data;
                gifDiv.empty();

                // Looping over every result item
                for (var i = 0; i < results.length; i++) {
                    if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
                        var rating = results[i].rating;
                        var p = $("<p>").text("Rating: " + rating);
                        var superheroImage = $("<img>");
                        superheroImage.attr("src", results[i].images.fixed_height.url);
                        superheroImage.attr("data-still", results[i].images.fixed_height_still.url);
                        superheroImage.attr("data-state", "animate");
                        superheroImage.addClass("giphy");

                        gifDiv.append(p);
                        gifDiv.append(superheroImage);

                        $("#gifs").prepend(gifDiv);
                    }
                }
            });

        $("body").on("click", ".giphy", function () {
            var state = $(this).attr("data-state");

            if (state === "still") {
                $(this).attr("src", $(this).attr("data-animate"));
                $(this).attr("data-state", "animate");
            } else {
                $(this).attr("src", $(this).attr("data-still"));
                $(this).attr("data-state", "still");
            }
        }
        });

        renderButtons();

})
}