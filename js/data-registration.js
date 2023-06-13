class CustomUrl {
  constructor(subject, title, content, url) {
    this.subject = subject;
    this.title = title;
    this.content = content;
    this.url = url;
    this.isPlayingState = false;
  }
}
// 유효성 검사 실행
const sumitTest = (e, str) => {
  e.preventDefault();
  alert(str);
}
// submit data의 상태변수
// true일 경우에 동영상 등록 가능
let submitState = false;

document.getElementById("submit-btn").addEventListener("click", (e) => {
  let subject = document.getElementById("subject"),
    title = document.getElementById("title"),
    content = document.getElementById("content"),
    url = document.getElementById("url");
  
  //title,content,url중 각각의 옵션 value가 공백일 때 예외처리 실행
  if(title.value =='')
    // alert() : 모든 브라우저의 동작을 멈춘다.
    // e.prevaentDefault();로 예외 처리 후 alert() 사용
    sumitTest(e, '제목을 입력하세요.');
  else if(content.value =='')
    sumitTest(e, '컨텐츠를 입력하세요.');
  else if(url.value =='')
    sumitTest(e, 'url을 입력하세요.');
  // 모든 예외처리 후 상태변수를 true로 변경
  else 
    submitState = true;
  
  // 상태변수가 참일 경우에 로컬스토리지 저장
  if(submitState) {
    let obj=new CustomUrl(
      subject.value,
      title.value,
      content.value,
      url.value
    );
    //localStorage에 obj 저장-->JSON형식으로 넣어줘야 함
    localStorage.setItem(localStorage.length, JSON.stringify(obj));

    // input 값 초기화
    subject.value='HTML / CSS'
    title.value=''
    content.value=''
    url.value=''
    
    // 확인을 누르면 화면전환
    if(confirm('동영상이 등록되었습니다. 홈화면으로 이동하시겠습니까?')) 
      location.href='./index.html';
  }
});


