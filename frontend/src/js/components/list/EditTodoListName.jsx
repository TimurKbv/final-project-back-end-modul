


function EditTodoListName({editListNameHandler, setListNameText, listNameText}) {
    

    return (
        <form  onSubmit={editListNameHandler} className="w-full bg-gray-800 p-3 rounded-2xl ">
            <input 
                type="text" 
                id="edit-listname-input" 
                value={listNameText} 
                onChange={evt => setListNameText(evt.target.value)} 
                className=" bg-transparent w-full border-none outline-none"
                placeholder="Edit list"
            />
        </form>
    )
}

export default EditTodoListName;