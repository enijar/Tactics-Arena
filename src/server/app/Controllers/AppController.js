import path from "path";
import config from "../../config/index";

export default (req, res) => {
    res.sendFile(path.join(config.paths.public, 'index.html'));
}
