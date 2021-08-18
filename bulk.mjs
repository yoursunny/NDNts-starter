import { closeUplinks, openUplinks } from "@ndn/cli-common";
import { Endpoint } from "@ndn/endpoint";
import { Interest } from "@ndn/packet";

(async () => {
await openUplinks();
const endpoint = new Endpoint();

const interests = [];
for (let i = 0; i < 100; ++i) {
  const x = Math.floor(Math.random() * 1000000);
  const y = Math.floor(Math.random() * 1000000);
  const interest = new Interest(`/add/${x}/${y}`);
  interest.mustBeFresh = true;
  interests.push(interest);
}

const t0 = Date.now();
const settled = await Promise.allSettled(
  interests.map((interest) => endpoint.consume(interest, { retx: 5 })),
);
const t1 = Date.now();
const nFulfilled = settled.filter(({ status }) => status === "fulfilled").length;
console.log(`${nFulfilled} fulfilled in ${t1 - t0}ms`);

closeUplinks();
})();
