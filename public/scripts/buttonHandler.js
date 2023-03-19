let type = 'normal'
function imageConversionURL(){
    //http://localhost:6060/image?url=https://onlineimagetools.com/images/examples-onlineimagetools/color-grid.png&type=normal

    enteredURL = document.getElementById("text-url").value
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