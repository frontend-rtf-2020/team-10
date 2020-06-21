import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Button, Input } from "antd";
import { Picker } from "emoji-mart";

import "./ChatInput.scss";

const { TextArea } = Input;

const ChatInput = props => {
  const {
    emojiPickerVisible,
    value,
    addEmoji,
    setValue,
    TypeMessage,
    sendMessage,
    toggleEmojiPicker,
  } = props;

  return (
    <Fragment>
      <div className="chat-input">
        <div>
          <div className="chat-input__smile-btn">
            <div className="chat-input__emoji-picker">
              {emojiPickerVisible && (
                <Picker onSelect={emojiTag => addEmoji(emojiTag)} set="apple" />
              )}
            </div>
            <Button
              onClick={toggleEmojiPicker}
              type="link"
              shape="circle"
              icon="smile"
            />
          </div> 
            <TextArea
              onChange={e => setValue(e.target.value)}
              onKeyUp={TypeMessage}
              size="large"
              placeholder="Введите текст сообщения"
              value={value}
              autosize={{ minRows: 1, maxRows: 6 }}
            />
          <div className="chat-input__actions">
            <Button
              onClick={sendMessage}
              type="link"
              shape="circle"
              icon="check-circle"
            />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

ChatInput.propTypes = {
  className: PropTypes.string
};

export default ChatInput;
