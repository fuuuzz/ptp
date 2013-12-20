$(window).ready(function(){
    init();
})


function init(){
    showHideOptions();
    map();
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
            $btnOptions.text('+');
        }else{
            $optionsBox.show();
            $optionsBox.animate({top: 60}, 300);
            isOpened=true;
            $btnOptions.text('-');
        }
    })
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

//Autocomplete for new bar form
function autocompleteNew() {
    var options = {
        componentRestrictions: { country: 'fr'}
    }
    var input = (document.getElementById('bar_address'));
    var autocomplete = new google.maps.places.Autocomplete(input, options);
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