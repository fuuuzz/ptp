(function() {
    jQuery(function() {
        $('body').prepend('<div id="fb-root"></div>');
        return $.ajax({
            url: "" + window.location.protocol + "//connect.facebook.net/en_US/all.js",
            dataType: 'script',
            cache: true
        });
    });

    window.fbAsyncInit = function() {
        FB.init({
            appId: '435803716520289',
            channelUrl : 'http://localhost:3000' ,
            status : true, // check login status
            cookie : true, // enable cookies to allow the server to access the session
            xfbml  : true  // parse XFBML
        });
        $('#sign_in').click(function(e) {
            e.preventDefault();
            return FB.login(function(response) {
                if (response.authResponse) {
                    return window.location = '/auth/facebook/callback';
                }
            });
        });
        return $('#sign_out').click(function(e) {
            FB.getLoginStatus(function(response) {
                if (response.authResponse) {
                    return FB.logout();
                }
            });
            return true;
        });
    };

}).call(this);

