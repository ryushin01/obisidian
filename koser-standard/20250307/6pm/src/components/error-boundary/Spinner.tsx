import Image from "next/image";
import { SpinnerImage } from "@images";
import "@styles/spinner.css";

/**
 * @name Spinner
 * @version 1.0.0
 * @author 류창선 <zero.ryushin@bankle.co.kr>
 */
const Spinner = () => {
  return (
    <div className="_spinner-backdrop">
      <Image src={SpinnerImage} alt="스피너 아이콘" className="_spinner" />
    </div>
  );
};

export default Spinner;
