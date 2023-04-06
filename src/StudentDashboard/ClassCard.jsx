import { Link } from "react-router-dom";

const { Card, CardContent, Typography } = require("@mui/material");

function ClassCard( {id, clName, clCode} ) {
    let link = "/class?id=" + id;
    return (
        <Link to={link}>
            <Card variant="elevation" style={{height: '175%', backgroundColor: "#5ad1b5"}} raised>
                <CardContent>
                    <Typography style={{fontSize: '150%', color: 'black'}}>{clCode}</Typography>
                    <Typography style={{fontSize: '125%', color: 'black'}}>{clName}</Typography>
                </CardContent>
            </Card>
        </Link>
    )
}

export default ClassCard;