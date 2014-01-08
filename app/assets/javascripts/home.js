$(window).ready(function(){
    barState = true;

    init();
    document.addEventListener('touchmove', function(event) {
        if(event.target.parentNode.className.indexOf('noBounce') != -1 || event.target.className.indexOf('noBounce') != -1 ) {
            event.preventDefault(); }
    }, false);

    var scrollable = document.getElementById("cache-container");
    new ScrollFix(scrollable);
})


function init(){
    showHideOptions();
    map();
    swipeBarsContainer();
    /***
    hidePhoneBar(); 
    setupLoader()
    */
    
}

// Show or Hide option panel (search bar)
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
//            $btnOptions.text('+');
        }else{
            $optionsBox.show();
            $optionsBox.animate({top: 60}, 300);
            isOpened=true;
//            $btnOptions.text('-');
        }
    })
}

function swipeBarsContainer(){
    window.addEventListener('load', function() {
        var $barsCont = document.getElementById('bars'),
            $container = $('#cache-container'),
            $languette = document.getElementById('languette');


        Hammer($languette).on("swipedown dragdown", function(event) {
            if (barState){
                $('#bars').animate({bottom: "-140"}, 300);
                barState = false;
            }
            else return
        });
        Hammer($languette).on("swipeup dragup", function(event) {
            if (!barState){
                $('#bars').animate({bottom: "0"}, 300);
                barState = true;
            }
            else return
        });




    }, false);
}

function open_rate_box(){

    $('#rate').on('click', function(){
        var $newRate = $('#new-rate');
        $newRate.fadeIn();
    })
}

function close_rate_box(){
    var $newRate = $('#new-rate');

    $newRate.fadeOut();
}

/***
function setupLoader(){
    $('#loading').hide()
        .ajaxStart(function() {
            $(this).show();
        })
        .ajaxStop(function() {
            $(this).hide();
        });
}



function setupPanelOthers(){
    var $panelOthers = $('#others'),
        phoneHeight = $('#mobile-container').height(),
        barsHeight = $('#bars').height(),
        headerHeight = $('#header').height();


    $panelOthers.height(phoneHeight-headerHeight);

   
    //Add a bar
    var $addBar = $('#add-bar'),
        $loginBtn = $('.login-btn');

    $addBar.on('click', function(){
       showAddBarInterface();
    });
    $loginBtn.on('click', function(){
        showAddBarInterface();
    });

    function showAddBarInterface(){
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


function transformPrice(a){
    var price = ('"'+a+'"')
    var newPrice = price.replace('.', ',');
    console.log(newPrice);

    return(newPrice);
}


function createStars(jauge, rate){
    jauge.width((rate/5*100)+'%');
}

function hidePhoneBar(){
    var page = document.getElementById('mobile-container'),
        ua = navigator.userAgent,
        iphone = ~ua.indexOf('iPhone') || ~ua.indexOf('iPod'),
        ipad = ~ua.indexOf('iPad'),
        ios = iphone || ipad,
    // Detect if this is running as a fullscreen app from the homescreen
        fullscreen = window.navigator.standalone,
        android = ~ua.indexOf('Android'),
        lastWidth = 0;

    if (android) {
        window.onscroll = function() {
            page.style.height = window.innerHeight + 'px'
        }
    }
    var setupScroll = window.onload = function() {
        if (ios) {
            var height = document.documentElement.clientHeight;
            if (iphone && !fullscreen) height += 60;
            page.style.height = height + 'px';
        } else if (android) {
            page.style.height = (window.innerHeight + 56) + 'px'
        }
        setTimeout(scrollTo, 0, 0, 1);
    };
    (window.onresize = function() {
        var pageWidth = page.offsetWidth;
        if (lastWidth == pageWidth) return;
        lastWidth = pageWidth;
        setupScroll();
    })();

}
*/

//Autocomplete for new bar form
function autocompleteNew() {
    var options = {
        componentRestrictions: { country: 'fr'}
    }
    var input = (document.getElementById('bar_address'));
    var autocomplete = new google.maps.places.Autocomplete(input, options);
}