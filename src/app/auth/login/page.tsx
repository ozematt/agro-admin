import { LoginForm, LoginInfo } from "@/components";

const LoginPage = () => {
  return (
    <div className="flex min-h-screen">
      <LoginInfo />
      <LoginForm />
    </div>
  );
};

export default LoginPage;
