import React from 'react';

export const ChatPage  = () => {
    return (
<div id="chat-container" >
    <div id="search-container">
        <input type="text" placeholder="Поиск"/>
    </div>
    <div id="conversation-list">
        <div className="conversation">
           <div className="image"><img src="" alt="Люк Скайуокер"/></div> 
            <div className="title-text">Люк Скайуокер</div>
        </div>
        <div className="conversation">
            <div className="image"><img src="" alt="Мастер Йода"/></div>
            <div className="title-text">Мастер Йода</div>
        </div>
    </div>

    <div id="chat-title">
<div className="imageForhadder"><img src="" alt="Люк Скайуокер" />
        <span className="titleName">Люк Скайуокер</span> 
    </div>
</div>
    <div id="chat-message-list">
        <div className="message-row own">
            <div className="message-text">Luck I'm your father</div>
            <div className="message-time own">15:15</div>
        </div>
        <div className="message-row person">
            <div className="message-text">Oh no</div>
            <div className="message-time">15:20</div>
        </div>
    </div>
    <div id="chat-form">
        <div id="form">
        <input type="text" placeholder="Ваше сообщение" class="text-form"/>
    <div id="passlogo">
        <input type="image" src="" class="button" width="50px"/> 
    </div>
    </div>
    </div>
</div>
    )
}