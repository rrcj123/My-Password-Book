// miniprogram/pages/password/update/update.js
const app = getApp();
const sign = require("../../../utils/sign.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name:'',
    nicename:'',
    password:'',
    remarks:'',
    passwordnum:null,
  },
  //提交
  up() {
    var that = this;
    if (!that.data.name || !that.data.nicename || !that.data.password) {
      wx.showToast({
        title: '不允许为空',
        image: '../images/err.png',
        duration: 1000
      })
    } else {
      let password = { name: that.data.name, nicename: that.data.nicename, password: that.data.password, remarks: that.data.remarks == '' ? '无' : that.data.remarks }
      app.globalData.password.splice(that.data.passwordnum, 1, password);
      wx.setStorage({
        key: "password",
        data: app.globalData.password
      })
      if (that.data.userAutomaticCloud) {
        wx.getStorage({
          key: 'passwordCloud',
          success(res) {
            app.uploadCloud(sign.encrypt(JSON.stringify(app.globalData.password), res.data)).then(res => {

            })
          },
          fail(res) {
            app.globalData.password = [];
          }
        })
      }
      wx.showModal({
        title: '提示',
        content: '更新成功~',
        showCancel:false,
        success(res) {
          if (res.confirm) {
            wx.navigateBack({
              delta: 1
            })
          } 
        }
      })
    }
  },

  //名称
  name(e) {
    this.setData({
      name: e.detail.value
    })
  },
  //账号
  nicename(e) {
    this.setData({
      nicename: e.detail.value
    })
  },
  //密码
  password(e) {
    this.setData({
      password: e.detail.value
    })
  },
  //备注
  remarks(e) {
    this.setData({
      remarks: e.detail.value
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    let data = JSON.parse(options.data);
    this.setData({
      name: data.name,
      nicename: data.nicename,
      password: data.password,
      remarks: data.remarks,
      passwordnum: options.passwordnum
    })
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
    this.setData({
      bgColor: app.globalData.userSet.bgColor,
      userAutomaticCloud: app.globalData.userSet.userAutomaticCloud
    })
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
  // onShareAppMessage: function () {

  // }
})