```tsx
// {boolean} isContain       - 인풋을 자식으로 삼는지 구분
// {string} htmlFor?         - 라벨링할 id, 없으면 
// {ReactNode} children?
// {boolean} hasError?
// {boolean} hasFocus?

{isContain &&
	<label>
		<input>
		<span>
	</label>
}

{!isContain && 
	<label></label>
	<input>
	<span>
}
```