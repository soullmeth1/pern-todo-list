import { useState } from 'react';
import { Form } from 'semantic-ui-react';
import { BASE_URI } from '../config';
import { INIT, useContextTodos } from '../context/ContextTodo';

const options = [
  { key: 'm', text: 'Mysql', value: 'mysql' },
  { key: 'p', text: 'Postgres', value: 'pgsql' },
];

function InputForm() {
  const [error, setError] = useState({ input: true, select: true });
  const [db, setDb] = useState('');
  const { dispatch } = useContextTodos();
  const [input, setInput] = useState({ description: '' });
  // console.log(db);

  const handleSubmit = async () => {
    if (db && input.description) {
      const { data } = await addData(db);
      dispatch({ type: INIT.ADD, payload: { ...data, source: db } });
      setInput({ description: '' });
    } else {
      setError({ input: input.description, select: db });
    }
  };

  const addData = async (db) => {
    const result = await fetch(`${BASE_URI}/${db}/todos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(input),
    });

    const dataResult = await result.json();
    console.log(dataResult);

    return dataResult;
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Input
          label="Description"
          placeholder="Description"
          width={15}
          value={input.description}
          error={!error.input ? true : false}
          onChange={(e, val) => {
            setInput({ description: val.value });
            setError({ ...error, input: true });
          }}
        />
        <Form.Select
          fluid
          label="Database"
          options={options}
          placeholder="Database"
          error={!error.select ? true : false}
          onChange={(e, data) => {
            // console.log(data);
            setDb(data.value);
            setError({ ...error, select: true });
          }}
        />
      </Form.Group>
      <Form.Button color="green">Submit</Form.Button>
    </Form>
  );
}

export default InputForm;
