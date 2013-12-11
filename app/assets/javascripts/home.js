function setupPanelOthers(){
    var $panelOthers = $('#others'),
        phoneHeight = $('#mobile-container').height(),
        barsHeight = $('#bars').height(),
        headerHeight = $('#header').height();

    $panelOthers.height(phoneHeight-headerHeight);

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

                openPanelOthers(newbar);
                $addBar.hide();
                $('#close-new').on('click', function(){
                    closePanelOthers();
                    $addBar.show();
                })
            });
        })
    }

    function closePanelOthers(){
        $panelOthers.animate({left:'100%'}, 300, function(){
            $panelOthers.contents().remove();
        });
    }
    function openPanelOthers(within){
        $panelOthers.append( within );
        $panelOthers.animate({left: 0}, 300);
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
//Show the Sign Up menu
function showSignUp(){
    var $signIn = $('#signIn');
    $.ajax({
        url:  window.location.origin + '/members/sign_up',
        cache: true
    })
    .done(function( signup ) {
        $signIn.contents().remove();
        $signIn.append(
            "<div id='SignUp>'" + signup + "</div>"
        )
    });
}

//Show/Hide options panel
function showHideOptions(){
    var $optionsBox = $('#options'),
        $btnOptions = $('#btn-opt'),
        isOpened = false;

    $optionsBox.hide();

    $btnOptions.on('click', function(){
        if (isOpened){
            $optionsBox.animate({top: -10}, 300, function(){
                $(this).hide()
            });
            isOpened=false;
            $btnOptions.text('+');
        }else{
            $optionsBox.show();
            $optionsBox.animate({top: 60}, 300);
            isOpened=true;
            $btnOptions.text('-');
        }
    })


}
$(window).ready(function(){
    console.log("GO");
    init();
})


function init(){
    map();
    showHideOptions();
}

function transformPrice(a){
    var price = ('"'+a+'"')
    var newPrice = price.replace('.', ',');
    console.log(newPrice);

    return(newPrice);
}

function createStars(jauge, rate){
    jauge.width((rate/5*100)+'%');
}