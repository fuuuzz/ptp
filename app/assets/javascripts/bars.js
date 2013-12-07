var options = {
    componentRestrictions: {country: 'fr'}
};
var input = document.getElementById('bar_address');
autocomplete = new google.maps.places.Autocomplete(input, options);

function checkPosition(){
    var $inputAddress = $('#bar_address');
    var geocoder = new google.maps.Geocoder();
    // Try HTML5 geolocation
    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var pos = new google.maps.LatLng(position.coords.latitude,
                position.coords.longitude);
            geocoder.geocode({'latLng': pos}, function(results){
                var address = results[0].formatted_address;
                $inputAddress.val(address);
            });
        })
    }
}