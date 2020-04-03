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

function HeaderButton(HeadButtonId, displayPageId) {
    const Button = document.querySelector("#" + HeadButtonId);
    const Menu = document.querySelector("#" + displayPageId);

    Button.addEventListener("click", function () {
        Menu.classList.toggle("Hide");
    });
}

HeaderButton("MenuButton", "Menu");
HeaderButton("TagFilterButton", "TagFilter");
HeaderButton("SearchBox-Button", "SearchBox");

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

function initMap() {
    const KanagawakoukaLocation = {lat: 35.486555, lng: 139.343255};
    map = new google.maps.Map(document.getElementById("Area"), {
        center: KanagawakoukaLocation,
        zoom: 18
    });
    MarkerArray = new google.maps.MVCArray;
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
}

function InitMarker(LocationInformations) {
    let MarkersInformation;
    let InfoWindows = [];
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
