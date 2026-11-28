// Dải lịch tiết bằng hình + "Bạn giúp Pip hôm nay". Góp ý hội đồng quy trình 27-11-2026 (đợt A, mục 4 và 9).
// Chỉ đổi cách dẫn dắt, không đổi giáo án.
// LichTiet.hien('the')  -> hiện vài giây dải 6 bước của tiết, bước đang làm sáng lên (bé biết việc sắp tới, dễ chờ hơn)
// LichTiet.giupPip(key) -> 1–2 bé lần lượt theo danh sách lớp cô đã nhập trong trò chơi; cùng một tiết (key) luôn ra cùng các bé
(function () {
  const B = [['chao', '👋', 'Chào'], ['nghe', '👂', 'Nghe – chạm'], ['the', '🃏', 'Học từ'], ['chant', '👏', 'Chant'], ['choi', '🎮', 'Trò chơi'], ['ve', '🏝', 'Tạm biệt']];
  let el = null, tm = 0;
  function css() {
    const s = document.createElement('style');
    s.textContent = `#lichTiet{position:fixed;left:50%;top:12px;z-index:9998;display:flex;align-items:center;gap:6px;padding:8px 16px;border-radius:999px;background:rgba(255,255,255,.94);box-shadow:0 8px 24px rgba(0,0,0,.25);font-family:'Comic Sans MS','Baloo 2',Arial,sans-serif;pointer-events:none;opacity:0;transform:translate(-50%,-140%);transition:opacity .5s,transform .6s cubic-bezier(.3,1.4,.5,1)}
#lichTiet.hien{opacity:1;transform:translate(-50%,0)}
#lichTiet .lt{display:flex;flex-direction:column;align-items:center;min-width:clamp(54px,6vw,110px);padding:4px 6px;border-radius:18px;transition:transform .4s}
#lichTiet .lt span{font-size:clamp(24px,2.8vw,52px);line-height:1.1;position:relative}
#lichTiet .lt b{font-size:clamp(11px,1.05vw,20px);color:#5B4632;white-space:nowrap}
#lichTiet .lt.xong{opacity:.42}
#lichTiet .lt.xong span::after{content:'✓';position:absolute;right:-.35em;bottom:-.1em;font-size:.5em;color:#2E8B2E;font-weight:700}
#lichTiet .lt.nay{background:#FFE58A;transform:scale(1.18);box-shadow:0 0 0 4px #FFC93C,0 0 22px #FFC93C;animation:ltNhip 1.1s ease-in-out infinite alternate}
#lichTiet i{font-style:normal;color:#C9A57A;font-size:clamp(14px,1.4vw,26px)}
@keyframes ltNhip{to{box-shadow:0 0 0 6px #FFC93C,0 0 34px #FFB000}}
@media (prefers-reduced-motion:reduce){#lichTiet,#lichTiet .lt.nay{transition:none;animation:none}}`;
    document.head.appendChild(s);
  }
  function hien(key, ms) {
    const i = B.findIndex(b => b[0] === key); if (i < 0) return;
    if (!el) { css(); el = document.createElement('div'); el.id = 'lichTiet'; el.setAttribute('aria-hidden', 'true'); document.body.appendChild(el); }
    el.innerHTML = B.map((b, j) => `<div class="lt ${j < i ? 'xong' : j === i ? 'nay' : ''}"><span>${b[1]}</span><b>${b[2]}</b></div>`).join('<i>›</i>');
    clearTimeout(tm); el.classList.remove('hien'); void el.offsetWidth;
    requestAnimationFrame(() => el.classList.add('hien'));
    tm = setTimeout(() => el.classList.remove('hien'), ms || 4500);
  }
  // ---- Bạn giúp Pip: xoay vòng, không chọn theo thành tích; bé nhút nhát (tên có dấu *) luôn làm cùng một bạn ----
  const EMO = /\p{Extended_Pictographic}/u;
  const ky = n => { const m = n.match(EMO); if (m) return m[0]; try { return JSON.parse(localStorage.getItem('songkim_kyhieu') || '{}')[n] || '⭐'; } catch (e) { return '⭐'; } };
  function giupPip(key) {
    try {
      const raw = localStorage.getItem('trochoi_names'); if (!raw) return null;
      const ro = raw.split('\n').map(s => s.trim()).filter(Boolean).map(s => ({ name: s.replace(/\s*\*+\s*$/, '').trim(), shy: /\*\s*$/.test(s) })).filter(k => k.name);
      if (!ro.length) return null;
      const S = JSON.parse(localStorage.getItem('songkim_giup_pip') || '{}');
      if (S.key !== key) { S.i = S.key ? ((S.i || 0) + (S.n || 1)) % ro.length : 0; S.key = key; }
      const i = (S.i || 0) % ro.length, out = [ro[i]];
      if (ro[i].shy) { for (let d = 1; d < ro.length; d++) { const k = ro[(i + d) % ro.length]; if (!k.shy) { out.push(k); break; } } }
      else if (ro.length > 12) out.push(ro[(i + 1) % ro.length]); // lớp đông: 2 bạn
      S.n = out.length; localStorage.setItem('songkim_giup_pip', JSON.stringify(S));
      return out.map(k => `${ky(k.name)} ${k.name.replace(new RegExp(EMO.source, 'gu'), '').replace(/\s+/g, ' ').trim()}`);
    } catch (e) { return null; }
  }
  window.LichTiet = { hien, giupPip, BUOC: B };
})();
