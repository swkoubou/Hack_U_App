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
        .then(function (TagJson){
            const TagQuantity = Object.keys(MyJson.tags).length;
            const Tags = [];

            for (let i = 0;i < TagQuantity;i++){
                Tags[i] = new Tag();
                Tags[i].Checkbox.value = MyJson.tags[i].TagId;
                Tags[i].Checkbox.id = MyJson.tags[i].Name;

                Tags[i].Label.htmlFor = MyJson.tags[i].Name;
                Tags[i].Label.innerHTML = MyJson.tags[i].Name;

                form.appendChild(tags[i].Checkbox);
                form.appendChild(tags[i].Label);
                Tags[i].Label.onclick = function (event) {
                    event.target.classList.toggle("Select");
                }
            }
    });
}
AddFilterFormTag();
