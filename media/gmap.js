
var gmap = {
	
	lat: 0,
	lng: 0,
	latlng: null,
	zoom: 10,
	
	markers: {},
	
	map: null,
	map_dom_id: 'gmap',
	
	marker_icon: 'https://chart.googleapis.com/chart?chst=d_map_pin_letter&chld=t|ffffff|000000',
	
	init: function (coords) {
		
		this.lat = coords.lat;
		this.lng = coords.lng;
		
		if ('object' == typeof google.maps && $('#'+ this.map_dom_id).length) {
			
			/* var witMapStyle = [ { featureType: 'all', elementType: 'all', stylers: [ { lightness: 50 }, { saturation: -100 } ] }, 
													{ featureType: 'all', elementType: 'labels', stylers: [ { gamma: 0.1 }, { lightness: -5 } ] },
													// { featureType: 'water', elementType: 'geometry', stylers: [ { hue: '#007fff' }, { saturation: 0 } ] }, 
													{ featureType: 'road', elementType: 'all', stylers: [ { visibility: 'simplified' } ] }, 
													{ featureType: 'landscape', elementType: 'all', stylers: [ { visibility: 'off' } ] }, 
													{ featureType: 'poi', elementType: 'all', stylers: [ { visibility: 'off' } ] }, 
													{ featureType: 'transit', elementType: 'all', stylers: [ { visibility: 'off' } ] }, 
													{ featureType: 'road', elementType: 'labels', stylers: [ { visibility: 'off' } ] } ];
			var witStyledMapType = new google.maps.StyledMapType(witMapStyle, {}); */
			
			this.latlng = new google.maps.LatLng(this.lat, this.lng);
			var mapOpts = {
				zoom: this.zoom,
				center: this.latlng,
				backgroundColor: 'white',
				mapTypeId: google.maps.MapTypeId.ROADMAP,
				mapTypeControl: false,
				navigationControlOptions: {
					style: google.maps.NavigationControlStyle.ZOOM_PAN,
					position: google.maps.ControlPosition.TOP_RIGHT
				}
			};
			
			this.map = new google.maps.Map(document.getElementById(this.map_dom_id), mapOpts);
			// this.map.mapTypes.set('wit', witStyledMapType);
			// this.map.setMapTypeId('wit');
			
			var checkin = new google.maps.Marker({
				position: this.latlng,
				map: this.map,
				icon: this.marker_icon
      });

		}
		
	}
	
};
