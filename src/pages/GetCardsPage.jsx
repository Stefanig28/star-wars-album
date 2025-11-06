export const GetCardsPage = () => {
  return (
    <div className="min-h-screen w-full bg-linear-to-b from-gray-900 to-black text-white flex flex-col items-center justify-start py-12 px-6 overflow-hidden">
      <h2 className="text-3xl font-bold mb-8 text-yellow-400 tracking-wide">
        Obtener Láminas
      </h2>

      <p className="text-gray-300 mb-10 text-center max-w-xl">
        Elige un sobre para abrir y descubrir nuevas láminas del universo Star
        Wars. Recuerda: solo puedes abrir un sobre a la vez.
      </p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
        {[1, 2, 3, 4].map((num) => (
          <div
            key={num}
            className="relative group cursor-pointer hover:scale-105 transition-transform"
          >
            <div className="bg-linear-to-br from-yellow-500 to-yellow-700 rounded-2xl h-44 w-36 flex items-center justify-center shadow-lg border-2 border-yellow-400">
              <span className="text-2xl font-bold text-black">Sobre {num}</span>
            </div>
            <div className="absolute inset-0 bg-black bg-opacity-50 rounded-2xl hidden group-hover:flex items-center justify-center">
              <span className="text-white font-semibold">Abrir</span>
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-center space-x-3 bg-gray-800 rounded-full py-2 px-6 shadow-md">
        <span className="text-gray-400">Siguientes sobres disponibles en:</span>
        <span className="text-yellow-400 font-mono text-lg">00:59</span>
      </div>
    </div>
  );
};
