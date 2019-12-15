import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import ItemCard from './ItemCard';
import { firestoreConnect } from 'react-redux-firebase';
import { Rnd } from 'react-rnd';

export default class DraggableItem extends React.Component {
    render() {
        if(this.props.currentItem.description === "container"){
            return (
                <Rnd 
                            style = {this.props.currentItem.background}
                            default={{
                                    x: this.props.currentItem.position_x,
                                    y: this.props.currentItem.position_y,
                                    width: this.props.currentItem.width,
                                    height: this.props.currentItem.height,
                            }}>{this.props.currentItem.properties}</Rnd>
            );
        } else if(this.props.currentItem.description === "textbox"){
            return (
                <Rnd 
                            style = {this.props.currentItem.background}
                            default={{
                                    x: this.props.currentItem.position_x,
                                    y: this.props.currentItem.position_y,
                                    width: this.props.currentItem.width,
                                    height: this.props.currentItem.height,
                            }}>{this.props.currentItem.properties}</Rnd>
            );
        } else if(this.props.currentItem.description === "button"){
            return (
                <Rnd 
                            style = {this.props.currentItem.background}
                            default={{
                                    x: this.props.currentItem.position_x,
                                    y: this.props.currentItem.position_y,
                                    width: this.props.currentItem.width,
                                    height: this.props.currentItem.height,
                            }}>{this.props.currentItem.properties}</Rnd>
            );
        } else if(this.props.currentItem.description === "label"){
            return (
                <Rnd 
                            style = {this.props.currentItem.background}
                            default={{
                                    x: this.props.currentItem.position_x,
                                    y: this.props.currentItem.position_y,
                                    width: this.props.currentItem.width,
                                    height: this.props.currentItem.height,
                            }}>{this.props.currentItem.properties}</Rnd>
            );
        } else {
            return null;
        }
    }
}

const styleContainer = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "solid 1px #ddd",
    background: "#000000"
};

const styleButton = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "solid 1px #ddd",
    background: "#222222"
};

const styleTextbox = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "solid 1px #ddd",
    background: "#fffffff"
};

const styleLabel = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
};