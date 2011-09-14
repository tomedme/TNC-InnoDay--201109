
$(window).ready(function () {
  
  // do stuff
  if (foursq.init()) {
    gmap.init(foursq.getFirstCheckin());
    // setup svg box in the right place
    $('#svg').css({ left: (($('#'+ gmap.map_dom_id).width() / 2) - 400) + 'px', bottom: '20px' }).show();
    // go through checkins
    foursq.run();
  }
  else {
    alert('Couldn\'t load data...');
  }
  
});
