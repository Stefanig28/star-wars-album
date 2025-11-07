import { AppRouter } from './router/AppRouter';
import { AlbumProvider } from './context/AlbumProvider';

export const App = () => {
  return (
    <AlbumProvider>
      <AppRouter />
    </AlbumProvider>
  );
};
