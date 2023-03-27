import axios from "axios";
import { useEffect, useState } from "react";
import useAuthStore from "../../hooks/useAuthStore";
import Check from "./Check";
import {BsTrash} from 'react-icons/bs';
import {FiEdit} from 'react-icons/fi';





function Todo({todo, listId, deleteHandler}) {
    const [isCompleted, setIsCompleted] = useState(todo.isChecked);
    const [text, setText] = useState(todo.text);
    const [isEdited, setIsEdited] = useState(true);
    const token = useAuthStore(state => state.getToken());

    // HANDLE CHECKBOX
    async function handleCheckbox() {
        let newIsChecked = !isCompleted;
        setIsCompleted(newIsChecked);
        try {
            let data = {
                isChecked: newIsChecked,
            }
            await axios.put('http://localhost:8080/todolists/' + listId + '/todos/' + todo._id, data, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }               
            });
        } catch (error) {
            console.log(error);
        }
    }
    // SUBMIT CHANGES
    async function submitHandler(evt) {
        evt.preventDefault();
        setIsEdited(true);
        try {
            let data = {
                text: text
            }
            await axios.put('http://localhost:8080/todolists/' + listId + '/todos/' + todo._id, data, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }               
            });
        } catch (error) {
            console.log(error);
        }
    }
 
    return (
        <li className="flex items-center justify-between my-4 rounded-2xl bg-gray-800 p-5" >

 
            {
                isEdited 
                ? 
                    <div className="flex">

                        <Check isCompleted={isCompleted} handleCheckbox={handleCheckbox}/>
                        <span 
                            className={`cursor-pointer  ${isCompleted ? 'line-through' : ''}`} 
                            onClick={handleCheckbox}
                            >
                                {text}
                        </span> 
                        
                        
                    </div>
                : 
                <form onSubmit={submitHandler}>
                    <input 
                        className="bg-transparent w-full border-none outline-none" 
                        type="text" 
                        id="todo-edit-input" 
                        value={text} 
                        onChange={evt => setText(evt.target.value)} 
                    />
                </form>
            }

            <div className="flex items-center">
 
                <button onClick={() => deleteHandler(todo._id)}>
                    <BsTrash 
                        size={22} 
                        className="mr-3 text-gray-600 hover:text-red-700 cursor-pointer transition-colors ease-in-out duration-300 " 
                    />
                </button>

                <button onClick={() => setIsEdited(false)}>
                    <FiEdit 
                        size={22} 
                        className="mr-3 text-gray-600 hover:text-blue-700 cursor-pointer transition-colors ease-in-out duration-300 " 
                    />
                </button>

            </div>

        </li>
    )
}

export default Todo;