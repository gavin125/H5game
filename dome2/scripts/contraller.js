/*
 * www.migang.com @ heml5 game 0720 :: Gavin
 * Game common script
 */


//转屏
LGlobal.aspectRatio = PORTRAIT;//LANDSCAPE;

/*全屏*/
if(LGlobal.canTouch){
LGlobal.stageScale = LStageScaleMode.EXACT_FIT;
    LSystem.screen(LStage.FULL_SCREEN);
}

var loadData = [
    {name:"back",path:"images/game/mg_gamebg.png"},
    {name:"player",path:"images/game/mg_hero.png"},
    {name:"item0",path:"images/game/item0.png"},
    {name:"item1",path:"images/game/item1.png"},
    {name:"item2",path:"images/game/item2.png"},
    {name:"item3",path:"images/game/item3.png"},
    {name:"item4",path:"images/game/item4.png"},
    {name:"item5",path:"images/game/item5.png"},
    {name:"item6",path:"images/game/item6.png"},
    {name:"item7",path:"images/game/item7.png"},
    {name:"hintbg",path:"images/game/hintbg.png"}
];
var point=0;
var imglist;
var backLayer,playerLayer,itemLayer,overLayer,startLayer,hintLayer;
var hero;
var step=50,stepindex=0;
var pointTxt;
var seconds = '30s',secondsTxt;
var miao = 3,miaoTxt;
var tip = '',tipTxt;

function main(){
    LMouseEventContainer.set(LMouseEvent.MOUSE_MOVE,true);
}


function gameStart(result){
    LLoadManage.load(loadData,null,gameInit);
}

function gameInit(result){

    imglist = result;
    backLayer = new LSprite();

    addChild(backLayer);
    addBackGround();

    itemLayer= new LSprite();
    backLayer.addChild(itemLayer);

    overLayer = new LSprite();
    backLayer.addChild(overLayer);

////////
    hintLayer = new LSprite();
    var hintbg=new LBitmap(new LBitmapData(imglist["hintbg"]));
    hintLayer.addChild(hintbg);
    backLayer.addChild(hintLayer);
    hintLayer.addEventListener(LMouseEvent.MOUSE_DOWN,onDown1);
    function onDown1(event){
        seconds = '30s'
        hintLayer.removeChild(hintbg);
        addPlayer();
        startLayer = new LShape();
        startLayer.graphics.drawRoundRect(0, "#f44336", [220, 360, 200, 200, 100],true,"#f44336");
        backLayer.addChild(startLayer);
        addText();

        //游戏开始倒计时
        var m = setInterval(miaos,1000);
        var nums = 3;
        function miaos(){
            nums--;
            miao = nums;
            showText();
            if(nums == 0) {
                clearInterval(m);
                backLayer.removeChild(startLayer);
                startLayer.die();
                miaoTxt.die();
                //启动
                addEvent();
                miao = 3;
                gotoplay();
                return false;
            }
        }
    }

    ///////////////////////////////////////

    /////////////////////////////////



    //seconds
    function gotoplay(){
        var t = setInterval(second,1000);
        var num = 30;
        function second(){
            num--;
            seconds = num+'s';
            if(num == 0) {
                clearInterval(t);
                seconds = 0;
                showText();
                gameOver();
                return false;
            }
        }
    }
}

function addText(){
    secondsTxt = new LTextField();
    secondsTxt.color = "#ffffff";
    secondsTxt.size = 50;
    secondsTxt.x = 120;
    secondsTxt.y = 50;
    secondsTxt.weight = "bolder";
    backLayer.addChild(secondsTxt);

    pointTxt = new LTextField();
    pointTxt.color = "#ffffff";
    pointTxt.size = 50;
    pointTxt.x = 500;
    pointTxt.y = 50;
    pointTxt.weight = "bolder";
    backLayer.addChild(pointTxt);

    miaoTxt = new LTextField();
    miaoTxt.color = "#ffffff";
    miaoTxt.size = 120;
    miaoTxt.x = 282;
    miaoTxt.y = 390;
    miaoTxt.weight = "bolder";
    backLayer.addChild(miaoTxt);

    tipTxt = new LTextField();
    tipTxt.color = "#f44336";
    tipTxt.size = 120;
    tipTxt.x = 260;
    tipTxt.y = 200;
    tipTxt.weight = "bolder";
    backLayer.addChild(tipTxt);
    showText();
}

