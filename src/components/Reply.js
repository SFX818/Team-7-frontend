import React, {useState, useEffect} from 'react'


import Post from "./Post"
import PostForm from "./PostForm"
import { viewOnePost } from '../services/post.service'
import { useParams } from "react-router";


const Reply = () => {
    const {idx}= useParams()
    const [mainPost, setMainPost] = useState([])
    const [repliesArray, setRepliesArray] = useState([])
   
   console.log("idx", idx)
    
        console.log("RERENDER HOME")
       
        useEffect(() => {
            console.log("are we in here at all?")
            viewOnePost(idx).
            then((response) => {
                console.log("response", response)
                setMainPost(response.data)
            }).catch(err => {
                console.log(err)
            })
        }, [idx])

    
        // const rerenderHome = () => {
        //     setUpdate(update+1)
        // }
        
        // const userReplies = mainPost.replies.reverse().map((reply, index) => {
        //     return <Post post={reply} rerenderHome={rerenderHome} />    
        // })
    
    // const currentUser = getCurrentUser()
    // 
    // const singlePost = viewOnePost(parentPost)
    // // set the reply
    // const [replies, setReplies] = useState([])
    // const [mainPost, setMainPost] = useState("")
    

    // console.log("parentPost", parentPost)

    // useEffect(() => {
    //     setMainPost(singlePost)
    //     console.log("mainPost", mainPost)
    //     setReplies(singlePost.replies)
    // }, [])



    
    return (
        <div>
        <Post post={mainPost} /> 
        <PostForm parentPost={idx} />
        {/* {userReplies} */}
       
        </div>
        )
}

export default Reply