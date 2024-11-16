import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

const OAuthCallback = () => {
  const [searchParams] = useSearchParams();
  const code = searchParams.get("code");

  useEffect(() => {
    console.log('hello');
  },[code]);
  return <div>Logging in...</div>;
};

export default OAuthCallback;
