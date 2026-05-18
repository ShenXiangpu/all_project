import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Form, Button, Row, Col, Input, Select, Progress, Icon } from 'antd'
import styles from '../style.less'
import { isEmpty, isEqual } from 'lodash'
import recycleBinSvg from 'assets/recycleBin.svg'

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
    const { dispatch, form, setFormValues, onSearch } = this.props;
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      const values = {
        ...fieldsValue
      };
      setFormValues(values);
      onSearch(values);
    });
  };

  handleFormReset = () => {
    const { form, setFormValues, onSearch } = this.props;
    form.resetFields();
    setFormValues({});
    onSearch({
      currentPath: '/'
    });
  }


  render() {
    const { form, storage, onBuyCapacity, isShowText, currentPath, handleRecycleBinClick } = this.props;
    const { getFieldDecorator } = form;
    const percent = storage && storage.usedStorageRate;

    const isShowFilter = currentPath && (currentPath.indexOf('任务数据管理') != -1)

    const usedStorage = (
      <div className={styles.item}>
        <span className={styles.sub}>{storage && storage.usedStorage}</span>
        {isShowText ? <a className={styles.sub} style={{ fontWeight: 'bold' }} onClick={onBuyCapacity}>扩容</a> : isEmpty}
      </div>
    );

    return (
      <Form {...formItemLayout} onSubmit={this.handleSearch} >
        {/* {isShowFilter ? */}
          <Row
            gutter={{
              md: 8,
              lg: 24,
              xl: 48,
            }}
          >

            <Col md={8} sm={24}>
              {isShowFilter ?
                <FormItem label="文件名：">
                  {getFieldDecorator('name')(
                    <Input placeholder="输入文件名进行查询" />
                  )}
                </FormItem> : null
              }
            </Col>
            <Col md={8} sm={24}>
              {isShowFilter ?
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
                </span> : null
              }
            </Col>
            {/* <Col md={8} sm={24}></Col> */}
            <Col md={8} sm={24}>

                <div className={styles.progressContainer}>
                  <div className={styles.progress}>
                    <Progress
                      size="small"
                      percent={percent * 100}
                      format={() => usedStorage}
                      strokeColor={percent && percent < 1 ? '#fadb14' : '#f5222d'}
                      status={percent && percent >= 1 ? "exception" : null}
                    />
                  </div>
                  <div>
                    < Button style={{ marginBottom: '15px', float: 'right' }} type="danger" onClick={handleRecycleBinClick}>
                      <Icon style={{ fontSize: '18px', verticalAlign: '-0.225em' }} component={recycleBinSvg} />
                      回收站
                    </Button>
                  </div>

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
