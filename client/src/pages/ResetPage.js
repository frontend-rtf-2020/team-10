import React from 'react';

export const ResetPage = () => {
    return (
<div id="background">
        <div id="box">
            <div className="text"> <h1>Сброс пароля</h1> </div>
            <div className="text"> <h2>Введите почту, которую указывали при регистрации. На указанную почту придёт письмо с дальнейшими действиями</h2> </div>
            <div className="input_box reset">
                <div className="text1"><h2>Email</h2></div>
                <div className="field">
                    <input type="email" placeholder="Email"/>
                </div>
            </div>
            <div id="button_box">            
                <div id="reset"><button type="submit">Сбросить пароль</button></div>
        </div>
        </div>
    </div>
    )
}