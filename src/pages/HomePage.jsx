import { useCallback } from 'react';
import { Link } from 'react-router-dom';
import Particles from 'react-tsparticles';
import { loadFull } from 'tsparticles';

const HomePage = () => {
  const particlesInit = useCallback(async (engine) => {
    await loadFull(engine);
  }, []);

  const particlesLoaded = useCallback(async (container) => {
    console.log('Particles loaded:', container);
  }, []);

  return (
    <div className="relative min-h-screen bg-black flex items-center justify-center overflow-hidden">
      <Particles
        id="tsparticles"
        init={particlesInit}
        loaded={particlesLoaded}
        options={{
          fullScreen: { enable: true, zIndex: -1 },
          background: {
            color: '#000000',
          },
          particles: {
            number: { value: 100, density: { enable: true, area: 800 } },
            color: { value: '#ccff15' },
            shape: { type: 'star' },
            opacity: { value: 0.8, random: true },
            size: { value: 5, random: true },
            move: {
              enable: true,
              speed: 0.8,
              direction: 'top',
              outModes: 'out',
            },
            links: { enable: false },
          },
          interactivity: {
            events: {
              onHover: { enable: true, mode: 'bubble' },
              onClick: { enable: true, mode: 'repulse' },
            },
            modes: {
              bubble: { distance: 400, size: 4, duration: 0.3 },
              repulse: { distance: 200 },
            },
          },
          detectRetina: true,
        }}
        className="absolute inset-0 z-0"
      />

      {/* Main Content */}
      <div className="relative z-10 text-center px-6">
        <div style={{ marginBottom: '60px' }}>
          <p className="text-[#FFEA20] text-2xl font-bold tracking-wider mb-12 hover:text-[#9DF1DF] transition-colors duration-300">
            STAR WARS
          </p>
        </div>

        <div className="flex flex-col items-center space-y-6">
          <Link to="/mi-album">
            <span
              className="bg-[#FFCC00] hover:bg-[#FFB103] w-[300px] h-[50px] border-2 border-[#626265] rounded-2xl text-xl font-bold text-black shadow-lg transition-all duration-200 hover:scale-105 hover:text-[22px] z-99"
              style={{ marginBottom: '30px' }}
            >
              Mi Álbum
            </span>
          </Link>

          <Link to="/obtener-laminas">
            <span
              className="bg-[#FFCC00] hover:bg-[#FFB103] w-[300px] h-[50px] border-2 border-[#626265] rounded-2xl text-xl font-bold text-black shadow-lg transition-all duration-200 hover:scale-105 hover:text-[22px] z-99"
              style={{ marginBottom: '30px' }}
            >
              Obtener Láminas
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
