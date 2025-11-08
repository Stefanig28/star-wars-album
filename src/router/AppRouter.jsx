import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { GetStickersPage } from '../pages/GetStickersPage';
import { MyAlbumPage } from '../pages/MyAlbumPage';
import { NavBar } from '../components/NavBar';
import HomePage from '../pages/HomePage'; 

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <NavBar />

      <div className="min-h-screen bg-black px-6 py-4">
        <Routes>
          <Route path="/" element={<HomePage />} />

          <Route path="/obtener-laminas" element={<GetStickersPage />} />

          <Route path="/mi-album" element={<MyAlbumPage />} />
          <Route
            path="*"
            element={
              <h1 className="text-white text-4xl text-center mt-20">
                404 | Página no encontrada
              </h1>
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
};
