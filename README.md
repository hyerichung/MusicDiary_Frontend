# MusicDiary
당신의 하루를 플레이리스트로 표현해주세요

<table>
   <tr>
    <td align="center" valign="top">
      <img width="205" alt="Login" src="https://user-images.githubusercontent.com/64633218/124375154-a3dc3b80-dcdb-11eb-8603-e1fc98f2a7ab.png">
      <p>Login Screen
      </p>
    </td>  
    <td align="center" valign="top">
      <img width="205" alt="Home" src="https://user-images.githubusercontent.com/64633218/124375180-c1a9a080-dcdb-11eb-9d28-5ee4a721ce28.png">
      <p> Home Screen</p>
      <p>: Filter diaries with <br/>current user location (within 50m)</p>    
    </td>
    <td align="center" valign="top">
      <img width="202" alt="Detail" src="https://user-images.githubusercontent.com/64633218/124383650-8c677780-dd08-11eb-9afa-6f0b01f4dc51.png">
      <p>Diary detail screen</p>
      <p>: can play track on the list</p>
    </td>
   </tr>
  <tr>
    <td align="center" valign="top">
      <img width="205" alt="AddTrack" src="https://user-images.githubusercontent.com/64633218/124383921-f9c7d800-dd09-11eb-9a7e-72b3894a180c.png">
      <p>Search track screen</p>
      <p>: Search track and add them to diary</p>
    </td>
    <td align="center" valign="top">
      <img width="207" alt="List" src="https://user-images.githubusercontent.com/64633218/124383596-490d0900-dd08-11eb-8f08-e82c90046095.png">
      <p> Diary List Screen</p>
      <p> : Add new Diary <br/>based on user location</p>
    </td>
    <td align="center" valign="top">
      <img width="205" alt="Calendar" src="https://user-images.githubusercontent.com/64633218/124383926-fd5b5f00-dd09-11eb-9c7e-bc4f51f259d5.png">
      <p> Calendar Screen</p>
      <p> : Show the relevant color on the date<br/>
        based on calculated track energy score</p>
    </td>
  </tr>
<table>

: Demo video: https://drive.google.com/file/d/1cxEUwVZewbHW6DwtVArND5O6QlWS32vq/view?usp=sharing
  

## 프로젝트 설명
* Music Diary는 위치를 기반으로 음악 플레이리스트를 만들어 저장하고, 캘린더와 함께 플레이리스트의 에너지 수치를 시각화하여 볼 수 있는 앱 서비스 입니다.

## 프로젝트 기획 배경
* 저는 음악을 좋아하고, 어디에 있던 음악을 틀어놓거나 듣는 습관이 있습니다.
* 어떤 장소에서 정말 좋은 음악을 들었는데, 그 당시에는 그 음악에 대해 알고 있었지만 시간이 흐른 뒤엔 음악의 멜로디와 분위기만 생각나고 음악의 정보 디테일은 기억나지 않아 정말 아쉬웠던 기억이 있습니다.  
* 내가 머물고 있는 장소를 기반으로 한 플레이리스트를 개인적으로 기록할 수 있도록 만들고 싶었고, 추후 플레이리스트를 다시 보고 듣게 되었을 때 과거를 기억할만한 지표를 음악과 함께 넣어두고 싶었기 때문에 날짜를 기록할 수 있는 '캘린더'와 트랙의 '에너지 수치'라는 것을 함께 활용해 보았습니다.  

## 기술 스택

### Frontend
- React Native (ios)
- Redux
- Redux thunk
- Redux toolkit
- Expo

### Backend
- Express
- Node.js
- Mongoose
- MongoDB Atlas  

## 기능
- 유저의 현재 위치를 기반으로 해당 위치에서 작성된 과거 다이어리 표시
- 유저 현재 위치와 함께 다이어리 플레이리스트 생성
- 트랙 검색
- 플레이리스트에 트랙 추가, 삭제
- 다이어리 플레이리스트 재생
- 다이어리 플레이리스트 에너지 수치 계산, 표시
- 에너지 수치를 기반으로 캘린더 날짜에 색상 표시

## 개발 스케줄링(메인 일정)
🗓 **2021.05.03 ~ 2021.05.21 (총 3주)**

- **1주차**
  - 아이디어 구상, 필요한 기술 스택 서치, 목업 생성
  - 웹에서 React native로 기획 변경

- **2주차**
  - 변경된 기획 기반으로 기술 정보 서치
  - React native navigator, Spotify player 구현

- **3주차**
  - 생성한 플레이리스트 기반으로 캘린더 제작, 색상 입히기 구현
  - 스타일링
  - 테스팅 시도

## 고난
### ✍️ **React native와의 첫 만남**

