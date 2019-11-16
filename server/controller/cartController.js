module.exports = {
    add: (req, res) => {
        const { id } = req.params;
        let { user } = req.session;

        const index = user.cart.findIndex(item => item.id == id);

        if(index === -1) {
            const selectedItem = item.find(item => item.id == id );

            user.cart.push(selectedItem);
            user.total += selectedItem.price;
        }
        res.status(200).send(user);
    },
    delete: (req, res) => {
        const { id } = req.params;
        const { user } = req.session;

        const index = user.cart.findIndex(item => item.id == id);
        const selectedItem = item.find(item => item.id == id);

        if(index !== -1) {
            user.cart.splice(index, 1);
            user.total -= selectedItem.price;
        }
        res.status(200).send(user);
    },
    checkout: (req, res) => {
        const { user } = req.session;
        console.log(user);
        user.cart = [];
        user.total = 0;

        res.status(200).send(user);
    }
}