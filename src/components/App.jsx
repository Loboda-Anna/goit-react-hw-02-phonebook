import { Component } from 'react';
import { Form } from './Form/Form';
import { ContactsList } from './ContactsList/ContactsList';
import { Filter } from './Filter/Filter';
import css from './App.module.css';
import { nanoid } from 'nanoid';

export class App extends Component {

  constructor(props) {
    super(props);
    this.state.contacts = JSON.parse(localStorage.getItem('contacts')) || [];
  }

  state = {
    contacts: [],
    filter: '',
  };

  addContact = data => {
    if (this.state.contacts.some(contact => contact.name.includes(data.name))) {
      return window.alert(`${data.name} is already in contacts `);
    }

    const newContact = {
      ...data,
      id: nanoid(),
    };

    this.setState(prevState => {
      return { contacts: [...prevState.contacts, newContact] };
    });
  };

  changeFilter = ({ target }) => {
    this.setState({ filter: target.value });
  };

  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  componentDidUpdate() {
    localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
  }

  render() {
    const normalizedFilter = this.state.filter.trim().toLowerCase();
    const visibleContacts = this.state.contacts.filter(contact =>
      contact.name.trim().toLowerCase().includes(normalizedFilter)
    );
    return (
      <div className={css.container}>
        <h1 className={css.title}>Phonebook</h1>
        <Form addContact={this.addContact} />
        <h2 className={css.contacts__title}>Contacts</h2>
        <Filter value={this.state.filter} onChange={this.changeFilter} />
        <ContactsList
          className={css.contacts__list}
          contacts={visibleContacts}
          onDeleteContact={this.deleteContact}
        />
      </div>
    );
  }
}
