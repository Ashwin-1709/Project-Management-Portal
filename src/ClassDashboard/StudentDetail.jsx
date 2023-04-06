import { ExpandMore } from "@mui/icons-material";
import { Accordion, AccordionSummary } from "@mui/material";

export default function StudentDetail( {studentName} ) {
    return (
        <Accordion style={{backgroundColor: "#eee"}}>
            <AccordionSummary expandIcon={<ExpandMore/>}>
                {studentName}
            </AccordionSummary>
        </Accordion>
    )
}