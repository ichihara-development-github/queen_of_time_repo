import { Step, StepLabel, Stepper, Typography } from "@material-ui/core"

import SendIcon from '@mui/icons-material/Send';
import { Stack } from "@mui/material";

export const DefaultSteps = ({
    steps,
    state
}) =>{



return (
<Stepper activeStep={state} alternativeLabel>
{steps.map((label) => (
  <Step key={label}>
    <StepLabel>
        {label}
    </StepLabel>
  </Step>
))}
</Stepper>
)
}