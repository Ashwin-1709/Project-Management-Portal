import { IconButton, Card, Typography } from "@mui/material";

export default function TeamCard( {teamName, projectName, onClickFunction} ) {
    return (
        <Card variant="elevation" style={{backgroundColor: "#B2DFDB", padding: '1% 2%', marginBottom: "2%"}} onClick={onClickFunction}>
            <Typography variant="body1" style={{fontSize: "175%"}}>Name: {teamName}</Typography>
            <Typography variant="body1">Project: {projectName}</Typography>
        </Card>
    )
}