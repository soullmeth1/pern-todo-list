import { useEffect, useState } from 'react';
import { Button, Divider, Input, Modal } from 'semantic-ui-react';
import { BASE_URI } from '../config';
import { INIT, useContextTodos } from '../context/ContextTodo';

function ModalTodo(props) {
  const { dispatch } = useContextTodos();
  const { open, setOpen, update } = props;
  const [inputUpdate, setInputUpdate] = useState({
    description: update?.description,
  });
  //   console.log(props);

  useEffect(() => {
    if (update) setInputUpdate({ description: update.description });
  }, [update]);

  const handleChange = (e, data) => {
    setInputUpdate({ description: data.value });
    // console.log(data);
  };

  const handleUpdate = () => {
    const newData = { ...update, ...inputUpdate };
    // console.log(newData);
    fetch(`${BASE_URI}/${newData.source}/todos/${newData.todo_id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ description: newData.description }),
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        // console.log(res);
        dispatch({ type: INIT.UPDATE, payload: { ...newData } });
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setOpen(false));
  };

  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
    >
      <Modal.Header>Edit Todo List</Modal.Header>
      <Modal.Content>
        <Modal.Description>
          {/* <Header>{update.description}</Header> */}
          <Input
            label="Update todo"
            onChange={(e, data) => handleChange(e, data)}
            defaultValue={update?.description}
          />
          <Divider />
          <p>Are you sure to edit this todo?</p>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button color="black" onClick={() => setOpen(false)}>
          No
        </Button>
        <Button
          content="Yes"
          labelPosition="right"
          icon="checkmark"
          onClick={handleUpdate}
          positive
        />
      </Modal.Actions>
    </Modal>
  );
}

export default ModalTodo;
