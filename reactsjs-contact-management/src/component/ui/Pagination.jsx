export default function Pagination({page, handleChangePage, getPages, totalPage }) {
  return (
    <>
      <div className="mt-10 flex justify-center">
        <nav className="flex items-center space-x-3 bg-gray-800 bg-opacity-80 rounded-xl shadow-custom border border-gray-700 p-3 animate-fade-in">
          {page > 1 && (
            <a
              href="#"
              onClick={() => handleChangePage(page - 1)}
              className="px-4 py-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-200 flex items-center"
            >
              <i className="fas fa-chevron-left mr-2" /> Previous
            </a>
          )}
          {getPages().map((value) => {
            if (value === page) {
              return (
                <a
                  key={value}
                  href="#"
                  onClick={() => handleChangePage(value)}
                  className="px-4 py-2 bg-gradient text-white rounded-lg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-200 font-medium shadow-md"
                >
                  {value}
                </a>
              );
            } else {
              return (
                <a
                  key={value}
                  href="#"
                  onClick={() => handleChangePage(value)}
                  className="px-4 py-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-200"
                >
                  {value}
                </a>
              );
            }
          })}
          {page < totalPage && (
            <a
              href="#"
              onClick={() => handleChangePage(page + 1)}
              className="px-4 py-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-200 flex items-center"
            >
              Next <i className="fas fa-chevron-right ml-2" />
            </a>
          )}
        </nav>
      </div>
    </>
  );
}
