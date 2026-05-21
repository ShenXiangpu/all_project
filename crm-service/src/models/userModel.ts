import pool from '../config/database';

export interface User {
  id: number;
  user_name: string;
  nick_name: string;
  email: string | null;
  phone: string | null;
  dept_id: number | null;
  status: string;
  password?: string;
}

/**
 * 根据用户名查询用户
 */
export async function findUserByUsername(userName: string): Promise<User | null> {
  const [rows] = await pool.execute<any[]>(
    'SELECT * FROM sys_user WHERE user_name = ? AND status = ? AND del_flag = ?',
    [userName, '1', '0']
  );
  return rows.length > 0 ? rows[0] : null;
}

/**
 * 根据用户ID查询用户
 */
export async function findUserById(id: number): Promise<User | null> {
  const [rows] = await pool.execute<any[]>(
    'SELECT * FROM sys_user WHERE id = ? AND status = ? AND del_flag = ?',
    [id, '1', '0']
  );
  return rows.length > 0 ? rows[0] : null;
}

/**
 * 获取用户角色
 */
export async function getUserRoles(userId: number): Promise<string[]> {
  const [rows] = await pool.execute<any[]>(
    `SELECT r.role_key FROM sys_role r
     INNER JOIN sys_user_role ur ON r.id = ur.role_id
     WHERE ur.user_id = ? AND r.status = '1'`,
    [userId]
  );
  return rows.map((row: any) => row.role_key);
}
