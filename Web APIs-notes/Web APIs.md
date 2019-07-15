
```mermaid
graph TD
A[JS]
A -->|JS语法| D[ECMAScript]
A -->|页面文档对象模型| E[DOM]
A -->|浏览器对象模型| F[BOM]
```

# API
应用程序编程接口，就是一个工具，以便于能轻松实现想要完成的功能
# Web API
Web API是浏览器提供的一套操作浏览器功能和页面元素的API（DOM和BOM）
# DOM
可以改变网页的内容、结构和样式
## DOM树

![DOM树](media\DOM树.png)

文档：一个页面就是一个文档  document
元素：页面中的所有标签都是元素，element
节点：网页中的所有内容都是节点（标签、属性、文本、注释等），node

**DOM把以上内容都看作是对象**

# DOM操作
## 获取元素
### getElementById()
注意：
- 因为文档页面从上往下加载，所以先有标签，然后才能getElementById
- 参数是字符串，所以需要加引号
- 返回的是一个 element 对象

console.dir 可以打印返回的元素对象，更好的查看里面的属性和方法

### getElementsByTagName()
- 参数是字符串，所以需要加引号d
- 得到的是对象的集合，可以用遍历来获取所有对象
- 得到的是动态的
例子: 获取ol里面的li
```html

<ol>
<li>123一二三四五</li>
<li>123上山打老虎</li>
<li>123老虎有几只</li>
<li>123快来数一数</li>
<li>123一二三四五</li>
</ol>
<script>
var ol = document.getElementsByTagName('ol');
//伪数组不能做父元素
var list = ol[0].getElementsByTagName('li');
console.log(list);
console.dir(list);

```
### getElementsByClassName()
类名选择器
### querySelector()
HTML5新增的
返回指定选择器的**第一个对象**
```html

<div class="box">
<ul>
<li>15212</li>
<li>1641238</li>
</ul>
</div>
<div class="box">
<ul>
<li>151232</li>
<li>1612348</li>
</ul>
</div>
<script>
//注意这里括号里面必须有“.”，因为需要指定选择的选择器
var boxs = document.querySelector('.box');
console.log(boxs);
</script>

```
### querySelectorAll()
返回指定选择器的所有对象集合
用法和querySelector()一样

### document.body
获取body元素
### document.documentElement
获取html元素

## 事件基础

JavaScript使我们有能力创建动态页面，而事件是可以被JavaScript侦测到的行为。
网页中的每个元素都可以产生某些触发JavaScript的事件。

### 事件由三部分组成：

- 事件源   事件被触发的对象 比如按钮
- 事件类型   如何触发 比如鼠标点击、鼠标经过、键盘按下、滚动滚轮
- 事件处理程序   通过函数赋值的方式完成
```html

<button id="btn">按钮</button>
<script>
var btn = document.getElementById('btn');
btn.onclick = function () {
alert('触发事件');
}
</script>

```

事件都有：


| 鼠标事件 | 触发条件 |
| ------ | ------ |
| onclick | 鼠标点击左键触发 |
| onmouseover | 鼠标经过触发 |
| onmouseout | 鼠标离开触发 |
| onfocus | 获得鼠标焦点触发 |
| onblur | 失去鼠标焦点触发 |
| onmousemove | 鼠标移动触发 |
| onmouseup | 鼠标弹起触发 |
| onmousedown | 鼠标按下触发 |

## 操作元素

JavaScript可以改变网页内容、结构和样式，我们可以利用DOM操作元素来改变元素里面的内容、属性等。

### element.innerText

- 从起始位置到终止位置的内容，但它去除Html标签，同时空格和换行也会去掉
- innerText不识别HTML标签
- 可读写的，可以获取元素里面的内容

### element.innerHTML

- 从起始位置到终止位置的全部内容，包括Html标签，同时保留空格和换行
- 能识别HTML标签
- 可读写的，可以获取元素里面的内容

### 修改表单属性

disabled 	让某个表单被禁用，不能被点击，
用法：
```javascript
btn.onclick = function () {
    btn.disabled = true;
    //或者写成下面这种
    this.disabled = true;
    //this指向的是时间函数的调用者
}
```

**案例**：仿京东显示密码，点击按钮将密码框显示为文本框，并可以查看密码明文

