const { Router } = require("express");
const { usersGet } = require("../controllers/user");

const router = Router();

router.get("/", usersGet);

router.put("/", (req, res) => {
  res.json({ msg: "put api" });
});

router.post("/", (req, res) => {
  res.json({ msg: "post api" });
});

router.delete("/", (req, res) => {
  res.json({ msg: "delete api" });
});
router.patch("/", (req, res) => {
  res.json({ msg: "patch api" });
});

module.exports = router;
