// Câu mẫu dùng chung (trò chơi, chant, thẻ về nhà, nhận xét): đặt câu hỏi – câu trả lời đúng ngữ pháp theo nhóm từ.
// CauMau.of('daddy') -> { q: "Who's this?", a: 'This is my daddy.' }; từ không ghép câu được (clap, hello...) -> null.
(function () {
  const L = s => new Set(s.split(','));
  const FAM = L('mummy,daddy,mum,dad,mother,father,brother,sister,granny,grandad,grandma,grandpa,grandmother,grandfather,baby,family,uncle,aunt,cousin');
  const PEOPLE = L('amanda,george,alfie,kelly,ben,mia,teacher,santa,santa claus,witch');
  const COL = L('red,yellow,blue,green,orange,brown,purple,pink,black,white,grey,gray');
  const NUM = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten'];
  const PAIR = { big: 'big or little', little: 'big or little', long: 'long or short', short: 'long or short', fast: 'fast or slow', slow: 'fast or slow' };
  const FEEL = L('hungry,thirsty,happy,sad,tired,hot,cold');
  const PLURAL = L('shoes,trousers,boots,socks,sandwiches,shoulders,fingers,toes,legs,arms,hands,eyes,ears,shorts,presents,cookies,fireworks,glasses,jeans,teeth,feet,crayons,pencils,books,toys,sweets');
  const MASS = L('milk,juice,water,bread,fruit,rice,cake,lucky money,chocolate,ice cream,pizza,cheese,food,soup,candy');
  const ROOM = L('bedroom,kitchen,bathroom,living room,garden,dining room,hall');
  const THE = L('moon,sun,sky,sea');
  const NOT = L('hello,bye,bye-bye,goodbye,sing,dance,jump,run,swim,stamp,wave,touch,hop,thank you,yes,no,please,count,go,stop');
  const ADJ_PEOPLE = L('happy,sad');
  const BODY = L('head,arm,hand,leg,foot,nose,mouth,ear,eye,finger,toe,shoulder,hair,face,knee,tummy,neck,body'), BODYS = L('arms,hands,legs,feet,ears,eyes,fingers,toes,shoulders,knees,teeth');
  function of(word, unit) {
    const w = String(word || '').trim(), k = w.toLowerCase(); if (!k || NOT.has(k)) return null;
    if (k === 'three years old') return { q: 'How old are you?', a: "I'm three years old." };
    if (k === 'in' || k === 'on' || k === 'under') return { q: "Where's Alfie?", a: k.charAt(0).toUpperCase() + k.slice(1) + ' the bed.' };
    if (k === 'up' || k === 'down') return { q: 'Up or down?', a: (k === 'up' ? 'Up' : 'Down') + '!' };
    if (k === 'clap') return { q: 'Can you clap?', a: 'Yes, I can clap!' };
    const cap = s => s.charAt(0).toUpperCase() + s.slice(1);
    const food = /food|fruit/i.test(unit || '');
    if (FAM.has(k)) return { q: "Who's this?", a: `This is my ${w}.` };
    if (PEOPLE.has(k)) return { q: "Who's this?", a: `It's ${k === 'teacher' ? 'my teacher' : k === 'witch' ? 'a witch' : cap(w)}.` };
    if (k === 'orange' && food) return { q: "What's this?", a: "It's an orange." };
    if (COL.has(k)) return { q: 'What colour is it?', a: `It's ${k}.` };
    const n = NUM.indexOf(k); if (n > 0) return { q: 'How many?', a: `${cap(k)}.` };
    if (PAIR[k]) return { q: `Is it ${PAIR[k]}?`, a: `It's ${k}.` };
    if (FEEL.has(k)) return ADJ_PEOPLE.has(k) ? { q: 'Is he happy or sad?', a: `He's ${k}.` } : { q: 'How are you?', a: `I'm ${k}.` };
    if (BODY.has(k)) return { q: "What's this?", a: `This is my ${k}.` };
    if (BODYS.has(k)) return { q: 'What are these?', a: `These are my ${k}.` };
    if (PLURAL.has(k)) return { q: 'What are these?', a: `They're ${k}.` };
    if (ROOM.has(k)) return { q: 'What room is this?', a: `It's the ${k}.` };
    if (THE.has(k)) return { q: "What's this?", a: `It's the ${k}.` };
    if (MASS.has(k)) return { q: "What's this?", a: `It's ${k}.` };
    if (/\s/.test(k) && !/^(teddy bear|t-shirt|ice cream|living room|lucky money)$/.test(k)) return { q: "What's this?", a: `It's a ${k}.` };
    return { q: "What's this?", a: `It's ${/^[aeiou]/.test(k) && !/^(uni|eu)/.test(k) ? 'an' : 'a'} ${w}.` };
  }
  // câu hỏi chung cho cả nhóm từ (thẻ về nhà, chant): lấy câu hỏi gặp nhiều nhất
  function question(words, unit) { const c = {}; words.forEach(w => { const s = of(w, unit); if (s) c[s.q] = (c[s.q] || 0) + 1; }); return Object.keys(c).sort((a, b) => c[b] - c[a])[0] || "What's this?"; }
  window.CauMau = { of, question };
})();
