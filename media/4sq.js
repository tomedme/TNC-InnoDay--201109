
var foursq = {
  
  client_id: 'DJESXBRMCPFMPFXWQVPMXSWHZNNC33KIOWLOMIWN4LDXJCU4',
  auth_url: 'https://foursquare.com/oauth2/authenticate',
  redir_url: 'http://4sq.tedme.kaufmich.lab/index.php',
  // endpoint_url: 'https://api.foursquare.com/v2/',
  
  atoken: null,
  
  user: false,
  checkins: false,
  
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
    $.get('https://api.foursquare.com/v2/users/self?oauth_token=' + this.atoken, null, 
      function (data) { if (200 == data.meta.code) { self.user = data.response.user; } });
    $.get('https://api.foursquare.com/v2/users/self/checkins?limit=250&oauth_token=' + this.atoken, null, 
      function (data) { if (200 == data.meta.code) { self.checkins = data.response.checkins; }});
    return (self.user && self.checkins);
  }
  
};
