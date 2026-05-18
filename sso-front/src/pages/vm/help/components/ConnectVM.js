import React, { PureComponent } from 'react';
import { Anchor, Row, Col, Divider } from 'antd';
import WinHelp from './WinHelp';
import MacHelp from './MacHelp';
import LinHelp from './LinHelp';
import styles from './ConnectVM.less';

const { Link } = Anchor;

class ConnectVM extends PureComponent {

  render() {
    return (
      <div id="connectVM" className={styles.dom}>
        <Row>
          <Col span={22}>
            <div id='win'>
              <h2 className={styles.title}>Windows环境</h2>
              <WinHelp />
            </div>
            <Divider
              style={{
                marginBottom: 32,
              }}
            />
            <div id='mac'>
              <h2 className={styles.title}>Mac环境</h2>
              <MacHelp />
            </div>
            <Divider
              style={{
                marginBottom: 32,
              }}
            />
            <div id='linux'>
              <h2 className={styles.title}>Linux环境</h2>
              <LinHelp />
            </div>
            <Divider
              style={{
                marginBottom: 32,
              }}
            />
            <div id='download'>
              <a style={{ textDecoration: 'underline' }}>下载 CA 证书</a>
            </div>
          </Col>
          <Col span={2}>
            <Anchor
              style={{ marginLeft: 5 }}
              offsetTop={10}
              showInkInFixed={true}
              affix={true}
              getContainer={() => document.getElementById('connectVM')}
            >
              <Link href="#win" title="Windows环境" />
              <Link href="#mac" title="Mac环境" />
              <Link href="#linux" title="Linux环境" />
              <Link href="#download" title="下载 CA 证书" />
            </Anchor>
          </Col>
        </Row>
      </div>
    );
  }
}

export default ConnectVM;
