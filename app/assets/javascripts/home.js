function setupPanelOthers(){
    var $pannelOthers = $('#others'),
        phoneHeight = $('#mobile-container').height(),
        barsHeight = $('#bars').height();

    $pannelOthers.height(phoneHeight-barsHeight-60);

    showAddBarInterface();


    //Add a bar
    function showAddBarInterface(){
        var $addBar = $('#add-bar');

        $addBar.on('click', function(){
            $.ajax({
                url:  window.location.origin + '/bars/new',
                cache: true
            })
            .done(function( newbar ) {
                $pannelOthers.append( newbar );
                $pannelOthers.animate({left: 0}, 300);
                autocompleteNew();

                $('#close-new').on('click', function(){
                    $pannelOthers.animate({left:'100%'}, 300, function(){
                        $('#new-bar').remove();
                    });
                })
            });
        })
    }
}

//autocomplete for new bar form
function autocompleteNew() {
    var options = {
        componentRestrictions: { country: 'fr'}
    }
    // Create the search box and link it to the UI element.
    var input = (document.getElementById('bar_address'));

    var searchBox = new google.maps.places.SearchBox((input,options));

    // Bias the SearchBox results towards places that are within the bounds of the
    // current map's viewport.
    google.maps.event.addListener(map, 'bounds_changed', function() {
        var bounds = map.getBounds();
        searchBox.setBounds(bounds);
    });
}




