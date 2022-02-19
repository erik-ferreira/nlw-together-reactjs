import { createContext, useState, useEffect, ReactNode } from "react";

import { firebase, auth } from "../services/firebase";

type UserProps = {
  id: string;
  name: string;
  avatar: string;
};

type AuthContextProps = {
  user: UserProps | undefined;
  signInWithGoogle: () => Promise<void>;
};

type AuthContextProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext({} as AuthContextProps);

export function AuthContextProvider(props: AuthContextProviderProps) {
  const [user, setUser] = useState<UserProps>();

  async function signInWithGoogle() {
    try {
      const provider = new firebase.auth.GoogleAuthProvider();

      const response = await auth.signInWithPopup(provider);

      if (response.user) {
        const { displayName, photoURL, uid } = response.user;

        if (!displayName || !photoURL) {
          throw new Error("Missing information from Google Account");
        }

        setUser({ id: uid, name: displayName, avatar: photoURL });
      }
    } catch (err) {
      console.log("Error login with Google");
    }
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        const { displayName, photoURL, uid } = user;

        if (!displayName || !photoURL) {
          throw new Error("Missing information from Google Account");
        }

        setUser({ id: uid, name: displayName, avatar: photoURL });
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, signInWithGoogle }}>
      {props.children}
    </AuthContext.Provider>
  );
}
