import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import schema from './schema.js';

const createFormRenderElement = (ele, props) => {
  const root = ReactDOM.createRoot(ele);
  root.render(
    <App  {...props} ele={ele} />
  )
  return () => root.unmount();
}

window.createFormRenderElement = createFormRenderElement;


if (import.meta.env.MODE === 'development') {
  createFormRenderElement(document.getElementById('root'), { schema });
  console.log('开发环境');
}
