# 一: Rx 之前的一些基础知识
   本文借鉴[简书](http://www.jianshu.com/u/d01a391b4a74)
   一个应用，当处理少量数据时，可以保证用户界面响应迅速，动画流畅；但是面对大量数据涌入的时候，还能保证以上要求这就叫可扩展性和可伸缩性。
## 同步和异步
   同步就是代码一条条按顺序想下执行，但是遇到耗时间的io操作，但是放在浏览器端同步就变得不现实，javascript是单线程的，面对耗时操作我们应该如何处理，很简单那就是回调

   回调函数处处看可见，比如事件的处理，http请求操作，文件io操作等等，当遇到耗时操作返回时，javascript runtime 会立即执行这个函数
## 时间和空间
   同步操作是一条一条向下执行的，在这个时间上的变量的值是唯一确定的，但是这个异步操作的完成事件未知，所以这个变量当时的值也是不确定的，要想当值确定下来再去执行异步操作，那只能回调嵌入回调，这样一层一层就会造成回调地狱
## 现在目前主流的解决方案就是promises
   ES6 解决回调问题引入了promise。promiase代表了异步程序，并在未来某个时刻完成
   但是promise有自身的缺陷
    1. 数据源产生多个的时候无法很好的处理.
    2. 没有失败重置机制
    3. 没有取消的机制
#  这个时候 Rxjs闪亮登场。

## Rx可以解决什么问题那 
   1.我们普遍使用的for，while对于异步程序是无法感知的，不会等待异步程序结束再 进行下一轮
   2. 错误处理是任何程序都需要解决的问题，本身加入try/catch就很困难的程序再加加入重试机制就显得不现实
   3. 商业逻辑内嵌在回调函数中,可读性差,维护起来复杂,耦合度过高
   4. 可以根据事件或耗时的无响应的时间进行取消操作
   5. 时间监听带来内存泄漏问题
## 所以Rxjs可以优雅的代替callback
   Rxjs就是利用javascript实现的响应式编程 何谓响应时编程,就可以简单的理解为是变量某一时刻   发生变化和这个变量有关的变量进行相应的变化

## Rxjs中的组件，在Rxjs中万物都是Stream
+ 生产者：在Rxjs中的生产者叫做Observables，Observables负责推送事件，但是不处理   事件
+ 消费者：在Rxjs中的消费者叫做Observer
    ```
        数据只会从生产者流向消费者
    ```
+ 管道：在生产者流向消费者这个过程就形成管道，管道上的一个一个函数叫做 observable operator，简称opearators
+ 时间: 异步处理的不稳定性就是时间问题，因为异步操作你本来就不知道它什么具体时间结束，但是Rxjs就是面向异步编程的解决方案，时间遍布每一个角落，可以让时间变得相对稳定
## 响应式编程与其他编程思想区别
   Rxjs编程以时间遍布所以永不记录状态，面向对象是面向那个状态的，而响应式编程是面向行为的，我们可以用面向对象构建模型，用响应式编程来构建行为和事件处理。

## Rxjs 与函数式编程
   Rxjs是响应式的编程，说到响应式编程总和函数式编程有关。他俩到底有什么关系？
   响应式编程继承自函数式编程
    Rxjs是结合观察者模式，迭代器模式和函数式编程的优点的产物
   问题又来了什么是观察者模式？
   观察者模式是软件设计模式的一种（有时又被称为发布-订阅模式），自身状态通过通过呼叫观察者自身的提供的方法来实现
   首先我们逐个攻破
   1. 函数式编程是一种开发软件的范式，强调用函数来创建应用程序，最大特点链式调用，声明式的，不可变的，没有副作用的叫做函数式编程的三大护法
   2. 迭代器模式 Rxjs的关键设计理念是遍历机制。用遍历机制通知生产者发送数据
   3. Rxjs 鼓励用数据驱动模式进行开发，把数据和处理数据分隔开来，这是Rxjs涉及的核心。用同样的方式处理不同的数据源
##  Observable
   我们知道Observe是个容器，里面包含着数据，数据从何而来？
   ## 静态数据 ##
   我们日常重度使用的`string和array`都属于此范畴
   ## 动态数据 ##
   动态生成的数据

   Observables 发送事件，Observer异步的接受事件，这让我们的应用在有大量时间产生的时候保持响应能力。强调一下，Rxjs不仅面向客户端也面向服务端

   ```
        Rx.observable.from(<数据源>)
            .operator(...)
            .operator(...)
            .operator(...)
            .subscrible(<处理最终结果数据>)
   ```
再次强调一下
1. observables是个不可变的数据类型
2. observables不仅仅代表了当前的数据，更代表了未来某个时刻的数据

## 何时何地用Rxjs ##
   时间没有万能药，也没有能解决一切的代码，Rxjs也一样，只能在适合他的时候使用
   我们把一个程序按照两个维度划分成一个田字表格，横向是单值，多值，纵向是同步异步。
## 单值，同步
```
    Rx.observable.of(2017)
```
一旦有消费者消费，此值马上被发送出去。这种情况下使用Rxjs显得有点重了，除非我们进行合并流的操作
## 多值，同步
```
    Rx.observable.from([1,2,3])
```
from() 函数可能是Rxjs最常用的之一了。同步意思是啥就是执行1，在执行2，在执行3
## 单值，异步
这个情况就是Promise。Rxjs提供的函数无缝接轨到Promise
```
    const one = new Promise((resolve,reject)=>{
        setTimeout(()=>{
            resolve(1);
            },3000)
        }) //模拟3秒延迟
    //这个时候promise已经在执行了
    Rx.observable.fromPromise(one)
    .map(value=>value+1)
    .subscribe(result => {
        console.log(result)
        })
    console.log('打印结束');
```
## 多值，异步
这个场景就是我们所说的事件驱动的异步编程，如何用Rxjs包装dom事件
```
    <span id="hello" href="...">hello</span>
    const canbeclicked=document.querySelector('#hello')
    const clickStream = Rx.Observable.fromEvent(canbeclicked,"click");
    clickStream
       .map(event => event.currentTarget.getAttribute('href'))
       .subscribe(....)
```

## Observer
我们知道Observer包装的数据既可以是同步也可以是异步，作为消费者来说的Observer来说，他还充当了回调的角色，这和使用推数据的形式相吻合，因为我们不知道DOM事件何时发生，AJAX事件何时返回。Observable使用Observe的next()函数来推送给Observe
当我们调用Observable的subscribe()函数时，一个Observer就被创建出来，一个Observer就被创建出来并暴露三个函数
```
    let observer = {
        next: function(){},
        error: function(){},
        complete: function(){}
    }
```
subscribe 里面的箭头函数对应的是next() 函数
## 下面我们介绍这三个函数

## next(value):void
   Observer 将收到的Observable发送的事件，这和观察者模式的update方法一样。如果我们传给subscribe的参数是一个函数而不是Observer对象的话，那么就对应next函数

## complete():void
Observer将收到Observable发送的完成消息。之后再调用的next函数将被忽略

## error(exception):void
Observer将收到Observable发送的错误消息。含义是异常后不再发送后续消息

## Observable和Observer
前文我们已经使用过Rxjs提供给我们的from()和of()函数创建Observable创建对象。然而Observable是如何和Observe交互的，以及如何取消订阅的，帮助我们了解Rxjs是如何运作的。
这里我们实现一个observable函数，接受一些参数，返回一个对象，比如叫subscription对象。我们如何利用这个资源。
```
    const observable = dataSource => {
        const INTERVAL = 1000;
        let schedulerId;
        return {
            subscribe:observe =>{
                schedulerId=setInteval(()=>{
                    if(dataSource.length === 0){
                        observe.complete();
                        clearInterval(schedulerId)
                        schedulerId = undefined
                    }else{
                        observer.next(dataSource.shift())
                    }
                    },INTERVAL);
             return{
                unsubscrible: ()=>{
                    if(schedulerId){
                        clearInterval(schedulerId);
                    }
                }
             }       
            }
        }
    }
```

来看看如何使用：
```
    let subscription = observerable([1,2,3]).subscribe({
        next:console.log,
        complete:()=>console.log('事件全部发送完毕')
        })
```

## 自己在浏览器上面调试
## Rxjs中提供了Observable的静态函数createl来实现和上面一样的功能
```
    const observable = Rx.Observerable.create(observe = >{
        observe.next(1);
        observe.next(2);
        observe.next(3);
        observable.complete();
        })
    const subscription = observable.subscrible(console.log)    
```
create() 函数接受一个函数作为参数，这个参数函数实际就是observable这个对象的subscrible函数。这就是我们自定义的observable，自定义他发送的行为，并且可以在整个系统中随时重用它。
```
    observable是惰性求职的
```

## 初识操作符
   操作符可以所示Rxjs的重中之重。它就是之前说的pipeline中的函数。
   操作符是纯的高阶的函数，永远不会改变observable对象，而是返回一个新的observable对象，为了链式调用
   操作符也是惰性求值的。
   操作符有两种类型，实例和静态的。前文中的from和of都是静态类型。
   平时有几个操作符filter和map和reduce还有一个额外的操作符scan
    scan比reduce更牛，因为scan可以返回每一步的聚合值
    const addFunction= (a,b)=>a+b;
    Rx.Observable.from([1,2,3,4,5,6,7,8,9])
    .scan(addFunction,0)
    .subscribe(console.log)
take操作符  只需要三个事件
first操作符 获取事件流的第一个事件 
last操作符  获取事件流的最后一个事件

## 时间相关的操作符
   我们知道同步程序的运行时间是可预测的，而异步程序则很难预测
    setTimeout干的活，在RxJS中由timer操作符来完成。
    Rx.Observable.timer(1000).subscribe(() => /*一秒后将调用这里的代码*/);
   setInterval干的话，由interval操作符来做，例子就不举了。
skip操作符：跳过1个事件(为了方便从1开始计数)；
interval操作符：每隔一秒发送一个事件，值从0开始；
take操作符：因为interval产生无限事件序列，因此这里只取5个事件；
do操作符：debug用；
delay操作符：延迟2秒。或者理解为阻塞它之前的事件序列2秒钟；
## Debouncing
   debounceTime操作符的参数为900毫秒，它的含义是，如果在900毫秒内没有
## Throttling
   throttleTime操作符是debounceTime操作符的好姊妹。它所做的操作是，在一定时间范围内不管产生了多少事件，它只放第一个过去，剩下的都将舍弃。理解它最好的方式就是自己写个代码尝试一下，就当是个练习吧。
##  Buffer  
   buffer相关的操作符也都是和时间有关的操作，因此也放在这里来讲。首先是buffer操作符，它接收一个observable作为参数，这个observable作为buffer的中止条件，并把buffer的数据作为数组传播下去
##  操作异步流
   RxJS中的merge()操作符就是用来合并两个流的，既然是两个，就会有顺序问题，如果是同步操作，那就是有序的；如果是异步操作，merge()操作符内部会根据时间来做决定，合并起来的流中的事件就是无序的，交叉出现的。

        Rx.Observable.merge(mouseupStream, touchendStream);
        //或
        mouseupStream.merge(touchendStream);
假如我们最终的需求是要鼠标点击或手指触摸位置的数据，请看代码：

    Rx.Observable.merge(mouseupStream, touchendStream)
      .do(event => console.log(event.type))// debug，查看事件类型
      .map(event => {
        switch (event.type) {
          case 'touchend':
            return {
              left: event.changedTouches[0].clientX,
              top: event.changedTouches[0].clientY
            };
          case 'mouseup':
            return {
              left: event.clientX,
              top: event.clientY
            }
        }
      })
      .subscribe(object => {
        console.log(`位置坐标为：(${object.left}, ${object.top})`);
      })

我们知道Rx一脉相承自函数式编程，那这段代码就有点说不过去了，怎能出现命令式的控制语句呢，说的就是你switch！当然理想化的东西能不能实现还是一回事儿呢，况且规则是人定的。但我们尽量在操作符中不出现命令式语句，把不得不出现的逻辑推迟到observer端来处理。我在系列三中提到过副作用也都放到observer来处理。

当然更好的方式是，我们在observable端就把数据处理好，observer接收时就不用再做处理了。
        const pmouseupStream = mouseupStream.map(event => ({
            left: event.clientX,
            top: event.clientY
        }));


        const ptouchendStream = touchendStream.map(event => ({
          left: event.changedTouches[0].clientX,
          top: event.changedTouches[0].clientY
        }));

        Rx.Observable.merge(pmouseupStream, ptouchendStream)
          .subscribe(object => {
            console.log(`位置坐标为：(${object.left}, ${object.top})`);
          });

如果我们想要两个异步流合并后保持先后顺序呢？没问题，concat()操作符完美解决你的问题。
switch()操作符只有实例方法实现方式。它的作用是切换到最新的那个observable

mergeMap

还用上面的例子，把map改成mergeMap，去掉switch，区别是，click事件流同样被取代，但第一次点击产生的时间事件流不会被第二次点击的时间事件流取代，而是合并成了一个流(无序)。

switchMap

这个操作符完成的事儿实际就是上面例子中的map+switch。

concatMap

用concatMap替换map，去掉switch，点击三次按钮，我们会看到控制台输出三次0到4，前一次不结束，后面的一直等待。这里给大家一个赞赏我的机会，请用三个鼠标事件流+concatMap操作符+takeUntil操作符完成拖放页面元素的功能。你会发现，哇~好简单好明了。
```
   takeUntil操作符接收一个observable为参数，含义是，接收上游事件并让它通过，直到参数observable开始发送事件。
```
 其实更直观的感受这些操作符的强大之处，或者说Rx的强大之处，应该用ajax、promise这些更贴近日常开发的例子，譬如说之前提到过的搜索框提示，或者监控股票价格，气象温度等等，就留个各位自己尝试吧，实践出真知嘛。   









