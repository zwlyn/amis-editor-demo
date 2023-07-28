/*
 * @Author: zhaowei 1666013677@qq.com
 * @Date: 2023-05-25 13:09:32
 * @LastEditors: zhaowei 1666013677@qq.com
 * @LastEditTime: 2023-06-01 13:44:16
 * @FilePath: \amis-learn\amis-editor-demo\src\editor\MyRenderer.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React from 'react';
import {RendererEditor, BasicEditor} from 'amis-editor';

@RendererEditor('game-renderer', {
  name: 'game渲染器',
  description: '这只是个井字游戏示例',
  // docLink: '/docs/renderers/Nav',
  type: 'game-renderer',
  previewSchema: {
    // 用来生成预览图的
    type: 'game-renderer',
    target: 'demo'
  },
  scaffold: {
    // 拖入组件里面时的初始数据
    type: 'game-renderer',
    target: 'paly Glam'
  }
})

export default class ZwRendererEditor extends BasicEditor {
  tipName = '井字游戏';
  settingsSchema = {
    title: '井字游戏配置',
    body: [
      {
        type: 'tabs',
        tabsMode: 'line',
        className: 'm-t-n-xs',
        contentClassName: 'no-border p-l-none p-r-none',
        tabs: [
          {
            title: '常规',
            controls: [
              {
                name: 'target',
                label: 'Target',
                type: 'text'
              }
            ]
          },

          {
            title: '外观',
            controls: []
          }
        ]
      }
    ]
  };

  // 配置表单一些简单的基本上够用了。
  // 还有一些逻辑可以复写来自定义的，但是我现在没时间写说明了。
}
