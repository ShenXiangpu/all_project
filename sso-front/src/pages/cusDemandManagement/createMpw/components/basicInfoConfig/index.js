import React, { PureComponent } from 'react'
import { Button, Form, Spin } from 'antd';
import { connect } from 'dva';
import styles from './index.less'
import BasicInfoInput from './BasicInfoInput';
import Title from '../Title'
import moment from "moment";
import ProInfoCheck from "./ProInfoCheck";
import NeedInfoInput from "./NeedInfoInput";

@connect(({ app, mpw, loading }) => ({ app, mpw, loading }))
class BasicInfoConfig extends PureComponent {
  state = {
    infoTitle: '基本信息',
    proTitle: '项目基本信息',
    needTitle: '需求基本信息',
  }

  handleSubmit = (e, status, id) => {
    e.preventDefault();

    const { form, demandObj, onSubmit } = this.props
    const { validateFieldsAndScroll, setFields } = form

    const { getFieldsValue } = form
    // const values = getFieldsValue();


    validateFieldsAndScroll((errors, values) => {
      if (errors) {
        return
      }
      // 判断有无optionName参数和值，没有进行赋值
      if (values && values.foundryModel && values.foundryModel.elseName) {
        values.foundryModel.optionName = values.foundryModel.elseName
      }
      // 判断有无optionName参数和值，没有进行赋值
      if (values && values.processNodeModel && values.processNodeModel.elseName) {
        values.processNodeModel.optionName = values.processNodeModel.elseName
      }
      // 判断有无optionName参数和值，没有进行赋值
      if (values && values.processTypeModel && values.processTypeModel.elseName) {
        values.processTypeModel.optionName = values.processTypeModel.elseName
      }
      // 判断有无optionName参数和值，没有进行赋值
      if (values && values.ployMetalModel && values.ployMetalModel.elseName) {
        values.ployMetalModel.optionName = values.ployMetalModel.elseName
      }
      // 判断有无optionName参数和值，没有进行赋值
      if (values && values.topMetalModel && values.topMetalModel.elseName) {
        values.topMetalModel.optionName = values.topMetalModel.elseName
      }
      // 判断有无optionName参数和值，没有进行赋值
      if (values && values.capacitanceModel && values.capacitanceModel.elseName) {
        values.capacitanceModel.optionName = values.capacitanceModel.elseName
      }
      // 判断有无optionName参数和值，没有进行赋值
      if (values && values.resistanceModel && values.resistanceModel.elseName) {
        values.resistanceModel.optionName = values.resistanceModel.elseName
      }
      // 判断有无optionName参数和值，没有进行赋值
      if (values && values.coreVoltageModel && values.coreVoltageModel.elseName) {
        values.coreVoltageModel.optionName = values.coreVoltageModel.elseName
      }
      // 判断有无optionName参数和值，没有进行赋值
      if (values && values.ioVoltageModel && values.ioVoltageModel.elseName) {
        values.ioVoltageModel.optionName = values.ioVoltageModel.elseName
      }
      // 判断有无optionName参数和值，没有进行赋值
      if (values && values.requirementModel && values.requirementModel.elseName) {
        values.requirementModel.optionName = values.requirementModel.elseName
      }

      // 判断有无optionName参数和值，没有进行赋值
      if (values && values.chipAreaModel && values.chipAreaModel.right) {
        values.chipAreaModel.optionName = `${values.chipAreaModel.left},${values.chipAreaModel.right}`
      }
      if (values && values.tapeOutDateModel && values.tapeOutDateModel.optionName) {
        let option = values.tapeOutDateModel.optionName
        values.tapeOutDateModel.optionName = moment(option._d).format('YYYY-MM-DD')
      }

      if (values && values.reviewInfoModel && values.reviewInfoModel.description) {
        values.requirementModel.demandId = id
      }

      onSubmit(values, status, id)


    })
  }




  get basicProps() {
    const { form, mpw, dispatch, id, basColProps, basformItemLayout,leftReadOnly,rightReadOnly, } = this.props
    return {
      form,
      mpw,
      dispatch,      
      leftReadOnly,
      rightReadOnly,
      id,
      ColProps: basColProps,
      formItemLayout: basformItemLayout,
    }
  }

  setStateValue = (field, value) => {
    this.setState({
      [`${field}`]: value
    })
  }


