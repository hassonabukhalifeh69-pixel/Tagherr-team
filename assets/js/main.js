
"use strict";

/* =================================
   TAGHEER TEAM — Main Interactions
================================= */

// Mobile navigation
const menuButton = document.querySelector("#menuButton");
const navigation = document.querySelector("#navigation");

if (menuButton && navigation) {
  menuButton.addEventListener("click", () => {
    const isOpen = navigation.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", String(isOpen));
  });

  navigation.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navigation.classList.remove("open");
      menuButton.setAttribute("aria-expanded", "false");
    });
  });
}

// Current year
const yearElement = document.querySelector("#year");

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

// GPA Calculator
const courses = [];

const gradeNames = {
  "4": "A+",
  "3.75": "A",
  "3.5": "A-",
  "3.25": "B+",
  "3": "B",
  "2.75": "B-",
  "2.5": "C+",
  "2.25": "C",
  "2": "C-",
  "1.75": "D+",
  "1.5": "D",
  "0": "F"
};

const getElement = (id) => document.getElementById(id);

function renderCourses() {
  const list = getElement("courseList");
  const gpaValue = getElement("gpaValue");
  const creditsValue = getElement("gpaCredits");

  if (!list || !gpaValue || !creditsValue) return;

  list.replaceChildren();

  if (courses.length === 0) {
    const empty = document.createElement("div");
    empty.className = "empty-state";
    empty.textContent = "لم تضف أي مادة بعد.";
    list.appendChild(empty);
  }

  courses.forEach((course, index) => {
    const row = document.createElement("div");
    row.className = "course-row";

    const title = document.createElement("span");
    title.textContent =
      `${course.name} — ${gradeNames[String(course.grade)]} · ${course.hours} ساعات`;

    const remove = document.createElement("button");
    remove.className = "remove-course";
    remove.type = "button";
    remove.textContent = "×";
    remove.setAttribute("aria-label", "حذف المادة");

    remove.addEventListener("click", () => {
      courses.splice(index, 1);
      renderCourses();
    });

    row.append(title, remove);
    list.appendChild(row);
  });

  const totalHours = courses.reduce(
    (sum, course) => sum + course.hours, 0
  );

  const totalPoints = courses.reduce(
    (sum, course) => sum + course.hours * course.grade, 0
  );

  gpaValue.textContent = totalHours
    ? (totalPoints / totalHours).toFixed(2)
    : "0.00";

  creditsValue.textContent = `${totalHours} ساعة معتمدة`;
}

// Add course
const addButton = getElement("addCourse");

if (addButton) {
  addButton.addEventListener("click", () => {
    const nameInput = getElement("courseName");
    const hoursInput = getElement("courseHours");
    const gradeInput = getElement("courseGrade");

    if (!nameInput || !hoursInput || !gradeInput) return;

    const name = nameInput.value.trim() || "مادة جديدة";
    const hours = Number(hoursInput.value);
    const grade = Number(gradeInput.value);

    if (!Number.isInteger(hours) || hours < 1 || hours > 10) {
      hoursInput.focus();
      alert("أدخل عدد ساعات صحيحًا من 1 إلى 10.");
      return;
    }

    courses.push({ name, hours, grade });

    nameInput.value = "";
    renderCourses();
  });
}

// Clear all courses
const clearButton = getElement("clearCourses");

if (clearButton) {
  clearButton.addEventListener("click", () => {
    courses.length = 0;
    renderCourses();
  });
}

// Initial state
renderCourses();
