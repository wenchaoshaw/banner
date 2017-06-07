/**
 * Created by Administrator on 2017/5/16.
 */
//封装一个代替getElementById()的方法
function byId(id){
    return typeof (id)==="string"?document.getElementById(id):id;
}
//全局变量
var index = 0,
    timer = null,//定时器
    pics=byId("banner").getElementsByTagName("div"),
    dots=byId("dots").getElementsByTagName("span"),//因为span的个数与上面div的个数始终一致，所以只需要取div的个数就行，span的个数无需再取
    prev=byId("prev"),
    next=byId("next"),
    len=pics.length,/*console.log(pics);console.log(typeof pics);数组*/
    menu=byId("menu-content"),
    menuItems=menu.getElementsByClassName("menu-item"),
    subMenu=byId("sub-menu"),
    innerBox=subMenu.getElementsByClassName("inner-box");



function slideImg(){
    var main = byId("main");
    //划上清除定时器，划出继续
    main.onmousemove = function(){
        //划上清除定时器
        if(timer)clearInterval(timer);

    };
    main.onmouseout = function(){
      timer = setInterval(function(){
          index++;
          if(index>=len) {
              index = 0;
          }
         /* console.log(index);*/
          //切换图片
          changeImg();
      },3000);
    };//事件
    //自动在main上触发鼠标离开事件，为了一进去就自动播放 ，
    main.onmouseout();//方法
    //遍历所有圆点，且绑定点击事件，点击圆点切换图片
    for(var d=0;d<len;d++){
        //给所有span添加一个id属性，值为d,作为当前span的索引
        dots[d].id=d;
        dots[d].onclick=function(){
            //使当前span的id值赋值给index
            index=this.id;
            /*this.className="active";//给当前的span添加active类，使点击使，切换当前类active的样式*/
            //调用changeImg，实现切换图片
            changeImg();
        }

    }
    //下一张
    next.onclick=function(){
        index++;
        if(index>=len) index=0;
        changeImg();
    };
    //上一张
    prev.onclick=function(){
        index--;
        if(index<0) index=len-1;
        changeImg();
    }
}
//导航菜单
//遍历主菜单，且绑定事件
for(var m=0;m<menuItems.length;m++){
    //给每一个menu-item定义data-index属性，作为索引
    menuItems[m].setAttribute("data-index",m);

    menuItems[m].onmouseover=function(){
        //将subMenu的类改成sub-menu，相当于去除hide类，相当于将subMenu隐藏
        subMenu.className="sub-menu";
        var idx=this.getAttribute("data-index");
        /*console.log(idx)*/
        //遍历innerBox，将其隐藏
        for(var j=0;j<innerBox.length;j++){
            innerBox[j].style.display='none';
            menuItems[j].style.background='none'
        }
        menuItems[idx].style.background='rgba(0,0,0,0.1)';
        innerBox[idx].style.display='block';
    };
    menu.onmouseout=function(){
        subMenu.className="sub-menu hide"
    };
    subMenu.onmouseover=function(){
        this.className="sub-menu"
    };
    subMenu.onmouseout=function(){
        this.className="sub-menu hide"
    }
}
//切换图片
function changeImg(){
    //遍历banner下所有的div及dots下所有的span,将div隐藏，将span清除类
    for (var i=0;i<len;i++){
        pics[i].style.display='none';
        dots[i].className="";

    }
    //根据index索引找到当前div和当前span，将div显示出来，将span设为当前
    pics[index].style.display='block';
    dots[index].className="active";
}
slideImg();