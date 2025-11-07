import { AppRouter } from './router/AppRouter';
import { AlbumProvider } from './context/AlbumContext';

export const App = () => {
  return (
    <AlbumProvider>
      <AppRouter />
    </AlbumProvider>
  );
};