算法：利用一个flag变量，如果是1就切换为文本框，如果是0就切换为密码框

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Document</title>
    <style>
    * {
        margin: 0;
        padding: 0;
    }
    form {
        position: relative;
        width: 1000px;
        height: 500px;
        border: 1px solid red;
        margin: 100px auto 0;
    }
    input {
        display: block;
        width: 800px;
        height: 50px;
        line-height: 30px;
        color: #3c3c3c;
        margin: 50px auto 50px;
        padding-left: 20px;
        box-sizing: border-box;
        border: 1px solid red;
    }
    label img {
        top: 164px;
        right: 120px;
        position: absolute;
        width: 24px;
    }
    </style>
</head>
<body>
    <form action="#">
        <input type="text" id="userName" placeholder="请输入你的用户名">
        <label for="">
            <img src="images/闭眼.png" alt="">
        </label>
        <input type="password" id="password" placeholder="请输入你的密码">
    </form>
    <script>
    var eye = document.querySelector('img');
    var password = document.getElementById('password');
    var flag = 0;
    eye.onclick = function () {
        if (flag === 0) {
            password.type = 'text';
            eye.src = 'images/睁眼.png';
            flag = 1;
        } else {
            password.type = 'password';
            eye.src = 'images/闭眼.png';
            flag = 0;
        }
 
    }
    </script>
</body>
</html>
```

### 修改样式属性

#### element.style
行内样式操作，修改元素样式，如果样式比较少或者功能简单的情况下使用
注意：
- 里面的属性是驼峰命名法
- JS修改的是行内样式，权重比CSS的高
#### element.className
类名样式操作，适合样式比较多的情况下使用
修改了元素的类名
**注意：**这个方法直接修改了类名，也就是说会覆盖原来的类名，原来的就不生效了
如果想要保留原先的类名，这样做：

```
//假设first 是原来的类名，change是想加入的
this.className = 'first change';
```

#### 表单事件

获得焦点 onfocus
失去焦点 onblur

案例：京东搜索框，默认是“手机”两个字，当用户点击搜索框的时候，“手机”两个字消失，当输入文本之后，保持文本内容不变

分析：
- 如果获得焦点，判断里面是否是默认文字，如果是默认文字，就清空表单内容
- 如果失去焦点，判断表单是否为空，如果为空，则表单内容改为默认文字
- 获得焦点的时候，把文本框里的文字变黑
- 失去焦点的时候，文本框文字变浅

```html
<input type="text" value="手机">
<script>
var input = document.querySelector('input');
input.onfocus = function () {
    if (this.value === '手机') {
    	input.value = '';
    }
    this.style.color = '#3c3c3c'; 
}
input.onblur = function () {
    if (this.value === '') {
    	input.value = '手机';
    }
    this.style.color = '#999';
}
</script>
```

案例：密码提示框，选中的时候提示密码的长度和标准，失去焦点的时候，检查密码是否合乎规范

分析：
- 如果获得焦点，提示密码的长度和标准
- 如果失去焦点，检查密码是否合乎规范，如果不符合规范，就提示
- 因为改变的样式比较多，所以用className来修改样式

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Document</title>
    <style>
    div {
        width: 600px;
        margin: 100px auto;
    }
    .message {
        display: inline-block;
        font-size: 12px;
        color: #999;
        background: url(images/message.png) no-repeat left center;
        background-size: 16px;
        padding-left: 20px;
    }
    .error {
        display: inline-block;
        font-size: 12px;
        color: red;
        background: url(images/error.png) no-repeat left center;
        background-size: 16px;
        padding-left: 20px;
    }
    .right {
        display: inline-block;
        font-size: 12px;
        color: green;
        background: url(images/right.png) no-repeat left center;
        background-size: 16px;
        padding-left: 20px;
    }
    </style>
</head>
<body>
    <div class="register">
        <input type="password" class="pwd">
        <p class="message">请输入6~16位密码</p>
    </div>
    <script>
    var pwd = document.querySelector('.pwd');
    var message = document.querySelector('.message');
    pwd.onblur = function() {
        if (pwd.value.length > 16 || pwd.value.length < 6) {
            
            message.className = 'error';
            message.innerHTML = '您输入的位数不对，要求6~16位';
        } else {
            message.className = 'right';
            message.innerHTML = '对辽~';
        }
    }
    </script>
</body>
</html>
```

