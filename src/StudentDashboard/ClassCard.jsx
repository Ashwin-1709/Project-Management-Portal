const { Card, CardContent, Typography } = require("@mui/material");

function ClassCard( {clName, instructorName} ) {
    return (
        <Card variant="elevation" style={{height: '180%', backgroundColor: "#5ad1b5"}}>
            <CardContent>
                <Typography style={{fontSize: '150%'}}>{clName}</Typography>
                <Typography style={{fontSize: '125%'}}>{instructorName}</Typography>
            </CardContent>
        </Card>
    )
}

export default ClassCard;