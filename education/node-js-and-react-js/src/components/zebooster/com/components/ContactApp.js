/**
 * Created by Max_account on 9/15/16.
 */
'use strict'

import React from 'react'

require('styles/zebooster/com/components/ContactApp.css');

class SearchField extends React.Component {
  render() {
    return (
      <input
        type="search"
        placeholder="Search..."
        onChange={e => {
          this.props.onSearch(e.target.value);
        }}
      />
    );
  }
}

const ContactList = ({ people, onSelect, selectedPerson = {} }) => (
  <ul className="contact-list">
    { people.map(person => (
      <li className={
        selectedPerson.registered === person.registered ? 'active' : ''
      } key={person.registered}>
        <a href="#" onClick={e => {
          e.preventDefault();
          onSelect(person);
        }}>
          <img src={person.picture.thumbnail} />
          <span>{ person.name.first } { person.name.last }</span>
        </a>
      </li>
    )) }
  </ul>
);

const PersonDetail = ({ person = null }) => person && (
  <div className="person-detail">
    <img src={person.picture.large} />
    <h2>{ person.name.first } { person.name.last }</h2>
    <p>
      { person.phone }<br />
      { person.email }<br />
      { person.location.street }
    </p>
  </div>
);

class ContactApp extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.handleSearch = this.handleSearch.bind(this);
    this.handleSelect = this.handleSelect.bind(this);

    this.state = {
      search: '',
      people: [],
      selectedPerson: undefined
    };
  }

  componentWillMount() {
    fetch('http://api.randomuser.me/?results=20')
      .then(res => res.json())
      .then(({ results }) => {
        this.setState({ people: results });
      });
  }

  handleSearch(search) {
    this.setState({ search });
  }

  handleSelect(selectedPerson) {
    this.setState({ selectedPerson });
  }

  render() {
    const { search, people, selectedPerson } = this.state;
    const filteredPeople = !search ? people : people.filter(p => (
      `${p.name.first} ${p.name.last}`.toLowerCase().includes(search)
    ));

    return (
      <div>
        <h1>My Contact List</h1>
        <div className="sidepanel">
          <SearchField onSearch={this.handleSearch} />
          <ContactList
            people={filteredPeople}
            selectedPerson={selectedPerson}
            onSelect={this.handleSelect}
          />
        </div>
        <div className="main">
          <PersonDetail person={selectedPerson} />
        </div>
      </div>
    );
  }
}

export default ContactApp;
