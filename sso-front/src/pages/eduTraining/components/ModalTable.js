import React, { PureComponent } from 'react'
import { Table, Divider, Modal, Popconfirm, Button } from 'antd'
import { isEqual } from 'lodash';
import { router } from 'umi'
import { Item } from 'gg-editor';
const text1 = '请确认审核通过？';
const text2 = '确认驳回，立即填写审核意见？';

class ModalTable extends PureComponent {
    state = {
        columns: [],
        dataSource: [],
    }



    componentDidMount() {
        const { formFillList } = this.props
        this.refreshColumss(formFillList)
    }

    componentDidUpdate(prevProps) {
        const { formFillList } = this.props;
        const { formFillList: oldFormFillList } = prevProps;
        if (formFillList !== oldFormFillList) {
            this.refreshColumss(formFillList)
        }
    }

    refreshColumss = (formFillList) => {
        let columns = [];
        let columnsValues = [];
        if (formFillList && formFillList.length > 0) {
            // 1. 获取列，只需要一项循环(列固定)
            let formUserFillItemList = formFillList[0].formUserFillItemList
            formUserFillItemList.map(i => {
                let iItem = {
                    title: i.label,
                    dataIndex: i.frontFieldId,
                    key: i.frontFieldId,
                }
                columns.push(iItem)
            })

            //空值id
            let nullValues = [];

            // 2. 取值（循环取值 iItem 要放在 外层循环）
            formFillList.map(item => {
                let formUserFillItemList = item.formUserFillItemList
                let iItem = {}
                formUserFillItemList.map(i => {    
                    if(!i.userValue){
                        nullValues.push(i.frontFieldId)
                    }
                    iItem[i.frontFieldId] = i.userValue     
                })
                console.log('nullValues',nullValues);
                


                // 给列添加 额外的参数 用于判断 对应 columnItem
                iItem.status = item.status
                iItem.id = item.id
                columnsValues.push(iItem)
            })
            nullValues.map(n => {
                columns = columns.filter((c) => { return c.dataIndex !== n } )
            })
            console.log('columnsValues',columnsValues,columns);

            let columnItem = {
                title: '审核',
                dataIndex: 'status',
                key: 'status',
                render: (text, record) => {
                    if (isEqual(record.status, 0)) {
                        return (
                            <>
                                <Popconfirm
                                    placement="top"
                                    title={text1}
                                    onConfirm={() => this.confirm1(record.id)}
                                    onCancel={() => this.onCancel1()}
                                    okText="确定"
                                    cancelText="取消"
                                >
                                    <Button type='primary'>通过</Button>
                                </Popconfirm>
                                <Popconfirm
                                    placement="top"
                                    title={text2}
                                    onConfirm={() => this.confirm2(record.id)}
                                    onCancel={() => this.onCancel2()}
                                    okText="确定"
                                    cancelText="取消"
                                >
                                    <Button>驳回</Button>
                                </Popconfirm>

                            </>
                        )
                    } else if (isEqual(record.status, 1)) {
                        return (
                            <span>审核通过</span>
                        )
                    } else if (isEqual(record.status, 2)) {
                        return (
                            <span>驳回</span>
                        )
                    }
                }
            };
            columns.push(columnItem)
            this.setStateValue('columns', columns)
            this.setStateValue('dataSource', columnsValues)
        } else {
            this.setStateValue('columns', [])
            this.setStateValue('dataSource', [])
        }
    }

    confirm1 = (id) => {
        const { auditConfirm } = this.props
        auditConfirm(id, '1')
    }
    onCancel1 = () => {
        console.log('1');
    }

    confirm2 = (id) => {
        const { auditConfirm } = this.props
        auditConfirm(id, '2')
    }

    onCancel2 = () => {
        console.log('2');
    }


    setStateValue = (field, value) => {
        this.setState({
            [`${field}`]: value
        })
    }
    createForm = (id) => {
        router.push(`./eduTraining/formilyDesignable?id=${id}`)
    }

    seachForm = (id) => {
        router.push(`./eduTraining/formilyDesignable/testFormCreate?id=${id}`)
    }


    render() {
        const { ...tableProps } = this.props;
        const { columns, dataSource } = this.state
        return (
            <Table
                {...tableProps}
                columns={columns}
                dataSource={dataSource}
                pagination={{
                    ...tableProps.pagination,
                    // showTotal: total => `共 ${total} 条`,
                }}
                column
                scroll={{ y: 240, }}
                rowKey={record => record.id}
            />
        )
    }
}

export default ModalTable
