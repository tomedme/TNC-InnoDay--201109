
var foursq = {

  client_id: foursq_client_id,
  auth_url: 'https://foursquare.com/oauth2/authenticate',
  redir_url: 'http://' + foursq_redir_url,
  endpoint_url: 'https://api.foursquare.com/v2/users/self',
  venues_url: 'https://api.foursquare.com/v2/venues',
  climit: 250,
  cmax: 15,
  frequency: 2000,

  atoken: null,

  user: false,
  checkins: false,
  categories: false,

  timer: null,
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
    $.get(this.venues_url + '//categories?oauth_token=' + this.atoken, null,
      function (data) { if (200 == data.meta.code) { self.categories = data.response.categories; } });
    if ('undefined' != typeof cmax_or && cmax_or > -1) self.cmax = cmax_or;
    return (self.user && self.checkins && self.categories);
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

  getParentCategories: function(categoryName, property) {
    var categoriesTree  = this.categories;
    var numCategories   = categoriesTree.length;
    for (var i = 0 ; i < numCategories ; i++) {
      if (categoryName == categoriesTree[i].pluralName) {
      return categoriesTree[i][property];
      }
    }
  },

  /*
   * Allow easier creation of SVG elements in the DOM
   * thanks to Andrew Clover for
   * http://stackoverflow.com/questions/3642035/jquerys-append-not-working-with-svg-element/3642265#3642265
   *
   */
  makeSVG: function (tag, attrs) {
    var el= document.createElementNS('http://www.w3.org/2000/svg', tag);
    for (var k in attrs)
        el.setAttribute(k, attrs[k]);
    return el;
  },

  seek: function (i) {
    var checkin = this.checkins.items[i];

    if (checkin && checkin.venue) {
      var checkindate   = new Date(checkin.createdAt * 1000);
      var categoryname  = (checkin.venue && checkin.venue.type != 'venueless' && checkin.venue.categories[0]) ? checkin.venue.categories[0].name : '';
      gmap.goToCheckin(checkin.venue.location, checkin.venue.name, checkindate.toLocaleDateString(), categoryname);
    }

    // Some venue have disapeared ("type": "venueless")
    if (checkin && checkin.venue && checkin.venue.type!='venueless' && checkin.venue.categories[0]) {
      var categoryId      = String(checkin.venue.categories[0].parents).replace(/[^a-z0-9]/gi, '');
      var categoryName    = checkin.venue.categories[0].parents;
      var categoryIconUrl = this.getParentCategories(categoryName, 'icon');



      if(typeof(this.category['count']) == 'undefined')
        this.category['count'] = Array();
      if(typeof(this.category['count'][categoryId]) == 'undefined')
        this.category['count'][categoryId] = 0;
      if(typeof(this.category['count']['global']) == 'undefined')
        this.category['count']['global'] = 0;

      this.category['count'][categoryId]++;
      this.category['count']['global']++;

      if(!document.getElementById('_'+ categoryId)) {
        var categoryColor = ''+ ((Math.floor(Math.random()*15)).toString(16)) + ((Math.floor(Math.random()*15)).toString(16)) + ((Math.floor(Math.random()*15)).toString(16));
        // create SVG elements for each category
        // needed because SVG DOM is different from HTML DOM
        var catGroup = this.makeSVG('g', {
          'id'      : '_'+ categoryId,
          'class'   : 'category'
        });
        var catRect = this.makeSVG('rect', {
          'x'       : 0,
          'y'       : 0,
          'width'   : '100%',
          'height'  : '50%',
          'fill'    : '#'+ categoryColor
        });
        var catLine = this.makeSVG('line', {
          'x1'            : '50%',
          'y1'            : '25%',
          'x2'            : '50%',
          'y2'            : '75%',
          'marker-start'  : 'url(#anchorToBoxMiddle)',
          'class'         : 'marker'
        });

        catGroup.appendChild(catRect);
        catGroup.appendChild(catLine);

        if (categoryIconUrl) {
          var categoryIcon = this.makeSVG('image', {
            'x'           : '50%',
            'y'           : '75%',
            'width'       : 32,
            'height'      : 32,
            'transform'   : 'translate(-16, -16)'
          });
          categoryIcon.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", categoryIconUrl);
          catGroup.appendChild(categoryIcon);
        }

        if (categoryName) {
          var categoryNameTag = this.makeSVG('text', {
            'x'           : '50%',
            'y'           : '15%',
            'font-size'   : 12,
            'text-align'  : 'center',
            'text-anchor' : 'middle'
          });
          categoryNameTag.textContent = categoryName;
          catGroup.appendChild(categoryNameTag);
        }

        document.getElementById('container').appendChild(catGroup);
      }
      this.resizeCategories(this.category['count']);
    }

    this.current--;
  },

  resizeCategories: function(counters) {
    var categories  = $('.category');
    var catLength   = categories.length;
    var percent, previousCategoryWidth, previousCategoryX, relativeX;

    for(var i = 0 ; i < categories.length ; i++) {
      var id      = String($(categories[i]).attr('id').replace('_',''));
      var percent = 100 * counters[id]/counters['global'];
      var rect    = $(categories[i]).children('rect')[0];
      var line    = $(categories[i]).children('line')[0];
      var image   = $(categories[i]).children('image')[0];
      var legend  = $(categories[i]).children('text')[0];

      // set the size of the actual category based on the new checkin
      rect.setAttribute('width', percent +"%");

      // remove the label if it doesn't fit anymore
      if(rect.getBBox().width <= 32) {
        $(categories[i]).children('line, image, text').attr('opacity', 0);
      }
      else $(categories[i]).children('line, image, text').attr('opacity', 1);

      // calculate dimensions based on the new checkin
      previousCategoryWidth = i == 0 ? 0 : $(categories[i]).prev().children('rect').attr('width').replace('%','');
      previousCategoryX     = i == 0 ? 0 : $(categories[i]).prev().children('rect').attr('x').replace('%','');
      relativeX             = typeof(previousCategoryWidth) != 'undefined' ? Number(previousCategoryWidth) + Number(previousCategoryX) : 0;
      relativeMiddleX       = relativeX + percent/2;

      // update dimension and position based on the new checkin
      rect.setAttribute('x', relativeX +"%");
      line.setAttribute('x1', relativeMiddleX +"%");
      line.setAttribute('x2', relativeMiddleX +"%");
      legend.setAttribute('x', relativeMiddleX +"%");
      if(image) image.setAttribute('x', relativeMiddleX +"%");
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
