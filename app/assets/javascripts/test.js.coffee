$ ->
	initialise = () ->
		to_print = $('#map-canvas').data 'latitude'
		alert(to_print)

	$ -> 
		initialise()