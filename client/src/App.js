import { useState } from 'react';
import { Container, Divider } from 'semantic-ui-react';
import InputForm from './components/InputForm';
import ModalTodo from './components/ModalTodo';
import TodoLists from './components/TodoLists';
import ContextTodoWrapper from './context/ContextTodo';

function App() {
  const [open, setOpen] = useState(false);
  const [update, setUpdate] = useState();
  return (
    <ContextTodoWrapper>
      <Container>
        <h1 style={{ marginTop: '5rem' }}>Lists Todo</h1>
        <InputForm />
        <Divider section />
        <TodoLists setOpen={setOpen} setUpdate={setUpdate} />
        <ModalTodo {...{ open, setOpen, update }} />
      </Container>
    </ContextTodoWrapper>
  );
}

export default App;
