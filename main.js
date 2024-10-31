"use strict";
const addEducationButton = document.getElementById("addEducation");
const addSkillButton = document.getElementById("addSkill");
const addExperienceButton = document.getElementById("addExperience");
const submitButton = document.getElementById("submit");
const uploadPhotoButton = document.getElementById("uploadPhoto");
const resumeForm = document.getElementById("resumeForm");
let uploadedImageSrc = "";
addEducationButton.addEventListener("click", addMoreEducation);
addSkillButton.addEventListener("click", addMoreSkills);
addExperienceButton.addEventListener("click", addMoreExperience);
submitButton.addEventListener("click", submitResume);
uploadPhotoButton.addEventListener("click", uploadPhoto);
function addMoreEducation(event) {
    event.preventDefault();
    const educationList = document.getElementById("educationList");
    const newEducation = document.createElement("li");
    newEducation.innerHTML = `<input type="text" name="education" size="50" placeholder="Education Details">`;
    educationList === null || educationList === void 0 ? void 0 : educationList.appendChild(newEducation);
}
function addMoreSkills(event) {
    event.preventDefault();
    const skillsList = document.getElementById("skillsList");
    const newSkill = document.createElement("li");
    newSkill.innerHTML = `<input type="text" name="skills" size="20" placeholder="Skill">`;
    skillsList === null || skillsList === void 0 ? void 0 : skillsList.appendChild(newSkill);
}
function addMoreExperience(event) {
    event.preventDefault();
    const experienceList = document.getElementById("experienceList");
    const newExperience = document.createElement("li");
    newExperience.innerHTML = `<input type="text" name="experience" size="50" placeholder="Work Experience">`;
    experienceList === null || experienceList === void 0 ? void 0 : experienceList.appendChild(newExperience);
}
function uploadPhoto(event) {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.addEventListener("change", () => {
        var _a;
        const file = (_a = input.files) === null || _a === void 0 ? void 0 : _a[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                var _a, _b;
                const imgElement = uploadPhotoButton.querySelector("img");
                imgElement.src = (_a = e.target) === null || _a === void 0 ? void 0 : _a.result;
                uploadedImageSrc = (_b = e.target) === null || _b === void 0 ? void 0 : _b.result;
            };
            reader.readAsDataURL(file);
        }
    });
    input.click();
}
function submitResume(event) {
    event.preventDefault();
    const formData = new FormData(resumeForm);
    const email = formData.get("email");
    const resumeData = {
        firstName: formData.get("FirstName"),
        lastName: formData.get("LastName"),
        about: formData.get("about"),
        email: email,
        contact: formData.get("Contact"),
        education: formData.getAll("education"),
        skills: formData.getAll("skills"),
        experience: formData.getAll("experience"),
    };
    // POP alert
    if (!resumeData.firstName ||
        !resumeData.lastName ||
        !resumeData.email ||
        !resumeData.contact) {
        alert("Please fill out all the required personal details.");
        return;
    }
    // Validate email
    if (!validateEmail(email)) {
        alert("Please enter a valid email address.");
        return;
    }
    const educationList = document.getElementById("educationList");
    if (educationList.children.length === 0 ||
        resumeData.education.some((e) => e.trim() === "")) {
        alert("Please add at least one valid education detail.");
        return;
    }
    const skillsList = document.getElementById("skillsList");
    if (skillsList.children.length === 0 ||
        resumeData.skills.some((s) => s.trim() === "")) {
        alert("Please add at least one valid skill.");
        return;
    }
    const experienceList = document.getElementById("experienceList");
    if (experienceList.children.length === 0 ||
        resumeData.experience.some((exp) => exp.trim() === "")) {
        alert("Please add at least one valid work experience.");
        return;
    }
    // Envalidate email ka Liya
    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    // Generate the URL based on username (firstName and lastName)
    const username = `${resumeData.firstName} ${resumeData.lastName}`;
    const resumeURL = `${window.location.origin}/${username}/resume`;
    const newWindow = window.open();
    const resumeHTML = `
        <html>
        <head>
            <title>${resumeData.firstName} ${resumeData.lastName} - Resume</title>
            <link rel="stylesheet" href="gen-style.css">
            <script src="https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.9.2/html2pdf.bundle.min.js"></script>
        </head>
        <body>
            <h1 class="fmrb">4<sup>th</sup> Milestone Dynamic Interactive Resume Builder Editable</h1>
    <div class="container" id="container">
        <!-- Left section -->
        <div class="left">
            <div class="header">
                <div class="img-profile">
                    <img src="${uploadedImageSrc}" alt="Cv" width="150px" height="150px">
                </div>
                <div class="info">
                    <h1>${resumeData.firstName} ${resumeData.lastName}</h1>
                </div>
            </div>
            <hr>
            <div>
                <div class="about">
                    <section id="personalSection">
                        <h2>About Me</h2>
                        <button class="editButton" onclick="toggleEditMode('personalSection')">Edit</button>
                        <div contenteditable="false" id="personalContent">
                            <p>${resumeData.about}</p>
                        </div>
                </div>
                <hr>
                <div class="contact">
                    <h2>Contact Me</h2>
                    <section id="contactSection">
                        <button class="editButton" onclick="toggleEditMode('contactSection')">Edit</button>
                        <div contenteditable="false" id="contact">
                            <div class="call"><a href="tel:${resumeData.contact}">

                                    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                                        fill="#ffff" height="20px" width="20px" version="1.1" id="Layer_1"
                                        viewBox="0 0 512 512" xml:space="preserve">
                                        <g>
                                            <g>
                                                <path
                                                    d="M470.326,0h-47.628c-3.288,0-5.953,2.666-5.953,5.953v146.456c0,3.288,2.666,5.953,5.953,5.953h59.535    c3.288,0,5.953-2.666,5.953-5.953V17.86C488.186,7.997,480.189,0,470.326,0z" />
                                            </g>
                                        </g>
                                        <g>
                                            <g>
                                                <path
                                                    d="M482.233,194.084h-59.535c-3.288,0-5.953,2.666-5.953,5.953v111.926c0,3.288,2.666,5.953,5.953,5.953h59.535    c3.288,0,5.953-2.666,5.953-5.953V200.037C488.186,196.75,485.52,194.084,482.233,194.084z" />
                                            </g>
                                        </g>
                                        <g>
                                            <g>
                                                <path
                                                    d="M375.07,0H65.488C42.472,0,23.814,18.658,23.814,41.674v428.651c0,23.016,18.658,41.674,41.674,41.674H375.07    c3.287,0,5.953-2.666,5.953-5.953V5.953C381.023,2.666,378.357,0,375.07,0z M323.728,389.115l-19.714,11.382    c-42.245,24.39-96.168,9.939-120.556-32.302l-75.633-131.003c-24.388-42.242-9.945-96.164,32.302-120.555l19.714-11.383    c19.944-11.516,45.411-4.696,56.928,15.255l19.619,33.981c10.597,18.353,7.647,43.707-19.5,59.38l41.299,71.532    c27.45-15.847,50.789-5.188,61.174,12.801l19.62,33.983C350.472,352.087,343.629,377.625,323.728,389.115z" />
                                            </g>
                                        </g>
                                        <g>
                                            <g>
                                                <path
                                                    d="M482.233,353.637h-59.535c-3.288,0-5.953,2.666-5.953,5.953v146.456c0,3.287,2.666,5.953,5.953,5.953h47.628    c9.864,0,17.86-7.997,17.86-17.86V359.591C488.186,356.303,485.52,353.637,482.233,353.637z" />
                                            </g>
                                        </g>
                                    </svg>
                                    <span>${resumeData.contact}</span></a>

                                <div class="email"><a href="mailto:${resumeData.email}"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                                            fill="#ffff" height="20px" width="20px" version="1.1" id="Capa_1"
                                            viewBox="0 0 485.638 485.638" xml:space="preserve">
                                            <g>
                                                <path
                                                    d="M472.689,156.996L328.642,12.949c-17.266-17.266-45.353-17.266-62.616,0L12.948,266.024   c-17.264,17.266-17.264,45.353,0,62.617L156.995,472.69c17.266,17.264,45.354,17.265,62.617,0l253.076-253.076   C489.954,202.348,489.952,174.26,472.689,156.996z M183.546,455.21c-2.064-0.707-4.031-1.745-5.68-3.393L33.819,307.771   c-0.039-0.041-0.048-0.092-0.09-0.133l149.816-0.001V455.21z M42.601,278.118L278.122,42.596l0.002,229.085   c-0.002,3.444-2.998,6.442-6.443,6.442L42.601,278.118z M213.06,437.498v-129.86h58.623c9.609,0,18.64-3.741,25.427-10.528   c6.788-6.788,10.527-15.817,10.528-25.428V213.06l129.854,0.005L213.06,437.498z M307.637,183.545V33.729   c0.04,0.041,0.093,0.05,0.134,0.091l144.047,144.047c1.646,1.647,2.685,3.613,3.388,5.683L307.637,183.545z" />
                                                <path
                                                    d="M14.382,62.57h151.154c7.941,0,14.381-6.438,14.381-14.38c0-7.942-6.439-14.381-14.381-14.381H14.382   c-7.943,0-14.381,6.438-14.381,14.381C0.001,56.132,6.439,62.57,14.382,62.57z" />
                                                <path
                                                    d="M14.382,119.065h94.784c7.942,0,14.38-6.438,14.38-14.381c0-7.941-6.438-14.38-14.38-14.38H14.382   c-7.943,0-14.381,6.438-14.381,14.38C0.001,112.627,6.439,119.065,14.382,119.065z" />
                                                <path
                                                    d="M14.382,173.849h61.197c7.941,0,14.381-6.438,14.381-14.381s-6.439-14.381-14.381-14.381H14.382   c-7.943,0-14.381,6.439-14.381,14.381S6.439,173.849,14.382,173.849z" />
                                                <path
                                                    d="M75.579,438.278H14.382c-7.943,0-14.381,6.439-14.381,14.381c0,7.942,6.438,14.381,14.381,14.381h61.197   c7.941,0,14.381-6.438,14.381-14.381C89.96,444.717,83.521,438.278,75.579,438.278z" />
                                            </g>
                                        </svg>
                                        <span>${resumeData.email}</span></a>
                                </div>
                            </div>
                        </div>
                </div>
                </section>
            </div>
        </div>
        <!-- Right -->
        <div class="right">
            <div class="func">
                <section id="educationSection" class="edu">
                    <button class="editButton" onclick="toggleEditMode('educationSection')">Edit</button>
                    <h2><svg xmlns="http://www.w3.org/2000/svg" fill="#000000" width="35px" height="35px"
                            viewBox="0 0 1024 1024">
                            <path
                                d="M197.769 791.767l60.672-286.853c2.341-11.066-4.733-21.934-15.799-24.275s-21.934 4.733-24.275 15.799l-60.672 286.853c-2.341 11.066 4.733 21.934 15.799 24.275s21.934-4.733 24.275-15.799zm571.063-286.786l61.778 287.068c2.38 11.058 13.273 18.093 24.33 15.713s18.093-13.273 15.713-24.33l-61.778-287.068c-2.38-11.058-13.273-18.093-24.33-15.713s-18.093 13.273-15.713 24.33z" />
                            <path
                                d="M967.45 386.902L535.9 208.126c-10.609-4.399-30.569-4.442-41.207-.088L57.821 386.901l436.881 178.857c10.624 4.355 30.583 4.313 41.207-.085L967.45 386.901zM551.583 603.516c-20.609 8.533-51.787 8.599-72.409.145L24.437 417.494c-32.587-13.359-32.587-47.847.009-61.188l454.73-186.174c20.641-8.448 51.818-8.382 72.407.156l448.836 185.936c32.466 13.442 32.466 47.913.004 61.354l-448.84 185.938zm288.673 166.569c-98 57.565-209.669 88.356-325.888 88.356-116.363 0-228.162-30.866-326.246-88.564-9.749-5.735-22.301-2.481-28.036 7.268s-2.481 22.301 7.268 28.036c104.336 61.377 223.297 94.22 347.014 94.22 123.564 0 242.386-32.763 346.634-93.998 9.753-5.729 13.015-18.279 7.286-28.032s-18.279-13.015-28.032-7.286z" />
                            <path
                                d="M983.919 383.052v296.233c0 11.311 9.169 20.48 20.48 20.48s20.48-9.169 20.48-20.48V383.052c0-11.311-9.169-20.48-20.48-20.48s-20.48 9.169-20.48 20.48z" />
                        </svg>
                        Education
                    </h2>
                    <ul contenteditable="false" id="educationContent">
                        ${resumeData.education
        .map((edu) => `<li> <strong> ${edu}</strong></li>`)
        .join("")}
                    </ul>
                </section>

                <section id="experienceSection" class="exp">
                    <button class="editButton" onclick="toggleEditMode('experienceSection')">Edit</button>
                    <h2><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="35px"
                            height="35px" viewBox="0 0 512 512" version="1.1">
                            <title>work-case</title>
                            <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                <g id="Combined-Shape" fill="#000000" transform="translate(90.666667, 90.000000)">
                                    <path
                                        d="M277.333333,1.42108547e-14 L298.666667,21.3333333 L298.666,64 L426.666667,64 L426.666667,362.666667 L3.55271368e-14,362.666667 L3.55271368e-14,64 L128,64 L128,21.3333333 L149.333333,1.42108547e-14 L277.333333,1.42108547e-14 Z M42.6664912,220.935181 L42.6666667,320 L384,320 L384.000468,220.935097 C341.375319,233.130501 298.701692,240.759085 256.000479,243.809455 L256,277.333333 L170.666667,277.333333 L170.666323,243.809465 C127.965163,240.759108 85.2915887,233.130549 42.6664912,220.935181 Z M384,106.666667 L42.6666667,106.666667 L42.6668606,176.433085 C99.6386775,193.933257 156.507113,202.666667 213.333333,202.666667 C270.159803,202.666667 327.028489,193.933181 384.000558,176.432854 L384,106.666667 Z M256,42.6666667 L170.666667,42.6666667 L170.666667,64 L256,64 L256,42.6666667 Z">

                                    </path>
                                </g>
                            </g>
                        </svg>
                        Experience</h2>
                    <ul contenteditable="false" id="experienceContent">
                        ${resumeData.experience
        .map((exp) => `<li><strong>${exp}</strong></li>`)
        .join("")}
                    </ul>
                </section>
            </div>
            <!-- Right-Bottom -->
            <div class="r-bottom">
                <section id="skillsSection" class="skills">
                    <button class="editButton" onclick="toggleEditMode('skillsSection')">Edit</button>
                    <h2><svg xmlns="http://www.w3.org/2000/svg" xml:space="preserve" width="40px" height="35px"
                            version="1.1" shape-rendering="geometricPrecision" text-rendering="geometricPrecision"
                            image-rendering="optimizeQuality" fill-rule="evenodd" clip-rule="evenodd"
                            viewBox="-10 -35 512 512">
                            <path fill="black" fill-rule="nonzero"
                                d="M423.51 61.53c-5.02,-5.03 -10.92,-7.51 -17.75,-7.51 -6.82,0 -12.8,2.48 -17.75,7.51l-27.05 26.97c-7.25,-4.7 -14.93,-8.8 -22.95,-12.47 -8.02,-3.67 -16.22,-6.82 -24.5,-9.55l0 -41.48c0,-7 -2.38,-12.89 -7.25,-17.75 -4.86,-4.86 -10.75,-7.25 -17.75,-7.25l-52.05 0c-6.66,0 -12.45,2.39 -17.49,7.25 -4.95,4.86 -7.43,10.75 -7.43,17.75l0 37.98c-8.7,2.04 -17.15,4.6 -25.26,7.76 -8.19,3.16 -15.95,6.74 -23.29,10.75l-29.96 -29.53c-4.69,-4.94 -10.4,-7.5 -17.32,-7.5 -6.83,0 -12.71,2.56 -17.75,7.5l-36.43 36.54c-5.03,5.03 -7.51,10.92 -7.51,17.73 0,6.83 2.48,12.81 7.51,17.75l26.97 27.06c-4.7,7.26 -8.79,14.93 -12.46,22.95 -3.68,8.02 -6.83,16.22 -9.56,24.49l-41.47 0c-7.01,0 -12.9,2.39 -17.76,7.26 -4.86,4.86 -7.25,10.75 -7.25,17.75l0 52.05c0,6.65 2.39,12.46 7.25,17.5 4.86,4.94 10.75,7.42 17.76,7.42l37.97 0c2.04,8.7 4.6,17.15 7.76,25.25 3.17,8.2 6.75,16.13 10.75,23.81l-29.52 29.44c-4.95,4.7 -7.51,10.41 -7.51,17.33 0,6.82 2.56,12.71 7.51,17.75l36.53 36.95c5.03,4.69 10.92,7 17.75,7 6.82,0 12.79,-2.31 17.75,-7l27.04 -27.48c7.26,4.69 14.94,8.78 22.96,12.46 8.02,3.66 16.21,6.83 24.49,9.55l0 41.48c0,7 2.39,12.88 7.25,17.74 4.86,4.87 10.76,7.26 17.75,7.26l52.05 0c6.66,0 12.46,-2.39 17.5,-7.26 4.94,-4.86 7.42,-10.74 7.42,-17.74l0 -37.98c8.7,-2.04 17.15,-4.6 25.25,-7.76 8.2,-3.16 16.14,-6.74 23.81,-10.75l29.44 29.53c4.7,4.95 10.49,7.5 17.51,7.5 7.07,0 12.87,-2.55 17.57,-7.5l36.95 -36.53c4.69,-5.04 7,-10.92 7,-17.75 0,-6.82 -2.31,-12.8 -7,-17.75l-27.48 -27.05c4.7,-7.26 8.79,-14.93 12.46,-22.96 3.66,-8.01 6.83,-16.21 9.56,-24.49l41.47 0c7,0 12.88,-2.4 17.74,-7.25 4.87,-4.87 7.26,-10.75 7.26,-17.75l0 -52.05c0,-6.66 -2.39,-12.45 -7.26,-17.5 -4.86,-4.95 -10.74,-7.42 -17.74,-7.42l-37.98 0c-2.04,-8.36 -4.6,-16.73 -7.76,-25 -3.16,-8.37 -6.74,-16.21 -10.75,-23.56l29.53 -29.95c4.95,-4.69 7.5,-10.41 7.5,-17.32 0,-6.83 -2.55,-12.71 -7.5,-17.75l-36.53 -36.43zm-48.41 257.98c-22.72,42.52 -67.54,71.44 -119.1,71.44 -51.58,0 -96.37,-28.92 -119.09,-71.42 2.66,-11.61 7.05,-21.74 19.9,-28.84 17.76,-9.89 48.34,-9.15 62.89,-22.24l20.1 52.78 10.1 -28.77 -4.95 -5.42c-3.72,-5.44 -2.44,-11.62 4.46,-12.74 2.33,-0.37 4.95,-0.14 7.47,-0.14 2.69,0 5.68,-0.25 8.22,0.32 6.41,1.41 7.07,7.62 3.88,12.56l-4.95 5.42 10.11 28.77 18.18 -52.78c13.12,11.8 48.43,14.18 62.88,22.24 12.89,7.22 17.26,17.24 19.9,28.82zm-159.11 -86.45c-1.82,0.03 -3.31,-0.2 -4.93,-1.1 -2.15,-1.19 -3.67,-3.24 -4.7,-5.55 -2.17,-4.86 -3.89,-17.63 1.57,-21.29l-1.02 -0.66 -0.11 -1.41c-0.21,-2.57 -0.26,-5.68 -0.32,-8.95 -0.2,-12 -0.45,-26.56 -10.37,-29.47l-4.25 -1.26 2.81 -3.38c8.01,-9.64 16.38,-18.07 24.82,-24.54 9.55,-7.33 19.26,-12.2 28.75,-13.61 9.77,-1.44 19.23,0.75 27.97,7.62 2.57,2.03 5.08,4.48 7.5,7.33 9.31,0.88 16.94,5.77 22.38,12.75 3.24,4.16 5.71,9.09 7.29,14.33 1.56,5.22 2.24,10.77 1.95,16.23 -0.53,9.8 -4.2,19.35 -11.61,26.33 1.3,0.04 2.53,0.33 3.61,0.91 4.14,2.15 4.27,6.82 3.19,10.75 -1.08,3.28 -2.44,7.08 -3.73,10.28 -1.56,4.31 -3.85,5.12 -8.27,4.65 -9.93,43.45 -69.98,44.93 -82.53,0.04zm40.01 -135.69c87.64,0 158.63,71.04 158.63,158.63 0,87.64 -71.04,158.63 -158.63,158.63 -87.63,0 -158.63,-71.04 -158.63,-158.63 0,-87.64 71.04,-158.63 158.63,-158.63z" />
                        </svg>
                        Skills</h2>
                    <ul contenteditable="false" id="skillsContent">
                        ${resumeData.skills
        .map((skill) => `<li><span>${skill}</span></li>`)
        .join("")}
                    </ul>
                </section>
            </div>
            <button class="download-btn" id="downloadPdfButton">Download</button>
            <button class="share-btn" id="shareButton" onclick="shareResume()">Share</button>
        </div>



    </div>
    </div>
    </div>
    <footer>
        <p>Author: Syed Saud Ali
            <a href="mailto:saud.saleem93@gmail.com"><svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20"
                    height="20" viewBox="0 0 48 48">
                    <path fill="#4caf50" d="M45,16.2l-5,2.75l-5,4.75L35,40h7c1.657,0,3-1.343,3-3V16.2z"></path>
                    <path fill="#1e88e5" d="M3,16.2l3.614,1.71L13,23.7V40H6c-1.657,0-3-1.343-3-3V16.2z"></path>
                    <polygon fill="#e53935" points="35,11.2 24,19.45 13,11.2 12,17 13,23.7 24,31.95 35,23.7 36,17">
                    </polygon>
                    <path fill="#c62828"
                        d="M3,12.298V16.2l10,7.5V11.2L9.876,8.859C9.132,8.301,8.228,8,7.298,8h0C4.924,8,3,9.924,3,12.298z">
                    </path>
                    <path fill="#fbc02d"
                        d="M45,12.298V16.2l-10,7.5V11.2l3.124-2.341C38.868,8.301,39.772,8,40.702,8h0 C43.076,8,45,9.924,45,12.298z">
                    </path>
                </svg></a>
        </p>
    </footer>
                
               
                


            <script>
                function toggleEditMode(sectionId) {
                    const section = document.getElementById(sectionId);
                    const button = section.querySelector('button');
                    const content = section.querySelector('[contenteditable]');

                    if (button.textContent === 'Edit') {
                        content.setAttribute('contenteditable', 'true');
                        content.style.border = '1px solid #ccc';
                        button.textContent = 'Save';
                        button.classList.add('save');
                    } else {
                        content.setAttribute('contenteditable', 'false');
                        content.style.border = 'none';
                        button.textContent = 'Edit';
                        button.classList.remove('save');
                    }
                }

                function shareResume() {
                    const resumeURL = '${resumeURL}';
                    navigator.clipboard.writeText(resumeURL).then(() => {
                        alert('Resume URL copied to clipboard: ' + resumeURL);
                    }).catch(err => {
                        console.error('Failed to copy URL: ', err);
                    });
                }
                document.getElementById('downloadPdfButton').addEventListener('click', () => {
                  const element = document.getElementById('container');
                  html2pdf().from(element).save('${resumeData.firstName}_${resumeData.lastName}_Resume.pdf');
                });
            </script>
        </body>
        </html>
    `;
    newWindow.document.write(resumeHTML);
    newWindow.document.close();
}
