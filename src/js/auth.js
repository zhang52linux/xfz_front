$(function () {
    $("#btn").click(function () {
        $(".mask-wrapper").show()
    });
    $(".close-btn").click(function () {
        $(".mask-wrapper").hide();
    });
})

$(function () {
    $(".switch_signup").click(function () {
        $(".scroll-wrapper").css({"left":-400});
    });
    $(".switch_signin").click(function () {
        $(".scroll-wrapper").css({"left":0});
    });
})

