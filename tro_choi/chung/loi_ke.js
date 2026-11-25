// Lời Pip kể chuyện đầu thử thách: cô Anh ghi âm ở trang "Giọng cô", đảo phát lại khi mở bảng tiết học.
// Mỗi lời có một mã riêng (không phụ thuộc chữ hiện trên màn hình), nên sửa chữ hiển thị không làm mất bản ghi.
// - tro: lời kể theo trò chơi, dùng chung cho cả ba đảo
// - dao: lời kể riêng của từng vùng trên mỗi đảo (tiết đầu của unit)
(function () {
  const tro = {
    goi_do_choi: { ten: 'Gọi ra hang', ke: 'Các bạn ơi, Pip đây! Có mấy bạn đang trốn trong hang tối, mình chỉ thấy cái bóng thôi. Cái bóng lăn ra thì cả lớp nhìn thật kỹ, rồi gọi thật to tên bạn ấy nhé. Gọi đúng là bạn ấy nhảy lên kệ liền! Sẵn sàng chưa nào?' },
    leo_nui: { ten: 'Leo núi tuyết', ke: 'Các bạn ơi, mình cùng leo núi tuyết nha! Trên núi lạnh lắm, mọi thứ bị băng phủ kín hết rồi. Bạn nào nói đúng tên, băng sẽ vỡ ra: rắc, rắc! Cả nhóm leo lên từng bậc, lên tới tận đỉnh núi. Mình leo nào!' },
    ruong_bi_mat: { ten: 'Rương bí mật', ke: 'Ơ kìa, chiếc rương bí mật đang rung rinh! Trong rương có món đồ gì đó. Giấy sẽ bóc ra từng ô một, các bạn nhìn thật kỹ rồi đoán xem đó là gì nhé. Đoán đúng thì mình treo món đồ lên tường!' },
    ban_thu_tron: { ten: 'Bạn nào trốn đâu', ke: 'Suỵt, nhỏ tiếng nào! Có ai đang trốn trong bụi cây đó. Bụi cây nào rung rinh, cả lớp gọi thật to tên bạn ấy. Gọi đúng là bạn ấy nhảy ra chào mình liền!' },
    go_cua: { ten: 'Gõ cửa', ke: 'Mình cùng đi gõ cửa từng ngôi nhà nha: cốc, cốc, cốc! Cửa mở ra, các bạn nhìn xem sau cánh cửa có gì, rồi nói thật to. Nói đúng là mình đi tiếp sang nhà khác!' },
    tha_phao: { ten: 'Bóng bay đón bạn', ke: 'Nhìn kìa, phao đang trôi vào bến, trên phao có bóng bay! Mỗi quả bóng có một hình. Các bạn nói đúng tên hình đó, quả bóng sẽ bay vù về bến. Mình thả hết bóng nào!' },
    ghep_van_cau: { ten: 'Ghép ván cầu', ke: 'Ôi, cây cầu qua suối bị gãy mất rồi! Mỗi từ các bạn nói đúng là một tấm ván. Mình ghép đủ ván thì cả lớp đi qua cầu được. Cùng ghép cầu nào!' },
    dua_thuyen: { ten: 'Đua thuyền', ke: 'Cả lớp lên thuyền thôi! Mình có hai chiếc thuyền. Mỗi bạn nói to một từ, cả lớp nói theo, thì thuyền lại tiến lên một đoạn. Chèo, chèo, chèo! Hai thuyền cùng về đích nhé!' },
    lam_theo_ben: { ten: 'Làm theo Ben', ke: 'Phía trước có cây cầu treo đung đưa! Các bạn làm theo Ben nha: Ben chỉ vào đâu thì mình chỉ vào đó, rồi nói thật to tên bộ phận cơ thể. Nói đúng là cả nhóm bước qua cầu!' },
  };
  const dao = {
    daohatmam: { ten: 'Đảo Hạt Mầm', ke: {
      'Welcome': 'Xin chào các bạn, Pip đây! Chào mừng các bạn tới Đảo Hạt Mầm! Phao đang trôi vào bến, mang theo những quả bóng bay. Các bạn nói đúng hình, đúng màu trên quả bóng, bóng sẽ bay về đón mình nhé!',
      'Unit 1 School': 'Ối, bạn thỏ con bị lạc trên núi tuyết rồi! Đồ dùng học tập của bạn ấy bị băng phủ kín. Các bạn nói đúng tên đồ dùng, băng sẽ vỡ ra, rồi cả nhóm leo lên tìm thỏ con nha!',
      'Unit 2 Family': 'Bạn gà con muốn về với gia đình. Mình cùng gõ từng cánh cửa nhé: cốc, cốc, cốc! Cửa mở ra, các bạn nói đúng tên người trong nhà, gà con sẽ tìm được ba mẹ!',
      'Unit 3 Toys': 'Gấu trúc con và các món đồ chơi đang trốn trong hang. Cái bóng lăn ra kìa! Các bạn gọi đúng tên, đồ chơi sẽ nhảy lên kệ.',
      'Unit 4 Body': 'Bạn ếch con đang chờ mình ở bên kia cầu treo. Các bạn làm theo Ben, chỉ vào và nói đúng bộ phận cơ thể, cả nhóm sẽ bước qua cầu tới chỗ ếch con!',
      'Unit 5 Pets': 'Vịt con và các bạn thú cưng đang chơi trốn tìm. Bụi cây nào rung rinh, các bạn gọi đúng tên, bạn ấy sẽ nhảy ra!',
      'Unit 6 Food': 'Bạn sóc con đói bụng lắm, mà sóc ở bên kia suối. Các bạn nói đúng tên món ăn để ghép ván cầu, mình mang trái cây sang cho sóc con nhé!',
      'Festivals': 'Quảng trường sắp mở hội rồi! Bạn nhím con cần đồ trang trí. Mình mở rương bí mật, đoán đúng đồ lễ hội để nhím con treo lên nha!',
      'Course Review': 'Mình cùng lên Đồi Cây Thần! Cả lớp chèo hai chiếc thuyền. Mỗi bạn nói to một từ, mình có thêm giọt nước cho Cây Thần.',
      'Assessment': 'Hôm nay có thử thách lớn trên đồi! Hai thuyền cùng chèo về đích. Các bạn nói to từng từ để mang giọt nước tưới cho Cây Thần nhé!',
      'Consolidation': 'Đây là chuyến thuyền cuối cùng rồi! Các bạn nói to từng từ, mình gom những giọt nước cuối, Cây Thần sẽ nở hoa thật đẹp!',
    } },
    daocauvong: { ten: 'Đảo Cầu Vồng', ke: {
      'Welcome': 'Xin chào các bạn, Pip đây! Chào mừng các bạn tới Đảo Cầu Vồng! Phao đang trôi vào bến mang theo bóng bay. Các bạn nói đúng hình, đúng màu trên quả bóng, bóng sẽ bay về đón mình nhé!',
      'Unit 1 School': 'Bạn cú mèo con và các món đồ dùng học tập đang trốn trong hang. Cái bóng lăn ra kìa! Các bạn gọi đúng tên, đồ vật sẽ nhảy lên kệ.',
      'Unit 2 Family': 'Bạn kangaroo con đi thăm nhà ông bà. Mình cùng gõ từng cánh cửa: cốc, cốc, cốc! Cửa mở ra, các bạn nói đúng tên người trong gia đình nhé!',
      'Review': 'Mình dừng chân ôn bài một chút nha! Cả lớp chèo hai chiếc thuyền. Mỗi bạn nói to một từ, mình có thêm một mảnh màu cho cầu vồng.',
      'Unit 3 Body': 'Bạn chim cánh cụt con đang chờ ở bên kia cầu treo. Các bạn làm theo Ben, nói đúng bộ phận cơ thể, cả nhóm sẽ bước qua cầu!',
      'Unit 4 Clothes': 'Bạn hồng hạc con đang lạnh run trên núi tuyết. Quần áo bị băng phủ kín hết rồi. Các bạn nói đúng tên, băng sẽ vỡ ra, cả nhóm mặc ấm rồi leo tiếp nha!',
      'Unit 5 Animals': 'Hươu cao cổ con và các bạn thú đang chơi trốn tìm. Bụi cây nào rung rinh, các bạn gọi đúng tên, bạn ấy sẽ nhảy ra chào mình!',
      'Unit 6 Transport': 'Bạn cáo con muốn qua suối để tới sân bay. Các bạn gọi đúng tên xe, tàu, máy bay để ghép từng tấm ván cầu nhé!',
      'Festivals': 'Quảng trường mở hội rồi! Bạn hà mã con cần đồ trang trí. Mình mở rương bí mật, đoán đúng đồ lễ hội để hà mã con treo lên nha!',
      'Assessment': 'Hôm nay có thử thách lớn trước cổng cầu vồng! Hai thuyền cùng chèo về đích. Các bạn nói to từng từ để lấy những mảnh màu cuối nhé!',
      'Consolidation': 'Đây là chuyến thuyền cuối cùng rồi! Mình ghép những mảnh màu cuối, cầu vồng sẽ sáng đủ bảy màu. Cả lớp cố lên nào!',
    } },
    daosongkim3d: { ten: 'Đảo Song Kim', ke: {
      'Welcome': 'Xin chào các bạn, Pip đây! Ben và Mia vừa chèo thuyền tới bến Đảo Song Kim. Mỗi chiếc phao mang một quả bóng. Các bạn nói đúng hình, đúng màu, bóng sẽ bay về bến đón mình nhé!',
      'Unit 1 Home': 'Ối, bạn mèo con bị lạc trong làng rồi! Mình cùng gõ từng cánh cửa nhé: cốc, cốc, cốc! Các bạn nói đúng tên căn phòng, mình sẽ tìm được mèo con.',
      'Unit 2 Toys': 'Các món đồ chơi chạy trốn vào hang hết rồi! Cái bóng lăn ra kìa. Các bạn gọi đúng tên, đồ chơi sẽ nhảy lên kệ.',
      'Review': 'Mình cùng chèo hai chiếc thuyền về phía hải đăng! Mỗi bạn nói to một từ, cả lớp nói theo, thuyền lại tiến lên một đoạn.',
      'Unit 3 Body': 'Ở bãi biển có một cây cầu treo đung đưa. Các bạn làm theo Ben, nói đúng bộ phận cơ thể, cả nhóm sẽ bước qua cầu!',
      'Unit 4 Clothes': 'Núi tuyết lạnh quá đi! Quần áo bị băng phủ kín hết rồi. Các bạn nói đúng tên, băng sẽ vỡ ra, cả nhóm mặc ấm rồi leo tiếp nha!',
      'Unit 5 Animals': 'Sư tử con và các bạn thú đang chơi trốn tìm trong rừng. Bụi cây nào rung rinh, các bạn gọi đúng tên, bạn thú sẽ nhảy ra!',
      'Unit 6 Food': 'Bạn khỉ con đói bụng ở bên kia suối, mà cây cầu bị gãy mất rồi. Các bạn nói đúng tên món ăn để ghép ván cầu, mình mang đồ ăn sang cho khỉ con nhé!',
      'Festivals': 'Lâu đài sắp mở hội rồi! Mình mở rương bí mật, đoán đúng đồ lễ hội rồi treo lên trang trí nha!',
      'Assessment': 'Sắp tới hải đăng rồi các bạn ơi! Hai thuyền cùng chèo về đích. Mỗi bạn nói to một từ để thuyền tiến lên nhé!',
      'Consolidation': 'Đây là chuyến thuyền cuối cùng rồi! Các bạn nói to từng từ, hai thuyền sẽ cập bến hải đăng, mình gom những viên đá sáng cuối cùng!',
    } },
  };
  // truyện ngắn Pip kể (có vài từ tiếng Anh): cô ghi một lần ở trang Giọng cô, Bài chiếu phát lại. Khoá: mã đảo + unit
  const truyen = {
    daosongkim3d: { 'Unit 2 Toys': { ten: 'Truyện: Gấu tìm đồ chơi', tu: 'ball, car, train, doll, teddy', ke: "Sáng nay, Pip bay ngang Hang đồ chơi thì nghe tiếng khóc hu hu. Ai vậy ta? À, là bạn Gấu! Gấu buồn lắm, vì đồ chơi của Gấu trốn hết vào hang rồi. Pip ghé mắt nhìn vào hang tối. Có một cái bóng tròn tròn, nảy tưng tưng. What's this? It's a ball! Ball! Rồi một cái bóng chạy vèo vèo, bíp bíp. What's this? It's a car! Car! Nghe kìa: xình xịch, xình xịch! It's a train! Train! Còn hai bạn trốn sau cùng: một bạn tóc dài mặc váy hồng, và một bạn lông mềm mềm. It's a doll! It's a teddy! Gấu vui quá, ôm teddy thật chặt. Gấu nói: Thank you, Pip! Bây giờ cả lớp mình cùng gọi tên đồ chơi với Gấu nhé: ball, car, train, doll, teddy!" } },
  };
  // mã lưu giọng cô (chỉ chữ thường không dấu, vì giong_co.js bỏ các ký tự khác)
  const slug = s => String(s).toLowerCase().normalize('NFD').replace(/[^a-z]+/g, ' ').trim();
  const maTro = g => 'pipke tro ' + slug(g);
  const maDao = (store, unit) => 'pipke ' + slug(store) + ' ' + slug(unit);
  const maTruyen = (store, unit) => 'pipke truyen ' + slug(store) + ' ' + slug(unit);
  const truyenOf = (store, unit) => { const t = truyen[store] && truyen[store][unit]; return t ? Object.assign({ ma: maTruyen(store, unit) }, t) : null; };
  // danh sách đầy đủ để ghi âm / in kịch bản: [{ma, nhom, ten, ke}]
  function list(store) {
    const out = [];
    Object.entries(dao).forEach(([k, d]) => { if (store && store !== 'all' && store !== k) return; Object.entries(d.ke).forEach(([u, t]) => out.push({ ma: maDao(k, u), nhom: d.ten, ten: u, ke: t })); });
    Object.entries(truyen).forEach(([k, d]) => { if (store && store !== 'all' && store !== k) return; Object.entries(d).forEach(([u, t]) => out.push({ ma: maTruyen(k, u), nhom: 'Truyện Pip kể · ' + ((dao[k] && dao[k].ten) || k) + ' · ' + u, ten: t.ten, ke: t.ke, dai: true })); });
    Object.entries(tro).forEach(([g, d]) => out.push({ ma: maTro(g), nhom: 'Trò chơi (dùng chung cả ba đảo)', ten: d.ten, ke: d.ke }));
    return out;
  }
  window.LOI_KE = { tro, dao, truyen, maTro, maDao, maTruyen, truyenOf, list };
})();
