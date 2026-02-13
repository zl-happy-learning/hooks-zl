import { FormEvent, useMemo, useState } from 'react';
import styles from './index.less';

type TodoItem = {
  id: number;
  text: string;
  completed: boolean;
};

const initialTodos: TodoItem[] = [
  { id: 1, text: '学习 React 19 新特性', completed: false },
  { id: 2, text: '完成一个 Todo List 示例', completed: true },
];

export default function IndexPage() {
  const [todos, setTodos] = useState<TodoItem[]>(initialTodos);
  const [inputValue, setInputValue] = useState('');

  const completedCount = useMemo(
    () => todos.filter((todo) => todo.completed).length,
    [todos],
  );

  const handleAddTodo = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextText = inputValue.trim();
    if (!nextText) {
      return;
    }

    setTodos((prev) => [
      ...prev,
      {
        id: Date.now(),
        text: nextText,
        completed: false,
      },
    ]);
    setInputValue('');
  };

  const toggleTodo = (id: number) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  };

  const handleDeleteTodo = (id: number) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  return (
    <main className={styles.container}>
      <h1 className={styles.title}>React 19 Todo List</h1>

      <form className={styles.form} onSubmit={handleAddTodo}>
        <input
          className={styles.input}
          value={inputValue}
          onChange={(event) => setInputValue(event.target.value)}
          placeholder="输入待办事项"
        />
        <button className={styles.button} type="submit">
          添加
        </button>
      </form>

      <p className={styles.summary}>
        总计 {todos.length} 项，已完成 {completedCount} 项
      </p>

      <ul className={styles.list}>
        {todos.map((todo) => (
          <li className={styles.item} key={todo.id}>
            <label className={styles.itemLabel}>
              <input
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id)}
                type="checkbox"
              />
              <span className={todo.completed ? styles.doneText : ''}>
                {todo.text}
              </span>
            </label>
            <button
              className={styles.deleteButton}
              onClick={() => handleDeleteTodo(todo.id)}
              type="button"
            >
              删除
            </button>
          </li>
        ))}
      </ul>
    </main>
  );
}
