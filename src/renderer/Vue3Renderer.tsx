/*
 * @Author: zhaowei 1666013677@qq.com
 * @Date: 2023-05-26 10:49:34
 * @LastEditors: zhaowei 1666013677@qq.com
 * @LastEditTime: 2023-06-01 14:21:48
 * @FilePath: \amis-editor-demo\src\renderer\Vue3Renderer.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import {Renderer} from 'amis';
import {RendererProps} from 'amis';
import React from 'react';

export interface MyRendererProps extends RendererProps {
  target?: string;
}

@Renderer({
  test: /\bzw-renderer$/,
  name: 'zw-renderer'
})
export default class MyRenderer extends React.Component<MyRendererProps> {
  static defaultProps = {
    target: 'zw world'
  };

  render() {
    const {target} = this.props;
    console.log(this.props, "debug this.props in zwRenderer!")
    return <p>Hello {target}!</p>;
  }
}
