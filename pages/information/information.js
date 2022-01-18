// pages/information/information.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isInput:false,
    age:'0',
    gender:'男',
    profession:'学生',
    marrige: '未婚'
  },

  AgeInput: function (e) {
    //print(this.data.age);
    this.setData({
      age: e.detail.value
    })
  },

  GenderInput: function (e) {
    //print(this.data.age);
    this.setData({
      gender: e.detail.value
    })
  },

  ProfessionInput: function(e) {
    this.setData({
      profession: e.detail.value
    })
  },

  edit:function(){
    this.setData({
      isInput: true
    })
  },

  save:function(){
    if( this.data.age==''){
      this.data.age='0'
    }
    if( this.data.age==''){
      this.data.gender='男'
    }
    if( this.data.profession==''){
      this.data.profession='学生'
    }
    this.setData({
      isInput: false
    })
    //post信息至后台
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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