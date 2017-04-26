var page = 1;
var numberMovies = 10;
var moviesLeft = true;

var getMovies = function(page) {
  $.ajax({
    url: "http://www.omdbapi.com/?" + "s=star wars episode&page=" + page,
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
}

var addMovies = function(movies) {
  for (var i = 0; i < numberMovies; i++) {
    var movie = movies["Search"][i];
    if (movie != undefined) {
      $(".movies-container").append("<div class='movie'>" +
                                    "<p class='title'>" + movie.Title + "</p>" +
                                    "<p>" + movie.Year + "</p></div>");
    }
  }
  numberMovies += 10;
  page += 1;
};

console.log($(window).height());
console.log($(document).height());

var movies = getMovies(page);
$(window).scroll(function(event) {
  if ($(window).scrollTop() + $(window).height() === $(document).height()) {
    getMovies(page);
  }
});
