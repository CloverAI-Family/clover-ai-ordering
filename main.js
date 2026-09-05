const menu = [
  {id:1,cat:'main',emoji:'🥚',image:'assets/menu/egg-pancake.jpg',colors:['#f3b64b','#d97726'],zh:'蛋餅',ja:'台湾風卵クレープ',en:'Egg Pancake',ko:'대만식 계란 크레페',price:45,zhDesc:'鬆軟餅皮包炒蛋，台灣早餐經典',jaDesc:'もちもちの生地で卵を包んだ台湾朝食の定番',enDesc:'Soft egg crepe, a Taiwan breakfast classic',koDesc:'부드러운 반죽에 달걀을 넣은 대만식 아침 메뉴'},
  {id:2,cat:'main',emoji:'🥪',image:'assets/menu/sandwich.jpg',colors:['#e0a45f','#9d6434'],zh:'三明治',ja:'サンドイッチ',en:'Sandwich',ko:'샌드위치',price:55,zhDesc:'火腿、蛋、起司與生菜吐司',jaDesc:'ハム、卵、チーズ、レタスのトーストサンド',enDesc:'Ham, egg, cheese, lettuce and toast',koDesc:'햄, 달걀, 치즈와 양상추를 넣은 토스트'},
  {id:3,cat:'main',emoji:'🍔',image:'assets/menu/hamburger.jpg',colors:['#df8c42','#9c4f25'],zh:'漢堡',ja:'ハンバーガー',en:'Hamburger',ko:'햄버거',price:65,zhDesc:'豬肉漢堡排、生菜與番茄',jaDesc:'豚肉パティ、レタス、トマトのバーガー',enDesc:'Pork patty with lettuce and tomato',koDesc:'돼지고기 패티, 양상추와 토마토가 든 햄버거'},
  {id:4,cat:'main',emoji:'🍝',image:'assets/menu/sizzling-noodles.jpg',colors:['#e99945','#aa4729'],zh:'鐵板麵',ja:'鉄板焼きそば',en:'Sizzling Noodles',ko:'철판 볶음면',price:60,zhDesc:'台式鐵板炒麵加荷包蛋',jaDesc:'目玉焼きを添えた台湾風鉄板焼きそば',enDesc:'Taiwan-style noodles with a fried egg',koDesc:'달걀 프라이를 곁들인 대만식 철판 볶음면'},
  {id:5,cat:'main',emoji:'🍘',image:'assets/menu/turnip-cake.jpg',colors:['#c7a26a','#7a6041'],zh:'蘿蔔糕',ja:'大根もち',en:'Turnip Cake',ko:'무떡',price:35,zhDesc:'外酥內軟的台式蘿蔔糕',jaDesc:'外は香ばしく中は柔らかい台湾風大根もち',enDesc:'Crispy Taiwan-style turnip cake',koDesc:'겉은 바삭하고 속은 부드러운 대만식 무떡'},
  {id:6,cat:'drink',emoji:'🫖',image:'assets/menu/black-tea.jpg',colors:['#aa7651','#603f32'],zh:'紅茶',ja:'紅茶',en:'Black Tea',ko:'홍차',price:15,zhDesc:'清爽回甘的台灣傳統紅茶',jaDesc:'すっきりした後味の台湾伝統紅茶',enDesc:'Refreshing Taiwan black tea',koDesc:'깔끔한 맛의 대만 전통 홍차'},
  {id:7,cat:'drink',emoji:'🥛',image:'assets/menu/milk-tea.jpg',colors:['#cf9f72','#865a42'],zh:'奶茶',ja:'ミルクティー',en:'Milk Tea',ko:'밀크티',price:25,zhDesc:'香醇順口的早餐店奶茶',jaDesc:'まろやかで飲みやすい朝食店のミルクティー',enDesc:'Rich and smooth breakfast milk tea',koDesc:'부드럽고 진한 아침 식당 밀크티'},
  {id:8,cat:'drink',emoji:'🫘',image:'assets/menu/soy-milk.jpg',colors:['#d5b784','#8b714a'],zh:'豆漿',ja:'豆乳',en:'Soy Milk',ko:'두유',price:20,zhDesc:'濃醇傳統豆漿，冷熱皆宜',jaDesc:'濃厚な伝統豆乳、温冷を選べます',enDesc:'Traditional rich soy milk',koDesc:'진한 전통 두유, 따뜻하게 또는 차갑게'},
  {id:9,cat:'drink',emoji:'☕',image:'assets/menu/coffee.jpg',colors:['#8d614b','#3e2b28'],zh:'咖啡',ja:'コーヒー',en:'Coffee',ko:'커피',price:35,zhDesc:'現煮美式咖啡',jaDesc:'淹れたてのアメリカーノ',enDesc:'Freshly brewed Americano',koDesc:'갓 내린 아메리카노'},
  {id:10,cat:'drink',emoji:'🍊',image:'assets/menu/orange-juice.jpg',colors:['#ffb134','#e16b21'],zh:'柳橙汁',ja:'オレンジジュース',en:'Orange Juice',ko:'오렌지 주스',price:30,zhDesc:'酸甜清爽柳橙汁',jaDesc:'甘酸っぱく爽やかなオレンジジュース',enDesc:'Sweet and refreshing orange juice',koDesc:'새콤달콤하고 상쾌한 오렌지 주스'},
  {id:11,cat:'snack',emoji:'🍗',image:'assets/menu/chicken-nuggets.jpg',colors:['#d69b4c','#9c582f'],zh:'雞塊',ja:'チキンナゲット',en:'Chicken Nuggets',ko:'치킨 너겟',price:40,zhDesc:'外酥內嫩的金黃雞塊',jaDesc:'外はカリッと中はジューシーなナゲット',enDesc:'Golden crispy chicken nuggets',koDesc:'겉은 바삭하고 속은 촉촉한 치킨 너겟'},
  {id:12,cat:'snack',emoji:'🌭',image:'assets/menu/hot-dog.jpg',colors:['#e06b46','#94362f'],zh:'熱狗',ja:'台湾風ミニソーセージ',en:'Hot Dog',ko:'대만식 미니 소시지',price:35,zhDesc:'香煎台式小熱狗',jaDesc:'香ばしく焼いた台湾風ミニソーセージ',enDesc:'Pan-fried Taiwan-style mini hot dogs',koDesc:'노릇하게 구운 대만식 미니 소시지'},
  {id:13,cat:'snack',emoji:'🍟',image:'assets/menu/french-fries.jpg',colors:['#f0bb3e','#db7425'],zh:'薯條',ja:'フライドポテト',en:'French Fries',ko:'감자튀김',price:40,zhDesc:'熱騰騰的金黃酥脆薯條',jaDesc:'熱々でサクサクのフライドポテト',enDesc:'Hot golden crispy fries',koDesc:'따끈하고 바삭한 감자튀김'}
];

