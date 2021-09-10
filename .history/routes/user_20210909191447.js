const { Router } = require("express");

const router = Router();
router.app.get("/api", (req, res) => {
  res.json({ msg: "get api" });
});

router.app.put("/api", (req, res) => {
  res.json({ msg: "put api" });
});

router.app.post("/api", (req, res) => {
  res.json({ msg: "post api" });
});

router.app.delete("/api", (req, res) => {
  res.json({ msg: "delete api" });
});
module.exports = router;
