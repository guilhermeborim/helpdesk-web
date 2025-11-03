import { AxiosError } from "axios";
import React from "react";
import { useNavigate } from "react-router";
import { api } from "../../../helpers/api";
import type { SignupFormSchema } from "../schemas";

export default function useSignup() {
  const navigate = useNavigate();
  const [errorSignup, setErrorSignup] = React.useState("");

  async function signupUser(payload: SignupFormSchema) {
    try {
      setErrorSignup("");
      const { status } = await api.post("/users", {
        name: payload.name,
        email: payload.email,
        password: payload.password,
      });
      if (status === 201) {
        navigate("/");
      }
    } catch (error) {
      if (error instanceof AxiosError)
        setErrorSignup(error.response?.data.message);
    }
  }
  return {
    signupUser,
    errorSignup,
  };
}
