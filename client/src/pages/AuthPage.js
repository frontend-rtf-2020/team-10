import React, {useState, useContext} from 'react';
import { useHttp } from '../hooks/http.hook'
import { Link } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext';

export const AuthPage = () => {
    const auth = useContext(AuthContext)
    const { loading, request } = useHttp()
    const [form, setForm] = useState({
        login: '', password: ''
    })

    const changeHandler = event => {
        setForm({ ...form, [event.target.name]: event.target.value })
    }

    const loginHandler = async () => {
        try {
            const data = await request('/api/auth/login', 'POST', {...form})
            auth.login(data.token, data.userId)
        } catch (e) {}
    }

    return (
    <div>
    <div id="background">
        <div id="box">
                <div className="text"> <h1>Вход в чат</h1></div>
                <div className="input_box log">
                    <div className="field">
                        <input type="text" placeholder="Логин" id="login" name="login" onChange={changeHandler}/>
                    </div>
                </div>
                <div className="input_box log">
                    <div className="field">
                        <input type="password" placeholder="Пароль" id="password" name="password"  onChange={changeHandler}/>
                    </div>
                </div>
                <div id="button_box">            
                    <div id="login"><button type="submit" onClick={loginHandler} disabled={loading}>Войти</button></div>
                    <div className="text_box">
                        <div className="text2"><Link to='/reset'>Забыли пароль</Link> </div>
                        <div className="text2"><Link to='/reg'>Зарегистрироваться</Link></div>
                    </div>
                </div>
        </div>

    </div>    </div>
    )
}