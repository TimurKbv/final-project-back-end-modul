


function CreateTodoList({setNewListName, newListName, addNewList}) {
    

    return (
        <div className="flex mx-auto w-1/3 items-center justify-between my-4 rounded-2xl bg-gray-800 p-5 hover:bg-gray-900 hover:text-gray-50 transition-colors duration-300">

            <form  onSubmit={addNewList} className="w-full ">
                <input 
                    type="text" 
                    id="new-listname-input" 
                    value={newListName} 
                    onChange={evt => setNewListName(evt.target.value)} 
                    className=" bg-transparent w-full border-none outline-none "
                    placeholder="Add new list"
                />
            </form>
        </div>
    )
}

export default CreateTodoList;