export const MyAlbumPage = () => {
  const exampleLength = 20;

  return (
    <div className="min-h-screen w-full bg-gray-950 text-white py-16 px-6 flex flex-col overflow-hidden">
      <h2 className="text-4xl md:text-5xl font-extrabold mb-12 text-center text-yellow-400 tracking-wider uppercase drop-shadow-lg [text-shadow:0_0_8px_rgba(252,211,77,0.7)]">
        Mi Álbum
      </h2>

      <div className="max-w-6xl mx-auto w-full">
        {['Películas', 'Personajes', 'Naves'].map((section, index) => (
          <div
            key={section}
            className="mb-14 p-6 bg-gray-900 rounded-xl border border-gray-800 shadow-xl"
          >
            <h3 className="text-2xl font-bold mb-6 text-gray-100 border-b-2 border-yellow-700 pb-3 uppercase tracking-wider">
              {section}
              <span className="text-sm ml-3 font-mono text-yellow-500">
                (12 / {index === 1 ? '82' : 'Total'})
              </span>
            </h3>

            <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-3">
              {Array.from({ length: exampleLength }).map((_, i) => {
                const isOwned = i % 3 === 0;
                const isSpecial = i === 0;

                const cardClasses = isOwned
                  ? `bg-gray-700 cursor-pointer hover:bg-gray-600 transition-all shadow-lg`
                  : 'bg-gray-800 opacity-50 cursor-not-allowed';

                const specialClasses = isSpecial
                  ? 'border-4 border-red-500 [box-shadow:0_0_8px_rgba(239,68,68,0.6)]'
                  : 'border border-gray-600';

                return (
                  <div
                    key={i}
                    className={`flex flex-col items-center justify-center h-24 sm:h-28 w-full rounded-lg p-1 ${cardClasses} ${specialClasses}`}
                  >
                    <span
                      className={`font-mono text-sm ${isOwned ? 'text-yellow-400 font-bold' : 'text-gray-400'}`}
                    >
                      #{i + 1}
                    </span>

                    {isOwned ? (
                      <span className="mt-1 text-xs text-center text-white truncate w-full px-1">
                        {isSpecial
                          ? 'DARTH VADER (Especial)'
                          : 'Luke Skywalker'}
                      </span>
                    ) : (
                      <span className="mt-1 text-xs text-center text-gray-500">
                        VACÍO
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
