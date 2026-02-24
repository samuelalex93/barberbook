import { pool } from "../../config/database";
import { CreateUserInput, UpdateUserInput, User } from "./user.entity";

export class UserRepository {
  static async create(data: CreateUserInput): Promise<User> {
    const { name, email, password, role, barbershop_id, refresh_token } = data;

    const query = `
      INSERT INTO users (id, name, email, password, role, barbershop_id, refresh_token)
      VALUES (gen_random_uuid(), $1, $2, $3, $4, $5, $6)
      RETURNING *
    `;

    const result = await pool.query(query, [
      name,
      email,
      password,
      role,
      barbershop_id || null,
      refresh_token || null,
    ]);

    return result.rows[0];
  }

  static async findById(id: string): Promise<User | null> {
    const query = "SELECT * FROM users WHERE id = $1";
    const result = await pool.query(query, [id]);

    return result.rows[0] || null;
  }

  static async findByEmail(email: string): Promise<User | null> {
    const query = "SELECT * FROM users WHERE email = $1";
    const result = await pool.query(query, [email]);

    return result.rows[0] || null;
  }

  static async findAll(
    limit: number = 10,
    offset: number = 0
  ): Promise<{ users: User[]; total: number }> {
    const usersQuery = "SELECT * FROM users ORDER BY created_at DESC LIMIT $1 OFFSET $2";
    const countQuery = "SELECT COUNT(*) FROM users";

    const [usersResult, countResult] = await Promise.all([
      pool.query(usersQuery, [limit, offset]),
      pool.query(countQuery),
    ]);

    return {
      users: usersResult.rows,
      total: parseInt(countResult.rows[0].count),
    };
  }

  static async findByRole(role: string): Promise<User[]> {
    const query = "SELECT * FROM users WHERE role = $1 ORDER BY created_at DESC";
    const result = await pool.query(query, [role]);

    return result.rows;
  }

  static async findByBarbershopId(barbershop_id: string): Promise<User[]> {
    const query =
      "SELECT * FROM users WHERE barbershop_id = $1 ORDER BY created_at DESC";
    const result = await pool.query(query, [barbershop_id]);

    return result.rows;
  }

  static async update(id: string, data: UpdateUserInput): Promise<User | null> {
    const fields: string[] = [];
    const values: any[] = [];
    let paramCount = 1;

    if (data.name !== undefined) {
      fields.push(`name = $${paramCount++}`);
      values.push(data.name);
    }
    if (data.email !== undefined) {
      fields.push(`email = $${paramCount++}`);
      values.push(data.email);
    }
    if (data.password !== undefined) {
      fields.push(`password = $${paramCount++}`);
      values.push(data.password);
    }
    if (data.role !== undefined) {
      fields.push(`role = $${paramCount++}`);
      values.push(data.role);
    }
    if (data.barbershop_id !== undefined) {
      fields.push(`barbershop_id = $${paramCount++}`);
      values.push(data.barbershop_id);
    }
    if (data.refresh_token !== undefined) {
      fields.push(`refresh_token = $${paramCount++}`);
      values.push(data.refresh_token);
    }

    if (fields.length === 0) {
      return this.findById(id);
    }

    values.push(id);
    const query = `
      UPDATE users
      SET ${fields.join(", ")}
      WHERE id = $${paramCount}
      RETURNING *
    `;

    const result = await pool.query(query, values);

    return result.rows[0] || null;
  }

  static async delete(id: string): Promise<boolean> {
    const query = "DELETE FROM users WHERE id = $1";
    const result = await pool.query(query, [id]);

    return result.rowCount ? result.rowCount > 0 : false;
  }

  static async exists(email: string): Promise<boolean> {
    const query = "SELECT EXISTS(SELECT 1 FROM users WHERE email = $1) as exists";
    const result = await pool.query(query, [email]);

    return result.rows[0].exists;
  }

  static async updateRefreshToken(id: string, token: string | null): Promise<User | null> {
    const query = `
      UPDATE users
      SET refresh_token = $1
      WHERE id = $2
      RETURNING *
    `;

    const result = await pool.query(query, [token, id]);

    return result.rows[0] || null;
  }
}