import UserForm from "../components/UserForm";
import Header from "../components/Header";

function CreateUser() {
  return (
    <div className="p-4">
      <Header/>
      <UserForm />
    </div>
  );
}

export default CreateUser;