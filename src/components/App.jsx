import { useSelector, useDispatch } from 'react-redux';
import { addContact } from 'redux/actions';
import { deleteContact } from 'redux/slice';
import { ContactForm } from './ContactForm/ContactForm';
import { Section } from './Section/Section';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';

export const App = () => {

  const contacts = useSelector(state => state.contacts.value);
  const filter = useSelector(state => state.filter.value);
  const dispatch = useDispatch();

  const handleSubmit = event => {
    
      const name = event.name;
      const number = event.number;
      const contactsList = [...contacts];
    
      if (contactsList.findIndex(contact => name === contact.name) !== -1) {
        alert(`${name} is already in contacts.`);
      } else {
        dispatch(addContact(name, number));
      }
  };

  const  handleDelete = event => {
    dispatch(deleteContact(event));
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
      <Filter />
        <ContactList
          contacts={getFilteredContacts()}
          handleDelete={handleDelete}
        />
        </Section>
  </div>
  );
};
