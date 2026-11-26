// Màn đen nghỉ mắt + đồng hồ chiếu nhỏ cho cô (góp ý hội đồng chuyên gia 26-11-2026).
// Phím B (hoặc dấu chấm, nút "màn đen" của bút trình chiếu) bật / tắt màn đen. Trên bản đồ đảo phím B đã dùng cho album nên chỉ dùng dấu chấm.
// Đồng hồ đếm số phút đã chiếu kể từ lúc cô mở tiết (NghiMat.batDau()); quá 12 phút thì nhắc nhẹ một lần.
(function () {
  if (window.NghiMat) return;
  const K = 'sk_chieu_bd', NHAC = 12, TREN_DAO = /\/dao_[a-z0-9_]+\/[^/]*\.html$/.test(location.pathname);
  const now = () => Date.now();
  const bd = () => { try { let t = +sessionStorage.getItem(K); if (!t || now() - t > 3 * 3600e3) { t = now(); sessionStorage.setItem(K, t); } return t; } catch (e) { return now(); } };
  let nhacRoi = false; try { nhacRoi = sessionStorage.getItem(K + '_nhac') === String(bd()); } catch (e) {}
  const css = document.createElement('style');
  css.textContent = `#nmDen { position: fixed; inset: 0; background: #000; z-index: 2147483000; display: flex; align-items: flex-end; justify-content: center; cursor: none; }
#nmDen span { color: #333; font: 700 14px/1 Arial, sans-serif; padding: 18px; }
#nmGio { position: fixed; left: 8px; bottom: 6px; z-index: 2147482000; font: 700 12px/1 Arial, sans-serif; color: #fff; background: rgba(31, 45, 74, .35); padding: 4px 8px; border-radius: 8px; pointer-events: none; opacity: .55; }
#nmGio.qua { background: rgba(224, 120, 0, .75); opacity: .9; }
#nmNhac { position: fixed; left: 50%; bottom: 70px; transform: translateX(-50%); z-index: 2147482500; background: rgba(31, 45, 74, .92); color: #fff; font: 800 20px/1.3 'Baloo 2', Arial, sans-serif; padding: 10px 22px; border-radius: 16px; pointer-events: none; }`;
  document.head.appendChild(css);
  const den = document.createElement('div'); den.id = 'nmDen'; den.hidden = true; den.innerHTML = `<span>Nghỉ mắt · bấm ${TREN_DAO ? 'dấu chấm' : 'B'} để chiếu lại</span>`;
  const gio = document.createElement('div'); gio.id = 'nmGio'; gio.title = 'Số phút đã chiếu trong tiết (chỉ để cô theo dõi)';
  const ready = () => { document.body.appendChild(den); document.body.appendChild(gio); tick(); };
  if (document.body) ready(); else addEventListener('DOMContentLoaded', ready);
  function nhac(t) { const e = document.createElement('div'); e.id = 'nmNhac'; e.textContent = t; document.body.appendChild(e); setTimeout(() => e.remove(), 6000); }
  function tick() {
    const p = Math.floor((now() - bd()) / 60000); gio.textContent = `⏱ ${p}'`; gio.classList.toggle('qua', p >= NHAC);
    if (p >= NHAC && !nhacRoi) { nhacRoi = true; try { sessionStorage.setItem(K + '_nhac', String(bd())); } catch (e) {} nhac(`Đã chiếu ${p} phút · bấm ${TREN_DAO ? 'dấu chấm' : 'B'} cho bé nghỉ mắt, vận động một chút nhé`); }
  }
  setInterval(tick, 20000);
  function bat(v) { den.hidden = !v; if (v) { try { speechSynthesis.cancel(); } catch (e) {} window.GiongCo && GiongCo.stop && GiongCo.stop(); } }
  addEventListener('keydown', e => {
    if (/^(INPUT|TEXTAREA|SELECT)$/.test(e.target.tagName)) return;
    const k = e.key, toggle = k === '.' || (!TREN_DAO && (k === 'b' || k === 'B'));
    if (toggle) { e.preventDefault(); e.stopImmediatePropagation(); bat(den.hidden); return; }
    if (!den.hidden) { e.preventDefault(); e.stopImmediatePropagation(); if (k === 'Escape' || k === 'Enter' || k === 'PageDown' || k === ' ') bat(false); } // đang màn đen: phím khác chỉ để tắt màn đen
  }, true);
  den.addEventListener('pointerdown', e => { e.stopPropagation(); bat(false); });
  window.NghiMat = { batDau() { try { sessionStorage.setItem(K, now()); } catch (e) {} nhacRoi = false; tick(); }, bat, phut: () => Math.floor((now() - bd()) / 60000) };
})();
