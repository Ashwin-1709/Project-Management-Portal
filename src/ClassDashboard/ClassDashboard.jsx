import axios from "axios";
import queryString from "query-string";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import StudentNavbar from "../StudentDashboard/StudentNavbar";
import { Box, Paper, Tab, Tabs, TextField, Typography } from "@mui/material";
import { useState } from "react";
import PropTypes from "prop-types";
import TeamCard from "./TeamCard";
import StudentDetail from "./StudentDetail";

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        "aria-controls": `simple-tabpanel-${index}`,
    };
}


export default function ClassDashboard() {
    const [classData, setClassData] = useState({});
    const [tabValue, setTabValue] = useState(0);
    const [teams, setTeams] = useState([]);
    const [studentList, setStudentList] = useState([]);

    let params = queryString.parse(useLocation().search);

    const fetchData = async () => {
        await axios.get(`https://project-management-portal-server.vercel.app/teacher/class?id=${params.id}`)
            .then((res) => {
                setClassData(res.data);

                let tempTeams = classData.teams;
                let teamCards = [];
                tempTeams.forEach(team => {
                    teamCards.push(<TeamCard teamName={team.name} projectName={team.projectName}/>)
                });
                setTeams(teamCards);

                let students = classData.students;
                let studentCards = [];
                students.forEach(stud => {
                    studentCards.push(
                        <StudentDetail studentName={stud.name}/>
                    );
                });
        setStudentList(studentCards);
            }).catch((err) => {
                console.log(err);
            })
    }

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        fetchData();
    }, [tabValue]);

    return (
        <div>
            <StudentNavbar />
            <Tabs value={tabValue} variant="fullWidth" style={{marginTop: "-1.8%", borderBottom: "1px solid blue"}} onChange={(e, val) => setTabValue(val)}>
                <Tab label="Dashboard" {...a11yProps(0)} />
                <Tab label="Students" {...a11yProps(1)} />
                <Tab label="Teams" {...a11yProps(2)} />
            </Tabs>
            <TabPanel value={tabValue} index={0}>
                <div>
                    <Paper style={{ padding: "5% 2%", backgroundColor: "goldenrod" }}>
                        <Typography variant="h3">{classData.code}</Typography>
                        <Typography variant="h4">{classData.title}</Typography>
                    </Paper>
                    <TextField style={{ marginTop: "2%" }} fullWidth placeholder="Post an announcement"></TextField>
                </div>
            </TabPanel>
            <TabPanel value={tabValue} index={1}>
                {studentList}
            </TabPanel>
            <TabPanel value={tabValue} index={2}>
                {teams}
            </TabPanel>
        </div>
    )
}