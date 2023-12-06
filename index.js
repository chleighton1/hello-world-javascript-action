const core = require("@actions/core");
const github = require("@actions/github");
const { Client } = require("@notionhq/client");
require("dotenv").config();

const notion = new Client({ auth: process.env.NOTION_API_KEY });

// async function getCurrentSprint(SPRINT_DB_ID) {
//   const response = await notion.databases.query({
//     database_id: SPRINT_DB_ID,
//   });
//   const currentSprint = response.results.find((sprint) => {
//     return sprint.properties["Sprint status"].status.id === "current";
//   });
//   return currentSprint;
// }

async function getTaskDB(TASK_DB_ID) {
  const response = await notion.databases.query({
    database_id: TASK_DB_ID,
  });

  return response;
}

const number = 567;

getTaskDB(process.env.TASK_DB_ID)
  .then((response) => {
    const results = response.results;
    const task = results.find(
      (page) => page.properties["Task ID"].unique_id.number === number
    );
    console.log(task);
  })
  .catch((error) => {
    console.error(error);
  });
try {
  // `who-to-greet` input defined in action metadata file
  const nameToGreet = core.getInput("who-to-greet");
  console.log(`Hello ${nameToGreet}!`);
  const time = new Date().toTimeString();
  core.setOutput("time", time);
  // Get the JSON webhook payload for the event that triggered the workflow
  const payload = JSON.stringify(github.context.payload, undefined, 2);
  console.log(`The event payload: ${payload}`);
} catch (error) {
  core.setFailed(error.message);
}
