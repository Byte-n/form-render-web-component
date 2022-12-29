import { message } from "antd";

/**
 * 上传文件|图片接口
 * requestUrl:请求地址
 * formData:上传的数据使用new FormData();的格式
 * onePidSize:创意的推广位尺寸是否仅有一个
 * callback:成功回调
 * errorCallback:失败回调
*/
export function uploadFileApi ({ host, method, formData, onePidSize, callback, errorCallback }) {
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
                    onClose: () => document.getElementsByClassName('upload-img-alert-message')[0].remove()
                });
                return callback(response);
            } else {
                message.error({
                    content: '上传失败',
                    duration: 2,
                    className: 'upload-img-alert-message',
                    onClose: () => document.getElementsByClassName('upload-img-alert-message')[0].remove()
                });
                return errorCallback(response);
            }
        })
        .catch((error) => {
            message.error({
                content: '上传失败',
                duration: 2,
                className: 'upload-img-alert-message',
                onClose: () => document.getElementsByClassName('upload-img-alert-message')[0].remove()
            });
            return errorCallback(error);
        });
}