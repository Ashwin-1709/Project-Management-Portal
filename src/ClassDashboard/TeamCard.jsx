import { Paper, Typography } from "@mui/material";

export default function TeamCard( {teamName, projectName} ) {
    return (
        <Paper variant="elevation" style={{backgroundColor: "#eee", padding: '1% 2%'}}>
            <Typography variant="body1" style={{fontSize: "175%"}}>Name: {teamName}</Typography>
            <Typography variant="body1">Project: {projectName}</Typography>
        </Paper>
    )
}