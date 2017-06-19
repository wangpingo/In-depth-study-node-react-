## React 简述
React是一个专注于View层的解决方案的框架。和angular和vue有所不同，不是单纯的mvvm框架,React不是单纯的模版引擎，它的核心思想就是‘组件化’，将ui层拆分为一个个组件，然后组合嵌套，最后构建完成app 
## React特点
    1. 模版单项数据绑定:数据->UI
    2. 使用jsx语法创建DOM树，利用虚拟Dom树创建/更新Dom
    3. 提供api数量很少，使用者需要非常熟悉原生javascript才能更快上手开发
    4. 采用函数式编程(函数类似与一个管道，进入一个值导出另一个值
## jsx 语法
jsx基本语法
1. 定义标签时，最外层只能有一个标签，即root标签只允许定义一个。
2. 标签是闭合的
3. 标签首字母大小写情况，首字母大写组件元素，首字母小写dom元素
注意两个关键字className和htmlFor 两个属性
ps:遇见｛｝把代码当作javascript解释，遇见<>标签把代码当作html标签解释
## 重要属性
   1. ... 符es6中的对象展开符号
   2. dangerouslySetInnerHTML 属性  防止xss攻击
   3. ref属性 通过ref可以得到dom/组件的实例

## 构建组件
构建组件有两种方式，原生javascript和jsx语法。react推荐用jsx
1. 使用原生javascript创建组件
```
    ReactElement createElement(
        type            ---- 标签名
        [props]         ---- 属性
        [children...]   -----子节点
        )
```
2. 使用jsx语法创建组件,能让复杂的树型更易于阅读
```
    //有两种创建方式，ReactClass和function    

```

## React 组件的生命周期
生命周期函数
   1. getDefaultProps ---> set props 
   2. getInitialState ----> set state default value
   3. componentWillMount----> use in the assembly (before injection into DOM) called 
   4. render----> use in the assembly  rending
   5. componentDidMount--->it is used ,after the assembly is injection into DOM 
   6. componentWillReceiveProps ---> it is used after the assembly receive new props
   7. shouldComponentWillUpdate --->specifies whether to update props and state
   8. componentWillUpdate---> it is used before the component renders 
   9. componentDidUpdate-->it is called after the the components renders
   10. componentWillUnMount-->uninstall components called
   用 React.createClass调用的是getDefaultProps和getInitialState
   es6 创建components 初始化state是在constructor里面完成
   state  更新后会调用shouldComponentWillUpdate componentWillUpdate render componentDidUpdate 。

## Props 和state
props和state都用于描述组件特性，但是两者有本质区别。前者是父组件定义的变量，后者是组件自身持有的变量。

1. props是properties的缩写，顾名思义，就是属性变量。props用于父子组件之间传递消息，这种传递是单向的
2. state是组件维护自身的状态，state改变组件重新渲染，说明React数据和模板是单向数据绑定，数据驱动模版更新，更新state需要组件接口 setState
3. 与交互无关的一般在props中，对于用户输入，服务器请求，或者其他交互响应都放在state中

## reactDom
为了让react在更多环境下更快，更容易构建。于是把react分为react和react-dom两个部分。这样为web版的react和移动端的react native共享组件铺平了道路。也就是我们所说的可跨平台共享组件。
## props.children
   props.children可以访问到组建的子组件，如果只有一个组件返回该子组件对象；如果有多个子组件，则返回包含所有子组件的对象
   React.Children.map遍历子组件并给子组件添加同意的属性值.

## ES5和ES6继承(因为react用的是es6继承)
   1. Es5的继承是先创建子类的this，然后再把父类的方法添加到上面 
   2. Es6的继承是先创建父类的this，再用子类的构造函数去修改this

## Es6的继承的实现方式
   JS中的类是js现有的，基于原型继承的一种简单的语法糖的包装。
   constructor 方法是一个特殊的方法，既不是静态方法也不是实例方法，仅在实例化被调用。
   没有constructor方法子类就没有自己的this对象。construct是被默认添加的。
## new一个对象发生了什么
1. 创建一个新的对象，并且this变量引用该对象，同时还继承了该对象的原型
2. 属性和方法都被加入到this所引用的对象当中
3. 新创建的对象由this所引用，并且最后隐士的返回this   

## fuck! 又引出两个问题js的继承方式,程序的设计模式。。。
















