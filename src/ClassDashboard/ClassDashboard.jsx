import axios from "axios";
import queryString from "query-string";
import { useContext, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import StudentNavbar from "../StudentDashboard/StudentNavbar";
import { Alert, Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Paper, Snackbar, Tab, Tabs, TextField, Typography } from "@mui/material";
import { useState } from "react";
import PropTypes from "prop-types";
import TeamCard from "./TeamCard";
import StudentDetail from "./StudentDetail";
import AuthContext from "../AuthContext";
import { Close } from "@mui/icons-material";

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
    const {student, setStudent, teacher, setTeacher} = useContext(AuthContext);
    const [classData, setClassData] = useState({});
    const [tabValue, setTabValue] = useState(0);
    const [teams, setTeams] = useState([]);
    const [studentList, setStudentList] = useState([]);
    const [teamView, setTeamView] = useState(null);
    const [open, setOpen] = useState(false);
    const [teamName, setTeamName] = useState("");
    const [projectName, setProjectName] = useState("");
    const [open1, setOpen1] = useState(false);
    const [severity, setSeverity] = useState("");
    const [msg, setMsg] = useState("");
    const [upd, setUpd] = useState(false);
    const [teamID, setTeamID] = useState("");

    let params = queryString.parse(useLocation().search);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen1(false);
        setSeverity("");
        setMsg("");
    };

    const closeDialog = () => {
        setOpen(false);
        setTeamName("");
        setProjectName("");
      }

    const fetchData = async () => {
        await axios.get(`https://project-management-portal-server.vercel.app/teacher/class?id=${params.id}`)
            .then((res) => {
                setClassData(res.data);

                let tempTeams = classData.teams;
                let teamCards = [];
                tempTeams.forEach(team => {
                    teamCards.push(<TeamCard onClickFunction={() => setTeamView(team)} teamName={team.name} projectName={team.projectName}/>)
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

    const requestToJoin = () => {
        console.log(teamView);
    }

    const createTeam = async () => {
        if (teamName.length === 0 || projectName.length === 0) {
            setOpen1(true);
            setSeverity("error");
            setMsg("Please enter valid team and project names!");
        }
        else {
            await axios.post("https://project-management-portal-server.vercel.app/team", {
                name: teamName,
                projectName: projectName,
                class: params.id,
                manager: student.token._id
            }).then((res) => {
                if (res.status === 200) {
                    setOpen1(true);
                    setSeverity("success");
                    setMsg("Team created successfully!");
                    setUpd(prev => !prev);
                }
                else
                {
                    setOpen1(true);
                    setSeverity("warning");
                    setMsg(res.data);
                }
            }).catch((err) => {
                setOpen1(true);
                setSeverity("error");
                setMsg(err.response.data);
            })
            setOpen(false);
        }
    }

    const viewDetails = () => {
        console.log(teamView);
    }

    useEffect(() => {
        fetchData();
        console.log(student);
    }, []);

    useEffect(() => {
        fetchData();
        console.log(student);
    }, [tabValue]);

    useEffect(() => {
        fetchData();
        console.log(upd);
    }, [upd])

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
                <div style={{display: "flex", flexDirection: "row"}}>
                    <div style={{width: "70%"}}>
                        {teams}
                    </div>
                    <div style={{width: "2%"}}></div>
                    <div style={{width: "1%", borderLeft: "4px solid black", height: "72.3vh"}}></div>
                    <div style={{width: "2%"}}></div>
                    <div style={{width: "25%"}}>
                        {teamView === null?
                        (<div style={{textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", lineHeight: "175%"}}>
                            Click on a team to view details
                            {Object.keys(student).length !== 0 && 
                            <>
                                <br/>
                                (or)
                                <br/>
                                <Button style={{margin: "2%"}} variant="contained" onClick={() => setOpen(true)}>Create your own team</Button>
                            </>
                            }
                        </div>)
                        :
                        (<div style={{display: "flex"}}>
                            <div style={{width: "80%"}}>
                                <br/>
                                <strong>Team Name</strong>: {teamView.name}
                                <br/>
                                <strong>Project Name</strong>: {teamView.projectName}
                                <div style={{textAlign: "center", padding: "10%"}}>
                                    {Object.keys(student).length !== 0?
                                    <Button variant="contained" onClick={requestToJoin}>Request To Join</Button>
                                    :
                                    <Link to={`/team?id=${teamView._id}`}>
                                        <Button variant="contained">Go to Dashboard</Button>
                                    </Link>}
                                </div>
                            </div>
                            <div style={{width: "20%", right: "0"}}>
                                <Button onClick={() => setTeamView(null)}><Close/></Button>
                            </div>
                        </div>)}
                    </div>
                </div>
            </TabPanel>
            <Dialog open={open}>
                <DialogTitle>Create a Team</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Please enter the team name and project name
                    </DialogContentText>
                    <TextField fullWidth style={{marginTop: "3%"}} label="New Team Name" value={teamName} onChange={(e) => setTeamName(e.target.value)}></TextField>
                    <TextField fullWidth style={{marginTop: "3%"}} label="New Project Name" value={projectName} onChange={(e) => setProjectName(e.target.value)}></TextField>
                </DialogContent>
                <DialogActions>
                    <Button color="error" onClick={closeDialog}>Cancel</Button>
                    <Button onClick={createTeam}>Create Team</Button>
                </DialogActions>
            </Dialog>
            <Snackbar open={open1} autoHideDuration={5000} onClose={handleClose}>
                <Alert severity={severity} variant="filled" onClose={handleClose}>{msg}</Alert>
            </Snackbar>
        </div>
    )
}