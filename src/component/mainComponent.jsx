import React, { Component } from 'react'
import {Route,Switch,Redirect} from 'react-router-dom'
import ChatConversion from './chatConversion'
export default class MainComponent extends Component {
    state={
        view:0,
    }
  render() {
    return (
 <div>
    <Switch>
        <Route path="/" component={ChatConversion} />
        <Redirect form="/" to="/" />
    </Switch>
 </div>
    )
  }
}