function showText(){
    secondsTxt.text = seconds;
    pointTxt.text = point;
    miaoTxt.text = miao;
    tipTxt.text = tip;

}
function addEvent(){
    backLayer.addEventListener(LEvent.ENTER_FRAME,onframe);
    backLayer.addEventListener(LMouseEvent.MOUSE_DOWN,onDown);
    backLayer.addEventListener(LMouseEvent.MOUSE_UP,onUp);
    backLayer.addEventListener(LMouseEvent.MOUSE_MOVE,onDown);
}

//持续场景监听
function onframe(){
    hero.run();

    for(var i=0;i<itemLayer.childList.length;i++){
        itemLayer.childList[i].run();
        if(itemLayer.childList[i].mode=="die"){
            itemLayer.removeChild(itemLayer.childList[i]);
        }
    }
    if(stepindex++ > step){
        stepindex = 0;
        addItem();
    }
    showText();
}

//游戏结束
function gameOver(){
    backLayer.die();
    itemLayer.removeAllChild();

    //提交游戏得分
    postto();
    function postto(){
        $.ajax({
            type: 'POST',
            url: result_url,//AJAX请求地址服务器
            data:  { friend: '',point:point },//friend:空值为自己玩，有值为帮朋友玩（值就是朋友的微信ID）
            success: function(msg){
                alert( msg );
            },
            error: function() {
                var r=confirm('提交失败!请确认是否重新提交？');
                if (r==true){postto();}else{window.location.href="活动首页index.html"}
            }
        });
    }
}


function addItem(){
    var item=new Item();
    item.x = 20 + Math.floor(Math.random()*(LGlobal.width - 50));
    itemLayer.addChild(item);
}
function onDown(event){
    if(event.selfX < LGlobal.width * 0.5){
        hero.mode = "left";
        hero.anime.setAction(1);
    }else{
        hero.mode = "right";
        hero.anime.setAction(2);
    }
}
function onUp(event){
    hero.mode = "";
    hero.anime.setAction(0);
}
function addPlayer(){
    playerLayer = new LSprite();
    backLayer.addChild(playerLayer);
    hero = new Player();
    hero.x = 250;
    hero.y = 800;
    playerLayer.addChild(hero);
}
function addBackGround(){
    var bitmap=new LBitmap(new LBitmapData(imglist["back"]));
    backLayer.addChild(bitmap);
}

function Player(){
    base(this,LSprite,[]);
    var self = this;
    self.mode = "";
    var list = LGlobal.divideCoordinate(496,496,4,4);
    var data = new LBitmapData(imglist["player"],0,0,124,124);
    self.anime = new LAnimation(self,data,list);
    self.step = 2,self.stepindex = 0;
}
Player.prototype.run = function (){
    var self = this;
    if(self.stepindex++ > self.step){
        self.stepindex = 0;
        self.anime.onframe();
    }
    if(self.mode == "left"){
        if(self.x > 10)self.x -= 10;
    }else if(self.mode == "right"){
        if(self.x < LGlobal.width - self.getWidth())self.x += 10;
    }
}

function Item(){
    base(this,LSprite,[]);
    var self = this;
    self.mode="";
    var index = Math.floor(Math.random()*8);
    self.value = index < 6 ? 1:-1;
    var bitmap = new LBitmap(new LBitmapData(imglist["item"+index]));
    self.addChild(bitmap);
}
Item.prototype.run=function(){
    var self=this;
    self.y += 10;
    var hit = self.checkHit();
    if(hit || self.y > LGlobal.height){
        self.mode="die";
    }
}
Item.prototype.checkHit=function(){
    var self=this;
    if(LGlobal.hitTestArc(self,hero)){
        if(self.value >0){
            point += 1;
            tipTxt.color = "#f44336";
            tip = '+1';

        }else if(point==0){
            point = 0;
        }else{
            point -= 1;
            tipTxt.color = "#66a030";
            tip = '-1';
        }
        var timer = setTimeout(function(){
            tip = '';
        },1200);
        //clearTimeout(timer);
        return true;
    }

    return false;
}

//GAME Init
init(10,"game",640,1000,main);


/*
 * Game contraller script 
 */
var MG_Game_Contraller = {
    name : '米缸 邀请基友捡钱啦',
    verson : '20150630',
    loading : function(){
        var that = this;
        var interval = setInterval(increment,20);
        var current = 0;
        function increment(){
            current++;
            $('.load-bar-inner').css('width',current+'%');
            $('#counter').html(current+'%');
            if(current == 100) {
                clearInterval(interval);
                $('#load').hide();
                gameStart();
                return false;
            }
        }
    }
}

//初始化
$(function(){
    MG_Game_Contraller.loading();
});