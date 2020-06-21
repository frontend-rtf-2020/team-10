import React from 'react';
import PropTypes from 'prop-types';

import { Button, Popover } from 'antd';

import './Status.scss';

const Status = ({ fullname }) => (
  <div className="chat__dialog-header">
    <div className="chat__dialog-header-center">
      <b className="chat__dialog-header-username">{fullname}</b>
    </div>
    <Popover
      className="chat__dialog-header-action"
      content={
        <div>
          <Button>Удалить диалог</Button>
        </div>
      }
      trigger="click">
      <div>
        <Button type="link" shape="circle" icon="ellipsis" />
      </div>
    </Popover>
  </div>
);

Status.propTypes = {
  online: PropTypes.bool,
};

export default Status;
