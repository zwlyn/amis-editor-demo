/*
 * @Author: zhaowei 1666013677@qq.com
 * @Date: 2023-05-25 13:09:32
 * @LastEditors: zhaowei 1666013677@qq.com
 * @LastEditTime: 2023-07-28 15:43:39
 * @FilePath: \amis-learn\amis-editor-demo\src\editor\MyRenderer.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */ 
import React from 'react';
import {BasePlugin, RendererEditor} from 'amis-editor';
import {RendererPluginAction, RendererPluginEvent, getSchemaTpl, BaseEventContext} from 'amis-editor-core';
import {getEventControlConfig, getOldActionSchema} from '../renderer/event-control/helper'

@RendererEditor('antd-button', {
  name: 'antd渲染器',
  description: 'antd渲染器',
  // docLink: '/docs/renderers/Nav',
  type: 'antd-button',
  previewSchema: {
    // 用来生成预览图的
    type: 'antd-button',
    target: 'demo',
    btnType: 'primary',
    antdTheme: {"token":{"colorPrimary":"pink"}}
  },
  scaffold: {
    // 拖入组件里面时的初始数据
    type: 'antd-button',
    target: '266666666',
    btnType: 'primary',
    antdTheme: {"token":{"colorPrimary":"#fff000"}}
  }
})
export default class AntdRendererEditor extends BasePlugin {
  name: 'antd渲染器';
  description: 'antd渲染器';
  rendererName = 'antd-button';
  tipName = 'Antd button';
  isBaseComponent = true;
  panelJustify = true;
  // 用来生成预览图的
  previewSchema = {
    type: 'antd-button',
    target: '266666666',
    btnType: 'primary',
    antdTheme: {"token":{"colorPrimary":"pink"}}
  };

