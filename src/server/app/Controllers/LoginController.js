import Login from "../Functions/Auth/Login";

export default async (req, res) => {
    const attempt = await Login(req.body);

    res.setHeader('Content-Type', 'application/json');
    res.status(attempt.status || 520);
    res.send(JSON.stringify({success: attempt.success, data: attempt.data || null, errors: attempt.errors || []}));
}
