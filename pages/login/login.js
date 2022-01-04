// pages/login/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    button_disabled:false,//是否可以点击登录
    input_name:'',
    input_password:'',
    //判断小程序的API，回调，参数，组件等是否在当前版本可用。
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    isHide: false,
    uid:''
  },
  
  login: function (){
    //this.data.button_disabled=true
    if(this.data.input_name==''){
      wx.showToast({
        title: '账号不能为空',
        icon: 'none',
        duration: 1500
      })
    }else{
      if(this.data.input_password==''){
        wx.showToast({
          title: '密码不能为空',
          icon: 'none',
          duration: 1500
        })
      }else{
        wx.request({
          url: 'http://127.0.0.1:5000/login_SimNow',
          data: {input_name:this.data.input_name, input_password:this.data.input_password },
          method:'POST',
          success:function(res){
            console.log(res);
            if (res.data.info=='登陆成功'){
              wx.setStorage({
                key: 'user',
                data: {'user':res.data.input_name }
              })
              wx.showToast({
                title: '登陆成功', // 标题
                icon: 'success',  // 图标类型，默认success
                duration: 1000  // 提示窗停留时间，默认1500ms
              })
              wx.navigateTo({
                url: '/pages/start_make_strategy/start_make_strategy'
              })
            }
            else{
              wx.showToast({
                title: res.data.info,
                icon: 'none',
                duration: 1500
              })
            }
          }
        })
      }
    }
  },

  bindKeyInput_name: function (e) {
    this.setData({
      input_name:e.detail.value,
    })
  },

  bindKeyInput_password: function (e) {
    this.setData({
      input_password:e.detail.value,
    })
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    // 查看是否授权
    that.setData({
      isHide: true
  });
    wx.getSetting({
        success: function(res) {
            if (res.authSetting['scope.userInfo']) {
                wx.getUserInfo({
                    success: function(res) {
                        // 用户已经授权过,不需要显示授权页面,所以不需要改变 isHide 的值
                        // 根据自己的需求有其他操作再补充
                        // 我这里实现的是在用户授权成功后，调用微信的 wx.login 接口，从而获取code
                        wx.login({
                            success: res => {
                                // 获取到用户的 code 之后：res.code
                                console.log("用户的code:" + res.code);
                                // 可以传给后台，再经过解析获取用户的 openid
                                // 或者可以直接使用微信的提供的接口直接获取 openid ，方法如下：
                                var obj = {};
                                wx.request({
                                  url: 'https://api.weixin.qq.com/sns/jscode2session?appid=' + 'wx52807fdd9335868e' + '&secret=' + '7cb96977e965d9059124d396239a6dc2' + '&js_code=' + res.code + '&grant_type=authorization_code',
                                  data: {},
                                  method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT  
                                  // header: {}, // 设置请求的 header  
                                  success: function (res) {
                                    that.setData({
                                      uid:res.data.openid,
                                    })
                                    obj.openid = res.data.openid;
                                    obj.session_key = Date.now() + res.data.session_key;
                                    console.log(that.data.uid);
                                    ////////////////////////////////////////////////
                                    wx.request({
                                      url: 'http://127.0.0.1:5000/login',
                                      data: {'uid':  res.data.openid},
                                      method:'POST',
                                      success: res => {
                                          console.log("用户的openid:" + res.data.openid);
                                          if (res.data.authority=='1'){
                                           wx.navigateTo({
                                             url: '/pages/administer/start/start'
                                           })
                                          }
                                      }
                                  });
                                  }
                                });
                               
                            }
                        });
                    }
                });
            } else {
                // 用户没有授权
                // 改变 isHide 的值，显示授权页面
                that.setData({
                    isHide: true
                });
            }
        }
    });
  },

  bindGetUserInfo: function(e){
    var that = this;
    //此处授权得到userInfo
    console.log(e.detail.userInfo);
    //接下来写业务代码
    
    //最后，记得返回刚才的页面
    that.setData({
      isHide: false
  });
    },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})