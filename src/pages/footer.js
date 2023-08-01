



export function TodoFooter({list, onClearCompleted}) {

  const completedSize = list.filter((todo) => todo.isCompleted).length

    return(
        <div>
            <span>{completedSize}/{list.length} Completed</span>
            <button onClick={onClearCompleted}>Clear Completed</button>
        </div>
    )
}

