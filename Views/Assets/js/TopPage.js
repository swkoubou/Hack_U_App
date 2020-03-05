function HeaderButton(HeadButtonId,displayPageId) {
    const button = document.querySelector("#" + HeadButtonId);
    const menu = document.querySelector("#"+ displayPageId);

    button.addEventListener("click",function () {
        menu.classList.toggle("Hide");
    });
}
HeaderButton("MenuButton","Menu");
HeaderButton("TagFilterButton","TagFilter");

class Tag {
    constructor() {
        this.Checkbox = document.createElement("input");
        this.Label = document.createElement("label");
        this.Checkbox.type = "checkbox";
        this.Checkbox.classList.add("Hide");
        this.Label.classList.add("TagLabel");
    }
}

function AddFilterFormTag() {
    const AllTagJson = "http://localhost:8080/allTag";
    const form = document.querySelector("#TagFilter form");
    fetch(AllTagJson)
        .then(function (response) {
            return response.json();
        })
        .then(function (myjson){
            const quantity = Object.keys(myjson.tags).length;
            const tags = [];

            for (let i = 0;i < quantity;i++){
                tags[i] = new Tag();
                tags[i].Checkbox.value = myjson.tags[i].TagId;
                tags[i].Checkbox.id = myjson.tags[i].Name;

                tags[i].Label.htmlFor = myjson.tags[i].Name;
                tags[i].Label.innerHTML = myjson.tags[i].Name;
                
                form.appendChild(tags[i].Checkbox);
                form.appendChild(tags[i].Label);
                tags[i].Label.onclick = function (event) {
                    event.target.classList.toggle("Select");
                }
            }
    });
}
AddFilterFormTag();