### 操作元素小总结

```mermaid
graph LR
A[操作元素]  -->B[操作元素内容]
B  -->F[innerText]
B  -->G[innerHTML]
A[操作元素]  -->C[操作常见元素属性]
C -->H[src href title alt等 ]
A[操作元素]  -->D[操作表单元素属性]
D -->I[ type value disabled等]
A[操作元素]  -->E[操作元素样式属性]
E -->J[element.style]
E -->K[element.className]
```

### 排他思想

两层循环，先排除其他人，然后再设置自己的样式

```html
    <button>按钮1</button>
    <button>按钮2</button>
    <button>按钮3</button>
    <button>按钮4</button>
    <button>按钮5</button>
    <script>
    var btns = document.querySelectorAll('button');
    for (var i = 0; i < btns.length; i++) {
        btns[i].onclick = function () {
            //  1. 先把所有颜色的背景颜色都清空
            for (var j = 0; j < btns.length; j++) {
                btns[j].style.backgroundColor = '';
            }
            //  2. 再把想要的背景颜色改成pink
            this.style.backgroundColor = 'pink';
        }
    }
    </script>
```

案例：百度换肤效果

分析：
- 利用循环给一组元素注册点击事件
- 当鼠标经过一张图片，当前的页面背景换成经过的图片，鼠标移开之后，换回默认的
- 当点击了图片，当前的页面背景换成点击的图片
- 核心算法：把当前图片的src路径取过来，给body作为背景

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <style>
        * {
            margin: 0;
            padding: 0;
        }

        body {
            background: url(images/bg1.jpg) no-repeat center top;
        }

        li {
            list-style: none;
        }

        .baidu {
            overflow: hidden;
            margin: 100px auto;
            background-color: #fff;
            width: 410px;
            padding-top: 3px;
        }

        .baidu li {
            float: left;
            margin: 0 1px;
            cursor: pointer;
        }

        .baidu img {
            width: 100px;
        }
    </style>

</head>

<body>

    <ul class="baidu">
        <li><img src="images/bg1.jpg" alt=""></li>
        <li><img src="images/bg2.jpg" alt=""></li>
        <li><img src="images/bg3.jpg" alt=""></li>
        <li><img src="images/bg4.jpg" alt=""></li>
    </ul>
    <script>
        //获取元素
        var images = document.querySelector('.baidu').querySelectorAll('img');
        for (var i = 0; i < images.length; i++) {
            //temp 存储原来的背景
            var temp;
            images[i].onclick = function () {
                document.body.style.backgroundImage = 'url(' + this.src + ')';
                temp = 'url(' + this.src + ')';
            }
            images[i].onmouseover = function () {
                temp = document.body.style.backgroundImage;
                document.body.style.backgroundImage = 'url(' + this.src + ')';
            }
            images[i].onmouseout = function () {
                document.body.style.backgroundImage = temp;
            }
        }
    </script>
</body>

</html>
```

案例： 表单全选取消全选

分析：
- 点击上面全选复选框，下面所有的复选框都选中（全选）
- 再次点击全选复选框，下面所有的复选框都不中选（取消全选）
- 如果下面复选框全部选中，上面全选按钮就自动选中
- 如果下面复选框有一个没有选中，上面全选按钮就不选中
- 所有复选框一开始默认都没选中状态
- 下面复选框需要全部选中，上面全选才能选中做法：给下面所有复选框绑定点击事件，每次点击，都要循环查看下面所有的复选框是否有没选中的，如果有一个没选中的上面全选就不选中。



```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <style>
        table {
            width: 800px;
            height: 500px;
            margin: 0 auto;
            border: 1px solid #999;
            text-align: center;
        }
        table tbody tr {
            background-color: rgb(163, 163, 163);
        }
        thead {
            background-color: skyblue;
        }
    </style>
