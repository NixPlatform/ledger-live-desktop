import React, { PureComponent } from 'react'
import styled from 'styled-components'

const Indicator = styled.div`
  opacity: ${p => (p.busy ? 0.1 : 0)};
  width: 6px;
  height: 6px;
  border-radius: 3px;
  background-color: black;
  position: fixed;
  top: 4px;
  right: 4px;
  z-index: 999;
`

// NB this is done like this to be extremely performant. we don't want redux for this..
let globalBusy = false
const instances = []
export const onSetDeviceBusy = busy => {
  globalBusy = busy
  instances.forEach(i => i.forceUpdate())
}

class DeviceBusyIndicator extends PureComponent<{}> {
  componentDidMount() {
    instances.push(this)
  }
  componentWillUnmount() {
    const i = instances.indexOf(this)
    instances.splice(i, 1)
  }
  render() {
    return <Indicator busy={globalBusy} />
  }
}

export default DeviceBusyIndicator
