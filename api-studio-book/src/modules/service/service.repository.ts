import { pool } from "../../config/database";
import { CreateServiceInput, UpdateServiceInput, Service } from "./service.entity";

export class ServiceRepository {
  static async create(data: CreateServiceInput): Promise<Service> {
    const { name, description, price, duration_minutes, barbershop_id } = data;

    const query = `
      INSERT INTO services (id, name, description, price, duration_minutes, barbershop_id)
      VALUES (gen_random_uuid(), $1, $2, $3, $4, $5)
      RETURNING *
    `;

    const result = await pool.query(query, [
      name,
      description || null,
      price,
      duration_minutes,
      barbershop_id,
    ]);

    return result.rows[0];
  }

  static async findById(id: string): Promise<Service | null> {
    const query = "SELECT * FROM services WHERE id = $1";
    const result = await pool.query(query, [id]);

    return result.rows[0] || null;
  }

  static async findAll(
    limit: number = 10,
    offset: number = 0
  ): Promise<{ services: Service[]; total: number }> {
    const servicesQuery = `
      SELECT * FROM services 
      ORDER BY created_at DESC 
      LIMIT $1 OFFSET $2
    `;
    const countQuery = "SELECT COUNT(*) FROM services";

    const [servicesResult, countResult] = await Promise.all([
      pool.query(servicesQuery, [limit, offset]),
      pool.query(countQuery),
    ]);

    return {
      services: servicesResult.rows,
      total: parseInt(countResult.rows[0].count),
    };
  }

  static async findByBarbershopId(barbershop_id: string): Promise<Service[]> {
    const query = `
      SELECT * FROM services 
      WHERE barbershop_id = $1 
      ORDER BY created_at DESC
    `;
    const result = await pool.query(query, [barbershop_id]);

    return result.rows;
  }

  static async update(id: string, data: UpdateServiceInput): Promise<Service | null> {
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
    if (data.price !== undefined) {
      fields.push(`price = $${paramCount++}`);
      values.push(data.price);
    }
    if (data.duration_minutes !== undefined) {
      fields.push(`duration_minutes = $${paramCount++}`);
      values.push(data.duration_minutes);
    }

    if (fields.length === 0) {
      return this.findById(id);
    }

    fields.push(`updated_at = NOW()`);
    values.push(id);

    const query = `
      UPDATE services
      SET ${fields.join(", ")}
      WHERE id = $${paramCount + 1}
      RETURNING *
    `;

    const result = await pool.query(query, values);

    return result.rows[0] || null;
  }

  static async delete(id: string): Promise<boolean> {
    const query = "DELETE FROM services WHERE id = $1";
    const result = await pool.query(query, [id]);

    return result.rowCount ? result.rowCount > 0 : false;
  }

  static async exists(id: string): Promise<boolean> {
    const query = "SELECT EXISTS(SELECT 1 FROM services WHERE id = $1) as exists";
    const result = await pool.query(query, [id]);

    return result.rows[0].exists;
  }
}
