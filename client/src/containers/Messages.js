import React, { useEffect, useState, useRef } from 'react';
import { connect } from 'react-redux';
import { Empty } from 'antd';
import find from 'lodash/find';

import { messagesActions } from 'redux/actions';
import socket from 'core/socket';

import { Messages as BaseMessages } from 'components';

const Dialogs = ({
  currentDialog,
  fetchMessages,
  addMessage,
  items,
  user,
  isLoading,
  removeMessageById,
}) => {
  if (!currentDialog) {
    return <Empty description="Откройте диалог" />;
  }

  const [previewImage, setPreviewImage] = useState(null);
  const [blockHeight, setBlockHeight] = useState(135);

  const messagesRef = useRef(null);

  const onNewMessage = data => {
    addMessage(data);
  };

  useEffect(() => {
    if (currentDialog) {
      fetchMessages(currentDialog._id);
    }

    socket.on('SERVER:NEW_MESSAGE', onNewMessage);

    return () => socket.removeListener('SERVER:NEW_MESSAGE', onNewMessage);
  }, [currentDialog]);

  useEffect(() => {
    messagesRef.current.scrollTo(0, 999999);
  }, [items]);

  return (
    <BaseMessages
      user={user}
      blockRef={messagesRef}
      items={items}
      isLoading={isLoading && !user}
      onRemoveMessage={removeMessageById}
      setPreviewImage={setPreviewImage}
      previewImage={previewImage}
      blockHeight={blockHeight}
      partner={
        user._id !== currentDialog.partner._id ? currentDialog.author : currentDialog.partner
      }
    />
  );
};

export default connect(
  ({ dialogs, messages, user}) => ({
    currentDialog: find(dialogs.items, { _id: dialogs.currentDialogId }),
    items: messages.items,
    isLoading: messages.isLoading,
    user: user.data,
  }),
  messagesActions,
)(Dialogs);
