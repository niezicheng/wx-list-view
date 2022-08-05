
## LIST-VIEW

小程序长列表 `list-view` 组件实现

## 属性说明

- **list**: 数据源信息

- **generic:item**: 抽象节点 `item`

- **generic:skeleton**: 抽象节点 占位 `skeleton`

### 抽象节点

[自定义组件-抽象节点](https://developers.weixin.qq.com/miniprogram/dev/framework/custom-component/generics.html)

### 插槽

```wxml
 <!-- 列表前自定义插槽 -->
<slot name="before"></slot>
  <!-- 列表后自定义插槽 -->
<slot name="after"></slot>
```

## 示例

详情见项目 `demo` 内容

```wxml
<scroll-view
  scroll-y="{{ true }}"
  bindscrolltolower="handleScrollLower"
  style="height: {{winHeight}}px;"
  lower-threshold="200"
>
  <list-view
    list="{{list}}"
    generic:item="item"
    generic:skeleton="skeleton"
  />
</scroll-view>
```

## 其他

微信官方 [recycle-view](https://developers.weixin.qq.com/miniprogram/dev/platform-capabilities/extended/component-plus/recycle-view.html)

ReactNative 官方 [FlatList](https://reactnative.dev/docs/flatlist)

Taro 官方 [VirtualList](https://docs.taro.zone/docs/guide#%E6%80%A7%E8%83%BD%E4%BC%98%E5%8C%96)

[小程序长列表优化实践](https://mp.weixin.qq.com/s/zgpK6L0Tf81KIhf-4k-gnA)
