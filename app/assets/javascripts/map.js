init();

function init(){

    getLocation();


    var bars = getBarsLocation(),
        $bars = $(".bar"),
        $dContainer = '',
        distance = '';

    // Geolocation from user :
    function getLocation()
    {
        if (navigator.geolocation)
        {
            navigator.geolocation.getCurrentPosition(setup_map);
        }
        else{alert("Geolocation is not supported by this browser.");}
    }

    // Generate map and marker :
    function setup_map(position){

        var user = [44.8356423, -0.5729913];
//        var user = [position.coords.latitude, position.coords.longitude];

        var options = {
            zoom: 15,
            center: new google.maps.LatLng(user[0], user[1]),
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            styles: [{
                "stylers": [{
                    "hue": "#f6ff00"
                }]
            }],
            panControl: false,
            zoomControl: true,
            mapTypeControl: false,
            scaleControl: false,
            streetViewControl: false,
            overviewMapControl: false,
            rotateControl: false
        };

        var map = new google.maps.Map(document.getElementById('map'),options);

        var markers = [];

        // When the map is loaded !
        google.maps.event.addListenerOnce(map, 'idle', function(){

            var userMarker = addUserMarker(user);
            var aroundBars = getBarsAround(bars);
            CreateOrDeleteBar(markers, aroundBars);

            //when user drag map
            google.maps.event.addListener(map, 'dragend', function() {

                aroundBars = getBarsAround(bars);
                CreateOrDeleteBar(markers, aroundBars);
            }),

            //when user zoom map
            google.maps.event.addListener(map, 'zoom_changed', function() {

                aroundBars = getBarsAround(bars);
                CreateOrDeleteBar(markers, aroundBars);
            });
        });

        //Add the user marker on the map
        function addUserMarker(user){
            var UserMarker = new google.maps.Marker({
                position: new google.maps.LatLng(user[0], user[1]),
                map: map,
                animation: google.maps.Animation.DROP
            });
            return UserMarker;
        }

        //Get the bars located on the map screen
        function getBarsAround(bars){

            // On récupère les coordonnées des coins de la map
            var bds = map.getBounds();
            var South_Lat = bds.getSouthWest().lat();
            var South_Lng = bds.getSouthWest().lng();
            var North_Lat = bds.getNorthEast().lat();
            var North_Lng = bds.getNorthEast().lng();
            var aroundBars = Array();

            for (var i = 0; i < bars.length; i++) {
                if (bars[i][2] < North_Lat && bars[i][2] > South_Lat && bars[i][3] < North_Lng && bars[i][3] > South_Lng )
                {
                    aroundBars.push(bars[i]);
                }
            }

            aroundBars = distanceUserBar(aroundBars);

            return aroundBars;
        }

        //Big function to create or delete bar
        function CreateOrDeleteBar(markers, aroundBars){
            var currentMarkersId = [];
            for (var i = 0; i < markers.length; i++){
                currentMarkersId.push(markers[i][0]);
            }
            for (var i = 0; i < aroundBars.length; i++) {

                if ( currentMarkersId.indexOf(aroundBars[i][0]) < 0 ){
                    addBarMarker(aroundBars[i]);
                    showBarsPreview(aroundBars[i]);
                }
            }
            $container.height($container.height + barHeight*2);
        }

        //Add the marker bar on the map
        function addBarMarker(bar) {
            var marker = Array();
            marker[0] = bar[0];
            marker[1] = new google.maps.Marker({
                position: new google.maps.LatLng(bar[2], bar[3]),
                map: map,
                animation: google.maps.Animation.DROP,
                icon: "http://imageshack.com/a/img51/5516/xljz.png"
            });

            markers.push(marker);
            centerMarker(marker, bar);

        }

        //Screen the bar preview
        function showBarsPreview(bar){
            var previewUrl = window.location.origin + '/preview/' + bar[0];

            $.ajax({
                url: previewUrl,
                cache: true
            })
            .done(function( data ) {
                $( "#bars-container" ).append( data );
                showDistance(bar);
                markerMoveMap(bar);
            });
        }

        //Calcul the distance between user and bars
        function distanceUserBar(bars){

            var distance;

            for (var i = 0; i < bars.length; i++) {
                distance = calculHaversine(bars[i][2], bars[i][3], user[0], user[1])*1000;
                bars[i][4] = distance;
            }

            bars.sort(compare);

            function compare(a, b) {
                if (a[4] < b[4])
                    return -1;
                if (a[4] > b[4])
                    return 1;
                return 0;
            }

            return bars;
        }

        //Screen the distance between user and the bar
        function showDistance(bar){
            $dContainer = $("div").find("[data-id-bar="+ bar[0] +"]").contents().find('.distance');
            $dContainer.text(+bar[4]+"m");
        }

        //Move the center of the map to bar location
        function markerMoveMap(bar){
            var $bar = $('div').find("[data-id-bar="+ bar[0] +"]");

            $bar.click(function(){
                var Latlng = new google.maps.LatLng(bar[2], bar[3]);
                map.panTo(Latlng);
            })
        }

        //Move map to marker bar and scroll bar list
        function centerMarker(marker, bar){
            google.maps.event.addListener(marker[1], 'click', function() {
                //Moving map center to a marker when clicking on it
                var Latlng = new google.maps.LatLng(bar[2], bar[3]);
                map.panTo(Latlng);
                scrollBarsList(marker);
            });
        }
        function scrollBarsList(marker){
            var barId = marker[0],
                posVSid = [],
                $barsPrev = $('.preview-container'),
                $container = $('#cache-container'),
                $innerContainer = $('#bars-container'),
                barHeight = $barsPrev.height(),
                barPos;

            console.log(barHeight);

            $barsPrev.each(function(index){
                posVSid[index] = $(this).children('.preview').data('id-bar');

                if (posVSid[index]==barId)
                     barPos = index;
            })

            $innerContainer.height(barHeight*(posVSid.length+2));
            var time = Math.abs($container.scrollTop() -  (barHeight*barPos));
            $container.animate({scrollTop: barHeight*barPos}, time);
        }
    }
}



function getBarsLocation(){
    var jsonUrl = window.location.origin + '/bars.json';
    var jsonBars = [];

    $.getJSON(jsonUrl, function(bar){
        $.each(bar, function(index){
            jsonBars[index] = [bar[index].id, bar[index].name, bar[index].latitude, bar[index].longitude]
        })
    })

    return jsonBars;
}

// Distance calcul
function rad(x){
    return x*Math.PI/180;
}
function calculHaversine(barLat, barLnt, userLat, userLnt) {
    var R = 6371; // earth's mean radius in km
    var distLat  = rad(barLat - userLat);
    var distLong = rad(barLnt - userLnt);

    var a = Math.sin(distLat/2) * Math.sin(distLat/2) +
        Math.cos(rad(barLat)) * Math.cos(rad(userLat)) * Math.sin(distLong/2) * Math.sin(distLong/2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    var d = R * c;
    return d.toFixed(3);
}
