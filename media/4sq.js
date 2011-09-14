
var foursq = {
  
  client_id: 'DJESXBRMCPFMPFXWQVPMXSWHZNNC33KIOWLOMIWN4LDXJCU4',
  auth_url: 'https://foursquare.com/oauth2/authenticate',
  redir_url: 'http://4sq.tedme.kaufmich.lab/index.php',
  
  checkins: {},
  
  init: function () {
    if (this.haveAccessToken()) { // got access token?
      this.getCheckins();
      // return true;
    }
    else {
      this.getAccessToken(); // redirect to get token
    }
    
    return false;
  },
  
  haveAccessToken: function () {
    var resp = /[A-Z0-9]{48}/.exec(location.hash);
    return resp ? resp[0] : false;
  },
  
  getAccessToken: function () {
    window.location = this.auth_url + '?client_id=' + this.client_id + '&response_type=token&redirect_uri=' + this.redir_url;
  },
  
  getCheckins: function () {
  },
  
  getThroughCheckins: function () {
  }
  
};