</head>
<body>
    <table>
        <thead>
            <tr>
                <th><input type="checkbox" name="" id="checkAll" ></th>
                <th>商品</th>
                <th>价格</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td><input type="checkbox" name="" id=""></td>
                <td>iPhone Xs Max</td>
                <td>10000</td>
            </tr>
            <tr>
                <td><input type="checkbox" name="" id=""></td>
                <td>iPad Pro</td>
                <td>5000</td>
            </tr>
            <tr>
                <td><input type="checkbox" name="" id=""></td>
                <td>iWatch</td>
                <td>3000</td>
            </tr>
            <tr>
                <td><input type="checkbox" name="" id=""></td>
                <td>AirPods</td>
                <td>1000</td>         
            </tr>
        </tbody>
    </table>
    <script>
        var checkAll = document.querySelector('#checkAll');
        var trs = document.querySelector('tbody').querySelectorAll('tr');
        var tbCheck = document.querySelector('tbody').getElementsByTagName('input');
        for (var i = 0; i < trs.length; i++) {
            trs[i].onmouseover = function () {
                this.style.backgroundColor = 'rgb(200, 200, 200)';
            }
            trs[i].onmouseout = function () {
                this.style.backgroundColor = '';
            }
        }
        checkAll.onclick = function () {
            for (var j = 0; j < tbCheck.length; j++) {
                tbCheck[j].checked = checkAll.checked;
            }
        }
        //下面的全部选中，上面的就选中
        for (var i = 0; i < tbCheck.length; i++) {
            tbCheck[i].onclick = function () {
                // flag 控制全选按钮是否被选中
                var flag = true;
                for (var j = 0; j < tbCheck.length; j++) {
                    if (!(tbCheck[j].checked)) {
                        flag = false;
                        break;      // 退出for循环，提高运行效率
                    }
                }
                checkAll.checked = flag;
            }
        }
    </script>
</body>
</html>
```

### 操作元素

#### 获取属性值

- element.属性 	获取内置属性值（元素自带的属性）
- element.getAttribute('属性')	主要获取自定义的属性（标准），我们定义的属性

#### 设置属性值

- element.属性 = '值'；
- element.setAttribute('属性', '值')	主要更改自定义的属性

#### 移除属性值

- element.removeAttribute('属性')	主要移除自定义的属性（标准）

#### TAB案例 （重点）

分析：
- 一个大盒子，里面上下两个小盒子
- 上面的模块，点击某一个之后，这个的背景色是红色，其余的是灰色（排他思想）
- 点击某一个之后，显示这个模块对应的内容，其他的隐藏，这个要写到点击事件里面
- 下面的显示内容和上面的小 li 一一对应
- 核心思路：
  - 给上面的tab_list 添加自定义属性，属性号从0开始
  - 当点击上面的模块，下面的队形的显示模块开始显示，其他的隐藏

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <style>
        * {
            margin: 0;
            padding: 0;
        }
        ul {
            list-style: none;
        }
        .tab {
            width: 800px;
            height: 500px;
            margin: 200px auto;
        }
        .tab_list {
            height: 50px;
            background-color: rgb(162, 162, 162);
            border-bottom: 2px solid #c81623;
        }
        .tab_list ul li {
            float: left;
            display: inline-block;
            width: 150px;
            height: 50px;
            line-height: 50px;
            text-align: center;
            cursor: pointer;
        }
        .tab_list .current {
            background-color: #c81623;
            color: #fff;
        }
        .item {
            display: none;
        }
    </style>
</head>
<body>
    <div class="tab">
        <div class="tab_list">
            <ul>
                <li class="current">商品介绍</li>
                <li>规格与包装</li>
                <li>售后保障</li>
                <li>商品评价(1.1万+)</li>
                <li>手机社区</li>
            </ul>
        </div>
        <div class="tab_con">
            <div class="item" style="display: block">
                商品介绍模块内容
            </div>
            <div class="item">
                规格与包装模块内容
            </div>
            <div class="item">
                售后保障模块内容
            </div>
            <div class="item">
                商品评价模块内容
            </div>
            <div class="item">
                手机社区模块内容
            </div>
        </div>
    </div>
    <script>
    var tab_list = document.querySelector('.tab_list');
    var lis = tab_list.querySelectorAll('li');
    var items = document.querySelectorAll('.item');
    for (var i = 0; i < lis.length; i++) {
        //给5个li设置索引号
        lis[i].setAttribute('index', i);
        lis[i].onclick = function () {
            //干掉其他人
            for (var j = 0; j < lis.length; j++) {
                lis[j].className = '';
            }
            this.className = 'current';
            var index = this.getAttribute('index');
            for (var k = 0; k < items.length; k++) {
                items[k].style.display = 'none';
            }
            items[index].style.display = 'block';
        }


    }
    </script>
</body>
</html>
```

