```tsx
// {string} htmlFor         - 라벨링할 id, 값 존재 유무에 따라 분기  
// {ReactNode} children?    - 인풋 컴포넌트 렌더링
// {string} labelText       - 라벨 텍스트 
// {boolean} hasFocus?      - 포커스 시 메시지 노출
// {boolean} hasError?      - 에러 시 메시지 노출

{!!htmlFor &&
	<label>
		// children: input component
		<input>
		
		// component: focus, error message
		{hasError || hasFocus ? <Message /> : null}
	</label>
}

{htmlFor && 
	<label>{labelText}</label>
	<input>
	<span>
}
```