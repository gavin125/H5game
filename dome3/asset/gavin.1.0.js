/**
* gavin
* @version 1.0
* @Explain gavin是个人js功能集合
* @author gavin
* @blog http://blog.csdn.net/gulei125
*/
;(function(win){
    var doc = win.document;
    function Gavin(){

    }
    Gavin.prototype={
        constructor:Gavin,
        rotateView:function(callback1,callback2){//使用css3旋转屏幕视图，始终保持视图是横屏展示
            var body = doc.getElementsByTagName('body')[0];
            body.style.transformOrigin = doc.documentElement.clientWidth/2+"px "+doc.documentElement.clientWidth/2+"px";
            function orient() {//横竖屏判断
                if (win.orientation == 0 || win.orientation == 180) { //竖屏
                    body.style.width=doc.documentElement.clientHeight+'px';
                    body.style.height=doc.documentElement.clientWidth+'px';
                    body.style.transform = 'rotate(90deg)';
                    callback1();
                }else if (win.orientation == 90 || win.orientation == -90) { //横屏
                    body.style.width=doc.documentElement.clientWidth+'px';
                    body.style.height=doc.documentElement.clientHeight+'px';
                    body.style.transform = 'rotate(0deg)';
                    callback2();
                }
            }
            orient();
            var timer;
            win.addEventListener("orientationchange", function(){clearTimeout(timer);timer = setTimeout(orient, 300);});
        }
    }
    //创建对象并绑定到window对象，供外部调用
    win._$G=new Gavin();
}(typeof window!=="undefined" ? window:this));