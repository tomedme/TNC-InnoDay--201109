
var gmap = {
	
	lat: 0,
	lng: 0,
	latlng: null,
	zoom: 10,
	
	infowindow: null,
	points: [],
	
	map: null,
	map_dom_id: 'gmap',
	
	marker_icon: 'https://chart.googleapis.com/chart?chst=d_map_pin_letter&chld=t|ffffff|000000',
	
	init: function (coords) {
		
		this.lat = coords.lat;
		this.lng = coords.lng;
		
		if ('object' == typeof google.maps && $('#'+ this.map_dom_id).length) {
			
			var s4sMapStyle = [
			  { featureType: 'road', elementType: 'labels', stylers: [ { visibility: 'off' } ] },
			  { featureType: 'landscape', stylers: [ { visibility: 'off' } ] },
			  { featureType: 'poi', stylers: [ { visibility: 'off' } ] },
			  { featureType: 'road.local', stylers: [ { visibility: 'off' } ] },
			  { featureType: 'road.arterial', stylers: [ { visibility: 'off' } ] },
			  { featureType: 'administrative', stylers: [ { visibility: 'on' } ] }
			];
			var s4sStyledMapType = new google.maps.StyledMapType(s4sMapStyle, {});
			
			this.latlng = new google.maps.LatLng(this.lat, this.lng);
			var mapOpts = {
				zoom: this.zoom,
				center: this.latlng,
				backgroundColor: 'white',
				// mapTypeId: google.maps.MapTypeId.ROADMAP,
				mapTypeControl: false,
				navigationControlOptions: {
					style: google.maps.NavigationControlStyle.ZOOM_PAN,
					position: google.maps.ControlPosition.TOP_RIGHT
				}
			};
			
			this.map = new google.maps.Map(document.getElementById(this.map_dom_id), mapOpts);
			this.map.mapTypes.set('s4s', s4sStyledMapType);
			this.map.setMapTypeId('s4s');
			
			/* var checkin = new google.maps.Marker({
				position: this.latlng,
				map: this.map,
				icon: null // this.marker_icon
      }); */
      
      this.infowindow = new google.maps.InfoWindow();

		}
		
	},
	
	goToCheckin: function (coords, venue) {
	  latlng = new google.maps.LatLng(coords.lat, coords.lng);
	  // new google.maps.Marker({ position: latlng, map: this.map });
	  this.infowindow.setContent(venue);
	  this.infowindow.setPosition(latlng);
	  this.infowindow.open(this.map);
	  this.map.panTo(latlng);
	}
	
};
