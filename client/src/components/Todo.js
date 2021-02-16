import { Button, Table } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { INIT, useContextTodos } from '../context/ContextTodo';
import { BASE_URI } from '../config';

function Todo(props) {
  const { todo, setOpen, setUpdate } = props;
  const { dispatch } = useContextTodos();

  const handleClick = async (id, source) => {
    // console.log(id, source);
    fetch(`${BASE_URI}/${source}/todos/${id}`, {
      method: 'DELETE',
    })
      .catch((err) => console.log(err))
      .finally(() => dispatch({ type: INIT.DELETE, payload: { id, source } }));
  };

  const handleEdit = (data) => {
    // console.log(data);
    setUpdate(data);
    setOpen(true);
  };

  return (
    <Table.Row>
      <Table.Cell>{todo.description}</Table.Cell>
      <Table.Cell>
        <Button.Group>
          <Button primary onClick={() => handleEdit(todo)}>
            Edit
          </Button>
          <Button.Or />
          <Button
            color="red"
            onClick={() => handleClick(todo.todo_id, todo.source)}
          >
            Delete
          </Button>
        </Button.Group>
      </Table.Cell>
    </Table.Row>
  );
}

export default Todo;

Todo.propTypes = {
  todo: PropTypes.shape({
    todo_id: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    source: PropTypes.string.isRequired,
  }),
};
