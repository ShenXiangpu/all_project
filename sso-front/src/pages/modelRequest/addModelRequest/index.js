import React, { Component } from 'react';
import { connect } from 'dva';
import { router } from 'utils'
import { Steps, Form, message, Modal } from 'antd';
import Page from '../../../components/Page/Page'
import BasicInfoConfig from './components/BasicInfoInput';
import debounce from 'lodash/debounce';
import { isEmpty, isEqual } from 'lodash';
import store from 'store';
import styles from './index.less'

const { Step } = Steps;

const ColProps = {
  xs: 24,
  sm: 12,
  xl: 12,
  md: 8,
  // style: {
  //   marginBottom: 16,
  // },
}





const formItemLayout = {
  labelCol: {
    xs: { span: 3 },
    sm: { span: 3 },
  },
  wrapperCol: {
    xs: { span: 18 },
    sm: { span: 18 },
  },
};


@Form.create()
@connect(({ app, modelRequest, loading }) => ({ app, modelRequest, loading }))
class CreateMpw extends Component {
  state = {
    foundryModel: false,//用来other框的显示隐藏
    foundryName: [
      {
        id: 1,
        name: 'TSMC'
      },
      {
        id: 2,
        name: 'SMIC'
      },
      {
        id: 3,
        name: 'UMC'
      },
      {
        id: 4,
        name: 'GSMC'
      },
      {
        id: 5,
        name: 'Other'
      },

    ],
    process: [
      {
        id: 1,
        name: 'G'
      },
      {
        id: 2,
        name: 'LP'
      },
      {
        id: 3,
        name: 'LL'
      },
      {
        id: 4,
        name: 'LV'
      },
      {
        id: 5,
        name: 'EFLASH'
      },
      {
        id: 6,
        name: 'EEPROM'
      },
      {
        id: 7,
        name: 'Other'
      },
    ],
    processModel: false,
    CPUSeries: [
      {
        id: 1,
        name: 'E801'
      },
      {
        id: 2,
        name: 'E902'
      }
    ],
    CPUModel: true,
    multiplyType: [
      {
        id: 1,
        name: 'Small'
      },
      {
        id: 2,
        name: 'Fast'
      }
    ],
    tightlyCoupledIP: [
      {
        id: 1,
        name: 'INTC'
      },
      {
        id: 2,
        name: 'SYSTIMER'
      }
    ],
    HWBreakpoint: [
      {
        id: 1,
        name: '4'
      },
      {
        id: 2,
        name: '8'
      }
    ],
    //E902相关
    Cache: [
      {
        id: 1,
        name: '0'
      },
      {
        id: 2,
        name: '2'
      },
      {
        id: 3,
        name: '4'
      },
      {
        id: 4,
        name: '8'
      },
    ],
    PMPRegions: [
      {
        id: 1,
        name: '0'
      },
      {
        id: 2,
        name: '4'
      },
      {
        id: 3,
        name: '8'
      },
      {
        id: 4,
        name: '12'
      },
      {
        id: 5,
        name: '16'
      }
    ],
    CLIC: [
      {
        id: 1,
        name: '32'
      },
      {
        id: 2,
        name: '64'
      },
      {
        id: 3,
        name: '128'
      },
    ],
    RVISA: [
      {
        id: 1,
        name: 'RV32EMC'
      },
      {
        id: 2,
        name: 'RV32EC'
      }
    ],
    RVISAModel: false,
    MultiplierType: [
      {
        id: 1,
        name: 'Small Mult'
      },
      {
        id: 2,
        name: 'Fast Mult'
      }
    ]



  }

  componentDidMount() {
  }

  setStateValue = (field, value) => {
    console.log(field);
    this.setState({
      [`${field}`]: value
    })
  }



  get basicInfoProps() {
    const { form, dispatch, loading } = this.props
    const {
      foundryName,
      process,
      CPUSeries,
      multiplyType,
      tightlyCoupledIP,
      HWBreakpoint,
      foundryModel,
      processModel,
      CPUModel,
      Cache,
      PMPRegions,
      CLIC,
      RVISA,
      RVISAModel,
      MultiplierType,
    } = this.state
    return {
      form,
      dispatch,
      loading: loading.effects['modelRequest/collectInfoAdd'],
      foundryName,
      process,
      CPUSeries,
      multiplyType,
      tightlyCoupledIP,
      HWBreakpoint,
      foundryModel,
      processModel,
      CPUModel,
      Cache,
      PMPRegions,
      CLIC,
      RVISA,
      RVISAModel,
      MultiplierType,
      onChange: (objName, value) => { //控制Other框的显示
        this.setStateValue(objName, value)
      },

      onSubmit: (values) => {
        dispatch({
          type: 'modelRequest/collectInfoAdd',
          payload: {
            values
          }
        }).then((response) => {
          if (response && response.flag) {
            router.push({
              pathname: '/modelRequest', // 首页
            })
          } else {
            message.config({
              top: 100,
              duration: 2,
            });
            message.error(response.errMessage)
          }
        })
      },
      onCancle: () => {
        router.push({
          pathname: '/modelRequest', // 首页
        })
      }
    }
  }


  render() {
    const { currentStep } = this.state
    const { location } = this.props
    const { query } = location
    return (
      <Page inner>
        <BasicInfoConfig {...this.basicInfoProps} />
      </Page>
    )
  }
}

export default CreateMpw;
