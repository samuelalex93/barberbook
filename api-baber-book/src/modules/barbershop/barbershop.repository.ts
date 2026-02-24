import { pool } from "../../config/database";
import { CreateBarbershopInput, UpdateBarbershopInput, Barbershop } from "./barbershop.entity";

export class BarbershopRepository {
  static async create(data: CreateBarbershopInput): Promise<Barbershop> {
    const { name, description, address, phone, owner_id } = data;

    const query = `
      INSERT INTO barbershops (id, name, description, address, phone, owner_id)
      VALUES (gen_random_uuid(), $1, $2, $3, $4, $5)
      RETURNING *
    `;

    const result = await pool.query(query, [
      name,
      description || null,
      address,
      phone || null,
      owner_id,
    ]);

    return result.rows[0];
  }

  static async findById(id: string): Promise<Barbershop | null> {
    const query = "SELECT * FROM barbershops WHERE id = $1";
    const result = await pool.query(query, [id]);

    return result.rows[0] || null;
  }

  static async findAll(
    limit: number = 10,
    offset: number = 0
  ): Promise<{ barbershops: Barbershop[]; total: number }> {
    const barbershopsQuery = `
      SELECT * FROM barbershops 
      ORDER BY created_at DESC 
      LIMIT $1 OFFSET $2
    `;
    const countQuery = "SELECT COUNT(*) FROM barbershops";

    const [barbershopsResult, countResult] = await Promise.all([
      pool.query(barbershopsQuery, [limit, offset]),
      pool.query(countQuery),
    ]);

    return {
      barbershops: barbershopsResult.rows,
      total: parseInt(countResult.rows[0].count),
    };
  }

  static async findByOwnerId(owner_id: string): Promise<Barbershop[]> {
    const query = "SELECT * FROM barbershops WHERE owner_id = $1 ORDER BY created_at DESC";
    const result = await pool.query(query, [owner_id]);

    return result.rows;
  }

  static async update(id: string, data: UpdateBarbershopInput): Promise<Barbershop | null> {
    const fields: string[] = [];
    const values: any[] = [];
    let paramCount = 1;

    if (data.name !== undefined) {
      fields.push(`name = $${paramCount++}`);
      values.push(data.name);
    }
    if (data.description !== undefined) {
      fields.push(`description = $${paramCount++}`);
      values.push(data.description);
    }
    if (data.address !== undefined) {
      fields.push(`address = $${paramCount++}`);
      values.push(data.address);
    }
    if (data.phone !== undefined) {
      fields.push(`phone = $${paramCount++}`);
      values.push(data.phone);
    }

    if (fields.length === 0) {
      return this.findById(id);
    }

    fields.push(`updated_at = NOW()`);
    values.push(id);

    const query = `
      UPDATE barbershops
      SET ${fields.join(", ")}
      WHERE id = $${paramCount + 1}
      RETURNING *
    `;

    const result = await pool.query(query, values);

    return result.rows[0] || null;
  }

  static async delete(id: string): Promise<boolean> {
    const query = "DELETE FROM barbershops WHERE id = $1";
    const result = await pool.query(query, [id]);

    return result.rowCount ? result.rowCount > 0 : false;
  }

  static async exists(id: string): Promise<boolean> {
    const query = "SELECT EXISTS(SELECT 1 FROM barbershops WHERE id = $1) as exists";
    const result = await pool.query(query, [id]);

    return result.rows[0].exists;
  }

  static async findByNameAndAddress(name: string, address: string): Promise<Barbershop | null> {
    const query = "SELECT * FROM barbershops WHERE name = $1 AND address = $2";
    const result = await pool.query(query, [name, address]);

    return result.rows[0] || null;
  }

  static async findWithOwnerDetails(id: string): Promise<(Barbershop & { owner?: any }) | null> {
    const query = `
      SELECT b.*, 
             json_object_agg(u.id, json_build_object('id', u.id, 'name', u.name, 'email', u.email)) as owner
      FROM barbershops b
      LEFT JOIN users u ON b.owner_id = u.id
      WHERE b.id = $1
      GROUP BY b.id
    `;
    const result = await pool.query(query, [id]);

    return result.rows[0] || null;
  }
}
