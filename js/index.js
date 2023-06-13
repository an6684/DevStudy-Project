const queryAll = el => {
  return document.querySelectorAll(el)
}

const addKey = (key, el) => {
  let temp = `
            <div class="card">
                <a href="watch-avi.html?subject=${key.subject}&title=${key.title}">
                    <span class="subject">${key.subject}</span>
                    <span class="heart"></span>
                    <span class="title">${key.title}</span>
                    <span class="content">${key.content}</span>
                    <embed controls=0 src="https://img.youtube.com/vi/${key.url}/maxresdefault.jpg" allowfullscreen></embed>
                </a>
            </div>
        `
  //temp로 저장한 card 클래스가 나중에 저장된 인덱스값이 맨 처음으로 추가되도록 설정
  el.insertAdjacentHTML('afterbegin', temp)
}

const findSubject = (key, subject, el) => {
  if (key.subject == subject) {
    let card = el.querySelectorAll('.card')
    //브라우저 화면에서 4개까지 보이게 설정-->card.length가 4가 되면 인덱스가 5개이므로
    //맨 처음 저장된 인덱스 값이 삭제되도록 작성
    // console.log(card)
    if (card.length <= 3) {
      addKey(key, el)
    } else if (card.length == 4) {
      //부모 요소에서 card의 맨 마지막 인덱스 삭제
      addKey(key, el)
      el.removeChild(card[card.length - 1])
    }
  }
}

if (localStorage.length) {
  for (let i = 0; i < localStorage.length; i++) {
    let avi = JSON.parse(localStorage.getItem(i))
    // console.log(avi)
    let el = queryAll('.wrap')

    findSubject(avi, 'HTML / CSS', el[0])
    findSubject(avi, 'JavaScript', el[1])
    findSubject(avi, 'DataBase', el[2])
    findSubject(avi, 'JSP', el[3])
    findSubject(avi, 'Spring', el[4])
    // 1. a(.detail)을 클릭했을 때
    // 2. detail[i].innerText를 href값에 대입하여 저장
    let detail = queryAll('.detail')
    for (let i = 0; i < detail.length; i++) {
      detail[i].addEventListener('click', e => {
        detail[i].href = `menu-detail.html?subject=${detail[i].innerText}`
      })
    }
  }
}



