import { Link } from "react-router";

export default function ContactCard({contacts, handleContactDelete}) {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Create New Contact Card */}
        <div className="bg-gray-800 bg-opacity-80 rounded-xl shadow-custom overflow-hidden border-2 border-dashed border-gray-700 card-hover animate-fade-in">
          <Link to="/dashboard/contacts/create" className="block p-6 h-full">
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="w-20 h-20 bg-gradient rounded-full flex items-center justify-center mb-5 shadow-lg transform transition-transform duration-300 hover:scale-110">
                <i className="fas fa-user-plus text-3xl text-white" />
              </div>
              <h2 className="text-xl font-semibold text-white mb-3">
                Create New Contact
              </h2>
              <p className="text-gray-300">Add a new contact to your list</p>
            </div>
          </Link>
        </div>

        {contacts.map((contact) => (
          <div
            key={contact.id}
            className="bg-gray-800 bg-opacity-80 rounded-xl shadow-custom border border-gray-700 overflow-hidden card-hover animate-fade-in"
          >
            <div className="p-6">
              <Link
                to={`/dashboard/contacts/${contact.id}`}
                className="block cursor-pointer hover:bg-gray-700 rounded-lg transition-all duration-200 p-3"
              >
                <div className="flex items-center mb-3">
                  <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center mr-3 shadow-md">
                    <i className="fas fa-user text-white" />
                  </div>
                  <h2 className="text-xl font-semibold text-white hover:text-blue-300 transition-colors duration-200">
                    {contact.first_name} {contact.last_name}
                  </h2>
                </div>

                <div className="space-y-3 text-gray-300 ml-2">
                  <p className="flex items-center">
                    <i className="fas fa-user-tag text-gray-500 w-6" />
                    <span className="font-medium w-24">First Name:</span>
                    <span>{contact.first_name}</span>
                  </p>
                  <p className="flex items-center">
                    <i className="fas fa-user-tag text-gray-500 w-6" />
                    <span className="font-medium w-24">Last Name:</span>
                    <span>{contact.last_name}</span>
                  </p>
                  <p className="flex items-center">
                    <i className="fas fa-envelope text-gray-500 w-6" />
                    <span className="font-medium w-24">Email:</span>
                    <span>{contact.email}</span>
                  </p>
                  <p className="flex items-center">
                    <i className="fas fa-phone text-gray-500 w-6" />
                    <span className="font-medium w-24">Phone:</span>
                    <span>{contact.phone}</span>
                  </p>
                </div>
              </Link>

              <div className="mt-4 flex justify-end space-x-3">
                <a
                  href={`/dashboard/contacts/${contact.id}/edit`}
                  className="px-4 py-2 bg-gradient text-white rounded-lg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-200 font-medium shadow-md flex items-center"
                >
                  <i className="fas fa-edit mr-2" /> Edit
                </a>

                <button
                  onClick={() => handleContactDelete(contact.id)}
                  className="px-4 py-2 bg-gradient-to-r from-red-600 to-red-500 text-white rounded-lg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-200 font-medium shadow-md flex items-center"
                >
                  <i className="fas fa-trash-alt mr-2" /> Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
