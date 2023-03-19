

let type = 'normal'
let enteredURL = "earthMapColor.jpg"
let url = 'earthMapNormal.png'
function imageConversionURL(){
    enteredURL = document.getElementById("text-url").value.trim()
    if(enteredURL === '') return;

    let segs = enteredURL.split(".");
    let extension = segs[segs.length-1];
    let req = new XMLHttpRequest();
    req.open("Get", `/image?url=${enteredURL}&type=${type}`);
    req.send();
    req.onreadystatechange = () => {
        if(req.readyState === 4) {
            const blob = new Blob([this.response], { type: 'image/png'});
            url = URL.createObjectURL(blob);
            init();
        }
    }
}

function displacement_button(){
    document.getElementById("submit_button").hidden = false;
    document.getElementById("displacement_button").style.background = "grey"
    document.getElementById("normal_button").style.background = "white"

    type = 'displacement'
}

function normal_button(){
    document.getElementById("submit_button").hidden = false;
    document.getElementById("normal_button").style.background = "grey"
    document.getElementById("displacement_button").style.background = "white"


    type = 'normal'
}