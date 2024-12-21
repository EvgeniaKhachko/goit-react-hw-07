import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = "https://6765f189410f8499965683c7.mockapi.io";

export const fetchContacts = createAsyncThunk("contacts/fetchContacts", async (_, thunkApi) => {
    try {
        const response = await axios.get("/contacts");
        return response.data;
    } catch (error) {
        return thunkApi.rejectWithValue(error.message);
    }
});

export const addContact = createAsyncThunk("contacts/addContact", async (body, thunkApi) => {
    try {
        const response = await axios.post("/contacts", body);
        return response.data;
    } catch (error) {
        return thunkApi.rejectWithValue(error.message);
    }
});

export const deleteContact = createAsyncThunk("contacts/deleteContact", async (id, thunkApi) => {
    try {
        const response = await axios.delete(`/contacts/${id}`);
        return response.data;
    } catch (error) {
        return thunkApi.rejectWithValue(error.message);
    }
});