import React from "react";
import {Box, Button, IconButton, InputAdornment, Modal, TextField} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import {useFormik} from "formik";
import * as Yup from "yup";
import {useDispatch} from "react-redux";
import {registerUser} from "../../State/Auth/AuthSlice";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  padding: "8px 0px",
  boder: "none",
  outline: "none",
  boxShadow: 24,
  borderRadius: "16px",
};

const SignupModal = () => {
  const [open, setOpen] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const dispatch = useDispatch();
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required("Full Name is Required")
      .matches(/^\w+\s\w+$/, "Please Enter Full Name"),
    email: Yup.string().email("Invalid email").required("Email is Required"),
    password: Yup.string()
      .required("Password is Required")
      .min(8, "Pasword must be 8 or more characters")
      .matches(/(?=.*[a-z])\w+/, "Password should contain at least one lowercase")
      .matches(/(?=.*[A-Z])\w+/, "Password should contain at least one uppercase")
      .matches(/\d/, "Password should contain at least one number")
      .matches(/[`!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/, "Password should contain at least one special character"),
  });

  const handleSubmit = (values, actions) => {
    dispatch(registerUser(values));
    actions.resetForm();
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: handleSubmit,
  });

  return (
    <div>
      <Button
        fullWidth
        variant="contained"
        size="large"
        onClick={handleOpen}
        sx={{
          borderRadius: "30px",
          py: "7px",
          fontWeight: "bold",
          bgcolor: "#b91c1c",
          "&:hover": {
            backgroundColor: "black",
          },
        }}
      >
        Create Account
      </Button>

      <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box sx={style}>
          <IconButton onClick={handleClose} aria-label="delete" size="small" sx={{marginLeft: "8px"}}>
            <CloseIcon />
          </IconButton>

          <form className="flex flex-col justify-center items-start py-5 px-20" onSubmit={formik.handleSubmit}>
            <div className="w-full space-y-6">
              <h1 className="text-2xl font-bold"> Create your account </h1>

              <TextField
                fullWidth
                id="name"
                name="name"
                label="Full Name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
              />
              <TextField
                fullWidth
                id="email"
                name="email"
                label="Email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
              <TextField
                fullWidth
                id="password"
                name="password"
                label="Password"
                type={showPassword ? "text" : "password"}
                value={formik.values.password}
                onChange={formik.handleChange}
                error={formik.touched.password && Boolean(formik.errors.password)}
                helperText={formik.errors.password ? formik.errors.password : ""}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </div>
            <div className="w-full mt-20 ">
              <Button
                fullWidth
                type="submit"
                variant="contained"
                disabled={!formik.isValid || !formik.dirty}
                sx={{
                  fontWeight: "bold",
                  bgcolor: "#b91c1c",
                  "&:hover": {
                    backgroundColor: "black",
                  },
                }}
              >
                Create Account
              </Button>
            </div>
          </form>
        </Box>
      </Modal>
    </div>
  );
};

export default SignupModal;
