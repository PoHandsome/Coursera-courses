const navlinks = document.querySelectorAll("nav ul li a");
navlinks.forEach(function(eachlink){
    eachlink.addEventListener("click", smoothScroll);
});

function smoothScroll(event){
    event.preventDefault();
    const targetID = event.target.getAttribute("href");
    const target = document.querySelector(targetID);
    const originalTop = Math.floor(target.getBoundingClientRect().top - 200);
    window.scrollBy({ top: originalTop, Left: 0, behavior: "smooth"});
    console.log(originalTop);
}

window.addEventListener("load", function() {
    const posts = document.querySelectorAll("section");
    let postTops = []
    let pagetop;
    let counter = 1;
    let prevCounter = 1;
    let doneResizing;

    resetPagePosition();
    window.addEventListener("scroll", function(){
        pagetop = window.pageYOffset + 250;
        if (pagetop > postTops[counter]) {counter++;}
        else if (counter > 1 && pagetop < postTops[counter-1]) {counter--;}
        if (counter != prevCounter) {
            navlinks.forEach(function(navlink){navlink.removeAttribute("class")});
            const thislink = document.querySelector(`nav ul li:nth-child(${counter}) a`);
            thislink.className = "selected";
            prevCounter = counter;
        }
    });
    window.addEventListener("resize", function () {
        this.clearTimeout(doneResizing);
        doneResizing = this.setTimeout(function() {
            resetPagePosition();
        }, 500);
    });
    function resetPagePosition() {
        postTops = [];
        const pagePostion = window.pageYOffset + 250;
        posts.forEach(function(post){
            postTops.push(Math.floor(post.getBoundingClientRect().top + window.pageYOffset));
        });
        postTops.forEach(function(post) { if (pagePostion > post) {counter++;}});
        navlinks.forEach(function(eachlink) {eachlink.removeAttribute("class")});
        const thislink = document.querySelector(`nav ul li:nth-child(${counter}) a`);
        thislink.className = "selected";
        prevCounter = counter;
    }
});

