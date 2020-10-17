import React, {useEffect, useState} from "react";
import Container from "@material-ui/core/Container";
import App from "./App/App";

let AppContainer = () => {

  useEffect(() => {
    if (localStorage.getItem("User") !== null) {
      let users = JSON.parse(localStorage.getItem("User"))
      setUserName(users.name)
      setEmail(users.email)
      setPhone(users.phone)
    }
  }, []);

  let [fullName, setUserName] = useState("Дроздов Никита")
  let [email, setEmail] = useState("Drozdov@mail.ru")
  let [phone, setPhone] = useState("Укажите номер телефона")
  let userName = fullName.split(" ");
  let name = `${userName[0]} ${userName[1][0]}.`

  const [option, setOption] = useState(true)
  const editorProfile = () => {
    setOption(!option)
  }

  // Сохранение данных в localStorage и отправка на сервер
  const getFormData = (formData) => {

    localStorage.setItem("User", JSON.stringify(formData))
    setUserName(formData.name)
    setEmail(formData.email)
    setPhone(formData.phone)
    // fetch("http://jsonplaceholder.typicode.com/posts", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //     'x-token-access': 'random'
    //   },
    //
    //   body: JSON.stringify(formData)
    // })
    //     .then(data => data.json())
    //     .then(data => {
    //       console.log(data)
    //     })
  }
  return (
      <>
        <Container>
          <App name={name}
               fullName={fullName}
               phone={phone}
               option={option}
               editorProfile={editorProfile}
               getFormData={getFormData}
               email={email}

          />
        </Container>
      </>
  )
}

export default AppContainer;
