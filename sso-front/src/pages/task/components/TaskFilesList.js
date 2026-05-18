import React, { PureComponent } from 'react';
import { Tree } from 'antd';

const { TreeNode, DirectoryTree } = Tree;

class TaskFilesList extends PureComponent {
  state = {
    treeData: [],
    expandedKeys: []
  };

  componentDidMount() {
    const { taskPathId } = this.props;
    this.setState({
      treeData: [
        {
          title: '任务工作空间',
          key: '0',
          // path: taskPath,
          id: taskPathId
        },
      ],
      expandedKeys: ['0']
    })
  }

  onExpand = (keys, info) => {
    let { expandedKeys } = this.state;
    const selectedItem = info.node.props.dataRef;
    const nodeId = selectedItem.id;
    const expanded = info.expanded;
    if (!expanded) {
      expandedKeys = expandedKeys.filter(i => i !== nodeId);
    } else {
      expandedKeys.push(nodeId);
    }
    this.setState({ expandedKeys });
  }

  onSelect = (selectedKeys, info) => {
    const { setSelectedItem } = this.props;
    const selectedItem = info.node.props.dataRef;
    setSelectedItem(selectedItem);
  };

  onLoadData = treeNode => {
    const { onLoadFolderList } = this.props;
    const { expandedKeys } = this.state;
    return new Promise(resolve => {

      if (treeNode.props.children) { //如果已经存在子节点数据，不需要再次请求
        resolve();
        return;
      }

      onLoadFolderList(treeNode.props.dataRef.id).then(data => {
        treeNode.props.dataRef.children = data.map(item => {
          let element = {};
          if (item.dir) {
            element = {
              title: item.pathName,
              key: item.id,
              path: item.path,
              id: item.id,
              fileName:item.fileName
            }

          } else {
            element = {
              title: item.fileName,
              key: item.fileId,
              path: item.path,
              id: item.id,
              isLeaf: true,
              fileName:item.fileName
            }
          }

          return element;
        });

        expandedKeys.push(treeNode.props.dataRef.id);

        this.setState({
          treeData: [...this.state.treeData],
          expandedKeys
        });
        resolve();

      })
    });
  }

  renderTreeNodes = data =>
    data.map(item => {
      if (item.children) {
        return (
          <TreeNode title={item.title} key={item.id} dataRef={item}>
            {this.renderTreeNodes(item.children)}
          </TreeNode>
        );
      }
      return <TreeNode key={item.id} {...item} dataRef={item} />;
    });

  render() {
    const { expandedKeys } = this.state;
    return (
      <DirectoryTree
        loadData={this.onLoadData}
        expandedKeys={expandedKeys}
        onSelect={this.onSelect}
        onExpand={this.onExpand}
      >
        {this.renderTreeNodes(this.state.treeData)}
      </DirectoryTree>
    );
  }
}

export default TaskFilesList;
