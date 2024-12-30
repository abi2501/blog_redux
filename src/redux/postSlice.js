import { createSlice } from "@reduxjs/toolkit";


const POST_URI = "https://jsonplaceholder.typicode.com/posts"
const USERS_URI = "https://jsonplaceholder.typicode.com/users"

const initialState = {
    users: [],
    posts: []
}

export const getUserNameById = (id, users) => {
    let user = users.find(user => user.id === id)
    return user.username;
}

export const addNewPost = async (dispatcher, post) => {
    const response = await fetch(POST_URI, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(post),
    });

    if (response.ok) {
        dispatcher({
            type: "postReducer/addPost",
            payload: post
        });
    }
}

export const editPost = async (dispatcher, post) => {
    const response = await fetch(POST_URI, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(post),
    });
    if (response.ok) {
        dispatcher({
            type: "postReducer/updatePost",
            payload: post
        })
    }
}

export const deletePost = async (dispatcher, id) => {
    const response = await fetch(`${POST_URI}/${id}`, {
        method: 'DELETE',
    })

    if (response.ok) {
        dispatcher({
            type: "postReducer/deletePost",
            payload: { "id": id }
        })
    }

}

export const fetchAllPosts = async (dispatcher) => {
    const userResponse = await fetch(USERS_URI);
    const userData = await userResponse.json();

    const response = await fetch(POST_URI);
    const postData = await response.json();

    dispatcher({
        type: "postReducer/fetchPost",
        payload: {
            posts: postData,
            users: userData
        }
    })
};


export const searchPost = (dispatcher, text) => {
    dispatcher({
        type: "postReducer/searchPost",
        payload: { title: text }
    });
}

const postSlice = createSlice({
    name: "postReducer",
    initialState,
    reducers: {
        fetchPost: (state, action) => {
            state.posts = action.payload.posts;
            state.users = action.payload.users;
        },
        addPost: (state, action) => {
            let postData = [...state.posts];

            const sortedPosts = [...postData].sort((a, b) => {
                if (a.id > b.id) return 1;
                if (a.id < b.id) return -1;
                return 0;
            });

            action.payload.id = sortedPosts[sortedPosts.length - 1].id + 1
            sortedPosts.push(action.payload);
            state.posts = sortedPosts.reverse();
        },
        updatePost: (state, action) => {

            const post = [...state.posts].filter((post) => post.id !== action.payload.id);
            const postData = [...post, action.payload];
            const sortedPosts = [...postData].sort((a, b) => {
                if (a.id > b.id) return 1;
                if (a.id < b.id) return -1;
                return 0;
            });

            state.posts = sortedPosts
        },
        deletePost: (state, action) => {
            state.posts = [...state.posts].filter((post) => post.id != action.payload.id);
        },
        searchPost: (state, action) => {
            let postData = [...state.posts]
            if (action.payload.title != "") {
                console.log(postData);
                state.posts = [...state.posts].filter((post) => (post.title).includes(action.payload.title) == true)
            }
            else {
                fetchAllPosts();
            }
        }
    }
});


export const { fetchPost } = postSlice.actions;
export default postSlice.reducer;

export const getAllPosts = (state) => state.bstore.posts;
export const getAllUsers = (state) => state.bstore.users;