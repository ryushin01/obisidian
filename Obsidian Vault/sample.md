```jsx
/**  
 * 반응형 모바일 웹에서 디바이스 네이티브 기능 접근해 카메라 촬영 후 미리보기 기능 및 갤러리 미저장 기능 구현  
 * imgSrc: 갤러리에 저장되지 않고 찍힌 상태로 확대가 가능한 이미지 경로 > base64 파일 타입을 업로드 필요  
 * 추가 기능: pc 해상도에서는 파일 업로드 기능만 노출 > 두 기능 구현 후 해상도마다 조건부 노출 필요  
 */  
const webcamRef = useRef(null);  
  
const [imgSrc, setImgSrc] = useState(null);  
  
const [feedImages, setFeedImages] = useState([]);  
let imageUrlLists = [...feedImages];  
  
const capture = useCallback(() => {  
  const imageSrc = webcamRef.current.getScreenshot();  
  // setImgSrc(imageSrc);  
  
  // const imageLists = e.target.files;  // if (!imageLists) {  
  //   return;  
  // }  
  
  imageUrlLists.push(imageSrc);  
  // for (let i = 0; i < imageSrc.length; i++) {  
  //   // const currentImageUrl = URL.createObjectURL(imageSrc[i]);  
  //   imageUrlLists.push(imageSrc);  
  // }  
  
  setFeedImages(imageUrlLists);  
  
}, [webcamRef, imageUrlLists]);  
  
const videoConstraints = {  
  // facingMode: user(전면 카메라 제어) | environment(후면 카메라 제어)  
  facingMode: "environment"  
}  
  
console.log(imageUrlLists)
```