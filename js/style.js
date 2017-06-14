/**
 * Created by Administrator on 2017/5/17.
 */
/*左侧菜单点击*/
$(".metismenu").on('click', 'li a', function(e) {
    //防止有链接跳转
    e.preventDefault();
    var $this = $(this);
    if($this.attr('href')!=''||$this.attr('href')!='#'||$this.attr('href')!='javascript;'||$this.attr('href')!='javascript:void(0)'){
        addIframe($this);
    }
});

/*添加iframe*/
var m=1;
function addIframe(cur){
    var $this = cur;
    var h = $this.attr("href"),
      //  m = $this.data("index"),
        label = $this.find("span").text(),
        isHas = false;
    if (h == "" || $.trim(h).length == 0) {
        return false;
    }

    var fullWidth = $(window).width();
    if(fullWidth >= 750){
        $(".layout-side").show();
    }else{
        $(".layout-side").hide();
    }

    $(".content-tab").each(function() {
        if ($(this).data("id") == h) {
            if (!$(this).hasClass("active")) {
                $(this).addClass("active").siblings(".content-tab").removeClass("active");
                addTab(this);
            }
            isHas = true;
        }
    });
    if(isHas){
        $(".body-iframe").each(function() {
            if ($(this).data("id") == h) {
                $(this).show().siblings(".body-iframe").hide();
            }
        });
    }
    if (!isHas) {
        var tab = "<a href='javascript:;' class='content-tab active' data-id='"+h+"'>"+ label +" <i class='fa fa-times-circle' style='position: relative;top:13px'></i></a>";
        $(".content-tab").removeClass("active");
        $(".tab-nav-content").append(tab);
        var iframe = "<iframe class='body-iframe' name='iframe"+ m +"' width='100%' height='100%' src='"+ h +"' frameborder='0' data-id='"+ h +"' seamless></iframe>";
        $(".layout-main-body").find("iframe.body-iframe").hide().parents(".layout-main-body").append(iframe);
        addTab($(".content-tab.active"));
    }
    m++;
    return false;
}


