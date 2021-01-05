import React, {useState, useEffect} from 'react'


import Post from "./Post"
import PostForm from "./PostForm"
import { viewOnePost } from '../services/post.service'
import { useParams } from "react-router";


const Reply = () => {
    const {idx}= useParams()
    const [mainPost, setMainPost] = useState([])
    const [repliesArray, setRepliesArray] = useState([])
    // console.log("viewOnePost",viewOnePost(idx))
   console.log("idx", idx)
    
        console.log("RERENDER HOME")

        viewOnePost(idx)
        .then((response) => {
            console.log("response", response)
            setMainPost(response.data)
            console.log("mainPost", mainPost)
            const userReplies = response.data[0].replies.reverse().map((reply, index) => {
                console.log("reply", reply)
                
                return <Post post={reply} />    
            })
            setRepliesArray(userReplies)
        })

       
        useEffect(() => {
            console.log("are we in here at all?")
            
            
        }, [])

    
        // const getOnePost = () => {
           
        // }
        
       
    
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
        {/* <Post post={mainPost} />  */}
        <PostForm parentPost={idx} />
        {repliesArray}
       
        </div>
        )
}

export default Reply