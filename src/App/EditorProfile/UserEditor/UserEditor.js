import style from "./style.module.css"
import React, {useState} from "react";
import TextField from "@material-ui/core/TextField";
import InputUser from "../../../images/InputUsers.png"
import InputEmail from "../../../images/VectorMail.png"
import InputPhone from "../../../images/VectorPhone.png"
import {Button} from "@material-ui/core";
import TransitionsModal from "./Modal/TransitionsModal";

const UserEditor = (props) => {

    let [useName, setUseName] = useState("");
    let [useEmail, setUseEmail] = useState("");
    let [usePhone, setUsePhone] = useState("");
    let [useNameValidate, setUseNameValidate] = useState(true);
    let [useEmailValidate, setUseEmailValidate] = useState(true);
    let [usePhoneValidate, setUsePhoneValidate] = useState(true);
    const [modalSuccess, setModalSuccess] = useState(true)
    const [successText, setSuccessText] = useState("")

    const [open, setOpen] = React.useState(false);
    const handleOpen = (e) => {
        e.preventDefault()
        setOpen(true);
    };
    // закрытие модального окна
    const handleClose = (info = false) => {

        setOpen(false);

        setModalSuccess(true)

        if (successText == "Данные успешно сохранены" || info === true ) {
            props.editorProfile()
        }
    };
    // сохранение данных и отправка на сервер
    const preventDef = (e) => {
        e.preventDefault()

        if (usePhone !== "" && useEmail !== "" && useName !== "") {
            const form = {
                name: useName,
                email: useEmail,
                phone: usePhone
            };
            props.getFormData(form)
            setSuccessText("Данные успешно сохранены")

            setTimeout(()=>{
                handleClose(true)
            },4000)
            
        } else {
            setSuccessText("Неправильный ввод данных")
        }
    }

// валидаторы
    const validatorNumber = (e) => {
        let reg = /^(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/;
        let phone = e.target.value;
        let valid = reg.test(phone);
        if (valid) {
            setUsePhone(e.target.value)
            setUsePhoneValidate(true)
        } else {
            setUsePhoneValidate(false)
        }
    }
    const validatorEmail = (e) => {
        let reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
        let email = e.target.value;
        let valid = reg.test(email);
        if (valid) {
            setUseEmail(e.target.value)
            setUseEmailValidate(true)
        } else {
            setUseEmailValidate(false)
        }
    }
    const validatorName = (e) => {
        let reg = /^[А-Яа-я]* [А-Яа-я]*$/;
        let name = e.target.value;
        let valid = reg.test(name);
        if (valid) {
            setUseName(e.target.value)
            setUseNameValidate(true)
        } else {
            setUseNameValidate(false)
        }
    }

    return (
        <>
            <TransitionsModal open={open}
                              handleClose={handleClose}
                              preventDef={preventDef}
                              modalSuccess={modalSuccess}
                              setModalSuccess={setModalSuccess}
                              successText={successText}
            />

            <div className={style.editorStyle}>
                <form>
                    <div className={style.form}>
                        <div className={style.formInput}>
                            <div className={style.formImg}>
                                <img src={InputUser} alt="logo"/>
                            </div>
                            <TextField
                                style={{width: "254px"}}
                                error={useNameValidate ? false : true}
                                label="Фамилия и Имя"
                                placeholder="Укажите ваши Фамилию и Имя"
                                type="name"
                                variant="outlined"
                                name="name"
                                helperText={useNameValidate ? "" : "Вы неверно указали имя"}
                                onBlur={validatorName}
                            />

                        </div>
                        <div className={style.linearGradientLeft}></div>
                        <div className={style.formInput}>
                            <div className={style.formImg}>
                                <img src={InputEmail} alt=""/>
                            </div>
                            <TextField
                                style={{width: "254px"}}
                                error={useEmailValidate ? false : true}
                                label="E-mail"
                                placeholder="ivanova@mail.ru"
                                variant="outlined"
                                type="email"
                                name="email"
                                helperText={useEmailValidate ? "" : "Вы неверно указали E-mail"}
                                onBlur={validatorEmail}
                            />
                        </div>
                        <div className={style.linearGradientRight}></div>
                        <div className={style.formInput}>
                            <div className={style.formImg}>
                                <img src={InputPhone} alt=""/>
                            </div>
                            <TextField
                                style={{width: "254px"}}
                                error={usePhoneValidate ? false : true}
                                label="Номер телефона"
                                placeholder="Укажите номер телефона"
                                variant="outlined"
                                type="phone"
                                name="phone"
                                helperText={usePhoneValidate ? "" : "Вы неверно указали номер телефона"}
                                onBlur={validatorNumber}
                            />
                        </div>
                    </div>
                    <div className={style.buttonForm}>
                        <Button onClick={handleOpen}
                                color="secondary"
                                type="submit"
                                style={{borderRadius: "50px", textTransform: "none"}}
                                variant="contained" color="primary"
                                className={style.marginButton}>
                            Сохранить изменения
                        </Button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default UserEditor;