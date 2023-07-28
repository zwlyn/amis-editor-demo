/*
 * @Author: zhaowei 1666013677@qq.com
 * @Date: 2023-05-25 13:09:32
 * @LastEditors: zhaowei 1666013677@qq.com
 * @LastEditTime: 2023-06-08 09:29:30
 * @FilePath: \amis-editor-demo\src\index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
/**
 * @file entry of this example.
 */
import * as React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import '@fortawesome/fontawesome-free/css/all.css';
import '@fortawesome/fontawesome-free/css/v4-shims.css';
import 'amis/lib/themes/default.css';
import 'amis/lib/helper.css';
import 'amis/sdk/iconfont.css';
import 'amis-editor-core/lib/style.css';
import './scss/style.scss';

// react < 18
ReactDOM.render(<App />, document.getElementById('root'));
