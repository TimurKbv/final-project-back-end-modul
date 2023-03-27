import EditTodoListName from "./EditTodoListName";
import {VscClose, VscSettings} from 'react-icons/vsc';
import React, { useEffect, useState } from "react";
import axios from "axios";
import useAuthStore from "../../hooks/useAuthStore";


function EditFriendsModal({showModal, setShowModal, editListNameHandler, listNameText, setListNameText, list}) {
  const [username, setUsername] = useState();
  const token = useAuthStore(state => state.getToken());

  const fetchUsers = useAuthStore(state => state.fetchUsers);
  const users = useAuthStore(state => state.users);

useEffect(() => {
  fetchUsers(token);
}, []);


  return (
    <>

          <div
            className="backdrop-blur justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] border-0 relative flex flex-col w-full  text-gray-300 hover:text-gray-50 transition-colors duration-100 rounded-3xl bg-zinc-900  outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    Add Friends
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0  opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">

                  

                  <div className="flex flex-col mt-5">
                    <h5>Add friends to todolist</h5>

                    <form  onSubmit={() => {}} className="w-full bg-gray-800 p-3 rounded-2xl ">
                        <input 
                            type="text" 
                            id="edit-listname-input" 
                            value={username} 
                            onChange={evt => setUsername(evt.target.value)} 
                            className=" bg-transparent w-full border-none outline-none"
                            placeholder="Find friend"
                        />
                    </form>

                  </div>

                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>

    </>
  );
}

export default EditFriendsModal;