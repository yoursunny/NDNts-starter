import { js, web } from "@yoursunny/xo-config";

/** @type {import("xo").FlatXoConfig} */
const config = [
  js,
  {
    files: ["./src/**/*.js"],
    ...web,
  },
];

export default config;
