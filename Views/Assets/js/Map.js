function initMap() {
    let myLatLng = {lat: 35.487027, lng: 139.342440};
    const map = new google.maps.Map(document.getElementById("Area"), {
        center: myLatLng,
        zoom: 18
    });

    /*let contentString = "<p>storename</p>"+
        "<p>text</p>"+
        "<a href='https://google.com'>Go google!</a>";

    const infowindow = new google.maps.InfoWindow({
        content: contentString
    });

    const marker = new google.maps.Marker({
        position: myLatLng,
        map: map,
        title: "Hello World!"
    });
    marker.addListener("click", function() {
        infowindow.open(map, marker);
    });*/
}