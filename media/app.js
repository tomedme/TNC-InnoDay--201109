
$(document).ready(function () {
  if (foursq.init()) {
    gmap.init(foursq.getFirstCheckin());

    // go through checkins
    foursq.run();
  }
  else {
    if (console) console.log('Couldn\'t load data...');
  }
});
