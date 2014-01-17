$(window).ready(function(){
    barState = true;

    init();
    document.addEventListener('touchmove', function(event) {
        if(event.target.parentNode.className.indexOf('noBounce') != -1 || event.target.className.indexOf('noBounce') != -1 ) {
            event.preventDefault(); }
    }, false);

    var scrollable = document.getElementById("cache-container");
    new ScrollFix(scrollable);
    var contact = document.getElementById("new_submission");
    new ScrollFix(contact);
    var map = document.getElementById("map");
    new ScrollFix(map);
})


function init(){
    showHideOptions();
    map();
    swipeBarsContainer();
    showHideNotice();
}

// Show or Hide option panel (search bar)
function showHideOptions(){
    var $optionsBox = $('#options'),
        $btnOptions = $('#btn-opt'),
        isOpened = false,
        $btnMenu = $('#menu-icon'),
        $menuBox = $('#menu'),
        $closeBtn = $('#close-icon');

    $optionsBox.hide();
    $menuBox.hide();

    $btnOptions.on('click', function(){
        if (isOpened){
            $optionsBox.animate({top: -10}, 300, function(){
                $(this).hide()
            });
            isOpened=false;
        }else{
            $optionsBox.show();
            $optionsBox.animate({top: 45}, 300);
            isOpened=true;
        }
    })
    $btnMenu.on('click', function(){
        if (isOpened){
            $menuBox.animate({top: -40}, 300, function(){
                $(this).hide()
            });
            isOpened=false;
        }else{
            $menuBox.show();
            $menuBox.animate({top: 45}, 300);
            isOpened=true;
        }
    })

    var $submissionBtn = $('#submission-btn'),
        $fullPop = $('#full-popin'),
        previewUrl = window.location.origin + '/contact',
        $noBarBtn = $('#open-submission');


    $submissionBtn.on('click', function(){
        $.ajax({
            url: previewUrl,
            cache: true
        })
            .done(function( page ){

                $btnMenu.hide();
                $btnOptions.hide();
                $closeBtn.show();

                $menuBox.animate({top: -40}, 300, function(){
                    $(this).hide()
                });
                isOpened=false;

                $fullPop.append(page);

                $fullPop.fadeIn();

                init_submission();

                $closeBtn.on('click', function(){
                    $fullPop.fadeOut(function(){
                        $fullPop.children().remove();
                    })
                    $closeBtn.hide();
                    $btnOptions.show();
                    $btnMenu.show();
                })


            })
    })
    $noBarBtn.on('click', function(){
        $.ajax({
            url: previewUrl,
            cache: true
        })
            .done(function( page ){

                $btnMenu.hide();
                $btnOptions.hide();
                $closeBtn.show();

                $menuBox.animate({top: -40}, 300, function(){
                    $(this).hide()
                });
                isOpened=false;

                $fullPop.append(page);

                $fullPop.fadeIn();

                init_submission();

                $closeBtn.on('click', function(){
                    $fullPop.fadeOut(function(){
                        $fullPop.children().remove();
                    })
                    $closeBtn.hide();
                    $btnOptions.show();
                    $btnMenu.show();
                })


            })
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



function showHideNotice(){
    var $noticeBox = $('.notice');

    if ($noticeBox.is(':empty')){
        $noticeBox.hide();
    }else{
        $noticeBox.show().delay(3000).fadeOut();
    }
}
//Autocomplete for new bar form
function autocompleteNew() {
    var options = {
        componentRestrictions: { country: 'fr'}
    }
    var input = (document.getElementById('bar_address'));
    var autocomplete = new google.maps.places.Autocomplete(input, options);
}