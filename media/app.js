
$(window).ready(function () {
  
  // do stuff
  var go = foursq.init();
  
  // if (go) {
    gmap.init({ lat: 31.2, lng: 121.5 });
  
    // setup svg box in the right place
    $('#svg').css({ left: ($('#'+ gmap.map_dom_id).width() / 2) - 400 + 'px', bottom: '20px' }).show();
  // }
  
});
