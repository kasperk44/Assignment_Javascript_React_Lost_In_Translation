import ProfileTranslationHistoryItem from "./ProfileTranslationHistoryItem";

const ProfileTranslationHistory = ({ translations }) => {
  const translationList = translations.map((translation, index) => (
    <ProfileTranslationHistoryItem
      key={index + "-" + translation}
      translation={translation}
    />
  ));
  return (
    <section>
      <h2>Your translation history</h2>
      {translationList.slice(Math.max(translationList.length - 10, 0))}
    </section>
  );
};
export default ProfileTranslationHistory;
