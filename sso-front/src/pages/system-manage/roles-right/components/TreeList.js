import React from 'react'
import PropTypes from 'prop-types'
import { Tree, Button, Skeleton } from 'antd';

const { TreeNode } = Tree;

class TreeList extends React.Component {
    state = {
        checkedKeys: this.props.roleCheckedMenus
    };

    componentDidUpdate(prevProps) {
        const { roleCheckedMenus } = this.props
        if (prevProps.roleCheckedMenus !== roleCheckedMenus) {
            this.setState({
                checkedKeys: roleCheckedMenus
            })
        }
    }

    onCheck = (keys, event) => {
        this.setState({ checkedKeys: keys });
    };

    onSelect = (keys, event) => {
        const { checkedKeys } = this.state
        const selectedKey = event.node.props.eventKey
        if (selectedKey) {
            const item = checkedKeys.filter(element => element === selectedKey)
            if (item.length > 0) {
                checkedKeys.splice(checkedKeys.indexOf(selectedKey), 1)
            } else {
                checkedKeys.push(selectedKey)
            }
            this.setState({ checkedKeys })
        }
    };

    handleClick = (e) => {
        e.preventDefault();
        
        const { checkedKeys } = this.state
        const { onEditItem } = this.props

        onEditItem(checkedKeys)
    }

    renderTreeNodes = data =>
        data.map(item => {
            if (item.children) {
                return (
                    <TreeNode title={item.menuName} key={item.id} dataRef={item}>
                        {this.renderTreeNodes(item.children)}
                    </TreeNode>
                );
            }
            return <TreeNode key={item.id} title={item.menuName} />;
        });

    render() {
        const { loading, treeData, roleCheckedMenus, btnloading } = this.props
        const { checkedKeys } = this.state

        return (
            <Skeleton loading={loading}>
                <Tree
                    checkable
                    checkedKeys={checkedKeys}
                    defaultExpandAll={true}
                    onCheck={this.onCheck}
                    // onSelect={this.onSelect}
                >
                    {this.renderTreeNodes(treeData)}
                </Tree>
                <Button
                    type="primary"
                    style={{ marginLeft: '100px' }}
                    loading={btnloading}
                    onClick={this.handleClick}>
                    分配
                </Button>
            </Skeleton>
        )
    }
}

TreeList.propTypes = {
    onEditItem: PropTypes.func,
    // location: PropTypes.object,
}

export default TreeList
