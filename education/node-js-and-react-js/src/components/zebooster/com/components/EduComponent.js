'use strict';

import React from 'react';

require('styles/zebooster/com/components/Edu.css');

class EduComponent extends React.Component {
  render() {
    return (
      <div className="edu-component">
        Please edit src/components/zebooster/com/components/EduComponent.js to update this component!
        <div>Variable import:</div>
        {jsxList}
        <div>Composite react component:</div>
        <ShoppingList/>
      </div>
    );
  }
}

let jsxList = (
  <ul>
    <li className="active"> Item 1</li>
    <li> Item 2</li>
    <li> Item 3</li>
  </ul>
)

const Item = ({done, text}) => (
  <li>
    <input type="checkbox" defaultChecked={done}/>
    { text }
  </li>
);

class ItemForm extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);

    this.state = {
      text: ''
    };
  }

  handleSubmit(event) {
    event.preventDefault();

    const newItem = {
      done: false,
      text: this.state.text
    };

    this.props.onAddItem(newItem);

    this.setState({text: ''});
  }

  handleChange(event) {
    this.setState({
      text: event.target.value
    });
  }

  render() {
    const {text} = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          value={text}
          onChange={this.handleChange}
        />
        <button>Add item</button>
      </form>
    );
  }
}


class ShoppingList extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.handleAddItem = this.handleAddItem.bind(this);

    this.state = {
      items: [{
        done: false,
        text: 'Apples'
      }, {
        done: true,
        text: 'Meat'
      }]
    };
  }

  handleAddItem(newItem) {
    this.setState({
      items: this.state.items.concat([newItem])
    });
  }

  render() {
    const {items} = this.state;
    return (
      <div>
        <h1>Shopping List</h1>

        <ul>
          { items.map(item => (
            <Item
              key={item.text}
              done={item.done}
              text={item.text}
            />
          )) }
        </ul>

        <ItemForm onAddItem={this.handleAddItem}/>
      </div>
    );
  }
}


EduComponent.displayName = 'ZeboosterComComponentsEduComponent';

// Uncomment properties you need
// EduComponent.propTypes = {};
// EduComponent.defaultProps = {};

export default EduComponent;
