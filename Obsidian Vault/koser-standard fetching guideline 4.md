## 1. API Endpoint 설정
```tsx
// .env, .env.development, .env.production
// .env 파일에 API Endpoint를 설정합니다.
NEXT_PUBLIC_APP_URI="https://api.instantwebtools.net/v1"  
NEXT_PUBLIC_ADMIN_URI="https://api.instantwebtools.net/v2"  
NEXT_PUBLIC_API_URI="https://api.instantwebtools.net/v3"  
NEXT_PUBLIC_FAKE_URI="https://jsonplaceholder.typicode.com"
```

## 2. API Endpoint 상수화
```tsx
// src/constants/env.ts
// API Endpoint가 필요할 때마다 보일러 플레이트(process.env.)가 발생하기 때문에 환경 변수를 상수로 지정합니다.
export const appURI = process.env.NEXT_PUBLIC_APP_URI;  
export const adminURI = process.env.NEXT_PUBLIC_ADMIN_URI;  
export const apiURI = process.env.NEXT_PUBLIC_API_URI;  
export const fakeURI = process.env.NEXT_PUBLIC_FAKE_URI;
```

## 3. 데이터 페칭 함수 생성
```tsx
// src/services
// 서버 리소스로 접근할 상수화된 API Endpoint 기반 함수를 생성하며, 일반적으로 페이지 단위(main.ts, notice.ts 등)로 파일을 만듭니다.
// 아래는 예시이며, main.ts 파일에서도 확인하실 수 있습니다.
// 1. 상수로 만든 API Endpoint를 불러옵니다. 해당 API Endpoint를 따로 정하지 않는다면 src/services/index.ts에서 초기값으로 지정된 API Endpoint가 기준이 됩니다. 사용법은 3.1. GET 절을 참고하시면 됩니다.
import { authURI } from "@constants/env";

// 2. Axios Instance의 기본 구조를 불러옵니다.
import { axiosBasicInstance } from "@services";

// 3. 서버 통신용 함수를 생성합니다. HTTP Method를 접두사로 함수명을 짓습니다.
// 3.1. GET 
export const getUserInfo = (id: string) => axiosBasicInstance.get(`/user/info/${id}`, {
	baseURL: authURI
});

// 3.2. POST
export const postLogin = (form: {  
  id: string;  
  password: string;
}) => axiosBasicInstance.post('/login', form);

// 3.3. PUT
export const putUpdateUserInfo = (
	id: string,
	form: {
		name: string;
		phone: number;
		address: string;
	},
) => axiosBasicInstance.put(`/user/edit/${id}`, form);

// 3.4. PATCH
export const patchPassword = (password: string) => axiosBasicInstance.patch('/user/password', { password });

// 3.5. DELETE
export deleteAccount = (id: string) => axiosBasicInstance.delete(`/user/delete/${id}`)

// 3.6. 단순 데이터 요청?
export const getUserProfile = () => axiosBasicInstance.get('/user/profile').then((response) => response.data);
```

## 4. 페이지 진입 시 자동 데이터 페칭
```tsx
// page.tsx
import { UserProfile } from "@components/user";
import { getUserProfile } from "@services/user";

export default async function Page() {
	try {
		const { name, image } = await getUserProfile();
		
		return (
			<UserProfile name={name} image={image} />
		)
	} catch (error) {
		console.log(error);
	}
}

```

## 5. useQuery: GET
```tsx
// GET Method는 TanStack Query(v5)의 useQuery hook을 사용합니다. 아래는 기본형으로, 다양한 옵션으로 커스터마이징 가능합니다.
import { useQuery } from "@tanstack/react-query";

const {  
	// 페칭 성공 후 반환 데이터  
	data: userInfoData,  
	// 수동 페칭 메서드  
	refetch: refetchUserInfoData,
	} = useQuery({  
	// queryKey 기반으로 데이터 캐싱을 관리하며, ReactQueryDevtools에서 구분 값으로도 활용합니다.
	queryKey: ["sample-query"],
	
	// Promise 처리가 이뤄지는 실제 데이터 페칭 함수입니다. 3. 함수 생성 설명 중 GET에 해당하는 함수를 예시로 듭니다.
	queryFn: async (id: string) => {  
		const response = await getUserInfo(id);  
		return response?.data;  
	},
	  
	// 아래의 조건부 예시처럼 여신 번호가 없으면 자동 페칭을 막는 것으로 활용할 수 있습니다.  
	enabled: loanNo !== "",  
	
	// 아래처럼 자동 페칭을 막을 수 있습니다. true이면 페이지 진입 후 바로 자동 페칭됩니다.
	enabled: false,
});

return (  
    <>  
      <button type="button" onClick={() => refetchUserInfoData("ryushin0")}>유저 정보 다시 가져오기</button>
      <div>
	      <span>{userInfoData.name}</span>
      </div>
    </>  
  );  
}
```

## 6. useMutation: POST, PUT, PATCH, DELETE
```tsx
// GET Method를 제외한 HTTP Method는 TanStack Query(v5)의 useMutation hook을 사용합니다. 아래는 기본형으로, 다양한 옵션으로 커스터마이징 가능합니다.
import { useMutation } from "@tanstack/react-query";

const {
	// 페칭 성공 후 반환 데이터
	data: loginData,
	// 수동 페칭 메서드
	mutate: mutateLoginData,
	// 초기 상태로 시셋 메서드
	reset: resetLoginData,
} = useMutation({
	// mutationKey 기반으로 데이터 캐싱을 관리하며, ReactQueryDevtools에서 구분 값으로도 활용합니다.
	mutationKey: ["sample-mutation"],
	
	// Promise 처리가 이뤄지는 실제 데이터 페칭 함수입니다. 3. 함수 생성 설명 중 POST에 해당하는 함수를 예시로 듭니다.
	mutationFn: async (form: FormProps) => {
		const response = await postLogin(form);
		return response?.data;
	},
	
	// 요청 성공 시
	onSuccess: () => {
		// 예) 아이디 저장 체크박스 선택 후 로그인 성공 시 local storage에 아이디 저장 로직
	},
	
	// 에러 발생 시
	onError: () => {
		// 예) 에러 알람 토스트 팝업
	},
	
	// 결과 상관 없이 실행
	onSettled () => {
		// 예) 로그인 시도 아이디 로그를 서버로 전송
	},
});

return (  
    <>  
      <button type="button" onClick={() => mutateLoginData(form)}>로그인</button>
      <div>
	      <span>{loginData.name}</span>
      </div>
    </>  
  );  
}
```
