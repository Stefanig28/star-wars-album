import { Link } from 'react-router-dom';

export const NavBar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          STAR WARS ALBUM
        </Link>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/obtener-laminas">
                Obtener Láminas
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/mi-album">
                Mi álbum
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
