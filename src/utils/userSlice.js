import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  refresh: '',
  access: '',
  marked_college_ids: [],
  image: null,
  user_id: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addUser: (state, action) => {
      return action.payload;
    },
    removeUser: (state) => {
      return initialState;
    },
    updateMarkedCollegeIds: (state, action) => {
      const { collegeId } = action.payload;
      const isCollegeMarked = state.marked_college_ids.includes(collegeId);

      return {
        ...state,
        marked_college_ids: isCollegeMarked
          ? state.marked_college_ids.filter((id) => id !== collegeId)
          : [...state.marked_college_ids, collegeId],
      };
    },
  },
});

export const { addUser, removeUser, updateMarkedCollegeIds } = userSlice.actions;
export default userSlice.reducer;