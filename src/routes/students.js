// REST routes for students.
const router = require('express').Router();
const ctrl = require('../controllers/studentController');

router.get('/', ctrl.listStudents);
router.get('/search', ctrl.searchStudent);
router.post('/', ctrl.createStudent);
router.put('/:id', ctrl.updateStudent);
// router.delete('/:id', ctrl.deleteStudent);

module.exports = router;
