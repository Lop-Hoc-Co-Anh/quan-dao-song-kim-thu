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
    "daosongkim3d": {
      "Welcome": {
        "ten": "Truyện: Ben và Mia đến bến thuyền",
        "tu": "circle, square, triangle, pink, black, white, blue",
        "ke": "Ben và Mia chèo thuyền tới bến Đảo Song Kim. Pip bay ra đón: *Hello, Ben! Hello, Mia!* Trên mặt nước có những chiếc phao, mỗi phao buộc một quả bóng. Quả bóng thứ nhất tròn xoe. *What shape is it? It's a circle!* Quả thứ hai có bốn cạnh bằng nhau. *It's a square!* Quả thứ ba có ba góc nhọn. *It's a triangle!* Gió thổi vù vù, bóng bay lên đủ màu: *pink, black, white, blue!* Pip đếm: *one, two, three, four, five, six!* Cả lớp mình cùng nói với Pip nhé: *circle, square, triangle!*"
      },
      "Unit 1 Home": {
        "ten": "Truyện: Mèo con tìm nhà",
        "tu": "bedroom, kitchen, bathroom, living room",
        "ke": "Meo meo! Mèo con bị lạc trong Làng nhà sàn, không tìm thấy mẹ. Pip dẫn mèo con đi gõ cửa: cốc, cốc, cốc! Cửa thứ nhất mở ra, có chiếc giường êm êm. *What room is this? It's a bedroom!* Cửa thứ hai thơm mùi cơm. *It's a kitchen!* Cửa thứ ba có tiếng nước chảy tí tách. *It's a bathroom!* Cửa cuối cùng có ghế sofa, mẹ mèo đang ngồi chờ. *It's a living room!* Mèo con nhảy vào lòng mẹ: *Thank you, Pip!* Cả lớp mình cùng nói nhé: *bedroom, kitchen, bathroom, living room!*"
      },
      "Unit 2 Toys": {
        "ten": "Truyện: Gấu tìm đồ chơi",
        "tu": "ball, car, train, doll, teddy",
        "ke": "Sáng nay, Pip bay ngang Hang đồ chơi thì nghe tiếng khóc hu hu. Ai vậy ta? À, là bạn Gấu! Gấu buồn lắm, vì đồ chơi của Gấu trốn hết vào hang rồi. Pip ghé mắt nhìn vào hang tối. Có một cái bóng tròn tròn, nảy tưng tưng. *What's this? It's a ball! Ball!* Rồi một cái bóng chạy vèo vèo, bíp bíp. *What's this? It's a car! Car!* Nghe kìa: xình xịch, xình xịch! *It's a train! Train!* Còn hai bạn trốn sau cùng: một bạn tóc dài mặc váy hồng, và một bạn lông mềm mềm. *It's a doll! It's a teddy!* Gấu vui quá, ôm teddy thật chặt. Gấu nói: *Thank you, Pip!* Bây giờ cả lớp mình cùng gọi tên đồ chơi với Gấu nhé: *ball, car, train, doll, teddy!*"
      },
      "Unit 3 Body": {
        "ten": "Truyện: Cún con tập thể dục",
        "tu": "head, arm, hand, finger, leg, foot",
        "ke": "Ở Bãi biển thể thao, cún con muốn tập thể dục mà quên hết tên các bộ phận cơ thể. Ben làm mẫu cho cún con xem nhé. Ben gật gật cái đầu: *This is my head! Head!* Ben giơ cánh tay lên cao: *Arm!* Ben vẫy vẫy bàn tay: *Hand!* Ben xoè ngón tay ra đếm: *Finger, finger! How many fingers? Ten!* Ben co một chân lên: *Leg!* Ben dậm dậm bàn chân: *Foot!* Cún con làm theo, vui quá sủa gâu gâu. Cả lớp mình đứng lên làm theo cún con nhé: *head, arm, hand, finger, leg, foot!*"
      },
      "Unit 4 Clothes": {
        "ten": "Truyện: Cừu non tìm áo ấm",
        "tu": "boots, scarf, socks, T-shirt, skirt, shorts",
        "ke": "Trên Núi tuyết, cừu non run cầm cập: lạnh quá, lạnh quá! Gió thổi bay hết quần áo của cừu non rồi. Pip bay đi tìm giúp. Dưới tảng băng có một đôi ủng. *Look! Boots!* Trên cành cây có một chiếc khăn dài. *What is it? It's a scarf!* Trong hốc đá có đôi tất nhỏ. *Look! Socks!* Bay trên trời là một chiếc áo phông. *It's a T-shirt!* Cừu non đi *boots*, mang *socks*, quàng *scarf*, ấm ơi là ấm! Còn *skirt* và *shorts* thì cất đi, để dành mùa hè. Cả lớp mình cùng nói nhé: *boots, scarf, socks, T-shirt!*"
      },
      "Unit 5 Animals": {
        "ten": "Truyện: Sư tử con chơi trốn tìm",
        "tu": "elephant, monkey, snake, mouse, fish, lion",
        "ke": "Trong Rừng nhiệt đới, sư tử con rủ các bạn chơi trốn tìm. Bụi cây rung rinh, thò ra một cái vòi dài. *What animal is this? It's an elephant!* Trên cành cây có tiếng khẹc khẹc. *It's a monkey!* Dưới bãi cỏ có tiếng xì xì, bò ngoằn ngoèo. *It's a snake!* Trong hốc cây có tiếng chít chít nho nhỏ. *It's a mouse!* Dưới suối, cái đuôi quẫy quẫy. *It's a fish!* Rồi có tiếng gầm thật to: *Roar!* Ai đây ta? *It's a lion!* À, là sư tử con đó! Cả lớp mình cùng gọi tên các bạn thú nhé: *elephant, monkey, snake, mouse, fish, lion!*"
      },
      "Unit 6 Food": {
        "ten": "Truyện: Khỉ con đói bụng",
        "tu": "cake, water, sandwiches, apple, banana, orange, pear",
        "ke": "Bên kia suối, khỉ con ôm bụng: *I'm hungry!* Đói quá! Rồi khỉ con lè lưỡi: *I'm thirsty!* Khát quá! Pip mang giỏ đồ ăn bay qua suối. Pip mở giỏ ra. *What's this? It's a cake!* Có cả bánh mì kẹp: *Sandwiches!* Và một chai nước mát: *It's water!* Trong Vườn trái cây còn có *an apple, a banana, an orange* và *a pear*. Khỉ con ăn no, uống nước, cười hì hì: *Thank you, Pip!* Cả lớp mình cùng nói nhé: *cake, water, apple, banana, orange, pear!*"
      },
      "Festivals": {
        "ten": "Truyện: Chim xanh đi hội hoá trang",
        "tu": "witch, pumpkin, bat, spider, ghost, costume",
        "ke": "Tối nay Lâu đài lễ hội mở hội hoá trang. Chim xanh hơi sợ, nép sau lưng Pip. Ai cưỡi chổi bay vèo vèo kìa? *Who is this? It's a witch!* Trên bậc thềm có quả bí cười toe toét. *What is it? It's a pumpkin!* Trên mái có con dơi vỗ cánh phành phạch. *It's a bat!* Trên tường có con nhện giăng tơ. *It's a spider!* Rồi một bóng trắng bay ra: Hù! *It's a ghost!* Nhưng con ma cười khúc khích, thì ra là Ben trùm khăn: *It's my costume!* Chim xanh hết sợ, cười vang. Cả lớp mình cùng nói nhé: *witch, pumpkin, bat, spider, ghost!*"
      }
    },
    "daohatmam": {
      "Welcome": {
        "ten": "Truyện: Chào các bạn mới",
        "tu": "hello, Amanda, George, Alfie, teacher, clap",
        "ke": "Phao trôi vào bến Đảo Hạt Mầm. Pip vẫy cánh: *Hello! Hello!* Ai đến kìa? *Hello, Amanda! Hello, George! Hello, Alfie!* Cô giáo cũng tới nữa: *Hello, teacher!* Cả lớp vỗ tay chào nào: *Clap, clap, clap!* Bây giờ mình đứng lên: *Stand up!* Rồi ngồi xuống: *Sit down!* Giỏi quá! Cả lớp cùng chào Pip nhé: *Hello, Pip!*"
      },
      "Unit 1 School": {
        "ten": "Truyện: Thỏ con đi học",
        "tu": "bag, book, crayon, pencil",
        "ke": "Thỏ con chuẩn bị đi học, mà tuyết phủ kín đồ dùng của thỏ con rồi. Pip thổi phù phù, tuyết bay đi. *What's this? It's a bag!* Phù phù! *What's this? It's a book!* Phù phù! *It's a crayon!* Màu đỏ: *red!* Phù phù! *It's a pencil!* Màu vàng: *yellow!* Thỏ con đeo cặp đi học, vui quá. Cả lớp mình cùng nói nhé: *bag, book, crayon, pencil!*"
      },
      "Unit 2 Family": {
        "ten": "Truyện: Gà con tìm nhà",
        "tu": "daddy, mummy, brother, sister",
        "ke": "Chiếp chiếp! Gà con đi lạc, muốn về nhà. Pip dẫn gà con đi gõ cửa: cốc, cốc, cốc! Cửa mở ra, có chú gà trống to. *Who's this?* Gà con reo lên: *My daddy!* Bên cạnh là gà mái: *My mummy!* Còn có một anh gà: *My brother!* Và một chị gà: *My sister!* Cả nhà ôm gà con thật chặt. Cả lớp mình cùng nói nhé: *daddy, mummy, brother, sister!*"
      },
      "Unit 3 Toys": {
        "ten": "Truyện: Gấu trúc con tìm đồ chơi",
        "tu": "ball, car, doll, teddy",
        "ke": "Gấu trúc con buồn thiu, vì đồ chơi trốn hết vào hang. Pip nhìn vào hang tối. Cái gì tròn tròn, nảy tưng tưng? *What's this? It's a ball!* Màu xanh: *blue!* Cái gì chạy bíp bíp? *It's a car!* Màu xanh lá: *green!* Còn có *a doll* và *a teddy* nữa! Gấu trúc con ôm teddy, cười tít mắt. Cả lớp mình cùng nói nhé: *ball, car, doll, teddy!*"
      },
      "Unit 4 Body": {
        "ten": "Truyện: Ếch con qua cầu",
        "tu": "face, eye, ear, nose, mouth",
        "ke": "Ếch con đứng bên kia cầu treo, muốn chơi với các bạn. Pip bảo: mình chỉ đúng khuôn mặt thì cầu sẽ hiện ra. Đây là gì? *It's an eye!* Mắt chớp chớp. Đây là gì? *It's an ear!* Tai nghe nghe. *It's a nose!* Mũi ngửi ngửi. *It's a mouth!* Miệng cười thật tươi. Cả khuôn mặt: *face!* Ếch con nhảy ộp ộp qua cầu. Cả lớp mình chỉ và nói nhé: *eye, ear, nose, mouth!*"
      },
      "Unit 5 Pets": {
        "ten": "Truyện: Vịt con chơi trốn tìm",
        "tu": "cat, dog, fish, mouse",
        "ke": "Vịt con chơi trốn tìm với các bạn thú cưng. Bụi cây rung rinh, có tiếng meo meo. *Is this a cat? Yes, it is!* Bụi cây khác có tiếng gâu gâu. *Is this a dog? Yes, it is!* Dưới hồ có cái đuôi quẫy quẫy. *It's a fish!* Có tiếng chít chít bé xíu: *It's a mouse!* Con chuột thì *little*, con chó thì *big*. Cả lớp mình cùng nói nhé: *cat, dog, fish, mouse!*"
      },
      "Unit 6 Food": {
        "ten": "Truyện: Sóc con đói bụng",
        "tu": "apple, banana, orange, pear",
        "ke": "Sóc con đói bụng lắm, mà sóc ở bên kia suối. Pip mang giỏ trái cây sang. *What is it? An apple!* Quả táo đỏ. *A banana!* Quả chuối vàng. *An orange!* Quả cam tròn. *A pear!* Quả lê ngọt. Sóc con đếm: *one, two, three!* Sóc con ăn no rồi. Cả lớp mình cùng nói nhé: *apple, banana, orange, pear!*"
      },
      "Festivals": {
        "ten": "Truyện: Nhím con đi hội",
        "tu": "witch, cat, spider",
        "ke": "Quảng trường mở hội hoá trang. Nhím con đi xem cùng Pip. Ai đội mũ nhọn, cưỡi chổi kìa? *Who is this? It's a witch!* Ai kêu meo meo? *It's a cat!* Ai giăng tơ trên cây? *It's a spider!* Nhím con vỗ tay thích quá. Cả lớp mình cùng nói nhé: *witch, cat, spider!*"
      }
    },
    "daocauvong": {
      "Welcome": {
        "ten": "Truyện: Những quả bóng cầu vồng",
        "tu": "Amanda, George, Alfie, red, yellow, blue, green, orange",
        "ke": "Phao trôi vào bến Đảo Cầu Vồng, ai đứng trên phao kìa? *Who's this? It's Amanda!* *It's George!* Và *Alfie* nữa! Các bạn mang theo bóng bay đủ màu. *What colour is it? It's red!* Rồi *yellow, blue, green* và *orange!* Pip đếm bóng: *one, two, three!* Bóng bay lên thành một chiếc cầu vồng thật đẹp. Cả lớp mình cùng nói nhé: *red, yellow, blue, green, orange!*"
      },
      "Unit 1 School": {
        "ten": "Truyện: Cú mèo con tìm đồ",
        "tu": "chair, table, door, window, bag, book",
        "ke": "Cú mèo con dọn lớp học, mà đồ đạc trốn vào hang hết rồi. Pip soi đèn vào hang. *What is this? It's a chair!* Cái ghế. *It's a table!* Cái bàn. *Is this a door? Yes!* Cái cửa ra vào. *It's a window!* Cửa sổ. Còn có *a bag* và *a book* nữa. Lớp học của cú mèo con gọn gàng rồi. Cả lớp mình cùng nói nhé: *chair, table, door, window, bag, book!*"
      },
      "Unit 2 Family": {
        "ten": "Truyện: Kangaroo con thăm ông bà",
        "tu": "daddy, mummy, brother, sister, grandad, granny",
        "ke": "Kangaroo con nhảy tưng tưng đi thăm ông bà. Pip đi cùng, gõ cửa: cốc, cốc, cốc! Cửa mở, kangaroo con chỉ từng người: *This is my granny!* Bà. *This is my grandad!* Ông. *This is my daddy* và *this is my mummy!* Còn có *my brother* và *my sister* nữa. Cả nhà ôm nhau thật vui. Cả lớp mình cùng nói nhé: *daddy, mummy, brother, sister, grandad, granny!*"
      },
      "Unit 3 Body": {
        "ten": "Truyện: Chim cánh cụt qua cầu",
        "tu": "head, shoulders, arms, hands, legs, feet",
        "ke": "Chim cánh cụt con đứng bên kia cầu treo. Pip nói: làm theo Ben, cầu sẽ hiện ra! Ben chạm đầu: *head!* Chạm vai: *shoulders!* Giơ hai tay: *arms!* Vỗ bàn tay: *hands!* Đá đá chân: *legs!* Dậm dậm bàn chân: *feet!* Chim cánh cụt lạch bạch qua cầu. Cả lớp mình đứng lên làm theo nhé: *head, shoulders, arms, hands, legs, feet!*"
      },
      "Unit 4 Clothes": {
        "ten": "Truyện: Hồng hạc con lạnh run",
        "tu": "T-shirt, trousers, skirt, dress, shoes",
        "ke": "Trên núi tuyết, hồng hạc con lạnh run, quần áo bị băng phủ kín. Pip gõ gõ, băng vỡ ra: rắc, rắc! *What is it? It's a T-shirt!* Rắc, rắc! *Trousers!* Rắc, rắc! *It's a skirt!* Rắc, rắc! *It's a dress!* Còn có đôi giày nữa: *Shoes!* Hồng hạc con mặc ấm rồi, cảm ơn Pip. Cả lớp mình cùng nói nhé: *T-shirt, trousers, skirt, dress, shoes!*"
      },
      "Unit 5 Animals": {
        "ten": "Truyện: Hươu cao cổ chơi trốn tìm",
        "tu": "elephant, lion, monkey, snake, dog, cat",
        "ke": "Hươu cao cổ con cổ dài, nhìn thấy hết các bạn đang trốn. Bụi cây có cái vòi dài: *What animal is this? It's an elephant!* Tiếng gầm: *It's a lion!* Tiếng khẹc khẹc trên cây: *It's a monkey!* Tiếng xì xì dưới cỏ: *It's a snake!* Tiếng gâu gâu: *It's a dog!* Tiếng meo meo: *It's a cat!* Tìm được hết rồi! Cả lớp mình cùng nói nhé: *elephant, lion, monkey, snake, dog, cat!*"
      },
      "Unit 6 Transport": {
        "ten": "Truyện: Cáo con tới sân bay",
        "tu": "car, bus, train, bike, plane, boat",
        "ke": "Cáo con muốn tới sân bay, mà phải đi qua nhiều con đường. Bíp bíp! *What is it? It's a car!* Một chiếc xe to chở nhiều người: *It's a bus!* Xình xịch, xình xịch: *It's a train!* Kính coong: *It's a bike!* Qua suối thì đi thuyền: *It's a boat!* Tới sân bay rồi, ù ù cất cánh: *It's a plane!* Cả lớp mình cùng nói nhé: *car, bus, train, bike, boat, plane!*"
      },
      "Festivals": {
        "ten": "Truyện: Hà mã con đi hội",
        "tu": "ghost, pumpkin, bat, cat, costume",
        "ke": "Quảng trường mở hội hoá trang. Hà mã con mặc bộ đồ thật đẹp: *my costume!* Trên bậc thềm có quả bí cười: *What is it? It's a pumpkin!* Trên cây có con dơi: *It's a bat!* Có tiếng meo meo: *It's a cat!* Rồi một bóng trắng: Hù! *It's a ghost!* Thì ra là Pip trùm khăn, hi hi! Cả lớp mình cùng nói nhé: *ghost, pumpkin, bat, cat!*"
      }
    }
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
    Object.entries(truyen).forEach(([k, d]) => { if (store && store !== 'all' && store !== k) return; Object.entries(d).forEach(([u, t]) => out.push({ ma: maTruyen(k, u), nhom: 'Truyện Pip kể · ' + ((dao[k] && dao[k].ten) || k) + ' · ' + u, ten: t.ten, ke: t.ke.replace(/\*/g, ''), dai: true })); });
    Object.entries(tro).forEach(([g, d]) => out.push({ ma: maTro(g), nhom: 'Trò chơi (dùng chung cả ba đảo)', ten: d.ten, ke: d.ke }));
    return out;
  }
  window.LOI_KE = { tro, dao, truyen, maTro, maDao, maTruyen, truyenOf, list };
})();
