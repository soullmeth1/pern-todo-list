const { mysqlConn } = require('../db');

const app = require('express').Router();

app.get('/todos', async (req, res) => {
  const qry = await new Promise((resolve, reject) => {
    mysqlConn.query(
      'select * from todo ORDER BY todo_id ASC',
      (err, result) => {
        if (err) reject(err);
        resolve(result);
      }
    );
  });
  res.json(qry);
});

app.get('/todos/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const query = await new Promise((resolve, reject) => {
      mysqlConn.query(
        'SELECT * FROM todo WHERE todo_id = ?',
        [id],
        (err, result) => {
          if (err) reject(err);
          resolve(result);
        }
      );
    });
    if (!query.length) {
      throw new Error('Data tidak ditemukan');
    }
    res.json(query);
  } catch (error) {
    // console.log(error);
    res.json({ message: error.message });
  }
});

app.post('/todos', async (req, res) => {
  const { description: desc } = req.body;
  try {
    const query = await new Promise((resolve, reject) => {
      mysqlConn.query(
        'INSERT INTO todo (description) VALUES (?)',
        [desc],
        (err, result) => {
          if (err) reject(err);
          resolve(result);
        }
      );
    }).then((res) => {
      // console.log(res);
      const data = {
        todo_id: res.insertId,
        description: desc,
      };
      return { message: 'sukses menyimpan data', data };
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
    const query = await new Promise((resolve, reject) => {
      mysqlConn.query(
        'UPDATE todo set description = ? WHERE todo_id = ?',
        [desc, id],
        (err, result) => {
          if (err) reject(err);
          resolve(result);
        }
      );
    });
    // console.log(query);
    if (!query.affectedRows) {
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
    const data = await new Promise((resolve, reject) => {
      mysqlConn.query(
        `DELETE FROM todo WHERE todo_id = ?`,
        [id],
        (err, result) => {
          if (err) reject(err);
          resolve(result);
        }
      );
    });
    // console.log(data);
    if (!data.affectedRows)
      throw new Error('Tidak menemukan data untuk dihapus');
    res.json({ message: 'sukses menghapus data' });
  } catch (error) {
    // console.log(error);
    res.json({ message: error.message });
  }
});

module.exports = app;
