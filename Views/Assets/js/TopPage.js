function menu() {
    const button = document.getElementById("menubutton");
    const menu = document.querySelector('.menu');

    button.addEventListener('click',function () {
        menu.classList.toggle('hide');
    });
}
menu();
function refine() {
    const button = document.getElementById("refinebutton");
    const menu = document.querySelector('.refine');

    button.addEventListener('click',function () {
        menu.classList.toggle('hide');
    });
}
refine();
function addrefineformtag() {
    var alltagjson = "http://localhost:8080/allTag";
    const form = document.querySelector(".refine");
    fetch(alltagjson)
        .then(function (response) {
            return response.json();
        })
        .then(function (myjson){
            var i;
            var quantity = Object.keys(myjson.tags).length;
            var tagcheck = {};
            var taglabel = {};

            for (i = 0;i < quantity;i++){
                tagcheck[i] = document.createElement("input");
                taglabel[i] = document.createElement("label");
                
                tagcheck[i].type = "checkbox";
                tagcheck[i].value = myjson.tags[i].TagId;
                tagcheck[i].id = myjson.tags[i].Name;
                //tagcheck[i].classList.add("hide");
                
                taglabel[i].htmlFor = myjson.tags[i].Name;
                taglabel[i].innerHTML = myjson.tags[i].Name;
                taglabel[i].classList.add("taglabel");
                
                form.appendChild(tagcheck[i]);
                form.appendChild(taglabel[i]);
            }
    });
}addrefineformtag();
