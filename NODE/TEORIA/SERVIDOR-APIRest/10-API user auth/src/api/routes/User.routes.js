const { isAuth, isAuthAdmin } = require("../../middleware/auth.middleware");
const { upload } = require("../../middleware/files.middleware");
const { registerLargo, registerWithRedirect, sendCode, resendCode, checkNewUser, login, autoLogin, 
        forgotPassword, sendPassword, exampleAuth, changePassword, updateUser, deleteUser } = require("../controllers/User.controllers");

const UserRoutes = require("express").Router();
UserRoutes.post("/registerLargo", upload.single("image"), registerLargo);
UserRoutes.post("/registerRedirect", upload.single("image"), registerWithRedirect); // Este es el redirect con sendCode
UserRoutes.post("/resend", resendCode);
UserRoutes.post("/check", checkNewUser);
UserRoutes.post("/login", login);
UserRoutes.post("/autoLogin", autoLogin);

UserRoutes.patch("/forgotPassword", forgotPassword); //Este es el redirect con sendPassword

//?------------Rutas autenticadas---------------------------------------------------------
UserRoutes.get("/pruebas", [isAuthAdmin], exampleAuth);
UserRoutes.patch("/changePassword", [isAuth], changePassword);
UserRoutes.patch("/update", [isAuth], updateUser);
UserRoutes.delete("/delete", [isAuth], deleteUser);


//?------------Controladores usados por redirect-------------------------------------------
UserRoutes.post("/register/sendMail/:id", sendCode);
UserRoutes.patch("/forgotPassword/sendPassword/:id", sendPassword);

module.exports = UserRoutes;
