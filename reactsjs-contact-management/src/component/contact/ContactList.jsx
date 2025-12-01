import { useEffectOnce, useLocalStorage } from "react-use";
import { useEffect, useState } from "react";
import { contactDelete, contactList } from "../../lib/api/ContactApi";
import { alertConfirm, alertError, alertSuccess } from "../../lib/alert";
import { Link } from "react-router";
import { CardContact, SearchContact, Pagination } from "../ui";

export default function ContactList() {
  const [token, _] = useLocalStorage("token", "");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [contacts, setContacts] = useState([]);
  const [reload, setReload] = useState(false)

  function getPages() {
    const pages = [];
    for (let i = 1; i <= totalPage; i++) {
      pages.push(i);
    }

    return pages;
  }

  async function handleSearchContact(e) {
    e.preventDefault();
    setPage(1)
    setReload(!reload)
  }

  async function handleChangePage(page) {
    setPage(page)
    setReload(!reload)
  }

  async function handleContactDelete(id) {
    if (!await alertConfirm("Are you want to delete this contact?")){
      return
    }

    const response = await contactDelete(token, id);
    const responseBody = response.json();
    console.log(responseBody);

    if (response.status === 200) {
      await alertSuccess("Contact deleted successfully")
      setReload(!reload)
    } else {
      await alertError(responseBody.errors)
    }
  }

  async function fetchContacts() {
    const response = await contactList(token, { name, email, phone, page });
    const responseBody = await response.json();
    console.log("responseBody:", responseBody);

    if (response.status === 200) {
      setContacts(responseBody.data);
      setTotalPage(responseBody.paging.total_page)
    } else {
      alertError(responseBody.errors);
    }
  }

  useEffect(() => {
    fetchContacts()
    .then(() => console.log("Contacts fetched"));
  }, [reload]);

  useEffectOnce(() => {
    const toggleButton = document.getElementById("toggleSearchForm");
    const searchFormContent = document.getElementById("searchFormContent");
    const toggleIcon = document.getElementById("toggleSearchIcon");

    // Add transition for smooth animation
    searchFormContent.style.transition =
      "max-height 0.3s ease-in-out, opacity 0.3s ease-in-out, margin 0.3s ease-in-out";
    searchFormContent.style.overflow = "hidden";
    searchFormContent.style.maxHeight = "0px";
    searchFormContent.style.opacity = "0";
    searchFormContent.style.marginTop = "0";

    function toogleSearchForm() {
      if (searchFormContent.style.maxHeight !== "0px") {
        // Hide the form
        searchFormContent.style.maxHeight = "0px";
        searchFormContent.style.opacity = "0";
        searchFormContent.style.marginTop = "0";
        toggleIcon.classList.remove("fa-chevron-up");
        toggleIcon.classList.add("fa-chevron-down");
      } else {
        // Show the form
        searchFormContent.style.maxHeight =
        searchFormContent.scrollHeight + "px";
        searchFormContent.style.opacity = "1";
        searchFormContent.style.marginTop = "1rem";
        toggleIcon.classList.remove("fa-chevron-down");
        toggleIcon.classList.add("fa-chevron-up");
      }
    }

    toggleButton.addEventListener("click", toogleSearchForm);

    //clean up
    return () => {
      toggleButton.removeEventListener("click", toogleSearchForm);
    };
  });

  return (
    <>
      <div>
        <div className="flex items-center mb-6">
          <i className="fas fa-users text-blue-400 text-2xl mr-3" />
          <h1 className="text-2xl font-bold text-white">My Contacts</h1>
        </div>
        {/* Search form */}
        <SearchContact handleSearchContact={handleSearchContact} setName={setName} setEmail={setEmail} setPhone={setPhone} name={name} email={email} phone={phone}/>
        {/* Contact cards grid */}
        <CardContact contacts={contacts} handleContactDelete={handleContactDelete}/>
        {/* Pagination */}
        <Pagination page={page} handleChangePage={handleChangePage} getPages={getPages} totalPage={totalPage}/>
      </div>
    </>
  );
}