### H5自定义属性

自定义属性目的：为了保存并使用数据，有些数据保存到页面中，为不是数据库中



#### 设置H5自定义属性

但是有些自定义属性容易引以歧义，不容易判断是内置属性还是自定义属性，所以H5给我们新增了自定义属性
H5规定自定义属性以 “data-”  开头

#### 获取H5自定义属性

- 兼容性：element.getAttribute('属性')
- H5新增：element.dataset.index 或者 element.dataset[ 'index' ]

注意：
```html
<div data-list-name="andy"></div>
<script>
var div = document.querySelector('div');
console.log(div.getAttribute('data-list-name'));
//上下三种方法都可以，但是如果用下面这两种方法的话，要用驼峰命名法
console.log(div.dataset.listName);
console.log(div.dataset['listName']);
</script>
```

## 节点操作

利用DOM提供的方法获取元素  （逻辑性不强，繁琐）
- document.getElementById()
- document.getElementByTagName()
- document.querySelector  等等

利用	（简单、符合逻辑）
- 利用父子兄的节点关系获取元素
- 逻辑性强，但是兼容性差

### 节点

![DOM树](media\DOM树.png)

页面中所有的内容（标签、属性、文本、注释等）都是节点。节点用node表示。

HTML DOM树中的所有节点均可通过JavaScript 进行访问，所有HTML节点均可被修改，也可以创建或删除。

一般的，节点至少由nodeType（节点类型）、 nodeName（节点名称）、 nodeValue（节点值）这三个基本属性。

- 元素节点 nodeType 为1
- 属性节点 nodeType 为2
- 文本节点 nodeType 为3 （文本节点包括文字、空格、换行等等）

在实际开发中，节点操作主要操作的是元素节点。

### 节点层级

最常见的是**父子兄层级关系**。

#### 父级节点

node.parentNode

注意：得到的离元素最近的父级节点（亲爸爸），如果找不到就返回null

#### 子级节点

parentNode.childNodes     (标准)

返回包含指定节点的子节点的集合，该集合为即时更新的集合
包含的子节点包含元素节点、文本节点等等

所以用 nodeType 判断，用for循环遍历

parentNode.children     (非标准)

得到所有的子元素节点，虽然是非标准的，但是得到了浏览器的支持，所以以后大量使用这个

parentNode.firstChild

返回第一个子节点，找不到返回null,不管是文本节点还是元素节点都能找到

parentNode.firstElementChild

返回第一个子元素节点，找不到返回null,只返回元素节点（IE9以上才支持）

parentNode.lastChild

返回最后一个子节点，找不到返回null,不管是文本节点还是元素节点都能找到

parentNode.lastElementChild

返回最后一个子元素节点，找不到返回null,只返回元素节点（IE9以上才支持）

实际开发中的办法：

parentNode.children[i]

#### 案例

案例：新浪下拉菜单

分析：nav导航栏中有ul和li，li下面又有ul和li，第二层ul和li在鼠标移上去的时候才显示

- 导航栏里面的li都要有鼠标经过的效果，所以需要循环注册
- 核心原理：当鼠标经过li 的时候，孩子的ul 和li 显示，当鼠标离开，则隐藏

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>新浪网</title>
    <style>
        * {
            margin: 0;
            padding: 0;
        }
        ul {
            list-style: none;
        }
        a {
            text-decoration: none; 
        }
        .nav {
            width: 800px;
            margin: 200px auto;
            position: relative;
        }
        .nav>li {
            width: 80px;
            height: 100%;
            line-height: 41px;
            color: #333;
            float: left;
            position: relative;
            text-align: center;
        }
        .nav>li>a:hover {
            background-color: #eee;
        }

        .nav li ul {
            display: none;
            position: absolute;
            top: 41px;
            left: 0;
            width: 100%;
            border-left: 1px solid #fecc5b;
            border-right: 1px solid #fecc5b;
            box-sizing: border-box;
        }
        .nav li ul li {
            border-bottom: 1px solid #fecc5b;
/*             width: 50px;
            text-align: center; */
            
        }
        .nav ul li a:hover {
            background-color: #FFF5DA;
        } 
    </style>
