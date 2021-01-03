
import React, {useState, useEffect} from 'react'
import PostForm from "./PostForm"
import Searchbar from "./Searchbar"
import Post from "./Post"
import {viewAllPosts} from '../services/post.service.js'


const Home = (props) => {
    
    const [posts, setPosts] = useState([])

    useEffect(() => {
        viewAllPosts().
        then((response) => {
            setPosts(response.data)
        }).catch(err => {
            console.log(err)
        })
    }, [])

    const postsFeed = posts.reverse().map((post, index) => {
        return <Post post={post} />    
    })

    return <div>
        <h1>Home Page</h1>
        <PostForm />
        <Searchbar />
        {postsFeed}
        
        
      
    </div>
    
}

export default Home
