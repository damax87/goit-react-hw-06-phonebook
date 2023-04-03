import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import ContactForm from './ContactForm/ContactForm';
import { Section } from './Section/Section';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';

export const App = () => {

  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');
  const [firstRender, setFirstRender] = useState(true);

useEffect(() => {
  if (firstRender) {
  const savedContacts = localStorage.getItem('contacts');
  
  if (savedContacts !== null) {
    const parsedContacts = JSON.parse(savedContacts);

  if (parsedContacts) {
      setContacts(parsedContacts);
    }
  }
  setFirstRender(false);
}
  else {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }
}, [contacts, firstRender]);

  const handleChange = event => {
    const { value } = event.target;
    setFilter(value);
  };

  const handleSubmit = event => {
    
      const id = nanoid();
      const name = event.name;
      const number = event.number;
      const contactsList = [...contacts];
    
      if (contactsList.findIndex(contact => name === contact.name) !== -1) {
        alert(`${name} is already in contacts.`);
      } else {
        contactsList.push({ id, name, number });
      }

    setContacts(contactsList);

  };

  const  handleDelete = event => {
      setContacts(contacts.filter(contact => contact.id !== event));
  };

  const getFilteredContacts = () => {
    const filterContactsList = contacts.filter(contact => {
      return contact.name
        .toLowerCase()
        .includes(filter.toLowerCase());
    });

    return filterContactsList;
  };

  return (
    <div
        style={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 40,
        color: '#010101'
      }}
    >
      <Section title="Phonebook">
      <ContactForm handleSubmit={handleSubmit}/>
      </Section>
      <Section title="Contacts">
      <Filter filter={filter} handleChange={handleChange} />
        <ContactList
          contacts={getFilteredContacts()}
          handleDelete={handleDelete}
        />
        </Section>
  </div>
  );
};
