import { Button } from "@mui/joy";
import UserForm from "../components/UserForm";
import { Link } from "react-router-dom";

function CreateUser() {
  return (
    <div>
      <UserForm />
      <div>
        <Link
          to="/"
          aria-current="page"
          >
          <Button>
            Home
          </Button>
        </Link>
      </div>  
    </div>
  );
}

export default CreateUser;