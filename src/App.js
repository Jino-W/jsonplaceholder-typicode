import React from 'react';
import {BrowserRouter, Route, Link} from 'react-router-dom';
import Home from "./Posts/Home"
import Posts from "./Posts/Posts"
import EachPost from "./Posts/EachPost"
import Comments from "./Posts/Comments"

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <h2>Displaying Posts</h2>
      
      <Link to = "/Home">Home</Link> | 
      <Link to = "/Posts">Posts</Link>

      <Route path = "/Home" component= {Home}></Route>
      <Route path = "/Posts" component= {Posts} exact={true}></Route>
      <Route path = "/Posts/:id" component= {EachPost} exact={true}></Route>
      <Route path = "/Posts/:Id/comments/:id" component= {Comments} exact={true}></Route>
    </div>
    </BrowserRouter>
  );
}

export default App;
