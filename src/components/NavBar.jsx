import { Link, useLocation } from 'react-router-dom';

export const NavBar = () => {
  const location = useLocation();

  const links = [
    { to: '/obtener-laminas', label: 'Obtener Láminas' },
    { to: '/mi-album', label: 'Mi Álbum' },
  ];

  return (
    <nav className="bg-black/90 border-b border-yellow-500/30 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link
          to="/"
          className="text-yellow-400 font-bold text-lg tracking-wider hover:text-yellow-300 transition"
        >
          STAR WARS ALBUM
        </Link>

        <ul className="flex space-x-6">
          {links.map((link) => (
            <li key={link.to}>
              <Link
                to={link.to}
                className={`${
                  location.pathname === link.to
                    ? 'text-yellow-400 border-b-2 border-yellow-400'
                    : 'text-gray-300 hover:text-yellow-300'
                } pb-1 transition font-medium`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};
