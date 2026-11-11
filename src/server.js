import { app } from "./index.js";

const port = process.env.PORT;
const host = process.env.HOST;

app.listen(port, () => { console.log(`Server is running on ${host}:${port} 🔥🚀`) });