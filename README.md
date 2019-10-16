### handleBubble 插件

    
- 特点：简单易用，接口丰富。效果Q弹爽滑，自动识上下边界，插件元素始终会保持在视图区域。
- 依赖: jquery,样式直接引用在ui.css（模板页已经全局引用）
- 对象名： handleBubble
- 技术支持: allen.sun

#### 简单实例
html
```html
<div class="handlebubble" data-text="Q弹爽滑的泡泡"></div>
```

js
```javascript
  handleBubble.initBubble(); //即可自动渲染一个泡泡
```
效果
![](https://github.com/allensunjian/bubble/blob/master/imgLib/2019-10-16_153214.png)
#### 高级用法
handleBubble.checkInit() //用于检查当前页面的泡泡是否已经初始化
handleBubble.restBubble(); //用于重制泡泡
handleBubble.resetPos(); //用于重置泡泡的位置，重置到屏幕可视区域的中间
handleBubble.hideBubble(); //手动隐藏泡泡
handleBubble.initBubble(); //初始化泡泡

##### 泡泡插件可自定义显示的格式像这样
![](https://github.com/allensunjian/bubble/blob/master/imgLib/j.png)
```html
<div class="handlebubble" data-text="来源:广告呼入</br>客户编号:45111客户名称：四川XXXX设计有限公司"></div>
```
#### &hearts;理论上支持插入模板样式可塑性比较强 &hearts;
![](https://github.com/allensunjian/bubble/blob/master/imgLib/a.png)
上面的例子中，我在气泡中直接插入了 模板代码
```html
<h1 class="handlebubble" data-text="<h1 style='color:red'>这是一个大标题</h1></br><div style='width:100px;height:100px;background:green'></div>">duang~一下就出来了 </h1>
```
##### 已知问题：
- 当泡泡设置过宽时，无法自适应左右的宽度，造成视图元素移除浏览器视口（暂时不支持，宽度过大）
- 当泡泡的目标脱离文档流时，可以正确计算出位置。但是 如果这时候页面发生滚动，则泡泡会停留在当前位置不动。当时设计时为了性能未做过多的DOM操作，所以泡泡所处的位置始终是全局的位置。无法准备跟随一个元素去做移动。


SHOWDOC无法上传动图，所以不能直观的感受到效果。有兴趣的伙伴可以自己去体验一下~
欢迎前端小伙伴，批评指正，共同进步。
![](https://github.com/allensunjian/bubble/blob/master/imgLib/timg2.jpg)
