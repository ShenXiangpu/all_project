/*
 Navicat Premium Dump SQL

 Source Server         : edu-private
 Source Server Type    : MySQL
 Source Server Version : 80028 (8.0.28)
 Source Host           : 172.18.0.194:3306
 Source Schema         : crm-dev

 Target Server Type    : MySQL
 Target Server Version : 80028 (8.0.28)
 File Encoding         : 65001

 Date: 22/05/2026 15:27:02
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for bpm_approval_record
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
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci COMMENT = '审批记录' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of bpm_approval_record
-- ----------------------------
INSERT INTO `bpm_approval_record` VALUES (1889494109362720769, 1889494109329166336, 1889494109362720768, '发起人', '0', 11407, '测试用户3', '2', '1', NULL, '2025-02-12 09:57:55', '2025-02-12 09:57:55');
INSERT INTO `bpm_approval_record` VALUES (1889494356709216256, 1889494109329166336, 1889494109362720770, '审核人', '1', 11407, '测试用户3', '2', '6', '撤消申请', '2025-02-12 09:58:54', '2025-02-12 09:58:54');
INSERT INTO `bpm_approval_record` VALUES (1889494413567201281, 1889494413558812672, 1889494413567201280, '发起人', '0', 11407, '测试用户3', '2', '1', NULL, '2025-02-12 09:59:08', '2025-02-12 09:59:08');
INSERT INTO `bpm_approval_record` VALUES (1889494413571395585, 1889494413558812672, 1889494413571395584, '审核人', '1', 11403, '张三', '2', '1', '通过', '2025-02-12 09:59:22', '2025-02-12 09:59:08');
INSERT INTO `bpm_approval_record` VALUES (1889494413571395587, 1889494413558812672, 1889494413571395586, '审核人', '1', 11386, 'fhc', '2', '1', '同意', '2025-02-12 10:16:45', '2025-02-12 09:59:08');
INSERT INTO `bpm_approval_record` VALUES (1889499346731405312, 1889499346668490752, 1889499346723016704, '发起人', '0', 11407, '测试用户3', '2', '1', NULL, '2025-02-12 10:18:44', '2025-02-12 10:18:44');
INSERT INTO `bpm_approval_record` VALUES (1889499721756708864, 1889499346668490752, 1889499346731405313, '审核人', '1', 11407, '测试用户3', '2', '6', '撤消申请', '2025-02-12 10:20:14', '2025-02-12 10:20:14');
INSERT INTO `bpm_approval_record` VALUES (1889503006802710528, 1889503002377719808, 1889503006790127616, '发起人', '0', 11407, '测试用户3', '2', '1', NULL, '2025-02-12 10:33:17', '2025-02-12 10:33:17');
INSERT INTO `bpm_approval_record` VALUES (1889504515619688448, 1889504515519025152, 1889504515615494144, '发起人', '0', 11407, '测试用户3', '2', '1', NULL, '2025-02-12 10:39:17', '2025-02-12 10:39:16');
INSERT INTO `bpm_approval_record` VALUES (1889504515619688450, 1889504515519025152, 1889504515619688449, '审核人', '1', 11403, '张三', '2', '1', '同意', '2025-02-12 10:39:36', '2025-02-12 10:39:16');
INSERT INTO `bpm_approval_record` VALUES (1889504515619688452, 1889504515519025152, 1889504515619688451, '审核人', '1', 11386, 'fhc', '2', '2', '退回，事由不清晰', '2025-02-12 10:39:53', '2025-02-12 10:39:16');
INSERT INTO `bpm_approval_record` VALUES (1889515986416177152, 1889503002377719808, 1889503006802710529, '审核人', '1', 11407, '测试用户3', '2', '6', '撤消申请', '2025-02-12 11:24:51', '2025-02-12 11:24:51');
INSERT INTO `bpm_approval_record` VALUES (1891733574453956608, 1891733574420402176, 1891733574449762304, '发起人', '0', 11386, 'fhc', '2', '1', NULL, '2025-02-18 14:16:46', '2025-02-18 14:16:46');
INSERT INTO `bpm_approval_record` VALUES (1891734158280101889, 1891734158267518976, 1891734158280101888, '发起人', '0', 11386, 'fhc', '2', '1', NULL, '2025-02-18 14:19:05', '2025-02-18 14:19:05');
INSERT INTO `bpm_approval_record` VALUES (1891734158280101891, 1891734158267518976, 1891734158280101890, '审核人', '1', 11385, '超管', '1', NULL, NULL, NULL, '2025-02-18 14:19:05');
INSERT INTO `bpm_approval_record` VALUES (1891763992372842497, 1891763992364453888, 1891763992372842496, '发起人', '0', 11386, 'fhc', '2', '1', NULL, '2025-02-18 16:17:38', '2025-02-18 16:17:38');
INSERT INTO `bpm_approval_record` VALUES (1891763992372842499, 1891763992364453888, 1891763992372842498, '审核人', '1', 11385, '超管', '1', NULL, NULL, NULL, '2025-02-18 16:17:38');
INSERT INTO `bpm_approval_record` VALUES (1891765089661489152, 1891733574420402176, 1891733574453956609, '审核人', '1', 11386, 'fhc', '2', '6', '撤消申请', '2025-02-18 16:21:59', '2025-02-18 16:21:59');
INSERT INTO `bpm_approval_record` VALUES (1995782100271370240, 1995782100237815808, 1995782100258787328, '发起人', '0', 11386, 'fhc', '2', '1', NULL, '2025-12-02 17:08:27', '2025-12-02 17:08:27');
INSERT INTO `bpm_approval_record` VALUES (1995782100271370242, 1995782100237815808, 1995782100271370241, '审核人', '1', 11385, '超管', '1', NULL, NULL, NULL, '2025-12-02 17:08:27');
INSERT INTO `bpm_approval_record` VALUES (1995782100271370244, 1995782100237815808, 1995782100271370243, '审核人', '1', 11386, 'fhc', '0', NULL, NULL, NULL, '2025-12-02 17:08:27');
INSERT INTO `bpm_approval_record` VALUES (1996396302484770816, 1996396302459604992, 1996396302480576512, '发起人', '0', 11386, 'fhc', '2', '1', NULL, '2025-12-04 09:49:04', '2025-12-04 09:49:04');
INSERT INTO `bpm_approval_record` VALUES (1996398390845509632, 1996396302459604992, 1996396302484770817, '审核人', '1', 11386, 'fhc', '2', '6', '撤消申请', '2025-12-04 09:57:22', '2025-12-04 09:57:22');
INSERT INTO `bpm_approval_record` VALUES (1996398432306204673, 1996398432297816064, 1996398432306204672, '发起人', '0', 11386, 'fhc', '2', '1', NULL, '2025-12-04 09:57:32', '2025-12-04 09:57:32');
INSERT INTO `bpm_approval_record` VALUES (1996398927104053248, 1996398432297816064, 1996398432306204674, '审核人', '1', 11386, 'fhc', '2', '6', '撤消申请', '2025-12-04 09:59:30', '2025-12-04 09:59:30');
INSERT INTO `bpm_approval_record` VALUES (1996398970158583809, 1996398970146000896, 1996398970158583808, '发起人', '0', 11386, 'fhc', '2', '1', NULL, '2025-12-04 09:59:40', '2025-12-04 09:59:40');
INSERT INTO `bpm_approval_record` VALUES (1996398970158583811, 1996398970146000896, 1996398970158583810, '审核人', '1', 11386, 'fhc', '2', '1', '测试', '2025-12-04 10:03:43', '2025-12-04 09:59:40');

-- ----------------------------
-- Table structure for bpm_condition
-- ----------------------------
DROP TABLE IF EXISTS `bpm_condition`;
CREATE TABLE `bpm_condition`  (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT 'id',
  `node_name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '条件名称',
  `create_by` bigint NULL DEFAULT NULL COMMENT '创建人',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `idx_proc_id`(`id` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci COMMENT = '条件管理' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of bpm_condition
-- ----------------------------
INSERT INTO `bpm_condition` VALUES (1, '删除数量', 11385, '2025-01-06 16:11:35');

-- ----------------------------
-- Table structure for bpm_proc
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
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci COMMENT = '流程定义' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of bpm_proc
-- ----------------------------
INSERT INTO `bpm_proc` VALUES (56, '测试', '0', 55, 1, NULL, '测试', 215, '2025-01-06 14:53:55', 11386, '2025-01-13 10:39:32');
INSERT INTO `bpm_proc` VALUES (1877531455438065664, '合同删除流程', '0', 63, 1, '合同删除', '流程介绍', 11386, '2025-01-10 09:42:36', 11386, '2025-01-20 16:27:54');
INSERT INTO `bpm_proc` VALUES (1877540583543803904, '合同删除流程12312312', '0', 79, 1, '合同删除', '流程介绍', 11386, '2025-01-10 10:18:53', 11386, '2025-01-21 09:03:08');
INSERT INTO `bpm_proc` VALUES (1881165056029364224, 'test', '0', 80, 1, '客户删除', 'sss', 11386, '2025-01-20 10:21:14', 11386, '2025-01-21 09:03:12');
INSERT INTO `bpm_proc` VALUES (1881508054797783040, '调试发起人列表样式', '0', 93, 1, '线索删除', '测试', 11386, '2025-01-21 09:04:12', 11386, '2025-02-06 09:57:15');
INSERT INTO `bpm_proc` VALUES (1881513325548933120, 'ceshi', '0', 87, 1, '客户删除', 'test', 11386, '2025-01-21 09:25:08', 11404, '2025-02-06 16:13:47');
INSERT INTO `bpm_proc` VALUES (1886952468902973440, '测试合同删除流程', '0', 94, 1, '合同删除', '', 11386, '2025-02-05 09:38:21', 11407, '2025-02-12 14:02:37');
INSERT INTO `bpm_proc` VALUES (1887322596404498432, '测试线索删除', '0', 95, 1, '线索删除', 'test', 11386, '2025-02-06 10:09:06', 11407, '2025-02-12 14:01:48');
INSERT INTO `bpm_proc` VALUES (1887417377881198592, 'fhc客户删除流程', '1', 96, 0, '客户删除', '客户删除', 11404, '2025-02-06 16:25:44', NULL, '2025-02-06 16:15:05');
INSERT INTO `bpm_proc` VALUES (1889558243529854976, 'test', '0', 97, 1, '线索删除', '', 11407, '2025-02-12 14:12:46', 11407, '2025-02-12 14:02:18');
INSERT INTO `bpm_proc` VALUES (1889558865696133120, '测试规则名称', '1', 105, 0, '线索删除', '', 11407, '2025-02-12 14:15:15', 11407, '2025-02-12 14:22:10');
INSERT INTO `bpm_proc` VALUES (1890227698954014720, '合同删除流程', '1', 106, 0, '合同删除', '合同删除流程1', 11407, '2025-02-14 10:32:57', 11407, '2025-02-14 10:56:58');
INSERT INTO `bpm_proc` VALUES (1890227975140544512, '合同删除2', '0', 108, 0, '合同删除', '合同删除2', 11407, '2025-02-14 10:34:03', 11407, '2025-02-14 10:57:03');
INSERT INTO `bpm_proc` VALUES (1996389472723406848, '测试供应商删除', '1', 111, 0, '供应商删除', '', 11386, '2025-12-04 09:21:56', 11386, '2025-12-04 09:58:36');

-- ----------------------------
-- Table structure for bpm_proc_actor
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
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci COMMENT = '审批流程参与者' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of bpm_proc_actor
-- ----------------------------
INSERT INTO `bpm_proc_actor` VALUES (1889494109404663808, 1889494109329166336, '1', 11407, '2', 1889494109362720769, NULL);
INSERT INTO `bpm_proc_actor` VALUES (1889494413613338624, 1889494413558812672, '1', 11407, '2', 1889494413567201281, NULL);
INSERT INTO `bpm_proc_actor` VALUES (1889494413630115840, 1889494413558812672, '2', 11403, '2', 1889494413571395585, '2025-02-12 09:48:39');
INSERT INTO `bpm_proc_actor` VALUES (1889494472362954752, 1889494413558812672, '2', 11386, '2', 1889494413571395587, '2025-02-12 10:06:02');
INSERT INTO `bpm_proc_actor` VALUES (1889499346815291392, 1889499346668490752, '1', 11407, '2', 1889499346731405312, NULL);
INSERT INTO `bpm_proc_actor` VALUES (1889503006945316864, 1889503002377719808, '1', 11407, '2', 1889503006802710528, NULL);
INSERT INTO `bpm_proc_actor` VALUES (1889504515753906176, 1889504515519025152, '1', 11407, '2', 1889504515619688448, NULL);
INSERT INTO `bpm_proc_actor` VALUES (1889504515787460608, 1889504515519025152, '2', 11403, '2', 1889504515619688450, '2025-02-12 10:28:53');
INSERT INTO `bpm_proc_actor` VALUES (1889504598138425344, 1889504515519025152, '2', 11386, '2', 1889504515619688452, '2025-02-12 10:29:10');
INSERT INTO `bpm_proc_actor` VALUES (1891733574579785728, 1891733574420402176, '1', 11386, '2', 1891733574453956608, NULL);
INSERT INTO `bpm_proc_actor` VALUES (1891734158540148736, 1891734158267518976, '1', 11386, '2', 1891734158280101889, NULL);
INSERT INTO `bpm_proc_actor` VALUES (1891734158561120256, 1891734158267518976, '2', 11385, '1', 1891734158280101891, NULL);
INSERT INTO `bpm_proc_actor` VALUES (1891763992402202624, 1891763992364453888, '1', 11386, '2', 1891763992372842497, NULL);
INSERT INTO `bpm_proc_actor` VALUES (1891763992418979840, 1891763992364453888, '2', 11385, '1', 1891763992372842499, NULL);
INSERT INTO `bpm_proc_actor` VALUES (1995782100384616448, 1995782100237815808, '1', 11386, '2', 1995782100271370240, NULL);
INSERT INTO `bpm_proc_actor` VALUES (1995782100405587968, 1995782100237815808, '2', 11385, '1', 1995782100271370242, NULL);
INSERT INTO `bpm_proc_actor` VALUES (1996396302572851200, 1996396302459604992, '1', 11386, '2', 1996396302484770816, NULL);
INSERT INTO `bpm_proc_actor` VALUES (1996398432352342016, 1996398432297816064, '1', 11386, '2', 1996398432306204673, NULL);
INSERT INTO `bpm_proc_actor` VALUES (1996398970204721152, 1996398970146000896, '1', 11386, '2', 1996398970158583809, NULL);
INSERT INTO `bpm_proc_actor` VALUES (1996398970221498368, 1996398970146000896, '2', 11386, '2', 1996398970158583811, '2025-12-04 10:03:43');

-- ----------------------------
-- Table structure for bpm_proc_inst
-- ----------------------------
DROP TABLE IF EXISTS `bpm_proc_inst`;
CREATE TABLE `bpm_proc_inst`  (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT 'shenqin',
  `proc_id` bigint NOT NULL COMMENT '流程id',
  `proc_name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '流程名称',
  `version_id` bigint NOT NULL COMMENT '流程版本id',
  `inst_type` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '审批类型',
  `reason` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '申请事由',
  `remove_table` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '待删除的业务表名',
  `remove_ids` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '待删除json数组id',
  `owner_id` bigint NOT NULL COMMENT '发起人id',
  `owner_name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '发起人姓名',
  `run_status` char(2) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '0' COMMENT '运行状态：0-未开始 1-进行中 2-已完成 ',
  `approval_status` char(2) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '0' COMMENT '审批状态：0-草稿 1-审批中 2-挂起 3-撤消 4-通过 5-驳回',
  `submit_time` datetime NULL DEFAULT NULL COMMENT '提交时间',
  `finish_time` datetime NULL DEFAULT NULL COMMENT '完成时间',
  `node_config` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL COMMENT '流程节点配置',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` datetime NULL DEFAULT CURRENT_TIMESTAMP COMMENT '更新时间',
  `del_flag` tinyint NULL DEFAULT 0 COMMENT '0-正常 1-已删除',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1996398970146000897 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci COMMENT = '流程实例' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of bpm_proc_inst
-- ----------------------------
INSERT INTO `bpm_proc_inst` VALUES (1889494109329166336, 1887417377881198592, '测试用户3提交的fhc客户删除流程', 96, '客户删除', 'test', NULL, '[\"35\",\"36\",\"37\"]', 11407, '测试用户3', '2', '3', '2025-02-12 09:57:55', '2025-02-12 09:58:54', '[{\"handlers\":\"[{\\\"name\\\":\\\"测试用户3\\\",\\\"userId\\\":11407}]\",\"id\":1889494109362720768,\"nodeName\":\"发起人\",\"nodeType\":\"0\",\"parentId\":0,\"procInstId\":1889494109329166336,\"status\":\"0\"},{\"handlers\":\"[{\\\"name\\\":\\\"张三\\\",\\\"userId\\\":11403}]\",\"id\":1889494109362720770,\"nodeName\":\"审核人\",\"nodeType\":\"1\",\"parentId\":1889494109362720768,\"procInstId\":1889494109329166336,\"status\":\"0\"},{\"handlers\":\"[{\\\"name\\\":\\\"fhc\\\",\\\"userId\\\":11386}]\",\"id\":1889494109362720772,\"nodeName\":\"审核人\",\"nodeType\":\"1\",\"parentId\":1889494109362720770,\"procInstId\":1889494109329166336,\"status\":\"0\"}]', '2025-02-12 09:57:55', '2025-02-12 09:57:55', 1);
INSERT INTO `bpm_proc_inst` VALUES (1889494413558812672, 1887417377881198592, '测试用户3提交的fhc客户删除流程', 96, '客户删除', 'test', NULL, '[\"35\",\"36\",\"37\"]', 11407, '测试用户3', '2', '4', '2025-02-12 09:59:08', '2025-02-12 10:16:45', '[{\"handlers\":\"[{\\\"name\\\":\\\"测试用户3\\\",\\\"userId\\\":11407}]\",\"id\":1889494413567201280,\"nodeName\":\"发起人\",\"nodeType\":\"0\",\"parentId\":0,\"procInstId\":1889494413558812672,\"status\":\"0\"},{\"handlers\":\"[{\\\"name\\\":\\\"张三\\\",\\\"userId\\\":11403}]\",\"id\":1889494413571395584,\"nodeName\":\"审核人\",\"nodeType\":\"1\",\"parentId\":1889494413567201280,\"procInstId\":1889494413558812672,\"status\":\"0\"},{\"handlers\":\"[{\\\"name\\\":\\\"fhc\\\",\\\"userId\\\":11386}]\",\"id\":1889494413571395586,\"nodeName\":\"审核人\",\"nodeType\":\"1\",\"parentId\":1889494413571395584,\"procInstId\":1889494413558812672,\"status\":\"0\"}]', '2025-02-12 09:59:08', '2025-02-12 09:59:08', 1);
INSERT INTO `bpm_proc_inst` VALUES (1889499346668490752, 1887417377881198592, '测试用户3提交的fhc客户删除流程', 96, '客户删除', 'test', NULL, '[\"35\",\"36\",\"37\"]', 11407, '测试用户3', '2', '3', '2025-02-12 10:18:44', '2025-02-12 10:20:14', '[{\"handlers\":\"[{\\\"name\\\":\\\"测试用户3\\\",\\\"userId\\\":11407}]\",\"id\":1889499346723016704,\"nodeName\":\"发起人\",\"nodeType\":\"0\",\"parentId\":0,\"procInstId\":1889499346668490752,\"status\":\"0\"},{\"handlers\":\"[{\\\"name\\\":\\\"张三\\\",\\\"userId\\\":11403}]\",\"id\":1889499346731405313,\"nodeName\":\"审核人\",\"nodeType\":\"1\",\"parentId\":1889499346723016704,\"procInstId\":1889499346668490752,\"status\":\"0\"},{\"handlers\":\"[{\\\"name\\\":\\\"fhc\\\",\\\"userId\\\":11386}]\",\"id\":1889499346731405315,\"nodeName\":\"审核人\",\"nodeType\":\"1\",\"parentId\":1889499346731405313,\"procInstId\":1889499346668490752,\"status\":\"0\"}]', '2025-02-12 10:18:44', '2025-02-12 10:18:44', 1);
INSERT INTO `bpm_proc_inst` VALUES (1889503002377719808, 1887417377881198592, '测试用户3提交的fhc客户删除流程', 96, '客户删除', 'test', NULL, '[\"35\",\"36\",\"37\"]', 11407, '测试用户3', '2', '3', '2025-02-12 10:33:17', '2025-02-12 11:24:51', '[{\"handlers\":\"[{\\\"name\\\":\\\"测试用户3\\\",\\\"userId\\\":11407}]\",\"id\":1889503006790127616,\"nodeName\":\"发起人\",\"nodeType\":\"0\",\"parentId\":0,\"procInstId\":1889503002377719808,\"status\":\"0\"},{\"handlers\":\"[{\\\"name\\\":\\\"张三\\\",\\\"userId\\\":11403}]\",\"id\":1889503006802710529,\"nodeName\":\"审核人\",\"nodeType\":\"1\",\"parentId\":1889503006790127616,\"procInstId\":1889503002377719808,\"status\":\"0\"},{\"handlers\":\"[{\\\"name\\\":\\\"fhc\\\",\\\"userId\\\":11386}]\",\"id\":1889503006802710531,\"nodeName\":\"审核人\",\"nodeType\":\"1\",\"parentId\":1889503006802710529,\"procInstId\":1889503002377719808,\"status\":\"0\"}]', '2025-02-12 10:33:16', '2025-02-12 10:33:16', 1);
INSERT INTO `bpm_proc_inst` VALUES (1889504515519025152, 1887417377881198592, '测试用户3提交的fhc客户删除流程', 96, '客户删除', 'test', NULL, '[\"32\",\"31\"]', 11407, '测试用户3', '2', '5', '2025-02-12 10:39:16', '2025-02-12 10:39:53', '[{\"handlers\":\"[{\\\"name\\\":\\\"测试用户3\\\",\\\"userId\\\":11407}]\",\"id\":1889504515615494144,\"nodeName\":\"发起人\",\"nodeType\":\"0\",\"parentId\":0,\"procInstId\":1889504515519025152,\"status\":\"0\"},{\"handlers\":\"[{\\\"name\\\":\\\"张三\\\",\\\"userId\\\":11403}]\",\"id\":1889504515619688449,\"nodeName\":\"审核人\",\"nodeType\":\"1\",\"parentId\":1889504515615494144,\"procInstId\":1889504515519025152,\"status\":\"0\"},{\"handlers\":\"[{\\\"name\\\":\\\"fhc\\\",\\\"userId\\\":11386}]\",\"id\":1889504515619688451,\"nodeName\":\"审核人\",\"nodeType\":\"1\",\"parentId\":1889504515619688449,\"procInstId\":1889504515519025152,\"status\":\"0\"}]', '2025-02-12 10:39:16', '2025-02-12 10:39:16', 1);
INSERT INTO `bpm_proc_inst` VALUES (1891733574420402176, 1889558865696133120, 'fhc提交的测试规则名称', 105, '线索删除', NULL, NULL, '[null]', 11386, 'fhc', '2', '3', '2025-02-18 14:16:46', '2025-02-18 16:21:59', '[{\"handlers\":\"[{\\\"name\\\":\\\"fhc\\\",\\\"userId\\\":11386}]\",\"id\":1891733574449762304,\"nodeName\":\"发起人\",\"nodeType\":\"0\",\"parentId\":0,\"procInstId\":1891733574420402176,\"status\":\"0\"},{\"handlers\":\"[{\\\"name\\\":\\\"超管\\\",\\\"userId\\\":11385}]\",\"id\":1891733574453956609,\"nodeName\":\"审核人\",\"nodeType\":\"1\",\"parentId\":1891733574449762304,\"procInstId\":1891733574420402176,\"status\":\"0\"}]', '2025-02-18 14:16:46', '2025-02-18 14:16:46', 1);
INSERT INTO `bpm_proc_inst` VALUES (1891734158267518976, 1889558865696133120, 'fhc提交的测试规则名称', 105, '线索删除', NULL, NULL, '[\"50\"]', 11386, 'fhc', '1', '1', '2025-02-18 14:19:05', NULL, '[{\"handlers\":\"[{\\\"name\\\":\\\"fhc\\\",\\\"userId\\\":11386}]\",\"id\":1891734158280101888,\"nodeName\":\"发起人\",\"nodeType\":\"0\",\"parentId\":0,\"procInstId\":1891734158267518976,\"status\":\"0\"},{\"handlers\":\"[{\\\"name\\\":\\\"超管\\\",\\\"userId\\\":11385}]\",\"id\":1891734158280101890,\"nodeName\":\"审核人\",\"nodeType\":\"1\",\"parentId\":1891734158280101888,\"procInstId\":1891734158267518976,\"status\":\"0\"}]', '2025-02-18 14:19:05', '2025-02-18 14:19:05', 0);
INSERT INTO `bpm_proc_inst` VALUES (1891763992364453888, 1889558865696133120, 'fhc提交的测试规则名称', 105, '线索删除', NULL, NULL, '[\"51\"]', 11386, 'fhc', '1', '1', '2025-02-18 16:17:38', NULL, '[{\"handlers\":\"[{\\\"name\\\":\\\"fhc\\\",\\\"userId\\\":11386}]\",\"id\":1891763992372842496,\"nodeName\":\"发起人\",\"nodeType\":\"0\",\"parentId\":0,\"procInstId\":1891763992364453888,\"status\":\"0\"},{\"handlers\":\"[{\\\"name\\\":\\\"超管\\\",\\\"userId\\\":11385}]\",\"id\":1891763992372842498,\"nodeName\":\"审核人\",\"nodeType\":\"1\",\"parentId\":1891763992372842496,\"procInstId\":1891763992364453888,\"status\":\"0\"}]', '2025-02-18 16:17:38', '2025-02-18 16:17:38', 0);
INSERT INTO `bpm_proc_inst` VALUES (1995782100237815808, 1887417377881198592, 'fhc提交的fhc客户删除流程', 96, '客户删除', NULL, NULL, '[\"77\"]', 11386, 'fhc', '1', '1', '2025-12-02 17:08:27', NULL, '[{\"handlers\":\"[{\\\"name\\\":\\\"fhc\\\",\\\"userId\\\":11386}]\",\"id\":1995782100258787328,\"nodeName\":\"发起人\",\"nodeType\":\"0\",\"parentId\":0,\"procInstId\":1995782100237815808,\"status\":\"0\"},{\"handlers\":\"[{\\\"name\\\":\\\"超管\\\",\\\"userId\\\":11385}]\",\"id\":1995782100271370241,\"nodeName\":\"审核人\",\"nodeType\":\"1\",\"parentId\":1995782100258787328,\"procInstId\":1995782100237815808,\"status\":\"0\"},{\"handlers\":\"[{\\\"name\\\":\\\"fhc\\\",\\\"userId\\\":11386}]\",\"id\":1995782100271370243,\"nodeName\":\"审核人\",\"nodeType\":\"1\",\"parentId\":1995782100271370241,\"procInstId\":1995782100237815808,\"status\":\"0\"}]', '2025-12-02 17:08:27', '2025-12-02 17:08:27', 0);
INSERT INTO `bpm_proc_inst` VALUES (1996396302459604992, 1996389472723406848, 'fhc提交的测试供应商删除', 110, '供应商删除', NULL, NULL, '[\"72\"]', 11386, 'fhc', '2', '3', '2025-12-04 09:49:04', '2025-12-04 09:57:22', '[{\"handlers\":\"[{\\\"name\\\":\\\"fhc\\\",\\\"userId\\\":11386}]\",\"id\":1996396302480576512,\"nodeName\":\"发起人\",\"nodeType\":\"0\",\"parentId\":0,\"procInstId\":1996396302459604992,\"status\":\"0\"},{\"handlers\":\"[{\\\"name\\\":\\\"超管\\\",\\\"userId\\\":11385}]\",\"id\":1996396302484770817,\"nodeName\":\"审核人\",\"nodeType\":\"1\",\"parentId\":1996396302480576512,\"procInstId\":1996396302459604992,\"status\":\"0\"}]', '2025-12-04 09:49:04', '2025-12-04 09:49:04', 1);
INSERT INTO `bpm_proc_inst` VALUES (1996398432297816064, 1996389472723406848, 'fhc提交的测试供应商删除', 110, '供应商删除', NULL, NULL, '[\"72\"]', 11386, 'fhc', '2', '3', '2025-12-04 09:57:32', '2025-12-04 09:59:30', '[{\"handlers\":\"[{\\\"name\\\":\\\"fhc\\\",\\\"userId\\\":11386}]\",\"id\":1996398432306204672,\"nodeName\":\"发起人\",\"nodeType\":\"0\",\"parentId\":0,\"procInstId\":1996398432297816064,\"status\":\"0\"},{\"handlers\":\"[{\\\"name\\\":\\\"超管\\\",\\\"userId\\\":11385}]\",\"id\":1996398432306204674,\"nodeName\":\"审核人\",\"nodeType\":\"1\",\"parentId\":1996398432306204672,\"procInstId\":1996398432297816064,\"status\":\"0\"}]', '2025-12-04 09:57:32', '2025-12-04 09:57:32', 1);
INSERT INTO `bpm_proc_inst` VALUES (1996398970146000896, 1996389472723406848, 'fhc提交的测试供应商删除', 111, '供应商删除', NULL, NULL, '[\"72\"]', 11386, 'fhc', '2', '4', '2025-12-04 09:59:40', '2025-12-04 10:03:43', '[{\"handlers\":\"[{\\\"name\\\":\\\"fhc\\\",\\\"userId\\\":11386}]\",\"id\":1996398970158583808,\"nodeName\":\"发起人\",\"nodeType\":\"0\",\"parentId\":0,\"procInstId\":1996398970146000896,\"status\":\"0\"},{\"handlers\":\"[{\\\"name\\\":\\\"fhc\\\",\\\"userId\\\":11386}]\",\"id\":1996398970158583810,\"nodeName\":\"审核人\",\"nodeType\":\"1\",\"parentId\":1996398970158583808,\"procInstId\":1996398970146000896,\"status\":\"0\"}]', '2025-12-04 09:59:40', '2025-12-04 09:59:40', 0);

-- ----------------------------
-- Table structure for bpm_proc_inst_attachment
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
) ENGINE = InnoDB AUTO_INCREMENT = 14 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '流程实例附件表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of bpm_proc_inst_attachment
-- ----------------------------
INSERT INTO `bpm_proc_inst_attachment` VALUES (6, 1889494109329166336, '沈相樸入职花名册.xlsx', 'bpm/9188f340-dad8-4339-a339-d6e1c9fe4589.xlsx', 'http://172.18.7.21:19001/zkxy-crm-contract-dev/bpm/9188f340-dad8-4339-a339-d6e1c9fe4589.xlsx', 11407, '测试用户3', 0, '2025-02-12 09:47:12');
INSERT INTO `bpm_proc_inst_attachment` VALUES (7, 1889494109329166336, '沈相樸固定资产盘点表.xlsx', 'bpm/90b02f46-5a20-48ba-827c-ba44440a463f.xlsx', 'http://172.18.7.21:19001/zkxy-crm-contract-dev/bpm/90b02f46-5a20-48ba-827c-ba44440a463f.xlsx', 11407, '测试用户3', 0, '2025-02-12 09:47:12');
INSERT INTO `bpm_proc_inst_attachment` VALUES (8, 1889494109329166336, '前段项目模块设计文档.docx', 'bpm/2340383d-e698-4578-9abc-39b6b270162f.docx', 'http://172.18.7.21:19001/zkxy-crm-contract-dev/bpm/2340383d-e698-4578-9abc-39b6b270162f.docx', 11407, '测试用户3', 0, '2025-02-12 09:47:12');
INSERT INTO `bpm_proc_inst_attachment` VALUES (9, 1889503002377719808, '沈相樸入职花名册.xlsx', 'bpm/9188f340-dad8-4339-a339-d6e1c9fe4589.xlsx', 'http://172.18.7.21:19001/zkxy-crm-contract-dev/bpm/9188f340-dad8-4339-a339-d6e1c9fe4589.xlsx', 11407, '测试用户3', 0, '2025-02-12 10:22:32');
INSERT INTO `bpm_proc_inst_attachment` VALUES (10, 1889503002377719808, '沈相樸固定资产盘点表.xlsx', 'bpm/90b02f46-5a20-48ba-827c-ba44440a463f.xlsx', 'http://172.18.7.21:19001/zkxy-crm-contract-dev/bpm/90b02f46-5a20-48ba-827c-ba44440a463f.xlsx', 11407, '测试用户3', 0, '2025-02-12 10:22:32');
INSERT INTO `bpm_proc_inst_attachment` VALUES (11, 1889503002377719808, '前段项目模块设计文档.docx', 'bpm/2340383d-e698-4578-9abc-39b6b270162f.docx', 'http://172.18.7.21:19001/zkxy-crm-contract-dev/bpm/2340383d-e698-4578-9abc-39b6b270162f.docx', 11407, '测试用户3', 0, '2025-02-12 10:22:32');
INSERT INTO `bpm_proc_inst_attachment` VALUES (12, 1889504515519025152, '滴滴出行行程报销单.pdf', 'bpm/4e9c6aa2-79f9-4d19-affd-068409e5e85b.pdf', 'http://172.18.7.21:19001/zkxy-crm-contract-dev/bpm/4e9c6aa2-79f9-4d19-affd-068409e5e85b.pdf', 11407, '测试用户3', 0, '2025-02-12 10:28:33');
INSERT INTO `bpm_proc_inst_attachment` VALUES (13, 1889504515519025152, '2023中科芯云计算服务部-沈相樸.pptx', 'bpm/e0c638b1-225d-412c-b743-b4fe30d20cdf.pptx', 'http://172.18.7.21:19001/zkxy-crm-contract-dev/bpm/e0c638b1-225d-412c-b743-b4fe30d20cdf.pptx', 11407, '测试用户3', 0, '2025-02-12 10:28:33');

-- ----------------------------
-- Table structure for bpm_proc_inst_node
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
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci COMMENT = '工作流-流程实例节点' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of bpm_proc_inst_node
-- ----------------------------
INSERT INTO `bpm_proc_inst_node` VALUES (1889494109362720768, 1889494109329166336, 0, '发起人', '0', '2', NULL, '[{\"name\":\"测试用户3\",\"userId\":11407}]');
INSERT INTO `bpm_proc_inst_node` VALUES (1889494109362720770, 1889494109329166336, 1889494109362720768, '审核人', '1', '2', NULL, '[{\"name\":\"张三\",\"userId\":11403}]');
INSERT INTO `bpm_proc_inst_node` VALUES (1889494413567201280, 1889494413558812672, 0, '发起人', '0', '2', NULL, '[{\"name\":\"测试用户3\",\"userId\":11407}]');
INSERT INTO `bpm_proc_inst_node` VALUES (1889494413571395584, 1889494413558812672, 1889494413567201280, '审核人', '1', '2', NULL, '[{\"name\":\"张三\",\"userId\":11403}]');
INSERT INTO `bpm_proc_inst_node` VALUES (1889494413571395586, 1889494413558812672, 1889494413571395584, '审核人', '1', '2', NULL, '[{\"name\":\"fhc\",\"userId\":11386}]');
INSERT INTO `bpm_proc_inst_node` VALUES (1889499346723016704, 1889499346668490752, 0, '发起人', '0', '2', NULL, '[{\"name\":\"测试用户3\",\"userId\":11407}]');
INSERT INTO `bpm_proc_inst_node` VALUES (1889499346731405313, 1889499346668490752, 1889499346723016704, '审核人', '1', '2', NULL, '[{\"name\":\"张三\",\"userId\":11403}]');
INSERT INTO `bpm_proc_inst_node` VALUES (1889503006790127616, 1889503002377719808, 0, '发起人', '0', '2', NULL, '[{\"name\":\"测试用户3\",\"userId\":11407}]');
INSERT INTO `bpm_proc_inst_node` VALUES (1889503006802710529, 1889503002377719808, 1889503006790127616, '审核人', '1', '2', NULL, '[{\"name\":\"张三\",\"userId\":11403}]');
INSERT INTO `bpm_proc_inst_node` VALUES (1889504515615494144, 1889504515519025152, 0, '发起人', '0', '2', NULL, '[{\"name\":\"测试用户3\",\"userId\":11407}]');
INSERT INTO `bpm_proc_inst_node` VALUES (1889504515619688449, 1889504515519025152, 1889504515615494144, '审核人', '1', '2', NULL, '[{\"name\":\"张三\",\"userId\":11403}]');
INSERT INTO `bpm_proc_inst_node` VALUES (1889504515619688451, 1889504515519025152, 1889504515619688449, '审核人', '1', '2', NULL, '[{\"name\":\"fhc\",\"userId\":11386}]');
INSERT INTO `bpm_proc_inst_node` VALUES (1891733574449762304, 1891733574420402176, 0, '发起人', '0', '2', NULL, '[{\"name\":\"fhc\",\"userId\":11386}]');
INSERT INTO `bpm_proc_inst_node` VALUES (1891733574453956609, 1891733574420402176, 1891733574449762304, '审核人', '1', '2', NULL, '[{\"name\":\"超管\",\"userId\":11385}]');
INSERT INTO `bpm_proc_inst_node` VALUES (1891734158280101888, 1891734158267518976, 0, '发起人', '0', '2', NULL, '[{\"name\":\"fhc\",\"userId\":11386}]');
INSERT INTO `bpm_proc_inst_node` VALUES (1891734158280101890, 1891734158267518976, 1891734158280101888, '审核人', '1', '1', NULL, '[{\"name\":\"超管\",\"userId\":11385}]');
INSERT INTO `bpm_proc_inst_node` VALUES (1891763992372842496, 1891763992364453888, 0, '发起人', '0', '2', NULL, '[{\"name\":\"fhc\",\"userId\":11386}]');
INSERT INTO `bpm_proc_inst_node` VALUES (1891763992372842498, 1891763992364453888, 1891763992372842496, '审核人', '1', '1', NULL, '[{\"name\":\"超管\",\"userId\":11385}]');
INSERT INTO `bpm_proc_inst_node` VALUES (1995782100258787328, 1995782100237815808, 0, '发起人', '0', '2', NULL, '[{\"name\":\"fhc\",\"userId\":11386}]');
INSERT INTO `bpm_proc_inst_node` VALUES (1995782100271370241, 1995782100237815808, 1995782100258787328, '审核人', '1', '1', NULL, '[{\"name\":\"超管\",\"userId\":11385}]');
INSERT INTO `bpm_proc_inst_node` VALUES (1995782100271370243, 1995782100237815808, 1995782100271370241, '审核人', '1', '0', NULL, '[{\"name\":\"fhc\",\"userId\":11386}]');
INSERT INTO `bpm_proc_inst_node` VALUES (1996396302480576512, 1996396302459604992, 0, '发起人', '0', '2', NULL, '[{\"name\":\"fhc\",\"userId\":11386}]');
INSERT INTO `bpm_proc_inst_node` VALUES (1996396302484770817, 1996396302459604992, 1996396302480576512, '审核人', '1', '2', NULL, '[{\"name\":\"超管\",\"userId\":11385}]');
INSERT INTO `bpm_proc_inst_node` VALUES (1996398432306204672, 1996398432297816064, 0, '发起人', '0', '2', NULL, '[{\"name\":\"fhc\",\"userId\":11386}]');
INSERT INTO `bpm_proc_inst_node` VALUES (1996398432306204674, 1996398432297816064, 1996398432306204672, '审核人', '1', '2', NULL, '[{\"name\":\"超管\",\"userId\":11385}]');
INSERT INTO `bpm_proc_inst_node` VALUES (1996398970158583808, 1996398970146000896, 0, '发起人', '0', '2', NULL, '[{\"name\":\"fhc\",\"userId\":11386}]');
INSERT INTO `bpm_proc_inst_node` VALUES (1996398970158583810, 1996398970146000896, 1996398970158583808, '审核人', '1', '2', NULL, '[{\"name\":\"fhc\",\"userId\":11386}]');

-- ----------------------------
-- Table structure for bpm_proc_node
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
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci COMMENT = '流程节点定义' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of bpm_proc_node
-- ----------------------------
INSERT INTO `bpm_proc_node` VALUES (0, 56, 55, 13, 13, NULL, '条件', 'condition', NULL, '{\"days\":1}', NULL);
INSERT INTO `bpm_proc_node` VALUES (13, 56, 55, 15, NULL, NULL, '路由', 'router', NULL, NULL, NULL);
INSERT INTO `bpm_proc_node` VALUES (15, 56, 55, 19, NULL, NULL, '审批人', 'approver', NULL, '{\"name\":\"审核人 老陈\"}', NULL);
INSERT INTO `bpm_proc_node` VALUES (19, 56, 55, 0, NULL, NULL, '发起人', 'start', NULL, '{\"name\":\"所有人\"}', NULL);
INSERT INTO `bpm_proc_node` VALUES (38, 56, 55, 13, NULL, NULL, '审批人', 'approver', NULL, '{\"name\":\"李四\"}', NULL);
INSERT INTO `bpm_proc_node` VALUES (39, 56, 55, 43, 13, 38, '审批人', 'approver', NULL, '{\"name\":\"老王\"}', NULL);
INSERT INTO `bpm_proc_node` VALUES (43, 56, 55, 13, 13, NULL, '条件', 'condition', NULL, '{\"days\":3}', NULL);
INSERT INTO `bpm_proc_node` VALUES (69, 56, 55, 13, 13, 38, '条件', 'condition', NULL, '{}', NULL);
INSERT INTO `bpm_proc_node` VALUES (83, 56, 55, 0, 13, 38, '审批人', 'approver', NULL, '{\"name\":\"赵六\"}', NULL);
INSERT INTO `bpm_proc_node` VALUES (1877531456184651776, 1877531455438065664, 63, 0, NULL, NULL, '发起人', '0', 1, NULL, '[\"11385\",\"11386\"]');
INSERT INTO `bpm_proc_node` VALUES (1877531456188846080, 1877531455438065664, 63, 1877531456184651776, NULL, NULL, '审核人', '1', 2, NULL, NULL);
INSERT INTO `bpm_proc_node` VALUES (1877531456188846081, 1877531455438065664, 63, 1877531456188846080, NULL, NULL, '审核人', '1', 1, NULL, '[\"11416\"]');
INSERT INTO `bpm_proc_node` VALUES (1877540583661244416, 1877540583543803904, 66, 0, NULL, NULL, '发起人', '0', 1, NULL, '[\"11400\"]');
INSERT INTO `bpm_proc_node` VALUES (1877540583661244417, 1877540583543803904, 66, 1877540583661244416, NULL, NULL, '审核人', '1', 1, NULL, '[\"11385\"]');
INSERT INTO `bpm_proc_node` VALUES (1877540583661244418, 1877540583543803904, 66, 1877540583661244417, NULL, NULL, '审核人', '1', 1, NULL, '[\"11416\"]');
INSERT INTO `bpm_proc_node` VALUES (1881165056138416128, 1881165056029364224, 67, 0, NULL, NULL, '发起人', '0', 0, NULL, '[\"11400\",\"11404\",\"11412\",\"11415\"]');
INSERT INTO `bpm_proc_node` VALUES (1881165056138416129, 1881165056029364224, 67, 1881165056138416128, NULL, NULL, '审核人', '1', 2, NULL, NULL);
INSERT INTO `bpm_proc_node` VALUES (1881165056138416130, 1881165056029364224, 67, 1881165056138416129, NULL, NULL, '路由', '4', 1, NULL, NULL);
INSERT INTO `bpm_proc_node` VALUES (1881165056138416131, 1881165056029364224, 67, 1881165056138416130, 1881165056138416130, NULL, '条件1', '3', 1, '[{\"showType\":\"input\",\"columnId\":1,\"type\":2,\"showName\":\"删除数量\",\"optType\":\"1\",\"zdy1\":\"2\",\"opt1\":\"<\",\"zdy2\":\"\",\"opt2\":\"<\",\"columnDbname\":\"delNum\",\"columnType\":\"Double\"}]', NULL);
INSERT INTO `bpm_proc_node` VALUES (1881165056138416132, 1881165056029364224, 67, 1881165056138416131, 1881165056138416130, NULL, '审核人', '1', 1, NULL, '[\"11385\"]');
INSERT INTO `bpm_proc_node` VALUES (1881165056138416133, 1881165056029364224, 67, 1881165056138416130, 1881165056138416130, NULL, '条件2', '3', 1, '[{\"showType\":\"input\",\"columnId\":1,\"type\":2,\"showName\":\"删除数量\",\"optType\":\"5\",\"zdy1\":\"2\",\"opt1\":\"<\",\"zdy2\":2,\"opt2\":\"<\",\"columnDbname\":\"delNum\",\"columnType\":\"Double\"}]', NULL);
INSERT INTO `bpm_proc_node` VALUES (1881165056138416134, 1881165056029364224, 67, 1881165056138416133, 1881165056138416130, NULL, '审核人', '1', 1, NULL, '[\"11416\"]');
INSERT INTO `bpm_proc_node` VALUES (1881256540032339968, 1877540583543803904, 68, 0, NULL, NULL, '发起人', '0', 1, NULL, '[\"11400\"]');
INSERT INTO `bpm_proc_node` VALUES (1881256540032339969, 1877540583543803904, 68, 1881256540032339968, NULL, NULL, '审核人', '1', 1, NULL, '[\"11385\"]');
INSERT INTO `bpm_proc_node` VALUES (1881256540032339970, 1877540583543803904, 68, 1881256540032339969, NULL, NULL, '审核人', '1', 1, NULL, '[\"11416\"]');
INSERT INTO `bpm_proc_node` VALUES (1881256637629599744, 1877540583543803904, 69, 0, NULL, NULL, '发起人', '0', 1, NULL, '[\"11400\"]');
INSERT INTO `bpm_proc_node` VALUES (1881256637629599745, 1877540583543803904, 69, 1881256637629599744, NULL, NULL, '审核人', '1', 1, NULL, '[\"11385\"]');
INSERT INTO `bpm_proc_node` VALUES (1881256637629599746, 1877540583543803904, 69, 1881256637629599745, NULL, NULL, '审核人', '1', 1, NULL, '[\"11416\"]');
INSERT INTO `bpm_proc_node` VALUES (1881256724430721024, 1877540583543803904, 70, 0, NULL, NULL, '发起人', '0', 1, NULL, '[\"11400\"]');
INSERT INTO `bpm_proc_node` VALUES (1881256724430721025, 1877540583543803904, 70, 1881256724430721024, NULL, NULL, '审核人', '1', 1, NULL, '[\"11385\"]');
INSERT INTO `bpm_proc_node` VALUES (1881256724430721026, 1877540583543803904, 70, 1881256724430721025, NULL, NULL, '审核人', '1', 1, NULL, '[\"11416\"]');
INSERT INTO `bpm_proc_node` VALUES (1881256870639964160, 1877540583543803904, 71, 0, NULL, NULL, '发起人', '0', 1, NULL, '[\"11400\"]');
INSERT INTO `bpm_proc_node` VALUES (1881256870639964161, 1877540583543803904, 71, 1881256870639964160, NULL, NULL, '审核人', '1', 1, NULL, '[\"11385\"]');
INSERT INTO `bpm_proc_node` VALUES (1881256870639964162, 1877540583543803904, 71, 1881256870639964161, NULL, NULL, '审核人', '1', 1, NULL, '[\"11416\"]');
INSERT INTO `bpm_proc_node` VALUES (1881256941238489088, 1877540583543803904, 72, 0, NULL, NULL, '发起人', '0', 1, NULL, '[\"11400\"]');
INSERT INTO `bpm_proc_node` VALUES (1881256941238489089, 1877540583543803904, 72, 1881256941238489088, NULL, NULL, '审核人', '1', 1, NULL, '[\"11385\"]');
INSERT INTO `bpm_proc_node` VALUES (1881256941238489090, 1877540583543803904, 72, 1881256941238489089, NULL, NULL, '审核人', '1', 1, NULL, '[\"11416\"]');
INSERT INTO `bpm_proc_node` VALUES (1881256989812723712, 1881165056029364224, 73, 0, NULL, NULL, '发起人', '0', 0, NULL, '[\"11400\",\"11404\",\"11412\",\"11415\"]');
INSERT INTO `bpm_proc_node` VALUES (1881256989812723713, 1881165056029364224, 73, 1881256989812723712, NULL, NULL, '审核人', '1', 2, NULL, NULL);
INSERT INTO `bpm_proc_node` VALUES (1881256989812723714, 1881165056029364224, 73, 1881256989812723713, NULL, NULL, '路由', '4', 1, NULL, NULL);
INSERT INTO `bpm_proc_node` VALUES (1881256989816918016, 1881165056029364224, 73, 1881256989812723714, 1881256989812723714, NULL, '条件1', '3', 1, '[{\"showType\":\"input\",\"columnId\":1,\"type\":2,\"showName\":\"删除数量\",\"optType\":\"1\",\"zdy1\":\"2\",\"opt1\":\"<\",\"zdy2\":\"\",\"opt2\":\"<\",\"columnDbname\":\"delNum\",\"columnType\":\"Double\"}]', NULL);
INSERT INTO `bpm_proc_node` VALUES (1881256989816918017, 1881165056029364224, 73, 1881256989816918016, 1881256989812723714, NULL, '审核人', '1', 1, NULL, '[\"11385\"]');
INSERT INTO `bpm_proc_node` VALUES (1881256989816918018, 1881165056029364224, 73, 1881256989812723714, 1881256989812723714, NULL, '条件2', '3', 1, '[{\"showType\":\"input\",\"columnId\":1,\"type\":2,\"showName\":\"删除数量\",\"optType\":\"5\",\"zdy1\":\"2\",\"opt1\":\"<\",\"zdy2\":2,\"opt2\":\"<\",\"columnDbname\":\"delNum\",\"columnType\":\"Double\"}]', NULL);
INSERT INTO `bpm_proc_node` VALUES (1881256989816918019, 1881165056029364224, 73, 1881256989816918018, 1881256989812723714, NULL, '审核人', '1', 1, NULL, '[\"11416\"]');
INSERT INTO `bpm_proc_node` VALUES (1881257083911933952, 1881165056029364224, 74, 0, NULL, NULL, '发起人', '0', 0, NULL, '[\"11400\",\"11404\",\"11412\",\"11415\"]');
INSERT INTO `bpm_proc_node` VALUES (1881257083911933953, 1881165056029364224, 74, 1881257083911933952, NULL, NULL, '审核人', '1', 2, NULL, NULL);
INSERT INTO `bpm_proc_node` VALUES (1881257083911933954, 1881165056029364224, 74, 1881257083911933953, NULL, NULL, '路由', '4', 1, NULL, NULL);
INSERT INTO `bpm_proc_node` VALUES (1881257083911933955, 1881165056029364224, 74, 1881257083911933954, 1881257083911933954, NULL, '条件1', '3', 1, '[{\"showType\":\"input\",\"columnId\":1,\"type\":2,\"showName\":\"删除数量\",\"optType\":\"1\",\"zdy1\":\"2\",\"opt1\":\"<\",\"zdy2\":\"\",\"opt2\":\"<\",\"columnDbname\":\"delNum\",\"columnType\":\"Double\"}]', NULL);
INSERT INTO `bpm_proc_node` VALUES (1881257083911933956, 1881165056029364224, 74, 1881257083911933955, 1881257083911933954, NULL, '审核人', '1', 1, NULL, '[\"11386\"]');
INSERT INTO `bpm_proc_node` VALUES (1881257083911933957, 1881165056029364224, 74, 1881257083911933954, 1881257083911933954, NULL, '条件2', '3', 1, '[{\"showType\":\"input\",\"columnId\":1,\"type\":2,\"showName\":\"删除数量\",\"optType\":\"5\",\"zdy1\":\"2\",\"opt1\":\"<\",\"zdy2\":2,\"opt2\":\"<\",\"columnDbname\":\"delNum\",\"columnType\":\"Double\"}]', NULL);
INSERT INTO `bpm_proc_node` VALUES (1881257083911933958, 1881165056029364224, 74, 1881257083911933957, 1881257083911933954, NULL, '审核人', '1', 1, NULL, '[\"11416\"]');
INSERT INTO `bpm_proc_node` VALUES (1881268345693671424, 1877540583543803904, 75, 0, NULL, NULL, '发起人', '0', 1, NULL, '[\"11400\"]');
INSERT INTO `bpm_proc_node` VALUES (1881268345693671425, 1877540583543803904, 75, 1881268345693671424, NULL, NULL, '审核人', '1', 1, NULL, '[\"11385\"]');
INSERT INTO `bpm_proc_node` VALUES (1881268345693671426, 1877540583543803904, 75, 1881268345693671425, NULL, NULL, '审核人', '1', 1, NULL, '[\"11416\"]');
INSERT INTO `bpm_proc_node` VALUES (1881268502338342912, 1877540583543803904, 76, 0, NULL, NULL, '发起人', '0', 1, NULL, '[\"11400\"]');
INSERT INTO `bpm_proc_node` VALUES (1881268502338342913, 1877540583543803904, 76, 1881268502338342912, NULL, NULL, '审核人', '1', 1, NULL, '[\"11385\"]');
INSERT INTO `bpm_proc_node` VALUES (1881268502338342914, 1877540583543803904, 76, 1881268502338342913, NULL, NULL, '审核人', '1', 1, NULL, '[\"11416\"]');
INSERT INTO `bpm_proc_node` VALUES (1881268600833183744, 1877540583543803904, 77, 0, NULL, NULL, '发起人', '0', 1, NULL, '[\"11400\"]');
INSERT INTO `bpm_proc_node` VALUES (1881268600833183745, 1877540583543803904, 77, 1881268600833183744, NULL, NULL, '审核人', '1', 1, NULL, '[\"11385\"]');
INSERT INTO `bpm_proc_node` VALUES (1881268600833183746, 1877540583543803904, 77, 1881268600833183745, NULL, NULL, '审核人', '1', 1, NULL, '[\"11416\"]');
INSERT INTO `bpm_proc_node` VALUES (1881268693661519872, 1877540583543803904, 78, 0, NULL, NULL, '发起人', '0', 1, NULL, '[\"11400\"]');
INSERT INTO `bpm_proc_node` VALUES (1881268693661519873, 1877540583543803904, 78, 1881268693661519872, NULL, NULL, '审核人', '1', 1, NULL, '[\"11385\"]');
INSERT INTO `bpm_proc_node` VALUES (1881268693661519874, 1877540583543803904, 78, 1881268693661519873, NULL, NULL, '审核人', '1', 1, NULL, '[\"11416\"]');
INSERT INTO `bpm_proc_node` VALUES (1881269432995680256, 1877540583543803904, 79, 0, NULL, NULL, '发起人', '0', 1, NULL, '[\"11400\"]');
INSERT INTO `bpm_proc_node` VALUES (1881269432995680257, 1877540583543803904, 79, 1881269432995680256, NULL, NULL, '审核人', '1', 1, NULL, '[\"11385\"]');
INSERT INTO `bpm_proc_node` VALUES (1881269432995680258, 1877540583543803904, 79, 1881269432995680257, NULL, NULL, '审核人', '1', 1, NULL, '[\"11416\"]');
INSERT INTO `bpm_proc_node` VALUES (1881270499217117184, 1881165056029364224, 80, 0, NULL, NULL, '发起人', '0', 0, NULL, '[\"11400\",\"11404\",\"11412\",\"11415\"]');
INSERT INTO `bpm_proc_node` VALUES (1881270499217117185, 1881165056029364224, 80, 1881270499217117184, NULL, NULL, '路由', '4', 1, NULL, NULL);
INSERT INTO `bpm_proc_node` VALUES (1881270499217117186, 1881165056029364224, 80, 1881270499217117185, 1881270499217117185, NULL, '条件1', '3', 1, '[{\"showType\":\"input\",\"columnId\":1,\"type\":2,\"showName\":\"删除数量\",\"optType\":\"1\",\"zdy1\":\"2\",\"opt1\":\"<\",\"zdy2\":\"\",\"opt2\":\"<\",\"columnDbname\":\"delNum\",\"columnType\":\"Double\"}]', NULL);
INSERT INTO `bpm_proc_node` VALUES (1881270499217117187, 1881165056029364224, 80, 1881270499217117186, 1881270499217117185, NULL, '审核人', '1', 1, NULL, '[\"11386\"]');
INSERT INTO `bpm_proc_node` VALUES (1881270499217117188, 1881165056029364224, 80, 1881270499217117185, 1881270499217117185, NULL, '条件2', '3', 1, '[{\"showType\":\"input\",\"columnId\":1,\"type\":2,\"showName\":\"删除数量\",\"optType\":\"5\",\"zdy1\":\"2\",\"opt1\":\"<\",\"zdy2\":2,\"opt2\":\"<\",\"columnDbname\":\"delNum\",\"columnType\":\"Double\"}]', NULL);
INSERT INTO `bpm_proc_node` VALUES (1881270499217117189, 1881165056029364224, 80, 1881270499217117188, 1881270499217117185, NULL, '审核人', '1', 1, NULL, '[\"11416\"]');
INSERT INTO `bpm_proc_node` VALUES (1881508054810365952, 1881508054797783040, 81, 0, NULL, NULL, '发起人', '0', 0, NULL, '[\"11385\",\"11386\",\"11411\",\"11413\",\"11414\",\"11416\",\"11400\",\"11404\",\"11412\",\"11415\",\"11407\",\"11417\",\"11418\"]');
INSERT INTO `bpm_proc_node` VALUES (1881508054810365953, 1881508054797783040, 81, 1881508054810365952, NULL, NULL, '路由', '4', 1, NULL, NULL);
INSERT INTO `bpm_proc_node` VALUES (1881508054810365954, 1881508054797783040, 81, 1881508054810365953, 1881508054810365953, NULL, '条件1', '3', 1, '[{\"showType\":\"input\",\"columnId\":1,\"type\":2,\"showName\":\"删除数量\",\"optType\":\"1\",\"zdy1\":\"2\",\"opt1\":\"<\",\"zdy2\":\"\",\"opt2\":\"<\",\"columnDbname\":\"delNum\",\"columnType\":\"Double\"}]', NULL);
INSERT INTO `bpm_proc_node` VALUES (1881508054810365955, 1881508054797783040, 81, 1881508054810365954, 1881508054810365953, NULL, '审核人', '1', 2, NULL, NULL);
INSERT INTO `bpm_proc_node` VALUES (1881508054810365956, 1881508054797783040, 81, 1881508054810365953, 1881508054810365953, NULL, '条件2', '3', 1, '[{\"showType\":\"input\",\"columnId\":1,\"type\":2,\"showName\":\"删除数量\",\"optType\":\"5\",\"zdy1\":\"3\",\"opt1\":\"<\",\"zdy2\":2,\"opt2\":\"<\",\"columnDbname\":\"delNum\",\"columnType\":\"Double\"}]', NULL);
INSERT INTO `bpm_proc_node` VALUES (1881508054810365957, 1881508054797783040, 81, 1881508054810365956, 1881508054810365953, NULL, '审核人', '1', 1, NULL, '[\"11386\"]');
INSERT INTO `bpm_proc_node` VALUES (1881509960634994688, 1881508054797783040, 82, 0, NULL, NULL, '发起人', '0', 0, NULL, '[\"11385\",\"11386\",\"11411\",\"11413\",\"11414\",\"11416\",\"11400\",\"11404\",\"11412\",\"11415\",\"11407\",\"11417\",\"11418\"]');
INSERT INTO `bpm_proc_node` VALUES (1881509960634994689, 1881508054797783040, 82, 1881509960634994688, NULL, NULL, '路由', '4', 1, NULL, NULL);
INSERT INTO `bpm_proc_node` VALUES (1881509960634994690, 1881508054797783040, 82, 1881509960634994689, 1881509960634994689, NULL, '条件1', '3', 1, '[{\"showType\":\"input\",\"columnId\":1,\"type\":2,\"showName\":\"删除数量\",\"optType\":\"1\",\"zdy1\":\"2\",\"opt1\":\"<\",\"zdy2\":\"\",\"opt2\":\"<\",\"columnDbname\":\"delNum\",\"columnType\":\"Double\"}]', NULL);
INSERT INTO `bpm_proc_node` VALUES (1881509960634994691, 1881508054797783040, 82, 1881509960634994690, 1881509960634994689, NULL, '审核人', '1', 2, NULL, NULL);
INSERT INTO `bpm_proc_node` VALUES (1881509960634994692, 1881508054797783040, 82, 1881509960634994689, 1881509960634994689, NULL, '条件2', '3', 1, '[{\"showType\":\"input\",\"columnId\":1,\"type\":2,\"showName\":\"删除数量\",\"optType\":\"5\",\"zdy1\":\"3\",\"opt1\":\"<\",\"zdy2\":2,\"opt2\":\"<\",\"columnDbname\":\"delNum\",\"columnType\":\"Double\"}]', NULL);
INSERT INTO `bpm_proc_node` VALUES (1881509960634994693, 1881508054797783040, 82, 1881509960634994692, 1881509960634994689, NULL, '审核人', '1', 1, NULL, '[\"11386\"]');
INSERT INTO `bpm_proc_node` VALUES (1881510045217329152, 1881508054797783040, 83, 0, NULL, NULL, '发起人', '0', 0, NULL, '[\"11385\",\"11386\",\"11411\",\"11413\",\"11414\",\"11416\"]');
INSERT INTO `bpm_proc_node` VALUES (1881510045217329153, 1881508054797783040, 83, 1881510045217329152, NULL, NULL, '路由', '4', 1, NULL, NULL);
INSERT INTO `bpm_proc_node` VALUES (1881510045221523456, 1881508054797783040, 83, 1881510045217329153, 1881510045217329153, NULL, '条件1', '3', 1, '[{\"showType\":\"input\",\"columnId\":1,\"type\":2,\"showName\":\"删除数量\",\"optType\":\"1\",\"zdy1\":\"2\",\"opt1\":\"<\",\"zdy2\":\"\",\"opt2\":\"<\",\"columnDbname\":\"delNum\",\"columnType\":\"Double\"}]', NULL);
INSERT INTO `bpm_proc_node` VALUES (1881510045221523457, 1881508054797783040, 83, 1881510045221523456, 1881510045217329153, NULL, '审核人', '1', 2, NULL, NULL);
INSERT INTO `bpm_proc_node` VALUES (1881510045221523458, 1881508054797783040, 83, 1881510045217329153, 1881510045217329153, NULL, '条件2', '3', 1, '[{\"showType\":\"input\",\"columnId\":1,\"type\":2,\"showName\":\"删除数量\",\"optType\":\"5\",\"zdy1\":\"3\",\"opt1\":\"<\",\"zdy2\":2,\"opt2\":\"<\",\"columnDbname\":\"delNum\",\"columnType\":\"Double\"}]', NULL);
INSERT INTO `bpm_proc_node` VALUES (1881510045221523459, 1881508054797783040, 83, 1881510045221523458, 1881510045217329153, NULL, '审核人', '1', 1, NULL, '[\"11386\"]');
INSERT INTO `bpm_proc_node` VALUES (1881513325557321728, 1881513325548933120, 84, 0, NULL, NULL, '发起人', '0', 0, NULL, NULL);
INSERT INTO `bpm_proc_node` VALUES (1881513325557321729, 1881513325548933120, 84, 1881513325557321728, NULL, NULL, '审核人', '1', 2, NULL, NULL);
INSERT INTO `bpm_proc_node` VALUES (1881513369735925760, 1881513325548933120, 85, 0, NULL, NULL, '发起人', '0', 0, NULL, NULL);
INSERT INTO `bpm_proc_node` VALUES (1881513369735925761, 1881513325548933120, 85, 1881513369735925760, NULL, NULL, '审核人', '1', 2, NULL, NULL);
INSERT INTO `bpm_proc_node` VALUES (1881514055315886080, 1881508054797783040, 86, 0, NULL, NULL, '发起人', '0', 0, NULL, '[\"11385\",\"11386\",\"11411\",\"11413\",\"11414\",\"11416\"]');
INSERT INTO `bpm_proc_node` VALUES (1881514055315886081, 1881508054797783040, 86, 1881514055315886080, NULL, NULL, '路由', '4', 1, NULL, NULL);
INSERT INTO `bpm_proc_node` VALUES (1881514055315886082, 1881508054797783040, 86, 1881514055315886081, 1881514055315886081, NULL, '条件1', '3', 1, '[{\"showType\":\"input\",\"columnId\":1,\"type\":2,\"showName\":\"删除数量\",\"optType\":\"1\",\"zdy1\":\"2\",\"opt1\":\"<\",\"zdy2\":\"\",\"opt2\":\"<\",\"columnDbname\":\"delNum\",\"columnType\":\"Double\"}]', NULL);
INSERT INTO `bpm_proc_node` VALUES (1881514055315886083, 1881508054797783040, 86, 1881514055315886082, 1881514055315886081, NULL, '审核人', '1', 2, NULL, NULL);
INSERT INTO `bpm_proc_node` VALUES (1881514055315886084, 1881508054797783040, 86, 1881514055315886081, 1881514055315886081, NULL, '条件2', '3', 1, '[{\"showType\":\"input\",\"columnId\":1,\"type\":2,\"showName\":\"删除数量\",\"optType\":\"5\",\"zdy1\":\"3\",\"opt1\":\"<\",\"zdy2\":2,\"opt2\":\"<\",\"columnDbname\":\"delNum\",\"columnType\":\"Double\"}]', NULL);
INSERT INTO `bpm_proc_node` VALUES (1881514055315886085, 1881508054797783040, 86, 1881514055315886084, 1881514055315886081, NULL, '审核人', '1', 1, NULL, '[\"11386\"]');
INSERT INTO `bpm_proc_node` VALUES (1881514277618192384, 1881513325548933120, 87, 0, NULL, NULL, '发起人', '0', 0, NULL, NULL);
INSERT INTO `bpm_proc_node` VALUES (1881514277618192385, 1881513325548933120, 87, 1881514277618192384, NULL, NULL, '审核人', '1', 2, NULL, NULL);
INSERT INTO `bpm_proc_node` VALUES (1881514306646970368, 1881508054797783040, 88, 0, NULL, NULL, '发起人', '0', 1, NULL, '[\"11385\",\"11386\",\"11411\",\"11413\",\"11414\",\"11416\"]');
INSERT INTO `bpm_proc_node` VALUES (1881514306646970369, 1881508054797783040, 88, 1881514306646970368, NULL, NULL, '路由', '4', 1, NULL, NULL);
INSERT INTO `bpm_proc_node` VALUES (1881514306646970370, 1881508054797783040, 88, 1881514306646970369, 1881514306646970369, NULL, '条件1', '3', 1, '[{\"showType\":\"input\",\"columnId\":1,\"type\":2,\"showName\":\"删除数量\",\"optType\":\"1\",\"zdy1\":\"2\",\"opt1\":\"<\",\"zdy2\":\"\",\"opt2\":\"<\",\"columnDbname\":\"delNum\",\"columnType\":\"Double\"}]', NULL);
INSERT INTO `bpm_proc_node` VALUES (1881514306646970371, 1881508054797783040, 88, 1881514306646970370, 1881514306646970369, NULL, '审核人', '1', 2, NULL, NULL);
INSERT INTO `bpm_proc_node` VALUES (1881514306646970372, 1881508054797783040, 88, 1881514306646970369, 1881514306646970369, NULL, '条件2', '3', 1, '[{\"showType\":\"input\",\"columnId\":1,\"type\":2,\"showName\":\"删除数量\",\"optType\":\"5\",\"zdy1\":\"3\",\"opt1\":\"<\",\"zdy2\":2,\"opt2\":\"<\",\"columnDbname\":\"delNum\",\"columnType\":\"Double\"}]', NULL);
INSERT INTO `bpm_proc_node` VALUES (1881514306646970373, 1881508054797783040, 88, 1881514306646970372, 1881514306646970369, NULL, '审核人', '1', 1, NULL, '[\"11386\"]');
INSERT INTO `bpm_proc_node` VALUES (1881515311962918912, 1881508054797783040, 89, 0, NULL, NULL, '发起人', '0', 1, NULL, '[\"11385\",\"11386\",\"11411\",\"11413\",\"11414\",\"11416\"]');
INSERT INTO `bpm_proc_node` VALUES (1881515311962918913, 1881508054797783040, 89, 1881515311962918912, NULL, NULL, '路由', '4', 1, NULL, NULL);
INSERT INTO `bpm_proc_node` VALUES (1881515311962918914, 1881508054797783040, 89, 1881515311962918913, 1881515311962918913, NULL, '条件1', '3', 1, '[{\"showType\":\"input\",\"columnId\":1,\"type\":2,\"showName\":\"删除数量\",\"optType\":\"6\",\"zdy1\":1,\"opt1\":\"<\",\"zdy2\":2,\"opt2\":\"<\",\"columnDbname\":\"delNum\",\"columnType\":\"Double\"}]', NULL);
INSERT INTO `bpm_proc_node` VALUES (1881515311962918915, 1881508054797783040, 89, 1881515311962918914, 1881515311962918913, NULL, '审核人', '1', 2, NULL, NULL);
INSERT INTO `bpm_proc_node` VALUES (1881515311962918916, 1881508054797783040, 89, 1881515311962918913, 1881515311962918913, NULL, '条件2', '3', 1, '[{\"showType\":\"input\",\"columnId\":1,\"type\":2,\"showName\":\"删除数量\",\"optType\":\"5\",\"zdy1\":\"3\",\"opt1\":\"<\",\"zdy2\":2,\"opt2\":\"<\",\"columnDbname\":\"delNum\",\"columnType\":\"Double\"}]', NULL);
INSERT INTO `bpm_proc_node` VALUES (1881515311962918917, 1881508054797783040, 89, 1881515311962918916, 1881515311962918913, NULL, '审核人', '1', 1, NULL, '[\"11386\"]');
INSERT INTO `bpm_proc_node` VALUES (1881516748407181312, 1881508054797783040, 90, 0, NULL, NULL, '发起人', '0', 1, NULL, '[\"11385\",\"11386\",\"11411\",\"11413\",\"11414\",\"11416\"]');
INSERT INTO `bpm_proc_node` VALUES (1881516748407181313, 1881508054797783040, 90, 1881516748407181312, NULL, NULL, '路由', '4', 1, NULL, NULL);
INSERT INTO `bpm_proc_node` VALUES (1881516748407181314, 1881508054797783040, 90, 1881516748407181313, 1881516748407181313, NULL, '条件1', '3', 1, '[{\"showType\":\"input\",\"columnId\":1,\"type\":2,\"showName\":\"删除数量\",\"optType\":\"6\",\"zdy1\":1,\"opt1\":\"≤\",\"zdy2\":2,\"opt2\":\"<\",\"columnDbname\":\"delNum\",\"columnType\":\"Double\"}]', NULL);
INSERT INTO `bpm_proc_node` VALUES (1881516748407181315, 1881508054797783040, 90, 1881516748407181314, 1881516748407181313, NULL, '审核人', '1', 2, NULL, NULL);
INSERT INTO `bpm_proc_node` VALUES (1881516748407181316, 1881508054797783040, 90, 1881516748407181313, 1881516748407181313, NULL, '条件2', '3', 1, '[{\"showType\":\"input\",\"columnId\":1,\"type\":2,\"showName\":\"删除数量\",\"optType\":\"5\",\"zdy1\":\"3\",\"opt1\":\"<\",\"zdy2\":2,\"opt2\":\"<\",\"columnDbname\":\"delNum\",\"columnType\":\"Double\"}]', NULL);
INSERT INTO `bpm_proc_node` VALUES (1881516748407181317, 1881508054797783040, 90, 1881516748407181316, 1881516748407181313, NULL, '审核人', '1', 1, NULL, '[\"11386\"]');
INSERT INTO `bpm_proc_node` VALUES (1881517271667576832, 1881508054797783040, 91, 0, NULL, NULL, '发起人', '0', 1, NULL, '[\"11385\",\"11386\",\"11411\",\"11413\",\"11414\",\"11416\"]');
INSERT INTO `bpm_proc_node` VALUES (1881517271667576833, 1881508054797783040, 91, 1881517271667576832, NULL, NULL, '路由', '4', 1, NULL, NULL);
INSERT INTO `bpm_proc_node` VALUES (1881517271667576834, 1881508054797783040, 91, 1881517271667576833, 1881517271667576833, NULL, '条件1', '3', 1, '[{\"showType\":\"input\",\"columnId\":1,\"type\":2,\"showName\":\"删除数量\",\"optType\":\"6\",\"zdy1\":1,\"opt1\":\"≤\",\"zdy2\":2,\"opt2\":\"<\",\"columnDbname\":\"delNum\",\"columnType\":\"Double\"}]', NULL);
INSERT INTO `bpm_proc_node` VALUES (1881517271667576835, 1881508054797783040, 91, 1881517271667576834, 1881517271667576833, NULL, '审核人', '1', 2, NULL, NULL);
INSERT INTO `bpm_proc_node` VALUES (1881517271667576836, 1881508054797783040, 91, 1881517271667576833, 1881517271667576833, NULL, '条件2', '3', 1, '[{\"showType\":\"input\",\"columnId\":1,\"type\":2,\"showName\":\"删除数量\",\"optType\":\"1\",\"zdy1\":\"1\",\"opt1\":\"<\",\"zdy2\":2,\"opt2\":\"<\",\"columnDbname\":\"delNum\",\"columnType\":\"Double\"}]', NULL);
INSERT INTO `bpm_proc_node` VALUES (1881517271667576837, 1881508054797783040, 91, 1881517271667576836, 1881517271667576833, NULL, '审核人', '1', 1, NULL, '[\"11386\"]');
INSERT INTO `bpm_proc_node` VALUES (1881517540241444864, 1881508054797783040, 92, 0, NULL, NULL, '发起人', '0', 1, NULL, '[\"11385\",\"11386\",\"11411\",\"11413\",\"11414\",\"11416\"]');
INSERT INTO `bpm_proc_node` VALUES (1881517540241444865, 1881508054797783040, 92, 1881517540241444864, NULL, NULL, '路由', '4', 1, NULL, NULL);
INSERT INTO `bpm_proc_node` VALUES (1881517540241444866, 1881508054797783040, 92, 1881517540241444865, 1881517540241444865, NULL, '条件1', '3', 1, '[{\"showType\":\"input\",\"columnId\":1,\"type\":2,\"showName\":\"删除数量\",\"optType\":\"6\",\"zdy1\":1,\"opt1\":\"≤\",\"zdy2\":2,\"opt2\":\"<\",\"columnDbname\":\"delNum\",\"columnType\":\"Double\"}]', NULL);
INSERT INTO `bpm_proc_node` VALUES (1881517540241444867, 1881508054797783040, 92, 1881517540241444866, 1881517540241444865, NULL, '审核人', '1', 2, NULL, NULL);
INSERT INTO `bpm_proc_node` VALUES (1881517540241444868, 1881508054797783040, 92, 1881517540241444865, 1881517540241444865, NULL, '条件2', '3', 1, '[{\"showType\":\"input\",\"columnId\":1,\"type\":2,\"showName\":\"删除数量\",\"optType\":\"2\",\"zdy1\":\"2\",\"opt1\":\"<\",\"zdy2\":2,\"opt2\":\"<\",\"columnDbname\":\"delNum\",\"columnType\":\"Double\"}]', NULL);
INSERT INTO `bpm_proc_node` VALUES (1881517540241444869, 1881508054797783040, 92, 1881517540241444868, 1881517540241444865, NULL, '审核人', '1', 1, NULL, '[\"11386\"]');
INSERT INTO `bpm_proc_node` VALUES (1881517821758935040, 1881508054797783040, 93, 0, NULL, NULL, '发起人', '0', 1, NULL, '[\"11385\",\"11386\",\"11411\",\"11413\",\"11414\",\"11416\"]');
INSERT INTO `bpm_proc_node` VALUES (1881517821758935041, 1881508054797783040, 93, 1881517821758935040, NULL, NULL, '路由', '4', 1, NULL, NULL);
INSERT INTO `bpm_proc_node` VALUES (1881517821758935042, 1881508054797783040, 93, 1881517821758935041, 1881517821758935041, NULL, '条件1', '3', 1, '[{\"showType\":\"input\",\"columnId\":1,\"type\":2,\"showName\":\"删除数量\",\"optType\":\"6\",\"zdy1\":1,\"opt1\":\"≤\",\"zdy2\":2,\"opt2\":\"<\",\"columnDbname\":\"delNum\",\"columnType\":\"Double\"}]', NULL);
INSERT INTO `bpm_proc_node` VALUES (1881517821758935043, 1881508054797783040, 93, 1881517821758935042, 1881517821758935041, NULL, '审核人', '1', 2, NULL, NULL);
INSERT INTO `bpm_proc_node` VALUES (1881517821758935044, 1881508054797783040, 93, 1881517821758935041, 1881517821758935041, NULL, '条件2', '3', 1, '[{\"showType\":\"input\",\"columnId\":1,\"type\":2,\"showName\":\"删除数量\",\"optType\":\"2\",\"zdy1\":\"4\",\"opt1\":\"<\",\"zdy2\":2,\"opt2\":\"<\",\"columnDbname\":\"delNum\",\"columnType\":\"Double\"}]', NULL);
INSERT INTO `bpm_proc_node` VALUES (1881517821758935045, 1881508054797783040, 93, 1881517821758935044, 1881517821758935041, NULL, '审核人', '1', 1, NULL, '[\"11386\"]');
INSERT INTO `bpm_proc_node` VALUES (1886952469272072192, 1886952468902973440, 94, 0, NULL, NULL, '发起人', '0', 0, NULL, NULL);
INSERT INTO `bpm_proc_node` VALUES (1886952469272072193, 1886952468902973440, 94, 1886952469272072192, NULL, NULL, '路由', '4', 1, NULL, NULL);
INSERT INTO `bpm_proc_node` VALUES (1886952469272072194, 1886952468902973440, 94, 1886952469272072193, 1886952469272072193, NULL, '条件1', '3', 1, '[{\"showType\":\"input\",\"columnId\":1,\"type\":2,\"showName\":\"删除数量\",\"optType\":\"1\",\"zdy1\":\"2\",\"opt1\":\"<\",\"zdy2\":\"\",\"opt2\":\"<\",\"columnDbname\":\"delNum\",\"columnType\":\"Double\"}]', NULL);
INSERT INTO `bpm_proc_node` VALUES (1886952469272072195, 1886952468902973440, 94, 1886952469272072194, 1886952469272072193, NULL, '审核人', '1', 2, NULL, NULL);
INSERT INTO `bpm_proc_node` VALUES (1886952469272072196, 1886952468902973440, 94, 1886952469272072193, 1886952469272072193, NULL, '条件2', '3', 1, '[{\"showType\":\"input\",\"columnId\":1,\"type\":2,\"showName\":\"删除数量\",\"optType\":\"5\",\"zdy1\":\"3\",\"opt1\":\"<\",\"zdy2\":2,\"opt2\":\"<\",\"columnDbname\":\"delNum\",\"columnType\":\"Double\"}]', NULL);
INSERT INTO `bpm_proc_node` VALUES (1886952469276266496, 1886952468902973440, 94, 1886952469272072196, 1886952469272072193, NULL, '审核人', '1', 1, NULL, '[\"11386\"]');
INSERT INTO `bpm_proc_node` VALUES (1887322596417081344, 1887322596404498432, 95, 0, NULL, NULL, '发起人', '0', 0, NULL, NULL);
INSERT INTO `bpm_proc_node` VALUES (1887322596417081345, 1887322596404498432, 95, 1887322596417081344, NULL, NULL, '审核人', '1', 2, NULL, NULL);
INSERT INTO `bpm_proc_node` VALUES (1887322596417081346, 1887322596404498432, 95, 1887322596417081345, NULL, NULL, '路由', '4', 1, NULL, NULL);
INSERT INTO `bpm_proc_node` VALUES (1887322596417081347, 1887322596404498432, 95, 1887322596417081346, 1887322596417081346, NULL, '条件1', '3', 1, '[{\"showType\":\"input\",\"columnId\":1,\"type\":2,\"showName\":\"删除数量\",\"optType\":\"1\",\"zdy1\":\"2\",\"opt1\":\"<\",\"zdy2\":\"\",\"opt2\":\"<\",\"columnDbname\":\"delNum\",\"columnType\":\"Double\"}]', NULL);
INSERT INTO `bpm_proc_node` VALUES (1887322596417081348, 1887322596404498432, 95, 1887322596417081347, 1887322596417081346, NULL, '审核人', '1', 2, NULL, NULL);
INSERT INTO `bpm_proc_node` VALUES (1887322596417081349, 1887322596404498432, 95, 1887322596417081346, 1887322596417081346, NULL, '条件2', '3', 1, '[{\"showType\":\"input\",\"columnId\":1,\"type\":2,\"showName\":\"删除数量\",\"optType\":\"5\",\"zdy1\":\"2\",\"opt1\":\"<\",\"zdy2\":2,\"opt2\":\"<\",\"columnDbname\":\"delNum\",\"columnType\":\"Double\"}]', NULL);
INSERT INTO `bpm_proc_node` VALUES (1887322596417081350, 1887322596404498432, 95, 1887322596417081349, 1887322596417081346, NULL, '审核人', '1', 1, NULL, '[\"11385\"]');
INSERT INTO `bpm_proc_node` VALUES (1887417377889587200, 1887417377881198592, 96, 0, NULL, NULL, '发起人', '0', 0, NULL, NULL);
INSERT INTO `bpm_proc_node` VALUES (1887417377889587201, 1887417377881198592, 96, 1887417377889587200, NULL, NULL, '审核人', '1', 2, NULL, NULL);
INSERT INTO `bpm_proc_node` VALUES (1887417377889587202, 1887417377881198592, 96, 1887417377889587201, NULL, NULL, '路由', '4', 1, NULL, NULL);
INSERT INTO `bpm_proc_node` VALUES (1887417377889587203, 1887417377881198592, 96, 1887417377889587202, 1887417377889587202, NULL, '条件1', '3', 1, '[{\"showType\":\"input\",\"columnId\":1,\"type\":2,\"showName\":\"删除数量\",\"optType\":\"2\",\"zdy1\":\"3\",\"opt1\":\"<\",\"zdy2\":2,\"opt2\":\"<\",\"columnDbname\":\"delNum\",\"columnType\":\"Double\"}]', NULL);
INSERT INTO `bpm_proc_node` VALUES (1887417377889587204, 1887417377881198592, 96, 1887417377889587203, 1887417377889587202, NULL, '审核人', '1', 1, NULL, '[\"11385\"]');
INSERT INTO `bpm_proc_node` VALUES (1887417377889587205, 1887417377881198592, 96, 1887417377889587202, 1887417377889587202, NULL, '条件2', '3', 1, '[{\"showType\":\"input\",\"columnId\":1,\"type\":2,\"showName\":\"删除数量\",\"optType\":\"3\",\"zdy1\":\"3\",\"opt1\":\"<\",\"zdy2\":2,\"opt2\":\"<\",\"columnDbname\":\"delNum\",\"columnType\":\"Double\"}]', NULL);
INSERT INTO `bpm_proc_node` VALUES (1887417377889587206, 1887417377881198592, 96, 1887417377889587205, 1887417377889587202, NULL, '审核人', '1', 1, NULL, '[\"11386\"]');
INSERT INTO `bpm_proc_node` VALUES (1889558243827650560, 1889558243529854976, 97, 0, NULL, NULL, '发起人', '0', 0, NULL, NULL);
INSERT INTO `bpm_proc_node` VALUES (1889558865721298944, 1889558865696133120, 101, 0, NULL, NULL, '发起人', '0', 0, NULL, NULL);
INSERT INTO `bpm_proc_node` VALUES (1889558865721298945, 1889558865696133120, 101, 1889558865721298944, NULL, NULL, '审核人', '1', 2, NULL, NULL);
INSERT INTO `bpm_proc_node` VALUES (1889560565270056960, 1889558865696133120, 104, 0, NULL, NULL, '发起人', '0', 0, NULL, NULL);
INSERT INTO `bpm_proc_node` VALUES (1889560565270056961, 1889558865696133120, 104, 1889560565270056960, NULL, NULL, '审核人', '1', 2, NULL, NULL);
INSERT INTO `bpm_proc_node` VALUES (1889560609343803392, 1889558865696133120, 105, 0, NULL, NULL, '发起人', '0', 0, NULL, NULL);
INSERT INTO `bpm_proc_node` VALUES (1889560609343803393, 1889558865696133120, 105, 1889560609343803392, NULL, NULL, '审核人', '1', 2, NULL, NULL);
INSERT INTO `bpm_proc_node` VALUES (1890227699159535616, 1890227698954014720, 106, 0, NULL, NULL, '发起人', '0', 1, NULL, '[\"11400\",\"11404\"]');
INSERT INTO `bpm_proc_node` VALUES (1890227699159535617, 1890227698954014720, 106, 1890227699159535616, NULL, NULL, '审核人', '1', 2, NULL, NULL);
INSERT INTO `bpm_proc_node` VALUES (1890227975153127424, 1890227975140544512, 107, 0, NULL, NULL, '发起人', '0', 1, NULL, '[\"11407\",\"11417\"]');
INSERT INTO `bpm_proc_node` VALUES (1890227975153127425, 1890227975140544512, 107, 1890227975153127424, NULL, NULL, '审核人', '1', 2, NULL, NULL);
INSERT INTO `bpm_proc_node` VALUES (1890228056237412352, 1890227975140544512, 108, 0, NULL, NULL, '发起人', '0', 1, NULL, '[\"11404\",\"11407\",\"11417\"]');
INSERT INTO `bpm_proc_node` VALUES (1890228056237412353, 1890227975140544512, 108, 1890228056237412352, NULL, NULL, '审核人', '1', 2, NULL, NULL);
INSERT INTO `bpm_proc_node` VALUES (1996389472761155584, 1996389472723406848, 109, 0, NULL, NULL, '发起人', '0', 0, NULL, NULL);
INSERT INTO `bpm_proc_node` VALUES (1996389472761155585, 1996389472723406848, 109, 1996389472761155584, NULL, NULL, '审核人', '1', 1, NULL, '[\"11385\"]');
INSERT INTO `bpm_proc_node` VALUES (1996395847096602624, 1996389472723406848, 110, 0, NULL, NULL, '发起人', '0', 0, NULL, NULL);
INSERT INTO `bpm_proc_node` VALUES (1996395847096602625, 1996389472723406848, 110, 1996395847096602624, NULL, NULL, '审核人', '1', 2, NULL, NULL);
INSERT INTO `bpm_proc_node` VALUES (1996398699948937216, 1996389472723406848, 111, 0, NULL, NULL, '发起人', '0', 0, NULL, NULL);
INSERT INTO `bpm_proc_node` VALUES (1996398699948937217, 1996389472723406848, 111, 1996398699948937216, NULL, NULL, '审核人', '1', 1, NULL, '[\"11386\"]');

-- ----------------------------
-- Table structure for bpm_proc_version
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
) ENGINE = InnoDB AUTO_INCREMENT = 112 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci COMMENT = '流程版本' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of bpm_proc_version
-- ----------------------------
INSERT INTO `bpm_proc_version` VALUES (55, 56, '{\"nodeName\":\"发起人\",\"nodeType\":\"start\",\"config\":{\"name\":\"所有人\"},\"childNode\":{\"nodeName\":\"审批人\",\"nodeType\":\"approver\",\"config\":{\"name\":\"审核人 老陈\"},\"childNode\":{\"nodeName\":\"路由\",\"nodeType\":\"router\",\"conditionNodes\":[{\"nodeName\":\"条件\",\"nodeType\":\"condition\",\"isLastCondition\":false,\"config\":{\"days\":1},\"childNode\":{\"nodeName\":\"审批人\",\"nodeType\":\"approver\",\"config\":{\"name\":\"赵六\"}}},{\"nodeName\":\"条件\",\"nodeType\":\"condition\",\"isLastCondition\":false,\"config\":{\"days\":3},\"childNode\":{\"nodeName\":\"审批人\",\"nodeType\":\"approver\",\"config\":{\"name\":\"老王\"}}},{\"nodeName\":\"条件\",\"nodeType\":\"condition\",\"isLastCondition\":true,\"config\":{},\"childNode\":{}}],\"childNode\":{\"nodeName\":\"审批人\",\"nodeType\":\"approver\",\"config\":{\"name\":\"李四\"}}}}}', 215, '2025-01-06 14:53:55');
INSERT INTO `bpm_proc_version` VALUES (65, 1877535518485516288, '{\"createUserId\":11386,\"nodeConfig\":{\"nodeName\":\"发起人\",\"type\":0,\"priorityLevel\":\"\",\"settype\":\"0\",\"selectMode\":\"\",\"selectRange\":\"\",\"directorLevel\":\"\",\"examineMode\":\"\",\"noHanderAction\":\"\",\"examineEndDirectorLevel\":\"\",\"ccSelfSelectFlag\":\"\",\"conditionList\":[],\"nodeUserList\":[],\"childNode\":{\"nodeName\":\"审核人\",\"error\":false,\"type\":1,\"settype\":1,\"selectMode\":0,\"selectRange\":0,\"directorLevel\":1,\"examineMode\":1,\"noHanderAction\":2,\"examineEndDirectorLevel\":0,\"childNode\":{\"nodeName\":\"审核人\",\"type\":1,\"priorityLevel\":1,\"settype\":1,\"selectMode\":0,\"selectRange\":0,\"directorLevel\":1,\"examineMode\":1,\"noHanderAction\":2,\"examineEndDirectorLevel\":1,\"ccSelfSelectFlag\":1,\"conditionList\":[],\"nodeUserList\":[{\"type\":1,\"targetId\":\"11416\",\"name\":\"超管bak\"}],\"conditionNodes\":[],\"error\":false},\"nodeUserList\":[{\"type\":1,\"targetId\":\"11385\",\"name\":\"超管\"}]},\"conditionNodes\":[]},\"procName\":\"合同删除流程\",\"procType\":\"合同删除\",\"remark\":\"流程介绍\",\"status\":\"1\"}', 11386, '2025-01-10 09:58:45');
INSERT INTO `bpm_proc_version` VALUES (66, 1877540583543803904, '{\"createUserId\":11386,\"nodeConfig\":{\"nodeName\":\"发起人\",\"type\":0,\"priorityLevel\":\"\",\"settype\":\"1\",\"selectMode\":\"\",\"selectRange\":\"\",\"directorLevel\":\"\",\"examineMode\":\"\",\"noHanderAction\":\"\",\"examineEndDirectorLevel\":\"\",\"ccSelfSelectFlag\":\"\",\"conditionList\":[],\"nodeUserList\":[{\"type\":1,\"targetId\":\"11400\",\"name\":\"冯\"}],\"childNode\":{\"nodeName\":\"审核人\",\"error\":false,\"type\":1,\"settype\":1,\"selectMode\":0,\"selectRange\":0,\"directorLevel\":1,\"examineMode\":1,\"noHanderAction\":2,\"examineEndDirectorLevel\":0,\"childNode\":{\"nodeName\":\"审核人\",\"type\":1,\"priorityLevel\":1,\"settype\":1,\"selectMode\":0,\"selectRange\":0,\"directorLevel\":1,\"examineMode\":1,\"noHanderAction\":2,\"examineEndDirectorLevel\":1,\"ccSelfSelectFlag\":1,\"conditionList\":[],\"nodeUserList\":[{\"type\":1,\"targetId\":\"11416\",\"name\":\"超管bak\"}],\"conditionNodes\":[],\"error\":false},\"nodeUserList\":[{\"type\":1,\"targetId\":\"11385\",\"name\":\"超管\"}]},\"conditionNodes\":[]},\"procName\":\"合同删除流程\",\"procType\":\"合同删除\",\"remark\":\"流程介绍\",\"status\":\"1\"}', 11386, '2025-01-10 10:18:53');
INSERT INTO `bpm_proc_version` VALUES (67, 1881165056029364224, '{\"createUserId\":11386,\"nodeConfig\":{\"nodeName\":\"发起人\",\"type\":0,\"priorityLevel\":\"\",\"settype\":\"\",\"selectMode\":\"\",\"selectRange\":\"\",\"directorLevel\":\"\",\"examineMode\":\"\",\"noHanderAction\":\"\",\"examineEndDirectorLevel\":\"\",\"ccSelfSelectFlag\":\"\",\"conditionList\":[],\"nodeUserList\":[{\"type\":1,\"targetId\":11400,\"name\":\"冯\"},{\"type\":1,\"targetId\":11404,\"name\":\"李四\"},{\"type\":1,\"targetId\":11412,\"name\":\"用户二\"},{\"type\":1,\"targetId\":11415,\"name\":\"ssssss\"}],\"childNode\":{\"nodeName\":\"审核人\",\"error\":false,\"type\":1,\"settype\":2,\"selectMode\":0,\"selectRange\":0,\"directorLevel\":1,\"examineMode\":1,\"noHanderAction\":2,\"examineEndDirectorLevel\":0,\"childNode\":{\"nodeName\":\"路由\",\"type\":4,\"priorityLevel\":1,\"settype\":1,\"selectMode\":0,\"selectRange\":0,\"directorLevel\":1,\"examineMode\":1,\"noHanderAction\":2,\"examineEndDirectorLevel\":1,\"ccSelfSelectFlag\":1,\"conditionList\":[],\"nodeUserList\":[],\"childNode\":{},\"conditionNodes\":[{\"nodeName\":\"条件1\",\"type\":3,\"priorityLevel\":1,\"settype\":1,\"selectMode\":0,\"selectRange\":0,\"directorLevel\":1,\"examineMode\":1,\"noHanderAction\":2,\"examineEndDirectorLevel\":1,\"ccSelfSelectFlag\":1,\"conditionList\":[{\"showType\":\"input\",\"columnId\":1,\"type\":2,\"showName\":\"删除数量\",\"optType\":\"1\",\"zdy1\":\"2\",\"opt1\":\"<\",\"zdy2\":\"\",\"opt2\":\"<\",\"columnDbname\":\"delNum\",\"columnType\":\"Double\"}],\"childNode\":{\"nodeName\":\"审核人\",\"type\":1,\"priorityLevel\":1,\"settype\":1,\"selectMode\":0,\"selectRange\":0,\"directorLevel\":1,\"examineMode\":1,\"noHanderAction\":2,\"examineEndDirectorLevel\":1,\"ccSelfSelectFlag\":1,\"conditionList\":[],\"nodeUserList\":[{\"type\":1,\"targetId\":11385,\"name\":\"超管\"}],\"conditionNodes\":[],\"error\":false},\"conditionNodes\":[],\"error\":false},{\"nodeName\":\"条件2\",\"type\":3,\"priorityLevel\":2,\"settype\":1,\"selectMode\":0,\"selectRange\":0,\"directorLevel\":1,\"examineMode\":1,\"noHanderAction\":2,\"examineEndDirectorLevel\":1,\"ccSelfSelectFlag\":1,\"conditionList\":[{\"showType\":\"input\",\"columnId\":1,\"type\":2,\"showName\":\"删除数量\",\"optType\":\"5\",\"zdy1\":\"2\",\"opt1\":\"<\",\"zdy2\":2,\"opt2\":\"<\",\"columnDbname\":\"delNum\",\"columnType\":\"Double\"}],\"nodeUserList\":[],\"childNode\":{\"nodeName\":\"审核人\",\"type\":1,\"priorityLevel\":1,\"settype\":1,\"selectMode\":0,\"selectRange\":0,\"directorLevel\":1,\"examineMode\":1,\"noHanderAction\":2,\"examineEndDirectorLevel\":1,\"ccSelfSelectFlag\":1,\"conditionList\":[],\"nodeUserList\":[{\"type\":1,\"targetId\":11416,\"name\":\"超管bak\"}],\"conditionNodes\":[],\"error\":false},\"conditionNodes\":[],\"error\":false}]},\"nodeUserList\":[]},\"conditionNodes\":[]},\"procName\":\"test\",\"procType\":\"2\",\"remark\":\"sss\",\"status\":\"0\"}', 11386, '2025-01-20 10:21:14');
INSERT INTO `bpm_proc_version` VALUES (68, 1877540583543803904, '{\"createUserId\":11386,\"id\":\"1877540583543803904\",\"nodeConfig\":{\"nodeName\":\"发起人\",\"type\":0,\"priorityLevel\":\"\",\"settype\":\"1\",\"selectMode\":\"\",\"selectRange\":\"\",\"directorLevel\":\"\",\"examineMode\":\"\",\"noHanderAction\":\"\",\"examineEndDirectorLevel\":\"\",\"ccSelfSelectFlag\":\"\",\"conditionList\":[],\"nodeUserList\":[{\"type\":1,\"targetId\":\"11400\",\"name\":\"冯\"}],\"childNode\":{\"nodeName\":\"审核人\",\"error\":false,\"type\":1,\"settype\":1,\"selectMode\":0,\"selectRange\":0,\"directorLevel\":1,\"examineMode\":1,\"noHanderAction\":2,\"examineEndDirectorLevel\":0,\"childNode\":{\"nodeName\":\"审核人\",\"type\":1,\"priorityLevel\":1,\"settype\":1,\"selectMode\":0,\"selectRange\":0,\"directorLevel\":1,\"examineMode\":1,\"noHanderAction\":2,\"examineEndDirectorLevel\":1,\"ccSelfSelectFlag\":1,\"conditionList\":[],\"nodeUserList\":[{\"type\":1,\"targetId\":\"11416\",\"name\":\"超管bak\"}],\"conditionNodes\":[],\"error\":false},\"nodeUserList\":[{\"type\":1,\"targetId\":\"11385\",\"name\":\"超管\"}]},\"conditionNodes\":[]},\"procName\":\"合同删除流程\",\"procType\":\"合同删除\",\"remark\":\"流程介绍\",\"status\":\"1\"}', 11386, '2025-01-20 16:24:46');
INSERT INTO `bpm_proc_version` VALUES (69, 1877540583543803904, '{\"createUserId\":11386,\"id\":\"1877540583543803904\",\"nodeConfig\":{\"nodeName\":\"发起人\",\"type\":0,\"priorityLevel\":\"\",\"settype\":\"1\",\"selectMode\":\"\",\"selectRange\":\"\",\"directorLevel\":\"\",\"examineMode\":\"\",\"noHanderAction\":\"\",\"examineEndDirectorLevel\":\"\",\"ccSelfSelectFlag\":\"\",\"conditionList\":[],\"nodeUserList\":[{\"type\":1,\"targetId\":\"11400\",\"name\":\"冯\"}],\"childNode\":{\"nodeName\":\"审核人\",\"error\":false,\"type\":1,\"settype\":1,\"selectMode\":0,\"selectRange\":0,\"directorLevel\":1,\"examineMode\":1,\"noHanderAction\":2,\"examineEndDirectorLevel\":0,\"childNode\":{\"nodeName\":\"审核人\",\"type\":1,\"priorityLevel\":1,\"settype\":1,\"selectMode\":0,\"selectRange\":0,\"directorLevel\":1,\"examineMode\":1,\"noHanderAction\":2,\"examineEndDirectorLevel\":1,\"ccSelfSelectFlag\":1,\"conditionList\":[],\"nodeUserList\":[{\"type\":1,\"targetId\":\"11416\",\"name\":\"超管bak\"}],\"conditionNodes\":[],\"error\":false},\"nodeUserList\":[{\"type\":1,\"targetId\":\"11385\",\"name\":\"超管\"}]},\"conditionNodes\":[]},\"procName\":\"合同删除流程\",\"procType\":\"合同删除\",\"remark\":\"流程介绍\",\"status\":\"1\"}', 11386, '2025-01-20 16:25:09');
INSERT INTO `bpm_proc_version` VALUES (70, 1877540583543803904, '{\"createUserId\":11386,\"id\":\"1877540583543803904\",\"nodeConfig\":{\"nodeName\":\"发起人\",\"type\":0,\"priorityLevel\":\"\",\"settype\":\"1\",\"selectMode\":\"\",\"selectRange\":\"\",\"directorLevel\":\"\",\"examineMode\":\"\",\"noHanderAction\":\"\",\"examineEndDirectorLevel\":\"\",\"ccSelfSelectFlag\":\"\",\"conditionList\":[],\"nodeUserList\":[{\"type\":1,\"targetId\":\"11400\",\"name\":\"冯\"}],\"childNode\":{\"nodeName\":\"审核人\",\"error\":false,\"type\":1,\"settype\":1,\"selectMode\":0,\"selectRange\":0,\"directorLevel\":1,\"examineMode\":1,\"noHanderAction\":2,\"examineEndDirectorLevel\":0,\"childNode\":{\"nodeName\":\"审核人\",\"type\":1,\"priorityLevel\":1,\"settype\":1,\"selectMode\":0,\"selectRange\":0,\"directorLevel\":1,\"examineMode\":1,\"noHanderAction\":2,\"examineEndDirectorLevel\":1,\"ccSelfSelectFlag\":1,\"conditionList\":[],\"nodeUserList\":[{\"type\":1,\"targetId\":\"11416\",\"name\":\"超管bak\"}],\"conditionNodes\":[],\"error\":false},\"nodeUserList\":[{\"type\":1,\"targetId\":\"11385\",\"name\":\"超管\"}]},\"conditionNodes\":[]},\"procName\":\"合同删除流程\",\"procType\":\"合同删除\",\"remark\":\"流程介绍\",\"status\":\"1\"}', 11386, '2025-01-20 16:25:30');
INSERT INTO `bpm_proc_version` VALUES (71, 1877540583543803904, '{\"createUserId\":11386,\"id\":\"1877540583543803904\",\"nodeConfig\":{\"nodeName\":\"发起人\",\"type\":0,\"priorityLevel\":\"\",\"settype\":\"1\",\"selectMode\":\"\",\"selectRange\":\"\",\"directorLevel\":\"\",\"examineMode\":\"\",\"noHanderAction\":\"\",\"examineEndDirectorLevel\":\"\",\"ccSelfSelectFlag\":\"\",\"conditionList\":[],\"nodeUserList\":[{\"type\":1,\"targetId\":\"11400\",\"name\":\"冯\"}],\"childNode\":{\"nodeName\":\"审核人\",\"error\":false,\"type\":1,\"settype\":1,\"selectMode\":0,\"selectRange\":0,\"directorLevel\":1,\"examineMode\":1,\"noHanderAction\":2,\"examineEndDirectorLevel\":0,\"childNode\":{\"nodeName\":\"审核人\",\"type\":1,\"priorityLevel\":1,\"settype\":1,\"selectMode\":0,\"selectRange\":0,\"directorLevel\":1,\"examineMode\":1,\"noHanderAction\":2,\"examineEndDirectorLevel\":1,\"ccSelfSelectFlag\":1,\"conditionList\":[],\"nodeUserList\":[{\"type\":1,\"targetId\":\"11416\",\"name\":\"超管bak\"}],\"conditionNodes\":[],\"error\":false},\"nodeUserList\":[{\"type\":1,\"targetId\":\"11385\",\"name\":\"超管\"}]},\"conditionNodes\":[]},\"procName\":\"合同删除流程\",\"procType\":\"合同删除\",\"remark\":\"流程介绍\",\"status\":\"1\"}', 11386, '2025-01-20 16:26:05');
INSERT INTO `bpm_proc_version` VALUES (72, 1877540583543803904, '{\"createUserId\":11386,\"id\":\"1877540583543803904\",\"nodeConfig\":{\"nodeName\":\"发起人\",\"type\":0,\"priorityLevel\":\"\",\"settype\":\"1\",\"selectMode\":\"\",\"selectRange\":\"\",\"directorLevel\":\"\",\"examineMode\":\"\",\"noHanderAction\":\"\",\"examineEndDirectorLevel\":\"\",\"ccSelfSelectFlag\":\"\",\"conditionList\":[],\"nodeUserList\":[{\"type\":1,\"targetId\":\"11400\",\"name\":\"冯\"}],\"childNode\":{\"nodeName\":\"审核人\",\"error\":false,\"type\":1,\"settype\":1,\"selectMode\":0,\"selectRange\":0,\"directorLevel\":1,\"examineMode\":1,\"noHanderAction\":2,\"examineEndDirectorLevel\":0,\"childNode\":{\"nodeName\":\"审核人\",\"type\":1,\"priorityLevel\":1,\"settype\":1,\"selectMode\":0,\"selectRange\":0,\"directorLevel\":1,\"examineMode\":1,\"noHanderAction\":2,\"examineEndDirectorLevel\":1,\"ccSelfSelectFlag\":1,\"conditionList\":[],\"nodeUserList\":[{\"type\":1,\"targetId\":\"11416\",\"name\":\"超管bak\"}],\"conditionNodes\":[],\"error\":false},\"nodeUserList\":[{\"type\":1,\"targetId\":\"11385\",\"name\":\"超管\"}]},\"conditionNodes\":[]},\"procName\":\"合同删除流程\",\"procType\":\"合同删除\",\"remark\":\"流程介绍\",\"status\":\"1\"}', 11386, '2025-01-20 16:26:21');
INSERT INTO `bpm_proc_version` VALUES (73, 1881165056029364224, '{\"createUserId\":11386,\"id\":\"1881165056029364224\",\"nodeConfig\":{\"nodeName\":\"发起人\",\"type\":0,\"priorityLevel\":\"\",\"settype\":\"\",\"selectMode\":\"\",\"selectRange\":\"\",\"directorLevel\":\"\",\"examineMode\":\"\",\"noHanderAction\":\"\",\"examineEndDirectorLevel\":\"\",\"ccSelfSelectFlag\":\"\",\"conditionList\":[],\"nodeUserList\":[{\"type\":1,\"targetId\":11400,\"name\":\"冯\"},{\"type\":1,\"targetId\":11404,\"name\":\"李四\"},{\"type\":1,\"targetId\":11412,\"name\":\"用户二\"},{\"type\":1,\"targetId\":11415,\"name\":\"ssssss\"}],\"childNode\":{\"nodeName\":\"审核人\",\"error\":false,\"type\":1,\"settype\":2,\"selectMode\":0,\"selectRange\":0,\"directorLevel\":1,\"examineMode\":1,\"noHanderAction\":2,\"examineEndDirectorLevel\":0,\"childNode\":{\"nodeName\":\"路由\",\"type\":4,\"priorityLevel\":1,\"settype\":1,\"selectMode\":0,\"selectRange\":0,\"directorLevel\":1,\"examineMode\":1,\"noHanderAction\":2,\"examineEndDirectorLevel\":1,\"ccSelfSelectFlag\":1,\"conditionList\":[],\"nodeUserList\":[],\"childNode\":{},\"conditionNodes\":[{\"nodeName\":\"条件1\",\"type\":3,\"priorityLevel\":1,\"settype\":1,\"selectMode\":0,\"selectRange\":0,\"directorLevel\":1,\"examineMode\":1,\"noHanderAction\":2,\"examineEndDirectorLevel\":1,\"ccSelfSelectFlag\":1,\"conditionList\":[{\"showType\":\"input\",\"columnId\":1,\"type\":2,\"showName\":\"删除数量\",\"optType\":\"1\",\"zdy1\":\"2\",\"opt1\":\"<\",\"zdy2\":\"\",\"opt2\":\"<\",\"columnDbname\":\"delNum\",\"columnType\":\"Double\"}],\"childNode\":{\"nodeName\":\"审核人\",\"type\":1,\"priorityLevel\":1,\"settype\":1,\"selectMode\":0,\"selectRange\":0,\"directorLevel\":1,\"examineMode\":1,\"noHanderAction\":2,\"examineEndDirectorLevel\":1,\"ccSelfSelectFlag\":1,\"conditionList\":[],\"nodeUserList\":[{\"type\":1,\"targetId\":11385,\"name\":\"超管\"}],\"conditionNodes\":[],\"error\":false},\"conditionNodes\":[],\"error\":false},{\"nodeName\":\"条件2\",\"type\":3,\"priorityLevel\":2,\"settype\":1,\"selectMode\":0,\"selectRange\":0,\"directorLevel\":1,\"examineMode\":1,\"noHanderAction\":2,\"examineEndDirectorLevel\":1,\"ccSelfSelectFlag\":1,\"conditionList\":[{\"showType\":\"input\",\"columnId\":1,\"type\":2,\"showName\":\"删除数量\",\"optType\":\"5\",\"zdy1\":\"2\",\"opt1\":\"<\",\"zdy2\":2,\"opt2\":\"<\",\"columnDbname\":\"delNum\",\"columnType\":\"Double\"}],\"nodeUserList\":[],\"childNode\":{\"nodeName\":\"审核人\",\"type\":1,\"priorityLevel\":1,\"settype\":1,\"selectMode\":0,\"selectRange\":0,\"directorLevel\":1,\"examineMode\":1,\"noHanderAction\":2,\"examineEndDirectorLevel\":1,\"ccSelfSelectFlag\":1,\"conditionList\":[],\"nodeUserList\":[{\"type\":1,\"targetId\":11416,\"name\":\"超管bak\"}],\"conditionNodes\":[],\"error\":false},\"conditionNodes\":[],\"error\":false}]},\"nodeUserList\":[]},\"conditionNodes\":[]},\"procName\":\"test\",\"procType\":\"客户删除\",\"remark\":\"sss\",\"status\":\"1\"}', 11386, '2025-01-20 16:26:33');
INSERT INTO `bpm_proc_version` VALUES (74, 1881165056029364224, '{\"createUserId\":11386,\"id\":\"1881165056029364224\",\"nodeConfig\":{\"nodeName\":\"发起人\",\"type\":0,\"priorityLevel\":\"\",\"settype\":\"\",\"selectMode\":\"\",\"selectRange\":\"\",\"directorLevel\":\"\",\"examineMode\":\"\",\"noHanderAction\":\"\",\"examineEndDirectorLevel\":\"\",\"ccSelfSelectFlag\":\"\",\"conditionList\":[],\"nodeUserList\":[{\"type\":1,\"targetId\":11400,\"name\":\"冯\"},{\"type\":1,\"targetId\":11404,\"name\":\"李四\"},{\"type\":1,\"targetId\":11412,\"name\":\"用户二\"},{\"type\":1,\"targetId\":11415,\"name\":\"ssssss\"}],\"childNode\":{\"nodeName\":\"审核人\",\"error\":false,\"type\":1,\"settype\":2,\"selectMode\":0,\"selectRange\":0,\"directorLevel\":1,\"examineMode\":1,\"noHanderAction\":2,\"examineEndDirectorLevel\":0,\"childNode\":{\"nodeName\":\"路由\",\"type\":4,\"priorityLevel\":1,\"settype\":1,\"selectMode\":0,\"selectRange\":0,\"directorLevel\":1,\"examineMode\":1,\"noHanderAction\":2,\"examineEndDirectorLevel\":1,\"ccSelfSelectFlag\":1,\"conditionList\":[],\"nodeUserList\":[],\"childNode\":{},\"conditionNodes\":[{\"nodeName\":\"条件1\",\"type\":3,\"priorityLevel\":1,\"settype\":1,\"selectMode\":0,\"selectRange\":0,\"directorLevel\":1,\"examineMode\":1,\"noHanderAction\":2,\"examineEndDirectorLevel\":1,\"ccSelfSelectFlag\":1,\"conditionList\":[{\"showType\":\"input\",\"columnId\":1,\"type\":2,\"showName\":\"删除数量\",\"optType\":\"1\",\"zdy1\":\"2\",\"opt1\":\"<\",\"zdy2\":\"\",\"opt2\":\"<\",\"columnDbname\":\"delNum\",\"columnType\":\"Double\"}],\"childNode\":{\"nodeName\":\"审核人\",\"type\":1,\"priorityLevel\":1,\"settype\":1,\"selectMode\":0,\"selectRange\":0,\"directorLevel\":1,\"examineMode\":1,\"noHanderAction\":2,\"examineEndDirectorLevel\":1,\"ccSelfSelectFlag\":1,\"conditionList\":[],\"nodeUserList\":[{\"type\":1,\"targetId\":11386,\"name\":\"fhc\"}],\"conditionNodes\":[],\"error\":false},\"conditionNodes\":[],\"error\":false},{\"nodeName\":\"条件2\",\"type\":3,\"priorityLevel\":2,\"settype\":1,\"selectMode\":0,\"selectRange\":0,\"directorLevel\":1,\"examineMode\":1,\"noHanderAction\":2,\"examineEndDirectorLevel\":1,\"ccSelfSelectFlag\":1,\"conditionList\":[{\"showType\":\"input\",\"columnId\":1,\"type\":2,\"showName\":\"删除数量\",\"optType\":\"5\",\"zdy1\":\"2\",\"opt1\":\"<\",\"zdy2\":2,\"opt2\":\"<\",\"columnDbname\":\"delNum\",\"columnType\":\"Double\"}],\"nodeUserList\":[],\"childNode\":{\"nodeName\":\"审核人\",\"type\":1,\"priorityLevel\":1,\"settype\":1,\"selectMode\":0,\"selectRange\":0,\"directorLevel\":1,\"examineMode\":1,\"noHanderAction\":2,\"examineEndDirectorLevel\":1,\"ccSelfSelectFlag\":1,\"conditionList\":[],\"nodeUserList\":[{\"type\":1,\"targetId\":11416,\"name\":\"超管bak\"}],\"conditionNodes\":[],\"error\":false},\"conditionNodes\":[],\"error\":false}]},\"nodeUserList\":[]},\"conditionNodes\":[]},\"procName\":\"test\",\"procType\":\"客户删除\",\"remark\":\"sss\",\"status\":\"1\"}', 11386, '2025-01-20 16:26:55');
INSERT INTO `bpm_proc_version` VALUES (75, 1877540583543803904, '{\"createUserId\":11386,\"id\":\"1877540583543803904\",\"nodeConfig\":{\"nodeName\":\"发起人\",\"type\":0,\"priorityLevel\":\"\",\"settype\":\"1\",\"selectMode\":\"\",\"selectRange\":\"\",\"directorLevel\":\"\",\"examineMode\":\"\",\"noHanderAction\":\"\",\"examineEndDirectorLevel\":\"\",\"ccSelfSelectFlag\":\"\",\"conditionList\":[],\"nodeUserList\":[{\"type\":1,\"targetId\":\"11400\",\"name\":\"冯\"}],\"childNode\":{\"nodeName\":\"审核人\",\"error\":false,\"type\":1,\"settype\":1,\"selectMode\":0,\"selectRange\":0,\"directorLevel\":1,\"examineMode\":1,\"noHanderAction\":2,\"examineEndDirectorLevel\":0,\"childNode\":{\"nodeName\":\"审核人\",\"type\":1,\"priorityLevel\":1,\"settype\":1,\"selectMode\":0,\"selectRange\":0,\"directorLevel\":1,\"examineMode\":1,\"noHanderAction\":2,\"examineEndDirectorLevel\":1,\"ccSelfSelectFlag\":1,\"conditionList\":[],\"nodeUserList\":[{\"type\":1,\"targetId\":\"11416\",\"name\":\"超管bak\"}],\"conditionNodes\":[],\"error\":false},\"nodeUserList\":[{\"type\":1,\"targetId\":\"11385\",\"name\":\"超管\"}]},\"conditionNodes\":[]},\"procName\":\"合同删除流程\",\"procType\":\"合同删除\",\"remark\":\"流程介绍\",\"status\":\"0\"}', 11386, '2025-01-20 17:11:41');
INSERT INTO `bpm_proc_version` VALUES (76, 1877540583543803904, '{\"createUserId\":11386,\"id\":\"1877540583543803904\",\"nodeConfig\":{\"nodeName\":\"发起人\",\"type\":0,\"priorityLevel\":\"\",\"settype\":\"1\",\"selectMode\":\"\",\"selectRange\":\"\",\"directorLevel\":\"\",\"examineMode\":\"\",\"noHanderAction\":\"\",\"examineEndDirectorLevel\":\"\",\"ccSelfSelectFlag\":\"\",\"conditionList\":[],\"nodeUserList\":[{\"type\":1,\"targetId\":\"11400\",\"name\":\"冯\"}],\"childNode\":{\"nodeName\":\"审核人\",\"error\":false,\"type\":1,\"settype\":1,\"selectMode\":0,\"selectRange\":0,\"directorLevel\":1,\"examineMode\":1,\"noHanderAction\":2,\"examineEndDirectorLevel\":0,\"childNode\":{\"nodeName\":\"审核人\",\"type\":1,\"priorityLevel\":1,\"settype\":1,\"selectMode\":0,\"selectRange\":0,\"directorLevel\":1,\"examineMode\":1,\"noHanderAction\":2,\"examineEndDirectorLevel\":1,\"ccSelfSelectFlag\":1,\"conditionList\":[],\"nodeUserList\":[{\"type\":1,\"targetId\":\"11416\",\"name\":\"超管bak\"}],\"conditionNodes\":[],\"error\":false},\"nodeUserList\":[{\"type\":1,\"targetId\":\"11385\",\"name\":\"超管\"}]},\"conditionNodes\":[]},\"procName\":\"合同删除流程\",\"procType\":\"合同删除\",\"remark\":\"流程介绍\",\"status\":\"0\"}', 11386, '2025-01-20 17:12:18');
INSERT INTO `bpm_proc_version` VALUES (77, 1877540583543803904, '{\"createUserId\":11386,\"id\":\"1877540583543803904\",\"nodeConfig\":{\"nodeName\":\"发起人\",\"type\":0,\"priorityLevel\":\"\",\"settype\":\"1\",\"selectMode\":\"\",\"selectRange\":\"\",\"directorLevel\":\"\",\"examineMode\":\"\",\"noHanderAction\":\"\",\"examineEndDirectorLevel\":\"\",\"ccSelfSelectFlag\":\"\",\"conditionList\":[],\"nodeUserList\":[{\"type\":1,\"targetId\":\"11400\",\"name\":\"冯\"}],\"childNode\":{\"nodeName\":\"审核人\",\"error\":false,\"type\":1,\"settype\":1,\"selectMode\":0,\"selectRange\":0,\"directorLevel\":1,\"examineMode\":1,\"noHanderAction\":2,\"examineEndDirectorLevel\":0,\"childNode\":{\"nodeName\":\"审核人\",\"type\":1,\"priorityLevel\":1,\"settype\":1,\"selectMode\":0,\"selectRange\":0,\"directorLevel\":1,\"examineMode\":1,\"noHanderAction\":2,\"examineEndDirectorLevel\":1,\"ccSelfSelectFlag\":1,\"conditionList\":[],\"nodeUserList\":[{\"type\":1,\"targetId\":\"11416\",\"name\":\"超管bak\"}],\"conditionNodes\":[],\"error\":false},\"nodeUserList\":[{\"type\":1,\"targetId\":\"11385\",\"name\":\"超管\"}]},\"conditionNodes\":[]},\"procName\":\"合同删除流程12312312\",\"procType\":\"合同删除\",\"remark\":\"流程介绍\",\"status\":\"1\"}', 11386, '2025-01-20 17:12:41');
INSERT INTO `bpm_proc_version` VALUES (78, 1877540583543803904, '{\"createUserId\":11386,\"id\":\"1877540583543803904\",\"nodeConfig\":{\"nodeName\":\"发起人\",\"type\":0,\"priorityLevel\":\"\",\"settype\":\"1\",\"selectMode\":\"\",\"selectRange\":\"\",\"directorLevel\":\"\",\"examineMode\":\"\",\"noHanderAction\":\"\",\"examineEndDirectorLevel\":\"\",\"ccSelfSelectFlag\":\"\",\"conditionList\":[],\"nodeUserList\":[{\"type\":1,\"targetId\":\"11400\",\"name\":\"冯\"}],\"childNode\":{\"nodeName\":\"审核人\",\"error\":false,\"type\":1,\"settype\":1,\"selectMode\":0,\"selectRange\":0,\"directorLevel\":1,\"examineMode\":1,\"noHanderAction\":2,\"examineEndDirectorLevel\":0,\"childNode\":{\"nodeName\":\"审核人\",\"type\":1,\"priorityLevel\":1,\"settype\":1,\"selectMode\":0,\"selectRange\":0,\"directorLevel\":1,\"examineMode\":1,\"noHanderAction\":2,\"examineEndDirectorLevel\":1,\"ccSelfSelectFlag\":1,\"conditionList\":[],\"nodeUserList\":[{\"type\":1,\"targetId\":\"11416\",\"name\":\"超管bak\"}],\"conditionNodes\":[],\"error\":false},\"nodeUserList\":[{\"type\":1,\"targetId\":\"11385\",\"name\":\"超管\"}]},\"conditionNodes\":[]},\"procName\":\"合同删除流程12312312\",\"procType\":\"合同删除\",\"remark\":\"流程介绍\",\"status\":\"0\"}', 11386, '2025-01-20 17:13:03');
INSERT INTO `bpm_proc_version` VALUES (79, 1877540583543803904, '{\"createUserId\":11386,\"id\":\"1877540583543803904\",\"nodeConfig\":{\"nodeName\":\"发起人\",\"type\":0,\"priorityLevel\":\"\",\"settype\":\"1\",\"selectMode\":\"\",\"selectRange\":\"\",\"directorLevel\":\"\",\"examineMode\":\"\",\"noHanderAction\":\"\",\"examineEndDirectorLevel\":\"\",\"ccSelfSelectFlag\":\"\",\"conditionList\":[],\"nodeUserList\":[{\"type\":1,\"targetId\":\"11400\",\"name\":\"冯\"}],\"childNode\":{\"nodeName\":\"审核人\",\"error\":false,\"type\":1,\"settype\":1,\"selectMode\":0,\"selectRange\":0,\"directorLevel\":1,\"examineMode\":1,\"noHanderAction\":2,\"examineEndDirectorLevel\":0,\"childNode\":{\"nodeName\":\"审核人\",\"type\":1,\"priorityLevel\":1,\"settype\":1,\"selectMode\":0,\"selectRange\":0,\"directorLevel\":1,\"examineMode\":1,\"noHanderAction\":2,\"examineEndDirectorLevel\":1,\"ccSelfSelectFlag\":1,\"conditionList\":[],\"nodeUserList\":[{\"type\":1,\"targetId\":\"11416\",\"name\":\"超管bak\"}],\"conditionNodes\":[],\"error\":false},\"nodeUserList\":[{\"type\":1,\"targetId\":\"11385\",\"name\":\"超管\"}]},\"conditionNodes\":[]},\"procName\":\"合同删除流程12312312\",\"procType\":\"合同删除\",\"remark\":\"流程介绍\",\"status\":\"0\"}', 11386, '2025-01-20 17:16:00');
INSERT INTO `bpm_proc_version` VALUES (80, 1881165056029364224, '{\"createUserId\":11386,\"id\":\"1881165056029364224\",\"nodeConfig\":{\"nodeName\":\"发起人\",\"type\":0,\"priorityLevel\":\"\",\"settype\":\"\",\"selectMode\":\"\",\"selectRange\":\"\",\"directorLevel\":\"\",\"examineMode\":\"\",\"noHanderAction\":\"\",\"examineEndDirectorLevel\":\"\",\"ccSelfSelectFlag\":\"\",\"conditionList\":[],\"nodeUserList\":[{\"type\":1,\"targetId\":11400,\"name\":\"冯\"},{\"type\":1,\"targetId\":11404,\"name\":\"李四\"},{\"type\":1,\"targetId\":11412,\"name\":\"用户二\"},{\"type\":1,\"targetId\":11415,\"name\":\"ssssss\"}],\"childNode\":{\"nodeName\":\"路由\",\"type\":4,\"priorityLevel\":1,\"settype\":1,\"selectMode\":0,\"selectRange\":0,\"directorLevel\":1,\"examineMode\":1,\"noHanderAction\":2,\"examineEndDirectorLevel\":1,\"ccSelfSelectFlag\":1,\"conditionList\":[],\"nodeUserList\":[],\"childNode\":{},\"conditionNodes\":[{\"nodeName\":\"条件1\",\"type\":3,\"priorityLevel\":1,\"settype\":1,\"selectMode\":0,\"selectRange\":0,\"directorLevel\":1,\"examineMode\":1,\"noHanderAction\":2,\"examineEndDirectorLevel\":1,\"ccSelfSelectFlag\":1,\"conditionList\":[{\"showType\":\"input\",\"columnId\":1,\"type\":2,\"showName\":\"删除数量\",\"optType\":\"1\",\"zdy1\":\"2\",\"opt1\":\"<\",\"zdy2\":\"\",\"opt2\":\"<\",\"columnDbname\":\"delNum\",\"columnType\":\"Double\"}],\"childNode\":{\"nodeName\":\"审核人\",\"type\":1,\"priorityLevel\":1,\"settype\":1,\"selectMode\":0,\"selectRange\":0,\"directorLevel\":1,\"examineMode\":1,\"noHanderAction\":2,\"examineEndDirectorLevel\":1,\"ccSelfSelectFlag\":1,\"conditionList\":[],\"nodeUserList\":[{\"type\":1,\"targetId\":11386,\"name\":\"fhc\"}],\"conditionNodes\":[],\"error\":false},\"conditionNodes\":[],\"error\":false},{\"nodeName\":\"条件2\",\"type\":3,\"priorityLevel\":2,\"settype\":1,\"selectMode\":0,\"selectRange\":0,\"directorLevel\":1,\"examineMode\":1,\"noHanderAction\":2,\"examineEndDirectorLevel\":1,\"ccSelfSelectFlag\":1,\"conditionList\":[{\"showType\":\"input\",\"columnId\":1,\"type\":2,\"showName\":\"删除数量\",\"optType\":\"5\",\"zdy1\":\"2\",\"opt1\":\"<\",\"zdy2\":2,\"opt2\":\"<\",\"columnDbname\":\"delNum\",\"columnType\":\"Double\"}],\"nodeUserList\":[],\"childNode\":{\"nodeName\":\"审核人\",\"type\":1,\"priorityLevel\":1,\"settype\":1,\"selectMode\":0,\"selectRange\":0,\"directorLevel\":1,\"examineMode\":1,\"noHanderAction\":2,\"examineEndDirectorLevel\":1,\"ccSelfSelectFlag\":1,\"conditionList\":[],\"nodeUserList\":[{\"type\":1,\"targetId\":11416,\"name\":\"超管bak\"}],\"conditionNodes\":[],\"error\":false},\"conditionNodes\":[],\"error\":false}]},\"conditionNodes\":[]},\"procName\":\"test\",\"procType\":\"客户删除\",\"remark\":\"sss\",\"status\":\"1\"}', 11386, '2025-01-20 17:20:14');
INSERT INTO `bpm_proc_version` VALUES (81, 1881508054797783040, '{\"createUserId\":11386,\"nodeConfig\":{\"nodeName\":\"发起人\",\"type\":0,\"priorityLevel\":\"\",\"settype\":\"\",\"selectMode\":\"\",\"selectRange\":\"\",\"directorLevel\":\"\",\"examineMode\":\"\",\"noHanderAction\":\"\",\"examineEndDirectorLevel\":\"\",\"ccSelfSelectFlag\":\"\",\"conditionList\":[],\"nodeUserList\":[{\"type\":1,\"targetId\":11385,\"name\":\"超管\"},{\"type\":1,\"targetId\":11386,\"name\":\"fhc\"},{\"type\":1,\"targetId\":11411,\"name\":\"测试新增\"},{\"type\":1,\"targetId\":11413,\"name\":\"ssss\"},{\"type\":1,\"targetId\":11414,\"name\":\"123\"},{\"type\":1,\"targetId\":11416,\"name\":\"超管bak\"},{\"type\":1,\"targetId\":11400,\"name\":\"冯\"},{\"type\":1,\"targetId\":11404,\"name\":\"李四\"},{\"type\":1,\"targetId\":11412,\"name\":\"用户二\"},{\"type\":1,\"targetId\":11415,\"name\":\"ssssss\"},{\"type\":1,\"targetId\":11407,\"name\":\"测试用户3\"},{\"type\":1,\"targetId\":11417,\"name\":\"sxp\"},{\"type\":1,\"targetId\":11418,\"name\":\"ssss1\"}],\"childNode\":{\"nodeName\":\"路由\",\"type\":4,\"priorityLevel\":1,\"settype\":1,\"selectMode\":0,\"selectRange\":0,\"directorLevel\":1,\"examineMode\":1,\"noHanderAction\":2,\"examineEndDirectorLevel\":1,\"ccSelfSelectFlag\":1,\"conditionList\":[],\"nodeUserList\":[],\"childNode\":{},\"conditionNodes\":[{\"nodeName\":\"条件1\",\"type\":3,\"priorityLevel\":1,\"settype\":1,\"selectMode\":0,\"selectRange\":0,\"directorLevel\":1,\"examineMode\":1,\"noHanderAction\":2,\"examineEndDirectorLevel\":1,\"ccSelfSelectFlag\":1,\"conditionList\":[{\"showType\":\"input\",\"columnId\":1,\"type\":2,\"showName\":\"删除数量\",\"optType\":\"1\",\"zdy1\":\"2\",\"opt1\":\"<\",\"zdy2\":\"\",\"opt2\":\"<\",\"columnDbname\":\"delNum\",\"columnType\":\"Double\"}],\"childNode\":{\"nodeName\":\"审核人\",\"type\":1,\"priorityLevel\":1,\"settype\":2,\"selectMode\":0,\"selectRange\":0,\"directorLevel\":1,\"examineMode\":1,\"noHanderAction\":2,\"examineEndDirectorLevel\":1,\"ccSelfSelectFlag\":1,\"conditionList\":[],\"nodeUserList\":[],\"conditionNodes\":[],\"error\":false},\"conditionNodes\":[],\"error\":false},{\"nodeName\":\"条件2\",\"type\":3,\"priorityLevel\":2,\"settype\":1,\"selectMode\":0,\"selectRange\":0,\"directorLevel\":1,\"examineMode\":1,\"noHanderAction\":2,\"examineEndDirectorLevel\":1,\"ccSelfSelectFlag\":1,\"conditionList\":[{\"showType\":\"input\",\"columnId\":1,\"type\":2,\"showName\":\"删除数量\",\"optType\":\"5\",\"zdy1\":\"3\",\"opt1\":\"<\",\"zdy2\":2,\"opt2\":\"<\",\"columnDbname\":\"delNum\",\"columnType\":\"Double\"}],\"nodeUserList\":[],\"childNode\":{\"nodeName\":\"审核人\",\"type\":1,\"priorityLevel\":1,\"settype\":1,\"selectMode\":0,\"selectRange\":0,\"directorLevel\":1,\"examineMode\":1,\"noHanderAction\":2,\"examineEndDirectorLevel\":1,\"ccSelfSelectFlag\":1,\"conditionList\":[],\"nodeUserList\":[{\"type\":1,\"targetId\":11386,\"name\":\"fhc\"}],\"conditionNodes\":[],\"error\":false},\"conditionNodes\":[],\"error\":false}]},\"conditionNodes\":[]},\"procName\":\"调试发起人列表样式\",\"procType\":\"线索删除\",\"remark\":\"测试\",\"status\":\"0\"}', 11386, '2025-01-21 09:04:12');
INSERT INTO `bpm_proc_version` VALUES (82, 1881508054797783040, '{\"createUserId\":11386,\"id\":\"1881508054797783040\",\"nodeConfig\":{\"nodeName\":\"发起人\",\"type\":0,\"priorityLevel\":\"\",\"settype\":\"\",\"selectMode\":\"\",\"selectRange\":\"\",\"directorLevel\":\"\",\"examineMode\":\"\",\"noHanderAction\":\"\",\"examineEndDirectorLevel\":\"\",\"ccSelfSelectFlag\":\"\",\"conditionList\":[],\"nodeUserList\":[{\"type\":1,\"targetId\":11385,\"name\":\"超管\"},{\"type\":1,\"targetId\":11386,\"name\":\"fhc\"},{\"type\":1,\"targetId\":11411,\"name\":\"测试新增\"},{\"type\":1,\"targetId\":11413,\"name\":\"ssss\"},{\"type\":1,\"targetId\":11414,\"name\":\"123\"},{\"type\":1,\"targetId\":11416,\"name\":\"超管bak\"},{\"type\":1,\"targetId\":11400,\"name\":\"冯\"},{\"type\":1,\"targetId\":11404,\"name\":\"李四\"},{\"type\":1,\"targetId\":11412,\"name\":\"用户二\"},{\"type\":1,\"targetId\":11415,\"name\":\"ssssss\"},{\"type\":1,\"targetId\":11407,\"name\":\"测试用户3\"},{\"type\":1,\"targetId\":11417,\"name\":\"sxp\"},{\"type\":1,\"targetId\":11418,\"name\":\"ssss1\"}],\"childNode\":{\"nodeName\":\"路由\",\"type\":4,\"priorityLevel\":1,\"settype\":1,\"selectMode\":0,\"selectRange\":0,\"directorLevel\":1,\"examineMode\":1,\"noHanderAction\":2,\"examineEndDirectorLevel\":1,\"ccSelfSelectFlag\":1,\"conditionList\":[],\"nodeUserList\":[],\"childNode\":{},\"conditionNodes\":[{\"nodeName\":\"条件1\",\"type\":3,\"priorityLevel\":1,\"settype\":1,\"selectMode\":0,\"selectRange\":0,\"directorLevel\":1,\"examineMode\":1,\"noHanderAction\":2,\"examineEndDirectorLevel\":1,\"ccSelfSelectFlag\":1,\"conditionList\":[{\"showType\":\"input\",\"columnId\":1,\"type\":2,\"showName\":\"删除数量\",\"optType\":\"1\",\"zdy1\":\"2\",\"opt1\":\"<\",\"zdy2\":\"\",\"opt2\":\"<\",\"columnDbname\":\"delNum\",\"columnType\":\"Double\"}],\"childNode\":{\"nodeName\":\"审核人\",\"type\":1,\"priorityLevel\":1,\"settype\":2,\"selectMode\":0,\"selectRange\":0,\"directorLevel\":1,\"examineMode\":1,\"noHanderAction\":2,\"examineEndDirectorLevel\":1,\"ccSelfSelectFlag\":1,\"conditionList\":[],\"nodeUserList\":[],\"conditionNodes\":[],\"error\":false},\"conditionNodes\":[],\"error\":false},{\"nodeName\":\"条件2\",\"type\":3,\"priorityLevel\":2,\"settype\":1,\"selectMode\":0,\"selectRange\":0,\"directorLevel\":1,\"examineMode\":1,\"noHanderAction\":2,\"examineEndDirectorLevel\":1,\"ccSelfSelectFlag\":1,\"conditionList\":[{\"showType\":\"input\",\"columnId\":1,\"type\":2,\"showName\":\"删除数量\",\"optType\":\"5\",\"zdy1\":\"3\",\"opt1\":\"<\",\"zdy2\":2,\"opt2\":\"<\",\"columnDbname\":\"delNum\",\"columnType\":\"Double\"}],\"nodeUserList\":[],\"childNode\":{\"nodeName\":\"审核人\",\"type\":1,\"priorityLevel\":1,\"settype\":1,\"selectMode\":0,\"selectRange\":0,\"directorLevel\":1,\"examineMode\":1,\"noHanderAction\":2,\"examineEndDirectorLevel\":1,\"ccSelfSelectFlag\":1,\"conditionList\":[],\"nodeUserList\":[{\"type\":1,\"targetId\":11386,\"name\":\"fhc\"}],\"conditionNodes\":[],\"error\":false},\"conditionNodes\":[],\"error\":false}]},\"conditionNodes\":[]},\"procName\":\"调试发起人列表样式\",\"procType\":\"线索删除\",\"remark\":\"测试\",\"status\":\"1\"}', 11386, '2025-01-21 09:11:46');
INSERT INTO `bpm_proc_version` VALUES (83, 1881508054797783040, '{\"createUserId\":11386,\"id\":\"1881508054797783040\",\"nodeConfig\":{\"nodeName\":\"发起人\",\"type\":0,\"priorityLevel\":\"\",\"settype\":\"\",\"selectMode\":\"\",\"selectRange\":\"\",\"directorLevel\":\"\",\"examineMode\":\"\",\"noHanderAction\":\"\",\"examineEndDirectorLevel\":\"\",\"ccSelfSelectFlag\":\"\",\"conditionList\":[],\"nodeUserList\":[{\"type\":1,\"targetId\":11385,\"name\":\"超管\"},{\"type\":1,\"targetId\":11386,\"name\":\"fhc\"},{\"type\":1,\"targetId\":11411,\"name\":\"测试新增\"},{\"type\":1,\"targetId\":11413,\"name\":\"ssss\"},{\"type\":1,\"targetId\":11414,\"name\":\"123\"},{\"type\":1,\"targetId\":11416,\"name\":\"超管bak\"}],\"childNode\":{\"nodeName\":\"路由\",\"type\":4,\"priorityLevel\":1,\"settype\":1,\"selectMode\":0,\"selectRange\":0,\"directorLevel\":1,\"examineMode\":1,\"noHanderAction\":2,\"examineEndDirectorLevel\":1,\"ccSelfSelectFlag\":1,\"conditionList\":[],\"nodeUserList\":[],\"childNode\":{},\"conditionNodes\":[{\"nodeName\":\"条件1\",\"type\":3,\"priorityLevel\":1,\"settype\":1,\"selectMode\":0,\"selectRange\":0,\"directorLevel\":1,\"examineMode\":1,\"noHanderAction\":2,\"examineEndDirectorLevel\":1,\"ccSelfSelectFlag\":1,\"conditionList\":[{\"showType\":\"input\",\"columnId\":1,\"type\":2,\"showName\":\"删除数量\",\"optType\":\"1\",\"zdy1\":\"2\",\"opt1\":\"<\",\"zdy2\":\"\",\"opt2\":\"<\",\"columnDbname\":\"delNum\",\"columnType\":\"Double\"}],\"childNode\":{\"nodeName\":\"审核人\",\"type\":1,\"priorityLevel\":1,\"settype\":2,\"selectMode\":0,\"selectRange\":0,\"directorLevel\":1,\"examineMode\":1,\"noHanderAction\":2,\"examineEndDirectorLevel\":1,\"ccSelfSelectFlag\":1,\"conditionList\":[],\"nodeUserList\":[],\"conditionNodes\":[],\"error\":false},\"conditionNodes\":[],\"error\":false},{\"nodeName\":\"条件2\",\"type\":3,\"priorityLevel\":2,\"settype\":1,\"selectMode\":0,\"selectRange\":0,\"directorLevel\":1,\"examineMode\":1,\"noHanderAction\":2,\"examineEndDirectorLevel\":1,\"ccSelfSelectFlag\":1,\"conditionList\":[{\"showType\":\"input\",\"columnId\":1,\"type\":2,\"showName\":\"删除数量\",\"optType\":\"5\",\"zdy1\":\"3\",\"opt1\":\"<\",\"zdy2\":2,\"opt2\":\"<\",\"columnDbname\":\"delNum\",\"columnType\":\"Double\"}],\"nodeUserList\":[],\"childNode\":{\"nodeName\":\"审核人\",\"type\":1,\"priorityLevel\":1,\"settype\":1,\"selectMode\":0,\"selectRange\":0,\"directorLevel\":1,\"examineMode\":1,\"noHanderAction\":2,\"examineEndDirectorLevel\":1,\"ccSelfSelectFlag\":1,\"conditionList\":[],\"nodeUserList\":[{\"type\":1,\"targetId\":11386,\"name\":\"fhc\"}],\"conditionNodes\":[],\"error\":false},\"conditionNodes\":[],\"error\":false}]},\"conditionNodes\":[]},\"procName\":\"调试发起人列表样式\",\"procType\":\"线索删除\",\"remark\":\"测试\",\"status\":\"1\"}', 11386, '2025-01-21 09:12:06');
INSERT INTO `bpm_proc_version` VALUES (84, 1881513325548933120, '{\"createUserId\":11386,\"nodeConfig\":{\"nodeName\":\"发起人\",\"type\":0,\"priorityLevel\":\"\",\"settype\":\"\",\"selectMode\":\"\",\"selectRange\":\"\",\"directorLevel\":\"\",\"examineMode\":\"\",\"noHanderAction\":\"\",\"examineEndDirectorLevel\":\"\",\"ccSelfSelectFlag\":\"\",\"conditionList\":[],\"nodeUserList\":[],\"childNode\":{\"nodeName\":\"审核人\",\"error\":false,\"type\":1,\"settype\":2,\"selectMode\":0,\"selectRange\":0,\"directorLevel\":1,\"examineMode\":1,\"noHanderAction\":2,\"examineEndDirectorLevel\":0,\"childNode\":{},\"nodeUserList\":[]},\"conditionNodes\":[]},\"procName\":\"ceshi\",\"procType\":\"客户删除\",\"remark\":\"test\",\"status\":\"0\"}', 11386, '2025-01-21 09:25:08');
INSERT INTO `bpm_proc_version` VALUES (85, 1881513325548933120, '{\"createUserId\":11386,\"id\":\"1881513325548933120\",\"nodeConfig\":{\"nodeName\":\"发起人\",\"type\":0,\"priorityLevel\":\"\",\"settype\":\"\",\"selectMode\":\"\",\"selectRange\":\"\",\"directorLevel\":\"\",\"examineMode\":\"\",\"noHanderAction\":\"\",\"examineEndDirectorLevel\":\"\",\"ccSelfSelectFlag\":\"\",\"conditionList\":[],\"nodeUserList\":[],\"childNode\":{\"nodeName\":\"审核人\",\"error\":false,\"type\":1,\"settype\":2,\"selectMode\":0,\"selectRange\":0,\"directorLevel\":1,\"examineMode\":1,\"noHanderAction\":2,\"examineEndDirectorLevel\":0,\"childNode\":{},\"nodeUserList\":[]},\"conditionNodes\":[]},\"procName\":\"ceshi\",\"procType\":\"客户删除\",\"remark\":\"test\",\"status\":\"1\"}', 11386, '2025-01-21 09:25:19');
INSERT INTO `bpm_proc_version` VALUES (86, 1881508054797783040, '{\"createUserId\":11386,\"id\":\"1881508054797783040\",\"nodeConfig\":{\"nodeName\":\"发起人\",\"type\":0,\"priorityLevel\":\"\",\"settype\":\"\",\"selectMode\":\"\",\"selectRange\":\"\",\"directorLevel\":\"\",\"examineMode\":\"\",\"noHanderAction\":\"\",\"examineEndDirectorLevel\":\"\",\"ccSelfSelectFlag\":\"\",\"conditionList\":[],\"nodeUserList\":[{\"type\":1,\"targetId\":11385,\"name\":\"超管\"},{\"type\":1,\"targetId\":11386,\"name\":\"fhc\"},{\"type\":1,\"targetId\":11411,\"name\":\"测试新增\"},{\"type\":1,\"targetId\":11413,\"name\":\"ssss\"},{\"type\":1,\"targetId\":11414,\"name\":\"123\"},{\"type\":1,\"targetId\":11416,\"name\":\"超管bak\"}],\"childNode\":{\"nodeName\":\"路由\",\"type\":4,\"priorityLevel\":1,\"settype\":1,\"selectMode\":0,\"selectRange\":0,\"directorLevel\":1,\"examineMode\":1,\"noHanderAction\":2,\"examineEndDirectorLevel\":1,\"ccSelfSelectFlag\":1,\"conditionList\":[],\"nodeUserList\":[],\"childNode\":{},\"conditionNodes\":[{\"nodeName\":\"条件1\",\"type\":3,\"priorityLevel\":1,\"settype\":1,\"selectMode\":0,\"selectRange\":0,\"directorLevel\":1,\"examineMode\":1,\"noHanderAction\":2,\"examineEndDirectorLevel\":1,\"ccSelfSelectFlag\":1,\"conditionList\":[{\"showType\":\"input\",\"columnId\":1,\"type\":2,\"showName\":\"删除数量\",\"optType\":\"1\",\"zdy1\":\"2\",\"opt1\":\"<\",\"zdy2\":\"\",\"opt2\":\"<\",\"columnDbname\":\"delNum\",\"columnType\":\"Double\"}],\"childNode\":{\"nodeName\":\"审核人\",\"type\":1,\"priorityLevel\":1,\"settype\":2,\"selectMode\":0,\"selectRange\":0,\"directorLevel\":1,\"examineMode\":1,\"noHanderAction\":2,\"examineEndDirectorLevel\":1,\"ccSelfSelectFlag\":1,\"conditionList\":[],\"nodeUserList\":[],\"conditionNodes\":[],\"error\":false},\"conditionNodes\":[],\"error\":false},{\"nodeName\":\"条件2\",\"type\":3,\"priorityLevel\":2,\"settype\":1,\"selectMode\":0,\"selectRange\":0,\"directorLevel\":1,\"examineMode\":1,\"noHanderAction\":2,\"examineEndDirectorLevel\":1,\"ccSelfSelectFlag\":1,\"conditionList\":[{\"showType\":\"input\",\"columnId\":1,\"type\":2,\"showName\":\"删除数量\",\"optType\":\"5\",\"zdy1\":\"3\",\"opt1\":\"<\",\"zdy2\":2,\"opt2\":\"<\",\"columnDbname\":\"delNum\",\"columnType\":\"Double\"}],\"nodeUserList\":[],\"childNode\":{\"nodeName\":\"审核人\",\"type\":1,\"priorityLevel\":1,\"settype\":1,\"selectMode\":0,\"selectRange\":0,\"directorLevel\":1,\"examineMode\":1,\"noHanderAction\":2,\"examineEndDirectorLevel\":1,\"ccSelfSelectFlag\":1,\"conditionList\":[],\"nodeUserList\":[{\"type\":1,\"targetId\":11386,\"name\":\"fhc\"}],\"conditionNodes\":[],\"error\":false},\"conditionNodes\":[],\"error\":false}]},\"conditionNodes\":[],\"setType\":\"1\"},\"procName\":\"调试发起人列表样式\",\"procType\":\"线索删除\",\"remark\":\"测试\",\"status\":\"1\"}', 11386, '2025-01-21 09:28:02');
INSERT INTO `bpm_proc_version` VALUES (87, 1881513325548933120, '{\"createUserId\":11386,\"id\":\"1881513325548933120\",\"nodeConfig\":{\"nodeName\":\"发起人\",\"type\":0,\"priorityLevel\":\"\",\"settype\":\"0\",\"selectMode\":\"\",\"selectRange\":\"\",\"directorLevel\":\"\",\"examineMode\":\"\",\"noHanderAction\":\"\",\"examineEndDirectorLevel\":\"\",\"ccSelfSelectFlag\":\"\",\"conditionList\":[],\"nodeUserList\":[],\"childNode\":{\"nodeName\":\"审核人\",\"error\":false,\"type\":1,\"settype\":2,\"selectMode\":0,\"selectRange\":0,\"directorLevel\":1,\"examineMode\":1,\"noHanderAction\":2,\"examineEndDirectorLevel\":0,\"childNode\":{},\"nodeUserList\":[]},\"conditionNodes\":[]},\"procName\":\"ceshi\",\"procType\":\"客户删除\",\"remark\":\"test\",\"status\":\"1\"}', 11386, '2025-01-21 09:28:55');
INSERT INTO `bpm_proc_version` VALUES (88, 1881508054797783040, '{\"createUserId\":11386,\"id\":\"1881508054797783040\",\"nodeConfig\":{\"nodeName\":\"发起人\",\"type\":0,\"priorityLevel\":\"\",\"settype\":\"1\",\"selectMode\":\"\",\"selectRange\":\"\",\"directorLevel\":\"\",\"examineMode\":\"\",\"noHanderAction\":\"\",\"examineEndDirectorLevel\":\"\",\"ccSelfSelectFlag\":\"\",\"conditionList\":[],\"nodeUserList\":[{\"type\":1,\"targetId\":11385,\"name\":\"超管\"},{\"type\":1,\"targetId\":11386,\"name\":\"fhc\"},{\"type\":1,\"targetId\":11411,\"name\":\"测试新增\"},{\"type\":1,\"targetId\":11413,\"name\":\"ssss\"},{\"type\":1,\"targetId\":11414,\"name\":\"123\"},{\"type\":1,\"targetId\":11416,\"name\":\"超管bak\"}],\"childNode\":{\"nodeName\":\"路由\",\"type\":4,\"priorityLevel\":1,\"settype\":1,\"selectMode\":0,\"selectRange\":0,\"directorLevel\":1,\"examineMode\":1,\"noHanderAction\":2,\"examineEndDirectorLevel\":1,\"ccSelfSelectFlag\":1,\"conditionList\":[],\"nodeUserList\":[],\"childNode\":{},\"conditionNodes\":[{\"nodeName\":\"条件1\",\"type\":3,\"priorityLevel\":1,\"settype\":1,\"selectMode\":0,\"selectRange\":0,\"directorLevel\":1,\"examineMode\":1,\"noHanderAction\":2,\"examineEndDirectorLevel\":1,\"ccSelfSelectFlag\":1,\"conditionList\":[{\"showType\":\"input\",\"columnId\":1,\"type\":2,\"showName\":\"删除数量\",\"optType\":\"1\",\"zdy1\":\"2\",\"opt1\":\"<\",\"zdy2\":\"\",\"opt2\":\"<\",\"columnDbname\":\"delNum\",\"columnType\":\"Double\"}],\"childNode\":{\"nodeName\":\"审核人\",\"type\":1,\"priorityLevel\":1,\"settype\":2,\"selectMode\":0,\"selectRange\":0,\"directorLevel\":1,\"examineMode\":1,\"noHanderAction\":2,\"examineEndDirectorLevel\":1,\"ccSelfSelectFlag\":1,\"conditionList\":[],\"nodeUserList\":[],\"conditionNodes\":[],\"error\":false},\"conditionNodes\":[],\"error\":false},{\"nodeName\":\"条件2\",\"type\":3,\"priorityLevel\":2,\"settype\":1,\"selectMode\":0,\"selectRange\":0,\"directorLevel\":1,\"examineMode\":1,\"noHanderAction\":2,\"examineEndDirectorLevel\":1,\"ccSelfSelectFlag\":1,\"conditionList\":[{\"showType\":\"input\",\"columnId\":1,\"type\":2,\"showName\":\"删除数量\",\"optType\":\"5\",\"zdy1\":\"3\",\"opt1\":\"<\",\"zdy2\":2,\"opt2\":\"<\",\"columnDbname\":\"delNum\",\"columnType\":\"Double\"}],\"nodeUserList\":[],\"childNode\":{\"nodeName\":\"审核人\",\"type\":1,\"priorityLevel\":1,\"settype\":1,\"selectMode\":0,\"selectRange\":0,\"directorLevel\":1,\"examineMode\":1,\"noHanderAction\":2,\"examineEndDirectorLevel\":1,\"ccSelfSelectFlag\":1,\"conditionList\":[],\"nodeUserList\":[{\"type\":1,\"targetId\":11386,\"name\":\"fhc\"}],\"conditionNodes\":[],\"error\":false},\"conditionNodes\":[],\"error\":false}]},\"conditionNodes\":[],\"setType\":\"1\"},\"procName\":\"调试发起人列表样式\",\"procType\":\"线索删除\",\"remark\":\"测试\",\"status\":\"1\"}', 11386, '2025-01-21 09:29:02');
INSERT INTO `bpm_proc_version` VALUES (89, 1881508054797783040, '{\"createUserId\":11386,\"id\":\"1881508054797783040\",\"nodeConfig\":{\"nodeName\":\"发起人\",\"type\":0,\"priorityLevel\":\"\",\"settype\":\"1\",\"selectMode\":\"\",\"selectRange\":\"\",\"directorLevel\":\"\",\"examineMode\":\"\",\"noHanderAction\":\"\",\"examineEndDirectorLevel\":\"\",\"ccSelfSelectFlag\":\"\",\"conditionList\":[],\"nodeUserList\":[{\"type\":1,\"targetId\":11385,\"name\":\"超管\"},{\"type\":1,\"targetId\":11386,\"name\":\"fhc\"},{\"type\":1,\"targetId\":11411,\"name\":\"测试新增\"},{\"type\":1,\"targetId\":11413,\"name\":\"ssss\"},{\"type\":1,\"targetId\":11414,\"name\":\"123\"},{\"type\":1,\"targetId\":11416,\"name\":\"超管bak\"}],\"childNode\":{\"nodeName\":\"路由\",\"type\":4,\"priorityLevel\":1,\"settype\":1,\"selectMode\":0,\"selectRange\":0,\"directorLevel\":1,\"examineMode\":1,\"noHanderAction\":2,\"examineEndDirectorLevel\":1,\"ccSelfSelectFlag\":1,\"conditionList\":[],\"nodeUserList\":[],\"childNode\":{},\"conditionNodes\":[{\"nodeName\":\"条件1\",\"type\":3,\"priorityLevel\":1,\"settype\":1,\"selectMode\":0,\"selectRange\":0,\"directorLevel\":1,\"examineMode\":1,\"noHanderAction\":2,\"examineEndDirectorLevel\":1,\"ccSelfSelectFlag\":1,\"conditionList\":[{\"showType\":\"input\",\"columnId\":1,\"type\":2,\"showName\":\"删除数量\",\"optType\":\"6\",\"zdy1\":1,\"opt1\":\"<\",\"zdy2\":2,\"opt2\":\"<\",\"columnDbname\":\"delNum\",\"columnType\":\"Double\"}],\"childNode\":{\"nodeName\":\"审核人\",\"type\":1,\"priorityLevel\":1,\"settype\":2,\"selectMode\":0,\"selectRange\":0,\"directorLevel\":1,\"examineMode\":1,\"noHanderAction\":2,\"examineEndDirectorLevel\":1,\"ccSelfSelectFlag\":1,\"conditionList\":[],\"nodeUserList\":[],\"conditionNodes\":[],\"error\":false},\"conditionNodes\":[],\"error\":false},{\"nodeName\":\"条件2\",\"type\":3,\"priorityLevel\":2,\"settype\":1,\"selectMode\":0,\"selectRange\":0,\"directorLevel\":1,\"examineMode\":1,\"noHanderAction\":2,\"examineEndDirectorLevel\":1,\"ccSelfSelectFlag\":1,\"conditionList\":[{\"showType\":\"input\",\"columnId\":1,\"type\":2,\"showName\":\"删除数量\",\"optType\":\"5\",\"zdy1\":\"3\",\"opt1\":\"<\",\"zdy2\":2,\"opt2\":\"<\",\"columnDbname\":\"delNum\",\"columnType\":\"Double\"}],\"nodeUserList\":[],\"childNode\":{\"nodeName\":\"审核人\",\"type\":1,\"priorityLevel\":1,\"settype\":1,\"selectMode\":0,\"selectRange\":0,\"directorLevel\":1,\"examineMode\":1,\"noHanderAction\":2,\"examineEndDirectorLevel\":1,\"ccSelfSelectFlag\":1,\"conditionList\":[],\"nodeUserList\":[{\"type\":1,\"targetId\":11386,\"name\":\"fhc\"}],\"conditionNodes\":[],\"error\":false},\"conditionNodes\":[],\"error\":false}]},\"conditionNodes\":[],\"setType\":\"1\"},\"procName\":\"调试发起人列表样式\",\"procType\":\"线索删除\",\"remark\":\"测试\",\"status\":\"1\"}', 11386, '2025-01-21 09:33:02');
INSERT INTO `bpm_proc_version` VALUES (90, 1881508054797783040, '{\"createUserId\":11386,\"id\":\"1881508054797783040\",\"nodeConfig\":{\"nodeName\":\"发起人\",\"type\":0,\"priorityLevel\":\"\",\"settype\":\"1\",\"selectMode\":\"\",\"selectRange\":\"\",\"directorLevel\":\"\",\"examineMode\":\"\",\"noHanderAction\":\"\",\"examineEndDirectorLevel\":\"\",\"ccSelfSelectFlag\":\"\",\"conditionList\":[],\"nodeUserList\":[{\"type\":1,\"targetId\":11385,\"name\":\"超管\"},{\"type\":1,\"targetId\":11386,\"name\":\"fhc\"},{\"type\":1,\"targetId\":11411,\"name\":\"测试新增\"},{\"type\":1,\"targetId\":11413,\"name\":\"ssss\"},{\"type\":1,\"targetId\":11414,\"name\":\"123\"},{\"type\":1,\"targetId\":11416,\"name\":\"超管bak\"}],\"childNode\":{\"nodeName\":\"路由\",\"type\":4,\"priorityLevel\":1,\"settype\":1,\"selectMode\":0,\"selectRange\":0,\"directorLevel\":1,\"examineMode\":1,\"noHanderAction\":2,\"examineEndDirectorLevel\":1,\"ccSelfSelectFlag\":1,\"conditionList\":[],\"nodeUserList\":[],\"childNode\":{},\"conditionNodes\":[{\"nodeName\":\"条件1\",\"type\":3,\"priorityLevel\":1,\"settype\":1,\"selectMode\":0,\"selectRange\":0,\"directorLevel\":1,\"examineMode\":1,\"noHanderAction\":2,\"examineEndDirectorLevel\":1,\"ccSelfSelectFlag\":1,\"conditionList\":[{\"showType\":\"input\",\"columnId\":1,\"type\":2,\"showName\":\"删除数量\",\"optType\":\"6\",\"zdy1\":1,\"opt1\":\"≤\",\"zdy2\":2,\"opt2\":\"<\",\"columnDbname\":\"delNum\",\"columnType\":\"Double\"}],\"childNode\":{\"nodeName\":\"审核人\",\"type\":1,\"priorityLevel\":1,\"settype\":2,\"selectMode\":0,\"selectRange\":0,\"directorLevel\":1,\"examineMode\":1,\"noHanderAction\":2,\"examineEndDirectorLevel\":1,\"ccSelfSelectFlag\":1,\"conditionList\":[],\"nodeUserList\":[],\"conditionNodes\":[],\"error\":false},\"conditionNodes\":[],\"error\":false},{\"nodeName\":\"条件2\",\"type\":3,\"priorityLevel\":2,\"settype\":1,\"selectMode\":0,\"selectRange\":0,\"directorLevel\":1,\"examineMode\":1,\"noHanderAction\":2,\"examineEndDirectorLevel\":1,\"ccSelfSelectFlag\":1,\"conditionList\":[{\"showType\":\"input\",\"columnId\":1,\"type\":2,\"showName\":\"删除数量\",\"optType\":\"5\",\"zdy1\":\"3\",\"opt1\":\"<\",\"zdy2\":2,\"opt2\":\"<\",\"columnDbname\":\"delNum\",\"columnType\":\"Double\"}],\"nodeUserList\":[],\"childNode\":{\"nodeName\":\"审核人\",\"type\":1,\"priorityLevel\":1,\"settype\":1,\"selectMode\":0,\"selectRange\":0,\"directorLevel\":1,\"examineMode\":1,\"noHanderAction\":2,\"examineEndDirectorLevel\":1,\"ccSelfSelectFlag\":1,\"conditionList\":[],\"nodeUserList\":[{\"type\":1,\"targetId\":11386,\"name\":\"fhc\"}],\"conditionNodes\":[],\"error\":false},\"conditionNodes\":[],\"error\":false}]},\"conditionNodes\":[],\"setType\":\"1\"},\"procName\":\"调试发起人列表样式\",\"procType\":\"线索删除\",\"remark\":\"测试\",\"status\":\"1\"}', 11386, '2025-01-21 09:38:44');
INSERT INTO `bpm_proc_version` VALUES (91, 1881508054797783040, '{\"createUserId\":11386,\"id\":\"1881508054797783040\",\"nodeConfig\":{\"nodeName\":\"发起人\",\"type\":0,\"priorityLevel\":\"\",\"settype\":\"1\",\"selectMode\":\"\",\"selectRange\":\"\",\"directorLevel\":\"\",\"examineMode\":\"\",\"noHanderAction\":\"\",\"examineEndDirectorLevel\":\"\",\"ccSelfSelectFlag\":\"\",\"conditionList\":[],\"nodeUserList\":[{\"type\":1,\"targetId\":11385,\"name\":\"超管\"},{\"type\":1,\"targetId\":11386,\"name\":\"fhc\"},{\"type\":1,\"targetId\":11411,\"name\":\"测试新增\"},{\"type\":1,\"targetId\":11413,\"name\":\"ssss\"},{\"type\":1,\"targetId\":11414,\"name\":\"123\"},{\"type\":1,\"targetId\":11416,\"name\":\"超管bak\"}],\"childNode\":{\"nodeName\":\"路由\",\"type\":4,\"priorityLevel\":1,\"settype\":1,\"selectMode\":0,\"selectRange\":0,\"directorLevel\":1,\"examineMode\":1,\"noHanderAction\":2,\"examineEndDirectorLevel\":1,\"ccSelfSelectFlag\":1,\"conditionList\":[],\"nodeUserList\":[],\"childNode\":{},\"conditionNodes\":[{\"nodeName\":\"条件1\",\"type\":3,\"priorityLevel\":1,\"settype\":1,\"selectMode\":0,\"selectRange\":0,\"directorLevel\":1,\"examineMode\":1,\"noHanderAction\":2,\"examineEndDirectorLevel\":1,\"ccSelfSelectFlag\":1,\"conditionList\":[{\"showType\":\"input\",\"columnId\":1,\"type\":2,\"showName\":\"删除数量\",\"optType\":\"6\",\"zdy1\":1,\"opt1\":\"≤\",\"zdy2\":2,\"opt2\":\"<\",\"columnDbname\":\"delNum\",\"columnType\":\"Double\"}],\"childNode\":{\"nodeName\":\"审核人\",\"type\":1,\"priorityLevel\":1,\"settype\":2,\"selectMode\":0,\"selectRange\":0,\"directorLevel\":1,\"examineMode\":1,\"noHanderAction\":2,\"examineEndDirectorLevel\":1,\"ccSelfSelectFlag\":1,\"conditionList\":[],\"nodeUserList\":[],\"conditionNodes\":[],\"error\":false},\"conditionNodes\":[],\"error\":false},{\"nodeName\":\"条件2\",\"type\":3,\"priorityLevel\":2,\"settype\":1,\"selectMode\":0,\"selectRange\":0,\"directorLevel\":1,\"examineMode\":1,\"noHanderAction\":2,\"examineEndDirectorLevel\":1,\"ccSelfSelectFlag\":1,\"conditionList\":[{\"showType\":\"input\",\"columnId\":1,\"type\":2,\"showName\":\"删除数量\",\"optType\":\"1\",\"zdy1\":\"1\",\"opt1\":\"<\",\"zdy2\":2,\"opt2\":\"<\",\"columnDbname\":\"delNum\",\"columnType\":\"Double\"}],\"nodeUserList\":[],\"childNode\":{\"nodeName\":\"审核人\",\"type\":1,\"priorityLevel\":1,\"settype\":1,\"selectMode\":0,\"selectRange\":0,\"directorLevel\":1,\"examineMode\":1,\"noHanderAction\":2,\"examineEndDirectorLevel\":1,\"ccSelfSelectFlag\":1,\"conditionList\":[],\"nodeUserList\":[{\"type\":1,\"targetId\":11386,\"name\":\"fhc\"}],\"conditionNodes\":[],\"error\":false},\"conditionNodes\":[],\"error\":false}]},\"conditionNodes\":[],\"setType\":\"1\"},\"procName\":\"调试发起人列表样式\",\"procType\":\"线索删除\",\"remark\":\"测试\",\"status\":\"1\"}', 11386, '2025-01-21 09:40:49');
INSERT INTO `bpm_proc_version` VALUES (92, 1881508054797783040, '{\"createUserId\":11386,\"id\":\"1881508054797783040\",\"nodeConfig\":{\"nodeName\":\"发起人\",\"type\":0,\"priorityLevel\":\"\",\"settype\":\"1\",\"selectMode\":\"\",\"selectRange\":\"\",\"directorLevel\":\"\",\"examineMode\":\"\",\"noHanderAction\":\"\",\"examineEndDirectorLevel\":\"\",\"ccSelfSelectFlag\":\"\",\"conditionList\":[],\"nodeUserList\":[{\"type\":1,\"targetId\":11385,\"name\":\"超管\"},{\"type\":1,\"targetId\":11386,\"name\":\"fhc\"},{\"type\":1,\"targetId\":11411,\"name\":\"测试新增\"},{\"type\":1,\"targetId\":11413,\"name\":\"ssss\"},{\"type\":1,\"targetId\":11414,\"name\":\"123\"},{\"type\":1,\"targetId\":11416,\"name\":\"超管bak\"}],\"childNode\":{\"nodeName\":\"路由\",\"type\":4,\"priorityLevel\":1,\"settype\":1,\"selectMode\":0,\"selectRange\":0,\"directorLevel\":1,\"examineMode\":1,\"noHanderAction\":2,\"examineEndDirectorLevel\":1,\"ccSelfSelectFlag\":1,\"conditionList\":[],\"nodeUserList\":[],\"childNode\":{},\"conditionNodes\":[{\"nodeName\":\"条件1\",\"type\":3,\"priorityLevel\":1,\"settype\":1,\"selectMode\":0,\"selectRange\":0,\"directorLevel\":1,\"examineMode\":1,\"noHanderAction\":2,\"examineEndDirectorLevel\":1,\"ccSelfSelectFlag\":1,\"conditionList\":[{\"showType\":\"input\",\"columnId\":1,\"type\":2,\"showName\":\"删除数量\",\"optType\":\"6\",\"zdy1\":1,\"opt1\":\"≤\",\"zdy2\":2,\"opt2\":\"<\",\"columnDbname\":\"delNum\",\"columnType\":\"Double\"}],\"childNode\":{\"nodeName\":\"审核人\",\"type\":1,\"priorityLevel\":1,\"settype\":2,\"selectMode\":0,\"selectRange\":0,\"directorLevel\":1,\"examineMode\":1,\"noHanderAction\":2,\"examineEndDirectorLevel\":1,\"ccSelfSelectFlag\":1,\"conditionList\":[],\"nodeUserList\":[],\"conditionNodes\":[],\"error\":false},\"conditionNodes\":[],\"error\":false},{\"nodeName\":\"条件2\",\"type\":3,\"priorityLevel\":2,\"settype\":1,\"selectMode\":0,\"selectRange\":0,\"directorLevel\":1,\"examineMode\":1,\"noHanderAction\":2,\"examineEndDirectorLevel\":1,\"ccSelfSelectFlag\":1,\"conditionList\":[{\"showType\":\"input\",\"columnId\":1,\"type\":2,\"showName\":\"删除数量\",\"optType\":\"2\",\"zdy1\":\"2\",\"opt1\":\"<\",\"zdy2\":2,\"opt2\":\"<\",\"columnDbname\":\"delNum\",\"columnType\":\"Double\"}],\"nodeUserList\":[],\"childNode\":{\"nodeName\":\"审核人\",\"type\":1,\"priorityLevel\":1,\"settype\":1,\"selectMode\":0,\"selectRange\":0,\"directorLevel\":1,\"examineMode\":1,\"noHanderAction\":2,\"examineEndDirectorLevel\":1,\"ccSelfSelectFlag\":1,\"conditionList\":[],\"nodeUserList\":[{\"type\":1,\"targetId\":11386,\"name\":\"fhc\"}],\"conditionNodes\":[],\"error\":false},\"conditionNodes\":[],\"error\":false}]},\"conditionNodes\":[],\"setType\":\"1\"},\"procName\":\"调试发起人列表样式\",\"procType\":\"线索删除\",\"remark\":\"测试\",\"status\":\"1\"}', 11386, '2025-01-21 09:41:53');
INSERT INTO `bpm_proc_version` VALUES (93, 1881508054797783040, '{\"createUserId\":11386,\"id\":\"1881508054797783040\",\"nodeConfig\":{\"nodeName\":\"发起人\",\"type\":0,\"priorityLevel\":\"\",\"settype\":\"1\",\"selectMode\":\"\",\"selectRange\":\"\",\"directorLevel\":\"\",\"examineMode\":\"\",\"noHanderAction\":\"\",\"examineEndDirectorLevel\":\"\",\"ccSelfSelectFlag\":\"\",\"conditionList\":[],\"nodeUserList\":[{\"type\":1,\"targetId\":11385,\"name\":\"超管\"},{\"type\":1,\"targetId\":11386,\"name\":\"fhc\"},{\"type\":1,\"targetId\":11411,\"name\":\"测试新增\"},{\"type\":1,\"targetId\":11413,\"name\":\"ssss\"},{\"type\":1,\"targetId\":11414,\"name\":\"123\"},{\"type\":1,\"targetId\":11416,\"name\":\"超管bak\"}],\"childNode\":{\"nodeName\":\"路由\",\"type\":4,\"priorityLevel\":1,\"settype\":1,\"selectMode\":0,\"selectRange\":0,\"directorLevel\":1,\"examineMode\":1,\"noHanderAction\":2,\"examineEndDirectorLevel\":1,\"ccSelfSelectFlag\":1,\"conditionList\":[],\"nodeUserList\":[],\"childNode\":{},\"conditionNodes\":[{\"nodeName\":\"条件1\",\"type\":3,\"priorityLevel\":1,\"settype\":1,\"selectMode\":0,\"selectRange\":0,\"directorLevel\":1,\"examineMode\":1,\"noHanderAction\":2,\"examineEndDirectorLevel\":1,\"ccSelfSelectFlag\":1,\"conditionList\":[{\"showType\":\"input\",\"columnId\":1,\"type\":2,\"showName\":\"删除数量\",\"optType\":\"6\",\"zdy1\":1,\"opt1\":\"≤\",\"zdy2\":2,\"opt2\":\"<\",\"columnDbname\":\"delNum\",\"columnType\":\"Double\"}],\"childNode\":{\"nodeName\":\"审核人\",\"type\":1,\"priorityLevel\":1,\"settype\":2,\"selectMode\":0,\"selectRange\":0,\"directorLevel\":1,\"examineMode\":1,\"noHanderAction\":2,\"examineEndDirectorLevel\":1,\"ccSelfSelectFlag\":1,\"conditionList\":[],\"nodeUserList\":[],\"conditionNodes\":[],\"error\":false},\"conditionNodes\":[],\"error\":false},{\"nodeName\":\"条件2\",\"type\":3,\"priorityLevel\":2,\"settype\":1,\"selectMode\":0,\"selectRange\":0,\"directorLevel\":1,\"examineMode\":1,\"noHanderAction\":2,\"examineEndDirectorLevel\":1,\"ccSelfSelectFlag\":1,\"conditionList\":[{\"showType\":\"input\",\"columnId\":1,\"type\":2,\"showName\":\"删除数量\",\"optType\":\"2\",\"zdy1\":\"4\",\"opt1\":\"<\",\"zdy2\":2,\"opt2\":\"<\",\"columnDbname\":\"delNum\",\"columnType\":\"Double\"}],\"nodeUserList\":[],\"childNode\":{\"nodeName\":\"审核人\",\"type\":1,\"priorityLevel\":1,\"settype\":1,\"selectMode\":0,\"selectRange\":0,\"directorLevel\":1,\"examineMode\":1,\"noHanderAction\":2,\"examineEndDirectorLevel\":1,\"ccSelfSelectFlag\":1,\"conditionList\":[],\"nodeUserList\":[{\"type\":1,\"targetId\":11386,\"name\":\"fhc\"}],\"conditionNodes\":[],\"error\":false},\"conditionNodes\":[],\"error\":false}]},\"conditionNodes\":[],\"setType\":\"1\"},\"procName\":\"调试发起人列表样式\",\"procType\":\"线索删除\",\"remark\":\"测试\",\"status\":\"1\"}', 11386, '2025-01-21 09:43:00');
INSERT INTO `bpm_proc_version` VALUES (94, 1886952468902973440, '{\"createUserId\":11386,\"nodeConfig\":{\"nodeName\":\"发起人\",\"type\":0,\"priorityLevel\":\"\",\"settype\":\"0\",\"selectMode\":\"\",\"selectRange\":\"\",\"directorLevel\":\"\",\"examineMode\":\"\",\"noHanderAction\":\"\",\"examineEndDirectorLevel\":\"\",\"ccSelfSelectFlag\":\"\",\"conditionList\":[],\"nodeUserList\":[],\"childNode\":{\"nodeName\":\"路由\",\"type\":4,\"priorityLevel\":1,\"settype\":1,\"selectMode\":0,\"selectRange\":0,\"directorLevel\":1,\"examineMode\":1,\"noHanderAction\":2,\"examineEndDirectorLevel\":1,\"ccSelfSelectFlag\":1,\"conditionList\":[],\"nodeUserList\":[],\"childNode\":{},\"conditionNodes\":[{\"nodeName\":\"条件1\",\"type\":3,\"priorityLevel\":1,\"settype\":1,\"selectMode\":0,\"selectRange\":0,\"directorLevel\":1,\"examineMode\":1,\"noHanderAction\":2,\"examineEndDirectorLevel\":1,\"ccSelfSelectFlag\":1,\"conditionList\":[{\"showType\":\"input\",\"columnId\":1,\"type\":2,\"showName\":\"删除数量\",\"optType\":\"1\",\"zdy1\":\"2\",\"opt1\":\"<\",\"zdy2\":\"\",\"opt2\":\"<\",\"columnDbname\":\"delNum\",\"columnType\":\"Double\"}],\"childNode\":{\"nodeName\":\"审核人\",\"type\":1,\"priorityLevel\":1,\"settype\":2,\"selectMode\":0,\"selectRange\":0,\"directorLevel\":1,\"examineMode\":1,\"noHanderAction\":2,\"examineEndDirectorLevel\":1,\"ccSelfSelectFlag\":1,\"conditionList\":[],\"nodeUserList\":[],\"conditionNodes\":[],\"error\":false},\"conditionNodes\":[],\"error\":false},{\"nodeName\":\"条件2\",\"type\":3,\"priorityLevel\":2,\"settype\":1,\"selectMode\":0,\"selectRange\":0,\"directorLevel\":1,\"examineMode\":1,\"noHanderAction\":2,\"examineEndDirectorLevel\":1,\"ccSelfSelectFlag\":1,\"conditionList\":[{\"showType\":\"input\",\"columnId\":1,\"type\":2,\"showName\":\"删除数量\",\"optType\":\"5\",\"zdy1\":\"3\",\"opt1\":\"<\",\"zdy2\":2,\"opt2\":\"<\",\"columnDbname\":\"delNum\",\"columnType\":\"Double\"}],\"nodeUserList\":[],\"childNode\":{\"nodeName\":\"审核人\",\"type\":1,\"priorityLevel\":1,\"settype\":1,\"selectMode\":0,\"selectRange\":0,\"directorLevel\":1,\"examineMode\":1,\"noHanderAction\":2,\"examineEndDirectorLevel\":1,\"ccSelfSelectFlag\":1,\"conditionList\":[],\"nodeUserList\":[{\"type\":1,\"targetId\":11386,\"name\":\"fhc\"}],\"conditionNodes\":[],\"error\":false},\"conditionNodes\":[],\"error\":false}]},\"conditionNodes\":[]},\"procName\":\"测试合同删除流程\",\"procType\":\"合同删除\",\"remark\":\"\",\"status\":\"0\"}', 11386, '2025-02-05 09:38:21');
INSERT INTO `bpm_proc_version` VALUES (95, 1887322596404498432, '{\"createUserId\":11386,\"nodeConfig\":{\"nodeName\":\"发起人\",\"type\":0,\"priorityLevel\":\"\",\"settype\":\"0\",\"selectMode\":\"\",\"selectRange\":\"\",\"directorLevel\":\"\",\"examineMode\":\"\",\"noHanderAction\":\"\",\"examineEndDirectorLevel\":\"\",\"ccSelfSelectFlag\":\"\",\"conditionList\":[],\"nodeUserList\":[],\"childNode\":{\"nodeName\":\"审核人\",\"error\":false,\"type\":1,\"settype\":2,\"selectMode\":0,\"selectRange\":0,\"directorLevel\":1,\"examineMode\":1,\"noHanderAction\":2,\"examineEndDirectorLevel\":0,\"childNode\":{\"nodeName\":\"路由\",\"type\":4,\"priorityLevel\":1,\"settype\":1,\"selectMode\":0,\"selectRange\":0,\"directorLevel\":1,\"examineMode\":1,\"noHanderAction\":2,\"examineEndDirectorLevel\":1,\"ccSelfSelectFlag\":1,\"conditionList\":[],\"nodeUserList\":[],\"childNode\":{},\"conditionNodes\":[{\"nodeName\":\"条件1\",\"type\":3,\"priorityLevel\":1,\"settype\":1,\"selectMode\":0,\"selectRange\":0,\"directorLevel\":1,\"examineMode\":1,\"noHanderAction\":2,\"examineEndDirectorLevel\":1,\"ccSelfSelectFlag\":1,\"conditionList\":[{\"showType\":\"input\",\"columnId\":1,\"type\":2,\"showName\":\"删除数量\",\"optType\":\"1\",\"zdy1\":\"2\",\"opt1\":\"<\",\"zdy2\":\"\",\"opt2\":\"<\",\"columnDbname\":\"delNum\",\"columnType\":\"Double\"}],\"childNode\":{\"nodeName\":\"审核人\",\"type\":1,\"priorityLevel\":1,\"settype\":2,\"selectMode\":0,\"selectRange\":0,\"directorLevel\":1,\"examineMode\":1,\"noHanderAction\":2,\"examineEndDirectorLevel\":1,\"ccSelfSelectFlag\":1,\"conditionList\":[],\"nodeUserList\":[],\"conditionNodes\":[],\"error\":false},\"conditionNodes\":[],\"error\":false},{\"nodeName\":\"条件2\",\"type\":3,\"priorityLevel\":2,\"settype\":1,\"selectMode\":0,\"selectRange\":0,\"directorLevel\":1,\"examineMode\":1,\"noHanderAction\":2,\"examineEndDirectorLevel\":1,\"ccSelfSelectFlag\":1,\"conditionList\":[{\"showType\":\"input\",\"columnId\":1,\"type\":2,\"showName\":\"删除数量\",\"optType\":\"5\",\"zdy1\":\"2\",\"opt1\":\"<\",\"zdy2\":2,\"opt2\":\"<\",\"columnDbname\":\"delNum\",\"columnType\":\"Double\"}],\"nodeUserList\":[],\"childNode\":{\"nodeName\":\"审核人\",\"type\":1,\"priorityLevel\":1,\"settype\":1,\"selectMode\":0,\"selectRange\":0,\"directorLevel\":1,\"examineMode\":1,\"noHanderAction\":2,\"examineEndDirectorLevel\":1,\"ccSelfSelectFlag\":1,\"conditionList\":[],\"nodeUserList\":[{\"type\":1,\"targetId\":11385,\"name\":\"超管\"}],\"conditionNodes\":[],\"error\":false},\"conditionNodes\":[],\"error\":false}]},\"nodeUserList\":[]},\"conditionNodes\":[]},\"procName\":\"测试线索删除\",\"procType\":\"线索删除\",\"remark\":\"test\",\"status\":\"0\"}', 11386, '2025-02-06 10:09:06');
INSERT INTO `bpm_proc_version` VALUES (96, 1887417377881198592, '{\"createUserId\":11404,\"nodeConfig\":{\"nodeName\":\"发起人\",\"type\":0,\"priorityLevel\":\"\",\"settype\":\"0\",\"selectMode\":\"\",\"selectRange\":\"\",\"directorLevel\":\"\",\"examineMode\":\"\",\"noHanderAction\":\"\",\"examineEndDirectorLevel\":\"\",\"ccSelfSelectFlag\":\"\",\"conditionList\":[],\"nodeUserList\":[],\"childNode\":{\"nodeName\":\"审核人\",\"error\":false,\"type\":1,\"settype\":2,\"selectMode\":0,\"selectRange\":0,\"directorLevel\":1,\"examineMode\":1,\"noHanderAction\":2,\"examineEndDirectorLevel\":0,\"childNode\":{\"nodeName\":\"路由\",\"type\":4,\"priorityLevel\":1,\"settype\":1,\"selectMode\":0,\"selectRange\":0,\"directorLevel\":1,\"examineMode\":1,\"noHanderAction\":2,\"examineEndDirectorLevel\":1,\"ccSelfSelectFlag\":1,\"conditionList\":[],\"nodeUserList\":[],\"childNode\":{},\"conditionNodes\":[{\"nodeName\":\"条件1\",\"type\":3,\"priorityLevel\":1,\"settype\":1,\"selectMode\":0,\"selectRange\":0,\"directorLevel\":1,\"examineMode\":1,\"noHanderAction\":2,\"examineEndDirectorLevel\":1,\"ccSelfSelectFlag\":1,\"conditionList\":[{\"showType\":\"input\",\"columnId\":1,\"type\":2,\"showName\":\"删除数量\",\"optType\":\"2\",\"zdy1\":\"3\",\"opt1\":\"<\",\"zdy2\":2,\"opt2\":\"<\",\"columnDbname\":\"delNum\",\"columnType\":\"Double\"}],\"childNode\":{\"nodeName\":\"审核人\",\"type\":1,\"priorityLevel\":1,\"settype\":1,\"selectMode\":0,\"selectRange\":0,\"directorLevel\":1,\"examineMode\":1,\"noHanderAction\":2,\"examineEndDirectorLevel\":1,\"ccSelfSelectFlag\":1,\"conditionList\":[],\"nodeUserList\":[{\"type\":1,\"targetId\":11385,\"name\":\"超管\"}],\"conditionNodes\":[],\"error\":false},\"conditionNodes\":[],\"error\":false},{\"nodeName\":\"条件2\",\"type\":3,\"priorityLevel\":2,\"settype\":1,\"selectMode\":0,\"selectRange\":0,\"directorLevel\":1,\"examineMode\":1,\"noHanderAction\":2,\"examineEndDirectorLevel\":1,\"ccSelfSelectFlag\":1,\"conditionList\":[{\"showType\":\"input\",\"columnId\":1,\"type\":2,\"showName\":\"删除数量\",\"optType\":\"3\",\"zdy1\":\"3\",\"opt1\":\"<\",\"zdy2\":2,\"opt2\":\"<\",\"columnDbname\":\"delNum\",\"columnType\":\"Double\"}],\"nodeUserList\":[],\"childNode\":{\"nodeName\":\"审核人\",\"type\":1,\"priorityLevel\":1,\"settype\":1,\"selectMode\":0,\"selectRange\":0,\"directorLevel\":1,\"examineMode\":1,\"noHanderAction\":2,\"examineEndDirectorLevel\":1,\"ccSelfSelectFlag\":1,\"conditionList\":[],\"nodeUserList\":[{\"type\":1,\"targetId\":11386,\"name\":\"fhc\"}],\"conditionNodes\":[],\"error\":false},\"conditionNodes\":[],\"error\":false}]},\"nodeUserList\":[]},\"conditionNodes\":[]},\"procName\":\"fhc客户删除流程\",\"procType\":\"客户删除\",\"remark\":\"客户删除\",\"status\":\"1\"}', 11404, '2025-02-06 16:25:44');
INSERT INTO `bpm_proc_version` VALUES (97, 1889558243529854976, '{\"createUserId\":11407,\"nodeConfig\":{\"nodeName\":\"发起人\",\"type\":0,\"priorityLevel\":\"\",\"settype\":\"0\",\"selectMode\":\"\",\"selectRange\":\"\",\"directorLevel\":\"\",\"examineMode\":\"\",\"noHanderAction\":\"\",\"examineEndDirectorLevel\":\"\",\"ccSelfSelectFlag\":\"\",\"conditionList\":[],\"nodeUserList\":[],\"childNode\":{},\"conditionNodes\":[]},\"procName\":\"test\",\"procType\":\"线索删除\",\"remark\":\"\",\"status\":\"0\"}', 11407, '2025-02-12 14:12:46');
INSERT INTO `bpm_proc_version` VALUES (98, 1886952468902973440, '{\"createUserId\":11407,\"id\":\"1886952468902973440\",\"nodeConfig\":{\"nodeName\":\"发起人\",\"type\":0,\"priorityLevel\":\"\",\"settype\":\"0\",\"selectMode\":\"\",\"selectRange\":\"\",\"directorLevel\":\"\",\"examineMode\":\"\",\"noHanderAction\":\"\",\"examineEndDirectorLevel\":\"\",\"ccSelfSelectFlag\":\"\",\"conditionList\":[],\"nodeUserList\":[],\"childNode\":{\"nodeName\":\"路由\",\"type\":4,\"priorityLevel\":1,\"settype\":1,\"selectMode\":0,\"selectRange\":0,\"directorLevel\":1,\"examineMode\":1,\"noHanderAction\":2,\"examineEndDirectorLevel\":1,\"ccSelfSelectFlag\":1,\"conditionList\":[],\"nodeUserList\":[],\"childNode\":{},\"conditionNodes\":[{\"nodeName\":\"条件1\",\"type\":3,\"priorityLevel\":1,\"settype\":1,\"selectMode\":0,\"selectRange\":0,\"directorLevel\":1,\"examineMode\":1,\"noHanderAction\":2,\"examineEndDirectorLevel\":1,\"ccSelfSelectFlag\":1,\"conditionList\":[{\"showType\":\"input\",\"columnId\":1,\"type\":2,\"showName\":\"删除数量\",\"optType\":\"1\",\"zdy1\":\"2\",\"opt1\":\"<\",\"zdy2\":\"\",\"opt2\":\"<\",\"columnDbname\":\"delNum\",\"columnType\":\"Double\"}],\"childNode\":{\"nodeName\":\"审核人\",\"type\":1,\"priorityLevel\":1,\"settype\":2,\"selectMode\":0,\"selectRange\":0,\"directorLevel\":1,\"examineMode\":1,\"noHanderAction\":2,\"examineEndDirectorLevel\":1,\"ccSelfSelectFlag\":1,\"conditionList\":[],\"nodeUserList\":[],\"conditionNodes\":[],\"error\":false},\"conditionNodes\":[],\"error\":false},{\"nodeName\":\"条件2\",\"type\":3,\"priorityLevel\":2,\"settype\":1,\"selectMode\":0,\"selectRange\":0,\"directorLevel\":1,\"examineMode\":1,\"noHanderAction\":2,\"examineEndDirectorLevel\":1,\"ccSelfSelectFlag\":1,\"conditionList\":[{\"showType\":\"input\",\"columnId\":1,\"type\":2,\"showName\":\"删除数量\",\"optType\":\"5\",\"zdy1\":\"3\",\"opt1\":\"<\",\"zdy2\":2,\"opt2\":\"<\",\"columnDbname\":\"delNum\",\"columnType\":\"Double\"}],\"nodeUserList\":[],\"childNode\":{\"nodeName\":\"审核人\",\"type\":1,\"priorityLevel\":1,\"settype\":1,\"selectMode\":0,\"selectRange\":0,\"directorLevel\":1,\"examineMode\":1,\"noHanderAction\":2,\"examineEndDirectorLevel\":1,\"ccSelfSelectFlag\":1,\"conditionList\":[],\"nodeUserList\":[{\"type\":1,\"targetId\":11386,\"name\":\"fhc\"}],\"conditionNodes\":[],\"error\":false},\"conditionNodes\":[],\"error\":false}]},\"conditionNodes\":[]},\"procName\":\"测试合同删除流程\",\"procType\":\"合同删除\",\"remark\":\"\",\"status\":\"1\"}', 11407, '2025-02-12 14:13:12');
INSERT INTO `bpm_proc_version` VALUES (99, 1887417377881198592, '{\"createUserId\":11407,\"id\":\"1887417377881198592\",\"nodeConfig\":{\"nodeName\":\"发起人\",\"type\":0,\"priorityLevel\":\"\",\"settype\":\"0\",\"selectMode\":\"\",\"selectRange\":\"\",\"directorLevel\":\"\",\"examineMode\":\"\",\"noHanderAction\":\"\",\"examineEndDirectorLevel\":\"\",\"ccSelfSelectFlag\":\"\",\"conditionList\":[],\"nodeUserList\":[],\"childNode\":{\"nodeName\":\"审核人\",\"error\":false,\"type\":1,\"settype\":2,\"selectMode\":0,\"selectRange\":0,\"directorLevel\":1,\"examineMode\":1,\"noHanderAction\":2,\"examineEndDirectorLevel\":0,\"childNode\":{\"nodeName\":\"路由\",\"type\":4,\"priorityLevel\":1,\"settype\":1,\"selectMode\":0,\"selectRange\":0,\"directorLevel\":1,\"examineMode\":1,\"noHanderAction\":2,\"examineEndDirectorLevel\":1,\"ccSelfSelectFlag\":1,\"conditionList\":[],\"nodeUserList\":[],\"childNode\":{},\"conditionNodes\":[{\"nodeName\":\"条件1\",\"type\":3,\"priorityLevel\":1,\"settype\":1,\"selectMode\":0,\"selectRange\":0,\"directorLevel\":1,\"examineMode\":1,\"noHanderAction\":2,\"examineEndDirectorLevel\":1,\"ccSelfSelectFlag\":1,\"conditionList\":[{\"showType\":\"input\",\"columnId\":1,\"type\":2,\"showName\":\"删除数量\",\"optType\":\"2\",\"zdy1\":\"3\",\"opt1\":\"<\",\"zdy2\":2,\"opt2\":\"<\",\"columnDbname\":\"delNum\",\"columnType\":\"Double\"}],\"childNode\":{\"nodeName\":\"审核人\",\"type\":1,\"priorityLevel\":1,\"settype\":1,\"selectMode\":0,\"selectRange\":0,\"directorLevel\":1,\"examineMode\":1,\"noHanderAction\":2,\"examineEndDirectorLevel\":1,\"ccSelfSelectFlag\":1,\"conditionList\":[],\"nodeUserList\":[{\"type\":1,\"targetId\":11385,\"name\":\"超管\"}],\"conditionNodes\":[],\"error\":false},\"conditionNodes\":[],\"error\":false},{\"nodeName\":\"条件2\",\"type\":3,\"priorityLevel\":2,\"settype\":1,\"selectMode\":0,\"selectRange\":0,\"directorLevel\":1,\"examineMode\":1,\"noHanderAction\":2,\"examineEndDirectorLevel\":1,\"ccSelfSelectFlag\":1,\"conditionList\":[{\"showType\":\"input\",\"columnId\":1,\"type\":2,\"showName\":\"删除数量\",\"optType\":\"3\",\"zdy1\":\"3\",\"opt1\":\"<\",\"zdy2\":2,\"opt2\":\"<\",\"columnDbname\":\"delNum\",\"columnType\":\"Double\"}],\"nodeUserList\":[],\"childNode\":{\"nodeName\":\"审核人\",\"type\":1,\"priorityLevel\":1,\"settype\":1,\"selectMode\":0,\"selectRange\":0,\"directorLevel\":1,\"examineMode\":1,\"noHanderAction\":2,\"examineEndDirectorLevel\":1,\"ccSelfSelectFlag\":1,\"conditionList\":[],\"nodeUserList\":[{\"type\":1,\"targetId\":11386,\"name\":\"fhc\"}],\"conditionNodes\":[],\"error\":false},\"conditionNodes\":[],\"error\":false}]},\"nodeUserList\":[]},\"conditionNodes\":[]},\"procName\":\"fhc客户删除流程\",\"procType\":\"客户删除\",\"remark\":\"客户删除\",\"status\":\"1\"}', 11407, '2025-02-12 14:14:00');
INSERT INTO `bpm_proc_version` VALUES (100, 1887417377881198592, '{\"createUserId\":11407,\"id\":\"1887417377881198592\",\"nodeConfig\":{\"nodeName\":\"发起人\",\"type\":0,\"priorityLevel\":\"\",\"settype\":\"0\",\"selectMode\":\"\",\"selectRange\":\"\",\"directorLevel\":\"\",\"examineMode\":\"\",\"noHanderAction\":\"\",\"examineEndDirectorLevel\":\"\",\"ccSelfSelectFlag\":\"\",\"conditionList\":[],\"nodeUserList\":[],\"childNode\":{\"nodeName\":\"审核人\",\"error\":false,\"type\":1,\"settype\":2,\"selectMode\":0,\"selectRange\":0,\"directorLevel\":1,\"examineMode\":1,\"noHanderAction\":2,\"examineEndDirectorLevel\":0,\"childNode\":{\"nodeName\":\"路由\",\"type\":4,\"priorityLevel\":1,\"settype\":1,\"selectMode\":0,\"selectRange\":0,\"directorLevel\":1,\"examineMode\":1,\"noHanderAction\":2,\"examineEndDirectorLevel\":1,\"ccSelfSelectFlag\":1,\"conditionList\":[],\"nodeUserList\":[],\"childNode\":{},\"conditionNodes\":[{\"nodeName\":\"条件1\",\"type\":3,\"priorityLevel\":1,\"settype\":1,\"selectMode\":0,\"selectRange\":0,\"directorLevel\":1,\"examineMode\":1,\"noHanderAction\":2,\"examineEndDirectorLevel\":1,\"ccSelfSelectFlag\":1,\"conditionList\":[{\"showType\":\"input\",\"columnId\":1,\"type\":2,\"showName\":\"删除数量\",\"optType\":\"2\",\"zdy1\":\"3\",\"opt1\":\"<\",\"zdy2\":2,\"opt2\":\"<\",\"columnDbname\":\"delNum\",\"columnType\":\"Double\"}],\"childNode\":{\"nodeName\":\"审核人\",\"type\":1,\"priorityLevel\":1,\"settype\":1,\"selectMode\":0,\"selectRange\":0,\"directorLevel\":1,\"examineMode\":1,\"noHanderAction\":2,\"examineEndDirectorLevel\":1,\"ccSelfSelectFlag\":1,\"conditionList\":[],\"nodeUserList\":[{\"type\":1,\"targetId\":11385,\"name\":\"超管\"}],\"conditionNodes\":[],\"error\":false},\"conditionNodes\":[],\"error\":false},{\"nodeName\":\"条件2\",\"type\":3,\"priorityLevel\":2,\"settype\":1,\"selectMode\":0,\"selectRange\":0,\"directorLevel\":1,\"examineMode\":1,\"noHanderAction\":2,\"examineEndDirectorLevel\":1,\"ccSelfSelectFlag\":1,\"conditionList\":[{\"showType\":\"input\",\"columnId\":1,\"type\":2,\"showName\":\"删除数量\",\"optType\":\"3\",\"zdy1\":\"3\",\"opt1\":\"<\",\"zdy2\":2,\"opt2\":\"<\",\"columnDbname\":\"delNum\",\"columnType\":\"Double\"}],\"nodeUserList\":[],\"childNode\":{\"nodeName\":\"审核人\",\"type\":1,\"priorityLevel\":1,\"settype\":1,\"selectMode\":0,\"selectRange\":0,\"directorLevel\":1,\"examineMode\":1,\"noHanderAction\":2,\"examineEndDirectorLevel\":1,\"ccSelfSelectFlag\":1,\"conditionList\":[],\"nodeUserList\":[{\"type\":1,\"targetId\":11386,\"name\":\"fhc\"}],\"conditionNodes\":[],\"error\":false},\"conditionNodes\":[],\"error\":false}]},\"nodeUserList\":[]},\"conditionNodes\":[]},\"procName\":\"fhc客户删除流程\",\"procType\":\"客户删除\",\"remark\":\"客户删除\",\"status\":\"1\"}', 11407, '2025-02-12 14:14:10');
INSERT INTO `bpm_proc_version` VALUES (101, 1889558865696133120, '{\"createUserId\":11407,\"nodeConfig\":{\"nodeName\":\"发起人\",\"type\":0,\"priorityLevel\":\"\",\"settype\":\"0\",\"selectMode\":\"\",\"selectRange\":\"\",\"directorLevel\":\"\",\"examineMode\":\"\",\"noHanderAction\":\"\",\"examineEndDirectorLevel\":\"\",\"ccSelfSelectFlag\":\"\",\"conditionList\":[],\"nodeUserList\":[],\"childNode\":{\"nodeName\":\"审核人\",\"error\":false,\"type\":1,\"settype\":2,\"selectMode\":0,\"selectRange\":0,\"directorLevel\":1,\"examineMode\":1,\"noHanderAction\":2,\"examineEndDirectorLevel\":0,\"childNode\":{},\"nodeUserList\":[]},\"conditionNodes\":[]},\"procName\":\"测试规则名称\",\"procType\":\"线索删除\",\"remark\":\"\",\"status\":\"0\"}', 11407, '2025-02-12 14:15:15');
INSERT INTO `bpm_proc_version` VALUES (102, 1889558865696133120, '{\"createUserId\":11407,\"id\":\"1889558865696133120\",\"nodeConfig\":{\"nodeName\":\"发起人\",\"type\":0,\"priorityLevel\":\"\",\"settype\":\"0\",\"selectMode\":\"\",\"selectRange\":\"\",\"directorLevel\":\"\",\"examineMode\":\"\",\"noHanderAction\":\"\",\"examineEndDirectorLevel\":\"\",\"ccSelfSelectFlag\":\"\",\"conditionList\":[],\"nodeUserList\":[],\"childNode\":{\"nodeName\":\"审核人\",\"error\":false,\"type\":1,\"settype\":2,\"selectMode\":0,\"selectRange\":0,\"directorLevel\":1,\"examineMode\":1,\"noHanderAction\":2,\"examineEndDirectorLevel\":0,\"childNode\":{},\"nodeUserList\":[]},\"conditionNodes\":[]},\"procName\":\"测试规则名称\",\"procType\":\"线索删除\",\"remark\":\"\",\"status\":\"1\"}', 11407, '2025-02-12 14:15:27');
INSERT INTO `bpm_proc_version` VALUES (103, 1889558865696133120, '{\"createUserId\":11407,\"id\":\"1889558865696133120\",\"nodeConfig\":{\"nodeName\":\"发起人\",\"type\":0,\"priorityLevel\":\"\",\"settype\":\"0\",\"selectMode\":\"\",\"selectRange\":\"\",\"directorLevel\":\"\",\"examineMode\":\"\",\"noHanderAction\":\"\",\"examineEndDirectorLevel\":\"\",\"ccSelfSelectFlag\":\"\",\"conditionList\":[],\"nodeUserList\":[],\"childNode\":{\"nodeName\":\"审核人\",\"error\":false,\"type\":1,\"settype\":2,\"selectMode\":0,\"selectRange\":0,\"directorLevel\":1,\"examineMode\":1,\"noHanderAction\":2,\"examineEndDirectorLevel\":0,\"childNode\":{},\"nodeUserList\":[]},\"conditionNodes\":[]},\"procName\":\"测试规则名称\",\"procType\":\"线索删除\",\"remark\":\"\",\"status\":\"1\"}', 11407, '2025-02-12 14:15:47');
INSERT INTO `bpm_proc_version` VALUES (104, 1889558865696133120, '{\"createUserId\":11407,\"id\":\"1889558865696133120\",\"nodeConfig\":{\"nodeName\":\"发起人\",\"type\":0,\"priorityLevel\":\"\",\"settype\":\"0\",\"selectMode\":\"\",\"selectRange\":\"\",\"directorLevel\":\"\",\"examineMode\":\"\",\"noHanderAction\":\"\",\"examineEndDirectorLevel\":\"\",\"ccSelfSelectFlag\":\"\",\"conditionList\":[],\"nodeUserList\":[],\"childNode\":{\"nodeName\":\"审核人\",\"error\":false,\"type\":1,\"settype\":2,\"selectMode\":0,\"selectRange\":0,\"directorLevel\":1,\"examineMode\":1,\"noHanderAction\":2,\"examineEndDirectorLevel\":0,\"childNode\":{},\"nodeUserList\":[]},\"conditionNodes\":[]},\"procName\":\"测试规则名称\",\"procType\":\"线索删除\",\"remark\":\"\",\"status\":\"1\"}', 11407, '2025-02-12 14:22:00');
INSERT INTO `bpm_proc_version` VALUES (105, 1889558865696133120, '{\"createUserId\":11407,\"id\":\"1889558865696133120\",\"nodeConfig\":{\"nodeName\":\"发起人\",\"type\":0,\"priorityLevel\":\"\",\"settype\":\"0\",\"selectMode\":\"\",\"selectRange\":\"\",\"directorLevel\":\"\",\"examineMode\":\"\",\"noHanderAction\":\"\",\"examineEndDirectorLevel\":\"\",\"ccSelfSelectFlag\":\"\",\"conditionList\":[],\"nodeUserList\":[],\"childNode\":{\"nodeName\":\"审核人\",\"error\":false,\"type\":1,\"settype\":2,\"selectMode\":0,\"selectRange\":0,\"directorLevel\":1,\"examineMode\":1,\"noHanderAction\":2,\"examineEndDirectorLevel\":0,\"childNode\":{},\"nodeUserList\":[]},\"conditionNodes\":[]},\"procName\":\"测试规则名称\",\"procType\":\"合同删除\",\"remark\":\"\",\"status\":\"1\"}', 11407, '2025-02-12 14:22:10');
INSERT INTO `bpm_proc_version` VALUES (106, 1890227698954014720, '{\"createUserId\":11407,\"nodeConfig\":{\"nodeName\":\"发起人\",\"type\":0,\"priorityLevel\":\"\",\"settype\":\"1\",\"selectMode\":\"\",\"selectRange\":\"\",\"directorLevel\":\"\",\"examineMode\":\"\",\"noHanderAction\":\"\",\"examineEndDirectorLevel\":\"\",\"ccSelfSelectFlag\":\"\",\"conditionList\":[],\"nodeUserList\":[{\"type\":1,\"targetId\":11400,\"name\":\"冯\"},{\"type\":1,\"targetId\":11404,\"name\":\"李四\"}],\"childNode\":{\"nodeName\":\"审核人\",\"error\":false,\"type\":1,\"settype\":2,\"selectMode\":0,\"selectRange\":0,\"directorLevel\":1,\"examineMode\":1,\"noHanderAction\":2,\"examineEndDirectorLevel\":0,\"childNode\":{},\"nodeUserList\":[]},\"conditionNodes\":[]},\"procName\":\"合同删除流程\",\"procType\":\"合同删除\",\"remark\":\"合同删除流程1\",\"status\":\"0\"}', 11407, '2025-02-14 10:32:57');
INSERT INTO `bpm_proc_version` VALUES (107, 1890227975140544512, '{\"createUserId\":11407,\"nodeConfig\":{\"nodeName\":\"发起人\",\"type\":0,\"priorityLevel\":\"\",\"settype\":\"1\",\"selectMode\":\"\",\"selectRange\":\"\",\"directorLevel\":\"\",\"examineMode\":\"\",\"noHanderAction\":\"\",\"examineEndDirectorLevel\":\"\",\"ccSelfSelectFlag\":\"\",\"conditionList\":[],\"nodeUserList\":[{\"type\":1,\"targetId\":11407,\"name\":\"测试用户3\"},{\"type\":1,\"targetId\":11417,\"name\":\"sxp\"}],\"childNode\":{\"nodeName\":\"审核人\",\"error\":false,\"type\":1,\"settype\":2,\"selectMode\":0,\"selectRange\":0,\"directorLevel\":1,\"examineMode\":1,\"noHanderAction\":2,\"examineEndDirectorLevel\":0,\"childNode\":{},\"nodeUserList\":[]},\"conditionNodes\":[]},\"procName\":\"合同删除2\",\"procType\":\"合同删除\",\"remark\":\"合同删除2\",\"status\":\"0\"}', 11407, '2025-02-14 10:34:03');
INSERT INTO `bpm_proc_version` VALUES (108, 1890227975140544512, '{\"createUserId\":11407,\"id\":\"1890227975140544512\",\"nodeConfig\":{\"nodeName\":\"发起人\",\"type\":0,\"priorityLevel\":\"\",\"settype\":\"1\",\"selectMode\":\"\",\"selectRange\":\"\",\"directorLevel\":\"\",\"examineMode\":\"\",\"noHanderAction\":\"\",\"examineEndDirectorLevel\":\"\",\"ccSelfSelectFlag\":\"\",\"conditionList\":[],\"nodeUserList\":[{\"type\":1,\"targetId\":11404,\"name\":\"李四\"},{\"type\":1,\"targetId\":11407,\"name\":\"测试用户3\"},{\"type\":1,\"targetId\":11417,\"name\":\"sxp\"}],\"childNode\":{\"nodeName\":\"审核人\",\"error\":false,\"type\":1,\"settype\":2,\"selectMode\":0,\"selectRange\":0,\"directorLevel\":1,\"examineMode\":1,\"noHanderAction\":2,\"examineEndDirectorLevel\":0,\"childNode\":{},\"nodeUserList\":[]},\"conditionNodes\":[]},\"procName\":\"合同删除2\",\"procType\":\"合同删除\",\"remark\":\"合同删除2\",\"status\":\"1\"}', 11407, '2025-02-14 10:34:22');
INSERT INTO `bpm_proc_version` VALUES (109, 1996389472723406848, '{\"createUserId\":11386,\"nodeConfig\":{\"nodeName\":\"发起人\",\"type\":0,\"priorityLevel\":\"\",\"settype\":\"0\",\"selectMode\":\"\",\"selectRange\":\"\",\"directorLevel\":\"\",\"examineMode\":\"\",\"noHanderAction\":\"\",\"examineEndDirectorLevel\":\"\",\"ccSelfSelectFlag\":\"\",\"conditionList\":[],\"nodeUserList\":[],\"childNode\":{\"nodeName\":\"审核人\",\"error\":false,\"type\":1,\"settype\":1,\"selectMode\":0,\"selectRange\":0,\"directorLevel\":1,\"examineMode\":1,\"noHanderAction\":2,\"examineEndDirectorLevel\":0,\"childNode\":{},\"nodeUserList\":[{\"type\":1,\"targetId\":11385,\"name\":\"超管\"}]},\"conditionNodes\":[]},\"procName\":\"测试供应商删除\",\"procType\":\"供应商删除\",\"remark\":\"\",\"status\":\"1\"}', 11386, '2025-12-04 09:21:56');
INSERT INTO `bpm_proc_version` VALUES (110, 1996389472723406848, '{\"createUserId\":11386,\"id\":\"1996389472723406848\",\"nodeConfig\":{\"nodeName\":\"发起人\",\"type\":0,\"priorityLevel\":\"\",\"settype\":\"0\",\"selectMode\":\"\",\"selectRange\":\"\",\"directorLevel\":\"\",\"examineMode\":\"\",\"noHanderAction\":\"\",\"examineEndDirectorLevel\":\"\",\"ccSelfSelectFlag\":\"\",\"conditionList\":[],\"nodeUserList\":[],\"childNode\":{\"nodeName\":\"审核人\",\"error\":false,\"type\":1,\"settype\":2,\"selectMode\":0,\"selectRange\":0,\"directorLevel\":1,\"examineMode\":1,\"noHanderAction\":2,\"examineEndDirectorLevel\":0,\"childNode\":{},\"nodeUserList\":[]},\"conditionNodes\":[]},\"procName\":\"测试供应商删除\",\"procType\":\"供应商删除\",\"remark\":\"\",\"status\":\"1\"}', 11386, '2025-12-04 09:47:16');
INSERT INTO `bpm_proc_version` VALUES (111, 1996389472723406848, '{\"createUserId\":11386,\"id\":\"1996389472723406848\",\"nodeConfig\":{\"nodeName\":\"发起人\",\"type\":0,\"priorityLevel\":\"\",\"settype\":\"0\",\"selectMode\":\"\",\"selectRange\":\"\",\"directorLevel\":\"\",\"examineMode\":\"\",\"noHanderAction\":\"\",\"examineEndDirectorLevel\":\"\",\"ccSelfSelectFlag\":\"\",\"conditionList\":[],\"nodeUserList\":[],\"childNode\":{\"nodeName\":\"审核人\",\"error\":false,\"type\":1,\"settype\":1,\"selectMode\":0,\"selectRange\":0,\"directorLevel\":1,\"examineMode\":1,\"noHanderAction\":2,\"examineEndDirectorLevel\":0,\"childNode\":{},\"nodeUserList\":[{\"type\":1,\"targetId\":11386,\"name\":\"fhc\"}]},\"conditionNodes\":[]},\"procName\":\"测试供应商删除\",\"procType\":\"供应商删除\",\"remark\":\"\",\"status\":\"1\"}', 11386, '2025-12-04 09:58:36');

-- ----------------------------
-- Table structure for broadcast_notification
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
) ENGINE = InnoDB AUTO_INCREMENT = 18 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '广播通知' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of broadcast_notification
-- ----------------------------
INSERT INTO `broadcast_notification` VALUES (15, '测试', '123123123', 0, NULL, '2024-10-18 00:00:00', '2024-10-25 00:00:00', 11385, '2024-10-17 09:35:08', NULL, '2024-10-17 09:49:09', 0);
INSERT INTO `broadcast_notification` VALUES (16, '测试', '123123123123', 1, 2, '2024-10-17 14:40:41', '2024-10-18 14:45:53', 11417, '2024-10-17 14:38:59', NULL, '2024-10-17 14:39:54', 1);
INSERT INTO `broadcast_notification` VALUES (17, '测试', '123123123123', 2, 2, '2024-10-17 14:40:41', '2024-10-18 14:45:53', 11417, '2024-10-17 14:38:59', 11385, '2024-10-24 17:28:50', 0);

-- ----------------------------
-- Table structure for customer
-- ----------------------------
DROP TABLE IF EXISTS `customer`;
CREATE TABLE `customer`  (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `clue_id` bigint NULL DEFAULT NULL COMMENT '如果是线索转客户，则关联来源线索id',
  `type` tinyint NULL DEFAULT NULL COMMENT '1=客户 2=供应商',
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
  `supplier_type_id` int NULL DEFAULT NULL COMMENT '供应商类型id-详见字典表',
  `cooperation_type_id` int NULL DEFAULT NULL COMMENT '合作类型id-详见字典表',
  `track_user_id` int NULL DEFAULT NULL COMMENT '跟踪人用户id',
  `remark` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT '公司介绍',
  `note` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '备注信息',
  `status` int NULL DEFAULT NULL COMMENT '状态：1-启用 2-停用',
  `create_by` bigint NULL DEFAULT NULL COMMENT '创建人id',
  `create_at` datetime NULL DEFAULT NULL COMMENT '创建时间',
  `update_by` bigint NULL DEFAULT NULL COMMENT '更新人id',
  `update_at` datetime NULL DEFAULT NULL COMMENT '更新时间',
  `del_flag` int NULL DEFAULT 0 COMMENT '0-正常 1-已删除',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 79 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '客户表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of customer
-- ----------------------------
INSERT INTO `customer` VALUES (12, NULL, 1, '测试客户名称', '添加联系人', '18363971268', 9, '天津市,河东区', '测试详细地址', NULL, NULL, NULL, 30, 35, NULL, NULL, NULL, NULL, NULL, NULL, '公司介绍', NULL, NULL, NULL, NULL, NULL, '2024-10-10 13:49:39', 1);
INSERT INTO `customer` VALUES (13, NULL, 1, '测试1', '测试1', '18363971268', 9, '河北省,秦皇岛市', '测试详细', NULL, NULL, NULL, 29, 36, NULL, NULL, NULL, NULL, NULL, NULL, '测试公司介绍', NULL, NULL, NULL, NULL, NULL, '2024-10-10 13:52:49', 1);
INSERT INTO `customer` VALUES (14, NULL, 1, '测试2', 'sx', '18363971262', 10, '河北省,唐山市', 'ceshi ', NULL, NULL, 60, 29, 34, NULL, NULL, NULL, NULL, NULL, NULL, 'jieshao', NULL, NULL, NULL, NULL, NULL, '2024-10-10 13:52:05', 1);
INSERT INTO `customer` VALUES (15, NULL, 1, '测试1', 'sxp', '18363971268', 10, '河北省,秦皇岛市', '详细地址信息', NULL, NULL, 60, 28, 37, NULL, NULL, NULL, NULL, NULL, NULL, '公司介绍对对对对对对的点点滴滴哒哒哒哒哒哒哒哒哒哒哒', NULL, NULL, 11385, '2024-10-10 14:03:44', NULL, '2024-10-17 14:11:54', 1);
INSERT INTO `customer` VALUES (16, NULL, 1, '测试123123123', 'sxp123', '18363971212', 9, '河北省,唐山市', '详细地址', NULL, NULL, 60, 28, 35, NULL, NULL, NULL, NULL, NULL, NULL, '公司介绍', NULL, NULL, 11385, '2024-10-16 11:18:18', NULL, '2024-10-16 11:20:41', 1);
INSERT INTO `customer` VALUES (17, NULL, 1, '测试123123123', 'sxp', '1111111111', 9, '河北省,唐山市', '详细地址', NULL, NULL, 60, 28, 35, NULL, NULL, NULL, NULL, NULL, NULL, '公司介绍', NULL, NULL, NULL, NULL, NULL, '2024-10-16 11:20:47', 1);
INSERT INTO `customer` VALUES (18, NULL, 1, '测试123123123', 'sxp', '1111111111', 9, '河北省,唐山市', '详细地址', NULL, NULL, 60, 28, 35, NULL, NULL, NULL, NULL, NULL, NULL, '公司介绍', NULL, NULL, NULL, NULL, NULL, '2024-10-15 11:14:45', 1);
INSERT INTO `customer` VALUES (19, NULL, 1, '测试123123123', 'sxp', '1111111111', 9, '河北省,唐山市', '详细地址', NULL, NULL, 60, 28, 35, NULL, NULL, NULL, NULL, NULL, NULL, '公司介绍', NULL, NULL, NULL, NULL, NULL, '2024-10-15 11:14:47', 1);
INSERT INTO `customer` VALUES (20, NULL, 1, '测试123123123', 'sxp', '1111111111', 9, '河北省,唐山市', '详细地址', NULL, NULL, 60, 28, 35, NULL, NULL, NULL, NULL, NULL, NULL, '公司介绍', NULL, NULL, NULL, NULL, NULL, '2024-10-15 11:14:49', 1);
INSERT INTO `customer` VALUES (21, NULL, 1, '测试123123123', 'sxp', '1111111111', 9, '河北省,唐山市', '详细地址', NULL, NULL, 60, 28, 35, NULL, NULL, NULL, NULL, NULL, NULL, '公司介绍', NULL, NULL, NULL, NULL, NULL, '2024-10-15 11:14:51', 1);
INSERT INTO `customer` VALUES (22, NULL, 1, '测试123123123', 'sxp', '1111111111', 9, '河北省,唐山市', '详细地址', NULL, NULL, 60, 28, 35, NULL, NULL, NULL, NULL, NULL, NULL, '公司介绍', NULL, NULL, NULL, NULL, NULL, '2024-10-17 13:54:54', 1);
INSERT INTO `customer` VALUES (23, NULL, 1, '测试123123123', 'sxp', '1111111111', 9, '河北省,唐山市', '详细地址', NULL, NULL, 60, 28, 35, NULL, NULL, NULL, NULL, NULL, NULL, '公司介绍', NULL, NULL, NULL, NULL, NULL, '2024-10-17 13:54:52', 1);
INSERT INTO `customer` VALUES (24, NULL, 1, '测试123123123', 'sxp', '1111111111', 9, '河北省,唐山市', '详细地址', NULL, NULL, 60, 28, 35, NULL, NULL, NULL, NULL, NULL, NULL, '公司介绍', NULL, NULL, NULL, NULL, NULL, '2024-10-17 13:54:50', 1);
INSERT INTO `customer` VALUES (25, NULL, 1, '测试123123123', 'sxp', '1111111111', 9, '河北省,唐山市', '详细地址', NULL, NULL, 60, 28, 35, NULL, NULL, NULL, NULL, NULL, NULL, '公司介绍', NULL, NULL, NULL, NULL, 11385, '2024-10-17 13:54:48', 1);
INSERT INTO `customer` VALUES (26, NULL, 1, '测试123123123', 'sxp', '1111111111', 9, '河北省,唐山市', '详细地址', NULL, NULL, 60, 28, 35, NULL, NULL, NULL, NULL, NULL, NULL, '公司介绍', NULL, NULL, NULL, NULL, NULL, '2024-10-17 13:54:47', 1);
INSERT INTO `customer` VALUES (27, NULL, 1, '测试123123123', 'sxp', '1111111111', 9, '河北省,唐山市', '详细地址', NULL, NULL, 60, 28, 35, NULL, NULL, NULL, NULL, NULL, NULL, '公司介绍', NULL, NULL, NULL, NULL, NULL, '2024-10-17 13:54:45', 1);
INSERT INTO `customer` VALUES (28, NULL, 1, '第一个', '联系人', '18200000000', 9, '山西省,长治市', '是的冯绍峰非法所得', NULL, NULL, 54, 27, 37, NULL, NULL, NULL, NULL, NULL, 11404, '似懂非懂方式放大', NULL, NULL, NULL, NULL, 11386, '2025-12-05 10:35:56', 0);
INSERT INTO `customer` VALUES (29, 17, 1, '测试哈哈哈', 'sxp', '18363971268', 10, '天津市,河东区', '测试哈哈哈', NULL, NULL, NULL, 29, 36, NULL, NULL, NULL, NULL, NULL, 11385, 'ddddddd', NULL, NULL, 11385, '2024-10-12 15:20:33', 11385, '2025-11-21 09:21:13', 0);
INSERT INTO `customer` VALUES (30, NULL, 1, '崂山区政府', '邹晓栋', '13791909618', 11, '山东省,青岛市', '青岛市崂山区松岭路163号', 18, 23, 54, 27, 38, NULL, 46, NULL, NULL, NULL, 11385, '公司简介', NULL, NULL, NULL, NULL, 11386, '2025-07-04 13:57:25', 0);
INSERT INTO `customer` VALUES (31, NULL, 1, '崂山区政府办公厅', '邹晓栋', '13791909618', 11, '山东省,青岛市', '青岛市崂山区松岭路163号', 18, 23, 54, 27, 38, NULL, 46, NULL, NULL, NULL, 11400, '公司简介', NULL, NULL, 11412, '2024-10-12 19:12:28', 11386, '2025-01-24 11:23:01', 0);
INSERT INTO `customer` VALUES (32, NULL, 1, '续费客户', '续费客户', '19900000000', 10, '河北省,邯郸市', '大名县', NULL, NULL, 55, 28, 34, NULL, NULL, NULL, NULL, NULL, NULL, '主要干', NULL, NULL, 11412, '2024-10-14 09:35:18', NULL, '2024-10-14 09:35:18', 0);
INSERT INTO `customer` VALUES (33, NULL, 1, '采购客户', '采购客户', '19800000000', 12, '山东省,青岛市', '崂山区国际创新园', NULL, NULL, 56, 31, 38, NULL, NULL, NULL, NULL, NULL, NULL, '及设计销售服务于一体', NULL, NULL, 11412, '2024-10-14 09:37:20', NULL, '2024-10-14 09:37:20', 0);
INSERT INTO `customer` VALUES (34, NULL, 1, '续费客户', '续费客户', '19900000000', 9, '河北省,邯郸市', '大名县', NULL, NULL, 55, 28, 34, NULL, NULL, NULL, NULL, NULL, NULL, '递四方速递丰富的', NULL, NULL, 11412, '2024-10-14 16:48:51', NULL, '2024-10-14 16:48:51', 0);
INSERT INTO `customer` VALUES (35, NULL, 1, '测试客户档案修改111', '联系人1', '18363971268', 9, '河北省,唐山市', '详细地址', NULL, NULL, NULL, 28, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '公司介绍111', NULL, NULL, 11385, '2024-10-15 11:22:53', 11386, '2025-02-17 09:45:06', 1);
INSERT INTO `customer` VALUES (36, NULL, 1, '新建合同', '新建合同', '15900000000', 9, '河北省,邯郸市', '大名县', NULL, NULL, NULL, 30, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '第三方大是大非水电费', NULL, NULL, 11412, '2024-10-15 16:39:46', 11386, '2025-02-19 14:56:32', 1);
INSERT INTO `customer` VALUES (37, NULL, 1, '青岛EDA中心', '邹晓栋', '13791909618', 8, NULL, '青岛市崂山区松岭路163号', 17, 23, NULL, 27, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 11417, '2024-10-17 10:31:16', NULL, '2025-02-12 10:06:02', 1);
INSERT INTO `customer` VALUES (38, NULL, 1, '中科芯云微电子科技有限公司', '邹晓栋', '13791909618', 9, NULL, '青岛市崂山区松岭路163号', 17, 23, NULL, 27, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 11417, '2024-10-17 11:21:39', NULL, NULL, 0);
INSERT INTO `customer` VALUES (39, NULL, 1, '测试', '测试111', '17661048266', 8, '北京市,东城区', '12312312', NULL, NULL, NULL, 27, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '123123', NULL, NULL, 11416, '2024-10-17 14:27:06', 11386, '2025-02-18 14:53:34', 0);
INSERT INTO `customer` VALUES (40, NULL, 1, '微服务1', 'sxp', '13791909618', 8, NULL, NULL, 17, 23, NULL, 27, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 11417, '2024-10-17 15:08:30', NULL, NULL, 0);
INSERT INTO `customer` VALUES (41, NULL, 1, '微服务2', 'sxp', '13791909618', 8, NULL, NULL, 17, 23, NULL, 27, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 11417, '2024-10-17 15:08:30', NULL, NULL, 0);
INSERT INTO `customer` VALUES (42, NULL, 1, '微服务3', 'sxp', '13791909618', 8, NULL, NULL, 17, 23, NULL, 27, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 11417, '2024-10-17 15:08:30', NULL, NULL, 0);
INSERT INTO `customer` VALUES (43, NULL, 1, '微服务', 'sxp', '13791909618', 8, NULL, NULL, 17, 23, NULL, 27, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 11417, '2024-10-17 15:08:30', NULL, NULL, 0);
INSERT INTO `customer` VALUES (44, NULL, 1, 'sxp', 'sxp', '13791909618', 8, NULL, NULL, 17, 23, NULL, 27, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 11417, '2024-10-17 15:23:35', NULL, NULL, 0);
INSERT INTO `customer` VALUES (45, NULL, 1, '青岛EDA中心1', '邹晓栋', '13791909618', 8, NULL, '青岛市崂山区松岭路163号', 17, 23, NULL, 27, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 11417, '2024-10-17 15:36:32', NULL, NULL, 0);
INSERT INTO `customer` VALUES (46, NULL, 1, '青岛EDA中心2', 'aaa', '13791909619', 8, NULL, '青岛市崂山区松岭路164号', 17, 23, NULL, 27, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 11417, '2024-10-17 15:36:32', NULL, NULL, 0);
INSERT INTO `customer` VALUES (47, NULL, 1, '青岛EDA中心3', 'aaa1', '13791909620', 8, NULL, '青岛市崂山区松岭路165号', 17, 23, NULL, 27, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 11417, '2024-10-17 15:36:32', NULL, NULL, 0);
INSERT INTO `customer` VALUES (48, NULL, 1, '青岛EDA中心4', 'aaa2', '13791909621', 8, NULL, '青岛市崂山区松岭路166号', 17, 23, NULL, 27, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 11417, '2024-10-17 15:36:32', NULL, NULL, 0);
INSERT INTO `customer` VALUES (49, 59, 1, '测试1', '沈相樸', '18363971268', 10, '河北省,邯郸市', '佛山市的方法', NULL, NULL, NULL, 30, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '介绍', NULL, NULL, 11417, '2024-10-18 09:19:27', 11386, '2025-07-04 10:58:24', 0);
INSERT INTO `customer` VALUES (50, NULL, 1, '第一个', '联系人', '18200000000', 9, '河北省,邯郸市', '是的冯绍峰非法所得', NULL, NULL, NULL, 27, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '似懂非懂方式放大', NULL, NULL, 11417, '2024-10-18 17:09:32', 11386, '2025-02-14 15:50:13', 1);
INSERT INTO `customer` VALUES (51, NULL, 1, '测试客户信息', 'sxp', '18363971222', 10, '天津市,河东区', '详细地址', NULL, NULL, NULL, 28, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'ddddd', NULL, NULL, 11385, '2024-10-22 09:55:05', NULL, '2024-10-22 09:55:05', 0);
INSERT INTO `customer` VALUES (52, 66, 1, '测试线索', '水水水水', '18363971268', 9, '天津市,河东区', 'ddddd', NULL, NULL, NULL, 29, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'ddd', NULL, NULL, 11385, '2024-10-22 15:37:57', 11386, '2025-02-17 09:43:43', 0);
INSERT INTO `customer` VALUES (53, 42, 1, 'cesh', 'sss', '18363971222', 12, '天津市,河东区', 'cehss', NULL, NULL, NULL, 30, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'ddddd', NULL, NULL, 11385, '2024-10-22 15:40:31', 11386, '2025-02-18 14:49:30', 0);
INSERT INTO `customer` VALUES (54, NULL, 1, '青岛微电子创新中心', '邹晓栋', '13791909618', 9, NULL, '山东省青岛市崂山区松岭路163号', NULL, NULL, NULL, 27, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 11385, '2024-10-24 16:00:49', NULL, '2024-10-24 16:00:49', 0);
INSERT INTO `customer` VALUES (59, NULL, 1, '客户名称', '客户名称', '15800000000', 9, '河北省,唐山市', '水电费水电费手打', NULL, NULL, NULL, 28, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '水电费水电费发多少', NULL, NULL, 11386, '2024-10-31 18:16:12', NULL, '2024-10-31 18:16:12', 0);
INSERT INTO `customer` VALUES (63, NULL, 1, '中科芯云555', NULL, NULL, 9, NULL, '山东省青岛市崂山区松岭路163号', NULL, NULL, NULL, 27, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 11386, '2024-10-31 18:35:02', NULL, '2024-10-31 18:35:02', 0);
INSERT INTO `customer` VALUES (64, NULL, 1, '中科芯云微电子科技有限公司444', '邹晓栋', '13791909618', 9, NULL, '山东省青岛市崂山区松岭路163号', NULL, NULL, NULL, 27, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 11386, '2024-11-01 14:53:54', NULL, '2024-11-01 14:53:54', 0);
INSERT INTO `customer` VALUES (65, NULL, 1, '测试客户信息1', 'sxp', '18363971268', 9, '天津市,河东区', '详细地址', NULL, NULL, NULL, 29, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '测距欧式', NULL, NULL, 11386, '2025-02-14 14:21:10', 11386, '2025-07-04 14:43:34', 0);
INSERT INTO `customer` VALUES (66, NULL, 1, '测试联系方式', 'sxp', 'webchat', 9, '北京市,东城区', '详细地址', NULL, NULL, NULL, 28, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '介绍介绍', NULL, NULL, 11386, '2025-02-14 15:21:19', 11385, '2025-11-17 14:02:49', 0);
INSERT INTO `customer` VALUES (67, 34, 1, '测试2', '测试2', '18363971262', 9, '北京市,西城区', 'sfsdf', NULL, NULL, NULL, 28, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'sdfsd', NULL, NULL, 11386, '2025-02-14 16:50:34', 11386, '2025-02-24 11:32:07', 0);
INSERT INTO `customer` VALUES (68, NULL, 1, 'test', 'test', '123222222222222', 9, '北京市,东城区', '详细信息', NULL, NULL, NULL, 29, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '对对对对对对', NULL, NULL, 11386, '2025-02-17 10:50:58', 11386, '2025-02-18 09:01:25', 0);
INSERT INTO `customer` VALUES (69, 49, 1, 'sdfsdf', 'sss', '18236971256', 8, '天津市,河东区', 'sssss', NULL, NULL, NULL, 28, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'ssss', NULL, NULL, 11386, '2025-02-17 11:04:24', 11386, '2025-02-18 14:50:27', 0);
INSERT INTO `customer` VALUES (70, 48, 1, 'testDel', 'sxp1', '18363971268', 9, '北京市,东城区', 'test', NULL, NULL, NULL, 27, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'stes', NULL, NULL, 11386, '2025-02-18 14:47:13', 11385, '2025-11-17 14:02:30', 0);
INSERT INTO `customer` VALUES (71, 57, 1, 'testdfsdfsdf', 'test', '18363971225', 10, '天津市,河东区', 'test', NULL, NULL, NULL, 28, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'test', NULL, NULL, 11386, '2025-07-04 14:27:26', NULL, '2025-07-04 14:27:26', 0);
INSERT INTO `customer` VALUES (72, 0, 2, '第一供应商', '刘', '19877777777', 8, '北京市,东城区', '天安门广场', 0, 0, 0, 27, 36, 'string', 0, '2025-11-12', 74, 81, NULL, '公司介绍nb', 'string', 0, 11385, '2025-11-12 16:21:15', 11386, '2025-12-04 10:03:43', 1);
INSERT INTO `customer` VALUES (73, NULL, 1, 'trest123123', 'sdfsdf', 'sdfsdf', 10, '天津市,河西区', 'sdfsdfsd', NULL, NULL, NULL, 29, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'sdfsdf', NULL, NULL, 11386, '2025-12-01 11:17:11', NULL, '2025-12-01 11:17:11', 0);
INSERT INTO `customer` VALUES (74, 35, 1, '测试1dsfsdf', '沈相樸', '18363971268', 10, '河北省,邯郸市', '佛山市的方法', NULL, NULL, NULL, 30, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '发的是', 'fstest', NULL, 11386, '2025-12-02 15:19:45', NULL, '2025-12-02 15:19:45', 0);
INSERT INTO `customer` VALUES (75, 40, 1, '测试线索转供应商', '水水水水', '18363971268', 10, '天津市,河西区', 'dfsdfsfsfsdf', NULL, NULL, NULL, 29, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '测试线索', NULL, NULL, 11386, '2025-12-02 15:24:00', NULL, '2025-12-02 15:24:00', 0);
INSERT INTO `customer` VALUES (76, NULL, 2, 'fsdfcx', 'sxp', '1825665655555', 8, '天津市,河西区', 'fdsfa', NULL, NULL, NULL, 28, NULL, NULL, NULL, NULL, 76, 82, 11385, 'dfsdfsdf', NULL, NULL, 11386, '2025-12-02 16:41:29', 11386, '2025-12-02 16:41:29', 0);
INSERT INTO `customer` VALUES (77, NULL, 2, 'test', 'sxxz', '18236554545', 9, '天津市,河东区', 'fsdfxcvxvcxcv', NULL, NULL, NULL, 29, NULL, NULL, NULL, NULL, 76, 82, 11403, 'xcvxcvxcv', NULL, NULL, 11386, '2025-12-02 16:50:15', 11386, '2025-12-02 16:50:15', 0);
INSERT INTO `customer` VALUES (78, NULL, 1, 'testdfsdfsdfdfsdf', 'sxpd', '15863255482', 9, '天津市,河东区', 'sdfsdfsdfsdf', NULL, NULL, NULL, 28, NULL, NULL, NULL, NULL, NULL, NULL, 11385, 'asdfasdfaf', NULL, NULL, 11386, '2025-12-05 11:22:04', NULL, '2025-12-05 11:22:04', 0);

-- ----------------------------
-- Table structure for customer_cooperation
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
) ENGINE = InnoDB AUTO_INCREMENT = 32 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '客户合作记录表表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of customer_cooperation
-- ----------------------------

-- ----------------------------
-- Table structure for customer_copy1
-- ----------------------------
DROP TABLE IF EXISTS `customer_copy1`;
CREATE TABLE `customer_copy1`  (
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
  `remark` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT '备注',
  `status` int NULL DEFAULT NULL COMMENT '状态：1-启用 2-停用',
  `create_by` bigint NULL DEFAULT NULL COMMENT '创建人id',
  `create_at` datetime NULL DEFAULT NULL COMMENT '创建时间',
  `update_by` bigint NULL DEFAULT NULL COMMENT '更新人id',
  `update_at` datetime NULL DEFAULT NULL COMMENT '更新时间',
  `del_flag` int NULL DEFAULT 0 COMMENT '0-正常 1-已删除',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 72 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '客户表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of customer_copy1
-- ----------------------------
INSERT INTO `customer_copy1` VALUES (12, NULL, '测试客户名称', '添加联系人', '18363971268', 9, '天津市,河东区', '测试详细地址', NULL, NULL, NULL, 30, 35, NULL, NULL, NULL, '公司介绍', NULL, NULL, NULL, NULL, '2024-10-10 13:49:39', 1);
INSERT INTO `customer_copy1` VALUES (13, NULL, '测试1', '测试1', '18363971268', 9, '河北省,秦皇岛市', '测试详细', NULL, NULL, NULL, 29, 36, NULL, NULL, NULL, '测试公司介绍', NULL, NULL, NULL, NULL, '2024-10-10 13:52:49', 1);
INSERT INTO `customer_copy1` VALUES (14, NULL, '测试2', 'sx', '18363971262', 10, '河北省,唐山市', 'ceshi ', NULL, NULL, 60, 29, 34, NULL, NULL, NULL, 'jieshao', NULL, NULL, NULL, NULL, '2024-10-10 13:52:05', 1);
INSERT INTO `customer_copy1` VALUES (15, NULL, '测试1', 'sxp', '18363971268', 10, '河北省,秦皇岛市', '详细地址信息', NULL, NULL, 60, 28, 37, NULL, NULL, NULL, '公司介绍对对对对对对的点点滴滴哒哒哒哒哒哒哒哒哒哒哒', NULL, 11385, '2024-10-10 14:03:44', NULL, '2024-10-17 14:11:54', 1);
INSERT INTO `customer_copy1` VALUES (16, NULL, '测试123123123', 'sxp123', '18363971212', 9, '河北省,唐山市', '详细地址', NULL, NULL, 60, 28, 35, NULL, NULL, NULL, '公司介绍', NULL, 11385, '2024-10-16 11:18:18', NULL, '2024-10-16 11:20:41', 1);
INSERT INTO `customer_copy1` VALUES (17, NULL, '测试123123123', 'sxp', '1111111111', 9, '河北省,唐山市', '详细地址', NULL, NULL, 60, 28, 35, NULL, NULL, NULL, '公司介绍', NULL, NULL, NULL, NULL, '2024-10-16 11:20:47', 1);
INSERT INTO `customer_copy1` VALUES (18, NULL, '测试123123123', 'sxp', '1111111111', 9, '河北省,唐山市', '详细地址', NULL, NULL, 60, 28, 35, NULL, NULL, NULL, '公司介绍', NULL, NULL, NULL, NULL, '2024-10-15 11:14:45', 1);
INSERT INTO `customer_copy1` VALUES (19, NULL, '测试123123123', 'sxp', '1111111111', 9, '河北省,唐山市', '详细地址', NULL, NULL, 60, 28, 35, NULL, NULL, NULL, '公司介绍', NULL, NULL, NULL, NULL, '2024-10-15 11:14:47', 1);
INSERT INTO `customer_copy1` VALUES (20, NULL, '测试123123123', 'sxp', '1111111111', 9, '河北省,唐山市', '详细地址', NULL, NULL, 60, 28, 35, NULL, NULL, NULL, '公司介绍', NULL, NULL, NULL, NULL, '2024-10-15 11:14:49', 1);
INSERT INTO `customer_copy1` VALUES (21, NULL, '测试123123123', 'sxp', '1111111111', 9, '河北省,唐山市', '详细地址', NULL, NULL, 60, 28, 35, NULL, NULL, NULL, '公司介绍', NULL, NULL, NULL, NULL, '2024-10-15 11:14:51', 1);
INSERT INTO `customer_copy1` VALUES (22, NULL, '测试123123123', 'sxp', '1111111111', 9, '河北省,唐山市', '详细地址', NULL, NULL, 60, 28, 35, NULL, NULL, NULL, '公司介绍', NULL, NULL, NULL, NULL, '2024-10-17 13:54:54', 1);
INSERT INTO `customer_copy1` VALUES (23, NULL, '测试123123123', 'sxp', '1111111111', 9, '河北省,唐山市', '详细地址', NULL, NULL, 60, 28, 35, NULL, NULL, NULL, '公司介绍', NULL, NULL, NULL, NULL, '2024-10-17 13:54:52', 1);
INSERT INTO `customer_copy1` VALUES (24, NULL, '测试123123123', 'sxp', '1111111111', 9, '河北省,唐山市', '详细地址', NULL, NULL, 60, 28, 35, NULL, NULL, NULL, '公司介绍', NULL, NULL, NULL, NULL, '2024-10-17 13:54:50', 1);
INSERT INTO `customer_copy1` VALUES (25, NULL, '测试123123123', 'sxp', '1111111111', 9, '河北省,唐山市', '详细地址', NULL, NULL, 60, 28, 35, NULL, NULL, NULL, '公司介绍', NULL, NULL, NULL, 11385, '2024-10-17 13:54:48', 1);
INSERT INTO `customer_copy1` VALUES (26, NULL, '测试123123123', 'sxp', '1111111111', 9, '河北省,唐山市', '详细地址', NULL, NULL, 60, 28, 35, NULL, NULL, NULL, '公司介绍', NULL, NULL, NULL, NULL, '2024-10-17 13:54:47', 1);
INSERT INTO `customer_copy1` VALUES (27, NULL, '测试123123123', 'sxp', '1111111111', 9, '河北省,唐山市', '详细地址', NULL, NULL, 60, 28, 35, NULL, NULL, NULL, '公司介绍', NULL, NULL, NULL, NULL, '2024-10-17 13:54:45', 1);
INSERT INTO `customer_copy1` VALUES (28, NULL, '第一个', '联系人', '18200000000', 9, '山西省,长治市', '是的冯绍峰非法所得', NULL, NULL, 54, 27, 37, NULL, NULL, NULL, '似懂非懂方式放大', NULL, NULL, NULL, 11386, '2025-02-14 15:53:25', 0);
INSERT INTO `customer_copy1` VALUES (29, 17, '测试哈哈哈', 'sxp', '18363971268', 10, '天津市,河东区', '测试哈哈哈', NULL, NULL, NULL, 29, 36, NULL, NULL, NULL, 'ddddd', NULL, 11385, '2024-10-12 15:20:33', 11386, '2025-07-07 10:54:35', 0);
INSERT INTO `customer_copy1` VALUES (30, NULL, '崂山区政府', '邹晓栋', '13791909618', 11, '山东省,青岛市', '青岛市崂山区松岭路163号', 18, 23, 54, 27, 38, NULL, 46, NULL, '公司简介', NULL, NULL, NULL, 11386, '2025-07-04 13:57:25', 0);
INSERT INTO `customer_copy1` VALUES (31, NULL, '崂山区政府办公厅', '邹晓栋', '13791909618', 11, '山东省,青岛市', '青岛市崂山区松岭路163号', 18, 23, 54, 27, 38, NULL, 46, NULL, '公司简介', NULL, 11412, '2024-10-12 19:12:28', 11386, '2025-01-24 11:23:01', 0);
INSERT INTO `customer_copy1` VALUES (32, NULL, '续费客户', '续费客户', '19900000000', 10, '河北省,邯郸市', '大名县', NULL, NULL, 55, 28, 34, NULL, NULL, NULL, '主要干', NULL, 11412, '2024-10-14 09:35:18', NULL, '2024-10-14 09:35:18', 0);
INSERT INTO `customer_copy1` VALUES (33, NULL, '采购客户', '采购客户', '19800000000', 12, '山东省,青岛市', '崂山区国际创新园', NULL, NULL, 56, 31, 38, NULL, NULL, NULL, '及设计销售服务于一体', NULL, 11412, '2024-10-14 09:37:20', NULL, '2024-10-14 09:37:20', 0);
INSERT INTO `customer_copy1` VALUES (34, NULL, '续费客户', '续费客户', '19900000000', 9, '河北省,邯郸市', '大名县', NULL, NULL, 55, 28, 34, NULL, NULL, NULL, '递四方速递丰富的', NULL, 11412, '2024-10-14 16:48:51', NULL, '2024-10-14 16:48:51', 0);
INSERT INTO `customer_copy1` VALUES (35, NULL, '测试客户档案修改111', '联系人1', '18363971268', 9, '河北省,唐山市', '详细地址', NULL, NULL, NULL, 28, NULL, NULL, NULL, NULL, '公司介绍111', NULL, 11385, '2024-10-15 11:22:53', 11386, '2025-02-17 09:45:06', 1);
INSERT INTO `customer_copy1` VALUES (36, NULL, '新建合同', '新建合同', '15900000000', 9, '河北省,邯郸市', '大名县', NULL, NULL, NULL, 30, NULL, NULL, NULL, NULL, '第三方大是大非水电费', NULL, 11412, '2024-10-15 16:39:46', 11386, '2025-02-19 14:56:32', 1);
INSERT INTO `customer_copy1` VALUES (37, NULL, '青岛EDA中心', '邹晓栋', '13791909618', 8, NULL, '青岛市崂山区松岭路163号', 17, 23, NULL, 27, NULL, NULL, NULL, NULL, NULL, NULL, 11417, '2024-10-17 10:31:16', NULL, '2025-02-12 10:06:02', 1);
INSERT INTO `customer_copy1` VALUES (38, NULL, '中科芯云微电子科技有限公司', '邹晓栋', '13791909618', 9, NULL, '青岛市崂山区松岭路163号', 17, 23, NULL, 27, NULL, NULL, NULL, NULL, NULL, NULL, 11417, '2024-10-17 11:21:39', NULL, NULL, 0);
INSERT INTO `customer_copy1` VALUES (39, NULL, '测试', '测试111', '17661048266', 8, '北京市,东城区', '12312312', NULL, NULL, NULL, 27, NULL, NULL, NULL, NULL, '123123', NULL, 11416, '2024-10-17 14:27:06', 11386, '2025-02-18 14:53:34', 0);
INSERT INTO `customer_copy1` VALUES (40, NULL, '微服务1', 'sxp', '13791909618', 8, NULL, NULL, 17, 23, NULL, 27, NULL, NULL, NULL, NULL, NULL, NULL, 11417, '2024-10-17 15:08:30', NULL, NULL, 0);
INSERT INTO `customer_copy1` VALUES (41, NULL, '微服务2', 'sxp', '13791909618', 8, NULL, NULL, 17, 23, NULL, 27, NULL, NULL, NULL, NULL, NULL, NULL, 11417, '2024-10-17 15:08:30', NULL, NULL, 0);
INSERT INTO `customer_copy1` VALUES (42, NULL, '微服务3', 'sxp', '13791909618', 8, NULL, NULL, 17, 23, NULL, 27, NULL, NULL, NULL, NULL, NULL, NULL, 11417, '2024-10-17 15:08:30', NULL, NULL, 0);
INSERT INTO `customer_copy1` VALUES (43, NULL, '微服务', 'sxp', '13791909618', 8, NULL, NULL, 17, 23, NULL, 27, NULL, NULL, NULL, NULL, NULL, NULL, 11417, '2024-10-17 15:08:30', NULL, NULL, 0);
INSERT INTO `customer_copy1` VALUES (44, NULL, 'sxp', 'sxp', '13791909618', 8, NULL, NULL, 17, 23, NULL, 27, NULL, NULL, NULL, NULL, NULL, NULL, 11417, '2024-10-17 15:23:35', NULL, NULL, 0);
INSERT INTO `customer_copy1` VALUES (45, NULL, '青岛EDA中心1', '邹晓栋', '13791909618', 8, NULL, '青岛市崂山区松岭路163号', 17, 23, NULL, 27, NULL, NULL, NULL, NULL, NULL, NULL, 11417, '2024-10-17 15:36:32', NULL, NULL, 0);
INSERT INTO `customer_copy1` VALUES (46, NULL, '青岛EDA中心2', 'aaa', '13791909619', 8, NULL, '青岛市崂山区松岭路164号', 17, 23, NULL, 27, NULL, NULL, NULL, NULL, NULL, NULL, 11417, '2024-10-17 15:36:32', NULL, NULL, 0);
INSERT INTO `customer_copy1` VALUES (47, NULL, '青岛EDA中心3', 'aaa1', '13791909620', 8, NULL, '青岛市崂山区松岭路165号', 17, 23, NULL, 27, NULL, NULL, NULL, NULL, NULL, NULL, 11417, '2024-10-17 15:36:32', NULL, NULL, 0);
INSERT INTO `customer_copy1` VALUES (48, NULL, '青岛EDA中心4', 'aaa2', '13791909621', 8, NULL, '青岛市崂山区松岭路166号', 17, 23, NULL, 27, NULL, NULL, NULL, NULL, NULL, NULL, 11417, '2024-10-17 15:36:32', NULL, NULL, 0);
INSERT INTO `customer_copy1` VALUES (49, 59, '测试1', '沈相樸', '18363971268', 10, '河北省,邯郸市', '佛山市的方法', NULL, NULL, NULL, 30, NULL, NULL, NULL, NULL, '介绍', NULL, 11417, '2024-10-18 09:19:27', 11386, '2025-07-04 10:58:24', 0);
INSERT INTO `customer_copy1` VALUES (50, NULL, '第一个', '联系人', '18200000000', 9, '河北省,邯郸市', '是的冯绍峰非法所得', NULL, NULL, NULL, 27, NULL, NULL, NULL, NULL, '似懂非懂方式放大', NULL, 11417, '2024-10-18 17:09:32', 11386, '2025-02-14 15:50:13', 1);
INSERT INTO `customer_copy1` VALUES (51, NULL, '测试客户信息', 'sxp', '18363971222', 10, '天津市,河东区', '详细地址', NULL, NULL, NULL, 28, NULL, NULL, NULL, NULL, 'ddddd', NULL, 11385, '2024-10-22 09:55:05', NULL, '2024-10-22 09:55:05', 0);
INSERT INTO `customer_copy1` VALUES (52, 66, '测试线索', '水水水水', '18363971268', 9, '天津市,河东区', 'ddddd', NULL, NULL, NULL, 29, NULL, NULL, NULL, NULL, 'ddd', NULL, 11385, '2024-10-22 15:37:57', 11386, '2025-02-17 09:43:43', 0);
INSERT INTO `customer_copy1` VALUES (53, 42, 'cesh', 'sss', '18363971222', 12, '天津市,河东区', 'cehss', NULL, NULL, NULL, 30, NULL, NULL, NULL, NULL, 'ddddd', NULL, 11385, '2024-10-22 15:40:31', 11386, '2025-02-18 14:49:30', 0);
INSERT INTO `customer_copy1` VALUES (54, NULL, '青岛微电子创新中心', '邹晓栋', '13791909618', 9, NULL, '山东省青岛市崂山区松岭路163号', NULL, NULL, NULL, 27, NULL, NULL, NULL, NULL, NULL, NULL, 11385, '2024-10-24 16:00:49', NULL, '2024-10-24 16:00:49', 0);
INSERT INTO `customer_copy1` VALUES (59, NULL, '客户名称', '客户名称', '15800000000', 9, '河北省,唐山市', '水电费水电费手打', NULL, NULL, NULL, 28, NULL, NULL, NULL, NULL, '水电费水电费发多少', NULL, 11386, '2024-10-31 18:16:12', NULL, '2024-10-31 18:16:12', 0);
INSERT INTO `customer_copy1` VALUES (63, NULL, '中科芯云555', NULL, NULL, 9, NULL, '山东省青岛市崂山区松岭路163号', NULL, NULL, NULL, 27, NULL, NULL, NULL, NULL, NULL, NULL, 11386, '2024-10-31 18:35:02', NULL, '2024-10-31 18:35:02', 0);
INSERT INTO `customer_copy1` VALUES (64, NULL, '中科芯云微电子科技有限公司444', '邹晓栋', '13791909618', 9, NULL, '山东省青岛市崂山区松岭路163号', NULL, NULL, NULL, 27, NULL, NULL, NULL, NULL, NULL, NULL, 11386, '2024-11-01 14:53:54', NULL, '2024-11-01 14:53:54', 0);
INSERT INTO `customer_copy1` VALUES (65, NULL, '测试客户信息1', 'sxp', '18363971268', 9, '天津市,河东区', '详细地址', NULL, NULL, NULL, 29, NULL, NULL, NULL, NULL, '测距欧式', NULL, 11386, '2025-02-14 14:21:10', 11386, '2025-07-04 14:43:34', 0);
INSERT INTO `customer_copy1` VALUES (66, NULL, '测试联系方式', 'sxp', 'webchat', 9, '北京市,东城区', '详细地址', NULL, NULL, NULL, 28, NULL, NULL, NULL, NULL, '介绍介绍', NULL, 11386, '2025-02-14 15:21:19', 11386, '2025-07-04 14:43:30', 0);
INSERT INTO `customer_copy1` VALUES (67, 34, '测试2', '测试2', '18363971262', 9, '北京市,西城区', 'sfsdf', NULL, NULL, NULL, 28, NULL, NULL, NULL, NULL, 'sdfsd', NULL, 11386, '2025-02-14 16:50:34', 11386, '2025-02-24 11:32:07', 0);
INSERT INTO `customer_copy1` VALUES (68, NULL, 'test', 'test', '123222222222222', 9, '北京市,东城区', '详细信息', NULL, NULL, NULL, 29, NULL, NULL, NULL, NULL, '对对对对对对', NULL, 11386, '2025-02-17 10:50:58', 11386, '2025-02-18 09:01:25', 0);
INSERT INTO `customer_copy1` VALUES (69, 49, 'sdfsdf', 'sss', '18236971256', 8, '天津市,河东区', 'sssss', NULL, NULL, NULL, 28, NULL, NULL, NULL, NULL, 'ssss', NULL, 11386, '2025-02-17 11:04:24', 11386, '2025-02-18 14:50:27', 0);
INSERT INTO `customer_copy1` VALUES (70, 48, 'testDel', 'sxp1', '18363971268', 9, '北京市,东城区', 'test', NULL, NULL, NULL, 27, NULL, NULL, NULL, NULL, 'stes', NULL, 11386, '2025-02-18 14:47:13', 11386, '2025-02-18 14:49:59', 0);
INSERT INTO `customer_copy1` VALUES (71, 57, 'testdfsdfsdf', 'test', '18363971225', 10, '天津市,河东区', 'test', NULL, NULL, NULL, 28, NULL, NULL, NULL, NULL, 'test', NULL, 11386, '2025-07-04 14:27:26', NULL, '2025-07-04 14:27:26', 0);

-- ----------------------------
-- Table structure for customer_copy2
-- ----------------------------
DROP TABLE IF EXISTS `customer_copy2`;
CREATE TABLE `customer_copy2`  (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `clue_id` bigint NULL DEFAULT NULL COMMENT '如果是线索转客户，则关联来源线索id',
  `type` tinyint NULL DEFAULT NULL COMMENT '1=客户 2=供应商',
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
  `supplier_type_id` int NULL DEFAULT NULL COMMENT '供应商类型id-详见字典表',
  `cooperation_type_id` int NULL DEFAULT NULL COMMENT '合作类型id-详见字典表',
  `track_user_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '跟踪人用户名称',
  `remark` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT '公司介绍',
  `note` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '备注信息',
  `status` int NULL DEFAULT NULL COMMENT '状态：1-启用 2-停用',
  `create_by` bigint NULL DEFAULT NULL COMMENT '创建人id',
  `create_at` datetime NULL DEFAULT NULL COMMENT '创建时间',
  `update_by` bigint NULL DEFAULT NULL COMMENT '更新人id',
  `update_at` datetime NULL DEFAULT NULL COMMENT '更新时间',
  `del_flag` int NULL DEFAULT 0 COMMENT '0-正常 1-已删除',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 73 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '客户表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of customer_copy2
-- ----------------------------
INSERT INTO `customer_copy2` VALUES (12, NULL, 1, '测试客户名称', '添加联系人', '18363971268', 9, '天津市,河东区', '测试详细地址', NULL, NULL, NULL, 30, 35, NULL, NULL, NULL, NULL, NULL, NULL, '公司介绍', NULL, NULL, NULL, NULL, NULL, '2024-10-10 13:49:39', 1);
INSERT INTO `customer_copy2` VALUES (13, NULL, 1, '测试1', '测试1', '18363971268', 9, '河北省,秦皇岛市', '测试详细', NULL, NULL, NULL, 29, 36, NULL, NULL, NULL, NULL, NULL, NULL, '测试公司介绍', NULL, NULL, NULL, NULL, NULL, '2024-10-10 13:52:49', 1);
INSERT INTO `customer_copy2` VALUES (14, NULL, 1, '测试2', 'sx', '18363971262', 10, '河北省,唐山市', 'ceshi ', NULL, NULL, 60, 29, 34, NULL, NULL, NULL, NULL, NULL, NULL, 'jieshao', NULL, NULL, NULL, NULL, NULL, '2024-10-10 13:52:05', 1);
INSERT INTO `customer_copy2` VALUES (15, NULL, 1, '测试1', 'sxp', '18363971268', 10, '河北省,秦皇岛市', '详细地址信息', NULL, NULL, 60, 28, 37, NULL, NULL, NULL, NULL, NULL, NULL, '公司介绍对对对对对对的点点滴滴哒哒哒哒哒哒哒哒哒哒哒', NULL, NULL, 11385, '2024-10-10 14:03:44', NULL, '2024-10-17 14:11:54', 1);
INSERT INTO `customer_copy2` VALUES (16, NULL, 1, '测试123123123', 'sxp123', '18363971212', 9, '河北省,唐山市', '详细地址', NULL, NULL, 60, 28, 35, NULL, NULL, NULL, NULL, NULL, NULL, '公司介绍', NULL, NULL, 11385, '2024-10-16 11:18:18', NULL, '2024-10-16 11:20:41', 1);
INSERT INTO `customer_copy2` VALUES (17, NULL, 1, '测试123123123', 'sxp', '1111111111', 9, '河北省,唐山市', '详细地址', NULL, NULL, 60, 28, 35, NULL, NULL, NULL, NULL, NULL, NULL, '公司介绍', NULL, NULL, NULL, NULL, NULL, '2024-10-16 11:20:47', 1);
INSERT INTO `customer_copy2` VALUES (18, NULL, 1, '测试123123123', 'sxp', '1111111111', 9, '河北省,唐山市', '详细地址', NULL, NULL, 60, 28, 35, NULL, NULL, NULL, NULL, NULL, NULL, '公司介绍', NULL, NULL, NULL, NULL, NULL, '2024-10-15 11:14:45', 1);
INSERT INTO `customer_copy2` VALUES (19, NULL, 1, '测试123123123', 'sxp', '1111111111', 9, '河北省,唐山市', '详细地址', NULL, NULL, 60, 28, 35, NULL, NULL, NULL, NULL, NULL, NULL, '公司介绍', NULL, NULL, NULL, NULL, NULL, '2024-10-15 11:14:47', 1);
INSERT INTO `customer_copy2` VALUES (20, NULL, 1, '测试123123123', 'sxp', '1111111111', 9, '河北省,唐山市', '详细地址', NULL, NULL, 60, 28, 35, NULL, NULL, NULL, NULL, NULL, NULL, '公司介绍', NULL, NULL, NULL, NULL, NULL, '2024-10-15 11:14:49', 1);
INSERT INTO `customer_copy2` VALUES (21, NULL, 1, '测试123123123', 'sxp', '1111111111', 9, '河北省,唐山市', '详细地址', NULL, NULL, 60, 28, 35, NULL, NULL, NULL, NULL, NULL, NULL, '公司介绍', NULL, NULL, NULL, NULL, NULL, '2024-10-15 11:14:51', 1);
INSERT INTO `customer_copy2` VALUES (22, NULL, 1, '测试123123123', 'sxp', '1111111111', 9, '河北省,唐山市', '详细地址', NULL, NULL, 60, 28, 35, NULL, NULL, NULL, NULL, NULL, NULL, '公司介绍', NULL, NULL, NULL, NULL, NULL, '2024-10-17 13:54:54', 1);
INSERT INTO `customer_copy2` VALUES (23, NULL, 1, '测试123123123', 'sxp', '1111111111', 9, '河北省,唐山市', '详细地址', NULL, NULL, 60, 28, 35, NULL, NULL, NULL, NULL, NULL, NULL, '公司介绍', NULL, NULL, NULL, NULL, NULL, '2024-10-17 13:54:52', 1);
INSERT INTO `customer_copy2` VALUES (24, NULL, 1, '测试123123123', 'sxp', '1111111111', 9, '河北省,唐山市', '详细地址', NULL, NULL, 60, 28, 35, NULL, NULL, NULL, NULL, NULL, NULL, '公司介绍', NULL, NULL, NULL, NULL, NULL, '2024-10-17 13:54:50', 1);
INSERT INTO `customer_copy2` VALUES (25, NULL, 1, '测试123123123', 'sxp', '1111111111', 9, '河北省,唐山市', '详细地址', NULL, NULL, 60, 28, 35, NULL, NULL, NULL, NULL, NULL, NULL, '公司介绍', NULL, NULL, NULL, NULL, 11385, '2024-10-17 13:54:48', 1);
INSERT INTO `customer_copy2` VALUES (26, NULL, 1, '测试123123123', 'sxp', '1111111111', 9, '河北省,唐山市', '详细地址', NULL, NULL, 60, 28, 35, NULL, NULL, NULL, NULL, NULL, NULL, '公司介绍', NULL, NULL, NULL, NULL, NULL, '2024-10-17 13:54:47', 1);
INSERT INTO `customer_copy2` VALUES (27, NULL, 1, '测试123123123', 'sxp', '1111111111', 9, '河北省,唐山市', '详细地址', NULL, NULL, 60, 28, 35, NULL, NULL, NULL, NULL, NULL, NULL, '公司介绍', NULL, NULL, NULL, NULL, NULL, '2024-10-17 13:54:45', 1);
INSERT INTO `customer_copy2` VALUES (28, NULL, 1, '第一个', '联系人', '18200000000', 9, '山西省,长治市', '是的冯绍峰非法所得', NULL, NULL, 54, 27, 37, NULL, NULL, NULL, NULL, NULL, NULL, '似懂非懂方式放大', NULL, NULL, NULL, NULL, 11386, '2025-02-14 15:53:25', 0);
INSERT INTO `customer_copy2` VALUES (29, 17, 2, '测试哈哈哈', 'sxp', '18363971268', 10, '天津市,河东区', '测试哈哈哈', NULL, NULL, NULL, 29, 36, NULL, NULL, NULL, NULL, NULL, NULL, 'ddddddd', NULL, NULL, 11385, '2024-10-12 15:20:33', 11385, '2025-11-21 09:21:13', 0);
INSERT INTO `customer_copy2` VALUES (30, NULL, 1, '崂山区政府', '邹晓栋', '13791909618', 11, '山东省,青岛市', '青岛市崂山区松岭路163号', 18, 23, 54, 27, 38, NULL, 46, NULL, NULL, NULL, NULL, '公司简介', NULL, NULL, NULL, NULL, 11386, '2025-07-04 13:57:25', 0);
INSERT INTO `customer_copy2` VALUES (31, NULL, 1, '崂山区政府办公厅', '邹晓栋', '13791909618', 11, '山东省,青岛市', '青岛市崂山区松岭路163号', 18, 23, 54, 27, 38, NULL, 46, NULL, NULL, NULL, NULL, '公司简介', NULL, NULL, 11412, '2024-10-12 19:12:28', 11386, '2025-01-24 11:23:01', 0);
INSERT INTO `customer_copy2` VALUES (32, NULL, 1, '续费客户', '续费客户', '19900000000', 10, '河北省,邯郸市', '大名县', NULL, NULL, 55, 28, 34, NULL, NULL, NULL, NULL, NULL, NULL, '主要干', NULL, NULL, 11412, '2024-10-14 09:35:18', NULL, '2024-10-14 09:35:18', 0);
INSERT INTO `customer_copy2` VALUES (33, NULL, 1, '采购客户', '采购客户', '19800000000', 12, '山东省,青岛市', '崂山区国际创新园', NULL, NULL, 56, 31, 38, NULL, NULL, NULL, NULL, NULL, NULL, '及设计销售服务于一体', NULL, NULL, 11412, '2024-10-14 09:37:20', NULL, '2024-10-14 09:37:20', 0);
INSERT INTO `customer_copy2` VALUES (34, NULL, 1, '续费客户', '续费客户', '19900000000', 9, '河北省,邯郸市', '大名县', NULL, NULL, 55, 28, 34, NULL, NULL, NULL, NULL, NULL, NULL, '递四方速递丰富的', NULL, NULL, 11412, '2024-10-14 16:48:51', NULL, '2024-10-14 16:48:51', 0);
INSERT INTO `customer_copy2` VALUES (35, NULL, 1, '测试客户档案修改111', '联系人1', '18363971268', 9, '河北省,唐山市', '详细地址', NULL, NULL, NULL, 28, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '公司介绍111', NULL, NULL, 11385, '2024-10-15 11:22:53', 11386, '2025-02-17 09:45:06', 1);
INSERT INTO `customer_copy2` VALUES (36, NULL, 1, '新建合同', '新建合同', '15900000000', 9, '河北省,邯郸市', '大名县', NULL, NULL, NULL, 30, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '第三方大是大非水电费', NULL, NULL, 11412, '2024-10-15 16:39:46', 11386, '2025-02-19 14:56:32', 1);
INSERT INTO `customer_copy2` VALUES (37, NULL, 2, '青岛EDA中心', '邹晓栋', '13791909618', 8, NULL, '青岛市崂山区松岭路163号', 17, 23, NULL, 27, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 11417, '2024-10-17 10:31:16', NULL, '2025-02-12 10:06:02', 1);
INSERT INTO `customer_copy2` VALUES (38, NULL, 1, '中科芯云微电子科技有限公司', '邹晓栋', '13791909618', 9, NULL, '青岛市崂山区松岭路163号', 17, 23, NULL, 27, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 11417, '2024-10-17 11:21:39', NULL, NULL, 0);
INSERT INTO `customer_copy2` VALUES (39, NULL, 1, '测试', '测试111', '17661048266', 8, '北京市,东城区', '12312312', NULL, NULL, NULL, 27, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '123123', NULL, NULL, 11416, '2024-10-17 14:27:06', 11386, '2025-02-18 14:53:34', 0);
INSERT INTO `customer_copy2` VALUES (40, NULL, 1, '微服务1', 'sxp', '13791909618', 8, NULL, NULL, 17, 23, NULL, 27, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 11417, '2024-10-17 15:08:30', NULL, NULL, 0);
INSERT INTO `customer_copy2` VALUES (41, NULL, 1, '微服务2', 'sxp', '13791909618', 8, NULL, NULL, 17, 23, NULL, 27, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 11417, '2024-10-17 15:08:30', NULL, NULL, 0);
INSERT INTO `customer_copy2` VALUES (42, NULL, 1, '微服务3', 'sxp', '13791909618', 8, NULL, NULL, 17, 23, NULL, 27, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 11417, '2024-10-17 15:08:30', NULL, NULL, 0);
INSERT INTO `customer_copy2` VALUES (43, NULL, 1, '微服务', 'sxp', '13791909618', 8, NULL, NULL, 17, 23, NULL, 27, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 11417, '2024-10-17 15:08:30', NULL, NULL, 0);
INSERT INTO `customer_copy2` VALUES (44, NULL, 1, 'sxp', 'sxp', '13791909618', 8, NULL, NULL, 17, 23, NULL, 27, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 11417, '2024-10-17 15:23:35', NULL, NULL, 0);
INSERT INTO `customer_copy2` VALUES (45, NULL, 1, '青岛EDA中心1', '邹晓栋', '13791909618', 8, NULL, '青岛市崂山区松岭路163号', 17, 23, NULL, 27, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 11417, '2024-10-17 15:36:32', NULL, NULL, 0);
INSERT INTO `customer_copy2` VALUES (46, NULL, 1, '青岛EDA中心2', 'aaa', '13791909619', 8, NULL, '青岛市崂山区松岭路164号', 17, 23, NULL, 27, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 11417, '2024-10-17 15:36:32', NULL, NULL, 0);
INSERT INTO `customer_copy2` VALUES (47, NULL, 1, '青岛EDA中心3', 'aaa1', '13791909620', 8, NULL, '青岛市崂山区松岭路165号', 17, 23, NULL, 27, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 11417, '2024-10-17 15:36:32', NULL, NULL, 0);
INSERT INTO `customer_copy2` VALUES (48, NULL, 1, '青岛EDA中心4', 'aaa2', '13791909621', 8, NULL, '青岛市崂山区松岭路166号', 17, 23, NULL, 27, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 11417, '2024-10-17 15:36:32', NULL, NULL, 0);
INSERT INTO `customer_copy2` VALUES (49, 59, 1, '测试1', '沈相樸', '18363971268', 10, '河北省,邯郸市', '佛山市的方法', NULL, NULL, NULL, 30, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '介绍', NULL, NULL, 11417, '2024-10-18 09:19:27', 11386, '2025-07-04 10:58:24', 0);
INSERT INTO `customer_copy2` VALUES (50, NULL, 2, '第一个', '联系人', '18200000000', 9, '河北省,邯郸市', '是的冯绍峰非法所得', NULL, NULL, NULL, 27, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '似懂非懂方式放大', NULL, NULL, 11417, '2024-10-18 17:09:32', 11386, '2025-02-14 15:50:13', 1);
INSERT INTO `customer_copy2` VALUES (51, NULL, 1, '测试客户信息', 'sxp', '18363971222', 10, '天津市,河东区', '详细地址', NULL, NULL, NULL, 28, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'ddddd', NULL, NULL, 11385, '2024-10-22 09:55:05', NULL, '2024-10-22 09:55:05', 0);
INSERT INTO `customer_copy2` VALUES (52, 66, 2, '测试线索', '水水水水', '18363971268', 9, '天津市,河东区', 'ddddd', NULL, NULL, NULL, 29, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'ddd', NULL, NULL, 11385, '2024-10-22 15:37:57', 11386, '2025-02-17 09:43:43', 0);
INSERT INTO `customer_copy2` VALUES (53, 42, 2, 'cesh', 'sss', '18363971222', 12, '天津市,河东区', 'cehss', NULL, NULL, NULL, 30, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'ddddd', NULL, NULL, 11385, '2024-10-22 15:40:31', 11386, '2025-02-18 14:49:30', 0);
INSERT INTO `customer_copy2` VALUES (54, NULL, 2, '青岛微电子创新中心', '邹晓栋', '13791909618', 9, NULL, '山东省青岛市崂山区松岭路163号', NULL, NULL, NULL, 27, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 11385, '2024-10-24 16:00:49', NULL, '2024-10-24 16:00:49', 0);
INSERT INTO `customer_copy2` VALUES (59, NULL, 1, '客户名称', '客户名称', '15800000000', 9, '河北省,唐山市', '水电费水电费手打', NULL, NULL, NULL, 28, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '水电费水电费发多少', NULL, NULL, 11386, '2024-10-31 18:16:12', NULL, '2024-10-31 18:16:12', 0);
INSERT INTO `customer_copy2` VALUES (63, NULL, 1, '中科芯云555', NULL, NULL, 9, NULL, '山东省青岛市崂山区松岭路163号', NULL, NULL, NULL, 27, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 11386, '2024-10-31 18:35:02', NULL, '2024-10-31 18:35:02', 0);
INSERT INTO `customer_copy2` VALUES (64, NULL, 1, '中科芯云微电子科技有限公司444', '邹晓栋', '13791909618', 9, NULL, '山东省青岛市崂山区松岭路163号', NULL, NULL, NULL, 27, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 11386, '2024-11-01 14:53:54', NULL, '2024-11-01 14:53:54', 0);
INSERT INTO `customer_copy2` VALUES (65, NULL, 1, '测试客户信息1', 'sxp', '18363971268', 9, '天津市,河东区', '详细地址', NULL, NULL, NULL, 29, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '测距欧式', NULL, NULL, 11386, '2025-02-14 14:21:10', 11386, '2025-07-04 14:43:34', 0);
INSERT INTO `customer_copy2` VALUES (66, NULL, 1, '测试联系方式', 'sxp', 'webchat', 9, '北京市,东城区', '详细地址', NULL, NULL, NULL, 28, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '介绍介绍', NULL, NULL, 11386, '2025-02-14 15:21:19', 11385, '2025-11-17 14:02:49', 0);
INSERT INTO `customer_copy2` VALUES (67, 34, 1, '测试2', '测试2', '18363971262', 9, '北京市,西城区', 'sfsdf', NULL, NULL, NULL, 28, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'sdfsd', NULL, NULL, 11386, '2025-02-14 16:50:34', 11386, '2025-02-24 11:32:07', 0);
INSERT INTO `customer_copy2` VALUES (68, NULL, 2, 'test', 'test', '123222222222222', 9, '北京市,东城区', '详细信息', NULL, NULL, NULL, 29, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '对对对对对对', NULL, NULL, 11386, '2025-02-17 10:50:58', 11386, '2025-02-18 09:01:25', 0);
INSERT INTO `customer_copy2` VALUES (69, 49, 1, 'sdfsdf', 'sss', '18236971256', 8, '天津市,河东区', 'sssss', NULL, NULL, NULL, 28, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'ssss', NULL, NULL, 11386, '2025-02-17 11:04:24', 11386, '2025-02-18 14:50:27', 0);
INSERT INTO `customer_copy2` VALUES (70, 48, 1, 'testDel', 'sxp1', '18363971268', 9, '北京市,东城区', 'test', NULL, NULL, NULL, 27, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'stes', NULL, NULL, 11386, '2025-02-18 14:47:13', 11385, '2025-11-17 14:02:30', 0);
INSERT INTO `customer_copy2` VALUES (71, 57, 1, 'testdfsdfsdf', 'test', '18363971225', 10, '天津市,河东区', 'test', NULL, NULL, NULL, 28, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'test', NULL, NULL, 11386, '2025-07-04 14:27:26', NULL, '2025-07-04 14:27:26', 0);
INSERT INTO `customer_copy2` VALUES (72, 0, 2, '第一供应商', '刘', '19877777777', 8, '北京市,东城区', '天安门广场', 0, 0, 0, 27, 36, 'string', 0, '2025-11-12', 74, 81, NULL, '公司介绍nb', 'string', 0, 11385, '2025-11-12 16:21:15', 11385, '2025-11-12 16:21:15', 0);

-- ----------------------------
-- Table structure for customer_follow_up
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
) ENGINE = InnoDB AUTO_INCREMENT = 49 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '客户/供应商跟进' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of customer_follow_up
-- ----------------------------
INSERT INTO `customer_follow_up` VALUES (12, 17, 11385, '测试内容', 24, '2024-09-02', 44, 49, NULL, NULL, 11385, '2024-09-29 17:11:36', NULL, '2024-09-29 17:11:36', 0);
INSERT INTO `customer_follow_up` VALUES (13, 17, 11385, '测试内容', 24, '2024-09-02', 44, 49, NULL, NULL, 11385, '2024-09-29 17:13:24', NULL, '2024-09-29 17:13:24', 0);
INSERT INTO `customer_follow_up` VALUES (14, 17, 11385, '跟进内容test', NULL, NULL, NULL, 49, NULL, NULL, 11385, '2024-09-29 17:14:44', NULL, '2024-09-29 17:14:44', 0);
INSERT INTO `customer_follow_up` VALUES (15, 19, 11385, 'ceshigegjin', 22, NULL, NULL, 50, NULL, NULL, 11385, '2024-09-30 17:15:13', NULL, '2024-09-30 17:15:13', 0);
INSERT INTO `customer_follow_up` VALUES (16, 22, 11385, '测试跟进', 22, '2024-10-08', 44, 50, NULL, NULL, 11385, '2024-10-08 08:57:21', NULL, '2024-10-08 08:57:21', 0);
INSERT INTO `customer_follow_up` VALUES (17, 22, 11385, 'CEHSI', NULL, NULL, NULL, 50, NULL, NULL, 11385, '2024-10-12 14:43:06', NULL, '2024-10-12 14:43:06', 0);
INSERT INTO `customer_follow_up` VALUES (18, 35, 11385, '测试', 23, '2024-10-15', NULL, 50, NULL, NULL, 11385, '2024-10-15 15:01:50', NULL, '2024-10-15 15:01:50', 0);
INSERT INTO `customer_follow_up` VALUES (19, 36, 11386, '跟进中', NULL, NULL, NULL, 48, NULL, NULL, 11386, '2024-10-17 09:50:41', NULL, '2024-10-17 09:50:41', 0);
INSERT INTO `customer_follow_up` VALUES (20, 59, 11386, '这个客户不行', 23, '2024-10-18', 44, 48, NULL, NULL, 11386, '2024-10-18 09:44:29', NULL, '2024-10-18 09:44:32', 0);
INSERT INTO `customer_follow_up` VALUES (21, 35, 11417, '测试', 23, NULL, NULL, 49, NULL, NULL, 11417, '2024-10-18 15:40:07', NULL, '2024-10-18 15:40:07', 0);
INSERT INTO `customer_follow_up` VALUES (22, 43, 11385, '测试', 23, NULL, NULL, 49, NULL, NULL, 11417, '2025-02-17 10:03:03', NULL, '2024-10-18 15:40:07', 0);
INSERT INTO `customer_follow_up` VALUES (23, 49, 11386, 'ceshi', NULL, NULL, NULL, 49, NULL, NULL, 11386, '2025-02-17 10:19:02', NULL, '2025-02-17 10:19:02', 0);
INSERT INTO `customer_follow_up` VALUES (24, 28, 11385, '123123', NULL, '2025-11-19', 92, 50, NULL, NULL, 11385, '2025-11-18 17:00:26', NULL, '2025-11-18 17:00:26', 0);
INSERT INTO `customer_follow_up` VALUES (25, 29, 11385, 'test', NULL, '2025-11-12', 92, 48, NULL, NULL, 11385, '2025-11-18 17:01:59', NULL, '2025-11-18 17:01:59', 0);
INSERT INTO `customer_follow_up` VALUES (26, 29, 11385, 'test', NULL, '2025-11-12', 92, 48, NULL, NULL, 11385, '2025-11-18 17:02:43', NULL, '2025-11-18 17:02:43', 0);
INSERT INTO `customer_follow_up` VALUES (27, 29, 11385, 'test', NULL, '2025-11-12', 92, 48, NULL, NULL, 11385, '2025-11-18 17:03:25', NULL, '2025-11-18 17:03:25', 0);
INSERT INTO `customer_follow_up` VALUES (28, 29, 11385, 'test', NULL, '2025-11-12', 92, 48, NULL, NULL, 11385, '2025-11-18 17:04:10', NULL, '2025-11-18 17:04:10', 0);
INSERT INTO `customer_follow_up` VALUES (29, 29, 11385, 'test', NULL, '2025-11-12', 93, 48, NULL, NULL, 11385, '2025-11-18 17:04:41', NULL, '2025-11-18 17:04:41', 0);
INSERT INTO `customer_follow_up` VALUES (30, 29, 11385, 'eqwe', NULL, '2025-11-18', 93, 50, NULL, NULL, 11385, '2025-11-18 17:06:00', NULL, '2025-11-18 17:06:00', 0);
INSERT INTO `customer_follow_up` VALUES (31, 30, 11385, 'eqwe', NULL, '2025-11-18', 93, 50, NULL, NULL, 11385, '2025-11-18 17:06:34', NULL, '2025-11-18 17:06:34', 0);
INSERT INTO `customer_follow_up` VALUES (32, 72, 11385, 'test', NULL, '2025-11-20', 98, 50, NULL, NULL, 11385, '2025-11-19 14:59:35', NULL, '2025-11-19 14:59:35', 0);
INSERT INTO `customer_follow_up` VALUES (33, 72, 11385, 'dfadf', NULL, '2025-11-12', 95, 51, NULL, NULL, 11385, '2025-11-19 15:17:01', NULL, '2025-11-19 15:17:01', 0);
INSERT INTO `customer_follow_up` VALUES (34, 72, 11385, 'aersdf', NULL, '2025-11-11', 97, 50, NULL, NULL, 11385, '2025-11-19 15:23:53', NULL, '2025-11-19 15:23:53', 0);
INSERT INTO `customer_follow_up` VALUES (35, 72, 11385, 'aersdf', NULL, '2025-11-11', 97, 50, NULL, NULL, 11385, '2025-11-19 15:24:58', NULL, '2025-11-19 15:24:58', 0);
INSERT INTO `customer_follow_up` VALUES (36, 72, 11385, 'aersdf', NULL, '2025-11-11', 97, 50, NULL, NULL, 11385, '2025-11-19 15:25:59', NULL, '2025-11-19 15:25:59', 0);
INSERT INTO `customer_follow_up` VALUES (37, 72, 11385, 'aersdf', NULL, '2025-11-11', 97, 50, NULL, NULL, 11385, '2025-11-19 15:26:06', NULL, '2025-11-19 15:26:06', 0);
INSERT INTO `customer_follow_up` VALUES (38, 72, 11385, 'dads', NULL, '2025-11-07', 97, 48, NULL, NULL, 11385, '2025-11-19 15:26:27', NULL, '2025-11-19 15:26:27', 0);
INSERT INTO `customer_follow_up` VALUES (39, 72, 11385, 'dads', NULL, '2025-11-07', 97, 48, NULL, NULL, 11385, '2025-11-19 15:26:34', NULL, '2025-11-19 15:26:34', 0);
INSERT INTO `customer_follow_up` VALUES (40, 72, 11385, 'dads', NULL, '2025-11-07', 97, 48, NULL, NULL, 11385, '2025-11-19 15:27:16', NULL, '2025-11-19 15:27:16', 0);
INSERT INTO `customer_follow_up` VALUES (41, 72, 11385, 'rewr', NULL, '2025-11-12', 97, 51, NULL, NULL, 11385, '2025-11-19 15:32:51', NULL, '2025-11-19 15:32:51', 0);
INSERT INTO `customer_follow_up` VALUES (42, 72, 11385, '123123123', NULL, '2025-11-18', 96, 48, NULL, NULL, 11385, '2025-11-19 15:34:12', NULL, '2025-11-19 15:34:12', 0);
INSERT INTO `customer_follow_up` VALUES (43, 72, 11385, '12esd', NULL, '2025-10-27', 96, 50, NULL, NULL, 11385, '2025-11-19 15:43:02', NULL, '2025-11-19 15:43:02', 0);
INSERT INTO `customer_follow_up` VALUES (44, 72, 11385, 'fsdf', NULL, '2025-11-10', 97, 51, NULL, NULL, 11385, '2025-11-19 15:51:42', NULL, '2025-11-19 15:51:42', 0);
INSERT INTO `customer_follow_up` VALUES (45, 72, 11385, 'sdfa', NULL, '2025-11-18', 97, 50, NULL, NULL, 11385, '2025-11-19 15:53:38', NULL, '2025-11-19 15:53:38', 0);
INSERT INTO `customer_follow_up` VALUES (46, 28, 11385, 'dfasdfa', NULL, '2025-11-11', 88, 48, NULL, NULL, 11385, '2025-11-19 16:12:27', NULL, '2025-11-19 16:12:27', 0);
INSERT INTO `customer_follow_up` VALUES (47, 28, 11385, 'fasdf', NULL, '2025-11-19', 89, 50, NULL, NULL, 11385, '2025-11-19 16:29:51', NULL, '2025-11-19 16:29:51', 0);
INSERT INTO `customer_follow_up` VALUES (48, 72, 11386, 'testdf', NULL, NULL, 87, 50, NULL, NULL, 11386, '2025-12-02 16:57:19', NULL, '2025-12-02 16:57:19', 0);

-- ----------------------------
-- Table structure for customer_liaison
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
) ENGINE = InnoDB AUTO_INCREMENT = 24 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '客户联系人' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of customer_liaison
-- ----------------------------
INSERT INTO `customer_liaison` VALUES (12, NULL, '添加联系人', '18363971268', '测试客户名称', '天津市,河东区', '测试详细地址', NULL, NULL, '公司介绍', NULL, NULL, NULL, NULL, '2024-10-10 13:49:39', 1);
INSERT INTO `customer_liaison` VALUES (13, NULL, '测试1', '18363971268', '测试1', '河北省,秦皇岛市', '测试详细', NULL, NULL, '测试公司介绍', NULL, NULL, NULL, NULL, '2024-10-10 13:52:49', 1);
INSERT INTO `customer_liaison` VALUES (14, NULL, 'sx', '18363971262', '测试2', '河北省,唐山市', 'ceshi ', NULL, NULL, 'jieshao', NULL, NULL, NULL, NULL, '2024-10-10 13:52:05', 1);
INSERT INTO `customer_liaison` VALUES (15, NULL, 'sxp', '18363971268', '测试1', '河北省,秦皇岛市', '详细地址信息', NULL, NULL, '公司介绍对对对对对对的点点滴滴哒哒哒哒哒哒哒哒哒哒哒', NULL, 11385, '2024-10-10 14:03:44', NULL, '2024-10-10 14:03:44', 0);
INSERT INTO `customer_liaison` VALUES (16, 35, 'sxp1231231', '18363971212', 'test', '1@136.com', 'cesh', '女', '是', NULL, NULL, 11385, '2024-10-16 11:18:18', 11385, '2024-10-16 11:18:18', 1);
INSERT INTO `customer_liaison` VALUES (17, 35, 'ceshi', '123456', 'ceshi', 'ceshi', 'ceshi', '男', '是', NULL, NULL, 11385, '2024-10-16 11:26:35', 11385, '2024-10-16 11:26:35', 0);
INSERT INTO `customer_liaison` VALUES (18, 35, '测试', '18723699741', 'sss', 'sss@123.com', '123123', '女', '否', NULL, NULL, 11385, '2024-10-23 15:40:31', NULL, '2024-10-23 15:40:31', 0);
INSERT INTO `customer_liaison` VALUES (19, 35, 'cesho ', '18363971264', 'sss', 'sssss@1.com', 'dd', '男', '是', NULL, NULL, 11385, '2024-10-23 15:43:17', 11386, '2024-10-23 15:43:17', 0);
INSERT INTO `customer_liaison` VALUES (20, 29, 'test', '18363971268', 'wechat', '123@qq.com', 'test', '男', '是', NULL, NULL, 11386, '2025-02-18 08:59:51', NULL, '2025-02-18 08:59:51', 0);
INSERT INTO `customer_liaison` VALUES (21, 28, 'test', '18363971268', '', 'shenxiangpu1@163.com', 'test', '女', '否', NULL, NULL, 11385, '2025-11-18 15:48:37', NULL, '2025-11-18 15:48:37', 0);
INSERT INTO `customer_liaison` VALUES (22, 28, 'test', '15366666666', '', 'sdfx@163.com', 'test', '女', '是', NULL, NULL, 11385, '2025-11-18 15:59:27', 11385, '2025-11-18 15:59:27', 0);
INSERT INTO `customer_liaison` VALUES (23, 72, 'test', '18363971268', 'sdf', 'sdfs@163.com', 'test', '男', '是', NULL, NULL, 11385, '2025-11-19 16:04:10', 11385, '2025-11-19 16:04:10', 1);

-- ----------------------------
-- Table structure for customer_tag
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
) ENGINE = InnoDB AUTO_INCREMENT = 12 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of customer_tag
-- ----------------------------
INSERT INTO `customer_tag` VALUES (1, '优秀客户', 1, 1, '2024-09-20 11:22:19', 1, '2024-09-20 11:22:23', 0);
INSERT INTO `customer_tag` VALUES (2, '良好客户', 1, 1, '2024-09-20 11:22:34', 1, '2024-09-20 11:22:38', 0);
INSERT INTO `customer_tag` VALUES (3, '中等客户', 1, 1, '2024-09-20 11:22:51', 1, '2024-09-20 11:22:55', 0);
INSERT INTO `customer_tag` VALUES (4, '下等客户', 1, 1, '2024-09-20 11:23:20', 1, '2024-09-20 11:23:24', 0);
INSERT INTO `customer_tag` VALUES (5, '雷猴子', 1, 1, '2024-09-20 11:23:33', 1, '2024-09-20 11:23:37', 0);
INSERT INTO `customer_tag` VALUES (6, '麻花钻', 1, 1, '2024-09-20 11:23:33', 1, '2024-09-20 11:23:37', 0);
INSERT INTO `customer_tag` VALUES (7, '菜鸡堵', 1, 1, '2024-09-20 11:23:33', 1, '2024-09-20 11:23:37', 0);
INSERT INTO `customer_tag` VALUES (8, '各个有', 1, 1, '2024-09-20 11:23:33', 1, '2024-09-20 11:23:37', 0);
INSERT INTO `customer_tag` VALUES (9, 'GG帮', 1, 1, '2024-09-20 11:23:33', 1, '2024-09-20 11:23:37', 0);
INSERT INTO `customer_tag` VALUES (10, 'TTT', 1, 1, '2024-09-20 11:23:33', 1, '2024-09-20 11:23:37', 0);
INSERT INTO `customer_tag` VALUES (11, '过水电费发光时代发撒', 1, 1, '2024-09-20 11:23:33', 1, '2024-09-20 11:23:37', 0);

-- ----------------------------
-- Table structure for disclosure_clue
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
) ENGINE = InnoDB AUTO_INCREMENT = 59 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '公海资源：客户线索资源' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of disclosure_clue
-- ----------------------------
INSERT INTO `disclosure_clue` VALUES (12, '添加线索名称', 'sxp', '18363971268', 13, '天津市,河东区', '松岭路222号', 18, 23, 29, 37, '多大发的,对对对', NULL, NULL, '测试上海市上海市', NULL, NULL, NULL, NULL, '2024-09-29 10:18:32', 1);
INSERT INTO `disclosure_clue` VALUES (13, '测试123123', 'sxp', '18363971268', 9, '河北省,唐山市', '测试详情地址', NULL, NULL, NULL, 36, '测试,法国梵蒂冈电饭锅,吃饭饭付', NULL, NULL, '备注', NULL, NULL, NULL, NULL, '2024-09-29 10:22:06', 1);
INSERT INTO `disclosure_clue` VALUES (14, '测线索名称', 'sxpdd', '18363971268', NULL, '', '', NULL, NULL, NULL, NULL, '', NULL, NULL, '', NULL, NULL, NULL, NULL, '2024-09-29 10:22:06', 1);
INSERT INTO `disclosure_clue` VALUES (15, '线索测试', 'sxpsxp', '18363971268', 10, '河北省,唐山市', '详细地址的点点滴滴', NULL, NULL, NULL, 37, '对对对,对对对', NULL, NULL, '备注对对对对对对的点点滴滴哒哒哒哒哒哒哒哒哒哒哒', NULL, NULL, NULL, NULL, '2024-09-29 10:22:46', 1);
INSERT INTO `disclosure_clue` VALUES (16, 'xiansuo', 'sxp', '18363970136', 9, '河北省,秦皇岛市', '详细地址测试', 19, 25, 28, 36, 'ceshi,dfsdf', NULL, NULL, 'beizhu', NULL, NULL, NULL, NULL, NULL, 0);
INSERT INTO `disclosure_clue` VALUES (17, '测试线索名称', 'sxp', '18363971268', 9, '天津市,河东区', '详细地址', 18, 24, 29, 36, '对对对,对对对地方,撒旦法', 44, '2024-09-02', '备注', NULL, 11385, NULL, 11385, '2024-10-12 16:33:49', 1);
INSERT INTO `disclosure_clue` VALUES (18, 'ceshi', 'sxpsss', '18363971268', 9, '北京市,东城区', '', NULL, 24, NULL, NULL, '', NULL, NULL, '', NULL, 11385, NULL, NULL, '2024-10-12 13:54:12', 1);
INSERT INTO `disclosure_clue` VALUES (19, 'sxpdddd', 'ssss', '18363971268', NULL, '', '', NULL, 22, NULL, NULL, '', NULL, NULL, '', NULL, 11385, NULL, 11385, '2024-09-30 17:22:44', 1);
INSERT INTO `disclosure_clue` VALUES (20, 'sxp', 'dcsdf', '11111', 10, '', '', NULL, NULL, NULL, NULL, '', NULL, NULL, '', NULL, 11385, NULL, NULL, '2024-09-30 17:14:26', 1);
INSERT INTO `disclosure_clue` VALUES (21, 'dsfsdf', 'sdfsdf', '11111111', NULL, '', '', NULL, NULL, NULL, NULL, '', NULL, NULL, '', NULL, 11385, NULL, NULL, '2024-09-30 17:22:44', 1);
INSERT INTO `disclosure_clue` VALUES (22, '测试哈哈哈', 'sxp', '18363971268', 10, '天津市,河东区', '测试哈哈哈', 18, 22, 29, 36, '', 44, '2024-10-08', '水电费水电费', NULL, 11385, NULL, 11385, '2024-10-12 15:30:48', 1);
INSERT INTO `disclosure_clue` VALUES (23, '测试领取功能', 'sxp', '18363971212', 10, '河北省,唐山市', '详细地址', 18, 23, 29, 37, '的首发,的说法的', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-10-12 15:30:48', 1);
INSERT INTO `disclosure_clue` VALUES (24, '测试1', '1836397126', '18363971261', NULL, '', NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-10-12 16:33:49', 1);
INSERT INTO `disclosure_clue` VALUES (25, '测试2', 'sxp', '18363971262', NULL, '', NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, NULL, NULL, NULL, 11385, '2024-10-12 15:30:51', 1);
INSERT INTO `disclosure_clue` VALUES (26, '测试2', 'sxp', '18363971262', NULL, '', NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-10-12 16:32:24', 1);
INSERT INTO `disclosure_clue` VALUES (27, '测试3', 'sxp', '18363971263', NULL, '', NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-10-12 16:11:23', 1);
INSERT INTO `disclosure_clue` VALUES (28, '测试4', 'sxp', '18363971264', NULL, '', NULL, 18, 24, NULL, NULL, '', NULL, NULL, NULL, NULL, NULL, NULL, 11385, '2024-10-12 16:39:56', 1);
INSERT INTO `disclosure_clue` VALUES (29, 'SSS', 'DDD', '1836931562', NULL, '山西省,阳泉市', '', 19, 24, 27, 35, 'SD', NULL, NULL, NULL, NULL, NULL, NULL, 11385, '2024-10-12 16:39:56', 1);
INSERT INTO `disclosure_clue` VALUES (30, 'WWW', 'WWW', 'WWWW', NULL, '', '', NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-10-12 14:32:33', 1);
INSERT INTO `disclosure_clue` VALUES (31, 'SS', 'DD', 'SSSS', NULL, '', '', NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-10-12 14:33:08', 1);
INSERT INTO `disclosure_clue` VALUES (32, 'SS', 'SS', 'SS', NULL, '', '', NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-10-12 14:33:08', 1);
INSERT INTO `disclosure_clue` VALUES (33, '测试1', '测试1', '18363971261', NULL, '', '', NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-10-12 16:49:31', 1);
INSERT INTO `disclosure_clue` VALUES (34, '测试2', '测试2', '18363971262', NULL, '', '', NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, NULL, NULL, NULL, 11386, '2025-02-14 16:50:34', 1);
INSERT INTO `disclosure_clue` VALUES (35, '测试1', '沈相樸', '18363971268', 10, '河北省,邯郸市', '佛山市的方法', 19, 23, 30, 37, '是否', NULL, '2024-10-15', '发的是', NULL, 11385, NULL, 11386, '2025-12-02 15:19:45', 1);
INSERT INTO `disclosure_clue` VALUES (36, '测试', '冯浩臣', '17661048266', 10, '北京市,东城区', '天安门', 17, 22, 27, 34, '', 44, '2024-10-18', '', NULL, 11386, NULL, 11386, '2024-10-17 10:17:15', 1);
INSERT INTO `disclosure_clue` VALUES (37, '测试', '测试', '17661048266', 8, '', '', NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, NULL, 11386, '2024-10-17 09:16:35', NULL, '2024-10-17 09:07:35', 1);
INSERT INTO `disclosure_clue` VALUES (38, '测试', '测试', '17661048266', NULL, '', '', NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, NULL, 11386, '2024-10-17 09:21:41', NULL, '2024-10-17 09:21:41', 0);
INSERT INTO `disclosure_clue` VALUES (39, '测试1', '测试1', '17661048266', NULL, '', '', NULL, NULL, NULL, NULL, '', NULL, NULL, '', NULL, 11386, NULL, NULL, '2024-10-17 09:20:59', 1);
INSERT INTO `disclosure_clue` VALUES (40, '测试线索', '水水水水', '18363971268', NULL, '', '', NULL, NULL, NULL, NULL, 'dddd', NULL, NULL, NULL, NULL, 11417, '2024-10-17 14:31:07', 11386, '2025-12-02 15:24:00', 1);
INSERT INTO `disclosure_clue` VALUES (41, '测试消息', 'sxp', '18363971268', NULL, '', '', NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, NULL, 11385, '2024-10-21 10:20:13', NULL, '2024-10-21 10:20:13', 0);
INSERT INTO `disclosure_clue` VALUES (42, 'cesh', 'sss', '18363971222', NULL, '', '', NULL, NULL, NULL, NULL, '', NULL, NULL, '', NULL, 11385, NULL, 11385, '2024-10-22 15:40:31', 1);
INSERT INTO `disclosure_clue` VALUES (43, '测试备注', 'sx', '18363971268', NULL, '', '', NULL, NULL, NULL, NULL, '', NULL, NULL, 'dddddd', NULL, 11385, '2024-10-23 10:33:54', NULL, '2024-10-23 10:33:54', 0);
INSERT INTO `disclosure_clue` VALUES (44, 'dddd', 'sss', '18363971268', NULL, '', '', NULL, NULL, NULL, NULL, '', NULL, NULL, 'sssssss', NULL, 11385, '2024-10-23 10:35:24', NULL, '2024-10-23 10:35:24', 0);
INSERT INTO `disclosure_clue` VALUES (45, '123123', '123', '1111111111', NULL, '', '', NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, NULL, 11416, '2025-01-22 15:10:09', NULL, '2025-01-22 14:59:57', 1);
INSERT INTO `disclosure_clue` VALUES (46, 'test', 'sxp', '18363971268', NULL, '', '', NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, NULL, 11386, '2025-01-22 15:19:55', NULL, '2025-02-06 09:36:10', 1);
INSERT INTO `disclosure_clue` VALUES (47, '测试删除', 'sxp', '18363971268', NULL, '', '', NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, NULL, 11386, '2025-02-06 09:47:11', NULL, '2025-02-06 09:52:57', 1);
INSERT INTO `disclosure_clue` VALUES (48, 'testDel', 'sxp1', '18363971268', NULL, '', '', NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, NULL, 11386, '2025-02-06 09:47:31', 11386, '2025-02-18 14:47:13', 1);
INSERT INTO `disclosure_clue` VALUES (49, 'sdfsdf', 'sss', '18236971256', NULL, '', '', NULL, NULL, NULL, NULL, '', NULL, NULL, '', NULL, 11386, NULL, 11386, '2025-02-17 11:04:24', 1);
INSERT INTO `disclosure_clue` VALUES (50, '测试我的线索删除', 'sss', '18363971268', NULL, '天津市,河东区', '', NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, NULL, 11386, '2025-02-18 14:16:26', 11386, '2025-02-27 14:57:12', 0);
INSERT INTO `disclosure_clue` VALUES (51, '测试公海删除', 'sxp', '18363971268', NULL, '', '', NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, NULL, 11386, '2025-02-18 16:17:06', NULL, '2025-02-18 16:17:06', 0);
INSERT INTO `disclosure_clue` VALUES (52, '测试', 'sxp', '18363971268', 9, '天津市,河东区', '123123', 17, 23, 28, 40, '', 44, NULL, '', NULL, 11386, NULL, 11386, '2025-02-27 14:48:50', 0);
INSERT INTO `disclosure_clue` VALUES (53, '测试创建', 'sxp', 'zhuojunchen', NULL, '', '', NULL, NULL, NULL, NULL, '', NULL, NULL, '', NULL, 11386, '2025-02-24 09:15:21', 11386, '2025-03-03 09:44:48', 0);
INSERT INTO `disclosure_clue` VALUES (54, '测试', 'sxp', '18266565693', NULL, '', '', NULL, NULL, NULL, NULL, '', NULL, NULL, '', NULL, 11386, '2025-02-27 14:43:05', NULL, '2025-02-27 14:43:05', 0);
INSERT INTO `disclosure_clue` VALUES (55, '13123123', 'sxfd', '12344444123123', NULL, '河北省,秦皇岛市', '', NULL, NULL, NULL, NULL, '', NULL, NULL, '', NULL, 11386, '2025-02-27 14:48:15', NULL, '2025-02-27 14:48:15', 0);
INSERT INTO `disclosure_clue` VALUES (56, 'test', 'sxp', '18822222222', NULL, '', '', NULL, NULL, NULL, NULL, '', NULL, NULL, '', NULL, 11385, '2025-07-02 10:53:08', NULL, '2025-07-02 10:53:08', 0);
INSERT INTO `disclosure_clue` VALUES (57, 'test', 'test', '18363971225', NULL, '', '', NULL, NULL, NULL, NULL, '', NULL, NULL, '', NULL, 11386, '2025-07-03 16:49:32', 11386, '2025-07-04 14:27:26', 1);
INSERT INTO `disclosure_clue` VALUES (58, 'etst', 'sxcvx', '18363971255', NULL, '', '', NULL, NULL, NULL, NULL, '', NULL, NULL, '', NULL, 11386, '2025-07-04 16:43:30', NULL, '2025-07-04 16:43:30', 0);

-- ----------------------------
-- Table structure for disclosure_follow_up
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
) ENGINE = InnoDB AUTO_INCREMENT = 24 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '线索跟进' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of disclosure_follow_up
-- ----------------------------
INSERT INTO `disclosure_follow_up` VALUES (12, 17, 11385, '测试内容', 24, '2024-09-02', 44, 49, NULL, NULL, 11385, '2024-09-29 17:11:36', NULL, '2024-09-29 17:11:36', 0);
INSERT INTO `disclosure_follow_up` VALUES (13, 17, 11385, '测试内容', 24, '2024-09-02', 44, 49, NULL, NULL, 11385, '2024-09-29 17:13:24', NULL, '2024-09-29 17:13:24', 0);
INSERT INTO `disclosure_follow_up` VALUES (14, 17, 11385, '跟进内容test', 24, '2025-11-19', 44, 49, NULL, NULL, 11385, '2024-09-29 17:14:44', NULL, '2024-09-29 17:14:44', 0);
INSERT INTO `disclosure_follow_up` VALUES (15, 19, 11385, 'ceshigegjin', 22, NULL, NULL, 50, NULL, NULL, 11385, '2024-09-30 17:15:13', NULL, '2024-09-30 17:15:13', 0);
INSERT INTO `disclosure_follow_up` VALUES (16, 22, 11385, '测试跟进', 22, '2024-10-08', 44, 50, NULL, NULL, 11385, '2024-10-08 08:57:21', NULL, '2024-10-08 08:57:21', 0);
INSERT INTO `disclosure_follow_up` VALUES (17, 22, 11385, 'CEHSI', NULL, NULL, NULL, 50, NULL, NULL, 11385, '2024-10-12 14:43:06', NULL, '2024-10-12 14:43:06', 0);
INSERT INTO `disclosure_follow_up` VALUES (18, 35, 11385, '测试', 23, '2024-10-15', NULL, 50, NULL, NULL, 11385, '2024-10-15 15:01:50', NULL, '2024-10-15 15:01:50', 0);
INSERT INTO `disclosure_follow_up` VALUES (19, 36, 11386, '跟进中', NULL, NULL, NULL, 48, NULL, NULL, 11386, '2024-10-17 09:50:41', NULL, '2024-10-17 09:50:41', 0);
INSERT INTO `disclosure_follow_up` VALUES (20, 59, 11386, '这个客户不行', 23, '2024-10-18', 44, 48, NULL, NULL, 11386, '2024-10-18 09:44:29', NULL, '2024-10-18 09:44:32', 0);
INSERT INTO `disclosure_follow_up` VALUES (21, 35, 11417, '测试', 23, NULL, NULL, 49, NULL, NULL, 11417, '2024-10-18 15:40:07', NULL, '2024-10-18 15:40:07', 0);
INSERT INTO `disclosure_follow_up` VALUES (22, 43, 11385, '测试', 23, NULL, NULL, 49, NULL, NULL, 11417, '2025-02-17 10:03:03', NULL, '2024-10-18 15:40:07', 0);
INSERT INTO `disclosure_follow_up` VALUES (23, 49, 11386, 'ceshi', NULL, NULL, NULL, 49, NULL, NULL, 11386, '2025-02-17 10:19:02', NULL, '2025-02-17 10:19:02', 0);

-- ----------------------------
-- Table structure for disclosure_rule
-- ----------------------------
DROP TABLE IF EXISTS `disclosure_rule`;
CREATE TABLE `disclosure_rule`  (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `rule_name` varchar(512) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '规则名称',
  `rule_content` varchar(512) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '规则内容',
  `un_follow_day` int NULL DEFAULT NULL COMMENT '自领取或分配线索后开始计算；在规定天数内，若有跟进记录，则从新建跟进记录的时间重新计算规定天数；若无跟进记录，则达到规定时间后回收',
  `un_conversion_day` int NULL DEFAULT NULL COMMENT '自领取或分配线索后开始计算；在规定天数内，若没有转化为客户，则到达规定时间后进行回收\r\n',
  `remark` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT '备注',
  `status` int NULL DEFAULT NULL COMMENT '状态：1-启用 2-停用',
  `create_by` bigint NULL DEFAULT NULL COMMENT '创建人id',
  `create_at` datetime NULL DEFAULT NULL COMMENT '创建时间',
  `update_by` bigint NULL DEFAULT NULL COMMENT '更新人id',
  `update_at` datetime NULL DEFAULT NULL COMMENT '更新时间',
  `del_flag` int NULL DEFAULT 0 COMMENT '0-正常 1-已删除',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 52 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '公海资源：线索管理的规则' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of disclosure_rule
-- ----------------------------
INSERT INTO `disclosure_rule` VALUES (12, '添加线索名称', 'sxp', NULL, NULL, '测试上海市上海市', NULL, NULL, NULL, NULL, '2024-09-29 10:18:32', 1);
INSERT INTO `disclosure_rule` VALUES (13, '测试123123', 'sxp', NULL, NULL, '备注', NULL, NULL, NULL, NULL, '2024-09-29 10:22:06', 1);
INSERT INTO `disclosure_rule` VALUES (14, '测线索名称', 'sxpdd', NULL, NULL, '', NULL, NULL, NULL, NULL, '2024-09-29 10:22:06', 1);
INSERT INTO `disclosure_rule` VALUES (15, '线索测试', 'sxpsxp', NULL, NULL, '备注对对对对对对的点点滴滴哒哒哒哒哒哒哒哒哒哒哒', NULL, NULL, NULL, NULL, '2024-09-29 10:22:46', 1);
INSERT INTO `disclosure_rule` VALUES (17, '测试线索名称', 'sxp', NULL, NULL, '备注', NULL, 11385, NULL, 11385, '2024-10-12 16:33:49', 1);
INSERT INTO `disclosure_rule` VALUES (18, 'ceshi', 'sxpsss', NULL, NULL, '', NULL, 11385, NULL, NULL, '2024-10-12 13:54:12', 1);
INSERT INTO `disclosure_rule` VALUES (19, 'sxpdddd', 'ssss', NULL, NULL, '', NULL, 11385, NULL, 11385, '2024-09-30 17:22:44', 1);
INSERT INTO `disclosure_rule` VALUES (20, 'sxp', 'dcsdf', NULL, NULL, '', NULL, 11385, NULL, NULL, '2024-09-30 17:14:26', 1);
INSERT INTO `disclosure_rule` VALUES (21, 'dsfsdf', 'sdfsdf', NULL, NULL, '', NULL, 11385, NULL, NULL, '2024-09-30 17:22:44', 1);
INSERT INTO `disclosure_rule` VALUES (22, '测试哈哈哈', 'sxp', NULL, NULL, '水电费水电费', NULL, 11385, NULL, 11385, '2024-10-12 15:30:48', 1);
INSERT INTO `disclosure_rule` VALUES (23, '测试领取功能', 'sxp', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-10-12 15:30:48', 1);
INSERT INTO `disclosure_rule` VALUES (24, '测试1', '1836397126', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-10-12 16:33:49', 1);
INSERT INTO `disclosure_rule` VALUES (25, '测试2', 'sxp', NULL, NULL, NULL, NULL, NULL, NULL, 11385, '2024-10-12 15:30:51', 1);
INSERT INTO `disclosure_rule` VALUES (26, '测试2', 'sxp', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-10-12 16:32:24', 1);
INSERT INTO `disclosure_rule` VALUES (27, '测试3', 'sxp', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-10-12 16:11:23', 1);
INSERT INTO `disclosure_rule` VALUES (28, '测试4', 'sxp', NULL, NULL, NULL, NULL, NULL, NULL, 11385, '2024-10-12 16:39:56', 1);
INSERT INTO `disclosure_rule` VALUES (29, 'SSS', 'DDD', NULL, NULL, NULL, NULL, NULL, NULL, 11385, '2024-10-12 16:39:56', 1);
INSERT INTO `disclosure_rule` VALUES (30, 'WWW', 'WWW', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-10-12 14:32:33', 1);
INSERT INTO `disclosure_rule` VALUES (31, 'SS', 'DD', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-10-12 14:33:08', 1);
INSERT INTO `disclosure_rule` VALUES (32, 'SS', 'SS', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-10-12 14:33:08', 1);
INSERT INTO `disclosure_rule` VALUES (33, '测试1', '测试1', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-10-12 16:49:31', 1);
INSERT INTO `disclosure_rule` VALUES (36, '测试', '冯浩臣', NULL, NULL, '', NULL, 11386, NULL, 11386, '2024-10-17 10:17:15', 1);
INSERT INTO `disclosure_rule` VALUES (37, '测试', '测试', NULL, NULL, NULL, NULL, 11386, '2024-10-17 09:16:35', NULL, '2024-10-17 09:07:35', 1);
INSERT INTO `disclosure_rule` VALUES (39, '测试1', '测试1', NULL, NULL, '', NULL, 11386, NULL, NULL, '2024-10-17 09:20:59', 1);
INSERT INTO `disclosure_rule` VALUES (42, 'cesh', 'sss', NULL, NULL, '', NULL, 11385, NULL, 11385, '2024-10-22 15:40:31', 1);
INSERT INTO `disclosure_rule` VALUES (45, '123123', '123', NULL, NULL, NULL, NULL, 11416, '2025-01-22 15:10:09', NULL, '2025-01-22 14:59:57', 1);
INSERT INTO `disclosure_rule` VALUES (46, 'test', 'sxp', NULL, NULL, NULL, NULL, 11386, '2025-01-22 15:19:55', NULL, '2025-02-06 09:36:10', 1);
INSERT INTO `disclosure_rule` VALUES (47, '测试删除', 'sxp', NULL, NULL, NULL, NULL, 11386, '2025-02-06 09:47:11', NULL, '2025-02-06 09:52:57', 1);
INSERT INTO `disclosure_rule` VALUES (49, '测试规则123', '10天内无转化进行回收', 10, 10, NULL, 1, 11407, '2025-02-12 14:53:53', 11407, '2025-02-12 15:09:55', 0);
INSERT INTO `disclosure_rule` VALUES (50, 'test', '12天内无转化进行回收', 11, 12, NULL, 1, 11407, '2025-02-12 14:54:08', 11407, '2025-02-12 15:18:22', 0);

-- ----------------------------
-- Table structure for disclosure_user_rel
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
) ENGINE = InnoDB AUTO_INCREMENT = 86 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '线索用户关联' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of disclosure_user_rel
-- ----------------------------
INSERT INTO `disclosure_user_rel` VALUES (12, 17, 11385, 2, NULL, 11385, '2024-09-29 14:09:34', NULL, '2024-10-12 15:42:16', 1);
INSERT INTO `disclosure_user_rel` VALUES (13, 18, 11385, 2, NULL, 11385, '2024-09-30 17:13:51', NULL, '2024-09-30 17:05:01', 1);
INSERT INTO `disclosure_user_rel` VALUES (14, 19, 11385, 2, NULL, 11385, '2024-09-30 17:14:17', NULL, '2024-09-30 17:22:44', 1);
INSERT INTO `disclosure_user_rel` VALUES (15, 20, 11385, 2, NULL, 11385, '2024-09-30 17:19:59', NULL, '2024-09-30 17:14:26', 1);
INSERT INTO `disclosure_user_rel` VALUES (16, 21, 11385, 2, NULL, 11385, '2024-09-30 17:23:31', NULL, '2024-09-30 17:22:44', 1);
INSERT INTO `disclosure_user_rel` VALUES (17, 22, 11385, 2, NULL, 11385, '2024-10-08 08:57:02', NULL, '2024-10-12 15:30:48', 1);
INSERT INTO `disclosure_user_rel` VALUES (18, 16, NULL, 2, '  <公海规则定时任务>：超过最大期限11天未跟进，自动收回线索', NULL, '2024-10-12 10:31:40', NULL, '2024-10-12 10:31:40', 1);
INSERT INTO `disclosure_user_rel` VALUES (19, 16, NULL, 2, '  <公海规则定时任务>：超过最大期限11天未跟进，自动收回线索', NULL, '2024-10-12 10:34:00', NULL, '2024-10-12 10:34:00', 1);
INSERT INTO `disclosure_user_rel` VALUES (20, 16, NULL, 2, '  <公海规则定时任务>：超过最大期限11天未跟进，自动收回线索', NULL, '2024-10-12 10:35:53', NULL, '2024-10-12 10:35:53', 1);
INSERT INTO `disclosure_user_rel` VALUES (21, 16, NULL, 2, '  <公海规则定时任务>：超过最大期限11天未跟进，自动收回线索', NULL, '2024-10-12 10:36:03', NULL, '2024-10-12 10:36:03', 1);
INSERT INTO `disclosure_user_rel` VALUES (22, 16, 11385, 2, NULL, NULL, '2024-10-12 10:36:16', NULL, '2024-10-12 15:14:44', 1);
INSERT INTO `disclosure_user_rel` VALUES (23, 16, 11385, 2, NULL, NULL, '2024-10-12 10:36:23', NULL, '2024-10-12 15:14:44', 1);
INSERT INTO `disclosure_user_rel` VALUES (24, 23, 11385, 2, NULL, NULL, '2024-10-12 10:37:28', NULL, '2024-10-12 15:30:48', 1);
INSERT INTO `disclosure_user_rel` VALUES (25, NULL, 11385, 1, NULL, NULL, '2024-10-12 13:58:45', NULL, '2024-10-12 13:58:45', 0);
INSERT INTO `disclosure_user_rel` VALUES (26, 17, 11386, 2, NULL, NULL, '2024-10-12 14:00:06', NULL, '2024-10-12 16:33:49', 1);
INSERT INTO `disclosure_user_rel` VALUES (27, 24, 11385, 2, NULL, NULL, '2024-10-12 14:31:25', NULL, '2024-10-12 15:14:50', 1);
INSERT INTO `disclosure_user_rel` VALUES (28, 25, 11385, 2, NULL, NULL, '2024-10-12 14:32:13', NULL, '2024-10-12 15:30:51', 1);
INSERT INTO `disclosure_user_rel` VALUES (29, 26, 11385, 2, NULL, NULL, '2024-10-12 14:34:01', NULL, '2024-10-12 15:34:21', 1);
INSERT INTO `disclosure_user_rel` VALUES (30, 27, 11385, 2, NULL, NULL, '2024-10-12 14:34:01', NULL, '2024-10-12 15:34:21', 1);
INSERT INTO `disclosure_user_rel` VALUES (31, 28, 11385, 2, NULL, NULL, '2024-10-12 14:40:42', NULL, '2024-10-12 16:39:19', 1);
INSERT INTO `disclosure_user_rel` VALUES (32, 29, 11385, 2, NULL, NULL, '2024-10-12 14:40:42', NULL, '2024-10-12 16:39:19', 1);
INSERT INTO `disclosure_user_rel` VALUES (33, 24, 11407, 2, NULL, NULL, '2024-10-12 15:51:11', NULL, '2024-10-12 16:33:49', 1);
INSERT INTO `disclosure_user_rel` VALUES (34, 26, 11407, 2, NULL, NULL, '2024-10-12 15:51:11', NULL, '2024-10-12 16:32:24', 1);
INSERT INTO `disclosure_user_rel` VALUES (35, 27, 11407, 2, NULL, NULL, '2024-10-12 15:51:11', NULL, '2024-10-12 16:11:23', 1);
INSERT INTO `disclosure_user_rel` VALUES (36, 28, 11385, 2, NULL, NULL, '2024-10-12 16:43:34', NULL, '2024-10-12 16:39:19', 1);
INSERT INTO `disclosure_user_rel` VALUES (37, 29, 11385, 2, NULL, NULL, '2024-10-12 16:43:34', NULL, '2024-10-12 16:39:19', 1);
INSERT INTO `disclosure_user_rel` VALUES (38, 28, 11385, 2, NULL, NULL, '2024-10-12 16:48:06', NULL, '2024-10-12 16:39:19', 1);
INSERT INTO `disclosure_user_rel` VALUES (39, 29, 11385, 2, NULL, NULL, '2024-10-12 16:48:06', NULL, '2024-10-12 16:39:19', 1);
INSERT INTO `disclosure_user_rel` VALUES (40, 28, 11407, 2, NULL, NULL, '2024-10-12 16:48:33', NULL, '2024-10-12 16:39:56', 1);
INSERT INTO `disclosure_user_rel` VALUES (41, 29, 11407, 2, NULL, NULL, '2024-10-12 16:48:33', NULL, '2024-10-12 16:39:56', 1);
INSERT INTO `disclosure_user_rel` VALUES (42, 33, 11407, 2, NULL, NULL, '2024-10-12 16:58:02', NULL, '2024-10-12 16:49:09', 1);
INSERT INTO `disclosure_user_rel` VALUES (43, 34, 11407, 2, NULL, NULL, '2024-10-12 16:58:02', NULL, '2024-10-12 16:49:09', 1);
INSERT INTO `disclosure_user_rel` VALUES (44, 33, 11411, 2, NULL, NULL, '2024-10-12 16:58:24', NULL, '2024-10-12 16:49:31', 1);
INSERT INTO `disclosure_user_rel` VALUES (45, 34, 11411, 2, NULL, NULL, '2024-10-12 16:58:24', NULL, '2024-10-12 16:49:36', 1);
INSERT INTO `disclosure_user_rel` VALUES (46, 34, 11385, 2, NULL, NULL, '2024-10-12 16:58:44', NULL, '2024-10-12 16:50:02', 1);
INSERT INTO `disclosure_user_rel` VALUES (47, 34, 11385, 2, NULL, NULL, '2024-10-12 16:58:56', NULL, '2024-10-12 16:50:02', 1);
INSERT INTO `disclosure_user_rel` VALUES (48, 35, 11385, 2, NULL, 11385, '2024-10-15 15:01:36', NULL, '2024-10-17 08:37:15', 1);
INSERT INTO `disclosure_user_rel` VALUES (49, 34, 11386, 2, NULL, NULL, '2024-10-17 08:51:19', NULL, '2024-10-17 16:41:29', 1);
INSERT INTO `disclosure_user_rel` VALUES (50, 36, 11386, 2, NULL, 11386, '2024-10-17 08:52:17', NULL, '2024-10-17 08:43:19', 1);
INSERT INTO `disclosure_user_rel` VALUES (51, 36, 11386, 2, NULL, NULL, '2024-10-17 08:52:37', NULL, '2024-10-17 10:14:46', 1);
INSERT INTO `disclosure_user_rel` VALUES (52, 38, 11386, 2, NULL, NULL, '2024-10-17 09:24:35', NULL, '2024-10-17 09:40:13', 1);
INSERT INTO `disclosure_user_rel` VALUES (53, 38, 11386, 2, NULL, NULL, '2024-10-17 09:26:05', NULL, '2024-10-17 09:40:13', 1);
INSERT INTO `disclosure_user_rel` VALUES (54, 39, 11386, 2, NULL, 11386, '2024-10-17 09:27:11', NULL, '2024-10-17 09:19:37', 1);
INSERT INTO `disclosure_user_rel` VALUES (55, 38, 11386, 2, NULL, NULL, '2024-10-17 09:30:59', NULL, '2024-10-17 09:40:13', 1);
INSERT INTO `disclosure_user_rel` VALUES (56, 38, 11386, 2, NULL, NULL, '2024-10-17 09:31:47', NULL, '2024-10-17 09:40:13', 1);
INSERT INTO `disclosure_user_rel` VALUES (57, 38, 11386, 2, NULL, NULL, '2024-10-17 09:32:23', NULL, '2024-10-17 09:40:13', 1);
INSERT INTO `disclosure_user_rel` VALUES (58, 36, 11386, 2, NULL, NULL, '2024-10-17 10:26:00', NULL, '2024-10-17 10:17:15', 1);
INSERT INTO `disclosure_user_rel` VALUES (59, 35, 11417, 2, '  <公海规则定时任务>：虽然跟进过，但是最近超过最大期限11天未跟进，自动收回线索', NULL, '2024-10-17 14:24:33', NULL, '2024-10-17 14:24:33', 1);
INSERT INTO `disclosure_user_rel` VALUES (60, 38, 11417, 2, '  <公海规则定时任务>：超过最大期限11天未跟进，自动收回线索', NULL, '2024-10-17 14:27:43', NULL, '2024-10-17 14:27:43', 1);
INSERT INTO `disclosure_user_rel` VALUES (61, 34, 11386, 2, NULL, NULL, '2024-10-17 16:54:34', 11386, '2025-02-14 16:50:34', 1);
INSERT INTO `disclosure_user_rel` VALUES (62, 40, 11417, 2, NULL, NULL, '2024-10-21 09:08:51', NULL, '2024-10-21 09:00:59', 1);
INSERT INTO `disclosure_user_rel` VALUES (63, 40, 11417, 2, NULL, NULL, '2024-10-21 09:10:01', NULL, '2024-10-21 09:00:59', 1);
INSERT INTO `disclosure_user_rel` VALUES (64, 40, 11385, 2, NULL, NULL, '2024-10-22 10:03:15', NULL, '2024-10-22 15:18:04', 1);
INSERT INTO `disclosure_user_rel` VALUES (65, 41, 11385, 2, NULL, NULL, '2024-10-22 15:27:05', NULL, '2024-10-22 15:18:20', 1);
INSERT INTO `disclosure_user_rel` VALUES (66, 40, 11385, 2, '  <公海规则定时任务>：超过最大期限11天未跟进，自动收回线索', NULL, '2024-10-22 15:27:51', NULL, '2024-10-22 15:27:51', 1);
INSERT INTO `disclosure_user_rel` VALUES (67, 41, 11385, 2, '  <公海规则定时任务>：超过最大期限11天未跟进，自动收回线索', NULL, '2024-10-22 15:27:51', NULL, '2024-10-22 15:27:51', 1);
INSERT INTO `disclosure_user_rel` VALUES (68, 42, 11385, 2, NULL, 11385, '2024-10-22 15:38:27', 11385, '2024-10-22 15:40:31', 1);
INSERT INTO `disclosure_user_rel` VALUES (69, 43, 11385, 2, '  <公海规则定时任务>：超过最大期限11天未转化为客户，自动收回线索', NULL, '2024-10-23 10:34:15', NULL, '2024-10-23 10:34:15', 1);
INSERT INTO `disclosure_user_rel` VALUES (70, 44, 11385, 2, '  <公海规则定时任务>：超过最大期限11天未跟进，自动收回线索', NULL, '2024-10-23 10:35:37', NULL, '2024-10-23 10:35:37', 1);
INSERT INTO `disclosure_user_rel` VALUES (71, 49, 11386, 2, NULL, 11386, '2025-02-14 16:58:23', 11386, '2025-02-17 11:04:24', 1);
INSERT INTO `disclosure_user_rel` VALUES (72, 48, 11386, 2, NULL, NULL, '2025-02-18 09:04:12', 11386, '2025-02-18 14:47:13', 1);
INSERT INTO `disclosure_user_rel` VALUES (73, 50, 11386, 2, '  <公海规则定时任务>：超过最大期限11天未跟进，自动收回线索', NULL, '2025-02-18 16:17:16', NULL, '2025-02-18 16:17:16', 1);
INSERT INTO `disclosure_user_rel` VALUES (74, 52, 11386, 2, '  <公海规则定时任务>：超过最大期限11天未跟进，自动收回线索', 11386, '2025-02-19 09:24:53', NULL, '2025-02-19 09:24:53', 1);
INSERT INTO `disclosure_user_rel` VALUES (75, 53, 11386, 2, '  <公海规则定时任务>：超过最大期限11天未跟进，自动收回线索', 11386, '2025-02-24 09:15:21', NULL, '2025-02-24 09:15:21', 1);
INSERT INTO `disclosure_user_rel` VALUES (76, 54, 11386, 2, '  <公海规则定时任务>：超过最大期限11天未跟进，自动收回线索', 11386, '2025-02-27 14:43:05', NULL, '2025-02-27 14:43:05', 1);
INSERT INTO `disclosure_user_rel` VALUES (77, 55, 11386, 2, '  <公海规则定时任务>：超过最大期限11天未跟进，自动收回线索', 11386, '2025-02-27 14:48:15', NULL, '2025-02-27 14:48:15', 1);
INSERT INTO `disclosure_user_rel` VALUES (78, 16, 11403, 2, '  <公海规则定时任务>：超过最大期限11天未跟进，自动收回线索', NULL, '2025-03-03 10:03:46', NULL, '2025-03-03 10:03:46', 1);
INSERT INTO `disclosure_user_rel` VALUES (79, 56, 11385, 2, '  <公海规则定时任务>：超过最大期限11天未跟进，自动收回线索', 11385, '2025-07-02 10:53:08', NULL, '2025-07-02 10:53:08', 1);
INSERT INTO `disclosure_user_rel` VALUES (80, 57, 11386, 2, NULL, 11386, '2025-07-03 16:49:32', 11386, '2025-07-04 14:27:26', 1);
INSERT INTO `disclosure_user_rel` VALUES (81, 58, 11386, 2, '  <公海规则定时任务>：超过最大期限11天未跟进，自动收回线索', 11386, '2025-07-04 16:43:30', NULL, '2025-07-04 16:43:30', 1);
INSERT INTO `disclosure_user_rel` VALUES (82, 16, 11385, 2, '  <公海规则定时任务>：超过最大期限11天未跟进，自动收回线索', NULL, '2025-11-21 09:46:06', NULL, '2025-11-21 09:46:06', 1);
INSERT INTO `disclosure_user_rel` VALUES (83, 35, 11386, 2, NULL, NULL, '2025-12-01 09:20:07', 11386, '2025-12-02 15:19:45', 1);
INSERT INTO `disclosure_user_rel` VALUES (84, 40, 11386, 2, NULL, NULL, '2025-12-02 15:23:08', 11386, '2025-12-02 15:24:00', 1);
INSERT INTO `disclosure_user_rel` VALUES (85, 38, 11386, 2, '  <公海规则定时任务>：超过最大期限11天未跟进，自动收回线索', NULL, '2025-12-02 15:27:55', NULL, '2025-12-02 15:27:55', 1);

-- ----------------------------
-- Table structure for oauth_client_details
-- ----------------------------
DROP TABLE IF EXISTS `oauth_client_details`;
CREATE TABLE `oauth_client_details`  (
  `client_id` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '客户端标 识',
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
-- Records of oauth_client_details
-- ----------------------------
INSERT INTO `oauth_client_details` VALUES ('c1', 'res1', '$2a$10$SFHjZbVVu16UlOC4llCe3uHX3bhYIg9O/rjeMd.fhxXYNQiiTM0pK', 'ROLE_ADMIN,ROLE_USER,ROLE_API', 'client_credentials,password,authorization_code,implicit,refresh_token', 'http://www.baidu.com', NULL, 43200, 259200, NULL, '2021-01-13 05:37:46', 0, 0, 'false');
INSERT INTO `oauth_client_details` VALUES ('c2', 'res2', '$2a$10$SFHjZbVVu16UlOC4llCe3uHX3bhYIg9O/rjeMd.fhxXYNQiiTM0pK', 'ROLE_API', 'client_credentials,password,authorization_code,implicit,refresh_token', 'http://www.baidu.com', NULL, 43200, 259200, NULL, '2021-01-13 05:37:52', 0, 0, 'false');
INSERT INTO `oauth_client_details` VALUES ('c3', 'all', '$2a$10$SFHjZbVVu16UlOC4llCe3uHX3bhYIg9O/rjeMd.fhxXYNQiiTM0pK', 'ROLE_ALL', 'sms_code', 'http://www.baidu.com', NULL, 43200, 259200, NULL, '2021-08-10 21:46:18', 0, 0, 'false');
INSERT INTO `oauth_client_details` VALUES ('eda', 'all', '$2a$10$CVfzIk2NegZWVs8y04Lnc.PMiD5kPX0zxCpLnt1w6rYL1zHSZvcV.', 'ROLE_ALL,ROLE_SUPREMEADMIN', 'password,implicit,refresh_token,sms_code', NULL, NULL, 43200, 259200, NULL, '2023-06-05 11:06:03', 0, 0, 'false');

-- ----------------------------
-- Table structure for oauth_code
-- ----------------------------
DROP TABLE IF EXISTS `oauth_code`;
CREATE TABLE `oauth_code`  (
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `code` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `authentication` blob NULL,
  INDEX `code_index`(`code` ASC) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of oauth_code
-- ----------------------------
INSERT INTO `oauth_code` VALUES ('2020-12-08 00:19:23', 'I9RyMr', 0xACED0005737200416F72672E737072696E676672616D65776F726B2E73656375726974792E6F61757468322E70726F76696465722E4F417574683241757468656E7469636174696F6EBD400B02166252130200024C000D73746F7265645265717565737474003C4C6F72672F737072696E676672616D65776F726B2F73656375726974792F6F61757468322F70726F76696465722F4F4175746832526571756573743B4C00127573657241757468656E7469636174696F6E7400324C6F72672F737072696E676672616D65776F726B2F73656375726974792F636F72652F41757468656E7469636174696F6E3B787200476F72672E737072696E676672616D65776F726B2E73656375726974792E61757468656E7469636174696F6E2E416273747261637441757468656E7469636174696F6E546F6B656ED3AA287E6E47640E0200035A000D61757468656E746963617465644C000B617574686F7269746965737400164C6A6176612F7574696C2F436F6C6C656374696F6E3B4C000764657461696C737400124C6A6176612F6C616E672F4F626A6563743B787000737200266A6176612E7574696C2E436F6C6C656374696F6E7324556E6D6F6469666961626C654C697374FC0F2531B5EC8E100200014C00046C6973747400104C6A6176612F7574696C2F4C6973743B7872002C6A6176612E7574696C2E436F6C6C656374696F6E7324556E6D6F6469666961626C65436F6C6C656374696F6E19420080CB5EF71E0200014C00016371007E00047870737200136A6176612E7574696C2E41727261794C6973747881D21D99C7619D03000149000473697A65787000000002770400000002737200426F72672E737072696E676672616D65776F726B2E73656375726974792E636F72652E617574686F726974792E53696D706C654772616E746564417574686F7269747900000000000001FE0200014C0004726F6C657400124C6A6176612F6C616E672F537472696E673B787074000270317371007E000D74000270337871007E000C707372003A6F72672E737072696E676672616D65776F726B2E73656375726974792E6F61757468322E70726F76696465722E4F41757468325265717565737400000000000000010200075A0008617070726F7665644C000B617574686F72697469657371007E00044C000A657874656E73696F6E7374000F4C6A6176612F7574696C2F4D61703B4C000B726564697265637455726971007E000E4C00077265667265736874003B4C6F72672F737072696E676672616D65776F726B2F73656375726974792F6F61757468322F70726F76696465722F546F6B656E526571756573743B4C000B7265736F7572636549647374000F4C6A6176612F7574696C2F5365743B4C000D726573706F6E7365547970657371007E0016787200386F72672E737072696E676672616D65776F726B2E73656375726974792E6F61757468322E70726F76696465722E426173655265717565737436287A3EA37169BD0200034C0008636C69656E74496471007E000E4C001172657175657374506172616D657465727371007E00144C000573636F706571007E001678707400026331737200256A6176612E7574696C2E436F6C6C656374696F6E7324556E6D6F6469666961626C654D6170F1A5A8FE74F507420200014C00016D71007E00147870737200116A6176612E7574696C2E486173684D61700507DAC1C31660D103000246000A6C6F6164466163746F724900097468726573686F6C6478703F400000000000067708000000080000000474000D726573706F6E73655F74797065740004636F646574000C72656469726563745F75726974000D7777772E62616964752E636F6D740009636C69656E745F696471007E001974000573636F7065740003616C6C78737200256A6176612E7574696C2E436F6C6C656374696F6E7324556E6D6F6469666961626C65536574801D92D18F9B80550200007871007E0009737200176A6176612E7574696C2E4C696E6B656448617368536574D86CD75A95DD2A1E020000787200116A6176612E7574696C2E48617368536574BA44859596B8B7340300007870770C000000103F4000000000000171007E002478017371007E0028770C000000103F40000000000000787371007E001C3F40000000000000770800000010000000007871007E0021707371007E0028770C000000103F4000000000000174000472657331787371007E0028770C000000103F4000000000000171007E001F787372004F6F72672E737072696E676672616D65776F726B2E73656375726974792E61757468656E7469636174696F6E2E557365726E616D6550617373776F726441757468656E7469636174696F6E546F6B656E00000000000001FE0200024C000B63726564656E7469616C7371007E00054C00097072696E636970616C71007E00057871007E0003017371007E00077371007E000B0000000277040000000271007E000F71007E00117871007E0032737200486F72672E737072696E676672616D65776F726B2E73656375726974792E7765622E61757468656E7469636174696F6E2E57656241757468656E7469636174696F6E44657461696C7300000000000001FE0200024C000D72656D6F74654164647265737371007E000E4C000973657373696F6E496471007E000E787074000C3137322E31382E302E313231740020304133364432374438443842434331303043383030393130393136374237383470737200326F72672E737072696E676672616D65776F726B2E73656375726974792E636F72652E7573657264657461696C732E5573657200000000000001FE0200075A00116163636F756E744E6F6E457870697265645A00106163636F756E744E6F6E4C6F636B65645A001563726564656E7469616C734E6F6E457870697265645A0007656E61626C65644C000B617574686F72697469657371007E00164C000870617373776F726471007E000E4C0008757365726E616D6571007E000E7870010101017371007E0025737200116A6176612E7574696C2E54726565536574DD98509395ED875B0300007870737200466F72672E737072696E676672616D65776F726B2E73656375726974792E636F72652E7573657264657461696C732E5573657224417574686F72697479436F6D70617261746F7200000000000001FE020000787077040000000271007E000F71007E001178707400917B2266756C6C6E616D65223A2261646D696E222C226964223A2231222C226D6F62696C65223A223137383632393932373239222C2270617373776F7264223A222432612431302436354234494B486167777734686144474E726B4661753931443278724E46726E443549674A5335347A556C6A537765747842584B75222C22757365726E616D65223A2261646D696E227D);
INSERT INTO `oauth_code` VALUES ('2020-12-08 00:42:08', 'UvqscU', 0xACED0005737200416F72672E737072696E676672616D65776F726B2E73656375726974792E6F61757468322E70726F76696465722E4F417574683241757468656E7469636174696F6EBD400B02166252130200024C000D73746F7265645265717565737474003C4C6F72672F737072696E676672616D65776F726B2F73656375726974792F6F61757468322F70726F76696465722F4F4175746832526571756573743B4C00127573657241757468656E7469636174696F6E7400324C6F72672F737072696E676672616D65776F726B2F73656375726974792F636F72652F41757468656E7469636174696F6E3B787200476F72672E737072696E676672616D65776F726B2E73656375726974792E61757468656E7469636174696F6E2E416273747261637441757468656E7469636174696F6E546F6B656ED3AA287E6E47640E0200035A000D61757468656E746963617465644C000B617574686F7269746965737400164C6A6176612F7574696C2F436F6C6C656374696F6E3B4C000764657461696C737400124C6A6176612F6C616E672F4F626A6563743B787000737200266A6176612E7574696C2E436F6C6C656374696F6E7324556E6D6F6469666961626C654C697374FC0F2531B5EC8E100200014C00046C6973747400104C6A6176612F7574696C2F4C6973743B7872002C6A6176612E7574696C2E436F6C6C656374696F6E7324556E6D6F6469666961626C65436F6C6C656374696F6E19420080CB5EF71E0200014C00016371007E00047870737200136A6176612E7574696C2E41727261794C6973747881D21D99C7619D03000149000473697A65787000000002770400000002737200426F72672E737072696E676672616D65776F726B2E73656375726974792E636F72652E617574686F726974792E53696D706C654772616E746564417574686F7269747900000000000001FE0200014C0004726F6C657400124C6A6176612F6C616E672F537472696E673B787074000270317371007E000D74000270337871007E000C707372003A6F72672E737072696E676672616D65776F726B2E73656375726974792E6F61757468322E70726F76696465722E4F41757468325265717565737400000000000000010200075A0008617070726F7665644C000B617574686F72697469657371007E00044C000A657874656E73696F6E7374000F4C6A6176612F7574696C2F4D61703B4C000B726564697265637455726971007E000E4C00077265667265736874003B4C6F72672F737072696E676672616D65776F726B2F73656375726974792F6F61757468322F70726F76696465722F546F6B656E526571756573743B4C000B7265736F7572636549647374000F4C6A6176612F7574696C2F5365743B4C000D726573706F6E7365547970657371007E0016787200386F72672E737072696E676672616D65776F726B2E73656375726974792E6F61757468322E70726F76696465722E426173655265717565737436287A3EA37169BD0200034C0008636C69656E74496471007E000E4C001172657175657374506172616D657465727371007E00144C000573636F706571007E001678707400026331737200256A6176612E7574696C2E436F6C6C656374696F6E7324556E6D6F6469666961626C654D6170F1A5A8FE74F507420200014C00016D71007E00147870737200116A6176612E7574696C2E486173684D61700507DAC1C31660D103000246000A6C6F6164466163746F724900097468726573686F6C6478703F400000000000067708000000080000000474000D726573706F6E73655F74797065740004636F646574000C72656469726563745F757269740014687474703A2F2F7777772E62616964752E636F6D740009636C69656E745F696471007E001974000573636F7065740008524F4C455F41504978737200256A6176612E7574696C2E436F6C6C656374696F6E7324556E6D6F6469666961626C65536574801D92D18F9B80550200007871007E0009737200176A6176612E7574696C2E4C696E6B656448617368536574D86CD75A95DD2A1E020000787200116A6176612E7574696C2E48617368536574BA44859596B8B7340300007870770C000000103F4000000000000171007E002478017371007E0028770C000000103F40000000000000787371007E001C3F40000000000000770800000010000000007871007E0021707371007E0028770C000000103F4000000000000174000472657331787371007E0028770C000000103F4000000000000171007E001F787372004F6F72672E737072696E676672616D65776F726B2E73656375726974792E61757468656E7469636174696F6E2E557365726E616D6550617373776F726441757468656E7469636174696F6E546F6B656E00000000000001FE0200024C000B63726564656E7469616C7371007E00054C00097072696E636970616C71007E00057871007E0003017371007E00077371007E000B0000000277040000000271007E000F71007E00117871007E0032737200486F72672E737072696E676672616D65776F726B2E73656375726974792E7765622E61757468656E7469636174696F6E2E57656241757468656E7469636174696F6E44657461696C7300000000000001FE0200024C000D72656D6F74654164647265737371007E000E4C000973657373696F6E496471007E000E787074000D3139322E3136382E31302E3539740020383030334245434344433141424631444438374630304338373530393135364170737200326F72672E737072696E676672616D65776F726B2E73656375726974792E636F72652E7573657264657461696C732E5573657200000000000001FE0200075A00116163636F756E744E6F6E457870697265645A00106163636F756E744E6F6E4C6F636B65645A001563726564656E7469616C734E6F6E457870697265645A0007656E61626C65644C000B617574686F72697469657371007E00164C000870617373776F726471007E000E4C0008757365726E616D6571007E000E7870010101017371007E0025737200116A6176612E7574696C2E54726565536574DD98509395ED875B0300007870737200466F72672E737072696E676672616D65776F726B2E73656375726974792E636F72652E7573657264657461696C732E5573657224417574686F72697479436F6D70617261746F7200000000000001FE020000787077040000000271007E000F71007E001178707400917B2266756C6C6E616D65223A2261646D696E222C226964223A2231222C226D6F62696C65223A223137383632393932373239222C2270617373776F7264223A222432612431302436354234494B486167777734686144474E726B4661753931443278724E46726E443549674A5335347A556C6A537765747842584B75222C22757365726E616D65223A2261646D696E227D);
INSERT INTO `oauth_code` VALUES ('2020-12-08 00:45:11', '4MwNYb', 0xACED0005737200416F72672E737072696E676672616D65776F726B2E73656375726974792E6F61757468322E70726F76696465722E4F417574683241757468656E7469636174696F6EBD400B02166252130200024C000D73746F7265645265717565737474003C4C6F72672F737072696E676672616D65776F726B2F73656375726974792F6F61757468322F70726F76696465722F4F4175746832526571756573743B4C00127573657241757468656E7469636174696F6E7400324C6F72672F737072696E676672616D65776F726B2F73656375726974792F636F72652F41757468656E7469636174696F6E3B787200476F72672E737072696E676672616D65776F726B2E73656375726974792E61757468656E7469636174696F6E2E416273747261637441757468656E7469636174696F6E546F6B656ED3AA287E6E47640E0200035A000D61757468656E746963617465644C000B617574686F7269746965737400164C6A6176612F7574696C2F436F6C6C656374696F6E3B4C000764657461696C737400124C6A6176612F6C616E672F4F626A6563743B787000737200266A6176612E7574696C2E436F6C6C656374696F6E7324556E6D6F6469666961626C654C697374FC0F2531B5EC8E100200014C00046C6973747400104C6A6176612F7574696C2F4C6973743B7872002C6A6176612E7574696C2E436F6C6C656374696F6E7324556E6D6F6469666961626C65436F6C6C656374696F6E19420080CB5EF71E0200014C00016371007E00047870737200136A6176612E7574696C2E41727261794C6973747881D21D99C7619D03000149000473697A65787000000002770400000002737200426F72672E737072696E676672616D65776F726B2E73656375726974792E636F72652E617574686F726974792E53696D706C654772616E746564417574686F7269747900000000000001FE0200014C0004726F6C657400124C6A6176612F6C616E672F537472696E673B787074000270317371007E000D74000270337871007E000C707372003A6F72672E737072696E676672616D65776F726B2E73656375726974792E6F61757468322E70726F76696465722E4F41757468325265717565737400000000000000010200075A0008617070726F7665644C000B617574686F72697469657371007E00044C000A657874656E73696F6E7374000F4C6A6176612F7574696C2F4D61703B4C000B726564697265637455726971007E000E4C00077265667265736874003B4C6F72672F737072696E676672616D65776F726B2F73656375726974792F6F61757468322F70726F76696465722F546F6B656E526571756573743B4C000B7265736F7572636549647374000F4C6A6176612F7574696C2F5365743B4C000D726573706F6E7365547970657371007E0016787200386F72672E737072696E676672616D65776F726B2E73656375726974792E6F61757468322E70726F76696465722E426173655265717565737436287A3EA37169BD0200034C0008636C69656E74496471007E000E4C001172657175657374506172616D657465727371007E00144C000573636F706571007E001678707400026331737200256A6176612E7574696C2E436F6C6C656374696F6E7324556E6D6F6469666961626C654D6170F1A5A8FE74F507420200014C00016D71007E00147870737200116A6176612E7574696C2E486173684D61700507DAC1C31660D103000246000A6C6F6164466163746F724900097468726573686F6C6478703F400000000000067708000000080000000474000D726573706F6E73655F74797065740004636F646574000C72656469726563745F757269740014687474703A2F2F7777772E62616964752E636F6D740009636C69656E745F696471007E001974000573636F706574000A524F4C455F41444D494E78737200256A6176612E7574696C2E436F6C6C656374696F6E7324556E6D6F6469666961626C65536574801D92D18F9B80550200007871007E0009737200176A6176612E7574696C2E4C696E6B656448617368536574D86CD75A95DD2A1E020000787200116A6176612E7574696C2E48617368536574BA44859596B8B7340300007870770C000000103F4000000000000171007E002478017371007E0028770C000000103F40000000000000787371007E001C3F40000000000000770800000010000000007871007E0021707371007E0028770C000000103F4000000000000174000472657331787371007E0028770C000000103F4000000000000171007E001F787372004F6F72672E737072696E676672616D65776F726B2E73656375726974792E61757468656E7469636174696F6E2E557365726E616D6550617373776F726441757468656E7469636174696F6E546F6B656E00000000000001FE0200024C000B63726564656E7469616C7371007E00054C00097072696E636970616C71007E00057871007E0003017371007E00077371007E000B0000000277040000000271007E000F71007E00117871007E0032737200486F72672E737072696E676672616D65776F726B2E73656375726974792E7765622E61757468656E7469636174696F6E2E57656241757468656E7469636174696F6E44657461696C7300000000000001FE0200024C000D72656D6F74654164647265737371007E000E4C000973657373696F6E496471007E000E787074000D3139322E3136382E31302E3539740020383030334245434344433141424631444438374630304338373530393135364170737200326F72672E737072696E676672616D65776F726B2E73656375726974792E636F72652E7573657264657461696C732E5573657200000000000001FE0200075A00116163636F756E744E6F6E457870697265645A00106163636F756E744E6F6E4C6F636B65645A001563726564656E7469616C734E6F6E457870697265645A0007656E61626C65644C000B617574686F72697469657371007E00164C000870617373776F726471007E000E4C0008757365726E616D6571007E000E7870010101017371007E0025737200116A6176612E7574696C2E54726565536574DD98509395ED875B0300007870737200466F72672E737072696E676672616D65776F726B2E73656375726974792E636F72652E7573657264657461696C732E5573657224417574686F72697479436F6D70617261746F7200000000000001FE020000787077040000000271007E000F71007E001178707400917B2266756C6C6E616D65223A2261646D696E222C226964223A2231222C226D6F62696C65223A223137383632393932373239222C2270617373776F7264223A222432612431302436354234494B486167777734686144474E726B4661753931443278724E46726E443549674A5335347A556C6A537765747842584B75222C22757365726E616D65223A2261646D696E227D);
INSERT INTO `oauth_code` VALUES ('2020-12-09 17:45:42', 'nWIgRk', 0xACED0005737200416F72672E737072696E676672616D65776F726B2E73656375726974792E6F61757468322E70726F76696465722E4F417574683241757468656E7469636174696F6EBD400B02166252130200024C000D73746F7265645265717565737474003C4C6F72672F737072696E676672616D65776F726B2F73656375726974792F6F61757468322F70726F76696465722F4F4175746832526571756573743B4C00127573657241757468656E7469636174696F6E7400324C6F72672F737072696E676672616D65776F726B2F73656375726974792F636F72652F41757468656E7469636174696F6E3B787200476F72672E737072696E676672616D65776F726B2E73656375726974792E61757468656E7469636174696F6E2E416273747261637441757468656E7469636174696F6E546F6B656ED3AA287E6E47640E0200035A000D61757468656E746963617465644C000B617574686F7269746965737400164C6A6176612F7574696C2F436F6C6C656374696F6E3B4C000764657461696C737400124C6A6176612F6C616E672F4F626A6563743B787000737200266A6176612E7574696C2E436F6C6C656374696F6E7324556E6D6F6469666961626C654C697374FC0F2531B5EC8E100200014C00046C6973747400104C6A6176612F7574696C2F4C6973743B7872002C6A6176612E7574696C2E436F6C6C656374696F6E7324556E6D6F6469666961626C65436F6C6C656374696F6E19420080CB5EF71E0200014C00016371007E00047870737200136A6176612E7574696C2E41727261794C6973747881D21D99C7619D03000149000473697A657870000000017704000000017372002A636F6D2E7A6B78792E65646153746174696F6E2E617574682E656E746974792E5065726D697373696F6E00000000000000010200044C0009617574686F726974797400124C6A6176612F6C616E672F537472696E673B4C000B6465736372697074696F6E71007E000E4C000269647400134C6A6176612F6C616E672F496E74656765723B4C000375726C71007E000E7870740003616C6C740003616C6C737200116A6176612E6C616E672E496E746567657212E2A0A4F781873802000149000576616C7565787200106A6176612E6C616E672E4E756D62657286AC951D0B94E08B0200007870000000017400022F2A7871007E000C707372003A6F72672E737072696E676672616D65776F726B2E73656375726974792E6F61757468322E70726F76696465722E4F41757468325265717565737400000000000000010200075A0008617070726F7665644C000B617574686F72697469657371007E00044C000A657874656E73696F6E7374000F4C6A6176612F7574696C2F4D61703B4C000B726564697265637455726971007E000E4C00077265667265736874003B4C6F72672F737072696E676672616D65776F726B2F73656375726974792F6F61757468322F70726F76696465722F546F6B656E526571756573743B4C000B7265736F7572636549647374000F4C6A6176612F7574696C2F5365743B4C000D726573706F6E7365547970657371007E001A787200386F72672E737072696E676672616D65776F726B2E73656375726974792E6F61757468322E70726F76696465722E426173655265717565737436287A3EA37169BD0200034C0008636C69656E74496471007E000E4C001172657175657374506172616D657465727371007E00184C000573636F706571007E001A78707400026331737200256A6176612E7574696C2E436F6C6C656374696F6E7324556E6D6F6469666961626C654D6170F1A5A8FE74F507420200014C00016D71007E00187870737200116A6176612E7574696C2E486173684D61700507DAC1C31660D103000246000A6C6F6164466163746F724900097468726573686F6C6478703F400000000000067708000000080000000474000D726573706F6E73655F74797065740004636F646574000C72656469726563745F757269740014687474703A2F2F7777772E62616964752E636F6D740009636C69656E745F696471007E001D74000573636F706574000A524F4C455F41444D494E78737200256A6176612E7574696C2E436F6C6C656374696F6E7324556E6D6F6469666961626C65536574801D92D18F9B80550200007871007E0009737200176A6176612E7574696C2E4C696E6B656448617368536574D86CD75A95DD2A1E020000787200116A6176612E7574696C2E48617368536574BA44859596B8B7340300007870770C000000103F4000000000000171007E002878017371007E002C770C000000103F40000000000000787371007E00203F40000000000000770800000010000000007871007E0025707371007E002C770C000000103F4000000000000174000472657331787371007E002C770C000000103F4000000000000171007E0023787372004F6F72672E737072696E676672616D65776F726B2E73656375726974792E61757468656E7469636174696F6E2E557365726E616D6550617373776F726441757468656E7469636174696F6E546F6B656E00000000000001FE0200024C000B63726564656E7469616C7371007E00054C00097072696E636970616C71007E00057871007E0003017371007E00077371007E000B0000000177040000000171007E00107871007E0036737200486F72672E737072696E676672616D65776F726B2E73656375726974792E7765622E61757468656E7469636174696F6E2E57656241757468656E7469636174696F6E44657461696C7300000000000001FE0200024C000D72656D6F74654164647265737371007E000E4C000973657373696F6E496471007E000E787074000D3139322E3136382E31302E353970707372002D636F6D2E7A6B78792E65646153746174696F6E2E617574682E6D6F64656C2E5573657244657461696C496D706CBB2E73D83557C5D30200055A00096973456E61626C65644C000B617574686F72697469657371007E00044C0002696471007E000F4C000870617373776F726471007E000E4C0008757365726E616D6571007E000E7870017371007E000B0000000177040000000171007E00107871007E001574003C243261243130246E31586B46783139434D383661497335376B4A484B657A6A336E674B5345694D5655646F744373485164776D526E41373475787469740004426F7373);
INSERT INTO `oauth_code` VALUES ('2020-12-09 17:47:09', 'vJMFAc', 0xACED0005737200416F72672E737072696E676672616D65776F726B2E73656375726974792E6F61757468322E70726F76696465722E4F417574683241757468656E7469636174696F6EBD400B02166252130200024C000D73746F7265645265717565737474003C4C6F72672F737072696E676672616D65776F726B2F73656375726974792F6F61757468322F70726F76696465722F4F4175746832526571756573743B4C00127573657241757468656E7469636174696F6E7400324C6F72672F737072696E676672616D65776F726B2F73656375726974792F636F72652F41757468656E7469636174696F6E3B787200476F72672E737072696E676672616D65776F726B2E73656375726974792E61757468656E7469636174696F6E2E416273747261637441757468656E7469636174696F6E546F6B656ED3AA287E6E47640E0200035A000D61757468656E746963617465644C000B617574686F7269746965737400164C6A6176612F7574696C2F436F6C6C656374696F6E3B4C000764657461696C737400124C6A6176612F6C616E672F4F626A6563743B787000737200266A6176612E7574696C2E436F6C6C656374696F6E7324556E6D6F6469666961626C654C697374FC0F2531B5EC8E100200014C00046C6973747400104C6A6176612F7574696C2F4C6973743B7872002C6A6176612E7574696C2E436F6C6C656374696F6E7324556E6D6F6469666961626C65436F6C6C656374696F6E19420080CB5EF71E0200014C00016371007E00047870737200136A6176612E7574696C2E41727261794C6973747881D21D99C7619D03000149000473697A657870000000017704000000017372002A636F6D2E7A6B78792E65646153746174696F6E2E617574682E656E746974792E5065726D697373696F6E00000000000000010200044C0009617574686F726974797400124C6A6176612F6C616E672F537472696E673B4C000B6465736372697074696F6E71007E000E4C000269647400134C6A6176612F6C616E672F496E74656765723B4C000375726C71007E000E7870740003616C6C740003616C6C737200116A6176612E6C616E672E496E746567657212E2A0A4F781873802000149000576616C7565787200106A6176612E6C616E672E4E756D62657286AC951D0B94E08B0200007870000000017400022F2A7871007E000C707372003A6F72672E737072696E676672616D65776F726B2E73656375726974792E6F61757468322E70726F76696465722E4F41757468325265717565737400000000000000010200075A0008617070726F7665644C000B617574686F72697469657371007E00044C000A657874656E73696F6E7374000F4C6A6176612F7574696C2F4D61703B4C000B726564697265637455726971007E000E4C00077265667265736874003B4C6F72672F737072696E676672616D65776F726B2F73656375726974792F6F61757468322F70726F76696465722F546F6B656E526571756573743B4C000B7265736F7572636549647374000F4C6A6176612F7574696C2F5365743B4C000D726573706F6E7365547970657371007E001A787200386F72672E737072696E676672616D65776F726B2E73656375726974792E6F61757468322E70726F76696465722E426173655265717565737436287A3EA37169BD0200034C0008636C69656E74496471007E000E4C001172657175657374506172616D657465727371007E00184C000573636F706571007E001A78707400026331737200256A6176612E7574696C2E436F6C6C656374696F6E7324556E6D6F6469666961626C654D6170F1A5A8FE74F507420200014C00016D71007E00187870737200116A6176612E7574696C2E486173684D61700507DAC1C31660D103000246000A6C6F6164466163746F724900097468726573686F6C6478703F400000000000067708000000080000000474000D726573706F6E73655F74797065740004636F646574000C72656469726563745F757269740014687474703A2F2F7777772E62616964752E636F6D740009636C69656E745F696471007E001D74000573636F706574000A524F4C455F41444D494E78737200256A6176612E7574696C2E436F6C6C656374696F6E7324556E6D6F6469666961626C65536574801D92D18F9B80550200007871007E0009737200176A6176612E7574696C2E4C696E6B656448617368536574D86CD75A95DD2A1E020000787200116A6176612E7574696C2E48617368536574BA44859596B8B7340300007870770C000000103F4000000000000171007E002878017371007E002C770C000000103F40000000000000787371007E00203F40000000000000770800000010000000007871007E0025707371007E002C770C000000103F4000000000000174000472657331787371007E002C770C000000103F4000000000000171007E0023787372004F6F72672E737072696E676672616D65776F726B2E73656375726974792E61757468656E7469636174696F6E2E557365726E616D6550617373776F726441757468656E7469636174696F6E546F6B656E00000000000001FE0200024C000B63726564656E7469616C7371007E00054C00097072696E636970616C71007E00057871007E0003017371007E00077371007E000B0000000177040000000171007E00107871007E0036737200486F72672E737072696E676672616D65776F726B2E73656375726974792E7765622E61757468656E7469636174696F6E2E57656241757468656E7469636174696F6E44657461696C7300000000000001FE0200024C000D72656D6F74654164647265737371007E000E4C000973657373696F6E496471007E000E787074000D3139322E3136382E31302E35397400203338353433453641463642393039344542354336343337433339434137303838707372002D636F6D2E7A6B78792E65646153746174696F6E2E617574682E6D6F64656C2E5573657244657461696C496D706CBB2E73D83557C5D30200055A00096973456E61626C65644C000B617574686F72697469657371007E00044C0002696471007E000F4C000870617373776F726471007E000E4C0008757365726E616D6571007E000E7870017371007E000B0000000177040000000171007E00107871007E001574003C243261243130246E31586B46783139434D383661497335376B4A484B657A6A336E674B5345694D5655646F744373485164776D526E41373475787469740004426F7373);
INSERT INTO `oauth_code` VALUES ('2020-12-09 18:44:34', 'ZTd72j', 0xACED0005737200416F72672E737072696E676672616D65776F726B2E73656375726974792E6F61757468322E70726F76696465722E4F417574683241757468656E7469636174696F6EBD400B02166252130200024C000D73746F7265645265717565737474003C4C6F72672F737072696E676672616D65776F726B2F73656375726974792F6F61757468322F70726F76696465722F4F4175746832526571756573743B4C00127573657241757468656E7469636174696F6E7400324C6F72672F737072696E676672616D65776F726B2F73656375726974792F636F72652F41757468656E7469636174696F6E3B787200476F72672E737072696E676672616D65776F726B2E73656375726974792E61757468656E7469636174696F6E2E416273747261637441757468656E7469636174696F6E546F6B656ED3AA287E6E47640E0200035A000D61757468656E746963617465644C000B617574686F7269746965737400164C6A6176612F7574696C2F436F6C6C656374696F6E3B4C000764657461696C737400124C6A6176612F6C616E672F4F626A6563743B787000737200266A6176612E7574696C2E436F6C6C656374696F6E7324556E6D6F6469666961626C654C697374FC0F2531B5EC8E100200014C00046C6973747400104C6A6176612F7574696C2F4C6973743B7872002C6A6176612E7574696C2E436F6C6C656374696F6E7324556E6D6F6469666961626C65436F6C6C656374696F6E19420080CB5EF71E0200014C00016371007E00047870737200136A6176612E7574696C2E41727261794C6973747881D21D99C7619D03000149000473697A657870000000017704000000017372002A636F6D2E7A6B78792E65646153746174696F6E2E617574682E656E746974792E5065726D697373696F6E00000000000000010200044C0009617574686F726974797400124C6A6176612F6C616E672F537472696E673B4C000B6465736372697074696F6E71007E000E4C000269647400134C6A6176612F6C616E672F496E74656765723B4C000375726C71007E000E7870740003616C6C740003616C6C737200116A6176612E6C616E672E496E746567657212E2A0A4F781873802000149000576616C7565787200106A6176612E6C616E672E4E756D62657286AC951D0B94E08B0200007870000000017400022F2A7871007E000C707372003A6F72672E737072696E676672616D65776F726B2E73656375726974792E6F61757468322E70726F76696465722E4F41757468325265717565737400000000000000010200075A0008617070726F7665644C000B617574686F72697469657371007E00044C000A657874656E73696F6E7374000F4C6A6176612F7574696C2F4D61703B4C000B726564697265637455726971007E000E4C00077265667265736874003B4C6F72672F737072696E676672616D65776F726B2F73656375726974792F6F61757468322F70726F76696465722F546F6B656E526571756573743B4C000B7265736F7572636549647374000F4C6A6176612F7574696C2F5365743B4C000D726573706F6E7365547970657371007E001A787200386F72672E737072696E676672616D65776F726B2E73656375726974792E6F61757468322E70726F76696465722E426173655265717565737436287A3EA37169BD0200034C0008636C69656E74496471007E000E4C001172657175657374506172616D657465727371007E00184C000573636F706571007E001A78707400026331737200256A6176612E7574696C2E436F6C6C656374696F6E7324556E6D6F6469666961626C654D6170F1A5A8FE74F507420200014C00016D71007E00187870737200116A6176612E7574696C2E486173684D61700507DAC1C31660D103000246000A6C6F6164466163746F724900097468726573686F6C6478703F400000000000067708000000080000000474000D726573706F6E73655F74797065740004636F646574000C72656469726563745F757269740014687474703A2F2F7777772E62616964752E636F6D740009636C69656E745F696471007E001D74000573636F706574000A524F4C455F41444D494E78737200256A6176612E7574696C2E436F6C6C656374696F6E7324556E6D6F6469666961626C65536574801D92D18F9B80550200007871007E0009737200176A6176612E7574696C2E4C696E6B656448617368536574D86CD75A95DD2A1E020000787200116A6176612E7574696C2E48617368536574BA44859596B8B7340300007870770C000000103F4000000000000171007E002878017371007E002C770C000000103F40000000000000787371007E00203F40000000000000770800000010000000007871007E0025707371007E002C770C000000103F4000000000000174000472657331787371007E002C770C000000103F4000000000000171007E0023787372004F6F72672E737072696E676672616D65776F726B2E73656375726974792E61757468656E7469636174696F6E2E557365726E616D6550617373776F726441757468656E7469636174696F6E546F6B656E00000000000001FE0200024C000B63726564656E7469616C7371007E00054C00097072696E636970616C71007E00057871007E0003017371007E00077371007E000B0000000177040000000171007E00107871007E0036737200486F72672E737072696E676672616D65776F726B2E73656375726974792E7765622E61757468656E7469636174696F6E2E57656241757468656E7469636174696F6E44657461696C7300000000000001FE0200024C000D72656D6F74654164647265737371007E000E4C000973657373696F6E496471007E000E787074000D3139322E3136382E31302E35397400204445344236314344333837393736453937313932443130314644413343384343707372002D636F6D2E7A6B78792E65646153746174696F6E2E617574682E6D6F64656C2E5573657244657461696C496D706CBB2E73D83557C5D30200055A00096973456E61626C65644C000B617574686F72697469657371007E00044C0002696471007E000F4C000870617373776F726471007E000E4C0008757365726E616D6571007E000E7870017371007E000B0000000177040000000171007E00107871007E001574003C243261243130246E31586B46783139434D383661497335376B4A484B657A6A336E674B5345694D5655646F744373485164776D526E41373475787469740004426F7373);
INSERT INTO `oauth_code` VALUES ('2020-12-09 19:39:12', 'J4zWpm', 0xACED0005737200416F72672E737072696E676672616D65776F726B2E73656375726974792E6F61757468322E70726F76696465722E4F417574683241757468656E7469636174696F6EBD400B02166252130200024C000D73746F7265645265717565737474003C4C6F72672F737072696E676672616D65776F726B2F73656375726974792F6F61757468322F70726F76696465722F4F4175746832526571756573743B4C00127573657241757468656E7469636174696F6E7400324C6F72672F737072696E676672616D65776F726B2F73656375726974792F636F72652F41757468656E7469636174696F6E3B787200476F72672E737072696E676672616D65776F726B2E73656375726974792E61757468656E7469636174696F6E2E416273747261637441757468656E7469636174696F6E546F6B656ED3AA287E6E47640E0200035A000D61757468656E746963617465644C000B617574686F7269746965737400164C6A6176612F7574696C2F436F6C6C656374696F6E3B4C000764657461696C737400124C6A6176612F6C616E672F4F626A6563743B787000737200266A6176612E7574696C2E436F6C6C656374696F6E7324556E6D6F6469666961626C654C697374FC0F2531B5EC8E100200014C00046C6973747400104C6A6176612F7574696C2F4C6973743B7872002C6A6176612E7574696C2E436F6C6C656374696F6E7324556E6D6F6469666961626C65436F6C6C656374696F6E19420080CB5EF71E0200014C00016371007E00047870737200136A6176612E7574696C2E41727261794C6973747881D21D99C7619D03000149000473697A657870000000017704000000017372002A636F6D2E7A6B78792E65646153746174696F6E2E617574682E656E746974792E5065726D697373696F6E00000000000000010200044C0009617574686F726974797400124C6A6176612F6C616E672F537472696E673B4C000B6465736372697074696F6E71007E000E4C000269647400134C6A6176612F6C616E672F496E74656765723B4C000375726C71007E000E7870740003616C6C740003616C6C737200116A6176612E6C616E672E496E746567657212E2A0A4F781873802000149000576616C7565787200106A6176612E6C616E672E4E756D62657286AC951D0B94E08B0200007870000000017400022F2A7871007E000C707372003A6F72672E737072696E676672616D65776F726B2E73656375726974792E6F61757468322E70726F76696465722E4F41757468325265717565737400000000000000010200075A0008617070726F7665644C000B617574686F72697469657371007E00044C000A657874656E73696F6E7374000F4C6A6176612F7574696C2F4D61703B4C000B726564697265637455726971007E000E4C00077265667265736874003B4C6F72672F737072696E676672616D65776F726B2F73656375726974792F6F61757468322F70726F76696465722F546F6B656E526571756573743B4C000B7265736F7572636549647374000F4C6A6176612F7574696C2F5365743B4C000D726573706F6E7365547970657371007E001A787200386F72672E737072696E676672616D65776F726B2E73656375726974792E6F61757468322E70726F76696465722E426173655265717565737436287A3EA37169BD0200034C0008636C69656E74496471007E000E4C001172657175657374506172616D657465727371007E00184C000573636F706571007E001A78707400026331737200256A6176612E7574696C2E436F6C6C656374696F6E7324556E6D6F6469666961626C654D6170F1A5A8FE74F507420200014C00016D71007E00187870737200116A6176612E7574696C2E486173684D61700507DAC1C31660D103000246000A6C6F6164466163746F724900097468726573686F6C6478703F400000000000067708000000080000000474000D726573706F6E73655F74797065740004636F646574000C72656469726563745F757269740014687474703A2F2F7777772E62616964752E636F6D740009636C69656E745F696471007E001D74000573636F706574000A524F4C455F41444D494E78737200256A6176612E7574696C2E436F6C6C656374696F6E7324556E6D6F6469666961626C65536574801D92D18F9B80550200007871007E0009737200176A6176612E7574696C2E4C696E6B656448617368536574D86CD75A95DD2A1E020000787200116A6176612E7574696C2E48617368536574BA44859596B8B7340300007870770C000000103F4000000000000171007E002878017371007E002C770C000000103F40000000000000787371007E00203F40000000000000770800000010000000007871007E0025707371007E002C770C000000103F4000000000000174000472657331787371007E002C770C000000103F4000000000000171007E0023787372004F6F72672E737072696E676672616D65776F726B2E73656375726974792E61757468656E7469636174696F6E2E557365726E616D6550617373776F726441757468656E7469636174696F6E546F6B656E00000000000001FE0200024C000B63726564656E7469616C7371007E00054C00097072696E636970616C71007E00057871007E0003017371007E00077371007E000B0000000177040000000171007E00107871007E0036737200486F72672E737072696E676672616D65776F726B2E73656375726974792E7765622E61757468656E7469636174696F6E2E57656241757468656E7469636174696F6E44657461696C7300000000000001FE0200024C000D72656D6F74654164647265737371007E000E4C000973657373696F6E496471007E000E787074000D3139322E3136382E31302E35397400204530343545333145333330453339323837333531434333443935334131453442707372002D636F6D2E7A6B78792E65646153746174696F6E2E617574682E6D6F64656C2E5573657244657461696C496D706CBB2E73D83557C5D30200055A00096973456E61626C65644C000B617574686F72697469657371007E00044C0002696471007E000F4C000870617373776F726471007E000E4C0008757365726E616D6571007E000E7870017371007E000B0000000177040000000171007E00107871007E001574003C243261243130246E31586B46783139434D383661497335376B4A484B657A6A336E674B5345694D5655646F744373485164776D526E41373475787469740004426F7373);
INSERT INTO `oauth_code` VALUES ('2020-12-09 21:45:59', 'tWKptq', 0xACED0005737200416F72672E737072696E676672616D65776F726B2E73656375726974792E6F61757468322E70726F76696465722E4F417574683241757468656E7469636174696F6EBD400B02166252130200024C000D73746F7265645265717565737474003C4C6F72672F737072696E676672616D65776F726B2F73656375726974792F6F61757468322F70726F76696465722F4F4175746832526571756573743B4C00127573657241757468656E7469636174696F6E7400324C6F72672F737072696E676672616D65776F726B2F73656375726974792F636F72652F41757468656E7469636174696F6E3B787200476F72672E737072696E676672616D65776F726B2E73656375726974792E61757468656E7469636174696F6E2E416273747261637441757468656E7469636174696F6E546F6B656ED3AA287E6E47640E0200035A000D61757468656E746963617465644C000B617574686F7269746965737400164C6A6176612F7574696C2F436F6C6C656374696F6E3B4C000764657461696C737400124C6A6176612F6C616E672F4F626A6563743B787000737200266A6176612E7574696C2E436F6C6C656374696F6E7324556E6D6F6469666961626C654C697374FC0F2531B5EC8E100200014C00046C6973747400104C6A6176612F7574696C2F4C6973743B7872002C6A6176612E7574696C2E436F6C6C656374696F6E7324556E6D6F6469666961626C65436F6C6C656374696F6E19420080CB5EF71E0200014C00016371007E00047870737200136A6176612E7574696C2E41727261794C6973747881D21D99C7619D03000149000473697A657870000000017704000000017372002A636F6D2E7A6B78792E65646153746174696F6E2E617574682E656E746974792E5065726D697373696F6E00000000000000010200044C0009617574686F726974797400124C6A6176612F6C616E672F537472696E673B4C000B6465736372697074696F6E71007E000E4C000269647400134C6A6176612F6C616E672F496E74656765723B4C000375726C71007E000E7870740003616C6C740003616C6C737200116A6176612E6C616E672E496E746567657212E2A0A4F781873802000149000576616C7565787200106A6176612E6C616E672E4E756D62657286AC951D0B94E08B0200007870000000017400022F2A7871007E000C707372003A6F72672E737072696E676672616D65776F726B2E73656375726974792E6F61757468322E70726F76696465722E4F41757468325265717565737400000000000000010200075A0008617070726F7665644C000B617574686F72697469657371007E00044C000A657874656E73696F6E7374000F4C6A6176612F7574696C2F4D61703B4C000B726564697265637455726971007E000E4C00077265667265736874003B4C6F72672F737072696E676672616D65776F726B2F73656375726974792F6F61757468322F70726F76696465722F546F6B656E526571756573743B4C000B7265736F7572636549647374000F4C6A6176612F7574696C2F5365743B4C000D726573706F6E7365547970657371007E001A787200386F72672E737072696E676672616D65776F726B2E73656375726974792E6F61757468322E70726F76696465722E426173655265717565737436287A3EA37169BD0200034C0008636C69656E74496471007E000E4C001172657175657374506172616D657465727371007E00184C000573636F706571007E001A78707400026331737200256A6176612E7574696C2E436F6C6C656374696F6E7324556E6D6F6469666961626C654D6170F1A5A8FE74F507420200014C00016D71007E00187870737200116A6176612E7574696C2E486173684D61700507DAC1C31660D103000246000A6C6F6164466163746F724900097468726573686F6C6478703F400000000000067708000000080000000474000D726573706F6E73655F74797065740004636F646574000C72656469726563745F757269740014687474703A2F2F7777772E62616964752E636F6D740009636C69656E745F696471007E001D74000573636F706574000A524F4C455F41444D494E78737200256A6176612E7574696C2E436F6C6C656374696F6E7324556E6D6F6469666961626C65536574801D92D18F9B80550200007871007E0009737200176A6176612E7574696C2E4C696E6B656448617368536574D86CD75A95DD2A1E020000787200116A6176612E7574696C2E48617368536574BA44859596B8B7340300007870770C000000103F4000000000000171007E002878017371007E002C770C000000103F40000000000000787371007E00203F40000000000000770800000010000000007871007E0025707371007E002C770C000000103F4000000000000174000472657331787371007E002C770C000000103F4000000000000171007E0023787372004F6F72672E737072696E676672616D65776F726B2E73656375726974792E61757468656E7469636174696F6E2E557365726E616D6550617373776F726441757468656E7469636174696F6E546F6B656E00000000000001FE0200024C000B63726564656E7469616C7371007E00054C00097072696E636970616C71007E00057871007E0003017371007E00077371007E000B0000000177040000000171007E00107871007E0036737200486F72672E737072696E676672616D65776F726B2E73656375726974792E7765622E61757468656E7469636174696F6E2E57656241757468656E7469636174696F6E44657461696C7300000000000001FE0200024C000D72656D6F74654164647265737371007E000E4C000973657373696F6E496471007E000E787074000D3139322E3136382E31302E35397400203845453746464433453838314341423838374237374531324644363935383031707372002D636F6D2E7A6B78792E65646153746174696F6E2E617574682E6D6F64656C2E5573657244657461696C496D706CBB2E73D83557C5D30200055A00096973456E61626C65644C000B617574686F72697469657371007E00044C0002696471007E000F4C000870617373776F726471007E000E4C0008757365726E616D6571007E000E7870017371007E000B0000000177040000000171007E00107871007E001574003C243261243130246E31586B46783139434D383661497335376B4A484B657A6A336E674B5345694D5655646F744373485164776D526E41373475787469740004426F7373);
INSERT INTO `oauth_code` VALUES ('2020-12-10 17:20:37', '2ml8HT', 0xACED0005737200416F72672E737072696E676672616D65776F726B2E73656375726974792E6F61757468322E70726F76696465722E4F417574683241757468656E7469636174696F6EBD400B02166252130200024C000D73746F7265645265717565737474003C4C6F72672F737072696E676672616D65776F726B2F73656375726974792F6F61757468322F70726F76696465722F4F4175746832526571756573743B4C00127573657241757468656E7469636174696F6E7400324C6F72672F737072696E676672616D65776F726B2F73656375726974792F636F72652F41757468656E7469636174696F6E3B787200476F72672E737072696E676672616D65776F726B2E73656375726974792E61757468656E7469636174696F6E2E416273747261637441757468656E7469636174696F6E546F6B656ED3AA287E6E47640E0200035A000D61757468656E746963617465644C000B617574686F7269746965737400164C6A6176612F7574696C2F436F6C6C656374696F6E3B4C000764657461696C737400124C6A6176612F6C616E672F4F626A6563743B787000737200266A6176612E7574696C2E436F6C6C656374696F6E7324556E6D6F6469666961626C654C697374FC0F2531B5EC8E100200014C00046C6973747400104C6A6176612F7574696C2F4C6973743B7872002C6A6176612E7574696C2E436F6C6C656374696F6E7324556E6D6F6469666961626C65436F6C6C656374696F6E19420080CB5EF71E0200014C00016371007E00047870737200136A6176612E7574696C2E41727261794C6973747881D21D99C7619D03000149000473697A657870000000017704000000017372002A636F6D2E7A6B78792E65646153746174696F6E2E617574682E656E746974792E5065726D697373696F6E00000000000000010200044C0009617574686F726974797400124C6A6176612F6C616E672F537472696E673B4C000B6465736372697074696F6E71007E000E4C000269647400134C6A6176612F6C616E672F496E74656765723B4C000375726C71007E000E7870740003616C6C740003616C6C737200116A6176612E6C616E672E496E746567657212E2A0A4F781873802000149000576616C7565787200106A6176612E6C616E672E4E756D62657286AC951D0B94E08B0200007870000000017400022F2A7871007E000C707372003A6F72672E737072696E676672616D65776F726B2E73656375726974792E6F61757468322E70726F76696465722E4F41757468325265717565737400000000000000010200075A0008617070726F7665644C000B617574686F72697469657371007E00044C000A657874656E73696F6E7374000F4C6A6176612F7574696C2F4D61703B4C000B726564697265637455726971007E000E4C00077265667265736874003B4C6F72672F737072696E676672616D65776F726B2F73656375726974792F6F61757468322F70726F76696465722F546F6B656E526571756573743B4C000B7265736F7572636549647374000F4C6A6176612F7574696C2F5365743B4C000D726573706F6E7365547970657371007E001A787200386F72672E737072696E676672616D65776F726B2E73656375726974792E6F61757468322E70726F76696465722E426173655265717565737436287A3EA37169BD0200034C0008636C69656E74496471007E000E4C001172657175657374506172616D657465727371007E00184C000573636F706571007E001A78707400026331737200256A6176612E7574696C2E436F6C6C656374696F6E7324556E6D6F6469666961626C654D6170F1A5A8FE74F507420200014C00016D71007E00187870737200116A6176612E7574696C2E486173684D61700507DAC1C31660D103000246000A6C6F6164466163746F724900097468726573686F6C6478703F400000000000067708000000080000000474000D726573706F6E73655F74797065740004636F646574000C72656469726563745F757269740014687474703A2F2F7777772E62616964752E636F6D740009636C69656E745F696471007E001D74000573636F706574000A524F4C455F41444D494E78737200256A6176612E7574696C2E436F6C6C656374696F6E7324556E6D6F6469666961626C65536574801D92D18F9B80550200007871007E0009737200176A6176612E7574696C2E4C696E6B656448617368536574D86CD75A95DD2A1E020000787200116A6176612E7574696C2E48617368536574BA44859596B8B7340300007870770C000000103F4000000000000171007E002878017371007E002C770C000000103F40000000000000787371007E00203F40000000000000770800000010000000007871007E0025707371007E002C770C000000103F4000000000000174000472657331787371007E002C770C000000103F4000000000000171007E0023787372004F6F72672E737072696E676672616D65776F726B2E73656375726974792E61757468656E7469636174696F6E2E557365726E616D6550617373776F726441757468656E7469636174696F6E546F6B656E00000000000001FE0200024C000B63726564656E7469616C7371007E00054C00097072696E636970616C71007E00057871007E0003017371007E00077371007E000B0000000177040000000171007E00107871007E0036737200486F72672E737072696E676672616D65776F726B2E73656375726974792E7765622E61757468656E7469636174696F6E2E57656241757468656E7469636174696F6E44657461696C7300000000000001FE0200024C000D72656D6F74654164647265737371007E000E4C000973657373696F6E496471007E000E787074000D3139322E3136382E31302E35397400204145304541433732393735453543383845463537374234373643393930444139707372002D636F6D2E7A6B78792E65646153746174696F6E2E617574682E6D6F64656C2E5573657244657461696C496D706CBB2E73D83557C5D30200055A00096973456E61626C65644C000B617574686F72697469657371007E00044C0002696471007E000F4C000870617373776F726471007E000E4C0008757365726E616D6571007E000E7870017371007E000B0000000177040000000171007E00107871007E001574003C243261243130246E31586B46783139434D383661497335376B4A484B657A6A336E674B5345694D5655646F744373485164776D526E41373475787469740004426F7373);
INSERT INTO `oauth_code` VALUES ('2020-12-11 01:00:44', 'nNwKv8', 0xACED0005737200416F72672E737072696E676672616D65776F726B2E73656375726974792E6F61757468322E70726F76696465722E4F417574683241757468656E7469636174696F6EBD400B02166252130200024C000D73746F7265645265717565737474003C4C6F72672F737072696E676672616D65776F726B2F73656375726974792F6F61757468322F70726F76696465722F4F4175746832526571756573743B4C00127573657241757468656E7469636174696F6E7400324C6F72672F737072696E676672616D65776F726B2F73656375726974792F636F72652F41757468656E7469636174696F6E3B787200476F72672E737072696E676672616D65776F726B2E73656375726974792E61757468656E7469636174696F6E2E416273747261637441757468656E7469636174696F6E546F6B656ED3AA287E6E47640E0200035A000D61757468656E746963617465644C000B617574686F7269746965737400164C6A6176612F7574696C2F436F6C6C656374696F6E3B4C000764657461696C737400124C6A6176612F6C616E672F4F626A6563743B787000737200266A6176612E7574696C2E436F6C6C656374696F6E7324556E6D6F6469666961626C654C697374FC0F2531B5EC8E100200014C00046C6973747400104C6A6176612F7574696C2F4C6973743B7872002C6A6176612E7574696C2E436F6C6C656374696F6E7324556E6D6F6469666961626C65436F6C6C656374696F6E19420080CB5EF71E0200014C00016371007E00047870737200136A6176612E7574696C2E41727261794C6973747881D21D99C7619D03000149000473697A657870000000017704000000017372002A636F6D2E7A6B78792E65646153746174696F6E2E617574682E656E746974792E5065726D697373696F6E00000000000000010200044C0009617574686F726974797400124C6A6176612F6C616E672F537472696E673B4C000B6465736372697074696F6E71007E000E4C000269647400134C6A6176612F6C616E672F496E74656765723B4C000375726C71007E000E7870740003616C6C740003616C6C737200116A6176612E6C616E672E496E746567657212E2A0A4F781873802000149000576616C7565787200106A6176612E6C616E672E4E756D62657286AC951D0B94E08B0200007870000000017400022F2A7871007E000C707372003A6F72672E737072696E676672616D65776F726B2E73656375726974792E6F61757468322E70726F76696465722E4F41757468325265717565737400000000000000010200075A0008617070726F7665644C000B617574686F72697469657371007E00044C000A657874656E73696F6E7374000F4C6A6176612F7574696C2F4D61703B4C000B726564697265637455726971007E000E4C00077265667265736874003B4C6F72672F737072696E676672616D65776F726B2F73656375726974792F6F61757468322F70726F76696465722F546F6B656E526571756573743B4C000B7265736F7572636549647374000F4C6A6176612F7574696C2F5365743B4C000D726573706F6E7365547970657371007E001A787200386F72672E737072696E676672616D65776F726B2E73656375726974792E6F61757468322E70726F76696465722E426173655265717565737436287A3EA37169BD0200034C0008636C69656E74496471007E000E4C001172657175657374506172616D657465727371007E00184C000573636F706571007E001A78707400026331737200256A6176612E7574696C2E436F6C6C656374696F6E7324556E6D6F6469666961626C654D6170F1A5A8FE74F507420200014C00016D71007E00187870737200116A6176612E7574696C2E486173684D61700507DAC1C31660D103000246000A6C6F6164466163746F724900097468726573686F6C6478703F400000000000067708000000080000000474000D726573706F6E73655F74797065740004636F646574000C72656469726563745F757269740014687474703A2F2F7777772E62616964752E636F6D740009636C69656E745F696471007E001D74000573636F706574000A524F4C455F41444D494E78737200256A6176612E7574696C2E436F6C6C656374696F6E7324556E6D6F6469666961626C65536574801D92D18F9B80550200007871007E0009737200176A6176612E7574696C2E4C696E6B656448617368536574D86CD75A95DD2A1E020000787200116A6176612E7574696C2E48617368536574BA44859596B8B7340300007870770C000000103F4000000000000171007E002878017371007E002C770C000000103F40000000000000787371007E00203F40000000000000770800000010000000007871007E0025707371007E002C770C000000103F4000000000000174000472657331787371007E002C770C000000103F4000000000000171007E0023787372004F6F72672E737072696E676672616D65776F726B2E73656375726974792E61757468656E7469636174696F6E2E557365726E616D6550617373776F726441757468656E7469636174696F6E546F6B656E00000000000001FE0200024C000B63726564656E7469616C7371007E00054C00097072696E636970616C71007E00057871007E0003017371007E00077371007E000B0000000177040000000171007E00107871007E0036737200486F72672E737072696E676672616D65776F726B2E73656375726974792E7765622E61757468656E7469636174696F6E2E57656241757468656E7469636174696F6E44657461696C7300000000000001FE0200024C000D72656D6F74654164647265737371007E000E4C000973657373696F6E496471007E000E787074000D3139322E3136382E31302E35397400204631373836423142433835373430413030393134313544323034384646434442707372002D636F6D2E7A6B78792E65646153746174696F6E2E617574682E6D6F64656C2E5573657244657461696C496D706CBB2E73D83557C5D30200055A00096973456E61626C65644C000B617574686F72697469657371007E00044C0002696471007E000F4C000870617373776F726471007E000E4C0008757365726E616D6571007E000E7870017371007E000B0000000177040000000171007E00107871007E001574003C243261243130246E31586B46783139434D383661497335376B4A484B657A6A336E674B5345694D5655646F744373485164776D526E41373475787469740004426F7373);
INSERT INTO `oauth_code` VALUES ('2020-12-11 01:06:43', 'Wbr23j', 0xACED0005737200416F72672E737072696E676672616D65776F726B2E73656375726974792E6F61757468322E70726F76696465722E4F417574683241757468656E7469636174696F6EBD400B02166252130200024C000D73746F7265645265717565737474003C4C6F72672F737072696E676672616D65776F726B2F73656375726974792F6F61757468322F70726F76696465722F4F4175746832526571756573743B4C00127573657241757468656E7469636174696F6E7400324C6F72672F737072696E676672616D65776F726B2F73656375726974792F636F72652F41757468656E7469636174696F6E3B787200476F72672E737072696E676672616D65776F726B2E73656375726974792E61757468656E7469636174696F6E2E416273747261637441757468656E7469636174696F6E546F6B656ED3AA287E6E47640E0200035A000D61757468656E746963617465644C000B617574686F7269746965737400164C6A6176612F7574696C2F436F6C6C656374696F6E3B4C000764657461696C737400124C6A6176612F6C616E672F4F626A6563743B787000737200266A6176612E7574696C2E436F6C6C656374696F6E7324556E6D6F6469666961626C654C697374FC0F2531B5EC8E100200014C00046C6973747400104C6A6176612F7574696C2F4C6973743B7872002C6A6176612E7574696C2E436F6C6C656374696F6E7324556E6D6F6469666961626C65436F6C6C656374696F6E19420080CB5EF71E0200014C00016371007E00047870737200136A6176612E7574696C2E41727261794C6973747881D21D99C7619D03000149000473697A657870000000017704000000017372002A636F6D2E7A6B78792E65646153746174696F6E2E617574682E656E746974792E5065726D697373696F6E00000000000000010200044C0009617574686F726974797400124C6A6176612F6C616E672F537472696E673B4C000B6465736372697074696F6E71007E000E4C000269647400134C6A6176612F6C616E672F496E74656765723B4C000375726C71007E000E7870740003616C6C740003616C6C737200116A6176612E6C616E672E496E746567657212E2A0A4F781873802000149000576616C7565787200106A6176612E6C616E672E4E756D62657286AC951D0B94E08B0200007870000000017400022F2A7871007E000C707372003A6F72672E737072696E676672616D65776F726B2E73656375726974792E6F61757468322E70726F76696465722E4F41757468325265717565737400000000000000010200075A0008617070726F7665644C000B617574686F72697469657371007E00044C000A657874656E73696F6E7374000F4C6A6176612F7574696C2F4D61703B4C000B726564697265637455726971007E000E4C00077265667265736874003B4C6F72672F737072696E676672616D65776F726B2F73656375726974792F6F61757468322F70726F76696465722F546F6B656E526571756573743B4C000B7265736F7572636549647374000F4C6A6176612F7574696C2F5365743B4C000D726573706F6E7365547970657371007E001A787200386F72672E737072696E676672616D65776F726B2E73656375726974792E6F61757468322E70726F76696465722E426173655265717565737436287A3EA37169BD0200034C0008636C69656E74496471007E000E4C001172657175657374506172616D657465727371007E00184C000573636F706571007E001A78707400026331737200256A6176612E7574696C2E436F6C6C656374696F6E7324556E6D6F6469666961626C654D6170F1A5A8FE74F507420200014C00016D71007E00187870737200116A6176612E7574696C2E486173684D61700507DAC1C31660D103000246000A6C6F6164466163746F724900097468726573686F6C6478703F400000000000067708000000080000000474000D726573706F6E73655F74797065740004636F646574000C72656469726563745F757269740014687474703A2F2F7777772E62616964752E636F6D740009636C69656E745F696471007E001D74000573636F706574000A524F4C455F41444D494E78737200256A6176612E7574696C2E436F6C6C656374696F6E7324556E6D6F6469666961626C65536574801D92D18F9B80550200007871007E0009737200176A6176612E7574696C2E4C696E6B656448617368536574D86CD75A95DD2A1E020000787200116A6176612E7574696C2E48617368536574BA44859596B8B7340300007870770C000000103F4000000000000171007E002878017371007E002C770C000000103F40000000000000787371007E00203F40000000000000770800000010000000007871007E0025707371007E002C770C000000103F4000000000000174000472657331787371007E002C770C000000103F4000000000000171007E0023787372004F6F72672E737072696E676672616D65776F726B2E73656375726974792E61757468656E7469636174696F6E2E557365726E616D6550617373776F726441757468656E7469636174696F6E546F6B656E00000000000001FE0200024C000B63726564656E7469616C7371007E00054C00097072696E636970616C71007E00057871007E0003017371007E00077371007E000B0000000177040000000171007E00107871007E0036737200486F72672E737072696E676672616D65776F726B2E73656375726974792E7765622E61757468656E7469636174696F6E2E57656241757468656E7469636174696F6E44657461696C7300000000000001FE0200024C000D72656D6F74654164647265737371007E000E4C000973657373696F6E496471007E000E787074000D3139322E3136382E31302E35397400204231413631364344424139453539373930363545323038354538433337433643707372002D636F6D2E7A6B78792E65646153746174696F6E2E617574682E6D6F64656C2E5573657244657461696C496D706CBB2E73D83557C5D30200055A00096973456E61626C65644C000B617574686F72697469657371007E00044C0002696471007E000F4C000870617373776F726471007E000E4C0008757365726E616D6571007E000E7870017371007E000B0000000177040000000171007E00107871007E001574003C243261243130246E31586B46783139434D383661497335376B4A484B657A6A336E674B5345694D5655646F744373485164776D526E41373475787469740004426F7373);
INSERT INTO `oauth_code` VALUES ('2020-12-11 19:24:41', 'Z5qMj1', 0xACED0005737200416F72672E737072696E676672616D65776F726B2E73656375726974792E6F61757468322E70726F76696465722E4F417574683241757468656E7469636174696F6EBD400B02166252130200024C000D73746F7265645265717565737474003C4C6F72672F737072696E676672616D65776F726B2F73656375726974792F6F61757468322F70726F76696465722F4F4175746832526571756573743B4C00127573657241757468656E7469636174696F6E7400324C6F72672F737072696E676672616D65776F726B2F73656375726974792F636F72652F41757468656E7469636174696F6E3B787200476F72672E737072696E676672616D65776F726B2E73656375726974792E61757468656E7469636174696F6E2E416273747261637441757468656E7469636174696F6E546F6B656ED3AA287E6E47640E0200035A000D61757468656E746963617465644C000B617574686F7269746965737400164C6A6176612F7574696C2F436F6C6C656374696F6E3B4C000764657461696C737400124C6A6176612F6C616E672F4F626A6563743B787000737200266A6176612E7574696C2E436F6C6C656374696F6E7324556E6D6F6469666961626C654C697374FC0F2531B5EC8E100200014C00046C6973747400104C6A6176612F7574696C2F4C6973743B7872002C6A6176612E7574696C2E436F6C6C656374696F6E7324556E6D6F6469666961626C65436F6C6C656374696F6E19420080CB5EF71E0200014C00016371007E00047870737200136A6176612E7574696C2E41727261794C6973747881D21D99C7619D03000149000473697A657870000000017704000000017372002A636F6D2E7A6B78792E65646153746174696F6E2E617574682E656E746974792E5065726D697373696F6E00000000000000010200044C0009617574686F726974797400124C6A6176612F6C616E672F537472696E673B4C000B6465736372697074696F6E71007E000E4C000269647400134C6A6176612F6C616E672F496E74656765723B4C000375726C71007E000E7870740003616C6C740003616C6C737200116A6176612E6C616E672E496E746567657212E2A0A4F781873802000149000576616C7565787200106A6176612E6C616E672E4E756D62657286AC951D0B94E08B0200007870000000017400022F2A7871007E000C707372003A6F72672E737072696E676672616D65776F726B2E73656375726974792E6F61757468322E70726F76696465722E4F41757468325265717565737400000000000000010200075A0008617070726F7665644C000B617574686F72697469657371007E00044C000A657874656E73696F6E7374000F4C6A6176612F7574696C2F4D61703B4C000B726564697265637455726971007E000E4C00077265667265736874003B4C6F72672F737072696E676672616D65776F726B2F73656375726974792F6F61757468322F70726F76696465722F546F6B656E526571756573743B4C000B7265736F7572636549647374000F4C6A6176612F7574696C2F5365743B4C000D726573706F6E7365547970657371007E001A787200386F72672E737072696E676672616D65776F726B2E73656375726974792E6F61757468322E70726F76696465722E426173655265717565737436287A3EA37169BD0200034C0008636C69656E74496471007E000E4C001172657175657374506172616D657465727371007E00184C000573636F706571007E001A78707400026331737200256A6176612E7574696C2E436F6C6C656374696F6E7324556E6D6F6469666961626C654D6170F1A5A8FE74F507420200014C00016D71007E00187870737200116A6176612E7574696C2E486173684D61700507DAC1C31660D103000246000A6C6F6164466163746F724900097468726573686F6C6478703F400000000000067708000000080000000474000D726573706F6E73655F74797065740004636F646574000C72656469726563745F757269740014687474703A2F2F7777772E62616964752E636F6D740009636C69656E745F696471007E001D74000573636F706574000A524F4C455F41444D494E78737200256A6176612E7574696C2E436F6C6C656374696F6E7324556E6D6F6469666961626C65536574801D92D18F9B80550200007871007E0009737200176A6176612E7574696C2E4C696E6B656448617368536574D86CD75A95DD2A1E020000787200116A6176612E7574696C2E48617368536574BA44859596B8B7340300007870770C000000103F4000000000000171007E002878017371007E002C770C000000103F40000000000000787371007E00203F40000000000000770800000010000000007871007E0025707371007E002C770C000000103F4000000000000174000472657331787371007E002C770C000000103F4000000000000171007E0023787372004F6F72672E737072696E676672616D65776F726B2E73656375726974792E61757468656E7469636174696F6E2E557365726E616D6550617373776F726441757468656E7469636174696F6E546F6B656E00000000000001FE0200024C000B63726564656E7469616C7371007E00054C00097072696E636970616C71007E00057871007E0003017371007E00077371007E000B0000000177040000000171007E00107871007E0036737200486F72672E737072696E676672616D65776F726B2E73656375726974792E7765622E61757468656E7469636174696F6E2E57656241757468656E7469636174696F6E44657461696C7300000000000001FE0200024C000D72656D6F74654164647265737371007E000E4C000973657373696F6E496471007E000E787074000D3139322E3136382E31302E35397400203742373541434241433137313046433341363230324246343141363646323735707372002D636F6D2E7A6B78792E65646153746174696F6E2E617574682E6D6F64656C2E5573657244657461696C496D706CBB2E73D83557C5D30200055A00096973456E61626C65644C000B617574686F72697469657371007E00044C0002696471007E000F4C000870617373776F726471007E000E4C0008757365726E616D6571007E000E7870017371007E000B0000000177040000000171007E00107871007E001574003C243261243130246E31586B46783139434D383661497335376B4A484B657A6A336E674B5345694D5655646F744373485164776D526E41373475787469740004426F7373);
INSERT INTO `oauth_code` VALUES ('2020-12-11 23:26:22', 'ULqBeu', 0xACED0005737200416F72672E737072696E676672616D65776F726B2E73656375726974792E6F61757468322E70726F76696465722E4F417574683241757468656E7469636174696F6EBD400B02166252130200024C000D73746F7265645265717565737474003C4C6F72672F737072696E676672616D65776F726B2F73656375726974792F6F61757468322F70726F76696465722F4F4175746832526571756573743B4C00127573657241757468656E7469636174696F6E7400324C6F72672F737072696E676672616D65776F726B2F73656375726974792F636F72652F41757468656E7469636174696F6E3B787200476F72672E737072696E676672616D65776F726B2E73656375726974792E61757468656E7469636174696F6E2E416273747261637441757468656E7469636174696F6E546F6B656ED3AA287E6E47640E0200035A000D61757468656E746963617465644C000B617574686F7269746965737400164C6A6176612F7574696C2F436F6C6C656374696F6E3B4C000764657461696C737400124C6A6176612F6C616E672F4F626A6563743B787000737200266A6176612E7574696C2E436F6C6C656374696F6E7324556E6D6F6469666961626C654C697374FC0F2531B5EC8E100200014C00046C6973747400104C6A6176612F7574696C2F4C6973743B7872002C6A6176612E7574696C2E436F6C6C656374696F6E7324556E6D6F6469666961626C65436F6C6C656374696F6E19420080CB5EF71E0200014C00016371007E00047870737200136A6176612E7574696C2E41727261794C6973747881D21D99C7619D03000149000473697A657870000000017704000000017372002A636F6D2E7A6B78792E65646153746174696F6E2E617574682E656E746974792E5065726D697373696F6E00000000000000010200044C0009617574686F726974797400124C6A6176612F6C616E672F537472696E673B4C000B6465736372697074696F6E71007E000E4C000269647400134C6A6176612F6C616E672F496E74656765723B4C000375726C71007E000E7870740003616C6C740003616C6C737200116A6176612E6C616E672E496E746567657212E2A0A4F781873802000149000576616C7565787200106A6176612E6C616E672E4E756D62657286AC951D0B94E08B0200007870000000017400022F2A7871007E000C707372003A6F72672E737072696E676672616D65776F726B2E73656375726974792E6F61757468322E70726F76696465722E4F41757468325265717565737400000000000000010200075A0008617070726F7665644C000B617574686F72697469657371007E00044C000A657874656E73696F6E7374000F4C6A6176612F7574696C2F4D61703B4C000B726564697265637455726971007E000E4C00077265667265736874003B4C6F72672F737072696E676672616D65776F726B2F73656375726974792F6F61757468322F70726F76696465722F546F6B656E526571756573743B4C000B7265736F7572636549647374000F4C6A6176612F7574696C2F5365743B4C000D726573706F6E7365547970657371007E001A787200386F72672E737072696E676672616D65776F726B2E73656375726974792E6F61757468322E70726F76696465722E426173655265717565737436287A3EA37169BD0200034C0008636C69656E74496471007E000E4C001172657175657374506172616D657465727371007E00184C000573636F706571007E001A78707400026331737200256A6176612E7574696C2E436F6C6C656374696F6E7324556E6D6F6469666961626C654D6170F1A5A8FE74F507420200014C00016D71007E00187870737200116A6176612E7574696C2E486173684D61700507DAC1C31660D103000246000A6C6F6164466163746F724900097468726573686F6C6478703F400000000000067708000000080000000474000D726573706F6E73655F74797065740004636F646574000C72656469726563745F757269740014687474703A2F2F7777772E62616964752E636F6D740009636C69656E745F696471007E001D74000573636F706574000A524F4C455F41444D494E78737200256A6176612E7574696C2E436F6C6C656374696F6E7324556E6D6F6469666961626C65536574801D92D18F9B80550200007871007E0009737200176A6176612E7574696C2E4C696E6B656448617368536574D86CD75A95DD2A1E020000787200116A6176612E7574696C2E48617368536574BA44859596B8B7340300007870770C000000103F4000000000000171007E002878017371007E002C770C000000103F40000000000000787371007E00203F40000000000000770800000010000000007871007E0025707371007E002C770C000000103F4000000000000174000472657331787371007E002C770C000000103F4000000000000171007E0023787372004F6F72672E737072696E676672616D65776F726B2E73656375726974792E61757468656E7469636174696F6E2E557365726E616D6550617373776F726441757468656E7469636174696F6E546F6B656E00000000000001FE0200024C000B63726564656E7469616C7371007E00054C00097072696E636970616C71007E00057871007E0003017371007E00077371007E000B0000000177040000000171007E00107871007E0036737200486F72672E737072696E676672616D65776F726B2E73656375726974792E7765622E61757468656E7469636174696F6E2E57656241757468656E7469636174696F6E44657461696C7300000000000001FE0200024C000D72656D6F74654164647265737371007E000E4C000973657373696F6E496471007E000E787074000D3139322E3136382E31302E35397400203536444443343141463341354441353731373439393133453736443538303938707372002D636F6D2E7A6B78792E65646153746174696F6E2E617574682E6D6F64656C2E5573657244657461696C496D706CBB2E73D83557C5D30200055A00096973456E61626C65644C000B617574686F72697469657371007E00044C0002696471007E000F4C000870617373776F726471007E000E4C0008757365726E616D6571007E000E7870017371007E000B0000000177040000000171007E00107871007E001574003C243261243130246E31586B46783139434D383661497335376B4A484B657A6A336E674B5345694D5655646F744373485164776D526E41373475787469740004426F7373);
INSERT INTO `oauth_code` VALUES ('2020-12-15 18:07:12', 'X8ppEb', 0xACED0005737200416F72672E737072696E676672616D65776F726B2E73656375726974792E6F61757468322E70726F76696465722E4F417574683241757468656E7469636174696F6EBD400B02166252130200024C000D73746F7265645265717565737474003C4C6F72672F737072696E676672616D65776F726B2F73656375726974792F6F61757468322F70726F76696465722F4F4175746832526571756573743B4C00127573657241757468656E7469636174696F6E7400324C6F72672F737072696E676672616D65776F726B2F73656375726974792F636F72652F41757468656E7469636174696F6E3B787200476F72672E737072696E676672616D65776F726B2E73656375726974792E61757468656E7469636174696F6E2E416273747261637441757468656E7469636174696F6E546F6B656ED3AA287E6E47640E0200035A000D61757468656E746963617465644C000B617574686F7269746965737400164C6A6176612F7574696C2F436F6C6C656374696F6E3B4C000764657461696C737400124C6A6176612F6C616E672F4F626A6563743B787000737200266A6176612E7574696C2E436F6C6C656374696F6E7324556E6D6F6469666961626C654C697374FC0F2531B5EC8E100200014C00046C6973747400104C6A6176612F7574696C2F4C6973743B7872002C6A6176612E7574696C2E436F6C6C656374696F6E7324556E6D6F6469666961626C65436F6C6C656374696F6E19420080CB5EF71E0200014C00016371007E00047870737200136A6176612E7574696C2E41727261794C6973747881D21D99C7619D03000149000473697A657870000000017704000000017372002A636F6D2E7A6B78792E65646153746174696F6E2E617574682E656E746974792E5065726D697373696F6E00000000000000010200044C0009617574686F726974797400124C6A6176612F6C616E672F537472696E673B4C000B6465736372697074696F6E71007E000E4C000269647400134C6A6176612F6C616E672F496E74656765723B4C000375726C71007E000E7870740003616C6C740003616C6C737200116A6176612E6C616E672E496E746567657212E2A0A4F781873802000149000576616C7565787200106A6176612E6C616E672E4E756D62657286AC951D0B94E08B0200007870000000017400022F2A7871007E000C707372003A6F72672E737072696E676672616D65776F726B2E73656375726974792E6F61757468322E70726F76696465722E4F41757468325265717565737400000000000000010200075A0008617070726F7665644C000B617574686F72697469657371007E00044C000A657874656E73696F6E7374000F4C6A6176612F7574696C2F4D61703B4C000B726564697265637455726971007E000E4C00077265667265736874003B4C6F72672F737072696E676672616D65776F726B2F73656375726974792F6F61757468322F70726F76696465722F546F6B656E526571756573743B4C000B7265736F7572636549647374000F4C6A6176612F7574696C2F5365743B4C000D726573706F6E7365547970657371007E001A787200386F72672E737072696E676672616D65776F726B2E73656375726974792E6F61757468322E70726F76696465722E426173655265717565737436287A3EA37169BD0200034C0008636C69656E74496471007E000E4C001172657175657374506172616D657465727371007E00184C000573636F706571007E001A78707400026331737200256A6176612E7574696C2E436F6C6C656374696F6E7324556E6D6F6469666961626C654D6170F1A5A8FE74F507420200014C00016D71007E00187870737200116A6176612E7574696C2E486173684D61700507DAC1C31660D103000246000A6C6F6164466163746F724900097468726573686F6C6478703F400000000000067708000000080000000474000D726573706F6E73655F74797065740004636F646574000C72656469726563745F757269740014687474703A2F2F7777772E62616964752E636F6D740009636C69656E745F696471007E001D74000573636F706574000A524F4C455F41444D494E78737200256A6176612E7574696C2E436F6C6C656374696F6E7324556E6D6F6469666961626C65536574801D92D18F9B80550200007871007E0009737200176A6176612E7574696C2E4C696E6B656448617368536574D86CD75A95DD2A1E020000787200116A6176612E7574696C2E48617368536574BA44859596B8B7340300007870770C000000103F4000000000000171007E002878017371007E002C770C000000103F40000000000000787371007E00203F40000000000000770800000010000000007871007E0025707371007E002C770C000000103F4000000000000174000472657331787371007E002C770C000000103F4000000000000171007E0023787372004F6F72672E737072696E676672616D65776F726B2E73656375726974792E61757468656E7469636174696F6E2E557365726E616D6550617373776F726441757468656E7469636174696F6E546F6B656E00000000000001FE0200024C000B63726564656E7469616C7371007E00054C00097072696E636970616C71007E00057871007E0003017371007E00077371007E000B0000000177040000000171007E00107871007E0036737200486F72672E737072696E676672616D65776F726B2E73656375726974792E7765622E61757468656E7469636174696F6E2E57656241757468656E7469636174696F6E44657461696C7300000000000001FE0200024C000D72656D6F74654164647265737371007E000E4C000973657373696F6E496471007E000E787074000D3139322E3136382E31302E353970707372002D636F6D2E7A6B78792E65646153746174696F6E2E617574682E6D6F64656C2E5573657244657461696C496D706CBB2E73D83557C5D30200055A00096973456E61626C65644C000B617574686F72697469657371007E00044C0002696471007E000F4C000870617373776F726471007E000E4C0008757365726E616D6571007E000E7870017371007E000B0000000177040000000171007E00107871007E001574003C243261243130246E31586B46783139434D383661497335376B4A484B657A6A336E674B5345694D5655646F744373485164776D526E41373475787469740004426F7373);
INSERT INTO `oauth_code` VALUES ('2020-12-15 18:20:36', 'cz85bO', 0xACED0005737200416F72672E737072696E676672616D65776F726B2E73656375726974792E6F61757468322E70726F76696465722E4F417574683241757468656E7469636174696F6EBD400B02166252130200024C000D73746F7265645265717565737474003C4C6F72672F737072696E676672616D65776F726B2F73656375726974792F6F61757468322F70726F76696465722F4F4175746832526571756573743B4C00127573657241757468656E7469636174696F6E7400324C6F72672F737072696E676672616D65776F726B2F73656375726974792F636F72652F41757468656E7469636174696F6E3B787200476F72672E737072696E676672616D65776F726B2E73656375726974792E61757468656E7469636174696F6E2E416273747261637441757468656E7469636174696F6E546F6B656ED3AA287E6E47640E0200035A000D61757468656E746963617465644C000B617574686F7269746965737400164C6A6176612F7574696C2F436F6C6C656374696F6E3B4C000764657461696C737400124C6A6176612F6C616E672F4F626A6563743B787000737200266A6176612E7574696C2E436F6C6C656374696F6E7324556E6D6F6469666961626C654C697374FC0F2531B5EC8E100200014C00046C6973747400104C6A6176612F7574696C2F4C6973743B7872002C6A6176612E7574696C2E436F6C6C656374696F6E7324556E6D6F6469666961626C65436F6C6C656374696F6E19420080CB5EF71E0200014C00016371007E00047870737200136A6176612E7574696C2E41727261794C6973747881D21D99C7619D03000149000473697A657870000000017704000000017372002A636F6D2E7A6B78792E65646153746174696F6E2E617574682E656E746974792E5065726D697373696F6E00000000000000010200044C0009617574686F726974797400124C6A6176612F6C616E672F537472696E673B4C000B6465736372697074696F6E71007E000E4C000269647400134C6A6176612F6C616E672F496E74656765723B4C000375726C71007E000E7870740003616C6C740003616C6C737200116A6176612E6C616E672E496E746567657212E2A0A4F781873802000149000576616C7565787200106A6176612E6C616E672E4E756D62657286AC951D0B94E08B0200007870000000017400022F2A7871007E000C707372003A6F72672E737072696E676672616D65776F726B2E73656375726974792E6F61757468322E70726F76696465722E4F41757468325265717565737400000000000000010200075A0008617070726F7665644C000B617574686F72697469657371007E00044C000A657874656E73696F6E7374000F4C6A6176612F7574696C2F4D61703B4C000B726564697265637455726971007E000E4C00077265667265736874003B4C6F72672F737072696E676672616D65776F726B2F73656375726974792F6F61757468322F70726F76696465722F546F6B656E526571756573743B4C000B7265736F7572636549647374000F4C6A6176612F7574696C2F5365743B4C000D726573706F6E7365547970657371007E001A787200386F72672E737072696E676672616D65776F726B2E73656375726974792E6F61757468322E70726F76696465722E426173655265717565737436287A3EA37169BD0200034C0008636C69656E74496471007E000E4C001172657175657374506172616D657465727371007E00184C000573636F706571007E001A78707400026331737200256A6176612E7574696C2E436F6C6C656374696F6E7324556E6D6F6469666961626C654D6170F1A5A8FE74F507420200014C00016D71007E00187870737200116A6176612E7574696C2E486173684D61700507DAC1C31660D103000246000A6C6F6164466163746F724900097468726573686F6C6478703F400000000000067708000000080000000474000D726573706F6E73655F74797065740004636F646574000C72656469726563745F757269740014687474703A2F2F7777772E62616964752E636F6D740009636C69656E745F696471007E001D74000573636F706574000A524F4C455F41444D494E78737200256A6176612E7574696C2E436F6C6C656374696F6E7324556E6D6F6469666961626C65536574801D92D18F9B80550200007871007E0009737200176A6176612E7574696C2E4C696E6B656448617368536574D86CD75A95DD2A1E020000787200116A6176612E7574696C2E48617368536574BA44859596B8B7340300007870770C000000103F4000000000000171007E002878017371007E002C770C000000103F40000000000000787371007E00203F40000000000000770800000010000000007871007E0025707371007E002C770C000000103F4000000000000174000472657331787371007E002C770C000000103F4000000000000171007E0023787372004F6F72672E737072696E676672616D65776F726B2E73656375726974792E61757468656E7469636174696F6E2E557365726E616D6550617373776F726441757468656E7469636174696F6E546F6B656E00000000000001FE0200024C000B63726564656E7469616C7371007E00054C00097072696E636970616C71007E00057871007E0003017371007E00077371007E000B0000000177040000000171007E00107871007E0036737200486F72672E737072696E676672616D65776F726B2E73656375726974792E7765622E61757468656E7469636174696F6E2E57656241757468656E7469636174696F6E44657461696C7300000000000001FE0200024C000D72656D6F74654164647265737371007E000E4C000973657373696F6E496471007E000E787074000D3139322E3136382E31302E35397400203931373633343439383831353537303146383138413038443235373544463635707372002D636F6D2E7A6B78792E65646153746174696F6E2E617574682E6D6F64656C2E5573657244657461696C496D706CBB2E73D83557C5D30200055A00096973456E61626C65644C000B617574686F72697469657371007E00044C0002696471007E000F4C000870617373776F726471007E000E4C0008757365726E616D6571007E000E7870017371007E000B0000000177040000000171007E00107871007E001574003C243261243130246E31586B46783139434D383661497335376B4A484B657A6A336E674B5345694D5655646F744373485164776D526E41373475787469740004426F7373);
INSERT INTO `oauth_code` VALUES ('2020-12-15 18:27:30', 'mitiDm', 0xACED0005737200416F72672E737072696E676672616D65776F726B2E73656375726974792E6F61757468322E70726F76696465722E4F417574683241757468656E7469636174696F6EBD400B02166252130200024C000D73746F7265645265717565737474003C4C6F72672F737072696E676672616D65776F726B2F73656375726974792F6F61757468322F70726F76696465722F4F4175746832526571756573743B4C00127573657241757468656E7469636174696F6E7400324C6F72672F737072696E676672616D65776F726B2F73656375726974792F636F72652F41757468656E7469636174696F6E3B787200476F72672E737072696E676672616D65776F726B2E73656375726974792E61757468656E7469636174696F6E2E416273747261637441757468656E7469636174696F6E546F6B656ED3AA287E6E47640E0200035A000D61757468656E746963617465644C000B617574686F7269746965737400164C6A6176612F7574696C2F436F6C6C656374696F6E3B4C000764657461696C737400124C6A6176612F6C616E672F4F626A6563743B787000737200266A6176612E7574696C2E436F6C6C656374696F6E7324556E6D6F6469666961626C654C697374FC0F2531B5EC8E100200014C00046C6973747400104C6A6176612F7574696C2F4C6973743B7872002C6A6176612E7574696C2E436F6C6C656374696F6E7324556E6D6F6469666961626C65436F6C6C656374696F6E19420080CB5EF71E0200014C00016371007E00047870737200136A6176612E7574696C2E41727261794C6973747881D21D99C7619D03000149000473697A657870000000017704000000017372002A636F6D2E7A6B78792E65646153746174696F6E2E617574682E656E746974792E5065726D697373696F6E00000000000000010200044C0009617574686F726974797400124C6A6176612F6C616E672F537472696E673B4C000B6465736372697074696F6E71007E000E4C000269647400134C6A6176612F6C616E672F496E74656765723B4C000375726C71007E000E7870740003616C6C740003616C6C737200116A6176612E6C616E672E496E746567657212E2A0A4F781873802000149000576616C7565787200106A6176612E6C616E672E4E756D62657286AC951D0B94E08B0200007870000000017400022F2A7871007E000C707372003A6F72672E737072696E676672616D65776F726B2E73656375726974792E6F61757468322E70726F76696465722E4F41757468325265717565737400000000000000010200075A0008617070726F7665644C000B617574686F72697469657371007E00044C000A657874656E73696F6E7374000F4C6A6176612F7574696C2F4D61703B4C000B726564697265637455726971007E000E4C00077265667265736874003B4C6F72672F737072696E676672616D65776F726B2F73656375726974792F6F61757468322F70726F76696465722F546F6B656E526571756573743B4C000B7265736F7572636549647374000F4C6A6176612F7574696C2F5365743B4C000D726573706F6E7365547970657371007E001A787200386F72672E737072696E676672616D65776F726B2E73656375726974792E6F61757468322E70726F76696465722E426173655265717565737436287A3EA37169BD0200034C0008636C69656E74496471007E000E4C001172657175657374506172616D657465727371007E00184C000573636F706571007E001A78707400026331737200256A6176612E7574696C2E436F6C6C656374696F6E7324556E6D6F6469666961626C654D6170F1A5A8FE74F507420200014C00016D71007E00187870737200116A6176612E7574696C2E486173684D61700507DAC1C31660D103000246000A6C6F6164466163746F724900097468726573686F6C6478703F400000000000067708000000080000000474000D726573706F6E73655F74797065740004636F646574000C72656469726563745F757269740014687474703A2F2F7777772E62616964752E636F6D740009636C69656E745F696471007E001D74000573636F706574000A524F4C455F41444D494E78737200256A6176612E7574696C2E436F6C6C656374696F6E7324556E6D6F6469666961626C65536574801D92D18F9B80550200007871007E0009737200176A6176612E7574696C2E4C696E6B656448617368536574D86CD75A95DD2A1E020000787200116A6176612E7574696C2E48617368536574BA44859596B8B7340300007870770C000000103F4000000000000171007E002878017371007E002C770C000000103F40000000000000787371007E00203F40000000000000770800000010000000007871007E0025707371007E002C770C000000103F4000000000000174000472657331787371007E002C770C000000103F4000000000000171007E0023787372004F6F72672E737072696E676672616D65776F726B2E73656375726974792E61757468656E7469636174696F6E2E557365726E616D6550617373776F726441757468656E7469636174696F6E546F6B656E00000000000001FE0200024C000B63726564656E7469616C7371007E00054C00097072696E636970616C71007E00057871007E0003017371007E00077371007E000B0000000177040000000171007E00107871007E0036737200486F72672E737072696E676672616D65776F726B2E73656375726974792E7765622E61757468656E7469636174696F6E2E57656241757468656E7469636174696F6E44657461696C7300000000000001FE0200024C000D72656D6F74654164647265737371007E000E4C000973657373696F6E496471007E000E787074000D3139322E3136382E31302E353970707372002D636F6D2E7A6B78792E65646153746174696F6E2E617574682E6D6F64656C2E5573657244657461696C496D706CBB2E73D83557C5D30200055A00096973456E61626C65644C000B617574686F72697469657371007E00044C0002696471007E000F4C000870617373776F726471007E000E4C0008757365726E616D6571007E000E7870017371007E000B0000000177040000000171007E0010787371007E00130000000274003C243261243130244B3868685865706A326F646D4464614E3476353763654A41745072745A6639542E356A68716950422E4C7037633548644A753543577400036C6363);
INSERT INTO `oauth_code` VALUES ('2020-12-15 22:31:32', '1MnwhX', 0xACED0005737200416F72672E737072696E676672616D65776F726B2E73656375726974792E6F61757468322E70726F76696465722E4F417574683241757468656E7469636174696F6EBD400B02166252130200024C000D73746F7265645265717565737474003C4C6F72672F737072696E676672616D65776F726B2F73656375726974792F6F61757468322F70726F76696465722F4F4175746832526571756573743B4C00127573657241757468656E7469636174696F6E7400324C6F72672F737072696E676672616D65776F726B2F73656375726974792F636F72652F41757468656E7469636174696F6E3B787200476F72672E737072696E676672616D65776F726B2E73656375726974792E61757468656E7469636174696F6E2E416273747261637441757468656E7469636174696F6E546F6B656ED3AA287E6E47640E0200035A000D61757468656E746963617465644C000B617574686F7269746965737400164C6A6176612F7574696C2F436F6C6C656374696F6E3B4C000764657461696C737400124C6A6176612F6C616E672F4F626A6563743B787000737200266A6176612E7574696C2E436F6C6C656374696F6E7324556E6D6F6469666961626C654C697374FC0F2531B5EC8E100200014C00046C6973747400104C6A6176612F7574696C2F4C6973743B7872002C6A6176612E7574696C2E436F6C6C656374696F6E7324556E6D6F6469666961626C65436F6C6C656374696F6E19420080CB5EF71E0200014C00016371007E00047870737200136A6176612E7574696C2E41727261794C6973747881D21D99C7619D03000149000473697A657870000000017704000000017372002A636F6D2E7A6B78792E65646153746174696F6E2E617574682E656E746974792E5065726D697373696F6E00000000000000010200044C0009617574686F726974797400124C6A6176612F6C616E672F537472696E673B4C000B6465736372697074696F6E71007E000E4C000269647400134C6A6176612F6C616E672F496E74656765723B4C000375726C71007E000E7870740003616C6C740003616C6C737200116A6176612E6C616E672E496E746567657212E2A0A4F781873802000149000576616C7565787200106A6176612E6C616E672E4E756D62657286AC951D0B94E08B0200007870000000017400022F2A7871007E000C707372003A6F72672E737072696E676672616D65776F726B2E73656375726974792E6F61757468322E70726F76696465722E4F41757468325265717565737400000000000000010200075A0008617070726F7665644C000B617574686F72697469657371007E00044C000A657874656E73696F6E7374000F4C6A6176612F7574696C2F4D61703B4C000B726564697265637455726971007E000E4C00077265667265736874003B4C6F72672F737072696E676672616D65776F726B2F73656375726974792F6F61757468322F70726F76696465722F546F6B656E526571756573743B4C000B7265736F7572636549647374000F4C6A6176612F7574696C2F5365743B4C000D726573706F6E7365547970657371007E001A787200386F72672E737072696E676672616D65776F726B2E73656375726974792E6F61757468322E70726F76696465722E426173655265717565737436287A3EA37169BD0200034C0008636C69656E74496471007E000E4C001172657175657374506172616D657465727371007E00184C000573636F706571007E001A78707400026331737200256A6176612E7574696C2E436F6C6C656374696F6E7324556E6D6F6469666961626C654D6170F1A5A8FE74F507420200014C00016D71007E00187870737200116A6176612E7574696C2E486173684D61700507DAC1C31660D103000246000A6C6F6164466163746F724900097468726573686F6C6478703F400000000000067708000000080000000474000D726573706F6E73655F74797065740004636F646574000C72656469726563745F757269740014687474703A2F2F7777772E62616964752E636F6D740009636C69656E745F696471007E001D74000573636F706574000A524F4C455F41444D494E78737200256A6176612E7574696C2E436F6C6C656374696F6E7324556E6D6F6469666961626C65536574801D92D18F9B80550200007871007E0009737200176A6176612E7574696C2E4C696E6B656448617368536574D86CD75A95DD2A1E020000787200116A6176612E7574696C2E48617368536574BA44859596B8B7340300007870770C000000103F4000000000000171007E002878017371007E002C770C000000103F40000000000000787371007E00203F40000000000000770800000010000000007871007E0025707371007E002C770C000000103F4000000000000174000472657331787371007E002C770C000000103F4000000000000171007E0023787372004F6F72672E737072696E676672616D65776F726B2E73656375726974792E61757468656E7469636174696F6E2E557365726E616D6550617373776F726441757468656E7469636174696F6E546F6B656E00000000000001FE0200024C000B63726564656E7469616C7371007E00054C00097072696E636970616C71007E00057871007E0003017371007E00077371007E000B0000000177040000000171007E00107871007E0036737200486F72672E737072696E676672616D65776F726B2E73656375726974792E7765622E61757468656E7469636174696F6E2E57656241757468656E7469636174696F6E44657461696C7300000000000001FE0200024C000D72656D6F74654164647265737371007E000E4C000973657373696F6E496471007E000E787074000D3139322E3136382E31302E35397400203237383434353639434631323036463642374545463343384532323835373536707372002D636F6D2E7A6B78792E65646153746174696F6E2E617574682E6D6F64656C2E5573657244657461696C496D706CBB2E73D83557C5D30200055A00096973456E61626C65644C000B617574686F72697469657371007E00044C0002696471007E000F4C000870617373776F726471007E000E4C0008757365726E616D6571007E000E7870017371007E000B0000000177040000000171007E00107871007E001574003C243261243130246E31586B46783139434D383661497335376B4A484B657A6A336E674B5345694D5655646F744373485164776D526E41373475787469740004426F7373);
INSERT INTO `oauth_code` VALUES ('2020-12-16 00:49:41', 'AvSqXv', 0xACED0005737200416F72672E737072696E676672616D65776F726B2E73656375726974792E6F61757468322E70726F76696465722E4F417574683241757468656E7469636174696F6EBD400B02166252130200024C000D73746F7265645265717565737474003C4C6F72672F737072696E676672616D65776F726B2F73656375726974792F6F61757468322F70726F76696465722F4F4175746832526571756573743B4C00127573657241757468656E7469636174696F6E7400324C6F72672F737072696E676672616D65776F726B2F73656375726974792F636F72652F41757468656E7469636174696F6E3B787200476F72672E737072696E676672616D65776F726B2E73656375726974792E61757468656E7469636174696F6E2E416273747261637441757468656E7469636174696F6E546F6B656ED3AA287E6E47640E0200035A000D61757468656E746963617465644C000B617574686F7269746965737400164C6A6176612F7574696C2F436F6C6C656374696F6E3B4C000764657461696C737400124C6A6176612F6C616E672F4F626A6563743B787000737200266A6176612E7574696C2E436F6C6C656374696F6E7324556E6D6F6469666961626C654C697374FC0F2531B5EC8E100200014C00046C6973747400104C6A6176612F7574696C2F4C6973743B7872002C6A6176612E7574696C2E436F6C6C656374696F6E7324556E6D6F6469666961626C65436F6C6C656374696F6E19420080CB5EF71E0200014C00016371007E00047870737200136A6176612E7574696C2E41727261794C6973747881D21D99C7619D03000149000473697A657870000000017704000000017372002A636F6D2E7A6B78792E65646153746174696F6E2E617574682E656E746974792E5065726D697373696F6E00000000000000010200044C0009617574686F726974797400124C6A6176612F6C616E672F537472696E673B4C000B6465736372697074696F6E71007E000E4C000269647400134C6A6176612F6C616E672F496E74656765723B4C000375726C71007E000E7870740003616C6C740003616C6C737200116A6176612E6C616E672E496E746567657212E2A0A4F781873802000149000576616C7565787200106A6176612E6C616E672E4E756D62657286AC951D0B94E08B0200007870000000017400022F2A7871007E000C707372003A6F72672E737072696E676672616D65776F726B2E73656375726974792E6F61757468322E70726F76696465722E4F41757468325265717565737400000000000000010200075A0008617070726F7665644C000B617574686F72697469657371007E00044C000A657874656E73696F6E7374000F4C6A6176612F7574696C2F4D61703B4C000B726564697265637455726971007E000E4C00077265667265736874003B4C6F72672F737072696E676672616D65776F726B2F73656375726974792F6F61757468322F70726F76696465722F546F6B656E526571756573743B4C000B7265736F7572636549647374000F4C6A6176612F7574696C2F5365743B4C000D726573706F6E7365547970657371007E001A787200386F72672E737072696E676672616D65776F726B2E73656375726974792E6F61757468322E70726F76696465722E426173655265717565737436287A3EA37169BD0200034C0008636C69656E74496471007E000E4C001172657175657374506172616D657465727371007E00184C000573636F706571007E001A78707400026331737200256A6176612E7574696C2E436F6C6C656374696F6E7324556E6D6F6469666961626C654D6170F1A5A8FE74F507420200014C00016D71007E00187870737200116A6176612E7574696C2E486173684D61700507DAC1C31660D103000246000A6C6F6164466163746F724900097468726573686F6C6478703F400000000000067708000000080000000474000D726573706F6E73655F74797065740004636F646574000C72656469726563745F757269740014687474703A2F2F7777772E62616964752E636F6D740009636C69656E745F696471007E001D74000573636F706574000A524F4C455F41444D494E78737200256A6176612E7574696C2E436F6C6C656374696F6E7324556E6D6F6469666961626C65536574801D92D18F9B80550200007871007E0009737200176A6176612E7574696C2E4C696E6B656448617368536574D86CD75A95DD2A1E020000787200116A6176612E7574696C2E48617368536574BA44859596B8B7340300007870770C000000103F4000000000000171007E002878017371007E002C770C000000103F40000000000000787371007E00203F40000000000000770800000010000000007871007E0025707371007E002C770C000000103F4000000000000174000472657331787371007E002C770C000000103F4000000000000171007E0023787372004F6F72672E737072696E676672616D65776F726B2E73656375726974792E61757468656E7469636174696F6E2E557365726E616D6550617373776F726441757468656E7469636174696F6E546F6B656E00000000000001FE0200024C000B63726564656E7469616C7371007E00054C00097072696E636970616C71007E00057871007E0003017371007E00077371007E000B0000000177040000000171007E00107871007E0036737200486F72672E737072696E676672616D65776F726B2E73656375726974792E7765622E61757468656E7469636174696F6E2E57656241757468656E7469636174696F6E44657461696C7300000000000001FE0200024C000D72656D6F74654164647265737371007E000E4C000973657373696F6E496471007E000E787074000D3139322E3136382E31302E35397400204641374437434343363031353736304235394139443834364230313237444141707372002D636F6D2E7A6B78792E65646153746174696F6E2E617574682E6D6F64656C2E5573657244657461696C496D706CBB2E73D83557C5D30200055A00096973456E61626C65644C000B617574686F72697469657371007E00044C0002696471007E000F4C000870617373776F726471007E000E4C0008757365726E616D6571007E000E7870017371007E000B0000000177040000000171007E00107871007E001574003C243261243130246E31586B46783139434D383661497335376B4A484B657A6A336E674B5345694D5655646F744373485164776D526E41373475787469740004426F7373);
INSERT INTO `oauth_code` VALUES ('2020-12-16 00:49:57', 'VO0aSA', 0xACED0005737200416F72672E737072696E676672616D65776F726B2E73656375726974792E6F61757468322E70726F76696465722E4F417574683241757468656E7469636174696F6EBD400B02166252130200024C000D73746F7265645265717565737474003C4C6F72672F737072696E676672616D65776F726B2F73656375726974792F6F61757468322F70726F76696465722F4F4175746832526571756573743B4C00127573657241757468656E7469636174696F6E7400324C6F72672F737072696E676672616D65776F726B2F73656375726974792F636F72652F41757468656E7469636174696F6E3B787200476F72672E737072696E676672616D65776F726B2E73656375726974792E61757468656E7469636174696F6E2E416273747261637441757468656E7469636174696F6E546F6B656ED3AA287E6E47640E0200035A000D61757468656E746963617465644C000B617574686F7269746965737400164C6A6176612F7574696C2F436F6C6C656374696F6E3B4C000764657461696C737400124C6A6176612F6C616E672F4F626A6563743B787000737200266A6176612E7574696C2E436F6C6C656374696F6E7324556E6D6F6469666961626C654C697374FC0F2531B5EC8E100200014C00046C6973747400104C6A6176612F7574696C2F4C6973743B7872002C6A6176612E7574696C2E436F6C6C656374696F6E7324556E6D6F6469666961626C65436F6C6C656374696F6E19420080CB5EF71E0200014C00016371007E00047870737200136A6176612E7574696C2E41727261794C6973747881D21D99C7619D03000149000473697A657870000000017704000000017372002A636F6D2E7A6B78792E65646153746174696F6E2E617574682E656E746974792E5065726D697373696F6E00000000000000010200044C0009617574686F726974797400124C6A6176612F6C616E672F537472696E673B4C000B6465736372697074696F6E71007E000E4C000269647400134C6A6176612F6C616E672F496E74656765723B4C000375726C71007E000E7870740003616C6C740003616C6C737200116A6176612E6C616E672E496E746567657212E2A0A4F781873802000149000576616C7565787200106A6176612E6C616E672E4E756D62657286AC951D0B94E08B0200007870000000017400022F2A7871007E000C707372003A6F72672E737072696E676672616D65776F726B2E73656375726974792E6F61757468322E70726F76696465722E4F41757468325265717565737400000000000000010200075A0008617070726F7665644C000B617574686F72697469657371007E00044C000A657874656E73696F6E7374000F4C6A6176612F7574696C2F4D61703B4C000B726564697265637455726971007E000E4C00077265667265736874003B4C6F72672F737072696E676672616D65776F726B2F73656375726974792F6F61757468322F70726F76696465722F546F6B656E526571756573743B4C000B7265736F7572636549647374000F4C6A6176612F7574696C2F5365743B4C000D726573706F6E7365547970657371007E001A787200386F72672E737072696E676672616D65776F726B2E73656375726974792E6F61757468322E70726F76696465722E426173655265717565737436287A3EA37169BD0200034C0008636C69656E74496471007E000E4C001172657175657374506172616D657465727371007E00184C000573636F706571007E001A78707400026331737200256A6176612E7574696C2E436F6C6C656374696F6E7324556E6D6F6469666961626C654D6170F1A5A8FE74F507420200014C00016D71007E00187870737200116A6176612E7574696C2E486173684D61700507DAC1C31660D103000246000A6C6F6164466163746F724900097468726573686F6C6478703F400000000000067708000000080000000474000D726573706F6E73655F74797065740004636F646574000C72656469726563745F757269740014687474703A2F2F7777772E62616964752E636F6D740009636C69656E745F696471007E001D74000573636F706574000A524F4C455F41444D494E78737200256A6176612E7574696C2E436F6C6C656374696F6E7324556E6D6F6469666961626C65536574801D92D18F9B80550200007871007E0009737200176A6176612E7574696C2E4C696E6B656448617368536574D86CD75A95DD2A1E020000787200116A6176612E7574696C2E48617368536574BA44859596B8B7340300007870770C000000103F4000000000000171007E002878017371007E002C770C000000103F40000000000000787371007E00203F40000000000000770800000010000000007871007E0025707371007E002C770C000000103F4000000000000174000472657331787371007E002C770C000000103F4000000000000171007E0023787372004F6F72672E737072696E676672616D65776F726B2E73656375726974792E61757468656E7469636174696F6E2E557365726E616D6550617373776F726441757468656E7469636174696F6E546F6B656E00000000000001FE0200024C000B63726564656E7469616C7371007E00054C00097072696E636970616C71007E00057871007E0003017371007E00077371007E000B0000000177040000000171007E00107871007E0036737200486F72672E737072696E676672616D65776F726B2E73656375726974792E7765622E61757468656E7469636174696F6E2E57656241757468656E7469636174696F6E44657461696C7300000000000001FE0200024C000D72656D6F74654164647265737371007E000E4C000973657373696F6E496471007E000E787074000D3139322E3136382E31302E35397400204641374437434343363031353736304235394139443834364230313237444141707372002D636F6D2E7A6B78792E65646153746174696F6E2E617574682E6D6F64656C2E5573657244657461696C496D706CBB2E73D83557C5D30200055A00096973456E61626C65644C000B617574686F72697469657371007E00044C0002696471007E000F4C000870617373776F726471007E000E4C0008757365726E616D6571007E000E7870017371007E000B0000000177040000000171007E00107871007E001574003C243261243130246E31586B46783139434D383661497335376B4A484B657A6A336E674B5345694D5655646F744373485164776D526E41373475787469740004426F7373);
INSERT INTO `oauth_code` VALUES ('2020-12-16 17:11:39', '4fVXjX', 0xACED0005737200416F72672E737072696E676672616D65776F726B2E73656375726974792E6F61757468322E70726F76696465722E4F417574683241757468656E7469636174696F6EBD400B02166252130200024C000D73746F7265645265717565737474003C4C6F72672F737072696E676672616D65776F726B2F73656375726974792F6F61757468322F70726F76696465722F4F4175746832526571756573743B4C00127573657241757468656E7469636174696F6E7400324C6F72672F737072696E676672616D65776F726B2F73656375726974792F636F72652F41757468656E7469636174696F6E3B787200476F72672E737072696E676672616D65776F726B2E73656375726974792E61757468656E7469636174696F6E2E416273747261637441757468656E7469636174696F6E546F6B656ED3AA287E6E47640E0200035A000D61757468656E746963617465644C000B617574686F7269746965737400164C6A6176612F7574696C2F436F6C6C656374696F6E3B4C000764657461696C737400124C6A6176612F6C616E672F4F626A6563743B787000737200266A6176612E7574696C2E436F6C6C656374696F6E7324556E6D6F6469666961626C654C697374FC0F2531B5EC8E100200014C00046C6973747400104C6A6176612F7574696C2F4C6973743B7872002C6A6176612E7574696C2E436F6C6C656374696F6E7324556E6D6F6469666961626C65436F6C6C656374696F6E19420080CB5EF71E0200014C00016371007E00047870737200136A6176612E7574696C2E41727261794C6973747881D21D99C7619D03000149000473697A657870000000017704000000017372002A636F6D2E7A6B78792E65646153746174696F6E2E617574682E656E746974792E5065726D697373696F6E00000000000000010200044C0009617574686F726974797400124C6A6176612F6C616E672F537472696E673B4C000B6465736372697074696F6E71007E000E4C000269647400134C6A6176612F6C616E672F496E74656765723B4C000375726C71007E000E7870740003616C6C740003616C6C737200116A6176612E6C616E672E496E746567657212E2A0A4F781873802000149000576616C7565787200106A6176612E6C616E672E4E756D62657286AC951D0B94E08B0200007870000000017400022F2A7871007E000C707372003A6F72672E737072696E676672616D65776F726B2E73656375726974792E6F61757468322E70726F76696465722E4F41757468325265717565737400000000000000010200075A0008617070726F7665644C000B617574686F72697469657371007E00044C000A657874656E73696F6E7374000F4C6A6176612F7574696C2F4D61703B4C000B726564697265637455726971007E000E4C00077265667265736874003B4C6F72672F737072696E676672616D65776F726B2F73656375726974792F6F61757468322F70726F76696465722F546F6B656E526571756573743B4C000B7265736F7572636549647374000F4C6A6176612F7574696C2F5365743B4C000D726573706F6E7365547970657371007E001A787200386F72672E737072696E676672616D65776F726B2E73656375726974792E6F61757468322E70726F76696465722E426173655265717565737436287A3EA37169BD0200034C0008636C69656E74496471007E000E4C001172657175657374506172616D657465727371007E00184C000573636F706571007E001A78707400026331737200256A6176612E7574696C2E436F6C6C656374696F6E7324556E6D6F6469666961626C654D6170F1A5A8FE74F507420200014C00016D71007E00187870737200116A6176612E7574696C2E486173684D61700507DAC1C31660D103000246000A6C6F6164466163746F724900097468726573686F6C6478703F400000000000067708000000080000000474000D726573706F6E73655F74797065740004636F646574000C72656469726563745F757269740014687474703A2F2F7777772E62616964752E636F6D740009636C69656E745F696471007E001D74000573636F706574000A524F4C455F41444D494E78737200256A6176612E7574696C2E436F6C6C656374696F6E7324556E6D6F6469666961626C65536574801D92D18F9B80550200007871007E0009737200176A6176612E7574696C2E4C696E6B656448617368536574D86CD75A95DD2A1E020000787200116A6176612E7574696C2E48617368536574BA44859596B8B7340300007870770C000000103F4000000000000171007E002878017371007E002C770C000000103F40000000000000787371007E00203F40000000000000770800000010000000007871007E0025707371007E002C770C000000103F4000000000000174000472657331787371007E002C770C000000103F4000000000000171007E0023787372004F6F72672E737072696E676672616D65776F726B2E73656375726974792E61757468656E7469636174696F6E2E557365726E616D6550617373776F726441757468656E7469636174696F6E546F6B656E00000000000001FE0200024C000B63726564656E7469616C7371007E00054C00097072696E636970616C71007E00057871007E0003017371007E00077371007E000B0000000177040000000171007E00107871007E0036737200486F72672E737072696E676672616D65776F726B2E73656375726974792E7765622E61757468656E7469636174696F6E2E57656241757468656E7469636174696F6E44657461696C7300000000000001FE0200024C000D72656D6F74654164647265737371007E000E4C000973657373696F6E496471007E000E787074000D3139322E3136382E31302E35397400203231384534393732354642453734384542354642434146414335454235323030707372002D636F6D2E7A6B78792E65646153746174696F6E2E617574682E6D6F64656C2E5573657244657461696C496D706CBB2E73D83557C5D30200055A00096973456E61626C65644C000B617574686F72697469657371007E00044C0002696471007E000F4C000870617373776F726471007E000E4C0008757365726E616D6571007E000E7870017371007E000B0000000177040000000171007E00107871007E001574003C243261243130246E31586B46783139434D383661497335376B4A484B657A6A336E674B5345694D5655646F744373485164776D526E41373475787469740004426F7373);
INSERT INTO `oauth_code` VALUES ('2020-12-16 17:24:22', 'Uu4MIL', 0xACED0005737200416F72672E737072696E676672616D65776F726B2E73656375726974792E6F61757468322E70726F76696465722E4F417574683241757468656E7469636174696F6EBD400B02166252130200024C000D73746F7265645265717565737474003C4C6F72672F737072696E676672616D65776F726B2F73656375726974792F6F61757468322F70726F76696465722F4F4175746832526571756573743B4C00127573657241757468656E7469636174696F6E7400324C6F72672F737072696E676672616D65776F726B2F73656375726974792F636F72652F41757468656E7469636174696F6E3B787200476F72672E737072696E676672616D65776F726B2E73656375726974792E61757468656E7469636174696F6E2E416273747261637441757468656E7469636174696F6E546F6B656ED3AA287E6E47640E0200035A000D61757468656E746963617465644C000B617574686F7269746965737400164C6A6176612F7574696C2F436F6C6C656374696F6E3B4C000764657461696C737400124C6A6176612F6C616E672F4F626A6563743B787000737200266A6176612E7574696C2E436F6C6C656374696F6E7324556E6D6F6469666961626C654C697374FC0F2531B5EC8E100200014C00046C6973747400104C6A6176612F7574696C2F4C6973743B7872002C6A6176612E7574696C2E436F6C6C656374696F6E7324556E6D6F6469666961626C65436F6C6C656374696F6E19420080CB5EF71E0200014C00016371007E00047870737200136A6176612E7574696C2E41727261794C6973747881D21D99C7619D03000149000473697A657870000000017704000000017372002A636F6D2E7A6B78792E65646153746174696F6E2E617574682E656E746974792E5065726D697373696F6E00000000000000010200044C0009617574686F726974797400124C6A6176612F6C616E672F537472696E673B4C000B6465736372697074696F6E71007E000E4C000269647400134C6A6176612F6C616E672F496E74656765723B4C000375726C71007E000E7870740003616C6C740003616C6C737200116A6176612E6C616E672E496E746567657212E2A0A4F781873802000149000576616C7565787200106A6176612E6C616E672E4E756D62657286AC951D0B94E08B0200007870000000017400022F2A7871007E000C707372003A6F72672E737072696E676672616D65776F726B2E73656375726974792E6F61757468322E70726F76696465722E4F41757468325265717565737400000000000000010200075A0008617070726F7665644C000B617574686F72697469657371007E00044C000A657874656E73696F6E7374000F4C6A6176612F7574696C2F4D61703B4C000B726564697265637455726971007E000E4C00077265667265736874003B4C6F72672F737072696E676672616D65776F726B2F73656375726974792F6F61757468322F70726F76696465722F546F6B656E526571756573743B4C000B7265736F7572636549647374000F4C6A6176612F7574696C2F5365743B4C000D726573706F6E7365547970657371007E001A787200386F72672E737072696E676672616D65776F726B2E73656375726974792E6F61757468322E70726F76696465722E426173655265717565737436287A3EA37169BD0200034C0008636C69656E74496471007E000E4C001172657175657374506172616D657465727371007E00184C000573636F706571007E001A78707400026331737200256A6176612E7574696C2E436F6C6C656374696F6E7324556E6D6F6469666961626C654D6170F1A5A8FE74F507420200014C00016D71007E00187870737200116A6176612E7574696C2E486173684D61700507DAC1C31660D103000246000A6C6F6164466163746F724900097468726573686F6C6478703F400000000000067708000000080000000474000D726573706F6E73655F74797065740004636F646574000C72656469726563745F757269740014687474703A2F2F7777772E62616964752E636F6D740009636C69656E745F696471007E001D74000573636F706574000A524F4C455F41444D494E78737200256A6176612E7574696C2E436F6C6C656374696F6E7324556E6D6F6469666961626C65536574801D92D18F9B80550200007871007E0009737200176A6176612E7574696C2E4C696E6B656448617368536574D86CD75A95DD2A1E020000787200116A6176612E7574696C2E48617368536574BA44859596B8B7340300007870770C000000103F4000000000000171007E002878017371007E002C770C000000103F40000000000000787371007E00203F40000000000000770800000010000000007871007E0025707371007E002C770C000000103F4000000000000174000472657331787371007E002C770C000000103F4000000000000171007E0023787372004F6F72672E737072696E676672616D65776F726B2E73656375726974792E61757468656E7469636174696F6E2E557365726E616D6550617373776F726441757468656E7469636174696F6E546F6B656E00000000000001FE0200024C000B63726564656E7469616C7371007E00054C00097072696E636970616C71007E00057871007E0003017371007E00077371007E000B0000000177040000000171007E00107871007E0036737200486F72672E737072696E676672616D65776F726B2E73656375726974792E7765622E61757468656E7469636174696F6E2E57656241757468656E7469636174696F6E44657461696C7300000000000001FE0200024C000D72656D6F74654164647265737371007E000E4C000973657373696F6E496471007E000E787074000D3139322E3136382E31302E35397400204244373241314541313938453146364432364233424246414635443343303934707372002D636F6D2E7A6B78792E65646153746174696F6E2E617574682E6D6F64656C2E5573657244657461696C496D706CBB2E73D83557C5D30200055A00096973456E61626C65644C000B617574686F72697469657371007E00044C0002696471007E000F4C000870617373776F726471007E000E4C0008757365726E616D6571007E000E7870017371007E000B0000000177040000000171007E00107871007E001574003C243261243130246E31586B46783139434D383661497335376B4A484B657A6A336E674B5345694D5655646F744373485164776D526E41373475787469740004426F7373);
INSERT INTO `oauth_code` VALUES ('2021-06-11 18:38:25', 'vjU9zF', 0xACED0005737200416F72672E737072696E676672616D65776F726B2E73656375726974792E6F61757468322E70726F76696465722E4F417574683241757468656E7469636174696F6EBD400B02166252130200024C000D73746F7265645265717565737474003C4C6F72672F737072696E676672616D65776F726B2F73656375726974792F6F61757468322F70726F76696465722F4F4175746832526571756573743B4C00127573657241757468656E7469636174696F6E7400324C6F72672F737072696E676672616D65776F726B2F73656375726974792F636F72652F41757468656E7469636174696F6E3B787200476F72672E737072696E676672616D65776F726B2E73656375726974792E61757468656E7469636174696F6E2E416273747261637441757468656E7469636174696F6E546F6B656ED3AA287E6E47640E0200035A000D61757468656E746963617465644C000B617574686F7269746965737400164C6A6176612F7574696C2F436F6C6C656374696F6E3B4C000764657461696C737400124C6A6176612F6C616E672F4F626A6563743B787000737200266A6176612E7574696C2E436F6C6C656374696F6E7324556E6D6F6469666961626C654C697374FC0F2531B5EC8E100200014C00046C6973747400104C6A6176612F7574696C2F4C6973743B7872002C6A6176612E7574696C2E436F6C6C656374696F6E7324556E6D6F6469666961626C65436F6C6C656374696F6E19420080CB5EF71E0200014C00016371007E00047870737200136A6176612E7574696C2E41727261794C6973747881D21D99C7619D03000149000473697A657870000000017704000000017372002A636F6D2E7A6B78792E65646153746174696F6E2E617574682E656E746974792E5065726D697373696F6E00000000000000010200044C0009617574686F726974797400124C6A6176612F6C616E672F537472696E673B4C000B6465736372697074696F6E71007E000E4C000269647400134C6A6176612F6C616E672F496E74656765723B4C000375726C71007E000E7870740003616C6C740003616C6C737200116A6176612E6C616E672E496E746567657212E2A0A4F781873802000149000576616C7565787200106A6176612E6C616E672E4E756D62657286AC951D0B94E08B0200007870000000017400022F2A7871007E000C707372003A6F72672E737072696E676672616D65776F726B2E73656375726974792E6F61757468322E70726F76696465722E4F41757468325265717565737400000000000000010200075A0008617070726F7665644C000B617574686F72697469657371007E00044C000A657874656E73696F6E7374000F4C6A6176612F7574696C2F4D61703B4C000B726564697265637455726971007E000E4C00077265667265736874003B4C6F72672F737072696E676672616D65776F726B2F73656375726974792F6F61757468322F70726F76696465722F546F6B656E526571756573743B4C000B7265736F7572636549647374000F4C6A6176612F7574696C2F5365743B4C000D726573706F6E7365547970657371007E001A787200386F72672E737072696E676672616D65776F726B2E73656375726974792E6F61757468322E70726F76696465722E426173655265717565737436287A3EA37169BD0200034C0008636C69656E74496471007E000E4C001172657175657374506172616D657465727371007E00184C000573636F706571007E001A78707400026331737200256A6176612E7574696C2E436F6C6C656374696F6E7324556E6D6F6469666961626C654D6170F1A5A8FE74F507420200014C00016D71007E00187870737200116A6176612E7574696C2E486173684D61700507DAC1C31660D103000246000A6C6F6164466163746F724900097468726573686F6C6478703F400000000000067708000000080000000474000D726573706F6E73655F74797065740004636F646574000C72656469726563745F757269740014687474703A2F2F7777772E62616964752E636F6D740009636C69656E745F696471007E001D74000573636F706574000A524F4C455F41444D494E78737200256A6176612E7574696C2E436F6C6C656374696F6E7324556E6D6F6469666961626C65536574801D92D18F9B80550200007871007E0009737200176A6176612E7574696C2E4C696E6B656448617368536574D86CD75A95DD2A1E020000787200116A6176612E7574696C2E48617368536574BA44859596B8B7340300007870770C000000103F4000000000000171007E002878017371007E002C770C000000103F40000000000000787371007E00203F40000000000000770800000010000000007871007E0025707371007E002C770C000000103F4000000000000174000472657331787371007E002C770C000000103F4000000000000171007E0023787372004F6F72672E737072696E676672616D65776F726B2E73656375726974792E61757468656E7469636174696F6E2E557365726E616D6550617373776F726441757468656E7469636174696F6E546F6B656E00000000000001FE0200024C000B63726564656E7469616C7371007E00054C00097072696E636970616C71007E00057871007E0003017371007E00077371007E000B0000000177040000000171007E00107871007E0036737200486F72672E737072696E676672616D65776F726B2E73656375726974792E7765622E61757468656E7469636174696F6E2E57656241757468656E7469636174696F6E44657461696C7300000000000001FE0200024C000D72656D6F74654164647265737371007E000E4C000973657373696F6E496471007E000E787074000D3139322E3136382E31302E35397400203033424436434143423739423244413246313445443745393432394442433536707372002D636F6D2E7A6B78792E65646153746174696F6E2E617574682E6D6F64656C2E5573657244657461696C496D706C6E5F9D4A2B9E51F30200065A00096973456E61626C65644C000B617574686F72697469657371007E00044C0002696471007E000F4C000870617373776F726471007E000E4C000570686F6E6571007E000E4C0008757365726E616D6571007E000E7870017371007E000B0000000177040000000171007E0010787371007E00130000000574003C2432612431302459493177614B35667A6A5032615436752F417930744F37696B5876632E5541334B716977382F44726D566E33682E454E443666684B74000B313738363239393130303274000867315F61646D696E);

-- ----------------------------
-- Table structure for sys_dept
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
) ENGINE = InnoDB AUTO_INCREMENT = 14 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci COMMENT = '部门表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sys_dept
-- ----------------------------
INSERT INTO `sys_dept` VALUES (1, '公司高层', 1, '2024-09-23 09:39:52', 1, '2024-09-23 09:39:52', 0);
INSERT INTO `sys_dept` VALUES (2, '计算服务部', 1, '2024-09-27 09:00:58', 1, '2024-09-27 09:00:58', 0);
INSERT INTO `sys_dept` VALUES (3, '集成电路部', 1, '2024-09-27 09:02:18', 1, '2024-09-27 09:02:20', 1);
INSERT INTO `sys_dept` VALUES (4, '人事行政部', 11412, '2024-09-29 09:59:00', 11412, '2024-10-16 09:08:09', 0);
INSERT INTO `sys_dept` VALUES (5, '132312312311', 11385, '2024-10-08 14:26:29', 11385, '2024-10-08 14:59:46', 1);
INSERT INTO `sys_dept` VALUES (6, '123123', 11385, '2024-10-08 14:42:46', 11385, '2024-10-08 15:18:14', 1);
INSERT INTO `sys_dept` VALUES (7, 'EDA服务部', 11412, '2024-10-16 08:58:17', 11412, '2024-10-16 09:07:23', 0);
INSERT INTO `sys_dept` VALUES (8, '培训与市场部', 11412, '2024-10-16 08:58:28', 11412, '2024-10-16 09:07:34', 0);
INSERT INTO `sys_dept` VALUES (9, '招商部', 11412, '2024-10-16 08:58:35', 11412, '2024-10-16 09:07:41', 0);
INSERT INTO `sys_dept` VALUES (10, '项目管理部', 11412, '2024-10-16 08:58:43', 11412, '2024-10-16 09:07:49', 0);
INSERT INTO `sys_dept` VALUES (11, '财务部', 11412, '2024-10-16 08:59:09', 11412, '2024-10-16 09:08:15', 0);
INSERT INTO `sys_dept` VALUES (12, '123123123', 11385, '2024-10-16 09:03:54', 11385, '2024-10-16 09:08:20', 1);
INSERT INTO `sys_dept` VALUES (13, '测试', 11385, '2024-10-16 09:04:26', 11385, '2024-10-16 09:08:23', 1);

-- ----------------------------
-- Table structure for sys_menu
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
) ENGINE = InnoDB AUTO_INCREMENT = 98 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '菜单管理' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of sys_menu
-- ----------------------------
INSERT INTO `sys_menu` VALUES (10, 0, 2, '系统管理', '/system', 'Layout', '', '', 'cascader', 4, 1, '', '2024-09-30 15:50:29', '2024-10-12 17:06:12');
INSERT INTO `sys_menu` VALUES (11, 10, 1, '菜单管理', 'menuMng', 'sysMng/menuMng/index', '', '', 'date-range', 0, 1, '', '2024-09-30 15:51:01', '2024-10-09 08:54:14');
INSERT INTO `sys_menu` VALUES (12, 10, 1, '数据字典', 'dicMng', 'sysMng/dicMng/index', '', '', 'device', 0, 1, '', '2024-09-30 15:51:46', '2024-09-30 16:00:39');
INSERT INTO `sys_menu` VALUES (13, 10, 1, '组织结构', 'organizationMng', 'sysMng/organizationMng/index', '', '', 'component', 0, 1, '', '2024-09-30 15:52:09', '2024-10-12 17:08:10');
INSERT INTO `sys_menu` VALUES (14, 0, 2, '合同管理', '/contractMng', 'Layout', '', '', 'class-m', 1, 1, '', '2024-09-30 15:53:18', '2024-10-12 17:06:21');
INSERT INTO `sys_menu` VALUES (15, 14, 1, '合同管理', 'contractList', 'contractMng/index', '', '', 'cascader', 0, 1, '', '2024-09-30 15:53:50', '2024-09-30 16:02:43');
INSERT INTO `sys_menu` VALUES (16, 0, 2, '线索管理', '/clue', 'Layout', '', '', 'component', 1, 1, '', '2024-09-30 15:54:32', '2024-10-15 14:27:08');
INSERT INTO `sys_menu` VALUES (17, 16, 1, '公海资源', 'highSeasResources', 'clueMng/HighSeasResources/index', '', '', 'date-range', 0, 1, '', '2024-09-30 15:54:49', '2024-10-12 17:09:23');
INSERT INTO `sys_menu` VALUES (18, 16, 1, '线索跟进', 'followUpOnClues', 'clueMng/FollowUpOnClues/index', '', '', 'code', 0, 1, '', '2024-09-30 15:55:23', '2024-09-30 16:04:16');
INSERT INTO `sys_menu` VALUES (19, 0, 2, '客户管理', '/customMng', 'Layout', '', '', 'clipboard', 1, 1, '', '2024-09-30 15:55:45', '2024-10-15 14:25:56');
INSERT INTO `sys_menu` VALUES (21, 19, 1, '客户信息', 'customerInfo', 'customMng/customerInfo/index', '', '', 'component', 0, 1, '', '2024-09-30 15:56:36', '2024-09-30 16:05:29');
INSERT INTO `sys_menu` VALUES (23, 10, 1, '用户管理', 'usersMng', 'sysMng/usersMng/index', '', '', 'component', 0, 1, '', '2024-10-12 16:58:25', '2024-10-12 17:07:28');
INSERT INTO `sys_menu` VALUES (24, 0, 2, '消息通知', '/newAndBroadcast', 'Layout', '', '', 'checkbox', 5, 1, '', '2024-10-12 17:02:20', '2024-10-12 17:11:23');
INSERT INTO `sys_menu` VALUES (25, 24, 1, '消息通知', 'newAndBroadcast', 'newAndBroadcast/index', '', '', 'code', 5, 1, '', '2024-10-12 17:06:43', '2024-10-12 17:15:46');
INSERT INTO `sys_menu` VALUES (26, 0, 2, '个人中心', '/personalCenter', 'Layout', '', '', 'date-range', 2, 0, '', '2024-10-12 17:09:02', '2024-10-12 17:19:31');
INSERT INTO `sys_menu` VALUES (27, 26, 1, '个人中心', 'personalCenter', 'personalCenter', '', '', '', 0, 1, '', '2024-10-12 17:09:27', '2024-10-12 17:19:27');
INSERT INTO `sys_menu` VALUES (29, 0, 2, '首页', '/dashboard', 'Layout', '', '', 'dashboard', 0, 1, '', '2024-10-15 14:16:42', '2024-10-15 14:25:48');
INSERT INTO `sys_menu` VALUES (30, 29, 1, '首页', 'dashboard', 'dashboard/index', '', '', 'dashboard', 0, 1, '', '2024-10-15 14:17:24', '2024-10-15 14:26:30');
INSERT INTO `sys_menu` VALUES (33, 17, 4, '创建线索', '', '', 'clue:disclosureClue:addOneClue', '/clue/disclosureClue/addOneClue', '', 2, 1, '', '2024-10-17 09:04:04', '2024-10-17 09:13:11');
INSERT INTO `sys_menu` VALUES (34, 17, 4, '修改线索', '', '', 'clue:disclosureClue:editOneClue', '/clue/disclosureClue/editOneClue', '', 3, 1, '', '2024-10-17 09:05:16', '2024-10-17 09:14:33');
INSERT INTO `sys_menu` VALUES (35, 17, 4, '删除线索（批量删除）', '', '', 'clue:disclosureClue:clueList', '/clue/disclosureClue/clueList', '', 4, 1, '', '2024-10-17 09:08:30', '2024-10-17 09:30:27');
INSERT INTO `sys_menu` VALUES (36, 17, 4, '领取（批量领取）', '', '', 'clue:disclosureClueUserRel:addMoreRel', '/clue/disclosureClueUserRel/addMoreRel', '', 5, 1, '', '2024-10-17 09:20:41', '2024-10-17 17:10:12');
INSERT INTO `sys_menu` VALUES (38, 18, 4, '我的线索-创建线索', '', '', 'clue:disclosureClueUserRel:addOneClue', '/clue/disclosureClueUserRel/page/myList', '', 2, 1, '', '2024-10-17 09:33:55', '2024-10-17 09:43:01');
INSERT INTO `sys_menu` VALUES (39, 18, 4, '我的线索-编辑', '', '', 'clue:disclosureClueUserRel:editOneClue', '/clue/disclosureClueUserRel/editOneClue', '', 3, 1, '', '2024-10-17 09:36:59', '2024-10-17 16:48:41');
INSERT INTO `sys_menu` VALUES (40, 18, 4, '我的线索-删除（批量删除）', '', '', 'clue:disclosureClueUserRel:deleteMoreClue', 'clue/disclosureClueUserRel/deleteMoreClue', '', 4, 1, '', '2024-10-17 09:39:50', '2024-10-17 16:48:50');
INSERT INTO `sys_menu` VALUES (41, 18, 4, '我的线索-线索池（批量释放）', '', '', 'clue:disclosureClueUserRel:releaseMoreClue', '/clue/disclosureClueUserRel/releaseMoreClue', '', 5, 1, '', '2024-10-17 09:40:44', '2024-10-17 16:51:12');
INSERT INTO `sys_menu` VALUES (42, 18, 4, '我的线索-跟进', '', '', 'clue:disclosureClueUserRel:followUpOneClue', 'clue/disclosureClueUserRel/followUpOneClue', '', 6, 1, '', '2024-10-17 09:42:42', '2024-10-17 09:51:49');
INSERT INTO `sys_menu` VALUES (43, 18, 4, '我的线索-转为客户', '', '', 'customer:customerInfo:addOneFromClue', '/customer/customerInfo/addOneFromClue', '', 7, 1, '', '2024-10-17 09:44:30', '2024-10-17 09:53:51');
INSERT INTO `sys_menu` VALUES (46, 21, 4, '添加客户', '', '', 'customer:customerInfo:addOne', '/customer/customerInfo/addOne', '', 2, 1, '', '2024-10-17 14:10:40', '2024-10-17 14:19:53');
INSERT INTO `sys_menu` VALUES (47, 21, 4, '编辑', '', '', 'customer:customerInfo:editOne', '/customer/customerInfo/editOne', '', 3, 1, '', '2024-10-17 14:11:41', '2024-10-17 14:20:48');
INSERT INTO `sys_menu` VALUES (48, 21, 4, '删除', '', '', 'customer:customerInfo:customerList', '/customer/customerInfo/customerList', '', 4, 1, '', '2024-10-17 14:12:25', '2024-10-17 14:21:32');
INSERT INTO `sys_menu` VALUES (49, 21, 4, '批量导出', '', '', 'customer:customerInfo:downCustomerTemplate', '/customer/customerInfo/downCustomerTemplate', '', 5, 1, '', '2024-10-17 14:14:12', '2024-10-17 14:23:19');
INSERT INTO `sys_menu` VALUES (50, 21, 4, '批量导入', '', '', 'customer:customerInfo:batchImport', '/customer/customerInfo/batchImport', '', 6, 1, '', '2024-10-17 14:14:44', '2024-10-17 14:23:51');
INSERT INTO `sys_menu` VALUES (51, 15, 4, '新增', '', '', 'contract:add', '/contract/add', '', 2, 1, '', '2024-10-17 14:18:33', '2024-10-17 14:27:40');
INSERT INTO `sys_menu` VALUES (53, 15, 4, '编辑', '', '', 'contract:update', '/contract/update', '', 3, 1, '', '2024-10-17 14:19:37', '2024-10-17 14:28:44');
INSERT INTO `sys_menu` VALUES (54, 15, 4, '删除', '', '', 'contract:delete', '/contract/delete', '', 4, 1, '', '2024-10-17 14:20:21', '2024-10-17 16:28:47');
INSERT INTO `sys_menu` VALUES (55, 11, 4, '新增', '', '', 'system:menu:saveMenu', '/system/menu/saveMenu', '', 1, 1, '', '2024-10-17 14:25:03', '2024-10-17 14:34:09');
INSERT INTO `sys_menu` VALUES (56, 11, 4, '修改', '', '', 'system:menu:updMenu', '/system/menu/updMenu', '', 2, 1, '', '2024-10-17 14:25:48', '2024-10-17 14:34:55');
INSERT INTO `sys_menu` VALUES (57, 11, 4, '搜索', '', '', 'system:menu:listMenus', '/system/menu/listMenus', '', 0, 1, '', '2024-10-17 14:26:21', '2024-10-17 14:35:28');
INSERT INTO `sys_menu` VALUES (58, 11, 4, '删除', '', '', 'system:menu:delMenus', '/system/menu/delMenus', '', 4, 1, '', '2024-10-17 14:26:55', '2024-10-17 14:36:02');
INSERT INTO `sys_menu` VALUES (59, 23, 4, '新增', '', '', 'system:user:saveUser', '/system/user/saveUser', '', 0, 1, '', '2024-10-17 14:27:40', '2024-10-17 14:39:57');
INSERT INTO `sys_menu` VALUES (60, 23, 4, '搜索', '', '', 'system:user:getUserPageList', '/system/user/getUserPageList', '', 0, 1, '', '2024-10-17 14:27:54', '2024-10-17 14:39:46');
INSERT INTO `sys_menu` VALUES (61, 23, 4, '修改', '', '', 'system:user:updUser', '/system/user/updUser', '', 3, 1, '', '2024-10-17 14:28:06', '2024-10-17 14:40:06');
INSERT INTO `sys_menu` VALUES (62, 23, 4, '删除', '', '', 'system:user:delUser', '/system/user/delUser', '', 4, 1, '', '2024-10-17 14:28:16', '2024-10-17 14:40:15');
INSERT INTO `sys_menu` VALUES (63, 23, 4, '启用/停用', '', '', 'system:user:editUserStatus', '/system/user/editUserStatus', '', 5, 1, '', '2024-10-17 14:28:26', '2024-10-17 14:40:37');
INSERT INTO `sys_menu` VALUES (64, 23, 4, '导出模板', '', '', 'system:user:downUserTemplate', '/system/user/downUserTemplate', '', 6, 1, '', '2024-10-17 14:28:35', '2024-10-17 14:40:58');
INSERT INTO `sys_menu` VALUES (65, 23, 4, '批量导入', '', '', 'system:user:insertUserBatch', '/system/user/insertUserBatch', '', 7, 1, '', '2024-10-17 14:28:47', '2024-10-17 14:41:06');
INSERT INTO `sys_menu` VALUES (66, 13, 4, '添加部门', '', '', 'system:dept:saveDept', '/system/dept/saveDept', '', 1, 1, '', '2024-10-17 14:32:29', '2024-10-17 14:35:39');
INSERT INTO `sys_menu` VALUES (67, 13, 4, '修改部门', '', '', 'system:dept:updDept', '/system/dept/updDept', '', 2, 1, '', '2024-10-17 14:32:44', '2024-10-17 14:45:29');
INSERT INTO `sys_menu` VALUES (68, 13, 4, '删除部门', '', '', 'system:dept:delDept', '/system/dept/delDept', '', 3, 1, '', '2024-10-17 14:32:54', '2024-10-17 14:45:34');
INSERT INTO `sys_menu` VALUES (69, 13, 4, '菜单权限', '', '', 'system:post:distributeMenu', '/system/post/distributeMenu', '', 4, 1, '', '2024-10-17 14:33:04', '2024-10-17 14:40:32');
INSERT INTO `sys_menu` VALUES (70, 13, 4, '数据权限', '', '', 'system:post:distributeDataScope', '/system/post/distributeDataScope', '', 5, 1, '', '2024-10-17 14:33:37', '2024-10-17 14:40:44');
INSERT INTO `sys_menu` VALUES (71, 13, 4, '添加职位', '', '', 'system:post:savePost', '/system/post/savePost', '', 6, 1, '', '2024-10-17 14:36:46', '2024-10-17 14:38:42');
INSERT INTO `sys_menu` VALUES (72, 13, 4, '修改职位', '', '', 'system:post:updPost', '/system/post/updPost', '', 8, 1, '', '2024-10-17 14:37:05', '2024-10-17 14:38:54');
INSERT INTO `sys_menu` VALUES (73, 13, 4, '删除职位', '', '', 'system:post:delPost', '/system/post/delPost', '', 9, 1, '', '2024-10-17 14:37:20', '2024-10-17 14:39:10');
INSERT INTO `sys_menu` VALUES (74, 15, 4, '下载模板', '', '', 'contract:downContractTemplate', '/contract/downContractTemplate', '', 5, 1, '', '2024-10-17 16:22:59', '2024-10-17 16:32:06');
INSERT INTO `sys_menu` VALUES (75, 15, 4, '批量导入合同', '', '', 'contract:batchImport', '/contract/batchImport', '', 6, 1, '', '2024-10-17 16:23:59', '2024-10-17 16:33:06');
INSERT INTO `sys_menu` VALUES (76, 18, 4, '下属线索-Tab页', '', '', 'subordinate:tabMenu', '/subordinate/tabMenu', '', 8, 1, '', '2024-10-17 16:36:09', '2024-10-17 16:49:41');
INSERT INTO `sys_menu` VALUES (77, 18, 4, '下属线索-线索池（批量释放）', '', '', 'subordinate:releaseMoreClue', '/subordinate/releaseMoreClue', '', 9, 1, '', '2024-10-17 16:38:03', '2024-10-17 16:51:23');
INSERT INTO `sys_menu` VALUES (78, 18, 4, '下属线索-编辑', '', '', 'subordinate:editOneClue', ' /subordinate/editOneClue', '', 10, 1, '', '2024-10-17 16:38:57', '2024-10-17 16:48:04');
INSERT INTO `sys_menu` VALUES (79, 18, 4, '下属线索-删除（批量删除）', '', '', 'subordinate:deleteMoreClue', ' /subordinate/deleteMoreClue', '', 11, 1, '', '2024-10-17 16:39:24', '2024-10-17 16:51:33');
INSERT INTO `sys_menu` VALUES (80, 17, 4, '分配（批量分配）', '', '', 'clue:disclosureClueUserRel:distribute', '/clue/disclosureClueUserRel/distribute', '', 6, 1, '', '2024-10-17 17:00:55', '2024-10-17 17:11:33');
INSERT INTO `sys_menu` VALUES (81, 0, 2, '测试', '/utilTest', 'Layout', '', '', 'bug', 12, 1, '', '2024-10-23 09:53:59', '2025-01-22 10:26:20');
INSERT INTO `sys_menu` VALUES (82, 81, 1, '测试', 'utilTest', 'utilTest', '', '', 'component', 0, 1, '', '2024-10-23 09:54:26', '2024-10-23 10:03:38');
INSERT INTO `sys_menu` VALUES (83, 0, 2, '审批管理', '/approvalMng', 'Layout', '', '', 'eye-open', 5, 1, '', '2025-01-13 16:24:41', '2025-01-13 16:35:00');
INSERT INTO `sys_menu` VALUES (84, 83, 1, '审批规则', 'approvalRules', 'approvalMng/approvalRules', '', '', 'build', 0, 1, '', '2025-01-13 16:25:35', '2025-01-13 16:35:55');
INSERT INTO `sys_menu` VALUES (85, 83, 1, '资源删除', 'resourceDel', 'approvalMng/resourceDel', '', '', 'button', 1, 1, '', '2025-01-13 16:26:14', '2025-01-13 16:36:33');
INSERT INTO `sys_menu` VALUES (86, 83, 1, '新建规则', 'create', 'approvalMng/approvalRules/create', '', '', 'device', 4, 0, '', '2025-01-13 16:27:12', '2025-01-13 16:37:32');
INSERT INTO `sys_menu` VALUES (87, 16, 1, '线索规则', 'clueRules', 'clueMng/ClueRules', '', '', 'clipboard', 3, 1, '', '2025-02-08 15:14:20', '2025-02-08 15:25:00');
INSERT INTO `sys_menu` VALUES (88, 10, 1, '用户行为日志', 'userBehaviorLog', 'userBehaviorLog', '', '', 'log', 8, 1, '', '2025-02-25 09:07:12', '2025-02-25 09:18:06');
INSERT INTO `sys_menu` VALUES (89, 0, 2, '供应商管理', '/supplierMng', 'Layout', '', '', 'device', 5, 1, '', '2025-11-19 09:28:29', '2025-11-19 09:28:29');
INSERT INTO `sys_menu` VALUES (90, 89, 1, '供应商管理', 'supplierMng', 'supplierMng', '', '', 'device', 0, 1, '', '2025-11-19 09:29:24', '2025-11-19 09:29:24');
INSERT INTO `sys_menu` VALUES (91, 0, 2, '合同报表', '/contractReport', 'Layout', '', '', 'device', 3, 1, '', '2025-11-24 13:33:07', '2025-11-24 13:33:07');
INSERT INTO `sys_menu` VALUES (92, 91, 1, '合同报表', 'contractReport', 'contractReport/index.vue', '', '', 'component', 0, 1, '', '2025-11-24 13:34:43', '2025-11-24 13:34:43');
INSERT INTO `sys_menu` VALUES (93, 90, 4, '新增供应商', '', '', 'supplier:supplierInfo:addOne', '/supplier/supplierInfo/addOne', '', 1, 1, '', '2025-12-02 16:28:55', '2025-12-02 16:28:55');
INSERT INTO `sys_menu` VALUES (94, 90, 4, '修改供应商', '', '', 'supplier:supplierInfo:editOne', '/supplier/supplierInfo/editOne', '', 2, 1, '', '2025-12-02 16:29:26', '2025-12-02 16:29:26');
INSERT INTO `sys_menu` VALUES (95, 90, 4, '删除供应商', '', '', 'supplier:supplierInfo:customerList', '/supplier/supplierInfo/customerList', '', 3, 1, '', '2025-12-02 16:30:13', '2025-12-02 16:30:13');
INSERT INTO `sys_menu` VALUES (96, 21, 4, '客户跟进', '', '', 'customerFollowUp:addOne', '/customerFollowUp/addOne', '', 7, 1, '', '2025-12-02 16:54:04', '2025-12-02 16:54:15');
INSERT INTO `sys_menu` VALUES (97, 90, 4, '供应商跟进', '', '', 'supplierFollowUp:addOne', '/customerFollowUp/addOne', '', 4, 1, '', '2025-12-02 16:56:09', '2025-12-02 16:56:09');

-- ----------------------------
-- Table structure for sys_oplog
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
) ENGINE = InnoDB AUTO_INCREMENT = 13 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sys_oplog
-- ----------------------------
INSERT INTO `sys_oplog` VALUES (1, 'fhc', '11386', '合同文件下载', 'com.zkxy.internal.crm.contract.controller.ContractController.downloadFile', '55', '', '2025-02-28 15:43:43', '7162f61a41d584d6a14c3ffc1ac462eb.jpg');
INSERT INTO `sys_oplog` VALUES (2, 'fhc', '11386', '合同文件下载', 'com.zkxy.internal.crm.contract.controller.ContractController.downloadFile', '50', '', '2025-02-28 16:09:48', 'contract/a6932d6e-37e8-4f77-8e86-d551957149be.xlsx');
INSERT INTO `sys_oplog` VALUES (3, 'fhc', '11386', '合同文件下载', 'com.zkxy.internal.crm.contract.controller.ContractController.downloadFile', '50', '', '2025-02-28 16:09:51', 'contract/a6932d6e-37e8-4f77-8e86-d551957149be.xlsx');
INSERT INTO `sys_oplog` VALUES (4, 'fhc', '11386', '合同文件下载', 'com.zkxy.internal.crm.contract.controller.ContractController.downloadFile', '50', '', '2025-02-28 16:09:52', 'contract/a6932d6e-37e8-4f77-8e86-d551957149be.xlsx');
INSERT INTO `sys_oplog` VALUES (5, 'fhc', '11386', '合同文件下载', 'com.zkxy.internal.crm.contract.controller.ContractController.downloadFile', '50', '', '2025-02-28 16:09:52', 'contract/a6932d6e-37e8-4f77-8e86-d551957149be.xlsx');
INSERT INTO `sys_oplog` VALUES (6, 'fhc', '11386', '合同文件下载', 'com.zkxy.internal.crm.contract.controller.ContractController.downloadFile', '46', '', '2025-02-28 16:23:26', 'contract/125fa410-4dfc-49a2-9195-7399c486f8b5.db388396.png');
INSERT INTO `sys_oplog` VALUES (7, 'fhc', '11386', '合同文件下载', 'com.zkxy.internal.crm.contract.controller.ContractController.downloadFile', '46', '', '2025-02-28 16:23:28', 'contract/125fa410-4dfc-49a2-9195-7399c486f8b5.db388396.png');
INSERT INTO `sys_oplog` VALUES (8, 'fhc', '11386', '合同文件下载', 'com.zkxy.internal.crm.contract.controller.ContractController.downloadFile', '46', '', '2025-02-28 16:23:30', 'contract/125fa410-4dfc-49a2-9195-7399c486f8b5.db388396.png');
INSERT INTO `sys_oplog` VALUES (9, 'fhc', '11386', '合同文件下载', 'com.zkxy.internal.crm.contract.controller.ContractController.downloadFile', '46', '', '2025-02-28 16:23:31', 'contract/125fa410-4dfc-49a2-9195-7399c486f8b5.db388396.png');
INSERT INTO `sys_oplog` VALUES (10, 'fhc', '11386', '合同文件下载', 'com.zkxy.internal.crm.contract.controller.ContractController.downloadFile', '46', '', '2025-02-28 16:23:32', 'contract/125fa410-4dfc-49a2-9195-7399c486f8b5.db388396.png');
INSERT INTO `sys_oplog` VALUES (11, 'fhc', '11386', '合同文件下载', 'com.zkxy.internal.crm.contract.controller.ContractController.downloadFile', '46', '', '2025-02-28 16:23:33', 'contract/125fa410-4dfc-49a2-9195-7399c486f8b5.db388396.png');
INSERT INTO `sys_oplog` VALUES (12, 'fhc', '11386', '合同文件下载', 'com.zkxy.internal.crm.contract.controller.ContractController.downloadFile', '47', '', '2025-07-07 10:34:51', '前段项目模块设计文档.docx');

-- ----------------------------
-- Table structure for sys_post
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
) ENGINE = InnoDB AUTO_INCREMENT = 37 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci COMMENT = '职位表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sys_post
-- ----------------------------
INSERT INTO `sys_post` VALUES (1, 1, '董事长', 1, '', 11412, '2024-09-23 09:39:52', 11412, '2024-10-16 09:05:56', 0);
INSERT INTO `sys_post` VALUES (2, 2, '测试2', 3, '', 11386, '2024-09-29 10:03:35', 11386, '2024-09-29 10:07:25', 1);
INSERT INTO `sys_post` VALUES (3, 7, '部门经理', 1, '', 11412, '2024-10-08 13:37:31', 11412, '2024-10-16 09:17:55', 0);
INSERT INTO `sys_post` VALUES (4, 1, '测试', 1, '', 11385, '2024-10-08 13:39:56', 11385, '2024-10-16 08:57:10', 1);
INSERT INTO `sys_post` VALUES (5, 1, '测试123123', 1, '', 11385, '2024-10-08 13:40:12', 11385, '2024-10-16 08:57:20', 1);
INSERT INTO `sys_post` VALUES (6, 1, '123123123', 1, '', 11385, '2024-10-08 13:40:51', 11385, '2024-10-16 08:57:17', 1);
INSERT INTO `sys_post` VALUES (7, 1, '123123213', 1, '', 11385, '2024-10-08 13:42:09', 11385, '2024-10-16 08:57:15', 1);
INSERT INTO `sys_post` VALUES (8, 1, '123123123', 1, '', 11385, '2024-10-08 13:43:22', 11385, '2024-10-08 15:24:36', 1);
INSERT INTO `sys_post` VALUES (9, 1, '123123123', 5, '', 11385, '2024-10-08 13:43:55', 11385, '2024-10-16 08:57:13', 1);
INSERT INTO `sys_post` VALUES (10, 2, '测试13123123', 1, '', 11385, '2024-10-08 13:44:58', 11385, '2024-10-08 14:59:54', 1);
INSERT INTO `sys_post` VALUES (11, 2, '部门经理', 1, '', 11412, '2024-10-09 11:02:36', 11412, '2024-10-16 09:19:42', 0);
INSERT INTO `sys_post` VALUES (12, 1, '董事长助理', 1, '', 11412, '2024-10-09 11:02:54', 11412, '2024-10-16 09:20:17', 0);
INSERT INTO `sys_post` VALUES (13, 7, '123123123', 1, '', 11385, '2024-10-16 09:02:17', 11385, '2024-10-16 09:03:03', 1);
INSERT INTO `sys_post` VALUES (14, 7, 'dddd', 1, '', 11385, '2024-10-16 09:02:28', 11385, '2024-10-16 09:03:02', 1);
INSERT INTO `sys_post` VALUES (15, 8, '123123123', 1, '', 11385, '2024-10-16 09:02:40', 11385, '2024-10-16 09:02:50', 1);
INSERT INTO `sys_post` VALUES (16, 8, '123123123', 1, '', 11385, '2024-10-16 09:02:54', 11385, '2024-10-16 09:02:57', 1);
INSERT INTO `sys_post` VALUES (17, 7, 'ceshi', 1, '', 11385, '2024-10-16 09:03:21', 11385, '2024-10-16 09:03:37', 1);
INSERT INTO `sys_post` VALUES (18, 8, 'dfsdfsdf', 1, '', 11385, '2024-10-16 09:03:43', 11385, '2024-10-16 09:03:48', 1);
INSERT INTO `sys_post` VALUES (19, 12, 'dddddd', 1, '', 11385, '2024-10-16 09:03:58', 11385, '2024-10-16 09:08:16', 1);
INSERT INTO `sys_post` VALUES (20, 12, 'ffff', 1, '', 11385, '2024-10-16 09:04:10', 11385, '2024-10-16 09:13:16', 0);
INSERT INTO `sys_post` VALUES (21, 12, '反反复复', 1, '', 11385, '2024-10-16 09:04:19', 11385, '2024-10-16 09:08:14', 1);
INSERT INTO `sys_post` VALUES (22, 13, '的点点滴滴', 1, '', 11385, '2024-10-16 09:04:40', 11385, '2024-10-16 09:04:45', 1);
INSERT INTO `sys_post` VALUES (23, 12, 'sdfsdf', 1, '', 11385, '2024-10-16 09:07:52', 11385, '2024-10-16 09:08:12', 1);
INSERT INTO `sys_post` VALUES (24, 4, '部门经理', 1, '', 11412, '2024-10-16 09:08:23', 11412, '2024-10-16 09:17:29', 0);
INSERT INTO `sys_post` VALUES (25, 4, '部门员工', 1, '', 11412, '2024-10-16 09:08:35', 11412, '2024-10-16 09:17:41', 0);
INSERT INTO `sys_post` VALUES (26, 7, '部门员工', 1, '', 11412, '2024-10-16 09:09:00', 11412, '2024-10-16 09:18:06', 0);
INSERT INTO `sys_post` VALUES (27, 8, '部门经理', 1, '', 11412, '2024-10-16 09:09:08', 11412, '2024-10-16 09:18:14', 0);
INSERT INTO `sys_post` VALUES (28, 8, '部门员工', 1, '', 11412, '2024-10-16 09:09:15', 11412, '2024-10-16 09:18:21', 0);
INSERT INTO `sys_post` VALUES (29, 9, '部门经理', 1, '', 11412, '2024-10-16 09:09:22', 11412, '2024-10-16 09:18:28', 0);
INSERT INTO `sys_post` VALUES (30, 9, '部门员工', 1, '', 11412, '2024-10-16 09:09:29', 11412, '2024-10-16 09:18:35', 0);
INSERT INTO `sys_post` VALUES (31, 10, '部门经理', 1, '', 11412, '2024-10-16 09:09:41', 11412, '2024-10-16 09:18:47', 0);
INSERT INTO `sys_post` VALUES (32, 10, '部门员工', 1, '', 11412, '2024-10-16 09:09:48', 11412, '2024-10-16 09:18:54', 0);
INSERT INTO `sys_post` VALUES (33, 11, '部门经理', 1, '', 11412, '2024-10-16 09:09:54', 11412, '2024-10-16 09:19:00', 0);
INSERT INTO `sys_post` VALUES (34, 11, '部门员工', 1, '', 11412, '2024-10-16 09:10:01', 11412, '2024-10-16 09:19:07', 0);
INSERT INTO `sys_post` VALUES (35, 2, '部门员工', 1, '', 11412, '2024-10-16 09:11:32', 11412, '2024-10-16 09:20:38', 0);
INSERT INTO `sys_post` VALUES (36, 1, '总监', 1, '', 11412, '2024-10-16 09:12:48', 11412, '2024-10-16 09:21:54', 0);

-- ----------------------------
-- Table structure for sys_post_menu
-- ----------------------------
DROP TABLE IF EXISTS `sys_post_menu`;
CREATE TABLE `sys_post_menu`  (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT 'id',
  `post_id` int NOT NULL COMMENT '职位ID',
  `menu_id` int NOT NULL COMMENT '菜单ID',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2371 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of sys_post_menu
-- ----------------------------
INSERT INTO `sys_post_menu` VALUES (143, 11, 19);
INSERT INTO `sys_post_menu` VALUES (144, 11, 21);
INSERT INTO `sys_post_menu` VALUES (145, 11, 16);
INSERT INTO `sys_post_menu` VALUES (146, 11, 18);
INSERT INTO `sys_post_menu` VALUES (147, 11, 17);
INSERT INTO `sys_post_menu` VALUES (148, 11, 14);
INSERT INTO `sys_post_menu` VALUES (149, 11, 15);
INSERT INTO `sys_post_menu` VALUES (150, 11, 26);
INSERT INTO `sys_post_menu` VALUES (151, 11, 27);
INSERT INTO `sys_post_menu` VALUES (152, 11, 10);
INSERT INTO `sys_post_menu` VALUES (153, 11, 23);
INSERT INTO `sys_post_menu` VALUES (154, 11, 13);
INSERT INTO `sys_post_menu` VALUES (155, 11, 12);
INSERT INTO `sys_post_menu` VALUES (156, 11, 11);
INSERT INTO `sys_post_menu` VALUES (157, 11, 28);
INSERT INTO `sys_post_menu` VALUES (158, 11, 22);
INSERT INTO `sys_post_menu` VALUES (159, 11, 24);
INSERT INTO `sys_post_menu` VALUES (160, 11, 25);
INSERT INTO `sys_post_menu` VALUES (181, 35, 29);
INSERT INTO `sys_post_menu` VALUES (182, 35, 30);
INSERT INTO `sys_post_menu` VALUES (183, 35, 19);
INSERT INTO `sys_post_menu` VALUES (184, 35, 21);
INSERT INTO `sys_post_menu` VALUES (185, 35, 16);
INSERT INTO `sys_post_menu` VALUES (186, 35, 18);
INSERT INTO `sys_post_menu` VALUES (187, 35, 17);
INSERT INTO `sys_post_menu` VALUES (188, 35, 14);
INSERT INTO `sys_post_menu` VALUES (189, 35, 15);
INSERT INTO `sys_post_menu` VALUES (190, 35, 26);
INSERT INTO `sys_post_menu` VALUES (191, 35, 27);
INSERT INTO `sys_post_menu` VALUES (192, 35, 10);
INSERT INTO `sys_post_menu` VALUES (193, 35, 23);
INSERT INTO `sys_post_menu` VALUES (194, 35, 13);
INSERT INTO `sys_post_menu` VALUES (195, 35, 12);
INSERT INTO `sys_post_menu` VALUES (196, 35, 11);
INSERT INTO `sys_post_menu` VALUES (197, 35, 28);
INSERT INTO `sys_post_menu` VALUES (198, 35, 22);
INSERT INTO `sys_post_menu` VALUES (199, 35, 24);
INSERT INTO `sys_post_menu` VALUES (200, 35, 25);
INSERT INTO `sys_post_menu` VALUES (903, 28, 16);
INSERT INTO `sys_post_menu` VALUES (904, 28, 18);
INSERT INTO `sys_post_menu` VALUES (905, 28, 38);
INSERT INTO `sys_post_menu` VALUES (906, 28, 39);
INSERT INTO `sys_post_menu` VALUES (907, 28, 40);
INSERT INTO `sys_post_menu` VALUES (908, 28, 41);
INSERT INTO `sys_post_menu` VALUES (909, 28, 42);
INSERT INTO `sys_post_menu` VALUES (910, 28, 43);
INSERT INTO `sys_post_menu` VALUES (911, 28, 76);
INSERT INTO `sys_post_menu` VALUES (912, 28, 77);
INSERT INTO `sys_post_menu` VALUES (913, 28, 78);
INSERT INTO `sys_post_menu` VALUES (914, 28, 79);
INSERT INTO `sys_post_menu` VALUES (915, 28, 17);
INSERT INTO `sys_post_menu` VALUES (916, 28, 33);
INSERT INTO `sys_post_menu` VALUES (917, 28, 34);
INSERT INTO `sys_post_menu` VALUES (918, 28, 35);
INSERT INTO `sys_post_menu` VALUES (919, 28, 36);
INSERT INTO `sys_post_menu` VALUES (920, 28, 80);
INSERT INTO `sys_post_menu` VALUES (921, 30, 16);
INSERT INTO `sys_post_menu` VALUES (922, 30, 18);
INSERT INTO `sys_post_menu` VALUES (923, 30, 38);
INSERT INTO `sys_post_menu` VALUES (924, 30, 39);
INSERT INTO `sys_post_menu` VALUES (925, 30, 40);
INSERT INTO `sys_post_menu` VALUES (926, 30, 41);
INSERT INTO `sys_post_menu` VALUES (927, 30, 42);
INSERT INTO `sys_post_menu` VALUES (928, 30, 43);
INSERT INTO `sys_post_menu` VALUES (929, 30, 76);
INSERT INTO `sys_post_menu` VALUES (930, 30, 77);
INSERT INTO `sys_post_menu` VALUES (931, 30, 78);
INSERT INTO `sys_post_menu` VALUES (932, 30, 79);
INSERT INTO `sys_post_menu` VALUES (933, 30, 17);
INSERT INTO `sys_post_menu` VALUES (934, 30, 33);
INSERT INTO `sys_post_menu` VALUES (935, 30, 34);
INSERT INTO `sys_post_menu` VALUES (936, 30, 35);
INSERT INTO `sys_post_menu` VALUES (937, 30, 36);
INSERT INTO `sys_post_menu` VALUES (938, 30, 80);
INSERT INTO `sys_post_menu` VALUES (939, 34, 29);
INSERT INTO `sys_post_menu` VALUES (940, 34, 30);
INSERT INTO `sys_post_menu` VALUES (941, 34, 16);
INSERT INTO `sys_post_menu` VALUES (942, 34, 18);
INSERT INTO `sys_post_menu` VALUES (943, 34, 38);
INSERT INTO `sys_post_menu` VALUES (944, 34, 39);
INSERT INTO `sys_post_menu` VALUES (945, 34, 40);
INSERT INTO `sys_post_menu` VALUES (946, 34, 41);
INSERT INTO `sys_post_menu` VALUES (947, 34, 42);
INSERT INTO `sys_post_menu` VALUES (948, 34, 43);
INSERT INTO `sys_post_menu` VALUES (949, 34, 76);
INSERT INTO `sys_post_menu` VALUES (950, 34, 77);
INSERT INTO `sys_post_menu` VALUES (951, 34, 78);
INSERT INTO `sys_post_menu` VALUES (952, 34, 79);
INSERT INTO `sys_post_menu` VALUES (953, 34, 17);
INSERT INTO `sys_post_menu` VALUES (954, 34, 33);
INSERT INTO `sys_post_menu` VALUES (955, 34, 34);
INSERT INTO `sys_post_menu` VALUES (956, 34, 35);
INSERT INTO `sys_post_menu` VALUES (957, 34, 36);
INSERT INTO `sys_post_menu` VALUES (958, 34, 80);
INSERT INTO `sys_post_menu` VALUES (959, 34, 14);
INSERT INTO `sys_post_menu` VALUES (960, 34, 15);
INSERT INTO `sys_post_menu` VALUES (961, 34, 51);
INSERT INTO `sys_post_menu` VALUES (962, 34, 53);
INSERT INTO `sys_post_menu` VALUES (963, 34, 54);
INSERT INTO `sys_post_menu` VALUES (964, 34, 74);
INSERT INTO `sys_post_menu` VALUES (965, 34, 75);
INSERT INTO `sys_post_menu` VALUES (966, 34, 19);
INSERT INTO `sys_post_menu` VALUES (967, 34, 21);
INSERT INTO `sys_post_menu` VALUES (968, 34, 46);
INSERT INTO `sys_post_menu` VALUES (969, 34, 47);
INSERT INTO `sys_post_menu` VALUES (970, 34, 48);
INSERT INTO `sys_post_menu` VALUES (971, 34, 49);
INSERT INTO `sys_post_menu` VALUES (972, 34, 50);
INSERT INTO `sys_post_menu` VALUES (973, 34, 26);
INSERT INTO `sys_post_menu` VALUES (974, 34, 27);
INSERT INTO `sys_post_menu` VALUES (975, 34, 10);
INSERT INTO `sys_post_menu` VALUES (976, 34, 11);
INSERT INTO `sys_post_menu` VALUES (977, 34, 57);
INSERT INTO `sys_post_menu` VALUES (978, 34, 55);
INSERT INTO `sys_post_menu` VALUES (979, 34, 56);
INSERT INTO `sys_post_menu` VALUES (980, 34, 58);
INSERT INTO `sys_post_menu` VALUES (981, 34, 23);
INSERT INTO `sys_post_menu` VALUES (982, 34, 60);
INSERT INTO `sys_post_menu` VALUES (983, 34, 59);
INSERT INTO `sys_post_menu` VALUES (984, 34, 61);
INSERT INTO `sys_post_menu` VALUES (985, 34, 62);
INSERT INTO `sys_post_menu` VALUES (986, 34, 63);
INSERT INTO `sys_post_menu` VALUES (987, 34, 64);
INSERT INTO `sys_post_menu` VALUES (988, 34, 65);
INSERT INTO `sys_post_menu` VALUES (989, 34, 12);
INSERT INTO `sys_post_menu` VALUES (990, 34, 13);
INSERT INTO `sys_post_menu` VALUES (991, 34, 66);
INSERT INTO `sys_post_menu` VALUES (992, 34, 67);
INSERT INTO `sys_post_menu` VALUES (993, 34, 68);
INSERT INTO `sys_post_menu` VALUES (994, 34, 69);
INSERT INTO `sys_post_menu` VALUES (995, 34, 70);
INSERT INTO `sys_post_menu` VALUES (996, 34, 71);
INSERT INTO `sys_post_menu` VALUES (997, 34, 72);
INSERT INTO `sys_post_menu` VALUES (998, 34, 73);
INSERT INTO `sys_post_menu` VALUES (999, 34, 24);
INSERT INTO `sys_post_menu` VALUES (1000, 34, 25);
INSERT INTO `sys_post_menu` VALUES (1719, 24, 29);
INSERT INTO `sys_post_menu` VALUES (1720, 24, 30);
INSERT INTO `sys_post_menu` VALUES (1721, 24, 19);
INSERT INTO `sys_post_menu` VALUES (1722, 24, 21);
INSERT INTO `sys_post_menu` VALUES (1723, 24, 46);
INSERT INTO `sys_post_menu` VALUES (1724, 24, 47);
INSERT INTO `sys_post_menu` VALUES (1725, 24, 48);
INSERT INTO `sys_post_menu` VALUES (1726, 24, 49);
INSERT INTO `sys_post_menu` VALUES (1727, 24, 50);
INSERT INTO `sys_post_menu` VALUES (1728, 24, 16);
INSERT INTO `sys_post_menu` VALUES (1729, 24, 18);
INSERT INTO `sys_post_menu` VALUES (1730, 24, 38);
INSERT INTO `sys_post_menu` VALUES (1731, 24, 39);
INSERT INTO `sys_post_menu` VALUES (1732, 24, 40);
INSERT INTO `sys_post_menu` VALUES (1733, 24, 41);
INSERT INTO `sys_post_menu` VALUES (1734, 24, 42);
INSERT INTO `sys_post_menu` VALUES (1735, 24, 43);
INSERT INTO `sys_post_menu` VALUES (1736, 24, 76);
INSERT INTO `sys_post_menu` VALUES (1737, 24, 77);
INSERT INTO `sys_post_menu` VALUES (1738, 24, 78);
INSERT INTO `sys_post_menu` VALUES (1739, 24, 79);
INSERT INTO `sys_post_menu` VALUES (1740, 24, 17);
INSERT INTO `sys_post_menu` VALUES (1741, 24, 33);
INSERT INTO `sys_post_menu` VALUES (1742, 24, 34);
INSERT INTO `sys_post_menu` VALUES (1743, 24, 35);
INSERT INTO `sys_post_menu` VALUES (1744, 24, 36);
INSERT INTO `sys_post_menu` VALUES (1745, 24, 80);
INSERT INTO `sys_post_menu` VALUES (1746, 24, 87);
INSERT INTO `sys_post_menu` VALUES (1747, 24, 14);
INSERT INTO `sys_post_menu` VALUES (1748, 24, 15);
INSERT INTO `sys_post_menu` VALUES (1749, 24, 51);
INSERT INTO `sys_post_menu` VALUES (1750, 24, 53);
INSERT INTO `sys_post_menu` VALUES (1751, 24, 54);
INSERT INTO `sys_post_menu` VALUES (1752, 24, 74);
INSERT INTO `sys_post_menu` VALUES (1753, 24, 75);
INSERT INTO `sys_post_menu` VALUES (1754, 24, 26);
INSERT INTO `sys_post_menu` VALUES (1755, 24, 27);
INSERT INTO `sys_post_menu` VALUES (1756, 24, 10);
INSERT INTO `sys_post_menu` VALUES (1757, 24, 11);
INSERT INTO `sys_post_menu` VALUES (1758, 24, 57);
INSERT INTO `sys_post_menu` VALUES (1759, 24, 55);
INSERT INTO `sys_post_menu` VALUES (1760, 24, 56);
INSERT INTO `sys_post_menu` VALUES (1761, 24, 58);
INSERT INTO `sys_post_menu` VALUES (1762, 24, 23);
INSERT INTO `sys_post_menu` VALUES (1763, 24, 59);
INSERT INTO `sys_post_menu` VALUES (1764, 24, 60);
INSERT INTO `sys_post_menu` VALUES (1765, 24, 61);
INSERT INTO `sys_post_menu` VALUES (1766, 24, 62);
INSERT INTO `sys_post_menu` VALUES (1767, 24, 63);
INSERT INTO `sys_post_menu` VALUES (1768, 24, 64);
INSERT INTO `sys_post_menu` VALUES (1769, 24, 65);
INSERT INTO `sys_post_menu` VALUES (1770, 24, 12);
INSERT INTO `sys_post_menu` VALUES (1771, 24, 13);
INSERT INTO `sys_post_menu` VALUES (1772, 24, 66);
INSERT INTO `sys_post_menu` VALUES (1773, 24, 67);
INSERT INTO `sys_post_menu` VALUES (1774, 24, 68);
INSERT INTO `sys_post_menu` VALUES (1775, 24, 69);
INSERT INTO `sys_post_menu` VALUES (1776, 24, 70);
INSERT INTO `sys_post_menu` VALUES (1777, 24, 71);
INSERT INTO `sys_post_menu` VALUES (1778, 24, 72);
INSERT INTO `sys_post_menu` VALUES (1779, 24, 73);
INSERT INTO `sys_post_menu` VALUES (1780, 24, 24);
INSERT INTO `sys_post_menu` VALUES (1781, 24, 25);
INSERT INTO `sys_post_menu` VALUES (1782, 24, 83);
INSERT INTO `sys_post_menu` VALUES (1783, 24, 84);
INSERT INTO `sys_post_menu` VALUES (1784, 24, 85);
INSERT INTO `sys_post_menu` VALUES (1785, 24, 86);
INSERT INTO `sys_post_menu` VALUES (2146, 12, 14);
INSERT INTO `sys_post_menu` VALUES (2147, 12, 15);
INSERT INTO `sys_post_menu` VALUES (2148, 12, 51);
INSERT INTO `sys_post_menu` VALUES (2149, 12, 53);
INSERT INTO `sys_post_menu` VALUES (2150, 12, 54);
INSERT INTO `sys_post_menu` VALUES (2151, 12, 74);
INSERT INTO `sys_post_menu` VALUES (2152, 12, 75);
INSERT INTO `sys_post_menu` VALUES (2153, 12, 17);
INSERT INTO `sys_post_menu` VALUES (2154, 12, 16);
INSERT INTO `sys_post_menu` VALUES (2155, 12, 33);
INSERT INTO `sys_post_menu` VALUES (2156, 12, 34);
INSERT INTO `sys_post_menu` VALUES (2157, 12, 35);
INSERT INTO `sys_post_menu` VALUES (2158, 12, 36);
INSERT INTO `sys_post_menu` VALUES (2159, 12, 80);
INSERT INTO `sys_post_menu` VALUES (2160, 12, 18);
INSERT INTO `sys_post_menu` VALUES (2161, 12, 38);
INSERT INTO `sys_post_menu` VALUES (2162, 12, 39);
INSERT INTO `sys_post_menu` VALUES (2163, 12, 40);
INSERT INTO `sys_post_menu` VALUES (2164, 12, 41);
INSERT INTO `sys_post_menu` VALUES (2165, 12, 42);
INSERT INTO `sys_post_menu` VALUES (2166, 12, 43);
INSERT INTO `sys_post_menu` VALUES (2167, 12, 76);
INSERT INTO `sys_post_menu` VALUES (2168, 12, 77);
INSERT INTO `sys_post_menu` VALUES (2169, 12, 78);
INSERT INTO `sys_post_menu` VALUES (2170, 12, 79);
INSERT INTO `sys_post_menu` VALUES (2171, 12, 19);
INSERT INTO `sys_post_menu` VALUES (2172, 12, 21);
INSERT INTO `sys_post_menu` VALUES (2173, 12, 46);
INSERT INTO `sys_post_menu` VALUES (2174, 12, 47);
INSERT INTO `sys_post_menu` VALUES (2175, 12, 48);
INSERT INTO `sys_post_menu` VALUES (2176, 12, 49);
INSERT INTO `sys_post_menu` VALUES (2177, 12, 50);
INSERT INTO `sys_post_menu` VALUES (2178, 12, 26);
INSERT INTO `sys_post_menu` VALUES (2179, 12, 27);
INSERT INTO `sys_post_menu` VALUES (2180, 12, 91);
INSERT INTO `sys_post_menu` VALUES (2181, 12, 92);
INSERT INTO `sys_post_menu` VALUES (2182, 12, 11);
INSERT INTO `sys_post_menu` VALUES (2183, 12, 10);
INSERT INTO `sys_post_menu` VALUES (2184, 12, 57);
INSERT INTO `sys_post_menu` VALUES (2185, 12, 55);
INSERT INTO `sys_post_menu` VALUES (2186, 12, 56);
INSERT INTO `sys_post_menu` VALUES (2187, 12, 58);
INSERT INTO `sys_post_menu` VALUES (2188, 12, 12);
INSERT INTO `sys_post_menu` VALUES (2189, 12, 13);
INSERT INTO `sys_post_menu` VALUES (2190, 12, 66);
INSERT INTO `sys_post_menu` VALUES (2191, 12, 67);
INSERT INTO `sys_post_menu` VALUES (2192, 12, 68);
INSERT INTO `sys_post_menu` VALUES (2193, 12, 69);
INSERT INTO `sys_post_menu` VALUES (2194, 12, 70);
INSERT INTO `sys_post_menu` VALUES (2195, 12, 71);
INSERT INTO `sys_post_menu` VALUES (2196, 12, 72);
INSERT INTO `sys_post_menu` VALUES (2197, 12, 73);
INSERT INTO `sys_post_menu` VALUES (2198, 12, 23);
INSERT INTO `sys_post_menu` VALUES (2199, 12, 60);
INSERT INTO `sys_post_menu` VALUES (2200, 12, 59);
INSERT INTO `sys_post_menu` VALUES (2201, 12, 61);
INSERT INTO `sys_post_menu` VALUES (2202, 12, 62);
INSERT INTO `sys_post_menu` VALUES (2203, 12, 63);
INSERT INTO `sys_post_menu` VALUES (2204, 12, 64);
INSERT INTO `sys_post_menu` VALUES (2205, 12, 65);
INSERT INTO `sys_post_menu` VALUES (2206, 12, 89);
INSERT INTO `sys_post_menu` VALUES (2207, 12, 90);
INSERT INTO `sys_post_menu` VALUES (2208, 12, 93);
INSERT INTO `sys_post_menu` VALUES (2209, 12, 94);
INSERT INTO `sys_post_menu` VALUES (2210, 12, 95);
INSERT INTO `sys_post_menu` VALUES (2211, 12, 24);
INSERT INTO `sys_post_menu` VALUES (2212, 12, 25);
INSERT INTO `sys_post_menu` VALUES (2292, 1, 29);
INSERT INTO `sys_post_menu` VALUES (2293, 1, 30);
INSERT INTO `sys_post_menu` VALUES (2294, 1, 14);
INSERT INTO `sys_post_menu` VALUES (2295, 1, 15);
INSERT INTO `sys_post_menu` VALUES (2296, 1, 51);
INSERT INTO `sys_post_menu` VALUES (2297, 1, 53);
INSERT INTO `sys_post_menu` VALUES (2298, 1, 54);
INSERT INTO `sys_post_menu` VALUES (2299, 1, 74);
INSERT INTO `sys_post_menu` VALUES (2300, 1, 75);
INSERT INTO `sys_post_menu` VALUES (2301, 1, 16);
INSERT INTO `sys_post_menu` VALUES (2302, 1, 18);
INSERT INTO `sys_post_menu` VALUES (2303, 1, 38);
INSERT INTO `sys_post_menu` VALUES (2304, 1, 39);
INSERT INTO `sys_post_menu` VALUES (2305, 1, 40);
INSERT INTO `sys_post_menu` VALUES (2306, 1, 41);
INSERT INTO `sys_post_menu` VALUES (2307, 1, 42);
INSERT INTO `sys_post_menu` VALUES (2308, 1, 43);
INSERT INTO `sys_post_menu` VALUES (2309, 1, 76);
INSERT INTO `sys_post_menu` VALUES (2310, 1, 77);
INSERT INTO `sys_post_menu` VALUES (2311, 1, 78);
INSERT INTO `sys_post_menu` VALUES (2312, 1, 79);
INSERT INTO `sys_post_menu` VALUES (2313, 1, 17);
INSERT INTO `sys_post_menu` VALUES (2314, 1, 33);
INSERT INTO `sys_post_menu` VALUES (2315, 1, 34);
INSERT INTO `sys_post_menu` VALUES (2316, 1, 35);
INSERT INTO `sys_post_menu` VALUES (2317, 1, 36);
INSERT INTO `sys_post_menu` VALUES (2318, 1, 80);
INSERT INTO `sys_post_menu` VALUES (2319, 1, 87);
INSERT INTO `sys_post_menu` VALUES (2320, 1, 19);
INSERT INTO `sys_post_menu` VALUES (2321, 1, 21);
INSERT INTO `sys_post_menu` VALUES (2322, 1, 46);
INSERT INTO `sys_post_menu` VALUES (2323, 1, 47);
INSERT INTO `sys_post_menu` VALUES (2324, 1, 48);
INSERT INTO `sys_post_menu` VALUES (2325, 1, 49);
INSERT INTO `sys_post_menu` VALUES (2326, 1, 50);
INSERT INTO `sys_post_menu` VALUES (2327, 1, 96);
INSERT INTO `sys_post_menu` VALUES (2328, 1, 26);
INSERT INTO `sys_post_menu` VALUES (2329, 1, 27);
INSERT INTO `sys_post_menu` VALUES (2330, 1, 91);
INSERT INTO `sys_post_menu` VALUES (2331, 1, 92);
INSERT INTO `sys_post_menu` VALUES (2332, 1, 10);
INSERT INTO `sys_post_menu` VALUES (2333, 1, 23);
INSERT INTO `sys_post_menu` VALUES (2334, 1, 59);
INSERT INTO `sys_post_menu` VALUES (2335, 1, 60);
INSERT INTO `sys_post_menu` VALUES (2336, 1, 61);
INSERT INTO `sys_post_menu` VALUES (2337, 1, 62);
INSERT INTO `sys_post_menu` VALUES (2338, 1, 63);
INSERT INTO `sys_post_menu` VALUES (2339, 1, 64);
INSERT INTO `sys_post_menu` VALUES (2340, 1, 65);
INSERT INTO `sys_post_menu` VALUES (2341, 1, 13);
INSERT INTO `sys_post_menu` VALUES (2342, 1, 66);
INSERT INTO `sys_post_menu` VALUES (2343, 1, 67);
INSERT INTO `sys_post_menu` VALUES (2344, 1, 68);
INSERT INTO `sys_post_menu` VALUES (2345, 1, 69);
INSERT INTO `sys_post_menu` VALUES (2346, 1, 70);
INSERT INTO `sys_post_menu` VALUES (2347, 1, 71);
INSERT INTO `sys_post_menu` VALUES (2348, 1, 72);
INSERT INTO `sys_post_menu` VALUES (2349, 1, 73);
INSERT INTO `sys_post_menu` VALUES (2350, 1, 12);
INSERT INTO `sys_post_menu` VALUES (2351, 1, 11);
INSERT INTO `sys_post_menu` VALUES (2352, 1, 57);
INSERT INTO `sys_post_menu` VALUES (2353, 1, 55);
INSERT INTO `sys_post_menu` VALUES (2354, 1, 56);
INSERT INTO `sys_post_menu` VALUES (2355, 1, 58);
INSERT INTO `sys_post_menu` VALUES (2356, 1, 88);
INSERT INTO `sys_post_menu` VALUES (2357, 1, 83);
INSERT INTO `sys_post_menu` VALUES (2358, 1, 84);
INSERT INTO `sys_post_menu` VALUES (2359, 1, 85);
INSERT INTO `sys_post_menu` VALUES (2360, 1, 86);
INSERT INTO `sys_post_menu` VALUES (2361, 1, 89);
INSERT INTO `sys_post_menu` VALUES (2362, 1, 90);
INSERT INTO `sys_post_menu` VALUES (2363, 1, 93);
INSERT INTO `sys_post_menu` VALUES (2364, 1, 94);
INSERT INTO `sys_post_menu` VALUES (2365, 1, 95);
INSERT INTO `sys_post_menu` VALUES (2366, 1, 97);
INSERT INTO `sys_post_menu` VALUES (2367, 1, 24);
INSERT INTO `sys_post_menu` VALUES (2368, 1, 25);
INSERT INTO `sys_post_menu` VALUES (2369, 1, 81);
INSERT INTO `sys_post_menu` VALUES (2370, 1, 82);

-- ----------------------------
-- Table structure for sys_user
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
) ENGINE = InnoDB AUTO_INCREMENT = 11419 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sys_user
-- ----------------------------
INSERT INTO `sys_user` VALUES (11385, '超管', '17866668888', '17866668888@163.com', '$2a$10$4q9bIlERzjZym0i64bUpkuymYtLeOSfMk52I.XBW3yC0IgU8cncPm', NULL, 1, 1, 'http://172.18.7.21:19001/zkxy-crm-contract-dev/file_20251119112030_11111.png', 1, '2024-09-23 09:37:18', 1, '2024-09-23 09:38:14', 1, 0);
INSERT INTO `sys_user` VALUES (11386, 'fhc', '17661048266', '17661048266@163.com', '$2a$10$/K61roO7yP/F1GtkMHdDFu5/2ROR5HQrATjokB3enVDS4MCDnm8SG', 11385, 1, 1, 'http://172.18.7.21:19001/zkxy-crm-contract-dev/file_20251126085434_11111.png', 1, '2024-09-29 08:52:20', 11386, '2024-10-23 09:30:10', 1, 0);
INSERT INTO `sys_user` VALUES (11400, '冯', '17661048267', '17661048267@163.com', '$2a$10$u6FGBQ19eU8D1F6o4kgHzODSLMQb2CCwyq19SXATbo1ZCNUg6CbPy', 11385, 2, 1, NULL, 1, '2024-09-29 08:52:20', NULL, '2024-10-29 09:48:37', 1, 0);
INSERT INTO `sys_user` VALUES (11403, '张三', '19888888881', '11112345@qq.com', '$2a$10$vvNjjZ.bZRzmYPEfkRkQAua1vZOb.jWqCZbTSkpvVO2Sd/fxsFQi.', NULL, 1, 1, NULL, 11386, '2024-10-08 14:41:43', 11386, '2025-02-07 14:57:51', 1, 0);
INSERT INTO `sys_user` VALUES (11404, '李四', '19888888882', '11321456@qq.com', '$2a$10$hxrqfJ.w0rRnB.n7CSFZWOqMmqN60OL5h2n5N5XHR.nTqs96TptFq', 11400, 2, 1, NULL, 11386, '2024-10-08 14:41:43', 11386, '2024-10-08 14:41:43', 1, 0);
INSERT INTO `sys_user` VALUES (11407, '测试用户3', '18363971264', '2@qq.com', '$2a$10$M/uFeyxirnspYRqqUson8.MyzKLDf2UruFseScnV/qvEeSnoxNx.i', 11403, 4, 24, NULL, NULL, '2024-10-09 11:20:21', 11385, '2024-10-23 09:30:15', 1, 0);
INSERT INTO `sys_user` VALUES (11408, '测试用户4', '18363971264', '12@qq.com', '123456', 11407, 2, 12, NULL, NULL, '2024-10-09 13:43:39', NULL, '2024-10-09 14:42:37', 1, 1);
INSERT INTO `sys_user` VALUES (11409, '测试用户5', '18363971265', '1223@qq.com', '0FA00516C7FA7350DED84B110C438F04', 11385, 1, 9, NULL, NULL, '2024-10-09 14:27:33', NULL, '2024-10-09 14:42:37', 1, 1);
INSERT INTO `sys_user` VALUES (11411, '测试新增', '17864221526', '123@11.com', '$2a$10$Z1opVZTf5wFe7MvaXMoXge.ywH0X25q3HFYEtCrUHTmcYxpu3vTca', 11385, 1, 1, '123', 11385, '2024-10-09 15:44:23', NULL, '2024-10-09 15:44:23', 1, 0);
INSERT INTO `sys_user` VALUES (11412, '用户二', '18200000000', '123111@qq.com', '$2a$10$3UtpP5mVPUIvyqu4LqF7u.eFBcPEZohHw0U2nKrOoyKDzIGSf140e', 11385, 2, 35, NULL, 11385, '2024-10-09 16:01:10', 11412, '2024-10-16 09:22:55', 1, 0);
INSERT INTO `sys_user` VALUES (11413, 'ssss', '18363971267', '1@163.com', '$2a$10$au2NKlWYPgEvsKfJdbJCQe4wD8UVj5Lxv4qZyX/xiJQKIX3g8Fk8a', 11404, 1, 12, NULL, 11385, '2024-10-16 16:30:24', 11385, '2024-10-23 09:29:47', 1, 0);
INSERT INTO `sys_user` VALUES (11414, '123', '18366666666', '1234@163.com', '$2a$10$UEOnqFSuRa4KN0HQDyrbeesDwaYjFt1YCOsD3H2xicQUwojl2o8vm', 11404, 1, 12, NULL, 11385, '2024-10-16 16:31:19', NULL, '2024-10-16 16:31:19', 1, 0);
INSERT INTO `sys_user` VALUES (11415, 'ssssss', '18363971266', '123@123.com', '$2a$10$.E6qja4kDlpKfxSTC/bS3utcjCIYiaaeH5dvLn8W0Np2.av38.jvy', 11404, 2, 11, NULL, 11385, '2024-10-16 16:31:50', 11385, '2024-10-23 09:29:54', 1, 0);
INSERT INTO `sys_user` VALUES (11416, '超管bak', '17866668889', '17866668889@163.com', '$2a$10$u6FGBQ19eU8D1F6o4kgHzODSLMQb2CCwyq19SXATbo1ZCNUg6CbPy', NULL, 1, 1, 'http://172.18.7.21:19001/zkxy-crm-contract-dev/file_20241015102430_test.gif?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=6l12oijBcXulpx6jrJJF%2F20241015%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20241015T022430Z&X-Amz-Expires=604800&X-Amz-SignedHeaders=host&X-Amz-Signature=efa551bf9e79285dcf3ccceb577d30016bb905f789ebba0bd12d377ffbd66456', 1, '2024-09-23 09:37:18', 1, '2024-10-17 08:51:49', 1, 0);
INSERT INTO `sys_user` VALUES (11417, 'sxp', '18363971268', '632449987@qq.com', '$2a$10$ZacGh.BKaMj5OgXthOnVyuNWT0vji/qbcSMCizMpCEqC6n4Tkts7W', NULL, 11, 34, NULL, 11385, '2024-10-17 09:48:04', 11417, '2024-10-21 09:42:39', 1, 0);
INSERT INTO `sys_user` VALUES (11418, 'ssss1', '18363971200', '1@163.com', '$2a$10$au2NKlWYPgEvsKfJdbJCQe4wD8UVj5Lxv4qZyX/xiJQKIX3g8Fk8a', 11404, 11, 12, NULL, 11385, '2024-10-16 16:30:24', 11385, '2025-01-10 15:55:24', 1, 0);

-- ----------------------------
-- Table structure for tb_contract
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
  `of_supplier_contract` int NULL DEFAULT NULL COMMENT '是否是供应商合同  (0:否;1:是)',
  `signatory_type` int NULL DEFAULT NULL COMMENT '签约类型',
  `remark` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT '备注信息',
  `update_by` int NULL DEFAULT NULL COMMENT '更新人的ID',
  `update_at` timestamp NULL DEFAULT NULL COMMENT '更新时间',
  `create_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '创建时间',
  `del_flag` tinyint NULL DEFAULT NULL COMMENT '是否删除(0:未删除;1:已删除)',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 64 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '合同管理表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of tb_contract
-- ----------------------------
INSERT INTO `tb_contract` VALUES (15, 35, 54, 34, '测试合同名称', 'sssss', 'NO1234444', '2024-10-15', '2026-10-23', 52, NULL, 112313123123.0000, 112313123123.0000, 11385, '超管', NULL, NULL, NULL, 11386, NULL, '2025-11-26 15:50:18', 0);
INSERT INTO `tb_contract` VALUES (16, 36, 54, 35, '新建合同', '1111', 'CA00000001', '2024-10-13', '2025-10-13', 53, '2024-10-15', 600000.0000, 0.0000, 11412, '用户二', NULL, NULL, NULL, 11386, NULL, '2025-07-08 09:36:33', 0);
INSERT INTO `tb_contract` VALUES (17, 37, 54, 37, '微服务技术支持', NULL, 'CT000001', '2024-01-12', '2025-01-12', 52, NULL, 329300.0000, 329300.0000, 11417, 'sxp', NULL, NULL, NULL, NULL, NULL, '2025-07-08 09:37:00', 0);
INSERT INTO `tb_contract` VALUES (18, 37, 55, 36, 'EDA服务合同', NULL, 'CT000002', '2024-11-12', '2025-11-12', 53, '2024-10-12', 400000.0000, 0.0000, 11417, 'sxp', NULL, NULL, NULL, NULL, NULL, '2025-07-08 09:36:33', 0);
INSERT INTO `tb_contract` VALUES (19, 39, 54, 34, '123123', '111111111111111111', '123123', '2024-10-29', '2024-11-01', 53, '2024-10-31', 123123.0000, 0.0000, 11416, '超管bak', NULL, NULL, NULL, 11386, NULL, '2025-07-08 09:36:33', 0);
INSERT INTO `tb_contract` VALUES (20, 40, 54, 34, '测试合同名称', NULL, 'N123456', '2024-01-12', '2024-01-12', 53, '2024-01-12', 1111.0000, 0.0000, 11417, 'sxp', NULL, NULL, NULL, NULL, NULL, '2025-07-08 09:36:33', 0);
INSERT INTO `tb_contract` VALUES (21, 41, 54, 34, '测试合同名称', NULL, 'N123457', '2024-01-12', '2024-01-12', 53, '2024-01-12', 1111.0000, 0.0000, 11417, 'sxp', NULL, NULL, NULL, NULL, NULL, '2025-07-08 09:36:33', 0);
INSERT INTO `tb_contract` VALUES (22, 42, 54, 34, '测试合同名称', NULL, 'N123458', '2024-01-12', '2024-01-12', 53, '2024-01-12', 1111.0000, 0.0000, 11417, 'sxp', NULL, NULL, NULL, NULL, NULL, '2025-07-08 09:36:33', 0);
INSERT INTO `tb_contract` VALUES (23, 42, 54, 34, '测试合同名称', NULL, 'N123459', '2024-01-12', '2024-01-12', 53, '2024-01-12', 1111.0000, 0.0000, 11417, 'sxp', NULL, NULL, NULL, NULL, NULL, '2025-07-08 09:36:33', 0);
INSERT INTO `tb_contract` VALUES (24, 43, 54, 34, '测试合同名称', NULL, 'N123460', '2024-01-12', '2024-01-12', 53, '2024-01-12', 1111.0000, 0.0000, 11417, 'sxp', NULL, NULL, NULL, NULL, NULL, '2025-07-08 09:36:33', 0);
INSERT INTO `tb_contract` VALUES (25, 40, 54, 34, '测试合同名称', NULL, 'N1234567', '2024-05-01', '2024-01-12', 53, '2024-01-12', 1111.0000, 0.0000, 11417, 'sxp', NULL, NULL, NULL, NULL, NULL, '2025-07-08 09:36:33', 0);
INSERT INTO `tb_contract` VALUES (26, 40, 54, 34, '测试合同名称', NULL, 'N1234569', '2024-01-01', '2024-01-12', 53, '2024-01-12', 1111.0000, 0.0000, 11417, 'sxp', NULL, NULL, NULL, NULL, NULL, '2025-07-08 09:36:33', 0);
INSERT INTO `tb_contract` VALUES (27, 44, 54, 34, '测试合同名称', NULL, 'N12345893', '2024-10-12', '2024-01-12', 53, '2024-01-12', 1111.0000, 0.0000, 11417, 'sxp', NULL, NULL, NULL, NULL, NULL, '2025-07-08 09:36:33', 0);
INSERT INTO `tb_contract` VALUES (28, 44, 54, 34, '测试合同名称', NULL, 'N12345894', '2024-10-12', '2024-01-12', 53, '2024-01-12', 1111.0000, 0.0000, 11417, 'sxp', NULL, NULL, NULL, NULL, NULL, '2025-07-08 09:36:33', 0);
INSERT INTO `tb_contract` VALUES (29, 44, 54, 34, '测试合同名称', NULL, 'N12345895', '2024-10-12', '2024-01-12', 53, '2024-01-12', 1111.0000, 0.0000, 11417, 'sxp', NULL, NULL, NULL, NULL, NULL, '2025-07-08 09:36:33', 0);
INSERT INTO `tb_contract` VALUES (30, 44, 54, 34, '测试合同名称', NULL, 'N12345896', '2024-10-12', '2024-01-12', 53, '2024-01-12', 1111.0000, 0.0000, 11417, 'sxp', NULL, NULL, NULL, NULL, NULL, '2025-07-08 09:36:33', 0);
INSERT INTO `tb_contract` VALUES (31, 44, 54, 34, '测试合同名称', NULL, 'N12345897', '2024-10-12', '2024-01-12', 53, '2024-01-12', 1111.0000, 0.0000, 11417, 'sxp', NULL, NULL, NULL, NULL, NULL, '2025-07-08 09:36:33', 0);
INSERT INTO `tb_contract` VALUES (32, 49, 54, 36, '测试跟进记录', '123123123', 'N123456', '2024-10-18', '2024-10-23', 53, NULL, 11111111.0000, 0.0000, 11417, NULL, NULL, NULL, NULL, 11386, NULL, '2025-07-08 09:36:33', 0);
INSERT INTO `tb_contract` VALUES (33, 28, 54, 34, '测试', '123123123123', 'N1000000', '2024-10-15', '2024-10-22', 52, NULL, 11111.0000, 11111.0000, 11417, 'sxp', NULL, NULL, NULL, 11386, NULL, '2025-07-08 09:37:00', 0);
INSERT INTO `tb_contract` VALUES (34, 50, 55, 34, '测试', '123123123', 'N10000', '2024-10-15', '2024-10-31', 52, NULL, 11111.0000, 11111.0000, 11417, 'sxp', NULL, NULL, NULL, 11386, NULL, '2025-07-08 09:37:00', 0);
INSERT INTO `tb_contract` VALUES (35, 52, 55, 34, '测试线索ID', 'sss', '123dddd', '2024-10-22', '2024-10-23', 52, NULL, 111111.0000, 111111.0000, 11385, NULL, NULL, NULL, NULL, 11386, NULL, '2025-07-08 09:37:00', 0);
INSERT INTO `tb_contract` VALUES (36, 53, 55, 34, 'ssss', 'sssss', 'ssss', '2024-10-20', '2024-10-23', 52, NULL, 11111.0000, 11111.0000, 11385, NULL, NULL, NULL, NULL, 11386, NULL, '2025-07-08 09:37:00', 0);
INSERT INTO `tb_contract` VALUES (37, 38, 54, 36, '高性能集成电路云服务协议', NULL, 'QD022022-001', '2024-01-12', '2024-01-12', 53, '2024-01-12', 300000.0000, 0.0000, 11385, '超管', NULL, NULL, NULL, NULL, NULL, '2025-07-08 09:36:33', 0);
INSERT INTO `tb_contract` VALUES (38, 54, 55, 38, '机房托管协议', NULL, 'QD022022-003', '2024-10-12', '2025-01-12', 53, '2024-10-12', 300000.0000, 0.0000, 11385, '超管', NULL, NULL, NULL, NULL, NULL, '2025-07-08 09:36:33', 0);
INSERT INTO `tb_contract` VALUES (39, 54, 55, 38, '机房托管协议', NULL, 'QD022022-004', '2024-10-12', '2025-01-12', 53, '2024-10-12', 300000.0000, 0.0000, 11385, '超管', NULL, NULL, NULL, NULL, NULL, '2025-07-08 09:36:33', 0);
INSERT INTO `tb_contract` VALUES (40, 64, 54, 39, '高性能集成电路云服务协议', '123-4', NULL, '2024-01-12', '2024-01-12', 53, '2024-01-12', 300000.0000, 0.0000, 11386, 'fhc', NULL, NULL, NULL, NULL, NULL, '2025-07-08 09:36:33', 0);
INSERT INTO `tb_contract` VALUES (41, 31, 54, 35, 'test', '123', '1112312312', '2025-01-24', '2025-01-25', 52, NULL, 1111111.0000, 1111111.0000, 11386, 'fhc', NULL, NULL, NULL, 11386, NULL, '2025-07-08 09:37:00', 0);
INSERT INTO `tb_contract` VALUES (42, 29, 54, 34, 'tests', 'sss', 'sssdf', '2025-01-23', '2025-01-31', 52, NULL, 123333.0000, 123333.0000, 11386, 'fhc', NULL, 85, NULL, 11385, NULL, '2025-07-08 09:37:00', 0);
INSERT INTO `tb_contract` VALUES (43, 28, 54, 34, '测试', 'sdf', '123123', '2025-01-24', '2025-01-29', 52, NULL, 111111.0000, 111111.0000, 11386, 'fhc', NULL, NULL, NULL, 11386, NULL, '2025-07-08 09:37:00', 0);
INSERT INTO `tb_contract` VALUES (44, 28, 54, 34, 'ddd', 'dddddddd', 'ssssssssssd', '2025-01-23', '2025-01-23', 52, NULL, 11111111.0000, 11111111.0000, 11386, 'fhc', NULL, NULL, NULL, 11386, NULL, '2025-07-08 09:37:00', 0);
INSERT INTO `tb_contract` VALUES (45, 28, 54, 34, '123123123', '123123123', '123123123', '2025-01-22', '2025-01-29', 52, NULL, 1111111.0000, 1111111.0000, 11386, 'fhc', NULL, NULL, NULL, 11386, NULL, '2025-07-08 09:37:00', 0);
INSERT INTO `tb_contract` VALUES (46, 31, 54, 34, '123123', '123123', '123123', '2025-01-23', '2025-01-31', 52, NULL, 123123123123.0000, 123123123123.0000, 11386, 'fhc', NULL, NULL, NULL, 11386, NULL, '2025-07-08 09:37:00', 0);
INSERT INTO `tb_contract` VALUES (47, 65, 54, 34, '合同名称', '序号杀杀杀', 'D33333333', '2025-02-14', '2025-02-25', 52, NULL, 1111111.0000, 1111111.0000, 11386, 'fhc', NULL, NULL, NULL, 11386, NULL, '2025-02-14 14:21:10', 0);
INSERT INTO `tb_contract` VALUES (48, 66, 54, 35, '合同名称', '序列', 'sss', '2025-02-14', '2025-02-21', 52, NULL, 11111111.0000, 11111111.0000, 11386, 'fhc', NULL, 84, NULL, 11385, NULL, '2025-02-14 15:21:19', 0);
INSERT INTO `tb_contract` VALUES (49, 67, 54, 34, 'sdfsdf', 'assss', 'sdfsdf', '2025-02-11', '2025-02-20', 52, NULL, 2123123123.0000, 2123123123.0000, 11386, NULL, NULL, NULL, NULL, 11386, NULL, '2025-07-08 09:37:00', 0);
INSERT INTO `tb_contract` VALUES (50, 68, 55, 34, '水电费水电费', 'DDr', 'ssdfsdf', '2025-02-17', '2025-02-26', 52, NULL, 1123123123.0000, 1123123123.0000, 11386, 'fhc', NULL, NULL, NULL, 11386, NULL, '2025-07-08 09:37:00', 0);
INSERT INTO `tb_contract` VALUES (51, 69, 54, 34, 'dfsdfsdf', '123123123', 'sdfff', '2025-02-16', '2025-02-19', 52, NULL, 11111.0000, 11111.0000, 11386, NULL, NULL, NULL, NULL, 11386, NULL, '2025-07-08 09:37:00', 0);
INSERT INTO `tb_contract` VALUES (52, 39, 54, 34, 'sss', 'dfsdf', 'sssssss', '2025-02-10', '2025-02-20', 52, NULL, 11111.0000, 11111.0000, 11386, 'fhc', NULL, NULL, NULL, 11386, NULL, '2025-07-08 09:37:00', 0);
INSERT INTO `tb_contract` VALUES (53, 70, 54, 34, 'ssss', 'sdfsdfsdf', 'ssss', '2025-02-17', '2025-02-27', 52, NULL, 111111.0000, 111111.0000, 11386, NULL, NULL, 84, NULL, 11385, NULL, '2025-07-08 09:37:00', 0);
INSERT INTO `tb_contract` VALUES (54, 30, 54, 35, '测试', '123', '1123123', '2025-02-11', '2025-02-21', 53, NULL, 123123123.0000, 0.0000, 11386, 'fhc', NULL, NULL, NULL, 11386, NULL, '2025-02-27 14:33:48', 0);
INSERT INTO `tb_contract` VALUES (55, 29, 54, 38, 'ceshihahah', '123123', '123123', '2025-02-27', '2025-03-01', 52, NULL, 13123123.0000, 13123123.0000, 11386, 'fhc', NULL, NULL, NULL, NULL, NULL, '2025-07-08 09:37:00', 0);
INSERT INTO `tb_contract` VALUES (56, 29, 54, 36, 'test', 'test123456', 'NO1234567', '2025-07-03', '2025-07-05', 71, NULL, 20200000.0000, 7744334.0000, 11386, 'fhc', NULL, NULL, NULL, 11386, NULL, '2025-07-04 14:01:34', 0);
INSERT INTO `tb_contract` VALUES (57, 71, 54, 35, 'test', NULL, 'B12344444', '2025-07-04', '2025-07-09', 53, NULL, 12456.0000, 0.0000, 11386, NULL, NULL, NULL, NULL, NULL, NULL, '2025-07-08 09:36:33', 0);
INSERT INTO `tb_contract` VALUES (58, 29, 55, 35, 'test', 'dfsdfsdfsdf', 'aaaaaads', '2025-11-19', '2025-11-25', 52, NULL, 1111.0000, 1111.0000, 11385, '超管', NULL, 84, NULL, NULL, NULL, '2025-11-21 09:21:13', 0);
INSERT INTO `tb_contract` VALUES (59, 28, 55, 35, 'ceshi', '123123123', '123qweqweqwe', '2025-12-01', '2025-12-16', 52, NULL, 123333.0000, 123333.0000, 11386, 'fhc', NULL, 84, NULL, NULL, NULL, '2025-12-01 14:10:19', 0);
INSERT INTO `tb_contract` VALUES (60, 72, 54, 37, 'test', 'sdfasdfasdf', 'dsfasdf', '2025-12-16', '2025-12-25', 53, NULL, 1233333.0000, 0.0000, 11386, 'fhc', NULL, 84, NULL, NULL, NULL, '2025-12-02 14:57:12', 0);
INSERT INTO `tb_contract` VALUES (61, 74, 55, 37, 'testdsfdcvxdfdfdfs', NULL, 'ggggggfd', '2026-01-03', '2025-12-24', 53, NULL, 1231231.0000, 0.0000, 11386, NULL, NULL, 85, NULL, NULL, NULL, '2025-12-02 15:19:45', 0);
INSERT INTO `tb_contract` VALUES (62, 75, 54, 36, 'atesdfadfsdfsdf', NULL, 'sdfsdfsdfsd', '2025-12-10', '2025-12-19', 52, NULL, 12312312.0000, 12312312.0000, 11386, NULL, NULL, 85, NULL, NULL, NULL, '2025-12-02 15:24:00', 0);
INSERT INTO `tb_contract` VALUES (63, 28, 55, 39, 'testdfsd', 'dddfsdfsdf', 'sdf2sdfsdfd', '2025-12-03', '2025-12-15', 52, NULL, 12312312321.0000, 12312312321.0000, 11386, 'fhc', NULL, 85, NULL, NULL, NULL, '2025-12-05 10:35:56', 0);

-- ----------------------------
-- Table structure for tb_contract_attachment
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
) ENGINE = InnoDB AUTO_INCREMENT = 68 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '合同附件表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of tb_contract_attachment
-- ----------------------------
INSERT INTO `tb_contract_attachment` VALUES (41, 41, 'xalg.636f15b8.png', 'contract/100eb963-d89d-443a-802e-3de378d693d4.636f15b8.png', 'http://172.18.7.21:19001/zkxy-crm-contract-dev/contract/100eb963-d89d-443a-802e-3de378d693d4.636f15b8.png', 11386, 'fhc', 0, '2025-01-24 09:09:36');
INSERT INTO `tb_contract_attachment` VALUES (42, 42, 'zkxy.db388396.png', 'contract/51105831-12c2-4fdc-bac9-34ace727f392.db388396.png', 'http://172.18.7.21:19001/zkxy-crm-contract-dev/contract/51105831-12c2-4fdc-bac9-34ace727f392.db388396.png', 11386, 'fhc', 0, '2025-01-24 09:53:51');
INSERT INTO `tb_contract_attachment` VALUES (43, 43, 'zkxy.db388396.png', 'contract/091f9e4e-808d-486e-8a76-a83fe019e608.db388396.png', 'http://172.18.7.21:19001/zkxy-crm-contract-dev/contract/091f9e4e-808d-486e-8a76-a83fe019e608.db388396.png', 11386, 'fhc', 0, '2025-01-24 10:29:53');
INSERT INTO `tb_contract_attachment` VALUES (44, 44, 'logo1.db388396.png', 'contract/49e1032e-4595-4a5e-808c-fdae52c07637.db388396.png', 'http://172.18.7.21:19001/zkxy-crm-contract-dev/contract/49e1032e-4595-4a5e-808c-fdae52c07637.db388396.png', 11386, 'fhc', 0, '2025-01-24 10:38:57');
INSERT INTO `tb_contract_attachment` VALUES (45, 45, 'zkxy.db388396.png', 'contract/eea245c9-1e33-4568-851f-d43e1e997bc2.db388396.png', 'http://172.18.7.21:19001/zkxy-crm-contract-dev/contract/eea245c9-1e33-4568-851f-d43e1e997bc2.db388396.png', 11386, 'fhc', 0, '2025-01-24 10:59:06');
INSERT INTO `tb_contract_attachment` VALUES (46, 46, 'zkxy.db388396.png', 'contract/125fa410-4dfc-49a2-9195-7399c486f8b5.db388396.png', 'http://172.18.7.21:19001/zkxy-crm-contract-dev/contract/125fa410-4dfc-49a2-9195-7399c486f8b5.db388396.png', 11386, 'fhc', 0, '2025-01-24 10:59:47');
INSERT INTO `tb_contract_attachment` VALUES (47, 47, '前段项目模块设计文档.docx', 'contract/c245c096-0adb-4519-9592-32fd246d4faf.docx', 'http://172.18.7.21:19001/zkxy-crm-contract-dev/contract/c245c096-0adb-4519-9592-32fd246d4faf.docx', 11386, 'fhc', 0, '2025-02-14 14:21:10');
INSERT INTO `tb_contract_attachment` VALUES (48, 48, '前端项目模块设计文档.docx', 'contract/38e8358a-1f57-449a-a7f1-51feeab7286d.docx', 'http://172.18.7.21:19001/zkxy-crm-contract-dev/contract/38e8358a-1f57-449a-a7f1-51feeab7286d.docx', 11386, 'fhc', 0, '2025-02-14 15:21:19');
INSERT INTO `tb_contract_attachment` VALUES (49, 49, '沈相樸固定资产盘点表.xlsx', 'clueTocontract/8c2f4f23-6085-4bcd-aff8-9ce56216087e.xlsx', 'http://172.18.7.21:19001/zkxy-crm-contract-dev/clueTocontract/8c2f4f23-6085-4bcd-aff8-9ce56216087e.xlsx', 11386, NULL, 0, '2025-02-14 16:50:34');
INSERT INTO `tb_contract_attachment` VALUES (50, 50, '沈相樸固定资产盘点表.xlsx', 'contract/a6932d6e-37e8-4f77-8e86-d551957149be.xlsx', 'http://172.18.7.21:19001/zkxy-crm-contract-dev/contract/a6932d6e-37e8-4f77-8e86-d551957149be.xlsx', 11386, 'fhc', 0, '2025-02-17 10:50:58');
INSERT INTO `tb_contract_attachment` VALUES (51, 51, '沈相樸入职登记表.xlsx', 'clueTocontract/950af8fd-695e-42fd-aac5-ea949422712d.xlsx', 'http://172.18.7.21:19001/zkxy-crm-contract-dev/clueTocontract/950af8fd-695e-42fd-aac5-ea949422712d.xlsx', 11386, NULL, 0, '2025-02-17 11:04:24');
INSERT INTO `tb_contract_attachment` VALUES (52, 52, '入职花名册.xlsx', 'contract/6ec39f3c-1aa6-4eb9-88be-c11529a5e7b1.xlsx', 'http://172.18.7.21:19001/zkxy-crm-contract-dev/contract/6ec39f3c-1aa6-4eb9-88be-c11529a5e7b1.xlsx', 11386, 'fhc', 0, '2025-02-17 13:44:37');
INSERT INTO `tb_contract_attachment` VALUES (53, 53, 'log2.png', 'clueTocontract/260f7005-b415-4671-809c-e379477f2f38.png', 'http://172.18.7.21:19001/zkxy-crm-contract-dev/clueTocontract/260f7005-b415-4671-809c-e379477f2f38.png', 11386, NULL, 0, '2025-02-18 14:47:13');
INSERT INTO `tb_contract_attachment` VALUES (54, 16, '滴滴出行行程报销单.pdf', 'contract/065fba70-fca0-4bed-a847-b36827e11f16.pdf', 'http://172.18.7.21:19001/zkxy-crm-contract-dev/contract/065fba70-fca0-4bed-a847-b36827e11f16.pdf', 11386, 'fhc', 1, '2025-02-19 14:51:57');
INSERT INTO `tb_contract_attachment` VALUES (55, 16, '7162f61a41d584d6a14c3ffc1ac462eb.jpg', 'contract/1c10a478-23e8-4e2d-886b-14dff2c53b37.jpg', 'http://172.18.7.21:19001/zkxy-crm-contract-dev/contract/1c10a478-23e8-4e2d-886b-14dff2c53b37.jpg', 11386, 'fhc', 0, '2025-02-19 14:56:32');
INSERT INTO `tb_contract_attachment` VALUES (56, 54, '新建 DOC 文档.doc', 'contract/45a5c541-82a6-47c4-8fd8-ce739d034711.doc', 'http://172.18.7.21:19001/zkxy-crm-contract-dev/contract/45a5c541-82a6-47c4-8fd8-ce739d034711.doc', 11386, 'fhc', 0, '2025-02-27 14:33:48');
INSERT INTO `tb_contract_attachment` VALUES (57, 55, '新建 DOC 文档.doc', 'contract/221fb735-16ec-4057-acb6-296ccb9f638c.doc', 'http://172.18.7.21:19001/zkxy-crm-contract-dev/contract/221fb735-16ec-4057-acb6-296ccb9f638c.doc', 11386, 'fhc', 0, '2025-02-27 15:02:52');
INSERT INTO `tb_contract_attachment` VALUES (58, 32, 'zkxy.png', 'contract/561a1285-6b25-4698-b654-cb38404e84ea.png', 'http://172.18.7.21:19001/zkxy-crm-contract-dev/contract/561a1285-6b25-4698-b654-cb38404e84ea.png', 11386, 'fhc', 1, '2025-07-04 10:58:11');
INSERT INTO `tb_contract_attachment` VALUES (59, 32, 'zkxy.png', 'contract/561a1285-6b25-4698-b654-cb38404e84ea.png', 'http://172.18.7.21:19001/zkxy-crm-contract-dev/contract/561a1285-6b25-4698-b654-cb38404e84ea.png', 11386, 'fhc', 0, '2025-07-04 10:58:24');
INSERT INTO `tb_contract_attachment` VALUES (60, 56, 'zkxy.png', 'contract/8a47a42f-fb9e-4b10-99f5-8acf0cbbde7f.png', 'http://172.18.7.21:19001/zkxy-crm-contract-dev/contract/8a47a42f-fb9e-4b10-99f5-8acf0cbbde7f.png', 11386, 'fhc', 0, '2025-07-04 14:01:34');
INSERT INTO `tb_contract_attachment` VALUES (61, 57, 'zkxy1.png', 'clueTocontract/55586a60-3158-451d-90a1-de19aecbfe86.png', 'http://172.18.7.21:19001/zkxy-crm-contract-dev/clueTocontract/55586a60-3158-451d-90a1-de19aecbfe86.png', 11386, NULL, 0, '2025-07-04 14:27:26');
INSERT INTO `tb_contract_attachment` VALUES (62, 58, '11111.png', 'contract/8f2e89ca-ca0f-460c-8825-8db336869f9f.png', 'http://172.18.7.21:19001/zkxy-crm-contract-dev/contract/8f2e89ca-ca0f-460c-8825-8db336869f9f.png', 11385, '超管', 0, '2025-11-21 09:21:13');
INSERT INTO `tb_contract_attachment` VALUES (63, 59, '11111.png', 'contract/a733c61d-7b43-4450-928d-4cfa85dedce2.png', 'http://172.18.7.21:19001/zkxy-crm-contract-dev/contract/a733c61d-7b43-4450-928d-4cfa85dedce2.png', 11386, 'fhc', 0, '2025-12-01 14:10:19');
INSERT INTO `tb_contract_attachment` VALUES (64, 60, '11111.png', 'contract/98029cfb-90fd-4c5e-afc6-b5b7e7414878.png', 'http://172.18.7.21:19001/zkxy-crm-contract-dev/contract/98029cfb-90fd-4c5e-afc6-b5b7e7414878.png', 11386, 'fhc', 0, '2025-12-02 14:57:12');
INSERT INTO `tb_contract_attachment` VALUES (65, 61, '11111.png', 'clueTocontract/2faacabd-2be4-4a09-b67a-68ed7d575557.png', 'http://172.18.7.21:19001/zkxy-crm-contract-dev/clueTocontract/2faacabd-2be4-4a09-b67a-68ed7d575557.png', 11386, NULL, 0, '2025-12-02 15:19:45');
INSERT INTO `tb_contract_attachment` VALUES (66, 62, '11111.png', 'clueTocontract/1698a45a-7640-4f18-9cfa-cad6b4b20194.png', 'http://172.18.7.21:19001/zkxy-crm-contract-dev/clueTocontract/1698a45a-7640-4f18-9cfa-cad6b4b20194.png', 11386, NULL, 0, '2025-12-02 15:24:00');
INSERT INTO `tb_contract_attachment` VALUES (67, 63, '11111.png', 'contract/1987d588-2078-44ad-ab5f-b7da751d6d7b.png', 'http://172.18.7.21:19001/zkxy-crm-contract-dev/contract/1987d588-2078-44ad-ab5f-b7da751d6d7b.png', 11386, 'fhc', 0, '2025-12-05 10:35:56');

-- ----------------------------
-- Table structure for tb_contract_bak
-- ----------------------------
DROP TABLE IF EXISTS `tb_contract_bak`;
CREATE TABLE `tb_contract_bak`  (
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
  `user_id` int NULL DEFAULT NULL COMMENT '添加合同的用户ID',
  `user_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '添加合同的用户姓名',
  `del_flag` tinyint NULL DEFAULT NULL COMMENT '是否删除(0:未删除;1:已删除)',
  `update_by` int NULL DEFAULT NULL COMMENT '更新人的ID',
  `update_at` timestamp NULL DEFAULT NULL COMMENT '更新时间',
  `create_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '创建时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 470 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '合同管理表' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of tb_contract_bak
-- ----------------------------
INSERT INTO `tb_contract_bak` VALUES (61, 125, 55, 34, '加工技术服务合同', '140', '20220620', '2022-06-20', '2022-07-15', 52, NULL, 722600.0000, 11441, '刘晨光', 0, 11431, NULL, '2024-11-01 14:25:54');
INSERT INTO `tb_contract_bak` VALUES (62, 126, 55, 64, '研电赛', '151', 'QD042022-015', '2022-07-01', '2023-02-20', 52, NULL, 216509.4300, 11453, '臧旭平', 0, 11431, NULL, '2024-11-01 14:25:54');
INSERT INTO `tb_contract_bak` VALUES (63, 127, 55, 38, '封装技术服务合同', '121', 'QD052022-005', '2022-03-14', '2023-03-14', 52, NULL, 49000.0000, 11441, '刘晨光', 0, 11431, NULL, '2024-11-01 14:25:54');
INSERT INTO `tb_contract_bak` VALUES (64, 128, 55, 34, '芯片开发', '234', 'QD022023-048', '2023-01-01', '2023-12-31', 52, NULL, 82500.0000, 11441, '刘晨光', 0, 11431, NULL, '2024-11-01 14:25:54');
INSERT INTO `tb_contract_bak` VALUES (65, 129, 55, 39, 'Synopsys', '161', 'QD022022-010', '2022-07-01', '2023-02-28', 52, NULL, 26000.0000, 11441, '刘晨光', 0, 11431, NULL, '2024-11-01 14:25:54');
INSERT INTO `tb_contract_bak` VALUES (66, 129, 55, 34, '委托加工合同', '251', 'QD082024003', '2024-02-02', '2024-08-01', 52, NULL, 70000.0000, 11460, '刘朋辉', 0, 11431, NULL, '2024-11-01 14:25:54');
INSERT INTO `tb_contract_bak` VALUES (67, 103, 55, 34, '高性能EDA云服务工程批流片合同', '175', 'QD022022-069', '2022-10-10', '2023-10-10', 52, NULL, 2400000.0000, 11459, '陈延辉', 0, 11431, NULL, '2024-11-01 14:25:54');
INSERT INTO `tb_contract_bak` VALUES (68, 130, 55, 65, '高端智能家电数字基础设施关键技术研究及应用', '182', 'TL2022100500002', '2022-10-06', '2025-10-06', 71, '2023-04-14', 1000000.0000, 11459, '陈延辉', 0, 11464, NULL, '2024-11-01 14:25:54');
INSERT INTO `tb_contract_bak` VALUES (69, 125, 55, 34, 'MPW流片技术服务合同', '154', 'QD022022-023', '2022-09-08', '2023-04-20', 52, NULL, 965600.0000, 11441, '刘晨光', 0, 11431, NULL, '2024-11-01 14:25:54');
INSERT INTO `tb_contract_bak` VALUES (70, 131, 55, 39, '集成电路公共平台资源', '193', 'QD022023-028', '2022-12-01', '2023-12-31', 52, NULL, 70000.0000, 11441, '刘晨光', 0, 11431, NULL, '2024-11-01 14:25:54');
INSERT INTO `tb_contract_bak` VALUES (71, 132, 55, 34, '高性能EDA云服务多目标芯片（MPW)流片合同', '190', 'QD022023-025', '2023-01-07', '2024-01-07', 52, NULL, 450000.0000, 11441, '刘晨光', 0, 11431, NULL, '2024-11-01 14:25:54');
INSERT INTO `tb_contract_bak` VALUES (72, 133, 55, 39, '芯片开发', '211', 'QD022023-039', '2023-01-01', '2023-12-31', 52, NULL, 290000.0000, 11441, '刘晨光', 0, 11431, NULL, '2024-11-01 14:25:54');
INSERT INTO `tb_contract_bak` VALUES (73, 134, 55, 34, '产品加工合同', '258', 'QD072024-001', '2024-04-01', '2027-04-01', 53, '2025-03-12', 1580000.0000, 11461, '韩珊珊', 0, 11464, NULL, '2024-11-01 14:25:54');
INSERT INTO `tb_contract_bak` VALUES (74, 134, 55, 34, '产品加工合同', '259', 'QD072024-002', '2024-04-01', '2027-04-01', 53, '2025-03-12', 410000.0000, 11461, '韩珊珊', 0, 11464, NULL, '2024-11-01 14:25:54');
INSERT INTO `tb_contract_bak` VALUES (75, 135, 55, 39, 'Siemens/Synopsys/华大九天', '145', 'QD022022-008', '2022-07-01', '2022-12-31', 52, NULL, 0.0000, 11441, '刘晨光', 0, 11431, NULL, '2024-11-01 14:25:54');
INSERT INTO `tb_contract_bak` VALUES (76, 136, 55, 39, 'Siemens', '144', 'QD022022-014', '2022-07-12', '2022-12-31', 52, NULL, 0.0000, 11441, '刘晨光', 0, 11431, NULL, '2024-11-01 14:25:54');
INSERT INTO `tb_contract_bak` VALUES (77, 136, 55, 39, '缴纳13楼物业费', '210', 'QD022023-042', '2023-02-15', '2023-08-14', 52, NULL, 23247.0000, 11430, '陈柳', 0, 11431, NULL, '2024-11-01 14:25:54');
INSERT INTO `tb_contract_bak` VALUES (78, 136, 55, 39, '13楼空调费用', '225', 'QD062023-006', '2023-02-15', '2023-08-24', 52, NULL, 17972.0000, 11430, '陈柳', 0, 11431, NULL, '2024-11-01 14:25:54');
INSERT INTO `tb_contract_bak` VALUES (79, 137, 55, 34, 'MPW流片技术服务合同', '127', 'QD052022-002', '2022-01-04', '2023-01-03', 52, NULL, 218000.0000, 11441, '刘晨光', 0, 11431, NULL, '2024-11-01 14:25:54');
INSERT INTO `tb_contract_bak` VALUES (80, 137, 55, 34, '关于《多目标芯片mpw流片技术服务额合同》之补充协议', '153', 'QD022022-021', '2022-08-04', '2023-08-19', 52, NULL, 0.0000, 11441, '刘晨光', 0, 11431, NULL, '2024-11-01 14:25:54');
INSERT INTO `tb_contract_bak` VALUES (81, 138, 55, 68, 'T.18GenII EPDK二期开发', '224', 'QD022023-049', '2023-10-07', '2023-10-31', 52, NULL, 150000.0000, 11441, '刘晨光', 0, 11431, NULL, '2024-11-01 14:25:54');
INSERT INTO `tb_contract_bak` VALUES (82, 138, 55, 34, '40EFA EPDK开发项目', '240', 'QD052020-059', '2023-12-15', '2023-12-31', 52, NULL, 105000.0000, 11441, '刘晨光', 0, 11431, NULL, '2024-11-01 14:25:54');
INSERT INTO `tb_contract_bak` VALUES (83, 139, 55, 34, '技术服务合同', '219', 'QD032023-007', '2023-08-16', '2024-06-30', 52, NULL, 400000.0000, 11459, '陈延辉', 0, 11431, NULL, '2024-11-01 14:25:54');
INSERT INTO `tb_contract_bak` VALUES (84, 140, 55, 34, '多目标芯片（MPW）流片合同', '172', 'QD022022-060', '2022-11-25', '2023-11-25', 52, NULL, 2590000.0000, 11441, '刘晨光', 0, 11431, NULL, '2024-11-01 14:25:54');
INSERT INTO `tb_contract_bak` VALUES (85, 140, 55, 34, '多目标芯片（MPW）流片合同-补充协议', '178', 'QD022022-060', '2022-11-25', '2023-11-25', 52, NULL, 2512000.0000, 11441, '刘晨光', 0, 11431, NULL, '2024-11-01 14:25:54');
INSERT INTO `tb_contract_bak` VALUES (86, 141, 55, 68, '海尔制冷控制芯片柔性测试平台项目', '222', 'TL2023091400014', '2023-09-01', '2025-12-30', 71, '2023-11-22', 4664000.0000, 11455, '刘晓璐', 0, 11464, NULL, '2024-11-01 14:25:54');
INSERT INTO `tb_contract_bak` VALUES (87, 142, 55, 34, '技术服务合同', '141', 'QD022022011', '2022-03-30', '2022-06-30', 52, NULL, 405000.0000, 11441, '刘晨光', 0, 11431, NULL, '2024-11-01 14:25:54');
INSERT INTO `tb_contract_bak` VALUES (88, 143, 55, 38, 'VCS/verdi/spyglass', '191', 'QD012023-001', '2023-03-01', '2023-12-31', 53, NULL, 340000.0000, 11439, '于江敏', 0, 11434, NULL, '2024-11-01 14:25:54');
INSERT INTO `tb_contract_bak` VALUES (89, 135, 55, 36, 'DFT系列培训', '214', 'QD052023-007', '2023-07-24', '2023-08-23', 52, NULL, 2000.0000, 11456, '李欢欢', 0, 11431, NULL, '2024-11-01 14:25:54');
INSERT INTO `tb_contract_bak` VALUES (90, 144, 55, 36, '功耗分析与低功耗课程企业专班培训项目', '162', 'QD042022-017', '2022-09-28', '2022-12-28', 52, NULL, 30000.0000, 11456, '李欢欢', 0, 11431, NULL, '2024-11-01 14:25:54');
INSERT INTO `tb_contract_bak` VALUES (91, 145, 55, 36, '数字后端人才培养', '131', 'QD042022-007', '2022-03-18', '2022-08-01', 52, NULL, 350000.0000, 11456, '李欢欢', 0, 11431, NULL, '2024-11-01 14:25:54');
INSERT INTO `tb_contract_bak` VALUES (92, 145, 55, 34, '高性能EDA云服务多目标芯片（MPW)流片合同', '177', 'QD022022-072', '2022-11-07', '2023-11-07', 52, NULL, 271584.0000, 11441, '刘晨光', 0, 11431, NULL, '2024-11-01 14:25:54');
INSERT INTO `tb_contract_bak` VALUES (93, 145, 55, 36, '数字后端人才培养', '181', 'QD042023-002', '2023-01-11', '2023-07-01', 52, NULL, 450000.0000, 11454, '徐晓烨', 0, 11431, NULL, '2024-11-01 14:47:28');
INSERT INTO `tb_contract_bak` VALUES (94, 146, 55, 34, '工程流流片服务协议', '135', 'QD052022-013', '2022-05-08', '2023-01-08', 52, NULL, 990000.0000, 11441, '刘晨光', 0, 11431, NULL, '2024-11-01 14:25:54');
INSERT INTO `tb_contract_bak` VALUES (95, 147, 55, 34, '流片服务', '244', 'QD022024-001', '2024-01-25', '2025-01-24', 52, NULL, 280000.0000, 11441, '刘晨光', 0, 11431, NULL, '2024-11-01 14:25:54');
INSERT INTO `tb_contract_bak` VALUES (96, 148, 55, 34, '高性能EDAF云服务MPW流片', '242', 'ZKXY20231225', '2023-11-02', '2024-11-02', 52, NULL, 216000.0000, 11460, '刘朋辉', 0, 11431, NULL, '2024-11-01 14:25:54');
INSERT INTO `tb_contract_bak` VALUES (97, 149, 55, 34, '高性能EDA云服务多目标芯片（MPW)流片合同', '170', 'QD022022-055', '2022-01-18', '2024-01-18', 52, NULL, 380000.0000, 11441, '刘晨光', 0, 11431, NULL, '2024-11-01 14:25:54');
INSERT INTO `tb_contract_bak` VALUES (98, 149, 55, 34, '高性能EDA云服务多目标芯片（MPW)流片合同', '216', 'QD032023-012', '2023-04-01', '2024-08-01', 52, NULL, 500000.0000, 11459, '陈延辉', 0, 11431, NULL, '2024-11-01 14:25:54');
INSERT INTO `tb_contract_bak` VALUES (99, 149, 55, 34, '高性能EDA云服务多目标芯片（MPW)流片合同', '216-1', 'QD032023-012', '2023-04-01', '2024-08-01', 52, NULL, 970000.0000, 11459, '陈延辉', 0, 11431, NULL, '2024-11-01 14:25:54');
INSERT INTO `tb_contract_bak` VALUES (100, 149, 55, 34, '高性能EDA云服务多目标芯片（MPW)服务合同', '229', 'QD032023-015', '2023-04-01', '2023-12-31', 52, NULL, 380000.0000, 11460, '刘朋辉', 0, 11431, NULL, '2024-11-01 14:25:54');
INSERT INTO `tb_contract_bak` VALUES (101, 150, 55, 34, '高性能EDA云服务多目标芯片（MPW)流片合同', '223', 'QD022023-023', '2023-03-24', '2023-12-31', 52, NULL, 400000.0000, 11441, '刘晨光', 0, 11431, NULL, '2024-11-01 14:25:54');
INSERT INTO `tb_contract_bak` VALUES (102, 150, 55, 68, 'SIP 数字接口 IP S702', '257', 'QD022024-025', '2024-05-09', '2026-05-08', 53, '2024-09-25', 165000.0000, 11447, '王雨欣', 0, 11464, NULL, '2024-11-01 14:25:54');
INSERT INTO `tb_contract_bak` VALUES (103, 151, 55, 34, '高性能EDA云服务 FULL MASK 工程流片合同', '228', 'QD032023-014', '2023-09-20', '2024-09-20', 52, NULL, 2196540.0000, 11460, '刘朋辉', 0, 11431, NULL, '2024-11-01 14:25:54');
INSERT INTO `tb_contract_bak` VALUES (104, 152, 55, 39, 'Mentor工具', '119', 'QD022022-001', '2022-01-26', '2022-01-25', 52, NULL, 24357.0000, 11441, '刘晨光', 0, 11431, NULL, '2024-11-01 14:25:54');
INSERT INTO `tb_contract_bak` VALUES (105, 152, 55, 39, '数字集成电路设计套件及配套资源\nMEMS版图工具套件及配套资源', '220', 'QD022023-031', '2023-01-01', '2023-12-31', 52, NULL, 36625.0000, 11441, '刘晨光', 0, 11431, NULL, '2024-11-01 14:25:54');
INSERT INTO `tb_contract_bak` VALUES (106, 153, 55, 34, '高性能EDA云服务工程批流片', '232', 'QD052023-055', '2023-11-14', '2024-11-13', 52, NULL, 80000.0000, 11441, '刘晨光', 0, 11431, NULL, '2024-11-01 14:25:54');
INSERT INTO `tb_contract_bak` VALUES (107, 154, 55, 63, '第十七届研电赛赞助协议', '147', 'QD042022-014', '2022-07-28', '2022-08-10', 52, NULL, 60000.0000, 11456, '李欢欢', 0, 11431, NULL, '2024-11-01 14:25:54');
INSERT INTO `tb_contract_bak` VALUES (108, 155, 55, 63, '第十七届研电赛赞助协议', '149', 'QD042022-013', '2022-07-28', '2022-08-10', 52, NULL, 80000.0000, 11456, '李欢欢', 0, 11431, NULL, '2024-11-01 14:25:54');
INSERT INTO `tb_contract_bak` VALUES (109, 156, 55, 39, '技术服务协议', '139', 'QD022022-006', '2022-06-01', '2023-02-28', 52, NULL, 0.0000, 11441, '刘晨光', 0, 11431, NULL, '2024-11-01 14:25:54');
INSERT INTO `tb_contract_bak` VALUES (110, 132, 55, 34, '高性能EDA云服务多目标芯片（MPW)服务合同', '230', 'QD032023-016', '2023-10-12', '2024-10-11', 52, NULL, 195000.0000, 11460, '刘朋辉', 0, 11431, NULL, '2024-11-01 14:25:54');
INSERT INTO `tb_contract_bak` VALUES (111, 132, 55, 34, '高性能EDA云服务多目标芯片（MPW)服务合同', '231', 'QD032023-017', '2023-10-22', '2024-10-21', 52, NULL, 194000.0000, 11460, '刘朋辉', 0, 11431, NULL, '2024-11-01 14:25:54');
INSERT INTO `tb_contract_bak` VALUES (112, 157, 55, 39, '电子设计自动化软件服务', '208', 'QD012023-007', '2023-06-09', '2024-06-08', 53, NULL, 80000.0000, 11439, '于江敏', 0, 11434, NULL, '2024-11-01 14:25:54');
INSERT INTO `tb_contract_bak` VALUES (113, 158, 55, 39, 'EDA云平台计算资源的服务合同', '278', 'QD01-2024006', '2024-07-01', '2024-12-31', 71, '2024-11-21', 329300.0000, 11439, '于江敏', 0, 11434, NULL, '2024-11-01 16:33:22');
INSERT INTO `tb_contract_bak` VALUES (114, 147, 55, 34, '高性能EDAF云服务MPW流片合同', '253', 'QD052024-004', '2024-03-05', '2026-03-04', 53, '2024-04-26', 160000.0000, 11456, '李欢欢', 0, 11464, NULL, '2024-11-01 14:25:54');
INSERT INTO `tb_contract_bak` VALUES (115, 147, 55, 40, 'RISCV处理器IP使用许可', '254', 'QD052024-004', '2024-03-05', '2056-03-04', 53, '2024-03-19', 250000.0000, 11456, '李欢欢', 0, 11464, NULL, '2024-11-01 14:25:54');
INSERT INTO `tb_contract_bak` VALUES (116, 159, 55, 39, '高性能集成电路云服务协议', '188', 'QD022023-019', '2021-08-01', '2023-07-31', 52, NULL, 20000.0000, 11441, '刘晨光', 0, 11431, NULL, '2024-11-01 14:25:54');
INSERT INTO `tb_contract_bak` VALUES (117, 159, 55, 39, '高性能集成电路云服务平台使用协议', '226', 'QD022023-050', '2023-08-01', '2024-07-31', 52, NULL, 10000.0000, 11441, '刘晨光', 0, 11431, NULL, '2024-11-01 14:25:54');
INSERT INTO `tb_contract_bak` VALUES (118, 150, 55, 42, '存算一体芯片版图开发', '261', 'QD022024-017', '2024-04-07', '2025-04-07', 52, NULL, 182300.0000, 11441, '刘晨光', 0, 11431, NULL, '2024-11-01 14:25:54');
INSERT INTO `tb_contract_bak` VALUES (119, 125, 55, 34, '加工技术服务合同', '123', 'QD052022-004', '2022-03-01', '2023-03-01', 52, NULL, 850000.0000, 11441, '刘晨光', 0, 11431, NULL, '2024-11-01 14:25:54');
INSERT INTO `tb_contract_bak` VALUES (120, 160, 55, 37, '服务器租赁', '132', 'QDJHW-2022010ZKXY', '2022-03-08', '2023-03-08', 53, NULL, 10000.0000, 11436, '王海庆', 0, 11434, NULL, '2024-11-01 14:25:54');
INSERT INTO `tb_contract_bak` VALUES (121, 161, 55, 34, '高性能EDA云服务MPW流片合同', '264', 'QD022024-022', '2024-04-30', '2025-04-29', 52, NULL, 116508.0000, 11447, '王雨欣', 0, 11431, NULL, '2024-11-01 14:25:54');
INSERT INTO `tb_contract_bak` VALUES (122, 162, 55, 34, '读出电路加工合同', '237', 'QD032023-020', '2023-12-04', '2024-12-03', 52, NULL, 930741.7100, 11460, '刘朋辉', 0, 11431, NULL, '2024-11-01 14:25:54');
INSERT INTO `tb_contract_bak` VALUES (123, 162, 55, 34, '读出电路加工合同', '238', 'QD032023-021', '2023-12-04', '2024-12-03', 52, NULL, 1117536.3000, 11460, '刘朋辉', 0, 11431, NULL, '2024-11-01 14:25:54');
INSERT INTO `tb_contract_bak` VALUES (124, 162, 55, 34, '读出电路加工合同', '239', 'QD032023-022', '2023-12-04', '2024-12-03', 52, NULL, 804464.6700, 11460, '刘朋辉', 0, 11431, NULL, '2024-11-01 14:25:54');
INSERT INTO `tb_contract_bak` VALUES (125, 125, 55, 34, '加工技术服务合同', '124', 'QD052022-005', '2022-01-30', '2022-12-30', 52, NULL, 201000.0000, 11441, '刘晨光', 0, 11431, NULL, '2024-11-01 14:25:54');
INSERT INTO `tb_contract_bak` VALUES (126, 163, 55, 65, '联合共建“青岛市仪器仪表用集成电路分析与评\n测场景应用实验室”合作协议书', '221', 'QD032023-013', '2023-07-19', '2023-07-19', 52, NULL, 0.0000, 11459, '陈延辉', 0, 11431, NULL, '2024-11-01 14:25:54');
INSERT INTO `tb_contract_bak` VALUES (127, 164, 55, 39, 'Siemens/Synopsys/华大九天', '150', 'QD022022-013', '2022-07-18', '2022-12-31', 52, NULL, 0.0000, 11441, '刘晨光', 0, 11431, NULL, '2024-11-01 14:25:54');
INSERT INTO `tb_contract_bak` VALUES (128, 165, 55, 34, '高性能EDA云服务多目标芯片（MPW)流片合同', '157', 'QD022022-028', '2022-08-26', '2023-08-25', 52, NULL, 990000.0000, 11441, '刘晨光', 0, 11431, NULL, '2024-11-01 14:25:54');
INSERT INTO `tb_contract_bak` VALUES (129, 165, 55, 34, '高性能EDA云服务工程批流片合同', '158', 'QD022022-029', '2022-09-12', '2023-09-11', 52, NULL, 470000.0000, 11441, '刘晨光', 0, 11431, NULL, '2024-11-01 14:25:54');
INSERT INTO `tb_contract_bak` VALUES (130, 166, 55, 68, '封装技术服务', '272', 'QD022024-020', '2024-09-09', '2025-09-08', 53, '2024-11-13', 10880.0000, 11447, '王雨欣', 0, 11464, NULL, '2024-11-01 14:25:54');
INSERT INTO `tb_contract_bak` VALUES (131, 167, 55, 39, '芯片设计平台部署', '248', 'QD022024-031', '2024-06-03', '2024-12-31', 52, NULL, 80000.0000, 11447, '王雨欣', 0, 11431, NULL, '2024-11-01 14:25:54');
INSERT INTO `tb_contract_bak` VALUES (132, 125, 55, 34, 'MPW流片技术服务合同', '128', 'QD052022-001', '2022-01-04', '2022-12-10', 52, NULL, 843000.0000, 11441, '刘晨光', 0, 11431, NULL, '2024-11-01 14:25:54');
INSERT INTO `tb_contract_bak` VALUES (133, 168, 55, 34, 'MPW流片技术服务合同', '180', 'QD022022-058', '2022-12-15', '2023-09-30', 52, NULL, 1931400.0000, 11441, '刘晨光', 0, 11431, NULL, '2024-11-01 14:25:54');
INSERT INTO `tb_contract_bak` VALUES (134, 169, 55, 34, 'Wafer测试（委托）合同', '218', 'QD032023-009', '2023-08-28', '2024-08-23', 52, NULL, 62500.0000, 11459, '陈延辉', 0, 11431, NULL, '2024-11-01 14:25:54');
INSERT INTO `tb_contract_bak` VALUES (135, 170, 55, 34, '高性能EDA云服务工程批流片合同', '185', 'QD022023-008', '2023-01-12', '2024-02-10', 52, NULL, 550000.0000, 11441, '刘晨光', 0, 11431, NULL, '2024-11-01 14:25:54');
INSERT INTO `tb_contract_bak` VALUES (136, 171, 55, 68, '无线报警器', '142', 'QD052022-017', '2022-03-30', '2022-09-30', 52, NULL, 379000.0000, 11441, '刘晨光', 0, 11431, NULL, '2024-11-01 14:25:54');
INSERT INTO `tb_contract_bak` VALUES (137, 172, 55, 34, '高性能EDA云服务工程批流片合同', '156', 'QD022022-026', '2022-09-25', '2023-06-25', 52, NULL, 990000.0000, 11441, '刘晨光', 0, 11431, NULL, '2024-11-01 14:25:54');
INSERT INTO `tb_contract_bak` VALUES (138, 172, 55, 34, '高性能EDA云服务多目标芯片（MPW)流片合同', '159', 'QD022022-031', '2022-04-20', '2023-04-20', 52, NULL, 177000.0000, 11441, '刘晨光', 0, 11431, NULL, '2024-11-01 14:25:54');
INSERT INTO `tb_contract_bak` VALUES (139, 172, 55, 34, '高性能EDA云服务多目标芯片（MPW)流片合同', '201', 'QD022022-031', '2022-04-20', '2023-04-20', 52, NULL, 177000.0000, 11459, '陈延辉', 0, 11431, NULL, '2024-11-01 14:25:54');
INSERT INTO `tb_contract_bak` VALUES (140, 172, 55, 34, '高性能EDA云服务多目标芯片（MPW)流片合同', '202', 'QD022022-065', '2022-05-20', '2023-08-20', 52, NULL, 259200.0000, 11459, '陈延辉', 0, 11431, NULL, '2024-11-01 14:25:54');
INSERT INTO `tb_contract_bak` VALUES (141, 172, 55, 34, '高性能EDA云服务多目标芯片（MPW)流片合同', '203', 'QD022022-057', '2022-09-15', '2023-12-15', 52, NULL, 1003000.0000, 11459, '陈延辉', 0, 11431, NULL, '2024-11-01 14:25:54');
INSERT INTO `tb_contract_bak` VALUES (142, 172, 55, 34, '高性能EDA云服务工程批流片合同', '205', 'QD022023-004', '2023-03-25', '2024-03-25', 52, NULL, 5830000.0000, 11459, '陈延辉', 0, 11431, NULL, '2024-11-01 14:25:54');
INSERT INTO `tb_contract_bak` VALUES (143, 173, 55, 34, '流片加工（委托）合同', '198', 'QD032023-005', '2023-05-09', '2024-05-09', 52, NULL, 679000.0000, 11459, '陈延辉', 0, 11431, NULL, '2024-11-01 14:25:54');
INSERT INTO `tb_contract_bak` VALUES (144, 166, 55, 34, '采购合同', '252', 'QD022024-003', '2024-02-01', '2025-02-01', 52, NULL, 315000.0000, 11441, '刘晨光', 0, 11431, NULL, '2024-11-01 14:25:54');
INSERT INTO `tb_contract_bak` VALUES (145, 174, 55, 34, 'MPW流片技术服务合同', '125', 'FSCG2021-2325-1', '2021-11-26', '2022-11-26', 52, NULL, 32800.0000, 11441, '刘晨光', 0, 11431, NULL, '2024-11-01 14:25:54');
INSERT INTO `tb_contract_bak` VALUES (146, 150, 55, 34, '芯片MPW流片服务合同', '183', 'QD022022-033', '2022-09-30', '2023-09-30', 52, NULL, 407091.0000, 11441, '刘晨光', 0, 11431, NULL, '2024-11-01 14:25:54');
INSERT INTO `tb_contract_bak` VALUES (147, 175, 55, 37, '服务器租赁', '243', 'SHYSW-2023011ZKXY', '2023-11-16', '2024-05-15', 53, NULL, 55000.0000, 11436, '王海庆', 0, 11434, NULL, '2024-11-01 14:25:54');
INSERT INTO `tb_contract_bak` VALUES (148, 176, 55, 34, '订单', '120', 'ACTTCDHT2021120591', '2021-12-16', '2022-02-23', 53, NULL, 736960.0000, 11441, '刘晨光', 0, 11465, NULL, '2024-11-01 14:25:54');
INSERT INTO `tb_contract_bak` VALUES (149, 177, 55, 68, '0.35PDK开发', '184', 'QD022023-004', '2023-01-29', '2024-01-29', 52, NULL, 1100000.0000, 11441, '刘晨光', 0, 11431, NULL, '2024-11-01 14:25:54');
INSERT INTO `tb_contract_bak` VALUES (150, 178, 55, 68, 'PDK开发', '199', 'QD022023-033', '2023-05-01', '2024-12-31', 52, NULL, 350000.0000, 11441, '刘晨光', 0, 11431, NULL, '2024-11-01 14:25:54');
INSERT INTO `tb_contract_bak` VALUES (151, 138, 55, 68, 'T.18GenII EPDK开发', '213', 'QD022023-043', '2023-07-01', '2023-08-31', 52, NULL, 255000.0000, 11441, '刘晨光', 0, 11431, NULL, '2024-11-01 14:25:54');
INSERT INTO `tb_contract_bak` VALUES (152, 97, 55, 34, '多目标芯片（MPW）流片合同', '179', 'QD042022-022', '2022-08-18', '2023-08-18', 52, NULL, 408000.0000, 11454, '徐晓烨', 0, 11431, NULL, '2024-11-01 14:47:24');
INSERT INTO `tb_contract_bak` VALUES (153, 179, 55, 39, 'Synopsys', '155', 'QD022022-022', '2022-09-01', '2023-02-28', 52, NULL, 210000.0000, 11441, '刘晨光', 0, 11431, NULL, '2024-11-01 14:25:54');
INSERT INTO `tb_contract_bak` VALUES (154, 180, 55, 39, '设计软件技术服务', '194', 'QD012023-002', '2023-05-22', '2023-07-22', 53, NULL, 22000.0000, 11439, '于江敏', 0, 11434, NULL, '2024-11-01 14:25:54');
INSERT INTO `tb_contract_bak` VALUES (155, 181, 55, 34, 'MPW流片合同', '277', 'QD052024-012', '2024-10-08', '2025-10-07', 53, '2024-10-23', 160000.0000, 11456, '李欢欢', 0, 11464, NULL, '2024-11-01 14:25:54');
INSERT INTO `tb_contract_bak` VALUES (156, 182, 55, 68, '芯片设计环境技术技术开发', '256', 'QD022024-030', '2024-06-11', '2025-06-12', 52, NULL, 60000.0000, 11447, '王雨欣', 0, 11431, NULL, '2024-11-01 14:25:54');
INSERT INTO `tb_contract_bak` VALUES (157, 183, 55, 34, '高性能EDAF云服务MPW流片', '233', 'QD022023-056', '2023-11-01', '2024-10-30', 52, NULL, 1400000.0000, 11441, '刘晨光', 0, 11431, NULL, '2024-11-01 14:25:54');
INSERT INTO `tb_contract_bak` VALUES (158, 150, 55, 62, '芯片版图设计开发', '269', 'QD052024-033', '2024-07-25', '2025-07-24', 53, '2025-06-11', 137500.0000, 11447, '王雨欣', 0, 11464, NULL, '2024-11-01 14:25:54');
INSERT INTO `tb_contract_bak` VALUES (159, 174, 55, 34, 'MPW流片技术服务合同', '126', 'FSCG2021-2396-1', '2021-11-26', '2022-11-16', 52, NULL, 48000.0000, 11441, '刘晨光', 0, 11431, NULL, '2024-11-01 14:25:54');
INSERT INTO `tb_contract_bak` VALUES (160, 184, 55, 34, '行MPW流片加工服务。', '279', 'QD022024-042', '2024-10-17', '2025-10-16', 53, '2024-10-25', 220000.0000, 11447, '王雨欣', 0, 11464, NULL, '2024-11-01 14:25:54');
INSERT INTO `tb_contract_bak` VALUES (161, 185, 55, 34, '高性能云服务NTO流片合同', '160', 'QD022022-027', '2022-09-16', '2023-09-15', 52, NULL, 1297500.0000, 11441, '刘晨光', 0, 11431, NULL, '2024-11-01 14:25:54');
INSERT INTO `tb_contract_bak` VALUES (162, 186, 55, 34, '高性能EDA云服务', '262', 'QD022024-015', '2024-03-22', '2025-03-21', 52, NULL, 1100000.0000, 11441, '刘晨光', 0, 11431, NULL, '2024-11-01 14:25:54');
INSERT INTO `tb_contract_bak` VALUES (163, 187, 55, 63, '第十七届研电赛赞助协议', '146', 'QD042022-012', '2022-07-28', '2022-08-10', 52, NULL, 80000.0000, 11456, '李欢欢', 0, 11431, NULL, '2024-11-01 14:25:54');
INSERT INTO `tb_contract_bak` VALUES (164, 203, 54, 34, 'SMIC 0.18UM BCD工艺MPW流片服务', '207', 'FW2022011801', '2022-01-18', '2023-01-17', 52, NULL, 180000.0000, 11441, '刘晨光', 0, 11431, NULL, '2024-11-01 16:26:40');
INSERT INTO `tb_contract_bak` VALUES (165, 203, 54, 40, 'SMIC 0.18UM MS 工艺MPW流片服务', '208', 'FW2022022102', '2022-02-21', '2022-08-21', 52, NULL, 375000.0000, 11441, '刘晨光', 0, 11431, NULL, '2024-11-01 16:26:40');
INSERT INTO `tb_contract_bak` VALUES (166, 203, 54, 34, 'SMIC 0.13UM MS 工艺MPW流片服务', '209', 'FW20220221803', '2022-02-18', '2022-08-18', 52, NULL, 270000.0000, 11441, '刘晨光', 0, 11431, NULL, '2024-11-01 16:26:40');
INSERT INTO `tb_contract_bak` VALUES (167, 203, 54, 34, 'SMIC 0.18UM MS 工艺MPW流片服务', '210', 'FW2022022404', '2022-02-24', '2022-08-24', 52, NULL, 150000.0000, 11441, '刘晨光', 0, 11431, NULL, '2024-11-01 16:26:40');
INSERT INTO `tb_contract_bak` VALUES (168, 203, 54, 34, 'HHG0.18um eflash光罩改版流片服务（FWH18N21F1)', '240', 'QD022022-038', '2022-10-08', '2023-10-07', 52, NULL, 0.0000, 11441, '刘晨光', 0, 11431, NULL, '2024-11-01 16:26:40');
INSERT INTO `tb_contract_bak` VALUES (169, 203, 54, 34, 'HHG 0.18UM FLASH流片服务', '283', 'QD022023-016', '2023-02-20', '2024-02-19', 52, NULL, 1911106.0000, 11441, '刘晨光', 0, 11431, NULL, '2024-11-01 16:26:40');
INSERT INTO `tb_contract_bak` VALUES (170, 204, 54, 40, '直流稳压电源采购', '303', 'QD052023-006', '2022-02-01', '2023-01-01', 52, NULL, 2030.0000, 11441, '刘晨光', 0, 11431, NULL, '2024-11-01 16:26:40');
INSERT INTO `tb_contract_bak` VALUES (171, 205, 54, 65, '员工培训协议', '310', '2023/8/10', '2023-08-21', '2023-08-25', 52, NULL, 11800.0000, 11430, '陈柳', 0, 11431, NULL, '2024-11-01 16:26:40');
INSERT INTO `tb_contract_bak` VALUES (172, 206, 54, 65, '常年法律顾问合同', '226', 'QD072022-002', '2021-06-20', '2023-06-20', 52, NULL, 40000.0000, 11430, '陈柳', 0, 11431, NULL, '2024-11-01 16:26:40');
INSERT INTO `tb_contract_bak` VALUES (173, 207, 54, 65, '常年法律顾问合同', '304', 'QD062023-003', '2023-07-17', '2024-07-17', 52, NULL, 40000.0000, 11430, '陈柳', 0, 11431, NULL, '2024-11-01 16:26:40');
INSERT INTO `tb_contract_bak` VALUES (174, 206, 54, 65, '常年法律顾问合同', '370', 'QD062024-003', '2024-06-20', '2025-06-19', 52, NULL, 40000.0000, 11430, '陈柳', 0, 11431, NULL, '2024-11-01 16:26:40');
INSERT INTO `tb_contract_bak` VALUES (175, 208, 54, 69, '专家聘用协议-迟宗涛', '366', 'QD052024-010', '2024-05-08', '2024-05-08', 52, NULL, 2000.0000, 11456, '李欢欢', 0, 11431, NULL, '2024-11-01 16:26:40');
INSERT INTO `tb_contract_bak` VALUES (176, 209, 54, 65, '软硬件集成的开发验证平台及物联网芯片测试', '222', 'QD012022-003', '2022-06-06', '2022-06-14', 53, NULL, 80000.0000, 11434, '邹晓栋', 0, 11434, NULL, '2024-11-01 16:26:40');
INSERT INTO `tb_contract_bak` VALUES (177, 209, 54, 68, '基于物联网处理器的开放式芯片设计环境测试', '345', 'QD012024-002', '2023-12-30', '2024-12-31', 53, NULL, 20000.0000, 11434, '邹晓栋', 0, 11434, NULL, '2024-11-01 16:26:40');
INSERT INTO `tb_contract_bak` VALUES (178, 210, 54, 65, '招聘渠道开拓', '387', 'QD062024-005', '2024-09-19', '2025-09-18', 52, NULL, 0.0000, 11430, '陈柳', 0, 11431, NULL, '2024-11-01 16:26:40');
INSERT INTO `tb_contract_bak` VALUES (179, 211, 54, 65, '员工培训协议', '311', '2023/8/10', '2023-08-21', '2023-08-25', 52, NULL, 11800.0000, 11430, '陈柳', 0, 11431, NULL, '2024-11-01 16:26:40');
INSERT INTO `tb_contract_bak` VALUES (180, 212, 54, 69, '兼职讲师聘用合同', '220', 'QD042022-006', '2022-04-20', '2022-06-20', 52, NULL, 25000.0000, 11453, '臧旭平', 0, 11431, NULL, '2024-11-01 16:26:40');
INSERT INTO `tb_contract_bak` VALUES (181, 212, 54, 69, '兼职讲师聘用合同', '298', 'QD052023-004', '2023-03-20', '2023-07-20', 52, NULL, 25000.0000, 11456, '李欢欢', 0, 11431, NULL, '2024-11-01 16:26:40');
INSERT INTO `tb_contract_bak` VALUES (182, 213, 54, 40, '金蝶云星辰管理服务订单', '232', 'QD102022-005', '2022-09-12', '2025-12-11', 53, NULL, 4000.0000, 11463, '王钧仟', 0, 11464, NULL, '2024-11-01 16:26:40');
INSERT INTO `tb_contract_bak` VALUES (183, 214, 54, 41, '广州集成电路产业创新发展高峰论坛2022年', '225', '20221109', '2022-11-09', '2022-11-10', 52, NULL, 61600.0000, 11453, '臧旭平', 0, 11431, NULL, '2024-11-01 16:26:40');
INSERT INTO `tb_contract_bak` VALUES (184, 215, 54, 65, '中国招投标信息网合作协议书', '319', 'QD022023-047', '2023-09-27', '2025-09-27', 53, '2023-10-10', 8800.0000, 11441, '刘晨光', 0, 11464, NULL, '2024-11-01 17:02:30');
INSERT INTO `tb_contract_bak` VALUES (185, 216, 54, 34, 'SMIC 0.18UM BCD工艺MPW流片服务', '268', 'QD022022-074', '2022-12-07', '2023-12-07', 52, NULL, 271584.0000, 11459, '陈延辉', 0, 11431, NULL, '2024-11-01 16:26:40');
INSERT INTO `tb_contract_bak` VALUES (186, 216, 54, 34, 'SMIC 65NM CMOS  B2116', '323', 'QD032023-014', '2023-10-18', '2024-10-19', 52, NULL, 2196540.0000, 11459, '陈延辉', 0, 11431, NULL, '2024-11-01 16:26:40');
INSERT INTO `tb_contract_bak` VALUES (187, 216, 54, 34, 'SMIC 65NM CMOS  B2121', '326', 'CSP23383', '2023-10-23', '2024-10-23', 52, NULL, 2196540.0000, 11460, '刘朋辉', 0, 11431, NULL, '2024-11-01 16:26:40');
INSERT INTO `tb_contract_bak` VALUES (188, 217, 54, 62, 'SRAM电路版图设计及保密协议', '346', 'QD022024-006', '2024-02-07', '2024-03-31', 52, NULL, 114400.0000, 11441, '刘晨光', 0, 11431, NULL, '2024-11-01 16:26:40');
INSERT INTO `tb_contract_bak` VALUES (189, 217, 54, 62, 'SNCIM与PADCIM项目后端设计开发', '358', 'QD022024-018', '2024-02-07', '2025-02-07', 52, NULL, 205400.0000, 11447, '王雨欣', 0, 11431, NULL, '2024-11-01 16:26:40');
INSERT INTO `tb_contract_bak` VALUES (190, 218, 54, 40, 'IP核采购订单', '227', '20220311', '2022-03-01', '2022-12-30', 52, NULL, 745000.0000, 11441, '刘晨光', 0, 11431, NULL, '2024-11-01 16:26:40');
INSERT INTO `tb_contract_bak` VALUES (191, 219, 54, 40, 'STM32采购', '294', 'DTWE20230515002', '2022-01-01', '2022-03-01', 52, NULL, 18807.7500, 11441, '刘晨光', 0, 11431, NULL, '2024-11-01 16:26:40');
INSERT INTO `tb_contract_bak` VALUES (192, 220, 54, 40, '服务器内存条采购', '211', 'YCWL-20220-003', '2022-04-04', '2025-04-03', 53, NULL, 529940.0000, 11436, '王海庆', 0, 11434, NULL, '2024-11-01 16:26:40');
INSERT INTO `tb_contract_bak` VALUES (193, 220, 54, 40, '锐捷万兆交换机采购', '212', 'YCWL-20220-004', '2022-04-04', '2025-04-03', 53, NULL, 309160.0000, 11436, '王海庆', 0, 11434, NULL, '2024-11-01 16:26:40');
INSERT INTO `tb_contract_bak` VALUES (194, 221, 54, 69, '专家顾问聘用协议-李德春', '376', 'QD052024-011', '2024-06-06', '2024-06-07', 52, NULL, 2000.0000, 11456, '李欢欢', 0, 11431, NULL, '2024-11-01 16:26:40');
INSERT INTO `tb_contract_bak` VALUES (195, 222, 54, 65, '会议酒店服务合同', '228', '20220708', '2022-07-28', '2022-08-12', 52, NULL, 34191.0000, 11431, '张静', 0, 11431, NULL, '2024-11-01 16:26:40');
INSERT INTO `tb_contract_bak` VALUES (196, 223, 54, 65, '审计合同', '195', 'QD102022-001', '2022-01-04', '2022-01-30', 52, NULL, 8000.0000, 11463, '王钧仟', 0, 11431, NULL, '2024-11-01 16:26:40');
INSERT INTO `tb_contract_bak` VALUES (197, 223, 54, 65, '国产与开源EDA工具技术创新中心（二期）审计', '221', 'QD102022-003', '2022-05-19', '2023-05-19', 52, NULL, 60000.0000, 11463, '王钧仟', 0, 11431, NULL, '2024-11-01 16:26:40');
INSERT INTO `tb_contract_bak` VALUES (198, 223, 54, 65, '审计业务委托合同', '273', 'QD092023-001', '2023-01-10', '2021-01-08', 52, NULL, 9000.0000, 11463, '王钧仟', 0, 11431, NULL, '2024-11-01 16:26:40');
INSERT INTO `tb_contract_bak` VALUES (199, 223, 54, 65, '审计合同', '341', 'QD092024-003', '2024-01-12', '2024-03-01', 52, NULL, 10000.0000, 11463, '王钧仟', 0, 11431, NULL, '2024-11-01 16:26:40');
INSERT INTO `tb_contract_bak` VALUES (200, 224, 54, 65, 'BOSS直聘服务合同', '224', 'EQ2022061718191', '2022-07-15', '2023-07-15', 52, NULL, 14800.0000, 11432, '李雪燕', 0, 11431, NULL, '2024-11-01 16:26:40');
INSERT INTO `tb_contract_bak` VALUES (201, 225, 54, 65, '人才住房配租协议', '271', 'QD072022-006', '2023-01-01', '2024-01-05', 52, NULL, 46111.7800, 11432, '李雪燕', 0, 11431, NULL, '2024-11-01 16:26:40');
INSERT INTO `tb_contract_bak` VALUES (202, 225, 54, 65, '崂山区“重点企业”人才住房配租协议书', '329', 'ZDQY-2023-0204', '2023-07-07', '2024-07-06', 52, NULL, 120382.5000, 11432, '李雪燕', 0, 11431, NULL, '2024-11-01 16:26:40');
INSERT INTO `tb_contract_bak` VALUES (203, 225, 54, 65, '崂山区“招引类”人才住房配租协议书', '340', 'QD062024001', '2024-01-05', '2025-01-05', 52, NULL, 49165.7800, 11432, '李雪燕', 0, 11431, NULL, '2024-11-01 16:26:40');
INSERT INTO `tb_contract_bak` VALUES (204, 145, 54, 65, '版图设计与验证项目', '243', 'QD042022-019', '2022-10-11', '2022-12-10', 52, NULL, 220800.0000, 11456, '李欢欢', 0, 11431, NULL, '2024-11-01 16:26:40');
INSERT INTO `tb_contract_bak` VALUES (205, 226, 54, 41, '参展合同', '291', 'QD042022021', '2022-08-15', '2022-11-05', 52, NULL, 0.0000, 11454, '徐晓烨', 0, 11431, NULL, '2024-11-01 16:26:40');
INSERT INTO `tb_contract_bak` VALUES (206, 227, 54, 65, '管理体系认证服务合同', '335', 'QD072023-003', '2023-12-05', '2024-01-20', 52, NULL, 29000.0000, 11461, '韩珊珊', 0, 11431, NULL, '2024-11-01 16:26:40');
INSERT INTO `tb_contract_bak` VALUES (207, 228, 54, 38, '封装技术服务合同', '241', 'QD082022-002', '2022-08-22', '2023-12-08', 52, NULL, 81000.0000, 11459, '陈延辉', 0, 11431, NULL, '2024-11-01 16:26:40');
INSERT INTO `tb_contract_bak` VALUES (208, 229, 54, 41, '活动布展搭建协议', '337', 'QD042022022', '2023-12-26', '2024-01-03', 53, '2024-01-11', 11310.0000, 11455, '刘晓璐', 0, 11455, NULL, '2024-11-01 16:26:40');
INSERT INTO `tb_contract_bak` VALUES (209, 230, 54, 40, '贴片机采购合同', '284', 'QD032023-003', '2022-01-01', '2023-01-01', 52, NULL, 25500.0000, 11441, '刘晨光', 0, 11431, NULL, '2024-11-01 16:26:40');
INSERT INTO `tb_contract_bak` VALUES (210, 231, 54, 34, 'SMIC 40LL MPW流片服务协议', '247', 'QD022022-043', '2022-09-15', '2023-09-05', 52, NULL, 690000.0000, 11441, '刘晨光', 0, 11431, NULL, '2024-11-01 16:26:40');
INSERT INTO `tb_contract_bak` VALUES (211, 231, 54, 34, 'XFAB XH035 MPW流片服务补充协议', '252', '20220429-B', '2022-04-29', '2023-04-29', 52, NULL, 32227.6000, 11441, '刘晨光', 0, 11431, NULL, '2024-11-01 16:26:40');
INSERT INTO `tb_contract_bak` VALUES (212, 231, 54, 34, 'XFAB XT06 MLM流片服务协议', '253', '20220517-A', '2022-05-17', '2023-05-07', 52, NULL, 540000.0000, 11441, '刘晨光', 0, 11431, NULL, '2024-11-01 16:26:40');
INSERT INTO `tb_contract_bak` VALUES (213, 231, 54, 34, 'XFAB XT018 MLM流片服务协议', '254', 'QD022022-015', '2022-07-09', '2023-07-09', 52, NULL, 1003000.0000, 11441, '刘晨光', 0, 11431, NULL, '2024-11-01 16:26:40');
INSERT INTO `tb_contract_bak` VALUES (214, 231, 54, 34, 'SMIC 55NM LL MPW流片服务协议', '267', 'QD022022-071', '2022-12-13', '2023-12-17', 52, NULL, 600000.0000, 11441, '刘晨光', 0, 11431, NULL, '2024-11-01 16:26:40');
INSERT INTO `tb_contract_bak` VALUES (215, 232, 54, 65, '新华健康中心员工体检合同', '229', '202201TJ-AD-18', '2022-08-10', '2022-11-20', 52, NULL, 16288.0000, 11431, '张静', 0, 11431, NULL, '2024-11-01 16:26:40');
INSERT INTO `tb_contract_bak` VALUES (216, 232, 54, 65, '新华健康中心员工体检合同', '306', '202301TJ-AD-18', '2023-07-24', '2023-10-31', 52, NULL, 20140.0000, 11431, '张静', 0, 11431, NULL, '2024-11-01 16:26:40');
INSERT INTO `tb_contract_bak` VALUES (217, 233, 54, 40, '浪涌发生器购销合同', '318', 'PMJ0020230914', '2023-09-14', '2024-09-14', 52, NULL, 36000.0000, 11441, '刘晨光', 0, 11431, NULL, '2024-11-01 16:26:40');
INSERT INTO `tb_contract_bak` VALUES (218, 234, 54, 40, '交换机IP电话采购', '213', 'QDIPHJ-2022-004', '2022-04-04', '2023-04-03', 53, NULL, 24792.2000, 11436, '王海庆', 0, 11434, NULL, '2024-11-01 16:26:40');
INSERT INTO `tb_contract_bak` VALUES (219, 235, 54, 40, '产品上盖及摸具采购', '296', 'QD032023-005', '2023-05-19', '2024-05-19', 52, NULL, 15345.0000, 11441, '刘晨光', 0, 11431, NULL, '2024-11-01 16:26:40');
INSERT INTO `tb_contract_bak` VALUES (220, 203, 54, 34, 'SMIC0.18UM MPW项目补充协议(FWS18M22A1)', '230', 'QD022022-019', '2022-08-01', '2023-08-17', 52, NULL, 50000.0000, 11441, '刘晨光', 0, 11431, NULL, '2024-11-01 17:38:11');
INSERT INTO `tb_contract_bak` VALUES (221, 203, 54, 34, 'SMIC 0.18UM BCDA 工艺MPW流片服务', '314', 'FWHT2023080202', '2023-08-02', '2024-08-01', 52, NULL, 216000.0000, 11441, '刘晨光', 0, 11431, NULL, '2024-11-01 16:26:40');
INSERT INTO `tb_contract_bak` VALUES (222, 203, 54, 34, 'HHG 0.18UM FLASH流片服务', '315', 'FWHT2023071301', '2023-07-13', '2024-07-12', 52, NULL, 57852.0100, 11441, '刘晨光', 0, 11431, NULL, '2024-11-01 16:26:40');
INSERT INTO `tb_contract_bak` VALUES (223, 203, 54, 34, 'SMIC 0.13UM MS 工艺MPW流片服务', '344', 'QD022024-004', '2024-02-01', '2025-02-01', 52, NULL, 260000.0000, 11441, '刘晨光', 0, 11431, NULL, '2024-11-01 16:26:40');
INSERT INTO `tb_contract_bak` VALUES (224, 203, 54, 34, 'TSMC 40NM Logic LP工艺MPW流片', '348', 'QD022024-009', '2024-02-27', '2025-02-25', 52, NULL, 520000.0000, 11441, '刘晨光', 0, 11431, NULL, '2024-11-01 16:26:40');
INSERT INTO `tb_contract_bak` VALUES (225, 236, 54, 35, '技术开发服务合同', '359', 'QD022024-019', '2024-04-10', '2025-04-10', 52, NULL, 3000.0000, 11447, '王雨欣', 0, 11431, NULL, '2024-11-01 16:26:40');
INSERT INTO `tb_contract_bak` VALUES (226, 237, 54, 69, '专家聘用协议-寿国平', '385', 'QD062024-006', '2024-09-23', '2026-09-22', 52, NULL, 0.0000, 11430, '陈柳', 0, 11431, NULL, '2024-11-01 16:26:40');
INSERT INTO `tb_contract_bak` VALUES (227, 238, 54, 34, '芯片委托加工采购订单', '237', 'QD022022-030', '2022-09-15', '2022-12-31', 52, NULL, 176707.0800, 11441, '刘晨光', 0, 11431, NULL, '2024-11-01 16:26:40');
INSERT INTO `tb_contract_bak` VALUES (228, 238, 54, 34, '芯片委托加工采购订单', '264', 'QD022022-066', '2022-11-15', '2023-01-15', 52, NULL, 631096.7300, 11441, '刘晨光', 0, 11431, NULL, '2024-11-01 16:26:40');
INSERT INTO `tb_contract_bak` VALUES (229, 238, 54, 34, '芯片委托加工采购订单', '265', 'QD022022-067', '2022-11-15', '2023-01-15', 52, NULL, 631096.7300, 11441, '刘晨光', 0, 11431, NULL, '2024-11-01 16:26:40');
INSERT INTO `tb_contract_bak` VALUES (230, 238, 54, 34, '芯片委托加工采购订单', '266', 'QD022022-068', '2022-11-15', '2023-01-15', 52, NULL, 1011360.0000, 11441, '刘晨光', 0, 11431, NULL, '2024-11-01 16:26:40');
INSERT INTO `tb_contract_bak` VALUES (231, 238, 54, 34, '芯片委托加工采购订单', '330', 'QD022023-053', '2023-09-28', '2023-12-28', 52, NULL, 836071.2500, 11441, '刘晨光', 0, 11431, NULL, '2024-11-01 16:26:40');
INSERT INTO `tb_contract_bak` VALUES (232, 239, 54, 40, '高低温试验箱JK-225G', '214', 'QD052022-007', '2022-04-24', '2022-10-24', 52, NULL, 52870.0000, 11431, '张静', 0, 11431, NULL, '2024-11-01 16:37:48');
INSERT INTO `tb_contract_bak` VALUES (233, 240, 54, 35, 'PDK及基础IP委托设计', '367', 'QD022024-012', '2024-04-01', '2025-02-01', 52, NULL, 550000.0000, 11441, '刘晨光', 0, 11431, NULL, '2024-11-01 16:26:40');
INSERT INTO `tb_contract_bak` VALUES (234, 96, 54, 41, '全国青少年劳动技能与智能设计大赛（AILD)省承办单位合作协议', '343', 'QD082024002', '2024-01-01', '2024-12-31', 52, NULL, 0.0000, 11460, '刘朋辉', 0, 11431, NULL, '2024-11-01 16:26:40');
INSERT INTO `tb_contract_bak` VALUES (235, 231, 54, 34, 'SMIC 55NM LL MPW流片服务协议', '293', 'S20230205001', '2023-05-05', '2023-05-09', 52, NULL, 650000.0000, 11459, '陈延辉', 0, 11431, NULL, '2024-11-01 16:26:40');
INSERT INTO `tb_contract_bak` VALUES (236, 231, 54, 34, 'NX0201流片服务协议', '316', 'S20230807001', '2023-08-07', '2023-08-07', 52, NULL, 1148000.0000, 11460, '刘朋辉', 0, 11431, NULL, '2024-11-01 16:26:40');
INSERT INTO `tb_contract_bak` VALUES (237, 231, 54, 34, 'XFAB XT018 4-MLM流片服务协议', '332', 'QD022023-058', '2023-11-24', '2023-11-24', 52, NULL, 1448706.1100, 11441, '刘晨光', 0, 11431, NULL, '2024-11-01 16:26:40');
INSERT INTO `tb_contract_bak` VALUES (238, 231, 54, 34, 'XFAB XS018 MPW流片服务协议', '352', 'QD022024-007', '2024-02-28', '2025-02-27', 52, NULL, 325000.0000, 11441, '刘晨光', 0, 11431, NULL, '2024-11-01 16:26:40');
INSERT INTO `tb_contract_bak` VALUES (239, 231, 54, 34, 'SMIC 180nm MS MPW流片服务业务', '365', 'QD052024-009', '2024-05-14', '2024-11-10', 52, NULL, 135000.0000, 11456, '李欢欢', 0, 11431, NULL, '2024-11-01 16:26:40');
INSERT INTO `tb_contract_bak` VALUES (240, 218, 54, 34, '芯片流片采购订单', '295', 'QD082023-008', '2023-04-01', '2023-04-01', 52, NULL, 55000.0000, 11459, '陈延辉', 0, 11431, NULL, '2024-11-01 16:26:40');
INSERT INTO `tb_contract_bak` VALUES (241, 218, 54, 34, '芯片流片采购订单', '309', 'QD032023-006', '2022-03-01', '2023-03-01', 52, NULL, 600000.0000, 11459, '陈延辉', 0, 11431, NULL, '2024-11-01 16:26:40');
INSERT INTO `tb_contract_bak` VALUES (242, 241, 54, 65, '2020e云创芯计划颁奖典礼', '196', 'QD062022-002', '2022-01-12', '2022-01-30', 52, NULL, 29073.0000, 11453, '臧旭平', 0, 11431, NULL, '2024-11-01 16:26:40');
INSERT INTO `tb_contract_bak` VALUES (243, 241, 54, 41, '研电赛华北赛区服务合同', '219', 'QD042022-008', '2022-05-25', '2023-05-25', 52, NULL, 593657.8000, 11453, '臧旭平', 0, 11431, NULL, '2024-11-01 16:26:40');
INSERT INTO `tb_contract_bak` VALUES (244, 241, 54, 41, 'ICCAD服务合同', '244', 'QD042022-020', '2022-10-27', '2023-10-13', 53, '2022-11-11', 2183.0000, 11455, '刘晓璐', 0, 11455, NULL, '2024-11-01 16:26:40');
INSERT INTO `tb_contract_bak` VALUES (245, 242, 54, 40, 'A95M18001多项目晶圆技术服务', '206', '2021112MPW-15', '2021-12-30', '2022-12-29', 52, NULL, 330000.0000, 11441, '刘晨光', 0, 11431, NULL, '2024-11-01 16:26:40');
INSERT INTO `tb_contract_bak` VALUES (246, 242, 54, 34, 'M028202205多项目晶圆技术服务', '216', 'QD052022-009', '2022-04-12', '2023-04-11', 52, NULL, 780000.0000, 11441, '刘晨光', 0, 11431, NULL, '2024-11-01 16:26:40');
INSERT INTO `tb_contract_bak` VALUES (247, 242, 54, 34, 'TowerJazz流片加工技术服务-LVTJ18002改版', '242', 'QD022022-040', '2022-10-25', '2023-10-25', 52, NULL, 1297500.0000, 11441, '刘晨光', 0, 11431, NULL, '2024-11-01 16:26:40');
INSERT INTO `tb_contract_bak` VALUES (248, 242, 54, 34, 'A95M180 2211A多项目晶圆技术服务', '246', 'QD022022-042', '2022-10-31', '2023-10-30', 52, NULL, 175000.0000, 11441, '刘晨光', 0, 11431, NULL, '2024-11-01 16:26:40');
INSERT INTO `tb_contract_bak` VALUES (249, 242, 54, 34, 'M028202211 多项目晶圆技术服务合同', '250', 'QD022022-051', '2022-10-31', '2023-10-30', 52, NULL, 535000.0000, 11441, '刘晨光', 0, 11431, NULL, '2024-11-01 16:26:40');
INSERT INTO `tb_contract_bak` VALUES (250, 242, 54, 34, '多项目晶圆技术服务合同', '288', 'QD022023-027', '2023-03-24', '2024-03-23', 52, NULL, 175000.0000, 11441, '刘晨光', 0, 11431, NULL, '2024-11-01 16:26:40');
INSERT INTO `tb_contract_bak` VALUES (251, 242, 54, 34, 'M028202305晶圆服务', '297', 'DXW20230505', '2023-05-05', '2024-05-04', 52, NULL, 1500000.0000, 11441, '刘晨光', 0, 11431, NULL, '2024-11-01 16:26:40');
INSERT INTO `tb_contract_bak` VALUES (252, 242, 54, 34, 'M028202311多项目晶圆技术服务', '328', 'QD022023-053', '2023-11-06', '2024-11-05', 52, NULL, 810000.0000, 11441, '刘晨光', 0, 11431, NULL, '2024-11-01 16:26:40');
INSERT INTO `tb_contract_bak` VALUES (253, 242, 54, 34, '65nm多项目晶圆技术服务合同', '374', 'QD022024-028', '2024-06-05', '2025-06-04', 52, NULL, 400000.0000, 11447, '王雨欣', 0, 11431, NULL, '2024-11-01 16:26:40');
INSERT INTO `tb_contract_bak` VALUES (254, 243, 54, 65, '智联招聘服务合同', '223', 'C202206172735251', '2022-07-14', '2023-07-14', 52, NULL, 8680.0000, 11432, '李雪燕', 0, 11431, NULL, '2024-11-01 16:26:40');
INSERT INTO `tb_contract_bak` VALUES (255, 244, 54, 34, 'MPW芯片流片AFE2021', '205', 'MLW1109', '2021-11-09', '2022-11-09', 52, NULL, 225000.0000, 11441, '刘晨光', 0, 11431, NULL, '2024-11-01 16:26:40');
INSERT INTO `tb_contract_bak` VALUES (256, 245, 54, 41, '会议活动合同书', '338', 'QD042022023', '2023-12-20', '2024-01-04', 53, '2024-01-08', 15900.0000, 11455, '刘晓璐', 0, 11455, NULL, '2024-11-01 16:26:40');
INSERT INTO `tb_contract_bak` VALUES (257, 246, 54, 40, '知识产权玄铁CPU核E906和E902许可合同', '351', 'QD052024-005', '2024-03-08', '2026-03-08', 53, '2024-03-19', 250000.0000, 11456, '李欢欢', 0, 11464, NULL, '2024-11-01 16:26:41');
INSERT INTO `tb_contract_bak` VALUES (258, 247, 54, 40, '精密空调采购合同', '234', 'KTDQZK-202202-020', '2022-09-15', '2023-09-15', 52, NULL, 93200.0000, 11431, '张静', 0, 11431, NULL, '2024-11-01 16:26:41');
INSERT INTO `tb_contract_bak` VALUES (259, 247, 54, 65, '机房专用空调维护保养合同', '235', 'QD022022-004', '2022-09-14', '2023-09-14', 52, NULL, 7000.0000, 11431, '张静', 0, 11431, NULL, '2024-11-01 16:26:41');
INSERT INTO `tb_contract_bak` VALUES (260, 247, 54, 65, '机房专用空调维护保养合同', '322', 'JFKTWH-2023020-0110', '2023-09-21', '2026-09-20', 71, '2024-11-13', 24000.0000, 11431, '张静', 0, 11464, NULL, '2024-11-01 16:26:41');
INSERT INTO `tb_contract_bak` VALUES (261, 248, 54, 34, 'CNI1141-TK框架主合同及委托合同', '258', 'QD022022-062', '2022-12-06', '2023-12-16', 52, NULL, 892474.0000, 11441, '刘晨光', 0, 11431, NULL, '2024-11-01 16:26:41');
INSERT INTO `tb_contract_bak` VALUES (262, 248, 54, 34, 'U2301 CNT1141-TK流片服务', '312', 'QD022023-044', '2023-03-01', '2023-04-01', 52, NULL, 171567.9000, 11441, '刘晨光', 0, 11431, NULL, '2024-11-01 16:26:41');
INSERT INTO `tb_contract_bak` VALUES (263, 248, 54, 34, 'CNI1141-TK框架主合同及委托合同', '353', 'QD022024-013', '2024-03-25', '2025-03-24', 52, NULL, 994852.0000, 11441, '刘晨光', 0, 11431, NULL, '2024-11-01 16:26:41');
INSERT INTO `tb_contract_bak` VALUES (264, 248, 54, 34, 'CNI1141C-TK框架主合同及委托合同', '354', 'QD022024-014', '2024-03-25', '2025-03-24', 52, NULL, 946714.0000, 11441, '刘晨光', 0, 11431, NULL, '2024-11-01 16:26:41');
INSERT INTO `tb_contract_bak` VALUES (265, 249, 54, 34, '芯片委托加工采购订单', '245', 'QD022022-041', '2022-10-15', '2023-10-15', 52, NULL, 2289870.0000, 11441, '刘晨光', 0, 11431, NULL, '2024-11-01 16:26:41');
INSERT INTO `tb_contract_bak` VALUES (266, 249, 54, 34, '流片服务代理合作协议', '249', 'QD022022-045', '2022-10-10', '2025-12-31', 52, NULL, 0.0000, 11441, '刘晨光', 0, 11431, NULL, '2024-11-01 16:26:41');
INSERT INTO `tb_contract_bak` VALUES (267, 249, 54, 34, '芯片委托加工采购订单', '259', 'QD022022-048', '2022-10-15', '2023-05-31', 52, NULL, 680727.0000, 11441, '刘晨光', 0, 11431, NULL, '2024-11-01 16:26:41');
INSERT INTO `tb_contract_bak` VALUES (268, 249, 54, 34, '芯片委托加工采购订单', '260', 'QD022022-049', '2022-10-15', '2023-05-31', 52, NULL, 525300.0000, 11441, '刘晨光', 0, 11431, NULL, '2024-11-01 16:26:41');
INSERT INTO `tb_contract_bak` VALUES (269, 249, 54, 34, '芯片委托加工采购订单', '261', 'QD022022-041', '2022-10-15', '2023-05-31', 52, NULL, 1534500.0000, 11441, '刘晨光', 0, 11431, NULL, '2024-11-01 16:26:41');
INSERT INTO `tb_contract_bak` VALUES (270, 249, 54, 34, '芯片委托加工采购订单', '262', 'QD022022-047', '2022-10-15', '2023-05-31', 52, NULL, 155000.0000, 11441, '刘晨光', 0, 11431, NULL, '2024-11-01 16:26:41');
INSERT INTO `tb_contract_bak` VALUES (271, 249, 54, 34, '芯片委托加工采购订单', '263', 'QD022022-052', '2022-10-15', '2023-05-31', 52, NULL, 85470.0000, 11441, '刘晨光', 0, 11431, NULL, '2024-11-01 16:26:41');
INSERT INTO `tb_contract_bak` VALUES (272, 250, 54, 34, '芯片委托加工采购订单', '333', '2023BRM-MPW-9-1', '2023-09-01', '2023-12-31', 52, NULL, 220000.0000, 11460, '刘朋辉', 0, 11431, NULL, '2024-11-01 16:26:41');
INSERT INTO `tb_contract_bak` VALUES (273, 249, 54, 34, '芯片委托加工采购订单', '334', 'QD20231015A', '2023-10-15', '2024-10-14', 52, NULL, 865200.0000, 11460, '刘朋辉', 0, 11431, NULL, '2024-11-01 16:26:41');
INSERT INTO `tb_contract_bak` VALUES (274, 249, 54, 34, '芯片委托加工采购订单', '373', 'QD022024-026', '2024-05-26', '2024-12-30', 52, NULL, 950052.4000, 11447, '王雨欣', 0, 11431, NULL, '2024-11-01 16:26:41');
INSERT INTO `tb_contract_bak` VALUES (275, 250, 54, 34, '芯片委托加工采购订单', '375', 'QD022024-029', '2024-06-03', '2024-12-31', 52, NULL, 1290500.0000, 11447, '王雨欣', 0, 11431, NULL, '2024-11-01 16:26:41');
INSERT INTO `tb_contract_bak` VALUES (276, 251, 54, 65, '咨询合同', '281', 'QD082023-002', '2023-05-01', '2024-05-01', 52, NULL, 30000.0000, 11459, '陈延辉', 0, 11431, NULL, '2024-11-01 16:26:41');
INSERT INTO `tb_contract_bak` VALUES (277, 252, 54, 65, '咨询服务合同', '276', 'QD082023-001', '2023-02-16', '2023-05-16', 52, NULL, 0.0000, 11459, '陈延辉', 0, 11431, NULL, '2024-11-01 16:26:41');
INSERT INTO `tb_contract_bak` VALUES (278, 178, 54, 34, 'e云创芯计划2021', '197', '20230101', '2022-01-01', '2023-01-01', 52, NULL, 0.0000, 11441, '刘晨光', 0, 11431, NULL, '2024-11-01 16:26:41');
INSERT INTO `tb_contract_bak` VALUES (279, 253, 54, 34, '委托晶圆加工', '379', 'QD022024-032', '2024-07-24', '2024-07-15', 52, NULL, 27148.8000, 11447, '王雨欣', 0, 11431, NULL, '2024-11-01 16:26:41');
INSERT INTO `tb_contract_bak` VALUES (280, 254, 54, 34, '委托晶圆加工', '382', 'QD022024-034', '2024-07-29', '2025-07-29', 53, '2024-08-22', 12430.0000, 11447, '王雨欣', 0, 11464, NULL, '2024-11-01 16:26:41');
INSERT INTO `tb_contract_bak` VALUES (281, 255, 54, 40, '电脑显示器内存采购合同', '197', '20220130', '2022-01-24', '2022-01-30', 52, NULL, 118340.0000, 11431, '张静', 0, 11431, NULL, '2024-11-01 16:26:41');
INSERT INTO `tb_contract_bak` VALUES (282, 256, 54, 34, '芯片委托加工订单', '378', '20231101', '2023-11-01', '2024-12-31', 52, NULL, 1452276.0000, 11460, '刘朋辉', 0, 11431, NULL, '2024-11-01 16:26:41');
INSERT INTO `tb_contract_bak` VALUES (283, 232, 54, 65, '体检合同', '380', 'QD062024-005', '2024-08-06', '2024-08-10', 52, NULL, 18824.0000, 11431, '张静', 0, 11431, NULL, '2024-11-01 16:26:41');
INSERT INTO `tb_contract_bak` VALUES (284, 257, 54, 65, '北京市区房屋租赁合同', '289', 'QD052023-003', '2023-04-01', '2024-03-31', 53, '2023-12-20', 168000.0000, 11455, '刘晓璐', 0, 11455, NULL, '2024-11-01 16:26:41');
INSERT INTO `tb_contract_bak` VALUES (285, 258, 54, 65, '北京市房屋租赁合同', '350', 'QD052024-003', '2024-04-01', '2025-03-31', 52, NULL, 168000.0000, 11455, '刘晓璐', 0, 11431, NULL, '2024-11-01 16:26:41');
INSERT INTO `tb_contract_bak` VALUES (286, 259, 54, 69, '兼职讲师聘用合同', '218', 'QD042022021', '2022-02-20', '2024-02-20', 52, NULL, 8400.0000, 11456, '李欢欢', 0, 11431, NULL, '2024-11-01 16:30:44');
INSERT INTO `tb_contract_bak` VALUES (287, 190, 54, 68, '制冷器具芯片标准撰写', '302', 'QD052023-005', '2023-07-07', '2023-08-28', 53, '2024-07-10', 180000.0000, 11455, '刘晓璐', 0, 11455, NULL, '2024-11-01 16:30:44');
INSERT INTO `tb_contract_bak` VALUES (288, 259, 54, 69, '专家聘用框架协议', '317', 'QD052023-010', '2023-05-01', '2025-04-30', 52, NULL, 0.0000, 11455, '刘晓璐', 0, 11431, NULL, '2024-11-01 16:30:44');
INSERT INTO `tb_contract_bak` VALUES (289, 190, 54, 68, '一种用于智能家电控制芯片的测试方法', '336', 'QD042022021', '2023-08-01', '2023-10-15', 53, '2024-01-26', 30000.0000, 11455, '刘晓璐', 0, 11455, NULL, '2024-11-01 16:30:44');
INSERT INTO `tb_contract_bak` VALUES (290, 203, 54, 34, '流片服务合同', '386', 'QD022024-039', '2024-10-08', '2025-10-07', 53, '2024-10-31', 700000.0000, 11447, '王雨欣', 0, 11464, NULL, '2024-11-01 16:30:44');
INSERT INTO `tb_contract_bak` VALUES (291, 203, 54, 34, '委托进行MPW流片服务', '389', 'QD022024-043', '2024-10-21', '2025-10-21', 53, '2024-11-08', 1220000.0000, 11447, '王雨欣', 0, 11464, NULL, '2024-11-01 16:30:44');
INSERT INTO `tb_contract_bak` VALUES (292, 249, 54, 34, '芯片委托加工采购订单', '277', 'QD022023-011', '2023-01-03', '2023-12-31', 52, NULL, 513000.0000, 11441, '刘晨光', 0, 11431, NULL, '2024-11-01 16:30:44');
INSERT INTO `tb_contract_bak` VALUES (293, 249, 54, 34, '芯片委托加工采购订单', '278', 'QD022023-012', '2023-01-03', '2023-12-31', 52, NULL, 865000.0000, 11441, '刘晨光', 0, 11431, NULL, '2024-11-01 16:30:44');
INSERT INTO `tb_contract_bak` VALUES (294, 249, 54, 34, '芯片委托加工采购订单', '279', 'QD022023-013', '2023-01-03', '2023-12-31', 52, NULL, 56654.4000, 11441, '刘晨光', 0, 11431, NULL, '2024-11-01 16:30:44');
INSERT INTO `tb_contract_bak` VALUES (295, 249, 54, 34, '芯片委托加工采购订单', '285', 'QD022023-014', '2023-01-03', '2023-12-31', 52, NULL, 48240.0000, 11441, '刘晨光', 0, 11431, NULL, '2024-11-01 16:30:44');
INSERT INTO `tb_contract_bak` VALUES (296, 249, 54, 34, '芯片委托加工采购订单', '286', 'QD022023-015', '2023-01-03', '2023-12-31', 52, NULL, 67980.0000, 11441, '刘晨光', 0, 11431, NULL, '2024-11-01 16:30:44');
INSERT INTO `tb_contract_bak` VALUES (297, 249, 54, 34, '芯片委托加工采购订单', '287', 'QD022022-054', '2022-11-01', '2023-05-31', 52, NULL, 514890.0000, 11441, '刘晨光', 0, 11431, NULL, '2024-11-01 16:30:44');
INSERT INTO `tb_contract_bak` VALUES (298, 260, 54, 65, 'FPGA专班培训', '198', 'QD062022-001', '2022-01-04', '2022-01-30', 52, NULL, 13000.0000, 11456, '李欢欢', 0, 11431, NULL, '2024-11-01 16:30:44');
INSERT INTO `tb_contract_bak` VALUES (299, 227, 54, 65, '管理体系认证服务合同', '321', 'QD022023-003', '2023-09-25', '2024-09-05', 52, NULL, 20000.0000, 11461, '韩珊珊', 0, 11431, NULL, '2024-11-01 16:30:44');
INSERT INTO `tb_contract_bak` VALUES (300, 244, 54, 34, 'TSMC MLW0910流片服务', '236', 'QD022022-025', '2022-09-22', '2023-09-02', 52, NULL, 90000.0000, 11441, '刘晨光', 0, 11431, NULL, '2024-11-01 16:30:44');
INSERT INTO `tb_contract_bak` VALUES (301, 244, 54, 34, 'TMSC MLW0104流片服务', '274', 'QD022023-007', '2023-01-10', '2024-01-10', 52, NULL, 500000.0000, 11441, '刘晨光', 0, 11431, NULL, '2024-11-01 16:30:44');
INSERT INTO `tb_contract_bak` VALUES (302, 250, 54, 34, '芯片委托加工采购订单', '203', 'GD052022-003', '2022-02-15', '2022-12-31', 52, NULL, 1476814.0000, 11441, '刘晨光', 0, 11431, NULL, '2024-11-01 16:30:44');
INSERT INTO `tb_contract_bak` VALUES (303, 250, 54, 40, '芯片委托加工采购订单', '204', '20210302BRM-MPW-9', '2021-03-03', '2021-12-31', 52, NULL, 138375.0000, 11441, '刘晨光', 0, 11431, NULL, '2024-11-01 16:30:44');
INSERT INTO `tb_contract_bak` VALUES (304, 228, 54, 38, '封装技术服务合同', '282', 'QD022023-017', '2023-03-06', '2024-03-06', 52, NULL, 98630.0000, 11441, '刘晨光', 0, 11431, NULL, '2024-11-01 17:00:48');
INSERT INTO `tb_contract_bak` VALUES (305, 224, 54, 65, 'BOSS直聘服务合同', '371', 'QD062024-004', '0202-04-06', '2025-06-29', 53, NULL, 14888.0000, 11432, '李雪燕', 0, 11464, NULL, '2024-11-01 17:00:48');
INSERT INTO `tb_contract_bak` VALUES (306, 228, 54, 38, '陶瓷CQFP256封装', '324', '23010-BX-2W', '2023-01-01', '2024-08-08', 52, NULL, 20000.0000, 11460, '刘朋辉', 0, 11431, NULL, '2024-11-01 17:00:48');
INSERT INTO `tb_contract_bak` VALUES (307, 131, 55, 39, 'Mentor /Synopsys/华大九天', '122', 'QD022022-002', '2021-12-01', '2022-11-30', 52, NULL, 280000.0000, 11441, '刘晨光', 0, 11431, NULL, '2024-11-04 10:36:14');
INSERT INTO `tb_contract_bak` VALUES (308, 261, 55, 39, '华大九天', '129', 'QD022022-003', '2021-01-01', '2022-12-01', 52, NULL, 40000.0000, 11441, '刘晨光', 0, 11431, NULL, '2024-11-04 10:36:14');
INSERT INTO `tb_contract_bak` VALUES (309, 175, 55, 37, '服务器租赁', '130', 'SHYSW-2022010ZKXY', '2022-05-15', '2022-11-15', 53, NULL, 55000.0000, 11436, '王海庆', 0, 11434, NULL, '2024-11-04 10:36:14');
INSERT INTO `tb_contract_bak` VALUES (310, 160, 55, 39, 'Synopsys', '133', 'QD022022-005', '2022-05-01', '2023-02-28', 52, NULL, 82500.0000, 11441, '刘晨光', 0, 11431, NULL, '2024-11-04 10:36:14');
INSERT INTO `tb_contract_bak` VALUES (311, 262, 55, 68, '智慧养殖养鸡环境控制器PCB板及板载程序开发', '134', 'QD052022-014', '2022-05-17', '2022-05-17', 52, NULL, 370000.0000, 11441, '刘晨光', 0, 11431, NULL, '2024-11-04 10:36:14');
INSERT INTO `tb_contract_bak` VALUES (312, 146, 55, 39, 'Siemens/Synopsys/华大九天', '136', 'QD052022-004', '2022-05-08', '2023-05-08', 52, NULL, 50000.0000, 11441, '刘晨光', 0, 11431, NULL, '2024-11-04 10:36:14');
INSERT INTO `tb_contract_bak` VALUES (313, 135, 55, 70, '产品借用协议(示波器）', '137', '20220525', '2022-05-25', '2022-07-24', 52, NULL, 153000.0000, 11463, '王钧仟', 0, 11431, NULL, '2024-11-04 10:36:14');
INSERT INTO `tb_contract_bak` VALUES (314, 263, 55, 34, 'MPW流片协议', '138', 'QD052000-016', '2022-05-20', '2023-05-20', 52, NULL, 490000.0000, 11441, '刘晨光', 0, 11431, NULL, '2024-11-04 10:36:14');
INSERT INTO `tb_contract_bak` VALUES (315, 142, 55, 34, 'MPW芯片验证技术服务科技服务验收报告', '141-1', '20240130', '2021-08-30', '2021-12-15', 52, NULL, 0.0000, 11441, '刘晨光', 0, 11431, NULL, '2024-11-04 10:36:14');
INSERT INTO `tb_contract_bak` VALUES (316, 182, 55, 39, 'Synopsys', '143', 'QD022022-007', '2022-07-15', '2023-01-15', 52, NULL, 30000.0000, 11441, '刘晨光', 0, 11431, NULL, '2024-11-04 10:36:14');
INSERT INTO `tb_contract_bak` VALUES (317, 182, 55, 39, '补充协议', '143-1', '20220915', '2022-09-15', '2023-03-15', 52, NULL, 0.0000, 11441, '刘晨光', 0, 11431, NULL, '2024-11-04 10:36:14');
INSERT INTO `tb_contract_bak` VALUES (318, 144, 55, 63, '第十七届研电赛赞助协议', '148', 'QD042022-011', '2022-07-28', '2022-08-10', 52, NULL, 150000.0000, 11456, '李欢欢', 0, 11431, NULL, '2024-11-04 10:36:14');
INSERT INTO `tb_contract_bak` VALUES (319, 141, 55, 68, '技术开发合同', '152', 'QD042022-016', '2022-07-27', '2025-07-27', 53, '2024-06-27', 3561600.0000, 11453, '臧旭平', 0, 11464, NULL, '2024-11-04 10:36:14');
INSERT INTO `tb_contract_bak` VALUES (320, 141, 55, 68, '技术开发工作说明书', '152-01', 'QD042022-016', '2022-07-10', '2024-01-20', 52, NULL, 0.0000, 11453, '臧旭平', 0, 11431, NULL, '2024-11-04 10:36:14');
INSERT INTO `tb_contract_bak` VALUES (321, 141, 55, 68, '有关个人数据处理的补充协议', '152-02', 'QD042022-016', '2022-07-27', '2032-07-27', 52, NULL, 0.0000, 11453, '臧旭平', 0, 11431, NULL, '2024-11-04 10:36:14');
INSERT INTO `tb_contract_bak` VALUES (322, 141, 55, 68, '保密协议', '152-03', 'QD042022-016', '2022-07-27', '2032-07-27', 52, NULL, 0.0000, 11453, '臧旭平', 0, 11431, NULL, '2024-11-04 10:36:14');
INSERT INTO `tb_contract_bak` VALUES (323, 141, 55, 68, '诚信特别约定', '152-04', 'QD042022-016', '2022-07-27', '2025-07-27', 52, NULL, 0.0000, 11453, '臧旭平', 0, 11431, NULL, '2024-11-04 10:36:14');
INSERT INTO `tb_contract_bak` VALUES (324, 141, 55, 68, '诚信特别约定', '152-05', 'QD042022-016', '2022-07-27', '2025-07-27', 52, NULL, 0.0000, 11453, '臧旭平', 0, 11431, NULL, '2024-11-04 10:36:15');
INSERT INTO `tb_contract_bak` VALUES (325, 141, 55, 68, '海尔供应商数据处理承诺书', '152-06', 'QD042022-016', '2022-07-27', '2025-07-27', 52, NULL, 0.0000, 11453, '臧旭平', 0, 11431, NULL, '2024-11-04 10:36:15');
INSERT INTO `tb_contract_bak` VALUES (326, 141, 55, 68, '海尔IT合作伙伴员工行为规范', '152-07', 'QD042022-016', '2022-07-27', '2025-07-27', 52, NULL, 0.0000, 11453, '臧旭平', 0, 11431, NULL, '2024-11-04 10:36:15');
INSERT INTO `tb_contract_bak` VALUES (327, 141, 55, 68, '安全责任承诺书', '152-08', 'QD042022-016', '2022-07-27', '2025-07-27', 52, NULL, 0.0000, 11453, '臧旭平', 0, 11431, NULL, '2024-11-04 10:36:15');
INSERT INTO `tb_contract_bak` VALUES (328, 169, 55, 34, '高性能EDA云服务多目标芯片（MPW)流片合同', '163', 'QD022022-037', '2022-10-10', '2023-04-10', 52, NULL, 290000.0000, 11441, '刘晨光', 0, 11431, NULL, '2024-11-04 10:36:15');
INSERT INTO `tb_contract_bak` VALUES (329, 107, 55, 39, 'Mentor /Synopsys', '164', 'QD022022-034', '2022-11-01', '2023-02-16', 52, NULL, 48000.0000, 11441, '刘晨光', 0, 11431, NULL, '2024-11-04 10:36:15');
INSERT INTO `tb_contract_bak` VALUES (330, 264, 55, 34, '高性能EDA云服务多目标芯片（MPW)流片合同', '165', 'QD022022-050', '2022-10-20', '2023-04-20', 52, NULL, 180000.0000, 11441, '刘晨光', 0, 11431, NULL, '2024-11-04 10:36:15');
INSERT INTO `tb_contract_bak` VALUES (331, 265, 55, 39, '高性能集成电路设计公共服务平台应用', '166', 'QD022022-046', '2022-11-15', '2023-02-15', 52, NULL, 0.0000, 11441, '刘晨光', 0, 11431, NULL, '2024-11-04 10:36:15');
INSERT INTO `tb_contract_bak` VALUES (332, 145, 55, 65, '青岛集成电路人才创新培养联盟申请加入协议', '167', 'QD042022-018', '2022-11-22', '2027-11-21', 53, NULL, 5000.0000, 11456, '李欢欢', 0, 11464, NULL, '2024-11-04 10:36:15');
INSERT INTO `tb_contract_bak` VALUES (333, 266, 55, 65, '青岛集成电路人才创新培养联盟申请加入协议', '168', 'QD042022-019', '2022-11-17', '2027-11-16', 52, NULL, 0.0000, 11456, '李欢欢', 0, 11431, NULL, '2024-11-04 10:36:15');
INSERT INTO `tb_contract_bak` VALUES (334, 175, 55, 37, '服务器租赁', '169', 'SHYSW-2022100ZKXY', '2022-11-16', '2023-05-15', 53, NULL, 55000.0000, 11436, '王海庆', 0, 11431, NULL, '2024-11-04 10:36:15');
INSERT INTO `tb_contract_bak` VALUES (335, 172, 55, 34, '高性能EDA云服务工程批流片合同', '171', 'QD022022-057', '2022-06-15', '2023-12-15', 52, NULL, 1003000.0000, 11441, '刘晨光', 0, 11431, NULL, '2024-11-04 10:36:15');
INSERT INTO `tb_contract_bak` VALUES (336, 125, 55, 34, 'MPW芯片流片服务报价单', '173', 'QD022022-064', '2022-12-01', '2023-03-31', 52, NULL, 980000.0000, 11441, '刘晨光', 0, 11431, NULL, '2024-11-04 10:36:15');
INSERT INTO `tb_contract_bak` VALUES (337, 172, 55, 34, '高性能EDA云服务多目标芯片（MPW)流片合同', '174', 'QD022022-065', '2022-05-20', '2023-08-20', 52, NULL, 259200.0000, 11441, '刘晨光', 0, 11431, NULL, '2024-11-04 10:36:15');
INSERT INTO `tb_contract_bak` VALUES (338, 267, 55, 34, 'MPW芯片流片服务报价单', '176', 'QD022022-070', '2022-12-15', '2023-05-30', 52, NULL, 515000.0000, 11441, '刘晨光', 0, 11431, NULL, '2024-11-04 10:36:15');
INSERT INTO `tb_contract_bak` VALUES (339, 132, 55, 34, '高性能EDA云服务多目标芯片（MPW)流片合同', '186', 'QD022022-061', '2022-10-17', '2023-01-17', 52, NULL, 200000.0000, 11441, '刘晨光', 0, 11431, NULL, '2024-11-04 10:36:15');
INSERT INTO `tb_contract_bak` VALUES (340, 268, 55, 34, '多目标芯片（MPW）流片合同', '187', 'QD022023-011', '2023-01-03', '2024-01-03', 52, NULL, 181880.0000, 11441, '刘晨光', 0, 11431, NULL, '2024-11-04 10:36:15');
INSERT INTO `tb_contract_bak` VALUES (341, 169, 55, 34, '高性能EDA云服务工程批流片合同', '189', 'QD022023-022', '2023-02-10', '2023-06-10', 52, NULL, 1965000.0000, 11441, '刘晨光', 0, 11431, NULL, '2024-11-04 10:36:15');
INSERT INTO `tb_contract_bak` VALUES (342, 269, 55, 39, '鹏城国家实验室服务采购合同', '195', 'QD012023-003', '2023-03-31', '2024-03-31', 53, NULL, 400000.0000, 11439, '于江敏', 0, 11434, NULL, '2024-11-04 10:36:15');
INSERT INTO `tb_contract_bak` VALUES (343, 267, 55, 39, '数字电路设计平台', '196', 'QD022023-026', '2023-04-18', '2024-04-18', 52, NULL, 515000.0000, 11441, '刘晨光', 0, 11431, NULL, '2024-11-04 10:36:15');
INSERT INTO `tb_contract_bak` VALUES (344, 160, 55, 37, '服务器租赁', '197', 'QD012023-004', '2023-03-08', '2024-03-08', 53, NULL, 15000.0000, 11436, '王海庆', 0, 11434, NULL, '2024-11-04 10:36:15');
INSERT INTO `tb_contract_bak` VALUES (345, 135, 55, 37, '服务器租赁（增加2台）', '200', 'SDXHW-2023030ZKXY', '2023-03-04', '2023-08-14', 52, NULL, 40000.0000, 11441, '刘晨光', 0, 11431, NULL, '2024-11-04 10:36:15');
INSERT INTO `tb_contract_bak` VALUES (346, 182, 55, 39, '商务条款变更补充协议', '204', 'QD022023-036', '2023-05-15', '2023-10-20', 52, NULL, 30000.0000, 11441, '刘晨光', 0, 11431, NULL, '2024-11-04 10:36:15');
INSERT INTO `tb_contract_bak` VALUES (347, 175, 55, 37, '服务器租赁', '206', 'QD012023-005', '2023-05-16', '2023-11-15', 53, NULL, 55000.0000, 11436, '王海庆', 0, 11434, NULL, '2024-11-04 10:36:15');
INSERT INTO `tb_contract_bak` VALUES (348, 176, 55, 70, '授权委托书', '207', 'QD012023-006', '2023-05-01', '2024-05-01', 52, NULL, 0.0000, 11438, '冯帆', 0, 11431, NULL, '2024-11-04 10:36:15');
INSERT INTO `tb_contract_bak` VALUES (349, 166, 55, 38, '封装设计服务单', '209', 'QD032023-006', '2023-05-01', '2024-05-01', 52, NULL, 35000.0000, 11459, '陈延辉', 0, 11431, NULL, '2024-11-04 10:36:15');
INSERT INTO `tb_contract_bak` VALUES (350, 160, 55, 37, '服务器租赁', '212', 'QD012023-008', '2023-06-22', '2024-06-21', 53, NULL, 10000.0000, 11436, '王海庆', 0, 11434, NULL, '2024-11-04 10:36:15');
INSERT INTO `tb_contract_bak` VALUES (351, 132, 55, 34, '多项目芯片（MPW)流片合同', '215', 'QD032023-008', '2023-08-11', '2024-08-11', 52, NULL, 645000.0000, 11459, '陈延辉', 0, 11431, NULL, '2024-11-04 10:36:15');
INSERT INTO `tb_contract_bak` VALUES (352, 135, 55, 37, '服务器租赁', '217', 'QD012023-009', '2023-08-15', '2024-08-14', 53, NULL, 260000.0000, 11436, '王海庆', 0, 11434, NULL, '2024-11-04 10:36:15');
INSERT INTO `tb_contract_bak` VALUES (353, 270, 55, 34, '流片服务', '227', 'QD022023-052', '2023-11-03', '2024-11-03', 52, NULL, 280000.0000, 11441, '刘晨光', 0, 11431, NULL, '2024-11-04 10:36:15');
INSERT INTO `tb_contract_bak` VALUES (354, 103, 55, 34, '高性能EDAF云服务MPW流片', '235', 'QD032023-018', '2023-08-01', '2024-08-01', 52, NULL, 1452324.0000, 11460, '刘朋辉', 0, 11431, NULL, '2024-11-04 10:36:15');
INSERT INTO `tb_contract_bak` VALUES (355, 103, 55, 34, '高性能EDAF云服务MPW流片', '236', 'QD032023-019', '2023-09-11', '2024-09-10', 52, NULL, 210000.0000, 11460, '刘朋辉', 0, 11431, NULL, '2024-11-04 10:36:15');
INSERT INTO `tb_contract_bak` VALUES (356, 271, 55, 34, '高性能EDAF云服务MPW流片', '241', '2023121401', '2023-11-01', '2024-10-30', 52, NULL, 263000.0000, 11460, '刘朋辉', 0, 11431, NULL, '2024-11-04 10:36:15');
INSERT INTO `tb_contract_bak` VALUES (357, 155, 55, 65, '青岛集成电路人才创新培养联盟申请', '245', 'QD052024-001', '2024-01-12', '2025-01-12', 52, NULL, 5000.0000, 11456, '李欢欢', 0, 11431, NULL, '2024-11-04 10:36:15');
INSERT INTO `tb_contract_bak` VALUES (358, 272, 55, 37, '机房UPS合作协议', '246', 'QD012024-001', '2023-04-01', '2024-03-31', 53, NULL, 3000.0000, 11436, '王海庆', 0, 11434, NULL, '2024-11-04 10:36:15');
INSERT INTO `tb_contract_bak` VALUES (359, 156, 55, 39, 'Synopsys', '247', 'QD022023-005', '2022-11-13', '2023-01-03', 52, NULL, 10200.0000, 11441, '刘晨光', 0, 11431, NULL, '2024-11-04 10:36:15');
INSERT INTO `tb_contract_bak` VALUES (360, 269, 55, 39, '数字电路平台/商务需求响应', '249', '20240530', '2024-07-29', '2025-07-29', 53, '2024-09-10', 40000.0000, 11439, '于江敏', 0, 11434, NULL, '2024-11-04 17:09:02');
INSERT INTO `tb_contract_bak` VALUES (361, 183, 55, 34, '芯片流片报价单', '250', 'QD022024-005', '2024-01-31', '2024-12-30', 52, NULL, 63280.0000, 11441, '刘晨光', 0, 11431, NULL, '2024-11-04 10:36:15');
INSERT INTO `tb_contract_bak` VALUES (362, 273, 55, 34, '政府采购合同（服务类）', '255', 'QD022024-010', '2024-03-01', '2024-07-31', 52, NULL, 940000.0000, 11441, '刘晨光', 0, 11431, NULL, '2024-11-04 10:36:15');
INSERT INTO `tb_contract_bak` VALUES (363, 162, 55, 34, '读出电路加工合同', '260', 'QD022024-016', '2024-03-29', '2025-03-28', 52, NULL, 3418607.1900, 11441, '刘晨光', 0, 11431, NULL, '2024-11-04 10:36:15');
INSERT INTO `tb_contract_bak` VALUES (364, 166, 55, 38, '封装技术服务', '263', 'QD022024-020', '2024-04-18', '2025-04-17', 52, NULL, 16880.0000, 11447, '王雨欣', 0, 11431, NULL, '2024-11-04 10:36:15');
INSERT INTO `tb_contract_bak` VALUES (365, 152, 55, 68, '芯片设计平台部署', '265', 'QD022024-023', '2024-04-30', '2025-04-29', 52, NULL, 70000.0000, 11447, '王雨欣', 0, 11431, NULL, '2024-11-04 10:36:15');
INSERT INTO `tb_contract_bak` VALUES (366, 135, 55, 37, 'EDA数据中心服务', '266', 'SDXHW-2022120ZKXY', '2022-08-15', '2023-08-14', 53, NULL, 23000.0000, 11436, '王海庆', 0, 11434, NULL, '2024-11-04 10:36:15');
INSERT INTO `tb_contract_bak` VALUES (367, 175, 55, 37, 'EDA云平台服务协议书', '267', 'QD012024-003', '2024-07-01', '2025-07-01', 53, '2024-07-05', 125000.0000, 11439, '于江敏', 0, 11434, NULL, '2024-11-04 10:36:15');
INSERT INTO `tb_contract_bak` VALUES (368, 167, 55, 37, '服务器租赁', '268', 'QD01-2024004', '2024-07-01', '2025-06-30', 53, '2024-08-15', 29000.0000, 11439, '于江敏', 0, 11434, NULL, '2024-11-04 10:36:15');
INSERT INTO `tb_contract_bak` VALUES (369, 178, 55, 68, 'PDK开发', '270', 'QD022024-035', '2024-08-23', '2026-08-24', 52, NULL, 0.0000, 11447, '王雨欣', 0, 11431, NULL, '2024-11-04 10:36:15');
INSERT INTO `tb_contract_bak` VALUES (370, 135, 55, 37, '服务器租赁', '271', 'QD01-2024005', '2024-08-15', '2025-08-14', 53, '2024-09-13', 154500.0000, 11439, '于江敏', 0, 11434, NULL, '2024-11-04 10:36:15');
INSERT INTO `tb_contract_bak` VALUES (371, 173, 55, 34, '流片加工（委托）合同', '273', 'QD022024-036', '2024-09-26', '2025-09-25', 71, '2024-10-30', 890000.0000, 11447, '王雨欣', 0, 11464, NULL, '2024-11-04 10:36:15');
INSERT INTO `tb_contract_bak` VALUES (372, 134, 55, 34, 'MPW晶圆流片加工', '274', 'QD022024-037', '2024-10-08', '2025-10-07', 71, '2024-11-29', 4101000.0000, 11447, '王雨欣', 0, 11464, NULL, '2024-11-04 10:36:15');
INSERT INTO `tb_contract_bak` VALUES (373, 134, 55, 34, 'MPW晶圆流片加工', '275', 'QD022024-038', '2024-10-08', '2025-10-07', 71, '2024-11-12', 1120000.0000, 11447, '王雨欣', 0, 11464, NULL, '2024-11-04 10:36:15');
INSERT INTO `tb_contract_bak` VALUES (374, 177, 55, 68, 'PDK开发及QA服务', '276', 'QD022024-040', '2024-10-10', '2025-10-09', 53, '2024-11-25', 1505730.0000, 11447, '王雨欣', 0, 11464, NULL, '2024-11-04 10:36:15');
INSERT INTO `tb_contract_bak` VALUES (375, 274, 54, 40, '礼品采购合同', '199', 'QD072022-001', '2022-02-24', '2023-03-24', 53, NULL, 25254.8000, 11430, '陈柳', 0, 11431, NULL, '2024-11-04 10:36:27');
INSERT INTO `tb_contract_bak` VALUES (376, 275, 54, 65, '存款协议', '200', 'QD102022-001', '2022-02-28', '2023-02-27', 53, NULL, 500000.0000, 11464, '孙誉畅', 0, 11431, NULL, '2024-11-04 10:36:27');
INSERT INTO `tb_contract_bak` VALUES (377, 276, 54, 65, '安防监控工程合同', '201', 'QDHSY-20220210ZKXY', '2022-03-09', '2023-03-01', 53, NULL, 16285.0000, 11436, '王海庆', 0, 11431, NULL, '2024-11-04 10:36:27');
INSERT INTO `tb_contract_bak` VALUES (378, 277, 54, 40, '天玥网络安全审计系统', '202', 'YCWL-20220-002', '2022-03-25', '2023-03-25', 53, NULL, 70000.0000, 11436, '王海庆', 0, 11431, NULL, '2024-11-04 10:36:27');
INSERT INTO `tb_contract_bak` VALUES (379, 278, 54, 40, '电子防潮柜', '215', 'QD052022-008', '2022-04-24', '2023-04-24', 53, NULL, 31500.0000, 11441, '刘晨光', 0, 11431, NULL, '2024-11-04 10:36:27');
INSERT INTO `tb_contract_bak` VALUES (380, 231, 54, 34, 'SMIC180nm BCDM Fullmask流片服务', '217', '20220425-A', '2022-04-25', '2022-08-24', 53, NULL, 990000.0000, 11441, '刘晨光', 0, 11431, NULL, '2024-11-04 10:36:27');
INSERT INTO `tb_contract_bak` VALUES (381, 231, 54, 34, 'EFSPC项目 XFAB XH035 MPW流片服务协议', '231', 'QD20220429-A', '2022-08-26', '2022-04-29', 53, NULL, 148136.0700, 11441, '刘晨光', 0, 11431, NULL, '2024-11-04 10:36:27');
INSERT INTO `tb_contract_bak` VALUES (382, 279, 54, 65, '图腾机柜采购施工合同', '233', 'JGGXDG-20220-010', '2022-09-09', '2023-09-09', 53, NULL, 24521.7500, 11436, '王海庆', 0, 11431, NULL, '2024-11-04 10:36:27');
INSERT INTO `tb_contract_bak` VALUES (383, 280, 54, 65, '地面改造施工合同', '238', 'QD072022-003', '2022-09-20', '2023-09-20', 53, NULL, 7200.0000, 11431, '张静', 0, 11431, NULL, '2024-11-04 10:36:27');
INSERT INTO `tb_contract_bak` VALUES (384, 281, 54, 65, '北京市房屋租赁合同', '239', 'QD082022-001', '2022-09-11', '2023-06-01', 53, NULL, 14000.0000, 11461, '韩珊珊', 0, 11431, NULL, '2024-11-04 10:36:27');
INSERT INTO `tb_contract_bak` VALUES (385, 231, 54, 34, 'SMIC 180nm BCDM Fullmask流片服务协议', '248', 'QD022022-044', '2022-07-25', '2023-07-25', 53, NULL, 990000.0000, 11441, '刘晨光', 0, 11431, NULL, '2024-11-04 10:36:27');
INSERT INTO `tb_contract_bak` VALUES (386, 282, 54, 65, '线路改造施工合同', '251', 'QD072022-004', '2022-10-10', '2023-01-10', 53, NULL, 13600.0000, 11431, '张静', 0, 11431, NULL, '2024-11-04 10:36:27');
INSERT INTO `tb_contract_bak` VALUES (387, 283, 54, 65, '高顿咨询服务方案', '255', 'HT-2022-11-10-6926', '2022-12-01', '2023-11-30', 53, NULL, 29800.0000, 11463, '王钧仟', 0, 11431, NULL, '2024-11-04 10:36:27');
INSERT INTO `tb_contract_bak` VALUES (388, 284, 54, 65, '北京市房屋租赁合同', '256', 'QD102022-006', '2022-09-01', '2023-08-31', 53, NULL, 144000.0000, 11463, '王钧仟', 0, NULL, NULL, '2024-11-04 10:36:27');
INSERT INTO `tb_contract_bak` VALUES (389, 231, 54, 34, 'XFAB XO035 SLM流片服务协议', '257', 'QD022022-063', '2022-11-25', '2023-12-15', 53, NULL, 1140000.0000, 11441, '刘晨光', 0, 11431, NULL, '2024-11-04 10:36:27');
INSERT INTO `tb_contract_bak` VALUES (390, 285, 54, 65, '物联安防系统采购', '269', 'QD072022-005', '2022-05-01', '2023-05-01', 53, NULL, 16450.0000, 11430, '陈柳', 0, 11431, NULL, '2024-11-04 10:36:27');
INSERT INTO `tb_contract_bak` VALUES (391, 286, 54, 69, '专家聘用协议', '270', 'QD022022-075', '2022-12-01', '2023-05-31', 53, NULL, 84000.0000, 11441, '刘晨光', 0, 11431, NULL, '2024-11-04 10:36:27');
INSERT INTO `tb_contract_bak` VALUES (392, 231, 54, 34, 'XFAB XT06 MLM流片服务协议', '272', 'QD022023-003', '2022-11-25', '2023-11-25', 53, NULL, 2398447.6000, 11441, '刘晨光', 0, 11431, NULL, '2024-11-04 10:36:27');
INSERT INTO `tb_contract_bak` VALUES (393, 287, 54, 69, '专家聘用协议', '275', 'QD022023-010', '2023-01-01', '2023-06-30', 53, NULL, 150000.0000, 11441, '刘晨光', 0, 11431, NULL, '2024-11-04 10:36:27');
INSERT INTO `tb_contract_bak` VALUES (394, 231, 54, 34, 'XFAB XT06A0322 Fullmask流片服务', '280', 'QD022023-009', '2023-01-16', '2024-01-16', 53, NULL, 398946.3400, 11441, '刘晨光', 0, 11431, NULL, '2024-11-04 10:36:27');
INSERT INTO `tb_contract_bak` VALUES (395, 288, 54, 65, '展厅装修付款合同', '290', 'QD062023-002', '2023-05-04', '2024-05-04', 53, NULL, 20000.0000, 11430, '陈柳', 0, 11431, NULL, '2024-11-04 10:36:27');
INSERT INTO `tb_contract_bak` VALUES (396, 226, 54, 41, '参展合同补充协议', '292', 'QD052023-005', '2023-05-17', '2023-05-19', 53, NULL, 0.0000, 11454, '徐晓烨', 0, 11431, NULL, '2024-11-04 10:36:27');
INSERT INTO `tb_contract_bak` VALUES (397, 243, 54, 65, '智联招聘协议', '299', 'C202306097689639', '2023-07-14', '2024-07-13', 53, NULL, 8680.0000, 11432, '李雪燕', 0, 11431, NULL, '2024-11-04 10:36:27');
INSERT INTO `tb_contract_bak` VALUES (398, 224, 54, 65, 'BOss直聘服务合同', '300', 'EQD02306121093050', '2023-07-31', '2024-07-31', 53, NULL, 14818.0000, 11432, '李雪燕', 0, 11431, NULL, '2024-11-04 10:36:27');
INSERT INTO `tb_contract_bak` VALUES (399, 240, 54, 62, '芯片后端设计服务', '301', 'QD022023-041', '2023-03-01', '2024-02-01', 53, NULL, 550000.0000, 11441, '刘晨光', 0, 11431, NULL, '2024-11-04 10:36:27');
INSERT INTO `tb_contract_bak` VALUES (400, 289, 54, 65, '投标保证保险投保单', '305', '20230717', '2023-07-17', '2024-07-17', 53, NULL, 4000.0000, 11455, '刘晓璐', 0, 11431, NULL, '2024-11-04 10:36:27');
INSERT INTO `tb_contract_bak` VALUES (401, 290, 54, 40, '激光打印机采购合同', '307', '2023/8/3', '2023-05-01', '2024-07-01', 53, NULL, 7056.0000, 11441, '刘晨光', 0, 11431, NULL, '2024-11-04 10:36:27');
INSERT INTO `tb_contract_bak` VALUES (402, 145, 54, 62, '版图设计与验证服务', '308', 'QD052023-008', '2023-08-01', '2023-10-31', 53, NULL, 304000.0000, 11456, '李欢欢', 0, 11431, NULL, '2024-11-04 10:36:27');
INSERT INTO `tb_contract_bak` VALUES (403, 291, 54, 34, '云平台教学报名功能开发技术服务', '313', 'QD022023-009', '2023-08-16', '2023-09-15', 53, NULL, 4000.0000, 11456, '李欢欢', 0, 11431, NULL, '2024-11-04 10:36:27');
INSERT INTO `tb_contract_bak` VALUES (404, 292, 54, 65, '人力服务外包合同', '320', 'QD062023-005', '2023-09-01', '2025-08-31', 53, NULL, 0.0000, 11430, '陈柳', 0, 11431, NULL, '2024-11-04 10:36:27');
INSERT INTO `tb_contract_bak` VALUES (405, 293, 54, 40, 'ER34615采购', '325', 'nx23100127', '2023-01-01', '2024-01-01', 53, NULL, 1400.0000, 11441, '刘晨光', 0, 11431, NULL, '2024-11-04 10:36:27');
INSERT INTO `tb_contract_bak` VALUES (406, 294, 54, 65, '房租租赁合同', '327', 'QD022023-051', '2023-10-31', '2024-04-30', 53, NULL, 2996.0000, 11442, '孙旺', 0, 11431, NULL, '2024-11-04 10:36:27');
INSERT INTO `tb_contract_bak` VALUES (407, 295, 54, 40, '振动传感器底座', '331', 'HT17052023111505', '2023-11-15', '2024-11-15', 53, NULL, 3100.0000, 11447, '王雨欣', 0, 11431, NULL, '2024-11-04 10:36:27');
INSERT INTO `tb_contract_bak` VALUES (408, 275, 54, 65, '协定存款合同', '339', 'QD092024-001', '2024-03-15', '2025-03-15', 53, NULL, 500000.0000, 11464, '孙誉畅', 0, 11431, NULL, '2024-11-04 10:36:27');
INSERT INTO `tb_contract_bak` VALUES (409, 296, 54, 69, '咨询顾问聘用协议-王兴敏及保密协议', '342', 'QD062024-002', '2024-01-24', '2024-12-31', 53, NULL, 0.0000, 11430, '陈柳', 0, 11431, NULL, '2024-11-04 10:36:27');
INSERT INTO `tb_contract_bak` VALUES (410, 284, 54, 65, '租房合同', '347', 'QD092024-002', '2024-01-01', '2024-12-31', 53, NULL, 144000.0000, 11463, '王钧仟', 0, 11431, NULL, '2024-11-04 10:36:27');
INSERT INTO `tb_contract_bak` VALUES (411, 297, 54, 40, '芯片购销合同', '349', 'QD052024-002', '2024-03-01', '2024-03-08', 53, NULL, 2935.5000, 11455, '刘晓璐', 0, 11431, NULL, '2024-11-04 10:36:27');
INSERT INTO `tb_contract_bak` VALUES (412, 298, 54, 34, '芯片委托加工订单及保密协议', '355', 'QD022024-011', '2024-03-04', '2024-03-31', 53, NULL, 69753.7700, 11441, '刘晨光', 0, 11431, NULL, '2024-11-04 10:36:27');
INSERT INTO `tb_contract_bak` VALUES (413, 299, 54, 65, '协定存款合同', '356', 'QD092024-004', '2024-04-05', '2025-04-05', 53, NULL, 100000.0000, 11464, '孙誉畅', 0, NULL, NULL, '2024-11-04 10:36:27');
INSERT INTO `tb_contract_bak` VALUES (414, 300, 54, 41, '电子信息类专业教学论坛', '357', 'QD052024-008', '2024-03-28', '2024-04-13', 53, NULL, 10000.0000, 11456, '李欢欢', 0, 11431, NULL, '2024-11-04 10:36:27');
INSERT INTO `tb_contract_bak` VALUES (415, 301, 54, 40, '供需合同', '360', 'QD052024-007', '2024-03-28', '2024-04-17', 53, NULL, 1332.0000, 11455, '刘晓璐', 0, 11431, NULL, '2024-11-04 10:36:27');
INSERT INTO `tb_contract_bak` VALUES (416, 294, 54, 65, '房屋租赁协议', '362', 'QD022024-024', '2024-04-30', '2024-10-29', 53, NULL, 6366.5000, 11447, '王雨欣', 0, 11431, NULL, '2024-11-04 10:36:27');
INSERT INTO `tb_contract_bak` VALUES (417, 302, 54, 65, '高新技术企业服务合同', '363', 'QD092024-005', '2024-05-10', '2024-12-31', 53, NULL, 17000.0000, 11463, '王钧仟', 0, 11431, NULL, '2024-11-04 10:36:27');
INSERT INTO `tb_contract_bak` VALUES (418, 303, 54, 65, '高新技术认定专项审计业务约定书', '364', 'QD092024-006', '2024-05-10', '2024-12-31', 53, NULL, 15000.0000, 11463, '王钧仟', 0, 11431, NULL, '2024-11-04 10:36:27');
INSERT INTO `tb_contract_bak` VALUES (419, 304, 54, 69, '专家顾问聘用协议及保密协议', '368', 'QD062024-006', '2022-02-24', '2022-02-25', 53, NULL, 0.0000, 11430, '陈柳', 0, 11431, NULL, '2024-11-04 10:38:58');
INSERT INTO `tb_contract_bak` VALUES (420, 231, 54, 34, 'MPW芯片项目拼版流片服务', '369', 'QD022024-027', '2024-05-27', '2026-05-27', 53, '2024-06-24', 299000.0000, 11447, '王雨欣', 0, 11464, NULL, '2024-11-04 10:36:27');
INSERT INTO `tb_contract_bak` VALUES (421, 305, 54, 65, '智联招聘协议', '372', 'QD062024-005', '2024-07-27', '2025-07-26', 53, NULL, 8680.0000, 11432, '李雪燕', 0, 11431, NULL, '2024-11-04 10:36:27');
INSERT INTO `tb_contract_bak` VALUES (422, 306, 54, 40, '液晶高清一体机采购合同', '377', 'QD022023-031', '2023-09-01', '2023-09-05', 53, NULL, 4600.0000, 11455, '刘晓璐', 0, 11431, NULL, '2024-11-04 10:36:27');
INSERT INTO `tb_contract_bak` VALUES (423, 307, 54, 68, 'SRAM电路版图设计', '192-1', 'QD022023-030', '2023-03-30', '2024-03-30', 53, NULL, 35000.0000, 11441, '刘晨光', 0, 11431, NULL, '2024-11-04 10:36:27');
INSERT INTO `tb_contract_bak` VALUES (424, 225, 54, 65, '人才住房配租协议', '381', 'QD062024-004', '2024-07-07', '2025-07-06', 53, NULL, 120382.5000, 11431, '张静', 0, 11431, NULL, '2024-11-04 10:36:27');
INSERT INTO `tb_contract_bak` VALUES (425, 308, 54, 38, '封装技术服务合同', '383', 'QD022024-021', '2024-04-11', '2026-04-10', 53, NULL, 8280.0000, 11447, '王雨欣', 0, 11431, NULL, '2024-11-04 10:36:27');
INSERT INTO `tb_contract_bak` VALUES (426, 309, 54, 69, '专家聘用协议-朱军', '384', 'QD092023-003', '2023-03-01', '2024-12-31', 53, NULL, 0.0000, 11463, '王钧仟', 0, 11431, NULL, '2024-11-04 10:36:27');
INSERT INTO `tb_contract_bak` VALUES (427, 106, 54, 34, '晶圆流片技术服务', '388', 'QD022024-041', '2024-10-12', '2025-10-11', 53, NULL, 4000000.0000, 11447, '王雨欣', 0, 11431, NULL, '2024-11-04 10:36:27');
INSERT INTO `tb_contract_bak` VALUES (428, 310, 54, 65, '租房合同', '390', 'QD022024-045', '2024-10-29', '2025-01-28', 53, NULL, 28980.0000, 11447, '王雨欣', 0, 11431, NULL, '2024-11-04 10:36:27');
INSERT INTO `tb_contract_bak` VALUES (429, 143, 55, 68, 'EDA工具租赁 技术服务合同', '284', '24KY-F-137', '2025-01-01', '2025-12-31', 53, '2025-03-21', 133000.0000, 11434, '邹晓栋', 0, 11464, NULL, '2024-12-06 10:28:19');
INSERT INTO `tb_contract_bak` VALUES (430, 333, 55, 34, '高性能EDA云服务MPW流片合同', '285', 'QD022024-052', '2024-12-11', '2025-12-10', 53, '2024-12-20', 30000.0000, 11447, '王雨欣', 0, 11464, NULL, '2024-12-11 09:29:13');
INSERT INTO `tb_contract_bak` VALUES (431, 217, 54, 68, '高性能集成电路云服务协议', '401', 'QD022024-053', '2024-12-16', '2025-12-15', 53, '2024-12-18', 81900.0000, 11447, '王雨欣', 0, 11447, NULL, '2024-12-17 10:33:08');
INSERT INTO `tb_contract_bak` VALUES (432, 334, 54, 34, 'SMIC 180nm M/S MPW工艺开发及流片读物协议', '391', 'QD022024-044', '2024-11-04', '2025-11-03', 53, '2024-11-08', 98800.0000, 11447, '王雨欣', 0, NULL, NULL, '2024-12-18 16:29:10');
INSERT INTO `tb_contract_bak` VALUES (433, 334, 54, 34, 'SMIC 180nm BCDE MPW工艺开发及流片服务协议', '393', 'QD022024-046', '2024-11-14', '2025-11-13', 53, '2024-11-26', 148200.0000, 11447, '王雨欣', 0, NULL, NULL, '2024-12-18 16:33:27');
INSERT INTO `tb_contract_bak` VALUES (434, 166, 55, 38, '封装技术服务', '282', 'QD022024-047', '2024-11-25', '2025-11-24', 53, '2025-03-13', 28000.0000, 11447, '王雨欣', 0, 11464, NULL, '2024-12-18 16:51:18');
INSERT INTO `tb_contract_bak` VALUES (435, 335, 54, 38, '封装加工合同', '394', 'QD022024-048', '2024-11-21', '2025-11-20', 53, '2024-11-28', 25500.0000, 11447, '王雨欣', 0, NULL, NULL, '2024-12-18 17:03:07');
INSERT INTO `tb_contract_bak` VALUES (436, 153, 55, 34, '高性能EDA云服务工程批流片合同', '281', 'QD022024-049', '2024-11-21', '2025-11-20', 71, '2024-11-26', 80000.0000, 11447, '王雨欣', 0, NULL, NULL, '2024-12-18 17:06:38');
INSERT INTO `tb_contract_bak` VALUES (437, 334, 54, 34, 'retooling订单', '398', 'QD022024-051', '2024-12-02', '2025-12-01', 53, '2024-12-11', 18000.0000, 11447, '王雨欣', 0, NULL, NULL, '2024-12-18 17:13:06');
INSERT INTO `tb_contract_bak` VALUES (438, 336, 54, 39, '403-硬件采购合同（轮腾）', '403', 'QD01-2024008', '2024-12-22', '2027-12-21', 53, '2025-01-21', 136300.0000, 11439, '于江敏', 0, 11464, NULL, '2024-12-24 10:32:12');
INSERT INTO `tb_contract_bak` VALUES (439, 337, 55, 39, '西安理工大学采购合同', '287', 'QD052024-018', '2024-12-13', '2034-12-12', 71, NULL, 386000.0000, 11456, '李欢欢', 0, 11456, NULL, '2025-01-03 16:03:47');
INSERT INTO `tb_contract_bak` VALUES (440, 338, 54, 69, '专家聘用协议', '397', 'QD052024-016', '2024-11-18', '2024-11-18', 53, '2024-12-02', 2080.0000, 11455, '刘晓璐', 0, 11455, NULL, '2025-01-03 16:07:37');
INSERT INTO `tb_contract_bak` VALUES (441, 339, 54, 69, '专家聘用协议', '396', 'QD052024-015', '2024-11-18', '2024-11-18', 53, '2024-12-02', 2080.0000, 11455, '刘晓璐', 0, NULL, NULL, '2025-01-03 16:10:18');
INSERT INTO `tb_contract_bak` VALUES (442, 340, 54, 70, '团体客户销售协议', '405', 'QD052024-022', '2024-12-29', '2024-12-31', 53, '2025-01-08', 25904.0000, 11455, '刘晓璐', 0, 11455, NULL, '2025-01-03 16:15:23');
INSERT INTO `tb_contract_bak` VALUES (443, 341, 54, 39, '高性能集成电路云服务协议', '123-4', 'QD022022-001', '2024-01-12', '2024-01-12', 53, '2024-01-12', 300000.0000, 11439, '于江敏', 0, NULL, NULL, '2025-01-03 16:51:20');
INSERT INTO `tb_contract_bak` VALUES (445, 181, 55, 34, '高性能集成电路云服务协议工程批流片合同', '288', 'QD052024-019', '2024-12-12', '2025-10-17', 53, '2024-12-27', 2600000.0000, 11456, '李欢欢', 0, 11456, NULL, '2025-01-03 16:51:20');
INSERT INTO `tb_contract_bak` VALUES (446, 343, 55, 34, 'SMIC 0.18um M/S retooling', '280', 'QD052024-014', '2024-12-03', '2025-01-31', 53, '2024-12-12', 18000.0000, 11456, '李欢欢', 0, NULL, NULL, '2025-01-07 17:12:38');
INSERT INTO `tb_contract_bak` VALUES (447, 344, 54, 69, '专家聘用协议', '399', 'QD052024-017', '2024-11-16', '2024-11-16', 53, '2024-12-11', 1500.0000, 11456, '李欢欢', 0, NULL, NULL, '2025-01-07 17:16:23');
INSERT INTO `tb_contract_bak` VALUES (448, 345, 54, 34, 'ARM32F310项目hhg90 efash流片服务协议', '404', 'QD052024-021', '2024-12-25', '2025-08-13', 53, '2024-12-30', 2574000.0000, 11456, '李欢欢', 0, NULL, NULL, '2025-01-07 17:23:25');
INSERT INTO `tb_contract_bak` VALUES (449, 346, 54, 64, '技术开发委托合同', '402', 'QD052024-020', '2024-12-05', '2025-01-24', 71, '2024-12-25', 50000.0000, 11456, '李欢欢', 0, NULL, NULL, '2025-01-07 17:35:17');
INSERT INTO `tb_contract_bak` VALUES (450, 347, 54, 70, '保密协议', '219', 'QD052024-013', '2024-10-22', '2027-10-20', 52, NULL, 0.0000, 11456, '李欢欢', 0, NULL, NULL, '2025-01-07 17:41:17');
INSERT INTO `tb_contract_bak` VALUES (451, 348, 55, 62, '委托开发合同', '290', 'QD022025-003', '2025-01-09', '2026-01-08', 53, '2025-01-13', 42000.0000, 11447, '王雨欣', 0, NULL, NULL, '2025-01-13 10:07:05');
INSERT INTO `tb_contract_bak` VALUES (452, 182, 55, 68, '委托技术开发合同', '289', 'QD022024-054', '2025-01-10', '2026-01-09', 53, '2025-03-21', 60000.0000, 11447, '王雨欣', 0, 11464, NULL, '2025-01-14 14:45:57');
INSERT INTO `tb_contract_bak` VALUES (453, 166, 55, 38, '封装技术服务合同', '291', 'QD022025-001', '2025-01-21', '2026-01-20', 53, '2025-03-13', 8690.0000, 11447, '王雨欣', 0, 11464, NULL, '2025-02-21 09:50:57');
INSERT INTO `tb_contract_bak` VALUES (454, 308, 54, 38, '封装合同', '408', 'QD022025-002', '2025-01-17', '2026-01-16', 53, '2025-01-21', 6690.0000, 11447, '王雨欣', 0, NULL, NULL, '2025-02-21 09:53:11');
INSERT INTO `tb_contract_bak` VALUES (455, 348, 55, 68, '委托技术开发合同', '290', 'QD022025-003', '2025-01-13', '2026-01-12', 53, '2025-01-13', 42000.0000, 11447, '王雨欣', 0, NULL, NULL, '2025-02-21 10:04:39');
INSERT INTO `tb_contract_bak` VALUES (456, 348, 54, 70, '光罩及配套针卡转让协议', '407', 'QD022025-004', '2025-01-10', '2026-01-09', 53, '2025-01-21', 40000.0000, 11447, '王雨欣', 0, NULL, NULL, '2025-02-21 10:23:49');
INSERT INTO `tb_contract_bak` VALUES (457, 152, 55, 68, '服务合同', '292', 'QD022025-005', '2025-01-20', '2026-01-19', 53, '2025-03-07', 70000.0000, 11447, '王雨欣', 0, 11464, NULL, '2025-02-21 10:26:02');
INSERT INTO `tb_contract_bak` VALUES (458, 310, 54, 70, '住房租赁合同', '409', 'QD022025-006', '2025-01-20', '2026-01-19', 53, '2025-01-21', 15040.0000, 11447, '王雨欣', 0, NULL, NULL, '2025-02-21 10:28:20');
INSERT INTO `tb_contract_bak` VALUES (459, 203, 54, 34, '流片服务合同', '411', 'QD022025-007', '2025-01-20', '2026-01-20', 53, '2025-02-24', 330000.0000, 11447, '王雨欣', 0, 11464, NULL, '2025-02-21 10:30:08');
INSERT INTO `tb_contract_bak` VALUES (460, 169, 55, 70, '光罩及配套针卡转让协议', '295', 'QD022025-008', '2025-03-04', '2026-03-04', 53, '2025-03-04', 45000.0000, 11447, '王雨欣', 0, NULL, NULL, '2025-03-11 17:04:34');
INSERT INTO `tb_contract_bak` VALUES (461, 169, 55, 70, '光罩及配套针卡转让协议', '295', 'QD022025-008', '2025-03-28', '2026-02-27', 53, '2025-03-04', 45000.0000, 11447, '王雨欣', 0, NULL, NULL, '2025-05-26 17:02:35');
INSERT INTO `tb_contract_bak` VALUES (462, 254, 54, 38, '芯片技术服务合同', '413', 'QD022025-009', '2025-02-21', '2025-03-05', 53, '2025-03-25', 6784.0000, 11447, '王雨欣', 0, NULL, NULL, '2025-05-26 17:05:27');
INSERT INTO `tb_contract_bak` VALUES (463, 310, 54, 70, '大客户公寓使用合同', '414', 'QD022025-010', '2025-04-07', '2025-06-06', 53, '2025-04-11', 15040.0000, 11447, '王雨欣', 0, NULL, NULL, '2025-05-26 17:07:40');
INSERT INTO `tb_contract_bak` VALUES (464, 356, 55, 34, '技术服务合同', '297', 'QD022025-011', '2025-04-15', '2026-12-31', 52, NULL, 680000.0000, 11447, '王雨欣', 0, NULL, NULL, '2025-05-26 17:14:55');
INSERT INTO `tb_contract_bak` VALUES (465, 357, 54, 70, '采购合同', '416', 'QD022025-012', '2025-04-23', '2026-04-22', 53, '2025-05-09', 395500.0000, 11447, '王雨欣', 0, NULL, NULL, '2025-05-26 17:18:08');
INSERT INTO `tb_contract_bak` VALUES (466, 358, 54, 70, '房屋租赁合同', '417', 'QD022025-013', '2025-05-04', '2025-06-03', 53, '2025-05-09', 2200.0000, 11447, '王雨欣', 0, NULL, NULL, '2025-05-26 17:22:25');
INSERT INTO `tb_contract_bak` VALUES (467, 334, 54, 34, 'SMIC0.18um BCDM NTO 工艺开发及流片协议', '418', 'QD022025-014', '2025-04-30', '2026-04-30', 53, '2025-05-15', 647488.0000, 11447, '王雨欣', 0, 11464, NULL, '2025-05-28 09:18:57');
INSERT INTO `tb_contract_bak` VALUES (468, 310, 54, 70, '大客户公寓使用合同', '419', 'QD022025-015', '2025-06-07', '2025-08-06', 53, '2025-05-26', 15040.0000, 11447, '王雨欣', 0, NULL, NULL, '2025-05-28 09:21:23');
INSERT INTO `tb_contract_bak` VALUES (469, 333, 55, 34, '高性能EDA云服务MPW流片合同', '299', 'QD022025-017', '2025-05-28', '2026-05-27', 53, '2025-06-18', 60000.0000, 11447, '王雨欣', 0, 11464, NULL, '2025-05-28 16:45:33');

-- ----------------------------
-- Table structure for tb_contract_follow_up
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
) ENGINE = InnoDB AUTO_INCREMENT = 37 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '合同跟进' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of tb_contract_follow_up
-- ----------------------------
INSERT INTO `tb_contract_follow_up` VALUES (12, 17, 11385, '测试内容', 24, '2024-09-02', 44, 49, NULL, NULL, 11385, '2024-09-29 17:11:36', NULL, '2024-09-29 17:11:36', 0);
INSERT INTO `tb_contract_follow_up` VALUES (13, 17, 11385, '测试内容', 24, '2024-09-02', 44, 49, NULL, NULL, 11385, '2024-09-29 17:13:24', NULL, '2024-09-29 17:13:24', 0);
INSERT INTO `tb_contract_follow_up` VALUES (14, 17, 11385, '跟进内容test', NULL, NULL, NULL, 49, NULL, NULL, 11385, '2024-09-29 17:14:44', NULL, '2024-09-29 17:14:44', 0);
INSERT INTO `tb_contract_follow_up` VALUES (15, 19, 11385, 'ceshigegjin', 22, NULL, NULL, 50, NULL, NULL, 11385, '2024-09-30 17:15:13', NULL, '2024-09-30 17:15:13', 0);
INSERT INTO `tb_contract_follow_up` VALUES (16, 22, 11385, '测试跟进', 22, '2024-10-08', 44, 50, NULL, NULL, 11385, '2024-10-08 08:57:21', NULL, '2024-10-08 08:57:21', 0);
INSERT INTO `tb_contract_follow_up` VALUES (17, 22, 11385, 'CEHSI', NULL, NULL, NULL, 50, NULL, NULL, 11385, '2024-10-12 14:43:06', NULL, '2024-10-12 14:43:06', 0);
INSERT INTO `tb_contract_follow_up` VALUES (18, 35, 11385, '测试', 23, '2024-10-15', NULL, 50, NULL, NULL, 11385, '2024-10-15 15:01:50', NULL, '2024-10-15 15:01:50', 0);
INSERT INTO `tb_contract_follow_up` VALUES (19, 36, 11386, '跟进中', NULL, NULL, NULL, 48, NULL, NULL, 11386, '2024-10-17 09:50:41', NULL, '2024-10-17 09:50:41', 0);
INSERT INTO `tb_contract_follow_up` VALUES (20, 59, 11386, '这个客户不行', 23, '2024-10-18', 44, 48, NULL, NULL, 11386, '2024-10-18 09:44:29', NULL, '2024-10-18 09:44:32', 0);
INSERT INTO `tb_contract_follow_up` VALUES (21, 35, 11417, '测试', 23, NULL, NULL, 49, NULL, NULL, 11417, '2024-10-18 15:40:07', NULL, '2024-10-18 15:40:07', 0);
INSERT INTO `tb_contract_follow_up` VALUES (22, 43, 11385, '测试', 23, NULL, NULL, 49, NULL, NULL, 11417, '2025-02-17 10:03:03', NULL, '2024-10-18 15:40:07', 0);
INSERT INTO `tb_contract_follow_up` VALUES (23, 49, 11386, 'ceshi', NULL, NULL, NULL, 49, NULL, NULL, 11386, '2025-02-17 10:19:02', NULL, '2025-02-17 10:19:02', 0);
INSERT INTO `tb_contract_follow_up` VALUES (24, 29, 11385, '123123123123', NULL, '2025-11-18', 96, 48, NULL, NULL, 11385, '2025-11-17 16:25:23', NULL, '2025-11-17 16:25:23', 0);
INSERT INTO `tb_contract_follow_up` VALUES (25, 29, 11385, '123123123123', NULL, '2025-11-18', 96, 48, NULL, NULL, 11385, '2025-11-17 16:26:04', NULL, '2025-11-17 16:26:04', 0);
INSERT INTO `tb_contract_follow_up` VALUES (26, 29, 11385, '123123123123', NULL, '2025-11-18', 96, 48, NULL, NULL, 11385, '2025-11-17 16:26:15', NULL, '2025-11-17 16:26:15', 0);
INSERT INTO `tb_contract_follow_up` VALUES (27, 29, 11385, '123123123123', NULL, '2025-11-18', 96, 48, NULL, NULL, 11385, '2025-11-17 16:26:22', NULL, '2025-11-17 16:26:22', 0);
INSERT INTO `tb_contract_follow_up` VALUES (28, 29, 11385, '123123123123', NULL, '2025-11-18', 96, 48, NULL, NULL, 11385, '2025-11-17 16:26:39', NULL, '2025-11-17 16:26:39', 0);
INSERT INTO `tb_contract_follow_up` VALUES (29, 29, 11385, '123123123123', NULL, '2025-11-18', 96, 48, NULL, NULL, 11385, '2025-11-17 16:26:45', NULL, '2025-11-17 16:26:45', 0);
INSERT INTO `tb_contract_follow_up` VALUES (30, 29, 11385, '发生的法师打发', NULL, '2025-11-18', 95, 50, NULL, NULL, 11385, '2025-11-17 16:27:10', NULL, '2025-11-17 16:27:10', 0);
INSERT INTO `tb_contract_follow_up` VALUES (31, 29, 11385, 'test', NULL, '2025-11-04', 97, 50, NULL, NULL, 11385, '2025-11-21 09:26:59', NULL, '2025-11-21 09:26:59', 0);
INSERT INTO `tb_contract_follow_up` VALUES (32, 29, 11385, 'dfsdf', NULL, '2025-11-19', 97, 48, NULL, NULL, 11385, '2025-11-21 09:43:17', NULL, '2025-11-21 09:43:17', 0);
INSERT INTO `tb_contract_follow_up` VALUES (33, 58, 11385, 'dfsdf', NULL, '2025-11-21', 97, 48, NULL, NULL, 11385, '2025-11-21 09:43:52', NULL, '2025-11-21 09:43:52', 0);
INSERT INTO `tb_contract_follow_up` VALUES (34, 58, 11385, 'sdfsdf', NULL, '2025-10-28', 96, 48, NULL, NULL, 11385, '2025-11-21 09:44:09', NULL, '2025-11-21 09:44:09', 0);
INSERT INTO `tb_contract_follow_up` VALUES (35, 60, 11386, 'test', NULL, '2025-12-25', 96, 48, NULL, NULL, 11386, '2025-12-02 14:57:49', NULL, '2025-12-02 14:57:49', 0);
INSERT INTO `tb_contract_follow_up` VALUES (36, 37, 11386, '测试跟进', NULL, '2025-12-02', 96, 50, NULL, NULL, 11386, '2025-12-02 15:53:10', NULL, '2025-12-02 15:53:10', 0);

-- ----------------------------
-- Table structure for tb_contract_payment
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
) ENGINE = InnoDB AUTO_INCREMENT = 316 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '合同付款表' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of tb_contract_payment
-- ----------------------------
INSERT INTO `tb_contract_payment` VALUES (243, 16, 600000.0000, '2024-10-15', '2024-10-15 16:39:46', 0);
INSERT INTO `tb_contract_payment` VALUES (244, 18, 400000.0000, '2024-10-12', '2024-10-17 10:32:03', 0);
INSERT INTO `tb_contract_payment` VALUES (245, 19, 123123.0000, '2024-10-31', '2024-10-17 14:27:06', 0);
INSERT INTO `tb_contract_payment` VALUES (246, 20, 1111.0000, '2024-01-12', '2024-10-17 15:08:30', 0);
INSERT INTO `tb_contract_payment` VALUES (247, 21, 1111.0000, '2024-01-12', '2024-10-17 15:08:30', 0);
INSERT INTO `tb_contract_payment` VALUES (248, 22, 1111.0000, '2024-01-12', '2024-10-17 15:08:30', 0);
INSERT INTO `tb_contract_payment` VALUES (249, 23, 1111.0000, '2024-01-12', '2024-10-17 15:08:30', 0);
INSERT INTO `tb_contract_payment` VALUES (250, 24, 1111.0000, '2024-01-12', '2024-10-17 15:08:30', 0);
INSERT INTO `tb_contract_payment` VALUES (251, 25, 1111.0000, '2024-01-12', '2024-10-17 15:16:53', 0);
INSERT INTO `tb_contract_payment` VALUES (252, 26, 1111.0000, '2024-01-12', '2024-10-17 15:17:53', 0);
INSERT INTO `tb_contract_payment` VALUES (253, 27, 1111.0000, '2024-01-12', '2024-10-17 15:23:35', 0);
INSERT INTO `tb_contract_payment` VALUES (254, 28, 1111.0000, '2024-01-12', '2024-10-17 15:23:35', 0);
INSERT INTO `tb_contract_payment` VALUES (255, 29, 1111.0000, '2024-01-12', '2024-10-17 15:23:35', 0);
INSERT INTO `tb_contract_payment` VALUES (256, 30, 1111.0000, '2024-01-12', '2024-10-17 15:23:35', 0);
INSERT INTO `tb_contract_payment` VALUES (257, 31, 1111.0000, '2024-01-12', '2024-10-17 15:23:35', 0);
INSERT INTO `tb_contract_payment` VALUES (258, 32, 11111111.0000, NULL, '2024-10-18 09:19:26', 0);
INSERT INTO `tb_contract_payment` VALUES (259, 37, 300000.0000, '2024-01-12', '2024-10-24 15:41:33', 0);
INSERT INTO `tb_contract_payment` VALUES (260, 38, 300000.0000, '2024-10-12', '2024-10-24 16:00:49', 0);
INSERT INTO `tb_contract_payment` VALUES (261, 39, 300000.0000, '2024-10-12', '2024-10-24 16:00:49', 0);
INSERT INTO `tb_contract_payment` VALUES (262, 40, 300000.0000, '2024-01-12', '2024-11-01 14:56:25', 0);
INSERT INTO `tb_contract_payment` VALUES (263, 54, 123123123.0000, NULL, '2025-02-27 14:33:48', 0);
INSERT INTO `tb_contract_payment` VALUES (264, 57, 12456.0000, NULL, '2025-07-04 14:27:26', 0);
INSERT INTO `tb_contract_payment` VALUES (274, 15, 0.0000, NULL, '2024-10-15 11:22:53', 0);
INSERT INTO `tb_contract_payment` VALUES (275, 17, 0.0000, NULL, '2024-10-17 10:28:11', 0);
INSERT INTO `tb_contract_payment` VALUES (276, 33, 0.0000, NULL, '2024-10-18 17:08:44', 0);
INSERT INTO `tb_contract_payment` VALUES (277, 34, 0.0000, NULL, '2024-10-18 17:09:32', 0);
INSERT INTO `tb_contract_payment` VALUES (278, 35, 0.0000, NULL, '2024-10-22 15:37:57', 0);
INSERT INTO `tb_contract_payment` VALUES (279, 36, 0.0000, NULL, '2024-10-22 15:40:31', 0);
INSERT INTO `tb_contract_payment` VALUES (280, 41, 0.0000, NULL, '2025-01-24 09:09:36', 0);
INSERT INTO `tb_contract_payment` VALUES (281, 42, 0.0000, NULL, '2025-11-17 14:02:18', 1);
INSERT INTO `tb_contract_payment` VALUES (282, 43, 0.0000, NULL, '2025-01-24 10:29:53', 0);
INSERT INTO `tb_contract_payment` VALUES (283, 44, 0.0000, NULL, '2025-01-24 10:38:57', 0);
INSERT INTO `tb_contract_payment` VALUES (284, 45, 0.0000, NULL, '2025-01-24 10:59:06', 0);
INSERT INTO `tb_contract_payment` VALUES (285, 46, 0.0000, NULL, '2025-01-24 10:59:47', 0);
INSERT INTO `tb_contract_payment` VALUES (286, 47, 0.0000, NULL, '2025-02-14 14:21:10', 0);
INSERT INTO `tb_contract_payment` VALUES (287, 48, 0.0000, NULL, '2025-11-17 14:02:45', 1);
INSERT INTO `tb_contract_payment` VALUES (288, 49, 0.0000, NULL, '2025-02-14 16:50:34', 0);
INSERT INTO `tb_contract_payment` VALUES (289, 50, 0.0000, NULL, '2025-02-17 10:50:58', 0);
INSERT INTO `tb_contract_payment` VALUES (290, 51, 0.0000, NULL, '2025-02-17 11:04:24', 0);
INSERT INTO `tb_contract_payment` VALUES (291, 52, 0.0000, NULL, '2025-02-17 13:44:37', 0);
INSERT INTO `tb_contract_payment` VALUES (292, 53, 0.0000, NULL, '2025-11-17 14:02:30', 1);
INSERT INTO `tb_contract_payment` VALUES (293, 55, 0.0000, NULL, '2025-02-27 15:02:52', 0);
INSERT INTO `tb_contract_payment` VALUES (305, 56, 0.0000, NULL, '2025-07-04 14:01:34', 0);
INSERT INTO `tb_contract_payment` VALUES (306, 42, 0.0000, NULL, '2025-11-17 14:02:18', 0);
INSERT INTO `tb_contract_payment` VALUES (307, 53, 0.0000, NULL, '2025-11-17 14:02:30', 0);
INSERT INTO `tb_contract_payment` VALUES (308, 48, 0.0000, NULL, '2025-11-17 14:02:49', 1);
INSERT INTO `tb_contract_payment` VALUES (309, 48, 0.0000, NULL, '2025-11-17 14:02:49', 0);
INSERT INTO `tb_contract_payment` VALUES (310, 58, 0.0000, NULL, '2025-11-21 09:21:13', 0);
INSERT INTO `tb_contract_payment` VALUES (311, 59, 0.0000, NULL, '2025-12-01 14:10:19', 0);
INSERT INTO `tb_contract_payment` VALUES (312, 60, 1233333.0000, '2025-12-24', '2025-12-02 14:57:12', 0);
INSERT INTO `tb_contract_payment` VALUES (313, 61, 1231231.0000, '2025-12-18', '2025-12-02 15:19:45', 0);
INSERT INTO `tb_contract_payment` VALUES (314, 62, 0.0000, NULL, '2025-12-02 15:24:00', 0);
INSERT INTO `tb_contract_payment` VALUES (315, 63, 0.0000, NULL, '2025-12-05 10:35:56', 0);

-- ----------------------------
-- Table structure for tb_contract_payment_bak
-- ----------------------------
DROP TABLE IF EXISTS `tb_contract_payment_bak`;
CREATE TABLE `tb_contract_payment_bak`  (
  `id` int UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '主键',
  `contract_id` int NULL DEFAULT NULL COMMENT '合同ID',
  `payment_amount` decimal(16, 4) NULL DEFAULT NULL COMMENT '付款金额',
  `payment_time` date NULL DEFAULT NULL COMMENT '付款时间',
  `create_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '创建时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 201 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '合同付款表' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of tb_contract_payment_bak
-- ----------------------------
INSERT INTO `tb_contract_payment_bak` VALUES (127, 16, 600000.0000, '2024-10-15', '2024-10-15 16:39:46');
INSERT INTO `tb_contract_payment_bak` VALUES (128, 18, 400000.0000, '2024-10-12', '2024-10-17 10:32:03');
INSERT INTO `tb_contract_payment_bak` VALUES (129, 19, 123123.0000, '2024-10-31', '2024-10-17 14:27:06');
INSERT INTO `tb_contract_payment_bak` VALUES (130, 20, 1111.0000, '2024-01-12', '2024-10-17 15:08:30');
INSERT INTO `tb_contract_payment_bak` VALUES (131, 21, 1111.0000, '2024-01-12', '2024-10-17 15:08:30');
INSERT INTO `tb_contract_payment_bak` VALUES (132, 22, 1111.0000, '2024-01-12', '2024-10-17 15:08:30');
INSERT INTO `tb_contract_payment_bak` VALUES (133, 23, 1111.0000, '2024-01-12', '2024-10-17 15:08:30');
INSERT INTO `tb_contract_payment_bak` VALUES (134, 24, 1111.0000, '2024-01-12', '2024-10-17 15:08:30');
INSERT INTO `tb_contract_payment_bak` VALUES (135, 25, 1111.0000, '2024-01-12', '2024-10-17 15:16:53');
INSERT INTO `tb_contract_payment_bak` VALUES (136, 26, 1111.0000, '2024-01-12', '2024-10-17 15:17:53');
INSERT INTO `tb_contract_payment_bak` VALUES (137, 27, 1111.0000, '2024-01-12', '2024-10-17 15:23:35');
INSERT INTO `tb_contract_payment_bak` VALUES (138, 28, 1111.0000, '2024-01-12', '2024-10-17 15:23:35');
INSERT INTO `tb_contract_payment_bak` VALUES (139, 29, 1111.0000, '2024-01-12', '2024-10-17 15:23:35');
INSERT INTO `tb_contract_payment_bak` VALUES (140, 30, 1111.0000, '2024-01-12', '2024-10-17 15:23:35');
INSERT INTO `tb_contract_payment_bak` VALUES (141, 31, 1111.0000, '2024-01-12', '2024-10-17 15:23:35');
INSERT INTO `tb_contract_payment_bak` VALUES (142, 37, 300000.0000, '2024-01-12', '2024-10-24 15:41:33');
INSERT INTO `tb_contract_payment_bak` VALUES (143, 38, 300000.0000, '2024-10-12', '2024-10-24 16:00:49');
INSERT INTO `tb_contract_payment_bak` VALUES (144, 39, 300000.0000, '2024-10-12', '2024-10-24 16:00:49');
INSERT INTO `tb_contract_payment_bak` VALUES (145, 40, 300000.0000, '2024-01-12', '2024-11-01 14:56:25');
INSERT INTO `tb_contract_payment_bak` VALUES (158, 15, 0.0000, NULL, '2024-10-15 11:22:53');
INSERT INTO `tb_contract_payment_bak` VALUES (159, 17, 0.0000, NULL, '2024-10-17 10:28:11');
INSERT INTO `tb_contract_payment_bak` VALUES (160, 32, 0.0000, NULL, '2024-10-18 09:19:26');
INSERT INTO `tb_contract_payment_bak` VALUES (161, 33, 0.0000, NULL, '2024-10-18 17:08:44');
INSERT INTO `tb_contract_payment_bak` VALUES (162, 34, 0.0000, NULL, '2024-10-18 17:09:32');
INSERT INTO `tb_contract_payment_bak` VALUES (163, 35, 0.0000, NULL, '2024-10-22 15:37:57');
INSERT INTO `tb_contract_payment_bak` VALUES (164, 36, 0.0000, NULL, '2024-10-22 15:40:31');
INSERT INTO `tb_contract_payment_bak` VALUES (165, 41, 0.0000, NULL, '2025-01-24 09:09:36');
INSERT INTO `tb_contract_payment_bak` VALUES (166, 42, 0.0000, NULL, '2025-01-24 09:53:51');
INSERT INTO `tb_contract_payment_bak` VALUES (167, 43, 0.0000, NULL, '2025-01-24 10:29:53');
INSERT INTO `tb_contract_payment_bak` VALUES (168, 44, 0.0000, NULL, '2025-01-24 10:38:57');
INSERT INTO `tb_contract_payment_bak` VALUES (169, 45, 0.0000, NULL, '2025-01-24 10:59:06');
INSERT INTO `tb_contract_payment_bak` VALUES (170, 46, 0.0000, NULL, '2025-01-24 10:59:47');
INSERT INTO `tb_contract_payment_bak` VALUES (171, 47, 0.0000, NULL, '2025-02-14 14:21:10');
INSERT INTO `tb_contract_payment_bak` VALUES (172, 48, 0.0000, NULL, '2025-02-14 15:21:19');
INSERT INTO `tb_contract_payment_bak` VALUES (173, 49, 0.0000, NULL, '2025-02-14 16:50:34');
INSERT INTO `tb_contract_payment_bak` VALUES (174, 50, 0.0000, NULL, '2025-02-17 10:50:58');
INSERT INTO `tb_contract_payment_bak` VALUES (175, 51, 0.0000, NULL, '2025-02-17 11:04:24');
INSERT INTO `tb_contract_payment_bak` VALUES (176, 52, 0.0000, NULL, '2025-02-17 13:44:37');
INSERT INTO `tb_contract_payment_bak` VALUES (177, 53, 0.0000, NULL, '2025-02-18 14:47:13');
INSERT INTO `tb_contract_payment_bak` VALUES (178, 54, 0.0000, NULL, '2025-02-27 14:33:48');
INSERT INTO `tb_contract_payment_bak` VALUES (179, 55, 0.0000, NULL, '2025-02-27 15:02:52');
INSERT INTO `tb_contract_payment_bak` VALUES (180, 15, 0.0000, NULL, '2024-10-15 11:22:53');
INSERT INTO `tb_contract_payment_bak` VALUES (181, 17, 0.0000, NULL, '2024-10-17 10:28:11');
INSERT INTO `tb_contract_payment_bak` VALUES (182, 33, 0.0000, NULL, '2024-10-18 17:08:44');
INSERT INTO `tb_contract_payment_bak` VALUES (183, 34, 0.0000, NULL, '2024-10-18 17:09:32');
INSERT INTO `tb_contract_payment_bak` VALUES (184, 35, 0.0000, NULL, '2024-10-22 15:37:57');
INSERT INTO `tb_contract_payment_bak` VALUES (185, 36, 0.0000, NULL, '2024-10-22 15:40:31');
INSERT INTO `tb_contract_payment_bak` VALUES (186, 41, 0.0000, NULL, '2025-01-24 09:09:36');
INSERT INTO `tb_contract_payment_bak` VALUES (187, 42, 0.0000, NULL, '2025-01-24 09:53:51');
INSERT INTO `tb_contract_payment_bak` VALUES (188, 43, 0.0000, NULL, '2025-01-24 10:29:53');
INSERT INTO `tb_contract_payment_bak` VALUES (189, 44, 0.0000, NULL, '2025-01-24 10:38:57');
INSERT INTO `tb_contract_payment_bak` VALUES (190, 45, 0.0000, NULL, '2025-01-24 10:59:06');
INSERT INTO `tb_contract_payment_bak` VALUES (191, 46, 0.0000, NULL, '2025-01-24 10:59:47');
INSERT INTO `tb_contract_payment_bak` VALUES (192, 47, 0.0000, NULL, '2025-02-14 14:21:10');
INSERT INTO `tb_contract_payment_bak` VALUES (193, 48, 0.0000, NULL, '2025-02-14 15:21:19');
INSERT INTO `tb_contract_payment_bak` VALUES (194, 49, 0.0000, NULL, '2025-02-14 16:50:34');
INSERT INTO `tb_contract_payment_bak` VALUES (195, 50, 0.0000, NULL, '2025-02-17 10:50:58');
INSERT INTO `tb_contract_payment_bak` VALUES (196, 51, 0.0000, NULL, '2025-02-17 11:04:24');
INSERT INTO `tb_contract_payment_bak` VALUES (197, 52, 0.0000, NULL, '2025-02-17 13:44:37');
INSERT INTO `tb_contract_payment_bak` VALUES (198, 53, 0.0000, NULL, '2025-02-18 14:47:13');
INSERT INTO `tb_contract_payment_bak` VALUES (199, 54, 0.0000, NULL, '2025-02-27 14:33:48');
INSERT INTO `tb_contract_payment_bak` VALUES (200, 55, 0.0000, NULL, '2025-02-27 15:02:52');

-- ----------------------------
-- Table structure for tb_contract_user_rel
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
) ENGINE = InnoDB AUTO_INCREMENT = 283 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '合同附件表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of tb_contract_user_rel
-- ----------------------------
INSERT INTO `tb_contract_user_rel` VALUES (47, 41, 11385, 11386, '2025-01-24 10:13:17', 0);
INSERT INTO `tb_contract_user_rel` VALUES (48, 41, 11386, 11386, '2025-01-24 10:13:17', 0);
INSERT INTO `tb_contract_user_rel` VALUES (49, 41, 11411, 11386, '2025-01-24 10:13:17', 0);
INSERT INTO `tb_contract_user_rel` VALUES (50, 41, 11413, 11386, '2025-01-24 10:13:17', 0);
INSERT INTO `tb_contract_user_rel` VALUES (51, 41, 11414, 11386, '2025-01-24 10:13:17', 0);
INSERT INTO `tb_contract_user_rel` VALUES (52, 41, 11416, 11386, '2025-01-24 10:13:17', 0);
INSERT INTO `tb_contract_user_rel` VALUES (53, 43, 11385, 11386, '2025-01-24 10:29:53', 1);
INSERT INTO `tb_contract_user_rel` VALUES (54, 43, 11386, 11386, '2025-01-24 10:29:53', 1);
INSERT INTO `tb_contract_user_rel` VALUES (55, 43, 11411, 11386, '2025-01-24 10:29:53', 1);
INSERT INTO `tb_contract_user_rel` VALUES (56, 43, 11413, 11386, '2025-01-24 10:29:53', 1);
INSERT INTO `tb_contract_user_rel` VALUES (57, 43, 11414, 11386, '2025-01-24 10:29:53', 1);
INSERT INTO `tb_contract_user_rel` VALUES (58, 43, 11416, 11386, '2025-01-24 10:29:53', 1);
INSERT INTO `tb_contract_user_rel` VALUES (59, 42, 11385, 11386, '2025-01-24 10:30:13', 1);
INSERT INTO `tb_contract_user_rel` VALUES (60, 42, 11386, 11386, '2025-01-24 10:30:13', 1);
INSERT INTO `tb_contract_user_rel` VALUES (61, 42, 11411, 11386, '2025-01-24 10:30:13', 1);
INSERT INTO `tb_contract_user_rel` VALUES (62, 42, 11413, 11386, '2025-01-24 10:30:13', 1);
INSERT INTO `tb_contract_user_rel` VALUES (63, 42, 11414, 11386, '2025-01-24 10:30:13', 1);
INSERT INTO `tb_contract_user_rel` VALUES (64, 42, 11416, 11386, '2025-01-24 10:30:13', 1);
INSERT INTO `tb_contract_user_rel` VALUES (65, 44, 11385, 11386, '2025-01-24 10:38:57', 1);
INSERT INTO `tb_contract_user_rel` VALUES (66, 44, 11386, 11386, '2025-01-24 10:38:57', 1);
INSERT INTO `tb_contract_user_rel` VALUES (67, 44, 11411, 11386, '2025-01-24 10:38:57', 1);
INSERT INTO `tb_contract_user_rel` VALUES (68, 44, 11413, 11386, '2025-01-24 10:38:57', 1);
INSERT INTO `tb_contract_user_rel` VALUES (69, 44, 11414, 11386, '2025-01-24 10:38:57', 1);
INSERT INTO `tb_contract_user_rel` VALUES (70, 44, 11416, 11386, '2025-01-24 10:38:57', 1);
INSERT INTO `tb_contract_user_rel` VALUES (71, 45, 11385, 11386, '2025-01-24 10:59:06', 1);
INSERT INTO `tb_contract_user_rel` VALUES (72, 45, 11386, 11386, '2025-01-24 10:59:06', 1);
INSERT INTO `tb_contract_user_rel` VALUES (73, 45, 11411, 11386, '2025-01-24 10:59:06', 1);
INSERT INTO `tb_contract_user_rel` VALUES (74, 45, 11413, 11386, '2025-01-24 10:59:06', 1);
INSERT INTO `tb_contract_user_rel` VALUES (75, 45, 11414, 11386, '2025-01-24 10:59:06', 1);
INSERT INTO `tb_contract_user_rel` VALUES (76, 45, 11416, 11386, '2025-01-24 10:59:06', 1);
INSERT INTO `tb_contract_user_rel` VALUES (77, 42, 11385, 11386, '2025-01-24 11:00:19', 1);
INSERT INTO `tb_contract_user_rel` VALUES (78, 42, 11386, 11386, '2025-01-24 11:00:19', 1);
INSERT INTO `tb_contract_user_rel` VALUES (79, 42, 11411, 11386, '2025-01-24 11:00:19', 1);
INSERT INTO `tb_contract_user_rel` VALUES (80, 42, 11413, 11386, '2025-01-24 11:00:19', 1);
INSERT INTO `tb_contract_user_rel` VALUES (81, 42, 11414, 11386, '2025-01-24 11:00:19', 1);
INSERT INTO `tb_contract_user_rel` VALUES (82, 42, 11416, 11386, '2025-01-24 11:00:19', 1);
INSERT INTO `tb_contract_user_rel` VALUES (83, 42, 11385, 11386, '2025-01-24 11:19:17', 1);
INSERT INTO `tb_contract_user_rel` VALUES (84, 42, 11386, 11386, '2025-01-24 11:19:17', 1);
INSERT INTO `tb_contract_user_rel` VALUES (85, 42, 11411, 11386, '2025-01-24 11:19:17', 1);
INSERT INTO `tb_contract_user_rel` VALUES (86, 42, 11413, 11386, '2025-01-24 11:19:17', 1);
INSERT INTO `tb_contract_user_rel` VALUES (87, 42, 11414, 11386, '2025-01-24 11:19:17', 1);
INSERT INTO `tb_contract_user_rel` VALUES (88, 42, 11416, 11386, '2025-01-24 11:19:17', 1);
INSERT INTO `tb_contract_user_rel` VALUES (89, 44, 11385, 11386, '2025-01-24 11:19:42', 0);
INSERT INTO `tb_contract_user_rel` VALUES (90, 44, 11386, 11386, '2025-01-24 11:19:42', 0);
INSERT INTO `tb_contract_user_rel` VALUES (91, 44, 11411, 11386, '2025-01-24 11:19:42', 0);
INSERT INTO `tb_contract_user_rel` VALUES (92, 44, 11413, 11386, '2025-01-24 11:19:42', 0);
INSERT INTO `tb_contract_user_rel` VALUES (93, 44, 11414, 11386, '2025-01-24 11:19:42', 0);
INSERT INTO `tb_contract_user_rel` VALUES (94, 44, 11416, 11386, '2025-01-24 11:19:42', 0);
INSERT INTO `tb_contract_user_rel` VALUES (95, 45, 11385, 11386, '2025-01-24 11:21:43', 0);
INSERT INTO `tb_contract_user_rel` VALUES (96, 45, 11386, 11386, '2025-01-24 11:21:43', 0);
INSERT INTO `tb_contract_user_rel` VALUES (97, 45, 11411, 11386, '2025-01-24 11:21:43', 0);
INSERT INTO `tb_contract_user_rel` VALUES (98, 45, 11413, 11386, '2025-01-24 11:21:43', 0);
INSERT INTO `tb_contract_user_rel` VALUES (99, 45, 11414, 11386, '2025-01-24 11:21:43', 0);
INSERT INTO `tb_contract_user_rel` VALUES (100, 45, 11416, 11386, '2025-01-24 11:21:43', 0);
INSERT INTO `tb_contract_user_rel` VALUES (101, 46, 11385, 11386, '2025-01-24 11:23:01', 0);
INSERT INTO `tb_contract_user_rel` VALUES (102, 46, 11386, 11386, '2025-01-24 11:23:01', 0);
INSERT INTO `tb_contract_user_rel` VALUES (103, 46, 11411, 11386, '2025-01-24 11:23:01', 0);
INSERT INTO `tb_contract_user_rel` VALUES (104, 46, 11413, 11386, '2025-01-24 11:23:01', 0);
INSERT INTO `tb_contract_user_rel` VALUES (105, 46, 11414, 11386, '2025-01-24 11:23:01', 0);
INSERT INTO `tb_contract_user_rel` VALUES (106, 46, 11416, 11386, '2025-01-24 11:23:01', 0);
INSERT INTO `tb_contract_user_rel` VALUES (107, 47, 11385, 11386, '2025-02-14 14:21:10', 1);
INSERT INTO `tb_contract_user_rel` VALUES (108, 47, 11386, 11386, '2025-02-14 14:21:10', 1);
INSERT INTO `tb_contract_user_rel` VALUES (109, 47, 11403, 11386, '2025-02-14 14:21:10', 1);
INSERT INTO `tb_contract_user_rel` VALUES (110, 47, 11411, 11386, '2025-02-14 14:21:10', 1);
INSERT INTO `tb_contract_user_rel` VALUES (111, 47, 11413, 11386, '2025-02-14 14:21:10', 1);
INSERT INTO `tb_contract_user_rel` VALUES (112, 47, 11414, 11386, '2025-02-14 14:21:10', 1);
INSERT INTO `tb_contract_user_rel` VALUES (113, 47, 11416, 11386, '2025-02-14 14:21:10', 1);
INSERT INTO `tb_contract_user_rel` VALUES (114, 34, 11385, 11386, '2025-02-14 15:50:13', 0);
INSERT INTO `tb_contract_user_rel` VALUES (115, 34, 11386, 11386, '2025-02-14 15:50:13', 0);
INSERT INTO `tb_contract_user_rel` VALUES (116, 34, 11403, 11386, '2025-02-14 15:50:13', 0);
INSERT INTO `tb_contract_user_rel` VALUES (117, 34, 11411, 11386, '2025-02-14 15:50:13', 0);
INSERT INTO `tb_contract_user_rel` VALUES (118, 34, 11413, 11386, '2025-02-14 15:50:13', 0);
INSERT INTO `tb_contract_user_rel` VALUES (119, 34, 11414, 11386, '2025-02-14 15:50:13', 0);
INSERT INTO `tb_contract_user_rel` VALUES (120, 34, 11416, 11386, '2025-02-14 15:50:13', 0);
INSERT INTO `tb_contract_user_rel` VALUES (121, 33, 11385, 11386, '2025-02-14 15:51:09', 0);
INSERT INTO `tb_contract_user_rel` VALUES (122, 33, 11386, 11386, '2025-02-14 15:51:09', 0);
INSERT INTO `tb_contract_user_rel` VALUES (123, 33, 11403, 11386, '2025-02-14 15:51:09', 0);
INSERT INTO `tb_contract_user_rel` VALUES (124, 33, 11411, 11386, '2025-02-14 15:51:09', 0);
INSERT INTO `tb_contract_user_rel` VALUES (125, 33, 11413, 11386, '2025-02-14 15:51:09', 0);
INSERT INTO `tb_contract_user_rel` VALUES (126, 33, 11414, 11386, '2025-02-14 15:51:09', 0);
INSERT INTO `tb_contract_user_rel` VALUES (127, 33, 11416, 11386, '2025-02-14 15:51:09', 0);
INSERT INTO `tb_contract_user_rel` VALUES (128, 43, 11385, 11386, '2025-02-14 15:53:25', 0);
INSERT INTO `tb_contract_user_rel` VALUES (129, 43, 11386, 11386, '2025-02-14 15:53:25', 0);
INSERT INTO `tb_contract_user_rel` VALUES (130, 43, 11411, 11386, '2025-02-14 15:53:25', 0);
INSERT INTO `tb_contract_user_rel` VALUES (131, 43, 11413, 11386, '2025-02-14 15:53:25', 0);
INSERT INTO `tb_contract_user_rel` VALUES (132, 43, 11414, 11386, '2025-02-14 15:53:25', 0);
INSERT INTO `tb_contract_user_rel` VALUES (133, 43, 11416, 11386, '2025-02-14 15:53:25', 0);
INSERT INTO `tb_contract_user_rel` VALUES (134, 35, 11385, 11386, '2025-02-17 09:43:43', 0);
INSERT INTO `tb_contract_user_rel` VALUES (135, 35, 11386, 11386, '2025-02-17 09:43:43', 0);
INSERT INTO `tb_contract_user_rel` VALUES (136, 35, 11403, 11386, '2025-02-17 09:43:43', 0);
INSERT INTO `tb_contract_user_rel` VALUES (137, 35, 11411, 11386, '2025-02-17 09:43:43', 0);
INSERT INTO `tb_contract_user_rel` VALUES (138, 35, 11413, 11386, '2025-02-17 09:43:43', 0);
INSERT INTO `tb_contract_user_rel` VALUES (139, 35, 11414, 11386, '2025-02-17 09:43:43', 0);
INSERT INTO `tb_contract_user_rel` VALUES (140, 35, 11416, 11386, '2025-02-17 09:43:43', 0);
INSERT INTO `tb_contract_user_rel` VALUES (141, 15, 11385, 11386, '2025-02-17 09:44:25', 1);
INSERT INTO `tb_contract_user_rel` VALUES (142, 15, 11386, 11386, '2025-02-17 09:44:25', 1);
INSERT INTO `tb_contract_user_rel` VALUES (143, 15, 11413, 11386, '2025-02-17 09:45:06', 0);
INSERT INTO `tb_contract_user_rel` VALUES (144, 47, 11385, 11386, '2025-02-17 09:56:05', 1);
INSERT INTO `tb_contract_user_rel` VALUES (145, 47, 11386, 11386, '2025-02-17 09:56:05', 1);
INSERT INTO `tb_contract_user_rel` VALUES (146, 47, 11403, 11386, '2025-02-17 09:56:05', 1);
INSERT INTO `tb_contract_user_rel` VALUES (147, 47, 11411, 11386, '2025-02-17 09:56:05', 1);
INSERT INTO `tb_contract_user_rel` VALUES (148, 47, 11413, 11386, '2025-02-17 09:56:05', 1);
INSERT INTO `tb_contract_user_rel` VALUES (149, 47, 11414, 11386, '2025-02-17 09:56:05', 1);
INSERT INTO `tb_contract_user_rel` VALUES (150, 47, 11416, 11386, '2025-02-17 09:56:05', 1);
INSERT INTO `tb_contract_user_rel` VALUES (151, 47, 11385, 11386, '2025-02-17 10:07:41', 1);
INSERT INTO `tb_contract_user_rel` VALUES (152, 47, 11386, 11386, '2025-02-17 10:07:41', 1);
INSERT INTO `tb_contract_user_rel` VALUES (153, 47, 11403, 11386, '2025-02-17 10:07:41', 1);
INSERT INTO `tb_contract_user_rel` VALUES (154, 47, 11411, 11386, '2025-02-17 10:07:41', 1);
INSERT INTO `tb_contract_user_rel` VALUES (155, 47, 11413, 11386, '2025-02-17 10:07:41', 1);
INSERT INTO `tb_contract_user_rel` VALUES (156, 47, 11414, 11386, '2025-02-17 10:07:41', 1);
INSERT INTO `tb_contract_user_rel` VALUES (157, 47, 11385, 11386, '2025-02-17 10:07:50', 1);
INSERT INTO `tb_contract_user_rel` VALUES (158, 47, 11386, 11386, '2025-02-17 10:07:50', 1);
INSERT INTO `tb_contract_user_rel` VALUES (159, 47, 11403, 11386, '2025-02-17 10:07:50', 1);
INSERT INTO `tb_contract_user_rel` VALUES (160, 47, 11411, 11386, '2025-02-17 10:07:50', 1);
INSERT INTO `tb_contract_user_rel` VALUES (161, 47, 11413, 11386, '2025-02-17 10:07:50', 1);
INSERT INTO `tb_contract_user_rel` VALUES (162, 47, 11414, 11386, '2025-02-17 10:07:50', 1);
INSERT INTO `tb_contract_user_rel` VALUES (163, 47, 11385, 11386, '2025-02-17 10:08:13', 1);
INSERT INTO `tb_contract_user_rel` VALUES (164, 47, 11386, 11386, '2025-02-17 10:08:13', 1);
INSERT INTO `tb_contract_user_rel` VALUES (165, 47, 11403, 11386, '2025-02-17 10:08:13', 1);
INSERT INTO `tb_contract_user_rel` VALUES (166, 47, 11411, 11386, '2025-02-17 10:08:13', 1);
INSERT INTO `tb_contract_user_rel` VALUES (167, 47, 11413, 11386, '2025-02-17 10:08:13', 1);
INSERT INTO `tb_contract_user_rel` VALUES (168, 47, 11414, 11386, '2025-02-17 10:08:13', 1);
INSERT INTO `tb_contract_user_rel` VALUES (169, 47, 11385, 11386, '2025-02-17 10:08:27', 1);
INSERT INTO `tb_contract_user_rel` VALUES (170, 47, 11386, 11386, '2025-02-17 10:08:27', 1);
INSERT INTO `tb_contract_user_rel` VALUES (171, 47, 11403, 11386, '2025-02-17 10:08:27', 1);
INSERT INTO `tb_contract_user_rel` VALUES (172, 47, 11411, 11386, '2025-02-17 10:08:27', 1);
INSERT INTO `tb_contract_user_rel` VALUES (173, 47, 11413, 11386, '2025-02-17 10:08:27', 1);
INSERT INTO `tb_contract_user_rel` VALUES (174, 47, 11414, 11386, '2025-02-17 10:08:27', 1);
INSERT INTO `tb_contract_user_rel` VALUES (175, 47, 11416, 11386, '2025-02-17 10:08:27', 1);
INSERT INTO `tb_contract_user_rel` VALUES (176, 47, 11385, 11386, '2025-02-17 10:08:37', 1);
INSERT INTO `tb_contract_user_rel` VALUES (177, 47, 11386, 11386, '2025-02-17 10:08:37', 1);
INSERT INTO `tb_contract_user_rel` VALUES (178, 47, 11403, 11386, '2025-02-17 10:08:37', 1);
INSERT INTO `tb_contract_user_rel` VALUES (179, 47, 11411, 11386, '2025-02-17 10:08:37', 1);
INSERT INTO `tb_contract_user_rel` VALUES (180, 47, 11413, 11386, '2025-02-17 10:08:37', 1);
INSERT INTO `tb_contract_user_rel` VALUES (181, 47, 11414, 11386, '2025-02-17 10:08:37', 1);
INSERT INTO `tb_contract_user_rel` VALUES (182, 47, 11385, 11386, '2025-02-17 10:09:30', 1);
INSERT INTO `tb_contract_user_rel` VALUES (183, 47, 11386, 11386, '2025-02-17 10:09:30', 1);
INSERT INTO `tb_contract_user_rel` VALUES (184, 47, 11403, 11386, '2025-02-17 10:09:30', 1);
INSERT INTO `tb_contract_user_rel` VALUES (185, 47, 11411, 11386, '2025-02-17 10:09:30', 1);
INSERT INTO `tb_contract_user_rel` VALUES (186, 47, 11413, 11386, '2025-02-17 10:09:30', 1);
INSERT INTO `tb_contract_user_rel` VALUES (187, 47, 11414, 11386, '2025-02-17 10:09:30', 1);
INSERT INTO `tb_contract_user_rel` VALUES (188, 47, 11385, 11386, '2025-02-17 10:11:35', 1);
INSERT INTO `tb_contract_user_rel` VALUES (189, 47, 11386, 11386, '2025-02-17 10:11:35', 1);
INSERT INTO `tb_contract_user_rel` VALUES (190, 47, 11403, 11386, '2025-02-17 10:11:35', 1);
INSERT INTO `tb_contract_user_rel` VALUES (191, 47, 11411, 11386, '2025-02-17 10:11:35', 1);
INSERT INTO `tb_contract_user_rel` VALUES (192, 47, 11413, 11386, '2025-02-17 10:11:35', 1);
INSERT INTO `tb_contract_user_rel` VALUES (193, 47, 11414, 11386, '2025-02-17 10:11:35', 1);
INSERT INTO `tb_contract_user_rel` VALUES (194, 47, 11385, 11386, '2025-02-17 10:11:58', 1);
INSERT INTO `tb_contract_user_rel` VALUES (195, 47, 11386, 11386, '2025-02-17 10:11:58', 1);
INSERT INTO `tb_contract_user_rel` VALUES (196, 47, 11403, 11386, '2025-02-17 10:11:58', 1);
INSERT INTO `tb_contract_user_rel` VALUES (197, 47, 11411, 11386, '2025-02-17 10:11:58', 1);
INSERT INTO `tb_contract_user_rel` VALUES (198, 47, 11413, 11386, '2025-02-17 10:11:58', 1);
INSERT INTO `tb_contract_user_rel` VALUES (199, 47, 11385, 11386, '2025-02-17 10:12:27', 1);
INSERT INTO `tb_contract_user_rel` VALUES (200, 47, 11386, 11386, '2025-02-17 10:12:27', 1);
INSERT INTO `tb_contract_user_rel` VALUES (201, 47, 11403, 11386, '2025-02-17 10:12:27', 1);
INSERT INTO `tb_contract_user_rel` VALUES (202, 47, 11411, 11386, '2025-02-17 10:12:27', 1);
INSERT INTO `tb_contract_user_rel` VALUES (203, 47, 11413, 11386, '2025-02-17 10:12:27', 1);
INSERT INTO `tb_contract_user_rel` VALUES (204, 47, 11414, 11386, '2025-02-17 10:12:27', 1);
INSERT INTO `tb_contract_user_rel` VALUES (205, 47, 11416, 11386, '2025-02-17 10:12:27', 1);
INSERT INTO `tb_contract_user_rel` VALUES (206, 47, 11400, 11386, '2025-02-17 10:12:27', 1);
INSERT INTO `tb_contract_user_rel` VALUES (207, 47, 11404, 11386, '2025-02-17 10:12:27', 1);
INSERT INTO `tb_contract_user_rel` VALUES (208, 47, 11412, 11386, '2025-02-17 10:12:27', 1);
INSERT INTO `tb_contract_user_rel` VALUES (209, 47, 11415, 11386, '2025-02-17 10:12:27', 1);
INSERT INTO `tb_contract_user_rel` VALUES (210, 47, 11385, 11386, '2025-02-17 10:12:34', 1);
INSERT INTO `tb_contract_user_rel` VALUES (211, 47, 11386, 11386, '2025-02-17 10:12:34', 1);
INSERT INTO `tb_contract_user_rel` VALUES (212, 47, 11403, 11386, '2025-02-17 10:12:34', 1);
INSERT INTO `tb_contract_user_rel` VALUES (213, 47, 11411, 11386, '2025-02-17 10:12:34', 1);
INSERT INTO `tb_contract_user_rel` VALUES (214, 47, 11413, 11386, '2025-02-17 10:12:34', 1);
INSERT INTO `tb_contract_user_rel` VALUES (215, 47, 11416, 11386, '2025-02-17 10:12:34', 1);
INSERT INTO `tb_contract_user_rel` VALUES (216, 47, 11400, 11386, '2025-02-17 10:12:34', 1);
INSERT INTO `tb_contract_user_rel` VALUES (217, 47, 11404, 11386, '2025-02-17 10:12:34', 1);
INSERT INTO `tb_contract_user_rel` VALUES (218, 47, 11412, 11386, '2025-02-17 10:12:34', 1);
INSERT INTO `tb_contract_user_rel` VALUES (219, 47, 11415, 11386, '2025-02-17 10:12:34', 1);
INSERT INTO `tb_contract_user_rel` VALUES (220, 47, 11385, 11386, '2025-02-17 10:12:46', 1);
INSERT INTO `tb_contract_user_rel` VALUES (221, 47, 11386, 11386, '2025-02-17 10:12:46', 1);
INSERT INTO `tb_contract_user_rel` VALUES (222, 47, 11403, 11386, '2025-02-17 10:12:46', 1);
INSERT INTO `tb_contract_user_rel` VALUES (223, 47, 11411, 11386, '2025-02-17 10:12:46', 1);
INSERT INTO `tb_contract_user_rel` VALUES (224, 47, 11413, 11386, '2025-02-17 10:12:46', 1);
INSERT INTO `tb_contract_user_rel` VALUES (225, 47, 11416, 11386, '2025-02-17 10:12:46', 1);
INSERT INTO `tb_contract_user_rel` VALUES (226, 47, 11400, 11386, '2025-02-17 10:12:46', 1);
INSERT INTO `tb_contract_user_rel` VALUES (227, 47, 11404, 11386, '2025-02-17 10:12:46', 1);
INSERT INTO `tb_contract_user_rel` VALUES (228, 47, 11412, 11386, '2025-02-17 10:12:46', 1);
INSERT INTO `tb_contract_user_rel` VALUES (229, 47, 11407, 11386, '2025-02-17 10:12:46', 1);
INSERT INTO `tb_contract_user_rel` VALUES (230, 50, 11385, 11386, '2025-02-17 10:50:58', 1);
INSERT INTO `tb_contract_user_rel` VALUES (231, 50, 11403, 11386, '2025-02-17 10:50:58', 1);
INSERT INTO `tb_contract_user_rel` VALUES (232, 50, 11385, 11386, '2025-02-17 10:51:39', 1);
INSERT INTO `tb_contract_user_rel` VALUES (233, 50, 11386, 11386, '2025-02-17 10:51:39', 1);
INSERT INTO `tb_contract_user_rel` VALUES (234, 50, 11403, 11386, '2025-02-17 10:51:39', 1);
INSERT INTO `tb_contract_user_rel` VALUES (235, 50, 11385, 11386, '2025-02-17 10:51:48', 1);
INSERT INTO `tb_contract_user_rel` VALUES (236, 50, 11386, 11386, '2025-02-17 10:51:48', 1);
INSERT INTO `tb_contract_user_rel` VALUES (237, 50, 11403, 11386, '2025-02-17 10:51:48', 1);
INSERT INTO `tb_contract_user_rel` VALUES (238, 50, 11385, 11386, '2025-02-17 10:51:56', 1);
INSERT INTO `tb_contract_user_rel` VALUES (239, 50, 11403, 11386, '2025-02-17 10:51:56', 1);
INSERT INTO `tb_contract_user_rel` VALUES (240, 52, 11385, 11386, '2025-02-17 13:44:37', 1);
INSERT INTO `tb_contract_user_rel` VALUES (241, 52, 11386, 11386, '2025-02-17 13:44:37', 1);
INSERT INTO `tb_contract_user_rel` VALUES (242, 52, 11403, 11386, '2025-02-17 13:44:37', 1);
INSERT INTO `tb_contract_user_rel` VALUES (243, 52, 11385, 11386, '2025-02-17 13:45:15', 1);
INSERT INTO `tb_contract_user_rel` VALUES (244, 52, 11386, 11386, '2025-02-17 13:45:15', 1);
INSERT INTO `tb_contract_user_rel` VALUES (245, 52, 11385, 11386, '2025-02-17 13:45:43', 0);
INSERT INTO `tb_contract_user_rel` VALUES (246, 52, 11386, 11386, '2025-02-17 13:45:43', 0);
INSERT INTO `tb_contract_user_rel` VALUES (247, 52, 11403, 11386, '2025-02-17 13:45:43', 0);
INSERT INTO `tb_contract_user_rel` VALUES (248, 52, 11411, 11386, '2025-02-17 13:45:43', 0);
INSERT INTO `tb_contract_user_rel` VALUES (249, 52, 11413, 11386, '2025-02-17 13:45:43', 0);
INSERT INTO `tb_contract_user_rel` VALUES (250, 52, 11414, 11386, '2025-02-17 13:45:43', 0);
INSERT INTO `tb_contract_user_rel` VALUES (251, 52, 11416, 11386, '2025-02-17 13:45:43', 0);
INSERT INTO `tb_contract_user_rel` VALUES (252, 50, 11385, 11386, '2025-02-18 09:01:25', 0);
INSERT INTO `tb_contract_user_rel` VALUES (253, 50, 11403, 11386, '2025-02-18 09:01:25', 0);
INSERT INTO `tb_contract_user_rel` VALUES (254, 19, 11385, 11386, '2025-02-18 14:53:07', 1);
INSERT INTO `tb_contract_user_rel` VALUES (255, 19, 11386, 11386, '2025-02-18 14:53:07', 1);
INSERT INTO `tb_contract_user_rel` VALUES (256, 19, 11403, 11386, '2025-02-18 14:53:07', 1);
INSERT INTO `tb_contract_user_rel` VALUES (257, 19, 11385, 11386, '2025-02-18 14:53:14', 1);
INSERT INTO `tb_contract_user_rel` VALUES (258, 19, 11403, 11386, '2025-02-18 14:53:14', 1);
INSERT INTO `tb_contract_user_rel` VALUES (259, 19, 11385, 11386, '2025-02-18 14:53:34', 0);
INSERT INTO `tb_contract_user_rel` VALUES (260, 19, 11386, 11386, '2025-02-18 14:53:34', 0);
INSERT INTO `tb_contract_user_rel` VALUES (261, 19, 11403, 11386, '2025-02-18 14:53:34', 0);
INSERT INTO `tb_contract_user_rel` VALUES (262, 19, 11411, 11386, '2025-02-18 14:53:34', 0);
INSERT INTO `tb_contract_user_rel` VALUES (263, 19, 11413, 11386, '2025-02-18 14:53:34', 0);
INSERT INTO `tb_contract_user_rel` VALUES (264, 19, 11414, 11386, '2025-02-18 14:53:34', 0);
INSERT INTO `tb_contract_user_rel` VALUES (265, 19, 11416, 11386, '2025-02-18 14:53:34', 0);
INSERT INTO `tb_contract_user_rel` VALUES (266, 49, 11385, 11386, '2025-02-24 11:32:07', 0);
INSERT INTO `tb_contract_user_rel` VALUES (267, 47, 11385, 11386, '2025-07-04 14:43:34', 0);
INSERT INTO `tb_contract_user_rel` VALUES (268, 47, 11386, 11386, '2025-07-04 14:43:34', 0);
INSERT INTO `tb_contract_user_rel` VALUES (269, 47, 11403, 11386, '2025-07-04 14:43:34', 0);
INSERT INTO `tb_contract_user_rel` VALUES (270, 47, 11411, 11386, '2025-07-04 14:43:34', 0);
INSERT INTO `tb_contract_user_rel` VALUES (271, 47, 11413, 11386, '2025-07-04 14:43:34', 0);
INSERT INTO `tb_contract_user_rel` VALUES (272, 47, 11416, 11386, '2025-07-04 14:43:34', 0);
INSERT INTO `tb_contract_user_rel` VALUES (273, 47, 11400, 11386, '2025-07-04 14:43:34', 0);
INSERT INTO `tb_contract_user_rel` VALUES (274, 47, 11404, 11386, '2025-07-04 14:43:34', 0);
INSERT INTO `tb_contract_user_rel` VALUES (275, 47, 11412, 11386, '2025-07-04 14:43:34', 0);
INSERT INTO `tb_contract_user_rel` VALUES (276, 47, 11407, 11386, '2025-07-04 14:43:34', 0);
INSERT INTO `tb_contract_user_rel` VALUES (277, 42, 11385, 11385, '2025-11-17 14:02:17', 0);
INSERT INTO `tb_contract_user_rel` VALUES (278, 42, 11386, 11385, '2025-11-17 14:02:17', 0);
INSERT INTO `tb_contract_user_rel` VALUES (279, 42, 11411, 11385, '2025-11-17 14:02:17', 0);
INSERT INTO `tb_contract_user_rel` VALUES (280, 42, 11413, 11385, '2025-11-17 14:02:18', 0);
INSERT INTO `tb_contract_user_rel` VALUES (281, 42, 11414, 11385, '2025-11-17 14:02:18', 0);
INSERT INTO `tb_contract_user_rel` VALUES (282, 42, 11416, 11385, '2025-11-17 14:02:18', 0);

-- ----------------------------
-- Table structure for tb_dict
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
) ENGINE = InnoDB AUTO_INCREMENT = 101 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '字典表' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of tb_dict
-- ----------------------------
INSERT INTO `tb_dict` VALUES (8, '单位类型', 'companyType', '央企', 1, 0, '2024-09-23 14:50:32');
INSERT INTO `tb_dict` VALUES (9, '单位类型', 'companyType', '国企', 2, 0, '2024-09-23 15:10:13');
INSERT INTO `tb_dict` VALUES (10, '单位类型', 'companyType', '私企', 3, 0, '2024-09-23 15:11:05');
INSERT INTO `tb_dict` VALUES (11, '单位类型', 'companyType', '政府', 4, 0, '2024-09-23 15:11:14');
INSERT INTO `tb_dict` VALUES (12, '单位类型', 'companyType', '科研单位', 5, 0, '2024-09-23 15:11:24');
INSERT INTO `tb_dict` VALUES (13, '单位类型', 'companyType', '高校', 6, 0, '2024-09-23 15:11:35');
INSERT INTO `tb_dict` VALUES (14, '单位类型', 'companyType', '社会组织', 7, 0, '2024-09-23 15:11:45');
INSERT INTO `tb_dict` VALUES (15, '单位类型', 'companyType', '其他', 8, 0, '2024-09-23 15:11:53');
INSERT INTO `tb_dict` VALUES (17, '客户级别', 'customerLevel', '重要客户', 1, 0, '2024-09-25 14:24:30');
INSERT INTO `tb_dict` VALUES (18, '客户级别', 'customerLevel', '优质客户', 2, 0, '2024-09-25 14:24:34');
INSERT INTO `tb_dict` VALUES (19, '客户级别', 'customerLevel', '普通客户', 3, 0, '2024-09-25 14:24:37');
INSERT INTO `tb_dict` VALUES (20, '客户级别', 'customerLevel', '无效客户', 4, 0, '2024-09-25 14:24:40');
INSERT INTO `tb_dict` VALUES (21, '客户级别', 'customerLevel', '无法判断', 5, 0, '2024-09-25 14:24:43');
INSERT INTO `tb_dict` VALUES (22, '客户意向', 'customerIntent', '极高意向', 1, 0, '2024-09-25 14:24:46');
INSERT INTO `tb_dict` VALUES (23, '客户意向', 'customerIntent', '较高意向', 2, 0, '2024-09-25 14:24:49');
INSERT INTO `tb_dict` VALUES (24, '客户意向', 'customerIntent', '一般意向', 3, 0, '2024-09-25 14:24:52');
INSERT INTO `tb_dict` VALUES (25, '客户意向', 'customerIntent', '无意向', 4, 0, '2024-09-25 14:24:55');
INSERT INTO `tb_dict` VALUES (26, '客户意向', 'customerIntent', '无法判断', 5, 0, '2024-09-25 14:24:59');
INSERT INTO `tb_dict` VALUES (27, '客户来源', 'customerSource', '公司资源', 1, 0, '2024-09-25 14:25:02');
INSERT INTO `tb_dict` VALUES (28, '客户来源', 'customerSource', '个人资源', 2, 0, '2024-09-25 14:25:05');
INSERT INTO `tb_dict` VALUES (29, '客户来源', 'customerSource', '行业展会', 3, 0, '2024-09-25 14:25:08');
INSERT INTO `tb_dict` VALUES (30, '客户来源', 'customerSource', '重要活动', 4, 0, '2024-09-25 14:25:10');
INSERT INTO `tb_dict` VALUES (31, '客户来源', 'customerSource', '转介绍', 5, 0, '2024-09-25 14:25:12');
INSERT INTO `tb_dict` VALUES (32, '客户来源', 'customerSource', '客户咨询', 6, 0, '2024-09-25 14:25:15');
INSERT INTO `tb_dict` VALUES (33, '客户来源', 'customerSource', '其他', 7, 0, '2024-09-25 14:25:19');
INSERT INTO `tb_dict` VALUES (34, '合作方向', 'cooperationArea', '流片业务', 1, 0, '2024-10-31 11:06:38');
INSERT INTO `tb_dict` VALUES (35, '合作方向', 'cooperationArea', 'PDK业务', 2, 0, '2024-09-23 15:27:25');
INSERT INTO `tb_dict` VALUES (36, '合作方向', 'cooperationArea', '培训业务', 3, 0, '2024-10-31 11:06:50');
INSERT INTO `tb_dict` VALUES (37, '合作方向', 'cooperationArea', '机房业务', 4, 0, '2024-10-31 11:06:57');
INSERT INTO `tb_dict` VALUES (38, '合作方向', 'cooperationArea', '封装业务', 5, 0, '2024-10-31 11:07:02');
INSERT INTO `tb_dict` VALUES (39, '合作方向', 'cooperationArea', '平台业务', 6, 0, '2024-10-31 11:07:11');
INSERT INTO `tb_dict` VALUES (40, '合作方向', 'cooperationArea', '采购业务', 7, 0, '2024-10-31 11:07:18');
INSERT INTO `tb_dict` VALUES (41, '合作方向', 'cooperationArea', '会务业务', 8, 0, '2024-10-31 11:07:25');
INSERT INTO `tb_dict` VALUES (42, '合作方向', 'cooperationArea', '后端业务', 9, 0, '2024-10-31 11:07:33');
INSERT INTO `tb_dict` VALUES (43, '跟进状态', 'followUpStatus', '信息收集', 1, 1, '2025-11-17 09:03:25');
INSERT INTO `tb_dict` VALUES (44, '跟进状态', 'followUpStatus', '初步建联', 2, 1, '2025-11-17 09:03:25');
INSERT INTO `tb_dict` VALUES (45, '跟进状态', 'followUpStatus', '需求沟通', 3, 1, '2025-11-17 09:03:25');
INSERT INTO `tb_dict` VALUES (46, '跟进状态', 'followUpStatus', '合作洽谈', 4, 1, '2025-11-17 09:03:25');
INSERT INTO `tb_dict` VALUES (47, '跟进状态', 'followUpStatus', '流程推进', 5, 1, '2025-11-17 09:03:25');
INSERT INTO `tb_dict` VALUES (48, '跟进方式', 'followUpType', '电话', 3, 0, '2025-11-17 09:17:48');
INSERT INTO `tb_dict` VALUES (49, '跟进方式', 'followUpType', '上门拜访', 1, 0, '2025-11-17 09:17:46');
INSERT INTO `tb_dict` VALUES (50, '跟进方式', 'followUpType', '微信', 2, 0, '2025-11-17 09:17:47');
INSERT INTO `tb_dict` VALUES (51, '跟进方式', 'followUpType', '其他', 4, 0, '2025-11-17 09:17:44');
INSERT INTO `tb_dict` VALUES (52, '付款状态', 'paymentStatus', '未付款', 1, 0, '2024-09-23 15:33:57');
INSERT INTO `tb_dict` VALUES (53, '付款状态', 'paymentStatus', '全额付款', 2, 0, '2025-11-17 11:19:46');
INSERT INTO `tb_dict` VALUES (54, '合同类型', 'contractType', '付款', 1, 0, '2024-10-31 10:29:59');
INSERT INTO `tb_dict` VALUES (55, '合同类型', 'contractType', '收款', 2, 0, '2024-10-31 10:30:03');
INSERT INTO `tb_dict` VALUES (56, '合同类型', 'contractType', '采购', 3, 1, '2024-10-31 10:29:35');
INSERT INTO `tb_dict` VALUES (57, '合同状态', 'contractStatus', '未生效', 1, 0, '2024-09-26 09:03:08');
INSERT INTO `tb_dict` VALUES (58, '合同状态', 'contractStatus', '生效中', 2, 0, '2024-09-26 09:03:16');
INSERT INTO `tb_dict` VALUES (59, '合同状态', 'contractStatus', '已结束', 3, 0, '2024-09-26 09:03:27');
INSERT INTO `tb_dict` VALUES (62, '合作方向', 'cooperationArea', '版图业务', 10, 0, '2024-10-31 11:23:57');
INSERT INTO `tb_dict` VALUES (63, '合作方向', 'cooperationArea', '赞助协议', 11, 0, '2024-10-31 11:24:25');
INSERT INTO `tb_dict` VALUES (64, '合作方向', 'cooperationArea', '委托协议', 12, 0, '2024-10-31 11:24:34');
INSERT INTO `tb_dict` VALUES (65, '合作方向', 'cooperationArea', '合作协议', 13, 0, '2024-10-31 11:24:42');
INSERT INTO `tb_dict` VALUES (66, '合作方向', 'cooperationArea', '证明文件', 14, 0, '2024-10-31 11:24:50');
INSERT INTO `tb_dict` VALUES (67, '合作方向', 'cooperationArea', '投标文件', 15, 0, '2024-10-31 11:25:00');
INSERT INTO `tb_dict` VALUES (68, '合作方向', 'cooperationArea', '技术服务', 16, 0, '2024-10-31 11:25:09');
INSERT INTO `tb_dict` VALUES (69, '合作方向', 'cooperationArea', '专家聘用', 17, 0, '2024-10-31 11:25:18');
INSERT INTO `tb_dict` VALUES (70, '合作方向', 'cooperationArea', '其他', 18, 0, '2024-10-31 11:25:27');
INSERT INTO `tb_dict` VALUES (71, '付款状态', 'paymentStatus', '部分付款', 3, 0, '2025-07-03 10:09:37');
INSERT INTO `tb_dict` VALUES (74, '供应商类别', 'supplierType', '设备供应商', 1, 0, '2025-11-10 14:49:39');
INSERT INTO `tb_dict` VALUES (75, '供应商类别', 'supplierType', '服务供应商', 2, 0, '2025-11-10 14:49:39');
INSERT INTO `tb_dict` VALUES (76, '供应商类别', 'supplierType', '工具供应商', 3, 0, '2025-11-10 14:49:39');
INSERT INTO `tb_dict` VALUES (77, '供应商类别', 'supplierType', '内容供应商', 4, 0, '2025-11-10 14:49:39');
INSERT INTO `tb_dict` VALUES (78, '供应商类别', 'supplierType', '物流供应商', 5, 0, '2025-11-10 14:49:39');
INSERT INTO `tb_dict` VALUES (79, '供应商类别', 'supplierType', '原材料供应商', 6, 0, '2025-11-10 14:49:39');
INSERT INTO `tb_dict` VALUES (80, '供应商类别', 'supplierType', '其他', 7, 0, '2025-11-10 14:49:39');
INSERT INTO `tb_dict` VALUES (81, '合作类型', 'cooperationType', '战略合作', 1, 0, '2025-11-12 09:30:11');
INSERT INTO `tb_dict` VALUES (82, '合作类型', 'cooperationType', '一般合作', 2, 0, '2025-11-12 09:30:13');
INSERT INTO `tb_dict` VALUES (83, '合作类型', 'cooperationType', '临时合作', 3, 0, '2025-11-12 09:30:16');
INSERT INTO `tb_dict` VALUES (84, '签约类型', 'signatoryType', '新签', 1, 0, '2025-11-12 16:27:45');
INSERT INTO `tb_dict` VALUES (85, '签约类型', 'signatoryType', '续签', 2, 0, '2025-11-12 16:27:46');
INSERT INTO `tb_dict` VALUES (86, '跟进状态', 'followUpStatus', '日常拜访', 1, 0, '2025-11-17 09:05:23');
INSERT INTO `tb_dict` VALUES (87, '跟进状态', 'followUpStatus', '需求沟通', 2, 0, '2025-11-17 09:05:23');
INSERT INTO `tb_dict` VALUES (88, '跟进状态', 'followUpStatus', '方案演示', 3, 0, '2025-11-17 09:05:23');
INSERT INTO `tb_dict` VALUES (89, '跟进状态', 'followUpStatus', '商务谈判', 4, 0, '2025-11-17 09:05:23');
INSERT INTO `tb_dict` VALUES (90, '跟进状态', 'followUpStatus', '问题处理', 5, 0, '2025-11-17 09:05:23');
INSERT INTO `tb_dict` VALUES (91, '跟进状态', 'followUpStatus', '关系维护', 6, 0, '2025-11-17 09:05:23');
INSERT INTO `tb_dict` VALUES (92, '跟进状态', 'followUpStatus', '客户回访', 7, 0, '2025-11-17 09:05:23');
INSERT INTO `tb_dict` VALUES (93, '跟进状态', 'followUpStatus', '其他', 8, 0, '2025-11-17 09:05:23');
INSERT INTO `tb_dict` VALUES (94, '合同跟进状态', 'contractFollowUpStatus', '款项支付', 1, 0, '2025-11-17 09:31:54');
INSERT INTO `tb_dict` VALUES (95, '合同跟进状态', 'contractFollowUpStatus', '合同执行', 2, 0, '2025-11-17 09:31:54');
INSERT INTO `tb_dict` VALUES (96, '合同跟进状态', 'contractFollowUpStatus', '合同续约', 3, 0, '2025-11-17 09:31:54');
INSERT INTO `tb_dict` VALUES (97, '合同跟进状态', 'contractFollowUpStatus', '售后服务', 4, 0, '2025-11-17 09:31:54');
INSERT INTO `tb_dict` VALUES (98, '合同跟进状态', 'contractFollowUpStatus', '合同变更', 5, 0, '2025-11-17 09:31:54');
INSERT INTO `tb_dict` VALUES (99, '合同跟进状态', 'contractFollowUpStatus', '合同风险', 6, 0, '2025-11-17 09:31:54');
INSERT INTO `tb_dict` VALUES (100, '合同跟进状态', 'contractFollowUpStatus', '其他', 7, 0, '2025-11-17 09:31:54');

-- ----------------------------
-- Table structure for tb_info_log
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
) ENGINE = InnoDB AUTO_INCREMENT = 15346 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '客户档案日志表' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of tb_info_log
-- ----------------------------
INSERT INTO `tb_info_log` VALUES (15252, NULL, 12, 11385, '超管', '创建客户', NULL, '2024-10-10 10:18:19');
INSERT INTO `tb_info_log` VALUES (15253, NULL, 13, 11385, '超管', '创建客户', NULL, '2024-10-10 11:21:37');
INSERT INTO `tb_info_log` VALUES (15254, NULL, 14, 11385, '超管', '创建客户', NULL, '2024-10-10 13:31:35');
INSERT INTO `tb_info_log` VALUES (15255, NULL, 15, 11385, '超管', '创建客户', NULL, '2024-10-10 13:54:43');
INSERT INTO `tb_info_log` VALUES (15256, 23, NULL, 11385, '超管', '创建线索', NULL, '2024-10-12 10:28:21');
INSERT INTO `tb_info_log` VALUES (15257, 24, NULL, 11385, '超管', '创建线索', NULL, '2024-10-12 13:54:39');
INSERT INTO `tb_info_log` VALUES (15258, 25, NULL, 11385, '超管', '创建线索', NULL, '2024-10-12 13:54:54');
INSERT INTO `tb_info_log` VALUES (15259, 26, NULL, 11385, '超管', '创建线索', NULL, '2024-10-12 14:24:19');
INSERT INTO `tb_info_log` VALUES (15260, 27, NULL, 11385, '超管', '创建线索', NULL, '2024-10-12 14:24:36');
INSERT INTO `tb_info_log` VALUES (15261, 28, NULL, 11385, '超管', '创建线索', NULL, '2024-10-12 14:27:40');
INSERT INTO `tb_info_log` VALUES (15262, 29, NULL, 11385, '超管', '创建线索', NULL, '2024-10-12 14:31:18');
INSERT INTO `tb_info_log` VALUES (15263, 30, NULL, 11385, '超管', '创建线索', NULL, '2024-10-12 14:32:28');
INSERT INTO `tb_info_log` VALUES (15264, 31, NULL, 11385, '超管', '创建线索', NULL, '2024-10-12 14:32:39');
INSERT INTO `tb_info_log` VALUES (15265, 32, NULL, 11385, '超管', '创建线索', NULL, '2024-10-12 14:32:43');
INSERT INTO `tb_info_log` VALUES (15266, 17, 29, 11385, '超管', '转为客户', NULL, '2024-10-12 15:11:30');
INSERT INTO `tb_info_log` VALUES (15267, 16, NULL, 11385, '超管', '放回公海', NULL, '2024-10-12 15:14:44');
INSERT INTO `tb_info_log` VALUES (15268, 24, NULL, 11385, '超管', '放回公海', NULL, '2024-10-12 15:14:50');
INSERT INTO `tb_info_log` VALUES (15269, 26, NULL, 11385, '超管', '放回公海', NULL, '2024-10-12 15:34:21');
INSERT INTO `tb_info_log` VALUES (15270, 27, NULL, 11385, '超管', '放回公海', NULL, '2024-10-12 15:34:21');
INSERT INTO `tb_info_log` VALUES (15271, 17, NULL, 11385, '超管', '放回公海', NULL, '2024-10-12 15:42:16');
INSERT INTO `tb_info_log` VALUES (15272, 28, NULL, 11385, '超管', '放回公海', NULL, '2024-10-12 16:23:21');
INSERT INTO `tb_info_log` VALUES (15273, 29, NULL, 11385, '超管', '放回公海', NULL, '2024-10-12 16:28:45');
INSERT INTO `tb_info_log` VALUES (15274, 28, NULL, 11385, '超管', '放回公海', NULL, '2024-10-12 16:34:47');
INSERT INTO `tb_info_log` VALUES (15275, 29, NULL, 11385, '超管', '放回公海', NULL, '2024-10-12 16:38:54');
INSERT INTO `tb_info_log` VALUES (15276, 28, NULL, 11385, '超管', '放回公海', NULL, '2024-10-12 16:39:19');
INSERT INTO `tb_info_log` VALUES (15277, 29, NULL, 11385, '超管', '放回公海', NULL, '2024-10-12 16:39:19');
INSERT INTO `tb_info_log` VALUES (15278, 33, NULL, 11385, '超管', '创建线索', NULL, '2024-10-12 16:48:08');
INSERT INTO `tb_info_log` VALUES (15279, 34, NULL, 11385, '超管', '创建线索', NULL, '2024-10-12 16:48:27');
INSERT INTO `tb_info_log` VALUES (15280, 34, NULL, 11385, '超管', '放回公海', NULL, '2024-10-12 16:49:47');
INSERT INTO `tb_info_log` VALUES (15281, 34, NULL, 11385, '超管', '放回公海', NULL, '2024-10-12 16:50:02');
INSERT INTO `tb_info_log` VALUES (15282, NULL, 31, 11412, '用户二', '创建客户', NULL, '2024-10-12 19:03:25');
INSERT INTO `tb_info_log` VALUES (15283, NULL, 32, 11412, '用户二', '创建客户', NULL, '2024-10-14 09:26:13');
INSERT INTO `tb_info_log` VALUES (15284, NULL, 33, 11412, '用户二', '创建客户', NULL, '2024-10-14 09:28:15');
INSERT INTO `tb_info_log` VALUES (15285, NULL, 34, 11412, '用户二', '创建客户', NULL, '2024-10-14 16:39:47');
INSERT INTO `tb_info_log` VALUES (15286, NULL, 35, 11385, '超管', '创建客户', NULL, '2024-10-15 11:13:48');
INSERT INTO `tb_info_log` VALUES (15287, NULL, 36, 11412, '用户二', '创建客户', NULL, '2024-10-15 16:30:41');
INSERT INTO `tb_info_log` VALUES (15288, 36, NULL, 11386, '冯浩臣', '放回公海', NULL, '2024-10-17 08:43:19');
INSERT INTO `tb_info_log` VALUES (15289, 37, NULL, 11386, '冯浩臣', '创建线索', NULL, '2024-10-17 09:07:29');
INSERT INTO `tb_info_log` VALUES (15290, 38, NULL, 11386, '冯浩臣', '创建线索', NULL, '2024-10-17 09:12:34');
INSERT INTO `tb_info_log` VALUES (15291, 38, NULL, 11386, '冯浩臣', '放回公海', NULL, '2024-10-17 09:16:44');
INSERT INTO `tb_info_log` VALUES (15292, 38, NULL, 11386, '冯浩臣', '放回公海', NULL, '2024-10-17 09:19:35');
INSERT INTO `tb_info_log` VALUES (15293, 39, NULL, 11386, '冯浩臣', '放回公海', NULL, '2024-10-17 09:19:37');
INSERT INTO `tb_info_log` VALUES (15294, 38, NULL, 11386, '冯浩臣', '放回公海', NULL, '2024-10-17 09:22:26');
INSERT INTO `tb_info_log` VALUES (15295, 38, NULL, 11386, '冯浩臣', '放回公海', NULL, '2024-10-17 09:23:05');
INSERT INTO `tb_info_log` VALUES (15296, 38, NULL, 11386, '冯浩臣', '放回公海', NULL, '2024-10-17 09:40:13');
INSERT INTO `tb_info_log` VALUES (15297, NULL, 39, 11416, '超管bak', '创建客户', NULL, '2024-10-17 14:17:59');
INSERT INTO `tb_info_log` VALUES (15298, 40, NULL, 11417, 'sxp', '创建线索', NULL, '2024-10-17 14:22:00');
INSERT INTO `tb_info_log` VALUES (15299, 34, NULL, 11386, '冯浩臣', '放回公海', NULL, '2024-10-17 16:41:29');
INSERT INTO `tb_info_log` VALUES (15300, 59, 49, 11417, 'sxp', '转为客户', NULL, '2024-10-18 09:10:19');
INSERT INTO `tb_info_log` VALUES (15301, NULL, 50, 11417, 'sxp', '创建客户', NULL, '2024-10-18 17:00:24');
INSERT INTO `tb_info_log` VALUES (15302, 40, NULL, 11417, 'sxp', '放回公海', NULL, '2024-10-21 09:00:09');
INSERT INTO `tb_info_log` VALUES (15303, 40, NULL, 11417, 'sxp', '放回公海', NULL, '2024-10-21 09:00:59');
INSERT INTO `tb_info_log` VALUES (15304, 41, NULL, 11385, '超管', '创建线索', NULL, '2024-10-21 10:11:02');
INSERT INTO `tb_info_log` VALUES (15305, NULL, 51, 11385, '超管', '创建客户', NULL, '2024-10-22 09:45:54');
INSERT INTO `tb_info_log` VALUES (15306, 40, NULL, 11385, '超管', '放回公海', NULL, '2024-10-22 15:18:04');
INSERT INTO `tb_info_log` VALUES (15307, 41, NULL, 11385, '超管', '放回公海', NULL, '2024-10-22 15:18:20');
INSERT INTO `tb_info_log` VALUES (15308, 66, 52, 11385, '超管', '转为客户', NULL, '2024-10-22 15:28:46');
INSERT INTO `tb_info_log` VALUES (15309, 42, 53, 11385, '超管', '转为客户', NULL, '2024-10-22 15:31:20');
INSERT INTO `tb_info_log` VALUES (15310, 43, NULL, 11385, '超管', '创建线索', NULL, '2024-10-23 10:24:42');
INSERT INTO `tb_info_log` VALUES (15311, 44, NULL, 11385, '超管', '创建线索', NULL, '2024-10-23 10:26:12');
INSERT INTO `tb_info_log` VALUES (15312, NULL, 54, 11385, '超管', '创建客户', '127.0.0.1', '2024-10-24 15:51:36');
INSERT INTO `tb_info_log` VALUES (15313, NULL, 57, 11386, 'fhc', '创建客户', '0:0:0:0:0:0:0:1', '2024-10-31 18:04:10');
INSERT INTO `tb_info_log` VALUES (15314, NULL, 59, 11386, 'fhc', '创建客户', '0:0:0:0:0:0:0:1', '2024-10-31 18:06:54');
INSERT INTO `tb_info_log` VALUES (15315, NULL, 60, 11386, 'fhc', '创建客户', '0:0:0:0:0:0:0:1', '2024-10-31 18:11:44');
INSERT INTO `tb_info_log` VALUES (15316, NULL, 61, 11386, 'fhc', '创建客户', '0:0:0:0:0:0:0:1', '2024-10-31 18:24:22');
INSERT INTO `tb_info_log` VALUES (15317, NULL, 62, 11386, 'fhc', '创建客户', '0:0:0:0:0:0:0:1', '2024-10-31 18:24:57');
INSERT INTO `tb_info_log` VALUES (15318, NULL, 63, 11386, 'fhc', '创建客户', '0:0:0:0:0:0:0:1', '2024-10-31 18:25:48');
INSERT INTO `tb_info_log` VALUES (15319, NULL, 64, 11386, 'fhc', '创建客户', '0:0:0:0:0:0:0:1', '2024-11-01 14:44:34');
INSERT INTO `tb_info_log` VALUES (15320, 45, NULL, 11416, '超管bak', '创建线索', '192.168.10.95', '2025-01-22 14:59:43');
INSERT INTO `tb_info_log` VALUES (15321, 46, NULL, 11386, 'fhc', '创建线索', '127.0.0.1', '2025-01-22 15:09:28');
INSERT INTO `tb_info_log` VALUES (15322, 47, NULL, 11386, 'fhc', '创建线索', '127.0.0.1', '2025-02-06 09:36:32');
INSERT INTO `tb_info_log` VALUES (15323, 48, NULL, 11386, 'fhc', '创建线索', '127.0.0.1', '2025-02-06 09:36:53');
INSERT INTO `tb_info_log` VALUES (15324, NULL, 65, 11386, 'fhc', '创建客户', '127.0.0.1', '2025-02-14 14:10:25');
INSERT INTO `tb_info_log` VALUES (15325, NULL, 66, 11386, 'fhc', '创建客户', '127.0.0.1', '2025-02-14 15:10:34');
INSERT INTO `tb_info_log` VALUES (15326, 34, 67, 11386, 'fhc', '转为客户', '127.0.0.1', '2025-02-14 16:39:49');
INSERT INTO `tb_info_log` VALUES (15327, NULL, 68, 11386, 'fhc', '创建客户', '127.0.0.1', '2025-02-17 10:40:11');
INSERT INTO `tb_info_log` VALUES (15328, 49, 69, 11386, 'fhc', '转为客户', '127.0.0.1', '2025-02-17 10:53:36');
INSERT INTO `tb_info_log` VALUES (15329, 48, NULL, 11386, 'fhc', '公海领取线索', '127.0.0.1', '2025-02-18 08:53:24');
INSERT INTO `tb_info_log` VALUES (15330, 50, NULL, 11386, 'fhc', '创建线索', '127.0.0.1', '2025-02-18 14:05:37');
INSERT INTO `tb_info_log` VALUES (15331, 48, 70, 11386, 'fhc', '转为客户', '127.0.0.1', '2025-02-18 14:36:25');
INSERT INTO `tb_info_log` VALUES (15332, 51, NULL, 11386, 'fhc', '创建线索', '127.0.0.1', '2025-02-18 16:06:18');
INSERT INTO `tb_info_log` VALUES (15333, 50, NULL, 11386, 'fhc', '公海领取线索', '127.0.0.1', '2025-02-18 16:06:28');
INSERT INTO `tb_info_log` VALUES (15334, 16, NULL, 11403, 'fhc', '公海领取线索', '127.0.0.1', '2025-03-03 09:52:48');
INSERT INTO `tb_info_log` VALUES (15335, 57, 71, 11386, 'fhc', '转为客户', '127.0.0.1', '2025-07-04 14:13:54');
INSERT INTO `tb_info_log` VALUES (15336, 16, NULL, 11385, '超管', '公海领取线索', '127.0.0.1', '2025-11-21 09:46:06');
INSERT INTO `tb_info_log` VALUES (15337, 35, NULL, 11386, 'fhc', '公海领取线索', '127.0.0.1', '2025-12-01 09:20:07');
INSERT INTO `tb_info_log` VALUES (15338, NULL, 73, 11386, 'fhc', '创建客户', '127.0.0.1', '2025-12-01 11:17:11');
INSERT INTO `tb_info_log` VALUES (15339, 35, 74, 11386, 'fhc', '转为客户', '127.0.0.1', '2025-12-02 15:19:46');
INSERT INTO `tb_info_log` VALUES (15340, 40, NULL, 11386, 'fhc', '公海领取线索', '127.0.0.1', '2025-12-02 15:23:08');
INSERT INTO `tb_info_log` VALUES (15341, 40, 75, 11386, 'fhc', '转为客户', '127.0.0.1', '2025-12-02 15:24:00');
INSERT INTO `tb_info_log` VALUES (15342, 38, NULL, 11386, 'fhc', '公海领取线索', '127.0.0.1', '2025-12-02 15:27:55');
INSERT INTO `tb_info_log` VALUES (15343, NULL, 76, 11386, 'fhc', '创建供应商', '127.0.0.1', '2025-12-02 16:41:29');
INSERT INTO `tb_info_log` VALUES (15344, NULL, 77, 11386, 'fhc', '创建供应商', '127.0.0.1', '2025-12-02 16:50:15');
INSERT INTO `tb_info_log` VALUES (15345, NULL, 78, 11386, 'fhc', '创建客户', '127.0.0.1', '2025-12-05 11:22:04');

-- ----------------------------
-- Table structure for tb_message_fanout
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
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of tb_message_fanout
-- ----------------------------

-- ----------------------------
-- Table structure for tb_message_list
-- ----------------------------
DROP TABLE IF EXISTS `tb_message_list`;
CREATE TABLE `tb_message_list`  (
  `id` int UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'id(主键)',
  `msg_id` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '消息id(生产者可以自己制定,可以为空)',
  `msg_title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '消息标题',
  `msg_info` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL COMMENT '消息内容',
  `from_app` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '消息的来源应用',
  `from_userid` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '消息的来源用户id',
  `to_app` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '消息的消费应用(如果未配置,则任何应用的登录用户=to_userid的都可以消费)',
  `to_userid` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '消息的消费用户id',
  `create_time` timestamp NULL DEFAULT NULL COMMENT '消息的创建时间',
  `expiration_time` timestamp NULL DEFAULT NULL COMMENT '消息的过期时间',
  `msg_type` varchar(5) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '消息类型(0:通知;1:告警;2:广播;2.1:广播(优惠活动推广))',
  `msg_status` varchar(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '消息的状态(0:正常;1:已读;2:已删除;....)',
  `if_expired` tinyint(1) NULL DEFAULT NULL COMMENT '是否过期',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 69 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '消息列表' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of tb_message_list
-- ----------------------------
INSERT INTO `tb_message_list` VALUES (1, '16', '测试', '123123123123', NULL, '1', NULL, '11417', '2024-10-17 16:10:00', NULL, '1', '0', 0);
INSERT INTO `tb_message_list` VALUES (2, '16', '测试', '123123123123', NULL, '1', NULL, '11417', '2024-10-18 15:00:00', NULL, '1', '1', 0);
INSERT INTO `tb_message_list` VALUES (3, '17', '测试', '123123123123', NULL, '1', NULL, '11417', '2024-10-18 15:00:00', NULL, '1', '2', 0);
INSERT INTO `tb_message_list` VALUES (4, '50', '创建客户', '创建客户(第一个)成功', NULL, '11417', NULL, '11417', '2024-10-18 17:09:32', NULL, '1', '0', 0);
INSERT INTO `tb_message_list` VALUES (5, 'null', '放回公海', '1条线索放回公海成功', NULL, '11417', NULL, '11417', '2024-10-21 09:09:19', NULL, '1', '0', 0);
INSERT INTO `tb_message_list` VALUES (6, 'null', '放回公海', '1条线索放回公海成功', NULL, '11417', NULL, '11417', '2024-10-21 09:10:09', NULL, '1', '0', 0);
INSERT INTO `tb_message_list` VALUES (7, '41', '创建线索', '线索(测试消息)创建成功', NULL, '11385', NULL, '11385', '2024-10-21 10:20:13', NULL, '1', '1', 0);
INSERT INTO `tb_message_list` VALUES (8, '51', '创建客户', '创建客户(测试客户信息)成功', NULL, '11385', NULL, '11385', '2024-10-22 09:55:05', NULL, '1', '1', 0);
INSERT INTO `tb_message_list` VALUES (9, 'null', '放回公海', '1条线索放回公海成功', NULL, '11385', NULL, '11385', '2024-10-22 15:27:15', NULL, '0', '0', 0);
INSERT INTO `tb_message_list` VALUES (10, 'null', '放回公海', '1条线索放回公海成功', NULL, '11385', NULL, '11385', '2024-10-22 15:27:31', NULL, '0', '0', 0);
INSERT INTO `tb_message_list` VALUES (11, '52', '转为客户', '线索(测试线索)转为客户成功', NULL, '11385', NULL, '11385', '2024-10-22 15:37:57', NULL, '0', '0', 0);
INSERT INTO `tb_message_list` VALUES (12, '53', '转为客户', '线索(cesh)转为客户成功', NULL, '11385', NULL, '11385', '2024-10-22 15:40:31', NULL, '0', '0', 0);
INSERT INTO `tb_message_list` VALUES (13, '43', '创建线索', '线索(测试备注)创建成功', NULL, '11385', NULL, '11385', '2024-10-23 10:33:54', NULL, '0', '0', 0);
INSERT INTO `tb_message_list` VALUES (14, '44', '创建线索', '线索(dddd)创建成功', NULL, '11385', NULL, '11385', '2024-10-23 10:35:24', NULL, '0', '0', 0);
INSERT INTO `tb_message_list` VALUES (15, '54', '创建客户', '创建客户(青岛微电子创新中心)成功', NULL, '11385', NULL, '11385', '2024-10-24 16:00:49', NULL, '0', '0', 0);
INSERT INTO `tb_message_list` VALUES (16, '57', '创建客户', '创建客户(客户名称)成功', NULL, '11386', NULL, '11386', '2024-10-31 18:13:29', NULL, '0', '0', 0);
INSERT INTO `tb_message_list` VALUES (17, '59', '创建客户', '创建客户(客户名称)成功', NULL, '11386', NULL, '11386', '2024-10-31 18:16:13', NULL, '0', '0', 0);
INSERT INTO `tb_message_list` VALUES (18, '60', '创建客户', '创建客户(中科芯云555)成功', NULL, '11386', NULL, '11386', '2024-10-31 18:21:03', NULL, '0', '0', 0);
INSERT INTO `tb_message_list` VALUES (19, '61', '创建客户', '创建客户(中科芯云555)成功', NULL, '11386', NULL, '11386', '2024-10-31 18:33:41', NULL, '0', '0', 0);
INSERT INTO `tb_message_list` VALUES (20, '62', '创建客户', '创建客户(中科芯云555)成功', NULL, '11386', NULL, '11386', '2024-10-31 18:34:16', NULL, '0', '0', 0);
INSERT INTO `tb_message_list` VALUES (21, '63', '创建客户', '创建客户(中科芯云555)成功', NULL, '11386', NULL, '11386', '2024-10-31 18:35:11', NULL, '0', '0', 0);
INSERT INTO `tb_message_list` VALUES (22, '64', '创建客户', '创建客户(中科芯云微电子科技有限公司444)成功', NULL, '11386', NULL, '11386', '2024-11-01 14:53:54', NULL, '0', '0', 0);
INSERT INTO `tb_message_list` VALUES (23, '45', '创建线索', '线索(123123)创建成功', NULL, '11416', NULL, '11416', '2025-01-22 15:10:10', NULL, '0', '0', 0);
INSERT INTO `tb_message_list` VALUES (24, '46', '创建线索', '线索(test)创建成功', NULL, '11386', NULL, '11386', '2025-01-22 15:19:55', NULL, '0', '0', 0);
INSERT INTO `tb_message_list` VALUES (25, '47', '创建线索', '线索(测试删除)创建成功', NULL, '11386', NULL, '11386', '2025-02-06 09:47:11', NULL, '0', '0', 0);
INSERT INTO `tb_message_list` VALUES (26, '48', '创建线索', '线索(testDel)创建成功', NULL, '11386', NULL, '11386', '2025-02-06 09:47:31', NULL, '0', '0', 0);
INSERT INTO `tb_message_list` VALUES (27, '65', '创建客户', '创建客户(测试客户信息1)成功', NULL, '11386', NULL, '11386', '2025-02-14 14:21:10', NULL, '0', '0', 0);
INSERT INTO `tb_message_list` VALUES (28, '66', '创建客户', '创建客户(测试联系方式)成功', NULL, '11386', NULL, '11386', '2025-02-14 15:21:19', NULL, '0', '0', 0);
INSERT INTO `tb_message_list` VALUES (29, '67', '转为客户', '线索(测试2)转为客户成功', NULL, '11386', NULL, '11386', '2025-02-14 16:50:34', NULL, '0', '0', 0);
INSERT INTO `tb_message_list` VALUES (30, '68', '创建客户', '创建客户(test)成功', NULL, '11386', NULL, '11386', '2025-02-17 10:50:58', NULL, '0', '0', 0);
INSERT INTO `tb_message_list` VALUES (31, '69', '转为客户', '线索(sdfsdf)转为客户成功', NULL, '11386', NULL, '11386', '2025-02-17 11:04:24', NULL, '0', '0', 0);
INSERT INTO `tb_message_list` VALUES (32, 'null', '领取线索', '1条线索领取成功', NULL, '11386', NULL, '11386', '2025-02-18 09:04:12', NULL, '0', '0', 0);
INSERT INTO `tb_message_list` VALUES (33, '50', '创建线索', '线索(test)创建成功', NULL, '11386', NULL, '11386', '2025-02-18 14:16:26', NULL, '0', '0', 0);
INSERT INTO `tb_message_list` VALUES (34, '70', '转为客户', '线索(testDel)转为客户成功', NULL, '11386', NULL, '11386', '2025-02-18 14:47:13', NULL, '0', '0', 0);
INSERT INTO `tb_message_list` VALUES (35, '51', '创建线索', '线索(测试公海删除)创建成功', NULL, '11386', NULL, '11386', '2025-02-18 16:17:06', NULL, '0', '0', 0);
INSERT INTO `tb_message_list` VALUES (36, 'null', '领取线索', '1条线索领取成功', NULL, '11386', NULL, '11386', '2025-02-18 16:17:16', NULL, '0', '0', 0);
INSERT INTO `tb_message_list` VALUES (37, '18', '线索(xiansuo)超过11天无跟进记录自动收回', '线索名称:xiansuo  领取时间:2024-10-12- 10:31:40  回收原因:超过最大期限内未曾提交跟进记录', NULL, '1', NULL, NULL, '2025-02-19 02:00:00', NULL, '0', '0', 0);
INSERT INTO `tb_message_list` VALUES (38, '19', '线索(xiansuo)超过11天无跟进记录自动收回', '线索名称:xiansuo  领取时间:2024-10-12- 10:34:00  回收原因:超过最大期限内未曾提交跟进记录', NULL, '1', NULL, NULL, '2025-02-19 02:00:00', NULL, '0', '0', 0);
INSERT INTO `tb_message_list` VALUES (39, '20', '线索(xiansuo)超过11天无跟进记录自动收回', '线索名称:xiansuo  领取时间:2024-10-12- 10:35:53  回收原因:超过最大期限内未曾提交跟进记录', NULL, '1', NULL, NULL, '2025-02-19 02:00:00', NULL, '0', '0', 0);
INSERT INTO `tb_message_list` VALUES (40, '21', '线索(xiansuo)超过11天无跟进记录自动收回', '线索名称:xiansuo  领取时间:2024-10-12- 10:36:03  回收原因:超过最大期限内未曾提交跟进记录', NULL, '1', NULL, NULL, '2025-02-19 02:00:00', NULL, '0', '0', 0);
INSERT INTO `tb_message_list` VALUES (41, '60', '线索(测试)超过11天无跟进记录自动收回', '线索名称:测试  领取时间:2024-10-17- 14:27:43  回收原因:超过最大期限内未曾提交跟进记录', NULL, '1', NULL, NULL, '2025-02-19 02:00:00', NULL, '0', '0', 0);
INSERT INTO `tb_message_list` VALUES (42, '66', '线索(测试线索)超过11天无跟进记录自动收回', '线索名称:测试线索  领取时间:2024-10-22- 15:27:51  回收原因:超过最大期限内未曾提交跟进记录', NULL, '1', NULL, NULL, '2025-02-19 02:00:00', NULL, '0', '0', 0);
INSERT INTO `tb_message_list` VALUES (43, '67', '线索(测试消息)超过11天无跟进记录自动收回', '线索名称:测试消息  领取时间:2024-10-22- 15:27:51  回收原因:超过最大期限内未曾提交跟进记录', NULL, '1', NULL, NULL, '2025-02-19 02:00:00', NULL, '0', '0', 0);
INSERT INTO `tb_message_list` VALUES (44, '70', '线索(dddd)超过11天无跟进记录自动收回', '线索名称:dddd  领取时间:2024-10-23- 10:35:37  回收原因:超过最大期限内未曾提交跟进记录', NULL, '1', NULL, NULL, '2025-02-19 02:00:00', NULL, '0', '0', 0);
INSERT INTO `tb_message_list` VALUES (45, '59', '线索(测试1)超过11天未新增跟进记录自动收回', '线索名称:测试1  领取时间:2024-10-17- 14:24:33  回收原因:超过最大期限内未新增跟进记录', NULL, '1', NULL, NULL, '2025-02-19 02:00:00', NULL, '0', '0', 0);
INSERT INTO `tb_message_list` VALUES (46, '69', '线索(测试备注)超过12天未转化为客户自动收回', '线索名称:测试备注  领取时间:2024-10-23- 10:34:15  回收原因:超过最大期限内未转化为客户', NULL, '1', NULL, NULL, '2025-02-19 02:00:00', NULL, '0', '0', 0);
INSERT INTO `tb_message_list` VALUES (47, '73', '线索(测试我的线索删除)超过11天无跟进记录自动收回', '线索名称:测试我的线索删除  领取时间:2025-02-18- 16:17:16  回收原因:超过最大期限内未曾提交跟进记录', NULL, '1', NULL, '11386', '2025-03-03 02:00:01', NULL, '0', '0', 0);
INSERT INTO `tb_message_list` VALUES (48, 'null', '领取线索', '1条线索领取成功', NULL, '11386', NULL, '11386', '2025-03-03 10:03:46', NULL, '0', '0', 0);
INSERT INTO `tb_message_list` VALUES (49, '74', '线索(测试)超过11天无跟进记录自动收回', '线索名称:测试  领取时间:2025-02-19- 09:24:53  回收原因:超过最大期限内未曾提交跟进记录', NULL, '1', NULL, '11386', '2025-03-04 02:00:01', NULL, '0', '0', 0);
INSERT INTO `tb_message_list` VALUES (50, '75', '线索(测试创建)超过11天无跟进记录自动收回', '线索名称:测试创建  领取时间:2025-02-24- 09:15:21  回收原因:超过最大期限内未曾提交跟进记录', NULL, '1', NULL, '11386', '2025-03-09 02:00:01', NULL, '0', '0', 0);
INSERT INTO `tb_message_list` VALUES (51, '76', '线索(测试)超过11天无跟进记录自动收回', '线索名称:测试  领取时间:2025-02-27- 14:43:05  回收原因:超过最大期限内未曾提交跟进记录', NULL, '1', NULL, '11386', '2025-03-12 02:00:01', NULL, '0', '0', 0);
INSERT INTO `tb_message_list` VALUES (52, '77', '线索(13123123)超过11天无跟进记录自动收回', '线索名称:13123123  领取时间:2025-02-27- 14:48:15  回收原因:超过最大期限内未曾提交跟进记录', NULL, '1', NULL, '11386', '2025-03-12 02:00:01', NULL, '0', '0', 0);
INSERT INTO `tb_message_list` VALUES (53, '78', '线索(xiansuo)超过11天无跟进记录自动收回', '线索名称:xiansuo  领取时间:2025-03-03- 10:03:46  回收原因:超过最大期限内未曾提交跟进记录', NULL, '1', NULL, '11403', '2025-03-16 02:00:01', NULL, '0', '0', 0);
INSERT INTO `tb_message_list` VALUES (54, '71', '转为客户', '线索(testdfsdfsdf)转为客户成功', NULL, '11386', NULL, '11386', '2025-07-04 14:27:26', NULL, '0', '0', 0);
INSERT INTO `tb_message_list` VALUES (55, '79', '线索(test)超过11天无跟进记录自动收回', '线索名称:test  领取时间:2025-07-02- 10:53:08  回收原因:超过最大期限内未曾提交跟进记录', NULL, '1', NULL, '11385', '2025-07-15 02:00:01', NULL, '0', '0', 0);
INSERT INTO `tb_message_list` VALUES (56, '81', '线索(etst)超过11天无跟进记录自动收回', '线索名称:etst  领取时间:2025-07-04- 16:43:30  回收原因:超过最大期限内未曾提交跟进记录', NULL, '1', NULL, '11386', '2025-07-17 02:00:01', NULL, '0', '0', 0);
INSERT INTO `tb_message_list` VALUES (57, 'null', '领取线索', '1条线索领取成功', NULL, '11385', NULL, '11385', '2025-11-21 09:46:06', NULL, '0', '0', 0);
INSERT INTO `tb_message_list` VALUES (58, 'null', '领取线索', '1条线索领取成功', NULL, '11386', NULL, '11386', '2025-12-01 09:20:07', NULL, '0', '0', 0);
INSERT INTO `tb_message_list` VALUES (59, '73', '创建客户', '创建客户(trest123123)成功', NULL, '11386', NULL, '11386', '2025-12-01 11:17:11', NULL, '0', '0', 0);
INSERT INTO `tb_message_list` VALUES (60, '74', '转为客户', '线索(测试1dsfsdf)转为客户成功', NULL, '11386', NULL, '11386', '2025-12-02 15:19:46', NULL, '0', '0', 0);
INSERT INTO `tb_message_list` VALUES (61, 'null', '领取线索', '1条线索领取成功', NULL, '11386', NULL, '11386', '2025-12-02 15:23:08', NULL, '0', '0', 0);
INSERT INTO `tb_message_list` VALUES (62, '75', '转为客户', '线索(测试线索转供应商)转为客户成功', NULL, '11386', NULL, '11386', '2025-12-02 15:24:00', NULL, '0', '0', 0);
INSERT INTO `tb_message_list` VALUES (63, 'null', '领取线索', '1条线索领取成功', NULL, '11386', NULL, '11386', '2025-12-02 15:27:55', NULL, '0', '0', 0);
INSERT INTO `tb_message_list` VALUES (64, '76', '创建供应商', '创建供应商(fsdfcx)成功', NULL, '11386', NULL, '11386', '2025-12-02 16:41:29', NULL, '0', '0', 0);
INSERT INTO `tb_message_list` VALUES (65, '77', '创建供应商', '创建供应商(test)成功', NULL, '11386', NULL, '11386', '2025-12-02 16:50:15', NULL, '0', '0', 0);
INSERT INTO `tb_message_list` VALUES (66, '82', '线索(xiansuo)超过11天无跟进记录自动收回', '线索名称:xiansuo  领取时间:2025-11-21- 09:46:06  回收原因:超过最大期限内未曾提交跟进记录', NULL, '1', NULL, '11385', '2025-12-04 02:00:00', NULL, '0', '0', 0);
INSERT INTO `tb_message_list` VALUES (67, '78', '创建客户', '创建客户(testdfsdfsdfdfsdf)成功', NULL, '11386', NULL, '11386', '2025-12-05 11:22:04', NULL, '0', '0', 0);
INSERT INTO `tb_message_list` VALUES (68, '85', '线索(测试)超过11天无跟进记录自动收回', '线索名称:测试  领取时间:2025-12-02- 15:27:55  回收原因:超过最大期限内未曾提交跟进记录', NULL, '1', NULL, '11386', '2025-12-15 02:00:00', NULL, '0', '0', 0);

SET FOREIGN_KEY_CHECKS = 1;
