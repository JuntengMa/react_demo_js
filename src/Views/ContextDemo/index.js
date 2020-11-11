import React, { Component } from 'react';
import { Toolbar } from './Toolbar';


import { ToggleProvider, ToggleConsumer} from './ToggleContext' 

export class ContextDemo extends React.Component {
  render() {
    return (
      <ToggleProvider>
        <Toolbar />
      </ToggleProvider>
      
    )
  }
}