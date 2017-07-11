## 各种情况下的文字居中
### ps 今天TM想骂人了，最近在全力赶项目，我TM的竟然因为一个固定高度内多行文字居中
搞的晕头撞向，多行文字居中不就是利用vertical-algin:middle嘛。为什么 MD有的时候起
作用，有的时候不起作用那？ 
怨不得别人，还赖自己功夫不到家，只能自己气自己，今天我就来剖析这个
###主角登场 ----> vertical-align:middle;

再次ps下，刚开始写，我tm竟然忘了style标签烦放在哪里。不管了先解决这个问题
#### style 标签该放在页面何处
```html
   //一般写法
    <head>
       <style></style>
    </head>
```
一般情况下都是这样写的，因为浏览器解析html从上到下执行，样式放在head里面可以避免样
式闪烁，什么是闪烁？就是刚一开始页面光秃秃的几行字，然后突然又变得好看了。这就是闪烁，
因为啥这样因为刚一开始样式没有加载进来。

然后说style标签 这个标签放哪都行 把html根标签比喻地球，style无论你在哪，喜马拉雅山，
还是什么大峡谷，你都能起作用。。。。

## 言归正传 vertical-middle;
```html
    //example:
    <!DOCTYPE html>
    <html lang="en">
    <style>
        .main{
            width: 100px;
            height: 100px;
            background: #222222;
            color: white;
        }
    </style>
    <head>
        <meta charset="UTF-8">
        <title>Title</title>
    </head>
    <body>
    
        <div class="main">
            aaaaaaaaaaaaaaaaaaaaa
            <!--你好好好你好好好你好好好你好好好-->
        </div>
    </body>
    </html>
    
    
```
我刚一开始这样写aaaaaaa..发现竟然没有自动换行
![aaaa](/dist/7-10-1.jpg)
这样写你好好好你好....自动换行了。
![你好你好](/dist/7-10-1.jpg)

因为他把aaaa..当作一个英文单词了，你好..这种是好几个汉字。
css默认单词或者汉字换行，其他的不换行。如果想要让他们超出就换行，加入一个
word-break:break-all 就可以实现超出就换行，这样有引出来其他的问题。。。
自动换行 word-break:break-all和word-wrap:break-word 的区别
1. word-break:break-all 例如div宽200px，它的内容就会到200px自动换行，如果该行末端有个英文单词很长（congratulation等），它会把单词截断，变成该行末端为conra(congratulation的前端部分)，下一行为tulation（conguatulation）的后端部分了。
2. 2，word-wrap:break-word 例子与上面一样，但区别就是它会把congratulation整个单词看成一个整体，如果该行末端宽度不够显示整个单词，它会自动把整个单词放到下一行，而不会把单词截断掉的。

今天前面不会的东西太多，明天我们讲 vertical-align 睡了哈，good night!!


###  今天仔细回顾一下如何利用vertical-align:middle实现多行文字垂直居中

> 仔细回顾一下 ==vertical-align:middle== 这个属性  
#### w3c中这样介绍
- vertical-align 属性设置元素的垂直对齐方式。
- 该属性定义行内元素的基线相对于该元素所在行的基线的垂直对齐。允许指定负长度值和百分比值。这会使元素降低而不是升高。在表单元格中，这个属性会设置单元格框中的单元格内容的对齐方式

经过我的测验，vertical-align：middle；喜欢配合行内元素使用，尤其是inline-block

```
        .main{
            width: 605px;
            height: 200px;
            background-color: black;
            color: white;
            display: inline-block;
        }
        .sub2{
            display: inline-block;
            vertical-align: middle;
            width: 500px;
        }
        .first{
            display: inline-block;
            width: 60px;
            height: 200px;
            vertical-align: middle;
        }


       <div class="main">
        <span class="first">
           
        </span>
        <span class="sub2">
            人力资源-ehr组人力资源-ehr组人力资源-ehr组人力资源-ehr组人力资源-ehr组人力资源-ehr组人力资源-ehr组人力资源-ehr组人力资源-ehr组人力资源-ehr组人力资源-ehr组人力资源-ehr组人力资源-ehr组人力资源-ehr组人力资源-ehr组人力资源-ehr组
        </span>
    </div>
    
```

![image](http://note.youdao.com/yws/public/resource/5151f032fba248f194a1c38bd16f1176/xmlnote/WEBRESOURCE19a635157d9d33636026487b1df2a815/15)

## 如果去掉class为first的span

```
        <div class="main">
     <!--    <span class="first">
           
        </span> -->
        <span class="sub2">
            人力资源-ehr组人力资源-ehr组人力资源-ehr组人力资源-ehr组人力资源-ehr组人力资源-ehr组人力资源-ehr组人力资源-ehr组人力资源-ehr组人力资源-ehr组人力资源-ehr组人力资源-ehr组人力资源-ehr组人力资源-ehr组人力资源-ehr组人力资源-ehr组
        </span>
    </div>
```
那么结果就为


![image](http://note.youdao.com/yws/public/resource/5151f032fba248f194a1c38bd16f1176/xmlnote/WEBRESOURCEd167da8ec418371dd0a6900d2de68c5c/17)
我的理解是:
使用vertical-align:middle实现文字居中的时候，必须使用相邻的行级元素（例如first）将middle这个位置确立下来，之后的元素才能使用vertical-align:middle让文字居中。

可以解决问题：
   图片和文字共同要求居中的时候可以使用vertical-align:middle
   
ps: 让多行文字居中没闭眼使用vertical-align:middle;有其他更好的解决办法
-  display:table的方法
        
    ```
    .middle-box{display: table; height: 300px;}
    .middle-inner{display: table-cell; vertical-align:middle; text-align:center;}
    
    <div class="middle-box">
	<div class="middle-inner">
		你好你好你好你好你好你好你好你好
	</div>
    </div>
   
   ```
   ![image](//note.youdao.com/yws/res/22/WEBRESOURCE61e45248a7c8ef69776068688a27a5bc)



