import { TodoProvider } from './pages/Todo/contexts/TodoContext/TodoContext';
import Router from './Router';

function App() {
  return (
    <TodoProvider>
      <Router />
    </TodoProvider>
  );
}

export default App;
