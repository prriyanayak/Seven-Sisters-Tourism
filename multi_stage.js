xhr = new XMLHttpRequest;

state = document.getElementById("state").innerHTML;
state = state.toLowerCase();

function init() {
    xhr.onloadend = showContent;
    xhr.open("GET", "http://localhost/project-data/content.txt");
    xhr.send();
}

function showContent() {
    arr = xhr.responseText.split(";");
    document.getElementById("header").innerHTML = arr[0];
    document.getElementById("popularPlaces").innerHTML = arr[1];
    document.getElementById("hotspots").innerHTML = arr[2];
    document.getElementById("contactus").innerHTML = arr[3];
    document.getElementById("packagePhoto").innerHTML = arr[4];
    setTimeout(getTitle, 2000);
}

function getTitle() {
    xhr.onloadend = showTitle;
    xhr.open("GET", "http://localhost/project-data/"+state+"/h1.txt");
    xhr.send();
}

function showTitle() {
    document.getElementById("header").innerHTML = xhr.responseText;
    setTimeout(getPopular, 2000);
}

function getPopular() {
    xhr.onloadend = showPopular;
    xhr.open("GET", "http://localhost/project-data/"+state+"/popular.txt");
    xhr.send();
}

function showPopular() {
    document.getElementById("popularPlaces").innerHTML = xhr.responseText;
    setTimeout(getHotspots, 2000);
}

function getHotspots() {
    xhr.onloadend = showHotspots;
    xhr.open("GET", "http://localhost/project-data/"+state+"/hotspots.txt");
    xhr.send();
}

function showHotspots() {
    document.getElementById("hotspots").innerHTML = xhr.responseText;
    setTimeout(getPackagePhoto, 2000);
}

function getPackagePhoto() {
    xhr.onloadend = showPackagePhoto;
    xhr.open("GET", "http://localhost/project-data/"+state+"/packagePhoto.txt");
    xhr.send();
}

function showPackagePhoto() {
    document.getElementById("packagePhoto").innerHTML = xhr.responseText;
    setTimeout(getContact, 2000);
}

function getContact() {
    xhr.onloadend = showContact;
    xhr.open("GET", "http://localhost/project-data/"+state+"/contact.txt");
    xhr.send();
}

function showContact() {
    document.getElementById("contactus").innerHTML = xhr.responseText;
}