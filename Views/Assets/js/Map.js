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

}
