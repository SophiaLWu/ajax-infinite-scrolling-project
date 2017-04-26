
$(document).ready(function() {

  var page = 1;
  var numberMovies = 10;
  var moviesLeft = true;
  var query = "";

  var searchMovies = function() {
    query = $("#search-form").serialize();
    getMovies(page, query)
  };

  var getMovies = function(page, query) {
    $.ajax({
      url: "http://www.omdbapi.com/?" + query + "&page=" + page,
      type: "GET", 
      dataType: "json",
      beforeSend: function() {
        if (moviesLeft) $(".loading").text("Loading...");
      },
      success: function(movies) {
        if (movies["Search"] === undefined) moviesLeft = false;
        if (moviesLeft) addMovies(movies);
      },
      error: function(xhr) {
        alert("Error occured.please try again");
        $(".loading").text(xhr.statusText + xhr.responseText);
        $(".loading").text();
      },
      complete: function() {
        if (moviesLeft) {
          $(".loading").text();
        } else {
          $(".loading").text("No movies left.");
        }
      }
    });
  };

  var addMovies = function(movies) {
    for (var i = 0; i < numberMovies; i++) {
      var movie = movies["Search"][i];
      if (movie === undefined) {
        $(".loading").text("No movies left.");
      } else {
        $(".movies-container").append("<div class='movie'>" +
                                      "<p class='title'>" + movie.Title + "</p>" +
                                      "<p>" + movie.Year + "</p></div>");
      }
    }
    numberMovies += 10;
    page += 1;
  };

  $("#search-form").submit(function(event) {
    event.preventDefault();
    $(".movies-container").empty();
    page = 1;
    numberMovies = 10;
    moviesLeft = true;
    searchMovies();
  });

  $(window).scroll(function(event) {
    if ($(window).scrollTop() + $(window).height() === $(document).height()) {
      getMovies(page, query);
    }
  });
});



