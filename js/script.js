(function(){
    "use strict";

    document.getElementById("backgroundcolor").addEventListener("input", changeBackgroundColor);

    function changeBackgroundColor () {
        let backColor = document.getElementById("backgroundcolor").value;
        document.querySelector("body").style.backgroundColor = backColor;
    }

    document.getElementById("defaultcolor").addEventListener("click", () => {
        document.querySelector("body").style.backgroundColor = rgb(241, 236, 187);
    })
})();