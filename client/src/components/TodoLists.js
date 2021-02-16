import { useEffect } from 'react';
import { Table } from 'semantic-ui-react';
import { useContextTodos, INIT } from '../context/ContextTodo';
import Todo from './Todo';
import { BASE_URI } from '../config';

function TodoLists(props) {
  const { setOpen, setUpdate } = props;
  const { state, dispatch } = useContextTodos();

  useEffect(() => {
    if (!state.data.length) {
      Promise.all([getData('mysql'), getData('pgsql')])
        .then((res) => {
          // console.log([...res.flat()], state);
          dispatch({ type: INIT.SELECT, payload: [...res.flat()] });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [state, dispatch]);

  async function getData(database) {
    const data = await fetch(`${BASE_URI}/${database}/todos`);
    let dataConf = await data.json();
    dataConf = dataConf.map((val) => ({ ...val, source: database }));
    // console.log(dataConf);
    return dataConf;
  }

  return (
    <Table singleLine>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell width="15">Description</Table.HeaderCell>
          <Table.HeaderCell>Actions</Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {state && state.data.length ? (
          state.data.map((todo, i) => (
            <Todo
              key={`${todo.todo_id}${i}${todo.source}`}
              todo={todo}
              setOpen={setOpen}
              setUpdate={setUpdate}
            />
          ))
        ) : (
          <Table.Row></Table.Row>
        )}
      </Table.Body>
    </Table>
  );
}

export default TodoLists;
