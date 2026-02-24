import { pool } from "../../config/database";
import { CreateAppointmentInput, UpdateAppointmentInput, Appointment } from "./appointment.entity";

export class AppointmentRepository {
  static async create(data: CreateAppointmentInput): Promise<Appointment> {
    const { barber_id, client_id, barbershop_id, service_id, start_time, end_time, price, status } = data;

    const query = `
      INSERT INTO appointments (
        id, barber_id, client_id, barbershop_id, service_id, 
        start_time, end_time, price, status
      )
      VALUES (
        gen_random_uuid(), $1, $2, $3, $4, $5, $6, $7, $8
      )
      RETURNING *
    `;

    const result = await pool.query(query, [
      barber_id,
      client_id,
      barbershop_id,
      service_id,
      start_time,
      end_time,
      price,
      status || "SCHEDULED",
    ]);

    return result.rows[0];
  }

  static async findById(id: string): Promise<Appointment | null> {
    const query = "SELECT * FROM appointments WHERE id = $1";
    const result = await pool.query(query, [id]);

    return result.rows[0] || null;
  }

  static async findAll(
    limit: number = 10,
    offset: number = 0
  ): Promise<{ appointments: Appointment[]; total: number }> {
    const appointmentsQuery = `
      SELECT * FROM appointments 
      ORDER BY start_time DESC 
      LIMIT $1 OFFSET $2
    `;
    const countQuery = "SELECT COUNT(*) FROM appointments";

    const [appointmentsResult, countResult] = await Promise.all([
      pool.query(appointmentsQuery, [limit, offset]),
      pool.query(countQuery),
    ]);

    return {
      appointments: appointmentsResult.rows,
      total: parseInt(countResult.rows[0].count),
    };
  }

  static async findByBarberId(barber_id: string): Promise<Appointment[]> {
    const query = `
      SELECT * FROM appointments 
      WHERE barber_id = $1 
      ORDER BY start_time DESC
    `;
    const result = await pool.query(query, [barber_id]);

    return result.rows;
  }

  static async findByClientId(client_id: string): Promise<Appointment[]> {
    const query = `
      SELECT * FROM appointments 
      WHERE client_id = $1 
      ORDER BY start_time DESC
    `;
    const result = await pool.query(query, [client_id]);

    return result.rows;
  }

  static async findByBarbershopId(barbershop_id: string): Promise<Appointment[]> {
    const query = `
      SELECT * FROM appointments 
      WHERE barbershop_id = $1 
      ORDER BY start_time DESC
    `;
    const result = await pool.query(query, [barbershop_id]);

    return result.rows;
  }

  static async findByDateRange(
    startDate: Date,
    endDate: Date
  ): Promise<Appointment[]> {
    const query = `
      SELECT * FROM appointments 
      WHERE start_time >= $1 AND end_time <= $2 
      ORDER BY start_time ASC
    `;
    const result = await pool.query(query, [startDate, endDate]);

    return result.rows;
  }

  static async findConflicting(
    barber_id: string,
    start_time: Date,
    end_time: Date,
    exclude_id?: string
  ): Promise<Appointment[]> {
    const query = exclude_id
      ? `
        SELECT * FROM appointments 
        WHERE barber_id = $1 
          AND status != 'CANCELLED'
          AND (
            (start_time < $3 AND end_time > $2)
            OR (start_time >= $2 AND start_time < $3)
            OR (end_time > $2 AND end_time <= $3)
          )
          AND id != $4
        ORDER BY start_time ASC
      `
      : `
        SELECT * FROM appointments 
        WHERE barber_id = $1 
          AND status != 'CANCELLED'
          AND (
            (start_time < $3 AND end_time > $2)
            OR (start_time >= $2 AND start_time < $3)
            OR (end_time > $2 AND end_time <= $3)
          )
        ORDER BY start_time ASC
      `;

    const result = exclude_id
      ? await pool.query(query, [barber_id, start_time, end_time, exclude_id])
      : await pool.query(query, [barber_id, start_time, end_time]);

    return result.rows;
  }

  static async update(id: string, data: UpdateAppointmentInput): Promise<Appointment | null> {
    const fields: string[] = [];
    const values: any[] = [];
    let paramCount = 1;

    if (data.barbershop_id !== undefined) {
      fields.push(`barbershop_id = $${paramCount++}`);
      values.push(data.barbershop_id);
    }
    if (data.service_id !== undefined) {
      fields.push(`service_id = $${paramCount++}`);
      values.push(data.service_id);
    }
    if (data.start_time !== undefined) {
      fields.push(`start_time = $${paramCount++}`);
      values.push(data.start_time);
    }
    if (data.end_time !== undefined) {
      fields.push(`end_time = $${paramCount++}`);
      values.push(data.end_time);
    }
    if (data.price !== undefined) {
      fields.push(`price = $${paramCount++}`);
      values.push(data.price);
    }
    if (data.status !== undefined) {
      fields.push(`status = $${paramCount++}`);
      values.push(data.status);
    }

    if (fields.length === 0) {
      return this.findById(id);
    }

    values.push(id);

    const query = `
      UPDATE appointments
      SET ${fields.join(", ")}
      WHERE id = $${paramCount + 1}
      RETURNING *
    `;

    const result = await pool.query(query, values);

    return result.rows[0] || null;
  }

  static async delete(id: string): Promise<boolean> {
    const query = "DELETE FROM appointments WHERE id = $1";
    const result = await pool.query(query, [id]);

    return result.rowCount ? result.rowCount > 0 : false;
  }

  static async exists(id: string): Promise<boolean> {
    const query = "SELECT EXISTS(SELECT 1 FROM appointments WHERE id = $1) as exists";
    const result = await pool.query(query, [id]);

    return result.rows[0].exists;
  }
}
