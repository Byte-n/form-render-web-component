/** 复杂的 xrender schema */
export default {
    "type": "object",
    "properties": {
        "contentMaxWidth": {
            "key": "contentMaxWidth",
            "title": "内容图片的最大宽度",
            "tooltip": "内容图片的最大宽度、非小红书有效，小于等于0，则视为无效",
            "default": -1,
            "type": "number"
        },
        "multiShopConfigs": {
            "key": "multiShopConfigs",
            "name": "根据平台、会员版本指定配置项",
            "tooltip": "根据平台、会员版本指定配置项",
            "type": "array",
            "widget": "tabList",
            "required": true,
            "min": 1,
            "items": {
                "type": "object",
                "properties": {
                    "platform": {
                        "key": "platform",
                        "required": true,
                        "title": "{{ '店铺平台 【' + rootValue.platform + '】' }}",
                        "widget": "select",
                        "type": "string",
                        "enum": [
                            "全部",
                            "淘宝",
                            "1688",
                            "京东",
                            "快手",
                            "抖店",
                            "拼多多",
                            "微信小商店",
                            "微信视频号小店",
                            "小红书",
                            "必要",
                            "有赞",
                            "爱用"
                        ],
                        "default": "全部"
                    },
                    "vipFlag": {
                        "key": "vipFlag",
                        "allowClear": true,
                        "title": "会员版本VipFlag(多个用英文逗号分隔，例如'1,2,5')",
                        "tooltip": "多个用英文逗号分隔，例如'1,2,5',不填则视为所有版本",
                        "type": "string"
                    },
                    "configValue": {
                        "key": "configValue",
                        "required": true,
                        "type": "object",
                        "title": "{{ '广告配置项 【' + rootValue.platform + '】(' + (!rootValue.vipFlag || '所有版本' ) + ')'}}",
                        "properties": {
                            "contentImage": {
                                "key": "contentImage",
                                "title": "内容图片",
                                "type": "string:image",
                                "require": true,
                                "default": "http://q.aiyongtech.com/ad/images/5reY5a6d_1704686739106.png"
                            },
                            "isNeedCustomizationBtn": {
                                "key": "isNeedCustomizationBtn",
                                "title": "是否需要自定义按钮",
                                "tooltip": "开启开关后可自定义按钮热区大小、位置、跳转地址",
                                "default": false,
                                "type": "boolean",
                                "widget": "switch"
                            },
                            "customizationBtn": {
                                "key": "customizationBtn",
                                "title": "自定义热区",
                                "tooltip": "热区大小和距离及跳转订购链接",
                                "type": "array",
                                "hidden": "{{ !rootValue.configValue?.isNeedCustomizationBtn || rootValue.platform == '小红书' }}",
                                "items": {
                                    "type": "object",
                                    "properties": {
                                        "clickPart": {
                                            "key": "clickPart",
                                            "title": "热区范围",
                                            "tooltip": "填写格式：热区宽*热区高&左侧边距*顶部边距",
                                            "type": "string",
                                            "default": "",
                                            "require": true
                                        },
                                        "goWhere": {
                                            "key": "goWhere",
                                            "title": "跳转功能",
                                            "tooltip": "支持跳转pid、功能页面、订购链接、客服、单纯的关闭弹窗",
                                            "widget": "select",
                                            "type": "string",
                                            "enum": [
                                                "goPid",
                                                "goPage",
                                                "goLink",
                                                "goService",
                                                "close"
                                            ],
                                            "enumNames": [
                                                "跳转pid",
                                                "跳转功能页",
                                                "仅跳转链接",
                                                "仅客服",
                                                "仅关闭"
                                            ],
                                            "default": "goLink",
                                            "require": true
                                        },
                                        "jumpLink": {
                                            "key": "jumpLink",
                                            "title": "跳转的目标（链接、pid、路由）",
                                            "tooltip": "按照【选择跳转功能】选项的选择填写对应的跳转链接（路径）",
                                            "type": "string",
                                            "hidden": "{{ rootValue.goWhere === 'goService' }}",
                                            "default": ""
                                        },
                                        "serviceTalk": {
                                            "key": "serviceTalk",
                                            "title": "客服话术",
                                            "tooltip": "此处填写客服话术",
                                            "type": "string",
                                            "hidden": "{{ rootValue.goWhere !== 'goService' }}"
                                        }
                                    }
                                }
                            },
                            "customizationBtnXHS": {
                                "key": "customizationBtnXHS",
                                "title": "自定义热区",
                                "tooltip": "热区大小和距离及点击行为",
                                "type": "array",
                                "hidden": "{{ !rootValue.configValue?.isNeedCustomizationBtn || rootValue.platform != '小红书' }}",
                                "widget": "cardList",
                                "items": {
                                    "type": "object",
                                    "properties": {
                                        "clickPart": {
                                            "key": "clickPart",
                                            "title": "热区范围（二维码、SKU等素材的位置和大小）",
                                            "tooltip": "填写格式：热区宽*热区高&左侧边距*顶部边距",
                                            "type": "string",
                                            "default": ""
                                        },
                                        "goWhere": {
                                            "key": "goWhere",
                                            "title": "跳转功能",
                                            "tooltip": "支持跳转pid、功能页面、订购链接、客服、单纯的关闭弹窗",
                                            "widget": "radio",
                                            "type": "string",
                                            "enum": [
                                                "close",
                                                "payQRCode",
                                                "sku",
                                                "price",
                                                "userInfoTmpl",
                                                "showServiceAgreement"
                                            ],
                                            "enumNames": [
                                                "仅关闭",
                                                "支付二维码",
                                                "Sku按钮",
                                                "价格",
                                                "用户信息展示",
                                                "显示多店服务协议"
                                            ],
                                            "default": "payQRCode"
                                        },
                                        "sku": {
                                            "key": "sku",
                                            "title": "小红书Sku选择",
                                            "tooltip": "选择二维码对应的Sku",
                                            "widget": "radio",
                                            "type": "string",
                                            "enum": [
                                                "xhs_month",
                                                "xhs_year"
                                            ],
                                            "enumNames": [
                                                "小红书1月",
                                                "小红书1年"
                                            ],
                                            "default": "year",
                                            "hidden": "{{ rootValue.goWhere !== 'sku' }}"
                                        },
                                        "skuImage": {
                                            "key": "skuImage",
                                            "title": "Sku的图片",
                                            "tooltip": "选择二维码对应的Sku",
                                            "type": "string:image",
                                            "default": "",
                                            "hidden": "{{ rootValue.goWhere !== 'sku' }}"
                                        },
                                        "skuImageHover": {
                                            "key": "skuImageHover",
                                            "title": "Sku选中时的图片",
                                            "tooltip": "选择二维码对应的Sku",
                                            "type": "string:image",
                                            "default": "",
                                            "hidden": "{{ rootValue.goWhere !== 'sku' }}"
                                        },
                                        "priceImage": {
                                            "key": "priceImage",
                                            "title": "Sku选中时的价格对应图片",
                                            "tooltip": "Sku选中时的价格对应图片，当选择这个sku时，价格区域的图片就会替换为这个图片",
                                            "type": "string:image",
                                            "default": "",
                                            "hidden": "{{ rootValue.goWhere !== 'sku' }}"
                                        },
                                        "selected": {
                                            "key": "selected",
                                            "title": "默认选中",
                                            "tooltip": "设置为默认选中的sku。如果有多个【默认选中】开启，则仅第一个有效",
                                            "type": "boolean",
                                            "default": false,
                                            "widget": "switch",
                                            "hidden": "{{ rootValue.goWhere !== 'sku' }}"
                                        },
                                        "userInfoTmpl": {
                                            "key": "userInfoTmpl",
                                            "title": "用户信息展示模版",
                                            "tooltip": "占位符支持：{shopName}，例如：你的店铺叫{shopName} 最终会展示：你的店铺叫XXX",
                                            "type": "string",
                                            "default": "",
                                            "hidden": "{{ rootValue.goWhere !== 'userInfoTmpl' }}"
                                        }
                                    }
                                }
                            },
                            "goWhere": {
                                "key": "goWhere",
                                "title": "跳转功能",
                                "tooltip": "支持跳转pid、功能页面、订购链接、客服",
                                "widget": "select",
                                "type": "string",
                                "hidden": "{{ rootValue.configValue?.isNeedCustomizationBtn || rootValue.platform == '小红书' }}",
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
                                "default": "goLink",
                                "require": true
                            },
                            "jumpLink": {
                                "key": "jumpLink",
                                "title": "跳转的目标（链接、pid、路由）",
                                "tooltip": "按照【选择跳转功能】选项的选择填写对应的跳转链接（路径）",
                                "type": "string",
                                "hidden": "{{ rootValue.configValue?.isNeedCustomizationBtn || rootValue.configValue?.goWhere === 'goService' || rootValue.platform == '小红书' }}",
                                "default": ""
                            },
                            "serviceTalk": {
                                "key": "serviceTalk",
                                "name": "客服话术",
                                "tooltip": "此处填写客服话术",
                                "type": "string",
                                "hidden": "{{ rootValue.configValue?.isNeedCustomizationBtn || rootValue.configValue?.goWhere !== 'goService' || rootValue.platform == '小红书' }}",
                                "default": "",
                                "title": "客服话术"
                            },
                            "showReceipt": {
                                "key": "showReceipt",
                                "title": "是否显示支付回执",
                                "tooltip": "点击图片时，跳转的链接",
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
                                "tooltip": "宽*高，可自定义弹窗图片的大小",
                                "type": "string",
                                "default": "",
                                "hidden": "{{ !rootValue.configValue?.otherSettings }}",
                                "disabled": "{{ !rootValue.configValue?.otherSettings }}"
                            },
                            "imagePosition": {
                                "key": "imagePosition",
                                "title": "图片位置",
                                "tooltip": "图片位置（居中、居下、居上、居左、居右）",
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
                                "tooltip": "开启后关闭按钮将不再展示",
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
            "props": {
                "tabName": [
                    "{{ formData.multiShopConfigs?.[0]?.platform + '|' + formData.multiShopConfigs?.[0]?.vipFlag }}",
                    "{{ formData.multiShopConfigs?.[1]?.platform + '|' + formData.multiShopConfigs?.[1]?.vipFlag }}",
                    "{{ formData.multiShopConfigs?.[2]?.platform + '|' + formData.multiShopConfigs?.[2]?.vipFlag }}",
                    "{{ formData.multiShopConfigs?.[3]?.platform + '|' + formData.multiShopConfigs?.[3]?.vipFlag }}",
                    "{{ formData.multiShopConfigs?.[4]?.platform + '|' + formData.multiShopConfigs?.[4]?.vipFlag }}",
                    "{{ formData.multiShopConfigs?.[5]?.platform + '|' + formData.multiShopConfigs?.[5]?.vipFlag }}",
                    "{{ formData.multiShopConfigs?.[6]?.platform + '|' + formData.multiShopConfigs?.[6]?.vipFlag }}",
                    "{{ formData.multiShopConfigs?.[7]?.platform + '|' + formData.multiShopConfigs?.[7]?.vipFlag }}",
                    "{{ formData.multiShopConfigs?.[8]?.platform + '|' + formData.multiShopConfigs?.[8]?.vipFlag }}",
                    "{{ formData.multiShopConfigs?.[9]?.platform + '|' + formData.multiShopConfigs?.[9]?.vipFlag }}",
                    "{{ formData.multiShopConfigs?.[10]?.platform + '|' + formData.multiShopConfigs?.[10]?.vipFlag }}",
                    "{{ formData.multiShopConfigs?.[11]?.platform + '|' + formData.multiShopConfigs?.[11]?.vipFlag }}",
                    "{{ formData.multiShopConfigs?.[12]?.platform + '|' + formData.multiShopConfigs?.[12]?.vipFlag }}",
                    "{{ formData.multiShopConfigs?.[13]?.platform + '|' + formData.multiShopConfigs?.[13]?.vipFlag }}",
                    "{{ formData.multiShopConfigs?.[14]?.platform + '|' + formData.multiShopConfigs?.[14]?.vipFlag }}",
                    "{{ formData.multiShopConfigs?.[15]?.platform + '|' + formData.multiShopConfigs?.[15]?.vipFlag }}",
                    "{{ formData.multiShopConfigs?.[16]?.platform + '|' + formData.multiShopConfigs?.[16]?.vipFlag }}",
                    "{{ formData.multiShopConfigs?.[17]?.platform + '|' + formData.multiShopConfigs?.[17]?.vipFlag }}",
                    "{{ formData.multiShopConfigs?.[18]?.platform + '|' + formData.multiShopConfigs?.[18]?.vipFlag }}",
                    "{{ formData.multiShopConfigs?.[19]?.platform + '|' + formData.multiShopConfigs?.[19]?.vipFlag }}",
                    "{{ formData.multiShopConfigs?.[20]?.platform + '|' + formData.multiShopConfigs?.[20]?.vipFlag }}",
                    "{{ formData.multiShopConfigs?.[21]?.platform + '|' + formData.multiShopConfigs?.[21]?.vipFlag }}",
                    "{{ formData.multiShopConfigs?.[22]?.platform + '|' + formData.multiShopConfigs?.[22]?.vipFlag }}",
                    "{{ formData.multiShopConfigs?.[23]?.platform + '|' + formData.multiShopConfigs?.[23]?.vipFlag }}",
                    "{{ formData.multiShopConfigs?.[24]?.platform + '|' + formData.multiShopConfigs?.[24]?.vipFlag }}",
                    "{{ formData.multiShopConfigs?.[25]?.platform + '|' + formData.multiShopConfigs?.[25]?.vipFlag }}",
                    "{{ formData.multiShopConfigs?.[26]?.platform + '|' + formData.multiShopConfigs?.[26]?.vipFlag }}",
                    "{{ formData.multiShopConfigs?.[27]?.platform + '|' + formData.multiShopConfigs?.[27]?.vipFlag }}",
                    "{{ formData.multiShopConfigs?.[28]?.platform + '|' + formData.multiShopConfigs?.[28]?.vipFlag }}",
                    "{{ formData.multiShopConfigs?.[29]?.platform + '|' + formData.multiShopConfigs?.[29]?.vipFlag }}"
                ]
            },
            "default": [
                {
                    "platform": "淘宝",
                    "vipFlag": "0",
                    "configValue": {
                        "contentImage": "http://q.aiyongtech.com/ad/images/5reY5a6d_1704686739106.png",
                        "isNeedCustomizationBtn": true,
                        "customizationBtn": [
                            {
                                "clickPart": "0.302*0.149&0.169*0.795",
                                "goWhere": "goLink",
                                "jumpLink": "https://fuwu.taobao.com/ser/confirmOrder1.htm?commonParams=activityCode%3AACT_877021141_230925195659%3BagentId%3Afuwu.taobao.com%7Cmarketing-Order-0%3BmarketKey%3AFWSPP_MARKETING_URL%3BpromIds%3A%5B1009059013%5D&subParams=cycleNum%3A1%2CcycleUnit%3A2%2CitemCode%3AFW_GOODS-1827490-v2&sign=0C305CE8F1B96CFF3592B2B7043BEB16&spm=a313p.2841.ei5lud.1519255307331&short_name=Y4.lUwH5&app=chrome",
                                "serviceTalk": ""
                            },
                            {
                                "clickPart": "0.301*0.149&0.526*0.797",
                                "goWhere": "goLink",
                                "jumpLink": "https://fuwu.taobao.com/ser/confirmOrder1.htm?commonParams=activityCode%3AACT_877021141_230925195503%3BagentId%3Afuwu.taobao.com%7Cmarketing-Order-0%3BmarketKey%3AFWSPP_MARKETING_URL%3BpromIds%3A%5B1009059218%5D&subParams=cycleNum%3A12%2CcycleUnit%3A2%2CitemCode%3AFW_GOODS-1827490-v2&sign=27CF6DD91215235985357A69655D73B0&spm=a313p.2841.ei5lud.1519672632656&short_name=Y4.lToeg&app=chrome",
                                "serviceTalk": ""
                            }
                        ],
                        "showReceipt": true,
                        "otherSettings": false
                    }
                },
                {
                    "platform": "淘宝",
                    "vipFlag": "1",
                    "configValue": {
                        "contentImage": "http://q.aiyongtech.com/ad/images/5reY5a6dLTI%3D_1704686745414.png",
                        "isNeedCustomizationBtn": true,
                        "customizationBtn": [
                            {
                                "clickPart": "0.302*0.149&0.169*0.795",
                                "goWhere": "goLink",
                                "jumpLink": "https://fuwu.taobao.com/ser/confirmOrder1.htm?commonParams=activityCode%3AACT_877021141_230925195659%3BagentId%3Afuwu.taobao.com%7Cmarketing-Order-0%3BmarketKey%3AFWSPP_MARKETING_URL%3BpromIds%3A%5B1009059013%5D&subParams=cycleNum%3A1%2CcycleUnit%3A2%2CitemCode%3AFW_GOODS-1827490-v2&sign=0C305CE8F1B96CFF3592B2B7043BEB16&spm=a313p.2841.ei5lud.1519255307331&short_name=Y4.lUwH5&app=chrome"
                            },
                            {
                                "clickPart": "0.301*0.149&0.526*0.797",
                                "goWhere": "goLink",
                                "jumpLink": "https://fuwu.taobao.com/ser/confirmOrder1.htm?commonParams=activityCode%3AACT_877021141_230925195503%3BagentId%3Afuwu.taobao.com%7Cmarketing-Order-0%3BmarketKey%3AFWSPP_MARKETING_URL%3BpromIds%3A%5B1009059218%5D&subParams=cycleNum%3A12%2CcycleUnit%3A2%2CitemCode%3AFW_GOODS-1827490-v2&sign=27CF6DD91215235985357A69655D73B0&spm=a313p.2841.ei5lud.1519672632656&short_name=Y4.lToeg&app=chrome"
                            }
                        ],
                        "showReceipt": true,
                        "otherSettings": false
                    }
                },
                {
                    "platform": "快手",
                    "vipFlag": "5",
                    "configValue": {
                        "contentImage": "http://q.aiyongtech.com/ad/images/5b%2Br5omL_1704687325297.png",
                        "isNeedCustomizationBtn": true,
                        "customizationBtn": [
                            {
                                "clickPart": "0.302*0.149&0.169*0.795",
                                "goWhere": "goLink",
                                "jumpLink": "https://fuwu.kwaixiaodian.com/buy?serviceId=1543775353017&skuId=2680808921017&chargeByContract=false",
                                "serviceTalk": ""
                            },
                            {
                                "clickPart": "0.301*0.149&0.526*0.797",
                                "goWhere": "goLink",
                                "jumpLink": "https://fuwu.kwaixiaodian.com/buy?serviceId=1543775353017&skuId=2680808916017&chargeByContract=false",
                                "serviceTalk": ""
                            }
                        ],
                        "showReceipt": true,
                        "otherSettings": false
                    }
                },
                {
                    "platform": "快手",
                    "vipFlag": "1",
                    "configValue": {
                        "contentImage": "http://q.aiyongtech.com/ad/images/5b%2Br5omLLTI%3D_1704687331680.png",
                        "isNeedCustomizationBtn": true,
                        "customizationBtn": [
                            {
                                "clickPart": "0.302*0.149&0.169*0.795",
                                "goWhere": "goLink",
                                "jumpLink": "https://fuwu.kwaixiaodian.com/buy?serviceId=1543775353017&skuId=2680808921017&chargeByContract=false",
                                "serviceTalk": ""
                            },
                            {
                                "clickPart": "0.301*0.149&0.526*0.797",
                                "goWhere": "goLink",
                                "jumpLink": "https://fuwu.kwaixiaodian.com/buy?serviceId=1543775353017&skuId=2680808916017&chargeByContract=false",
                                "serviceTalk": ""
                            }
                        ],
                        "showReceipt": true,
                        "otherSettings": false
                    }
                },
                {
                    "platform": "1688",
                    "vipFlag": "0",
                    "configValue": {
                        "contentImage": "http://q.aiyongtech.com/ad/images/MTY4OA%3D%3D_1704687767578.png",
                        "isNeedCustomizationBtn": true,
                        "customizationBtn": [
                            {
                                "clickPart": "0.302*0.149&0.169*0.795",
                                "goWhere": "goLink",
                                "jumpLink": "https://pc.1688.com/product/sod/confirm/sodCommon.htm?productCode=yeU%2Fso9Wdxi8HDvBQJyqx%2FJsikOhtzcRUW%2Batc4hUc8%3D",
                                "serviceTalk": ""
                            },
                            {
                                "clickPart": "0.301*0.149&0.526*0.797",
                                "goWhere": "goLink",
                                "jumpLink": "https://pc.1688.com/product/sod/confirm/sodCommon.htm?productCode=mciZJVD46g4GLeqv5AlvmHRHP%2Bfz6OZQWRJ0JNiZpJs%3D",
                                "serviceTalk": ""
                            }
                        ],
                        "showReceipt": true,
                        "otherSettings": false
                    }
                },
                {
                    "platform": "1688",
                    "vipFlag": "1",
                    "configValue": {
                        "contentImage": "http://q.aiyongtech.com/ad/images/MTY4OC0y_1704687772170.png",
                        "isNeedCustomizationBtn": true,
                        "customizationBtn": [
                            {
                                "clickPart": "0.302*0.149&0.169*0.795",
                                "goWhere": "goLink",
                                "jumpLink": "https://pc.1688.com/product/sod/confirm/sodCommon.htm?productCode=yeU%2Fso9Wdxi8HDvBQJyqx%2FJsikOhtzcRUW%2Batc4hUc8%3D",
                                "serviceTalk": ""
                            },
                            {
                                "clickPart": "0.301*0.149&0.526*0.797",
                                "goWhere": "goLink",
                                "jumpLink": "https://pc.1688.com/product/sod/confirm/sodCommon.htm?productCode=mciZJVD46g4GLeqv5AlvmHRHP%2Bfz6OZQWRJ0JNiZpJs%3D",
                                "serviceTalk": ""
                            }
                        ],
                        "showReceipt": true,
                        "otherSettings": false
                    }
                },
                {
                    "platform": "抖店",
                    "vipFlag": "0,5",
                    "configValue": {
                        "contentImage": "http://q.aiyongtech.com/ad/images/5oqW5bqX_1704694090958.png",
                        "isNeedCustomizationBtn": true,
                        "customizationBtn": [
                            {
                                "clickPart": "0.302*0.149&0.169*0.795",
                                "goWhere": "goLink",
                                "jumpLink": "https://fuwu.jinritemai.com/detail/purchase?btm_from=a0254.b7122.c9438.c9440&btm_ppre=a0254.b7122.c9438.c9440&btm_pre=a0254.b3624.c1160.d14259&from=ddpc.service.recommend&page_from=1h6dsr0ra_b3624&pre_show_id=dccbad56-eed2-4baa-b02e-6ec6412bc6f4&service_id=20259&sku_id=7866&trace_type=1",
                                "serviceTalk": ""
                            },
                            {
                                "clickPart": "0.301*0.149&0.526*0.797",
                                "goWhere": "goLink",
                                "jumpLink": "https://fuwu.jinritemai.com/detail/purchase?btm_from=a0254.b9825.c7579.d6976_0&btm_ppre=a0254.b9825.c7579.d6976_0&btm_pre=a0254.b3624.c1160.d14259&from=ddpc.service.recommend&page_from=1h6dsr0ra_b3624&pre_show_id=76471b83-8dba-4c96-8c53-791b487539a7&searchKey=爱用交易&service_id=20259&sku_id=7869&trace_type=1",
                                "serviceTalk": ""
                            }
                        ],
                        "showReceipt": true,
                        "otherSettings": false
                    }
                },
                {
                    "platform": "抖店",
                    "vipFlag": "1",
                    "configValue": {
                        "contentImage": "http://q.aiyongtech.com/ad/images/5oqW5bqXLTI%3D_1704694097390.png",
                        "isNeedCustomizationBtn": true,
                        "customizationBtn": [
                            {
                                "clickPart": "0.302*0.149&0.169*0.795",
                                "goWhere": "goLink",
                                "jumpLink": "https://fuwu.jinritemai.com/detail/purchase?btm_from=a0254.b7122.c9438.c9440&btm_ppre=a0254.b7122.c9438.c9440&btm_pre=a0254.b3624.c1160.d14259&from=ddpc.service.recommend&page_from=1h6dsr0ra_b3624&pre_show_id=dccbad56-eed2-4baa-b02e-6ec6412bc6f4&service_id=20259&sku_id=7866&trace_type=1",
                                "serviceTalk": ""
                            },
                            {
                                "clickPart": "0.301*0.149&0.526*0.797",
                                "goWhere": "goLink",
                                "jumpLink": "https://fuwu.jinritemai.com/detail/purchase?btm_from=a0254.b9825.c7579.d6976_0&btm_ppre=a0254.b9825.c7579.d6976_0&btm_pre=a0254.b3624.c1160.d14259&from=ddpc.service.recommend&page_from=1h6dsr0ra_b3624&pre_show_id=76471b83-8dba-4c96-8c53-791b487539a7&searchKey=爱用交易&service_id=20259&sku_id=7869&trace_type=1",
                                "serviceTalk": ""
                            }
                        ],
                        "showReceipt": true,
                        "otherSettings": false
                    }
                },
                {
                    "platform": "拼多多",
                    "vipFlag": "0",
                    "configValue": {
                        "contentImage": "http://q.aiyongtech.com/ad/images/5ou85aSa5aSa_1704694382945.pn",
                        "isNeedCustomizationBtn": true,
                        "customizationBtn": [
                            {
                                "clickPart": "0.302*0.149&0.169*0.795",
                                "goWhere": "goLink",
                                "jumpLink": "https://fuwu.pinduoduo.com/service-market/order-confirm?skuId=5721&activityId=&prizeId=&detailId=348&serviceType=1&pageReferrer=https%3A%2F%2Ffuwu.pinduoduo.com%2Fservice-market%2Fservice-list%3FsearchKey%3D%25E7%2588%25B1%25E7%2594%25A8%25E5%258F%258A%25E5%2593%25A6%25E5%2595%258A%25E5%25B7%25B2%26isCV%3Dfalse%26from%3Dsearch",
                                "serviceTalk": ""
                            },
                            {
                                "clickPart": "0.301*0.149&0.526*0.797",
                                "goWhere": "goLink",
                                "jumpLink": "https://fuwu.pinduoduo.com/service-market/order-confirm?skuId=5724&activityId=&prizeId=&detailId=348&serviceType=1&pageReferrer=https%3A%2F%2Ffuwu.pinduoduo.com%2Fservice-market%2Fservice-list%3FsearchKey%3D%25E7%2588%25B1%25E7%2594%25A8%25E4%25BA%25A4%25E6%2598%2593%26isCV%3Dfalse%26from%3Dsearch",
                                "serviceTalk": ""
                            }
                        ],
                        "showReceipt": true,
                        "otherSettings": false
                    }
                },
                {
                    "platform": "拼多多",
                    "vipFlag": "1",
                    "configValue": {
                        "contentImage": "http://q.aiyongtech.com/ad/images/5ou85aSa5aSaLTI%3D_1704694387954.png",
                        "isNeedCustomizationBtn": true,
                        "customizationBtn": [
                            {
                                "clickPart": "0.302*0.149&0.169*0.795",
                                "goWhere": "goLink",
                                "jumpLink": "https://fuwu.pinduoduo.com/service-market/order-confirm?skuId=5721&activityId=&prizeId=&detailId=348&serviceType=1&pageReferrer=https%3A%2F%2Ffuwu.pinduoduo.com%2Fservice-market%2Fservice-list%3FsearchKey%3D%25E7%2588%25B1%25E7%2594%25A8%25E5%258F%258A%25E5%2593%25A6%25E5%2595%258A%25E5%25B7%25B2%26isCV%3Dfalse%26from%3Dsearch",
                                "serviceTalk": ""
                            },
                            {
                                "clickPart": "0.301*0.149&0.526*0.797",
                                "goWhere": "goLink",
                                "jumpLink": "https://fuwu.pinduoduo.com/service-market/order-confirm?skuId=5724&activityId=&prizeId=&detailId=348&serviceType=1&pageReferrer=https%3A%2F%2Ffuwu.pinduoduo.com%2Fservice-market%2Fservice-list%3FsearchKey%3D%25E7%2588%25B1%25E7%2594%25A8%25E4%25BA%25A4%25E6%2598%2593%26isCV%3Dfalse%26from%3Dsearch",
                                "serviceTalk": ""
                            }
                        ],
                        "showReceipt": true,
                        "otherSettings": false
                    }
                },
                {
                    "platform": "微信视频号小店",
                    "vipFlag": "0",
                    "configValue": {
                        "contentImage": "http://q.aiyongtech.com/ad/images/6KeG6aKR5Y%2B3_1704694455901.png",
                        "isNeedCustomizationBtn": true,
                        "customizationBtn": [
                            {
                                "clickPart": "0.302*0.149&0.169*0.795",
                                "goWhere": "goLink",
                                "jumpLink": "https://channels.weixin.qq.com/shop/serviceMarket/details?serviceId=2558931759946514438",
                                "serviceTalk": ""
                            },
                            {
                                "clickPart": "0.301*0.149&0.526*0.797",
                                "goWhere": "goLink",
                                "jumpLink": "https://channels.weixin.qq.com/shop/serviceMarket/details?serviceId=2558931759946514438",
                                "serviceTalk": ""
                            }
                        ],
                        "showReceipt": true,
                        "otherSettings": false
                    }
                },
                {
                    "platform": "微信视频号小店",
                    "vipFlag": "1",
                    "configValue": {
                        "contentImage": "http://q.aiyongtech.com/ad/images/6KeG6aKR5Y%2B3LTI%3D_1704694461251.png",
                        "isNeedCustomizationBtn": true,
                        "customizationBtn": [
                            {
                                "clickPart": "0.302*0.149&0.169*0.795",
                                "goWhere": "goLink",
                                "jumpLink": "https://channels.weixin.qq.com/shop/serviceMarket/details?serviceId=2558931759946514438",
                                "serviceTalk": ""
                            },
                            {
                                "clickPart": "0.301*0.149&0.526*0.797",
                                "goWhere": "goLink",
                                "jumpLink": "https://channels.weixin.qq.com/shop/serviceMarket/details?serviceId=2558931759946514438",
                                "serviceTalk": ""
                            }
                        ],
                        "showReceipt": true,
                        "otherSettings": false
                    }
                },
                {
                    "platform": "小红书",
                    "vipFlag": "",
                    "configValue": {
                        "contentImage": "http://q.aiyongtech.com/ad/images/MjAyNDAxMjktMjAwODE0_1706530149712.png",
                        "isNeedCustomizationBtn": false,
                        "customizationBtnXHS": [
                            {
                                "clickPart": "0.901*0.047&0.037*0.152",
                                "goWhere": "userInfoTmpl",
                                "userInfoTmpl": "您的小红书店铺「{shopName}」当前为免费版，你需要向服务市场支付接口费用才能使用此功能。"
                            },
                            {
                                "clickPart": "0.167*0.223&0.416*0.621",
                                "goWhere": "payQRCode"
                            },
                            {
                                "clickPart": "0.176*0.056&0.633*0.855",
                                "goWhere": "price"
                            },
                            {
                                "clickPart": "0.314*0.28&0.163*0.246",
                                "goWhere": "sku",
                                "sku": "xhs_month",
                                "skuImage": "http://q.aiyongtech.com/ad/images/5a655ZmoIDU2NQ%3D%3D_1697456035717.png",
                                "skuImageHover": "http://q.aiyongtech.com/ad/images/5a655ZmoIDU2Nw%3D%3D_1697456054191.png",
                                "priceImage": "http://q.aiyongtech.com/ad/images/5a655ZmoIDU1OA%3D%3D_1697456111722.png",
                                "selected": false
                            },
                            {
                                "clickPart": "0.312*0.276&0.526*0.246",
                                "goWhere": "sku",
                                "sku": "xhs_year",
                                "skuImage": "http://q.aiyongtech.com/ad/images/5a655ZmoIDU2Ng%3D%3D_1697456068078.png",
                                "skuImageHover": "http://q.aiyongtech.com/ad/images/5a655ZmoIDU2Mw%3D%3D_1697456073595.png",
                                "priceImage": "http://q.aiyongtech.com/ad/images/5a655ZmoIDU1OQ%3D%3D_1697456116204.png",
                                "selected": true
                            },
                            {
                                "clickPart": "0.044*0.061&0.955*0.000",
                                "goWhere": "close"
                            },
                            {
                                "clickPart": "0.136*0.035&0.485*0.941",
                                "goWhere": "showServiceAgreement"
                            }
                        ],
                        "goWhere": "goService",
                        "serviceTalk": " ",
                        "showReceipt": true,
                        "otherSettings": false
                    }
                }
            ],
            "title": "根据平台、会员版本指定配置项"
        },
        "msShopPlatforms": {
            "key": "msShopPlatforms",
            "name": "店铺平台",
            "tooltip": "针对那些店铺平台投放，多选 或 选择 全部",
            "default": "ALL",
            "type": "array",
            "props": {
                "options": [
                    {
                        "label": "全部",
                        "value": "ALL"
                    },
                    {
                        "label": "淘宝",
                        "value": "TAO"
                    },
                    {
                        "label": "1688",
                        "value": "DISTRIBUTE"
                    },
                    {
                        "label": "京东",
                        "value": "JD"
                    },
                    {
                        "label": "快手",
                        "value": "KWAISHOP"
                    },
                    {
                        "label": "抖店",
                        "value": "DOUDIAN"
                    },
                    {
                        "label": "拼多多",
                        "value": "PDD"
                    },
                    {
                        "label": "微信小商店",
                        "value": "WXSHOP"
                    },
                    {
                        "label": "微信视频号小店",
                        "value": "WXVIDEOSHOP"
                    },
                    {
                        "label": "小红书",
                        "value": "XHS"
                    },
                    {
                        "label": "必要",
                        "value": "BIYAO"
                    },
                    {
                        "label": "有赞",
                        "value": "YOUZAN"
                    },
                    {
                        "label": "爱用",
                        "value": "AIYONG"
                    }
                ],
                "direction": "row",
                "placeholder": "平台"
            },
            "widget": "checkboxes",
            "title": "店铺平台"
        },
        "msShopVipFlag": {
            "key": "msShopVipFlag",
            "name": "店铺会员版本",
            "tooltip": "针对投放的vip标识，不填则默认全部投放，投放多个vip标识请用逗号分隔",
            "type": "string",
            "default": "",
            "title": "店铺会员版本"
        },
        "msShopVipExpireTime": {
            "key": "msShopVipExpireTime",
            "name": "店铺会员到期时间",
            "tooltip": "针对付费版到期时间选择，不填则默认全部投放，填写规则：x~y，x是大天数，y小天数，比如向投放到期前15到30天的用户需要填：31~14，投放到期前0到14天的用户则需要填：15~-1",
            "type": "string",
            "default": "",
            "rules": [
                {
                    "pattern": "^([-+])?\\d+~+([-+])?\\d{1,4}$",
                    "message": "只允许填写：数字~数字"
                }
            ],
            "title": "店铺会员到期时间"
        }
    }
};

