import withAuth from "../../hoc/withAuth";
import TranslationForm from "../Translation/Translation";

const Translation = () => {
  return (
    <>
      <section>
        <TranslationForm/>
      </section>
    </>
  );
};
export default withAuth(Translation);
