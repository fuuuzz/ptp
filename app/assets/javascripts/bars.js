var options = {
    componentRestrictions: {country: 'fr'}
};
var input = document.getElementById('bar_address');
autocomplete = new google.maps.places.Autocomplete(input, options);

