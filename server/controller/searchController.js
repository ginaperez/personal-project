// const item = require("database")

module.exports = {
    search: (req, res) => {
        const { category } = req.query;
        if(!category) {
            res.status(200).send(item);
        } else {
            const filteredItems = items.filter(item => item.category === category);
            res.status(200).send(filteredItems);
        }
    }
};