/*添加tab*/
function addTab(cur) {
    var prev_all = tabWidth($(cur).prevAll()),
        next_all = tabWidth($(cur).nextAll());
    var other_width =tabWidth($(".layout-main-tab").children().not(".tab-nav"));
    var navWidth = $(".layout-main-tab").outerWidth(true)-other_width;//可视宽度
    var hidewidth = 0;
    if ($(".tab-nav-content").width() < navWidth) {
        hidewidth = 0
    } else {
        if (next_all <= (navWidth - $(cur).outerWidth(true) - $(cur).next().outerWidth(true))) {
            if ((navWidth - $(cur).next().outerWidth(true)) > next_all) {
                hidewidth = prev_all;
                var m = cur;
                while ((hidewidth - $(m).outerWidth()) > ($(".tab-nav-content").outerWidth() - navWidth)) {
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
    $(".tab-nav-content").animate({
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

/*左按钮事件*/
$(".btn-left").on("click", leftBtnFun);
/*右按钮事件*/
$(".btn-right").on("click", rightBtnFun);
/*选项卡切换事件*/
$(".tab-nav-content").on("click", ".content-tab", navChange);
/*选项卡关闭事件*/
$(".tab-nav-content").on("click", ".content-tab i", closePage);
/*选项卡双击关闭事件*/
$(".tab-nav-content").on("dblclick", ".content-tab", closePage);


/*左按钮方法*/
function leftBtnFun() {
    var ml = Math.abs(parseInt($(".tab-nav-content").css("margin-left")));
    var other_width = tabWidth($(".layout-main-tab").children().not(".tab-nav"));
    var navWidth = $(".layout-main-tab").outerWidth(true)-other_width;//可视宽度
    var hidewidth = 0;
    if ($(".tab-nav-content").width() < navWidth) {
        return false
    } else {
        var tabIndex = $(".content-tab:first");
        var n = 0;
        while ((n + $(tabIndex).outerWidth(true)) <= ml) {
            n += $(tabIndex).outerWidth(true);
            tabIndex = $(tabIndex).next();
        }
        n = 0;
        if (tabWidth($(tabIndex).prevAll()) > navWidth) {
            while ((n + $(tabIndex).outerWidth(true)) < (navWidth) && tabIndex.length > 0) {
                n += $(tabIndex).outerWidth(true);
                tabIndex = $(tabIndex).prev();
            }
            hidewidth = tabWidth($(tabIndex).prevAll());
        }
    }
    $(".tab-nav-content").animate({
            marginLeft: 0 - hidewidth + "px"
        },
        "fast");
}

/*右按钮方法*/
function rightBtnFun() {
    var ml = Math.abs(parseInt($(".tab-nav-content").css("margin-left")));
    var other_width = tabWidth($(".layout-main-tab").children().not(".tab-nav"));
    var navWidth = $(".layout-main-tab").outerWidth(true)-other_width;//可视宽度
    var hidewidth = 0;
    if ($(".tab-nav-content").width() < navWidth) {
        return false
    } else {
        var tabIndex = $(".content-tab:first");
        var n = 0;
        while ((n + $(tabIndex).outerWidth(true)) <= ml) {
            n += $(tabIndex).outerWidth(true);
            tabIndex = $(tabIndex).next();
        }
        n = 0;
        while ((n + $(tabIndex).outerWidth(true)) < (navWidth) && tabIndex.length > 0) {
            n += $(tabIndex).outerWidth(true);
            tabIndex = $(tabIndex).next()
        }
        hidewidth = tabWidth($(tabIndex).prevAll());
        if (hidewidth > 0) {
            $(".tab-nav-content").animate({
                    marginLeft: 0 - hidewidth + "px"
                },
                "fast");
        }
    }
}

/*选项卡切换方法*/
function navChange() {
    if (!$(this).hasClass("active")) {
        var k = $(this).data("id");
        $(".body-iframe").each(function() {
            if ($(this).data("id") == k) {
                $(this).show().siblings(".body-iframe").hide();
                return false
            }
        });
        $(this).addClass("active").siblings(".content-tab").removeClass("active");
        addTab(this);
    }
}

/*选项卡关闭方法*/
function closePage() {
    var url = $(this).parents(".content-tab").data("id");
    var cur_width = $(this).parents(".content-tab").width();
    if ($(this).parents(".content-tab").hasClass("active")) {
        if ($(this).parents(".content-tab").next(".content-tab").size()) {
            var next_url = $(this).parents(".content-tab").next(".content-tab:eq(0)").data("id");
            $(this).parents(".content-tab").next(".content-tab:eq(0)").addClass("active");
            $(".body-iframe").each(function() {
                if ($(this).data("id") == next_url) {
                    $(this).show().siblings(".body-iframe").hide();
                    return false
                }
            });
            var n = parseInt($(".tab-nav-content").css("margin-left"));
            if (n < 0) {
                $(".tab-nav-content").animate({
                        marginLeft: (n + cur_width) + "px"
                    },
                    "fast")
            }
            $(this).parents(".content-tab").remove();
            $(".body-iframe").each(function() {
                if ($(this).data("id") == url) {
                    $(this).remove();
                    return false
                }
            })
        }
        if ($(this).parents(".content-tab").prev(".content-tab").size()) {
            var prev_url = $(this).parents(".content-tab").prev(".content-tab:last").data("id");
            $(this).parents(".content-tab").prev(".content-tab:last").addClass("active");
            $(".body-iframe").each(function() {
                if ($(this).data("id") == prev_url) {
                    $(this).show().siblings(".body-iframe").hide();
                    return false
                }
            });
            $(this).parents(".content-tab").remove();
            $(".body-iframe").each(function() {
                if ($(this).data("id") == url) {
                    $(this).remove();
                    return false
                }
            })
        }
    } else {
        $(this).parents(".content-tab").remove();
        $(".body-iframe").each(function() {
            if ($(this).data("id") == url) {
                $(this).remove();
                return false
            }
        });
        addTab($(".content-tab.active"))
    }
    return false
}

//
/*循环菜单*/
function initMenu(menu,parent){
    for(var i=0; i<menu.length; i++){
        var item = menu[i];
        var str = "";
        try{
//                    if(item.isHeader == "1"){
//                        str = "<li class='menu-header'>"+item.name+"</li>";
//                        $(parent).append(str);
//                        if(item.children != ""){
//                            initMenu(item.children,parent);
//                        }
//                    }else{
//                        item.icon == "" ? item.icon = "fa fa-folder-o" : item.icon = item.icon;
            if(item.children == ""){
                str = "<li><a href='"+item.url+"'  aria-expanded='false'><span class='"+item.icon+"'></span>&nbsp;"+item.name+"</a></li>";
                $(parent).append(str);
            }else{
                str = "<li><a href='"+item.url+"' class='has-arrow' aria-expanded='false'><span class='"+item.icon+"'></span>&nbsp;"+item.name+"</a>";
                str +="<ul aria-expanded='false' id='menu-child-"+item.id+"'></ul></li>";
                $(parent).append(str);
                var childParent = $("#menu-child-"+item.id);
                initMenu(item.children,childParent);
            }
//                    }
        }catch(e){}
    }
}

$(function () {
    var menu2 = [{"id":"1","name":"主菜单","parentId":"0","url":"","icon":"","order":"1","isHeader":"1","children":[
        {"id":"3","name":"商品管理","parentId":"1","url":"","icon":"","order":"1","isHeader":"0","children":[
            {"id":"4","name":"品牌管理","parentId":"3","url":"index_v2.html","icon":"","order":"1","isHeader":"0","children":""},
            {"id":"5","name":"分类管理","parentId":"3","url":"test2.html","icon":"","order":"1","isHeader":"0","children":""}
        ]},
        {"id":"6","name":"订单管理","parentId":"1","url":"","icon":"","order":"1","isHeader":"0","children":[
            {"id":"7","name":"已付款","parentId":"6","url":"home3.html","icon":"","order":"1","isHeader":"0","children":""},
            {"id":"8","name":"未付款","parentId":"6","url":"home4.html","icon":"","order":"1","isHeader":"0","children":""}
        ]}
    ]},

        {"id":"24","name":"框架案例1","parentId":"0","url":"","icon":"","order":"2","isHeader":"1","children":[
            {"id":"25","name":"新功能","parentId":"24","url":"","icon":"","order":"1","isHeader":"0","children":""},

        ]}
    ];

//
    /*循环菜单*/
    function initMenu(menu,parent){
        for(var i=0; i<menu.length; i++){
            var item = menu[i];
            var str = "";
            try{
//                    if(item.isHeader == "1"){
//                        str = "<li class='menu-header'>"+item.name+"</li>";
//                        $(parent).append(str);
//                        if(item.children != ""){
//                            initMenu(item.children,parent);
//                        }
//                    }else{
//                        item.icon == "" ? item.icon = "fa fa-folder-o" : item.icon = item.icon;
                if(item.children == ""){
                    str = "<li><a href='"+item.url+"'  aria-expanded='false'><i class='"+item.icon+"'></i><span>&nbsp;"+item.name+"</span></a></li>";
                    $(parent).append(str);
                }else{
                    str = "<li><a href='"+item.url+"' class='has-arrow' aria-expanded='false'><i class='"+item.icon+"'></i><span>&nbsp;"+item.name+"</span></a>";
                    str +="<ul aria-expanded='false' id='menu-child-"+item.id+"'></ul></li>";
                    $(parent).append(str);
                    var childParent = $("#menu-child-"+item.id);
                    initMenu(item.children,childParent);
                }
//                    }
            }catch(e){}
        }
    }
    initMenu(menu2,$('#menu1'));
    $('#menu1').metisMenu();
})