import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { GetStickersPage } from '../pages/GetStickersPage';
import { MyAlbumPage } from '../pages/MyAlbumPage';
import { NavBar } from '../components/NavBar';

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <NavBar />

      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<GetStickersPage />} />
          <Route path="/obtener-laminas" element={<GetStickersPage />} />
          <Route path="/mi-album" element={<MyAlbumPage />} />

          <Route path="*" element={<h1>404 | Página no encontrada</h1>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};
