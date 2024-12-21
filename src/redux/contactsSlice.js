
import { createSlice, createSelector, isAnyOf } from "@reduxjs/toolkit";
import { addContact, deleteContact, fetchContacts } from "./contactsOps";
import { selectFilter } from "./filtersSlice";

const initialState = {
    items: [],
    loading: false,
    error: null,
};

const contactsSlice = createSlice({
    name: 'contacts',
    initialState,
    extraReducers: builder => {
        builder
            .addCase(fetchContacts.fulfilled, (state, { payload }) => {
                state.items = payload;
            })
            .addCase(addContact.fulfilled, (state, { payload }) => {
                state.items.push(payload);
            })
            .addCase(deleteContact.fulfilled, (state, actions) => {
                state.items = state.items.filter(item => item.id !== actions.payload.id);
            })

            .addMatcher(
                isAnyOf(fetchContacts.pending, addContact.pending, deleteContact.pending),
                (state) => {
                    state.error = null;
                    state.loading = true;
                }
            )
            .addMatcher(
                isAnyOf(fetchContacts.fulfilled, addContact.fulfilled, deleteContact.fulfilled),
                (state) => {
                    state.loading = false;
                }
            )
            .addMatcher(
                isAnyOf(fetchContacts.rejected, addContact.rejected, deleteContact.rejected),
                (state) => {

                    state.loading = false;
                }
            );
    },
});



export const selectContacts = state => state.contacts.items;
export const selectLoading = state => state.contacts.loading;
export const selectError = state => state.contacts.error;

export const selectFilteredContacts = createSelector(
    [selectContacts, selectFilter],
    (contacts, newName) => {
        return contacts.filter(contact => {
            return contact.name.toLowerCase().includes(newName);
        });
    }
);

export default contactsSlice.reducer;





