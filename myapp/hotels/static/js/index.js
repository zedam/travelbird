$(function(){
  $('#date_range').daterangepicker({
    format: 'yyyy-MM-dd',
    separator: ' / '});

  $('.btn-success').live('click', function(){
    var city = $('#city').val();
    getHotels(city);
  });

  $('#city').click(function(){
    if($(this).val() == 'Enter your city...'){
      $(this).val('');
    }
  });

  source = ["Arosa", "Freudenstadt", "Berlín", "Bratislava"];

  $('#city').typeahead({
    source: source,
    highlighter: function(item) {
    return item;
    },
    updater: function(item) {
      getHotels(item);
      return item;
    },
    minLength: 0
  });
});

function getHotels(city = null){
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
  });
}