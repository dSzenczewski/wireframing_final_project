import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import { compose } from 'redux';
import ItemsList from './ItemsList.js'
import { firestoreConnect } from 'react-redux-firebase';
import { Rnd } from 'react-rnd';
import DraggableItem from './DraggableItem';

class ListScreen extends Component {
    state = {
        name: '',
        owner: '',
        items: this.props.todoList.objects,
        index: 0,
        properties: '',
        font_size: '',
        background: '',
        border_color: '',
        border_thickness: '',
        border_radius: '',
    }

    handleChange = (e) => {
        const { target } = e;

        this.setState(state => ({
            ...state,
            [target.id]: target.value,
        }));
    }

    newContainer = (e) => {
        this.setState(this.state.items[this.state.items.length] = {
            "key": this.state.items.length,
            "description": "container",
            "position_x": "0",
            "position_y": "0",
            "height": "200",
            "width": "200",
            "properties": "container",
            "font_size": 12,
            "background": "#ffffff",
            "border_color": "#000000",
            "border_thickness": 3,
            "border_radius": 4
        });
        console.log(this.state.items);
        this.render();
    }

    newLabel = (e) => {
        this.setState(this.state.items[this.state.items.length] = {
            "key": this.state.items.length,
            "description": "label",
            "position_x": "0",
            "position_y": "0",
            "height": "20",
            "width": "20",
            "properties": "label",
            "font_size": 12,
            "background": "#ffffff",
            "border_color": "#000000",
            "border_thickness": 3,
            "border_radius": 4
        });
        console.log(this.state.items);
        this.render();
    }

    newButton = (e) => {
        this.setState(this.state.items[this.state.items.length] = {
            "key": this.state.items.length,
            "description": "button",
            "position_x": "0",
            "position_y": "0",
            "height": "30",
            "width": "30",
            "properties": "button",
            "font_size": 12,
            "background": "#ffffff",
            "border_color": "#000000",
            "border_thickness": 3,
            "border_radius": 4
        });
        console.log(this.state.items);
        this.render();
    }

    newTextbox = (e) => {
        this.setState(this.state.items[this.state.items.length] = {
            "key": this.state.items.length,
            "description": "textbox",
            "position_x": "0",
            "position_y": "0",
            "height": "20",
            "width": "60",
            "properties": "textbox",
            "font_size": 12,
            "background": "#ffffff",
            "border_color": "#000000",
            "border_thickness": 3,
            "border_radius": 4
        });
        console.log(this.state.items);
        this.render();
    }

    displayInfo = (index) => {
        console.log(this.state.items[index].properties);
        this.setState({index: this.state.items[index].key})
        this.setState({properties: this.state.items[index].properties})
        this.setState({font_size: this.state.items[index].font_size})
        this.setState({background: this.state.items[index].background})
        this.setState({border_color: this.state.items[index].border_color})
        this.setState({border_thickness: this.state.items[index].border_thickness})
        this.setState({border_radius: this.state.items[index].border_radius})
    }

    properties = (event) => {
        this.setState({properties: event.target.value}, () => {
            this.forceUpdate();
            this.updateItem();
        });
    }

    font = (event) => {
        this.setState({font_size: event.target.value}, () => {
            this.forceUpdate();
            this.updateItem();
        });
    }

    background = (event) => {
        this.setState({background: event.target.value}, () => {
            this.forceUpdate();
            this.updateItem();
        });
    }

    bColor = (event) => {
        this.setState({border_color: event.target.value}, () => {
            this.forceUpdate();
            this.updateItem();
        });
    }

    bThickness = (event) => {
        this.setState({border_thickness: event.target.value}, () => {
            this.forceUpdate();
            this.updateItem();
        });
    }

    bRadius = (event) => {
        this.setState({border_radius: event.target.value}, () => {
            this.forceUpdate();
            this.updateItem();
        });
    }

    updateItem = () => {
        this.state.items[this.state.index].properties = this.state.properties;
        this.state.items[this.state.index].font_size = this.state.font_size;
        this.state.items[this.state.index].background = this.state.background;
        this.state.items[this.state.index].border_color = this.state.border_color;
        this.state.items[this.state.index].border_thickness = this.state.border_thickness;
        this.state.items[this.state.index].border_radius = this.state.border_radius;
        this.props.todoList.objects = this.state.items;
    }

    render() {
        const auth = this.props.auth;
        const todoList = this.props.todoList;
        if (!auth.uid) {
            return <Redirect to="/" />;
        }
        
        return (
            <div className="container white">
                <div class="row">
                    <div class="col s12 m2">
                        <div class="row">
                            <div class="col s12 m3">
                                <label>ZoomIn</label>
                            </div>
                            <div class="col s12 m3">
                                <label>ZoomOut</label>
                            </div>
                            <div class="col s12 m3">
                                <label>Save</label>
                            </div>
                            <div class="col s12 m3">
                                <label>Close</label>
                            </div>
                        </div>
                        <div className="button-field">
                            <button class="containerBtn" onClick={this.newContainer}>Add New Container</button>
                            <button class="labelBtn" onClick={this.newLabel}>Add New Label</button>
                            <button class="buttonBtn" onClick={this.newButton}>Add New Button</button>
                            <button class="textboxBtn" onClick={this.newTextbox}>Add New Textbox</button>
                        </div>            
                    </div>
                    
                    <div class="col s12 m8">
                        <div id="canvas-wrap">
                            {this.state.items.map(item => <DraggableItem currentItem={item} display={this.displayInfo}/>)}
                            <canvas width="800" height="600"></canvas>
                            <div id="overlay"></div>
                            <div className="container grey">
                        </div>
                        </div>    
                    </div>
                    
                    <div class="col s12 m2">
                        <label className="grey-text text-darken-3">Properties</label>
                        <input class="properties" value={this.state.properties} onChange={this.properties}></input>
                        <div class="row">
                            <div class="col s12 m4">
                                <span className="black-text text-darken-3">Font size:</span>
                            </div>
                            <div class="col s12 m8">
                            <input class="font" value={this.state.font_size} onChange={this.font}></input>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col s12 m4">
                                <span className="black-text text-darken-3">Background:</span>
                            </div>
                            <div class="col s12 m8">
                            <input class="background" value={this.state.background} onChange={this.background}></input>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col s12 m4">
                                <span className="black-text text-darken-3">Border color:</span>
                            </div>
                            <div class="col s12 m8">
                            <input class="borderColor" value={this.state.border_color} onChange={this.bColor}></input>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col s12 m4">
                                <span className="black-text text-darken-3">Border thickness:</span>
                            </div>
                            <div class="col s12 m8">
                            <input class="borderThickness" value={this.state.border_thickness} onChange={this.bThickness}></input>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col s12 m4">
                                <span className="black-text text-darken-3">Border radius:</span>
                            </div>
                            <div class="col s12 m8">
                            <input class="borderRadius" value={this.state.border_radius} onChange={this.bRadius}></input>
                            </div>
                        </div>
                    </div>    
                </div>
            </div>            
        );
    }
}

const style = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "solid 1px #ddd",
    background: "#f0f0f0"
};

const mapStateToProps = (state, ownProps) => {
  const { id } = ownProps.match.params;
  const { todoLists } = state.firestore.data;
  const todoList = todoLists ? todoLists[id] : null;
  todoList.id = id;

  return {
    todoList,
    auth: state.firebase.auth,
  };
};



export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    { collection: 'todoLists' },
  ]),
)(ListScreen);