import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import ContactContext from '../../context/contact/contactContext';

const ContactItem = ({ contact }) => {
  const contactContext = useContext(ContactContext);
  const { deleteContact, setCurrent, clearCurrent } = contactContext;
  const { _id, name, phone, email, type } = contact;

  const onDelete = () => {
    deleteContact(_id);
    clearCurrent();
  };

  const onEdit = () => {
    setCurrent(contact);
  };
  return (
    <div className='card bg-light'>
      <h3 className='text-primary text-left'>
        {name}{' '}
        <span
          style={{ float: 'right' }}
          className={
            'badge ' + (type === 'Personal' ? 'badge-primary' : 'badge-success')
          }
        >
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </span>
      </h3>
      <ul className='list'>
        {email && (
          <li>
            <i className='fas fa-envelope-open'></i>
            {email}
          </li>
        )}

        {phone && (
          <li>
            <i className='fas fa-phone'></i>
            {phone}
          </li>
        )}
      </ul>

      <button className='btn btn-dark btn-sm' onClick={onEdit}>
        Edit
      </button>
      <button className='btn btn-danger btn-sm' onClick={onDelete}>
        Delete
      </button>
    </div>
  );
};

ContactItem.propType = {
  contact: PropTypes.object.isRequired,
};
export default ContactItem;
