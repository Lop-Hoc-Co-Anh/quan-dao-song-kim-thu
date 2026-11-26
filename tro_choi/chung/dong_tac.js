// Động tác gợi ý cho từng từ (TPR): khi cả lớp đọc lại, các bé vừa nói vừa làm động tác. Góp ý hội đồng chuyên gia 26-11-2026.
// Chỉ thêm động tác, không đổi từ vựng của giáo án. window.DongTac.of('banana') -> '🍌 Bóc vỏ chuối, đưa lên miệng ăn'
(function () {
  const M = {
    // nhân vật, gia đình
    amanda: '👋 Vẫy tay chào bạn Amanda', george: '👋 Vẫy tay chào bạn George', alfie: '🐸 Nhảy ếch như bạn Alfie', kelly: '👋 Vẫy tay chào bạn Kelly', teacher: '🙇 Khoanh tay chào cô',
    dad: '💪 Gồng tay khỏe như bố', daddy: '💪 Gồng tay khỏe như bố', mummy: '🤗 Ôm mẹ thật chặt', brother: '👦 Chỉ vào bạn trai bên cạnh', sister: '👧 Chỉ vào bạn gái bên cạnh',
    baby: '👶 Hai tay ru em bé', grandad: '🧓 Chống gậy đi chậm như ông', granny: '👵 Đeo kính như bà',
    // đồ dùng học tập, lớp học, nhà
    bag: '🎒 Đeo cặp lên vai', book: '📖 Hai tay mở sách', crayon: '🖍 Tô màu trên không', pencil: '✏️ Viết trên không', chair: '🪑 Ngồi xuống ghế tưởng tượng', table: '🖐 Hai tay xoa mặt bàn',
    door: '🚪 Gõ cửa cốc cốc rồi mở cửa', window: '🪟 Mở cửa sổ, hít thở', bedroom: '😴 Áp tay vào má, ngủ', bathroom: '🛁 Kỳ cọ tắm rửa', kitchen: '🍳 Khuấy nồi nấu ăn', 'living room': '📺 Ngồi xem ti vi',
    // đồ chơi, sân chơi
    ball: '⚽ Ném bóng', car: '🚗 Cầm vô lăng lái xe', doll: '🪆 Ru búp bê', teddy: '🧸 Ôm gấu bông', kite: '🪁 Kéo dây thả diều', bike: '🚲 Hai chân đạp xe',
    seesaw: '⬆️ Nhún lên nhún xuống', slide: '🛝 Trượt cầu trượt, tay giơ cao', swing: '🎠 Đu đưa tới lui', springer: '🐴 Nhún nhảy trên ngựa nhún',
    // cơ thể
    head: '🙆 Hai tay chạm đầu', hair: '💇 Vuốt tóc', face: '😊 Hai tay ôm mặt', eye: '👀 Chỉ vào mắt', eyes: '👀 Chỉ vào hai mắt', ear: '👂 Chỉ vào tai', ears: '👂 Chỉ vào hai tai', nose: '👃 Chạm mũi',
    mouth: '👄 Chỉ vào miệng', teeth: '😁 Nhe răng cười', arm: '💪 Giơ một tay', arms: '🙌 Giơ hai tay', hand: '✋ Giơ một bàn tay', hands: '👏 Vỗ hai tay', finger: '☝️ Giơ một ngón tay',
    fingers: '🖐 Xòe các ngón tay, nhúc nhích', leg: '🦵 Co một chân', legs: '🦵 Vỗ vào hai chân', foot: '🦶 Giậm một chân', feet: '🦶 Giậm hai chân', toes: '🦶 Cúi chạm ngón chân', shoulders: '🤷 Nhún vai',
    // quần áo
    coat: '🧥 Mặc áo khoác, kéo khóa', dress: '👗 Xoay váy một vòng', hat: '👒 Đội mũ lên đầu', jumper: '🧶 Chui đầu mặc áo len', shoes: '👟 Xỏ giày, buộc dây', trousers: '👖 Xỏ chân mặc quần',
    boots: '🥾 Đi ủng giậm giậm', scarf: '🧣 Quàng khăn quanh cổ', shorts: '🩳 Mặc quần đùi', skirt: '👗 Kéo váy xoay xoay', socks: '🧦 Xỏ tất vào chân', 't-shirt': '👕 Chui đầu mặc áo phông',
    hot: '🥵 Quạt tay vì nóng', cold: '🥶 Ôm người run run', happy: '😄 Cười thật tươi, giơ tay', sad: '😢 Dụi mắt khóc hu hu', hungry: '🍽 Xoa bụng đói', thirsty: '🥤 Uống nước ừng ực',
    // con vật
    cat: '🐱 Meo meo, cào móng', dog: '🐶 Gâu gâu, vẫy đuôi', fish: '🐟 Hai tay bơi như cá', mouse: '🐭 Chít chít, đi rón rén', bird: '🐦 Vỗ cánh bay', rabbit: '🐰 Tai thỏ, nhảy nhảy',
    cow: '🐮 Ò ò, làm sừng', horse: '🐴 Phi ngựa lóc cóc', pig: '🐷 Ụt ịt, ấn mũi', sheep: '🐑 Be be', frog: '🐸 Nhảy ếch', duck: '🦆 Cạp cạp, đi lạch bạch',
    lion: '🦁 Gầm lên, giơ móng', monkey: '🐵 Gãi đầu như khỉ', elephant: '🐘 Một tay làm vòi voi', giraffe: '🦒 Vươn cổ thật cao', hippo: '🦛 Há miệng thật to', snake: '🐍 Tay uốn éo như rắn, xì xì',
    penguin: '🐧 Đi lạch bạch như chim cánh cụt', turtle: '🐢 Bò thật chậm', snail: '🐌 Bò chậm chậm', spider: '🕷 Các ngón tay bò như nhện', bat: '🦇 Vỗ cánh dơi', reindeer: '🦌 Hai tay làm sừng tuần lộc',
    fly: '🪰 Vo ve bay quanh', fast: '🏃 Chạy tại chỗ thật nhanh', slow: '🐢 Đi chậm thật chậm', long: '↔️ Dang tay thật dài', short: '🤏 Chụm tay lại ngắn', big: '🙆 Vòng tay thật to', little: '🤏 Chụm ngón tay bé xíu',
    // đồ ăn
    apple: '🍎 Cắn táo rộp rộp', banana: '🍌 Bóc vỏ chuối rồi ăn', orange: '🍊 Bóc cam', pear: '🍐 Cắn quả lê', fruit: '🍇 Hái quả trên cây', bread: '🍞 Bẻ bánh mì ăn', cake: '🎂 Thổi nến bánh',
    candy: '🍬 Bóc kẹo', cookies: '🍪 Nhai bánh quy', milk: '🥛 Uống sữa', juice: '🧃 Hút nước ép', water: '💧 Uống nước', sandwiches: '🥪 Cắn bánh kẹp', mooncake: '🥮 Cắn bánh trung thu',
    // xe cộ
    bus: '🚌 Lái xe buýt, bóp còi bíp bíp', boat: '⛵ Chèo thuyền', plane: '✈️ Dang tay bay như máy bay', train: '🚂 Nối đuôi tàu xình xịch',
    // màu, hình, số
    red: '🔴 Chỉ vào đồ màu đỏ trong lớp', yellow: '🟡 Chỉ vào đồ màu vàng', blue: '🔵 Chỉ vào đồ màu xanh dương', green: '🟢 Chỉ vào đồ màu xanh lá', pink: '🩷 Chỉ vào đồ màu hồng', purple: '🟣 Chỉ vào đồ màu tím',
    brown: '🟤 Chỉ vào đồ màu nâu', black: '⚫ Chỉ vào đồ màu đen', white: '⚪ Chỉ vào đồ màu trắng',
    circle: '⭕ Vẽ vòng tròn trên không', square: '⬜ Vẽ hình vuông trên không', triangle: '🔺 Vẽ tam giác trên không', star: '⭐ Xòe tay lấp lánh như ngôi sao',
    one: '☝️ Giơ 1 ngón tay', two: '✌️ Giơ 2 ngón tay', three: '🤟 Giơ 3 ngón tay', four: '🖐 Giơ 4 ngón tay', five: '🖐 Giơ 5 ngón tay', six: '🖐☝️ Giơ 6 ngón tay', seven: '🖐✌️ Giơ 7 ngón tay',
    eight: '🖐🤟 Giơ 8 ngón tay', nine: '🖐🖐 Giơ 9 ngón tay', ten: '🙌 Giơ cả 10 ngón tay',
    // vị trí, động từ
    in: '📥 Đưa tay vào trong hộp tưởng tượng', on: '⬆️ Đặt tay lên đầu', under: '⬇️ Cúi xuống dưới bàn', up: '⬆️ Chỉ lên trời', down: '⬇️ Chỉ xuống đất', clap: '👏 Vỗ tay', jump: '🦘 Nhảy lên',
    // lễ hội
    pumpkin: '🎃 Ôm quả bí ngô', ghost: '👻 Hù hù như ma', witch: '🧙 Cưỡi chổi bay', monster: '👾 Giơ móng vuốt', costume: '🎭 Xoay một vòng khoe trang phục', santa: '🎅 Vuốt râu, ho ho ho',
    tree: '🌲 Hai tay chụm làm cây thông', gift: '🎁 Mở hộp quà', presents: '🎁 Mở hộp quà', fireworks: '🎆 Tung tay nổ bùm như pháo hoa', lantern: '🏮 Cầm đèn lồng đi vòng', moon: '🌕 Vòng tay tròn như mặt trăng',
    'lucky money': '🧧 Hai tay nhận lì xì, cảm ơn',
  };
  const of = w => { if (!w) return ''; const k = String(w).toLowerCase().trim(); return M[k] || M[k.replace(/s$/, '')] || ''; };
  window.DongTac = { of, M };
})();
