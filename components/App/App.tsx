import type { ReactNode } from "react";
import css from "./App.module.css";

type AppProps = {
  children: ReactNode;
};

export default function App({ children }: AppProps) {
  return <div className={css.app}>{children}</div>;
}
