import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { GetCardsPage } from '../pages/GetCardsPage'; 
import { MyAlbumPage } from '../pages/MyAlbumPage';    
import { NavBar } from '../components/NavBar';     

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <NavBar /> 
      
      <div className="container mt-4"> 
        <Routes>
          <Route path="/" element={<GetCardsPage />} /> 
          <Route path="/obtener-laminas" element={<GetCardsPage />} />
          <Route path="/mi-album" element={<MyAlbumPage />} />

          <Route path="*" element={<h1>404 | Página no encontrada</h1>} /> 
        </Routes>
      </div>
    </BrowserRouter>
  );
};