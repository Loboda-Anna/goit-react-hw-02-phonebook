import React, { useEffect, useState } from 'react';
import Form from './Form/Form';
import { ContactsList } from './ContactsList/ContactsList';
import { Filter } from './Filter/Filter';
import css from './App.module.css';
import { nanoid } from 'nanoid';

export default function App() {
  const [contacts, setContacts] = useState(
    JSON.parse(localStorage.getItem('contacts')) || []
  );
  const [filter, setFilter] = useState('');

  const addContact = data => {
    if (contacts.some(contact => contact.name.includes(data.name))) {
      return window.alert(`${data.name} is already in contacts `);
    }
    const newContact = {
      ...data,
      id: nanoid(),
    };
    setContacts(prevContacts => {
      return [...prevContacts, newContact];
    });
  };

  const changeFilter = ({ target }) => {
    setFilter(target.value);
  };

  const deleteContact = contactId => {
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== contactId)
    );
  };

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const normalizedFilter = filter.trim().toLowerCase();
  const visibleContacts = contacts.filter(contact =>
    contact.name.trim().toLowerCase().includes(normalizedFilter)
  );

  return (
    <div className={css.container}>
      <h1 className={css.title}>Phonebook</h1>
      <Form addContact={addContact} />
      <h2 className={css.contacts__title}>Contacts</h2>
      <Filter value={filter} onChange={changeFilter} />
      <ContactsList
        className={css.contacts__list}
        contacts={visibleContacts}
        onDeleteContact={deleteContact}
      />
    </div>
  );
}
