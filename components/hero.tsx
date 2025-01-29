"use client";

import { useState, useEffect } from "react";
import { InfoIcon } from "lucide-react";

interface Todo {
  id: string;
  task: string;
  completed: boolean;
}

export default function ProtectedPage() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTask, setNewTask] = useState<string>("");
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);

    const fetchTodos = async () => {
      try {
        const res = await fetch("/api/todos");

        if (!res.ok) {
          throw new Error('Failed to fetch todos');
        }

        const data = res.status === 204 ? [] : await res.json();
        setTodos(data);
      } catch (error) {
        console.error('Error fetching todos:', error);
      }
    };

    fetchTodos();
  }, []);

  const handleAddTodo = async () => {
    if (newTask.trim() === "") return;

    const res = await fetch("/api/todos", {
      method: "POST",
      body: JSON.stringify({ task: newTask }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const newTodo: Todo = await res.json();
    setTodos([...todos, newTodo]);
    setNewTask("");
  };

  const handleToggleTodo = async (id: string, completed: boolean) => {
    const res = await fetch("/api/todos", {
      method: "PATCH",
      body: JSON.stringify({ id, completed: !completed }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const updatedTodo: Todo = await res.json();
    setTodos(todos.map(todo => (todo.id === id ? updatedTodo : todo)));
  };

  const handleDeleteTodo = async (id: string) => {
    console.log("Deleting todo with id:", id);
  
    const res = await fetch("/api/todos", {
      method: "DELETE",
      body: JSON.stringify({ id }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  
    const result = await res.json();
  
    if (res.ok) {
      setTodos(todos.filter(todo => todo.id !== id));
    } else {
      console.error(result.error || result.message);
      alert(result.error || result.message);
    }
  };

  if (!isClient) {
    return null;
  }

  return (
    <div className="flex-1 w-full flex flex-col gap-12">
      <div className="w-full">
        <div className="bg-accent text-sm p-3 px-5 rounded-md text-foreground flex gap-3 items-center shadow-md">
          <InfoIcon size="16" strokeWidth={2} />
          This is a protected page that you can only see as an authenticated user
        </div>
      </div>

      <div className="flex flex-col gap-2 items-start">
        <h2 className="font-bold text-2xl mb-4">My Todo List</h2>
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          className="p-2 border rounded mb-4 shadow-sm"
          placeholder="Add a new task"
        />
        <button
          onClick={handleAddTodo}
          className="px-4 py-2 bg-blue-500 text-white rounded shadow-md"
        >
          Add Todo
        </button>

        {todos.length === 0 ? (
          <p>No todos available</p>
        ) : (
          <ul className="mt-4">
            {todos.map((todo: Todo) => (
              todo ? (
                <li key={todo.id} className="flex justify-between items-center shadow-sm mb-2 p-2 rounded">
                  <span
                    className={`text-lg ${todo.completed ? 'line-through text-gray-400' : ''}`}
                  >
                    {todo.task}
                  </span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleToggleTodo(todo.id, todo.completed)}
                      className={`px-2 py-1 ${todo.completed ? 'bg-green-500' : 'bg-gray-500'} text-white rounded shadow-sm`}
                    >
                      {todo.completed ? 'Undo' : 'Complete'}
                    </button>
                    <button
                      onClick={() => handleDeleteTodo(todo.id)}
                      className="px-2 py-1 bg-red-500 text-white rounded shadow-sm"
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ) : null
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
