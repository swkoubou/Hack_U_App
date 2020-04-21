function HeaderButton(HeadButtonId, HeaderItemId) {
    const Button = document.querySelector("#" + HeadButtonId);
    const HeaderItem = document.querySelector("#" + HeaderItemId);
    HeaderItem.classList.add("HeaderItem");

    Button.addEventListener("click", function () {
        const HeaderItems = document.querySelectorAll(".HeaderItem");
        if (HeaderItem.classList.contains("Hide")) {
            HeaderItems.forEach(value => value.classList.add("Hide"));
            HeaderItem.classList.remove("Hide");
        } else {
            HeaderItem.classList.add("Hide");
        }

    });
}

HeaderButton("MenuButton", "Menu");
HeaderButton("TagFilterButton", "TagFilter");
HeaderButton("SearchBox-Button", "SearchBox");

class Tag {
    constructor(TagId, TagName) {
        this.Checkbox = document.createElement("input");
        this.Label = document.createElement("label");
        this.Checkbox.type = "checkbox";
        this.Checkbox.name = "FilterCheck";
        this.Checkbox.classList.add("Hide");
        this.Checkbox.value = TagId;
        this.Checkbox.id = TagName;
        this.Label.classList.add("TagLabel");
        this.Label.htmlFor = TagName;
        this.Label.innerHTML = TagName;
        this.Label.onclick = function (event) {
            event.target.classList.toggle("Select");
        }

    }
}

class LocationInformation {
    constructor(Json) {
        this.Position = Json.Location;
        this.Name = Json.Name;
        this.Address = Json.Address;
        this.DetailedPage = "/Page?p=" + Json.LocationId;
    }
}

function AddFilterFormTag() {
    const AllTagURL = "http://localhost:8080/allTag";
    const Form = document.querySelector("#TagFilter form");
    fetch(AllTagURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (TagJson) {
            const TagQuantity = Object.keys(TagJson.tags).length;
            const Tags = [];

            for (let i = 0; i < TagQuantity; i++) {
                Tags[i] = new Tag(TagJson.tags[i].TagId, TagJson.tags[i].Name);

                Form.appendChild(Tags[i].Checkbox);
                Form.appendChild(Tags[i].Label);
            }
        });
}

AddFilterFormTag();

function CheckConfirmation() {
    const Checked = [];
    const CheckBox = document.FilterForm.FilterCheck;
    for (let i = 0; i < CheckBox.length; i++) {
        if (CheckBox[i].checked) {
            Checked.push(CheckBox[i].value);
        }
    }
    return Checked.join(",");
}

function FilteringDisplay() {
    const SelectTag = CheckConfirmation();
    const SearchTagsURL = "/search?tags=";
    const AllLocation = "/allLocation";
    let RequestURL = SearchTagsURL + SelectTag;
    const Menu = document.querySelector("#TagFilter");

    if (SelectTag == "") {
        RequestURL = AllLocation;
    }
    fetch(RequestURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (FilteredJson) {
            if ("error" in FilteredJson) {
                MarkerArray.forEach(function (MarkerElement) {
                    MarkerElement.setMap(null);
                });
                alert("存在しません");
                return 0;
            }
            const LocationQuantity = Object.keys(FilteredJson.locations).length;
            const LocationInformations = [];
            for (let i = 0; i < LocationQuantity; i++) {
                LocationInformations[i] = new LocationInformation(FilteredJson.locations[i]);
            }
            InitMarker(LocationInformations);
        });
    Menu.classList.add("Hide");
}

let map;
let MarkerArray;
let InfoWindows;

function initMap() {
    const KanagawakoukaLocation = {lat: 35.486555, lng: 139.343255};
    map = new google.maps.Map(document.querySelector("#Area"), {
        center: KanagawakoukaLocation,
        zoom: 18
    });
    MarkerArray = new google.maps.MVCArray;
    InfoWindows = [];
    fetch("/allLocation")
        .then(function (response) {
            return response.json();
        })
        .then(function (FilteredJson) {
            if ("error" in FilteredJson) {
                MarkerArray.forEach(function (MarkerElement) {
                    MarkerElement.setMap(null);
                });
                alert("存在しません");
                return 0;
            }
            const LocationQuantity = Object.keys(FilteredJson.locations).length;
            const LocationInformations = [];
            for (let i = 0; i < LocationQuantity; i++) {
                LocationInformations[i] = new LocationInformation(FilteredJson.locations[i]);
            }
            InitMarker(LocationInformations);
        });

    //検索システムの追加
    const SearchBox = document.querySelector("#SearchBox-Input");
    const Options = {
        type: ['establishment'],
    };
    const Autocomplete = new google.maps.places.Autocomplete(SearchBox, Options);
    Autocomplete.bindTo('bounds', map);

    Autocomplete.addListener('place_changed', function () {
        InfoWindows.forEach(InfoWindow => InfoWindow.close());
        MarkerArray.forEach(Marker => Marker.setVisible(false));
        const Place = Autocomplete.getPlace();
        if (!Place.geometry) {
            return;
        }
        if (Place.geometry.viewport) {
            map.fitBounds(Place.geometry.viewport);
        } else {
            map.setCenter(Place.geometry.location);
            map.setZoom(18);
        }
        MarkerArray.forEach(Marker => Marker.setVisible(true));
    });
}

function InitMarker(LocationInformations) {
    let MarkersInformation;
    let ContentString;
    MarkerArray.forEach(function (MarkerElement) {
        MarkerElement.setMap(null);
    });

    MarkerArray.clear();
    for (let i = 0; i < LocationInformations.length; i++) {
        MarkersInformation = {
            position: {
                lat: LocationInformations[i].Position.Lat,
                lng: LocationInformations[i].Position.Lng
            },
            map: map,
            title: LocationInformations[i].Name
        };
        ContentString = {
            content: "<p>" + LocationInformations[i].Name + "</p>" +
                "<p>" + LocationInformations[i].Address + "</p>" +
                "<a href=\'" + LocationInformations[i].DetailedPage + "\'>詳細ページ</>"
        };
        MarkerArray.push(new google.maps.Marker(MarkersInformation));
        InfoWindows[i] = new google.maps.InfoWindow(ContentString);
        MarkerArray.getAt(i).addListener("click", function () {
            InfoWindows[i].open(map, MarkerArray.getAt(i));
        });
    }
}

function CheckReset() {
    const CheckBox = document.FilterForm.FilterCheck;
    const Label = document.querySelectorAll(".TagLabel");
    for (let i = 0; i < CheckBox.length; i++) {
        Label[i].classList.remove("Select");
        if (CheckBox[i].checked) {
            CheckBox[i].checked = false;
        }
    }
}
