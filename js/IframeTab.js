//iframeTab.js与style.js冲突，不能连用
var n=1;
/*添加iframe*/
function addIframeParent(cur){
    var $this = cur;
    var h = $this.attr("href"),
        //  m = $this.data("index"),
        label = $this.find("span").text(),
        isHas = false;
    if (h == "" || $.trim(h).length == 0) {
        return false;
    }

    var fullWidth = $(window.parent.document).width();
    if(fullWidth >= 750){
        $(window.parent.document).find(".layout-side").show();
    }else{
        $(window.parent.document).find(".layout-side").hide();
    }

    $(window.parent.document).find(".content-tab").each(function() {
        if ($(this).data("id") == h) {
            if (!$(this).hasClass("active")) {
                $(this).addClass("active").siblings(".content-tab").removeClass("active");
                addTabParent(this);
            }
            isHas = true;
        }
    });
    if(isHas){
        $(window.parent.document).find(".body-iframe").each(function() {
            if ($(this).data("id") == h) {
                $(this).show().siblings(".body-iframe").hide();
            }
        });
    }
    if (!isHas) {
        var tab = "<a href='javascript:;' class='content-tab active' data-id='"+h+"'>"+ label +" <i class='fa fa-times-circle' style='position: relative;top:13px'></i></a>";
        $(window.parent.document).find(".content-tab").removeClass("active");
        $(window.parent.document).find(".tab-nav-content").append(tab);
        var iframe = "<iframe class='body-iframe' name='iframe"+ n +"' width='100%' height='100%' src='"+ h +"' frameborder='0' data-id='"+ h +"' seamless></iframe>";
        $(window.parent.document).find(".layout-main-body").find("iframe.body-iframe").hide().parents(".layout-main-body").append(iframe);
        addTabParent($(window.parent.document).find(".content-tab.active"));
    }
    n++;
    return false;
}


/*在iframe页面中点击后在父页面添加tab*/
function addTabParent(cur) {
    var prev_all = tabWidth($(cur).prevAll()),
        next_all = tabWidth($(cur).nextAll());
    var other_width =tabWidth($(window.parent.document).find(".layout-main-tab").children().not(".tab-nav"));
    var navWidth = $(window.parent.document).find(".layout-main-tab").outerWidth(true)-other_width;//可视宽度
    var hidewidth = 0;
    if ($(window.parent.document).find(".tab-nav-content").width() < navWidth) {
        hidewidth = 0
    } else {
        if (next_all <= (navWidth - $(cur).outerWidth(true) - $(cur).next().outerWidth(true))) {
            if ((navWidth - $(cur).next().outerWidth(true)) > next_all) {
                hidewidth = prev_all;
                var m = cur;
                while ((hidewidth - $(m).outerWidth()) > ($(window.parent.document).find(".tab-nav-content").outerWidth() - navWidth)) {
                    hidewidth -= $(m).prev().outerWidth();
                    m = $(m).prev()
                }
            }
        } else {
            if (prev_all > (navWidth - $(cur).outerWidth(true) - $(cur).prev().outerWidth(true))) {
                hidewidth = prev_all - $(cur).prev().outerWidth(true)
            }
        }
    }
    $(window.parent.document).find(".tab-nav-content").animate({
            marginLeft: 0 - hidewidth + "px"
        },
        "fast")
}

/*获取宽度*/
function tabWidth(tabarr) {
    var allwidth = 0;
    $(tabarr).each(function() {
        allwidth += $(this).outerWidth(true)
    });
    return allwidth;
}

//点击iframe页面元素关闭tab
function closePage1() {
    var _this=$(window.parent.document).find(".content-tab");
    _this.each(function () {
        if($(this).hasClass('active')){
            $(this).prev().addClass('active');
            $(this).remove();
        }
    })
    $(window.parent.document).find(".body-iframe").each(function () {
        if(!($(this).css('display')=='none')){
            $(this).prev().show();
           $(this).remove();
        }
    })

}
