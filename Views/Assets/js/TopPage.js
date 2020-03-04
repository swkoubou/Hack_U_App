function HeaderButton(HeadButtonId,displayPageId) {
    const button = document.querySelector("#" + HeadButtonId);
    const menu = document.querySelector("#"+ displayPageId);

    button.addEventListener("click",function () {
        menu.classList.toggle("Hide");
    });
}

HeaderButton("MenuButton","Menu");
HeaderButton("TagFilterButton","TagFilter");

function AddFilterFormTag() {
    var alltagjson = "http://localhost:8080/allTag";
    const form = document.querySelector("#TagFilter form");
    fetch(alltagjson)
        .then(function (response) {
            return response.json();
        })
        .then(function (myjson){
            var i;
            var quantity = Object.keys(myjson.tags).length;
            var tagcheck = [];
            var taglabel = [];

            for (i = 0;i < quantity;i++){
                tagcheck[i] = document.createElement("input");
                taglabel[i] = document.createElement("label");
                
                tagcheck[i].type = "checkbox";
                tagcheck[i].value = myjson.tags[i].TagId;
                tagcheck[i].id = myjson.tags[i].Name;
                tagcheck[i].classList.add("Hide");
                
                taglabel[i].htmlFor = myjson.tags[i].Name;
                taglabel[i].innerHTML = myjson.tags[i].Name;
                taglabel[i].classList.add("TagLabel");
                
                form.appendChild(tagcheck[i]);
                form.appendChild(taglabel[i]);
                taglabel[i].onclick = function (event) {
                    event.target.classList.toggle("Select");
                }
            }
    });
}
AddFilterFormTag();
