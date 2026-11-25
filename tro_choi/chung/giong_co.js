// Giọng cô đọc mẫu: cô ghi âm từng từ (trang ghi_am), lưu trong máy (IndexedDB của trình duyệt).
// Trò chơi đọc mẫu: có bản ghi của cô thì phát giọng cô, chưa có thì dùng giọng máy.
(function () {
  const DB = 'songkim_giong', ST = 'tu';
  const key = t => String(t).toLowerCase().replace(/[’']/g, "'").replace(/[^a-z' -]/g, '').replace(/\s+/g, ' ').trim();
  let dbP = null, keys = new Set(), audio = null, finCur = null, tok = 0;
  const open = () => dbP || (dbP = new Promise((res, rej) => {
    if (!window.indexedDB) return rej(new Error('no idb'));
    const r = indexedDB.open(DB, 1); r.onupgradeneeded = () => r.result.createObjectStore(ST); r.onsuccess = () => res(r.result); r.onerror = () => rej(r.error);
  }));
  const tx = (mode, fn) => open().then(db => new Promise((res, rej) => { const t = db.transaction(ST, mode), s = t.objectStore(ST), out = fn(s); t.oncomplete = () => res(out && out.result); t.onerror = () => rej(t.error); }));
  const ready = open().then(() => tx('readonly', s => s.getAllKeys())).then(k => { keys = new Set(k || []); return keys; }).catch(() => keys);
  const has = t => keys.has(key(t));
  const get = t => tx('readonly', s => s.get(key(t)));
  const put = (t, blob) => tx('readwrite', s => s.put(blob, key(t))).then(() => keys.add(key(t)));
  const del = t => tx('readwrite', s => s.delete(key(t))).then(() => keys.delete(key(t)));
  const all = () => tx('readonly', s => s.getAllKeys());
  // dừng ngay bản đang phát và báo xong cho nơi đang chờ (không để treo)
  function stop() { tok++; if (audio) { try { audio.pause(); } catch (e) {} audio = null; } if (finCur) { const f = finCur; finCur = null; f(false); } }
  // phát giọng cô; trả về Promise xong khi phát hết, bị dừng hoặc lỗi
  function play(t, maxMs = 6000) {
    stop(); const my = tok;
    return get(t).then(blob => new Promise(res => {
      if (!blob || my !== tok) return res(false);
      const url = URL.createObjectURL(blob), a = audio = new Audio(url); let done = false;
      const fin = ok => { if (done) return; done = true; if (finCur === fin) finCur = null; if (audio === a) audio = null; URL.revokeObjectURL(url); res(ok); };
      const slow = window.AmSongKim && AmSongKim.cham(); if (slow) { a.preservesPitch = a.webkitPreservesPitch = true; a.playbackRate = .75; }
      finCur = fin; a.onended = () => fin(true); a.onerror = () => fin(false); setTimeout(() => fin(true), maxMs * (slow ? 1.4 : 1));
      a.play().catch(() => fin(false));
    })).catch(() => false);
  }
  // sao lưu / nhập lại toàn bộ giọng cô (file .json, âm thanh dạng base64)
  async function exportAll() {
    const ks = await all(), out = {};
    for (const k of ks) { const b = await tx('readonly', s => s.get(k)); out[k] = { type: b.type, data: await new Promise(r => { const fr = new FileReader(); fr.onload = () => r(fr.result.split(',')[1]); fr.readAsDataURL(b); }) }; }
    return { app: 'Giong co Song Kim', phienban: 1, ngay: new Date().toISOString(), tu: out };
  }
  async function importAll(d) {
    if (!d || !d.tu) throw new Error('File không phải bản sao lưu giọng cô.');
    let n = 0; for (const [k, v] of Object.entries(d.tu)) { const bin = atob(v.data), u = new Uint8Array(bin.length); for (let i = 0; i < bin.length; i++) u[i] = bin.charCodeAt(i); await put(k, new Blob([u], { type: v.type || 'audio/webm' })); n++; }
    return n;
  }
  window.GiongCo = { ready, has, play, stop, put, del, all, get, key, exportAll, importAll };
})();
