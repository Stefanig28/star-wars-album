import { Link, useLocation } from 'react-router-dom';

export const NavBar = () => {
  const location = useLocation();

  const links = [
    { to: '/obtener-laminas', label: 'Obtener Láminas' },
    { to: '/mi-album', label: 'Mi Álbum' },
  ];

  return (
    <nav className="bg-[#a58222]   backdrop-blur-md border-b-2 border-yellow-500 sticky top-0 shadow-lg shadow-yellow-600/30">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link
          to="/"
          className="text-[#FFEA20] font-extrabold text-2xl tracking-widest hover:text-[#9DF1DF] transition-colors duration-300"
        >
          STAR WARS ALBUM
        </Link>

        <ul className="flex space-x-6">
          {links.map((link) => (
            <li key={link.to}>
              <Link
                to={link.to}
                className={`pb-1 font-semibold tracking-wide transition-all duration-200 ${
                  location.pathname === link.to
                    ? 'text-[#FFEA20] border-b-2 border-[#FFEA20]'
                    : 'text-white hover:text-[#FFCC00] hover:border-b-2 hover:border-[#FFCC00]'
                }`}
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
