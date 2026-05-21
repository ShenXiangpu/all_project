# -*- coding: utf-8 -*-
import pymysql

# 数据库连接配置
config = {
    'host': '124.222.0.245',
    'port': 3306,
    'user': 'root',
    'password': 'root',
    'charset': 'utf8mb4'
}

db_name = 'crm_system'

# SQL 创建表语句
sql_statements = [
    # 创建数据库
    f"CREATE DATABASE IF NOT EXISTS {db_name} CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;",
    f"USE {db_name};",

    # ============ 1. 字典类型表 ============
    """CREATE TABLE IF NOT EXISTS sys_dict_type (
        id BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT '字典主键',
        dict_name VARCHAR(100) NOT NULL COMMENT '字典名称',
        dict_type VARCHAR(100) NOT NULL UNIQUE COMMENT '字典类型',
        status CHAR(1) DEFAULT '1' COMMENT '状态（1正常 0停用）',
        create_time DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
        update_time DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
        remark VARCHAR(500) DEFAULT NULL COMMENT '备注'
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='字典类型表';""",

    # ============ 2. 字典数据表 ============
    """CREATE TABLE IF NOT EXISTS sys_dict_data (
        id BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT '字典编码',
        dict_sort INT DEFAULT 0 COMMENT '字典排序',
        dict_label VARCHAR(100) NOT NULL COMMENT '字典标签',
        dict_value VARCHAR(100) NOT NULL COMMENT '字典键值',
        dict_type VARCHAR(100) NOT NULL COMMENT '字典类型',
        css_class VARCHAR(100) DEFAULT NULL COMMENT '样式属性',
        list_class VARCHAR(100) DEFAULT NULL COMMENT '回显样式',
        is_default CHAR(1) DEFAULT 'N' COMMENT '是否默认（Y是 N否）',
        status CHAR(1) DEFAULT '1' COMMENT '状态（1正常 0停用）',
        create_time DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
        update_time DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
        remark VARCHAR(500) DEFAULT NULL COMMENT '备注'
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='字典数据表';""",

    # ============ 3. 部门表（组织） ============
    """CREATE TABLE IF NOT EXISTS sys_dept (
        id BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT '部门id',
        parent_id BIGINT DEFAULT 0 COMMENT '父部门id',
        ancestors VARCHAR(500) DEFAULT '' COMMENT '祖级列表',
        dept_name VARCHAR(100) NOT NULL COMMENT '部门名称',
        order_num INT DEFAULT 0 COMMENT '显示顺序',
        leader VARCHAR(100) DEFAULT NULL COMMENT '负责人',
        phone VARCHAR(100) DEFAULT NULL COMMENT '联系电话',
        email VARCHAR(100) DEFAULT NULL COMMENT '邮箱',
        status CHAR(1) DEFAULT '1' COMMENT '部门状态（1正常 0停用）',
        del_flag CHAR(1) DEFAULT '0' COMMENT '删除标志（0存在 2删除）',
        create_time DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
        update_time DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间'
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='部门表';""",

    # ============ 4. 岗位表 ============
    """CREATE TABLE IF NOT EXISTS sys_post (
        id BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT '岗位id',
        post_code VARCHAR(100) DEFAULT NULL COMMENT '岗位编码',
        post_name VARCHAR(100) NOT NULL COMMENT '岗位名称',
        dept_id BIGINT NOT NULL COMMENT '所属部门id',
        post_sort INT DEFAULT 0 COMMENT '显示顺序',
        status CHAR(1) DEFAULT '1' COMMENT '状态（1正常 0停用）',
        create_time DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
        update_time DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
        remark VARCHAR(500) DEFAULT NULL COMMENT '备注'
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='岗位信息表';""",

    # ============ 5. 角色表 ============
    """CREATE TABLE IF NOT EXISTS sys_role (
        id BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT '角色id',
        role_name VARCHAR(100) NOT NULL COMMENT '角色名称',
        role_key VARCHAR(100) NOT NULL COMMENT '角色权限字符串',
        role_type TINYINT DEFAULT 1 COMMENT '角色类型（1内置角色 2自定义角色）',
        data_scope CHAR(1) DEFAULT '1' COMMENT '数据范围',
        menu_check_strictly TINYINT DEFAULT 1 COMMENT '菜单树选择项是否关联显示',
        dept_check_strictly TINYINT DEFAULT 1 COMMENT '部门树选择项是否关联显示',
        status CHAR(1) NOT NULL COMMENT '状态（1正常 0停用）',
        del_flag CHAR(1) DEFAULT '0' COMMENT '删除标志（0存在 2删除）',
        create_time DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
        update_time DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
        remark VARCHAR(500) DEFAULT NULL COMMENT '备注'
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='角色信息表';""",

    # ============ 6. 用户表 ============
    """CREATE TABLE IF NOT EXISTS sys_user (
        id BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT '用户id',
        user_name VARCHAR(100) NOT NULL COMMENT '用户账号',
        nick_name VARCHAR(100) NOT NULL COMMENT '用户昵称',
        user_type VARCHAR(100) DEFAULT '00' COMMENT '用户类型',
        email VARCHAR(100) DEFAULT NULL COMMENT '用户邮箱',
        phone VARCHAR(100) DEFAULT NULL COMMENT '手机号码',
        sex CHAR(1) DEFAULT '0' COMMENT '用户性别（0男 1女 2未知）',
        avatar VARCHAR(500) DEFAULT '' COMMENT '头像地址',
        password VARCHAR(100) DEFAULT NULL COMMENT '密码',
        dept_id BIGINT DEFAULT NULL COMMENT '部门id',
        status CHAR(1) DEFAULT '1' COMMENT '状态（1正常 0停用）',
        del_flag CHAR(1) DEFAULT '0' COMMENT '删除标志（0存在 2删除）',
        login_ip VARCHAR(100) DEFAULT NULL COMMENT '最后登录IP',
        login_date DATETIME DEFAULT NULL COMMENT '最后登录时间',
        create_time DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
        update_time DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
        remark VARCHAR(500) DEFAULT NULL COMMENT '备注'
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='用户信息表';""",

    # ============ 7. 用户和角色关联表 ============
    """CREATE TABLE IF NOT EXISTS sys_user_role (
        id BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT '主键',
        user_id BIGINT NOT NULL COMMENT '用户id',
        role_id BIGINT NOT NULL COMMENT '角色id',
        create_time DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间'
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='用户和角色关联表';""",

    # ============ 8. 菜单权限表 ============
    """CREATE TABLE IF NOT EXISTS sys_menu (
        id BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT '菜单id',
        menu_name VARCHAR(100) NOT NULL COMMENT '菜单名称',
        parent_id BIGINT DEFAULT 0 COMMENT '父菜单ID',
        order_num INT DEFAULT 0 COMMENT '显示顺序',
        path VARCHAR(200) DEFAULT '' COMMENT '路由地址',
        component VARCHAR(255) DEFAULT NULL COMMENT '组件路径',
        menu_type CHAR(1) DEFAULT '' COMMENT '菜单类型（M目录 C菜单 F按钮）',
        visible CHAR(1) DEFAULT '1' COMMENT '菜单状态（1显示 0隐藏）',
        status CHAR(1) DEFAULT '1' COMMENT '菜单状态（1正常 0停用）',
        perms VARCHAR(100) DEFAULT NULL COMMENT '权限标识',
        icon VARCHAR(100) DEFAULT '#' COMMENT '菜单图标',
        create_time DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
        update_time DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
        remark VARCHAR(500) DEFAULT '' COMMENT '备注'
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='菜单权限表';""",

    # ============ 9. 角色和菜单关联表 ============
    """CREATE TABLE IF NOT EXISTS sys_role_menu (
        id BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT '主键',
        role_id BIGINT NOT NULL COMMENT '角色id',
        menu_id BIGINT NOT NULL COMMENT '菜单id',
        create_time DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间'
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='角色和菜单关联表';"""
]