- 원래 Music Diary 기획의 첫 시작은 '웹 서비스' 였습니다. '시각화'를 기반으로 한 서비스를 기획했기 때문에 웹으로 구현하는 것이 적합하다고 생각했고, 웹을 위해 목업, 스키마, 기술 서치까지 모두 끝낸 상태에서 '위치 기반' 플레이리스트, 제가 경험해보지 못했던 기술 스택이라는 사실만을 바라보고 1주차가 끝나갈 즈음 React native로 기술 스택과 기획 모두를 변경하는 결정을 하게 되었습니다.
- 웹과 React native의 가장 큰 차이점은 스크린 화면이 스택처럼 쌓인다는 점, Navigator의 life cycle, 즉 `componentWillUnmount` 가 다르게 작동한다는 점이었습니다. 기존 screen에서 새로운 screen으로 이동하면 새로운 screen은 mount가 되지만, 기존 screen은 `componentWillUnmount` 가 호출이 되지 않아 여전히 mount 된 상태로 남아있기 때문에 재렌더링이나 cleanup이 필요하다면 별도의 처리 과정이 필요합니다.
- navigator Screen에 옵션에 `unmountOnBlur` 을 적용하여 `componentWillUnmount`를 적용해주기도 하고, `useFocuseEffect`, `useCallback`을 함께 사용하여 스크린 focus 유무에 따른 비동기로직/상태 변화 등을 정리해 주었습니다.

### ✍️ **React thunk, toolkit**
- HomeScreen에서 다이어리 목록 받아오기, 유저의 위치 찾기, 유저 위치에 알맞는 다이어리 필터링하여 보여주기의 비동기 작업을 한꺼번에 다루면서 redux saga가 그리워지는 경험을 하게되었습니다.  
  - 우선 커스텀 훅으로 로직들을 분리하여 액션의 순서를 제어해보았지만, 사가를 사용했다면 조금 더 명확하게 비동기의 흐름을 정하면서 진행할 수 있지 않았을까 생각합니다.
- 이번 프로젝트에서 redux를 도입할 겸 사용해보지 않은 toolkit 또한 thunk와 함께 사용해보았는데, 다음 항목들이 편리하다고 느꼈습니다.
  -  createSlice와 reducers에는 action type, action creator, reducer가 Ducks 패턴 처럼 한꺼번에 들어가 있어 boilerplate가 확연히 줄어 들었다는 점
  -  createReducer에선 immer가 자동으로 내재되어있어 state 불변성을 신경 쓸 필요가 없다는 점

### ✍️ S**potify api**
- 이번 Music Diary 프로젝트의 최종 목적은 '플레이리스트를 시각화' 하는 것이었습니다.  
- Spotify genre seeds api를 이용하여 장르 목록을 찾아보았을 땐 120여개의 장르가 있어 비슷한 장르를 임의대로 구분하여 색상을 부여해서 시각화를 하려는 계획을 가지고 있었지만, 실 데이터를 받아보니 아티스트가 custom 형식으로도 장르를 추가할 수 있었고, 하나의 트랙/아티스트의 장르가 꼭 특정 장르로 구분되어지지 않고 여러개의 광범위한 장르들로 구성되어 있는 경우가 많아 모든 트랙을 유의미하게 구분할 수 없다고 판단하여 트랙의 energy 지수를 이용해 플레이리스트를 시각화하게 되었습니다.
- Spotify 프리미엄 유저같은 경우 api에서 주는 uri로 full 음원을 재생할 수 있다고 생각했지만, 이후 Spotify 자체 sdk를 이용한 player와 연동해서만 full 음원을 재생할 수 있다는 것을 알고 preview url을 재생시키도록 변경하였습니다. 하지만 모든 음원에 preview url이 존재하는 것은 아니였고, 이에 따라 미리 짜둔 expo-av 로직에서 음원 재생이 겹쳐 나오는 등 에러 핸들링을 하는 데 시간을 소요했습니다.

### **TO-DO**
#### 1. LoginButton
- LoginButton 클릭 시, 
  - getAuthCodeAPI()의 반환값을 받은 다음 Spotify 로그인 링크 창이 네이티브 뷰에서 열리기 전까지 기다리지 않고 LoginButton을 다시 중복 클릭한다면, AuthSession.startAsync({})가 중복 요청 금지 warning error을 띄움   
    -> LoginButton 중복 클릭을 방지하기 위해 버튼에 debounce 사용
      : 중복 클릭은 방지하지만 debounce 끝나는 타이밍에 맞춰 클릭했을 시 여전히 재클릭 가능한 이슈   
    -> AuthSession.startAsync({}) 자체의 warning을 { type: "locked" } 반환값을 이용해서 제어하는 방법을 고안해야 함   
    (사가의 takeLatest가 그리워졌다..)   
     [참고] https://docs.expo.io/versions/latest/sdk/auth-session/
- Expo-av
  - currentTrack 재생 중일시, searchTrack의 트랙을 클릭하면 default track url과 겹친다 -> 커스텀 훅으로 로직 정리 요함

## 끝맺음
- 이번 프로젝트를 진행하면서 예상치 못한 기술스택 전환, 정해진 기한 내에 기능을 어디까지 구현하고 완성도에 집중해야 하는가에 대한 딜레마 등 여러가지 에러 사항들이 있었는데 이런 예상치 못한 상황들을 해결해가며 어떤 상황에서든 문제를 해결해가는 과정을 배웠다고 생각합니다.
- 어떤 기술 스택을 사용할지, 어떤 방법으로 문제를 접근할 지, 모두 저의 결정으로 이뤄지고 좋은 결정은 여러가지 경험을 통해 얻게 된다고 생각합니다. 이번 프로젝트가 그런 능력을 기르는 데 좋은 발판이 되었다고 생각하며, 어떤 문제가 닥치든 의연하게 문제를 해결해 나갈 수 있는 개발자가 되고 싶고, 그렇게 되기 위해 끝까지 노력하겠습니다.
