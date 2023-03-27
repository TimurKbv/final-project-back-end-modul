import { useEffect, useState } from 'react';
import axios from 'axios';
import useAuthStore from '../hooks/useAuthStore';
import TodoList from '../components/list/TodoList';
import {BiMessageAltAdd} from 'react-icons/bi';
import CreateTodoList from '../components/list/CreateTodoList';
import EditFriendsModal from '../components/list/EditFriendsModal';




function TodosPage() {

    const [todoLists, setTodoLists] = useState([]);
    // Zustand state managment
    const token = useAuthStore(state => state.getToken());
    const logout = useAuthStore(state => state.logout);
    // NEW LIST States
    const [newListName, setNewListName] = useState('');
    // MODAL
    // const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        try {
            fetchLists()
        } catch (error) {
            // Logge den Nutzer aus, denn Token ist abgelaufen
            logout();
        }
    }, [token, logout]);

    // fetche nur  todolist daten, ohne todos
    async function fetchLists() {
        try {
            // Fuehre axios Request auf protected Route durch
            // und definiere im options Objekt die Authorization, wo der Token reinkommt
            const resp = await axios.get('http://localhost:8080/todolists', {
                // withCredentials: true
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setTodoLists(resp.data.data)
        } catch (error) {
            console.log(error);
        }
    }
    async function addNewList(evt) {
        evt.preventDefault();
        try {
            let body = {
                name: newListName
            }
            // Fuehre axios Request auf protected Route durch
            // und definiere im options Objekt die Authorization, wo der Token reinkommt
            await axios.post('http://localhost:8080/todolists', body, {
                // withCredentials: true
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            
        } catch (error) {
            console.log(error);
        }
        setNewListName('');
        fetchLists();
    }

    async function deleteList(listId) {
        try {

            // Fuehre axios Request auf protected Route durch
            // und definiere im options Objekt die Authorization, wo der Token reinkommt
            await axios.delete('http://localhost:8080/todolists/' + listId, {
                // withCredentials: true
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

        } catch (error) {
            console.log(error);
        }
        fetchLists()
    }

    // Render TodoLists
    let todoListsComponents = todoLists.map(list => <TodoList key={list._id} list={list} fetchLists={fetchLists} deleteList={deleteList}/>)

    return (
        <main className='mt-14'>
                <CreateTodoList 
                    addNewList={addNewList}
                    newListName={newListName}
                    setNewListName={setNewListName}
                />
            <div className="container flex gap-10 flex-wrap justify-center ">
                {todoListsComponents}
            </div>
        </main>
    );
}

export default TodosPage;