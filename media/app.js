
$(window).ready(function () {
  
  // do stuff
  if (foursq.init()) {
    gmap.init(foursq.getFirstCheckin());

    // go through checkins
    foursq.run();
  }
  else {
    alert('Couldn\'t load data...');
  }

});
