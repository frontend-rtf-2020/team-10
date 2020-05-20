import React, {useState} from 'react';
import { useHttp } from '../hooks/http.hook'
import { Link } from 'react-router-dom'


export const RegPage = () => {
    const { loading, request } = useHttp()
    const [form, setForm] = useState({
        email: '', login: '', password: ''
    })

    const changeHandler = event => {
        setForm({ ...form, [event.target.name]: event.target.value })
    }

    const registerHandler = async () => {
        try {
            const data = await request('/api/auth/reg', 'POST', {...form})

        } catch (e) {}
    }

        return (
            <div id="background">
            <div id="box">
                <div className="text"> <h1>Регистрация</h1> </div>
                <div className="input_box reg">
                    <div className="field">
                        <input type="email" placeholder="Email" name="email" value={form.email} onChange={changeHandler}/>
                    </div>
                </div>
                <div className="input_box reg">
                    <div className="field">
                        <input type="text" placeholder="Логин" name="login" value={form.login} onChange={changeHandler}/>
                    </div>
                </div>
                <div className="input_box reg">
                    <div className="field">
                        <input type="password" placeholder="Пароль" name="password" value={form.password} onChange={changeHandler}/>
                    </div>
                </div>
                <div id="button_box">            
                    <div id="reg" ><button type="submit" onClick={registerHandler} disabled={loading}>Зарегистрироваться</button></div>
                    <div className="text_box">
                        <div className="text2"><Link to='/auth'>Уже есть аккаунт</Link> </div>
                    </div>
            </div>
            </div>
        </div>
        )
    }