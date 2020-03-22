import React from "react"
import axios from "axios"


class Comments extends React.Component{
    constructor(){
        super()
        this.state = {
            comments : []
        }
    }

    componentDidMount(){
        const { match: { params } } = this.props;
        axios.get(`https://jsonplaceholder.typicode.com/posts/1/comments?postId=${params.id}`)
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
        console.log("in render",this.state.comments)
        return(
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
        )
    }
}

export default Comments