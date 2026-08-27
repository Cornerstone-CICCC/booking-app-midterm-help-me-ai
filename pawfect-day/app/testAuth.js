import pg from 'pg';
import bcrypt from 'bcryptjs';

const { Pool } = pg;

const pool = new Pool({
  host: process.env.PGHOST,
  user: process.env.PGUSER,
  port: Number(process.env.PGPORT) || 5432,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  ssl: {
    rejectUnauthorized: false,
  },
});

async function runTest() {
  try {
    console.log('🔍 Conectando a Neon Postgres...');
    const result = await pool.query('SELECT id, email, password FROM users WHERE email = $1', ['staff@pawfectday.com']);

    if (result.rows.length === 0) {
      console.log('⚠️ El usuario staff@pawfectday.com NO existe en la BD.');
      return;
    }

    const user = result.rows[0];
    console.log('✅ Usuario encontrado:', user.email);
    console.log('🔑 Hash en BD:', user.password);

    const isMatch = await bcrypt.compare('password123', user.password);
    console.log('🔓 ¿Coincide la clave "password123"?:', isMatch);

  } catch (error) {
    console.error('❌ Error ejecutando la prueba:', error.message);
  } finally {
    await pool.end();
  }
}

runTest();