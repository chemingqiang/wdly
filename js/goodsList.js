//两个东西 第一个东西来到这个页面加载当前商品数据把它渲染出来第二个东西是每个商品加入购物车的时候把数据编号code存到本地存储
//ready放法
$(function (){

  // 获取商品列表数据  需要json接口
  $.ajax({
    url: '../data/goods.json',
    type: 'get',
    dataType: 'json',
    //请求拿到数据了才获取到编号
    success: function (json){
      // console.log(json)
      //接下来展示渲染数据  根据json给的数据结构
      var goodsStr = '' //字符串为空累加到上面
      // $.each遍历数组  第一个你要遍历的数组  第二个函数（第二个每一个对象每一个数据商品编号）
      $.each(json,function (index,item){
        goodsStr += `<div class="goods">
          <img src="${item.imgurl}" alt="">
          <p>${item.price}</p>
          <h3>${item.title}</h3>
          <div code="${item.code}">立即订购</div>
        </div>`
      })
      // 添加到content里面去
      $('.content').html(goodsStr)
    }
  })

  // 点击加入购物车  委托（绑定点击事件  动态元素）第一个事件类型 第二个触发事件的元素  第三个事件处理函数
  //点击按钮之后需要储存当前用户点击哪个商品加入购物车
  $('.content').on('click','.goods div',function (){
    // 获取当前点击商品的编号
    //商品的code编号存下来  获取属性
    var code = $(this).attr('code')
    
    // localStorage  key = value  存值
              //  goods = [{code:'abc1',num:1},{code:'abc2',num:2}]
    // 判断本地存储是否有数据
    if (localStorage.getItem('goods')) {
      //说明之前有存储过商品   取出来数组  json解析成对象
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
      // var objStr = JSON.stringify({code:code,num:1})
      //应该变成对象，不应该是字符串  编号  数量
      goodsArr.push({code:code,num:1})
    }

    // 更新本地存储的数据  重新存进key里去  转成json字符串
    localStorage.setItem('goods',JSON.stringify(goodsArr))

    alert('添加购物车成功')

  })

})