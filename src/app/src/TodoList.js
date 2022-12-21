function TodoList({ todos }) {
    return (
        <>
            <ul>
                {todos.length == 0 ? (<p>No todo !</p>) : todos.map((todo) => {
                    return <li key={todo._id}>{todo.todoText}</li>
                })}
            </ul>
        </>
    )
}

export default TodoList;