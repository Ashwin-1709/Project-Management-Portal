import { Link } from "react-router-dom";

const { Card, CardContent, Typography } = require("@mui/material");

function ClassCard( {id, clName, clCode} ) {
    let link = "/class?id=" + id;
    return (
        <Link to={link}>
            <Card variant="elevation" style={{minHeight: '250%', backgroundColor: "#eee"}} raised>
                <CardContent style={{backgroundColor: "lightgreen"}}>
                    <Typography style={{fontSize: '150%'}}>{clCode}</Typography>
                    <Typography style={{fontSize: '125%', whiteSpace: "pre"}}>{clName}</Typography>
                </CardContent>
            </Card>
        </Link>
    )
}

export default ClassCard;