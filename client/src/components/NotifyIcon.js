import React from 'react';
import { AiOutlineCheck } from 'react-icons/ai';

const NotifyIcon = ({ product }) => {
  const setIcon = (item) => {
    if (item) {
      return (
        <>
          <span style={{ color: 'green', height: '1em', fontWeight: 'bold' }}>Recommended </span>
          <AiOutlineCheck size="1.5em" color="green" />
        </>
      );
    } else {
      return <></>;
    }
  };
  return <> {setIcon(product)} </>;
};
export default NotifyIcon;
