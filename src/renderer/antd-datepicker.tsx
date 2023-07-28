/*
 * @Author: zhaowei 1666013677@qq.com
 * @Date: 2023-06-07 14:34:55
 * @LastEditors: zhaowei 1666013677@qq.com
 * @LastEditTime: 2023-06-11 23:25:42
 * @FilePath: \amis-editor-demo\src\renderer\antd-renderer.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import {Renderer} from 'amis';
import {RendererProps} from 'amis';
import React from 'react';
// import {useState} from 'react';
import {Spinner} from 'amis-ui';
// import {DatePicker} from 'antd'
// import 'antd/dist/antd.css';
export interface antdRendererProps extends RendererProps {
  target?: string;
}

export function lazyData<T, U>(
  getData: () => Promise<U>,
  getComponent: (
    data: U
  ) => React.ComponentType<T> | Promise<React.ComponentType<T>>
) {
  return React.lazy(async () => {
    const data = await getData();
    let component = await getComponent(data);

    return {
      default: component as React.ComponentType<T>
    };
  });
}


@Renderer({
  test: /\bantd-renderer$/,
  name: 'antd-renderer'
})
export default class AntdRenderer extends React.Component<antdRendererProps> {
  contentDom: any;
  static defaultProps = {
    target: 'antd'
  };
  contentRef = (ref: any) => (this.contentDom = ref);
  constructor(props: any) {
    super(props);
  }

  render() {
    const {target} = this.props;
    const LazyComponent = lazyData(
      async () =>await import('antd').then(res => res),
    ({DatePicker}) => {
      return () => (<>
        <DatePicker></DatePicker>
      </>)
    }
    );
    return (
      <React.Suspense
        fallback={
          <Spinner
            overlay
            spinnerClassName="m-t-lg"
            size="lg"
          />
        }>
        <LazyComponent></LazyComponent>
      </React.Suspense>
    );
  }
}
