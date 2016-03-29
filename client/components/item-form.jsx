import React from "react";

export default class ItemForm extends React.Component {
  onChange(state) {
    this.setState(state);
  }

  handleSubmit(e) {
    e.preventDefault();
    const name = React.findDOMNode(this.refs.name).value.trim();
    const description = React.findDOMNode(this.refs.description).value.trim();
    const price = React.findDOMNode(this.refs.price).value.trim();
    const imageUrl = React.findDOMNode(this.refs.imageUrl).value.trim();
    if (!name || !description || !price || !imageUrl) {
      return;
    }
    this.props.onSubmit({name: name, description: description, price: price, imageUrl: imageUrl});
    React.findDOMNode(this.refs.name).value = '';
    React.findDOMNode(this.refs.description).value = '';
    React.findDOMNode(this.refs.price).value = '';
    React.findDOMNode(this.refs.imageUrl).value = '';
  }

  render() {
    return (
      <form className="itemForm" onSubmit={this.handleSubmit}>
        <input className="inputField" type="text" placeholder="Item name" ref="name"/><br/>
        <input className="inputField" type="text" placeholder="Description" ref="description"/><br/>
        <input className="inputField" type="text" placeholder="Price" ref="price"/><br/>
        <input className="inputField" type="text" placeholder="Image Url" ref="imageUrl"/><br/>
        <input className="button" type="submit" value="Add Item"/>
      </form>
    );
  }
}
