
$(window).ready(function () {
  
  // do stuff
  var go = foursq.init();
  
  if (go) {
    gmap.init({ lat: 0.0, lng: 0.0 });
  }
  
});
