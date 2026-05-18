import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Form, Button, Row, Col, Input, Select, Progress } from 'antd'
import styles from '../style.less'
import { router } from 'utils'
import ChooseList from './ChooseList'
const { Search } = Input;
const { Option } = Select
const FormItem = Form.Item;

const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 18 },
};

@Form.create()
class Filter extends Component {

  state = {
    statusFirstIndex: 0,
    statusSecondIndex: 0,
    statusThirdIndex: 0
  }

  get chooseDirectProps() {

    const { directionTitle, directionList, onChooseDirectItem } = this.props
    const { statusFirstIndex } = this.state
    return {
      title: '培训方向',
      list: directionList,
      statusIndex: statusFirstIndex,
      onChooseItem: (value) => {
        onChooseDirectItem(value)
        this.setState({
          statusSecondIndex: 0
        })
      },
      setStatusIndex: (index) => {
        this.setState({
          statusFirstIndex: index,
        })
      }
    }
  }

  get chooseTypeProps() {
    const { directionTitle, typeList, onChooseTypeItem } = this.props
    const { statusSecondIndex } = this.state
    return {
      title: '培训分类',
      list: typeList,
      statusIndex: statusSecondIndex,
      onChooseItem: (value) => {
        onChooseTypeItem(value)
      },

      setStatusIndex: (index) => {
        this.setState({
          statusSecondIndex: index,
        })
      }
    }
  }

  //
  get chooseTrainingFormatProps() {
    const { directionTitle, trainingTypeList, onChooseTrainingItem } = this.props
    const { statusThirdIndex } = this.state
    return {
      title: '培训形式',
      list: trainingTypeList,
      statusIndex: statusThirdIndex,
      onChooseItem: (value) => {
        console.log(value, 'value');
        onChooseTrainingItem(value)
      },

      setStatusIndex: (index) => {
        this.setState({
          statusThirdIndex: index,
        })
      }
    }
  }



  search = (value) => {
    const { onSearch } = this.props
    onSearch(value)
  }

  change = (value) => {
    const { onChange } = this.props
    if (!value) {
      onSearchChange(value)
    }
  }
  select = (value) => {
    const { onSelectChange } = this.props
    onSelectChange(value)
  }
  render() {
    const {
      form,
      courseDirectionList,
      directionTitle,
      typeTitle,
    } = this.props;
    const { getFieldDecorator } = form;

    return (
      <div>
        <Row
          gutter={{
            md: 24,
            lg: 24,
            xl: 48,
          }}

          className={styles.marginBottom20}
        >
          <Col span={12} md={12} sm={12}>
            <div className={`${styles.font20} ${styles.fontW7}`}>课程列表</div>
          </Col>
          <Col className={`${styles.flex} ${styles.justifyEnd}`} span={12} md={12} sm={12}>
            <Select defaultValue={''} onSelect={value => this.select(value)} style={{ width: 120, marginRight: '20px' }}>
              <Option value="">-请选择-</Option>
              <Option value="1">可报名</Option>
              <Option value="3">审核中</Option>
              <Option value="4">被驳回</Option>
              <Option value="5">报名成功</Option>
            </Select>
            <Search allowClear placeholder="搜索感兴趣的课程" style={{ width: 300 }} onChange={value => this.change(value)} onSearch={value => this.search(value)} enterButton />
          </Col>

        </Row>
        <Row
          gutter={{
            md: 24,
            lg: 24,
            xl: 48,
          }}
          className={styles.marginBottom10}
        >
          <Col md={24} sm={24}>
            <ChooseList {...this.chooseDirectProps} ></ChooseList>
          </Col>
        </Row>

        <Row
          gutter={{
            md: 24,
            lg: 24,
            xl: 48,
          }}
          className={styles.marginBottom10}
        >
          <Col md={24} sm={24}>
            <ChooseList {...this.chooseTypeProps} ></ChooseList>
          </Col>
        </Row>


        <Row
          gutter={{
            md: 24,
            lg: 24,
            xl: 48,
          }}
        >
          <Col md={24} sm={24}>
            <ChooseList {...this.chooseTrainingFormatProps} ></ChooseList>
          </Col>
        </Row>

      </div>
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
