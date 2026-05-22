/*
 CRM 系统数据库建表 SQL
 数据库版本：MySQL 8.0.28
 生成日期：2026-05-22
 说明：仅包含表结构，不含 INSERT 数据
 已排除历史备份表：customer_copy1, tb_contract_20250708_v2.1, tb_contract_attachment_20041122
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ============================================
-- 一、用户权限模块
-- ============================================

-- ----------------------------
-- 1.1 部门表
-- ----------------------------
DROP TABLE IF EXISTS `sys_dept`;
CREATE TABLE `sys_dept`  (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '部门id',
  `name` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '部门名称',
  `create_by` bigint NULL DEFAULT NULL COMMENT '创建人id',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_by` bigint NULL DEFAULT NULL COMMENT '更新人id',
  `update_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `del_flag` int NOT NULL DEFAULT 0 COMMENT '0-正常 1-已删除',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci COMMENT = '部门表' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- 1.2 菜单表
-- ----------------------------
DROP TABLE IF EXISTS `sys_menu`;
CREATE TABLE `sys_menu`  (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `parent_id` bigint NULL DEFAULT NULL COMMENT '父菜单ID',
  `type` tinyint NULL DEFAULT NULL COMMENT '菜单类型(1：菜单；2：目录；3：外链；4：按钮)',
  `name` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT '' COMMENT '菜单名称',
  `path` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT '' COMMENT '路由路径(浏览器地址栏路径)',
  `component` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '组件路径(vue页面完整路径，省略.vue后缀)',
  `perm` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '按钮权限标识',
  `url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '按钮url权限标识',
  `icon` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT '' COMMENT '菜单图标',
  `sort` int NULL DEFAULT 0 COMMENT '排序',
  `visible` tinyint(1) NULL DEFAULT 1 COMMENT '状态(0:禁用;1:开启)',
  `redirect` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT '' COMMENT '跳转路径',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '菜单管理' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- 1.3 职位表
-- ----------------------------
DROP TABLE IF EXISTS `sys_post`;
CREATE TABLE `sys_post`  (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '职位id',
  `dept_id` int NULL DEFAULT NULL COMMENT '部门id',
  `name` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '职位名称',
  `data_scope` tinyint NOT NULL DEFAULT 1 COMMENT '数据范围（1：全部数据权限 2：自定数据权限(指定部门) 3：本部门数据权限 5：仅本人权限）',
  `data_scope_dept_ids` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '数据范围(指定部门数组)',
  `create_by` bigint NULL DEFAULT NULL COMMENT '创建人id',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_by` bigint NULL DEFAULT NULL COMMENT '更新人id',
  `update_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `del_flag` int NOT NULL DEFAULT 0 COMMENT '0-正常 1-已删除',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci COMMENT = '职位表' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- 1.4 职位菜单关联表
-- ----------------------------
DROP TABLE IF EXISTS `sys_post_menu`;
CREATE TABLE `sys_post_menu`  (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT 'id',
  `post_id` int NOT NULL COMMENT '职位ID',
  `menu_id` int NOT NULL COMMENT '菜单ID',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci COMMENT = '职位菜单关联表' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- 1.5 用户表
-- ----------------------------
DROP TABLE IF EXISTS `sys_user`;
CREATE TABLE `sys_user`  (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '用户名',
  `phone` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '手机号',
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '邮件',
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '密码',
  `leader_id` bigint NULL DEFAULT NULL COMMENT '直接上级ID',
  `dept_id` int NULL DEFAULT NULL COMMENT '部门ID',
  `post_id` int NULL DEFAULT NULL COMMENT '职位ID',
  `head_url` varchar(800) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '头像',
  `create_by` bigint NULL DEFAULT NULL COMMENT '创建人id',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_by` bigint NULL DEFAULT NULL COMMENT '更新人id',
  `update_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `is_active` tinyint NULL DEFAULT 1 COMMENT '用户状态 1:正常;0:禁用',
  `del_flag` int NULL DEFAULT 0 COMMENT '0-正常 1-已删除',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci COMMENT = '用户表' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- 1.6 OAuth客户端表
-- ----------------------------
DROP TABLE IF EXISTS `oauth_client_details`;
CREATE TABLE `oauth_client_details`  (
  `client_id` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '客户端标识',
  `resource_ids` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '接入资源列表',
  `client_secret` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '客户端秘钥',
  `scope` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `authorized_grant_types` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `web_server_redirect_uri` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `authorities` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `access_token_validity` int NULL DEFAULT NULL,
  `refresh_token_validity` int NULL DEFAULT NULL,
  `additional_information` longtext CHARACTER SET utf8 COLLATE utf8_general_ci NULL,
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `archived` tinyint NULL DEFAULT NULL,
  `trusted` tinyint NULL DEFAULT NULL,
  `autoapprove` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`client_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '接入客户端信息' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- 1.7 OAuth授权码表
-- ----------------------------
DROP TABLE IF EXISTS `oauth_code`;
CREATE TABLE `oauth_code`  (
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `code` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `authentication` blob NULL,
  INDEX `code_index`(`code` ASC) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ============================================
-- 二、线索管理模块
-- ============================================

-- ----------------------------
-- 2.1 公海线索表
-- ----------------------------
DROP TABLE IF EXISTS `disclosure_clue`;
CREATE TABLE `disclosure_clue`  (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `clue_name` varchar(512) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '线索名称',
  `link_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '联系人',
  `link_phone` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '联系人电话',
  `company_type_id` int NULL DEFAULT NULL COMMENT '单位类型id-详见字典表',
  `location` varchar(512) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '所在地区',
  `full_address` varchar(512) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '详细地址',
  `consumer_level_id` int NULL DEFAULT NULL COMMENT '客户级别id-详见字典表',
  `consumer_intention_id` int NULL DEFAULT NULL COMMENT '客户意向id-详见字典表',
  `consumer_source_id` int NULL DEFAULT NULL COMMENT '客户来源id-详见字典表',
  `cooperation_area_id` int NULL DEFAULT NULL COMMENT '合作方向id-详见字典表',
  `customer_label` varchar(512) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '客户标签',
  `follow_up_status_id` int NULL DEFAULT NULL COMMENT '跟进状态-详见字典表',
  `next_follow_up_date` date NULL DEFAULT NULL COMMENT '下次跟进日期',
  `remark` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT '备注',
  `status` int NULL DEFAULT NULL COMMENT '状态：1-启用 2-停用',
  `create_by` bigint NULL DEFAULT NULL COMMENT '创建人id',
  `create_at` datetime NULL DEFAULT NULL COMMENT '创建时间',
  `update_by` bigint NULL DEFAULT NULL COMMENT '更新人id',
  `update_at` datetime NULL DEFAULT NULL COMMENT '更新时间',
  `del_flag` int NULL DEFAULT 0 COMMENT '0-正常 1-已删除',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '公海资源：客户线索资源' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- 2.2 线索用户关联表
-- ----------------------------
DROP TABLE IF EXISTS `disclosure_user_rel`;
CREATE TABLE `disclosure_user_rel`  (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `clue_id` bigint NULL DEFAULT NULL COMMENT '线索id',
  `user_id` bigint NULL DEFAULT NULL COMMENT '用户id',
  `status` int NULL DEFAULT NULL COMMENT '状态：1-启用 2-停用',
  `remark` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT '备注',
  `create_by` bigint NULL DEFAULT NULL COMMENT '创建人id',
  `create_at` datetime NULL DEFAULT NULL COMMENT '创建时间',
  `update_by` bigint NULL DEFAULT NULL COMMENT '更新人id',
  `update_at` datetime NULL DEFAULT NULL COMMENT '更新时间',
  `del_flag` int NULL DEFAULT 0 COMMENT '0-正常 1-已删除',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '线索用户关联' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- 2.3 线索跟进表
-- ----------------------------
DROP TABLE IF EXISTS `disclosure_follow_up`;
CREATE TABLE `disclosure_follow_up`  (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `clue_id` bigint NULL DEFAULT NULL COMMENT '线索id',
  `user_id` bigint NULL DEFAULT NULL COMMENT '用户id',
  `content` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT '内容',
  `consumer_intention_id` int NULL DEFAULT NULL COMMENT '客户意向id-详见字典表',
  `next_follow_up_date` date NULL DEFAULT NULL COMMENT '下次跟进日期',
  `follow_up_status_id` int NULL DEFAULT NULL COMMENT '跟进状态id-详见字典表',
  `follow_up_type_id` int NULL DEFAULT NULL COMMENT '跟进方式id-详见字典表',
  `status` int NULL DEFAULT NULL COMMENT '状态：1-启用 2-停用',
  `remark` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT '备注',
  `create_by` bigint NULL DEFAULT NULL COMMENT '创建人id',
  `create_at` datetime NULL DEFAULT NULL COMMENT '创建时间',
  `update_by` bigint NULL DEFAULT NULL COMMENT '更新人id',
  `update_at` datetime NULL DEFAULT NULL COMMENT '更新时间',
  `del_flag` int NULL DEFAULT 0 COMMENT '0-正常 1-已删除',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '线索跟进' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- 2.4 线索规则表
-- ----------------------------
DROP TABLE IF EXISTS `disclosure_rule`;
CREATE TABLE `disclosure_rule`  (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `rule_name` varchar(512) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '规则名称',
  `rule_content` varchar(512) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '规则内容',
  `un_follow_day` int NULL DEFAULT NULL COMMENT '未跟进回收天数',
  `un_conversion_day` int NULL DEFAULT NULL COMMENT '未转化回收天数',
  `remark` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT '备注',
  `status` int NULL DEFAULT NULL COMMENT '状态：1-启用 2-停用',
  `create_by` bigint NULL DEFAULT NULL COMMENT '创建人id',
  `create_at` datetime NULL DEFAULT NULL COMMENT '创建时间',
  `update_by` bigint NULL DEFAULT NULL COMMENT '更新人id',
  `update_at` datetime NULL DEFAULT NULL COMMENT '更新时间',
  `del_flag` int NULL DEFAULT 0 COMMENT '0-正常 1-已删除',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '公海资源：线索管理的规则' ROW_FORMAT = DYNAMIC;

-- ============================================
-- 三、客户/供应商管理模块
-- ============================================

-- ----------------------------
-- 3.1 客户标签表
-- ----------------------------
DROP TABLE IF EXISTS `customer_tag`;
CREATE TABLE `customer_tag`  (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `tag_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT 'tag名称',
  `status` int NULL DEFAULT NULL COMMENT '状态：1-启用 2-停用',
  `create_by` bigint NULL DEFAULT NULL COMMENT '创建人id',
  `create_at` datetime NULL DEFAULT NULL COMMENT '创建时间',
  `update_by` bigint NULL DEFAULT NULL COMMENT '更新人id',
  `update_at` datetime NULL DEFAULT NULL COMMENT '更新时间',
  `del_flag` int NULL DEFAULT 0 COMMENT '0-正常 1-已删除',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '客户标签表' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- 3.2 客户/供应商表
-- ----------------------------
DROP TABLE IF EXISTS `customer`;
CREATE TABLE `customer`  (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `clue_id` bigint NULL DEFAULT NULL COMMENT '如果是线索转客户，则关联来源线索id',
  `customer_name` varchar(512) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '客户名称',
  `link_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '联系人',
  `link_phone` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '联系人电话',
  `company_type_id` int NULL DEFAULT NULL COMMENT '单位类型id-详见字典表',
  `location` varchar(512) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '所在地区',
  `full_address` varchar(512) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '详细地址',
  `consumer_level_id` int NULL DEFAULT NULL COMMENT '客户级别id-详见字典表',
  `consumer_intention_id` int NULL DEFAULT NULL COMMENT '客户意向id-详见字典表',
  `consumer_type_id` int NULL DEFAULT NULL COMMENT '客户类型id-详见字典表',
  `consumer_source_id` int NULL DEFAULT NULL COMMENT '客户来源id-详见字典表',
  `cooperation_area_id` int NULL DEFAULT NULL COMMENT '合作方向id-详见字典表',
  `customer_label` varchar(512) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '客户标签',
  `follow_up_status_id` int NULL DEFAULT NULL COMMENT '跟进状态-详见字典表',
  `next_follow_up_date` date NULL DEFAULT NULL COMMENT '下次跟进日期',
  `remark` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT '公司介绍',
  `status` int NULL DEFAULT NULL COMMENT '状态：1-启用 2-停用',
  `create_by` bigint NULL DEFAULT NULL COMMENT '创建人id',
  `create_at` datetime NULL DEFAULT NULL COMMENT '创建时间',
  `update_by` bigint NULL DEFAULT NULL COMMENT '更新人id',
  `update_at` datetime NULL DEFAULT NULL COMMENT '更新时间',
  `del_flag` int NULL DEFAULT 0 COMMENT '0-正常 1-已删除',
  `type` tinyint NULL DEFAULT NULL COMMENT '1=客户 2=供应商',
  `note` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '备注信息',
  `supplier_type_id` int NULL DEFAULT NULL COMMENT '供应商类型id-详见字典表',
  `cooperation_type_id` int NULL DEFAULT NULL COMMENT '合作类型id-详见字典表',
  `track_user_id` int NULL DEFAULT NULL COMMENT '跟踪人用户id',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '客户表' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- 3.3 客户联系人表
-- ----------------------------
DROP TABLE IF EXISTS `customer_liaison`;
CREATE TABLE `customer_liaison`  (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `customer_id` bigint NULL DEFAULT NULL COMMENT '客户id',
  `link_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '联系人',
  `link_phone` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '联系人电话',
  `wechat` varchar(512) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '微信号',
  `email` varchar(512) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '邮箱',
  `post` varchar(512) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '职务',
  `gender` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '性别：男/女/未知',
  `of_ruler` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '关键决策人：是/否/未知',
  `remark` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT '备注',
  `status` int NULL DEFAULT NULL COMMENT '状态：1-启用 2-停用',
  `create_by` bigint NULL DEFAULT NULL COMMENT '创建人id',
  `create_at` datetime NULL DEFAULT NULL COMMENT '创建时间',
  `update_by` bigint NULL DEFAULT NULL COMMENT '更新人id',
  `update_at` datetime NULL DEFAULT NULL COMMENT '更新时间',
  `del_flag` int NULL DEFAULT 0 COMMENT '0-正常 1-已删除',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '客户联系人' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- 3.4 客户跟进表
-- ----------------------------
DROP TABLE IF EXISTS `customer_follow_up`;
CREATE TABLE `customer_follow_up`  (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `customer_id` bigint NULL DEFAULT NULL COMMENT '客户id',
  `user_id` bigint NULL DEFAULT NULL COMMENT '用户id',
  `content` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT '内容',
  `consumer_intention_id` int NULL DEFAULT NULL COMMENT '客户意向id-详见字典表',
  `next_follow_up_date` date NULL DEFAULT NULL COMMENT '下次跟进日期',
  `follow_up_status_id` int NULL DEFAULT NULL COMMENT '跟进状态id-详见字典表',
  `follow_up_type_id` int NULL DEFAULT NULL COMMENT '跟进方式id-详见字典表',
  `status` int NULL DEFAULT NULL COMMENT '状态：1-启用 2-停用',
  `remark` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT '备注',
  `create_by` bigint NULL DEFAULT NULL COMMENT '创建人id',
  `create_at` datetime NULL DEFAULT NULL COMMENT '创建时间',
  `update_by` bigint NULL DEFAULT NULL COMMENT '更新人id',
  `update_at` datetime NULL DEFAULT NULL COMMENT '更新时间',
  `del_flag` int NULL DEFAULT 0 COMMENT '0-正常 1-已删除',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '客户/供应商跟进' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- 3.5 客户合作记录表
-- ----------------------------
DROP TABLE IF EXISTS `customer_cooperation`;
CREATE TABLE `customer_cooperation`  (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `customer_id` bigint NULL DEFAULT NULL COMMENT '客户id',
  `cooperation_area_id` int NULL DEFAULT NULL COMMENT '合作方向id-详见字典表',
  `remark` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT '备注',
  `status` int NULL DEFAULT NULL COMMENT '状态：1-启用 2-停用',
  `create_by` bigint NULL DEFAULT NULL COMMENT '创建人id',
  `create_at` datetime NULL DEFAULT NULL COMMENT '创建时间',
  `update_by` bigint NULL DEFAULT NULL COMMENT '更新人id',
  `update_at` datetime NULL DEFAULT NULL COMMENT '更新时间',
  `del_flag` int NULL DEFAULT 0 COMMENT '0-正常 1-已删除',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '客户合作记录表' ROW_FORMAT = DYNAMIC;

-- ============================================
-- 四、合同管理模块
-- ============================================

-- ----------------------------
-- 4.1 合同表
-- ----------------------------
DROP TABLE IF EXISTS `tb_contract`;
CREATE TABLE `tb_contract`  (
  `id` int UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '主键',
  `customer_id` int NULL DEFAULT NULL COMMENT '客户ID',
  `contract_type_id` int NULL DEFAULT NULL COMMENT '合同类型ID',
  `cooperation_area_id` int NULL DEFAULT NULL COMMENT '合作方向ID',
  `contract_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '合同名称',
  `contract_se` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '合同序号',
  `contract_no` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '合同编号',
  `start_time` date NULL DEFAULT NULL COMMENT '服务生效时间',
  `end_time` date NULL DEFAULT NULL COMMENT '服务结束时间',
  `payment_status` int NULL DEFAULT NULL COMMENT '付款状态',
  `payment_time` date NULL DEFAULT NULL COMMENT '付款时间',
  `contract_amount` decimal(16, 4) NULL DEFAULT NULL COMMENT '合同金额(成交金额)',
  `rest_amount` decimal(16, 4) NULL DEFAULT NULL COMMENT '剩余尾款',
  `user_id` int NULL DEFAULT NULL COMMENT '添加合同的用户ID',
  `user_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '添加合同的用户姓名',
  `signatory_type` int NULL DEFAULT NULL COMMENT '签约类型',
  `del_flag` tinyint NULL DEFAULT NULL COMMENT '是否删除(0:未删除;1:已删除)',
  `update_by` int NULL DEFAULT NULL COMMENT '更新人的ID',
  `update_at` timestamp NULL DEFAULT NULL COMMENT '更新时间',
  `create_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '创建时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '合同管理表' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- 4.2 合同附件表
-- ----------------------------
DROP TABLE IF EXISTS `tb_contract_attachment`;
CREATE TABLE `tb_contract_attachment`  (
  `id` int UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '主键',
  `contract_id` int NULL DEFAULT NULL COMMENT '合同ID',
  `display_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT '' COMMENT '展示文件名称',
  `real_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '真实文件名称',
  `file_url` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT '文件链接',
  `user_id` int NULL DEFAULT NULL COMMENT '添加合同附件的用户ID',
  `user_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '添加合同附件的用户姓名',
  `del_flag` tinyint NULL DEFAULT NULL COMMENT '是否删除(0:未删除;1:已删除)',
  `time_stamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '合同附件表' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- 4.3 合同付款表
-- ----------------------------
DROP TABLE IF EXISTS `tb_contract_payment`;
CREATE TABLE `tb_contract_payment`  (
  `id` int UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '主键',
  `contract_id` int NULL DEFAULT NULL COMMENT '合同ID',
  `payment_amount` decimal(16, 4) NULL DEFAULT NULL COMMENT '付款金额',
  `payment_time` date NULL DEFAULT NULL COMMENT '付款时间',
  `create_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '创建时间',
  `del_flag` tinyint NULL DEFAULT NULL COMMENT '是否删除(0:未删除;1:已删除)',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '合同付款表' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- 4.4 合同跟进表
-- ----------------------------
DROP TABLE IF EXISTS `tb_contract_follow_up`;
CREATE TABLE `tb_contract_follow_up`  (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `contract_id` bigint NULL DEFAULT NULL COMMENT '合同id',
  `user_id` bigint NULL DEFAULT NULL COMMENT '用户id',
  `content` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT '内容',
  `consumer_intention_id` int NULL DEFAULT NULL COMMENT '客户意向id-详见字典表',
  `next_follow_up_date` date NULL DEFAULT NULL COMMENT '下次跟进日期',
  `follow_up_status_id` int NULL DEFAULT NULL COMMENT '跟进状态id-详见字典表',
  `follow_up_type_id` int NULL DEFAULT NULL COMMENT '跟进方式id-详见字典表',
  `status` int NULL DEFAULT NULL COMMENT '状态：1-启用 2-停用',
  `remark` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT '备注',
  `create_by` bigint NULL DEFAULT NULL COMMENT '创建人id',
  `create_at` datetime NULL DEFAULT NULL COMMENT '创建时间',
  `update_by` bigint NULL DEFAULT NULL COMMENT '更新人id',
  `update_at` datetime NULL DEFAULT NULL COMMENT '更新时间',
  `del_flag` int NULL DEFAULT 0 COMMENT '0-正常 1-已删除',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '合同跟进' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- 4.5 合同用户关联表
-- ----------------------------
DROP TABLE IF EXISTS `tb_contract_user_rel`;
CREATE TABLE `tb_contract_user_rel`  (
  `id` int UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '主键',
  `contract_id` int NULL DEFAULT NULL COMMENT '合同ID',
  `user_id` int NULL DEFAULT NULL COMMENT '添加合同附件的用户ID',
  `create_by` bigint NULL DEFAULT NULL COMMENT '创建人id',
  `create_at` datetime NULL DEFAULT NULL COMMENT '创建时间',
  `del_flag` tinyint NULL DEFAULT NULL COMMENT '是否删除(0:未删除;1:已删除)',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '合同用户关联表' ROW_FORMAT = DYNAMIC;

-- ============================================
-- 五、审批流程模块（BPM）
-- ============================================

-- ----------------------------
-- 5.1 条件管理表
-- ----------------------------
DROP TABLE IF EXISTS `bpm_condition`;
CREATE TABLE `bpm_condition`  (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT 'id',
  `node_name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '条件名称',
  `create_by` bigint NULL DEFAULT NULL COMMENT '创建人',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `idx_proc_id`(`id` ASC) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci COMMENT = '条件管理' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- 5.2 流程定义表
-- ----------------------------
DROP TABLE IF EXISTS `bpm_proc`;
CREATE TABLE `bpm_proc`  (
  `id` bigint NOT NULL COMMENT '流程id',
  `proc_name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '流程名称',
  `status` char(2) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '1' COMMENT '状态（0-停用 1-启用）',
  `last_version_id` bigint NOT NULL COMMENT '最后一个版本id',
  `del_flag` int NOT NULL DEFAULT 0 COMMENT '删除标志（0-正常 1-已删除）',
  `proc_type` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '流程类型',
  `remark` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '流程介绍',
  `create_by` bigint NULL DEFAULT NULL COMMENT '创建人id',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_by` bigint NULL DEFAULT NULL COMMENT '更新人id',
  `update_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci COMMENT = '流程定义' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- 5.3 流程参与者表
-- ----------------------------
DROP TABLE IF EXISTS `bpm_proc_actor`;
CREATE TABLE `bpm_proc_actor`  (
  `id` bigint NOT NULL,
  `proc_inst_id` bigint NOT NULL COMMENT '流程实例id',
  `type` char(2) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '类型：1-申请人 2-审批者 3-我收到的（被抄送者）',
  `user_id` bigint NOT NULL COMMENT '用户id',
  `handle_status` char(2) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '处理状态：1-待处理 2-已处理',
  `handle_record_id` bigint NULL DEFAULT NULL COMMENT '需要处理的审批记录id',
  `update_time` datetime NULL DEFAULT NULL COMMENT '更新时间',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `uni_actor`(`proc_inst_id` ASC, `type` ASC, `user_id` ASC) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci COMMENT = '审批流程参与者' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- 5.4 审批记录表
-- ----------------------------
DROP TABLE IF EXISTS `bpm_approval_record`;
CREATE TABLE `bpm_approval_record`  (
  `id` bigint NOT NULL,
  `proc_inst_id` bigint NOT NULL COMMENT '审批实例id',
  `node_id` bigint NOT NULL,
  `node_name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '节点名称',
  `node_type` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '节点类型 0 发起人 1审批 2抄送 3条件 4路由',
  `handler_id` bigint NOT NULL COMMENT '处理人id',
  `handler_name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '处理人姓名',
  `handle_status` char(2) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '处理状态：0-未开始 1-待处理 2-已处理',
  `handle_result` char(2) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '处理结果：1-通过 2-驳回 3-加签 4-委派 5-退回 6-撤消',
  `handle_opinion` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '处理意见',
  `handle_time` datetime NULL DEFAULT NULL COMMENT '处理时间',
  `create_time` datetime NOT NULL COMMENT '创建时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci COMMENT = '审批记录' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- 5.5 流程实例表
-- ----------------------------
DROP TABLE IF EXISTS `bpm_proc_inst`;
CREATE TABLE `bpm_proc_inst`  (
  `id` bigint NOT NULL COMMENT '实例id',
  `proc_id` bigint NOT NULL COMMENT '流程id',
  `proc_name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '流程名称',
  `version_id` bigint NOT NULL COMMENT '流程版本id',
  `inst_type` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '审批类型',
  `reason` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '申请事由',
  `remove_table` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '待删除的业务表名',
  `remove_ids` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '待删除json数组id',
  `owner_id` bigint NOT NULL COMMENT '发起人id',
  `owner_name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '发起人姓名',
  `run_status` char(2) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '0' COMMENT '运行状态：0-未开始 1-进行中 2-已完成',
  `approval_status` char(2) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '0' COMMENT '审批状态：0-草稿 1-审批中 2-挂起 3-撤消 4-通过 5-驳回',
  `submit_time` datetime NULL DEFAULT NULL COMMENT '提交时间',
  `finish_time` datetime NULL DEFAULT NULL COMMENT '完成时间',
  `node_config` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL COMMENT '流程节点配置',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` datetime NULL DEFAULT CURRENT_TIMESTAMP COMMENT '更新时间',
  `del_flag` tinyint NULL DEFAULT 0 COMMENT '0-正常 1-已删除',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci COMMENT = '流程实例' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- 5.6 流程实例附件表
-- ----------------------------
DROP TABLE IF EXISTS `bpm_proc_inst_attachment`;
CREATE TABLE `bpm_proc_inst_attachment`  (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '主键',
  `proc_inst_id` bigint NULL DEFAULT NULL COMMENT '流程实例ID',
  `display_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT '' COMMENT '展示文件名称',
  `real_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '真实文件名称',
  `file_url` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT '文件链接',
  `user_id` int NULL DEFAULT NULL COMMENT '添加合同附件的用户ID',
  `user_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '添加合同附件的用户姓名',
  `del_flag` tinyint NULL DEFAULT 0 COMMENT '是否删除(0:未删除;1:已删除)',
  `time_stamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '流程实例附件表' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- 5.7 流程实例节点表
-- ----------------------------
DROP TABLE IF EXISTS `bpm_proc_inst_node`;
CREATE TABLE `bpm_proc_inst_node`  (
  `id` bigint NOT NULL COMMENT '实例节点id',
  `proc_inst_id` bigint NOT NULL COMMENT '流程实例id',
  `parent_id` bigint NOT NULL COMMENT '父级节点id（一级节点为0）',
  `node_name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '节点名称',
  `node_type` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '节点类型 0 发起人 1审批 2抄送 3条件 4路由',
  `status` char(2) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '节点状态：0-未开始 1-进行中 2-已完成',
  `config` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL COMMENT '节点配置',
  `handlers` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL COMMENT '处理者列表',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci COMMENT = '工作流-流程实例节点' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- 5.8 流程节点定义表
-- ----------------------------
DROP TABLE IF EXISTS `bpm_proc_node`;
CREATE TABLE `bpm_proc_node`  (
  `id` bigint NOT NULL,
  `proc_id` bigint NOT NULL COMMENT '流程id',
  `version_id` bigint NOT NULL COMMENT '流程版本id',
  `parent_id` bigint NOT NULL COMMENT '父级节点id（一级节点为0）',
  `router_id` bigint NULL DEFAULT NULL COMMENT '路由id',
  `skip_node_id` bigint NULL DEFAULT NULL COMMENT '跳转节点id',
  `node_name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '节点名称',
  `node_type` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '节点类型 0 发起人 1审批 2抄送 3条件 4路由',
  `set_type` int NULL DEFAULT NULL COMMENT '发起人/审批人设置 0 所有人 1指定成员 2主管 4发起人自选 5发起人自己 7连续多级主管',
  `config` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL COMMENT '条件节点配置json',
  `handlers` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '发起人或审核人json数组',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci COMMENT = '流程节点定义' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- 5.9 流程版本表
-- ----------------------------
DROP TABLE IF EXISTS `bpm_proc_version`;
CREATE TABLE `bpm_proc_version`  (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '流程版本id',
  `proc_id` bigint NOT NULL COMMENT '流程id',
  `json` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '流程配置json',
  `create_by` bigint NULL DEFAULT NULL COMMENT '创建人',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `idx_proc_id`(`proc_id` ASC) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci COMMENT = '流程版本' ROW_FORMAT = DYNAMIC;

-- ============================================
-- 六、系统辅助模块
-- ============================================

-- ----------------------------
-- 6.1 数据字典表
-- ----------------------------
DROP TABLE IF EXISTS `tb_dict`;
CREATE TABLE `tb_dict`  (
  `id` int UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '主键',
  `dict_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '字典名',
  `short_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '字典名简称或缩写',
  `item_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '字典项',
  `item_order` int NULL DEFAULT NULL COMMENT '字典项顺序',
  `del_flag` tinyint NULL DEFAULT NULL COMMENT '是否删除(0:未删除;1:已删除)',
  `time_stamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '字典表' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- 6.2 操作日志表
-- ----------------------------
DROP TABLE IF EXISTS `sys_oplog`;
CREATE TABLE `sys_oplog`  (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '用户名',
  `user_id` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '用户id',
  `operation` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '行为',
  `method` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '方法',
  `params` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '参数',
  `ip` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT 'ip',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `etc` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '额外信息',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci COMMENT = '操作日志表' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- 6.3 客户档案日志表
-- ----------------------------
DROP TABLE IF EXISTS `tb_info_log`;
CREATE TABLE `tb_info_log`  (
  `id` int UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '主键',
  `clue_id` int NULL DEFAULT NULL COMMENT '线索ID',
  `customer_id` int NULL DEFAULT NULL COMMENT '客户ID',
  `user_id` int NULL DEFAULT NULL COMMENT '用户ID',
  `user_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '用户姓名',
  `log_info` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '日志标题',
  `user_ip` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT 'IP',
  `time_stamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '创建时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '客户档案日志表' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- 6.4 广播通知表
-- ----------------------------
DROP TABLE IF EXISTS `broadcast_notification`;
CREATE TABLE `broadcast_notification`  (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '消息标题',
  `content` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT '消息内容',
  `publish_status` int NULL DEFAULT NULL COMMENT '发布状态：0-待发布 1-已发布 2-已撤销',
  `message_status` int NULL DEFAULT NULL COMMENT '生效状态 0-未开始 1-已开始 2-已结束',
  `start_time` datetime NULL DEFAULT NULL COMMENT '开始时间',
  `end_time` datetime NULL DEFAULT NULL COMMENT '结束时间',
  `create_by` bigint NULL DEFAULT NULL COMMENT '创建人id',
  `create_at` datetime NULL DEFAULT NULL COMMENT '创建时间',
  `update_by` bigint NULL DEFAULT NULL COMMENT '更新人id',
  `update_at` datetime NULL DEFAULT NULL COMMENT '更新时间',
  `del_flag` int NULL DEFAULT 0 COMMENT '0-正常 1-已删除',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '广播通知' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- 6.5 消息广播表
-- ----------------------------
DROP TABLE IF EXISTS `tb_message_fanout`;
CREATE TABLE `tb_message_fanout`  (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '主键',
  `message_title` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '消息标题',
  `message_info` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '消息内容',
  `publish_status` tinyint(1) NULL DEFAULT NULL COMMENT '发布状态 0为待发布1为已发布2为已撤销',
  `message_status` tinyint(1) NULL DEFAULT NULL COMMENT '生效状态 0未未开始1为一开始2为已结束',
  `start_time` datetime NULL DEFAULT NULL COMMENT '开始时间',
  `end_time` datetime NULL DEFAULT NULL COMMENT '结束时间',
  `creat_user` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '创建人id',
  `creare_user_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '创建人姓名',
  `is_deleted` tinyint(1) NULL DEFAULT NULL COMMENT '是否删除',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '消息广播表' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- 6.6 消息列表表
-- ----------------------------
DROP TABLE IF EXISTS `tb_message_list`;
CREATE TABLE `tb_message_list`  (
  `id` int UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'id(主键)',
  `msg_id` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '消息id',
  `msg_title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '消息标题',
  `msg_info` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL COMMENT '消息内容',
  `from_app` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '消息的来源应用',
  `from_userid` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '消息的来源用户id',
  `to_app` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '消息的消费应用',
  `to_userid` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '消息的消费用户id',
  `create_time` timestamp NULL DEFAULT NULL COMMENT '消息的创建时间',
  `expiration_time` timestamp NULL DEFAULT NULL COMMENT '消息的过期时间',
  `msg_type` varchar(5) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '消息类型(0:通知;1:告警;2:广播;2.1:广播(优惠活动推广))',
  `msg_status` varchar(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '消息的状态(0:正常;1:已读;2:已删除;....)',
  `if_expired` tinyint(1) NULL DEFAULT NULL COMMENT '是否过期',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '消息列表' ROW_FORMAT = DYNAMIC;

SET FOREIGN_KEY_CHECKS = 1;
