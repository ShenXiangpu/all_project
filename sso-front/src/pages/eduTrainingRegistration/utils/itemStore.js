import React from "react"
import { Button, Cascader, Checkbox, DatePicker, Input, InputNumber, Radio, Select, Slider, Switch, TreeSelect, Upload } from "antd"
import { UploadOutlined } from '@ant-design/icons'



const antdItemStore = {
    name: {
        type: 'name',
        StandardInput: Input,
        configs: {
            itemProps: {
                name: 'name',
                label: '姓名',
                initialValue: '',
                rules: [{ required: true, message: '请输入姓名！' }],
            },
            inputProps: {
                disabled: false,
                placeholder: '请输入姓名！',
            },
        },
    },
    phone: {
        type: 'phone',
        StandardInput: Input,
        configs: {
            itemProps: {
                name: 'phone',
                label: '手机号',
                initialValue: '',
                rules: [{ required: true, message: '请输入手机号！' }],
            },
            inputProps: {
                disabled: false,
                maxLength: 11,
                placeholder: '请输入手机号！',
            },
        },
    },
    email: {
        type: 'email',
        StandardInput: Input,
        configs: {
            itemProps: {
                name: 'email',
                label: '邮箱',
                initialValue: '',
                rules: [{ required: true, message: '请输入邮箱！' }],
            },
            inputProps: {
                disabled: false,
                placeholder: '请输入邮箱！',
            },
        },
    },
    dempt: {
        type: 'dempt',
        StandardInput: Input,
        configs: {
            itemProps: {
                name: 'dempt',
                label: '公司/学校',
                initialValue: '',
                rules: [{ required: true, message: '请输入公司/学校！' }],
            },
            inputProps: {
                disabled: false,
                placeholder: '请输入公司/学校！',
            },
        },
    },
    team: {
        type: 'team',
        StandardInput: Input,
        configs: {
            itemProps: {
                name: 'team',
                label: '部门/学院',
                initialValue: '',
                rules: [{ required: true, message: '请输入部门/学院！' }],
            },
            inputProps: {
                disabled: false,
                placeholder: '请输入部门/学院！',
            },
        },
    },
    prof: {
        type: 'prof',
        StandardInput: Input,
        configs: {
            itemProps: {
                name: 'prof',
                label: '职位/专业',
                initialValue: '',
                rules: [{ required: true, message: '请输入职位/专业！' }],
            },
            inputProps: {
                disabled: false,
                placeholder: '请输入职位/专业！',
            },
        },
    },
    workYears: {
        type: 'workYears',
        StandardInput: Input,
        configs: {
            itemProps: {
                name: 'workYears',
                label: '工作年限/在校年级',
                initialValue: '',
                rules: [{ required: true, message: '请输入工作年限/在校年级！' }],
            },
            inputProps: {
                disabled: false,
                placeholder: '请输入工作年限/在校年级！',
            },
        },
    },
    booksAddress: {
        type: 'booksAddress',
        StandardInput: Input,
        configs: {
            itemProps: {
                name: 'booksAddress',
                label: '教材邮寄地址',
                initialValue: '',
                rules: [{ required: true, message: '请输入教材邮寄地址！' }],
            },
            inputProps: {
                disabled: false,
                placeholder: '请输入教材邮寄地址！',
            },
        },
    },
    getTipsType: {
        type: 'getTipsType',
        StandardInput: Radio.Group,
        configs: {
            itemProps: {
                name: 'radioGroup',
                label: '是否已缴费',
                initialValue: undefined,
                rules: [{ required: true, message: '请选择！' }],
            },
            inputProps: {
                disabled: false,
                options: [{ label: '是', value: '是' }, { label: '否', value: '否' }],
            },
        },
    },
    pushdatePicker: {
        type: 'pushdatePicker',
        StandardInput: DatePicker,
        configs: {
            itemProps: {
                name: 'datePicker',
                label: '提交时间',
                rules: [{ required: true, message: '请选择日期！' }],
            },
            inputProps: {
                disabled: false,
                placeholder: '请选择',
            },
        },
    },
    input: {
        type: 'input',
        StandardInput: Input,
        configs: {
            itemProps: {
                name: 'input',
                label: '自定义',
                initialValue: '',
                rules: [{ required: true, message: '请输入！' }],
            },
            inputProps: {
                disabled: false,
                placeholder: '请输入！',
            },
        },
    },

    charges: {
        type: 'charges',
        StandardInput: Input.TextArea,
        configs: {
            itemProps: {
                name: 'charges',
                label: '收费标准',
                initialValue: undefined,
                rules: [{ required: false, message: '' }],
            },
            inputProps: {
                disabled: true,
                rows: 8,
                placeholder: '1.标准学费1600/人;2.学费早鸟价1200元/人，即日起至10月11日前缴费可享受，仅限10个名额，先到先得...',
            },
        },
    },
    inputTexArea: {
        type: 'inputTexArea',
        StandardInput: Input.TextArea,
        configs: {
            itemProps: {
                name: 'inputTexArea',
                label: '多行文本',
                initialValue: undefined,
                rules: [{ required: true, message: '请输入' }],
            },
            inputProps: {
                disabled: false,
                placeholder: '请输入',
            },
        },
    },
    checkboxGroup: {
        type: 'checkboxGroup',
        StandardInput: Checkbox.Group,
        configs: {
            itemProps: {
                name: 'checkboxGroup',
                label: '多选',
                initialValue: [],
                rules: [{ required: true, message: '请选择！' }],
            },
            inputProps: {
                disabled: false,
                options: [{ label: 'A', value: 'A' }, { label: 'B', value: 'B' }],
            },
        },
    },

    radioGroup: {
        type: 'radioGroup',
        StandardInput: Radio.Group,
        configs: {
            itemProps: {
                name: 'radioGroup',
                label: '单选',
                initialValue: undefined,
                rules: [{ required: true, message: '请选择！' }],
            },
            inputProps: {
                disabled: false,
                options: [{ label: 'A', value: 1 }, { label: 'B', value: 2 }],
            },
        },
    },
    datePicker: {
        type: 'datePicker',
        StandardInput: DatePicker,
        configs: {
            itemProps: {
                name: 'datePicker',
                label: '日期',
                rules: [{ required: true, message: '请选择日期！' }],
            },
            inputProps: {
                disabled: false,
                placeholder: '请选择',
            },
        },
    },
}


export const leggoItemStore = {
    total: { ...antdItemStore },
    antd: antdItemStore,
}