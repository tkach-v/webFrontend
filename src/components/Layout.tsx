import {Link, Outlet} from "react-router-dom";

const Layout = () => {
  return (
    <div className="container d-flex flex-column vh-100">
      <header className="d-flex flex-wrap justify-content-center py-3 mb-4 border-bottom">
        <Link to="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-dark text-decoration-none">
          <span className="fs-4">Repair Workshop</span>
        </Link>

        <ul className="nav nav-pills">
          <li className="nav-item"><Link to="/" className="nav-link">Home</Link></li>
          <li className="nav-item"><Link to="/users" className="nav-link">Users</Link></li>
          <li className="nav-item"><Link to="/orders" className="nav-link">Orders</Link></li>
          <li className="nav-item"><Link to="/reviews" className="nav-link">Reviews</Link></li>
        </ul>
      </header>
      <main>
        <Outlet/>
      </main>
      <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 border-top mt-auto">
        <h5 className="col-md-4 mb-0 text-muted">© {new Date().getFullYear()} Repair Workshop</h5>
        <ul className="nav col-md-4 justify-content-end">
          <li className="nav-item"><Link to="/" className="nav-link px-2 text-muted">Home</Link></li>
          <li className="nav-item"><Link to="/users" className="nav-link px-2 text-muted">Users</Link></li>
          <li className="nav-item"><Link to="/orders" className="nav-link px-2 text-muted">Orders</Link></li>
          <li className="nav-item"><Link to="/reviews" className="nav-link px-2 text-muted">Reviews</Link></li>
        </ul>
      </footer>
    </div>
  );
};

export default Layout;
