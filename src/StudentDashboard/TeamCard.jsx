import { Card, CardContent, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function TeamCard( {id, teamName, projectName} ) {
    let link = "/team?id=" + id;
    return (
        <Link href={link}>
            <Card variant="elevation" style={{minHeight: "250%", backgroundColor: "#eee"}}>
                <CardContent style={{backgroundColor: "lightblue"}}>
                    <Typography variant="h4" style={{fontSize: "150%"}}>{teamName}</Typography>
                    <Typography variant="h5" style={{fontSize: "125%"}}>{projectName}</Typography>
                </CardContent>
            </Card>
        </Link>
    )
}