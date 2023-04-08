import logo from './logo.svg';
import './App.css';
import { Route, BrowserRouter as Router, Redirect, Switch } from 'react-router-dom';
import Login from './Login.jsx';
import Register from './Register.jsx';
import Landing from './Landing/Landing';
import StudentDashboard from './StudentDashboard/StudentDashboard';
import TeacherDashboard from './TeacherDashboard/TeacherDashboard';
import ClassDashboard from './ClassDashboard/ClassDashboard';
import AuthContext from './AuthContext';
import { useReducer, useContext, useEffect } from 'react';
import TeamDashboard from './TeamDashboard/TeamDashboard';

const App = () => {
  const {student, setStudent, teacher, setTeacher} = useContext(AuthContext);
  const [, forceUpdate] = useReducer(x => x + 1, 0);
  useEffect(() => {
    console.log("useEffect");
    if (localStorage.getItem('student') && JSON.parse(localStorage.getItem('student')).token !== undefined){
      setStudent(JSON.parse(localStorage.getItem('student')));
    }
    else if(localStorage.getItem('teacher') && JSON.parse(localStorage.getItem('teacher')).token !== undefined){
      setTeacher(JSON.parse(localStorage.getItem('teacher')));
    }
  }, []);

  return (
    <Router>
      <Switch>
        <Route path="/" exact>
        {student && !!student.token ? (<Redirect to="/StudentDashboard"/>) : (teacher && !!teacher.token ? <Redirect to="/TeacherDashboard"/> : <Landing/>)}
        </Route>
        <Route path="/login" exact>
          {student && !!student.token ? (<Redirect to="/StudentDashboard"/>) : (teacher && !!teacher.token ? <Redirect to="/TeacherDashboard"/> : <Login/>)}
        </Route>
        <Route path="/register" exact>
          {student && !!student.token ? (<Redirect to="/StudentDashboard"/>) : (teacher && !!teacher.token ? <Redirect to="/TeacherDashboard"/> : <Register/>)}
        </Route>
        <Route path="/StudentDashboard" exact>
          {student && !!student.token ? <StudentDashboard/> : <Redirect to={"/login"}/>}
        </Route>
        <Route path="/TeacherDashboard" exact>
          {teacher && !!teacher.token ? <TeacherDashboard/> : <Redirect to={"/login"}/>}
        </Route>
        <Route path="/class"><ClassDashboard/></Route>
        <Route path="/team"><TeamDashboard/></Route>
      </Switch>
    </Router>
    
  );
}

export default App;