function mapV2(){
	function setup_map() {

	 	var mapOptions = {
	 		zoom: 15,
	 		center: new google.maps.LatLng(44.833, -0.567)
	 	};

	 	var map = new google.maps.Map(document.getElementById('map'), mapOptions);

	 	// var marker = new google.maps.Marker{

	 	// }

	}

	google.maps.event.addDomListener(window, 'load', setup_map());

	Bar = function () {

	};

	Bar.prototype = {
		init: function() {

		},

		getBarsLocation: function() {
			var jsonUrl = window.location.origin + '/bars.json';
			var jsonBars = [];

	    	$.getJSON(jsonUrl, function(bar){
	        	$.each(bar, function(index){
		            jsonBars[index] = [bar[index].id, bar[index].name, bar[index].latitude, bar[index].longitude];
		        })
		    })

	    	return jsonBars;
		}
	}

	bar = new Bar;
	bars = bar.getBarsLocation();
	console.log(bars
		);
}
