import { useState } from 'react'
import './App.css'
import {BrowserRouter,Routes,Route, useParams} from 'react-router-dom';
import Users from './components/Users';
import UserCreation from './components/UserCreation';
import UserUpdate from './components/userUpdate';
function App() {
  const [count, setCount] = useState(0)
  const {id}=useParams();
  console.log(id,"id here")
  return (
    <>
      <div>
        <BrowserRouter>
        <Routes>
          <Route path='/' element={<Users/>}/>
          <Route path='/create' element={<UserCreation/>}/>
          <Route path="/update/:id" element={<UserUpdate />} />
        </Routes>
        </BrowserRouter>
      </div>
    </>
  )
}

export default App
