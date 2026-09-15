Page({
  data: { plant: "", leaf: "", soil: "", done: false },
  pick(e) {
    const key = e.currentTarget.dataset.key;
    wx.chooseImage({
      count: 1,
      success: (res) => this.setData({ [key]: res.tempFilePaths[0] }),
    });
  },
  send() {
    this.setData({ done: true });
  },
});
