import React from 'react'

//Helper
import { viewFavoritePosts } from '../services/post.service'
import { getCurrentUser } from '../services/auth.service'

const Favorites = () => {
    // const [favorites, setFavorites]= useState([])
    const currentUser = getCurrentUser()
    const id = currentUser.id

    const favePosts = () => {
        viewFavoritePosts(id).then(user => {
            console.log(user.data)
            return user.data.favoritePosts.map(post => (
                <ul>
                    <li key={post._id}>
                        {post.body}
                    </li>
                </ul>
             )) 

            })
    }


// const displayFavePost = () => {
//     favePosts()
//     console.log(favePosts())
//   return(
//     <ul>
//     <li>{favorites}</li>
//     </ul>
//   )
// }

//     // function that returns list of favePosts


return <div>
    <h1>Favorites</h1>
        {favePosts()}

</div>

}

export default Favorites