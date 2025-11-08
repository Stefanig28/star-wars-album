import React, { useContext, useState } from 'react';
import { AlbumContext } from '../context/albumContext';
import OpenedStickersView from '../components/OpenedStickersView.jsx';
import CooldownTimer from '../components/CooldownTimer';

export const GetStickersPage = () => {
  const { state, openEnvelope } = useContext(AlbumContext);
  const { envelopes, isCooldownActive, cooldown } = state;
  const [isLoading, setIsLoading] = useState(false);
  const handleOpenEnvelope = async (envelopeId) => {
    if (isLoading || isCooldownActive) return;

    setIsLoading(true);

    try {
      await openEnvelope(envelopeId);
    } catch (error) {
      console.error('Error al abrir el sobre:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const isClickable = !isCooldownActive && !isLoading;

  return (
    <div className="min-h-screen w-full bg-gray-950 text-white flex flex-col items-center justify-start py-16 px-6 overflow-hidden">
      <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-yellow-400 tracking-wider uppercase drop-shadow-lg [text-shadow:0_0_8px_rgba(252,211,77,0.7)]">
        Obtener Láminas
      </h2>

      <p className="text-gray-400 mb-12 text-center max-w-2xl text-lg">
        Elige un sobre de datos para decodificar. ¡Prepárate para expandir tu
        colección de la galaxia!
      </p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12 max-w-4xl w-full">
        {envelopes.map((envelope) => (
          <div
            key={envelope.id}
            onClick={() => handleOpenEnvelope(envelope.id)}
            className={`relative group transition-transform duration-300 p-1 rounded-2xl ${
              isClickable
                ? 'cursor-pointer hover:scale-[1.02] active:scale-[0.98] bg-gray-800 hover:bg-yellow-900/50 hover:shadow-[0_0_15px_rgba(252,211,77,0.4)]'
                : 'cursor-not-allowed opacity-60 bg-gray-900'
            }`}
          >
            <div
              className={`bg-gray-900 rounded-xl h-48 w-full flex flex-col items-center justify-center p-4 shadow-xl border-2 ${
                isClickable ? 'border-yellow-700/50' : 'border-red-800/50'
              }`}
            >
              <span
                className={`text-xs font-mono mb-2 opacity-75 ${
                  isClickable ? 'text-yellow-500' : 'text-red-500'
                }`}
              >
                {isLoading && !isCooldownActive
                  ? 'DECODIFICANDO...'
                  : 'DATOS ENCRIPTADOS'}
              </span>
              <span className="text-3xl font-black text-yellow-400 tracking-tighter">
                SOBRE <span className="text-5xl">{envelope.id}</span>
              </span>
              {isLoading && !isCooldownActive && (
                <span className="mt-2 text-sm text-yellow-400 animate-pulse">
                  Cargando...
                </span>
              )}

              {isCooldownActive && (
                <span className="mt-2 text-sm text-red-500">BLOQUEADO</span>
              )}
            </div>
            {isClickable && (
              <div className="absolute inset-0 rounded-xl bg-yellow-400 bg-opacity-0 group-hover:bg-opacity-10 transition-opacity flex items-center justify-center">
                <span className="text-black font-extrabold py-1 px-4 rounded-full bg-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500 shadow-xl">
                  ¡ABRIR AHORA!
                </span>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="flex flex-col items-center justify-center p-4 bg-gray-800 border border-gray-700 rounded-xl shadow-2xl">
        <span className="text-sm font-light text-gray-400 mb-1 uppercase tracking-wider">
          Acceso Restringido - Próximo Escaneo:
        </span>

        <CooldownTimer
          currentCooldown={cooldown}
          isCooldownActive={isCooldownActive}
        />
      </div>

      <OpenedStickersView />
    </div>
  );
};
