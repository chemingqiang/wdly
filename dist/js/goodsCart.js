$(function (){

  // 判断本地存储是否有购物车数据  goods key
  if (localStorage.getItem('goods')) {// 有数据
    // 获取本地存储中购物车的数据  把数据拿出来⭐⭐⭐⭐⭐⭐
    var goodsArr = JSON.parse( localStorage.getItem('goods') )  //转成对象

    // 获取数据
    $.ajax({
      url: './data/goods.json',
      type: 'get',
      dataType: 'json',
      success: function (json){
        //在循环外面声明一个变量
        var domStr = ''
        //遍历上面获取到的数组  获得购物车每个数据与下面json对象比较一下
        $.each(goodsArr,function (index,item){
          //遍历json所有数据  每个对比一下
          $.each(json,function (ind,obj){
            //说明这条数据是我想要的
            if ( item.code === obj.code ) {
              // 把数据遍历渲染到里面来  拼接
              domStr += `
              <li>
                <img src="${obj.imgurl}" alt="">
                <h3>${obj.title}</h3>
                <p>${obj.price}</p>
                <span>${item.num}</span>
                <em code="${obj.code}">删除</em>
              </li>
              `
            }
          })
        })
        $('.list').html(domStr)
      }
    })

    // 商品移出购物车  每一个事件都是动态渲染的 使用事件委托
    $('.list').on('click','li em',function (){
      // 删除该商品对应的li  节点
      $(this).parent().remove()

      // 更新本地存储中的数据  数据
      var code = $(this).attr('code') // 要删除商品的编号  给删除按钮创建个code
      // 删除数组元素：pop()  unshift()  splice(index,1)  从数组中删除某个对象
      //知道索引就能删掉
      $.each(goodsArr,function (index,item){
        if (item.code === code) {
          goodsArr.splice(index,1)
          return false
        }
      })

      // 判断购物车是否还有数据
      if (goodsArr.length > 0) {
        // 更新本地数据
        localStorage.setItem('goods',JSON.stringify(goodsArr))
      } else {
        // 清除本地数据
        localStorage.removeItem('goods')
        var nodata = '<li style="line-height: 70px; text-align: center;">购物车暂无数据！</li>'
        $('.list').html(nodata)
      }

      alert('商品移出购物车成功！')

    })

  } else {// 没数据
    var nodata = '<li style="line-height: 70px; text-align: center;">购物车暂无数据！</li>'
    //插入到list中
    $('.list').html(nodata)
  }

})