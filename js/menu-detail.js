//url에서 파라미터 값 가져오기
const urlParams = new URLSearchParams(window.location.search);
//파라미터 값 확인
//-->main페이지에서 가령 HTML/CSS a태그 클릭시 넘어온 주소의 subject를 저장
//--->HTML/CSS클릭시 menu-detail.html의 subject는 HTML/CSS가 됨
const subject = urlParams.get('subject')

const addKey = (key, el) => {
  let temp = `
        <div class="card">
            <a href="watch-avi.html?subject=${key.subject}&title=${key.title}&content=${key.content}&url=${key.url}">
                <span class="subject">${key.subject}</span>
                <span class="title">${key.title}</span>
                <span class="content">${key.content}</span>
                <embed controls=0 src="https://img.youtube.com/vi/${key.url}/maxresdefault.jpg" allowfullscreen></embed>
            </a>
        </div>
    `
  el.insertAdjacentHTML('beforeend', temp)
}

//header밑에 제목 넣기
let header = document.querySelector('header')
let title = `<h3 id="page-title">${subject}</h3>`

header.insertAdjacentHTML('afterend', title)

//key의 subject가 상위에 선언한 subject값과 같을 경우 addKey()함수 실행
const findSubject = (key, subject, el) => {
  if (key.subject == subject) {
    console.log(key.subject)
    addKey(key, el)
  }
}

//avi.subject==subject이면 해당하는 subject의 카드배열을 생성
if (localStorage.length) {
  for (let i = 0; i < localStorage.length; i++) {
    let avi = JSON.parse(localStorage.getItem(i))
    let el = document.querySelector('#wrap')

    findSubject(avi, subject, el)
  }
}

let detail = document.querySelectorAll('.detail')
console.log(subject)
if (subject == detail[5].innerText) console.log('hi')
for (let i = 0; i < detail.length; i++) {
  if (detail[i].innerText == subject)
    detail[i].firstElementChild.style.color = 'rgb(5, 157, 5)'
  detail[i].addEventListener('click', e => {
    detail[i].href = `menu-detail.html?subject=${detail[i].innerText}`
  })
}

if(subject==detail[5].innerText){
    for(let i=0;i<localStorage.length;i++){
        let avi=JSON.parse(localStorage.getItem(i))
        console.log(avi)
        if(avi.isPlayingState){
            let el=document.querySelector('#wrap')

            addKey(avi,el)
        }
    }
}
