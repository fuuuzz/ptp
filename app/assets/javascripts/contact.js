//function _init_submission_form(){
//    var $formContainer = $('#submission-container'),
//        $steps = $('.step'),
//        $inputs = $('input'),
//        $iName = $('#submission_name'),
//        $iAddress = $('#submission_address'),
//        $iPrice = $('#submission_price'),
//        $iHStart = $('#submission_happy_start'),
//        $iHEnd = $('#submission_happy_end'),
//        $iHPrice = $('#submission_happy_price'),
//        $iEmail = $('#submission_email'),
//        cPos = 0,
//        stepH = $steps.height(),
//        stepW = $steps.width(),
//        $backBtn = $('.back'),
//        $nextBtn = $('.next');
//
//
//
//    //Particulars conditions :
//    $('#continue').on('click', function(){
//        nextStep();
//    });
//
//    $('#happy-yes').on('click', function(){
//        nextStep();
//        $('#st5, #st6, #st7').show();
//        cPos = 5;
//    });
//
//    $('#happy-no, #happy-unknow').on('click', function(){
//        $('#st5, #st6, #st7').hide()
//        nextStep();
//        $iHStart.val('');
//        $iHEnd.val('');
//        $iHPrice.val('');
//        cPos = cPos+3;
//    });
//    $backBtn.on('click', function(){
//        if ( !$('#st5, #st6, #st7').is(':visible') && cPos == 8){
//            cPos = 5;
//        }
//        prevStep();
//    })
//
//    $inputs.on('keypress keydown', function(e){
//        if (cPos == 1){
//            nextStep($iName, e);
//        }else if (cPos == 2){
//            nextStep($iAddress, e);
//        }else if (cPos == 3){
//            nextStep($iPrice, e);
//        }else if (cPos == 4){
//            //See click event up
//        }else if (cPos == 5){
//            nextStep($iHStart, e);
//
//        }else if (cPos == 6){
//            nextStep($iHEnd, e);
//
//        }else if (cPos == 7){
//            nextStep($iHPrice, e);
//
//        }else if (cPos == 8){
//            nextStep($iEmail, e);
//        }
//    });
//    $nextBtn.on('click', function(){
//        if (cPos == 1){
//            nextStep($iName);
//        }else if (cPos == 2){
//            nextStep($iAddress);
//        }else if (cPos == 3){
//            nextStep($iPrice);
//        }else if (cPos == 4){
//            //See click event up
//        }else if (cPos == 5){
//            nextStep($iHStart);
//        }else if (cPos == 6){
//            nextStep($iHEnd);
//        }else if (cPos == 7){
//            nextStep($iHPrice);
//        }else if (cPos == 8){
//            nextStep($iEmail);
//        }
//    });
//
//
//    function nextStep($input, e){
//        if ($input){
//
//            if(e && e.which == 13) {
//                if($input.val()){
//                    $formContainer.show().delay(400).animate({left: '-='+stepW}, function(){
//                        cPos++;
//                        $input.blur();
//                        $inputs.eq(cPos+1).focus();
//                    });
//                }
//            }else if(!e){
//                if($input.val()){
//                    $formContainer.show().delay(400).animate({left: '-='+stepW}, function(){
//                        cPos++;
//                        $input.blur();
//                        $inputs.eq(cPos+1).focus();
//                    });
//                }
//            }
//        }
//        else{
//            $formContainer.animate({left: '-='+stepW});
//            cPos++;
//        }
//        console.log(cPos);
//    }
//    function prevStep(){
//        $formContainer.animate({left: '+='+stepW});
//        cPos--;
//        console.log(cPos);
//    }
//    $(window).keydown(function(event){
//        if((cPos !=9 && event.keyCode == 13) || event.keyCode == 9) {
//            event.preventDefault();
//            return false;
//        }
//    });
//
//    $('input').not('#send-it').focus(function() {
//        $('input').not($(this)).attr('disabled', 'disabled');
//    }).blur(function() {
//        $('input').not($(this)).removeAttr('disabled');
//    });
//}

function init_submission(){
    var $formContainer = $('#submission-container'),
        $happyContainer = $('.happy-option'),
        $yesBtn = $('.yes'), $noBtn = $('.no');

    $happyContainer.hide();
    $happyContainer.height(0);
    $yesBtn.on('click', function(){
        $noBtn.removeClass('clicked');
        $(this).addClass('clicked');
        $happyContainer.show(function(){
            $happyContainer.animate({height:72}, 300);
        });
    })
    $noBtn.on('click', function(){
        $yesBtn.removeClass('clicked');
        $(this).addClass('clicked');
        $happyContainer.animate({height:0}, 300, function(){
            $happyContainer.hide();
        });

    })
}

function submission_confirm(){
    var $inputsText = $('.text'),
        $iPrice = $('#submission_price'),
        $iHPrice = $('#submission_happy_price'),
        $happyBox = $('.happy-option'),
        $iEmail = $('#submission_email');

    $inputsText.removeClass('input-error');
    $iPrice.parent().css({color:'#000000'});
    $iEmail.css({color:'#000000'});

    $inputsText.each(function(){
        if($(this).attr('id') == $iEmail.attr('id')){
            if(validateEmail($(this).val()) ){
                return;
            }else{
                $(this).css({color:'#ce2a39'})
                event.preventDefault();
            }
        }
        if(!$(this).val()){
            $(this).addClass('input-error');
            event.preventDefault();
        }else{
            return;
        }

    })
    $iPrice.each(function(){
        if(!$(this).val()){
            $(this).parent().css({color:'#ce2a39'});
            event.preventDefault();
        }else{
            return;
        }
    })
    if($happyBox.is(':visible')){
        $iHPrice.each(function(){
            if(!$(this).val()){
                $(this).parent().css({color:'#ce2a39'});
                event.preventDefault();
            }else{
                return;
            }
        })
    }
    function validateEmail(email) {
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }
}