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
    }

    handleChange = (e) => {
        const { target } = e;

        this.setState(state => ({
            ...state,
            [target.id]: target.value,
        }));
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
                        <h5 className="grey-text text-darken-3">Diagram</h5>
                        <div className="input-field">
                            <label htmlFor="email">Name</label>
                            <input className="active" type="text" name="name" id="name" onChange={this.handleChange} value={todoList.name} />
                        </div>
                        <div className="input-field">
                            <label htmlFor="password">Owner</label>
                            <input className="active" type="text" name="owner" id="owner" onChange={this.handleChange} value={todoList.owner} />
                        </div>
                        
                        
                    </div>
                    
                    <div class="col s12 m8">
                        <div id="canvas-wrap">
                            {this.state.items.map(item => <DraggableItem currentItem={item}/>)}
                            <canvas width="800" height="600"></canvas>
                            <div id="overlay"></div>
                            <div className="container grey">
                        
                            <Rnd default={{
                                x: 0,
                                y: 0,
                                width: 20,
                                height: 20,
                            }}>Textbox</Rnd>
                        </div>
                        </div>    
                    </div>
                    
                    <div class="col s12 m2">
                    <h5 className="grey-text text-darken-3">Diagram</h5>
                        <div className="input-field">
                            <label htmlFor="email">Name</label>
                            <input className="active" type="text" name="name" id="name" onChange={this.handleChange} value={todoList.name} />
                        </div>
                        <div className="input-field">
                            <label htmlFor="password">Owner</label>
                            <input className="active" type="text" name="owner" id="owner" onChange={this.handleChange} value={todoList.owner} />
                        </div>
                        <ItemsList todoList={todoList} />
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