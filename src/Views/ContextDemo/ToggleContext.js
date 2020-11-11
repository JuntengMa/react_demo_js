import React, { createContext } from 'react'

let defaultValue = {
  toggle: true,
  handleToggle: () => { }
}
// 1. 使用 createContext 创建上下文
const ToggleContext = createContext(defaultValue)

// 2. 创建 Provider
export class ToggleProvider extends React.Component {
  
  state = {
    toggle: true,
    handleToggle: ()=>this.handleToggle()
  }

  handleToggle = () => {
    this.setState({
      toggle: !this.state.toggle
    })
  }
 
  render() {
    return (
      <ToggleContext.Provider value={this.state}>
        {this.props.children}
      </ToggleContext.Provider>
    )
  }
}

// 3. 创建 Consumer
export const ToggleConsumer = ToggleContext.Consumer