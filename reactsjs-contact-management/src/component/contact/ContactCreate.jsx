import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useLocalStorage } from "react-use";
import { contactCreate } from "../../lib/api/ContactApi";
import { alertError, alertSuccess } from "../../lib/alert";
import { ContactForm } from "../ui";

export default function ContactCreate() {
  const [token, _] = useLocalStorage("token", "");
  const navigate = useNavigate();
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    const response = await contactCreate(token, {
      first_name,
      last_name,
      email,
      phone,
    });
    const responseBody = response.json();
    console.log(responseBody);

    if (response.status === 200) {
      alertSuccess("Contact created successfully");
      navigate({
        pathname: "/dashboard/contacts",
      });
    } else {
      alertError(responseBody.errors);
    }
  }

  //   useEffectOnce(() => {
  //     handleSubmit();
  //      .then("")
  //   })

  return (
    <>
      <div>
        <div className="flex items-center mb-6">
          <link
            to="/dashboard/contacs"
            className="text-blue-400 hover:text-blue-300 mr-4 flex items-center transition-colors duration-200"
          />
          <i className="fas fa-arrow-left mr-2" /> Back to Contacts
          <h1 className="text-2xl font-bold text-white flex items-center">
            <i className="fas fa-user-plus text-blue-400 mr-3" /> Create New
            Contact
          </h1>
        </div>
        <div className="bg-gray-800 bg-opacity-80 rounded-xl shadow-custom border border-gray-700 overflow-hidden max-w-2xl mx-auto animate-fade-in">
          <div className="p-8">
            <ContactForm handleSubmit={handleSubmit} first_name={first_name} setFirstName={setFirstName} last_name={last_name} setLastName={setLastName} email={email} setEmail={setEmail} phone={phone} setPhone={setPhone}/>
          </div>
        </div>
      </div>
    </>
  );
}
