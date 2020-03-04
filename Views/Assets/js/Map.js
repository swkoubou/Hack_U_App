function initMap() {
    var myLatLng = {lat: 35.487027, lng: 139.342440};
    var map = new google.maps.Map(document.getElementById("Area"), {
        center: myLatLng,
        zoom: 18
    });

    var contentString = "<p>storename</p>"+
        "<p>text</p>"+
        "<a href='https://google.com'>Go google!</a>";

    var infowindow = new google.maps.InfoWindow({
        content: contentString
    });

    var marker = new google.maps.Marker({
        position: myLatLng,
        map: map,
        title: "Hello World!"
    });
    marker.addListener("click", function() {
        infowindow.open(map, marker);
    });
}