</head>
<body>
    <ul class="nav">
        <li>
            <a href="#">微博</a>
            <ul>
                <li>
                    <a href="#">私信</a>
                </li>
                <li>
                    <a href="#">评论</a>
                </li>
                <li>
                    <a href="#">@我</a>
                </li>
            </ul>
        </li>
        <li>
            <a href="#">微博</a>
            <ul>
                <li>
                    <a href="#">私信</a>
                </li>
                <li>
                    <a href="#">评论</a>
                </li>
                <li>
                    <a href="#">@我</a>
                </li>
            </ul>
        </li>
        <li>
            <a href="#">微博</a>
            <ul>
                <li>
                    <a href="#">私信</a>
                </li>
                <li>
                    <a href="#">评论</a>
                </li>
                <li>
                    <a href="#">@我</a>
                </li>
            </ul>
        </li>

    </ul>
    <script>
    //获取元素
    var nav = document.querySelector('.nav');
    var lis = nav.children;
    //循环注册事件
    for (var i = 0; i < lis.length; i++) {
        lis[i].onmouseover = function () {
            this.children[1].style.display = 'block';
        }
        lis[i].onmouseout = function () {
            this.children[1].style.display = 'none';
        }
    }
    </script>
</body>
</html>
```

#### 兄弟节点

node.nextSibling 得到下一个兄弟节点，包括元素节点和文本节点
node.previousSibling  得到上一个兄弟节点，包括元素节点和文本节点

//下面两个方法只有IE9以上才能兼容
node.nextElementSibling 得到下一个兄弟元素节点，只有元素节点
node.previousElementSibling  得到上一个兄弟元素节点，只有元素节点

#### 创建节点

document.createElement('tagName')

这个方法创建由tagName指定的 HTML 元素，因为这些元素原先不存在，是根据我们的需求动态生成的，所以也称为**动态创建元素节点**。

node.appendChild(child);

它是追加元素，是在指定父节点的子节点的末尾添加。

node.insertBefore(child, 指定元素);


#### 留言板案例

分析：
- 页面组成：一个文本域，一个提交按钮，一个留言板
- 当点击提交按钮的时候，先判断文本域内容是不是空，如果是空，就警告
- 如果不是空，就新建一个li，然后把文本域的内容赋值给li，然后在ul里面的前面添加li

####  删除节点

node.removeChild(child);

从DOM中删除一个子节点，返回删除的节点

#### 删除留言案例

案例分析：

- 在留言板案例的基础上添加功能
- 当把文本域的内容幅值给 li 的时候，多添加一个删除的链接，
- 循环把所有的链接获取过来，当我们点击一个链接的时候，删除当前链接所在的 li
- 阻止链接跳转需要添加javascript:void(0);或者 javascript:;

```javascript
<script>
        //获取元素
        var btn = document.querySelector('button');
        var text = document.querySelector('textarea');
        var ul = document.querySelector('ul');
        //注册事件
        btn.onclick = function () {
            if (text.value == '') {
                alert('您没有输入任何内容');
                return false;
            } else {
                var li = document.createElement('li');
                //将文本域的内容赋值给li，同时后面添加一个删除留言的a链接
                li.innerHTML = text.value + "<a href='javascript:;'>删除</a>";
                ul.insertBefore(li, ul.children[0]);
                var as = document.querySelectorAll('a'); 
                for (var i = 0; i < as.length; i++) {
                    as[i].onclick = function () {
                        //删除的是a当前所在的li
                        ul.removeChild(this.parentNode);
                    }
                }               
            }
        }
    </script>
```

#### 复制节点（克隆节点）

node.cloneNode()
这个方法返回一个节点的副本

注意：
- 如果括号里面的参数为空，那么只是浅拷贝，即只复制节点本身，不克隆里面的子节点
- 如果括号里面的参数为true，那么是深拷贝，复制标签并且复制里面的内容












