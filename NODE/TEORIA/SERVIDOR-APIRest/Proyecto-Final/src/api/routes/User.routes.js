const { isAuth, isAuthGerente, isAuthAdmin } = require("../../middleware/auth.middleware");
const { upload } = require("../../middleware/files.middleware");
const { registerWithRedirect, sendCode, resendCode, checkNewUser, login, autoLogin, forgotPassword, 
        sendPassword, changePassword, updateUser, deleteUser, getAll } = require("../controllers/User.controllers");

// Primordial
const UserRoutes = require("express").Router();

//?---------------------------------------------------- Rutas simples-------------------------------------------------------------------------------

UserRoutes.post("/registerRedirect", upload.single("image"), registerWithRedirect);
UserRoutes.post("/resend", resendCode);
UserRoutes.post("/checkUser", checkNewUser);
UserRoutes.post("/login", login);
UserRoutes.post("/autoLogin", autoLogin );
UserRoutes.patch("/forgotPassword", forgotPassword );
UserRoutes.get("/getAll/", getAll);

//?------------------------------------------------- Rutas autenticadas----------------------------------------------------------------------------

UserRoutes.patch("/changePassword", [isAuth], changePassword);
UserRoutes.patch("/updateUser", [isAuthAdmin], upload.single("image"), updateUser); //Solo puede actualizar un admin -- Para poder cambiar la imagen debo añadir el multer upload.single
UserRoutes.post("/deleteUser", [isAuthGerente], deleteUser);

//?----------------------------------------- Controladores usados por redirect---------------------------------------------------------------------

UserRoutes.post("/register/sendMail/:id", sendCode);
UserRoutes.patch("/forgot/sendPassword/:id", sendPassword);





module.exports = UserRoutes; 