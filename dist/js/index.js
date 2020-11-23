"use strict";

// document.querySelector('h1').onclick = function (){
//   alert(123);
// };
//固定吸顶
window.onload = function () {
  var nav = document.querySelector(".header-3");
  var mav = document.querySelector('.header-1');

  window.onscroll = function () {
    //滚动条向上滚走的距离超过了top的高度的时候
    //导航nav开始吸顶
    //nav固定定位 
    //top保持在0；
    //滚动条向上滚走的距离低于top的高度的时候
    //nav回到原来 的位置
    //取消定位
    var stop = document.documentElement.scrollTop;

    if (stop >= 168) {
      nav.style = "position:fixed ; top:45px; ";
      mav.style = "position:fixed ; top:0; ";
    } else {
      nav.style.position = "static";
      mav.style.position = "static";
    }
  };
};