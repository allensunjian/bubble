
var handleBubble = (function (opt) {
  var tar = '.handlebubble';
  var sizeMap = {
    wh: $(window).height(),
  };
  var handleEventCenter = { //事件中心，核心函数所用到的函数都被拆分到这里
    selectClassBubbble: function (cls) {
      var s = document.querySelectorAll(cls);
      return s
    }, //返回对应class下的,jq对象 或者对象集合
    getTarInfo: function (tar) {
      var text = tar.dataset.text;
      return text;
    },  //返回目标内的text内容。不用JQ是因为，JQ默认是读缓存
    mountEvent: function (tar, opt) {
      var eventArr = opt.event;
      this.betterForEach(eventArr, item => {
        tar[item.type] = function () {
          if (!item.name && !item.callback) {
            throw new Error("mounteEvent methods must include callback prop at 2 args [,option] if have no name");
          }
          item.callback ? item.callback(this) : "";
          opt[item.name]?opt[item.name](this):"";
        }
      })
    }, //事件挂载，绑定事件，并返回相应的回调
    createElems: function (el, cls,text) {
      var d = document.createElement(el);
        cls ?d.classList.add(cls) : "";
        text ? d.innerHTML = text : "";
      return d
    }, //创建DOM对象，并可以添加自定义属性
    creatPanel: function (text) {
      var panel = this.createElems('div','bubbleStyl'),
        arrow = this.createElems('div','bubble-arrow'),
          content = this.createElems('div', 'bubble-content',text);
      panel.appendChild(arrow);
      panel.appendChild(content);
     return panel;
    }, //创建panel集合
    getClientBottom: function (tar) {
      var t = $(tar),
        h = t.height();
      xh = this.wh - (h + t.offset().top - handleEventCenter.getScrollTop()); //距离底部可视区域距离
      return xh;
    }.bind(sizeMap), //元素距离可视区域的距离
    computedPos: function (_this, t, l) {
      var clientHB = this.getClientBottom(_this);
      var panel = this.getPanel();
      var h = panel.height();
      if (clientHB > panel[0].offsetHeight + 13) {
        panel.css({
          top: _this.offsetHeight + t + 7 + 'px',
          left: l + 'px',
        })
        $('.bubble-arrow').css({
          top: '-13px',
          transform: 'rotate(90deg)'
        })
      } else {
        panel.css({
          top: t - 21 - h+ 'px',
          left: l + 'px',
        })
        $('.bubble-arrow').css({
          top: h+5+'px',
          transform: 'rotate(270deg)'
        })
      }
     
    }, //计算方法，计算当前 panel应在屏幕的具体位置
    getSize: function (_this,str) {
      var offset = _this[str];
      if (_this.offsetParent !== null) offset += this.getSize(_this.offsetParent,str);
      return offset
    }, //取得元素距离页面顶部的真实距离_this为元素，str 是offset类的尺寸属性
    getPanel: function () {
      return $('.bubbleStyl')
    }, //返回panel对象
    clearPanel: function () {
      this.getPanel().remove();
    }, //清除panel对象
    destroied: function (tar) {
      tar.onmouseover = null;
      tar.onmouseleave = null;
    }, //注销 已经注册的方法
    getScrollTop: function () {
      return $(document).scrollTop()
    }, //实时获取滚动条距离可是区域的距离
    betterForEach: function (collection, retCallback) {
      var str = Object.prototype.toString.call(collection),
        typeList = [
          {
            type: 'NodeList',
            methods: function (NodeList) {
              return function (cb) {
                Array.prototype.forEach.call(NodeList, cb)
              }
            }
          },
          {
            type: 'Array',
            methods: function (Array) {
              return function (cb) {
                Array.forEach(cb)
              }
            }
          }
        ];
      typeList.forEach(o => {
        if (typeList.map(o => o.type).indexOf(o.type)  == -1) {
            throw new Error('methods no include type ['+o.type+']')
        } 
        o.methods(collection)(retCallback);
      })
    } //可以支持类数组对象和数组遍历的betterForEach
  } 
  function initBubble(el) {
    setTimeout(_ => {
      resetPos.apply(handleEventCenter);
      el ? tar = el : "";
      var arr = handleEventCenter.selectClassBubbble(tar);
      handleEventCenter.betterForEach(arr, function (t) {
        this.getTarInfo(t)
        this.mountEvent(t, {
          event: [
            {
              name: 'show',
              type: 'onmouseover',
              callback: () => { }
            },
            {
              name: 'hide',
              type: 'onmouseleave',
              callback: () => { }
            }
          ],
          show: function (_this) {
            var text = this.getTarInfo(_this);
            if (!text) {
              return
            }
            let l = this.getSize(_this, 'offsetLeft');
            let t = this.getSize(_this, 'offsetTop');
            if (this.getPanel().length == 0) {
              var ele = this.creatPanel(text);
              document.getElementsByTagName('body')[0].appendChild(ele);
              this.computedPos(_this, t, l)
            } else {
              $(".bubble-content").html(text)
              this.getPanel().show();
              this.computedPos(_this, t, l)
            }
          }.bind(handleEventCenter),
          hide: function (_this) {
            this.getPanel().hide();
          }.bind(handleEventCenter)
        })
      }.bind(handleEventCenter));
    }, handleEventCenter.getPanel().length > 0 ? 50 : 300)
  }
  function checkInit() {
    return handleEventCenter.getPanel().length > 0;
  }
  function restBubble() {
    var arr = handleEventCenter.selectClassBubbble(tar);
    handleEventCenter.betterForEach(arr, function (t) {
      handleEventCenter.destroied(t);
    })
  }
  function resetPos() {
    this.getPanel().css({
      top: '50%',
      left: '50%'
    })
  }
  function hideBubble() {
    handleEventCenter.getPanel().hide();
  }
  return {
    initBubble,
    checkInit, 
    restBubble,
    resetPos,
    hideBubble,
    tools: handleEventCenter,
  }
})()