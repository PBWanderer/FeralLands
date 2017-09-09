function noop(){} // No operation.

document.onkeypress = function overlaycheckshiftspace(k){
    k = k || window.event;
    if (k.keyCode === 32 && event.shiftKey){
        removeoverlay();
        overlaycheckshiftspace = noop;}
};

function removeoverlay(){
    document.getElementById("ageoverlay").style.display="none";
    removeoverlay = noop; // There should be nothing that makes the overlay return, beyond refreshing the page.
    // If the overlay gets stuck, then start checking with this file.
}

function declinedoverlay(){
        window.history.back();
        window.close();
}