function initMap() {

    //マップの追加
    const KanagawakoukaLocation = {lat: 35.486555, lng: 139.343255};
    const map = new google.maps.Map(document.querySelector("#Area"), {
        center: KanagawakoukaLocation,
        zoom: 18
    });

    let contentString = "<p>storename</p>"+
        "<p>text</p>"+
        "<a href='https://google.com'>Go google!</a>";

    const infowindow = new google.maps.InfoWindow({
        content: contentString
    });

    //検索システムの追加
    const input = document.querySelector("#SearchBox-Input");
    const options = {
        type: ['establishment'],
    };
    const autocomplete = new google.maps.places.Autocomplete(input, options);
    autocomplete.bindTo('bounds', map);

    autocomplete.addListener('place_changed', function () {
        infowindow.close();
        const place = autocomplete.getPlace();
        if (!place.geometry) {
            window.alert("その場所はありません: '" + place.name + "'");
            return;
        }

        // If the place has a geometry, then present it on a map.
        if (place.geometry.viewport) {
            map.fitBounds(place.geometry.viewport);
        } else {
            map.setCenter(place.geometry.location);
            map.setZoom(18);
        }
    });
}
