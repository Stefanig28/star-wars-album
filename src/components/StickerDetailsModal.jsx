import { useContext } from 'react';
import { AlbumContext } from '../context/albumContext';

const StickerDetailsModal = () => {
  const { state, dispatch } = useContext(AlbumContext);
  const sticker = state.selectedSticker;

  if (!sticker) {
    return null;
  }

  const handleClose = () => {
    dispatch({ type: 'DESELECT_STICKER' });
  };

  const isSpecial = sticker.category === 'Special';

  const detailMap = {
    name: 'Nombre',
    height: 'Altura',
    mass: 'Masa',
    gender: 'Género',
    model: 'Modelo',
    manufacturer: 'Fabricante',
    cost_in_credits: 'Costo',
  };

  const details = Object.keys(detailMap)
    .map((key) => ({
      label: detailMap[key],
      value: sticker[key],
    }))
    .filter(
      (item) =>
        item.value &&
        typeof item.value === 'string' &&
        item.value !== 'n/a' &&
        item.value !== 'unknown'
    );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50 p-4">
      <div className="bg-gray-900 text-white p-6 md:p-8 rounded-xl max-w-lg w-full shadow-2xl border-2 border-yellow-500/50">
        <div className="flex justify-between items-start border-b pb-3 mb-4">
          <h2 className="text-2xl font-extrabold text-yellow-400">
            {sticker.name}
          </h2>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-white text-2xl"
          >
            &times;
          </button>
        </div>

        <div className="flex justify-between items-center mb-4">
          <span className="text-lg font-semibold text-gray-300">
            #{sticker.id} - {sticker.resourceKey?.toUpperCase()}
          </span>
          <span
            className={`text-sm font-bold px-3 py-1 rounded-full 
                        ${isSpecial ? 'bg-pink-500 text-gray-900' : 'bg-white text-gray-900'}`}
          >
            {sticker.category}
          </span>
        </div>

        <div className="space-y-2 mb-6 max-h-60 overflow-y-auto pr-2">
          {details.map((detail, index) => (
            <div
              key={index}
              className="flex justify-between text-sm border-b border-gray-800 pb-1"
            >
              <span className="font-medium text-gray-400">{detail.label}:</span>
              <span className="text-white">{detail.value}</span>
            </div>
          ))}
        </div>

        <button
          className="w-full bg-yellow-400 text-gray-900 font-bold py-2 rounded-lg hover:bg-yellow-300 transition-colors"
          onClick={handleClose}
        >
          Cerrar Detalles
        </button>
      </div>
    </div>
  );
};

export default StickerDetailsModal;
