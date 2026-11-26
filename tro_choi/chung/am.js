// Giọng đọc dự phòng: máy nào không đọc được tiếng Anh (iPhone/iPad, Safari, máy chưa cài giọng tiếng Anh)
// thì phát các đoạn âm thanh làm sẵn trong thư mục am/ (giọng nữ tiếng Anh, tách theo dấu câu).
// Nạp file này TRƯỚC mọi script khác: nó thay speechSynthesis / SpeechSynthesisUtterance nên không phải sửa các trò.
// Cô ép chế độ bằng localStorage 'songkim_giong' = 'may' (giọng máy) | 'file' (file làm sẵn) | 'auto' (mặc định).
(function () {
  if (window.__amSongKim) return; window.__amSongKim = true;
  const NS = window.speechSynthesis || null, NU = window.SpeechSynthesisUtterance || null;
  const BASE = new URL('../../am/', (document.currentScript && document.currentScript.src) || location.href).href;
  const ua = navigator.userAgent || '';
  const APPLE = /iPhone|iPad|iPod/.test(ua) || (/Macintosh/.test(ua) && navigator.maxTouchPoints > 1) || /^((?!chrome|android|crios|fxios|edg).)*safari/i.test(ua);
  const ep = () => { try { return localStorage.getItem('songkim_giong') || 'auto'; } catch (e) { return 'auto'; } };
  const nativeEn = () => { try { return !!NS && NS.getVoices().some(v => /^en/i.test(v.lang)); } catch (e) { return false; } };
  const fileMode = () => { const m = ep(); return m === 'file' ? true : m === 'may' ? !NS : (!NS || APPLE || !nativeEn()); };
  // đọc chậm cho bé nghe kịp: localStorage 'songkim_cham' = '1'
  const cham = () => { try { return localStorage.getItem('songkim_cham') === '1'; } catch (e) { return false; } };
  const split = t => (String(t).match(/[^,.!?;:–]+[,.!?;:–]*/g) || []).map(x => x.trim()).filter(x => /[a-z]/i.test(x));
  const slug = t => t.toLowerCase().replace(/[’']/g, '').replace(/[^a-z0-9]+/g, '_').replace(/^_|_$/g, '');
  let IDX = null; const idxP = fetch(BASE + 'index.json').then(r => r.json()).then(a => (IDX = new Set(a))).catch(() => (IDX = new Set()));
  let AC = null; const buf = new Map();
  const ctx = () => { if (!AC) { const C = window.AudioContext || window.webkitAudioContext; if (!C) return null; AC = new C(); } if (AC.state === 'suspended') AC.resume().catch(() => {}); return AC; };
  // mở khoá âm thanh ở lần chạm / bấm phím đầu tiên (iPhone chỉ cho phát sau thao tác của người dùng)
  const unlock = () => {
    try { if (navigator.audioSession) navigator.audioSession.type = 'playback'; } catch (e) {}
    const a = ctx(); if (a) { const s = a.createBufferSource(); s.buffer = a.createBuffer(1, 1, 22050); s.connect(a.destination); s.start(0); }
    try { if (NS && NU && APPLE) { const u = new NU(' '); u.volume = 0; NS.speak(u); } } catch (e) {}
  };
  ['pointerdown', 'touchend', 'keydown', 'click'].forEach(ev => addEventListener(ev, unlock, { capture: true, passive: true }));
  const load = k => { if (buf.has(k)) return buf.get(k); const p = fetch(BASE + k + '.wav').then(r => r.arrayBuffer()).then(ab => new Promise((res, rej) => { const a = ctx(); if (!a) return rej(); a.decodeAudioData(ab, res, rej); })).catch(() => null); buf.set(k, p); return p; };
  // câu giả (giữ các thuộc tính như câu thật)
  class U {
    constructor(text) { this.text = text == null ? '' : String(text); this.lang = ''; this.voice = null; this.rate = 1; this.pitch = 1; this.volume = 1; this.onstart = this.onend = this.onerror = this.onboundary = this.onpause = this.onresume = this.onmark = null; this._l = {}; }
    addEventListener(t, f) { (this._l[t] = this._l[t] || []).push(f); }
    removeEventListener(t, f) { this._l[t] = (this._l[t] || []).filter(x => x !== f); }
    _fire(t) { const e = { type: t, utterance: this, charIndex: 0, elapsedTime: 0 }; try { this['on' + t] && this['on' + t](e); } catch (x) { console.error(x); } (this._l[t] || []).forEach(f => { try { f(e); } catch (x) { console.error(x); } }); }
  }
  let tok = 0, src = null, cur = null, speaking = false;
  function stopFile() { tok++; if (src) { try { src.stop(); } catch (e) {} src = null; } if (cur) { const u = cur; cur = null; speaking = false; u._fire('end'); } }
  function nativeSpeak(u) {
    if (!NS || !NU) { setTimeout(() => u._fire('end'), 0); return; }
    if (u._slow) { const parts = split(u.text); if (parts.length > 1) return nativeSeq(u, parts); } // đọc chậm: từng cụm, nghỉ giữa các cụm
    const n = new NU(u.text); n.lang = u.lang || 'en-US'; n.rate = u.rate; n.pitch = u.pitch; n.volume = u.volume;
    if (u.voice && window.SpeechSynthesisVoice && u.voice instanceof window.SpeechSynthesisVoice) n.voice = u.voice;
    ['start', 'end', 'error', 'boundary'].forEach(t => n['on' + t] = () => u._fire(t)); NS.speak(n);
  }
  let seqTok = 0;
  function nativeSeq(u, parts) { const my = ++seqTok; let i = 0; u._fire('start');
    const next = () => { if (my !== seqTok) return; if (i >= parts.length) return u._fire('end'); const n = new NU(parts[i++]); n.lang = u.lang || 'en-US'; n.rate = u.rate; n.pitch = 1; n.volume = u.volume;
      if (u.voice && window.SpeechSynthesisVoice && u.voice instanceof window.SpeechSynthesisVoice) n.voice = u.voice;
      n.onend = n.onerror = () => setTimeout(next, 420); NS.speak(n); };
    next(); }
  async function fileSpeak(u) {
    stopFile(); const my = tok; cur = u; speaking = true; await idxP;
    const keys = split(u.text).map(slug).filter(k => IDX.has(k));
    if (!keys.length) { cur = null; speaking = false; if (NS && nativeEn() && ep() !== 'file') return nativeSpeak(u); setTimeout(() => u._fire('end'), 0); return; }
    keys.slice(0, 3).forEach(load); u._fire('start');
    for (let i = 0; i < keys.length; i++) {
      if (my !== tok) return; if (keys[i + 1]) load(keys[i + 1]);
      const b = await load(keys[i]); if (my !== tok) return; if (!b) continue;
      await new Promise(res => { const a = ctx(); const s = src = a.createBufferSource(); s.buffer = b; const sl = u._slow ? .88 : 1; s.playbackRate.value = sl; const g = a.createGain(); g.gain.value = u.volume == null ? 1 : u.volume; s.connect(g).connect(a.destination); s.onended = res; s.start(); setTimeout(res, b.duration * 1000 / sl + 400); });
      if (my !== tok) return; await new Promise(r => setTimeout(r, u._slow ? 450 : 90));
    }
    if (my !== tok) return; src = null; cur = null; speaking = false; u._fire('end');
  }
  const FAKE_VOICE = { name: 'Song Kim (giọng làm sẵn)', lang: 'en-US', localService: true, default: false, voiceURI: 'songkim' };
  const SS = {
    speak(u) { if (!(u instanceof U)) { const x = new U(u && u.text); Object.assign(x, u || {}); u = x; } const vi = u.lang && !/^en/i.test(u.lang); if (!vi && (u._forceSlow || cham()) && !u._slow) { u._slow = true; u.rate = Math.max(.6, (u.rate || 1) * .82); u.pitch = 1; } if (!vi && fileMode()) fileSpeak(u); else { stopFile(); nativeSpeak(u); } },
    cancel() { stopFile(); seqTok++; if (NS) NS.cancel(); },
    pause() { if (NS) NS.pause(); }, resume() { if (NS) NS.resume(); },
    getVoices() { const v = NS ? NS.getVoices() : []; return fileMode() ? [FAKE_VOICE].concat(v) : v; },
    get speaking() { return speaking || (!!NS && NS.speaking); }, get pending() { return !!NS && NS.pending; }, get paused() { return !!NS && NS.paused; },
    get onvoiceschanged() { return NS ? NS.onvoiceschanged : null; }, set onvoiceschanged(f) { if (NS) NS.onvoiceschanged = f; this._ovc = f; },
    addEventListener(t, f) { if (NS) NS.addEventListener(t, f); }, removeEventListener(t, f) { if (NS) NS.removeEventListener(t, f); },
  };
  try { Object.defineProperty(window, 'speechSynthesis', { value: SS, configurable: true, writable: true }); } catch (e) { try { window.speechSynthesis = SS; } catch (x) {} }
  try { Object.defineProperty(window, 'SpeechSynthesisUtterance', { value: U, configurable: true, writable: true }); } catch (e) { window.SpeechSynthesisUtterance = U; }
  // máy không có giọng nào: báo cho trang biết đã có giọng làm sẵn
  idxP.then(() => { if (fileMode() && typeof SS._ovc === 'function') { try { SS._ovc(); } catch (e) {} } });
  // nút bật/tắt đọc chậm (trang nào cần thì gọi AmSongKim.nut(chỗ đặt, lớp css))
  const setCham = v => { try { localStorage.setItem('songkim_cham', v ? '1' : '0'); } catch (e) {} document.querySelectorAll('[data-am-cham]').forEach(ve); };
  const ve = b => { const on = cham(); b.textContent = on ? '🐢 Đọc chậm: BẬT' : '🐢 Đọc chậm: tắt'; b.setAttribute('aria-pressed', on); b.style.background = on ? '#FFE08A' : ''; };
  function nut(where, cls) { const b = document.createElement('button'); b.type = 'button'; b.dataset.amCham = '1'; if (cls) b.className = cls; b.title = 'Đọc tiếng Anh chậm lại cho các bạn nhỏ nghe kịp'; ve(b); b.onclick = e => { e.stopPropagation(); setCham(!cham()); }; if (where) where.appendChild(b); return b; }
  // đọc chậm một lần (dù chế độ đang tắt)
  function docCham(t) { try { SS.cancel(); const u = new U(t); u.lang = 'en-US'; u.rate = .85; u._forceSlow = true; SS.speak(u); } catch (e) {} }
  window.AmSongKim = { fileMode, split, slug, base: BASE, cham, setCham, nut, docCham, he: () => cham() ? 1.5 : 1 };
})();
