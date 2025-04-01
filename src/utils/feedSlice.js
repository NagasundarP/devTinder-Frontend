import { createSlice } from "@reduxjs/toolkit";
import { act } from "react";

const feedSlice = createSlice({
    name: 'feed',
    initialState: null,
    reducers: {
        addFeed: (state, action) => {
            console.log(action.payload);
            return action.payload;
        },
        removeFeed: (state, action) => {
            const newArr = state.filter(user=>user._id!==action.payload)
            console.log(newArr)
            return newArr;
        },
    },
});

export const { addFeed, removeFeed } = feedSlice.actions;

export default feedSlice.reducer;