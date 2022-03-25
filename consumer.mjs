import { closeUplinks, openUplinks } from "@ndn/cli-common";
import { Endpoint } from "@ndn/endpoint";
import { Interest } from "@ndn/packet";

// Connect to NFD.
await openUplinks();

const endpoint = new Endpoint();

// Parse x and y from command line arguments.
const [x, y] = process.argv.slice(2);

// Make an Interest packet, asking the producer to compute x+y.
const interest = new Interest(`/add/${x}/${y}`);
interest.mustBeFresh = true;

try {
  // Send the Interest, and wait for Data to come back.
  const data = await endpoint.consume(interest, { retx: 100 });

  // Print the Data payload.
  process.stdout.write(data.content);
} catch (err) {
  // In case of Data retrieval failure, show what went wrong.
  console.warn(err);
}

// Disconnect from NFD, so that Node.js can exit normally.
closeUplinks();
