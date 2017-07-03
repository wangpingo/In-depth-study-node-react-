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
什么是设计模式？
设计模式是一套代码的设计经验的总结，项目中合理的运用设计模式可以解决很多问题，
设计模式之六大原则
开闭原则
1. 开闭原则(热插拔效果)
2. 里氏代换原则(衍生类替换掉了基类)
3. 依赖倒转原则(针对接口编程)
4. 接口隔离原则(比如登陆和注册)
5. 迪米特法则(最少知道原则)
6. 单一职责原则(一个类只负责一个原则)

总的来说为了实现高内聚低耦合
1. 内聚是从功能角度来衡量模块内的联系，一个好的内聚模块应当恰好做一件事情。描述的是模块内功能功能的联系
2. 耦合是软件结构中各模块之间相互连接的一种度量，耦合的强弱取决于模块间接口的复杂程度，进入或访问一个模块的点以及通过接口的数据

## 常见的模式
1. 工厂模式
```
    function CreatePerson(name,age,sex){
        var obj = new Object();
        obj.name = name;
        obj.age = age;
        obj.sex = sex;
        obj.sayName = function() {
            return this.name;
        }
        return obj;
    }
    var p1=new CreatePerson("拉拉","18","男")

```
工厂模式为了解决对个类似对象的声明问题，不能解决对象识别的问题
2. 代理模式
   ps一下： es6 貌似也有个proxy 让我们回忆一下，打开阮老师写的es6我们就会发现一段这样的代码：
   ```
        var obj = new Proxy({}, {
                get: function(target,key,receiver){
                    console.log(`getting ${key}`);
                    return Reflect.get(target, key ,receiver);
                },
                set: function (target,key,value,receiver) {
                    console.log(`setting ${key}!`);
                    return Reflect.set(target,key,value,receiver);
                }

            })
   ```

在整个ES6标准中，只要有可能，任何语法和相关的函数都是基于14种内部方法构建的。
大致我知道的有
obj[get] obj[set] obj[hasproperty] obj[enermerate] obj[getPrototypeOf] 
functionObj[call] 调用一个函数  constructObj调用一个构造函数
#### 代理Proxy
ES6 规范定义了一个全新的全局构造函数:代理(Proxy).他可以接受两个参数：目标对象(target)与句柄对象(handle)。请看一个简单实例:
```
    var target = {},handle = {};
    
    var proxy = new Proxy(target,handle);
    
```
什么是Reflect
1. Reflect对象与Proxy对象一样，也是 ES6 为了操作对象而提供的新 API。Reflect对象的设计目的有这样几个。
2. 将Object对象的一些明显属于语言内部的方法（比如Object.defineProperty），放到Reflect对象上。
3. 修改某些Object方法的返回结果，让其变得更合理。比如，Object.defineProperty(obj, name, desc)在无法定义属性时，会抛出一个错误，而Reflect.defineProperty(obj, name, desc)则会返回false。
4. 让Object操作都变成函数行为。某些Object操作是命令式，比如name in obj和delete obj[name]，而Reflect.has(obj, name)和Reflect.deleteProperty(obj, name)让它们变成了函数行为。
5. 让Object操作都变成函数行为。某些Object操作是命令式，比如name in obj和delete obj[name]，而Reflect.has(obj, name)和Reflect.deleteProperty(obj, name)让它们变成了函数行为。
6. Reflect对象的方法与Proxy对象的方法一一对应，只要是Proxy对象的方法，就能在Reflect对象上找到对应的方法。这就让Proxy对象可以方便地调用对应的Reflect方法，完成默认行为，作为修改行为的基础。也就是说，不管Proxy怎么修改默认行为，你总可以在Reflect上获取默认行为。
7. Reflect.get方法查找并返回target对象的name属性，如果没有该属性，则返回undefined。
8. Reflect.set方法设置target对象的name属性等于value。如果name属性设置了赋值函数，则赋值函数的this绑定receiver。






























