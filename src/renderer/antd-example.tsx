/*
 * @Author: zhaowei 1666013677@qq.com
 * @Date: 2023-06-07 14:34:55
 * @LastEditors: zhaowei 1666013677@qq.com
 * @LastEditTime: 2023-06-11 14:51:36
 * @FilePath: \amis-editor-demo\src\renderer\antd-renderer.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import {Renderer, RendererProps} from 'amis-core';
import React from 'react';
import {DatePicker, message} from 'antd';
import {useState} from 'react';
// import 'antd/dist/antd.css';

export interface antdRendererProps extends RendererProps {
  target?: string;
}

@Renderer({
  test: /\bantd-renderer$/,
  name: 'antd-renderer'
})
export default class AntdRenderer extends React.Component<antdRendererProps> {
  static defaultProps = {
    target: 'antd'
  };

  render() {
    const {target} = this.props;
    const Layout = () => {
      const [date, setDate] = useState('');
      const handleChange = (value: any) => {
        message.info(
          `Selected Date: ${value ? value.format('YYYY-MM-DD') : 'None'}`
        );
        alert('changed!');
      };
      return (
        <div style={{width: 400, margin: '100px auto'}}>
          <DatePicker onChange={handleChange} />
          <div style={{marginTop: 16}}>Selected Date: {date}</div>
        </div>
      );
    };
    return (
      <div style={{width: 400, margin: '100px auto'}}>
        <Layout></Layout>
      </div>
    );
  }
}
