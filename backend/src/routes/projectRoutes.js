const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');
const authMiddleware = require('../middleware/authMiddleware');

// All routes are protected
router.use(authMiddleware);

router.post('/', projectController.saveProject);
router.get('/', projectController.getUserProjects);
router.get('/:id', projectController.getProjectById);

module.exports = router;
