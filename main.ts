const addEducationButton = document.getElementById(
  "addEducation"
) as HTMLButtonElement;
const addSkillButton = document.getElementById("addSkill") as HTMLButtonElement;
const addExperienceButton = document.getElementById(
  "addExperience"
) as HTMLButtonElement;
const submitButton = document.getElementById("submit") as HTMLButtonElement;
const uploadPhotoButton = document.getElementById(
  "uploadPhoto"
) as HTMLButtonElement;
const resumeForm = document.getElementById("resumeForm") as HTMLFormElement;

let uploadedImageSrc = "";

addEducationButton.addEventListener("click", addMoreEducation);
addSkillButton.addEventListener("click", addMoreSkills);
addExperienceButton.addEventListener("click", addMoreExperience);
submitButton.addEventListener("click", submitResume);
uploadPhotoButton.addEventListener("click", uploadPhoto);

function addMoreEducation(event: Event): void {
  event.preventDefault();
  const educationList = document.getElementById("educationList");
  const newEducation = document.createElement("li");
  newEducation.innerHTML = `<input type="text" name="education" size="50" placeholder="Education Details">`;
  educationList?.appendChild(newEducation);
}
function addMoreSkills(event: Event): void {
  event.preventDefault();
  const skillsList = document.getElementById("skillsList");
  const newSkill = document.createElement("li");
  newSkill.innerHTML = `<input type="text" name="skills" size="20" placeholder="Skill">`;
  skillsList?.appendChild(newSkill);
}

function addMoreExperience(event: Event): void {
  event.preventDefault();
  const experienceList = document.getElementById("experienceList");
  const newExperience = document.createElement("li");
  newExperience.innerHTML = `<input type="text" name="experience" size="50" placeholder="Work Experience">`;
  experienceList?.appendChild(newExperience);
}

function uploadPhoto(event: Event): void {
  const input = document.createElement("input");
  input.type = "file";
  input.accept = "image/*";

  input.addEventListener("change", () => {
    const file = input.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imgElement = uploadPhotoButton.querySelector(
          "img"
        ) as HTMLImageElement;
        imgElement.src = e.target?.result as string;
        uploadedImageSrc = e.target?.result as string;
      };
      reader.readAsDataURL(file);
    }
  });

  input.click();
}

