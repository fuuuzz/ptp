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




