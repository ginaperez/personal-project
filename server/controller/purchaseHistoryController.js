const dbQueries = require('../dbQueries');

module.exports = {
    getUserPurchaseHistory: async (req, res, next) => {
    	if (req.session.user.user_id) {
	        const db = req.app.get('db');
	        const userPurchaseHistory = await dbQueries.getUserPurchaseHistory(db, req.session.user.user_id);
	        if (userPurchaseHistory) {
	        	res.status(200).send(userPurchaseHistory);
	        } else {
	        	res.status(200).send([]);
	        }
    	} else {
    		res.status(401).send('You are not authorized to view this information');
    	}
    }
}
