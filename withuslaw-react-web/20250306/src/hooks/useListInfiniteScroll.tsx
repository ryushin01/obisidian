import { useEffect, useRef, useState } from 'react';

export default function useListInfiniteScroll() {
  const rootRef = useRef<HTMLDivElement>(null);
  const targetRef = useRef<HTMLDivElement>(null);
  const [isInterSecting, setIsInterSecting] = useState(false);
  const [scrollPosition, setScrollPosition] = useState<number>(0);
  const [targetDependency, setTargetDependency] = useState<any>();

  useEffect(() => {

    function onScroll() {
      if(window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        console.log(window.innerHeight , window.scrollY , document.body.offsetHeight);
        setIsInterSecting(true);
        setScrollPosition(window.scrollY)
      }
    }

    window.addEventListener("scroll", onScroll);


    // infinite scroll 적용할 target element
    // const target =
    //   targetRef.current?.children[targetRef.current?.children.length - 1]
    //     .children[
    //     targetRef.current?.children[targetRef.current?.children.length - 1]
    //       .children.length - 1
    //   ];

    // const observer = new IntersectionObserver(
    //   (entries) => {
    //     const lastElement = entries[entries.length - 1];
    //     setIsInterSecting(lastElement.isIntersecting);
    //   },
    //   { root: rootRef.current }
    // );
    // // observe 등록
    // if (target) observer.observe(target);

    return () => {
      //observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return {
    rootRef,
    targetRef,
    isInterSecting,
    scrollPosition,
    setScrollPosition,
    setTargetDependency,
  };
}
