$(document).ready(function() {


$('form').submit(function(evt) {
  evt.preventDefault();
  var $searchField = $('#search');
  var $submitButton = $('#submit');

  $searchField.prop("disabled", true);
  $submitButton.attr("disabled", true).val("searching...");

   // the AJAX part
    var flickerAPI = "http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?";
    var animal = $searchField.val();
    var flickrOptions = {
      tags: animal,
      format: "json"
    };
    function displayPhotos(data) {

      var photoHTML = '<ul>';
      $.each(data.items,function(i,photo) {
        var date = new Date(photo.date_taken);
        photoHTML += '<li class="grid-25 tablet-grid-50">';
        photoHTML += '<a href="' + photo.link + '" class="image">';
        photoHTML += '<img src="' + photo.media.m + '">';
        photoHTML += '</a><p>Photo by<br>' + photo.author.slice(19, -1) + '<br>on ' + photo.date_taken.slice(0, 10) + ' at ' + photo.date_taken.slice(11, 16) + '</p></li>';
      }); // end each
      photoHTML += '</ul>';
      $('#photos').html(photoHTML);

      $searchField.prop("disabled", false);
      $submitButton.attr("disabled", false).val("Submit");
    }
    $.getJSON(flickerAPI, flickrOptions, displayPhotos);

    }); // end submit


}); // end ready