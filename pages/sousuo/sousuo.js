// pages/sousuo/sousuo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
   obj:{
      inputvalue:''
   },
  input(e){
    this.obj.inputvalue=e.detail.value
  },
  soso(){
    wx.request({
      url: 'http://localhost:3000/list',
      data: {
        q:this.obj.inputvalue
      },
      header:{'content-type':'application/json'},
      method: 'GET',
      success: (res)=> {
        this.setData({
          list:res.data
        })
      },
     
    })
  },
  go(e) {
    wx.navigateTo({
      url: '/pages/detail/detail?id=' + e.currentTarget.id
    })
  }
})