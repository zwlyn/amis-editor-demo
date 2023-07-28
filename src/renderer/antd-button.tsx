/*
 * @Author: zhaowei 1666013677@qq.com
 * @Date: 2023-06-07 14:34:55
 * @LastEditors: zhaowei 1666013677@qq.com
 * @LastEditTime: 2023-07-28 15:49:41
 * @FilePath: \amis-editor-demo\src\renderer\antd-button.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import {Renderer} from 'amis';
import {RendererProps, resolveEventData} from 'amis';
import React from 'react';
// import {useState} from 'react';
import {Spinner} from 'amis-ui';
// import {DatePicker} from 'antd'
// import 'antd/dist/antd.css';
export interface antdRendererProps extends RendererProps {
  target?: string;
  type?: string
  antdTheme?: any
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
  test: /\bantd-button$/,
  name: 'antd-button'
})
export default class AntdRenderer extends React.Component<antdRendererProps> {
  contentDom: any;
  static defaultProps = {
    target: 'button name',
    btnType: 'primary',
    antdTheme: '{}'
  };
  contentRef = (ref: any) => (this.contentDom = ref);
  constructor(props: any) {
    super(props);
  }
  async dispatchEvent(eventName: string, eventData: any = {}) {
    /* 用于调用eventName类型的事件 */
    const event = 'on' + eventName.charAt(0).toUpperCase() + eventName.slice(1);
    const {dispatchEvent, options} =
      this.props;

    // 触发渲染器事件
    const rendererEvent = await dispatchEvent(
      eventName,
      resolveEventData(this.props, {
        options,
        items: options, // 为了保持名字统一
      })
    );
    if (rendererEvent?.prevented) {
      return;
    }
    // 触发外部方法
    this.props[event](eventData);
  }
  render() {
    const {target, btnType, antdTheme, coutomCss, classnames: cx, level, block, 
      buttonClassName, buttonBg, buttonBorder,
      paddingMargin, style} = this.props;
    const LazyComponent = lazyData(
      async () =>await import('antd').then(res => res),
    ({Button, ConfigProvider }) => {
      const theme = typeof(antdTheme) === 'string' ? JSON.parse(antdTheme) : antdTheme
      return () => (<>
        <ConfigProvider theme={theme}>
          <div className={cx(buttonClassName)}>
        <Button type={btnType as any}
        style={{backgroundColor: buttonBg, ...buttonBorder, ...paddingMargin}}
        onClick={(e: any) => this.dispatchEvent('click', e)}
        onMouseEnter={(e: any) => this.dispatchEvent('mouseenter', e)}
        onMouseLeave={(e: any) => this.dispatchEvent('mouseleave', e)}
        >{target}</Button>
        <div>{JSON.stringify(paddingMargin)}</div>
        </div>
        </ConfigProvider>
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
