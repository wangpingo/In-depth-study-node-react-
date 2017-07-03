## 初识react
react是facebook推出的javascript库。是用来创建用户界面的javascript库
react有三大颠覆性的特点
1. 组件
```jsx harmony
// profile
import  React from 'react';

export default Class Profile extends React.Component{
    render() {
        return (
            <div className="profile-components">
                <h2>Hi, i am {this.props.name}</h2>
             </div>
        )
    }
}
//index.js
import Profile from './profile'
export default function(props) {
  return (
      <Profile />
  )
      
  
}
```
2. jsx
jsx 就是 在render中有一种直接把html嵌套在js中的写法，他被称为jsx
3. Virtual Dom
React 在virtualDom上实现一个diff算法