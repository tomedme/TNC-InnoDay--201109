
$(window).ready(function () {
  
  // do stuff
  if (foursq.init()) {
    // setup svg box in the right place
    $('#svg').css({ left: (($('#'+ gmap.map_dom_id).width() / 2) - 400) + 'px', bottom: '20px' }).show();
    // go through checkins
    gmap.init({ lat: 31.2, lng: 121.5 });
  }
  else {
    alert('Couldn\'t load data...');
  }
  
});
