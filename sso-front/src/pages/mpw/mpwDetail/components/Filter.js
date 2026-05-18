import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Form, Button, Row, Col, Input, Select, Progress } from 'antd'
import styles from '../style.less'
import { isEmpty, isEqual } from 'lodash'

const { Option } = Select
const FormItem = Form.Item;

const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 18 },
};

@Form.create()
class Filter extends Component {

  handleSearch = e => {
    e.preventDefault();
    const { dispatch, form, setFormValues,currentPath,projectId, onSearch } = this.props;
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      const values = {
        projectId,
        currentPath,
        // listDir: true,
        ...fieldsValue
      };
      setFormValues(values);
      onSearch(values);
    });
  };

  handleFormReset = () => {
    const { form, setFormValues,projectId, onSearch } = this.props;
    form.resetFields();
    setFormValues({});
    onSearch({
      currentPath: '/',
      projectId,
    });
  }

  render() {
    const { form, storage, onBuyCapacity, isShowText } = this.props;
    const { getFieldDecorator } = form;
    console.log('isShowText', isShowText);

    const percent = storage && storage.usedStorageRate;



    const usedStorage = (
      <div className={styles.item}>
        <span className={styles.sub}>{storage && storage.usedStorage}</span>
        {/* {isShowText ? <a className={styles.sub} style={{ fontWeight: 'bold' }} onClick={onBuyCapacity}>扩容</a>:isEmpty} */}
      </div>
    );

    return (
      <Form {...formItemLayout} onSubmit={this.handleSearch} >
        <Row
          gutter={{
            md: 8,
            lg: 24,
            xl: 48,
          }}
        >
          <Col md={8} sm={24}>
            <FormItem label="文件名：">
              {getFieldDecorator('fileName')(
                <Input placeholder="输入文件名进行查询" />
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <span className={styles.submitButtons}>
              <Button type="primary" htmlType="submit">
                查询
              </Button>
              <Button
                style={{
                  marginLeft: 8,
                }}
                onClick={this.handleFormReset}
              >
                重置
              </Button>
            </span>
          </Col>
          <Col md={4} sm={24}></Col>
          <Col md={4} sm={24}>
            <div className={styles.progress}>
              <Progress
                size="small"
                percent={percent * 100}
                format={() => usedStorage}
                strokeColor={percent && percent < 1 ? '#fadb14' : '#f5222d'}
                status={percent && percent >= 1 ? "exception" : null}
              />
            </div>
          </Col>
        </Row>
      </Form>
    );
  }
}

Filter.propTypes = {
  form: PropTypes.object,
  filter: PropTypes.object,
  setFormValues: PropTypes.func,
  onSearch: PropTypes.func,
}

export default Filter
