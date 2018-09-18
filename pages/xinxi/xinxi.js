// pages/xinxi/xinxi.js
Page({
  
  /**
   * 页面的初始数据
   */
  data: {
    address:"点击选择地址"
  },
  obj:{
    type:"sell"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  sellocation(){
     wx.chooseLocation({
       success:(res)=> {
         this.setData({
           address:res.address
         })
         Object.assign(this.obj, {
           address: res.address,
           longitude: res.longitude,
           latitude: res.latitude
         })
         console.log(this.obj)
       }
     })
     
  },
  radioChange(e){
   this.obj.type=e.detail.value
   console.log(this.obj)
  },
  inputdesc(e){
    this.obj.desc=e.detail.value
  },
  inputcontact(e){
    this.obj.contact=e.detail.value
  },
  save(){
    if(!this.obj.desc){
      wx.showToast({
        title: '请完善信息',
        icon: 'loading',
        duration: 2000,
        mask: true
      })
      return;
    }
    wx.request({
      url: 'http://localhost:3000/list',
      data: this.obj,
      header: { 'content-type': 'application/json' },
      method: 'POST',
      success: (res) => {
        this.setData({
            suc:true
        })
      }
    })
    
  },
  go(){
    wx.navigateBack({
      delta:1,
    })
  }
  

})