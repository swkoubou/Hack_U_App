class Tag {
    constructor(TagId,TagName) {
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

class LocationInformation{
    constructor(Json) {
        this.Position = Json.Location;
        this.Name = Json.Name;
        this.Address = Json.Address;
        this.DetailedPage = "/Page?p="+Json.LocationId;
    }
}

function HeaderButton(HeadButtonId,displayPageId) {
    const Button = document.querySelector("#" + HeadButtonId);
    const Menu = document.querySelector("#"+ displayPageId);

    Button.addEventListener("click",function () {
        Menu.classList.toggle("Hide");
    });
}
HeaderButton("MenuButton","Menu");
HeaderButton("TagFilterButton","TagFilter");

function AddFilterFormTag() {
    const AllTagURL = "http://localhost:8080/allTag";
    const Form = document.querySelector("#TagFilter form");
    fetch(AllTagURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (TagJson){
            const TagQuantity = Object.keys(TagJson.tags).length;
            const Tags = [];

            for (let i = 0;i < TagQuantity;i++){
                Tags[i] = new Tag(TagJson.tags[i].TagId,TagJson.tags[i].Name);

                Form.appendChild(Tags[i].Checkbox);
                Form.appendChild(Tags[i].Label);
            }
        });
}
AddFilterFormTag();

function CheckConfirmation(){
    const Checked = [];
    const CheckBox = document.FilterForm.FilterCheck;
    for(let i = 0;i < CheckBox.length;i++){
        if (CheckBox[i].checked){
            Checked.push(CheckBox[i].value);
        }
    }
    return Checked.join(",");
}

function FilteringDisplay() {
    const SelectTag = CheckConfirmation();
    const SearchTagsURL = "http://localhost:8080/search?tags=";
    const Menu =document.querySelector("#TagFilter");
    fetch(SearchTagsURL + SelectTag)
        .then(function (response) {
            return response.json();
        })
        .then(function (FilteredJson) {
            const LocationQuantity = Object.keys(FilteredJson.location).length;
            const LocationInformations = [];
            for (let i = 0;i < LocationQuantity;i++){
                LocationInformations[i] = new LocationInformation(FilteredJson.location[i]);
            }
            console.log(LocationInformations);
            console.log("SelectTagId: " + SelectTag);
            InitMarker(LocationInformations);
        });
    Menu.classList.add("Hide");
    //名前、住所、詳細ページのURL
}

let map;
function initMap() {
    let myLatLng = {lat: 35.487027, lng: 139.342440};
    map = new google.maps.Map(document.getElementById("Area"), {
        center: myLatLng,
        zoom: 18
    });
}

function InitMarker(LocationInformations) {
    let Markers = [];
    let MarkersInformation;
    for (let i = 0;i < LocationInformations.length;i++){
        MarkersInformation ={
            position: {lat: 35.487027, lng: 139.342440}/*{
                lat: LocationInformations[i].Position.Lat,
                lng: LocationInformations[i].Position.Lng
            }*/,
            map: map,
            title: LocationInformations[i].Name
        };
        alert(LocationInformations[i].Position.Lat);
        Markers[i] = new google.maps.Marker(MarkersInformation);
    }
}