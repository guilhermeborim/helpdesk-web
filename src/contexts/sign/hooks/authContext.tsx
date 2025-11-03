import { AxiosError } from "axios";
import { jwtDecode } from "jwt-decode";
import React, { createContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { api, setAuthToken } from "../../../helpers/api";
import type { Sign } from "../models/sign";
import type { SignFormSchema } from "../schemas";

interface DecodedToken {
  role?: string;
  exp?: number;
  sub?: string;
  email?: string;
}

interface AuthContextProps {
  token: string | null;
  decoded: DecodedToken | null;
  error: string | null;
  signIn: (payload: SignFormSchema) => Promise<void>;
  signInTec: () => Promise<void>;
  signInAdmin: () => Promise<void>;
  signOut: () => void;
}

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext<AuthContextProps | undefined>(
  undefined
);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  const [decoded, setDecoded] = useState<DecodedToken | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (cookies.token) {
      try {
        const decodedToken = jwtDecode<DecodedToken>(cookies.token);
        setDecoded(decodedToken);
        setAuthToken(cookies.token);
      } catch (err) {
        console.error("Token inválido:", err);
        setDecoded(null);
      }
    } else {
      setDecoded(null);
    }
  }, [cookies.token]);

  async function signIn(payload: SignFormSchema) {
    try {
      setError(null);
      const { data } = await api.post<Sign>("/sessions", {
        email: payload.email,
        password: payload.password,
      });

      if (data.token) {
        setCookie("token", data.token, {
          path: "/",
          sameSite: "strict",
          secure: true,
        });
        setAuthToken(data.token);
      }
    } catch (err) {
      if (err instanceof AxiosError) {
        setError(err.response?.data.message || "Erro ao autenticar");
      }
    }
  }

  async function signInAdmin() {
    try {
      setError(null);
      const { data } = await api.post<Sign>("/sessions", {
        email: "admin@gmail.com",
        password: "123456",
      });

      if (data.token) {
        setCookie("token", data.token, {
          path: "/",
          sameSite: "strict",
          secure: true,
        });
        setAuthToken(data.token);
      }
    } catch (err) {
      if (err instanceof AxiosError) {
        setError(err.response?.data.message || "Erro ao autenticar");
      }
    }
  }

  async function signInTec() {
    try {
      setError(null);
      const { data } = await api.post<Sign>("/sessions", {
        email: "tecnico@gmail.com",
        password: "123456",
      });

      if (data.token) {
        setCookie("token", data.token, {
          path: "/",
          sameSite: "strict",
          secure: true,
        });
        setAuthToken(data.token);
      }
    } catch (err) {
      if (err instanceof AxiosError) {
        setError(err.response?.data.message || "Erro ao autenticar");
      }
    }
  }

  function signOut() {
    removeCookie("token", { path: "/" });
    setDecoded(null);
    setAuthToken();
  }

  return (
    <AuthContext.Provider
      value={{
        token: cookies.token || null,
        decoded,
        error,
        signIn,
        signOut,
        signInTec,
        signInAdmin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
