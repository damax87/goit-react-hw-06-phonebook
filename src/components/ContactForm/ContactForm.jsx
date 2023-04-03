import { useState } from "react";
import propTypes from 'prop-types';
import { FormContact } from "./ContactForm.style";
import { FormInput } from "./ContactForm.style";
import { FormButton } from "./ContactForm.style";

export default function ContactForm( {handleSubmit} ) {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleChange = event => {
      const {name, value} = event.target;

      switch(name) {
        case 'name':
        setName(value);
        break;

        case 'number':
          setNumber(value);
          break;

          default: 
          return;
      }
    };

  const handleFormSubmit = event => {
      event.preventDefault();
      handleSubmit({ name: name, number: number });
      reset();
    }

  const reset = () => {
      setName('');
      setNumber('');
    };

    return (
    <FormContact onSubmit={handleFormSubmit}>
        <label>
      Name<FormInput
  type="text"
  name="name"
  value={name}
  onChange={handleChange}
  placeholder='Ex: David Guetta'
  pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
  title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
  required
/>
      </label>
      <label>
      Number<FormInput
  type="tel"
  name="number"
  value={number}
  onChange={handleChange}
  placeholder='Ex: XXX-XX-XX'
  pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
  title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
  required
/>
      </label>

      <FormButton type='submit'>Add Contact</FormButton>
    </FormContact>
    )};

    ContactForm.propTypes = {
      handleSubmit: propTypes.func.isRequired,
    };