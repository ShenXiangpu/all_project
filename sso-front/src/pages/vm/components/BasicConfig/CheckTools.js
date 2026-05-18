import React, { PureComponent } from 'react'
import { Radio, Form, Select } from 'antd';
import classNames from 'classnames';
import styles from './CheckTools.less';
import { isEqual } from 'lodash';

const { Option } = Select;
const FormItem = Form.Item;
const formItemLayout = {
  wrapperCol: {
    xs: { span: 24, offset: 0 },
    sm: { span: 24, offset: 0 },
  },
};

class CheckTools extends PureComponent {
  state = {
    rdValue: '',          // 当前选中的厂商
    checkedTools: [],     // 当前选中的厂商下的所有工具信息列表，包括类型、工具、版本等
    selectedType: '',     // 当前选中的工具类型
    toolInfos: [],  
    radioDefault:'',      // 显示当前选中的工具类型所对应的所有工具
  }

  componentDidMount() {
    const { toolList} = this.props;
    // debugger
    // let toolsObj = JSON.parse (tools)

    this.setDefaultChecked(toolList);
  }

  componentDidUpdate(prevProps) {
    const { toolList } = this.props;
    const { toolList: old_toolList } = prevProps;
    if (!isEqual(toolList, old_toolList)) {
      this.setDefaultChecked(toolList);
    }
  }

  setDefaultChecked = (toolList) => {
    const { setVmToolsInfo, setActiveDiv } = this.props;
    let { rdValue } = this.state;
    rdValue = toolList && toolList.length > 0 ? (toolList[0].company).toLowerCase() : '';  // 默认第一个
    this.setState({ rdValue });
    const filterArr = toolList && toolList.filter(t => (t.company).toLowerCase() === rdValue.toLowerCase());
    if (filterArr && filterArr.length > 0) {
      // 厂商下对应的所有工具类型及工具
      const checkedTools = filterArr[0].edaTools;
      // 默认选中第一个工具类型
      const selectedType = checkedTools && checkedTools.length > 0 && checkedTools[0].type;
      // 默认显示第一个工具类型所对应的所有工具
      const toolInfos = checkedTools && checkedTools.length > 0 && checkedTools[0].tool_infos;

      this.setState({
        checkedTools,
        selectedType,
        toolInfos
      });
    }
  }

  onRadioChange = e => {
    const { toolList } = this.props;
    const checkedCompany = e.target.value;

    const filterArr = toolList && toolList.filter(t => (t.company).toLowerCase() === checkedCompany);
    if (filterArr && filterArr.length > 0) {
      const checkedTools = filterArr[0].edaTools;
      const selectedType = checkedTools && checkedTools.length > 0 && checkedTools[0].type;
      const toolInfos = checkedTools && checkedTools.length > 0 && checkedTools[0].tool_infos;
      this.setState({
        rdValue: checkedCompany,
        checkedTools,
        selectedType,
        toolInfos
      });
    }
  };

  handleTypeChange = value => {
    this.setState({ selectedType: value });
    const { checkedTools } = this.state;
    const filterToolsArr = checkedTools && checkedTools.filter(t => t.type === value);
    if (filterToolsArr && filterToolsArr.length > 0) {
      const toolInfos = filterToolsArr[0].tool_infos;
      this.setState({
        toolInfos
      });
    }
  }

