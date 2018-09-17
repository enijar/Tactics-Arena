import express from "express";
import config from "./config/index";

const app = express();

app.use(express.static(config.paths.public));

config.routes(app);

app.listen(config.server.port, () => {
    console.log(`Server running on port ${config.server.port}`);
});
