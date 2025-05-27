import { Outlet } from "react-router"
import './layout.css';


function Layout() {
  return (
    <div id="Layout">
      <Outlet />
    </div>
  )
}

export default Layout