

//let type = 'normal'
import THREE from "three";

// default
let type = 'displacement'
let enteredURL = "earthMapColor.jpg"
//let url = 'earthMapNormal.png'
let url = 'earthMapDisplacement.png'
async function imageConversionURL(){

    enteredURL = document.getElementById("text-url").value.trim()
    const isImage = await isImageUrl(enteredURL);
    if(!isImage) return;
    if(enteredURL === '') return;

    console.log("Submitted")
    let req = new XMLHttpRequest();
    req.open("Get", `/image?url=${enteredURL}&type=${type}`);
    req.send();
    req.onreadystatechange = () => {
        if(req.readyState === 4) {
            const blob = new Blob([this.response], { type: 'image/png'});
            url = URL.createObjectURL(blob);

            updateMaterialTextures(enteredURL, url, type);



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

function isImageUrl(url) {
    return new Promise(resolve => {
        const img = new Image();
        img.onload = () => resolve(img.width > 0 && img.height > 0);
        img.onerror = () => resolve(false);
        img.src = url;
    });
}