import { SignInButton } from "@clerk/clerk-react";
import { Button } from "./components/ui/button";

function home() {
  return (
    <>
      <SignInButton>
        <Button>Click to Begin!</Button>
      </SignInButton>
    </>
  );
}

export default home;
