import React from "react";
import { useSelector } from "react-redux";
import { selectFilteredContacts } from "../../redux/contactsSlice";
import s from "./ContactList.module.css";
import Contact from "../Contact/Contact";

export const ContactList = () => {
  const filteredContacts = useSelector(selectFilteredContacts);

  return (
    <>
      <ul className={s.contact}>
        {filteredContacts.map((contact) => (
          <li className={s.contacts} key={contact.id}>
            <Contact contact={contact} />
          </li>
        ))}
      </ul>
    </>
  );
};
