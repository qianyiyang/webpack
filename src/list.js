import "./css/common.css";
import "./css/list.css";
import { printName } from "./common";
import { printAge } from "./commonList";

// console.log($)
printName();
printAge();
console.log("list", "这是list页面");
console.log("list", process.env.NODE_ENV, process.env.apiUrl);
