// This is the main Node.js source code file of your actor.

// Import Apify SDK. For more information, see https://sdk.apify.com/
const Apify = require('apify');

const { log } = Apify.utils
log.setLevel(log.LEVELS.DEBUG);

const ACTOR_ID = "ZZSmmYX6HEIF7mWCm";
const WAIT_TIMEOUT = 1;
const TASK_TO_BE_TRIGGERED = "HKnDbeiRKCBjqtYEg/my-task";
const FINAL_STATES =  ["SUCCEEDED", "FAILED", "TIMED-OUT", "ABORTED"];
const DATASET_ID = "t0nPrjd9TtkNo5PBu";
const PAGE_SIZE = 100;

async function processResult(task) {
  log.debug("Task state is: " + task.status);

  let internalTask = task;
  while(!FINAL_STATES.includes(internalTask.status)) {
    log.debug("Checking task [" + internalTask.id + "] status ... ");
    internalTask = await Apify.client.acts.getRun(
      {
        actId: ACTOR_ID,
        runId: internalTask.id,
        waitForFinish: WAIT_TIMEOUT
      }
    );

    log.debug("Task", internalTask);
  }

  let result;
  if(internalTask.status == "SUCCEEDED") {
    result = await Apify.openDataset(DATASET_ID, {forceCloud: true});
  } else {
    log.error("Task did not finished successfully. Exiting ...");
    throw "Task did not finished successfully.";
  }

  return result;
}

Apify.main(async () => {
    // Get input of the actor (here only for demonstration purposes).
    const input = await Apify.getInput();
    console.log('Input:', input);

    let invocation = await Apify.callTask(
      TASK_TO_BE_TRIGGERED,
      null,
      {
        memoryMbytes: input.memory,
        waitSecs: WAIT_TIMEOUT
      });

    log.debug("Task invocation returned result", invocation);

    let dataset = await processResult(invocation); // This is dataset
    log.debug("Dataset", dataset);
    if (dataset != undefined && dataset != null) {
      let offset = 0;
      let res = "";
      do {
        var rows = await dataset.getData({format: "csv", offset: offset, limit: PAGE_SIZE});
        log.debug("Data: ", rows);
        res += rows.items;
        offset += PAGE_SIZE;
      } while(rows.count > 0);

      let keyValueStore = await Apify.openKeyValueStore('tutorial-V');
      await keyValueStore.setValue("OUTPUT", res, {contentType: 'text/csv'});
    }

    log.info("Processing finished");
});
