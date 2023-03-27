import { useEffect, useState } from "react";
import Todo from "../todo/Todo";
import useAuthStore from "../../hooks/useAuthStore.js";
import axios from "axios";
import AddTodo from "../todo/AddTodo";
import {BiMessageSquareAdd} from 'react-icons/bi';
import EditTodoListName from "./EditTodoListName";
import {VscClose, VscSettings} from 'react-icons/vsc';
import {TbSettings} from 'react-icons/tb';
import EditList from "./EditFriendsModal";
import EditFriendsModal from "./EditFriendsModal";


// todo möglichkeit anbauen die rechte für todolisten den anderen user übergeben 

function TodoList({list, fetchLists, deleteList}) {
    const token = useAuthStore(state => state.getToken());
    const [todos, setTodos] = useState([]);
    const [isAddTodo, setIsAddTodo] = useState(false);
    const [todoText, setTodoText] = useState('');
    const [isEditListName, setIsEditListName] = useState(false);
    const [listNameText, setListNameText] = useState(list.name);
    /* -------------------------------------------------------- */
    // Todo:
    // const [showModal, setShowModal] = useState(false);


    useEffect(() => {
        try {
            fetchTodos();
        } catch (error) {
            console.log(error);
        }
    }, [list]);

    async function fetchTodos() {
        // Fuehre axios Request auf protected Route durch
        // und definiere im options Objekt die Authorization, wo der Token reinkommt
        const resp = await axios.get('http://localhost:8080/todolists/' + list._id + '/todos', {
            // withCredentials: true
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        setTodos(resp.data);
    }
    // ADD TODO
    async function addTodo(evt) {
        evt.preventDefault()
        if (todoText.length < 1) {
            console.log('Text mus be longer!');
            return
        }

        setIsAddTodo(false);
        try {
            let data = {
                text: todoText,
                isChecked: false
            }
            await axios.post('http://localhost:8080/todolists/' + list._id + '/todos/' , data, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }               
            });
        } catch (error) {
            console.log(error);
        }
        setTodoText('');  
        fetchTodos();
    }
    // DELETE TODO
    async function deleteTodo(todoId) {
        try {
            await axios.delete('http://localhost:8080/todolists/' + list._id + '/todos/' + todoId, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }               
            });
        } catch (error) {
            console.log(error);
        }
        fetchTodos();
    }
    // EDIT TODO-LIST
    async function editListNameHandler(evt) {
        evt.preventDefault();
        setIsEditListName(false);
        try {
            let data = {
                name: listNameText
            }
            await axios.put('http://localhost:8080/todolists/' + list._id , data, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }               
            });
        } catch (error) {
            console.log(error);
        }
        fetchLists()
    }

    let todoComponents = todos.map(todo => <Todo key={todo._id} todo={todo} listId={list._id} deleteHandler={deleteTodo}/>);

    return (
        <>

                <div className="relative text-gray-300 hover:text-gray-50 transition-colors duration-100 rounded-3xl bg-zinc-900  px-5 py-7 w-2/5 min-w-max shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)]">
                {
                    !isEditListName 
                    ?
                    <h3 onDoubleClick={() => setIsEditListName(true)} className="mt-3 font-bold text-xl cursor-context-menu">{list.name}</h3>
                    :
                    <EditTodoListName 
                        editListNameHandler={editListNameHandler}
                        listNameText={listNameText}
                        setListNameText={setListNameText}
                    />
                }
                <ul className="mt-7">
                    {todoComponents}
                </ul>

                <div id="add-todo">
                    {
                    !isAddTodo 
                    ?
                        <BiMessageSquareAdd 
                            onClick={() => setIsAddTodo(true)}
                            size={38} 
                            className=" text-green-400 mt-5 ml-2  cursor-pointer"
                        />
                    :
                        <AddTodo addTodo={addTodo} todoText={todoText} setTodoText={setTodoText} />
                    }
                </div>
            


                <VscSettings 
                    // onClick={() => setShowModal(true)}
                    size={22} 
                    className="text-blue-500 absolute top-3 right-12 cursor-pointer"
                />

                < VscClose
                    onClick={() => deleteList(list._id )} 
                    size={24} 
                    className="text-red-500 absolute top-3 right-3 cursor-pointer"
                />

            </div>

                    
{/*             { // Todo: 
                showModal &&
                <EditFriendsModal 
                    setShowModal={setShowModal}
                    editListNameHandler={editListNameHandler}
                    listNameText={listNameText}
                    setListNameText={setListNameText}
                    list={list}
                />
            } */}



        </>
        
    )
}

export default TodoList;