import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {BrowserRouter, Route, Routes} from 'react-router'
import Layout from './component/Layout'
import UserRegister from './component/user/UserRegister'
import UserLogin from './component/user/UserLogin'
import DashboardLayout from './component/DashboardLayout'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<Layout/>}>
          <Route path='/register' element={<UserRegister/>}/>
          <Route path='/login' element={<UserLogin/>} />
        </Route>
        <Route path='/dashboard' element={<DashboardLayout/>}>
          <Route path='contacts' element={<></>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
