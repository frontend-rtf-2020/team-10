import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom'
import { ChatPage }  from './pages/ChatPage'
import { AuthPage } from './pages/AuthPage'
import { RegPage } from './pages/RegPage'
import { ResetPage } from './pages/ResetPage'


export const useRoutes = isAuthenticated => {
    if(isAuthenticated) {
        return (
            <Switch>
            <Route path="/" exact>
              <ChatPage/>  
            </Route>
            <Redirect to="/"/>
            </Switch>
        )
    }

    return (
        <Switch>
            <Route path="/reg" exact>
              <RegPage></RegPage>  
            </Route>
            <Route path="/reset" exact>
              <ResetPage></ResetPage>  
            </Route>
            <Route path="/auth" exact>
              <AuthPage></AuthPage>  
            </Route>
            <Redirect to="/auth"/>
        </Switch>
    )
}