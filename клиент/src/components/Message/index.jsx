import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Popover, Button } from 'antd';
import { Emoji } from 'emoji-mart';
import reactStringReplace from 'react-string-replace';

import { Time, IconReaded, Avatar } from '../';

import './Message.scss';


const Message = ({
  avatar,
  user,
  text,
  date,
  isMe,
  readed,
  isTyping,
  onRemoveMessage,
  setPreviewImage,
}) => {

  return (
    <div
      className={classNames('message', {
        'message--isme': isMe,
        'message--is-typing': isTyping,
        'message--image':!text,
      })}>
      <div className="message__content">
        <IconReaded isMe={isMe} isReaded={readed} />
        <Popover
          content={
            <div>
              <Button onClick={onRemoveMessage}>Удалить сообщение</Button>
            </div>
          }
          trigger="click">
          <div className="message__icon-actions">
            <Button type="link" shape="circle" icon="ellipsis" />
          </div>
        </Popover>
        <div className="message__avatar">
          <Avatar user={user} />
        </div>
        <div className="message__info">
          {(text || isTyping) && (
            <div className="message__bubble">
              {text && (
                <p className="message__text">
                  {reactStringReplace(text, /:(.+?):/g, (match, i) => (
                    <Emoji key={i} emoji={match} set="apple" size={16} />
                  ))}
                </p>
              )}
              {isTyping && (
                <div className="message__typing">
                  <span />
                  <span />
                  <span />
                </div>
              )}
            </div>
          )}

          {date && (
            <span className="message__date">
              <Time date={date} />
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

Message.defaultProps = {
  user: {},
};

Message.propTypes = {
  avatar: PropTypes.string,
  text: PropTypes.string,
  date: PropTypes.string,
  user: PropTypes.object,
  isMe: PropTypes.bool,
  isReaded: PropTypes.bool,
  isTyping: PropTypes.bool,
};

export default Message;
