import { connectToNetwork } from "@ndn/autoconfig";
import { Endpoint } from "@ndn/endpoint";
import { AltUri, Interest, Name } from "@ndn/packet";
import { delay } from "@ndn/util";

async function ping(evt) {
  evt.preventDefault();
  // Disable the submit button during function execution.
  const $button = document.querySelector("#app_button");
  $button.disabled = true;

  try {
    // Construct the name prefix <user-input>+/ping .
    const prefix = new Name(document.querySelector("#app_prefix").value).append("ping");
    const $log = document.querySelector("#app_log");
    $log.textContent = `ping ${AltUri.ofName(prefix)}\n`;

    const endpoint = new Endpoint();
    // Generate a random number as initial sequence number.
    let seqNum = Math.trunc(Math.random() * 1e8);
    for (let i = 0; i < 4; ++i) {
      ++seqNum;
      // Construct an Interest with prefix + seqNum.
      const interest = new Interest(prefix.append(`${seqNum}`),
        Interest.MustBeFresh, Interest.Lifetime(1000));
      const t0 = Date.now();
      try {
        // Retrieve Data and compute round-trip time.
        const data = await endpoint.consume(interest);
        const rtt = Date.now() - t0;
        $log.textContent += `\n${AltUri.ofName(data.name)} rtt=${rtt}ms`;
      } catch {
        // Report Data retrieval error.
        $log.textContent += `\n${AltUri.ofName(interest.name)} timeout`;
      }

      // Delay 500ms before sending the next Interest.
      await delay(500);
    }
  } finally {
    // Re-enable the submit button.
    $button.disabled = false;
  }
}

async function main() {
  // Connect to the global NDN network in one line.
  // This function queries the NDN-FCH service, and connects to the nearest router.
  await connectToNetwork();

  // Enable the form after connection succeeded.
  document.querySelector("#app_button").disabled = false;
  document.querySelector("#app_form").addEventListener("submit", ping);
}

window.addEventListener("load", main);
