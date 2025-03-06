import { useState } from "react";

export default function useCheckBox(): [boolean, TChangeFunc] {
  const [isChecked, setIsChecked] = useState(false);

  const onChangeCheckBox: TChangeFunc = (event) =>
    setIsChecked(event.target.checked);

  return [isChecked, onChangeCheckBox];
}
