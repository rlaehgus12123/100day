document.addEventListener('DOMContentLoaded', function() {
    var countSpan = document.querySelector('.counter');
    var count = 0;

    let Maxcount = calculateDays()
    var interval = setInterval(function() {
        count++;
        countSpan.textContent = count;
        if (count === Maxcount) {
            clearInterval(interval);
            explode(100)
            setInterval(function() {
                explode(100); // 파라미터를 전달하여 호출
            }, 4000);
        }
    }, 50);
});

function calculateDays() {
    // 현재 시간(Locale)
    const curr = new Date();

    // UTC 시간 계산
    const utc = curr.getTime() + (curr.getTimezoneOffset() * 60 * 1000);

    // UTC to KST (UTC + 9시간)
    const KR_TIME_DIFF = 9 * 60 * 60 * 1000;
    const kr_curr = new Date(utc + KR_TIME_DIFF);

    // 한국 시간으로 만난 날짜 생성 (2023년 12월 12일)
    const meetDate = new Date(Date.UTC(2023, 11, 11, 15, 0, 0)); // 2023-12-12 00:00:00+09:00

    // 두 날짜 사이의 밀리초 차이 계산
    const timeDifference = kr_curr.getTime() - meetDate.getTime();

    // 밀리초를 일로 변환하여 정수로 반환
    const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

    return daysDifference + 1
}


function createFirework(x, y) {
    const firework = document.createElement('div');
    firework.classList.add('firework');
    firework.style.left = x + 'px';
    firework.style.top = y + 'px';
    document.body.appendChild(firework);

    // Remove the firework element after animation ends
    firework.addEventListener('animationend', () => {
      firework.remove();
    });
}

// Function to create fireworks at random positions
function explode(numberOfFireworks) {
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    for (let i = 0; i < numberOfFireworks; i++) {
      const x = Math.random() * screenWidth;
      const y = Math.random() * screenHeight;
      createFirework(x, y);
    }
}

const textElement = document.getElementById('typewriter-text');
const textContent = textElement.innerText;
const typingSpeed = 20; // 초당 글자 수

function typeText() {
    let charIndex = 0;
    const typingInterval = setInterval(() => {
        textElement.textContent = textContent.slice(0, charIndex);
        charIndex++;
        if (charIndex > textContent.length) {
            clearInterval(typingInterval);
        }
    }, 1000 / typingSpeed);
}

typeText();