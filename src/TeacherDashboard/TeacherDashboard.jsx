import { Grid, Typography } from "@mui/material";
import TeacherCard from "./TeacherCard";
import { useContext, useEffect, useReducer, useRef, useState } from "react";
import AuthContext from "../AuthContext";
import Navbar from './TeacherNavbar';
import axios from "axios";

function TeacherDashboard() {
    const [, forceUpdate] = useReducer(x => x + 1, 0);
    const [upd, setUpd] = useState(false);
    const [teacherCards, setTeacherCards] = useState(null);
    const loaded = useRef(false);
    const {student, setStudent, teacher, setTeacher} = useContext(AuthContext);

    const fetchClasses = async () => {
        await axios.post("https://project-management-portal-server.vercel.app/teacher/classes", {
            email: teacher.token.email
        }).then((res) => {
            if (res.status === 200) {
                let courses = res.data.courses;
                let cards = [];
                courses.forEach(course => {
                    cards.push(
                    <Grid item xs={6} md={3}>
                        <TeacherCard id={course._id} clName={course.title} clCode={course.code} />
                    </Grid>)
                });
                setTeacherCards(cards);
            }
        }).catch((err) => {
            console.log(err.response.data);
        })
    }

    useEffect(() => {
        fetchClasses();
        loaded.current = true;
    }, [])

    useEffect(() => {
        fetchClasses();
    }, [upd]);

    if (!loaded) return null;
    return (
        <div style={{margin: '0 auto'}}>
            <Navbar stateChanger={setUpd}/>
            <div className="greeting" style={{textAlign: 'center', marginTop: '3%'}}>
                <Typography variant="h3" style={{color: 'black'}}>Good evening, {teacher.token.name}!</Typography>
            </div>
            <div style={{margin: '0 auto'}}>
                <div className="projects-heading" style={{marginLeft: '5%', marginTop: '2%'}}>
                    <Typography variant="h4" style={{color: 'black'}}>My Courses</Typography>
                </div>
                <Grid container rowSpacing={17} columnSpacing={8} style={{padding: '2% 5%', marginBottom: '15%'}}>
                    {teacherCards}
                </Grid>
                <div className='text-center p-3' style={{ backgroundColor: 'whitesmoke', bottom: 0, marginTop: '5%' }}>
                  © 2023 Copyright Teamify
                </div>
            </div>
        </div>
    )
}

export default TeacherDashboard;