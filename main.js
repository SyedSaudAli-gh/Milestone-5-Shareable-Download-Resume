var addEducationButton = document.getElementById("addEducation");
var addSkillButton = document.getElementById("addSkill");
var addExperienceButton = document.getElementById("addExperience");
var submitButton = document.getElementById("submit");
var uploadPhotoButton = document.getElementById("uploadPhoto");
var resumeForm = document.getElementById("resumeForm");
var uploadedImageSrc = "";
addEducationButton.addEventListener("click", addMoreEducation);
addSkillButton.addEventListener("click", addMoreSkills);
addExperienceButton.addEventListener("click", addMoreExperience);
submitButton.addEventListener("click", submitResume);
uploadPhotoButton.addEventListener("click", uploadPhoto);
function addMoreEducation(event) {
    event.preventDefault();
    var educationList = document.getElementById("educationList");
    var newEducation = document.createElement("li");
    newEducation.innerHTML = "<input type=\"text\" name=\"education\" size=\"50\" placeholder=\"Education Details\">";
    educationList === null || educationList === void 0 ? void 0 : educationList.appendChild(newEducation);
}
function addMoreSkills(event) {
    event.preventDefault();
    var skillsList = document.getElementById("skillsList");
    var newSkill = document.createElement("li");
    newSkill.innerHTML = "<input type=\"text\" name=\"skills\" size=\"20\" placeholder=\"Skill\">";
    skillsList === null || skillsList === void 0 ? void 0 : skillsList.appendChild(newSkill);
}
function addMoreExperience(event) {
    event.preventDefault();
    var experienceList = document.getElementById("experienceList");
    var newExperience = document.createElement("li");
    newExperience.innerHTML = "<input type=\"text\" name=\"experience\" size=\"50\" placeholder=\"Work Experience\">";
    experienceList === null || experienceList === void 0 ? void 0 : experienceList.appendChild(newExperience);
}
function uploadPhoto(event) {
    var input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.addEventListener("change", function () {
        var _a;
        var file = (_a = input.files) === null || _a === void 0 ? void 0 : _a[0];
        if (file) {
            var reader = new FileReader();
            reader.onload = function (e) {
                var _a, _b;
                var imgElement = uploadPhotoButton.querySelector("img");
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
    var formData = new FormData(resumeForm);
    var email = formData.get("email");
    var resumeData = {
        firstName: formData.get("FirstName"),
        lastName: formData.get("LastName"),
        gender: formData.get("gender"),
        email: email,
        dob: formData.get("DOB"),
        nationality: formData.get("Nationality"),
        maritalStatus: formData.get("maritalStatus"),
        contact: formData.get("Contact"),
        education: formData.getAll("education"),
        skills: formData.getAll("skills"),
        experience: formData.getAll("experience"),
    };
    // POP alert
    if (!resumeData.firstName ||
        !resumeData.lastName ||
        !resumeData.gender ||
        !resumeData.email ||
        !resumeData.dob ||
        !resumeData.nationality ||
        !resumeData.contact) {
        alert("Please fill out all the required personal details.");
        return;
    }
    // Validate email
    if (!validateEmail(email)) {
        alert("Please enter a valid email address.");
        return;
    }
    var educationList = document.getElementById("educationList");
    if (educationList.children.length === 0 ||
        resumeData.education.some(function (e) { return e.trim() === ""; })) {
        alert("Please add at least one valid education detail.");
        return;
    }
    var skillsList = document.getElementById("skillsList");
    if (skillsList.children.length === 0 ||
        resumeData.skills.some(function (s) { return s.trim() === ""; })) {
        alert("Please add at least one valid skill.");
        return;
    }
    var experienceList = document.getElementById("experienceList");
    if (experienceList.children.length === 0 ||
        resumeData.experience.some(function (exp) { return exp.trim() === ""; })) {
        alert("Please add at least one valid work experience.");
        return;
    }
    // Envalidate email ka Liya
    function validateEmail(email) {
        var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    // Generate the URL based on username (firstName and lastName)
    var username = "".concat(resumeData.firstName).concat(resumeData.lastName);
    var resumeURL = "".concat(window.location.origin, "/").concat(username, "/resume");
    var newWindow = window.open();
    var resumeHTML = "\n        <html>\n        <head>\n            <title>".concat(resumeData.firstName, " ").concat(resumeData.lastName, " - Resume</title>\n            <style>\n                * {\n                    margin: 0;\n                    padding: 0;\n                    box-sizing: border-box;\n                }\n\n                body {\n                    font-family: Arial, Helvetica, sans-serif;\n                    background-color: rgb(100, 200, 255);\n                    color: #333;\n                    line-height: 1.9;\n                    padding: 20px;\n                }\n\n                .container {\n                    max-width: 800px;\n                    margin: auto;\n                    padding: 18px;\n                    background-color: #f5f5f5;\n                    border-radius: 15px;\n                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.9);\n                }\n\n                .header {\n                    display: flex;\n                    justify-content: space-between;\n                    align-items: center;\n                    padding-bottom: 20px;\n                    border-bottom: 2px solid #ccc;\n                }\n\n                .header h1 {\n                    font-size: 2.5em;\n                }\n\n                .header img {\n                    border-radius: 10%;\n                    height: 120px;\n                }\n\n                section {\n                    margin: 20px 0;\n                    padding: 15px;\n                    background-color: #e0f5fa;\n                    border-radius: 8px;\n                    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);\n                }\n\n                section h2 {\n                    color: #ffffff;\n                    background-color: rgb(22, 14, 3);\n                    border-radius: 8px;\n                    font-size: 1.8em;\n                    padding: 5px;\n                    border-bottom: 2px solid #3498db;\n                }\n\n                p, li {\n                    font-size: 1.1em;\n                }\n\n                ol, ul {\n                    margin-left: 20px;\n                }\n\n                button {\n                    padding: 5px;\n                    background-color: rgba(247, 156, 156, 0.796);\n                    color: white;\n                    border-radius: 10px;\n                    border: none;\n                    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;\n                    font-size: 1.1em;\n                    cursor: pointer;\n                }\n                    #shareButton{\n                    padding: 5px;\n                    background-color: rgba(247, 156, 156, 0.796);\n                    color: white;\n                    border-radius: 10px;\n                    border: none;\n                    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;\n                    font-size: 1.1em;\n                    cursor: pointer;\n                    }\n\n                button.save {\n                    background-color: #4CAF50;\n                }\n\n            </style>\n        </head>\n        <body>\n            <div id=\"resumeContainer\" class=\"container\">\n                <div class=\"header\">\n                    <h1>").concat(resumeData.firstName, " ").concat(resumeData.lastName, " - Resume</h1>\n                    <img src=\"").concat(uploadedImageSrc, "\" alt=\"Profile Photo\">\n                </div>\n\n                <section id=\"personalSection\">\n                    <h2>Personal Details</h2>\n                    <button onclick=\"toggleEditMode('personalSection')\">Edit</button>\n                    <div contenteditable=\"false\" id=\"personalContent\">\n                        <p><strong>Gender:</strong> ").concat(resumeData.gender, "</p>\n                        <p><strong>Email:</strong> ").concat(resumeData.email, "</p>\n                        <p><strong>Date of Birth:</strong> ").concat(resumeData.dob, "</p>\n                        <p><strong>Nationality:</strong> ").concat(resumeData.nationality, "</p>\n                        <p><strong>Marital Status:</strong> ").concat(resumeData.maritalStatus, "</p>\n                        <p><strong>Contact:</strong> ").concat(resumeData.contact, "</p>\n                    </div>\n                </section>\n\n                <section id=\"educationSection\">\n                    <h2>Education</h2>\n                    <button onclick=\"toggleEditMode('educationSection')\">Edit</button>\n                    <ul contenteditable=\"false\" id=\"educationContent\">\n                        ").concat(resumeData.education
        .map(function (edu) { return "<li>".concat(edu, "</li>"); })
        .join(""), "\n                    </ul>\n                </section>\n\n                <section id=\"skillsSection\">\n                    <h2>Skills</h2>\n                    <button onclick=\"toggleEditMode('skillsSection')\">Edit</button>\n                    <ul contenteditable=\"false\" id=\"skillsContent\">\n                        ").concat(resumeData.skills
        .map(function (skill) { return "<li>".concat(skill, "</li>"); })
        .join(""), "\n                    </ul>\n                </section>\n\n                <section id=\"experienceSection\">\n                    <h2>Work Experience</h2>\n                    <button onclick=\"toggleEditMode('experienceSection')\">Edit</button>\n                    <ol contenteditable=\"false\" id=\"experienceContent\">\n                        ").concat(resumeData.experience
        .map(function (exp) { return "<li>".concat(exp, "</li>"); })
        .join(""), "\n                    </ol>\n                </section>\n                \n                <center>\n    <footer>\n        <p>Author: Syed Saud Ali</p>\n        <p><a href=\"mailto:saud.saleem93@gmail.com\">Mail To Me\n        </a></p>\n    </footer>\n</center>\n                </div>\n                </div>\n                <center>\n                <div>\n                <button id=\"shareButton\" onclick=\"shareResume()\">Share Resume</button>\n                <br><br>\n                <button id=\"downloadPdfButton\">Download as PDF</button>\n                </div>\n                </center>\n\n            \n    <script src=\"https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.9.2/html2pdf.bundle.min.js\"></script>\n\n            <script>\n                function toggleEditMode(sectionId) {\n                    const section = document.getElementById(sectionId);\n                    const button = section.querySelector('button');\n                    const content = section.querySelector('[contenteditable]');\n\n                    if (button.textContent === 'Edit') {\n                        content.setAttribute('contenteditable', 'true');\n                        content.style.border = '1px solid #ccc';\n                        button.textContent = 'Save';\n                        button.classList.add('save');\n                    } else {\n                        content.setAttribute('contenteditable', 'false');\n                        content.style.border = 'none';\n                        button.textContent = 'Edit';\n                        button.classList.remove('save');\n\n                        // You can update your data here if needed, for now just keeping it in the view\n                    }\n                }\n\n                function shareResume() {\n                    const resumeURL = '").concat(resumeURL, "';\n                    navigator.clipboard.writeText(resumeURL).then(() => {\n                        alert('Resume URL copied to clipboard: ' + resumeURL);\n                    }).catch(err => {\n                        console.error('Failed to copy URL: ', err);\n                    });\n                }\n                document.getElementById('downloadPdfButton').addEventListener('click', () => {\n                  const element = document.getElementById('resumeContainer');\n                  html2pdf()\n                  .from(element)\n                  .save('").concat(resumeData.firstName, "_").concat(resumeData.lastName, "_Resume.pdf');\n                });\n            </script>\n        </body>\n        </html>\n    ");
    newWindow.document.write(resumeHTML);
    newWindow.document.close();
}
