
  
export function TodoItem({ todo, onChange }) {
    const handleCheckboxChange = (e) => {
      onChange({
        ...todo,
        isCompleted: e.target.checked,
      });
    };
  
    return (
      <div>
        <label>
          <input
            type={"checkbox"}
            checked={todo.isCompleted}
            onChange={handleCheckboxChange}
          />
          {todo.text}
        </label>
      </div>
    );
  }
