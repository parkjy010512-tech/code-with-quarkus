document.getElementById('searchForm').addEventListener('submit', function(e) {
e.preventDefault(); // 폼기본동작차단(새로고침)
const query = document.getElementById('searchInput').value.trim();
if (!query) return;
window.open('https://www.google.com/search?q=' + encodeURIComponent(query), '_blank');
});

// ── 챔피언데이터──────────────────────────────────────────────
const CHAMPIONS = [
{ name: '아트록스', engName: 'Aatrox', role: '전사', lane: '탑', img: 'images/Aatrox.png', difficulty: '상' },
{ name: '사일러스', engName: 'Sylas', role: '마법사', lane: '정글/미드', img: 'https://ddragon.leagueoflegends.com/cdn/15.24.1/img/champion/Sylas.png', difficulty: '중' },
{ name: '애니비아', engName: 'Anivia', role: '마법사', lane: '미드', img: 'https://ddragon.leagueoflegends.com/cdn/15.24.1/img/champion/Anivia.png', difficulty: '상' },
{ name: '브라이어', engName: 'Briar', role: '전사', lane: '정글', img: 'https://ddragon.leagueoflegends.com/cdn/15.24.1/img/champion/Briar.png', difficulty: '중' },
{ name: '잭스', engName: 'Jax', role: '전사', lane: '탑', img: 'https://ddragon.leagueoflegends.com/cdn/15.24.1/img/champion/Jax.png', difficulty: '하' },
{ name: '징크스', engName: 'Jinx', role: '원거리딜러', lane: '원딜', img: 'https://ddragon.leagueoflegends.com/cdn/15.24.1/img/champion/Jinx.png', difficulty: '중' },
];

// ── 뉴스데이터──────────────────────────────────────────────
const NEWS = [
{ title: '새로운챔피언출시', desc: '2026 루나레벨이벤트! 신규챔피언과함께하는특별한시즌.', category: '게임업데이트' },
{ title: '패치노트16.4', desc: '챔피언밸런스및아이템업데이트내용을확인하세요.', category: '패치노트' },
];
// ── 검색실행────────────────────────────────────────────────
function performSearch(query) {
const q = query.trim().toLowerCase(); // 앞뒤공백제거, 소문자변환
if (!q) return;
document.getElementById('searchKeywordDisplay').textContent= `"${query}"`; // 검색어인식
// 챔피온데이터에서이름, 영문명, 역할군, 라인중하나라도검색어에포함되면
const champResults= CHAMPIONS.filter(c =>
c.name.includes(q) || c.engName.toLowerCase().includes(q) ||
c.role.includes(q) || c.lane.includes(q)
);
// 뉴스데이터에서제목, 설명, 카테고리중하나라도검색어에포함되면
const newsResults= NEWS.filter(n =>
n.title.toLowerCase().includes(q) || n.desc.toLowerCase().includes(q) || n.category.toLowerCase().includes(q)
)};

const newsList = document.getElementById('newsResultList'); // 검색결과 없는 경우, 있으면 카드 형태 출력
if (newsResults.length === 0) {
  newsList.innerHTML = `
    <div class="no-result">
      <h4>검색결과 없음</h4>
      <p>"${query}"에 해당하는 뉴스가 없습니다.</p>
    </div>`;
} else {
  newsList.innerHTML = newsResults.map(n => `
    <div class="search-result-card p-3">
      <span style="font-size:0.75rem; background:#c8253a; color:#fff; padding:2px 8px; border-radius:3px;">
        ${n.category}
      </span>
      <div style="font-weight:700; font-size:1rem; color:#111; margin-top:8px;">${n.title}</div>
      <div style="color:#555; font-size:0.9rem; margin-top:4px;">${n.desc}</div>
    </div>
  `).join('');
}

switchCategory('champion', document.querySelector('.search-category-item')); // 챔피온 탭이 먼저 보임
document.querySelector('.hero').classList.add('d-none'); // 히어로 섹션 숨김
document.querySelectorAll('section:not(#searchResults)').forEach(s => s.classList.add('d-none')); // 나머지 섹션 숨김
document.getElementById('searchResults').classList.remove('d-none'); // 검색 결과 섹션 보이기

// app.js
function showMainScreen() {
  document.getElementById('resultsSection').style.display = 'none';
  document.getElementById('mainSection').style.display = '';
}

function showResultsScreen() {
  document.getElementById('mainSection').style.display = 'none';
  document.getElementById('resultsSection').style.display = '';
}

function performSearch(q) {
  const trimmed = (q || '').trim();
  if (!trimmed) {
    showMainScreen(); // q가 없거나 공백이면 메인으로
    return;
  }
  // 실제 검색 로직 또는 API 호출
  showResultsScreen();
  // renderResults(...)
}

document.getElementById('searchBtn').addEventListener('click', () => {
  const q = document.getElementById('searchInput').value;
  performSearch(q);
});

document.getElementById('searchInput').addEventListener('keydown', (e) => {
  if (e.key === 'Enter') performSearch(e.target.value);
});
