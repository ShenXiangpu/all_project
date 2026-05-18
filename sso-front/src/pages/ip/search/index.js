import { router } from 'utils'
import React, { PureComponent } from 'react'
import { connect } from 'dva'
import { Row, Col, Card, Breadcrumb } from 'antd'
import Link from 'umi/link';
import CollapsePanel from '../components/CollapsePanel'
import Filter from '../components/Filter'
import IpList from "./components/IpList";
import styles from '../style.less'
import { stringify } from 'qs'

@connect(({ ipCloud, loading }) => ({ ipCloud, loading }))
class SearchIp extends PureComponent {
  state = {
    expandForm: false,  // 是否展开
    formValues: {},     // 查询条件
  };

  setStateValue = (field, value) => {
    this.setState({
      [`${field}`]: value
    })
  }

  componentDidMount() {
    const { dispatch, location } = this.props;
    dispatch({
      type: 'ipCloud/queryNavi'
    })

    // 查询列表
    const { query } = location;
    dispatch({
      type: 'ipCloud/query',
      payload: query
    }).then(() => {
      this.setState({
        formValues: query
      })
    })
  }

  get filterProps() {
    const { expandForm } = this.state
    const { dispatch, ipCloud } = this.props
    const { formValues } = this.state
    const { nodeList, foundryList, ipCategoryList, ipProviderList } = ipCloud

    return {
      nodeList,
      foundryList,
      ipCategoryList,
      ipProviderList,
      expandForm,
      filter: {
        ...formValues,
      },
      setFormValues: values => {
        this.setStateValue('formValues', values)
      },
      setExpandForm: value => {
        this.setStateValue('expandForm', value)
      },
      onSearch: values => {
        dispatch({
          type: 'ipCloud/query',
          payload: values
        })

        router.push({
          search: stringify(
            {
              ...values
            },
            { arrayFormat: 'repeat' }
          ),
        })
      },
    }
  }

  get ipListProps() {
    const { dispatch, ipCloud } = this.props
    const { list } = ipCloud

    return {
      data: list,
      onShowDetail: id => {
        // 跳转到详情页
        router.push({ pathname: `/ip/${id}` })
      }
    }
  }

  onFieldSearch = (e, value, field) => {
    e.preventDefault();

    const { dispatch } = this.props

    dispatch({
      type: 'ipCloud/query',
      payload: {
        [`${field}`]: value,
      }
    })

    router.push({
      search: stringify(
        {
          [`${field}`]: value
        },
        { arrayFormat: 'repeat' }
      ),
    })
  }

  get ipCategoryProps() {
    const { dispatch, ipCloud } = this.props
    const { ipCategoryList } = ipCloud;

    const columns = [{
      title: 'typeName',
      dataIndex: 'typeName',
      key: 'typeName',
      render: text => <a className={styles.alink} onClick={e => this.onFieldSearch(e, text, 'typename')}>{text}</a>
    }];

    return {
      dataSource: this.getTypeList(ipCategoryList),
      columns,
      rowKey: record => record.id
    }
  }

  getTypeList = list => {
    return list && list.map(item => {
      if (item.children && item.children.length > 0) {
        return this.getTypeList(item.children)
      } else {
        item.children = null;
        return item;
      }
    })
  }

  get ipProviderProps() {
    const { dispatch, ipCloud } = this.props
    const { ipProviderList } = ipCloud;

    const columns = [{
      title: 'name',
      dataIndex: 'name',
      key: 'name',
      render: text =>
        <a
          className={styles.alink}
          style={{ width: '100%' }}
          onClick={e => this.onFieldSearch(e, text, 'providerName')}
        >
          {text}
        </a>
    }];

    return {
      dataSource: ipProviderList,
      columns,
      rowKey: record => record.id
    }
  }

  get foundryProps() {
    const { dispatch, ipCloud } = this.props
    const { foundryList } = ipCloud;

    const columns = [{
      title: 'foundryName',
      dataIndex: 'foundryName',
      key: 'foundryName',
      render: text =>
        <a
          className={styles.alink}
          style={{ width: '100%' }}
          onClick={e => this.onFieldSearch(e, text, 'foundryName')}
        >
          {text}
        </a>
    }];

    return {
      dataSource: foundryList,
      columns,
      rowKey: record => record.id
    }
  }

  render() {

    return (
      <div className={styles.content}>
        <Breadcrumb style={{ marginBottom: '12px' }} separator=">">
          <Breadcrumb.Item>
            <Link to='/ip'>IP共享云</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            搜索
          </Breadcrumb.Item>
        </Breadcrumb>

        <Row>
          <Col span={18}>
            <Card bordered={false}>
              <div className={styles.formFilter}><Filter {...this.filterProps} /></div>
            </Card>
            <Card bordered={false} style={{ marginTop: 18 }}>
              <IpList {...this.ipListProps} />
            </Card>
          </Col>
          <Col span={6} style={{ paddingLeft: '24px' }}>
            <CollapsePanel title="IP类型" {...this.ipCategoryProps} />
            <CollapsePanel
              title="IP供应商"
              style={{ marginTop: 18, marginBottom: 18 }}
              {...this.ipProviderProps}
            />
            <CollapsePanel
              title="IP代工厂"
              {...this.foundryProps}
            />
          </Col>
        </Row>
      </div >
    )
  }
}

export default SearchIp
