import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import TodoListCard from './TodoListCard';
import { getFirestore } from 'redux-firestore';

class TodoListLinks extends React.Component {
    state = {
        id: ''
    }

    deletePopup = (e) => {
        this.setState({id: e.target.getAttribute("deleteIndex")});
        document.getElementById("delete_popup").setAttribute("class", "onscreen");
    }

    notRemoved = () => {
        document.getElementById("delete_popup").setAttribute("class", "offscreen");
    }

    removeDiagram = (e) => {
        e.stopPropagation();
        var index = this.state.id;
        getFirestore().collection('todoLists').doc(index).delete();
        document.getElementById("delete_popup").setAttribute("class", "offscreen");
        //this.props.history.push('/');
    }
    render() {
        const todoLists = this.props.todoLists;
        console.log(todoLists);
        return (
            <div className="todo-lists section">
                {todoLists && todoLists.map(todoList => (
                    <div className="row">
                        <div className="col s12 m8">
                            <Link to={'/todoList/' + todoList.id} key={todoList.id}>
                                <TodoListCard todoList={todoList} />
                            </Link>
                        </div>
                        <div className="col s12 m4">
                            <button key={todoList.id} deleteIndex={todoList.id} onClick={this.deletePopup}>X</button>
                        </div>
                        <div id="delete_popup" className="offscreen">
                            <p>Delete diagram?
                                <br></br>
                                <br></br>
                                <br></br>
                                Are you sure you want to delete this diagram?
                            </p>
                            <button id="yes_delete" onClick={this.removeDiagram}>Yes</button>
                            <button id="no_delete" onClick={this.notRemoved}>No</button>
                            <p>The diagram will not be retreivable.</p>
                        </div>
                    </div>
                ))}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        todoLists: state.firestore.ordered.todoLists,
        auth: state.firebase.auth,
    };
};

export default compose(connect(mapStateToProps))(TodoListLinks);