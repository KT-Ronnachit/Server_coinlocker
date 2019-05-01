const express = require('express')
const router = express.Router()
const lockercontroller = require('../controller/lockercontroller')


router.post('/login_locker',
    lockercontroller.login_locker(),
    function (req, res) {
        res.status(200).json({
            'success': true,
            message: "รหัสผ่านถูกต้อง",
            result: req.result



        })
    }
)
router.post('/story_locker',
    lockercontroller.story_locker(),
    function (req, res) {
        res.status(200).json({
            'success': true,
            message: "เพิ่มข้อมูลสำเร็จ",
            result: req.result

        })
    }
)

module.exports = router