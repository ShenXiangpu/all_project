import React, { Component } from 'react';
import Link from 'umi/link';
import { Table } from 'antd';
// import styles from './list.less';

const mockData = [
    {
        code: 'mock',
        isPublic: '0',
        createTime: '2019-12-04',
    }
]

class List extends Component {

    columns = [
        {
            title: 'code',
            dataIndex: 'code',
            key: 'code',
        },
        {
            title: 'isPublic',
            dataIndex: 'isPublic',
            key: 'isPublic',
        },
        {
            title: 'create time',
            dataIndex: 'createTime',
            key: 'createTime',
            sorter: true,
        },
        {
            title: 'Action',
            render: (text, record) => (
                <>
                    {record.isPublic !== '0' ?
                        <a href="#" onClick={this.props.onPublicClick({ code: record.code, isPublic: true })}>public</a>
                        :
                        <a href="#" onClick={this.props.onPublicClick({ code: record.code, isPublic: false })}>private</a>
                    }
                </>
            ),
        },
    ];

    handleTableChange = (pagination, filters, sorter, ...rest) => {
        const { onChange } = this.props;

        if (onChange) {
            onChange(pagination, filters, sorter, ...rest);
        }
    };

    render() {
        const { list = [], pagination = false, ...rest } = this.props;
        const paginationProps = pagination
            ? {
                showSizeChanger: true,
                showQuickJumper: true,
                ...pagination,
            }
            : false;

        return (
            <div className={styles.standardTable}>
                <Table
                    columns={this.columns}
                    dataSource={mockData}
                    pagination={paginationProps}
                    onChange={this.handleTableChange}
                    {...rest}
                    rowKey={record => record.code}
                />
            </div>
        );
    }
}

export default List;
