$ ->

	latitude = $('#map-canvas').data 'latitude'
	longitude = $('#map-canvas').data 'longitude'
	myLatLng = new google.maps.LatLng(latitude, longitude)

	initialize = () ->

<<<<<<< HEAD
		mapOptions = 
=======
		mapOptions =
>>>>>>> e52d6fd16912bdf44c4a12259ea80683ab3c6fe6
			zoom: 14
			center: myLatLng
			mapTypeId: google.maps.MapTypeId.ROADMAP

		map = new google.maps.Map(document.getElementById("map-canvas"),mapOptions)

		marker = new google.maps.Marker
			map: map
			position: myLatLng
			animation: google.maps.Animation.DROP
			icon: "http://imageshack.com/a/img51/5516/xljz.png"

	$ ->
		initialize()
