import React, { Component } from 'react';
import './App.css';
import Emoji from './emoji'

class Post extends Component {
    render() {
        return (
            <div>
                <p style={{color: this.props.color}}>{this.props.text} <button onClick={() => {this.props.editMe(this.props.id)}}><Emoji symbol="📝" label="sheep"/>
                </button></p>
                <p style={{fontSize: '12px'}}>{this.props.author}</p>
                <p onClick={()=> this.props.turnMeGreen(this.props.id)}>turn me green</p>
            </div>
        );
    }
}



export default Post;
