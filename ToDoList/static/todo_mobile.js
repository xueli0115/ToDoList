

// Add a "checked" symbol when clicking on a list item
var list = document.querySelector('ul');

document.getElementById("myUL").oncontextmenu = function(e){
    e.preventDefault();
};
document.getElementById("myUL").onmouseup = function(oEvent){
    var list_id = oEvent.target.id;
    var div = oEvent.target;
    if(!oEvent) oEvent = window.event;
    if(oEvent.button==2){
        console.log("right"+list_id);
        var deleteResult = window.confirm("确定要删除这条记录吗？");
        if (deleteResult==true){
            console.log("true");
            $.ajax({
                type: 'POST',
                url: '/changestatus/',
                data: {status: 0, list_id: list_id},
                dataType: 'json'
            }).done();
        div.style.display = "none";

        }else {
            console.log("False");
        }
    }
};

document.getElementById("myUL").addEventListener("click", function (e) {
    //console.log(e.target.id);
    var list_id = e.target.id;
    console.log(list_id);
    console.log(e.target.className);
    if (e.target.tagName=='BUTTON'){
        if (e.target.className=='top'){
            console.log(e.target.id);
            $.ajax({
                type: 'POST',
                url: '/changestatus/',
                data: {status: 6, list_id: e.target.id},
                dataType: 'json'
            }).done();
        }
        else if (e.target.className=='ntop'){
             $.ajax({
                type: 'POST',
                url: '/changestatus/',
                data: {status: 7, list_id: e.target.id},
                dataType: 'json'
            }).done();
        }
    }
    if (e.target.tagName === 'LI') {
        e.target.classList.toggle('checked');
        $.ajax({
            type: 'POST',
            url: '/changestatus/',
            data: {status: 5, list_id: list_id},
            dataType: 'json'
        }).done();
    }
}, false);


// Create a new list item when clicking on the "Add" button
function newElement() {
    var li = document.createElement("li");
    var inputValue = document.getElementById("myInput").value;
    var t = document.createTextNode(inputValue);
    li.appendChild(t);
    if (inputValue === '') {
        alert("You must write something!");
    } else {
        $.ajax({
            type: 'POST',
            url: '/addlist/',
            data: {content: inputValue},
            dataType: 'json'
        }).done();
        document.getElementById("myUL").appendChild(li);
    }
    document.getElementById("myInput").value = "";

    var span = document.createElement("SPAN");
    var txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(txt);
    li.appendChild(span);

    for (i = 0; i < close.length; i++) {
        close[i].onclick = function () {
            var div = this.parentElement;
            div.style.display = "none";
        }
    }
}
