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

## 构建组建
