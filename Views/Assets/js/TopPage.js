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
    alert(Checked);
}
