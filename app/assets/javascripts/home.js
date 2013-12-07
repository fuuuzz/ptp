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
    var input = (document.getElementById('bar_address'));
    var autocomplete = new google.maps.places.Autocomplete(input, options);
}
//Show the sign in menu
function showSignIn(){
    var $signIn = $('#signIn');
    $.ajax({
        url:  window.location.origin + '/members/sign_in',
        cache: true
    })
    .done(function( signin ) {
        $signIn.append( signin );
    });
}




