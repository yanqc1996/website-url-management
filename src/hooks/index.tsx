import { useNavigate } from "react-router-dom";

export function useNavigateChange(route: string) {
  const navigate = useNavigate();
  return navigate(route);
}
