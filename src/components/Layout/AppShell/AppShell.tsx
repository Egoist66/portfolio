import { ReactNode } from "react";
import Menu from "../Menu/Menu";
import Header from "../Header/Header";
import { useAppContext } from "../../../context/AppContext";

type AppShellProps = {
  children: ReactNode;
};

function AppShell({ children }: AppShellProps) {
  const context = useAppContext();

  return (
    <>
      <Menu />
      <Header hidden={context?.isToggled} />
      {children}
    </>
  );
}

export default AppShell;
