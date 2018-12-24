import React from 'react';
import Loader from 'react-loader-spinner';

const Spinner = () =>
  <div>
    <div className='poll-list__spinner-spacer'></div>
    <Loader
      type='Puff'
      color='#00ADB5'
      height='100'
      width='100'
    />
    <div className='poll-list__spinner-spacer'></div>
  </div>

export default Spinner;