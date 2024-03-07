import { openUplinks } from "@ndn/cli-common";
import { produce } from "@ndn/endpoint";
import { Data } from "@ndn/packet";

// openUplinks() creates a connection to the "uplink", in this case the local NFD forwarder.
// It returns a Promise, so remember to await it.
await openUplinks();

// produce() creates a producer.
// The first argument is the name prefix.
// The second argument is a callback function that is invoked for each incoming Interest;
// this must be an async function that returns a Promise.
produce("/add", async (interest) => {
  console.log(`Got Interest ${interest.name}`);
  // This producer is a calculator. It expects Interest name to have three
  // components: "add", x, and y. If it's not, reject the Interest.
  if (interest.name.length !== 3) {
    console.log("Wrong name length.");
    return;
  }

  // Extract x and y numbers, then compute the sum.
  const x = Number.parseInt(interest.name.at(1).text, 10);
  const y = Number.parseInt(interest.name.at(2).text, 10);
  const sum = x + y;
  console.log(`${x} + ${y} = ${sum}`);

  // Make a Data packet that has the same name as the Interest.
  const data = new Data(interest.name);
  data.freshnessPeriod = 1000;
  data.content = new TextEncoder().encode(`${sum}\n`);

  // Simulate 100 milliseconds processing delay.
  await new Promise((r) => setTimeout(r, 100));

  // Sending the Data is as simple as returning it from the function.
  return data;
},
{ concurrency: 10 },
);

console.log("Producer running, press CTRL+C to stop");
