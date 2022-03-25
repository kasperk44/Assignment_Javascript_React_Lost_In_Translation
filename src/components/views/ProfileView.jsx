import { useUser } from "../../context/UserContext";
import withAuth from "../../hoc/withAuth";
import ProfileActions from "../Profile/ProfileActions";
import ProfileHeader from "../Profile/ProfileHeader";
import ProfileTranslationHistory from "../Profile/ProfileTranslationHistory";

const Profile = () => {
  const { user } = useUser();

  return (
    <>
      <header>
        <img src="img/profile.png" alt="profile"/>
      </header>

      <div className="boxProfile">
        <ProfileHeader username={user.username} />
        <ProfileActions />
      </div>
      <div className="boxProfile1">
        <ProfileTranslationHistory translations={user.translations} />
      </div>
    </>
  );
};
export default withAuth(Profile);
