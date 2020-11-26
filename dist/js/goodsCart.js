$(function (){

  // 判断本地存储是否有购物车数据  goods key
  if (localStorage.getItem('goods')) {// 有数据
    // 获取本地存储中购物车的数据  把数据拿出来⭐⭐⭐⭐⭐⭐
    var goodsArr = JSON.parse( localStorage.getItem('goods') )  //转成对象

    // 获取数据
    $.ajax({
      url: '../data/goods.json',
      type: 'get',
      dataType: 'json',
      success: function (json){
        //在循环外面声明一个变量
        console.log(json);
        var domStr = ''
        //遍历上面获取到的数组  获得购物车每个数据与下面json对象比较一下
        $.each(goodsArr,function (index,item){
          //遍历json所有数据  每个对比一下
          $.each(json,function (ind,obj){
            //说明这条数据是我想要的
            if ( item.code === obj.code ) {
              // 把数据遍历渲染到里面来  拼接
              domStr += `
              <div class="shop">
					<input type="checkbox" class="only">
					<div class="sp">
						<img src="${obj.imgurl}" alt="">
						<b>${obj.title}</b>
					</div>
					<i>￥ <span>${obj.price}</span></i>
					<i>
            <button class="jia">-</button>
            <input type="text" value="${item.num}" class="num">
						<button class="jian">+</button>
					</i>
					<i style="color: red;">￥<span>918.00</span></i>
					<i class="bj">
						<p>移入收藏</p>
						<p code="${obj.code}">删除</p>
					</i>
				</div>

              `
             
            }
          })
        })
        $('.spbox').html(domStr)
      }
    })

    // 商品移出购物车  每一个事件都是动态渲染的 使用事件委托
    $('.spbox').on('click','li em',function (){
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
        $('.spbox').html(nodata)
      }

      alert('商品移出购物车成功！')

    })

  } else {// 没数据
    var nodata = '<li style="line-height: 70px; text-align: center;">购物车暂无数据！</li>'
    //插入到list中
    $('.spbox').html(nodata)
  }

})




// 获取最大父元素，把所有子元素的事件委托给它
var bigbox = document.querySelector('.bigbox')
// 获取商品栏，集合，动态
var shop = document.getElementsByClassName('shop')
// 获取全选框
var allcheck = document.querySelector('.allcheck')
// 获取单选框，集合，动态
var onlys = document.getElementsByClassName('only')

// 绑定所有的委托事件，点击
bigbox.onclick = function (e) {
    // 兼容问题
    var e = e || window.event
    var target = e.target || e.srcElement
    // 点击全选框
    if (target.name == 'all') {
        for (var i = 0; i < shop.length; i++) {
            // 判断全选框选中状态，并赋值给单选框
            if (target.checked) {
                shop[i].firstElementChild.checked = true
            } else {
                shop[i].firstElementChild.checked = false
            }
        }
        zj()
        dphj()
        btnnum()
    }
    // 点击 + 号
    if (target.innerHTML == '+') {
        // 获取数量
        var val = target.previousElementSibling.value
        val++
        // 复制数量
        target.previousElementSibling.value = val
        // 获取单价
        var pirce = target.parentNode.previousElementSibling.lastElementChild.innerHTML
        
        // 计算金额
        var num =parseInt(val) * parseInt(pirce)
        console.log(num);
        // 赋值金额
        target.parentNode.nextElementSibling.lastElementChild.innerHTML = num
        zj()
        dphj()
    }
    // 点击 - 号（以下同理）
    if (target.innerHTML == '-') {
        var val = target.nextElementSibling.value
        // 数量不能为0
        if (val <= 1) {
            val = 1
        } else {
            val--
        }
        target.nextElementSibling.value = val
        var pirce = target.parentNode.previousElementSibling.lastElementChild.innerHTML
        var num = parseInt(val) * parseFloat(pirce)
        target.parentNode.nextElementSibling.lastElementChild.innerHTML = num
        zj()
        dphj()
    }
    // 点击删除
    if (target.innerHTML == '删除') {
        target.parentNode.parentNode.remove()
        zj()
        dphj()
        btnnum()
    }
    // 加入购物车
    if (target.innerHTML == '加入购物车') {
        // 创建一个div
        var newdvi = document.createElement('div')
        // 获取图片路径
        var img = target.previousElementSibling.src
        // 获取商品名称
        var b = target.parentNode.nextElementSibling.innerHTML
        // 获取商品价格
        var span = target.parentNode.nextElementSibling.nextElementSibling.lastElementChild.innerHTML
        // 命名
        newdvi.className = 'shop'
        // 添加内容
        newdvi.innerHTML = `<input type="checkbox" class="only">
        <div class="sp">
            <img src="${img}" alt="">
            <b>${b}</b>
        </div>
        <i>${'￥ '}<span>${span}</span></i>
        <i>
            <button class="jia">${'-'}</button>
            <input type="text" value="1" class="num">
            <button class="jian">${'+'}</button>
        </i>
        <i style="color: red;">${'￥'}<span>${span}</span></i>
        <i class="bj">
            <p>${'移入收藏'}</p>
            <p>${'删除'}</p>
        </i>`
        // 给父元素末尾追加商品
        document.querySelector('.spbox').appendChild(newdvi)
        zj()
        dphj()
        btnnum()
    }
    // 批量删除选中商品
    if (target.innerHTML == '批量删除') {
        for (var i = onlys.length - 1; i >= 0; i--) {
            // 判断是否选中
            if (onlys[i].checked) {
                onlys[i].parentNode.remove()
            }
        }
        zj()
        dphj()
        btnnum()
    }
    // 单选框点击事件
    if (target.className == 'only') {
        btnnum()
    }
}


// 单选框点击函数
function btnnum() {
    // 选中数量
    var num = 0
    for (var i = 0; i < onlys.length; i++) {
        if (onlys[i].checked) {
            num++
        }
    }
    // 赋值已选商品数量
    document.querySelector('.buy').innerHTML = num
    // 判断全选框状态
    if (num == onlys.length) {
        allcheck.checked = true
    } else {
        allcheck.checked = false
    }
    zj()
    dphj()
}
btnnum()


// 总价函数
function zj() {
    // 总价
    var zj = 0
    for (var i = 0; i < onlys.length; i++) {
        if (onlys[i].checked) {
            // 获取选中商品的金额
            var je = shop[i].children[4].lastElementChild.innerHTML
            // 累加总价
            zj += parseFloat(je)
        }
    }
    // 赋值总价
    document.querySelector('.zj').innerHTML = zj
}
zj()


// 店铺合计函数
function dphj() {
    // 店铺合计
    var dphj = 0
    for (var i = 0; i < shop.length; i++) {
        // 获取所有商品金额
        var dj = shop[i].children[4].lastElementChild.innerHTML
        // 累加
        dphj += parseFloat(dj)
    }
    // 店铺合计赋值
    document.querySelector('.dphj').innerHTML = dphj
}
dphj()


