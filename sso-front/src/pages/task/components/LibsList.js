import React, { PureComponent } from 'react';
import { Tree } from 'antd';
import styles from './LibsList.less';

const { TreeNode, DirectoryTree } = Tree;

class LibsList extends PureComponent {
  state = {
    treeData: [
      { title: '全部文件', key: '0', path: '/' },
    ],
  };

  onSelect = (selectedKeys, info) => {
    const { setSelectedItem } = this.props;
    const selectedItem = info.node.props.dataRef;
    setSelectedItem(selectedItem);
  };

  onLoadData = treeNode => {
    console.log('1');
    const { onLoadFolderList } = this.props;
    return new Promise(resolve => {

      if (treeNode.props.children) { //如果已经存在子节点数据，不需要再次请求
        resolve();
        return;
      }

      onLoadFolderList(treeNode.props.dataRef.path).then(data => {
        treeNode.props.dataRef.children = data.map(item => {
          let element = {};
          if (item.dir) {
            element = {
              title: item.pathName,
              key: item.id,
              path: item.path
            }
          } else {
            element = {
              title: item.fileName,
              key: item.id,
              path: item.path,
              isLeaf: true
            }
          }

          return element;
        });
        this.setState({
          treeData: [...this.state.treeData],
        });
        resolve();

      })
    });
  }

  renderTreeNodes = data =>
    data.map(item => {
      if (item.children) {
        return (
          <TreeNode title={item.title} key={item.key} dataRef={item}>
            {this.renderTreeNodes(item.children)}
          </TreeNode>
        );
      }
      return <TreeNode key={item.key} {...item} dataRef={item} />;
    });

  render() {
    return (
      <DirectoryTree
        loadData={this.onLoadData}
        defaultExpandedKeys={['0']}
        onSelect={this.onSelect}
      >
        {this.renderTreeNodes(this.state.treeData)}
      </DirectoryTree>
    );
  }
}

export default LibsList;
