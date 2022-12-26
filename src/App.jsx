import FormRender, { useForm } from 'form-render';
import { Tooltip } from 'antd';
import { useRef } from 'react';

let ele = null;

function TitleAndDescription({ schema }) {
  const { titleValue, titleDescription } = schema;
  const ref = useRef();
  return <Tooltip placement='topLeft' title={titleDescription} getPopupContainer={() => ele}>
    <div ref={ref} >{titleValue}</div>
  </Tooltip>
}


function App(props) {
  const { getForm = () => { } } = props;
  const form = useForm();
  getForm(form);
  ele = props.ele;
  if (!props.schema) return null;
  return <FormRender {...props} form={form} widgets={{ title: TitleAndDescription }} />
}

export default App
