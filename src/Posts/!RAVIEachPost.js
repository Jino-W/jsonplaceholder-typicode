import React from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'

class ShowComments extends React.Component{
    constructor(){
        super()
        this.state={
            postInfo:{},
            comments:[],
            user:{},
            view:false
        }
    }
    componentDidMount(){
        const id = this.props.match.params.id
        axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`)
        .then((response)=>{
            const postInfo=response.data
            this.setState({postInfo})
            axios.get(`https://jsonplaceholder.typicode.com/users/${this.state.postInfo.userId}`)
            .then((response)=>{
            const user=response.data
            this.setState({user})

        })
        .catch((err)=>{
            alert(err)
        })
        })
        .catch((err)=>{
            alert(err)
        })
        axios.get(`https://jsonplaceholder.typicode.com/comments/?postId=${id}`)
        .then((response)=>{
            const comments=response.data
            this.setState({comments})
            
        })
        .catch((err)=>{
            alert(err)
        })
        
    }
    handleView=()=>{
        this.setState({view:true})
    }

    render(){
        return(
            <div>
               <p>UserName: {this.state.user.name}</p>
               <p>Title: {this.state.postInfo.title}</p>
               <p>Body: {this.state.postInfo.body}</p> 
               <button onClick={this.handleView}>Show Comments</button>

               <Link onClick={this.handleView} to={`/posts/${this.state.postInfo.userId}/comments`}>Show Comments</Link>
               
               {this.state.view &&
               <ul>
                {this.state.comments.map((com)=>{
                    return(
                        <div>
                            <h1>Comment No {com.id}</h1>
                            <p>Name: {com.name}</p>
                            <p> Email: {com.email}</p>
                            <p>Body: {com.body}</p> 
                        </div>
                    )
                })}
                
               </ul>
               }
               
               
            </div>
        )
    }
}
export default ShowComments;