import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import ItemCard from './ItemCard';
import { firestoreConnect } from 'react-redux-firebase';
import { Rnd } from 'react-rnd';

export default class DraggableItem extends React.Component {
    callDisplay = (e) => {
        this.props.display(this.props.currentItem.key);
    } 
    render() {
        if(this.props.currentItem.description === "container"){
            return (
                <Rnd 
                            style = {{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                border: "solid 4px #ddd",
                                background: this.props.currentItem.background,
                            }}
                            default={{
                                    x: this.props.currentItem.position_x,
                                    y: this.props.currentItem.position_y,
                                    width: this.props.currentItem.width,
                                    height: this.props.currentItem.height,
                                    
                            }}
                            onClick={this.callDisplay}
                            ></Rnd>
            );
        } else if(this.props.currentItem.description === "textbox"){
            return (
                <Rnd 
                            style = {{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                border: "solid 4px #ddd",
                                background: this.props.currentItem.background,
                            }}
                            default={{
                                    x: this.props.currentItem.position_x,
                                    y: this.props.currentItem.position_y,
                                    width: this.props.currentItem.width,
                                    height: this.props.currentItem.height,
                            }}
                            onClick={this.callDisplay}
                            >{this.props.currentItem.properties}</Rnd>
            );
        } else if(this.props.currentItem.description === "button"){
            return (
                <Rnd 
                            style = {{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                border: "solid 4px #ddd",
                                background: this.props.currentItem.background,
                            }}
                            default={{
                                    x: this.props.currentItem.position_x,
                                    y: this.props.currentItem.position_y,
                                    width: this.props.currentItem.width,
                                    height: this.props.currentItem.height,
                            }}
                            onClick={this.callDisplay}
                            >{this.props.currentItem.properties}</Rnd>
            );
        } else if(this.props.currentItem.description === "label"){
            return (
                <Rnd 
                            style = {{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                border: "solid 4px #ddd",
                                background: this.props.currentItem.background,
                            }}
                            default={{
                                    x: this.props.currentItem.position_x,
                                    y: this.props.currentItem.position_y,
                                    width: this.props.currentItem.width,
                                    height: this.props.currentItem.height,
                            }}
                            onClick={this.callDisplay}
                            >{this.props.currentItem.properties}</Rnd>
            );
        } else {
            return (console.log("WHERE IS MY STUFF"));
        }
    }
}

// const stylesContainer = {
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     border: "solid 4px #ddd",
//     //background: this.props.currentItem.background,
// };

// const styleButton = {
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     border: "solid 1px #ddd",
//     background: "#000000"
// };

// const styleTextbox = {
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     border: "solid 2px #ddd",
//     background: "#fffffff"
// };

// const styleLabel = {
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
// };