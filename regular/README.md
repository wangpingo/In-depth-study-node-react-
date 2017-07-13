
# regular 使用心得

3月13号加入网易，期间用regular参与两个项目。
首先你想如果快速上手这里有个github地址，还有写的入门级的项目，猎头用户端项目
---
[这里附上regular官网介绍](http://regularjs.github.io/reference/?api-zh#api-reference-静态接口-componentextend)

本文分为五个部分来讲
1. 静态接口
2. 实例接口
3. 指令
4. Regular.dom
5. 模板语法

## 静态接口

 Component.extend
 用来创建一个继承与Component的子组件，参数options中的所有属性都会成为子组件的原型属性

```
var Detail = Component.extend({
    template:template,
    config() {

    },

    init() {
    
    }
})
```
一般这样来定义一个子组件

Component.implement 这个方法用来扩展Component自身原型的方法

Component.extend和Component.imponent  都可以通过this.supr()来调用父类同名的方法

new Component 实例化一个属性，覆盖extend与implement的定义，无法调用 this.supr();

options* 

regular 的配置项是个对象；
1. template 
   
    传入regular的模板字符串，你需要遵循模版语法，后面我们会概述。避免我们频繁的拼接字符串
2.  config(data)

    会在模版编译之前调用,config一般用来初始化参数，它接受一个Object类型的参数data，就是你初始化时传入的data参数

3. init 

   会在编译之后的dom产生时调用，可以处理一些与DOM相关的逻辑
   
4. destory 

   如果你需要自定义回收策略，你可以重写destory方法（但是我们在实际项目中是不需要的）
   
5. name 

  注册组件到父组件的命名空间，使其可以内嵌使用
  
  
```
  var component1 = Component.extend({
  
      name:'foo'
  })
  
  var component2 = Component.extend({
      template:"<foo></foo>";
  })
  
  // 或者通过这种方式
  
  component2.component('foo',Component)
```
6. events


   在组件初始化前声明你需要绑定的事件，_这个在需要绑定一些内置事件格外有用，因为你无需重新重写init等方法

7. data

   这个data最终会被merge到实例化传入的data中，你可以将其视为 缺省data.　不过仍然建议尽量在config中处理data字段的缺省值.
   
component.directive

设定自定义的指令，类似于angularjs中的指令，Regularjs通过指令增加一些节点的功能，但是regular官网说自己已经拥有很强大的描述能力，所以指令在这里被弱化

指令的用法是

```
.directive({
    // if expression evaluated to true then addClass z-crt.
    // otherwise, remove it
    // <li z-crt={this.$state.current.name==='app.test.exam.choice'}>
    'z-crt': function(elem, value){
        this.$watch(value, function(val){
            dom[val? 'addClass': 'delClass'](elem, 'z-crt');
        })
    },
```
Component.filter

regularjs支持过滤器，也支持过滤器的链式调用，也支持双向数据流的过滤


```
filter.total = function(array, key) {
    var total = 0;
    if(!array) return;
    array.forEach(function( item ){
        total += key? item[key] : item;
    });
    return total;
};
```

component.event

设置自定义的dom事件

```
.event('enter',function(elem,fire){
    function update(ev){
        if(ev.which==13){
            ev.preventDefault();
            fire(ev);
        }        
    }
    dom.on(elem,'keypress',update);
    return function destory(){
        dom.off(elem,"keypress",update);
    }
})
```

Component.animation

自定义一个动画command. animation接口完全是为r-animation指令服务的.

Component.component(name,factory);

注册一个组件

Component.use

    Component.use(factory)
    

```
function FooPlugin(Componenet){
  Component.implement()// implement method
    .filter()          // define filter
    .directive()       // define directive
    .event()           // define custom event
}

var YourComponent = Regular.extend();

FooPlugin(YourComponent);   // lazy bind
FooPlugin(Regular);         // lazy bind to globals

YourComponent.use(FooPlugin);

// global
Regular.use(FooPlugin);

```
Regular.config

配置一些全局属性, 目前主要可以用来配置模板的自定义开关符号

Regular.parse

基本上不会使用

## 实例接口

component.$..

component代表组件，$符号代表共有的方法

1. component.$inject

component.$inject(element[,direction])


```
component.$inject(div)

component.$inject(div,'bottom');
```

2. component.$watch  (比较重要)
   
   注册一个监听回调，一旦绑定的表达式进行改变，它将会被调用


```
        component.$watch(expression,callback)

        this.$watch(value, function(val){
            dom[val? 'addClass': 'delClass'](elem, 'z-crt');
        })
```

这个方法会返回一个id唯一标识

3. component.$unwatch
   
   利用watchid解绑一个数据监听,一般来讲很少用到它, 所有的数据绑定会被自动收回


4. component.$update()

  ps补充一下脏检查
  
  
    脏检查即一种不关心你如何以及何时改变的数据， 只关心在特定的检查阶段数据是否改变的数据监听技术.
    
当不是由于regular本身执行的数据操作，想要把data同步到view层，需要手动的调用 this.$update


```
//在组建内
 this.$update();
```

component.$get


```
component.data.username = "leeluolee";
component.data.job = "developer";

component.$get('username+":"+job');

```

component.$refs

在模版中，你可以使用ref属性来标记一个节点和组件。在实例化之后，你可以通过components.$ref来获取标记你的节点


```
component = new Regular({
    template : "<input ref=input> <page ref=page>",
    init:function(){
        this.$refs.input
        this.$refs.pager
    }
    
})
```
component.$on


```
component.$on(event,fn)

//或者传入一个对象

compoent.$on({
    noyify:fn1,
    lala:fn2
})
```

component.$off

取消一个事件监听

1. 如果同时传入event和fn，移除event类型下面的fn函数
2. 只传入event，移除所有的event对应的监听器
3. 什么都不传，移除所有

component.$emit()
触发指定事件

接受两个参数，第一个参数是事件名字，剩余的参数都会作为参数传入到监听器;

component.$mute

你可以使用$mute(true)让组件失效，使其不参与到脏检查中后续使用$mute(fasle) 来重新激活一个被失效的组件，激活同时，会自动进行一次数据与ui同步

component.$bind() 

创建组件之间双向数据绑定  不推荐使用

## 指令
on-[eventName]

通过on-**在模板中绑定元素事件或组建事件

r-model

对表单或者输入框的一些元素进行双向数据绑定

r-style 

实现样式绑定

r-class

```
//一般三元表达式
r-class={{'g-mnc-1':this.$state.current.name=='app.home.index'}} ref=view>
```

r-hide
控制元素显示和隐藏

```
// demo

<div r-hide = {hide}></div>
```


## regular-dom

由于内部实现的需要，Regular实现部分常用的跨浏览器的dom方法，如果只是简单的dom处理，直接使用regular.dom

regular.dom.inject(element,refer,direction)



param | Type | Detail
---|---|---
element | node | 要被插入的节点
refer | node | 参考节点
direction | String | 组件的位置插入目标的位置

Regular.dom.on(element, event, handle)

绑定节点事件

Regular.dom.off(node, event, handle)
移除一个事件监听

regular.Dom.off(node,event,handle)

移除一个事件监听

Regular.dom.addClass(element,className);

添加节点classname 

regular.dom.delClass()
移除节点的某段className

regular.dom.hasClass()

判断是否拥有某个className属性

regular.dom.text()

设置节点的文本

regular.dom.html()

设置和获取节点的innerHtml值

Regular.dom.attr(element, name [ , value])

设置和获取节点的innerHTML值



regular r-model 绑定时 数据类型数字型会自动转成是字符串