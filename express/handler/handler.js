const handler = (req, res) => {
    res.send(req.app.locals.title);
};

module.exports = handler;
