const { Router } = require("express");

const router = Router();
router.app.get("/", (req, res) => {
  res.json({ msg: "get api" });
});

router.app.put("/", (req, res) => {
  res.json({ msg: "put api" });
});

router.app.post("/", (req, res) => {
  res.json({ msg: "post api" });
});

router.app.delete("/api", (req, res) => {
  res.json({ msg: "delete api" });
  router.app.patch("/", (req, res) => {
    res.json({ msg: "patch api" });
});
module.exports = router;
