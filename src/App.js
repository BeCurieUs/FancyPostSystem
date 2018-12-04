import React, { Component } from 'react';
import './App.css';
import Post from './Post';

class App extends Component {
    state = {
       posts: [
           {id: 0, author: 'Ted',  text: 'today I thought that bacon was so great', time: 'Mon May 28 2018 16:12:25 GMT-0500 (CDT)'},
           {id: 1, author: 'Martha',  text: 'having a great time in spain!', time: 'Wed May 30 2018 08:12:25 GMT-0500 (CDT)'},
           {id: 3, author: 'Mark',  text: 'Just got back from my trip it was great', time: 'Wed May 30 2018 11:59:25 GMT-0500 (CDT)'},
       ],
       postInput: '',
       userNameInput: '',
    };

    handleTextClick(id){
        alert(id)
        const posts = this.state.posts.map(post =>{
            if(post.id === id) {
                post.color = 'green'
            }
            return post
        });
        this.setState({posts: posts});
    }

    renderPosts(){
        return this.state.posts.map((post, index) => {
            const description = `${post.author} - ${post.time}`;
            return (
                <Post text={post.text}
                    author={description}
                    key={index}
                    id={post.id}
                    color={post.color}
                    turnMeGreen={(id) => this.handleTextClick(id)}
                    editMe = {(index) => this.editPost(index)}
                />
            )
        }).reverse()
    }

    maxID = () => {
        return this.state.posts.reduce( (acc,currentValue) => {

            if(acc<currentValue.id){
                return  currentValue.id
            } 
            return acc
        },0)
    }
    // needed a way to make sure duplicate IDs weren't assigned. 


    editPost = (id) => {
        const index = this.state.posts.findIndex( (post, index) => {
            return post.id == id
        })
        // find array possition given an id
        const deletedElementArray = this.state.posts.slice();
        deletedElementArray.splice(index,1)
        // delete that post
        this.setState({
            postInput : this.state.posts[index].text,
            userNameInput : this.state.posts[index].author,
            // set input fields equal to that post 

            posts : deletedElementArray,
            // reflect the deleted post in the state
        }) 
    }

    handlePostInputChange(e){
        this.setState({postInput: e.target.value})
    }
    handleUserNameInputChange(e){
        this.setState({userNameInput: e.target.value})
    }

    handleSubmitPost(){
        const newPost = {
            author: this.state.userNameInput,
            text: this.state.postInput,
            id: this.maxID() + 1,
            // new way to assign IDs, assures no duplicate IDs
            time: new Date()
        };
        const posts = this.state.posts.map(post => post);
        posts.push(newPost);
        this.setState({posts, postInput: '', userNameInput: '',})
    }

    renderSubmit(){
       if (this.state.postInput && this.state.userNameInput) {
           return <button onClick={() => this.handleSubmitPost()}>Submit post</button>
       }
    }

    render() {
      return (
        <div className="App">
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
               <input value={this.state.postInput} onChange={(e) => this.handlePostInputChange(e)} placeholder="write something..."/>
               <input value={this.state.userNameInput} onChange={(e) => this.handleUserNameInputChange(e)} placeholder="username"/>
               {this.renderSubmit()}
            </div>
            {this.renderPosts()}
        </div>
      );
    }
}


export default App;
