function HeaderButton(HeadButtonId, headerItemId) {
    const button = document.querySelector("#" + HeadButtonId);
    const headerItem = document.querySelector("#" + headerItemId);
    headerItem.classList.add("HeaderItem");

    button.addEventListener("click", function () {
        const headerItems = document.querySelectorAll(".HeaderItem");
        if (headerItem.classList.contains("Hide")) {
            headerItems.forEach(value => value.classList.add("Hide"));
            headerItem.classList.remove("Hide");
        } else {
            headerItem.classList.add("Hide");
        }
    });
}

HeaderButton("MenuButton", "Menu");
HeaderButton("TagFilterButton", "TagFilter");
HeaderButton("SearchBox-Button", "SearchBox");

class Tag {
    constructor(TagId,TagName) {
        this.Checkbox = document.createElement("input");
        this.Label = document.createElement("label");
        this.Checkbox.type = "checkbox";
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
