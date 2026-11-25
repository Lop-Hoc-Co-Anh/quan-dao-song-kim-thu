// Bài hát / chant trên đảo: trống giữ nhịp, cả lớp vỗ tay và nói theo.
// - Chant theo unit: "Ball, ball, ball! It's a ball!" (mỗi từ có hình, 1 vòng)
// - Bài chào đầu giờ (Hello) và chào cuối giờ (Goodbye)
// Dùng giọng cô nếu đã ghi (giong_co.js), không thì giọng máy. Mỗi lần mở có mã riêng nên mở lại không bị chạy chồng.
(function () {
  const css = `
.chOv { position: fixed; inset: 0; z-index: 60; background: radial-gradient(circle at 50% 40%, #2C6FB8, #14315C); color: #fff; display: flex; flex-direction: column; align-items: center; justify-content: center; font-family: 'Baloo 2', 'Nunito', Arial, sans-serif; }
.chOv h3 { position: absolute; top: 22px; left: 0; right: 0; text-align: center; margin: 0; font: 800 30px 'Baloo 2'; opacity: .9; }
.chOv .pic { height: 34vh; max-width: 60vw; object-fit: contain; filter: drop-shadow(0 12px 18px rgba(0, 0, 0, .35)); transition: transform .12s; }
.chOv .pic.hit { transform: scale(1.08) rotate(-2deg); }
.chOv .line { font: 800 9vh/1.1 'Baloo 2'; margin-top: 3vh; text-align: center; min-height: 10vh; padding: 0 4vw; text-shadow: 0 6px 0 rgba(0, 0, 0, .25); }
.chOv .beats { display: flex; gap: 2vw; margin-top: 3vh; } .chOv .beats i { width: 3.4vh; height: 3.4vh; border-radius: 50%; background: rgba(255, 255, 255, .25); transition: background .08s, transform .08s; }
.chOv .beats i.on { background: #FFD23F; transform: scale(1.4); }
.chOv .tip { position: absolute; bottom: 20px; font: 700 18px 'Nunito'; opacity: .85; }
.chOv button.x { position: absolute; top: 18px; right: 22px; font: 800 20px 'Baloo 2'; border: 0; border-radius: 14px; padding: 8px 16px; background: #fff; color: #1F2D4A; cursor: pointer; }
.chMenu { display: flex; gap: 3vw; flex-wrap: wrap; justify-content: center; }
.chMenu button { font: 800 4.2vh 'Baloo 2'; border: 0; border-radius: 26px; padding: 3vh 4vw; background: #FFFDF6; color: #1F2D4A; cursor: pointer; box-shadow: 0 8px 0 rgba(0, 0, 0, .25); min-width: 22vw; }
.chMenu button small { display: block; font: 700 2.2vh 'Nunito'; color: #56637F; margin-top: 6px; }
.chMenu button:focus-visible { outline: 6px solid #FFD23F; }`;
  let ov = null, run = 0, AC = null, beatT = 0;
  const wait = (ms, my) => new Promise(r => setTimeout(r, ms)).then(() => my === run);
  function say(t, my, rate = .88) {
    if (my !== run) return Promise.resolve(false);
    if (window.GiongCo && GiongCo.has(t)) return GiongCo.play(t).then(() => my === run);
    return new Promise(res => { if (!window.speechSynthesis) return setTimeout(() => res(my === run), 900); speechSynthesis.cancel(); const u = new SpeechSynthesisUtterance(t); u.lang = 'en-US'; const v = speechSynthesis.getVoices().find(x => /^en/i.test(x.lang)); if (v) u.voice = v; u.rate = rate; u.pitch = 1.15; let d = 0; const f = () => { if (!d) { d = 1; res(my === run); } }; u.onend = f; u.onerror = f; setTimeout(f, 3500 * (window.AmSongKim ? AmSongKim.he() : 1)); speechSynthesis.speak(u); });
  }
  function drum(my) {
    if (!AC) return; let n = 0; const beats = ov.querySelectorAll('.beats i');
    const tick = () => { if (my !== run || !AC || !ov) return; const t = AC.currentTime, o = AC.createOscillator(), g = AC.createGain();
      if (n % 2 === 0) { o.type = 'sine'; o.frequency.setValueAtTime(120, t); o.frequency.exponentialRampToValueAtTime(45, t + .18); g.gain.setValueAtTime(.55, t); g.gain.exponentialRampToValueAtTime(.001, t + .25); }
      else { o.type = 'square'; o.frequency.value = 1800; g.gain.setValueAtTime(.06, t); g.gain.exponentialRampToValueAtTime(.001, t + .05); }
      o.connect(g).connect(AC.destination); o.start(t); o.stop(t + .3);
      beats.forEach((b, i) => b.className = i === n % 4 ? 'on' : ''); const pic = ov.querySelector('.pic'); if (pic && n % 2 === 0) { pic.classList.add('hit'); setTimeout(() => pic.classList.remove('hit'), 120); }
      n++; beatT = setTimeout(tick, 560); };
    tick();
  }
  function close() { run++; clearTimeout(beatT); try { speechSynthesis.cancel(); } catch (e) {} window.GiongCo && GiongCo.stop(); if (AC) { AC.close().catch(() => {}); AC = null; } if (ov) { ov.remove(); ov = null; } removeEventListener('keydown', onKey, true); }
  function onKey(e) { if (e.key === 'Escape') { e.preventDefault(); e.stopImmediatePropagation(); close(); } else if (!ov || !ov.querySelector('.chMenu')) e.stopImmediatePropagation(); else if (e.key !== 'Tab' && e.key !== 'Enter' && e.key !== ' ') e.stopImmediatePropagation(); }
  function shell(title, tip) {
    close(); const my = run;
    if (!document.getElementById('chCss')) { const st = document.createElement('style'); st.id = 'chCss'; st.textContent = css; document.head.appendChild(st); }
    ov = document.createElement('div'); ov.className = 'chOv';
    ov.innerHTML = `<h3>♪ ${title} ♪</h3><button class="x">Đóng (Esc)</button><img class="pic" alt="" hidden><div class="line"></div><div class="beats"><i></i><i></i><i></i><i></i></div><div class="tip">${tip || 'Cả lớp vỗ tay theo nhịp trống và nói to theo nhé!'}</div>`;
    document.body.appendChild(ov); ov.querySelector('button.x').onclick = close; addEventListener('keydown', onKey, true);
    return my;
  }
  const line = t => { if (ov) ov.querySelector('.line').textContent = t; };
  const pic = src => { if (!ov) return; const p = ov.querySelector('.pic'); if (src) { p.hidden = false; p.src = src; } else p.hidden = true; };
  // chant theo unit. words: [{w, img}], answer(w) -> câu trả lời (VD "It's a ball.") hoặc null
  async function play(words, title, answer, opt = {}) {
    const my = shell(title); try { AC = new (window.AudioContext || window.webkitAudioContext)(); } catch (e) {} drum(my);
    const list = words.filter(W => answer(W.w)).slice(0, opt.max || 6);
    line("Let's chant!"); if (!await say("Let's chant!", my, .95) || !await wait(600, my)) return;
    for (let r = 0; r < (opt.rounds || 1); r++) for (const W of list) {
      pic(W.img); const w = W.w.charAt(0).toUpperCase() + W.w.slice(1), a = answer(W.w).replace(/\.$/, '!');
      line(`${w}, ${W.w}, ${W.w}!`); if (!await say(`${w}! ${w}! ${w}!`, my, .95) || !await wait(450, my)) return;
      line(a); if (!await say(a, my) || !await wait(900, my)) return;
    }
    pic(''); line('Great job, everyone!'); if (await say('Great job, everyone!', my, .95)) await wait(1200, my); if (my === run) close();
  }
  // bài hát chào: lines = [{t, img}]
  async function song(title, lines) {
    const my = shell(title, 'Cả lớp vẫy tay, vỗ tay và hát theo nhé!'); try { AC = new (window.AudioContext || window.webkitAudioContext)(); } catch (e) {} drum(my);
    for (const L of lines) { pic(L.img || ''); line(L.t); if (!await say(L.t, my, .9) || !await wait(L.wait || 700, my)) return; }
    if (my === run) { await wait(800, my); if (my === run) close(); }
  }
  // bảng chọn: items = [{label, sub, fn}]
  function menu(title, items) {
    const my = shell(title, 'Bấm chọn bài, Esc để đóng'); ov.querySelector('.beats').hidden = true; ov.querySelector('.line').remove();
    const m = document.createElement('div'); m.className = 'chMenu'; m.innerHTML = items.map((it, i) => `<button data-i="${i}">${it.label}<small>${it.sub || ''}</small></button>`).join('');
    ov.appendChild(m); m.querySelectorAll('button').forEach(b => b.onclick = () => items[+b.dataset.i].fn()); m.querySelector('button').focus();
    return my;
  }
  window.Chant = { play, song, menu, close };
})();