# 初始化数据
init_data = [
    # 字典类型数据
    """INSERT INTO sys_dict_type (dict_name, dict_type, status, remark) VALUES
    ('用户性别', 'sys_user_sex', '1', '用户性别列表'),
    ('菜单状态', 'sys_show_hide', '1', '菜单状态列表'),
    ('菜单类型', 'sys_menu_type', '1', '菜单类型列表'),
    ('系统开关', 'sys_normal_disable', '1', '系统开关列表')
    ON DUPLICATE KEY UPDATE dict_name=VALUES(dict_name);""",

    # 字典数据
    """INSERT INTO sys_dict_data (dict_sort, dict_label, dict_value, dict_type, list_class, is_default, status) VALUES
    (1, '男', '0', 'sys_user_sex', 'primary', 'Y', '1'),
    (2, '女', '1', 'sys_user_sex', 'danger', 'N', '1'),
    (1, '显示', '1', 'sys_show_hide', 'primary', 'Y', '1'),
    (2, '隐藏', '0', 'sys_show_hide', 'danger', 'N', '1'),
    (1, '目录', 'CATALOG', 'sys_menu_type', 'warning', 'N', '1'),
    (2, '菜单', 'MENU', 'sys_menu_type', 'primary', 'N', '1'),
    (3, '按钮', 'BUTTON', 'sys_menu_type', 'success', 'N', '1'),
    (1, '启用', '1', 'sys_normal_disable', 'primary', 'Y', '1'),
    (2, '停用', '0', 'sys_normal_disable', 'danger', 'N', '1')
    ON DUPLICATE KEY UPDATE dict_label=VALUES(dict_label);""",

    # 部门数据
    """INSERT INTO sys_dept (id, parent_id, ancestors, dept_name, order_num, status) VALUES
    (1, 0, '0', '总公司', 1, '1'),
    (2, 1, '0,1', '技术部', 2, '1'),
    (3, 1, '0,1', '市场部', 3, '1')
    ON DUPLICATE KEY UPDATE dept_name=VALUES(dept_name);""",

    # 岗位数据
    """INSERT INTO sys_post (id, post_code, post_name, dept_id, post_sort, status) VALUES
    (1, 'CEO', '总经理', 1, 1, '1'),
    (2, 'VP', '副总经理', 1, 2, '1'),
    (3, 'TM', '技术经理', 2, 1, '1'),
    (4, 'FE', '前端工程师', 2, 2, '1'),
    (5, 'BE', '后端工程师', 2, 3, '1'),
    (6, 'MM', '市场经理', 3, 1, '1'),
    (7, 'MS', '市场专员', 3, 2, '1')
    ON DUPLICATE KEY UPDATE post_name=VALUES(post_name);""",

    # 角色数据
    """INSERT INTO sys_role (id, role_name, role_key, role_type, status, remark) VALUES
    (1, '超级管理员', 'ROOT', 1, '1', '最高权限角色'),
    (2, '系统管理员', 'ADMIN', 1, '1', '系统管理'),
    (3, '普通用户', 'USER', 1, '1', '普通用户'),
    (4, '外部用户', 'EXTERNAL', 2, '1', '外部用户角色')
    ON DUPLICATE KEY UPDATE role_name=VALUES(role_name);""",

    # 用户数据（密码为 admin123 的 MD5）
    """INSERT INTO sys_user (id, user_name, nick_name, email, phone, dept_id, status) VALUES
    (1, 'admin', '管理员', 'admin@crm.com', '13800000001', 2, '1'),
    (2, 'zhangsan', '张三', 'zhangsan@crm.com', '13800000002', 2, '1'),
    (3, 'lisi', '李四', 'lisi@crm.com', '13800000003', 3, '1')
    ON DUPLICATE KEY UPDATE nick_name=VALUES(nick_name);""",

    # 用户角色关联
    """INSERT INTO sys_user_role (user_id, role_id) VALUES
    (1, 1),
    (2, 3),
    (3, 3)
    ON DUPLICATE KEY UPDATE role_id=VALUES(role_id);""",

    # 菜单数据
    """INSERT INTO sys_menu (id, menu_name, parent_id, order_num, path, component, menu_type, visible, status, perms, icon) VALUES
    (1, '系统管理', 0, 1, '/system', NULL, 'C', '1', '1', '', 'settings-outline'),
    (2, '字典管理', 1, 1, 'dict', 'system/dict/index', 'C', '1', '1', 'system:dict:list', ''),
    (3, '菜单管理', 1, 2, 'menu', 'system/menu/index', 'C', '1', '1', 'system:menu:list', ''),
    (4, '组织管理', 1, 3, 'org', 'system/org/index', 'C', '1', '1', 'system:org:list', ''),
    (5, '角色管理', 1, 4, 'role', 'system/role/index', 'C', '1', '1', 'system:role:list', ''),
    (6, '用户管理', 1, 5, 'user', 'system/user/index', 'C', '1', '1', 'system:user:list', ''),
    (7, '新增字典', 2, 1, '', NULL, 'F', '1', '1', 'system:dict:add', ''),
    (8, '删除字典', 2, 2, '', NULL, 'F', '1', '1', 'system:dict:delete', ''),
    (9, '新增菜单', 3, 1, '', NULL, 'F', '1', '1', 'system:menu:add', ''),
    (10, '修改菜单', 3, 2, '', NULL, 'F', '1', '1', 'system:menu:edit', ''),
    (11, '删除菜单', 3, 3, '', NULL, 'F', '1', '1', 'system:menu:delete', ''),
    (12, '新增角色', 5, 1, '', NULL, 'F', '1', '1', 'system:role:add', ''),
    (13, '新增用户', 6, 1, '', NULL, 'F', '1', '1', 'system:user:add', ''),
    (14, '修改用户', 6, 2, '', NULL, 'F', '1', '1', 'system:user:edit', ''),
    (15, '删除用户', 6, 3, '', NULL, 'F', '1', '1', 'system:user:delete', '')
    ON DUPLICATE KEY UPDATE menu_name=VALUES(menu_name);""",

    # 角色菜单关联
    """INSERT INTO sys_role_menu (role_id, menu_id) VALUES
    (1, 1), (1, 2), (1, 3), (1, 4), (1, 5), (1, 6), (1, 7), (1, 8), (1, 9), (1, 10), (1, 11), (1, 12), (1, 13), (1, 14), (1, 15),
    (2, 1), (2, 2), (2, 3), (2, 4), (2, 5), (2, 6),
    (3, 1), (3, 6)
    ON DUPLICATE KEY UPDATE menu_id=VALUES(menu_id);"""
]

