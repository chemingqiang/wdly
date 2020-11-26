
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


//⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐
  
  var btn3 = document.querySelector('.dengl')//点击
  
  var btn2 = $1('.dengluanniu')//登录按钮
  var login = $1('#denglu')//登录界面
  var user = $1('.user')
  var pass = $1('.pass')
  var mask = $1('.mask')//遮罩层
  var close = document.querySelector('#tui')//退出按钮
  console.log(btn3);
  // var auto = $1('.auto')//是否记住密码
  var re = $1('.register')

 btn3.onclick= function(){
  
   login.style.display = 'block';
   mask.style.display = 'block';
   
 }
 close.onclick = function (){
   login.style.display = 'none';
   mask.style.display = 'none';
 }

// 登录
btn2.onclick = function (){
  var us = user.value
  var ps = pass.value

  // 验证  空值判断
  if (!us || !ps) {
    alert('账号或密码不能为空')
    return
  }

  // 提交数据  数据接口⭐⭐⭐后端数据库
  ajax({
    //参照接口文档说明
    url: 'http://localhost/wdly/data/user.php',
    type: 'post',
    data: {
      user: us,
      pass: ps,
      type: 'login',
    },
    //返回值
    dataType: 'json',
    success: function (json){
      alert(json.msg)
    },
    //错误弹出状态码
    error:function (code){
      alert(code)
    }
  })

}
// 注册
re.onclick = function (){
  var us = user.value
  var ps = pass.value

  // 验证
  if (!us || !ps) {
    alert('账号或密码不能为空')
    return
  }

  // 提交数据
  ajax({
    url: './data/user.php',
    type: 'post',
    data: {
      user: us,
      pass: ps,
      type: 'add',
    },
    dataType: 'json',
    success: function (json){
      alert(json.msg)
    },
    error:function (code){
      alert(code)
    }
  })

}



//⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐
/*定时器js*/
function daojishi(){
  //获取当前时间
  var dt1=new Date()
  //设置结束时间
  var dt2=new Date('2021,8,7 00:00:00')
  //计算时间差
  var t1=parseInt((dt2-dt1)/1000)
  //剩下的天数
  var day=Math.floor(t1/(60*60*24))
  //时
  var hh=parseInt((t1-day*60*60*24)/3600)
  //判断小时是否小于10
  if(hh<10){
      hh='0'+hh
  }
  //分
  var mm=parseInt((t1-day*60*60*24-hh*3600)/60)
  if(mm<10){
      mm='0'+mm
  }
  //秒
  var ss=t1-day*60*60*24-hh*3600-mm*60
  if(ss<10){
      ss='0'+ss
  }
  $('.jishidao span:eq(5)').text(hh)
  $('.jishidao span:eq(7)').text(mm)
  $('.jishidao span:eq(9)').text(ss)
}
//添加定时器，让fn1函数每间隔一秒钟执行一次
setInterval(daojishi,1000)
}



