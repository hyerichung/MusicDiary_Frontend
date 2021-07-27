import { useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import { logoutUser } from "../redux/slices/userSlice";

const useMyInfo = () => {
  const dispatch = useDispatch();
  const { userName, email } = useSelector((state) => state.user.userInfo);
  const [errorMsg, setErrorMsg] = useState("");

  const handleLogoutClick = useCallback(() => {
    try {
      dispatch(logoutUser());
    } catch (err) {
      setErrorMsg(err.message);
    }
  }, [dispatch]);

  return { userName, email, handleLogoutClick, errorMsg };
};

export default useMyInfo;
