
var foursq = {

  client_id: foursq_client_id,
  auth_url: 'https://foursquare.com/oauth2/authenticate',
  redir_url: 'http://' + foursq_redir_url,
  endpoint_url: 'https://api.foursquare.com/v2/users/self',
  climit: 250,
  cmax: 15,

  atoken: null,

  user: false,
  checkins: false,

  timer: null,
  current: 0,

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
    return (self.user && self.checkins);
  },

  getFirstCheckin: function () {
    checkin = this.checkins.items[this.cmax - 1];
    this.current = this.cmax;
    return checkin.venue.location;
  },

  run: function () {
    this.timer = setInterval(function() { foursq.next(); }, 2500); // 00
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
    // console.log(checkin.venue.name);
    if (checkin && checkin.venue) gmap.goToCheckin(checkin.venue.location, checkin.venue.name);
    this.current--;
  }

};
