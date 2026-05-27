// ===========================================================
// 제품 데이터 — 이 배열만 수정하면 홈 / 제품 / 주문 페이지가
// 모두 같이 바뀝니다.
// ===========================================================
const PRODUCTS = [
  { id: 'p1', name: '하루 카드 지갑',     desc: '카드 6장과 지폐 한 장이 들어가는 얇은 지갑.',     price: 78000,  stock: '재고 있음', tone: 'tan' },
  { id: 'p2', name: '서한 키 케이스',     desc: '열쇠 네 개와 작은 카드 하나를 위한 가죽 케이스.', price: 52000,  stock: '주문 제작', tone: 'brown' },
  { id: 'p3', name: '낮달 명함 지갑',     desc: '명함과 카드를 함께 정돈하는 슬림한 케이스.',     price: 64000,  stock: '재고 있음', tone: 'caramel' },
  { id: 'p4', name: '고요 노트 커버 A6',  desc: '교체식 A6 노트를 위한 손바느질 가죽 커버.',     price: 96000,  stock: '주문 제작', tone: 'dark' },
  { id: 'p5', name: '솔잎 펜 케이스',     desc: '만년필 한 자루를 위한 두 겹 가죽 케이스.',       price: 42000,  stock: '재고 있음', tone: 'olive' },
  { id: 'p6', name: '먼 길 트래블 월렛',  desc: '여권과 카드, 외화를 한 번에 챙기는 여행용.',     price: 138000, stock: '주문 제작', tone: 'cognac' },
];

const TONES = {
  tan:     ['#c89976', '#8b5a2b', '#5c3a1d'],
  brown:   ['#a06f44', '#6e4422', '#3f2613'],
  caramel: ['#d6a06a', '#9a5e2b', '#5c3a1d'],
  dark:    ['#6e4a2a', '#3f2613', '#241408'],
  olive:   ['#a08654', '#6b5530', '#3a2e15'],
  cognac:  ['#c2783a', '#7d4318', '#46260c'],
};

// 가죽 질감을 흉내 낸 썸네일 SVG 자동 생성
function createThumb(tone) {
  const [c1, c2, c3] = TONES[tone] || TONES.tan;
  return `
    <svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
      <defs>
        <radialGradient id="g_${tone}" cx="35%" cy="30%" r="80%">
          <stop offset="0%" stop-color="${c1}"/>
          <stop offset="55%" stop-color="${c2}"/>
          <stop offset="100%" stop-color="${c3}"/>
        </radialGradient>
        <filter id="grain_${tone}">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="3"/>
          <feColorMatrix values="0 0 0 0 0
                                 0 0 0 0 0
                                 0 0 0 0 0
                                 0 0 0 0.18 0"/>
          <feComposite in2="SourceGraphic" operator="in"/>
        </filter>
      </defs>
      <rect width="400" height="300" fill="url(#g_${tone})"/>
      <rect width="400" height="300" filter="url(#grain_${tone})"/>
      <rect x="40" y="60" width="320" height="180" rx="10"
            fill="none" stroke="#f1e3cc" stroke-width="1.5"
            stroke-dasharray="5 5" opacity="0.85"/>
    </svg>`;
}

function renderProductCards(targetId, items) {
  const grid = document.getElementById(targetId);
  if (!grid) return;
  grid.innerHTML = (items || PRODUCTS).map(p => `
    <article class="card">
      <div class="thumb">${createThumb(p.tone)}</div>
      <div class="body">
        <h3 class="name">${p.name}</h3>
        <p class="desc">${p.desc}</p>
        <div class="price-row">
          <span class="price">${p.price.toLocaleString()}원</span>
          <span class="stock">${p.stock}</span>
        </div>
      </div>
    </article>
  `).join('');
}
