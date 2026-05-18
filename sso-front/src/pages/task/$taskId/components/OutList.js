import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Link from 'umi/link';
import { Table, Divider } from 'antd'

class OutList extends React.PureComponent {

    columns = [
        {
            title: '文件名',
            dataIndex: 'fileName',
            key: 'fileName',
        },
        {
            title: '--',
            dataIndex: 'fileMsg',
            key: 'fileMsg',
            // width: 240,
            // align: 'center',
        },
        // {
        //     title: '操作',
        //     width: 200,
        //     align: 'center',
        //     render: (text, record) => (
        //         <>
        //             <a href="#" onClick={e => this.onPreviewClick(e, record)}>预览</a>
        //             <Divider type="vertical" />
        //             <a href="#" onClick={e => this.onDownloadClick(e, record.id)}>下载</a>
        //             <Divider type="vertical" />
        //             <a href="#" onClick={e => this.onDeleteClick(e, record.id)}>删除</a>
        //         </>
        //     ),
        // }
    ]

    onPreviewClick = (e, value) => {
        e.preventDefault();
        const { onPreviewTask } = this.props
        onPreviewTask(value)
    }

    onDownloadClick = (e, value) => {
        e.preventDefault();
        const { onDownloadResult } = this.props
        onDownloadResult(value)
    }

    onDeleteClick = (e, value) => {
        e.preventDefault();
        const { onDeleteResult } = this.props
        onDeleteResult(value)
    }

    render() {
        const { outputList, outLoading } = this.props;

        return (
            <Table
                dataSource={outputList}
                loading={outLoading}
                columns={this.columns}
                pagination={false}
                // bordered
                rowKey={record => record.fileName}
            />
        )
    }
}

export default OutList
