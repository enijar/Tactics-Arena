import Register from "../Functions/Auth/Register";

export default async (req, res) => {
    const attempt = await Register(req.body);

    res.setHeader('Content-Type', 'application/json');
    res.status(attempt.status || 520);
    res.send(JSON.stringify({success: attempt.success, errors: attempt.errors || []}));
}
