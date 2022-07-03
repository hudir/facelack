import React, { useContext, useState } from "react";
import { Context } from "../../store/Context";
import { Modal, Input, Row, Checkbox, Button, Text } from "@nextui-org/react";
import { Mail } from "./Mail";
import { Password } from "./Password";

export default function SignUp({
  setSignUp,
  open,
  setOpen,
  handleClickOpen,
  handler,
  visible,
  closeHandler,
}) {
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

  return (
    <div>
      <form onSubmit={signUpHandler}>
        <Modal
          closeButton
          blur
          aria-labelledby="modal-title"
          open={visible}
          onClose={closeHandler}
        >
          <Modal.Header>
            <Text id="modal-title" size={18}>
              <Text>
                {" "}
                <h3>Please enter your username and password</h3>
              </Text>
            </Text>
          </Modal.Header>
          <Modal.Body>
            <Input
            aria-label="username"
              type="text"
              value={newUserName}
              onChange={(e) => setNewUserName(e.target.value)}
              required
              clearable
              bordered
              fullWidth
              color="primary"
              size="lg"
              placeholder="Username"
              contentLeft={<Mail fill="currentColor" />}
            />
            <Input
            aria-label="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              type="password"
              clearable
              bordered
              fullWidth
              color="primary"
              size="lg"
              placeholder="Password"
              contentLeft={<Password fill="currentColor" />}
            />
            <Row justify="space-between">
              <Checkbox>
                <Text size={14}>Remember me</Text>
              </Checkbox>
              <Text size={14}>
                <small>please use a simple password like 123</small>{" "}
              </Text>
            </Row>
            {userExists && (
              <p>The User Name Already exists, please try another</p>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button auto flat color="error" onClick={closeHandler}>
              Close
            </Button>
            <Button auto type="submit" onClick={signUpHandler}>
              Sign in
            </Button>
          </Modal.Footer>
        </Modal>
      </form>
    </div>
  );
}
