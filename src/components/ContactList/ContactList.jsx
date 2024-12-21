import React from "react";
import { useSelector } from "react-redux";
import { selectContacts } from "../../redux/contactsSlice";
import { selectFilter } from "../../redux/filtersSlice";
import s from "./ContactList.module.css";
import Contact from "../Contact/Contact";

export const ContactList = () => {
  const contacts = useSelector(selectContacts);
  const newName = useSelector(selectFilter);
  const filteredContacts = contacts.filter((contact) => {
    return contact.name.toLowerCase().includes(newName);
  });

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
