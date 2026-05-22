# CRM 系统数据库设计文档

> 数据库版本：MySQL 8.0.28 | 来源：crm-prod-bak.sql | 分析日期：2026-05-22

---

## 目录

- [一、用户权限模块](#一用户权限模块)
  - [1.1 sys_user 用户表](#11-sys_user-用户表)
  - [1.2 sys_dept 部门表](#12-sys_dept-部门表)
  - [1.3 sys_post 职位表](#13-sys_post-职位表)
  - [1.4 sys_menu 菜单表](#14-sys_menu-菜单表)
  - [1.5 sys_post_menu 职位菜单关联表](#15-sys_post_menu-职位菜单关联表)
  - [1.6 oauth_client_details OAuth客户端表](#16-oauth_client_details-oauth客户端表)
  - [1.7 oauth_code OAuth授权码表](#17-oauth_code-oauth授权码表)
  - [1.8 权限模型说明](#18-权限模型说明)
- [二、线索管理模块](#二线索管理模块)
  - [2.1 disclosure_clue 公海线索表](#21-disclosure_clue-公海线索表)
  - [2.2 disclosure_user_rel 线索用户关联表](#22-disclosure_user_rel-线索用户关联表)
  - [2.3 disclosure_follow_up 线索跟进表](#23-disclosure_follow_up-线索跟进表)
  - [2.4 disclosure_rule 线索规则表](#24-disclosure_rule-线索规则表)
- [三、客户/供应商管理模块](#三客户供应商管理模块)
  - [3.1 customer 客户/供应商表](#31-customer-客户供应商表)
  - [3.2 customer_liaison 客户联系人表](#32-customer_liaison-客户联系人表)
  - [3.3 customer_follow_up 客户跟进表](#33-customer_follow_up-客户跟进表)
  - [3.4 customer_cooperation 客户合作记录表](#34-customer_cooperation-客户合作记录表)
  - [3.5 customer_tag 客户标签表](#35-customer_tag-客户标签表)
- [四、合同管理模块](#四合同管理模块)
  - [4.1 tb_contract 合同表](#41-tb_contract-合同表)
  - [4.2 tb_contract_attachment 合同附件表](#42-tb_contract_attachment-合同附件表)
  - [4.3 tb_contract_payment 合同付款表](#43-tb_contract_payment-合同付款表)
  - [4.4 tb_contract_follow_up 合同跟进表](#44-tb_contract_follow_up-合同跟进表)
  - [4.5 tb_contract_user_rel 合同用户关联表](#45-tb_contract_user_rel-合同用户关联表)
- [五、审批流程模块（BPM）](#五审批流程模块bpm)
  - [5.1 bpm_proc 流程定义表](#51-bpm_proc-流程定义表)
  - [5.2 bpm_proc_version 流程版本表](#52-bpm_proc_version-流程版本表)
  - [5.3 bpm_proc_node 流程节点定义表](#53-bpm_proc_node-流程节点定义表)
  - [5.4 bpm_proc_inst 流程实例表](#54-bpm_proc_inst-流程实例表)
  - [5.5 bpm_proc_inst_node 流程实例节点表](#55-bpm_proc_inst_node-流程实例节点表)
  - [5.6 bpm_proc_actor 流程参与者表](#56-bpm_proc_actor-流程参与者表)
  - [5.7 bpm_approval_record 审批记录表](#57-bpm_approval_record-审批记录表)
  - [5.8 bpm_proc_inst_attachment 流程实例附件表](#58-bpm_proc_inst_attachment-流程实例附件表)
  - [5.9 bpm_condition 条件管理表](#59-bpm_condition-条件管理表)
- [六、系统辅助模块](#六系统辅助模块)
  - [6.1 tb_dict 数据字典表](#61-tb_dict-数据字典表)
  - [6.2 sys_oplog 操作日志表](#62-sys_oplog-操作日志表)
  - [6.3 tb_info_log 客户档案日志表](#63-tb_info_log-客户档案日志表)
  - [6.4 broadcast_notification 广播通知表](#64-broadcast_notification-广播通知表)
  - [6.5 tb_message_fanout 消息广播表](#65-tb_message_fanout-消息广播表)
  - [6.6 tb_message_list 消息列表表](#66-tb_message_list-消息列表表)

---

# 一、用户权限模块

## 1.1 sys_user 用户表

| 字段 | 类型 | 必填 | 默认值 | 说明 |
|------|------|------|--------|------|
| id | bigint | PK | AUTO_INCREMENT | 用户ID |
| user_name | varchar(50) | N | NULL | 用户名 |
| phone | varchar(20) | N | NULL | 手机号 |
| email | varchar(255) | N | NULL | 邮件 |
| password | varchar(255) | N | NULL | 密码（bcrypt加密） |
| leader_id | bigint | N | NULL | 直接上级ID（关联 sys_user.id） |
| dept_id | int | N | NULL | 部门ID（关联 sys_dept.id） |
| post_id | int | N | NULL | 职位ID（关联 sys_post.id） |
| head_url | varchar(800) | N | NULL | 头像URL |
| create_by | bigint | N | NULL | 创建人ID |
| create_time | datetime | Y | CURRENT_TIMESTAMP | 创建时间 |
| update_by | bigint | N | NULL | 更新人ID |
| update_time | datetime | Y | CURRENT_TIMESTAMP ON UPDATE | 更新时间 |
| is_active | tinyint | N | 1 | 用户状态：1-正常；0-禁用 |
| del_flag | int | N | 0 | 删除标志：0-正常；1-已删除 |

**说明**：用户通过 `dept_id` + `post_id` 确定其所属部门和职位，职位关联菜单权限和数据权限。`leader_id` 形成上下级树形关系。

---

## 1.2 sys_dept 部门表

| 字段 | 类型 | 必填 | 默认值 | 说明 |
|------|------|------|--------|------|
| id | bigint | PK | AUTO_INCREMENT | 部门ID |
| name | varchar(30) | Y | '' | 部门名称 |
| create_by | bigint | N | NULL | 创建人ID |
| create_time | datetime | Y | CURRENT_TIMESTAMP | 创建时间 |
| update_by | bigint | N | NULL | 更新人ID |
| update_time | datetime | Y | CURRENT_TIMESTAMP ON UPDATE | 更新时间 |
| del_flag | int | Y | 0 | 删除标志：0-正常；1-已删除 |

**现有部门数据**：

| id | 部门名称 |
|----|---------|
| 1 | 公司高层 |
| 2 | 计算服务部 |
| 4 | 人事行政部 |
| 7 | EDA服务部 |
| 8 | 培训与市场部 |
| 9 | 招商部 |
| 10 | 项目管理部 |
| 11 | 财务部 |
| 15 | 销售副总 |

---

## 1.3 sys_post 职位表

| 字段 | 类型 | 必填 | 默认值 | 说明 |
|------|------|------|--------|------|
| id | bigint | PK | AUTO_INCREMENT | 职位ID |
| dept_id | int | N | NULL | 部门ID（关联 sys_dept.id） |
| name | varchar(30) | Y | '' | 职位名称 |
| data_scope | tinyint | Y | 1 | 数据范围（见枚举） |
| data_scope_dept_ids | varchar(500) | Y | '' | 自定义数据权限部门ID数组（data_scope=2时使用） |
| create_by | bigint | N | NULL | 创建人ID |
| create_time | datetime | Y | CURRENT_TIMESTAMP | 创建时间 |
| update_by | bigint | N | NULL | 更新人ID |
| update_time | datetime | Y | CURRENT_TIMESTAMP ON UPDATE | 更新时间 |
| del_flag | int | Y | 0 | 删除标志：0-正常；1-已删除 |

**data_scope 数据范围枚举**：

| 值 | 含义 |
|----|------|
| 1 | 全部数据权限 |
| 2 | 自定义数据权限（指定部门，见 data_scope_dept_ids） |
| 3 | 本部门数据权限 |
| 5 | 仅本人权限 |

**现有职位数据**：

| id | 部门 | 职位名称 | 数据范围 | 自定义部门 |
|----|------|---------|---------|-----------|
| 1 | 公司高层 | 董事长 | 1-全部 | - |
| 3 | EDA服务部 | 部门经理 | 3-本部门 | - |
| 10 | 计算服务部 | 总监 | 3-本部门 | - |
| 11 | 计算服务部 | 部门经理 | 3-本部门 | - |
| 12 | 公司高层 | 董事长助理 | 1-全部 | - |
| 24 | 人事行政部 | 部门经理 | 1-全部 | - |
| 25 | 人事行政部 | 行政专员 | 1-全部 | - |
| 26 | EDA服务部 | PDK开发工程师 | 5-仅本人 | - |
| 27 | 培训与市场部 | 部门经理 | 3-本部门 | - |
| 29 | 招商部 | 部门经理 | 2-自定义 | 2,8,9 |
| 35 | 计算服务部 | 产品经理 | 5-仅本人 | - |
| 37 | 计算服务部 | 平台开发工程师 | 5-仅本人 | - |
| 38 | 计算服务部 | 运维开发工程师 | 5-仅本人 | - |
| 41 | EDA服务部 | 销售经理 | 5-仅本人 | - |
| 51 | 计算服务部 | 系统管理员 | 1-全部 | - |
| 52 | 销售副总 | 销售副总 | 1-全部 | - |

---

## 1.4 sys_menu 菜单表

| 字段 | 类型 | 必填 | 默认值 | 说明 |
|------|------|------|--------|------|
| id | bigint | PK | AUTO_INCREMENT | 菜单ID |
| parent_id | bigint | N | NULL | 父菜单ID（0为顶级） |
| type | tinyint | N | NULL | 菜单类型（见枚举） |
| name | varchar(64) | N | '' | 菜单名称 |
| path | varchar(128) | N | '' | 路由路径（浏览器地址栏路径） |
| component | varchar(128) | N | NULL | 组件路径（Vue页面路径，省略.vue后缀） |
| perm | varchar(50) | N | NULL | 按钮权限标识（后端接口鉴权用） |
| url | varchar(255) | N | NULL | 按钮URL权限标识 |
| icon | varchar(64) | N | '' | 菜单图标 |
| sort | int | N | 0 | 排序（越小越靠前） |
| visible | tinyint(1) | N | 1 | 状态：0-禁用；1-开启 |
| redirect | varchar(128) | N | '' | 跳转路径 |
| create_time | datetime | Y | CURRENT_TIMESTAMP | 创建时间 |
| update_time | datetime | Y | CURRENT_TIMESTAMP ON UPDATE | 更新时间 |

**type 菜单类型枚举**：

| 值 | 含义 | 说明 |
|----|------|------|
| 1 | 菜单 | 可点击的页面 |
| 2 | 目录 | 菜单分组（侧边栏一级标题） |
| 3 | 外链 | 外部链接 |
| 4 | 按钮 | 页面内的操作按钮权限（不会出现在菜单栏） |

**菜单树结构（当前系统）**：

```
├── 首页 (/dashboard)
│   └── 首页 (dashboard/index)
├── 线索管理 (/clue)
│   ├── 公海资源 (clueMng/HighSeasResources/index)
│   │   └── 按钮: 创建线索/修改线索/删除线索/领取/分配
│   ├── 线索跟进 (clueMng/FollowUpOnClues/index)
│   │   └── 按钮: 我的线索-创建/编辑/删除/放回公海/跟进/转为客户/下属线索Tab页等
│   └── 线索规则 (clueMng/ClueRules)
├── 客户管理 (/customMng)
│   └── 客户信息 (customMng/customerInfo/index)
│       └── 按钮: 添加/编辑/删除/批量导出/批量导入/客户跟进
├── 合同管理 (/contractMng)
│   └── 合同管理 (contractMng/index)
│       └── 按钮: 新增/编辑/删除/下载模板/批量导入/合同跟进
├── 合同报表 (/contractReport)
│   └── 合同报表 (contractReport/index.vue)
├── 供应商管理 (/supplierMng)
│   └── 供应商管理 (supplierMng)
│       └── 按钮: 新增/修改/删除/供应商跟进
├── 系统管理 (/system)
│   ├── 菜单管理 (sysMng/menuMng/index)
│   ├── 数据字典 (sysMng/dicMng/index)
│   ├── 组织结构 (sysMng/organizationMng/index)
│   │   └── 按钮: 添加部门/修改部门/删除部门/菜单权限/数据权限/添加职位/修改职位/删除职位
│   ├── 用户管理 (sysMng/usersMng/index)
│   │   └── 按钮: 新增/搜索/修改/删除/启用停用/导出模板/批量导入
│   └── 用户行为日志 (userBehaviorLog)
├── 消息通知 (/newAndBroadcast)
│   └── 消息通知 (newAndBroadcast/index)
│       └── 按钮: 添加广播
├── 审批管理 (/approvalMng)
│   ├── 审批规则 (approvalMng/approvalRules)
│   └── 资源删除 (approvalMng/resourceDel)
└── 个人中心 (/personalCenter) [隐藏]
    └── 个人中心 (personalCenter)
```

**按钮权限标识（perm）汇总**：

| 模块 | perm | 说明 |
|------|------|------|
| 用户管理 | system:user:saveUser | 新增用户 |
| | system:user:getUserPageList | 搜索用户 |
| | system:user:updUser | 修改用户 |
| | system:user:delUser | 删除用户 |
| | system:user:editUserStatus | 启用/停用用户 |
| | system:user:downUserTemplate | 导出用户模板 |
| | system:user:insertUserBatch | 批量导入用户 |
| 菜单管理 | system:menu:listMenus | 搜索菜单 |
| | system:menu:saveMenu | 新增菜单 |
| | system:menu:updMenu | 修改菜单 |
| | system:menu:delMenus | 删除菜单 |
| 部门管理 | system:dept:saveDept | 添加部门 |
| | system:dept:updDept | 修改部门 |
| | system:dept:delDept | 删除部门 |
| 职位管理 | system:post:distributeMenu | 分配菜单权限 |
| | system:post:distributeDataScope | 分配数据权限 |
| | system:post:savePost | 添加职位 |
| | system:post:updPost | 修改职位 |
| | system:post:delPost | 删除职位 |
| 公海线索 | clue:disclosureClue:addOneClue | 创建线索 |
| | clue:disclosureClue:editOneClue | 修改线索 |
| | clue:disclosureClue:clueList | 删除线索 |
| | clue:disclosureClueUserRel:addMoreRel | 领取线索 |
| | clue:disclosureClueUserRel:distribute | 分配线索 |
| 我的线索 | clue:disclosureClueUserRel:addOneClue | 创建线索 |
| | clue:disclosureClueUserRel:editOneClue | 编辑线索 |
| | clue:disclosureClueUserRel:deleteMoreClue | 删除线索 |
| | clue:disclosureClueUserRel:releaseMoreClue | 放回公海 |
| | clue:disclosureClueUserRel:followUpOneClue | 跟进线索 |
| 下属线索 | subordinate:tabMenu | Tab页权限 |
| | subordinate:releaseMoreClue | 下属放回公海 |
| | subordinate:editOneClue | 编辑下属线索 |
| | subordinate:deleteMoreClue | 删除下属线索 |
| 客户管理 | customer:customerInfo:addOne | 添加客户 |
| | customer:customerInfo:addOneFromClue | 线索转客户 |
| | customer:customerInfo:editOne | 编辑客户 |
| | customer:customerInfo:customerList | 删除客户 |
| | customer:customerInfo:downCustomerTemplate | 导出客户模板 |
| | customer:customerInfo:batchImport | 批量导入客户 |
| | customerFollowUp:addOne | 客户跟进 |
| 合同管理 | contract:add | 新增合同 |
| | contract:update | 编辑合同 |
| | contract:delete | 删除合同 |
| | contract:downContractTemplate | 下载合同模板 |
| | contract:batchImport | 批量导入合同 |
| | contractFollowUp:addOne | 合同跟进 |
| 供应商管理 | supplier:supplierInfo:addOne | 新增供应商 |
| | supplier:supplierInfo:editOne | 修改供应商 |
| | supplier:supplierInfo:customerList | 删除供应商 |
| | supplierFollowUp:addOne | 供应商跟进 |
| 消息通知 | message:broadcastNotification:addOne | 添加广播 |

---

## 1.5 sys_post_menu 职位菜单关联表

| 字段 | 类型 | 必填 | 默认值 | 说明 |
|------|------|------|--------|------|
| id | bigint | PK | AUTO_INCREMENT | 主键 |
| post_id | int | Y | - | 职位ID（关联 sys_post.id） |
| menu_id | int | Y | - | 菜单ID（关联 sys_menu.id） |

**说明**：多对多中间表，一个职位可以关联多个菜单（包含页面菜单和按钮权限），一个菜单可以被多个职位使用。

---

## 1.6 oauth_client_details OAuth客户端表

| 字段 | 类型 | 必填 | 默认值 | 说明 |
|------|------|------|--------|------|
| client_id | varchar(255) | PK | - | 客户端标识 |
| resource_ids | varchar(255) | N | NULL | 接入资源列表 |
| client_secret | varchar(255) | N | NULL | 客户端秘钥（bcrypt加密） |
| scope | varchar(255) | N | NULL | 授权范围 |
| authorized_grant_types | varchar(255) | N | NULL | 授权类型（password,implicit,refresh_token,sms_code） |
| web_server_redirect_uri | varchar(255) | N | NULL | 重定向URI |
| authorities | varchar(255) | N | NULL | 权限 |
| access_token_validity | int | N | NULL | access_token有效期（秒） |
| refresh_token_validity | int | N | NULL | refresh_token有效期（秒） |
| additional_information | longtext | N | NULL | 附加信息（JSON） |
| create_time | timestamp | Y | CURRENT_TIMESTAMP | 创建时间 |
| archived | tinyint | N | NULL | 是否归档 |
| trusted | tinyint | N | NULL | 是否受信任 |
| autoapprove | varchar(255) | N | NULL | 自动授权 |

**现有数据**：client_id=`eda`，支持 password/implicit/refresh_token/sms_code 四种授权方式，access_token有效期12小时，refresh_token有效期3天。

---

## 1.7 oauth_code OAuth授权码表

| 字段 | 类型 | 必填 | 默认值 | 说明 |
|------|------|------|--------|------|
| create_time | timestamp | Y | CURRENT_TIMESTAMP | 创建时间 |
| code | varchar(255) | N | NULL | 授权码 |
| authentication | blob | N | NULL | 认证信息（序列化对象） |

**索引**：code_index (code)

---

## 1.8 权限模型说明

### 权限控制流程

```
用户登录 → 获取用户(post_id) → 获取职位关联菜单(sys_post_menu) → 生成权限列表

前端：
  1. 根据菜单树(type=1,2)渲染侧边栏导航
  2. 根据按钮权限(type=4, perm字段)控制按钮显示/隐藏
  3. 路由守卫校验菜单权限

后端：
  1. 接口层面通过perm标识进行权限校验
  2. 数据层面通过post.data_scope + data_scope_dept_ids控制数据可见范围
```

### 用户 → 权限 关系链

```
sys_user.post_id → sys_post.id
sys_post.id → sys_post_menu.post_id → sys_menu.id
sys_menu.perm → 后端接口权限标识
sys_menu.type → 前端菜单/按钮渲染
sys_post.data_scope → 数据范围控制
sys_user.leader_id → 上下级关系（用于"下属线索"等功能）
```

### 数据权限规则

- **data_scope=1（全部）**：可查看所有数据
- **data_scope=2（自定义）**：可查看 `data_scope_dept_ids` 中指定的部门数据
- **data_scope=3（本部门）**：可查看用户所属部门及下级部门的数据
- **data_scope=5（仅本人）**：只能查看自己创建的数据

---

# 二、线索管理模块

## 2.1 disclosure_clue 公海线索表

| 字段 | 类型 | 必填 | 默认值 | 说明 |
|------|------|------|--------|------|
| id | bigint | PK | AUTO_INCREMENT | 线索ID |
| clue_name | varchar(512) | N | NULL | 线索名称 |
| link_name | varchar(255) | N | NULL | 联系人 |
| link_phone | varchar(255) | N | NULL | 联系人电话 |
| company_type_id | int | N | NULL | 单位类型ID（关联 tb_dict） |
| location | varchar(512) | N | NULL | 所在地区 |
| full_address | varchar(512) | N | NULL | 详细地址 |
| consumer_level_id | int | N | NULL | 客户级别ID（关联 tb_dict） |
| consumer_intention_id | int | N | NULL | 客户意向ID（关联 tb_dict） |
| consumer_source_id | int | N | NULL | 客户来源ID（关联 tb_dict） |
| cooperation_area_id | int | N | NULL | 合作方向ID（关联 tb_dict） |
| customer_label | varchar(512) | N | NULL | 客户标签（逗号分隔的ID） |
| follow_up_status_id | int | N | NULL | 跟进状态ID（关联 tb_dict） |
| next_follow_up_date | date | N | NULL | 下次跟进日期 |
| remark | text | N | NULL | 备注 |
| status | int | N | NULL | 状态：1-启用；2-停用 |
| create_by | bigint | N | NULL | 创建人ID |
| create_at | datetime | N | NULL | 创建时间 |
| update_by | bigint | N | NULL | 更新人ID |
| update_at | datetime | N | NULL | 更新时间 |
| del_flag | int | N | 0 | 删除标志：0-正常；1-已删除 |

**说明**：公海中的线索资源，尚未被分配给具体销售。被领取后进入 `disclosure_user_rel` 关联到用户。

---

## 2.2 disclosure_user_rel 线索用户关联表

| 字段 | 类型 | 必填 | 默认值 | 说明 |
|------|------|------|--------|------|
| id | bigint | PK | AUTO_INCREMENT | 主键 |
| clue_id | bigint | N | NULL | 线索ID（关联 disclosure_clue.id） |
| user_id | bigint | N | NULL | 用户ID（关联 sys_user.id） |
| status | int | N | NULL | 状态：1-启用（已领取）；2-停用（已释放） |
| remark | text | N | NULL | 备注 |
| create_by | bigint | N | NULL | 创建人ID |
| create_at | datetime | N | NULL | 创建时间 |
| update_by | bigint | N | NULL | 更新人ID |
| update_at | datetime | N | NULL | 更新时间 |
| del_flag | int | N | 0 | 删除标志：0-正常；1-已删除 |

**说明**：线索与用户的关联关系。status=1 表示用户正在跟进该线索，status=2 表示线索已释放回公海。

---

## 2.3 disclosure_follow_up 线索跟进表

| 字段 | 类型 | 必填 | 默认值 | 说明 |
|------|------|------|--------|------|
| id | bigint | PK | AUTO_INCREMENT | 主键 |
| clue_id | bigint | N | NULL | 线索ID |
| user_id | bigint | N | NULL | 跟进人ID |
| content | text | N | NULL | 跟进内容 |
| consumer_intention_id | int | N | NULL | 客户意向ID（关联 tb_dict） |
| next_follow_up_date | date | N | NULL | 下次跟进日期 |
| follow_up_status_id | int | N | NULL | 跟进状态ID（关联 tb_dict） |
| follow_up_type_id | int | N | NULL | 跟进方式ID（关联 tb_dict） |
| status | int | N | NULL | 状态：1-启用；2-停用 |
| remark | text | N | NULL | 备注 |
| create_by | bigint | N | NULL | 创建人ID |
| create_at | datetime | N | NULL | 创建时间 |
| update_by | bigint | N | NULL | 更新人ID |
| update_at | datetime | N | NULL | 更新时间 |
| del_flag | int | N | 0 | 删除标志：0-正常；1-已删除 |

---

## 2.4 disclosure_rule 线索规则表

| 字段 | 类型 | 必填 | 默认值 | 说明 |
|------|------|------|--------|------|
| id | bigint | PK | AUTO_INCREMENT | 主键 |
| rule_name | varchar(512) | N | NULL | 规则名称 |
| rule_content | varchar(512) | N | NULL | 规则内容 |
| un_follow_day | int | N | NULL | 未跟进回收天数（从领取/分配起算，有跟进记录则重新计时） |
| un_conversion_day | int | N | NULL | 未转化回收天数（从领取/分配起算，未转为客户则回收） |
| remark | text | N | NULL | 备注 |
| status | int | N | NULL | 状态：1-启用；2-停用 |
| create_by | bigint | N | NULL | 创建人ID |
| create_at | datetime | N | NULL | 创建时间 |
| update_by | bigint | N | NULL | 更新人ID |
| update_at | datetime | N | NULL | 更新时间 |
| del_flag | int | N | 0 | 删除标志：0-正常；1-已删除 |

**说明**：公海线索自动回收规则。线索超期未跟进或未转化时自动释放回公海。

---

# 三、客户/供应商管理模块

## 3.1 customer 客户/供应商表

| 字段 | 类型 | 必填 | 默认值 | 说明 |
|------|------|------|--------|------|
| id | bigint | PK | AUTO_INCREMENT | 客户ID |
| clue_id | bigint | N | NULL | 来源线索ID（线索转客户时关联） |
| customer_name | varchar(512) | N | NULL | 客户名称 |
| link_name | varchar(255) | N | NULL | 联系人 |
| link_phone | varchar(255) | N | NULL | 联系人电话 |
| company_type_id | int | N | NULL | 单位类型ID（关联 tb_dict） |
| location | varchar(512) | N | NULL | 所在地区 |
| full_address | varchar(512) | N | NULL | 详细地址 |
| consumer_level_id | int | N | NULL | 客户级别ID（关联 tb_dict） |
| consumer_intention_id | int | N | NULL | 客户意向ID（关联 tb_dict） |
| consumer_type_id | int | N | NULL | 客户类型ID（关联 tb_dict） |
| consumer_source_id | int | N | NULL | 客户来源ID（关联 tb_dict） |
| cooperation_area_id | int | N | NULL | 合作方向ID（关联 tb_dict） |
| customer_label | varchar(512) | N | NULL | 客户标签（逗号分隔ID） |
| follow_up_status_id | int | N | NULL | 跟进状态ID（关联 tb_dict） |
| next_follow_up_date | date | N | NULL | 下次跟进日期 |
| remark | text | N | NULL | 公司介绍 |
| status | int | N | NULL | 状态：1-启用；2-停用 |
| create_by | bigint | N | NULL | 创建人ID |
| create_at | datetime | N | NULL | 创建时间 |
| update_by | bigint | N | NULL | 更新人ID |
| update_at | datetime | N | NULL | 更新时间 |
| del_flag | int | N | 0 | 删除标志：0-正常；1-已删除 |
| type | tinyint | N | NULL | 类型：1-客户；2-供应商 |
| note | varchar(500) | N | NULL | 备注信息 |
| supplier_type_id | int | N | NULL | 供应商类型ID（关联 tb_dict，type=2时使用） |
| cooperation_type_id | int | N | NULL | 合作类型ID（关联 tb_dict，type=2时使用） |
| track_user_id | int | N | NULL | 跟踪人用户ID（关联 sys_user.id） |

**说明**：客户和供应商共用一张表，通过 `type` 字段区分。type=1为客户，type=2为供应商。供应商额外字段 `supplier_type_id` 和 `cooperation_type_id`。

---

## 3.2 customer_liaison 客户联系人表

| 字段 | 类型 | 必填 | 默认值 | 说明 |
|------|------|------|--------|------|
| id | bigint | PK | AUTO_INCREMENT | 主键 |
| customer_id | bigint | N | NULL | 客户ID |
| link_name | varchar(255) | N | NULL | 联系人姓名 |
| link_phone | varchar(255) | N | NULL | 联系人电话 |
| wechat | varchar(512) | N | NULL | 微信号 |
| email | varchar(512) | N | NULL | 邮箱 |
| post | varchar(512) | N | NULL | 职务 |
| gender | varchar(255) | N | NULL | 性别：男/女/未知 |
| of_ruler | varchar(255) | N | NULL | 关键决策人：是/否/未知 |
| remark | text | N | NULL | 备注 |
| status | int | N | NULL | 状态：1-启用；2-停用 |
| create_by | bigint | N | NULL | 创建人ID |
| create_at | datetime | N | NULL | 创建时间 |
| update_by | bigint | N | NULL | 更新人ID |
| update_at | datetime | N | NULL | 更新时间 |
| del_flag | int | N | 0 | 删除标志：0-正常；1-已删除 |

**说明**：一个客户可以有多个联系人，多对一关系。

---

## 3.3 customer_follow_up 客户/供应商跟进表

| 字段 | 类型 | 必填 | 默认值 | 说明 |
|------|------|------|--------|------|
| id | bigint | PK | AUTO_INCREMENT | 主键 |
| customer_id | bigint | N | NULL | 客户ID（客户和供应商通用） |
| user_id | bigint | N | NULL | 跟进人ID |
| content | text | N | NULL | 跟进内容 |
| consumer_intention_id | int | N | NULL | 客户意向ID（关联 tb_dict） |
| next_follow_up_date | date | N | NULL | 下次跟进日期 |
| follow_up_status_id | int | N | NULL | 跟进状态ID（关联 tb_dict） |
| follow_up_type_id | int | N | NULL | 跟进方式ID（关联 tb_dict） |
| status | int | N | NULL | 状态：1-启用；2-停用 |
| remark | text | N | NULL | 备注 |
| create_by | bigint | N | NULL | 创建人ID |
| create_at | datetime | N | NULL | 创建时间 |
| update_by | bigint | N | NULL | 更新人ID |
| update_at | datetime | N | NULL | 更新时间 |
| del_flag | int | N | 0 | 删除标志：0-正常；1-已删除 |

---

## 3.4 customer_cooperation 客户合作记录表

| 字段 | 类型 | 必填 | 默认值 | 说明 |
|------|------|------|--------|------|
| id | bigint | PK | AUTO_INCREMENT | 主键 |
| customer_id | bigint | N | NULL | 客户ID |
| cooperation_area_id | int | N | NULL | 合作方向ID（关联 tb_dict） |
| remark | text | N | NULL | 备注 |
| status | int | N | NULL | 状态：1-启用；2-停用 |
| create_by | bigint | N | NULL | 创建人ID |
| create_at | datetime | N | NULL | 创建时间 |
| update_by | bigint | N | NULL | 更新人ID |
| update_at | datetime | N | NULL | 更新时间 |
| del_flag | int | N | 0 | 删除标志：0-正常；1-已删除 |

---

## 3.5 customer_tag 客户标签表

| 字段 | 类型 | 必填 | 默认值 | 说明 |
|------|------|------|--------|------|
| id | bigint | PK | AUTO_INCREMENT | 标签ID |
| tag_name | varchar(255) | N | NULL | 标签名称 |
| status | int | N | NULL | 状态：1-启用；2-停用 |
| create_by | bigint | N | NULL | 创建人ID |
| create_at | datetime | N | NULL | 创建时间 |
| update_by | bigint | N | NULL | 更新人ID |
| update_at | datetime | N | NULL | 更新时间 |
| del_flag | int | N | 0 | 删除标志：0-正常；1-已删除 |

**说明**：标签定义表。customer.customer_label 存储逗号分隔的标签ID。

---

# 四、合同管理模块

## 4.1 tb_contract 合同表

| 字段 | 类型 | 必填 | 默认值 | 说明 |
|------|------|------|--------|------|
| id | int UNSIGNED | PK | AUTO_INCREMENT | 合同ID |
| customer_id | int | N | NULL | 客户ID（关联 customer.id） |
| contract_type_id | int | N | NULL | 合同类型ID（关联 tb_dict） |
| cooperation_area_id | int | N | NULL | 合作方向ID（关联 tb_dict） |
| contract_name | varchar(255) | N | NULL | 合同名称 |
| contract_se | varchar(255) | N | NULL | 合同序号 |
| contract_no | varchar(255) | N | NULL | 合同编号 |
| start_time | date | N | NULL | 服务生效时间 |
| end_time | date | N | NULL | 服务结束时间 |
| payment_status | int | N | NULL | 付款状态（关联 tb_dict） |
| payment_time | date | N | NULL | 付款时间 |
| contract_amount | decimal(16,4) | N | NULL | 合同金额（成交金额） |
| rest_amount | decimal(16,4) | N | NULL | 剩余尾款 |
| user_id | int | N | NULL | 添加合同的用户ID |
| user_name | varchar(255) | N | NULL | 添加合同的用户姓名 |
| signatory_type | int | N | NULL | 签约类型（关联 tb_dict） |
| del_flag | tinyint | N | NULL | 删除标志：0-未删除；1-已删除 |
| update_by | int | N | NULL | 更新人ID |
| update_at | timestamp | N | NULL | 更新时间 |
| create_at | timestamp | Y | CURRENT_TIMESTAMP ON UPDATE | 创建时间 |

---

## 4.2 tb_contract_attachment 合同附件表

| 字段 | 类型 | 必填 | 默认值 | 说明 |
|------|------|------|--------|------|
| id | int UNSIGNED | PK | AUTO_INCREMENT | 主键 |
| contract_id | int | N | NULL | 合同ID |
| display_name | varchar(255) | N | '' | 展示文件名称 |
| real_name | varchar(255) | N | NULL | 真实文件名称（存储路径） |
| file_url | text | N | NULL | 文件URL |
| user_id | int | N | NULL | 上传用户ID |
| user_name | varchar(255) | N | NULL | 上传用户姓名 |
| del_flag | tinyint | N | NULL | 删除标志：0-未删除；1-已删除 |
| time_stamp | timestamp | Y | CURRENT_TIMESTAMP ON UPDATE | 更新时间 |

---

## 4.3 tb_contract_payment 合同付款表

| 字段 | 类型 | 必填 | 默认值 | 说明 |
|------|------|------|--------|------|
| id | int UNSIGNED | PK | AUTO_INCREMENT | 主键 |
| contract_id | int | N | NULL | 合同ID |
| payment_amount | decimal(16,4) | N | NULL | 付款金额 |
| payment_time | date | N | NULL | 付款时间 |
| create_at | timestamp | Y | CURRENT_TIMESTAMP ON UPDATE | 创建时间 |
| del_flag | tinyint | N | NULL | 删除标志：0-未删除；1-已删除 |

---

## 4.4 tb_contract_follow_up 合同跟进表

| 字段 | 类型 | 必填 | 默认值 | 说明 |
|------|------|------|--------|------|
| id | bigint | PK | AUTO_INCREMENT | 主键 |
| contract_id | bigint | N | NULL | 合同ID |
| user_id | bigint | N | NULL | 跟进人ID |
| content | text | N | NULL | 跟进内容 |
| consumer_intention_id | int | N | NULL | 客户意向ID |
| next_follow_up_date | date | N | NULL | 下次跟进日期 |
| follow_up_status_id | int | N | NULL | 跟进状态ID |
| follow_up_type_id | int | N | NULL | 跟进方式ID |
| status | int | N | NULL | 状态：1-启用；2-停用 |
| remark | text | N | NULL | 备注 |
| create_by | bigint | N | NULL | 创建人ID |
| create_at | datetime | N | NULL | 创建时间 |
| update_by | bigint | N | NULL | 更新人ID |
| update_at | datetime | N | NULL | 更新时间 |
| del_flag | int | N | 0 | 删除标志：0-正常；1-已删除 |

---

## 4.5 tb_contract_user_rel 合同用户关联表

| 字段 | 类型 | 必填 | 默认值 | 说明 |
|------|------|------|--------|------|
| id | int UNSIGNED | PK | AUTO_INCREMENT | 主键 |
| contract_id | int | N | NULL | 合同ID |
| user_id | int | N | NULL | 关联用户ID |
| create_by | bigint | N | NULL | 创建人ID |
| create_at | datetime | N | NULL | 创建时间 |
| del_flag | tinyint | N | NULL | 删除标志：0-未删除；1-已删除 |

---

# 五、审批流程模块（BPM）

## 5.1 bpm_proc 流程定义表

| 字段 | 类型 | 必填 | 默认值 | 说明 |
|------|------|------|--------|------|
| id | bigint | PK | - | 流程ID |
| proc_name | varchar(100) | Y | - | 流程名称 |
| status | char(2) | Y | '1' | 状态：0-停用；1-启用 |
| last_version_id | bigint | Y | - | 最后一个版本ID |
| del_flag | int | Y | 0 | 删除标志：0-正常；1-已删除 |
| proc_type | varchar(20) | N | NULL | 流程类型 |
| remark | varchar(500) | N | NULL | 流程介绍 |
| create_by | bigint | N | NULL | 创建人ID |
| create_time | datetime | Y | CURRENT_TIMESTAMP | 创建时间 |
| update_by | bigint | N | NULL | 更新人ID |
| update_time | datetime | Y | CURRENT_TIMESTAMP ON UPDATE | 更新时间 |

---

## 5.2 bpm_proc_version 流程版本表

| 字段 | 类型 | 必填 | 默认值 | 说明 |
|------|------|------|--------|------|
| id | bigint | PK | AUTO_INCREMENT | 版本ID |
| proc_id | bigint | Y | - | 流程ID |
| json | text | Y | - | 流程配置JSON（完整的节点配置） |
| create_by | bigint | N | NULL | 创建人ID |
| create_time | datetime | Y | CURRENT_TIMESTAMP | 创建时间 |

---

## 5.3 bpm_proc_node 流程节点定义表

| 字段 | 类型 | 必填 | 默认值 | 说明 |
|------|------|------|--------|------|
| id | bigint | PK | - | 节点ID |
| proc_id | bigint | Y | - | 流程ID |
| version_id | bigint | Y | - | 版本ID |
| parent_id | bigint | Y | - | 父级节点ID（一级节点为0） |
| router_id | bigint | N | NULL | 路由ID |
| skip_node_id | bigint | N | NULL | 跳转节点ID |
| node_name | varchar(100) | N | NULL | 节点名称 |
| node_type | varchar(100) | Y | - | 节点类型（见枚举） |
| set_type | int | N | NULL | 审批人设置类型（见枚举） |
| config | text | N | NULL | 条件节点配置JSON |
| handlers | varchar(255) | N | NULL | 审批人JSON数组 |

**node_type 节点类型枚举**：

| 值 | 含义 |
|----|------|
| 0 | 发起人 |
| 1 | 审批 |
| 2 | 抄送 |
| 3 | 条件 |
| 4 | 路由 |

**set_type 审批人设置类型枚举**：

| 值 | 含义 |
|----|------|
| 0 | 所有人 |
| 1 | 指定成员 |
| 2 | 主管 |
| 4 | 发起人自选 |
| 5 | 发起人自己 |
| 7 | 连续多级主管 |

---

## 5.4 bpm_proc_inst 流程实例表

| 字段 | 类型 | 必填 | 默认值 | 说明 |
|------|------|------|--------|------|
| id | bigint | PK | - | 实例ID |
| proc_id | bigint | Y | - | 流程ID |
| proc_name | varchar(100) | Y | - | 流程名称 |
| version_id | bigint | Y | - | 版本ID |
| inst_type | varchar(100) | N | NULL | 审批类型 |
| reason | varchar(500) | N | NULL | 申请事由 |
| remove_table | varchar(255) | N | NULL | 待删除的业务表名 |
| remove_ids | varchar(500) | Y | - | 待删除JSON数组ID |
| owner_id | bigint | Y | - | 发起人ID |
| owner_name | varchar(100) | Y | - | 发起人姓名 |
| run_status | char(2) | Y | '0' | 运行状态：0-未开始；1-进行中；2-已完成 |
| approval_status | char(2) | Y | '0' | 审批状态：0-草稿；1-审批中；2-挂起；3-撤消；4-通过；5-驳回 |
| submit_time | datetime | N | NULL | 提交时间 |
| finish_time | datetime | N | NULL | 完成时间 |
| node_config | text | N | NULL | 流程节点配置（JSON） |
| create_time | datetime | Y | CURRENT_TIMESTAMP | 创建时间 |
| update_time | datetime | N | CURRENT_TIMESTAMP | 更新时间 |
| del_flag | tinyint | N | 0 | 删除标志：0-正常；1-已删除 |

---

## 5.5 bpm_proc_inst_node 流程实例节点表

| 字段 | 类型 | 必填 | 默认值 | 说明 |
|------|------|------|--------|------|
| id | bigint | PK | - | 实例节点ID |
| proc_inst_id | bigint | Y | - | 流程实例ID |
| parent_id | bigint | Y | - | 父级节点ID（一级节点为0） |
| node_name | varchar(100) | Y | - | 节点名称 |
| node_type | varchar(100) | Y | - | 节点类型（同 bpm_proc_node） |
| status | char(2) | N | NULL | 节点状态：0-未开始；1-进行中；2-已完成 |
| config | text | N | NULL | 节点配置 |
| handlers | text | N | NULL | 处理者列表（JSON数组） |

---

## 5.6 bpm_proc_actor 流程参与者表

| 字段 | 类型 | 必填 | 默认值 | 说明 |
|------|------|------|--------|------|
| id | bigint | PK | - | 主键 |
| proc_inst_id | bigint | Y | - | 流程实例ID |
| type | char(2) | Y | - | 类型：1-申请人；2-审批者；3-被抄送者 |
| user_id | bigint | Y | - | 用户ID |
| handle_status | char(2) | Y | - | 处理状态：1-待处理；2-已处理 |
| handle_record_id | bigint | N | NULL | 审批记录ID |
| update_time | datetime | N | NULL | 更新时间 |

**唯一索引**：uni_actor (proc_inst_id, type, user_id)

---

## 5.7 bpm_approval_record 审批记录表

| 字段 | 类型 | 必填 | 默认值 | 说明 |
|------|------|------|--------|------|
| id | bigint | PK | - | 主键 |
| proc_inst_id | bigint | Y | - | 审批实例ID |
| node_id | bigint | Y | - | 节点ID |
| node_name | varchar(100) | Y | - | 节点名称 |
| node_type | varchar(45) | Y | - | 节点类型 |
| handler_id | bigint | Y | - | 处理人ID |
| handler_name | varchar(100) | Y | - | 处理人姓名 |
| handle_status | char(2) | Y | - | 处理状态：0-未开始；1-待处理；2-已处理 |
| handle_result | char(2) | N | NULL | 处理结果：1-通过；2-驳回；3-加签；4-委派；5-退回；6-撤消 |
| handle_opinion | varchar(200) | N | NULL | 处理意见 |
| handle_time | datetime | N | NULL | 处理时间 |
| create_time | datetime | Y | - | 创建时间 |

---

## 5.8 bpm_proc_inst_attachment 流程实例附件表

| 字段 | 类型 | 必填 | 默认值 | 说明 |
|------|------|------|--------|------|
| id | bigint UNSIGNED | PK | AUTO_INCREMENT | 主键 |
| proc_inst_id | bigint | N | NULL | 流程实例ID |
| display_name | varchar(255) | N | '' | 展示文件名称 |
| real_name | varchar(255) | N | NULL | 真实文件名称 |
| file_url | text | N | NULL | 文件链接 |
| user_id | int | N | NULL | 上传用户ID |
| user_name | varchar(255) | N | NULL | 上传用户姓名 |
| del_flag | tinyint | N | 0 | 删除标志：0-未删除；1-已删除 |
| time_stamp | timestamp | Y | CURRENT_TIMESTAMP ON UPDATE | 更新时间 |

---

## 5.9 bpm_condition 条件管理表

| 字段 | 类型 | 必填 | 默认值 | 说明 |
|------|------|------|--------|------|
| id | bigint | PK | AUTO_INCREMENT | 条件ID |
| node_name | varchar(100) | Y | - | 条件名称 |
| create_by | bigint | N | NULL | 创建人ID |
| create_time | datetime | Y | CURRENT_TIMESTAMP | 创建时间 |

---

# 六、系统辅助模块

## 6.1 tb_dict 数据字典表

| 字段 | 类型 | 必填 | 默认值 | 说明 |
|------|------|------|--------|------|
| id | int UNSIGNED | PK | AUTO_INCREMENT | 字典项ID |
| dict_name | varchar(255) | N | NULL | 字典名（如：单位类型） |
| short_name | varchar(255) | N | NULL | 字典简称（如：companyType） |
| item_name | varchar(255) | N | NULL | 字典项值（如：央企） |
| item_order | int | N | NULL | 字典项顺序 |
| del_flag | tinyint | N | NULL | 删除标志：0-未删除；1-已删除 |
| time_stamp | timestamp | Y | CURRENT_TIMESTAMP ON UPDATE | 更新时间 |

**字典分类汇总**（从数据中提取）：

| dict_name | short_name | 说明 |
|-----------|-----------|------|
| 单位类型 | companyType | 央企/国企/私企/政府/科研单位/外企等 |
| 合同类型 | - | 技术服务/产品加工等 |
| 合作方向 | - | MPW流片/EDA工具/IP授权/培训等 |
| 付款状态 | - | 51-未付款/52-部分付款/53-已付款/71-已结清等 |
| 签约类型 | - | 55-直接签约/其他 |
| 客户级别 | - | A/B/C/D级 |
| 客户意向 | - | 高/中/低/无意向等 |
| 客户来源 | - | 主动开发/转介绍/展会/网络等 |
| 跟进状态 | - | 待跟进/跟进中/已签约/已流失等 |
| 跟进方式 | - | 电话/微信/面访/邮件等 |
| 供应商类型 | - | 供应商分类 |
| 合作类型 | - | 合作类型分类 |

> 注：由于 tb_dict INSERT 数据量较大（约98条），具体字典项值在本文档中不做逐条列出，建议直接查阅数据库。

---

## 6.2 sys_oplog 操作日志表

| 字段 | 类型 | 必填 | 默认值 | 说明 |
|------|------|------|--------|------|
| id | bigint | PK | AUTO_INCREMENT | 主键 |
| user_name | varchar(50) | N | NULL | 用户名 |
| user_id | varchar(50) | N | NULL | 用户ID |
| operation | varchar(50) | N | NULL | 操作行为（如：合同文件下载） |
| method | varchar(100) | N | NULL | Java方法全路径 |
| params | varchar(200) | N | NULL | 方法参数 |
| ip | varchar(50) | N | NULL | 操作IP |
| create_time | datetime | Y | CURRENT_TIMESTAMP | 创建时间 |
| etc | varchar(255) | N | NULL | 额外信息 |

---

## 6.3 tb_info_log 客户档案日志表

| 字段 | 类型 | 必填 | 默认值 | 说明 |
|------|------|------|--------|------|
| id | int UNSIGNED | PK | AUTO_INCREMENT | 主键 |
| clue_id | int | N | NULL | 线索ID |
| customer_id | int | N | NULL | 客户ID |
| user_id | int | N | NULL | 操作用户ID |
| user_name | varchar(255) | N | NULL | 操作用户姓名 |
| log_info | varchar(255) | N | NULL | 日志标题（如：创建客户/编辑客户） |
| user_ip | varchar(255) | N | NULL | 操作IP |
| time_stamp | timestamp | Y | CURRENT_TIMESTAMP ON UPDATE | 创建时间 |

---

## 6.4 broadcast_notification 广播通知表

| 字段 | 类型 | 必填 | 默认值 | 说明 |
|------|------|------|--------|------|
| id | bigint | PK | AUTO_INCREMENT | 主键 |
| title | varchar(255) | N | NULL | 消息标题 |
| content | text | N | NULL | 消息内容 |
| publish_status | int | N | NULL | 发布状态：0-待发布；1-已发布；2-已撤销 |
| message_status | int | N | NULL | 生效状态：0-未开始；1-已开始；2-已结束 |
| start_time | datetime | N | NULL | 开始时间 |
| end_time | datetime | N | NULL | 结束时间 |
| create_by | bigint | N | NULL | 创建人ID |
| create_at | datetime | N | NULL | 创建时间 |
| update_by | bigint | N | NULL | 更新人ID |
| update_at | datetime | N | NULL | 更新时间 |
| del_flag | int | N | 0 | 删除标志：0-正常；1-已删除 |

---

## 6.5 tb_message_fanout 消息广播表

| 字段 | 类型 | 必填 | 默认值 | 说明 |
|------|------|------|--------|------|
| id | int | PK | AUTO_INCREMENT | 主键 |
| message_title | varchar(255) | N | NULL | 消息标题 |
| message_info | varchar(255) | N | NULL | 消息内容 |
| publish_status | tinyint(1) | N | NULL | 发布状态：0-待发布；1-已发布；2-已撤销 |
| message_status | tinyint(1) | N | NULL | 生效状态：0-未开始；1-已开始；2-已结束 |
| start_time | datetime | N | NULL | 开始时间 |
| end_time | datetime | N | NULL | 结束时间 |
| creat_user | varchar(255) | N | NULL | 创建人ID |
| creare_user_name | varchar(255) | N | NULL | 创建人姓名 |
| is_deleted | tinyint(1) | N | NULL | 是否删除 |

---

## 6.6 tb_message_list 消息列表表

| 字段 | 类型 | 必填 | 默认值 | 说明 |
|------|------|------|--------|------|
| id | int UNSIGNED | PK | AUTO_INCREMENT | 主键 |
| msg_id | varchar(64) | N | NULL | 消息ID（生产者自定义，可为空） |
| msg_title | varchar(255) | N | NULL | 消息标题 |
| msg_info | text | N | NULL | 消息内容 |
| from_app | varchar(64) | N | NULL | 消息来源应用 |
| from_userid | varchar(64) | N | NULL | 消息来源用户ID |
| to_app | varchar(64) | N | NULL | 消息消费应用 |
| to_userid | varchar(64) | N | NULL | 消息消费用户ID |
| create_time | timestamp | N | NULL | 创建时间 |
| expiration_time | timestamp | N | NULL | 过期时间 |
| msg_type | varchar(5) | N | NULL | 消息类型：0-通知；1-告警；2-广播；2.1-广播(优惠活动推广) |
| msg_status | varchar(1) | N | NULL | 消息状态：0-正常；1-已读；2-已删除 |
| if_expired | tinyint(1) | N | NULL | 是否过期 |

---

## 表间关系总览

```
sys_user ──┬── sys_dept (user.dept_id → dept.id)
           ├── sys_post (user.post_id → post.id)
           ├── sys_user (user.leader_id → user.id) 上下级
           └── sys_post_menu (post.id → post_menu.post_id)
                        └── sys_menu (post_menu.menu_id → menu.id)

customer ──┬── tb_dict (多个字典字段)
           ├── disclosure_clue (customer.clue_id → clue.id) 线索转客户
           ├── customer_liaison (liaison.customer_id → customer.id)
           ├── customer_follow_up (follow_up.customer_id → customer.id)
           ├── customer_cooperation (cooperation.customer_id → customer.id)
           └── sys_user (customer.track_user_id → user.id)

disclosure_clue ──┬── disclosure_user_rel (clue.id → rel.clue_id)
                   ├── disclosure_follow_up (follow_up.clue_id → clue.id)
                   └── tb_dict (多个字典字段)

tb_contract ──┬── customer (contract.customer_id → customer.id)
              ├── tb_contract_attachment (attachment.contract_id → contract.id)
              ├── tb_contract_payment (payment.contract_id → contract.id)
              ├── tb_contract_follow_up (follow_up.contract_id → contract.id)
              ├── tb_contract_user_rel (rel.contract_id → contract.id)
              └── tb_dict (多个字典字段)

bpm_proc ──┬── bpm_proc_version (version.proc_id → proc.id)
            ├── bpm_proc_node (node.proc_id → proc.id)
            └── bpm_proc_inst (inst.proc_id → proc.id)
                        ├── bpm_proc_inst_node (inst_node.proc_inst_id → inst.id)
                        ├── bpm_proc_actor (actor.proc_inst_id → inst.id)
                        ├── bpm_approval_record (record.proc_inst_id → inst.id)
                        └── bpm_proc_inst_attachment (attachment.proc_inst_id → inst.id)
```

---

## 备注表（历史备份，非核心业务）

| 表名 | 说明 |
|------|------|
| customer_copy1 | 客户表的历史备份版本（不含供应商相关字段），不建议在新系统中使用 |
| tb_contract_20250708_v2.1 | 合同表的某版本备份 |
| tb_contract_attachment_20041122 | 合同附件表的备份 |

> 这些表为历史数据备份，新系统开发时建议忽略。
