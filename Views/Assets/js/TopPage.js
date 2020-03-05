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
    constructor(TagJson,TagNum) {
        this.Checkbox = document.createElement("input");
        this.Label = document.createElement("label");
        this.Checkbox.type = "checkbox";
        this.Checkbox.classList.add("Hide");
        this.Checkbox.value = TagJson.tags[TagNum].TagId;
        const TagName = TagJson.tags[TagNum].Name;
        this.Checkbox.id = TagName;
        this.Label.classList.add("TagLabel");
        this.Label.htmlFor = TagName;
        this.Label.innerHTML = TagName;

    }
}

function AddFilterFormTag() {
    const AllTagJson = "http://localhost:8080/allTag";
    const Form = document.querySelector("#TagFilter form");
    fetch(AllTagJson)
        .then(function (response) {
            return response.json();
        })
        .then(function (TagJson){
            const TagQuantity = Object.keys(TagJson.tags).length;
            const Tags = [];

            for (let i = 0;i < TagQuantity;i++){
                Tags[i] = new Tag(TagJson,i);

                Form.appendChild(Tags[i].Checkbox);
                Form.appendChild(Tags[i].Label);
                Tags[i].Label.onclick = function (event) {
                    event.target.classList.toggle("Select");
                }
            }
    });
}
AddFilterFormTag();
