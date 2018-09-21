export default (req, res) => {
    console.log(req.body);

    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({}));
}