const copy = {
  zh:{brandName:'Clover AI 點餐系統',welcome:'歡迎使用 Clover AI 點餐系統',heroTitle:'今天想吃點什麼？',heroBody:'不用下載 App，直接開始點餐。',normalOrder:'一般點餐',normalHint:'瀏覽完整菜單',aiOrder:'AI 點餐',aiHint:'依需求引導點餐',menuEyebrow:'台灣早餐',menuTitle:'選擇餐點',orderSummary:'訂單確認',yourCart:'你的購物車',emptyCart:'購物車還是空的',total:'合計',continueOrder:'繼續點餐',sendOrder:'完成示範訂單',orderReceived:'示範流程完成',orderSent:'示範訂單已建立',orderWait:'訂單沒有傳送至真實廚房或店員。這個畫面只用於展示點餐流程。',newOrder:'重新點餐',waiter:'叫服務員',menu:'菜單',cart:'購物車',quantity:'數量',addToCart:'加入購物車',all:'全部',main:'主食',drink:'飲料',snack:'點心',table:'桌號',added:'已加入購物車',waiterSent:'服務員呼叫為展示功能，目前尚未連線',aiSoon:'AI 推薦會在下一階段接上',remove:'移除'},
  ja:{brandName:'Clover AI 注文システム',welcome:'Clover AI 注文システムへようこそ',heroTitle:'今日は何を食べますか？',heroBody:'アプリのインストール不要。すぐに注文できます。',normalOrder:'通常注文',normalHint:'メニューを見る',aiOrder:'AI 注文',aiHint:'希望に合わせて注文をご案内',menuEyebrow:'台湾の朝ごはん',menuTitle:'料理を選ぶ',orderSummary:'注文確認',yourCart:'カート',emptyCart:'カートは空です',total:'合計',continueOrder:'注文を続ける',sendOrder:'デモ注文を完了',orderReceived:'デモ完了',orderSent:'デモ注文を作成しました',orderWait:'この注文は実際の厨房や店員には送信されません。注文フローのデモ画面です。',newOrder:'もう一度注文',waiter:'店員を呼ぶ',menu:'メニュー',cart:'カート',quantity:'数量',addToCart:'カートに追加',all:'すべて',main:'主食',drink:'ドリンク',snack:'サイド',table:'テーブル',added:'カートに追加しました',waiterSent:'店員呼び出しはデモ機能で、現在は接続されていません',aiSoon:'AI おすすめ機能は次のバージョンで公開します。',remove:'削除'},
  en:{brandName:'Clover AI Ordering',welcome:'Welcome to Clover AI Ordering',heroTitle:'What would you like today?',heroBody:'No app needed. Start ordering right away.',normalOrder:'Browse Menu',normalHint:'See the full breakfast menu',aiOrder:'AI Ordering',aiHint:'Guided ordering for your needs',menuEyebrow:'Taiwan Breakfast',menuTitle:'Choose your meal',orderSummary:'Order Review',yourCart:'Your Cart',emptyCart:'Your cart is empty',total:'Total',continueOrder:'Keep Ordering',sendOrder:'Complete Demo Order',orderReceived:'Demo Complete',orderSent:'Demo Order Created',orderWait:'This order was not sent to a real kitchen or staff member. This screen only demonstrates the ordering flow.',newOrder:'Start New Order',waiter:'Call Staff',menu:'Menu',cart:'Cart',quantity:'Quantity',addToCart:'Add to Cart',all:'All',main:'Mains',drink:'Drinks',snack:'Snacks',table:'Table',added:'Added to cart',waiterSent:'Staff calling is a demo feature and is not connected yet.',aiSoon:'AI recommendations are coming in the next build.',remove:'Remove'},
  ko:{brandName:'Clover AI 주문 시스템',welcome:'Clover AI 주문 시스템에 오신 것을 환영합니다',heroTitle:'오늘은 무엇을 드시겠어요?',heroBody:'앱 설치 없이 바로 주문하세요.',normalOrder:'일반 주문',normalHint:'전체 메뉴 보기',aiOrder:'AI 주문',aiHint:'필요에 맞춘 단계별 주문',menuEyebrow:'대만식 아침 식사',menuTitle:'메뉴 선택',orderSummary:'주문 확인',yourCart:'장바구니',emptyCart:'장바구니가 비어 있습니다',total:'합계',continueOrder:'계속 주문하기',sendOrder:'데모 주문 완료',orderReceived:'데모 완료',orderSent:'데모 주문이 생성되었습니다',orderWait:'이 주문은 실제 주방이나 직원에게 전송되지 않습니다. 주문 흐름을 보여 주는 데모 화면입니다.',newOrder:'새 주문 시작',waiter:'직원 호출',menu:'메뉴',cart:'장바구니',quantity:'수량',addToCart:'장바구니에 담기',all:'전체',main:'주식',drink:'음료',snack:'간식',table:'테이블',added:'장바구니에 담았습니다',waiterSent:'직원 호출은 데모 기능이며 현재 연결되어 있지 않습니다.',aiSoon:'AI 추천 기능은 다음 버전에서 제공됩니다.',remove:'삭제'}
};

const extra = {
  zh:{aiHint:'依需求快速找到餐點',aiNav:'AI 推薦',aiAssistant:'AI 點餐助手',aiTitle:'告訴我你的需求',restart:'重新開始',aiWelcome:'你好，我可以直接引導你完成一份餐點，也能依過敏或飲食需求縮小選擇。',generalRecommend:'引導點餐',generalSub:'依序選擇主餐、飲料與點心',specialOrder:'特別點餐',specialSub:'過敏、素食或飲食限制',generalMessage:'第一步，先選一份主餐。',guideDrink:'主餐選好了，接著選飲料。',guideSnack:'最後選一份點心。',guideDone:'餐點選好了，請確認示範訂單。',specialMessage:'請選擇一項需求，我只會依示範菜單標示進行篩選。',allergyTitle:'過敏原避開',dietTitle:'素食選擇',dairy:'乳製品',egg:'蛋',gluten:'麩質',soy:'大豆',nuts:'堅果',seafood:'海鮮',vegetarian:'蛋奶素',vegan:'全素',popularReason:'依目前示範流程提供的餐點選擇。',filterReason:'依目前示範菜單標示，未列出此項成分。',vegReason:'依目前示範菜單標示符合這項飲食選擇。',chooseItem:'查看餐點',allergyDisclaimer:'提醒：此結果只依示範菜單的成分標示篩選，不代表沒有交叉接觸風險；實際用餐請再次向店員確認。',restrictionNotice:'目前套用飲食限制，不相容的加料選項已隱藏。',optionAdd:'加點',optionRemove:'不要加入',optionSeasoning:'調味',optionSize:'大小',optionSweetness:'甜度',optionIce:'冰塊',cheese:'起司 +NT$5',eggAdd:'加蛋 +NT$5',meat:'加肉 +NT$10',ketchup:'番茄醬',pepper:'胡椒',noOnion:'不要蔥',noLettuce:'不要生菜',noTomato:'不要番茄',medium:'中杯',large:'大杯 +NT$5',sugar0:'無糖',sugarHalf:'半糖',sugarFull:'全糖',iceNone:'去冰',iceLess:'少冰',iceNormal:'正常冰'},
  ja:{aiHint:'希望に合う料理をすばやく検索',aiNav:'AI おすすめ',aiAssistant:'AI 注文アシスタント',aiTitle:'ご希望を教えてください',restart:'最初から',aiWelcome:'主食、ドリンク、サイドの順にご案内するほか、アレルギーや食事制限で絞り込めます。',generalRecommend:'ガイド注文',generalSub:'主食、ドリンク、サイドを順番に選ぶ',specialOrder:'特別注文',specialSub:'アレルギー・菜食・食事制限',generalMessage:'最初に主食を選んでください。',guideDrink:'主食を選びました。次はドリンクです。',guideSnack:'最後にサイドを選んでください。',guideDone:'選択が完了しました。デモ注文を確認してください。',specialMessage:'ご希望を1つ選んでください。デモメニューの表示情報だけで絞り込みます。',allergyTitle:'避けたいアレルゲン',dietTitle:'菜食メニュー',dairy:'乳製品',egg:'卵',gluten:'小麦・グルテン',soy:'大豆',nuts:'ナッツ',seafood:'魚介類',vegetarian:'卵乳菜食',vegan:'ヴィーガン',popularReason:'現在のデモフローでご案内するメニューです。',filterReason:'現在のデモメニューでは、この成分の記載がありません。',vegReason:'現在のデモメニュー表示では、この食事条件に合います。',chooseItem:'料理を見る',allergyDisclaimer:'注意：デモメニューの成分表示だけを基にした結果です。交差接触がないことを保証しません。実際の注文時は必ず店員に確認してください。',restrictionNotice:'食事制限に合わない追加オプションは非表示にしています。',optionAdd:'追加',optionRemove:'抜くもの',optionSeasoning:'調味料',optionSize:'サイズ',optionSweetness:'甘さ',optionIce:'氷',cheese:'チーズ +NT$5',eggAdd:'卵追加 +NT$5',meat:'肉追加 +NT$10',ketchup:'ケチャップ',pepper:'こしょう',noOnion:'ねぎ抜き',noLettuce:'レタス抜き',noTomato:'トマト抜き',medium:'M',large:'L +NT$5',sugar0:'無糖',sugarHalf:'半糖',sugarFull:'全糖',iceNone:'氷なし',iceLess:'氷少なめ',iceNormal:'通常'},
  en:{aiHint:'Quick recommendations for your needs',aiNav:'AI Picks',aiAssistant:'AI Ordering Assistant',aiTitle:'Tell me what you need',restart:'Start Over',aiWelcome:'I can guide you through a main, drink, and snack, or narrow the menu by allergy and dietary needs.',generalRecommend:'Guided Order',generalSub:'Choose a main, drink, and snack in order',specialOrder:'Special Request',specialSub:'Allergies, vegetarian, or dietary needs',generalMessage:'First, choose a main.',guideDrink:'Main selected. Now choose a drink.',guideSnack:'Last, choose a snack.',guideDone:'Your choices are ready. Review the demo order.',specialMessage:'Choose one need. I will filter only by the labels in this demo menu.',allergyTitle:'Avoid an allergen',dietTitle:'Dietary choices',dairy:'Dairy',egg:'Egg',gluten:'Gluten',soy:'Soy',nuts:'Nuts',seafood:'Seafood',vegetarian:'Vegetarian',vegan:'Vegan',popularReason:'A choice offered by the current demo flow.',filterReason:'This ingredient is not listed in the current demo menu data.',vegReason:'The current demo menu labels this item as suitable.',chooseItem:'View Item',allergyDisclaimer:'Reminder: results use only the demo menu labels and do not guarantee freedom from cross-contact. Please confirm ingredients with restaurant staff before eating.',restrictionNotice:'Incompatible add-ons are hidden while this dietary restriction is active.',optionAdd:'Add-ons',optionRemove:'Remove',optionSeasoning:'Seasoning',optionSize:'Size',optionSweetness:'Sweetness',optionIce:'Ice',cheese:'Cheese +NT$5',eggAdd:'Add egg +NT$5',meat:'Add meat +NT$10',ketchup:'Ketchup',pepper:'Pepper',noOnion:'No green onion',noLettuce:'No lettuce',noTomato:'No tomato',medium:'Medium',large:'Large +NT$5',sugar0:'No sugar',sugarHalf:'Half sugar',sugarFull:'Full sugar',iceNone:'No ice',iceLess:'Less ice',iceNormal:'Regular ice'},
  ko:{aiHint:'원하는 메뉴를 빠르게 추천',aiNav:'AI 추천',aiAssistant:'AI 주문 도우미',aiTitle:'원하는 조건을 알려 주세요',restart:'다시 시작',aiWelcome:'주식, 음료, 간식을 순서대로 안내하거나 알레르기 및 식단 조건으로 메뉴를 좁혀 드립니다.',generalRecommend:'단계별 주문',generalSub:'주식, 음료, 간식을 순서대로 선택',specialOrder:'특별 주문',specialSub:'알레르기, 채식 또는 식단 제한',generalMessage:'먼저 주식을 선택해 주세요.',guideDrink:'주식을 골랐습니다. 이제 음료를 선택해 주세요.',guideSnack:'마지막으로 간식을 선택해 주세요.',guideDone:'선택이 끝났습니다. 데모 주문을 확인해 주세요.',specialMessage:'조건 하나를 선택해 주세요. 데모 메뉴에 표시된 정보만으로 필터링합니다.',allergyTitle:'피해야 할 알레르기 성분',dietTitle:'채식 선택',dairy:'유제품',egg:'달걀',gluten:'글루텐',soy:'대두',nuts:'견과류',seafood:'해산물',vegetarian:'락토오보 채식',vegan:'비건',popularReason:'현재 데모 흐름에서 제공하는 메뉴입니다.',filterReason:'현재 데모 메뉴 정보에는 이 성분이 표시되어 있지 않습니다.',vegReason:'현재 데모 메뉴 표시상 이 식단 조건에 맞습니다.',chooseItem:'메뉴 보기',allergyDisclaimer:'주의: 이 결과는 데모 메뉴의 성분 표시만을 사용하며 교차 접촉이 없음을 보장하지 않습니다. 실제 식사 전 직원에게 다시 확인해 주세요.',restrictionNotice:'현재 식단 제한과 맞지 않는 추가 옵션은 숨겨집니다.',optionAdd:'추가',optionRemove:'빼기',optionSeasoning:'양념',optionSize:'크기',optionSweetness:'당도',optionIce:'얼음',cheese:'치즈 추가 +NT$5',eggAdd:'달걀 추가 +NT$5',meat:'고기 추가 +NT$10',ketchup:'케첩',pepper:'후추',noOnion:'파 빼기',noLettuce:'양상추 빼기',noTomato:'토마토 빼기',medium:'중간',large:'큰 컵 +NT$5',sugar0:'무가당',sugarHalf:'반당',sugarFull:'전당',iceNone:'얼음 없음',iceLess:'얼음 적게',iceNormal:'보통'}
};