  get proProps() {
    const { form, mpw, dispatch, FoundryModel, //控制其他后面的输入框的显示隐藏
      ProcessNodeModel,
      ProcessTypeModel,
      ProcessCharacterModel,
      PloyMetalModel,
      TopMetalModel,
      CapacitanceModel,
      ResistanceModel,
      CoreVoltageModel,
      leftReadOnly,
      rightReadOnly,
      IoVoltageModel, onChange, ressult, proColProps, proformItemLayout,reviewLayout } = this.props
    const {
      showReview,
      foundryList,
      processNodesList,
      processTypeList,
      processCharacteristicsList,
      polyAndMetalList,
      topMetalList,
      capacitanceList,
      resistanceList,
      corevoltageList,
      iovoltageList,
      demandObj,
    } = mpw
    return {
      form,
      dispatch,
      showReview,
      foundryList,
      processNodesList,
      processTypeList,
      processCharacteristicsList,
      polyAndMetalList,
      topMetalList,
      capacitanceList,
      resistanceList,
      corevoltageList,
      iovoltageList,
      leftReadOnly,
      rightReadOnly,
      demandObj,
      FoundryModel, //控制其他后面的输入框的显示隐藏
      ProcessNodeModel,
      ProcessTypeModel,
      ProcessCharacterModel,
      PloyMetalModel,
      TopMetalModel,
      CapacitanceModel,
      ResistanceModel,
      CoreVoltageModel,
      IoVoltageModel,
      // showSubmit,

      ColProps: proColProps,
      formItemLayout: proformItemLayout,

      onChange: (name, value) => {
        onChange(name, value)
      },
      reviewLayout,
    }
  }

  get needProps() {
    const { form, mpw, dispatch, onChange, RequirementModel, neeColProps,leftReadOnly,
      rightReadOnly, neeformItemLayout,reviewLayout } = this.props
    const { designPackageRequirementsList, tapeOutPlanList, showReview, demandObj } = mpw
    return {
      showReview,
      form,
      dispatch,
      demandObj,
      RequirementModel,
      designPackageRequirementsList,
      tapeOutPlanList,
      leftReadOnly,
      rightReadOnly,
      ColProps: neeColProps,
      formItemLayout: neeformItemLayout,
      onChange: (name, value) => {
        onChange(name, value)
      },
      reviewLayout,
    }
  }

  reBackList = (e, res) => {
    const { onReBackList } = this.props
    e.preventDefault();
    const { form } = this.props
    form.resetFields();
    onReBackList(res)
  }


  handleUpload = (e, id) => {
    const { onHandleUpload } = this.props
    e.preventDefault();
    onHandleUpload(id)
  }

  render() {
    const { form, mpw, id, result, wloading } = this.props
    const { showReview, showSubmit, showUpdate, showUpload, isDetail } = mpw
    const { infoTitle, proTitle, needTitle } = this.state

    return (
      <div id="area" className={styles.main}>
        {/* { isEqual(result,'0') ? */}

        <Form>
          <Spin spinning={wloading}>
            <Title title={infoTitle} />
            <BasicInfoInput {...this.basicProps} />
            <Title title={proTitle} />
            <ProInfoCheck {...this.proProps} />
            <Title title={needTitle} />
            <NeedInfoInput {...this.needProps} />
          </Spin>
          <div className={styles.btn}>
            <Form.Item wrapperCol={{ span: 24, offset: 5 }}>
              {showSubmit &&
                <div>
                  <Button type="primary" onClick={(e) => this.handleSubmit(e, '', 0)} >提交</Button> &nbsp;&nbsp;
                  <Button onClick={(e) => this.reBackList(e, '1')} >取消</Button>
                </div>
              }
              {showUpdate && <Button type="primary" onClick={(e) => this.handleSubmit(e, 0, id)} >修改</Button>}
              {showReview && isDetail &&
                <>
                  <Button type="primary" onClick={(e) => this.handleSubmit(e, 2, id)} >评审通过</Button> &nbsp;&nbsp;
                  <Button type="danger" onClick={(e) => this.handleSubmit(e, 3, id)} >评审不通过</Button>&nbsp;&nbsp;
                  <Button style={{ backgroundColor: 'orange', color: 'white' }} onClick={(e) => this.handleSubmit(e, 0, id)} >退回修改</Button>
                </>
              }
              {/*评审通过和评审不通过才可以下载评审结果 */}
              {showUpload &&
                <>
                  <Button type="primary" onClick={(e) => this.handleUpload(e, id)} >下载评审结果</Button> &nbsp;&nbsp;
                </>
              }
            </Form.Item>
          </div>
        </Form>






      </div>
    )
  }
}

export default BasicInfoConfig;
