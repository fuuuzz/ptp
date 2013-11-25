function init(){
    var $bars =$('.bar'),
        barsLat = '',
        barsLnt = '',
        barsName = '',
        bars = Array();

    $bars.each(function(index){

        barsName = $(this).data('name');
        barsLat = $(this).data('lat');
        barsLnt = $(this).data('lnt');

        bars[index] =[barsName, barsLat, barsLnt];

    })

    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 14,
        center: new google.maps.LatLng(bars[0][1], bars[0][2]),
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
    });



    var infowindow = new google.maps.InfoWindow();

    var marker, i;

    for (i = 0; i < bars.length; i++) {
        marker = new google.maps.Marker({
            position: new google.maps.LatLng(bars[i][1], bars[i][2]),
            map: map,
            animation: google.maps.Animation.DROP,
            icon: "http://imageshack.com/a/img51/5516/xljz.png"
        });

        google.maps.event.addListener(marker, 'click', (function (marker, i) {
            return function () {
                infowindow.setContent(bars[i][0]);
                infowindow.open(map, marker);
            }
        })(marker, i));
    }
}

$(document).ready(function(){
    init();
})