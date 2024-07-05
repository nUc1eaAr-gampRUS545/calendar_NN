import { useAtom } from "jotai";
import { logInAtom } from "../App";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

export default function ExitButton() {
  const navigate = useNavigate();
  const [, setIsLoggedIn] = useAtom(logInAtom);

  function logout() {
    setIsLoggedIn(false);
    localStorage.clear();
    navigate(`/login`);
  }

  return (
    <div>
      <Button variant="outlined" color="error" onClick={logout}>
        Exit
      </Button>
    </div>
  );
}
