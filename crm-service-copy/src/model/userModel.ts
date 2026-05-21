// 假设 User 接口已定义，这里为了完整性展示一个简化的示例

import type { RowDataPacket } from "mysql2";
import pool from "../config/database.js";

// 实际项目中应导入真实的 User 类型
interface User extends RowDataPacket {
    id: number;
    user_name: string;
    password: string;
    // 其他字段...
}

// 1. 定义查询结果接口，必须继承 RowDataPacket
interface UserRoleResult extends RowDataPacket {
    role_id: number;
}

// 假设 pool 已正确导入和初始化
// import { pool } from './db'; 

export async function findUserByUsername(username: string): Promise<User | null> {
    // 注意：请根据实际的 sys_user 表结构调整字段列表
    const sql = 'SELECT id, user_name,password, status, del_flag FROM sys_user WHERE user_name = ? AND status = ? AND del_flag = ?';

    // 假设 mysql2 的 RowDataPacket 或自定义类型
    const [rows] = await pool.execute<User[]>(
        sql,
        [username, '1', '0'],
    );

    // 优化3: 简化逻辑，rows 总是数组，直接检查长度
    if (rows.length === 0) {
        return null;
    }

    // 优化4: 确保返回的对象符合 User 类型结构
    return rows[0]!; // 使用非空断言，因为我们已经检查了长度
}

export async function findUserById(id: number): Promise<User | null> {
    // 注意：请根据实际的 sys_user 表结构调整字段列表
    const sql = 'SELECT id, user_name, status, del_flag FROM sys_user WHERE id = ? AND status = ? AND del_flag = ?';

    // 假设 mysql2 的 RowDataPacket 或自定义类型
    const [rows] = await pool.execute<User[]>(
        sql,
        [id, '1', '0'],
    );

    if (rows.length === 0) {
        return null;
    }

    return rows[0]!;
}

/** 
 * 获取用户角色
*/
export async function getUserRoles(userId: number): Promise<string[]> {
    const sql = 'SELECT role_id FROM sys_user_role WHERE user_id = ?';

    // 假设 mysql2 的 RowDataPacket 或自定义类型
    const [rows] = await pool.execute<UserRoleResult[]>(
        sql,
        [userId],
    );

    // 优化5: 映射为字符串数组
    return rows.map((row) => row.role_id.toString());
}