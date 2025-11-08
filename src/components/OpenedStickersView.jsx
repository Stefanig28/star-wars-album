import { useContext, useState } from 'react';
import { AlbumContext } from '../context/albumContext';

const OpenedStickersView = () => {
  const { state, dispatch } = useContext(AlbumContext);
  const { lastOpenedStickers } = state;

  const [disabledButtons, setDisabledButtons] = useState(
    lastOpenedStickers ? lastOpenedStickers.map(() => false) : []
  );

  if (!lastOpenedStickers || lastOpenedStickers.length === 0) return null;

  const isCollected = (sticker) => {
    const resourceKey = sticker.resourceKey;
    const stickerId = sticker.id;
    if (!resourceKey || !stickerId || sticker.error) return false;
    return !!state.album[resourceKey]?.[stickerId];
  };

  const allDisabled = disabledButtons.every((d) => d);

  const handleAdd = (sticker, index) => {
    if (isCollected(sticker) || disabledButtons[index]) return;
    dispatch({ type: 'ADD_TO_ALBUM_MANUAL', payload: sticker });
    const newDisabled = [...disabledButtons];
    newDisabled[index] = true;
    setDisabledButtons(newDisabled);
  };

  const handleDiscard = (sticker, index) => {
    if (!isCollected(sticker) || disabledButtons[index]) return;
    dispatch({ type: 'DISCARD_FROM_ALBUM', payload: sticker });
    const newDisabled = [...disabledButtons];
    newDisabled[index] = true;
    setDisabledButtons(newDisabled);
  };

  const handleClose = () => {
    dispatch({ type: 'CLOSE_MODAL' });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50 p-4">
      <div className="bg-gray-900 text-white p-6 md:p-8 rounded-xl max-w-4xl w-full shadow-2xl border-2 border-yellow-500/50 transition-transform duration-300">
        <h2 className="text-3xl font-extrabold mb-2 text-yellow-400">
          ¡Sobres Abiertos! 🚀
        </h2>
        <p className="text-gray-300 mb-6 text-lg">
          Has conseguido {lastOpenedStickers.length} nuevas láminas:
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mb-8">
          {lastOpenedStickers.map((sticker, index) => {
            const isSpecial = sticker.category === 'Special';
            const isFailed = sticker.error === true;
            const collected = isCollected(sticker);
            const disabled = disabledButtons[index];

            return (
              <div
                key={index}
                className={`p-3 rounded-lg border-2 shadow-lg min-h-[150px] flex flex-col justify-between transition-all duration-300
                  ${
                    isFailed
                      ? 'bg-red-900 border-red-500 shadow-[0_0_10px_rgba(239,68,68,0.7)]'
                      : isSpecial
                        ? 'bg-purple-900 border-pink-500 shadow-[0_0_10px_rgba(236,72,153,0.7)]'
                        : 'bg-gray-700 border-gray-500'
                  }`}
              >
                <div className="flex flex-col grow">
                  <h3 className="text-sm font-bold truncate text-white mb-1">
                    {isFailed ? 'Error de Transmisión' : sticker.name}
                  </h3>
                  <p className="text-xs text-gray-400">
                    {isFailed
                      ? 'DATOS CORRUPTOS'
                      : sticker.resourceKey?.toUpperCase()}
                  </p>
                </div>

                <span
                  className={`text-xs font-semibold mt-2 px-2 py-0.5 rounded-full inline-block self-start
                  ${
                    isFailed
                      ? 'bg-red-500 text-white'
                      : isSpecial
                        ? 'bg-pink-500 text-gray-900'
                        : 'bg-white text-gray-900'
                  }`}
                >
                  {isFailed ? 'FALLIDA' : sticker.category}
                </span>

                {!isFailed && (
                  <button
                    disabled={disabled}
                    className={`mt-3 py-1 text-xs font-semibold rounded transition-colors
                      ${
                        disabled
                          ? 'bg-gray-500 text-gray-300 cursor-not-allowed'
                          : collected
                            ? 'bg-yellow-600 text-gray-900 hover:bg-yellow-500'
                            : 'bg-green-600 text-white hover:bg-green-500'
                      }`}
                    onClick={() =>
                      collected
                        ? handleDiscard(sticker, index)
                        : handleAdd(sticker, index)
                    }
                  >
                    {collected ? 'Descartar' : 'Agregar al álbum'}
                  </button>
                )}

                {isFailed && (
                  <span className="mt-3 py-1 text-xs text-center font-bold text-red-300">
                    No disponible
                  </span>
                )}
              </div>
            );
          })}
        </div>

        <button
          className={`bg-yellow-400 text-gray-900 font-bold py-2 px-6 rounded-lg hover:bg-yellow-300 transition-colors shadow-md
            ${!allDisabled ? 'opacity-50 cursor-not-allowed' : ''}
          `}
          onClick={handleClose}
        >
          Cerrar
        </button>
      </div>
    </div>
  );
};

export default OpenedStickersView;
