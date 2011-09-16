
var foursq = {

  client_id: foursq_client_id,
  auth_url: 'https://foursquare.com/oauth2/authenticate',
  redir_url: 'http://' + foursq_redir_url,
  endpoint_url: 'https://api.foursquare.com/v2/users/self',
  climit: 250,
  cmax: 15,
  frequency: 3000,

  atoken: null,

  user: false,
  checkins: false,

  timer: null,
  speed: 2500,
  current: 0,

  category: Array(),

  init: function () {
    if (this.haveAccessToken()) { // got access token?
      return this.getData(); // console.log(this);
    }
    else {
      this.getAccessToken(); // redirect to get token
    }
    return false;
  },

  haveAccessToken: function () {
    var resp = /[A-Z0-9]{48}/.exec(location.hash);
    this.atoken = resp ? resp[0] : null;
    return resp ? resp[0] : false;
  },

  getAccessToken: function () {
    window.location = this.auth_url + '?client_id=' + this.client_id + '&response_type=token&redirect_uri=' + this.redir_url;
  },

  getData: function () {
    var self = this;
    $.ajaxSetup({ async: false, dataType: 'json' });
    $.get(this.endpoint_url + '?oauth_token=' + this.atoken, null,
      function (data) { if (200 == data.meta.code) { self.user = data.response.user; } });
    $.get(this.endpoint_url + '/checkins?limit=' + this.climit + '&oauth_token=' + this.atoken, null,
      function (data) { if (200 == data.meta.code) { self.checkins = data.response.checkins; self.cmax = data.response.checkins.items.length; }});
    if ('undefined' != typeof cmax_or && cmax_or > -1) self.cmax = cmax_or;
    return (self.user && self.checkins);
  },

  getFirstCheckin: function () {
    checkin = this.checkins.items[this.cmax - 1];
    this.current = this.cmax;
    return checkin.venue.location;
  },

  run: function () {
    this.timer = setInterval(function() { foursq.next(); }, this.frequency); // 00
  },

  next: function () {
    if (this.current - 1 < 0) {
      // this.current = this.cmax; // this.checkins.count; console.log(this.current);
      clearInterval(this.timer);
    }
    this.seek(this.current - 1);
  },

  seek: function (i) {
    checkin = this.checkins.items[i];
    // console.log(checkin);
    if (checkin && checkin.venue) {
      var checkindate = new Date(checkin.createdAt * 1000);
      var categoryname = (checkin.venue && checkin.venue.type != 'venueless' && checkin.venue.categories[0]) ? checkin.venue.categories[0].name : '';
      gmap.goToCheckin(checkin.venue.location, checkin.venue.name, checkindate.toLocaleDateString(), categoryname);
    }

    // Some venue have disapeared ("type": "venueless")
    if (checkin && checkin.venue && checkin.venue.type!='venueless' && checkin.venue.categories[0]) {
      var categoryId        = String(checkin.venue.categories[0].id);
      var categoryName      = checkin.venue.categories[0].name;
      var categoryIcon      = checkin.venue.categories[0].icon;
      if(typeof(this.category['count']) == 'undefined')
        this.category['count'] = Array();
      if(typeof(this.category['count'][categoryId]) == 'undefined')
        this.category['count'][categoryId] = 0;
      if(typeof(this.category['count']['global']) == 'undefined')
        this.category['count']['global'] = 0;

      this.category['count'][categoryId]++;
      this.category['count']['global']++;

      categoryIcon = categoryIcon ? '  <image x="50%" y="75%" width="32" height="32" xlink:href="'+ categoryIcon +'" transform="translate(-16, -16)" />' : '';
//      categoryName = categoryName ? '  <text x="50%" y="25%" dx="5" dy="15" font-size="12" text-align="center">'+ categoryName +'</text>' : '';
      categoryName = categoryName;

      if(!document.getElementById('_'+ categoryId)) {
        var categoryColor = ''+ ((Math.floor(Math.random()*15)).toString(16)) + ((Math.floor(Math.random()*15)).toString(16)) + ((Math.floor(Math.random()*15)).toString(16));
        // create the <svg> element for each category
        $('#container').append(''
          + '<svg id="_'+ categoryId +'" class="category">'
          + '  <rect x="0" y="0" width="100%" height="50%" fill="#'+ categoryColor +'" />'
          + '  <line class="marker" x1="50%" y1="25%" x2="50%" y2="75%" marker-start="url(#anchorToBoxMiddle)" />'
          + categoryIcon
          + categoryName
          + '</svg>');
      }
      this.resizeCategories(this.category['count']);
//      alert(checkin.venue.id);
    }

    this.current--;
  },

  resizeCategories: function(counters) {
    var categories  = $('.category');
    var catLength   = categories.length;
    var percent, previousCategoryWidth, previousCategoryX, relativeX;

    for(var i = 0 ; i < categories.length ; i++) {
      id      = String($(categories[i]).attr('id').replace('_',''));
      percent = 100 * counters[id]/counters['global'];
      $(categories[i]).attr('width', percent +"%");

      // remove the label if it doesn't fit anymore
      if(categories[i].getBBox().width <= 32) {
        $(categories[i]).children('line, image').attr('opacity', 0);
      }
      else $(categories[i]).children('line, image').attr('opacity', 1);

      previousCategoryWidth = i == 0 ? 0 : $(categories[i]).prev().attr('width').replace('%','');
      previousCategoryX     = i == 0 ? 0 : $(categories[i]).prev().attr('x').replace('%','');
      relativeX             = typeof(previousCategoryWidth) != 'undefined' ? Number(previousCategoryWidth) + Number(previousCategoryX) : 0;

      $(categories[i]).attr('x', relativeX +"%");
/*
      console.log(''
        +'\n id: '+ id
        +'\n catLength: '+ catLength
        +'\n counters[id]: '+ counters[id]
        +'\n counters["global"]: '+ counters['global']
        +'\n percent: '+ percent
        +'\n previousCategoryWidth: '+ previousCategoryWidth
        +'\n previousCategoryX: '+ previousCategoryX
        +'\n relativeX: '+ relativeX
        );
*/
    }
  }

};