  // 拖入组件里面时的初始数据
  scaffold = {
    type: 'antd-button',
    target: '266666666',
    btnType: 'primary',
    antdTheme: {"token":{"colorPrimary":"pink"}}
  };
  // 事件定义
  events: RendererPluginEvent[] = [
    {
      eventName: 'click',
      eventLabel: '点击',
      description: '点击时触发',
      defaultShow: true,
      dataSchema: [
        {
          type: 'object',
          properties: {
            nativeEvent: {
              type: 'object',
              title: '鼠标事件对象'
            }
          }
        }
      ]
    },
    {
      eventName: 'mouseenter',
      eventLabel: '鼠标移入',
      description: '鼠标移入时触发',
      dataSchema: [
        {
          type: 'object',
          properties: {
            nativeEvent: {
              type: 'object',
              title: '鼠标事件对象'
            }
          }
        }
      ]
    },
    {
      eventName: 'mouseleave',
      eventLabel: '鼠标移出',
      description: '鼠标移出时触发',
      dataSchema: [
        {
          type: 'object',
          properties: {
            nativeEvent: {
              type: 'object',
              title: '鼠标事件对象'
            }
          }
        }
      ]
    },
    // {
    //   eventName: 'doubleClick',
    //   eventLabel: '双击',
    //   description: '鼠标双击事件'
    // }
  ];
  // 动作定义
  actions: RendererPluginAction[] = [];
  panelTitle = 'antd-button';
  panelBodyCreator = (context: BaseEventContext) => {
    const renderer: any = context.info.renderer;
    const isInDropdown = /^button-group\/.+$/.test(context.path);
    const buttonStateFunc = (visibleOn: string, state: string) => {
      return [
        getSchemaTpl('theme:font', {
          label: '文字',
          name: `themeCss.className.font:${state}`,
          visibleOn: visibleOn,
          editorThemePath: [
            `button1.type.\${level}.${state}.body.font-color`,
            `button1.size.\${size}.body.font`
          ]
        }),
        getSchemaTpl('theme:colorPicker', {
          label: '背景',
          name: `themeCss.className.background:${state}`,
          labelMode: 'input',
          needGradient: true,
          needImage: true,
          visibleOn: visibleOn,
          editorThemePath: `button1.type.\${level}.${state}.body.bg-color`
        }),
        getSchemaTpl('theme:border', {
          name: `themeCss.className.border:${state}`,
          visibleOn: visibleOn,
          editorThemePath: `button1.type.\${level}.${state}.body.border`
        }),
        getSchemaTpl('theme:paddingAndMargin', {
          name: `themeCss.className.padding-and-margin:${state}`,
          visibleOn: visibleOn,
          editorThemePath: `button1.size.\${size}.body.padding-and-margin`
        }),
        getSchemaTpl('theme:radius', {
          name: `themeCss.className.radius:${state}`,
          visibleOn: visibleOn,
          editorThemePath: `button1.size.\${size}.body.border`
        }),
        getSchemaTpl('theme:size', {
          label: '图标尺寸',
          name: `themeCss.iconClassName.iconSize:${state}`,
          visibleOn: visibleOn,
          editorThemePath: `button1.size.\${size}.body.icon-size`
        })
      ];
    };
    return getSchemaTpl('tabs', [
      {
        title: '基本',
        body: [
          getSchemaTpl('layout:originPosition', {value: 'left-top'}),
          getSchemaTpl('label', {
            label: '名称'
          }),
          {
            label: '类型',
            type: 'button-group-select',
            name: 'type',
            size: 'sm',
            visibleOn: 'type === "submit" || type === "reset" ',
            options: [
              {
                label: '按钮',
                value: 'button'
              },

              {
                label: '提交',
                value: 'submit'
              },

              {
                label: '重置',
                value: 'reset'
              }
            ]
          },
          getSchemaTpl('icon', {
            label: '左侧图标'
          }),

          getSchemaTpl('icon', {
            name: 'rightIcon',
            label: '右侧图标'
          }),
          getSchemaTpl('badge')
        ]
      },
      {
        title: '外观',
        body: getSchemaTpl('collapseGroup', [
          {
            title: '基本',
            body: [
              getSchemaTpl('buttonLevel', {
                label: '样式',
                name: 'level',
                hidden: isInDropdown
              }),

              getSchemaTpl('buttonLevel', {
                label: '高亮样式',
                name: 'activeLevel',
                hidden: isInDropdown,
                visibleOn: 'data.active'
              }),

              getSchemaTpl('switch', {
                name: 'block',
                label: '块状显示',
                hidden: isInDropdown
              }),

              getSchemaTpl('size', {
                label: '尺寸',
                hidden: isInDropdown
              }),
              getSchemaTpl('theme:colorPicker', {
                label: '背景',
                name: 'buttonBg',
                labelMode: 'input',
                needGradient: true,
                needImage: true,
              }),
              getSchemaTpl('theme:paddingAndMargin', {
                name: 'paddingMargin',
                editorThemePath: `button1.size.\${size}.body.padding-and-margin`
              }),
            ]
          },
          // {
          //   title: '自定义样式',
          //   body: [
          //     {
          //       type: 'select',
          //       name: 'editorState',
          //       className: 'antdButton',
          //       label: '状态',
          //       selectFirst: true,
          //       options: [
          //         {
          //           label: '常规',
          //           value: 'default'
          //         }
          //       ]
          //     },
          //     ...buttonStateFunc("${editorState == 'default'}", 'default'),
          //   ]
          // },
          getSchemaTpl('theme:cssCode', {
            themeClass: 
              [{
                value: 'background:green;',
                className: 'buttonClassName',
                name: '按钮',
                // state: ['default']
              }]
          }),
          getSchemaTpl('collapseGroup', [
            getSchemaTpl('style:formItem', {renderer: context.info.renderer}),
            getSchemaTpl('style:classNames')
          ]),
          {...context?.schema, configTitle: 'style'}
        ])
      },
      {
        title: '事件',
        className: 'p-none',
        body:
          !!context.schema.actionType ||
          ['submit', 'reset'].includes(context.schema.type)
            ? [
                getSchemaTpl('eventControl', {
                  name: 'onEvent',
                  ...getEventControlConfig(this.manager, context)
                }),
                getOldActionSchema(this.manager, context)
              ]
            : [
                getSchemaTpl('eventControl', {
                  name: 'onEvent',
                  ...getEventControlConfig(this.manager, context)
                })
              ]
      }
    ])
  }
  // panelBody  = [
  //     {
  //       type: 'tabs',
  //       tabsMode: 'line',
  //       className: 'm-t-n-xs',
  //       contentClassName: 'no-border p-l-none p-r-none',
  //       tabs: [
  //         {
  //           title: '常规',
  //           controls: [
  //             {
  //               name: 'target',
  //               label: 'Target',
  //               type: 'text'
  //             },
  //             {
  //               name: 'btnType',
  //               label: 'BtnType',
  //               type: 'text'
  //             }, 
  //             {
  //               name: 'antdTheme',
  //               label: 'antdTheme',
  //               type: 'text'
  //             }, 
  //           ]
  //         },
  //         {
  //           title: '外观',
  //           controls: []
  //         },
  //       ]
  //     }
  // ]
}
