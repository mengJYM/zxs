//index.js
//获取应用实例
const app = getApp()

Page({
  data:{
    markers:[],
    controls: [{
      id: 1,
      iconPath: '/resources/pin.png',
      position: {
        left: (app.globalData.windowWidth-30)/2,
        top: (app.globalData.windowHeight-30)/2-35,
        width: 30,
        height: 30
      },
      clickable:false
    },
      {
        id: 1,
        iconPath: '/resources/center.png',
        position: {
          left:30,
          top:500,
          width: 30,
          height: 30
        },
        clickable: true
      }
    ]
  },
  controltap(){
    this.mapCtx.moveToLocation()
  },
  onShow(){
    wx.getLocation({
      type: '',
      altitude: true,
      success: (res)=> {
        this.setData({
          longitude:res.longitude,
          latitude:res.latitude
        })
      }
    })
    wx.request({
      url: 'http://localhost:3000/list',
      header: { 'content-type': 'application/json' },
      method: 'GET',
      success: (res) => {
        let markers = res.data.map((item) => {
          return {
            iconPath: "/resources/" + item.type + ".png",
            id: item.id,
            latitude: item.latitude,
            longitude: item.longitude,
            width: 30,
            height: 30
          }
        })


        this.setData({
          markers: markers
        })
      }
      
    })
   
  },
  onReady: function (e) {
    // 使用 wx.createMapContext 获取 map 上下文
    this.mapCtx = wx.createMapContext('map')
  },
  onShareAppMessage: function (res) {

    return {
      title: '交易平台',
      path: '/pages/index/index'
    }
  },
  go(){
    wx.navigateTo({
      url: '/pages/xinxi/xinxi',
    })
  },
  search(){
    wx.navigateTo({
      url: '/pages/sousuo/sousuo',
    })
  },
  markertap(e){
    wx.navigateTo({
      url: '/pages/detail/detail?id='+e.markerId    
    })
  }
})
