```tsx
const [height, setHeight] = useState<number>(0)  
  
  useEffect(() => {  
    setHeight(window.visualViewport!.height)  
    const handleResize = () => {  
      setHeight(window.visualViewport!.height)  
    }  
  
    window.addEventListener('resize', handleResize)  
    return () => window.removeEventListener('resize', handleResize)  
  }, [])
```