def main():
    print("=" * 60)
    print("CRM 系统数据库初始化脚本")
    print("=" * 60)

    try:
        # 连接数据库
        print(f"\n[1] 连接数据库 {config['host']}:{config['port']}...")
        conn = pymysql.connect(**config)
        cursor = conn.cursor()
        print("✅ 连接成功!")

        # 创建数据库和表
        print(f"\n[2] 创建数据库 '{db_name}'...")
        cursor.execute(f"CREATE DATABASE IF NOT EXISTS {db_name} CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;")
        cursor.execute(f"USE {db_name};")
        print(f"✅ 数据库 '{db_name}' 就绪!")

        # 执行建表语句
        print("\n[3] 创建数据表...")
        table_names = [
            'sys_dict_type', 'sys_dict_data', 'sys_dept', 'sys_post',
            'sys_role', 'sys_user', 'sys_user_role', 'sys_menu', 'sys_role_menu'
        ]

        # 分别执行每个建表语句
        for i, sql in enumerate(sql_statements[3:], 1):  # 跳过前两个（数据库相关）
            sql = sql.strip()
            if sql:
                try:
                    cursor.execute(sql)
                    print(f"   ✅ {table_names[i-1]}")
                except Exception as e:
                    print(f"   ⚠️ {table_names[i-1]}: {e}")

        conn.commit()

        # 插入初始化数据
        print("\n[4] 插入初始化数据...")
        for sql in init_data:
            sql = sql.strip()
            if sql:
                try:
                    cursor.execute(sql)
                    print("   ✅ 数据插入成功")
                except Exception as e:
                    print(f"   ⚠️ 数据插入: {e}")

        conn.commit()

        # 验证表结构
        print("\n[5] 验证数据库表...")
        cursor.execute("SHOW TABLES;")
        tables = cursor.fetchall()
        print(f"   共创建 {len(tables)} 个表:")
        for t in tables:
            print(f"   - {t[0]}")

        # 显示数据统计
        print("\n[6] 数据统计:")
        for t in tables:
            table_name = t[0]
            cursor.execute(f"SELECT COUNT(*) FROM {table_name};")
            count = cursor.fetchone()[0]
            print(f"   {table_name}: {count} 条记录")

        print("\n" + "=" * 60)
        print("✅ 数据库初始化完成!")
        print("=" * 60)

        cursor.close()
        conn.close()

    except Exception as e:
        print(f"\n❌ 错误: {e}")
        raise

if __name__ == '__main__':
    main()
