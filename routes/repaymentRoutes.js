const express = require('express');
const { recordRepayment } = require('../controllers/repaymentController');
const auth = require('../middleware/authMiddleware');

const router = express.Router();


router.post('/loans/:id/repay', auth, recordRepayment);

module.exports = router;
