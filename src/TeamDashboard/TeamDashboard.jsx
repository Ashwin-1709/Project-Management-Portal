import { Alert, Button, Dialog, DialogActions, DialogContent, DialogContentText, Grid, Snackbar, TextField, Typography } from "@mui/material";
import TaskCard from "./TaskCard";
import Navbar from "../StudentDashboard/StudentNavbar";
import { useContext } from "react";
import AuthContext from "../AuthContext";
import { MDBInput } from 'mdb-react-ui-kit';
import Announcement from "./Announcement";
import { useLocation } from "react-router-dom";
import queryString from "query-string";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";

export default function TeamDashboard() {
    const {student, setStudent, teacher, setTeacher} = useContext(AuthContext);
    const [teamName, setTeamName] = useState("");
    const [projectName, setProjectName] = useState("");
    const [description, setDescription] = useState("");
    const [deadline, setDeadline] = useState("");
    const [taskCards, setTaskCards] = useState([]);
    const [open, setOpen] = useState(false);
    const [open1, setOpen1] = useState(false);
    const [severity, setSeverity] = useState("");
    const [msg, setMsg] = useState("");
    const [upd, setUpd] = useState(false);

    let params = queryString.parse(useLocation().search);

    const closeDialog = () => {
        setOpen(false);
        setDescription("");
        setDeadline("");
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setOpen1(false);
      };

    const fetchData = async () => {
        await axios.get(`https://project-management-portal-server.vercel.app/team?id=${params.id}`)
        .then((res) => {
            console.log(res.data);
            setTeamName(res.data.name);
            setProjectName(res.data.projectName);

            let tasks = res.data.tasks;
            let tempTaskCards = [];
            tasks.forEach(task => {
                tempTaskCards.push(<TaskCard taskTitle={task.description} taskStatus={task.completionStatus} taskDeadline={task.deadline !== null?task.deadline: "---"}/>)
            });
            setTaskCards(tempTaskCards);
        })
        .catch((err) => {
            console.log(err);
        })
    }

    const createTask = async () => {
        if (description.length === 0) {
            setOpen1(true);
            setSeverity("error");
            setMsg("Please enter description!");
            setUpd(prev => !prev);
        }
        else {
            await axios.post("https://project-management-portal-server.vercel.app/task/create", {
                description: description,
                deadline: deadline,
                team: params.id,
                member: student.token._id
            }).then((res) => {
                if (res.status === 200) {
                    setOpen1(true);
                    setSeverity("success");
                    setMsg("Created task successfully!");

                }
                else {
                    setOpen1(true);
                    setSeverity("warning");
                    setMsg(res.data);
                }
            }).catch((err) => {
                setOpen1(true);
                setSeverity("error");
                setMsg(err.response.data);
            })
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    // useEffect(() => {
    //     fetchData();
    // }, [upd]);

    return (
        <div>
            <Navbar/>
            <div style={{display: "flex"}}>
                <div style={{width: "87%", paddingLeft: "4%"}}>
                    <Typography variant="h5">Team Name: {teamName}</Typography>
                    <Typography variant="h5">Project Name: {projectName}</Typography>
                </div>
                <div style={{width: "13%", paddingRight: "3%"}}>
                    {Object.keys(student).length > 0 && <Button variant="contained" onClick={() => setOpen(true)}>Create Task</Button>}
                </div>
            </div>
            <Announcement/>
            {taskCards}
            <Dialog open={open}>
                <DialogContent>
                    <DialogContentText>Create Task</DialogContentText>
                    <TextField value={description} onChange={(e) => setDescription(e.target.value)} label="Description" />
                    <TextField value={deadline} onChange={(e) => setDeadline(e.target.value)} label="Deadline" />
                </DialogContent>
                <DialogActions>
                    <Button color="error" onClick={closeDialog}>Cancel</Button>
                    <Button onClick={createTask}>Create Task</Button>
                </DialogActions>
            </Dialog>
            <Snackbar open={open1} autoHideDuration={5000} onClose={handleClose}>
                <Alert open={open1} variant="filled" severity={severity} onClose={handleClose}>{msg}</Alert>
            </Snackbar>
        </div>
    )
}