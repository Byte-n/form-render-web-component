/** 复杂的 xrender schema */
export default {
    "type": "object",
    "properties": [
        {
            "key": "msShopPlatforms",
            "default": [
                "ALL"
            ],
            "type": "string",
            "title": "msShopPlatforms"
        },
        {
            "key": "msShopVipFlag",
            "default": "1",
            "type": "string",
            "title": "msShopVipFlag"
        },
        {
            "key": "msShopVipExpireTime",
            "default": "",
            "type": "string",
            "title": "msShopVipExpireTime"
        },
        {
            "key": "multiShopConfigs",
            "name": "为每个平台指定配置项",
            "type": "array",
            "min": 1,
            "items": {
                "type": "object",
                "properties": {
                    "platform": {
                        "key": "platform",
                        "title": "{{ '店铺平台 【' + rootValue.platform + '】' }}",
                        "widget": "radio",
                        "type": "string",
                        "enum": [
                            "小红书",
                            "淘宝",
                            "微信"
                        ],
                        "default": "淘宝"
                    },
                    "configValue": {
                        "key": "configValue",
                        "type": "object",
                        "title": "{{ '广告配置项 【' + rootValue.platform + '】' }}",
                        "description": "这是一个对象类型",
                        "properties": {
                            "contentImage": {
                                "key": "contentImage",
                                "title": "内容图片",
                                "type": "string:image",
                                "require": true,
                                "default": "http://q.aiyongtech.com/ad/images/bFFMUEp3VzBmeXliX0h6TkF0RE5BbGl3S05vWV9tYzBuMTREc2NkNHJnQXJBQV82MDBfNzIw_1673092504075.png"
                            },
                            "isNeedCustomizationBtn": {
                                "key": "isNeedCustomizationBtn",
                                "title": "是否需要自定义按钮",
                                "description": "开启开关后可自定义按钮热区大小、位置、跳转地址",
                                "default": false,
                                "type": "boolean",
                                "widget": "switch"
                            },
                            "customizationBtn": {
                                "key": "customizationBtn",
                                "title": "自定义热区",
                                "description": "Sku图片大小和距离及跳转订购链接",
                                "type": "array",
                                "hidden": "{{ !rootValue.configValue?.isNeedCustomizationBtn }}",
                                "widget": "cardList",
                                "default": [
                                    {
                                        "clickPart": "",
                                        "goWhere": "",
                                        "jumpLink": "goLink",
                                        "serviceTalk": ""
                                    }
                                ],
                                "items": {
                                    "type": "object",
                                    "properties": {
                                        "clickPart": {
                                            "key": "clickPart",
                                            "title": "热区范围",
                                            "description": "填写格式：热区宽*热区高&左侧边距*顶部边距",
                                            "type": "string"
                                        },
                                        "goWhere": {
                                            "key": "goWhere",
                                            "title": "跳转功能",
                                            "description": "支持跳转pid、功能页面、订购链接、客服、单纯的关闭弹窗",
                                            "widget": "radio",
                                            "type": "string",
                                            "enum": [
                                                "goPid",
                                                "goPage",
                                                "goLink",
                                                "goService"
                                            ],
                                            "enumNames": [
                                                "跳转pid",
                                                "跳转功能页",
                                                "仅跳转链接",
                                                "仅客服"
                                            ]
                                        },
                                        "jumpLink": {
                                            "key": "jumpLink",
                                            "title": "跳转的目标（链接、pid、路由）",
                                            "description": "按照【选择跳转功能】选项的选择填写对应的跳转链接（路径）",
                                            "type": "string",
                                            "hidden": "{{ rootValue.goWhere === 'goService' }}"
                                        },
                                        "serviceTalk": {
                                            "key": "serviceTalk",
                                            "title": "客服话术",
                                            "description": "此处填写客服话术",
                                            "type": "string",
                                            "hidden": "{{ rootValue.goWhere !== 'goService' }}"
                                        }
                                    }
                                }
                            },
                            "goWhere": {
                                "key": "goWhere",
                                "title": "跳转功能",
                                "description": "支持跳转pid、功能页面、订购链接、客服",
                                "widget": "radio",
                                "type": "string",
                                "hidden": "{{ rootValue.configValue?.isNeedCustomizationBtn }}",
                                "enum": [
                                    "goPid",
                                    "goPage",
                                    "goLink",
                                    "goService"
                                ],
                                "enumNames": [
                                    "跳转pid",
                                    "跳转功能页",
                                    "仅跳转链接",
                                    "仅客服"
                                ],
                                "default": "goLink"
                            },
                            "jumpLink": {
                                "key": "jumpLink",
                                "title": "跳转的目标（链接、pid、路由）",
                                "description": "按照【选择跳转功能】选项的选择填写对应的跳转链接（路径）",
                                "type": "string",
                                "hidden": "{{ rootValue.configValue?.isNeedCustomizationBtn || rootValue.configValue?.goWhere === 'goService' }}",
                                "default": "https://fuwu.taobao.com/ser/confirmOrder1.htm?commonParams=activityCode%3AACT_877021141_220301155305%3BagentId%3Afuwu.taobao.com%7Cmarketing-Order-0%3BmarketKey%3AFWSPP_MARKETING_URL%3BpromIds%3A%5B1007975540%5D&subParams=cycleNum%3A3%2CcycleUnit%3A2%2CitemCode%3AFW_GOODS-1827490-v2&sign=14A525439F81BBA0EA8C790607D732F9&spm=a313p.266.ei5lud.1373001755278&short_name=Y4.7rQrL&app=chrome"
                            },
                            "serviceTalk": {
                                "key": "serviceTalk",
                                "name": "客服话术",
                                "description": "此处填写客服话术",
                                "type": "string",
                                "hidden": "{{ rootValue.configValue?.isNeedCustomizationBtn || rootValue.configValue?.goWhere !== 'goService' }}",
                                "default": "",
                                "title": "客服话术"
                            },
                            "showReceipt": {
                                "key": "showReceipt",
                                "title": "是否显示支付回执",
                                "description": "点击图片时，跳转的链接",
                                "type": "boolean",
                                "default": true,
                                "widget": "switch"
                            },
                            "otherSettings": {
                                "key": "otherSettings",
                                "title": "是否配置其它设置",
                                "default": false,
                                "type": "boolean",
                                "widget": "switch"
                            },
                            "contentImageBackgroundColor": {
                                "key": "contentImageBackgroundColor",
                                "title": "背景颜色",
                                "format": "color",
                                "type": "string",
                                "default": "#000000b3",
                                "hidden": "{{ !rootValue.configValue?.otherSettings }}",
                                "disabled": "{{ !rootValue.configValue?.otherSettings }}"
                            },
                            "customPageSize": {
                                "key": "customPageSize",
                                "title": "自定义弹窗图片大小",
                                "description": "宽*高，可自定义弹窗图片的大小",
                                "type": "string",
                                "default": "",
                                "hidden": "{{ !rootValue.configValue?.otherSettings }}",
                                "disabled": "{{ !rootValue.configValue?.otherSettings }}"
                            },
                            "imagePosition": {
                                "key": "imagePosition",
                                "title": "图片位置（居中、居下、居上、居左、居右）",
                                "description": "图片位置（居中、居下、居上、居左、居右）",
                                "widget": "radio",
                                "type": "string",
                                "enum": [
                                    "center",
                                    "bottom",
                                    "top",
                                    "left",
                                    "right"
                                ],
                                "enumNames": [
                                    "居中",
                                    "居下",
                                    "居上",
                                    "居左",
                                    "居右"
                                ],
                                "default": "center",
                                "hidden": "{{ !rootValue.configValue?.otherSettings }}",
                                "disabled": "{{ !rootValue.configValue?.otherSettings }}"
                            },
                            "isNotDisplayCloseBtn": {
                                "key": "isNotDisplayCloseBtn",
                                "title": "禁止关闭按钮展示",
                                "description": "开启后关闭按钮将不再展示",
                                "type": "boolean",
                                "default": false,
                                "widget": "switch",
                                "hidden": "{{ !rootValue.configValue?.otherSettings }}",
                                "disabled": "{{ !rootValue.configValue?.otherSettings }}"
                            }
                        }
                    }
                }
            },
            "default": [
                {
                    "platform": "淘宝",
                    "configValue": {
                        "contentImage": "http://q.aiyongtech.com/ad/images/bFFMUEp3VzBmeXliX0h6TkF0RE5BbGl3S05vWV9tYzBuMTREc2NkNHJnQXJBQV82MDBfNzIw_1673092504075.png",
                        "isNeedCustomizationBtn": false,
                        "customizationBtn": [
                            {
                                "clickPart": "0.80*0.14&0.10*0.60",
                                "jumpLink": "http://local.aiyongtech.com:3000/",
                                "serviceTalk": "http://local.aiyongtech.com:3000/",
                                "goWhere": "goLink"
                            },
                            {
                                "clickPart": "0.80*0.13&0.10*0.77",
                                "jumpLink": "http://local.aiyongtech.com:3000/",
                                "serviceTalk": "http://local.aiyongtech.com:3000/",
                                "goWhere": "goLink"
                            }
                        ],
                        "goWhere": "goLink",
                        "jumpLink": "http://local.aiyongtech.com:3000/",
                        "serviceTalk": "serviceTalk",
                        "showReceipt": true,
                        "otherSettings": true,
                        "contentImageBackgroundColor": "#000000b3",
                        "customPageSize": "",
                        "imagePosition": "center",
                        "isNotDisplayCloseBtn": false
                    }
                }
            ],
            "title": "为每个平台指定配置项"
        },
        {
            "key": "vipflag",
            "name": "用户版本",
            "desc": "针对投放的vip标识，不填则默认全部投放，投放多个vip标识请用逗号分隔",
            "type": "string",
            "default": "",
            "title": "用户版本"
        },
        {
            "key": "subNick",
            "name": "主子账号",
            "desc": "针对投放的主子账号选择，不填则默认全部投放，填0仅投放主账号，填1仅投放子账号",
            "type": "string",
            "default": "",
            "title": "主子账号"
        },
        {
            "key": "vipExpireTime",
            "name": "到期时间",
            "desc": "针对付费版到期时间选择，不填则默认全部投放，填写规则：x~y，x是大天数，y小天数，比如向投放到期前15到30天的用户需要填：31~14，投放到期前0到14天的用户则需要填：15~-1",
            "type": "string",
            "default": "",
            "rules": [
                {
                    "pattern": "^([-+])?\\d+~+([-+])?\\d{1,4}$",
                    "message": "只允许填写：数字~数字"
                }
            ],
            "title": "到期时间"
        },
        {
            "key": "AdvancedOptionsSwitch",
            "name": "是否开启高级选项",
            "desc": "开启后有更多功能可以配置",
            "default": false,
            "type": "boolean",
            "widget": "switch",
            "title": "是否开启高级选项"
        },
        {
            "key": "ayVipLevel",
            "name": "爱用会员等级版本",
            "desc": "针对投放的爱用会员等级版本，不填则默认全部投放，投放多个标识请用逗号分隔,例如投放爱用会员等级3、5:3,5",
            "type": "string",
            "default": "",
            "hidden": "{{ !formData.AdvancedOptionsSwitch }}",
            "title": "爱用会员等级版本"
        },
        {
            "key": "operatingSystem",
            "name": "系统版本",
            "desc": "可选择仅投放的系统版本",
            "type": "string",
            "widget": "radio",
            "enum": [
                "allSystem",
                "android",
                "ios",
                "Windows",
                "Mac"
            ],
            "enumNames": [
                "所有端",
                "手机端-安卓",
                "手机端-iOS",
                "PC端-Windows",
                "PC端-Mac"
            ],
            "default": "allSystem",
            "hidden": "{{ !formData.AdvancedOptionsSwitch }}",
            "title": "系统版本"
        },
        {
            "key": "invertFilterUserGroup",
            "name": "反向过滤人群tag",
            "desc": "反向过滤人群tag,使用英文,进行分割",
            "default": [],
            "type": "array",
            "widget": "simpleList",
            "items": {
                "type": "object",
                "properties": {
                    "tag": {
                        "key": "tag",
                        "type": "string",
                        "title": "要过滤的人群tag名"
                    }
                }
            },
            "hidden": "{{ !formData.AdvancedOptionsSwitch }}",
            "title": "反向过滤人群tag"
        },
        {
            "key": "filterUserGroup",
            "name": "投放人群tag",
            "desc": "投放人群tag,使用英文,进行分割",
            "default": [],
            "type": "array",
            "widget": "simpleList",
            "items": {
                "type": "object",
                "properties": {
                    "tag": {
                        "key": "tag",
                        "type": "string",
                        "title": "要投放的人群tag名",
                        "required": true
                    }
                }
            },
            "hidden": "{{ !formData.AdvancedOptionsSwitch }}",
            "title": "投放人群tag"
        }
    ]
}

