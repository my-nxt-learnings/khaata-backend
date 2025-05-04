const express = require('express');
const { recordRepayment } = require('../controllers/repaymentController');
const auth = require('../middleware/authMiddleware');

const router = express.Router();

// POST /loans/:id/repay
router.post('/loans/:id/repay', auth, recordRepayment);

module.exports = router;
