import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';

const StyledIconButton = (props) => {
  const Button = (
    <IconButton style={{ padding: 5, ...props.style }} onClick={props.onClick}>
      {props.icon}
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
