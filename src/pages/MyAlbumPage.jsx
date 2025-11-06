export const MyAlbumPage = () => {
  return (
    <div className="min-h-screen w-full bg-linear-to-b from-black via-gray-900 to-black text-white py-12 px-6 flex flex-col overflow-hidden">
      <h2 className="text-3xl font-bold mb-10 text-center text-yellow-400 tracking-wide">
        Mi Álbum
      </h2>

      {['Películas', 'Personajes', 'Naves'].map((section) => (
        <div key={section} className="mb-12">
          <h3 className="text-2xl font-semibold mb-6 text-gray-200 border-b border-gray-700 pb-2">
            {section}
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {Array.from({ length: 12 }).map((_, i) => (
              <div
                key={i}
                className="flex flex-col items-center justify-center h-44 w-full rounded-xl border border-gray-700 bg-gray-800 hover:bg-gray-700 transition-all shadow-md hover:shadow-yellow-500/20"
              >
                <span className="text-gray-400 font-mono">#{i + 1}</span>
                <span className="mt-2 text-sm text-gray-300">
                  {i % 3 === 0 ? 'Luke Skywalker' : 'Vacío'}
                </span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
