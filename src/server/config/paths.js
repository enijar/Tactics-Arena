import path from "path";

const base = path.resolve(__dirname, '..', '..', '..');

export default {
    base,
    public: path.join(base, 'public')
}
