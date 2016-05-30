$(".share").on("singleTap",function(){
    $(".mask").height($(window).height()).width($(window).width()).show().next(".popbox").show();
    window.scrollTo(0,0);
    window.ontouchmove=function(e){
        e.preventDefault && e.preventDefault();
        e.returnValue=false;
        e.stopPropagation && e.stopPropagation();
        return false;
    }
    $(".popbox").on("singleTap",function(){
        $(this).hide().prev(".mask").hide();
        window.ontouchmove=function(e){
            e.preventDefault && e.preventDefault();
            e.returnValue=true;
            e.stopPropagation && e.stopPropagation();
            return true;
        }
    })
    $(window).resize(function(){
        $(".mask").height($(window).height()).width($(window).width());
        window.scrollTo(0,0);
    })
})
//
//$(".rule").on("singleTap",function(){
//    var h=$(window).height()*0.6+$(".btnbox").height();;
//    $(".rulebox").height(h).show();
//    $(".back").on("singleTap",function(){$(this).parent().hide();})
//
//})

//排行榜
$(".tap_t li").on("singleTap",function(){
    $(this).addClass("hover").siblings().removeClass("hover")
    $(".tap_i li").eq($(".tap_t li").index(this)).show().siblings().hide();

})

//验证手机号
function isphone(phone){
    if(phone.length==0){
        return "手机号不能为空";
        //不等于11位或不是数字
    }else if(phone.length!=11||isNaN(phone)){
        return "手机号格式错误";
    }else{
        if(phone.charAt(0)!=1){return "手机号格式错误";//要以1开头
        }else if(phone.charAt(0)+phone.charAt(1)+phone.charAt(2)=="170"){return "暂不支持170号段";//不为170开头
        }else if(phone.charAt(0)+phone.charAt(1)+phone.charAt(2)=="134" && phone.charAt(3)=="9"){ return "暂不支持1349号段";//不为1349开头
        }else{return true;}
        //后台判断
        //return "您的手机号码已绑定,可以尝试换个号码试试！"
    }
}

$(".send").on("singleTap",function(){send_mes($(".send"),10)})
//验证码倒计时
function send_mes(a,b){
    if(b==0){a.html("重新发送").removeClass("bg-bbb").on("singleTap");
    }else{ b--;a.html(b+"s").addClass("bg-bbb").off("singleTap");
        setTimeout(function(){send_mes(a,b)}, 1000);//启动计时器，1秒执行一次
    }

}