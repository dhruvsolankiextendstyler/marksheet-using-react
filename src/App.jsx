import { useState, useEffect } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom';
import Marksheet from './Marksheet';

function App() {
  const navigate = useNavigate();
  const [studentid, setStudentid] = useState('');
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [subject, setSubject] = useState('');
  const [semester, setSemester] = useState('I');
  const [icaMarks, setIcaMarks] = useState('');
  const [theoryMarks, setTheoryMarks] = useState('');
  const [students, setStudents] = useState([
    {
      id: 101,
      name: 'dhruv',
      rollno: 101,
      program: 'BSc. CS',
      subjects: []
    },
    {
      id: 102,
      name: 'vivek',
      rollno: 102,
      program: 'BSc. CS',
      subjects: []
    },
    {
      id: 103,
      name: 'parth',
      rollno: 103,
      program: 'BSc. CS',
      subjects: []
    }
  ]);

  // converting the entered string ID to Number and searching if it is there in list
  const confirmStudent = () => {
    const student = students.find(
      (student) => student.id === Number(studentid)
    );

    setSelectedStudent(student);
  }

  const addSubject = () => {
    if (!selectedStudent) {
      return;
    }
    const newSubject = {
      subject: subject,
      semester: semester,
      icaMarks: icaMarks,
      theoryMarks: theoryMarks
    };

    console.log("New subject:", newSubject);

    setStudents(
      students.map((student) => {
        if (student.id === selectedStudent.id) {
          return {
            ...student,
            subjects: [...student.subjects, newSubject]
          };
        }
        return student;
      })
    );
  }


  useEffect(() => {
    console.log(students);
  }, [students]);
  return (

    <Routes>
      <Route path="/"
        element={
          <>
            <h1>Marksheet Display</h1>
            <section>
              <label>Enter student ID: </label> <input type="text" name="studentid" value={studentid} onChange={(e) => setStudentid(e.target.value)} /> <br /><br />
              <button onClick={confirmStudent}>Confirm Student Details</button>
            </section>
            {selectedStudent ? (
              <section>
                <h3>Student Details</h3>
                <p>Name: {selectedStudent.name}</p>
                <p>Roll No: {selectedStudent.rollno}</p>
                <p>Program: {selectedStudent.program}</p>
              </section>
            ) : (
              <p>Invalid Student ID</p>
            )}
            ---------------------------------------------------------------
            <section>
              <h3>Enter Marks</h3>
              <label>Subject: </label>
              <input type="text" name="subject" value={subject} onChange={(e) => setSubject(e.target.value)} /> <br />
              <label>Semester: </label>
              <select name="semester" value={semester} onChange={(e) => setSemester(e.target.value)}>
                <option value="I">I</option>
                <option value="II">II</option>
                <option value="III">III</option>
                <option value="IV">IV</option>
                <option value="V">V</option>
              </select><br />
              <label>ICA Marks: </label>
              <input type="number" name="icamarks" value={icaMarks} onChange={(e) => setIcaMarks(e.target.value)} /><br />
              <label>Theory ESE marks: </label>
              <input type="number" name="thoery" value={theoryMarks} onChange={(e) => setTheoryMarks(e.target.value)} /><br /><br />
              <button onClick={addSubject}>Add Subject</button>   <button onClick={() => navigate('/marksheet', { state: { students: students } })}>
                Go to Marksheet
              </button>
            </section>
          </>
        }
      />

      <Route
        path="/marksheet"
        element={<Marksheet />}
      />
    </Routes>
  )
}

export default App
