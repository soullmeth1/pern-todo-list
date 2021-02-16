const { pool } = require('../db');

const app = require('express').Router();

app.get('/todos', async (req, res) => {
  const qry = await pool.query('SELECT * FROM todo ORDER BY todo_id ASC');
  res.json(qry.rows);
});

app.get('/todos/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const qry = await pool.query('SELECT * FROM todo WHERE todo_id = $1', [id]);
    if (!qry.rowCount) {
      throw new Error('Data tidak ditemukan');
    }
    res.json(qry.rows);
  } catch (error) {
    // console.log(error);
    res.json({ message: error.message });
  }
});

app.post('/todos', async (req, res) => {
  const { description: desc } = req.body;
  try {
    const query = await pool
      .query('INSERT INTO todo (description) VALUES ($1) RETURNING *', [desc])
      .then((res) => {
        const data = res.rows[0];
        // console.log(res);
        return { message: 'sukses menambah data', data };
      });
    res.json(query);
  } catch (error) {
    // console.log(error);
    res.json({ message: error.message });
  }
});

app.put('/todos/:id', async (req, res) => {
  const { id } = req.params;
  const { description: desc } = req.body;
  try {
    const query = await pool.query(
      'UPDATE todo SET description = $1 WHERE todo_id = $2',
      [desc, id]
    );
    // console.log(query);
    if (!query.rowCount) {
      throw new Error('data tidak ditemukan');
    }
    res.json({ message: 'sukses mengubah data' });
  } catch (error) {
    // console.log(error);
    res.json({ message: error.message });
  }
});

app.delete('/todos/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const data = await pool.query(
      `DELETE FROM todo WHERE todo_id = ${id} returning *`
    );
    if (!data.rowCount)
      throw new Error('Tidak dapat menemukan data untuk dihapus');
    // console.log(data);
    res.json({ message: 'sukses menghapus data' });
  } catch (error) {
    console.log(error);
    res.json({ message: error.message });
  }
});

module.exports = app;
