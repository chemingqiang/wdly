// document.querySelector('h1').onclick = function (){
//   alert(123);
// };

//固定吸顶
window.onload=function(){
  var nav = document.querySelector(".header-3");
  var mav = document.querySelector('.header-1');
    window.onscroll = function(){
      
      //滚动条向上滚走的距离超过了top的高度的时候
      //导航nav开始吸顶
        //nav固定定位 
        //top保持在0；
      //滚动条向上滚走的距离低于top的高度的时候
        //nav回到原来 的位置
        //取消定位
      var stop = document.documentElement.scrollTop
      if(stop >= 168){
        nav.style="position:fixed ; top:45px; "
        mav.style="position:fixed ; top:0; "
        
      }else{
        nav.style.position = "static";
        mav.style.position = "static";
      }
      
    }

 //获取相关元素
 var slider = document.querySelector('.slider');//总容器
 var liArr = slider.children[0].children[0].children;//所有的图片li
 var sliderCtrl = slider.children[1];//左右箭头和小圆点所在的容器
 var prev = document.querySelector('prev');//左箭头
 var next = document.querySelector('next');//右箭头
 var width = slider.offsetWidth ;//一个li的宽度
 //使用一个变量来记录当前是第几副图
 var index = 0;

 //1 根据图片数量动态生成小圆点
 for(var i=0;i<liArr.length;i++){
     var newSpan = document.createElement('span');
     newSpan.className = "slider-ctrl-con";
     //考虑到后期小圆点会被点击,需要知道被点击的是第几个
     newSpan.index = i;
     sliderCtrl.appendChild(newSpan);
 }

 //2 点亮第一个小圆点,显示第一幅图
 for(var i=0;i<liArr.length;i++){
     liArr[i].style.left = width+"px";
 }
 liArr[index].style.left = 0;
 light();


 //3 点击小圆点,点亮该小圆点,图片运动到指定图片(箭头和小圆点的事件都委托给sliderCtrl)
 sliderCtrl.onclick = function(e){
     var event = e||window.event;
     var target = event.target||event.srcElement;

     if(target.className.indexOf("slider-ctrl-con")>-1){
         //indexOf如果没有找到,返回值是-1,如果返回值不是-1,说明找到了,这就是小圆点
         //图片要变成响应的图片            
         if(target.index>index){
             //原来的索引是index,要看的图片的索引是target.index
             //瞬间把要看的图放到右边
             liArr[target.index].style.left = width+"px";
             //原来的index,去左边,要看的target.index进入中心
             animate(liArr[index],{left:-width});
             animate(liArr[target.index],{left:0});
         }
         if(target.index<index){
             //原来的索引是index,要看的图片的索引是target.index
             //瞬间把要看的图放到左边
             liArr[target.index].style.left = -width+"px";
             animate(liArr[index],{left:width});
             animate(liArr[target.index],{left:0})
         }
         //获取被点击的小圆点的索引
         index = target.index;
         light()

     }

     if (target.className=="prev") {
         //上一张
         prevFn();
     }

     if (target.className=="next") {
         //下一张
         nextFn();
     }
 }
 //自动轮播
 slider.timer = setInterval(nextFn,2000)


 //鼠标移入slider,停止轮播
 slider.onmouseenter = function(){
     clearInterval(slider.timer)
 }

 //鼠标移出slider,开始轮播
 slider.onmouseleave = function(){
     clearInterval(slider.timer);
     slider.timer = setInterval(nextFn,2000);
 }

 //light:点亮当前小圆点
 function light(){
     var spanArr = sliderCtrl.children;//所有的小圆点和左右箭头
     //干掉所有人
     for(var i=2;i<spanArr.length;i++){
         spanArr[i].className = "slider-ctrl-con";
     }
     //留下我一个
     spanArr[index+2].className = "slider-ctrl-con current";
 }

 //看上一张
 function prevFn(){
     var current = index - 1;
     if(current<0){
         //如果你在最前面一张还要看前一张,就是想看最后一张
         current = liArr.length-1
     }
     //把要看的图先放到左边
     liArr[current].style.left = -width+"px";
     animate(liArr[index],{left:width})
     animate(liArr[current],{left:0});

     //更新总的索引
     index = current;
     //点亮小圆点
     light()
 }

 //看下一张
 function nextFn(){
     var current = index +1;
     if(current>liArr.length-1){
         current = 0;
     }
     //把要看的图先放到右边
     liArr[current].style.left = width+"px";
     animate(liArr[index],{left:-width})
     animate(liArr[current],{left:0})

     //更新总的索引
     index = current;
     //点亮小圆点
     light()

 }
}

//注册登录页
// var btn1 = document.querySelector('.dengl')//登录
// var btn2 = document.querySelector('.btn')//登录框登录按钮
// var login = document.querySelector('#denglu')//需要控制登录框的显示隐藏
// var user =document.querySelector('.user')
// var pass = document.querySelector('.pass')
// // var auto = $1('.auto')//是否记住密码
// var mask =document.querySelector('.mask')//遮罩层
// //var close = $1('span')//关闭开关暂时没有

// btn1.onclick = function (){ 
//   //点击登录按钮显示登录框遮罩层
//   login.style.display = 'block'
//   mask.style.display = 'block'
// }
// // 用户登录
// btn2.onclick = function (){
//   // 跳转到指定页面
//   location.href = '../pages/index.html'
// }

//  shopping轮播图

  


