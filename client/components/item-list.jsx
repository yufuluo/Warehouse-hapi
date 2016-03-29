import React from "react";
import { Item } from "./item.jsx";

export default class ItemList extends React.Component {
  onChange(state) {
    this.setState(state);
  }

  render() {
    const itemNodes = this.props.data.map((item, index) => {
      return (
        <Item id={item._id} name={item.name} description={item.description}
          price={item.price} image={item.image} key={index}/>
      );
    });

    return (
      <div className="itemList">
        {itemNodes}
      </div>
    );
  }
}
