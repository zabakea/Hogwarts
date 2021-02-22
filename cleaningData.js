"use strict";
window.addEventListener("DOMContentLoaded", init);

const allStudents = [];

function init() {
  loadJSON();
}

function loadJSON() {
  fetch("https://petlatkea.dk/2021/hogwarts/students.json")
    .then((response) => response.json())
    .then((studentList) => {
      // when loaded, prepare objects
      prepareObjects(studentList);
    });
}

function prepareObjects(studentList) {
  studentList.forEach((oneStudent) => {
    // console.log(oneStudent);

    // define object prototype
    const Student = {
      firstName: "",
      lastName: "",
      middleName: null,
      nickName: null,
      image: null,
      house: "",
      gender: "",
    };

    const name = oneStudent.fullname.trim().replaceAll("-", " ");
    let firstname;
    if (name.includes(" ")) {
      firstname = name.substring(0, name.indexOf(" "));
    } else {
      firstname = name;
    }
    //console.log(firstname);

    let middlename = "";
    let nickname = "";
    let lastname = name.substring(name.lastIndexOf(" ") + 1);
    let middle = name.substring(name.indexOf(" ") + 1, name.lastIndexOf(" "));
    let hOUSE = oneStudent.house.trim();

    if (lastname == firstname) {
      lastname = "";
    }

    if (middle.includes('"')) {
      nickname = middle;
    } else {
      middlename = name.substring(name.indexOf(" ") + 1, name.lastIndexOf(" "));
    }

    const middleName = capitalization(middlename);
    const firstName = capitalization(firstname);
    const nickName = capitalization(nickname);
    const lastName = capitalization(lastname);
    const house = capitalization(hOUSE);
    const gender = oneStudent.gender;
    const image =
      lastName.toLowerCase(0) +
      "_" +
      firstName.charAt(0).toLowerCase() +
      ".png";

    function capitalization(data) {
      return data.charAt(0).toUpperCase() + data.slice(1).toLowerCase();
    }
    const student = Object.create(Student);
    student.firstName = firstName;
    student.middleName = middleName;
    student.lastName = lastName;
    student.nickName = nickName;
    student.house = house;
    student.gender = gender;
    student.image = image;

    console.table(student);
  });
}

// firstName: "",
// lastName: "",
// middleName: null,
// nickName: null,
// image: null,
// house: "",
// gender: "",