function submitResume(event: Event): void {
  event.preventDefault();

  const formData = new FormData(resumeForm);
  const email = formData.get("email") as string;

  const resumeData = {
    firstName: formData.get("FirstName") as string,
    lastName: formData.get("LastName") as string,
    gender: formData.get("gender") as string,
    email: email,
    dob: formData.get("DOB") as string,
    nationality: formData.get("Nationality") as string,
    maritalStatus: formData.get("maritalStatus") as string,
    contact: formData.get("Contact"),
    education: formData.getAll("education") as string[],
    skills: formData.getAll("skills") as string[],
    experience: formData.getAll("experience") as string[],
  };
  // POP alert
  if (
    !resumeData.firstName ||
    !resumeData.lastName ||
    !resumeData.gender ||
    !resumeData.email ||
    !resumeData.dob ||
    !resumeData.nationality ||
    !resumeData.contact
  ) {
    alert("Please fill out all the required personal details.");
    return;
  }
  // Validate email
  if (!validateEmail(email)) {
    alert("Please enter a valid email address.");
    return;
  }

  const educationList = document.getElementById(
    "educationList"
  ) as HTMLUListElement;
  if (
    educationList.children.length === 0 ||
    resumeData.education.some((e) => e.trim() === "")
  ) {
    alert("Please add at least one valid education detail.");
    return;
  }

  const skillsList = document.getElementById("skillsList") as HTMLUListElement;
  if (
    skillsList.children.length === 0 ||
    resumeData.skills.some((s) => s.trim() === "")
  ) {
    alert("Please add at least one valid skill.");
    return;
  }

  const experienceList = document.getElementById(
    "experienceList"
  ) as HTMLUListElement;
  if (
    experienceList.children.length === 0 ||
    resumeData.experience.some((exp) => exp.trim() === "")
  ) {
    alert("Please add at least one valid work experience.");
    return;
  }
  // Envalidate email ka Liya
  function validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // Generate the URL based on username (firstName and lastName)
  const username = `${resumeData.firstName}${resumeData.lastName}`;
  const resumeURL = `${window.location.origin}/${username}/resume`;

  const newWindow = window.open() as Window;
  const resumeHTML = `
        <html>
        <head>
            <title>${resumeData.firstName} ${
    resumeData.lastName
  } - Resume</title>
            <style>
                * {
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                }

                body {
                    font-family: Arial, Helvetica, sans-serif;
                    background-color: rgb(100, 200, 255);
                    color: #333;
                    line-height: 1.9;
                    padding: 20px;
                }

                .container {
                    max-width: 800px;
                    margin: auto;
                    padding: 18px;
                    background-color: #f5f5f5;
                    border-radius: 15px;
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.9);
                }

                .header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding-bottom: 20px;
                    border-bottom: 2px solid #ccc;
                }

                .header h1 {
                    font-size: 2.5em;
                }

                .header img {
                    border-radius: 10%;
                    height: 120px;
                }

                section {
                    margin: 20px 0;
                    padding: 15px;
                    background-color: #e0f5fa;
                    border-radius: 8px;
                    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
                }

                section h2 {
                    color: #ffffff;
                    background-color: rgb(22, 14, 3);
                    border-radius: 8px;
                    font-size: 1.8em;
                    padding: 5px;
                    border-bottom: 2px solid #3498db;
                }

                p, li {
                    font-size: 1.1em;
                }

                ol, ul {
                    margin-left: 20px;
                }

                button {
                    padding: 5px;
                    background-color: rgba(247, 156, 156, 0.796);
                    color: white;
                    border-radius: 10px;
                    border: none;
                    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
                    font-size: 1.1em;
                    cursor: pointer;
                }
                    #shareButton{
                    padding: 5px;
                    background-color: rgba(247, 156, 156, 0.796);
                    color: white;
                    border-radius: 10px;
                    border: none;
                    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
                    font-size: 1.1em;
                    cursor: pointer;
                    }

                button.save {
                    background-color: #4CAF50;
                }

            </style>
        </head>
        <body>
            <div id="resumeContainer" class="container">
                <div class="header">
                    <h1>${resumeData.firstName} ${
    resumeData.lastName
  } - Resume</h1>
                    <img src="${uploadedImageSrc}" alt="Profile Photo">
                </div>

                <section id="personalSection">
                    <h2>Personal Details</h2>
                    <button onclick="toggleEditMode('personalSection')">Edit</button>
                    <div contenteditable="false" id="personalContent">
                        <p><strong>Gender:</strong> ${resumeData.gender}</p>
                        <p><strong>Email:</strong> ${resumeData.email}</p>
                        <p><strong>Date of Birth:</strong> ${resumeData.dob}</p>
                        <p><strong>Nationality:</strong> ${
                          resumeData.nationality
                        }</p>
                        <p><strong>Marital Status:</strong> ${
                          resumeData.maritalStatus
                        }</p>
                        <p><strong>Contact:</strong> ${resumeData.contact}</p>
                    </div>
                </section>

                <section id="educationSection">
                    <h2>Education</h2>
                    <button onclick="toggleEditMode('educationSection')">Edit</button>
                    <ul contenteditable="false" id="educationContent">
                        ${resumeData.education
                          .map((edu) => `<li>${edu}</li>`)
                          .join("")}
                    </ul>
                </section>

                <section id="skillsSection">
                    <h2>Skills</h2>
                    <button onclick="toggleEditMode('skillsSection')">Edit</button>
                    <ul contenteditable="false" id="skillsContent">
                        ${resumeData.skills
                          .map((skill) => `<li>${skill}</li>`)
                          .join("")}
                    </ul>
                </section>

                <section id="experienceSection">
                    <h2>Work Experience</h2>
                    <button onclick="toggleEditMode('experienceSection')">Edit</button>
                    <ol contenteditable="false" id="experienceContent">
                        ${resumeData.experience
                          .map((exp) => `<li>${exp}</li>`)
                          .join("")}
                    </ol>
                </section>
                
                <center>
    <footer>
        <p>Author: Syed Saud Ali</p>
        <p><a href="mailto:saud.saleem93@gmail.com">Mail To Me
        </a></p>
    </footer>
</center>
                </div>
                </div>
                <center>
                <div>
                <button id="shareButton" onclick="shareResume()">Share Resume</button>
                <br><br>
                <button id="downloadPdfButton">Download as PDF</button>
                </div>
                </center>

            
    <script src="https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.9.2/html2pdf.bundle.min.js"></script>

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

                        // You can update your data here if needed, for now just keeping it in the view
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
                  const element = document.getElementById('resumeContainer');
                  html2pdf()
                  .from(element)
                  .save('${resumeData.firstName}_${
    resumeData.lastName
  }_Resume.pdf');
                });
            </script>
        </body>
        </html>
    `;

  newWindow.document.write(resumeHTML);
  newWindow.document.close();
}
