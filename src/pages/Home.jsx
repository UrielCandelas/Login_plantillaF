import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/Auth.context";
import { useEffect } from "react";

function Home() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/main");
    }
  }, [isAuthenticated]);
  return (
    <main>
      <Header />
    </main>
  );
}

export default Home;
