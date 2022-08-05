
## LONG-LIST-VIEW

小程序长列表 `list-view` 组件

## 属性说明

- list 数据源信息

- generic:item 抽象节点 item

- generic:skeleton 抽象节点 占位 skeleton

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
