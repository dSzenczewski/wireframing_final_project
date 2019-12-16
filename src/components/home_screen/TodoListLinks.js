import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import TodoListCard from './TodoListCard';
import { getFirestore } from 'redux-firestore';

class TodoListLinks extends React.Component {
    delete = (e) => {
        e.stopPropagation();
        var index = e.target.getAttribute("deleteIndex");
        getFirestore().collection('todoLists').doc(index).delete();
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
                            <button key={todoList.id} deleteIndex={todoList.id} onClick={this.delete}>X</button>
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