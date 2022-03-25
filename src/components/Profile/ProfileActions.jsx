import { Link } from "react-router-dom";
import { translationClearHistory } from "../../api/translation";
import { STORAGE_KEY_USER } from "../../const/storageKeys";
import { useUser } from "../../context/UserContext";
import { storageDelete, storageSave } from "../../utils/storage";

const ProfileActions = () => {
  const { user, setUser } = useUser();

  const handleLogoutClick = () => {
    if (window.confirm("Are you sure?")) {
      storageDelete(STORAGE_KEY_USER);
      setUser(null);
    }
  };

  const handleClearHistoryClick = async () => {
    if (!window.confirm("Are you sure?\nThis can not be undone!")) {
      return;
    }

    const [clearError] = await translationClearHistory(user.id);

    if (clearError !== null) {
      return;
    }

    const updateUser = {
      ...user,
      translations: [],
    };

    storageSave(STORAGE_KEY_USER, updateUser);
    setUser(updateUser);
  };

  return (
    <>
      <Link to="/translation">
        <button className="btnProfile">
          Translation
        </button>
      </Link> <br/>
      <button className="btnProfile" onClick={handleClearHistoryClick}>Clear history</button><br/>
      <button className="btnProfile" onClick={handleLogoutClick}>Logout</button><br/>
    </>
  );
};
export default ProfileActions;
