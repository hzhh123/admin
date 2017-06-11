/**
 * Created by Administrator on 2017/6/8.
 */
$(function () {
    function loadIfreame() {
        $('body').append("<div id='load' style='padding:8px;position:absolute;top:50%;left:50%;background:#fff'><img src='../image/loading.gif'> <span style='position:relative;top:-8px'>正玩命加载中..</span></div>");
        var load = document.getElementById("load");
        var iframe = document.getElementById("iframe")
        iframe.style.display = "none";
        $('body').css('background', '#fff');
        if (iframe.attachEvent) {
            iframe.attachEvent("onload", function () {
                load.style.display = "none";
                iframe.style.display = "block";
                $('body').css('background', '#fff');
            });
        } else {
            iframe.onload = function () {
                load.style.display = "none";
                iframe.style.display = "block";
                $('body').css('background', '#fff');
            };
        }
    }

    loadIfreame();
})