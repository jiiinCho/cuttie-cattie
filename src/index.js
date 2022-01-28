// import.meta.hot -> unable to use typescript
import.meta.hot;
import App from "./components/app";
import Cat from "./components/service/thecat";

const key = __SNOWPACK_ENV__.SNOWPACK_PUBLIC_APP_API_KEY;
console.log("my key");
console.log(key);

const root = document.querySelector("#root");
const cat = new Cat(key);
const app = new App(root, cat);
app.run();
