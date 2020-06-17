import React, { useReducer } from 'react';
import axios from 'axios';
import ContactContext from './contactContext';
import ContactReducer from './contactReducer';
import {
  GET_CONTACTS,
  ADD_CONTACT,
  DELETE_CONTACT,
  UPDATE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  FILTER_CONTACTS,
  CLEAR_FILTER,
  CONTACT_ERROR,
  CLEAR_CONTACTS,
} from '../types';
import { compareSync } from 'bcryptjs';

const ContactState = (props) => {
  const initialState = {
    contacts: null,
    current: null,
    filtered: null,
    error: null,
  };

  const [state, dispatch] = useReducer(ContactReducer, initialState);

  //add contacts
  const getContact = async () => {
    try {
      const res = await axios.get('/api/contacts');
      dispatch({
        type: GET_CONTACTS,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: CONTACT_ERROR,
        payload: err.response.msg,
      });
    }
  };

  const addContact = async (contact) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      const res = await axios.post('/api/contacts', contact, config);
      dispatch({
        type: ADD_CONTACT,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: CONTACT_ERROR,
        payload: err.response.msg,
      });
    }
  };

  //delete contact
  const deleteContact = async (id) => {
    try {
      await axios.delete(`/api/contacts/${id}`);
      dispatch({
        type: DELETE_CONTACT,
        payload: id,
      });
    } catch (err) {
      dispatch({
        type: CONTACT_ERROR,
        payload: err.response.msg,
      });
    }
  };

  //clear contacts
  const clearContacts = () => {
    dispatch({
      type: CLEAR_CONTACTS,
    });
  };
  //set Current

  const setCurrent = (contact) => {
    dispatch({
      type: SET_CURRENT,
      payload: contact,
    });
  };
  //Clear Current

  const clearCurrent = (contact) => {
    dispatch({
      type: CLEAR_CURRENT,
    });
  };
  // Update Contact

  const updateContact = async (contact) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      const res = await axios.put(
        `/api/contacts/${contact._id}`,
        contact,
        config
      );
      dispatch({
        type: UPDATE_CONTACT,
        payload: contact,
      });
    } catch (err) {
      dispatch({
        type: CONTACT_ERROR,
        payload: err.response.msg,
      });
    }
  };

  const filterContacts = (text) => {
    dispatch({
      type: FILTER_CONTACTS,
      payload: text,
    });
  };

  const filterClear = () => {
    dispatch({ type: CLEAR_FILTER });
  };

  return (
    <ContactContext.Provider
      value={{
        contacts: state.contacts,
        current: state.current,
        filtered: state.filtered,
        error: state.error,
        loading: state.loading,
        getContact,
        addContact,
        deleteContact,
        clearContacts,
        setCurrent,
        clearCurrent,
        updateContact,
        filterContacts,
        filterClear,
      }}
    >
      {props.children}
    </ContactContext.Provider>
  );
};

export default ContactState;