  onCheckTools = (e, key) => {
    e.preventDefault();
    const { rdValue, selectedType, toolInfos } = this.state;
    const { form: { getFieldValue }, setVmToolsInfo, activeDiv, setActiveDiv, vmTools } = this.props;
    const version = getFieldValue(key);

    // 控制显示的DIV
    const filterArr = activeDiv && activeDiv.filter(t => t.type === selectedType && t.tool_name === key);
    if (filterArr && filterArr.length > 0) {
      // 已存在，剔除
      const newArr = activeDiv.filter(t => t.tool_name !== key);
      setActiveDiv(newArr);
    } else {
      // 不存在，添加
      const newTool = {
        type: selectedType,
        tool_name: key,
        tool_version: version
      }
      activeDiv.push(newTool);
      setActiveDiv(activeDiv);
    }

    // 控制回传的数据
    const filterCompanyArr = vmTools.filter(c => (c.company).toLowerCase() === rdValue);
    if (filterCompanyArr && filterCompanyArr.length > 0) {
      // 选中的厂商有数据
      const filterTypeArr = filterCompanyArr[0].edaTools.filter(t => t.type === selectedType); // 过滤版本
      if (filterTypeArr && filterTypeArr.length > 0) {
        // 选中的工具类型下有数据
        const filterToolArr = filterTypeArr[0].tool_infos.filter(t => t.tool_name === key);
        if (filterToolArr && filterToolArr.length > 0) {
          // 工具已存在：剔除
          const newToolsArr = vmTools.map(item => {
            if ((item.company).toLowerCase() === rdValue) {
              const edaToolsArr = item.edaTools.map(subItem => {
                if (subItem.type === selectedType) {
                  const toolInfoArr = subItem.tool_infos.filter(t => t.tool_name !== key);
                  subItem.tool_infos = toolInfoArr;
                }
                return subItem;
              })
              item.edaTools = edaToolsArr;
            }
            return item;
          })

          // 移除 tool_infos 数组为空的对象
          const newToolsArr2 = newToolsArr.map(item => {
            if ((item.company).toLowerCase() === rdValue) {
              const edaToolsArr = item.edaTools.filter(subItem => subItem.tool_infos && subItem.tool_infos.length > 0);
              item.edaTools = edaToolsArr;
            }

            return item;
          })

          // 移除 edaTools 数组为空的对象
          const newToolsArr3 = newToolsArr2.filter(item => item.edaTools && item.edaTools.length > 0);

          // console.log('1 newToolsArr:', newToolsArr3);
          setVmToolsInfo(newToolsArr3);
        } else {
          // 工具信息不存在：添加添加新数据 tool (name, version)
          const newToolData = {
            tool_name: key,
            tool_version: version
          };

          const newToolsArr = vmTools.map(item => {
            if ((item.company).toLowerCase() === rdValue) {
              const edaToolsArr = item.edaTools.map(subItem => {
                if (subItem.type === selectedType) {
                  subItem.tool_infos.push(newToolData);
                }
                return subItem;
              })
              item.edaTools = edaToolsArr;
            }
            return item;
          })

          // console.log('2 newToolsArr:', newToolsArr);
          setVmToolsInfo(newToolsArr);
        }

      } else {
        // 选中的工具类型下没有数据：添加新数据 type -> tool (name, version)
        const newTypeData = {
          type: selectedType,
          tool_infos: [{
            tool_name: key,
            tool_version: version
          }]
        };

        const newToolsArr = vmTools.map(item => {
          if ((item.company).toLowerCase() === rdValue) {
            item.edaTools.push(newTypeData);
          }
          return item;
        })

        // console.log('3 newToolsArr:', newToolsArr);
        setVmToolsInfo(newToolsArr);
      }
    } else {
      // 选中的厂商下没有数据：添加新的数据 company -> type -> tool (name, version)
      const newData = {
        company: rdValue,
        edaTools: [{
          type: selectedType,
          tool_infos: [{
            tool_name: key,
            tool_version: version
          }]
        }]
      };

      vmTools.push(newData);

      // console.log('4 newToolsArr:', vmTools);
      setVmToolsInfo(vmTools);
    }

    this.forceUpdate()
  }

  render() {
    const { rdValue, checkedTools, selectedType, toolInfos } = this.state;
    const { form: { getFieldDecorator }, toolList, activeDiv } = this.props;

    const factoryRadioBtns = toolList && toolList.length > 0 && toolList.map(t => {
      return (
        <Radio.Button key={t.company} value={(t.company).toLowerCase()}>{t.company}</Radio.Button>
      )
    })

    // 获取选中的厂商下的所有工具类型列表
    // 厂商 => 工具类型
    const toolTypeOpts = checkedTools && checkedTools.map(i => {
      return (
        <Option key={i.type}>{i.type}</Option>
      )
    })

    // 获取工具类型下对应的工具及相应的版本
    // 厂商 => 工具类型 => 工具 => 工具版本
    const toolOpts = toolInfos && toolInfos.length > 0 && toolInfos.map(t => {

      const filterTools = activeDiv && activeDiv.filter(ele => ele.type === selectedType && ele.tool_name === t.tool_name);
      const defaultVersion = filterTools && filterTools.length > 0 ?
        filterTools[0].tool_version :
        t.tool_version && t.tool_version.length > 0 && t.tool_version[0];

      const flag = filterTools && filterTools.length > 0;

      return (
        <li className={styles.itemBox} key={`${selectedType}_${t.tool_name}`}>
          <div
            className={flag ? classNames(styles.item, styles.actived) : styles.item}
            onClick={(e) => this.onCheckTools(e, t.tool_name)}
          >
            <div className={styles.tool} id='version'>
              <h3 className={styles.tit} title={t.tool_name}>{t.tool_name}</h3>
              <FormItem {...formItemLayout}>
                {getFieldDecorator(t.tool_name, {
                  initialValue: defaultVersion
                })(
                  <Select
                    // defaultValue={defaultVersion}
                    size="small"
                    style={{ width: '205px' }}
                    getPopupContainer={() => document.getElementById('version')}
                  >
                    {t.tool_version && t.tool_version.map(v => (
                      <Option key={v} value={v}>{v}</Option>
                    ))}
                  </Select>
                )}
              </FormItem>
            </div>
          </div>
        </li>
      )
    })

    return (
      <div>
        <div>
          <Radio.Group  className={styles.rd} onChange={this.onRadioChange} value={rdValue}>
            {factoryRadioBtns}
          </Radio.Group>
        </div>
        <div style={{ marginTop: '30px' }} id='type'>
          {/* <span className={styles.tip}>类型:</span> */}
          <Select className={styles.select}
            value={selectedType}
            onChange={this.handleTypeChange}
            getPopupContainer={() => document.getElementById('type')}
          >
            {toolTypeOpts}
          </Select>
        </div>
        <ul className={styles.list}>
          <Form>
            {toolOpts}
          </Form>
        </ul>
      </div >
    )
  }
}

export default CheckTools
