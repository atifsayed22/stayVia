import {Outlet} from "react-router-dom";
// import {Link} from 'react-router-dom'
import HostNavbar from "../Host/HostNavbar";

export default function HostLayout() {
  return (
    <>
        <HostNavbar />

        <main className="max-w-7xl mx-auto px-6 py-8">
          <Outlet />
        </main>
    
    </>
   
     
    
  );
}

