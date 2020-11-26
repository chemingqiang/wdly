//两个东西 第一个东西来到这个页面加载当前商品数据把它渲染出来第二个东西是每个商品加入购物车的时候把数据编号code存到本地存储
//ready放法
// window.οnlοad=function(){ 
$(function (){
  $.ajax({
    url: "../data/goods.json",
    type: "get",
    dataType:'json',
    success:function(json){
      console.log(json);
      var goodsStr = '';
      $.each(json,function(index,item){
        goodsStr += `<div class="goods">
          <img src="${item.imgurl}" alt="">
          <p>${item.price}</p>
          <h3>${item.title}</h3>
          <div code="${item.code}">立即订购</div>
        </div>`
      })
      $('.content').html(goodsStr)

    }
  })

  

  // 点击加入购物车  委托（绑定点击事件  动态元素）第一个事件类型 第二个触发事件的元素  第三个事件处理函数
  //点击按钮之后需要储存当前用户点击哪个商品加入购物车
  $('.content').on('click','.goods div',function (){
    // 获取当前点击商品的编号
    //商品的code编号存下来  获取属性
    var code = $(this).attr('code')
    

    // 判断本地存储是否有数据
    if (localStorage.getItem('goods')) {
      var goodsArr = JSON.parse( localStorage.getItem('goods') )
    } else {
      var goodsArr = []
    }


    //是否有某个商品给个false
    var hasGoods = false

    if (goodsArr.length > 0) {
      // 判断当前选中商品是否在购物车中
      $.each(goodsArr,function (index,item){
        console.log(index)
        console.log(item)
        if (item.code === code) {// 商品存在购物车中，数量+1
          item.num++//代表数量的key++
          //执行到这说明有某个商品
          hasGoods = true
          //执行到return false 说明遍历结束了
          return false
        }
      })
    }

    // 如果购物车没有当前选中的商品，添加一条数据
    if (!hasGoods) {
      //应该变成对象，不应该是字符串  编号  数量
      goodsArr.push({code:code,num:1})
    }

    // 更新本地存储的数据  重新存进key里去  转成json字符串
    localStorage.setItem('goods',JSON.stringify(goodsArr))

    alert('添加购物车成功')

  })

})





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

