//url에서 매개변수 값 가져오기
const urlParams = new URLSearchParams(window.location.search),
      //매개변수 값 확인
      keyTitle = urlParams.get("title"),
      subject = urlParams.get("subject"),
      wrap = document.getElementsByClassName('wrap')[0];
      
let avi, index;

for(let i=0; i<localStorage.length; i++) {
    let theme = JSON.parse(localStorage.getItem(i));
    if(keyTitle == theme.title) {
        avi = theme;
        index = i;
    }
}
console.log(avi);
console.log(index);

let template = `
    <article id="url">
        <div>
            <embed id="main-url"
            src="https://www.youtube.com/embed/${avi.url}?showinfo=0&modestbranding=1&rel=0"
            title="YouTube video player" frameborder="0"
            allow="accelerometer; autoplasy; clipboard-wri encrypted-media; gyroscope; picture-in-pictu web-share"
            allowfullscreen></embed>
        </div>
    </article>
    <article id="contents">
        <div>
            <h3>${avi.title}</h3>
            <p>${avi.content}</p>
            <button id="heart"> </button>
        </div>
    </article>
`
wrap.insertAdjacentHTML('beforeend',template);

// 찜한 동영상인 경우와 아닌 경우 버튼의 이미지 변경
const cartButton = document.getElementById('heart');
//if,else 조건문은 기본적으로 if()안의 값이 참인경우에 실행, 거짓일 경우 else 구문을 실행한다. 
//버튼을 스크립트로 삽입했으므로 html파일 로드 후에 cartButton 셋팅
if(avi.isPlayingState) { //avi.isPlayingState의 값이 true인 경우에만 실행
    cartButton.innerHTML = '<i class="fas fa-heart"></i>'; //찜 했을 경우
} else { //avi.isPlayingState의 값이 false일 경우 실행
    cartButton.innerHTML = '<i class="far fa-heart"></i> '; //찜 해제 상태일때 빈 하트 아이콘이 표시됨
}
console.log(avi.isPlayingState)
cartButton.addEventListener('click', () => {
    if(avi.isPlayingState) {
        avi.isPlayingState = false;
        localStorage.setItem(index, JSON.stringify(avi)); //index(key)를 찾아서 덮어씌운다
        //셋팅된 cartButton의 이미지를 변경
        cartButton.innerHTML = '<i class="far fa-heart"></i> ';
    } else {
        avi.isPlayingState = true;
        localStorage.setItem(index, JSON.stringify(avi));
        cartButton.innerHTML = '<i class="fas fa-heart"></i>';
    }
})

// header
let detail=document.querySelectorAll('.detail')
for(let i=0;i<detail.length;i++){
    if(detail[i].innerText==subject) detail[i].firstElementChild.style.color='rgb(5, 157, 5)'
    detail[i].addEventListener('click',e=>{
        for(let j=0;j<localStorage.length;j++){
            let avi=JSON.parse(localStorage.getItem(j))
            detail[i].href=`menu-detail.html?subject=${detail[i].innerText}`

        }
    })
}

//동영상 옆 리스트 생성
const addKey=(key,el)=>{
    let temp=`
            <div class="card">
                <a href="watch-avi.html?subject=${key.subject}&title=${key.title}&content=${key.content}&url=${key.url}">
                    <embed controls=0 src="https://img.youtube.com/vi/${key.url}/maxresdefault.jpg" allowfullscreen></embed>
                    <div class=contents-box>
                        <span class="title">${key.title}</span>
                        <span class="content">${key.content}</span>
                    </div>    
                </a>
            </div>
        `   
    el.insertAdjacentHTML('afterbegin',temp)
}
                    
const findSubject=(key,subject,el)=>{
    if(key.subject==subject){
        addKey(key,el)
    }
}

if(localStorage.length){
    for(let i=0;i<localStorage.length;i++){

        let avi=JSON.parse(localStorage.getItem(i))
        let el=document.querySelector('#list-box')

        findSubject(avi,subject,el)
    }   
}

// 현재 페이지의 title과 card의 title이 같으면 card의 background 속성 변경 
const card = document.querySelectorAll('.card'),
      listTitle = document.querySelectorAll('.title');

for(let i=0; i<listTitle.length; i++) {
    if(keyTitle == listTitle[i].innerText) {
        card[i].style.backgroundColor = '#ddd';
    }
}


