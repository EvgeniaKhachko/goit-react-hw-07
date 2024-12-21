import "./App.css";
import ContactForm from "./components/ContactForm/ContactForm";
import { ContactList } from "./components/ContactList/ContactList";
import { SearchBox } from "./components/SearchBox/SearchBox";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchContacts } from "./redux/contactsOps";
import {
  selectContacts,
  selectError,
  selectLoading,
} from "./redux/contactsSlice";

export const App = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <>
      <div>
        <h1>Phonebook</h1>
        <ContactForm />
        <SearchBox />

        {loading && <p>Loading contacts...</p>}
        {!error && <p>{error}</p>}
        <p>{contacts.length === 0}</p>

        <ContactList />
      </div>
    </>
  );
};
