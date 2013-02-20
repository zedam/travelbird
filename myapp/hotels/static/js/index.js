$(function(){
  /* Creating the source for autocompliting the cities,
    it could be done by ajax, but in this case it is better
    to do it just with only javascript,
    there are less than 10 cities and we avoid to call the server,
    and the cities are loaded from the hotels object by backend.
    Also, like this we avoid to load a city that perhaps there is
    no hotel linked to it.
   */
  source = [];
  sourceLi = $('.cities').find('li');
  $.each(sourceLi, function(v){
    if($.inArray($(this).html(), source)=='-1'){
      source.push($(this).html());
    }
  });

  /* Autocomplete using bootstrap typeahead */
  $('#city').typeahead({
    source: source,
    highlighter: function(item) {
      return item;
    },
    updater: function(item) {
      getHotels(item);
      return item;
    },
    minLength: 0,
    items: 5
  });

  // Date range picker loaded
  $('#date_range').daterangepicker({
    format: 'yyyy-MM-dd',
    separator: ' / '});


  /* Selecting the date range, click action.
       We could have avoided the "live" action,
       but is always better to use it*/

  $('.btn-success').live('click', function(){
    var city = $('#city').val();
    getHotels(city);
  });

  /* Func to clean the nput for writing the city */
  $('#city').click(function(){
    if($(this).val() == 'Enter your city...'){
      $(this).val('');
    }
  });

  /* To reset filters */
  $('.reset').live('click', function(){
    var city = $('#city').val('');
    var date_range = $('#date_range').val('');
    getHotels(city);
  });
});

/* Ajax call, we put only the city as parameter
      to avoid conflicts with autocomplete function
      updating the source */

function getHotels(city){
  $('#preloader').show();
  city = (city != "Enter your city...") ? city : '';
  var date_range = $('#date_range').val();
  var csrftoken = getCookie('csrftoken');
  $.ajax({
    type: "POST",
    url: "get_hotels/",
    data: {
      'csrfmiddlewaretoken': csrftoken,
      'city': city,
      'date_range': date_range }
  }).done(function( data ) {
    $('#hotels_results').html(data.html);
    $('#preloader').hide();
  });
}