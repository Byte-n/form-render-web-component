import FormRender, { useForm } from 'form-render';
import { Button, Input, message, Popover, Tooltip, Upload } from 'antd';
import ConfigProvider from 'antd/es/config-provider';
import React, { useEffect, useRef, useState } from 'react';
import ReactDom from 'react-dom';
import andStyle from './antd.min.css?raw';
import indexStyle from './xrender.css?raw';
import { StyleProvider } from '@ant-design/cssinjs';

// const err = console.error;
// console.error = function (...args) {
//     if (args.join(' ').indexOf('React does not recognize the') !== -1) return;
//     err(...args);
// }

function TitleAndDescription ({ schema }) {
    const { titleValue, titleDescription } = schema;
    const ref = useRef();
    return <Tooltip placement="topLeft" title={titleDescription}>
        <div ref={ref}>{titleValue}</div>
    </Tooltip>;
}

function UploadAndImage (props) {
    const { value, schema } = props;
    const [inputValue, setValue] = useState(value);
    useEffect(() => {
        if (value !== inputValue) {
            setValue(value);
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
        <div className="naruse-template-content-upload-picture">
            <Upload {...uploadProps} fileList={[]}>
                <Button className="upload-picture-part">
                    <svg viewBox="64 64 896 896" focusable="false" className="upload-picture-part-icon"
                         data-icon="upload" fill="currentColor" aria-hidden="true">
                        <path
                            d="M400 317.7h73.9V656c0 4.4 3.6 8 8 8h60c4.4 0 8-3.6 8-8V317.7H624c6.7 0 10.4-7.7 6.3-12.9L518.3 163a8 8 0 0 0-12.6 0l-112 141.7c-4.1 5.3-.4 13 6.3 13zM878 626h-60c-4.4 0-8 3.6-8 8v154H214V634c0-4.4-3.6-8-8-8h-60c-4.4 0-8 3.6-8 8v198c0 17.7 14.3 32 32 32h684c17.7 0 32-14.3 32-32V634c0-4.4-3.6-8-8-8z"></path>
                    </svg>
                    上传图片
                </Button>
            </Upload>
            <Input ref={ref} value={inputValue} onChange={e => inputChange(e.target.value)}/>

            <Popover getPopupContainer={(res) => res}
                     content={<img style={{ maxWidth: '420px', maxHeight: '420px' }} src={inputValue}/>}
                     trigger="hover">
                <Button className="naruse-template-content-preview-picture-btn"> 预览 </Button>
            </Popover>
        </div>
    );
}

/**
 * 上传文件|图片接口
 * requestUrl:请求地址
 * formData:上传的数据使用new FormData();的格式
 * onePidSize:创意的推广位尺寸是否仅有一个
 * callback:成功回调
 * errorCallback:失败回调
 */
function uploadFileApi ({ host, method, formData, onePidSize, callback, errorCallback }) {
    fetch(host + method, {
        method: 'POST',
        credentials: 'include',
        body: formData,
    }).then(res => res.json())
        .then((response) => {
            if (response.code == 200 && onePidSize == true) {
                message.success({
                    content: '上传成功',
                    duration: 2,
                    className: 'upload-img-alert-message',
                    onClose: () => document.getElementsByClassName('upload-img-alert-message')[0].remove(),
                });
                return callback(response);
            } else {
                message.error({
                    content: '上传失败',
                    duration: 2,
                    className: 'upload-img-alert-message',
                    onClose: () => document.getElementsByClassName('upload-img-alert-message')[0].remove(),
                });
                return errorCallback(response);
            }
        })
        .catch((error) => {
            message.error({
                content: '上传失败',
                duration: 2,
                className: 'upload-img-alert-message',
                onClose: () => document.getElementsByClassName('upload-img-alert-message')[0].remove(),
            });
            return errorCallback(error);
        });
}

function XRender (props) {
    const { getForm, onMount, ...other } = props;
    const form = useForm();
    useEffect(() => {
        getForm(form);
        console.log('getForm', form);
    }, [form, getForm]);
    return <FormRender {...other} form={form} widgets={{ title: TitleAndDescription, image: UploadAndImage }}/>;
}


// 使用shadow dom 进行样式隔离
customElements.get('form-render')
|| customElements.define('form-render', class extends HTMLElement {
    constructor () {
        super();
        this.shadow = this.attachShadow({
            mode: 'open',
        });
        // 创建样式
        this.appendStyle(andStyle);
        this.appendStyle(indexStyle);
        // 创建根节点
        this.root = document.createElement('div');
        this.shadow.appendChild(this.root);
        this.mount();
    }

    appendStyle (styleInner) {
        const styleElement = document.createElement('style');
        styleElement.innerHTML = styleInner;
        this.shadow.appendChild(styleElement);
    }

    mount () {
        this.schemaAttribute = this.getAttribute('schema');
        this.schema = JSON.parse(this.schemaAttribute);
        if (!this.schema) return;
        const getForm = (f) => this.form = f;
        const rt = ReactDom.createRoot(this.root);
        this.uninstall = () => {
            rt.unmount();
            this.uninstall = null;
        };

        rt.render(
            <ConfigProvider
                getTargetContainer={() => this.shadow}
                getPopupContainer={() => this.shadow}
            >
                <StyleProvider
                    container={this.shadow}
                >
                    <XRender
                        getForm={getForm}
                        schema={this.schema}
                        onMount={() => this.dispatchEvent(new CustomEvent('onMount'))}
                        watch={{
                            // 监听 watch, 向外派发 自定义 事件。
                            // '#': () => {} 等同于 onValuesChange
                            '#': (allValues, changedValues) => {
                                this.dispatchEvent(new CustomEvent('onValuesChange', {
                                    detail: {
                                        allValues,
                                        changedValues,
                                    },
                                }));
                            },
                        }}
                    />
                </StyleProvider>
            </ConfigProvider>
        );
    }

    attributeChangedCallback (name) {
        if (name === 'schema' && this.schemaAttribute !== this.getAttribute('schema')) {
            this.uninstall && this.uninstall();
            this.mount();
        }
    }

    disconnectedCallback () {
        this.uninstall && this.uninstall();
    }

    static get observedAttributes () {
        return ['schema'];
    }
});
