import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Modal, Tree, Icon } from 'antd'
import FolderSvg from '../../../../assets/folder.svg'
import FolderOpenSvg from '../../../../assets/folder-open.svg'
import styles from './treeModal.less'

const { TreeNode, DirectoryTree } = Tree;

class TreeModal extends PureComponent {

  onLoadData = treeNode => {
    const { onLoadFolderList } = this.props;
    return new Promise(resolve => {
      if (treeNode.props.children) { //如果已经存在子节点数据，不需要再次请求
        resolve();
        return;
      }

      onLoadFolderList(treeNode.props.eventKey);
      resolve();
    });
  }

  onSelect = (keys, event) => {
    // console.log('Trigger Select', keys, event);
    const { onSelectFolder } = this.props;
    const entity = event.node.props.dataRef;
    console.log('entity',entity);
    onSelectFolder(entity)
  };

  renderTreeNodes = data => {
    const { rootKey } = this.props
    return data.map(item => {
      const folderPath = item.path
      let treeNode = {
        id: item.id,
        title: folderPath === rootKey ? '全部文件' : folderPath && folderPath.substr(folderPath.lastIndexOf('/') + 1, folderPath.length),
        key: folderPath,
        isLeaf: item.dir ? false : true,
        icon: (props) => {
          return props.expanded ?
            <Icon style={{ fontSize: '24px' }} component={FolderOpenSvg} />
            : <Icon style={{ fontSize: '24px' }} component={FolderSvg} />
        }
      }

      if (item.children) {
        return (
          <TreeNode {...treeNode} dataRef={treeNode}>
            {this.renderTreeNodes(item.children)}
          </TreeNode>
        );
      }
      return <TreeNode {...treeNode} dataRef={treeNode} />;
    });
  }

  render() {
    const { rootKey, folderList, ...modalProps } = this.props;
    return (
      <Modal {...modalProps}>
        <div className={styles.treeDialog}>
          <DirectoryTree
            showIcon
            defaultExpandedKeys={[rootKey]}
            defaultSelectedKeys={[rootKey]}
            loadData={this.onLoadData}
            onSelect={this.onSelect}
          >
            {this.renderTreeNodes(folderList)}
          </DirectoryTree>
        </div>
      </Modal>
    )
  }
}


TreeModal.propTypes = {
  folderList: PropTypes.array,
}

export default TreeModal
