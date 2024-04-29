const titlescreen = document.querySelector(".titlescreen");
const versusmenu = document.querySelector(".versusmenu");

function start() {
    document.body.style.background = "#03256c";
    titlescreen.style.animation = "close 1s";
    titlescreen.style.animationFillMode = "forwards";
    titlescreen.style.animationDelay = "0.5s";
    titlescreen.style.animationIterationCount = "1";
    titlescreen.style.animationDirection = "normal";
    titlescreen.style.animationTimingFunction = "ease-in-out";
    setTimeout(function() {
        document.body.style.background = "rgb( 144, 46, 35)";
        versusmenu.style.display = "block";
        versusmenu.style.animation = "open 1s"
        versusmenu.style.animationFillMode = "forwards";
        versusmenu.style.animationDelay = "0.5s";
        versusmenu.style.animationIterationCount = "1";
        versusmenu.style.animationDirection = "normal";
        versusmenu.style.animationTimingFunction = "ease-in-out";
    }, 2000);
}

document.getElementById('theform').addEventListener('submit', function(event) {
    var select1Value = document.getElementById('type1').value;
    var select2Value = document.getElementById('type2').value;

    if (select1Value === select2Value) {
        alert('Please choose different options for both selects.');
        event.preventDefault(); // Prevent form submission
    }
});