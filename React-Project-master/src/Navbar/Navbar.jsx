import React from 'react'
import {Link} from 'react-router-dom'
const Navbar = () => {
  return (
    <div>
        <nav className='navbar navbar-dark bg-dark text-white navbar-expand-lg'>
            <Link to='/' className='navbar-brand'>crud-Application</Link>
            <ul className="navbar-nav ml-auto">
                <li className="nav-list"><Link to="/CreateProduct" className="nav-link">Create Product</Link></li>
                <li className="nav-list"><Link to="/Admin" className="nav-link">All Products</Link></li>
            </ul>
        </nav>
    </div>
  )
}

export default Navbar