import React, { useContext, useState } from "react";
import styled from "styled-components";
import { Context } from "../../store/Context";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Box from "@mui/material/Box";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import FormControl from "@mui/material/FormControl";

import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import FilledInput from "@mui/material/FilledInput";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormHelperText from "@mui/material/FormHelperText";

export default function SignUp({ setSignUp, open, setOpen, handleClickOpen }) {
  const { state, dispatch } = useContext(Context);
  const [newUserName, setNewUserName] = useState(""),
    [newPassword, setNewPassword] = useState(""),
    [userExists, setUserExists] = useState(false);

  const signUpHandler = (e) => {
    e.preventDefault();
    if (state.users.some((el) => el.userName === newUserName)) {
      setUserExists(true);
    } else {
      const ran255 = () => Math.floor(Math.random() * 255);
      const color = `rgba(${ran255()},${ran255()},${ran255()})`;
      dispatch({
        type: "SIGNUP",
        name: newUserName,
        password: newPassword,
        color: color,
      });
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  // For sign up modal
  const [values, setValues] = React.useState({
    amount: "",
    password: "",
    weight: "",
    weightRange: "",
    showPassword: false,
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <div>
      <form onSubmit={signUpHandler}>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitleCont>
          <h3>Please enter your username and password</h3>
        </DialogTitleCont>
        <DialogContent>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              "& > :not(style)": { m: 1 },
            }}
          >
            <TextField
              id="demo-helper-text-misaligned"
              label="Username"
              type="text"
              value={newUserName}
              onChange={(e) => setNewUserName(e.target.value)}
              required
            />
            <FormControl sx={{ m: 1, width: "30ch" }} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">
                Password
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={values.showPassword ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {values.showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
            </FormControl>
          </Box>
              <small style={{display: 'flex', justifyContent: 'flex-end'}}>please use a simple password like 123</small>
              {userExists && <p>The User Name Already exists, please try another</p>}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={signUpHandler} type="submit">Create new account</Button>
        </DialogActions>
      </Dialog>
      </form>
    </div>
    /* <form onSubmit={signUpHandler}>
        <h3>Please enter you userName and password</h3>
        <div>
          UserName:
          <input
            type="text"
            value={newUserName}
            onChange={(e) => setNewUserName(e.target.value)}
            required
          />
        </div>

        <div>
          Password:
          <input
            type="text"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <br />
          <small>please use a simple password like 123</small>
        </div>

        <button type="submit">submit</button>

        {userExists && <p>The User Name Already exists, please try another</p>}
      </form>
      <div onClick={(e) => setSignUp((pre) => !pre)}></div> */
  );
}

// const SignUpContainer = styled.div`
//   position: absolute;
//   height: 100vh;
//   width: 100vw;
//   top: 0;
//   left: 0;
//   background-color: #5f0066e4;
//   color: #ff9900;

//   > div {
//     height: 100vh;
//     width: 100vw;
//   }

//   h3 {
//     font-size: 4.5rem;
//     margin-bottom: 2rem;
//   }
//   form {
//     margin: 0.5rem;
//     font-size: 2rem;
//     position: absolute;
//     top: 50%;
//     left: 50%;
//     transform: translate(-50%, -50%);
//   }
//   input {
//     font-size: 2rem;
//     margin-left: 10px;
//   }
//   div p {
//     font-size: 2rem;
//     margin: 2rem;
//   }

//   button {
//     padding: 10px;
//     font-weight: bold;
//     font-size: 1.5rem;
//     color: var(--slack-color);
//     margin: 1rem;
//     width: 9rem;
//     border-radius: 1rem;

//     :hover {
//       background-color: var(--slack-color);
//       color: orange;
//     }
//   }
// `;

const DialogTitleCont = styled(DialogTitle)`
  text-align: center;
`;
