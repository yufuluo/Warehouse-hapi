import React from "react";
import { ItemList } from "./item-list.jsx";
import { ItemForm } from "./item-form.jsx";

export default class ItemBox extends React.Component {
  loadItems() {
    fetch(this.props.url)
      .then((resp) => {
        this.setState({data: data});
      })
      .catch((err) => {
        console.err(err);
        throw err;
      });
  }

  handleSubmit(item) {
    const items = this.state.data;
    const newItems = items.concat([item]);
    this.setState({data: newItems});

    fetch(this.props.url, {
      method: "POST"
    }).then((resp) => {
      this.setState({data: resp});
    }).catch((err) => {
      console.err(err);
      throw err;
    });
  }

  componentDidMount() {
      this.loadItems();
  }

  getInitialState() {
      return {data: []};
  }

  onChange(state) {
      this.setState(state);
  }

  render() {
      return (
          <div className="itemBox">
              <ItemList data={this.state.data}/>
              <ItemForm onSubmit={this.handleSubmit}/>
          </div>
      );
  }
}
