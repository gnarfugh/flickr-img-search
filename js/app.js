$(document).ready(function() {

  $('form').submit(function(e) {
    e.preventDefault();
    var $searchField = $('#search');
    var $submitButton = $('#submit');

    $searchField.prop("disabled", true);
    $submitButton.attr("disabled", true).val("searching...");

    // AJAX
    var flickerAPI = "http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?";
    var searchTerm = $searchField.val();
    var flickrOptions = {
      tags: searchTerm,
      format: "json"
    };
  
    //Show images if no error
    function displayPhotos(data) {
      if ($.isEmptyObject(data.items) === false) {
        $('#photos').show();
        var photoHTML = '<ul>';
        $.each(data.items, function(i, photo) {
          var date = new Date(photo.date_taken);
          photoHTML += '<li class="grid-25 tablet-grid-50">';
          photoHTML += '<a href="' + photo.link + '" class="image">';
          photoHTML += '<img src="' + photo.media.m + '">';
          photoHTML += '</a><p>Photo by<br>' + photo.author.slice(19, -1) + '<br>on ' + photo.date_taken.slice(0, 10) + ' at ' + photo.date_taken.slice(11, 16) + '</p></li>';
        }); 
        // end each
        
        //if search cannot find tags, throw error
        photoHTML += '</ul>';
        $('#photos').html(photoHTML);
        $('#error').hide();
      } else {
        $('#photos').hide();
        $('#error').html('<h2>We cannot find anything with that term, please try again</h2>').show();
      }
      $searchField.prop("disabled", false);
      $submitButton.attr("disabled", false).val("Submit");
    }
    $.getJSON(flickerAPI, flickrOptions, displayPhotos);

  }); // end submit

}); // end
