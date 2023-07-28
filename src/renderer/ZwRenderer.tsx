import {Renderer} from 'amis';
import {RendererProps} from 'amis';
import React from 'react';
import { useState } from 'react';
// 文件打包使用
// 用使用最新开发的组件，需要对amis工程进行编译：
// 在这里插入图片描述
// 编译完成后sdk下的sdk.js，就可以在其他工程中使用了

export interface MyRendererProps extends RendererProps {
  target?: string;
}

@Renderer({
  test: /\bzw-renderer$/,
  name: 'zw-renderer'
})

export default class MyRenderer extends React.Component<MyRendererProps> {
  static defaultProps = {
    target: 'zw world',
    btnName: 'btnName',
    bgColor: 'yellow',
    useMyBtn: true
  };

  render() {
    const {target, btnName, bgColor, useMyBtn} = this.props;
    console.log(this.props, "debug this.props in zwRenderer!")
    function MyButton() {
      // 定义点击事件
      const [count, setCount] = useState(0);
      function handleClick(){
        alert('you clicked my button!')
        setCount(count + 1)
      }
      return (
        <button onClick={handleClick}>I'm a button, be click {count} times</button>
      );
    }
    const fruits = [{title: 'apple', id: 1}, {title: 'watmallen', id:2}, {title: 'mongo', id: 3}]
    const fruitItem = fruits.map(item => 
        <li key={item.id}>{item.title}</li>
      )
    return (
    <div style={{
      backgroundColor: bgColor
    }}>
    <ul>{fruitItem}</ul>
    {useMyBtn? <MyButton></MyButton> : (<button>I'm a button {btnName}</button>)}
    {useMyBtn? <MyButton></MyButton> : (<button>I'm a button {btnName}</button>)}
    <p className='zw-hello'>Hello {target}!</p>
    </div>
    );
  }
}
