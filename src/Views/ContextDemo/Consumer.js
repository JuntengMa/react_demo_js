import React from 'react';
import { ToggleConsumer } from './ToggleContext' 

export class Consumer extends React.Component {
  render() {
    return <ToggleConsumer>
      {
        ({ toggle, handleToggle}) =>
          <button onClick={() => handleToggle()}>
            {toggle ? '✔' : '❌'}
          </button>
      }
    </ToggleConsumer>
  }
}