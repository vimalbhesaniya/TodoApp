import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);
  const [value, setValue] = useState("");
  const [index, setIndex] = useState();
  const [mode, setMode] = useState("add");
  const [prevValue, setPrevValue] = useState("add");
  const [isDisabled, setIsDisabled] = useState(true);

  const handleChange = (value) => {
    if (value) {
      setIsDisabled(false);
      setValue(value);
    } else {
      setValue("");
      setIsDisabled(true);
    }
  };

  const handleAddTodo = () => {
    if (mode === "add") {
      setTodos((prev) => [...prev, value]);
      setValue("");
    } else {
      setTodos((previous) => {
        return previous.map((prevValue, prevIndex) => {
          if (prevIndex === index) {
            return value;
          }

          return prevValue;
        });
      });
      setValue("");
      setPrevValue("");
      setMode("add");
    }
  };

  const handleEdit = (index) => {
    const valueToEdit = todos.find((_, indexToFind) => indexToFind === index);

    if (valueToEdit) {
      setValue(valueToEdit);
      setIndex(index);
      setMode("edit");
      setPrevValue(valueToEdit);
    }
  };

  useEffect(() => {
    mode === "edit" && setIsDisabled(value === prevValue);
  }, [value]);

  const handleDelete = (todo, index) => {
    const isConfirm = window.confirm(
      `Are you sure you want's to delete ${todo} Todo?`
    );

    if (isConfirm) {
      setTodos((previous) => {
        return previous.filter((_, prevIndex) => index !== prevIndex);
      });
    }

    return;
  };

  return (
    <div className="container">
      <div className="childContainer">
        <div className="todoContainer">
          <input
            type="text"
            value={value}
            onKeyDown={(event) =>
              event.key === "Enter" && handleAddTodo(event.currentTarget.value)
            }
            placeholder="Add Task"
            onChange={(event) => handleChange(event.target.value)}
          />

          <button
            style={{
              height: "100%",
              background: isDisabled ? "#5dacbd" : "#24527a",
              cursor: isDisabled ? "auto" : "pointer",
            }}
            disabled={isDisabled}
            onClick={() => handleAddTodo()}
          >
            {mode === "add" ? "Add" : "Edit"}
          </button>
        </div>

        <div className="listTodos">
          <table>
            <thead>
              <tr>
                <th style={{ width: "70%" }}>Task</th>

                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {todos.map((todo, index) => {
                return (
                  <tr>
                    <td
                      style={{
                        padding: "0 10px",
                        background: "#e7eaf6",
                      }}
                    >
                      {todo}
                    </td>

                    <td
                      style={{
                        padding: "10px",
                      }}
                    >
                      <div className="todoAction">
                        <button
                          style={{ background: "#007cb9" }}
                          onClick={() => handleEdit(index)}
                        >
                          Edit
                        </button>

                        <button
                          style={{ background: "#dc2f2f" }}
                          onClick={() => handleDelete(todo, index)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {!todos.length && (
            <div className="noTodoFound">
              <p style={{ color: "red", textAlign: "center" }}>No Task Found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