const itemRules = {
  1:{allergens:['egg','gluten'],vegetarian:true,vegan:false,addons:['cheese']},
  2:{allergens:['egg','gluten','dairy'],vegetarian:false,vegan:false,addons:['cheese'],removes:['noLettuce']},
  3:{allergens:['egg','gluten','dairy'],vegetarian:false,vegan:false,addons:['eggAdd','cheese'],removes:['noLettuce','noTomato']},
  4:{allergens:['egg','gluten'],vegetarian:false,vegan:false,addons:['meat','eggAdd']},
  5:{allergens:['gluten'],vegetarian:true,vegan:true,addons:['eggAdd']},
  6:{allergens:[],vegetarian:true,vegan:true},7:{allergens:['dairy'],vegetarian:true,vegan:false},8:{allergens:['soy'],vegetarian:true,vegan:true},9:{allergens:[],vegetarian:true,vegan:true},10:{allergens:[],vegetarian:true,vegan:true},
  11:{allergens:['gluten'],vegetarian:false,vegan:false},12:{allergens:['gluten'],vegetarian:false,vegan:false},13:{allergens:[],vegetarian:true,vegan:true}
};
const optionPrices={cheese:5,eggAdd:5,meat:10,large:5};
const supportedLanguages=['zh','ja','en','ko'];
const flowCopy={
  zh:{generalRecommend:'AI 推薦',skip:'略過這一步',review:'確認',demoNotice:'介面示範：目前使用固定菜單規則，尚未串接生成式 AI。',noItems:'目前沒有符合條件的示範餐點，請向店員確認。',blocked:'這份餐點或加料與所選限制不符，未加入或送出。',restrictionLabel:'此份餐點的限制',selectedNow:'目前已選',emptySelection:'尚未選擇餐點'},
  ja:{generalRecommend:'AI おすすめ',skip:'このステップをスキップ',review:'確認',demoNotice:'画面デモ：現在は固定メニュールールを使用し、生成AIには接続していません。',noItems:'条件に合うデモメニューがありません。店員に確認してください。',blocked:'選択した条件に合わないため、追加または送信していません。',restrictionLabel:'この料理の条件',selectedNow:'現在の選択',emptySelection:'まだ料理を選んでいません'},
  en:{generalRecommend:'AI Recommendations',skip:'Skip this step',review:'Review',demoNotice:'Interface demo: fixed menu rules are used; generative AI is not connected yet.',noItems:'No demo items match. Please check with staff.',blocked:'This item or add-on conflicts with its restriction. Nothing was added or submitted.',restrictionLabel:'Restriction for this item',selectedNow:'Selected',emptySelection:'No items selected yet'},
  ko:{generalRecommend:'AI 추천',skip:'이 단계 건너뛰기',review:'확인',demoNotice:'화면 데모: 현재 고정 메뉴 규칙을 사용하며 생성형 AI는 연결되지 않았습니다.',noItems:'조건에 맞는 데모 메뉴가 없습니다. 직원에게 확인해 주세요.',blocked:'선택한 조건과 맞지 않아 추가하거나 전송하지 않았습니다.',restrictionLabel:'이 메뉴의 제한',selectedNow:'현재 선택',emptySelection:'아직 선택한 메뉴가 없습니다'}
};
const voiceCopy={
  zh:{aiWelcome:'連接您的個人 AI，以明確條件建立餐點草稿。',chatPlaceholder:'文字輸入尚未連線',chatLabel:'文字輸入尚未連線',voiceLabel:'語音輸入尚未連線',voiceDemo:'語音辨識尚未連線；這個按鈕目前是介面入口。',chatDemo:'文字對話尚未連線，請使用上方的個人 AI 接入示範。'},
  ja:{aiWelcome:'個人AIを接続し、明確な条件から注文案を作成します。',chatPlaceholder:'テキスト入力は未接続です',chatLabel:'テキスト入力は未接続です',voiceLabel:'音声入力は未接続です',voiceDemo:'音声認識はまだ接続されていません。このボタンは画面デモです。',chatDemo:'テキスト会話は未接続です。上の個人AI接続デモをご利用ください。'},
  en:{aiWelcome:'Connect your personal AI to build a meal draft from explicit conditions.',chatPlaceholder:'Text input is not connected',chatLabel:'Text input is not connected',voiceLabel:'Voice input is not connected',voiceDemo:'Voice recognition is not connected yet; this button is currently a UI entry point.',chatDemo:'Text conversation is not connected. Use the personal-AI connection demo above.'},
  ko:{aiWelcome:'개인 AI를 연결해 명확한 조건으로 주문 초안을 만듭니다.',chatPlaceholder:'텍스트 입력은 연결되지 않았습니다',chatLabel:'텍스트 입력은 연결되지 않았습니다',voiceLabel:'음성 입력은 연결되지 않았습니다',voiceDemo:'음성 인식은 아직 연결되지 않았습니다. 현재는 인터페이스 데모 버튼입니다.',chatDemo:'텍스트 대화는 연결되지 않았습니다. 위의 개인 AI 연결 데모를 이용해 주세요.'}
};
const agentCopy={
  zh:{agentReady:'您的個人 AI 已依本次授權條件建立訂單草稿。',agentDemo:'個人 AI 接入示範',agentConnect:'連接我的個人 AI',agentConnectHelp:'不傳送對話紀錄；先選一組示範條件，再確認本次分享範圍。',agentChooseProfile:'選擇個人 AI 要帶入的示範條件',agentProfileA:'避開乳製品的早餐',agentProfileASub:'預算 NT$150、主食＋無糖飲料',agentProfileB:'全素輕食',agentProfileBSub:'預算 NT$90、主食＋點心',agentPermission:'本次資料分享與授權回條',agentPermissionIntro:'建立草稿前，請確認個人 AI 只會分享以下結構化條件：',agentPurpose:'用途：僅建立這一次的本機示範草稿',agentAllow:'允許一次並建立草稿',agentBack:'返回選擇',agentSharedA:'本次只分享：預算 NT$150、避開乳製品、主食與無糖飲料。',agentSharedB:'本次只分享：預算 NT$90、全素、主食與點心。',agentRisk:'成分依店家示範標示判斷；交叉接觸仍需向店員確認。',agentReview:'查看並確認草稿'},
  ja:{agentReady:'個人AIが今回許可された条件から注文案を作成しました。',agentDemo:'個人AI接続デモ',agentConnect:'個人AIを接続',agentConnectHelp:'会話履歴は送信しません。デモ条件を選び、今回の共有範囲を確認します。',agentChooseProfile:'個人AIが共有するデモ条件を選択',agentProfileA:'乳製品を避けた朝食',agentProfileASub:'予算NT$150、主食＋無糖ドリンク',agentProfileB:'ヴィーガン軽食',agentProfileBSub:'予算NT$90、主食＋サイド',agentPermission:'今回のデータ共有・許可票',agentPermissionIntro:'注文案を作る前に、共有する構造化条件を確認してください：',agentPurpose:'用途：今回のローカルデモ注文案の作成のみ',agentAllow:'一度だけ許可して作成',agentBack:'選択に戻る',agentSharedA:'今回の共有：予算NT$150、乳製品を避ける、主食と無糖ドリンク。',agentSharedB:'今回の共有：予算NT$90、ヴィーガン、主食とサイド。',agentRisk:'食材は店舗のデモ表示に基づきます。交差接触はスタッフへの確認が必要です。',agentReview:'注文案を確認'},
  en:{agentReady:'Your personal AI created a draft from the conditions authorized for this order.',agentDemo:'Personal AI connection demo',agentConnect:'Connect my personal AI',agentConnectHelp:'No chat history is sent. Choose a demo profile, then review what is shared this time.',agentChooseProfile:'Choose the demo conditions your personal AI will share',agentProfileA:'Dairy-avoiding breakfast',agentProfileASub:'NT$150, main plus sugar-free drink',agentProfileB:'Vegan light meal',agentProfileBSub:'NT$90, main plus snack',agentPermission:'Data-sharing and permission receipt',agentPermissionIntro:'Before creating a draft, confirm the structured conditions your personal AI will share:',agentPurpose:'Purpose: create this local demo draft only',agentAllow:'Allow once and create draft',agentBack:'Back to choices',agentSharedA:'Shared this time only: NT$150, avoid dairy, main and sugar-free drink.',agentSharedB:'Shared this time only: NT$90, vegan, main and snack.',agentRisk:'Ingredients use the restaurant demo labels. Cross-contact still requires staff confirmation.',agentReview:'Review and confirm draft'},
  ko:{agentReady:'개인 AI가 이번 주문에 허용된 조건으로 주문 초안을 만들었습니다.',agentDemo:'개인 AI 연결 데모',agentConnect:'내 개인 AI 연결',agentConnectHelp:'대화 기록은 보내지 않습니다. 데모 조건을 고른 뒤 이번 공유 범위를 확인합니다.',agentChooseProfile:'개인 AI가 공유할 데모 조건 선택',agentProfileA:'유제품 제외 아침 식사',agentProfileASub:'예산 NT$150, 주식＋무가당 음료',agentProfileB:'비건 가벼운 식사',agentProfileBSub:'예산 NT$90, 주식＋간식',agentPermission:'이번 데이터 공유 및 권한 확인서',agentPermissionIntro:'초안을 만들기 전에 공유할 구조화 조건을 확인하세요:',agentPurpose:'용도: 이번 로컬 데모 초안 생성에만 사용',agentAllow:'한 번 허용하고 초안 만들기',agentBack:'선택으로 돌아가기',agentSharedA:'이번 공유: 예산 NT$150, 유제품 제외, 주식과 무가당 음료.',agentSharedB:'이번 공유: 예산 NT$90, 비건, 주식과 간식.',agentRisk:'재료는 매장의 데모 표시에 따릅니다. 교차 접촉은 직원에게 확인해야 합니다.',agentReview:'초안 확인하기'}
};
const experienceCopy={
  zh:{aiEntryMessage:'請選擇點餐方式。',directOrder:'直接點餐',directOrderSub:'和店內助手一起戳泡泡點餐',agentOrder:'Agent 點餐',agentOrderSub:'讓您的個人 AI 讀取菜單並建立草稿',backToAiEntry:'返回點餐方式',directWelcome:'歡迎光臨，請問要由我為您推薦什麼料理？',chooseOption:'請選擇這份餐點的設定。',addedDirect:'已加入餐點。還要加一份點心嗎？',finishDirect:'餐點準備好了，請確認完成訂單。',noThanks:'× 不用，謝謝',keepOriginal:'維持原樣',noExtra:'不用加料',confirmDirect:'確認完成訂單',unknownChoice:'我目前只聽得懂畫面上的餐點與選項，請點泡泡或換個說法。',voiceUnavailable:'此瀏覽器不支援語音辨識，仍可使用文字或泡泡點餐。',voiceListening:'正在聽，請說出畫面上的餐點或選項。',agentWelcome:'歡迎光臨。請掃描 QR Code，或複製網址給您的個人 AI 閱讀。',copyAgentUrl:'複製 Agent 網址',copiedAgentUrl:'Agent 網址已複製',qrPending:'QR Code 尚待加入；下方網址已可供個人 AI 使用。',agentPrivacy:'只公開菜單與草稿介面，不會分享對話、付款或個人記憶。',agentPreparing:'正在建立本次安全點餐入口……',agentWaiting:'正在等待您的個人 AI 建立草稿。',agentDraftReceived:'已收到訂單草稿，請在這個畫面確認。',agentConfirmOrder:'確認訂單',agentConfirming:'正在確認……',agentConfirmError:'確認失敗，請再試一次。',agentAcceptedSpeech:'訂單已確認，餐廳已收到您的訂單。',agentAcceptedTitle:'訂單已確認',agentOrderNumber:'訂單編號',agentOrderStatus:'狀態',agentSessionError:'暫時無法建立 Agent 點餐入口。',agentRetry:'重新嘗試'},
  ja:{aiEntryMessage:'注文方法を選んでください。',directOrder:'直接注文',directOrderSub:'店内アシスタントと泡をタップして注文',agentOrder:'Agent注文',agentOrderSub:'個人AIがメニューを読み注文案を作成',backToAiEntry:'注文方法へ戻る',directWelcome:'いらっしゃいませ。おすすめ料理をご案内しましょうか？',chooseOption:'この料理の設定を選んでください。',addedDirect:'追加しました。サイドメニューはいかがですか？',finishDirect:'準備できました。注文内容を確認してください。',noThanks:'× 結構です',keepOriginal:'そのまま',noExtra:'追加なし',confirmDirect:'注文内容を確認',unknownChoice:'画面の料理名と選択肢だけ認識できます。泡をタップするか言い換えてください。',voiceUnavailable:'このブラウザは音声認識に対応していません。文字入力か泡を利用できます。',voiceListening:'聞いています。画面の料理名または選択肢を話してください。',agentWelcome:'いらっしゃいませ。QRコードを読み取るか、URLを個人AIに渡してください。',copyAgentUrl:'Agent URLをコピー',copiedAgentUrl:'Agent URLをコピーしました',qrPending:'QRコードは準備中です。下のURLは個人AIで利用できます。',agentPrivacy:'公開するのはメニューと注文案の窓口だけです。会話、決済、個人記憶は共有しません。',agentPreparing:'今回の安全な注文入口を作成しています……',agentWaiting:'個人AIが注文案を作成するのを待っています。',agentDraftReceived:'注文案を受信しました。この画面で確認してください。',agentConfirmOrder:'注文を確定',agentConfirming:'確認中……',agentConfirmError:'確認できませんでした。もう一度お試しください。',agentAcceptedSpeech:'注文を確認しました。店舗が注文を受け取りました。',agentAcceptedTitle:'注文確認済み',agentOrderNumber:'注文番号',agentOrderStatus:'状態',agentSessionError:'Agent注文入口を作成できませんでした。',agentRetry:'もう一度試す'},
  en:{aiEntryMessage:'Choose how you would like to order.',directOrder:'Order here',directOrderSub:'Pop bubbles with the restaurant assistant',agentOrder:'Agent ordering',agentOrderSub:'Let your personal AI read the menu and create a draft',backToAiEntry:'Back to ordering methods',directWelcome:'Welcome. What would you like me to recommend?',chooseOption:'Choose an option for this item.',addedDirect:'Added. Would you like a snack?',finishDirect:'Your meal is ready. Please review the order.',noThanks:'× No, thanks',keepOriginal:'Keep original',noExtra:'No add-on',confirmDirect:'Review order',unknownChoice:'I currently recognize only the dishes and options shown on screen. Tap a bubble or try another phrase.',voiceUnavailable:'Voice recognition is unavailable in this browser. Text and bubbles still work.',voiceListening:'Listening. Say a dish or option shown on screen.',agentWelcome:'Welcome. Scan the QR code or copy the URL for your personal AI.',copyAgentUrl:'Copy Agent URL',copiedAgentUrl:'Agent URL copied',qrPending:'QR code is pending; the URL below already works for a personal AI.',agentPrivacy:'Only the public menu and draft interface are exposed. No chat, payment, or personal memory is shared.',agentPreparing:'Creating a secure ordering entry for this visit…',agentWaiting:'Waiting for your personal AI to create a draft.',agentDraftReceived:'Order draft received. Confirm it on this screen.',agentConfirmOrder:'Confirm order',agentConfirming:'Confirming…',agentConfirmError:'Confirmation failed. Please try again.',agentAcceptedSpeech:'Order confirmed. The restaurant has received your order.',agentAcceptedTitle:'Order confirmed',agentOrderNumber:'Order number',agentOrderStatus:'Status',agentSessionError:'The Agent ordering entry is temporarily unavailable.',agentRetry:'Try again'},
  ko:{aiEntryMessage:'주문 방식을 선택해 주세요.',directOrder:'직접 주문',directOrderSub:'매장 도우미와 버블을 눌러 주문',agentOrder:'Agent 주문',agentOrderSub:'개인 AI가 메뉴를 읽고 초안을 생성',backToAiEntry:'주문 방식으로 돌아가기',directWelcome:'어서 오세요. 어떤 요리를 추천해 드릴까요?',chooseOption:'이 메뉴의 옵션을 선택해 주세요.',addedDirect:'담았습니다. 간식을 추가하시겠어요?',finishDirect:'준비되었습니다. 주문을 확인해 주세요.',noThanks:'× 괜찮습니다',keepOriginal:'그대로',noExtra:'추가 없음',confirmDirect:'주문 확인',unknownChoice:'현재 화면에 표시된 메뉴와 옵션만 인식합니다. 버블을 누르거나 다시 말해 주세요.',voiceUnavailable:'이 브라우저는 음성 인식을 지원하지 않습니다. 문자와 버블은 사용할 수 있습니다.',voiceListening:'듣고 있습니다. 화면의 메뉴나 옵션을 말해 주세요.',agentWelcome:'어서 오세요. QR 코드를 스캔하거나 URL을 개인 AI에 전달해 주세요.',copyAgentUrl:'Agent URL 복사',copiedAgentUrl:'Agent URL을 복사했습니다',qrPending:'QR 코드는 준비 중입니다. 아래 URL은 개인 AI에서 사용할 수 있습니다.',agentPrivacy:'공개 메뉴와 주문 초안 인터페이스만 제공합니다. 대화, 결제, 개인 기억은 공유하지 않습니다.',agentPreparing:'이번 안전 주문 연결을 만들고 있습니다……',agentWaiting:'개인 AI가 주문 초안을 만들기를 기다리고 있습니다.',agentDraftReceived:'주문 초안을 받았습니다. 이 화면에서 확인해 주세요.',agentConfirmOrder:'주문 확정',agentConfirming:'확인 중……',agentConfirmError:'확인하지 못했습니다. 다시 시도해 주세요.',agentAcceptedSpeech:'주문이 확인되었습니다. 매장에서 주문을 받았습니다.',agentAcceptedTitle:'주문 확인 완료',agentOrderNumber:'주문 번호',agentOrderStatus:'상태',agentSessionError:'Agent 주문 연결을 만들 수 없습니다.',agentRetry:'다시 시도'}
};
const agentProfiles={
  dairy:{constraints:{allergensToAvoid:['dairy'],maxTotal:150},categories:['main','drink'],optionKeysByCategory:{drink:['sugar0','iceNone']},labelKey:'agentProfileA',subKey:'agentProfileASub',sharedKey:'agentSharedA'},
  vegan:{constraints:{diet:'vegan',maxTotal:90},categories:['main','snack'],optionKeysByCategory:{},labelKey:'agentProfileB',subKey:'agentProfileBSub',sharedKey:'agentSharedB'}
};
function detectLanguage(){
  let saved=null;try{saved=localStorage.getItem('clover-language')}catch{}
  if(supportedLanguages.includes(saved)) return saved;
  for(const locale of (navigator.languages?.length?navigator.languages:[navigator.language])){
    const lang=String(locale||'').toLowerCase();
    if(lang.startsWith('zh')) return 'zh';
    const short=lang.slice(0,2);
    if(supportedLanguages.includes(short)) return short;
  }
  return 'en';
}
const state={lang:detectLanguage(),view:'home',category:'all',cart:[],selected:null,quantity:1,options:{},aiStep:'start',aiMode:null,aiFilter:null,aiFilterKind:null,aiItems:[],guideStep:'main',selectedRestriction:null,selectedGuideStep:null,agentDraft:null,agentDemoRuns:0,agentConnectionStep:'start',agentProfileId:null,agentSession:null,agentSessionError:false,agentConfirming:false,agentConfirmError:false,agentSessionRequest:0,agentPollTimer:null,agentAnnouncedOrderId:null,aiFlow:'entry',directStage:'dish',directItem:null,directGroups:[],directGroupIndex:0,directOptionKeys:[],directChoices:[]};
const $=s=>document.querySelector(s);
const $$=s=>[...document.querySelectorAll(s)];
const escapeMarkup=value=>String(value??'').replace(/[&<>"']/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
const t=key=>experienceCopy[state.lang][key]??agentCopy[state.lang][key]??voiceCopy[state.lang][key]??flowCopy[state.lang][key]??extra[state.lang][key]??copy[state.lang][key]??key;
const table=new URLSearchParams(location.search).get('table')||'1';

function showView(view){
  const enteringAi=state.view!=='ai'&&view==='ai';
  if(view!=='ai')stopAgentPolling();
  state.view=view;
  document.body?.classList.toggle('ai-immersive',view==='ai');
  document.body?.classList.toggle('home-active',view==='home');
  $$('.view').forEach(el=>el.classList.toggle('active',el.id===`${view}-view`));
  $('#bottom-nav').classList.toggle('hidden',view==='home'||view==='success'||view==='ai');
  if(view==='cart') renderCart();
  if(view==='ai') renderAi();
  if(enteringAi)playAiEntrance();
  scrollTo({top:0,behavior:'smooth'});
}

function applyLanguage(){
  document.documentElement.lang={zh:'zh-Hant',ja:'ja',en:'en',ko:'ko'}[state.lang];
  $$('[data-i18n]').forEach(el=>{el.textContent=t(el.dataset.i18n)});
  $('#language-select').value=state.lang;
  document.title=t('brandName');
  $('#table-label').textContent=`${t('table')} ${table}`;
  $('#menu-table').textContent=`${t('table')} ${table}`;
  $('#ai-chat-input').placeholder=t('chatPlaceholder');
  $('#ai-chat-input').setAttribute?.('aria-label',t('chatLabel'));
  $('#ai-microphone').setAttribute?.('aria-label',t('voiceLabel'));
  renderTabs();renderMenu();renderAi();
  if(state.view==='cart') renderCart();
}

function renderTabs(){
  $('#category-tabs').innerHTML=['all','main','drink','snack'].map(cat=>`<button class="tab ${state.category===cat?'active':''}" data-category="${cat}" role="tab">${t(cat)}</button>`).join('');
}
function renderMenu(){
  const items=state.category==='all'?menu:menu.filter(x=>x.cat===state.category);
  $('#menu-grid').innerHTML=items.map(item=>`<button class="menu-card" data-item-id="${item.id}"><span class="food-placeholder" style="--food-a:${item.colors[0]};--food-b:${item.colors[1]}"><img src="${item.image}" alt="" loading="lazy" decoding="async"></span><span class="card-body"><span class="card-row"><strong>${item[state.lang]}</strong><strong>NT$${item.price}</strong></span><p>${item[`${state.lang}Desc`]}</p></span></button>`).join('');
}

const addonRules={cheese:{allergens:['dairy'],vegetarian:true,vegan:false},eggAdd:{allergens:['egg'],vegetarian:true,vegan:false},meat:{allergens:[],vegetarian:false,vegan:false}};
const orderingCore=CloverOrderingCore.createOrderingCore({menu,itemRules,optionPrices,addonRules});
function restrictionAllows(item,keys=[],restriction=null){
  if(!restriction)return true;
  const rules=itemRules[item.id];if(!rules)return false;
  const parts=[rules,...keys.filter(key=>Object.hasOwn(optionPrices,key)&&key!=='large').map(key=>addonRules[key])];
  if(parts.some(part=>!part))return false;
  return parts.every(part=>restriction.kind==='allergy'?!part.allergens.includes(restriction.filter):part[restriction.filter]===true);
}
function optionGroups(item){
  const groups=[];const rules=itemRules[item.id]||{};
  const addons=(rules.addons||[]).filter(key=>restrictionAllows(item,[key],state.selectedRestriction));
  if(addons.length) groups.push({key:'addons',title:'optionAdd',multi:true,values:addons});
  if(rules.removes?.length) groups.push({key:'removes',title:'optionRemove',multi:true,values:rules.removes});
  if(item.cat==='snack') groups.push({key:'seasonings',title:'optionSeasoning',multi:true,values:['ketchup','pepper']});
  if(item.cat==='drink'){
    groups.push({key:'size',title:'optionSize',multi:false,values:['medium','large']});
    if(item.id!==10) groups.push({key:'sweetness',title:'optionSweetness',multi:false,values:['sugar0','sugarHalf','sugarFull']});
    groups.push({key:'ice',title:'optionIce',multi:false,values:['iceNone','iceLess','iceNormal']});
  }
  return groups;
}
function defaultOptions(item){
  const result={};for(const group of optionGroups(item)) result[group.key]=group.multi?[]:group.values[0];return result;
}
function selectedKeys(){return Object.values(state.options).flat().filter(Boolean)}
function currentUnitPrice(){return state.selected.price+selectedKeys().reduce((sum,key)=>sum+(optionPrices[key]||0),0)}
function renderDialogOptions(){
  const notice=state.selectedRestriction?`<p class="disclaimer">${t('restrictionLabel')}: ${t(state.selectedRestriction.filter)}. ${t('restrictionNotice')}</p>`:'';
  $('#dialog-options').innerHTML=notice+optionGroups(state.selected).map(group=>`<div class="option-group" data-option-section="${group.key}"><b>${t(group.title)}</b><div class="option-list">${group.values.map(key=>{const value=state.options[group.key];const selected=group.multi?value.includes(key):value===key;return `<button type="button" aria-pressed="${selected}" class="option-chip ${selected?'selected':''}" data-option-group="${group.key}" data-option-key="${key}" data-option-multi="${group.multi}">${t(key)}</button>`}).join('')}</div></div>`).join('');
  $('#dialog-price').textContent=`NT$${currentUnitPrice()}`;
}
function openItem(id){
  const selected=menu.find(x=>x.id===id);if(!selected)return;
  state.selectedRestriction=state.view==='ai'&&state.aiMode==='special'&&state.aiFilter?{kind:state.aiFilterKind,filter:state.aiFilter}:null;
  if(!restrictionAllows(selected,[],state.selectedRestriction)){toast(t('blocked'));return}
  state.selectedGuideStep=state.view==='ai'&&state.aiMode==='general'&&state.aiStep==='results'?state.guideStep:null;
  state.selected=selected;state.quantity=1;state.options=defaultOptions(state.selected);
  const item=state.selected;$('#dialog-image').innerHTML=`<img src="${item.image}" alt="${item[state.lang]}">`;$('#dialog-image').style.cssText=`--food-a:${item.colors[0]};--food-b:${item.colors[1]}`;$('#dialog-category').textContent=t(item.cat);$('#dialog-name').textContent=item[state.lang];$('#dialog-description').textContent=item[`${state.lang}Desc`];$('#quantity').textContent=state.quantity;renderDialogOptions();$('#item-dialog').showModal();
}
function toggleOption(group,key,multi){
  const allowed=optionGroups(state.selected).find(x=>x.key===group);
  if(!allowed||allowed.multi!==multi||!allowed.values.includes(key)){toast(t('blocked'));return}
  if(multi){const values=state.options[group];state.options[group]=values.includes(key)?values.filter(x=>x!==key):[...values,key]}else state.options[group]=key;renderDialogOptions();
}
function addToCart(){
  if(!state.selected||!$('#item-dialog').open)return;
  const keys=selectedKeys().sort();
  if(!restrictionAllows(state.selected,keys,state.selectedRestriction)){toast(t('blocked'));return}
  const cartKey=`${state.selected.id}:${keys.join(',')}:${state.selectedRestriction?.filter||''}`;const price=currentUnitPrice();const existing=state.cart.find(x=>x.cartKey===cartKey);
  if(existing)existing.quantity+=state.quantity;else state.cart.push({...state.selected,cartKey,quantity:state.quantity,unitPrice:price,optionKeys:keys,restriction:state.selectedRestriction?{...state.selectedRestriction}:null});
  $('#item-dialog').close();updateCartCount();toast(t('added'));
  if(state.selectedGuideStep&&state.selected.cat===state.selectedGuideStep){advanceGuide();state.selectedGuideStep=null}
}
function updateCartCount(){$('#cart-count').textContent=state.cart.reduce((sum,x)=>sum+x.quantity,0);renderAiSummary()}
function renderCart(){
  const empty=state.cart.length===0;$('#cart-empty').hidden=!empty;$('#cart-list').hidden=empty;
  $('#cart-list').innerHTML=state.cart.map(item=>`<article class="cart-item"><span class="cart-emoji"><img src="${item.image}" alt=""></span><div><b>${item[state.lang]}</b>${item.optionKeys.length?`<small>${item.optionKeys.map(t).join(' · ')}</small>`:''}${item.restriction?`<small>${t('restrictionLabel')}: ${t(item.restriction.filter)}</small>`:''}<small>${t('quantity')} × ${item.quantity}</small></div><strong>NT$${item.unitPrice*item.quantity}</strong><button class="remove" data-remove-key="${item.cartKey}">${t('remove')}</button></article>`).join('');
  $('#cart-total').textContent=`NT$${state.cart.reduce((sum,x)=>sum+x.unitPrice*x.quantity,0)}`;$('#submit-order').disabled=empty;
}

function stopAgentPolling(){if(state.agentPollTimer)clearTimeout(state.agentPollTimer);state.agentPollTimer=null}
function resetAi(){stopAgentPolling();state.agentSessionRequest++;state.aiFlow='entry';state.directStage='dish';state.directItem=null;state.directGroups=[];state.directGroupIndex=0;state.directOptionKeys=[];state.directChoices=[];state.agentDraft=null;state.agentSession=null;state.agentSessionError=false;state.agentConfirming=false;state.agentConfirmError=false;state.agentAnnouncedOrderId=null;renderAi()}
function advanceGuide(){showView('cart')}
let messageVersion=0,messageTarget='';
function setAiMessage(text){
  const el=$('#ai-message');messageTarget=text;const version=++messageVersion;const chars=[...text];let shown=0;el.textContent='';el.classList.remove('settled');
  const tick=()=>{if(version!==messageVersion)return;shown=Math.min(chars.length,shown+2);el.textContent=chars.slice(0,shown).join('');if(shown<chars.length)setTimeout(tick,28);else el.classList.add('settled')};tick();
}
function playAiEntrance(){
  const field=$('#particle-field');field.innerHTML=Array.from({length:22},(_,i)=>{const x=7+(i*37)%86,y=5+(i*53)%82,size=2+(i%3),duration=9+(i%7)*1.4,dx=-10+(i*7)%21,dy=-8+(i*11)%17;return `<i style="--x:${x}%;--y:${y}%;--s:${size}px;--t:${duration}s;--d:${-(i%9)*1.1}s;--dx:${dx}px;--dy:${dy}px"></i>`}).join('');
}
function renderAiSummary(){
  const el=$('#ai-summary');if(!el)return;const count=state.cart.reduce((sum,item)=>sum+item.quantity,0);const items=state.cart.map(item=>item[state.lang]).join(' · ');
  el.classList.toggle('hidden',state.view==='ai'||count===0);
  el.innerHTML=`<span>${t('selectedNow')} · ${count}</span><b>${items||t('emptySelection')}</b><i>→</i>`;
}
function renderCloverCore(orb){
  if(orb.innerHTML.includes('clover-core'))return;
  const dots=Array.from({length:96},(_,i)=>{
    const z=1-2*(i+.5)/96,angle=i*2.399963,r=Math.sqrt(1-z*z);
    const x=80*r*Math.cos(angle),y=80*z,depth=(r*Math.sin(angle)+1)/2;
    const dx=x*1.6,dy=y*1.6,opacity=.22+depth*.55,size=.8+depth*1.15;
    return `<g class="core-dot-arrival" style="--from-x:${dx.toFixed(2)}px;--from-y:${dy.toFixed(2)}px;--delay:${(i%9)*.09}s;--alpha:${opacity.toFixed(2)}"><circle class="${i%16===0?'core-wander':''}" cx="${x.toFixed(2)}" cy="${y.toFixed(2)}" r="${size.toFixed(2)}" style="--out-x:${(x*.23).toFixed(2)}px;--out-y:${(y*.23).toFixed(2)}px;--wander-delay:${6+i%5}s"/></g>`;
  }).join('');
  orb.innerHTML=`<svg class="clover-core" viewBox="-120 -120 240 240" focusable="false"><g class="core-breath"><circle class="core-rim" r="81"/>${dots}</g></svg>`;
}
function renderAi(){
  const orb=$('#ai-orb'),controls=$('#ai-controls'),results=$('#ai-results'),disclaimer=$('#ai-disclaimer');
  if(!orb)return;
  orb.className=`ai-orb ${state.aiFlow==='direct'?'orange':state.aiFlow==='agent'?'purple':'neutral'} ${state.agentSession?.status==='accepted'?'agent-complete':''}`;
  if(state.view==='ai')renderCloverCore(orb);
  controls.innerHTML='';results.innerHTML='';results.classList.remove('direct-bubble-field');
  const progress=$('#guide-progress');progress.innerHTML='';progress.classList.add('hidden');
  disclaimer.textContent='';disclaimer.classList.add('hidden');
  renderAiSummary();
  const chat=$('#ai-chat-bar'),input=$('#ai-chat-input');
  chat.classList.toggle('hidden',state.aiFlow==='agent');
  input.disabled=state.aiFlow!=='direct';
  input.placeholder=state.aiFlow==='direct'?{zh:'輸入畫面上的餐點或選項……',ja:'画面の料理名または選択肢を入力……',en:'Type a dish or option shown above…',ko:'화면의 메뉴나 옵션을 입력하세요…'}[state.lang]:t('chatLabel');
  if(state.aiFlow==='entry')renderAiEntry();
  if(state.aiFlow==='direct')renderDirectOrder();
  if(state.aiFlow==='agent')renderAgentEntry();
}
function renderAiEntry(){
  setAiMessage(t('aiEntryMessage'));
  $('#ai-controls').innerHTML=`<button class="choice-button orange" data-ai-entry="direct"><b>${t('directOrder')}</b><small>${t('directOrderSub')}</small></button><button class="choice-button purple" data-ai-entry="agent"><b>${t('agentOrder')}</b><small>${t('agentOrderSub')}</small></button>`;
}
function pickTwo(items){return [...items].sort(()=>Math.random()-.5).slice(0,2)}
function bubbleMarkup(item,extra='',index=0){return `<button class="food-bubble ${extra}" data-direct-item="${item.id}" style="--bubble-delay:${(.75+index*1.05).toFixed(2)}s"><span class="emoji">${item.emoji}</span><b>${item[state.lang]}</b><small>NT$${item.price}</small></button>`}
function optionBubbleMarkup(key,index=0,extra=''){return `<button class="option-bubble ${extra}" data-direct-option="${key}" style="--bubble-delay:${(.55+index*.72).toFixed(2)}s">${t(key)}</button>`}
function directGroups(item){
  if(item.cat==='drink')return [{key:'size',values:['medium','large']},...(item.id===10?[]:[{key:'sweetness',values:['sugar0','sugarHalf','sugarFull']}]),{key:'ice',values:['iceNone','iceLess','iceNormal']}];
  const rules=itemRules[item.id]||{},groups=[];
  if(rules.removes?.length)groups.push({key:'remove',values:[...rules.removes,'keepOriginal']});
  if(rules.addons?.length)groups.push({key:'addon',values:[...rules.addons,'noExtra']});
  return groups;
}
function renderDirectOrder(){
  $('#ai-controls').innerHTML=`<button class="ai-flow-back" data-action="back-ai-entry">← ${t('backToAiEntry')}</button>`;
  if(state.directStage==='dish'){
    if(!state.directChoices.length)state.directChoices=pickTwo(menu.filter(item=>[3,4,6,7].includes(item.id)));
    setAiMessage(t('directWelcome'));speakAi(t('directWelcome'));
    $('#ai-results').classList.add('direct-bubble-field');
    $('#ai-results').innerHTML=state.directChoices.map((item,index)=>bubbleMarkup(item,'',index)).join('');return;
  }
  if(state.directStage==='option'){
    const group=state.directGroups[state.directGroupIndex];setAiMessage(t('chooseOption'));
    $('#ai-results').classList.add('direct-bubble-field');
    $('#ai-results').innerHTML=group.values.map((key,index)=>optionBubbleMarkup(key,index)).join('');return;
  }
  if(state.directStage==='addon'){
    setAiMessage(t('addedDirect'));
    $('#ai-results').classList.add('direct-bubble-field');
    $('#ai-results').innerHTML=pickTwo(menu.filter(item=>[11,12,13].includes(item.id))).map((item,index)=>bubbleMarkup(item,'snack-bubble',index)).join('')+`<button class="option-bubble decline" data-action="skip-direct-addon" style="--bubble-delay:2.65s">${t('noThanks')}</button>`;return;
  }
  setAiMessage(t('finishDirect'));
  $('#ai-results').innerHTML=`<button class="confirm-order-bubble" data-action="open-cart">${t('confirmDirect')}</button>`;
}
function startAiFlow(flow){
  stopAgentPolling();state.agentSessionRequest++;state.aiFlow=flow;state.directStage='dish';state.directChoices=[];
  if(flow==='agent'){state.agentSession=null;state.agentSessionError=false;state.agentConfirming=false;state.agentConfirmError=false;state.agentAnnouncedOrderId=null}
  renderAi();if(flow==='agent')beginAgentSession();
}
function selectDirectItem(id){
  const item=menu.find(entry=>entry.id===id);if(!item)return;
  if(state.directStage==='addon'){addDirectCartItem(item,[]);state.directStage='done';renderAi();return}
  state.directItem=item;state.directGroups=directGroups(item);state.directGroupIndex=0;state.directOptionKeys=[];
  if(!state.directGroups.length){addDirectCartItem(item,[]);state.directStage='addon'}else state.directStage='option';renderAi();
}
function selectDirectOption(key){
  const group=state.directGroups[state.directGroupIndex];if(!group||!group.values.includes(key))return;
  if(!['keepOriginal','noExtra','medium'].includes(key))state.directOptionKeys.push(key);
  state.directGroupIndex++;
  if(state.directGroupIndex>=state.directGroups.length){addDirectCartItem(state.directItem,state.directOptionKeys);state.directStage='addon'}
  renderAi();
}
function addDirectCartItem(item,keys){
  const sorted=[...keys].sort(),unitPrice=item.price+sorted.reduce((sum,key)=>sum+(optionPrices[key]||0),0),cartKey=`direct:${item.id}:${sorted.join(',')}`;
  const existing=state.cart.find(entry=>entry.cartKey===cartKey);if(existing)existing.quantity++;else state.cart.push({...item,cartKey,quantity:1,unitPrice,optionKeys:sorted,restriction:null});updateCartCount();
}
function agentUrl(){
  if(state.agentSession?.agentUrl)return state.agentSession.agentUrl;
  const url=new URL('/agent',location.href);url.searchParams.set('restaurant','clover-ai-ordering-demo');url.searchParams.set('table',table);url.searchParams.set('lang',state.lang);return url.href;
}
function renderAgentEntry(){
  $('#ai-controls').innerHTML=`<button class="ai-flow-back" data-action="back-ai-entry">← ${t('backToAiEntry')}</button>`;
  if(state.agentSessionError){setAiMessage(t('agentSessionError'));$('#ai-results').innerHTML=`<article class="agent-status-card error"><b>${t('agentSessionError')}</b><button data-action="retry-agent-session">${t('agentRetry')}</button></article>`;return}
  const session=state.agentSession;
  if(!session){setAiMessage(t('agentPreparing'));$('#ai-results').innerHTML=`<article class="agent-status-card waiting"><span class="agent-spinner" aria-hidden="true"></span><b>${t('agentPreparing')}</b></article>`;return}
  if(session.status==='awaiting_confirmation'){
    setAiMessage(t('agentDraftReceived'));const lines=(session.lines||[]).map(line=>`<li><span>${escapeMarkup(line.name)} × ${line.quantity}</span><b>NT$${line.lineTotal}</b></li>`).join('');
    $('#ai-results').innerHTML=`<article class="agent-status-card"><p class="agent-kicker">${t('agentDraftReceived')}</p><ul>${lines}</ul><strong class="agent-live-total">NT$${session.total}</strong>${state.agentConfirmError?`<p class="agent-confirm-error">${t('agentConfirmError')}</p>`:''}<button data-action="confirm-agent-order" ${state.agentConfirming?'disabled':''}>${t(state.agentConfirming?'agentConfirming':'agentConfirmOrder')}</button><p>${t('agentPrivacy')}</p></article>`;return;
  }
  if(session.status==='accepted'){
    setAiMessage(t('agentAcceptedSpeech'));const lines=(session.lines||[]).map(line=>`<li><span>${escapeMarkup(line.name)} × ${line.quantity}</span><b>NT$${line.lineTotal}</b></li>`).join('');
    $('#ai-results').innerHTML=`<article class="agent-status-card accepted"><span class="agent-check" aria-hidden="true">✓</span><h2>${t('agentAcceptedTitle')}</h2><p>${t('agentOrderNumber')} <strong>${escapeMarkup(session.orderId)}</strong></p><p>${t('agentOrderStatus')}：${escapeMarkup(session.orderStatus)}</p><ul>${lines}</ul><strong class="agent-live-total">NT$${session.total}</strong></article>`;return;
  }
  if(session.status==='expired'){setAiMessage(t('agentSessionError'));$('#ai-results').innerHTML=`<article class="agent-status-card error"><b>${t('agentSessionError')}</b><button data-action="retry-agent-session">${t('agentRetry')}</button></article>`;return}
  const url=agentUrl();setAiMessage(t('agentWaiting'));
  $('#ai-results').innerHTML=`<article class="agent-entry-card"><div class="qr-pending" aria-label="${t('qrPending')}"><span>QR</span><small>${t('qrPending')}</small></div><label>Agent URL<input id="agent-url" readonly value="${escapeMarkup(url)}"></label><button data-action="copy-agent-url">${t('copyAgentUrl')}</button><p>${t('agentWaiting')}</p><p>${t('agentPrivacy')}</p></article>`;
}
async function beginAgentSession(){
  if(typeof fetch!=='function')return;stopAgentPolling();const request=++state.agentSessionRequest;state.agentSession=null;state.agentSessionError=false;state.agentConfirming=false;state.agentConfirmError=false;renderAi();
  try{
    const response=await fetch('/api/agent-sessions',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({table,language:state.lang})});if(!response.ok)throw Error('session request failed');const session=await response.json();
    if(request!==state.agentSessionRequest||state.aiFlow!=='agent')return;state.agentSession=session;renderAi();scheduleAgentPoll();
  }catch{if(request!==state.agentSessionRequest||state.aiFlow!=='agent')return;state.agentSessionError=true;renderAi()}
}
async function confirmAgentOrder(){
  const sessionId=state.agentSession?.sessionId;if(!sessionId||state.agentSession?.status!=='awaiting_confirmation'||state.agentConfirming||typeof fetch!=='function')return;
  state.agentConfirming=true;state.agentConfirmError=false;renderAi();
  try{
    const response=await fetch(`/api/agent-sessions/${encodeURIComponent(sessionId)}/confirm`,{method:'POST',credentials:'same-origin'});if(!response.ok)throw Error('session confirmation failed');const next=await response.json();
    if(state.aiFlow!=='agent'||state.agentSession?.sessionId!==sessionId)return;state.agentSession=next;state.agentConfirming=false;renderAi();
    if(next.status==='accepted'&&state.agentAnnouncedOrderId!==next.orderId){state.agentAnnouncedOrderId=next.orderId;speakAi(t('agentAcceptedSpeech'))}
  }catch{state.agentConfirming=false;state.agentConfirmError=true;renderAi()}
}
function scheduleAgentPoll(){stopAgentPolling();if(state.aiFlow==='agent'&&state.agentSession&&!['accepted','expired'].includes(state.agentSession.status))state.agentPollTimer=setTimeout(pollAgentSession,2000)}
async function pollAgentSession(){
  const sessionId=state.agentSession?.sessionId;if(!sessionId||state.aiFlow!=='agent'||typeof fetch!=='function')return;
  try{
    const response=await fetch(`/api/agent-sessions/${encodeURIComponent(sessionId)}`,{cache:'no-store'});if(!response.ok)throw Error('session poll failed');const previous=state.agentSession?.status,next=await response.json();
    if(state.aiFlow!=='agent'||state.agentSession?.sessionId!==sessionId)return;state.agentSession=next;renderAi();
    if(next.status==='accepted'&&previous!=='accepted'&&state.agentAnnouncedOrderId!==next.orderId){state.agentAnnouncedOrderId=next.orderId;speakAi(t('agentAcceptedSpeech'))}
    scheduleAgentPoll();
  }catch{scheduleAgentPoll()}
}
let activeSpeechAudio=null,activeSpeechUrl=null,speechRequest=0;
function speakWithBrowser(text){
  if(!('speechSynthesis' in globalThis)||typeof SpeechSynthesisUtterance==='undefined')return false;
  speechSynthesis.cancel();const utterance=new SpeechSynthesisUtterance(text);utterance.lang={zh:'zh-TW',ja:'ja-JP',en:'en-US',ko:'ko-KR'}[state.lang];speechSynthesis.speak(utterance);return true;
}
async function speakAi(text){
  const request=++speechRequest;
  try{
    if(typeof fetch!=='function'||typeof Audio==='undefined'||!URL.createObjectURL)throw Error('streamed speech unavailable');
    const response=await fetch('/api/speech',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({text,language:state.lang})});
    if(!response.ok)throw Error('speech request failed');
    const url=URL.createObjectURL(await response.blob());
    if(request!==speechRequest){URL.revokeObjectURL(url);return false}
    if(activeSpeechAudio)activeSpeechAudio.pause();if(activeSpeechUrl)URL.revokeObjectURL(activeSpeechUrl);
    const audio=new Audio(url);activeSpeechAudio=audio;activeSpeechUrl=url;
    audio.onended=()=>{if(activeSpeechAudio===audio)activeSpeechAudio=null;if(activeSpeechUrl===url){URL.revokeObjectURL(url);activeSpeechUrl=null}};
    await audio.play();return true;
  }catch{return request===speechRequest?speakWithBrowser(text):false}
}
function handleDirectText(value){
  const query=String(value||'').trim().toLowerCase();if(!query)return false;
  const item=state.directChoices.find(entry=>[entry.zh,entry.ja,entry.en,entry.ko].some(name=>query.includes(name.toLowerCase())));
  if(state.directStage==='dish'&&item){selectDirectItem(item.id);return true}
  if(state.directStage==='option')for(const key of state.directGroups[state.directGroupIndex].values){if(query.includes(t(key).toLowerCase())){selectDirectOption(key);return true}}
  toast(t('unknownChoice'));return false;
}
function popThen(element,next){if(!element||element.dataset.popping)return;element.dataset.popping='true';element.classList.add('popping');setTimeout(next,420)}
function startVoiceInput(){
  if(state.aiFlow!=='direct')return;const Recognition=globalThis.SpeechRecognition||globalThis.webkitSpeechRecognition;
  if(!Recognition){toast(t('voiceUnavailable'));return}
  const recognition=new Recognition();recognition.lang={zh:'zh-TW',ja:'ja-JP',en:'en-US',ko:'ko-KR'}[state.lang];recognition.interimResults=false;recognition.maxAlternatives=1;
  recognition.onresult=event=>{const text=event.results[0][0].transcript;$('#ai-chat-input').value=text;handleDirectText(text)};recognition.onerror=()=>toast(t('voiceUnavailable'));toast(t('voiceListening'));recognition.start();
}
async function copyAgentUrl(){const value=$('#agent-url')?.value;if(!value)return;try{await navigator.clipboard.writeText(value);toast(t('copiedAgentUrl'))}catch{toast(value)}}
function connectPersonalAgent(){startAiFlow('agent')}
function selectAgentProfile(){return null}
function cancelAgentPermission(){startAiFlow('entry')}
function runPersonalAgentDemo(){return null}
function authorizeAgentProfile(){return null}
function chooseAiMode(mode){startAiFlow(mode==='general'?'direct':'agent')}
function chooseAiFilter(){return null}
function submitOrder(){if(!state.cart.length)return;if(state.cart.some(item=>!restrictionAllows(item,item.optionKeys,item.restriction))){toast(t('blocked'));return}showView('success')}

