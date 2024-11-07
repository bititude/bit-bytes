import { TodoProvider } from './TodoContext';

export const TodoProviderWrapper: React.FC = ({ children }) => (
  <TodoProvider>{children}</TodoProvider>
);
