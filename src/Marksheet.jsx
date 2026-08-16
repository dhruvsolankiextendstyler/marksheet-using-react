import { useState } from 'react';
import { useLocation } from 'react-router-dom';

function Marksheet() {
    const [studentid, setStudentid] = useState('');
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [semester, setSemester] = useState('I');
    const location = useLocation();
    const students = location.state.students;

    const showMarksheet = () => {
        const student = students.find(
            (student) => student.id === Number(studentid)
        );

        setSelectedStudent(student);
    };

    const semesterSubjects = selectedStudent
        ? selectedStudent.subjects.filter(
            (subject) => subject.semester === semester
        )
        : [];

    return (
        <>
            <h1>Marksheet</h1>

            <section>
                <label>Enter Student ID: </label>
                <input
                    type="text"
                    value={studentid}
                    onChange={(e) => setStudentid(e.target.value)}
                /> <br /><br />
                <label>Semester: </label>
                <select
                    value={semester}
                    onChange={(e) => setSemester(e.target.value)}
                >
                    <option value="I">I</option>
                    <option value="II">II</option>
                    <option value="III">III</option>
                    <option value="IV">IV</option>
                    <option value="V">V</option>
                </select>

                <br /><br />
                <br /><br />

                <button onClick={showMarksheet}>Show Marksheet</button>
            </section>

            {selectedStudent ? (
                <section>
                    <h3>Student Details</h3>

                    <p>Name: {selectedStudent.name}</p>
                    <p>Roll No: {selectedStudent.rollno}</p>
                    <p>Program: {selectedStudent.program}</p>

                    <h3>Marksheet</h3>

                    <table border="1">
                        <thead>
                            <tr>
                                <th>Subject</th>
                                <th>Semester</th>
                                <th>ICA Marks</th>
                                <th>Theory ESE Marks</th>
                                <th>Total</th>
                            </tr>
                        </thead>
                        <tbody>

                            {semesterSubjects.map((subject, index) => (
                                <tr key={index}>
                                    <td>{subject.subject}</td>
                                    <td>{subject.semester}</td>
                                    <td>{subject.icaMarks}</td>
                                    <td>{subject.theoryMarks}</td>
                                    <td>
                                        {Number(subject.icaMarks) + Number(subject.theoryMarks)}
                                    </td>
                                </tr>
                            ))}

                            <tr>
                                <td colSpan="4">Semester CGPA</td>
                                <td>
                                    {semesterSubjects.length > 0
                                        ? (
                                            semesterSubjects.reduce(
                                                (sum, subject) =>
                                                    sum + Number(subject.icaMarks) + Number(subject.theoryMarks),
                                                0
                                            ) / semesterSubjects.length / 10
                                        ).toFixed(2)
                                        : 'N/A'}
                                </td>
                            </tr>
                            <tr>
                                <td colSpan="4">Result</td>
                                <td>
                                    {semesterSubjects.every(
                                        (subject) =>
                                            Number(subject.icaMarks) > 16 &&
                                            Number(subject.theoryMarks) > 24
                                    )
                                        ? 'PASS'
                                        : 'FAIL'}
                                </td>
                            </tr>

                        </tbody>
                    </table>
                </section>
            ) : (
                <p>Invalid Student ID</p>
            )}
        </>
    );
}

export default Marksheet;