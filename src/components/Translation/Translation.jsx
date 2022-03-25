import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { translationAdd } from "../../api/translation";
import { STORAGE_KEY_USER } from "../../const/storageKeys";
import { useUser } from "../../context/UserContext";
import { storageSave } from "../../utils/storage";
import Navbar from "../Navbar/Navbar";

const TranslationForm = () => {
  const {user, setUser} = useUser();
  const [signImage, setSignImage] = useState([]);
  const [listObject, setListObject] = useState([]);
  const { register, handleSubmit } = useForm();

  useEffect(() => {
    imageList();
  }, []);

  function imageList() {
    let selectedList = [];

    for (let i = 0; i < 26; i++) {
      let alphabet = String.fromCharCode("a".charCodeAt(0) + i);
      let object = { key: alphabet, img_src: "img/" + alphabet + ".png" };
      selectedList.push(object);
    }
    setListObject(selectedList);
  }

  const onSubmit = async (data) => {
    console.log(data.translationInput)
    if(data.translationInput === ""){
      alert('Enter a valid translation.')
    }
    else{
      let lowerCase = data.translationInput.toLowerCase();
      let cleanInput = lowerCase.replace(/[^A-Z ]/ig, "");
  
      let removeChar = lowerCase.replace(/[^A-Z]/ig, "");
      let translationChars = removeChar.split("");
  
      let translationPath = [];
      for (let i = 0; i < translationChars.length; i++) {
        let temp = listObject.find(
          (element) => element.key === translationChars[i]
        );
        translationPath.push(temp.img_src);
      }
  
      const [error, updatedUser] = await translationAdd(user, cleanInput)
      if(error !== null){
        return
      }
  
      storageSave(STORAGE_KEY_USER, updatedUser)
      setUser(updatedUser)
  
      console.log('Error', error)
      console.log('Result', updatedUser)
  
      setSignImage(translationPath);
    }
  };

  return (
    <>
      <Navbar/>
      <header>
        <img src="img/translate.png" alt="translate"/>
      </header>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="box">
        <h2> What do you want to translate?</h2>
          <input
            id="translationInput"
            type="text"
            className="email"
            placeholder="Enter translation"
            {...register("translationInput")}
          />
        <button className="btn" type="submit">Translate</button>
        </div>  
        <div className="box1">
          {signImage.map((image, index) => {
            return (
              <img
                key={index}
                src={image}
                style={{ width: 90, height: 90 }}
                alt=""
              ></img>
            );
          })}
        </div>
      </form>
    </>
  );
};

export default TranslationForm;
