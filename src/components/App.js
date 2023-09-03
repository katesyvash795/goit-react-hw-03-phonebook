import React, { Component } from 'react';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactsList/ContactsList';
import Filter from './Filters/Filters';
import { v4 as uuidv4 } from 'uuid';

class App extends Component {
  state = {
    contacts: [],
    filter: ''
  };
componentDidMount(){
  const savedContacts =localStorage.getItem('contacts');
  if(savedContacts!== null){
    this.setState({
      contacts:JSON.parse(savedContacts)
    })
  }
}
componentDidUpdate(prevProps, prevState){
  if(prevState.contacts!==this.state.contacts){
localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
  }
}
  addContact = (name, number) => {
    const newContact = { id: uuidv4(), name, number };
    if (this.isContactNameExists(name)) {
      alert(`Contact with name ${name} already exists!`);
    } else {
      this.setState(prevState => ({
        contacts: [...prevState.contacts, newContact]
      }));
    }
  };

  isContactNameExists = name => {
    return this.state.contacts.some(contact => contact.name === name);
  };

  handleFilterChange = event => {
    this.setState({ filter: event.target.value });
  };
  onDeleteContact = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id)
    }));
  };

  render() {
    const { contacts, filter } = this.state;

    const filteredContacts = contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );

    return (
      <div>
        <h1>Phonebook</h1>
        <ContactForm onAddContact={this.addContact} />
        <h2>Contacts</h2>
        <Filter filter={filter} onChange={this.handleFilterChange} />
        <ContactList contacts={filteredContacts} onDeleteContact={this.onDeleteContact} />
      </div>
    );
  }
}

export default App;
