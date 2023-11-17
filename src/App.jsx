import FormRender, { useForm } from 'form-render';
import { Button, Input, Popover, Tooltip, Upload } from 'antd';
import { useEffect, useRef, useState } from 'react';
import { uploadFileApi } from './uploadImg';

let ele = null;

function TitleAndDescription({ schema }) {
  const { titleValue, titleDescription } = schema;
  const ref = useRef();
  return <Tooltip placement='topLeft' title={titleDescription} getPopupContainer={() => ele}>
    <div ref={ref} >{titleValue}</div>
  </Tooltip>
}

function UploadAndImage(props) {
  const { value, schema } = props;
  const [inputValue, setValue] = useState(value);
    useEffect(() => {
        if (value !== inputValue) {
            setValue(value)
        }
    }, [value, inputValue]);
  const inputChange = (value) => {
    setValue(value);
    props.onChange(value);
  };
  const uploadProps = {
    customRequest: (info) => {
      const formData = new FormData();
      formData.append('file', info.file);
      uploadFileApi({
          host: schema.host,
          method: schema.method,
          formData,
          onePidSize: true,
          callback: (res) => inputChange(res.body.url),
      });
    },
  };
  const ref = useRef();
  return (
    <div className='naruse-template-content-upload-picture' >
      <Upload {...uploadProps} fileList={[]}>
        <Button className="upload-picture-part">
          <svg viewBox="64 64 896 896" focusable="false" className="upload-picture-part-icon" data-icon="upload" fill="currentColor" aria-hidden="true"><path d="M400 317.7h73.9V656c0 4.4 3.6 8 8 8h60c4.4 0 8-3.6 8-8V317.7H624c6.7 0 10.4-7.7 6.3-12.9L518.3 163a8 8 0 0 0-12.6 0l-112 141.7c-4.1 5.3-.4 13 6.3 13zM878 626h-60c-4.4 0-8 3.6-8 8v154H214V634c0-4.4-3.6-8-8-8h-60c-4.4 0-8 3.6-8 8v198c0 17.7 14.3 32 32 32h684c17.7 0 32-14.3 32-32V634c0-4.4-3.6-8-8-8z"></path></svg>
          上传图片
        </Button>
      </Upload>
      <Input ref={ref} value={inputValue} onChange={e => inputChange(e.target.value)} />

      <Popover getPopupContainer={(res) => res} content={<img style={{ maxWidth: '420px', maxHeight: '420px' }} src={inputValue} />} trigger="hover">
        <Button className="naruse-template-content-preview-picture-btn"> 预览 </Button>
      </Popover>
    </div>
  );
}

function App(props) {
  const { getForm = () => { } } = props;
  const form = useForm();
  getForm(form);
  ele = props.ele;
  if (!props.schema) return null;
  return <FormRender {...props} form={form} widgets={{ title: TitleAndDescription, image: UploadAndImage }} />
}

export default App
