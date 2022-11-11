import React from "react";
import { checkoutActions } from "../../../stores/checkout-slice";
import { useAppDispatch, useAppSelector } from "../../hooks";
import Use_Input from "../../hooks/use-input";

const inputIsValid = (value: string) => value.trim() !== "";

interface IProps {
  setAdressIsClicked: (state: boolean) => void;
}

const CheckoutAddressForm = ({ setAdressIsClicked }: IProps) => {
  const {
    onChangeHandler: firstNameOnChange,
    input: firstNameInput,
    hasError: firstNameHasError,
  } = Use_Input(inputIsValid);
  const {
    onChangeHandler: lastNameOnChange,
    input: lastNameInput,
    hasError: lastNameHasError,
  } = Use_Input(inputIsValid);
  const { onChangeHandler: addressOnChange, input: addressInput, hasError: addressHasError } = Use_Input(inputIsValid);
  const { onChangeHandler: infoOnChange, input: infoInput, hasError: infoHasError } = Use_Input(inputIsValid);
  const { onChangeHandler: pscOnChange, input: pscInput, hasError: pscHasError } = Use_Input(inputIsValid);
  const { onChangeHandler: cityOnChange, input: cityInput, hasError: cityHasError } = Use_Input(inputIsValid);

  const dispatch = useAppDispatch();

  const user = useAppSelector((state) => state.userSlice.user);

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (firstNameHasError || lastNameHasError || addressHasError || infoHasError || pscHasError || cityHasError) {
      return;
    }
    dispatch(
      checkoutActions.addressDeliveryHandler({
        firstName: firstNameInput,
        lastName: lastNameInput,
        address: addressInput,
        info: infoInput,
        psc: pscInput,
        city: cityInput,
      })
    );
    setAdressIsClicked(true);
  };

  return (
    <div>
      <form onSubmit={submitHandler} className="text-[12px] leading-[18px] space-y-[18px]">
        <div>
          <p className="mb-[6px]">Křestní jméno</p>
          <input
            onChange={firstNameOnChange}
            defaultValue={user?.firstName}
            // value={user?.firstName}
            type="text"
            className={"outline_onHover  w-full h-[42px] px-[18px] "}
          />
        </div>
        <div>
          <p className="mb-[6px]">Příjmení</p>
          <input
            onChange={lastNameOnChange}
            type="text"
            className={"outline_onHover  w-full h-[42px] px-[18px] " + (lastNameInput ? "" : "opacity-30")}
          />
        </div>
        <div>
          <p className="mb-[6px]">Adresa</p>
          <input
            onChange={addressOnChange}
            type="text"
            className={"outline_onHover  w-full h-[42px] px-[18px] " + (addressInput ? "" : "opacity-30")}
          />
        </div>
        <div>
          <p className="mb-[6px]">Dodatečné informace pro doručení, max. 30 znaků (Volitelné)</p>
          <input
            onChange={infoOnChange}
            type="text"
            className={"outline_onHover  w-full h-[42px] px-[18px] " + (infoInput ? "" : "opacity-30")}
          />
        </div>
        <div>
          <p className="mb-[6px]">PSČ</p>
          <input
            onChange={pscOnChange}
            type="text"
            className={"outline_onHover  w-full h-[42px] px-[18px] " + (pscInput ? "" : "opacity-30")}
          />
        </div>
        <div>
          <p className="mb-[6px]">Město</p>
          <input
            onChange={cityOnChange}
            type="text"
            className={"outline_onHover  w-full h-[42px] px-[18px] " + (cityInput ? "" : "opacity-30")}
          />
        </div>

        {/* ))} */}

        <p className="text-[16px] leading-[17.6px] font-[700]">Česká republika</p>
        {/* <button>Uložit</button> */}
        <button
          // onClick={() => navigate("/checkout/done")}
          className=" border-2 effect_bg-orange border-[#ff4e00] text-[#ff4e00] text-[#ffff] font-[700] flex-wrap tracking-[0.5px] py-[10px] px-[16px] min-h-[40px] leading-[18px] text-[12px] uppercase w-full "
        >
          Uložit
        </button>
      </form>
    </div>
  );
};

export default CheckoutAddressForm;