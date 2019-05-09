import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const StyledIconButton = (props) => {
  const Button = (
    <IconButton onClick={() => this.prepareTask(row)} style={{ padding: 8, ...props.style }} onClick={props.onClick}>
      <FontAwesomeIcon icon={props.icon} style={{ width: 20, height: 20 }} />
    </IconButton>
  )

  return props.tooltip ? <TooltipWrapper tooltip={props.tooltip}>{Button}</TooltipWrapper> : Button
}

const TooltipWrapper = (props) => (
  <Tooltip title={props.tooltip} placement="top">
    {props.children}
  </Tooltip>
)

export default StyledIconButton
