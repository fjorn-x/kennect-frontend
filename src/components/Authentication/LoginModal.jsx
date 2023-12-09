import {Box, Button, IconButton, InputAdornment, Modal, TextField} from "@mui/material";
import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import {useFormik} from "formik";
import * as Yup from "yup";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import {useDispatch} from "react-redux";
import {loginUser} from "../../State/Auth/AuthSlice";

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

const LoginModal = () => {
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (values, actions) => {
    dispatch(loginUser(values));
    actions.resetForm();
  };

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is Required"),
    password: Yup.string().required("Password is Required"),
  });

  const formik = useFormik({
    initialValues: {
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
        variant="outlined"
        onClick={handleOpen}
        size="large"
        sx={{
          borderRadius: "30px",
          color: "#b91c1c",
          py: "7px",
          fontWeight: "bold",
          borderColor: "#b91c1c",
          "&:hover": {
            borderColor: "#b91c1c",
            backgroundColor: "#f5f5f5",
          },
        }}
      >
        Sign In
      </Button>
      <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box sx={style}>
          <IconButton onClick={handleClose} aria-label="delete" size="small" sx={{marginLeft: "8px"}}>
            <CloseIcon />
          </IconButton>

          <form className="flex flex-col justify-center items-center py-5 " onSubmit={formik.handleSubmit}>
            <div className="w-[60%] space-y-6">
              <h1 className="text-2xl font-bold">Enter Your Login Credentials</h1>
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
            <div className="w-[60%] mt-20 ">
              <Button
                type="submit"
                fullWidth
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
                Sign In
              </Button>
            </div>
          </form>
        </Box>
      </Modal>
    </div>
  );
};

export default LoginModal;
