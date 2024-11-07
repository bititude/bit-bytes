import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Todo from './pages/Todo/Todo';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Todo />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
