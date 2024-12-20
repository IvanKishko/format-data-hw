const studentForm = document.getElementById("student-form");
const studentTableBody = document.getElementById("student-table-body");
const editModal = document.getElementById("edit-modal");
const editForm = document.getElementById("edit-form");
const closeModalButton = document.querySelector(".close-button");
const studentInfo = document.querySelector(".student-info");
// const studentInfoTable = document.querySelector(".student-info-table");

let students = [];

function addToTable() {
  studentTableBody.innerHTML = "";
  students.forEach((student, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
                    <td>${student.firstName}</td>
                    <td>${student.lastName}</td>
                    <td>${student.age}</td>
                    <td>${student.course}</td>
                    <td>${student.faculty}</td>
                    <td>${student.subjects.join(", ")}</td>
                    <td>
                        <button onclick="editStudent(${index})">Edit</button>
                        <button onclick="deleteStudent(${index})">Delete</button>
                    </td>
                `;
    studentTableBody.appendChild(row);
  });
}

studentForm.addEventListener("submit", (event) => {
  event.preventDefault();
  studentInfo.style.display = "inline";
  const formData = new FormData(studentForm);
  const newStudent = {
    firstName: formData.get("first-name"),
    lastName: formData.get("last-name"),
    age: formData.get("age"),
    course: formData.get("course"),
    faculty: formData.get("faculty"),
    subjects: formData
      .get("subjects")
      .split(",")
      .map((subject) => subject.trim()),
  };

  students.push(newStudent);
  addToTable();
  studentForm.reset();
});

function deleteStudent(index) {
  students.splice(index, 1);
  addToTable();
  //   if (studentInfoTable.length === 0) {
  //     studentInfo.display = "none";
  //   } else {
  //     section.style.display = "block";
  //   }
}

function editStudent(index) {
  editingStudentIndex = index;
  const student = students[index];
  editForm["first-name"].value = student.firstName;
  editForm["last-name"].value = student.lastName;
  editForm["age"].value = student.age;
  editForm["course"].value = student.course;
  editForm["faculty"].value = student.faculty;
  editForm["subjects"].value = student.subjects.join(", ");
  editModal.style.display = "block";
}

editForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(editForm);
  students[editingStudentIndex] = {
    firstName: formData.get("first-name"),
    lastName: formData.get("last-name"),
    age: formData.get("age"),
    course: formData.get("course"),
    faculty: formData.get("faculty"),
    subjects: formData
      .get("subjects")
      .split(",")
      .map((subject) => subject.trim()),
  };
  addToTable();
  editModal.style.display = "none";
});

closeModalButton.addEventListener("click", () => {
  editModal.style.display = "none";
});
