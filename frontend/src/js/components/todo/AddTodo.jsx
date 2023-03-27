


function AddTodo({addTodo, todoText, setTodoText}) {
    

    return (
        <div className="flex items-center justify-between my-4 rounded-2xl bg-gray-800 p-5">

            <form onSubmit={e => addTodo(e)} className="w-full" >
                <input 
                    type="text" 
                    id="todo-add-input" 
                    value={todoText} 
                    onChange={evt => setTodoText(evt.target.value)} 
                    className=" bg-transparent w-full border-none outline-none"
                    placeholder="Add a task"
                />
            </form>
        </div>
    )
}

export default AddTodo;