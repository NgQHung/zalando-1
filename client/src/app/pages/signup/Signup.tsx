import React, { Fragment } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User_signup } from "../../../interfaces/authentication";
import { requestSignup } from "../../../stores/auth-slice";
import { useAppDispatch } from "../../hooks";
import "./Signup.css";
import SIGNUP_FORM from "../../containers/signup/Signup_Form";
import SIGNUP_LOGIN from "../../containers/signup/Signup_Login";

export const Signup = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [typeInput, setTypeInput] = React.useState("");
  const [isClick, setIsClick] = React.useState(false);
  const [checkbox, setCheckbox] = React.useState<any>({
    interest: [],
  });
  const [input, setInput] = React.useState<User_signup>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const onClickHandler = (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
    setIsClick(true);
    setTypeInput(e.currentTarget.name);
  };

  let refInput = React.useRef<any>(null);

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    setInput({ ...input, [name]: value });
  };

  const onChangeCheckboxHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked, value } = e.currentTarget;
    const { interest } = checkbox;

    if (checked) {
      setCheckbox({
        interest: [...interest, value],
      });
    } else {
      setCheckbox({
        interest: interest.filter((e: any) => e !== value),
      });
    }
  };

  const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // console.log({ ...input, interest: checkbox?.interest });
    requestSignup(dispatch, { ...input, interest: checkbox?.interest }, navigate);
  };

  React.useEffect(() => {
    document.addEventListener("mousedown", (e: any) => {
      if (!refInput?.current?.contains(e.currentTarget)) {
        setIsClick(false);
      }
    });
  }, []);

  return (
    <Fragment>
      <div className="px-6 mt-12 mx-auto my-0 max-w-[33.3333%] min-w-[458px] ">
        <SIGNUP_LOGIN />
        <div className="absolute top-[250px] left-0 right-0 h-[1px] w-full bg-[#d0d1d3]" />
        <SIGNUP_FORM
          onSubmitHandler={onSubmitHandler}
          refInput={refInput}
          isClick={isClick}
          typeInput={typeInput}
          onClickHandler={onClickHandler}
          onChangeHandler={onChangeHandler}
          onChangeCheckboxHandler={onChangeCheckboxHandler}
        />
      </div>
    </Fragment>
  );
};
