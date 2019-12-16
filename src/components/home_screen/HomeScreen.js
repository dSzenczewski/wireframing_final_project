import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { NavLink, Redirect } from 'react-router-dom';
import { firestoreConnect } from 'react-redux-firebase';
import TodoListLinks from './TodoListLinks'
import { getFirestore } from 'redux-firestore';

class HomeScreen extends Component {

    handleNewDiagram = async () => {
        console.log("New Diagrams");

        const database = await getFirestore().collection("todoLists").get();
        const key = database.size;

        getFirestore().collection('todoLists').add({
            name: "Diagram " + (key+1).toString(),
            owner: "Unkown",
            key: key,
            objects: [],
        });
    }
    render() {
        if (!this.props.auth.uid) {
            return <Redirect to="/login" />;
        }

        return (
            <div className="dashboard container">
                <div className="row">
                    <div className="col s12 m4">
                        <TodoListLinks />
                    </div>

                    <div className="col s8">
                        <div className="banner">
                            Wireframer<br />
                        </div>
                        
                        <div className="home_new_list_container">
                                <button className="home_new_list_button" onClick={this.handleNewDiagram}>
                                    Create a New Diagram
                                </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth
    };
};

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
      { collection: 'todoLists' },
    ]),
)(HomeScreen);