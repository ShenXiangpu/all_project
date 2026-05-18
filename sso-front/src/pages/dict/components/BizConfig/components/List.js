import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Table, Input, Icon, Form } from 'antd';
import styles from './style.less'

const EditableContext = React.createContext();

const EditableRow = ({ form, index, ...props }) => (
  <EditableContext.Provider value={form}>
    <tr {...props} />
  </EditableContext.Provider>
);

const EditableFormRow = Form.create()(EditableRow);

class EditableCell extends React.Component {
  state = {
    editing: false,
  };

  toggleEdit = () => {
    const editing = !this.state.editing;
    this.setState({ editing }, () => {
      if (editing) {
        this.input.focus();
      }
    });
  };

  save = e => {
    const { record, handleSave } = this.props;
    this.form.validateFields((error, values) => {
      if (error && error[e.currentTarget.id]) {
        return;
      }
      this.toggleEdit();
      handleSave({ ...record, ...values });
    });
  };

  renderCell = form => {
    this.form = form;
    const { children, dataIndex, record, title } = this.props;
    const { editing } = this.state;
    return editing ? (
      <Form.Item style={{ margin: 0 }}>
        {form.getFieldDecorator(dataIndex, {
          rules: [
            {
              required: true,
              message: `"${title}"不能为空`,
            },
          ],
          initialValue: record[dataIndex],
        })(<Input ref={node => (this.input = node)} onPressEnter={this.save} onBlur={this.save} />)}
      </Form.Item>
    ) : (
      <div
        className={styles.editableCellValueWrap}
        style={{ paddingRight: 24 }}
        onClick={this.toggleEdit}
      >
        {children}
      </div>
    );
  };

  render() {
    const {
      editable,
      dataIndex,
      title,
      record,
      index,
      handleSave,
      children,
      ...restProps
    } = this.props;
    return (
      <td {...restProps}>
        {editable ? (
          <EditableContext.Consumer>{this.renderCell}</EditableContext.Consumer>
        ) : (
          children
        )}
      </td>
    );
  }
}

class List extends PureComponent {

  handleEditSave = row => {
    const { onEditItem } = this.props;
    const values = {
      bizTypeKey: row.bizTypeKey,
      bizTypeValue: row.bizTypeValue
    }
    onEditItem(values);
  };

  render() {
    const { onDeleteItem, editLoading, ...tableProps } = this.props

    const columns = [
      {
        title: '键',
        dataIndex: 'bizTypeKey',
        key: 'bizTypeKey',
      },
      {
        title: '键名称',
        dataIndex: 'bizTypeName',
        key: 'bizTypeName',
      },
      {
        title: '值',
        dataIndex: 'bizTypeValue',
        key: 'bizTypeValue',
        editable: true,
        render: text => editLoading ? <Icon type="loading" /> : text
      },
      {
        title: '备注',
        ellipsis: true,
        dataIndex: 'description',
        key: 'description',
      },
      {
        title: '创建时间',
        dataIndex: 'createTime',
        key: 'createTime',
      },
      {
        title: '更新时间',
        dataIndex: 'updateTime',
        key: 'updateTime',
      },
    ]

    const components = {
      body: {
        row: EditableFormRow,
        cell: EditableCell,
      },
    };

    const editColumns = columns.map(col => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: record => ({
          record,
          editable: col.editable,
          dataIndex: col.dataIndex,
          title: col.title,
          handleSave: this.handleEditSave,
        }),
      };
    });

    return (
      <Table
        {...tableProps}
        pagination={false}
        className={styles.table}
        bordered
        components={components}
        rowClassName={() => styles.editableRow}
        columns={editColumns}
        simple
        size="small"
        rowKey={record => record}
      />
    )
  }
}

export default List
