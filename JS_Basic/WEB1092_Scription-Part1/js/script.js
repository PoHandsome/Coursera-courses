// Smooth Scroll
(function(){
    "use strict"
    $("header nav ul li a").click(function(evt) {
        evt.preventDefault();
        let sectionID = $(this).attr("href");
        $("html, body").stop().animate( {
            scrollTop: $(sectionID).offset().top - 101
        }, 500)
    });
    $("header .logo").click(function() {
        $("html, body").stop().animate({
            scrollTop: $("body").offset().top
        }, 600, "easeInCirc")
    });
})();
// Flexslider
(function(){
    $(window).on("load", function() {
        $(".flexslider").flexslider(
            {
                pauseOnHover: true,
                animation: "slide",
                directionNav: false,
                slideshowSpeed: 3000,
                before: function() {
                    $(".cta").css("bottom", "-223px")
                },
                start: function() {
                    $(".cta").animate({
                        bottom: "0"
                    }, 600, "easeInCirc")
                },
                after: function() {
                    $(".cta").animate({
                        bottom: "0"
                    }, 600, "easeInCirc")
                }
            }
        );
    });
})();

// Tabs
(function(){
    $("#tabs > ul > li > a").click( function(){
        $("#tabs > ul > li > a").css( { "background" : "var(--tea-green)", "color" : "var(--rich-black)" } );
        $(this).css( { "background" : "var(--tea-green-light)", "color" : "var(--rich-black)" } );
        const thisTab = $(this).attr("href");
        $("#tabs > div:visible").fadeOut(200, function(){
        $(thisTab).fadeIn(200);
        } );
    } );
})();

// Content Rotator
(function(){
    let counter = 1;
    
    function contentRotator(){
        $(`#rotator blockquote:nth-child(${counter})`).fadeIn(2000, function() {
            if ($(this).is("#rotator blockquote:last-child")) {
                setTimeout(function() {
                    $(`#rotator blockquote:nth-child(${counter})`).fadeOut(2000, function() {
                        counter = 1;
                        contentRotator();
                    })
                }, 7000);
            }
            else {
                setTimeout(function() {
                    $(`#rotator blockquote:nth-child(${counter})`).fadeOut(2000, function() {
                        counter++;
                        contentRotator();
                    })
                }, 7000);
            }
        })}
    contentRotator();
})();
// Features Rotator 
(function(){
    let counter = 1;
    const listCount = $("#features ul li").length;
    let listheight = 0;
    let newul = $("#features ul").first().clone();
    $("#features ul:nth-child(1) li:nth-child(1)").css({
        color: "#FF5964",
        fontWeight: "600"
    })

    $("#features").append(newul);

    function featureRotator() {
        setTimeout(() => {
            if (counter <= listCount) {
                listheight -= 30;
                $("#features").animate( {top: `${listheight}px`}, 500, function() {
                    $(`#features ul:nth-child(1) li:nth-child(${counter+1})`).css({
                        color: "#FF5964",
                        fontWeight: "600"
                    });
                    counter++;
                    featureRotator();
                })
            }
            else {
                $("#features ul").first().remove();
                newul = $("#features ul").first().clone();
                $("#features").css("top", "0");
                $("#features").append(newul);
                counter = 1;
                listheight = 0;
                $('#features ul:nth-child(1) li:nth-child(1)').css({
                    color: "#FF5964",
                    fontWeight: "600"
                });
                featureRotator();
            }
        }, 1500);
    }    
    featureRotator();
})();

