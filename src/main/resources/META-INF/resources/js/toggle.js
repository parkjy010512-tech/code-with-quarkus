function toggleTheme() {
  const body = document.body;
  const btn = document.getElementById('themeToggleBtn'); // ✅ ID 수정
  const navbar = document.querySelector('.navbar');

  body.classList.toggle('light-mode'); // ✅ 점(.) 제거

  if (body.classList.contains('light-mode')) {
    btn.textContent = 'LIGHT';
    navbar.classList.remove('navbar-dark', 'bg-dark');
    navbar.classList.add('navbar-light', 'bg-light');
  } else {
    btn.textContent = 'DARK';
    navbar.classList.remove('navbar-light', 'bg-light');
    navbar.classList.add('navbar-dark', 'bg-dark');
  }
}