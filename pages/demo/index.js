const { listData } = require('../mockData');

// pages/demo/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    winHeight: 0,
    list: [],
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    wx.getSystemInfo({
      success: (result) => {
        this.setData({
          winHeight: result.windowHeight,
        })
      },
    });

    this.setData({
      list: listData
    });
  },

  handleScrollLower() {
    const newList = [...this.data.list, ...listData];
    this.setData({
      list: newList
    })
  }
})