import PublicLayout from "@/layout/PublicLayout"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { adminroutes, routes } from "./router"
import NotFoundPage from "@/page/404"
import PrivateLayout from "./layout/PrivateLayout"
import Login from "./page/Login"

function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<PublicLayout />}>
            {routes}
          </Route>
          <Route path="/admin" element={<PrivateLayout />}>
            {adminroutes}
          </Route>
          <Route path='login' element={<Login />}></Route>
          <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
