import React from "react"
import axios from "axios"
import {Link} from "react-router-dom"


class EachPost extends React.Component{
    constructor(){
        super()
        this.state = {
            post : {},
            comments : [],
            user: {},
            isComment : false
        }
    }


    commentHandle=()=>{
        this.setState({isComment: true})
    }


    componentDidMount(){
        //const id = this.props.match.params.id
        const { match: { params } } = this.props;
        const id = this.props.match.params.id
        console.log(params.id)
        axios.get(`http://jsonplaceholder.typicode.com/posts/${params.id}`)
        .then((response)=>{
            console.log("each postts",response)
            const post = response.data
            this.setState({post:post})

            //axios.get(`https://jsonplaceholder.typicode.com/posts/1/users?id=${params.id}`)
            axios.get(`https://jsonplaceholder.typicode.com/users/${this.state.post.id}`)
            axios.get(`https://jsonplaceholder.typicode.com/users/${this.state.post.userId}`)
                .then((response)=>{
                    console.log("user",response)
                    const user = response.data
                    this.setState({user:user})
                })
        })

        axios.get(`https://jsonplaceholder.typicode.com/posts/1/comments?postId=${params.id}`)
        //axios.get(`https://jsonplaceholder.typicode.com/comments/?postId=${params.id}`)
            .then((response)=>{
                console.log("comments",response)
                const comments = response.data
                this.setState({comments:comments})
            })
            .catch((err)=>{
                alert(err)
            })
    }

    render(){
        console.log("userObj",this.state.user)
        console.log("CommentArr",this.state.comments)
        console.log("postObj",this.state.post.title)
        const {id,title,body} = this.state.post
        return(
            <div>
                <br/>
                <hr/>
                <h2>Post Details:</h2>
                <p><b>UserName: </b> {this.state.user.name}</p>
                <p><b>Title: </b> {title}</p>
                <p><b>Body: </b> {body}</p>

                <Link onClick={this.commentHandle}>Comments</Link>
                <br/>
                {this.state.isComment &&
                    <div>
                        
                        <h2>Listing Comments - {this.state.comments.length}</h2>
                        <ol>
                            {
                                this.state.comments.map((comment)=>{
                                    console.log(comment)
                                    return (
                                        <li key = {comment.id}>{comment.body}</li>
                                    )
                                })
                            }
                        </ol>
                    </div>
                }

                <br/>
                <hr/>
                

                <p><Link to ={`/Posts/${this.state.post.userId}/comments/${id}`}>Comments of post {id}</Link></p>

            </div>
        )
    }
}

export default EachPost