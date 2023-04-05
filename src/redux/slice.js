import { createSlice } from "@reduxjs/toolkit";

export const contactsSlice = createSlice({
    name: 'contacts',
    initialState: { value: [] },
    reducers: {
        addContact: (state, action) => {
            state.value.push(action.payload)
        },
        deleteContact: (state, action) => {
            const index = state.value.findIndex(
                contacts => contacts.id === action.payload
            );
            state.value.splice(index, 1);
        },
    }
})

export const filterSlice = createSlice({
    name: 'filter',
    initialState: { value: '' },
    reducers: {
        setFilter: (state, action) => {
            state.value = action.payload;
        },
      
    }
})

export const { addContact, deleteContact } = contactsSlice.actions
export const { setFilter } = filterSlice.actions