import { Component } from 'react';
import PropTypes from 'prop-types';
import css from './Form.module.css';
const { form, form__label, form__input, form__button } = css;

export class Form extends Component {
  state = {
    name: '',
    number: '',
  };

  handleChange = ({ target }) => {
    this.setState({ [target.name]: target.value });
  };
  handleSubmit = e => {
    e.preventDefault();
    this.props.addContact({
      name: this.state.name,
      number: this.state.number,
    });
    this.setState({ name: '', number: '' });
  };

  render() {
    return (
      <form className={form} onSubmit={this.handleSubmit}>
        <label className={form__label} htmlFor="name">
          Name
          <input
            className={form__input}
            onChange={this.handleChange}
            value={this.state.name}
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
            onChange={this.handleChange}
            value={this.state.number}
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
}

Form.propTypes = {
  addContact: PropTypes.func.isRequired,
};
