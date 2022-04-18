const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const {
  insertUser,
  findUser,
  loginCheck,
  updateUser,
  findAllUser,
  deleteUser,
  searchUser
} = require("../helpers/userHelper");
const { loginSchema, signupSchema } = require("../helpers/validator");
const {
  JWT_ACCESS_TOKEN_SECRET_KEY,
  JWT_REFRESH_TOKEN_SECRET_KEY,
} = require("../config/config");
const { authenticateToken } = require("../middleware/authentication");

router.post("/signup", async (req, res) => {
  try {
    console.log(req.body);
    const result = await signupSchema.validateAsync(req.body);
    insertUser(req.body)
      .then((response) => {
        const accessToken = jwt.sign(
          { email: req.body.email },
          JWT_ACCESS_TOKEN_SECRET_KEY,
          { expiresIn: "1d" }
        );
        const refreshToken = jwt.sign(
          req.body.email,
          JWT_REFRESH_TOKEN_SECRET_KEY
        );
        let userData = { email: response.email, status: response.status };
        res.json({ success: true, accessToken, userData });
      })
      .catch((err) => {
        console.log(err);
        res.json({ success: false, error: err });
      });
  } catch (err) {
    res.json({ success: false, error: err.details[0].message });
  }
});

router.post("/login", async (req, res) => {
  try {
    console.log(req.body);
    const result = await loginSchema.validateAsync(req.body);
    loginCheck(req.body.email, req.body.password).then((response) => {
      const accessToken = jwt.sign(
        { email: req.body.email },
        JWT_ACCESS_TOKEN_SECRET_KEY,
        { expiresIn: "1h" }
      );
      const refreshToken = jwt.sign(
        req.body.email,
        JWT_REFRESH_TOKEN_SECRET_KEY
      );

      let userData = { email: response.email, status: response.status };

      res.json({ success: true, accessToken, userData });
    });
  } catch (err) {
    console.log(err);
    res.json({ success: false, error: err });
  }
});

router.get("/", authenticateToken, (req, res) => {
  console.log("home");
});

router.get("/users", authenticateToken, (req, res) => {
  findAllUser()
    .then((users) => {
      res.json({ success: true, users });
    })
    .catch((err) => {
      res.json({ success: false, error: err });
    });
});

router.post("/editUser", authenticateToken ,(req, res) => {
  console.log(req.body);
  updateUser(req.body).then((response) => {
    console.log(response);
    res.json({ success : true });
  }).catch((err) => {
    console.log(err);
    res.json({ success : false , error : err });
  })
  
});

router.delete("/deleteUser", authenticateToken, (req, res) => {
  console.log(req.body);
  let { id } = req.body;
  deleteUser(id)
    .then((response) => {
      console.log(response);
      res.json({ success: true });
    })
    .catch((err) => {
      res.json({ success: false });
    });
});

router.post("/getUser", authenticateToken, (req, res) => {
  console.log(req.body);
  let { id } = req.body;
  findUser(id)
    .then((userData) => {
      res.json({ success: true, userData });
    })
    .catch((err) => {
      res.json({ sucess: false, error: err });
    });
});

router.post('/searchUser',authenticateToken,(req,res) => {

    console.log(req.body);
    let {search} = req.body;
    searchUser( search ).then((userData) => {

      console.log(userData);
      res.json({ success :true , userData});

    })
    .catch((err) => {

        console.log(err);
        res.json({ success : false });

    })

})

router.post('/addUser',authenticateToken,async(req,res) => {

  try{
    const result = await signupSchema.validateAsync(req.body);
    insertUser(req.body).then((response) => {

      res.json({ success : true });

    }).catch((err) => {

      console.log(err);
      res.json({ success : false });

    })
  }catch(err){
    console.log(err);
    res.json({success: false, error: err.details[0].message});
  }

})


module.exports = router;
