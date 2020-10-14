const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const teamMembers = [];


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```


function appMenu() {
    function createManager() {
        inquirer.prompt([
            {
                type: "input",
                name: "managerName",
                message: "What is your name?",
                validate: answer => {
                    if (answer !== "") {
                        return true
                    }
                    return "Please enter at least one character."
                }
            },
            {
                type: "input",
                name: "managerID",
                message: "What is your Id?",
                validate: answer => {
                    const pass = answer.match(/^[1-9]\d*$/);
                    if (pass) {
                        return true;
                    }
                    return "Please enter a postive number greater than zero."
                }

            },
            {
                type: "input",
                name: "managerEmail",
                message: "What is your email?",
                validate: answer => {
                    const pass = answer.match(/[a-z0-9\._%+!$&*=^|~#%{}/\-]+@([a-z0-9\-]+\.){1,}([a-z]{2,22})/);
                    if (pass) {
                        return true;
                    }
                    return "Please enter a valid email adress."
                }
            },
            {
                type: "input",
                name: "managerOfficeNumber",
                message: "What is your office number?",
                validate: answer => {
                    const pass = answer.match(/^[1-9]\d*$/);
                    if (pass) {
                        return true;
                    }
                    return "Please enter a postive number greater than zero."
                }
            }
        ]).then(function (answers) {
            const manager = new Manager(answers.managerName, answers.managerID, answers.managerEmail, answers.managerOfficeNumber)
            teamMembers.push(manager);
            createTeam();
        })
    }
    function createTeam() {
        inquirer.prompt([
            {
                type: "list",
                name: "memberChoices",
                message: "Which team member would you like to create?",
                choices: ["Engineer", "Intern", "No more team members"]
            }
        ]).then(function (answer) {
            switch (answer.memberChoices) {
                case "Engineer":
                    createEngineer();
                    break;
                case "Intern":
                    createIntern();
                    break;
                default:
                    builtTeam();
            }
        })

    }
    function createEngineer() {
        inquirer.prompt([
            {
                type: "input",
                name: "engineerName",
                message: "What is your name?",
                validate: answer => {
                    if (answer !== "") {
                        return true
                    }
                    return "Please enter at least one character."
                }
            },
            {
                type: "input",
                name: "engineerID",
                message: "What is your Id?"
            },
            {
                type: "input",
                name: "engineerEmail",
                message: "What is your email?"
            },
            {
                type: "input",
                name: "engineerGithub",
                message: "What is your Github?"
            }

        ]).then(function (answers) {
            const engineer = new Engineer(answers.engineerName, answers.engineerID, answers.engineerEmail, answers.engineerGithub)
            teamMembers.push(engineer);
            createTeam();
        })
    }

    function createIntern() {
        inquirer.prompt([
            {
                type: "input",
                name: "internName",
                message: "What is your name?"
            },
            {
                type: "input",
                name: "internID",
                message: "What is your Id?"
            },
            {
                type: "input",
                name: "internEmail",
                message: "What is your email?"
            },
            {
                type: "input",
                name: "internSchool",
                message: "What is your School?"
            }

        ]).then(function (answers) {
            const intern = new Intern(answers.internName, answers.internID, answers.internEmail, answers.internSchool)
            teamMembers.push(intern);
            createTeam();
        })

    }
    function builtTeam() {
        if (!fs.existsSync(OUTPUT_DIR)) {
            fs.mkdirSync(OUTPUT_DIR)
        }
        fs.writeFileSync(outputPath, render(teamMembers), "utf-8")
    }
    createManager();

}
appMenu();