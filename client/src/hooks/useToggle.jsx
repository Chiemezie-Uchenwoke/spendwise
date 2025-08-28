import { ToggleContext } from "../context/DashboardSmToggleContext/ToggleContext";
import { useContext } from "react";

const useToggle = () => useContext(ToggleContext);

export {useToggle};