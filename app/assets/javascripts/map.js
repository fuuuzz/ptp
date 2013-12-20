function map(){

    getLocation();

    var bars = getBarsLocation(),
        i,
        distance = '',
        date = new Date(),
        currentHour = date.getHours(),
        nightHours  = [20, 8];

    var iconUrl = 'http://payetapinte.fr/assets/img/icons/marker.png',
        iconKingUrl = 'http://payetapinte.fr/assets/img/icons/markerKing.png';

    var markerIcon = new google.maps.MarkerImage(
        iconUrl,
        null, /* size is determined at runtime */
        null, /* origin is 0,0 */
        null, /* anchor is bottom center of the scaled image */
        new google.maps.Size(34, 44)
        ),
        markerBigIcon = new google.maps.MarkerImage(
        iconUrl,
        null, /* size is determined at runtime */
        null, /* origin is 0,0 */
        null, /* anchor is bottom center of the scaled image */
        new google.maps.Size(51, 66)
        ),
        markerKing = new google.maps.MarkerImage(
        iconKingUrl,
        null, /* size is determined at runtime */
        null, /* origin is 0,0 */
        null, /* anchor is bottom center of the scaled image */
        new google.maps.Size(34, 58)
        ),
        markerKingBig = new google.maps.MarkerImage(
        iconKingUrl,
        null, /* size is determined at runtime */
        null, /* origin is 0,0 */
        null, /* anchor is bottom center of the scaled image */
        new google.maps.Size(51, 87)
        );

    // Geolocation from user :
    function getLocation()
    {

        if (navigator.geolocation)
        {
            var options = {
                enableHighAccuracy: true,
                timeout: 5000,
                maximumAge: 0
            };
            function success(position) {
                setup_map(position);
            };

            function error(err) {
                alert('Nous ne sommes pas parvenu à vous Géolocaliser ! :-(');
                setup_map(null);
            };

            navigator.geolocation.getCurrentPosition(success, error, options);
        }
        else{
            alert("Geolocation is not supported by this browser.");
        }
    }

    // Generate map and marker :
    function setup_map(position){

        if (position == null){
            var user = [44.8356423, -0.5729913];
        }else{
            var user = [position.coords.latitude, position.coords.longitude];
        }




        if (currentHour > nightHours[0] || currentHour < nightHours[1]){

            var options = {
                zoom: 15,
                center: new google.maps.LatLng(user[0], user[1]),
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                panControl: false,
                zoomControl: false,
                mapTypeControl: false,
                scaleControl: false,
                streetViewControl: false,
                overviewMapControl: false,
                rotateControl: false,
                zoomControlOptions: false,
                scaleControlOptions: false,
                styles: [
                    {
                        "featureType": "water",
                        "stylers": [
                            { "lightness": 23 },
                            { "color": "#43668a" }
                        ]
                    },{
                        "featureType": "poi",
                        "stylers": [
                            { "visibility": "off" }
                        ]
                    },{
                        "elementType": "labels.text.fill",
                        "stylers": [
                            { "color": "#000000" }
                        ]
                    },{
                        "featureType": "landscape",
                        "elementType": "geometry.fill",
                        "stylers": [
                            { "color": "#184a76" },
                            { "saturation": -40 }
                        ]
                    },{
                        "featureType": "road",
                        "elementType": "geometry.stroke",
                        "stylers": [
                            { "color": "#273b57" },
                            { "weight": 1.5 }
                        ]
                    },{
                        "elementType": "labels.text.stroke",
                        "stylers": [
                            { "color": "#ffffff" },
                            { "weight": 2 }
                        ]
                    },{
                    }
                ]
            };


        }else{

            var options = {
                zoom: 15,
                center: new google.maps.LatLng(user[0], user[1]),
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                panControl: false,
                zoomControl: false,
                mapTypeControl: false,
                scaleControl: false,
                streetViewControl: false,
                overviewMapControl: false,
                rotateControl: false,
                zoomControlOptions: false,
                scaleControlOptions: false,
                styles: [
                    {
                        "featureType": "poi",
                        "stylers": [
                            { "visibility": "off" }
                        ]
                    }
                ]
            };
        }

        var map = new google.maps.Map(document.getElementById('map'),options);

        var markers = [];

        // When the map is loaded !
        google.maps.event.addListenerOnce(map, 'idle', function(){


            $('#loader').hide();

            var userMarker = addUserMarker(user);
            var aroundBars = getBarsAround(bars);
            CreateOrDeleteBar(markers, aroundBars);

            searchPlace();
            /*** setupPanelOthers(); */

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
        }

        //Add the marker bar on the map
        function addBarMarker(bar) {
            var marker = Array();
            marker[0] = bar[0];
            marker[1] = new google.maps.Marker({
                position: new google.maps.LatLng(bar[2], bar[3]),
                map: map,
                animation: google.maps.Animation.DROP,
                icon: markerIcon
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
                showDistanceRate(bar);
                markerMoveMap(bar);
                showBarPage(bar);
                reorganizeBarsList();
            });
        }

        //Screen the bar page
        function showBarPage(bar){
            var $pageBtn = $('.preview-container').find("[data-id-bar="+ bar[0] +"]").find('.more-btn'),
                $barsContainer = $('#bars'),
                containerHeight = $('#page-container').height(),
                previewHeight = 100,
                isLoaded = false;


            $pageBtn.on('click', function(){
                if (!isLoaded){
                    isLoaded = true;
                    var previewUrl = window.location.origin + '/page/' + bar[0];
                    $.ajax({
                        url: previewUrl,
                        cache: true
                    })
                    .done(function( page ) {
                        $( "#bar-page" ).append( page );

                        $barsContainer
//                        .animate({height: containerHeight}, 200)
//                        .delay(300)
                        .animate({left: -($barsContainer.width()/2)}, 300);

                        /***
                        //Ajout des étoiles pour les fiches bars
                        var $avis = $('.avis-page'),
                            $jauge = $avis.children('.jauge'),
                            globalRate = $avis.data('rate');

                        createStars($jauge, globalRate);

                        //Ajout des étoiles pour les commentaires
                        var $comments = $('.comment');
                        $comments.each(function(){
                            var $avisC = $(this).children('.avis-comment'),
                                $jaugeC = $avisC.children('.jauge'),
                                globalRateC = $avisC.data('rate');

                            createStars($jaugeC, globalRateC);

                        })

                        */  

                            //set the map and marker action
                    map.setZoom(16);
                    for (i = 0; i < markers.length; i++) {
                        if(markers[i][0] == bar[0]){
                            var barMarker = markers[i][1];
                            if (barMarker.icon.url == iconUrl)
                                barMarker.setIcon(markerBigIcon);
                            if (barMarker.icon.url == iconKingUrl)
                                barMarker.setIcon(markerKingBig);
                        }else{
                            if (markers[i][1].icon.url == iconUrl)
                                markers[i][1].setIcon(markerIcon);
                            if (markers[i][1].icon.url == iconKingUrl)
                                markers[i][1].setIcon(markerKing);
                        }
                    }

                            $('.close').on('click', function(){
                        if (barMarker.icon.url == iconUrl)
                            barMarker.setIcon(markerIcon);
                        if (barMarker.icon.url == iconKingUrl)
                            barMarker.setIcon(markerKing);

                            map.setZoom(15);
                            $barsContainer
                                .animate({left: 0}, 300, function(){
                                    $('#fiche-bar').remove();
                                });
//                                .delay(300)
//                                .animate({height: previewHeight}, 200);

                            isLoaded = false;
                            })
                        });
                }

            })
        }

        //Calcul the distance between user and bars
        function distanceUserBar(bars){

            var distance;

            for (var i = 0; i < bars.length; i++) {
                distance = calculHaversine(bars[i][2], bars[i][3], user[0], user[1])*1000;
                distance = Math.round(distance/10)*10 //arrondir au dixième;
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
        function showDistanceRate(bar){
            var $bar =  $('.preview-container').find("[data-id-bar="+ bar[0] +"]"),
                $dContainer = $bar.contents().find('.distance'),
                $jauge = $bar.contents().find('.jauge'),
                globalRate = $bar.data('rate');

            $dContainer.text(+bar[4]+"m");
            /*** createStars($jauge, globalRate); */
        }

        //Move the center of the map to bar location
        function markerMoveMap(bar){
            var $bar = $('.preview-container').find("[data-id-bar="+ bar[0] +"]");

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
                    
                var previewUrl = window.location.origin + '/page/' + bar[0];
                    $.ajax({
                        url: previewUrl,
                        cache: true
                    })
                    .done(function( page ) {
                        $( "#bar-page" ).append( page );
                        $('#bars').animate({left: -($('#bars').width()/2)}, 300);
                    })

               for (i = 0; i < markers.length; i++) {
                   if (markers[i][1].icon.url == iconUrl)
                       markers[i][1].setIcon(markerIcon);
                   if (markers[i][1].icon.url == iconKingUrl)
                       markers[i][1].setIcon(markerKing);
               }

               if (marker[1].icon.url == iconUrl)
                   marker[1].setIcon(markerBigIcon);
               if (marker[1].icon.url == iconKingUrl)
                   marker[1].setIcon(markerKingBig);

               map.setZoom(17);

                scrollBarsList(marker);
            });
        }

        //Scroll the bars list on click on marker
        function scrollBarsList(marker){
            var barId = marker[0],
                posVSid = [],
                $barsPrev = $('.preview-container'),
                $container = $('#cache-container'),
                $innerContainer = $('#bars-container'),
                barHeight = $barsPrev.height(),
                barPos;

            $barsPrev.each(function(index){
                posVSid[index] = $(this).children('.preview').data('id-bar');

                if (posVSid[index]==barId)
                     barPos = index;
            })
            var time = 500+(Math.abs( ($container.scrollTop()-(barHeight*barPos))));
            $container.animate({scrollTop: barHeight*barPos}, time);
        }

        //Reorganize bars list by distance (or price?)
        function reorganizeBarsList(){
            var $barsPrev = $('.preview-container'), distanceT = [], priceT = [],
                $innerContainer = $('#bars-container'),
                barHeight = $barsPrev.height();

            $barsPrev.each(function(i){
                var barDistance = $(this).contents().find('.distance').text();
                barDistance = barDistance.replace ( /[^\d.]/g, '' );
                barDistance = parseInt(barDistance);
                distanceT.push(Array(barDistance, $(this)) );

                var barPrice = $(this).contents().find('.beer-price').text();
                barPrice = barPrice.replace(',', '.').replace( /[^\d.]/g, '');
                barPrice = parseFloat(barPrice);
                priceT.push(Array(barPrice, $(this)) );
            })

            distanceT.sort(sortNumber);
            priceT.sort(sortNumber);

            var bestPriceId = (priceT[0][1]).find('.preview').data('id-bar');

            for(i = 0; i < markers.length; i++){
                markers[i][1].setIcon(markerIcon);
                if(markers[i][0] == bestPriceId){
                    markers[i][1].setIcon(markerKing);
                }
            }


            function sortNumber(a,b) {
                return a[0] - b[0];
            }

            for(i = 0; i < distanceT.length-1; i++){
                var j = i+1
                distanceT[i][1].after(distanceT[j][1]);
            }

            $innerContainer.height(barHeight*($barsPrev.length)+140);

        }


        function searchPlace() {
            var input = (document.getElementById('pac-input'));
            var searchBox = new google.maps.places.SearchBox((input));

            google.maps.event.addListener(searchBox, 'places_changed', function() {
                var places = searchBox.getPlaces();
                var bounds = new google.maps.LatLngBounds();

                for (var i = 0, place; place = places[i]; i++) {
                    bounds.extend(place.geometry.location);
                }
                map.fitBounds(bounds);
                map.setZoom(15);
            });

            // Bias the SearchBox results towards places that are within the bounds of the
            // current map's viewport.
            google.maps.event.addListener(map, 'bounds_changed', function() {
                var bounds = map.getBounds();
                searchBox.setBounds(bounds);
            });
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