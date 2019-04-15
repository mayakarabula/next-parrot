import React from 'react'
import StyledIconButton from './StyledIconButton'
import CopyIcon from '@material-ui/icons/FileCopy'
import { CopyToClipboard } from 'react-copy-to-clipboard';

class LabelClipboard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      tooltip: 'Copy to clipboard',
      tooltipIconShow: false
    }
  }

  copyToClipboard = () => {
    this.setState({ tooltip: 'Copied to clipboard!' })
  }

  hideTooltipIcon = () => {
    this.setState({
      tooltipIconShow: false
    })
  }

  showTooltipIcon = () => {
    this.setState({
      tooltipIconShow: true,
      tooltip: 'Copy to clipboard',
    })
  }

  render() {
    return (
      <span
        onMouseOver={this.showTooltipIcon}
        onMouseLeave={this.hideTooltipIcon}
      >
        <label>{this.props.text}</label>
        {
          <StyledIconButton
            style={{
              visibility: this.state.tooltipIconShow ? 'visible' : 'hidden'
            }}
            onClick={this.copyToClipboard}
            icon={<CopyIcon style={{ fontSize: '14px', marginLeft: 3 }} />}
            tooltip={this.state.tooltip}
          />
        }
      </span>
    )
  }
}

export default LabelClipboard