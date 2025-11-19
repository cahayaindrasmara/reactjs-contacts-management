import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import Layout from "./component/Layout";
import UserRegister from "./component/user/UserRegister";
import UserLogin from "./component/user/UserLogin";
import DashboardLayout from "./component/DashboardLayout";
import UserProfile from "./component/user/UserProfile";
import UserLogout from "./component/user/UserLogout";
import ContactCreate from "./component/contact/ContactCreate";
import ContactList from "./component/contact/ContactList";
import ContactEdit from "./component/contact/ContactEdit";
import ContactDetail from "./component/contact/ContactDetail";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/register" element={<UserRegister />} />
          <Route path="/login" element={<UserLogin />} />
        </Route>
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route path="users">
            <Route path="profile" element={<UserProfile />} />
            <Route path="logout" element={<UserLogout />} />
          </Route>

          <Route path="contacts">
            <Route index element={<ContactList/>} />
            <Route path="create" element={<ContactCreate />} />
            <Route path=":id" element={<ContactDetail/>}/>
            <Route path=":id/edit" element={<ContactEdit/>}/>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
