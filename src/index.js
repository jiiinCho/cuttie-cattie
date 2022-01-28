import.meta.hot;
import App from "./components/app";
const key = __SNOWPACK_ENV__.SNOWPACK_PUBLIC_ENABLE_FEATURE;
console.log(key);
const root = document.querySelector("#root");
console.log(root);

const app = new App(root);
app.run();
