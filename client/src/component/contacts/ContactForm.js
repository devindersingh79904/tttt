import React, { useState, useContext, useEffect } from 'react';
import ContactContext from '../../context/contact/contactContext';
const ContactForm = () => {
  const contactContext = useContext(ContactContext);
  const { addContact, current, clearCurrent, updateContact } = contactContext;
  const [contact, setContact] = useState({
    name: '',
    email: '',
    phone: '',
    type: 'Personal',
  });

  useEffect(() => {
    if (current !== null) {
      setContact(current);
    } else {
      setContact({
        name: '',
        email: '',
        phone: '',
        type: 'Personal',
      });
    }
  }, [contactContext, current]);

  const { name, email, phone, type } = contact;

  const onChange = (e) =>
    setContact({ ...contact, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    if (current === null) {
      addContact(contact);
    } else {
      updateContact(contact);
      clearCurrent();
    }

    setContact({
      name: '',
      email: '',
      phone: '',
      type: 'Personal',
    });
  };
  const clearAll = () => {
    clearCurrent();
  };
  return (
    <form onSubmit={onSubmit}>
      <h2 className='text-primary'>
        {!current ? 'Add Contact' : 'Update Contact'}
      </h2>
      <input
        type='text'
        placeholder='Name'
        name='name'
        value={name}
        onChange={onChange}
      />
      <input
        type='email'
        placeholder='Email'
        name='email'
        value={email}
        onChange={onChange}
      />
      <input
        type='text'
        placeholder='Phone'
        name='phone'
        value={phone}
        onChange={onChange}
      />
      <h5>Contact Type</h5>
      <input
        type='radio'
        name='type'
        value='Personal'
        checked={type === 'Personal'}
        onChange={onChange}
      />
      Personal{' '}
      <input
        type='radio'
        name='type'
        value='Professional'
        checked={type === 'Professional'}
        onChange={onChange}
      />
      Professional
      <div>
        <input
          type='submit'
          value={!current ? 'Add Contact' : 'Update Contact'}
          className='btn btn-primary btn-block'
        ></input>
      </div>
      {current && (
        <div>
          <button className='btn btn-light btn-block' onClick={clearAll}>
            Clear{' '}
          </button>
        </div>
      )}
    </form>
  );
};

export default ContactForm;
