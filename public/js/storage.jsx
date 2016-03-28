'use strict';

var ItemBox = React.createClass({
    loadItems: function () {
        $.ajax({
            url: this.props.url,
            dataType: 'json',
            cache: false,
            success: function (data) {
                this.setState({data: data});
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },

    handleSubmit: function (item) {
        let items = this.state.data;
        let newItems = items.concat([item]);
        this.setState({data: newItems});
        $.ajax({
            url: this.props.url,
            dataType: 'json',
            type: 'POST',
            data: item,
            //headers: {
            //    'Content-Type': 'application/json; charset=utf-8'
            //},
            success: function (data) {
                this.setState({data: data});
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },

    componentDidMount: function () {
        this.loadItems();
        setInterval(this.loadItems, this.props.pollInterval);
    },

    getInitialState: function () {
        return {data: []};
    },

    onChange: function (state) {
        this.setState(state);
    },

    render: function () {
        return (
            <div className="itemBox">
                <ItemList data={this.state.data}/>
                <ItemForm onSubmit={this.handleSubmit}/>
            </div>
        );
    }
});

var ItemList = React.createClass({
    onChange: function (state) {
        this.setState(state);
    },

    render: function () {
        var itemNodes = this.props.data.map(function (item, index) {
            return (
                <Item id={item._id} name={item.name} description={item.description} price={item.price}
                      image={item.image} key={index}/>
            );
        });

        return (
            <div className="itemList">
                {itemNodes}
            </div>
        );
    }
});

var Item = React.createClass({
    onChange: function (state) {
        this.setState(state);
    },

    handleDelete: function (e) {
        e.preventDefault();
        var id = this.props.id;
        $.ajax({
            type: 'DELETE',
            url: '/storage?id=' + id
        });
    },

    handleUpdate: (e) => {

    },

    handleEdit: function (e) {
        e.preventDefault();
        const edit = '#' + this.props.id + 'edit';
        const display = '#' + this.props.id + 'display';
        $(edit).removeClass('hide');
        $(display).addClass('hide');
    },

    render: function () {
        const display = this.props.id + 'display';
        const edit = this.props.id + 'edit';
        return (
            <div>
                <form id={display} className="item">
                    <img className="image" src={this.props.image}/>
                    <h2 className="itemName">
                        {this.props.name}
                    </h2>
                    <div>
                        {this.props.description}
                    </div>
                    <div>
                        ${this.props.price}
                    </div>
                    <div className="hide">
                        {this.props.id}
                    </div>
                    <div>
                        <input className="button" type="button" value="Delete" onClick={this.handleDelete}/><br/>
                        <input className="button" type="button" value="Edit" onClick={this.handleEdit}/>
                    </div>
                </form>
                <form id={edit} className="hide">
                    <input className="inputField" type="text" value={this.props.name} ref="name"/><br/>
                    <input className="button" type="button" value="Update" onClick={this.handleUpdate}/><br/>
                </form>
            </div>
        );
    }
});

var ItemForm = React.createClass({
    onChange: function (state) {
        this.setState(state);
    },

    handleSubmit: function (e) {
        e.preventDefault();
        var name = React.findDOMNode(this.refs.name).value.trim();
        var description = React.findDOMNode(this.refs.description).value.trim();
        var price = React.findDOMNode(this.refs.price).value.trim();
        var imageUrl = React.findDOMNode(this.refs.imageUrl).value.trim();
        if (!name || !description || !price || !imageUrl) {
            return;
        }
        this.props.onSubmit({name: name, description: description, price: price, imageUrl: imageUrl});
        React.findDOMNode(this.refs.name).value = '';
        React.findDOMNode(this.refs.description).value = '';
        React.findDOMNode(this.refs.price).value = '';
        React.findDOMNode(this.refs.imageUrl).value = '';
    },

    render: function () {
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
});

React.render(
    <ItemBox url="storage" pollInterval={2000}/>,
    document.getElementById('storage')
);