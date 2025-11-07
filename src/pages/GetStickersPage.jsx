export const GetStickersPage = () => {
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
        {[1, 2, 3, 4].map((num) => (
          <div
            key={num}
            className="relative group cursor-pointer transition-transform duration-300 hover:scale-[1.02] active:scale-[0.98] 
                       p-1 rounded-2xl bg-gray-800 hover:bg-yellow-900/50 hover:shadow-[0_0_15px_rgba(252,211,77,0.4)]"
          >
            <div className="bg-gray-900 rounded-xl h-48 w-full flex flex-col items-center justify-center p-4 shadow-xl border-2 border-yellow-700/50">
              <span className="text-xs text-yellow-500 font-mono mb-2 opacity-75">
                DATOS ENCRIPTADOS
              </span>
              <span className="text-3xl font-black text-yellow-400 tracking-tighter">
                SOBRE <span className="text-5xl">{num}</span>
              </span>
            </div>
            <div className="absolute inset-0 rounded-xl bg-yellow-400 bg-opacity-0 group-hover:bg-opacity-10 transition-opacity flex items-center justify-center">
              <span className="text-black font-extrabold py-1 px-4 rounded-full bg-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500 shadow-xl">
                ¡ABRIR AHORA!
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col items-center justify-center p-4 bg-gray-800 border border-gray-700 rounded-xl shadow-2xl">
        <span className="text-sm font-light text-gray-400 mb-1 uppercase tracking-wider">
          Acceso Restringido - Próximo Escaneo en:
        </span>
        <div className="flex items-center space-x-2">
          <svg
            className="w-5 h-5 text-red-500 animate-pulse"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM5 9a1 1 0 011-1h4a1 1 0 010 2H6a1 1 0 01-1-1z"
              clipRule="evenodd"
            ></path>
          </svg>
          <span className="text-red-500 font-mono text-3xl font-bold tracking-widest [text-shadow:0_0_5px_rgba(239,68,68,0.7)]">
            00:59
          </span>
        </div>
      </div>
    </div>
  );
};
