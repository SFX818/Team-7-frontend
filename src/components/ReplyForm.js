import React, {useState, useEffect} from 'react'
import {useLocation} from "react-router-dom"

import {getCurrentUser} from '../services/auth.service'
import { replyToPost } from '../services/post.service'
import { viewOnePost } from '../services/post.service'



const ReplyForm = (props) => {
    const currentUser = getCurrentUser()
    //props passes paretPost from link in Post.js
    const {state} = props.location.state
    let location = useLocation()
    const creator = currentUser.id
    // console.log("location", location)
    console.log("parentPost", parentPost)


    const [reply, setReply] = useState([])
    
    const onUpdateReplies = (e) => {
        const replyText = e.target.value
        setReply(replyText)
    }

    const handleReply = (e) => {
        const hashtags = []
        const body = reply
        // splits a post by space
        let postArr = reply.split(" ")
        // scans the post for hashtags and pushes into an array that we will send in post request
        postArr.forEach(word => {
            if (word.charAt(0) === '#'){
                hashtags.push(word)
            }
        })

        replyToPost(creator, body, hashtags,parentPost)
    }

    
    return (
        <div>
        {(currentUser) && (
            <form onSubmit={handleReply}>
            <label>
            Write a reply:
            <input type="text" value={reply} onChange={onUpdateReplies} />
            </label>
            <input type="submit" value="Submit" />
        </form>
         )}
        </div>
        )
}

export default ReplyForm