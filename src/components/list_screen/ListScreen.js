import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import { compose } from 'redux';
import ItemsList from './ItemsList.js'
import { firestoreConnect } from 'react-redux-firebase';
import { Rnd } from 'react-rnd';
import DraggableItem from './DraggableItem';
import { getFirestore } from 'redux-firestore';

class ListScreen extends Component {
    state = {
        height: 600,
        width: 800,
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
            "height": "400",
            "width": "400",
            "properties": "container",
            "font_size": 12,
            "background": "white",
            "border_color": "black",
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
            "height": "50",
            "width": "100",
            "properties": "label",
            "font_size": 12,
            "background": "white",
            "border_color": "black",
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
            "height": "100",
            "width": "150",
            "properties": "button",
            "font_size": 12,
            "background": "grey",
            "border_color": "black",
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
            "height": "50",
            "width": "150",
            "properties": "textbox",
            "font_size": 12,
            "background": "white",
            "border_color": "black",
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

    zoomIn = () => {
        this.setState({height: this.state.height/2})
        this.setState({width: this.state.width/2})
        this.forceUpdate();
    }

    zoomOut = () => {
        this.setState({height: this.state.height*2})
        this.setState({width: this.state.width*2})
        this.forceUpdate();
    }
    
    save = async () => {
        document.getElementById("delete_popup").setAttribute("class", "offscreen");
        console.log(this.props)
        const id = this.props.match.params.id;
         const db = await getFirestore().collection("todoLists").doc(id.toString()).get();
        getFirestore().collection("todoLists").doc(id.toString()).update({objects: this.state.items});
        this.props.history.push('/');
    }

    close = () => {
        document.getElementById("delete_popup").setAttribute("class", "offscreen");
        this.props.history.push('/');
    }

    saveDialog = () => {
        document.getElementById("delete_popup").setAttribute("class", "onscreen");
    }

    deleteObject = () => {
        if(this.state.items[this.state.index] != null){
            var temp = this.state.items;
            temp[this.state.index] = {};
            this.setState({items: temp});
            this.props.todoList.objects = temp;

        }else {
            console.log("Object cannot be deleted")
        }
    }

    duplicateObject = () => {
        if(this.state.items[this.state.index] != null){
            var temp = this.state.items[this.state.index];
            temp.position_x = (100 + Number(temp.position_x)).toString();
            temp.position_y = (100 + Number(temp.position_y)).toString();
            this.setState(this.state.items[this.state.items.length+1] = temp)
        }else {
            console.log("Object cannot be deleted")
        }
    }

    render() {
        const auth = this.props.auth;
        const todoList = this.props.todoList;
        if (!auth.uid) {
            return <Redirect to="/" />;
        }
        
        return (
            <div className="container white">
                <div id="delete_popup" className="offscreen">
                    <p>Closing Diagram
                        <br></br>
                        <br></br>
                        <br></br>
                        Would you like to save before closing your work?
                    </p>
                    <button id="yes_delete" onClick={this.save}>Yes</button>
                    <button id="no_delete" onClick={this.close}>No</button>
                    <p>Any unsaved progress will be lost.</p>
                </div>
                <div class="row">
                    <div class="col s12 m2">
                        <div class="row">
                            <div class="col s12 m3">
                                <span onClick={this.zoomIn}>+</span>
                            </div>
                            <div class="col s12 m3">
                                <span onClick={this.zoomOut}>-</span>
                            </div>
                            <div class="col s12 m3">
                                <span onClick={this.save}>Save</span>
                            </div>
                            <div class="col s12 m3">
                                <span onClick={this.saveDialog}>X</span>
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
                            <canvas width={this.state.width} height={this.state.height}></canvas>
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
                        {/* <button onClick={this.duplicateObject}>Duplicate Object</button> */}
                        {/* <button onClick={this.deleteObject}>Delete Object</button> */}
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