/** @format */

import React, { useEffect, useState } from "react";
import { EMAIL_FOR_SIGNIN, ORIGINAL_DESTINATION } from "./constants";

import { getAuth, sendSignInLinkToEmail } from "firebase/auth";
import styled from "styled-components";
import { actionCodeSettings } from "./init";

const auth = getAuth();

export default function LoginStart() {
  const [email, setEmail] = useState<string>("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (!window.localStorage.getItem(ORIGINAL_DESTINATION)) {
      window.localStorage.setItem(
        ORIGINAL_DESTINATION,
        window.location.pathname
      );
    }
  }, []);

  async function onSubmit() {
    try {
      if (email) {
        await sendSignInLinkToEmail(auth, email, actionCodeSettings);
        console.log({ auth, email, actionCodeSettings });
        window.localStorage.setItem(EMAIL_FOR_SIGNIN, email);
        setIsSubmitted(true);
      }
    } catch (error) {
      console.error({ error });
    }
  }

  if (isSubmitted)
    return <h2>A one-time login link has been sent to your email address.</h2>;

  return (
    <Wrapper>
      <EmailField
        type='text'
        value={email}
        onChange={(v) => setEmail(v.target.value)}
      />
      <Button onClick={async () => onSubmit()}>Login</Button>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 300px;
  margin: auto;
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
`;

const EmailField = styled.input`
  height: 2rem;
  border-radius: 10px;
  border: 1px solid grey;
  padding: 2px 10px;
  font-size: 1.4rem;
  width: calc(100% - 20px);
`;

const Button = styled.button`
  height: 2rem;
  border-radius: 10px;
  border: none;
  background-color: #888;
  color: white;
  font-size: 1rem;
  text-transform: uppercase;
  letter-spacing: 0.4rem;
  font-weight: bolder;
  width: 100%;
  &:hover {
    background-color: #777;
  }
  &:active {
    background-color: #333;
  }
`;
