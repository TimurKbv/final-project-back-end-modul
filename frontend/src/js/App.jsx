import '../scss/App.scss';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './pages/Layout';
import TodosPage from './pages/TodosPage';
import PrivateRoute from './services/PrivateRoute';
import Register from './pages/Register';
import Login from './pages/Login';
import UserProfile from './pages/UserProfile';

function App() {

  return (
    <div className="App bg-zinc-800 text-white py-5">
      <div className='container mx-auto min-h-screen relative  w-5/6'>
        <h1 className='text-4xl text-center py-9 mb-3 font-bold text-gray-300'>Timur's Todo App</h1>

        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Layout />}>
              <Route index element={ <UserProfile />}/>

              <Route path='/auth/register' element={<Register/>} />
              <Route path='/auth/login' element={<Login/>} />

              <Route element={<PrivateRoute />}>
                <Route path='/todolists' element={<TodosPage />} />
                <Route path='/users/user' element={<UserProfile />} />
              </Route>
            </Route>
            
          </Routes>
        </BrowserRouter>

      </div>
    </div>
  );
}

export default App;
