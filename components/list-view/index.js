// components/list-view/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    list: {
      type: Array,
      value: [],
      // 监听 list 值的变化
      observer(newVal, oldVal) {
        if (newVal.length) {
          const cloneVal = newVal.slice();
          // 获取相比于 oldVal 增量值
          cloneVal.splice(0, oldVal.length);

          // 创建渲染任务
          const task = setTimeout(() => {
            this.setList(cloneVal);
          }, 0)
          // 将渲染任务放入待渲染队列中
          this.renderPendingQueue.push(task);
          // 执行渲染任务
          this.startRenderTask();
        }
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    // 待渲染的视图列表
    viewList: [],
    // 窗口高度
    winHeight: 0,
    // 分组索引
    groupIndex: 0,
  },

  /**
   * 组件生命周期
   */
  lifetimes: {
    ready() {
      wx.getSystemInfo({
        success: (result) => {
          this.setData({
            winHeight: result.windowHeight,
          })
        },
      })
      // 保存所有数据
      this.wholeList = [];
      // 记录分组高度
      this.groupHeight = [];
      // 待渲染队列
      this.renderPendingQueue = [];
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    /**
     * 监听页面变化
     * @param {*} index
     */
    observerPage(index) {
      wx.createIntersectionObserver(this)
        .relativeToViewport({
          // 规定有效区域为两个屏幕
          top: 2 * this.data.winHeight,
          bottom: 2 * this.data.winHeight,
        })
        .observe(`#wrp_${index}`, (res) => {
          const newList = this.data.viewList;
          const nowWholeList = this.wholeList[index];
          if (res.intersectionRatio <= 0) {
            console.log('当前分组：',index,'虚拟节点占位')
            // 如果不在有效的视图范围内，那么不需要渲染真实的数据，只需要计算高度，进行占位就可以了
            const listViewHeight = [];
            const listViewItemHeight = this.groupHeight[index] / nowWholeList.length;

            for (let i = 0; i < nowWholeList.length; i++) {
              listViewHeight.push({ listViewItemHeight });
            }
            newList[index] = listViewHeight;
          } else {
            console.log('当前分组：',index,'显示')
            // 如果在有效的区域内，那么直接渲染真实的数据就可以了
            newList[index] = this.wholeList[index];
          }

          this.setData({
            viewList: newList,
          }, () => {
            this.isRenderTask = false;
            // 渲染下一个更新任务
            this.startRenderTask()
          });
        });
    },

    /**
     * 设置渲染视图高度
     * @param {*} index
     */
    setHeight(index) {
      const query = wx.createSelectorQuery().in(this);
      query && query
        .select(`#wrp_${index}`)
        .boundingClientRect((res) => {
          // 记录分组高度
          this.groupHeight[index] = res && res.height;
        })
        .exec();
        // 监听分组变化
        this.observerPage(index);
    },

    /**
     * 设置增量数据信息
     * @param {*} val
     */
    setList(val) {
      const { groupIndex, viewList } = this.data;
      const newList = viewList;
      this.wholeList[groupIndex] = val;
      newList[groupIndex] = val;
      this.data.groupIndex++;
      // 更新数据渲染最新加入的数据
      this.setData({
        viewList: newList,
      }, () => {
        // 记录渲染后视图高度
        this.setHeight(groupIndex);
      });
    },

    startRenderTask() {
      // 渲染队列为空或正在渲染某个任务 task
      if (this.renderPendingQueue.length === 0 || this.isRendering) return;
      // 取出渲染任务
      const current = this.renderPendingQueue.shift();
      // 将状态置为渲染中
      this.isRendering = true;
      // 执行渲染任务函数
      if (typeof current === 'function') current();
    }
  }
})
