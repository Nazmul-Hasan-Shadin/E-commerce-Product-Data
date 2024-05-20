"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const config_1 = require("./app/config");
app_1.app.listen(config_1.config.db_url, () => {
    console.log(`Example app listening on port ${config_1.config.port}`);
});
