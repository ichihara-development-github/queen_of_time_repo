import { CircularProgress } from "@mui/material"

const circleStyle = {
    position: 'absolute',
    height: 80,
    width: 80,
    top:  "calc(50% - 40px)",
    left: "calc(50% - 40px)",
    color: "gray"
}

const PageLoadingCircle = () =>(
    <CircularProgress
        style={circleStyle}
        color="inherit"
    />
)

export { PageLoadingCircle }