let toastTimer;function toast(message){const el=$('#toast');el.textContent=message;el.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>el.classList.remove('show'),2200)}
document.addEventListener('click',event=>{
  if(event.target.closest?.('#ai-message')&&messageTarget){messageVersion++;$('#ai-message').textContent=messageTarget;$('#ai-message').classList.add('settled')}
  const action=event.target.closest('[data-action]')?.dataset.action;const card=event.target.closest('[data-item-id]');const tab=event.target.closest('[data-category]');const remove=event.target.closest('[data-remove-key]');const option=event.target.closest('[data-option-key]');const aiEntry=event.target.closest('[data-ai-entry]');const directItem=event.target.closest('[data-direct-item]');const directOption=event.target.closest('[data-direct-option]');
  if(card)openItem(Number(card.dataset.itemId));
  if(tab){state.category=tab.dataset.category;renderTabs();renderMenu()}
  if(remove){state.cart=state.cart.filter(x=>x.cartKey!==remove.dataset.removeKey);state.agentDraft=null;updateCartCount();renderCart()}
  if(option)toggleOption(option.dataset.optionGroup,option.dataset.optionKey,option.dataset.optionMulti==='true');
  if(aiEntry)startAiFlow(aiEntry.dataset.aiEntry);
  if(directItem){popThen(directItem,()=>selectDirectItem(Number(directItem.dataset.directItem)));return}
  if(directOption){popThen(directOption,()=>selectDirectOption(directOption.dataset.directOption));return}
  if(action==='skip-direct-addon'){popThen(event.target.closest('[data-action]'),()=>{state.directStage='done';renderAi()});return}
  if(action==='open-cart'&&event.target.closest('.confirm-order-bubble')){popThen(event.target.closest('.confirm-order-bubble'),()=>showView('cart'));return}
  if(!action)return;
  ({home:()=>showView('home'),'open-menu':()=>showView('menu'),'open-ai':()=>showView('ai'),'open-cart':()=>showView('cart'),'back-ai-entry':()=>startAiFlow('entry'),'copy-agent-url':copyAgentUrl,'retry-agent-session':beginAgentSession,'confirm-agent-order':confirmAgentOrder,waiter:()=>toast(t('waiterSent')),'voice-demo':startVoiceInput,'reset-ai':resetAi,'quantity-down':()=>{state.quantity=Math.max(1,state.quantity-1);$('#quantity').textContent=state.quantity},'quantity-up':()=>{state.quantity=Math.min(99,state.quantity+1);$('#quantity').textContent=state.quantity},'add-to-cart':addToCart,'submit-order':submitOrder,'new-order':()=>{state.cart=[];resetAi();updateCartCount();showView('home')}}[action]?.());
});
$('#ai-chat-bar').addEventListener('submit',event=>{event.preventDefault();const input=$('#ai-chat-input');if(handleDirectText(input.value))input.value=''});
$('#language-select').addEventListener('change',event=>{state.lang=event.target.value;try{localStorage.setItem('clover-language',state.lang)}catch{}applyLanguage()});
applyLanguage();updateCartCount();showView('home');
