import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import socket from 'core/socket';

import { ChatInput as ChatInputBase } from 'components';

import { messagesActions } from 'redux/actions';

const ChatInput = props => {
  const {
    dialogs: { currentDialogId },
    fetchSendMessage,
    user,
  } = props;

  if (!currentDialogId) {
    return null;
  }

  const [value, setValue] = useState('');
  const [emojiPickerVisible, setShowEmojiPicker] = useState(false);

  const toggleEmojiPicker = () => {
    setShowEmojiPicker(!emojiPickerVisible);
  };

  const handleOutsideClick = (el, e) => {
    if (el && !el.contains(e.target)) {
      setShowEmojiPicker(false);
    }
  };

  const addEmoji = ({ colons }) => {
    setValue((value + ' ' + colons).trim());
  };

  const sendMessage = () => {
    if (value ) {
      fetchSendMessage({
        text: value,
        dialogId: currentDialogId,
      });
      setValue('');
    }
  };

  const handleSendMessage = e => {
    socket.emit('DIALOGS:TYPING', { dialogId: currentDialogId, user });
    if (e.keyCode === 13) {
      sendMessage();
    }
  };

      // eslint-disable-next-line no-loop-func
  useEffect(() => {
    const el = document.querySelector('.chat-input__smile-btn');
    document.addEventListener('click', handleOutsideClick.bind(this, el));
    return () => {
      document.removeEventListener('click', handleOutsideClick.bind(this, el));
    };
  }, []);

  return (
    <ChatInputBase
      value={value}
      setValue={setValue}
      emojiPickerVisible={emojiPickerVisible}
      toggleEmojiPicker={toggleEmojiPicker}
      addEmoji={addEmoji}
      handleSendMessage={handleSendMessage}
      sendMessage={sendMessage}
    />
  );
};

export default connect(
  ({ dialogs, attachments, user }) => ({
    dialogs,
    user: user.data,
  }),
  { ...messagesActions },
)(ChatInput);
