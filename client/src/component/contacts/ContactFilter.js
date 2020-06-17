import React, { useContext, useRef, useEffect } from 'react';
import ContactContext from '../../context/contact/contactContext';

const ContactFilter = () => {
  const contactContext = useContext(ContactContext);
  const { filterContacts, filterClear, filtered } = contactContext;
  const text = useRef('');
  useEffect(() => {
    if (filtered === null) {
      text.current.value = '';
    }
    // eslint-disable-next-line
  }, []);
  const onChange = (e) => {
    if (text.current.value !== '') {
      filterContacts(e.target.value);
    } else {
      filterClear();
    }
  };
  return (
    <form>
      <input
        ref={text}
        type='text'
        placeholder='Filter Contact........'
        onChange={onChange}
      />
    </form>
  );
};

export default ContactFilter;
