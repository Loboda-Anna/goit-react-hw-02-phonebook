import React, { useState } from 'react';
import PropTypes from 'prop-types';
import css from './Form.module.css';
const { form, form__label, form__input, form__button } = css;

export default function Form({ addContact }) {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleChange = ({ target }) => {
    switch (target.name) {
      case 'name':
        setName(target.value);
        break;
      case 'number':
        setNumber(target.value);
        break;
      default:
        console.log('There is no event for this case');
        break;
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    addContact({
      name: name,
      number: number,
    });
    setName('');
    setNumber('');
  };

  return (
    <form className={form} onSubmit={handleSubmit}>
      <label className={form__label} htmlFor="name">
        Name
        <input
          className={form__input}
          onChange={handleChange}
          value={name}
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
      </label>
      <label className={form__label} htmlFor="number">
        Number
        <input
          className={form__input}
          onChange={handleChange}
          value={number}
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        ></input>
      </label>
      <button className={form__button} type="submit">
        Add contact
      </button>
    </form>
  );
}

Form.propTypes = {
  addContact: PropTypes.func.isRequired,
};
