import React, { useState } from 'react'
import { getCurrentUser } from '../services/auth.service.js'
import {newPost} from '../services/post.service.js'
import { replyToPost } from '../services/post.service'

const PostForm = (props) => {

    const currentUser = getCurrentUser()
    const [post, setPost] = useState("")
    let parentPost = props.parentPost

    const onChangePost = (e) => {
        const postText = e.target.value
        setPost(postText)
    }

    const handlePost = (e) => {
        const hashtags = []
        // splits a post by space
        let postArr = post.split(" ")
        // scans the post for hashtags and pushes into an array that we will send in post request
        postArr.forEach(word => {
            if (word.charAt(0) === '#'){
                hashtags.push(word)
            }
        })
        if(parentPost) {
            replyToPost(currentUser.id, post, hashtags, parentPost)
        }else {
            newPost(currentUser.id, post, hashtags)
        }
    }

    return (
        <div>
        {currentUser && (
            <form onSubmit={handlePost}>
                <div class="w-60">
                    <textarea class="form-control" value={post} onChange={onChangePost} rows="3" placeholder="Write a post..."></textarea>
                    <button class="btn btn-primary" type="submit" value="Submit"><i class="fas fa-pen"></i></button>
                    {/* <input type="submit" value="Submit" /> */}
                </div>
            {/* Write a post:
            <input type="text" value={post} onChange={onChangePost} />
            </label> */}
            
        </form>
        
        )}
        </div>
        )
}

export default PostForm