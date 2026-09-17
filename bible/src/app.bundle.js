/*
 * app.bundle.js —— 自动生成，请勿手改
 *
 * 用途：file:// 直接打开 index.html 时加载（此协议下不能用 ES modules）。
 * 生成：node scripts/build-bundle.js
 * 模块顺序（18 个）： src/data/cards.js, src/core/card-service.js, src/core/storage-migration.js, src/core/history-store.js, src/core/history-filter.js, src/core/history-export.js, src/ui/render.js, src/core/stats.js, src/core/check-in.js, src/ui/stats-render.js, src/core/daily-verse-service.js, src/ui/daily-verse-render.js, src/core/verse-search-service.js, src/data/book-names.js, src/ui/verse-note-render.js, src/core/voice-service.js, src/ui/voice-render.js, src/main.js
 * 未打包（体积大 / 动态 import）： src/data/bible-full.js
 */

(function () {
'use strict';

// ==================== src/data/cards.js ====================
/**
 * Bible Verse Cards Data
 * Auto-generated from CUS (Chinese Union Version Simplified)
 * Total: 200 verses across 7 categories
 */

const categories = [
    { id: 'comfort', name: '安慰', icon: '🕊️', color: '#4A90E2', description: '在困难中找到神的安慰' },
    { id: 'love', name: '爱心', icon: '❤️', color: '#E74C3C', description: '体验神无条件的爱' },
    { id: 'faith', name: '信心', icon: '✝️', color: '#9B59B6', description: '建立坚定的信心' },
    { id: 'strength', name: '力量', icon: '💪', color: '#F39C12', description: '从神得着力量' },
    { id: 'wisdom', name: '智慧', icon: '📖', color: '#1ABC9C', description: '寻求从神而来的智慧' },
    { id: 'forgiveness', name: '宽恕', icon: '🤝', color: '#3498DB', description: '学习宽恕与恩典' },
    { id: 'hope', name: '盼望', icon: '🌟', color: '#E67E22', description: '在基督里存着盼望' }
];

const cards = [
    {
        "id": 1,
        "category": "安慰",
        "categoryEn": "comfort",
        "icon": "🕊️",
        "color": "#4A90E2",
        "reference": "诗篇 23:1",
        "text": "〔大卫的诗。〕耶和华是我的牧者．我必不至缺乏。",
        "question": "这节关于\"安慰\"的经文如何触动你的心？"
    },
    {
        "id": 2,
        "category": "安慰",
        "categoryEn": "comfort",
        "icon": "🕊️",
        "color": "#4A90E2",
        "reference": "诗篇 23:4",
        "text": "我虽然行过死荫的幽谷、也不怕遭害．因为你与我同在．你的杖、你的竿、都安慰我。",
        "question": "这节关于\"安慰\"的经文如何触动你的心？"
    },
    {
        "id": 3,
        "category": "安慰",
        "categoryEn": "comfort",
        "icon": "🕊️",
        "color": "#4A90E2",
        "reference": "诗篇 46:1",
        "text": "〔可拉后裔的诗歌、交与伶长、调用女音。〕　神是我们的避难所、是我们的力量、是我们在患难中随时的帮助。",
        "question": "这节关于\"安慰\"的经文如何触动你的心？"
    },
    {
        "id": 4,
        "category": "安慰",
        "categoryEn": "comfort",
        "icon": "🕊️",
        "color": "#4A90E2",
        "reference": "诗篇 46:10",
        "text": "你们要休息、要知道我是　神．我必在外邦中被尊崇、在遍地上也被尊崇。",
        "question": "这节关于\"安慰\"的经文如何触动你的心？"
    },
    {
        "id": 5,
        "category": "安慰",
        "categoryEn": "comfort",
        "icon": "🕊️",
        "color": "#4A90E2",
        "reference": "诗篇 121:1-2",
        "text": "〔上行之诗。〕我要向山举目。我的帮助从何而来。 我的帮助从造天地的耶和华而来。",
        "question": "这节关于\"安慰\"的经文如何触动你的心？"
    },
    {
        "id": 6,
        "category": "安慰",
        "categoryEn": "comfort",
        "icon": "🕊️",
        "color": "#4A90E2",
        "reference": "以赛亚书 41:10",
        "text": "你不要害怕、因为我与你同在．不要惊惶、因为我是你的　神．我必坚固你、我必帮助你、我必用我公义的右手扶持你。",
        "question": "这节关于\"安慰\"的经文如何触动你的心？"
    },
    {
        "id": 7,
        "category": "安慰",
        "categoryEn": "comfort",
        "icon": "🕊️",
        "color": "#4A90E2",
        "reference": "以赛亚书 43:2",
        "text": "你从水中经过、我必与你同在．你趟过江河、水必不漫过你．你从火中行过、必不被烧、火焰也不着在你身上。",
        "question": "这节关于\"安慰\"的经文如何触动你的心？"
    },
    {
        "id": 8,
        "category": "安慰",
        "categoryEn": "comfort",
        "icon": "🕊️",
        "color": "#4A90E2",
        "reference": "马太福音 11:28",
        "text": "凡劳苦担重担的人、可以到我这里来、我就使你们得安息。",
        "question": "这节关于\"安慰\"的经文如何触动你的心？"
    },
    {
        "id": 9,
        "category": "安慰",
        "categoryEn": "comfort",
        "icon": "🕊️",
        "color": "#4A90E2",
        "reference": "马太福音 5:4",
        "text": "哀恸的人有福了．因为他们必得安慰。",
        "question": "这节关于\"安慰\"的经文如何触动你的心？"
    },
    {
        "id": 10,
        "category": "安慰",
        "categoryEn": "comfort",
        "icon": "🕊️",
        "color": "#4A90E2",
        "reference": "约翰福音 14:27",
        "text": "我留下平安给你们、我将我的平安赐给你们．我所赐的、不像世人所赐的．你们心里不要忧愁、也不要胆怯。",
        "question": "这节关于\"安慰\"的经文如何触动你的心？"
    },
    {
        "id": 11,
        "category": "安慰",
        "categoryEn": "comfort",
        "icon": "🕊️",
        "color": "#4A90E2",
        "reference": "哥林多后书 1:3-4",
        "text": "愿颂赞归与我们的主耶稣基督的父　神、就是发慈悲的父、赐各样安慰的　神． 我们在一切患难中、他就安慰我们、叫我们能用　神所赐的安慰、去安慰那遭各样患难的人。",
        "question": "这节关于\"安慰\"的经文如何触动你的心？"
    },
    {
        "id": 12,
        "category": "安慰",
        "categoryEn": "comfort",
        "icon": "🕊️",
        "color": "#4A90E2",
        "reference": "诗篇 34:18",
        "text": "耶和华靠近伤心的人、拯救灵性痛悔的人。",
        "question": "这节关于\"安慰\"的经文如何触动你的心？"
    },
    {
        "id": 13,
        "category": "安慰",
        "categoryEn": "comfort",
        "icon": "🕊️",
        "color": "#4A90E2",
        "reference": "诗篇 42:11",
        "text": "我的心哪、你为何忧闷、为何在我里面烦躁．应当仰望　神．因我还要称赞他．他是我脸上的光荣、〔原文作帮助〕是我的　神。",
        "question": "这节关于\"安慰\"的经文如何触动你的心？"
    },
    {
        "id": 14,
        "category": "安慰",
        "categoryEn": "comfort",
        "icon": "🕊️",
        "color": "#4A90E2",
        "reference": "诗篇 55:22",
        "text": "你要把你的重担卸给耶和华、他必抚养你．他永不叫义人动摇。",
        "question": "这节关于\"安慰\"的经文如何触动你的心？"
    },
    {
        "id": 15,
        "category": "安慰",
        "categoryEn": "comfort",
        "icon": "🕊️",
        "color": "#4A90E2",
        "reference": "诗篇 62:8",
        "text": "你们众民当时时倚靠他、在他面前倾心吐意．　神是我们的避难所。〔细拉〕",
        "question": "这节关于\"安慰\"的经文如何触动你的心？"
    },
    {
        "id": 16,
        "category": "安慰",
        "categoryEn": "comfort",
        "icon": "🕊️",
        "color": "#4A90E2",
        "reference": "诗篇 73:26",
        "text": "我的肉体、和我的心肠衰残．但　神是我心里的力量、又是我的福分、直到永远。",
        "question": "这节关于\"安慰\"的经文如何触动你的心？"
    },
    {
        "id": 17,
        "category": "安慰",
        "categoryEn": "comfort",
        "icon": "🕊️",
        "color": "#4A90E2",
        "reference": "诗篇 91:1-2",
        "text": "住在至高者隐密处的、必住在全能者的荫下。 我要论到耶和华说、他是我的避难所、是我的山寨、是我的　神、是我所倚靠的。",
        "question": "这节关于\"安慰\"的经文如何触动你的心？"
    },
    {
        "id": 18,
        "category": "安慰",
        "categoryEn": "comfort",
        "icon": "🕊️",
        "color": "#4A90E2",
        "reference": "诗篇 119:50",
        "text": "这话将我救活了．我在患难中、因此得安慰。",
        "question": "这节关于\"安慰\"的经文如何触动你的心？"
    },
    {
        "id": 19,
        "category": "安慰",
        "categoryEn": "comfort",
        "icon": "🕊️",
        "color": "#4A90E2",
        "reference": "诗篇 147:3",
        "text": "他医好伤心的人、裹好他们的伤处。",
        "question": "这节关于\"安慰\"的经文如何触动你的心？"
    },
    {
        "id": 20,
        "category": "安慰",
        "categoryEn": "comfort",
        "icon": "🕊️",
        "color": "#4A90E2",
        "reference": "以赛亚书 26:3",
        "text": "坚心倚赖你的、你必保守他十分平安、因为他倚靠你。",
        "question": "这节关于\"安慰\"的经文如何触动你的心？"
    },
    {
        "id": 21,
        "category": "安慰",
        "categoryEn": "comfort",
        "icon": "🕊️",
        "color": "#4A90E2",
        "reference": "以赛亚书 49:13",
        "text": "诸天哪、应当欢呼．大地阿、应当快乐．众山哪、应当发声歌唱．因为耶和华已经安慰他的百姓、也要怜恤他困苦之民。",
        "question": "这节关于\"安慰\"的经文如何触动你的心？"
    },
    {
        "id": 22,
        "category": "安慰",
        "categoryEn": "comfort",
        "icon": "🕊️",
        "color": "#4A90E2",
        "reference": "以赛亚书 51:12",
        "text": "惟有我、是安慰你们的．你是谁、竟怕那必死的人、怕那要变如草的世人．",
        "question": "这节关于\"安慰\"的经文如何触动你的心？"
    },
    {
        "id": 23,
        "category": "安慰",
        "categoryEn": "comfort",
        "icon": "🕊️",
        "color": "#4A90E2",
        "reference": "以赛亚书 66:13",
        "text": "母亲怎样安慰儿子、我就照样安慰你们．你们也必因〔或作在〕耶路撒冷得安慰。",
        "question": "这节关于\"安慰\"的经文如何触动你的心？"
    },
    {
        "id": 24,
        "category": "安慰",
        "categoryEn": "comfort",
        "icon": "🕊️",
        "color": "#4A90E2",
        "reference": "耶利米书 31:13",
        "text": "那时处女必欢乐跳舞、年少的年老的、也必一同欢乐、因为我要使他们的悲哀变为欢喜、并要安慰他们、使他们的愁烦转为快乐。",
        "question": "这节关于\"安慰\"的经文如何触动你的心？"
    },
    {
        "id": 25,
        "category": "安慰",
        "categoryEn": "comfort",
        "icon": "🕊️",
        "color": "#4A90E2",
        "reference": "马太福音 10:29-31",
        "text": "两个麻雀、不是卖一分银子么．若是你们的父不许、一个也不能掉在地上。 就是你们的头发、也都被数过了。 所以不要惧怕．你们比许多麻雀还贵重。",
        "question": "这节关于\"安慰\"的经文如何触动你的心？"
    },
    {
        "id": 26,
        "category": "安慰",
        "categoryEn": "comfort",
        "icon": "🕊️",
        "color": "#4A90E2",
        "reference": "约翰福音 14:1-3",
        "text": "你们心里不要忧愁．你们信　神、也当信我。 在我父的家里、有许多住处．若是没有、我就早已告诉你们了．我去原是为你们预备地方去。 我若去为你们预备了地方、就必再来接你们到我那里去．我在那里、叫你们也在那里。",
        "question": "这节关于\"安慰\"的经文如何触动你的心？"
    },
    {
        "id": 27,
        "category": "安慰",
        "categoryEn": "comfort",
        "icon": "🕊️",
        "color": "#4A90E2",
        "reference": "约翰福音 16:33",
        "text": "我将这些事告诉你们、是要叫你们在我里面有平安。在世上你们有苦难．但你们可以放心、我已经胜了世界。",
        "question": "这节关于\"安慰\"的经文如何触动你的心？"
    },
    {
        "id": 28,
        "category": "安慰",
        "categoryEn": "comfort",
        "icon": "🕊️",
        "color": "#4A90E2",
        "reference": "罗马书 8:26-28",
        "text": "况且我们的软弱有圣灵帮助、我们本不晓得当怎样祷告、只是圣灵亲自用说不出来的叹息、替我们祷告。 鉴察人心的、晓得圣灵的意思．因为圣灵照着　神的旨意替圣徒祈求。 我们晓得万事都互相效力、叫爱　神的人得益处、就是按他旨意被召的人。",
        "question": "这节关于\"安慰\"的经文如何触动你的心？"
    },
    {
        "id": 29,
        "category": "爱心",
        "categoryEn": "love",
        "icon": "❤️",
        "color": "#E74C3C",
        "reference": "约翰福音 3:16",
        "text": "神爱世人、甚至将他的独生子赐给他们、叫一切信他的、不至灭亡、反得永生。",
        "question": "这节关于\"爱心\"的经文如何触动你的心？"
    },
    {
        "id": 30,
        "category": "爱心",
        "categoryEn": "love",
        "icon": "❤️",
        "color": "#E74C3C",
        "reference": "约翰福音 15:12-13",
        "text": "你们要彼此相爱、像我爱你们一样、这就是我的命令。 人为朋友舍命、人的爱心没有比这个大的。",
        "question": "这节关于\"爱心\"的经文如何触动你的心？"
    },
    {
        "id": 31,
        "category": "爱心",
        "categoryEn": "love",
        "icon": "❤️",
        "color": "#E74C3C",
        "reference": "约翰福音 13:34-35",
        "text": "我赐给你们一条新命令、乃是叫你们彼此相爱．我怎样爱你们、你们也要怎样相爱。 你们若有彼此相爱的心、众人因此就认出你们是我的门徒了。",
        "question": "这节关于\"爱心\"的经文如何触动你的心？"
    },
    {
        "id": 32,
        "category": "爱心",
        "categoryEn": "love",
        "icon": "❤️",
        "color": "#E74C3C",
        "reference": "罗马书 8:38-39",
        "text": "因为我深信无论是死、是生、是天使、是掌权的、是有能的、是现在的事、是将来的事、 是高处的、是低处的、是别的受造之物、都不能叫我们与　神的爱隔绝．这爱是在我们的主基督耶稣里的。",
        "question": "这节关于\"爱心\"的经文如何触动你的心？"
    },
    {
        "id": 33,
        "category": "爱心",
        "categoryEn": "love",
        "icon": "❤️",
        "color": "#E74C3C",
        "reference": "罗马书 5:8",
        "text": "惟有基督在我们还作罪人的时候为我们死、　神的爱就在此向我们显明了。",
        "question": "这节关于\"爱心\"的经文如何触动你的心？"
    },
    {
        "id": 34,
        "category": "爱心",
        "categoryEn": "love",
        "icon": "❤️",
        "color": "#E74C3C",
        "reference": "哥林多前书 13:4-8",
        "text": "爱是恒久忍耐、又有恩慈．爱是不嫉妒．爱是不自夸．不张狂． 不作害羞的事．不求自己的益处．不轻易发怒．不计算人的恶． 不喜欢不义．只喜欢真理． 凡事包容．凡事相信．凡事盼望．凡事忍耐。 爱是永不止息．先知讲道之能、终必归于无有．说方言之能、终必停止、知识也终必归于无有。",
        "question": "这节关于\"爱心\"的经文如何触动你的心？"
    },
    {
        "id": 35,
        "category": "爱心",
        "categoryEn": "love",
        "icon": "❤️",
        "color": "#E74C3C",
        "reference": "哥林多前书 16:14",
        "text": "凡你们所作的、都要凭爱心而作。",
        "question": "这节关于\"爱心\"的经文如何触动你的心？"
    },
    {
        "id": 36,
        "category": "爱心",
        "categoryEn": "love",
        "icon": "❤️",
        "color": "#E74C3C",
        "reference": "加拉太书 5:22-23",
        "text": "圣灵所结的果子、就是仁爱、喜乐、和平、忍耐、恩慈、良善、信实、 温柔、节制．这样的事、没有律法禁止。",
        "question": "这节关于\"爱心\"的经文如何触动你的心？"
    },
    {
        "id": 37,
        "category": "爱心",
        "categoryEn": "love",
        "icon": "❤️",
        "color": "#E74C3C",
        "reference": "以弗所书 5:2",
        "text": "也要凭爱心行事、正如基督爱我们、为我们舍了自己、当作馨香的供物、和祭物、献与　神。",
        "question": "这节关于\"爱心\"的经文如何触动你的心？"
    },
    {
        "id": 38,
        "category": "爱心",
        "categoryEn": "love",
        "icon": "❤️",
        "color": "#E74C3C",
        "reference": "约翰一书 4:7-8",
        "text": "亲爱的弟兄阿、我们应当彼此相爱．因为爱是从　神来的．凡有爱心的、都是由　神而生、并且认识　神。 没有爱心的、就不认识　神．因为　神就是爱。",
        "question": "这节关于\"爱心\"的经文如何触动你的心？"
    },
    {
        "id": 39,
        "category": "爱心",
        "categoryEn": "love",
        "icon": "❤️",
        "color": "#E74C3C",
        "reference": "约翰一书 3:18",
        "text": "小子们哪、我们相爱、不要只在言语和舌头上．总要在行为和诚实上。",
        "question": "这节关于\"爱心\"的经文如何触动你的心？"
    },
    {
        "id": 40,
        "category": "爱心",
        "categoryEn": "love",
        "icon": "❤️",
        "color": "#E74C3C",
        "reference": "创世纪 1:27-28",
        "text": "神就照着自己的形像造人、乃是照着他的形像造男造女。 神就赐福给他们、又对他们说、要生养众多、遍满地面、治理这地．也要管理海里的鱼、空中的鸟．和地上各样行动的活物。",
        "question": "这节关于\"爱心\"的经文如何触动你的心？"
    },
    {
        "id": 41,
        "category": "爱心",
        "categoryEn": "love",
        "icon": "❤️",
        "color": "#E74C3C",
        "reference": "申命记 7:9",
        "text": "所以你要知道耶和华你的　神、他是　神、是信实的　神、向爱他守他诫命的人、守约施慈爱、直到千代．",
        "question": "这节关于\"爱心\"的经文如何触动你的心？"
    },
    {
        "id": 42,
        "category": "爱心",
        "categoryEn": "love",
        "icon": "❤️",
        "color": "#E74C3C",
        "reference": "诗篇 36:7-8",
        "text": "神阿、你的慈爱、何其宝贵．世人投靠在你翅膀的荫下。 他们必因你殿里的肥甘、得以饱足．你也必叫他们喝你乐河的水。",
        "question": "这节关于\"爱心\"的经文如何触动你的心？"
    },
    {
        "id": 43,
        "category": "爱心",
        "categoryEn": "love",
        "icon": "❤️",
        "color": "#E74C3C",
        "reference": "诗篇 86:15",
        "text": "主阿、你是有怜悯有恩典的　神、不轻易发怒、并有丰盛的慈爱和诚实。",
        "question": "这节关于\"爱心\"的经文如何触动你的心？"
    },
    {
        "id": 44,
        "category": "爱心",
        "categoryEn": "love",
        "icon": "❤️",
        "color": "#E74C3C",
        "reference": "诗篇 103:8-13",
        "text": "耶和华有怜悯、有恩典、不轻易发怒、且有丰盛的慈爱。 他不长久责备、也不永远怀怒。 他没有按我们的罪过待我们、也没有照我们的罪孽报应我们。 天离地何等的高、他的慈爱向敬畏他的人、也是何等的大。 东离西有多远、他叫我们的过犯、离我们也有多远。 父亲怎样怜恤他的儿女、耶和华也怎样怜恤敬畏他的人。",
        "question": "这节关于\"爱心\"的经文如何触动你的心？"
    },
    {
        "id": 45,
        "category": "爱心",
        "categoryEn": "love",
        "icon": "❤️",
        "color": "#E74C3C",
        "reference": "诗篇 136:1-3",
        "text": "你们要称谢耶和华、因他本为善．他的慈爱永远长存。 你们要称谢万神之神、因他的慈爱永远长存． 你们要称谢万主之主、因他的慈爱永远长存．",
        "question": "这节关于\"爱心\"的经文如何触动你的心？"
    },
    {
        "id": 46,
        "category": "爱心",
        "categoryEn": "love",
        "icon": "❤️",
        "color": "#E74C3C",
        "reference": "以赛亚书 54:10",
        "text": "大山可以挪开、小山可以迁移．但我的慈爱必不离开你、我平安的约也不迁移．这是怜恤你的耶和华说的。",
        "question": "这节关于\"爱心\"的经文如何触动你的心？"
    },
    {
        "id": 47,
        "category": "爱心",
        "categoryEn": "love",
        "icon": "❤️",
        "color": "#E74C3C",
        "reference": "耶利米书 31:3",
        "text": "古时〔或作从远方〕耶和华向以色列〔原文作我〕显现、说、我以永远的爱、爱你、因此我以慈爱、吸引你。",
        "question": "这节关于\"爱心\"的经文如何触动你的心？"
    },
    {
        "id": 48,
        "category": "爱心",
        "categoryEn": "love",
        "icon": "❤️",
        "color": "#E74C3C",
        "reference": "西番雅书 3:17",
        "text": "耶和华你的　神、是施行拯救、大有能力的主、他在你中间必因你欢欣喜乐、默然爱你、且因你喜乐而欢呼。",
        "question": "这节关于\"爱心\"的经文如何触动你的心？"
    },
    {
        "id": 49,
        "category": "爱心",
        "categoryEn": "love",
        "icon": "❤️",
        "color": "#E74C3C",
        "reference": "约翰福音 14:21",
        "text": "有了我的命令又遵守的、这人就是爱我的．爱我的必蒙我父爱他、我也要爱他、并且要向他显现。",
        "question": "这节关于\"爱心\"的经文如何触动你的心？"
    },
    {
        "id": 50,
        "category": "爱心",
        "categoryEn": "love",
        "icon": "❤️",
        "color": "#E74C3C",
        "reference": "约翰福音 15:9",
        "text": "我爱你们、正如父爱我一样．你们要常在我的爱里。",
        "question": "这节关于\"爱心\"的经文如何触动你的心？"
    },
    {
        "id": 51,
        "category": "爱心",
        "categoryEn": "love",
        "icon": "❤️",
        "color": "#E74C3C",
        "reference": "罗马书 8:35-37",
        "text": "谁能使我们与基督的爱隔绝呢．难道是患难么、是困苦么、是逼迫么、是饥饿么、是赤身露体么、是危险么、是刀剑么。 如经上所记、『我们为你的缘故、终日被杀．人看我们如将宰的羊。』 然而靠着爱我们的主、在这一切的事上、已经得胜有余了。",
        "question": "这节关于\"爱心\"的经文如何触动你的心？"
    },
    {
        "id": 52,
        "category": "爱心",
        "categoryEn": "love",
        "icon": "❤️",
        "color": "#E74C3C",
        "reference": "以弗所书 3:17-19",
        "text": "使基督因你们的信、住在你们心里、叫你们的爱心、有根有基、 能以和众圣徒一同明白基督的爱、是何等长阔高深、 并知道这爱是过于人所能测度的、便叫　神一切所充满的、充满了你们。",
        "question": "这节关于\"爱心\"的经文如何触动你的心？"
    },
    {
        "id": 53,
        "category": "爱心",
        "categoryEn": "love",
        "icon": "❤️",
        "color": "#E74C3C",
        "reference": "约翰一书 4:9-10",
        "text": "神差他独生子到世间来、使我们借着他得生、　神爱我们的心、在此就显明了。 不是我们爱　神、乃是　神爱我们、差他的儿子、为我们的罪作了挽回祭、这就是爱了。",
        "question": "这节关于\"爱心\"的经文如何触动你的心？"
    },
    {
        "id": 54,
        "category": "爱心",
        "categoryEn": "love",
        "icon": "❤️",
        "color": "#E74C3C",
        "reference": "约翰一书 4:16",
        "text": "神爱我们的心、我们也知道也信。　神就是爱．住在爱里面的、就是住在　神里面、　神也住在他里面。",
        "question": "这节关于\"爱心\"的经文如何触动你的心？"
    },
    {
        "id": 55,
        "category": "爱心",
        "categoryEn": "love",
        "icon": "❤️",
        "color": "#E74C3C",
        "reference": "约翰一书 4:18-19",
        "text": "爱里没有惧怕．爱既完全、就把惧怕除去．因为惧怕里含着刑罚．惧怕的人在爱里未得完全。 我们爱、因为　神先爱我们。",
        "question": "这节关于\"爱心\"的经文如何触动你的心？"
    },
    {
        "id": 56,
        "category": "爱心",
        "categoryEn": "love",
        "icon": "❤️",
        "color": "#E74C3C",
        "reference": "犹大书 1:21",
        "text": "保守自己常在　神的爱中、仰望我们主耶稣基督的怜悯、直到永生。",
        "question": "这节关于\"爱心\"的经文如何触动你的心？"
    },
    {
        "id": 57,
        "category": "信心",
        "categoryEn": "faith",
        "icon": "✝️",
        "color": "#9B59B6",
        "reference": "希伯来书 11:1",
        "text": "信就是所望之事的实底、是未见之事的确据。",
        "question": "这节关于\"信心\"的经文如何触动你的心？"
    },
    {
        "id": 58,
        "category": "信心",
        "categoryEn": "faith",
        "icon": "✝️",
        "color": "#9B59B6",
        "reference": "希伯来书 11:6",
        "text": "人非有信、就不能得　神的喜悦．因为到　神面前来的人、必须信有神，且信他赏赐那寻求他的人。",
        "question": "这节关于\"信心\"的经文如何触动你的心？"
    },
    {
        "id": 59,
        "category": "信心",
        "categoryEn": "faith",
        "icon": "✝️",
        "color": "#9B59B6",
        "reference": "马可福音 9:23",
        "text": "耶稣对他说、你若能信、在信的人、凡事都能。",
        "question": "这节关于\"信心\"的经文如何触动你的心？"
    },
    {
        "id": 60,
        "category": "信心",
        "categoryEn": "faith",
        "icon": "✝️",
        "color": "#9B59B6",
        "reference": "马可福音 11:22-24",
        "text": "耶稣回答说、你们当信服　神。 我实在告诉你们、无论何人对这座山说、你挪开此地投在海里．他若心里不疑惑、只信他所说的必成、就必给他成了。 所以我告诉你们、凡你们祷告祈求的、无论是甚么、只要信是得着的、就必得着。",
        "question": "这节关于\"信心\"的经文如何触动你的心？"
    },
    {
        "id": 61,
        "category": "信心",
        "categoryEn": "faith",
        "icon": "✝️",
        "color": "#9B59B6",
        "reference": "罗马书 10:17",
        "text": "可见信道是从听道来的、听道是从基督的话来的。",
        "question": "这节关于\"信心\"的经文如何触动你的心？"
    },
    {
        "id": 62,
        "category": "信心",
        "categoryEn": "faith",
        "icon": "✝️",
        "color": "#9B59B6",
        "reference": "哥林多后书 5:7",
        "text": "因我们行事为人、是凭着信心、不是凭着眼见。",
        "question": "这节关于\"信心\"的经文如何触动你的心？"
    },
    {
        "id": 63,
        "category": "信心",
        "categoryEn": "faith",
        "icon": "✝️",
        "color": "#9B59B6",
        "reference": "以弗所书 2:8",
        "text": "你们得救是本乎恩、也因着信、这并不是出于自己、乃是　神所赐的．",
        "question": "这节关于\"信心\"的经文如何触动你的心？"
    },
    {
        "id": 64,
        "category": "信心",
        "categoryEn": "faith",
        "icon": "✝️",
        "color": "#9B59B6",
        "reference": "雅各书 2:17",
        "text": "这样、信心若没有行为就是死的。",
        "question": "这节关于\"信心\"的经文如何触动你的心？"
    },
    {
        "id": 65,
        "category": "信心",
        "categoryEn": "faith",
        "icon": "✝️",
        "color": "#9B59B6",
        "reference": "约翰一书 5:4",
        "text": "因为凡从　神生的、就胜过世界．使我们胜了世界的、就是我们的信心。",
        "question": "这节关于\"信心\"的经文如何触动你的心？"
    },
    {
        "id": 66,
        "category": "信心",
        "categoryEn": "faith",
        "icon": "✝️",
        "color": "#9B59B6",
        "reference": "创世纪 15:6",
        "text": "亚伯兰信耶和华、耶和华就以此为他的义。",
        "question": "这节关于\"信心\"的经文如何触动你的心？"
    },
    {
        "id": 67,
        "category": "信心",
        "categoryEn": "faith",
        "icon": "✝️",
        "color": "#9B59B6",
        "reference": "民数记 23:19",
        "text": "神非人、必不致说谎、也非人子、必不致后悔．他说话岂不照着行呢、他发言岂不要成就呢。",
        "question": "这节关于\"信心\"的经文如何触动你的心？"
    },
    {
        "id": 68,
        "category": "信心",
        "categoryEn": "faith",
        "icon": "✝️",
        "color": "#9B59B6",
        "reference": "申命记 31:6",
        "text": "你们当刚强壮胆、不要害怕、也不要畏惧他们、因为耶和华你的　神和你同去、他必不撇下你、也不丢弃你。",
        "question": "这节关于\"信心\"的经文如何触动你的心？"
    },
    {
        "id": 69,
        "category": "信心",
        "categoryEn": "faith",
        "icon": "✝️",
        "color": "#9B59B6",
        "reference": "诗篇 37:3-5",
        "text": "你当倚靠耶和华而行善．住在地上、以他的信实为粮． 又要以耶和华为乐．他就将你心里所求的赐给你。 当将你的事交托耶和华、并倚靠他、他就必成全。",
        "question": "这节关于\"信心\"的经文如何触动你的心？"
    },
    {
        "id": 70,
        "category": "信心",
        "categoryEn": "faith",
        "icon": "✝️",
        "color": "#9B59B6",
        "reference": "诗篇 56:3-4",
        "text": "我惧怕的时候要倚靠你。 我倚靠　神、我要赞美他的话．我倚靠　神、必不惧怕．血气之辈能把我怎么样呢。",
        "question": "这节关于\"信心\"的经文如何触动你的心？"
    },
    {
        "id": 71,
        "category": "信心",
        "categoryEn": "faith",
        "icon": "✝️",
        "color": "#9B59B6",
        "reference": "诗篇 119:90",
        "text": "你的诚实存到万代。你坚定了地、地就长存。",
        "question": "这节关于\"信心\"的经文如何触动你的心？"
    },
    {
        "id": 72,
        "category": "信心",
        "categoryEn": "faith",
        "icon": "✝️",
        "color": "#9B59B6",
        "reference": "箴言 3:5",
        "text": "你要专心仰赖耶和华、不可倚靠自己的聪明．",
        "question": "这节关于\"信心\"的经文如何触动你的心？"
    },
    {
        "id": 73,
        "category": "信心",
        "categoryEn": "faith",
        "icon": "✝️",
        "color": "#9B59B6",
        "reference": "以赛亚书 7:9",
        "text": "以法莲的首城是撒玛利亚、撒玛利亚的首领是利玛利的儿子。你们若是不信、定然不得立稳。",
        "question": "这节关于\"信心\"的经文如何触动你的心？"
    },
    {
        "id": 74,
        "category": "信心",
        "categoryEn": "faith",
        "icon": "✝️",
        "color": "#9B59B6",
        "reference": "以赛亚书 26:4",
        "text": "你们当倚靠耶和华直到永远．因为耶和华是永久的磐石。",
        "question": "这节关于\"信心\"的经文如何触动你的心？"
    },
    {
        "id": 75,
        "category": "信心",
        "categoryEn": "faith",
        "icon": "✝️",
        "color": "#9B59B6",
        "reference": "哈巴谷书 2:4",
        "text": "迦勒底人自高自大、心不正直．惟义人因信得生。",
        "question": "这节关于\"信心\"的经文如何触动你的心？"
    },
    {
        "id": 76,
        "category": "信心",
        "categoryEn": "faith",
        "icon": "✝️",
        "color": "#9B59B6",
        "reference": "马太福音 6:30",
        "text": "你们这小信的人哪、野地里的草、今天还在、明天就丢在炉里、　神还给他这样的妆饰、何况你们呢。",
        "question": "这节关于\"信心\"的经文如何触动你的心？"
    },
    {
        "id": 77,
        "category": "信心",
        "categoryEn": "faith",
        "icon": "✝️",
        "color": "#9B59B6",
        "reference": "马太福音 17:20",
        "text": "耶稣说、是因你们的信心小．我实在告诉你们、你们若有信心像一粒芥菜种、就是对这座山说、你从这边挪到那边、他也必挪去．并且你们没有一件不能作的事了。",
        "question": "这节关于\"信心\"的经文如何触动你的心？"
    },
    {
        "id": 78,
        "category": "信心",
        "categoryEn": "faith",
        "icon": "✝️",
        "color": "#9B59B6",
        "reference": "马太福音 21:21",
        "text": "耶稣回答说、我实在告诉你们、你们若有信心、不疑惑、不但能行无花果树上所行的事、就是对这座山说、你挪开此地、投在海里、也必成就。",
        "question": "这节关于\"信心\"的经文如何触动你的心？"
    },
    {
        "id": 79,
        "category": "信心",
        "categoryEn": "faith",
        "icon": "✝️",
        "color": "#9B59B6",
        "reference": "路加福音 17:6",
        "text": "主说、你们若有信心像一粒芥菜种、就是对这棵桑树说、你要拔起根来、栽在海里、他也必听从你们。",
        "question": "这节关于\"信心\"的经文如何触动你的心？"
    },
    {
        "id": 80,
        "category": "信心",
        "categoryEn": "faith",
        "icon": "✝️",
        "color": "#9B59B6",
        "reference": "罗马书 1:17",
        "text": "因为　神的义、正在这福音上显明出来．这义是本于信、以致于信．如经上所记、『义人必因信得生。』",
        "question": "这节关于\"信心\"的经文如何触动你的心？"
    },
    {
        "id": 81,
        "category": "信心",
        "categoryEn": "faith",
        "icon": "✝️",
        "color": "#9B59B6",
        "reference": "罗马书 4:20-21",
        "text": "并且仰望　神的应许、总没有因不信、心里起疑惑．反倒因信、心里得坚固、将荣耀归给　神。 且满心相信、　神所应许的必能作成．",
        "question": "这节关于\"信心\"的经文如何触动你的心？"
    },
    {
        "id": 82,
        "category": "信心",
        "categoryEn": "faith",
        "icon": "✝️",
        "color": "#9B59B6",
        "reference": "罗马书 14:23",
        "text": "若有疑心而吃的、就必有罪．因为他吃、不是出于信心．凡不出于信心的都是罪。",
        "question": "这节关于\"信心\"的经文如何触动你的心？"
    },
    {
        "id": 83,
        "category": "信心",
        "categoryEn": "faith",
        "icon": "✝️",
        "color": "#9B59B6",
        "reference": "加拉太书 2:20",
        "text": "我已经与基督同钉十字架．现在活着的、不再是我、乃是基督在我里面活着．并且我如今在肉身活着、是因信　神的儿子而活、他是爱我、为我舍己。",
        "question": "这节关于\"信心\"的经文如何触动你的心？"
    },
    {
        "id": 84,
        "category": "信心",
        "categoryEn": "faith",
        "icon": "✝️",
        "color": "#9B59B6",
        "reference": "加拉太书 3:11",
        "text": "没有一个人靠着律法在　神面前称义、这是明显的．因为经上说、『义人必因信得生。』",
        "question": "这节关于\"信心\"的经文如何触动你的心？"
    },
    {
        "id": 85,
        "category": "信心",
        "categoryEn": "faith",
        "icon": "✝️",
        "color": "#9B59B6",
        "reference": "腓立比书 1:6",
        "text": "我深信那在你们心里动了善工的、必成全这工、直到耶稣基督的日子．",
        "question": "这节关于\"信心\"的经文如何触动你的心？"
    },
    {
        "id": 86,
        "category": "力量",
        "categoryEn": "strength",
        "icon": "💪",
        "color": "#F39C12",
        "reference": "腓立比书 4:13",
        "text": "我靠着那加给我力量的、凡事都能作。",
        "question": "这节关于\"力量\"的经文如何触动你的心？"
    },
    {
        "id": 87,
        "category": "力量",
        "categoryEn": "strength",
        "icon": "💪",
        "color": "#F39C12",
        "reference": "以赛亚书 40:31",
        "text": "但那等候耶和华的、必从新得力、他们必如鹰展翅上腾、他们奔跑却不困倦、行走却不疲乏。",
        "question": "这节关于\"力量\"的经文如何触动你的心？"
    },
    {
        "id": 88,
        "category": "力量",
        "categoryEn": "strength",
        "icon": "💪",
        "color": "#F39C12",
        "reference": "以赛亚书 41:10",
        "text": "你不要害怕、因为我与你同在．不要惊惶、因为我是你的　神．我必坚固你、我必帮助你、我必用我公义的右手扶持你。",
        "question": "这节关于\"力量\"的经文如何触动你的心？"
    },
    {
        "id": 89,
        "category": "力量",
        "categoryEn": "strength",
        "icon": "💪",
        "color": "#F39C12",
        "reference": "诗篇 27:1",
        "text": "〔大卫的诗。〕耶和华是我的亮光、是我的拯救．我还怕谁呢．耶和华是我性命的保障．〔保障或作力量〕我还惧谁呢。",
        "question": "这节关于\"力量\"的经文如何触动你的心？"
    },
    {
        "id": 90,
        "category": "力量",
        "categoryEn": "strength",
        "icon": "💪",
        "color": "#F39C12",
        "reference": "诗篇 28:7",
        "text": "耶和华是我的力量、是我的盾牌．我心里倚靠他、就得帮助．所以我心中欢乐．我必用诗歌颂赞他。",
        "question": "这节关于\"力量\"的经文如何触动你的心？"
    },
    {
        "id": 91,
        "category": "力量",
        "categoryEn": "strength",
        "icon": "💪",
        "color": "#F39C12",
        "reference": "诗篇 31:24",
        "text": "凡仰望耶和华的人、你们都要壮胆、坚固你们的心。",
        "question": "这节关于\"力量\"的经文如何触动你的心？"
    },
    {
        "id": 92,
        "category": "力量",
        "categoryEn": "strength",
        "icon": "💪",
        "color": "#F39C12",
        "reference": "尼希米记 8:10",
        "text": "又对他们说、你们去吃肥美的、喝甘甜的、有不能预备的、就分给他．因为今日是我们主的圣日．你们不要忧愁、因靠耶和华而得的喜乐是你们的力量。",
        "question": "这节关于\"力量\"的经文如何触动你的心？"
    },
    {
        "id": 93,
        "category": "力量",
        "categoryEn": "strength",
        "icon": "💪",
        "color": "#F39C12",
        "reference": "撒迦利亚书 4:6",
        "text": "他对我说、这是耶和华指示所罗巴伯的．万军之耶和华说、不是倚靠势力、不是倚靠才能、乃是倚靠我的灵、方能成事。",
        "question": "这节关于\"力量\"的经文如何触动你的心？"
    },
    {
        "id": 94,
        "category": "力量",
        "categoryEn": "strength",
        "icon": "💪",
        "color": "#F39C12",
        "reference": "提摩太后书 1:7",
        "text": "因为　神赐给我们、不是胆怯的心、乃是刚强、仁爱、谨守的心。",
        "question": "这节关于\"力量\"的经文如何触动你的心？"
    },
    {
        "id": 95,
        "category": "力量",
        "categoryEn": "strength",
        "icon": "💪",
        "color": "#F39C12",
        "reference": "以弗所书 6:10",
        "text": "我还有末了的话、你们要靠着主、倚赖他的大能大力、作刚强的人。",
        "question": "这节关于\"力量\"的经文如何触动你的心？"
    },
    {
        "id": 96,
        "category": "力量",
        "categoryEn": "strength",
        "icon": "💪",
        "color": "#F39C12",
        "reference": "出埃及记 15:2",
        "text": "耶和华是我的力量、我的诗歌、也成了我的拯救．这是我的　神、我要赞美他、是我父亲的　神、我要尊崇他。",
        "question": "这节关于\"力量\"的经文如何触动你的心？"
    },
    {
        "id": 97,
        "category": "力量",
        "categoryEn": "strength",
        "icon": "💪",
        "color": "#F39C12",
        "reference": "申命记 20:4",
        "text": "因为耶和华你们的　神与你们同去、要为你们与仇敌争战、拯救你们。",
        "question": "这节关于\"力量\"的经文如何触动你的心？"
    },
    {
        "id": 98,
        "category": "力量",
        "categoryEn": "strength",
        "icon": "💪",
        "color": "#F39C12",
        "reference": "约书亚记 1:9",
        "text": "我岂没有吩咐你么．你当刚强壮胆．不要惧怕、也不要惊惶、因为你无论往那里去、耶和华你的　神必与你同在。",
        "question": "这节关于\"力量\"的经文如何触动你的心？"
    },
    {
        "id": 99,
        "category": "力量",
        "categoryEn": "strength",
        "icon": "💪",
        "color": "#F39C12",
        "reference": "历代志上 16:11",
        "text": "要寻求耶和华与他的能力．时常寻求他的面。",
        "question": "这节关于\"力量\"的经文如何触动你的心？"
    },
    {
        "id": 100,
        "category": "力量",
        "categoryEn": "strength",
        "icon": "💪",
        "color": "#F39C12",
        "reference": "诗篇 18:32-34",
        "text": "惟有那以力量束我的腰、使我行为完全的、他是　神。 他使我的脚快如母鹿的蹄、又使我在高处安稳。 他教导我的手能以争战、甚至我的膀臂能开铜弓。",
        "question": "这节关于\"力量\"的经文如何触动你的心？"
    },
    {
        "id": 101,
        "category": "力量",
        "categoryEn": "strength",
        "icon": "💪",
        "color": "#F39C12",
        "reference": "诗篇 29:11",
        "text": "耶和华必赐力量给他的百姓．耶和华必赐平安的福给他的百姓。",
        "question": "这节关于\"力量\"的经文如何触动你的心？"
    },
    {
        "id": 102,
        "category": "力量",
        "categoryEn": "strength",
        "icon": "💪",
        "color": "#F39C12",
        "reference": "诗篇 46:1-3",
        "text": "〔可拉后裔的诗歌、交与伶长、调用女音。〕　神是我们的避难所、是我们的力量、是我们在患难中随时的帮助。 所以地虽改变、山虽摇动到海心、 其中的水虽匉訇翻腾、山虽因海涨而战抖、我们也不害怕。〔细拉〕",
        "question": "这节关于\"力量\"的经文如何触动你的心？"
    },
    {
        "id": 103,
        "category": "力量",
        "categoryEn": "strength",
        "icon": "💪",
        "color": "#F39C12",
        "reference": "诗篇 68:35",
        "text": "神阿、你从圣所显为可畏．以色列的　神、是那将力量权能赐给他百姓的。　神是应当称颂的。",
        "question": "这节关于\"力量\"的经文如何触动你的心？"
    },
    {
        "id": 104,
        "category": "力量",
        "categoryEn": "strength",
        "icon": "💪",
        "color": "#F39C12",
        "reference": "诗篇 105:4",
        "text": "要寻求耶和华与他的能力、时常寻求他的面。",
        "question": "这节关于\"力量\"的经文如何触动你的心？"
    },
    {
        "id": 105,
        "category": "力量",
        "categoryEn": "strength",
        "icon": "💪",
        "color": "#F39C12",
        "reference": "诗篇 118:14",
        "text": "耶和华是我的力量、是我的诗歌．他也成了我的拯救。",
        "question": "这节关于\"力量\"的经文如何触动你的心？"
    },
    {
        "id": 106,
        "category": "力量",
        "categoryEn": "strength",
        "icon": "💪",
        "color": "#F39C12",
        "reference": "以赛亚书 12:2",
        "text": "看哪、　神是我的拯救．我要倚靠他、并不惧怕．因为主耶和华是我的力、量、是我的诗歌．他也成了我的拯救。",
        "question": "这节关于\"力量\"的经文如何触动你的心？"
    },
    {
        "id": 107,
        "category": "力量",
        "categoryEn": "strength",
        "icon": "💪",
        "color": "#F39C12",
        "reference": "以赛亚书 25:4",
        "text": "因为当强暴人催逼人的时候、如同暴风直吹墙壁、你就作贫穷人的保障、作困乏人急难中的保障、作躲暴风之处、作避炎热的阴凉。",
        "question": "这节关于\"力量\"的经文如何触动你的心？"
    },
    {
        "id": 108,
        "category": "力量",
        "categoryEn": "strength",
        "icon": "💪",
        "color": "#F39C12",
        "reference": "以赛亚书 33:2",
        "text": "耶和华阿、求你施恩于我们．我们等候你．求你每早晨作我们的膀臂、遭难的时候、为我们的拯救。",
        "question": "这节关于\"力量\"的经文如何触动你的心？"
    },
    {
        "id": 109,
        "category": "力量",
        "categoryEn": "strength",
        "icon": "💪",
        "color": "#F39C12",
        "reference": "以赛亚书 35:3-4",
        "text": "你们要使软弱的手坚壮、无力的膝稳固。 对胆怯的人说、你们要刚强、不要惧怕．看哪、你们的　神必来报仇、必来施行极大的报应、他必来拯救你们。",
        "question": "这节关于\"力量\"的经文如何触动你的心？"
    },
    {
        "id": 110,
        "category": "力量",
        "categoryEn": "strength",
        "icon": "💪",
        "color": "#F39C12",
        "reference": "以赛亚书 40:28-29",
        "text": "你岂不曾知道么、你岂不曾听见么、永在的　神耶和华、创造地极的主、并不疲乏、也不困倦．他的智慧无法测度。 疲乏的、他赐能力．软弱的、他加力量．",
        "question": "这节关于\"力量\"的经文如何触动你的心？"
    },
    {
        "id": 111,
        "category": "力量",
        "categoryEn": "strength",
        "icon": "💪",
        "color": "#F39C12",
        "reference": "以赛亚书 43:1-2",
        "text": "雅各阿、创造你的耶和华、以色列阿、造成你的那位、现在如此说、你不要害怕、因为我救赎了你．我曾提你的名召你、你是属我的。 你从水中经过、我必与你同在．你趟过江河、水必不漫过你．你从火中行过、必不被烧、火焰也不着在你身上。",
        "question": "这节关于\"力量\"的经文如何触动你的心？"
    },
    {
        "id": 112,
        "category": "力量",
        "categoryEn": "strength",
        "icon": "💪",
        "color": "#F39C12",
        "reference": "哈巴谷书 3:19",
        "text": "主耶和华是我的力量．他使我的脚快如母鹿的蹄、又使我稳行在高处。这歌交与伶长、用丝弦的乐器。",
        "question": "这节关于\"力量\"的经文如何触动你的心？"
    },
    {
        "id": 113,
        "category": "力量",
        "categoryEn": "strength",
        "icon": "💪",
        "color": "#F39C12",
        "reference": "歌罗西书 1:11",
        "text": "照他荣耀的权能、得以在各样的力上加力、好叫你们凡事欢欢喜喜的忍耐宽容．",
        "question": "这节关于\"力量\"的经文如何触动你的心？"
    },
    {
        "id": 114,
        "category": "力量",
        "categoryEn": "strength",
        "icon": "💪",
        "color": "#F39C12",
        "reference": "彼得前书 4:11",
        "text": "若有讲道的、要按着　神的圣言讲．若有服事人的、要按着　神所赐的力量服事．叫　神在凡事上因耶稣基督得荣耀．原来荣耀权能都是他的、直到永永远远。阿们。",
        "question": "这节关于\"力量\"的经文如何触动你的心？"
    },
    {
        "id": 115,
        "category": "智慧",
        "categoryEn": "wisdom",
        "icon": "📖",
        "color": "#1ABC9C",
        "reference": "箴言 3:5-6",
        "text": "你要专心仰赖耶和华、不可倚靠自己的聪明． 在你一切所行的事上、都要认定他、他必指引你的路。",
        "question": "这节关于\"智慧\"的经文如何触动你的心？"
    },
    {
        "id": 116,
        "category": "智慧",
        "categoryEn": "wisdom",
        "icon": "📖",
        "color": "#1ABC9C",
        "reference": "箴言 9:10",
        "text": "敬畏耶和华、是智慧的开端．认识至圣者、便是聪明。",
        "question": "这节关于\"智慧\"的经文如何触动你的心？"
    },
    {
        "id": 117,
        "category": "智慧",
        "categoryEn": "wisdom",
        "icon": "📖",
        "color": "#1ABC9C",
        "reference": "箴言 4:7",
        "text": "智慧为首．所以要得智慧．在你一切所得之内、必得聪明。〔或作用你一切所得的去换聪明〕。",
        "question": "这节关于\"智慧\"的经文如何触动你的心？"
    },
    {
        "id": 118,
        "category": "智慧",
        "categoryEn": "wisdom",
        "icon": "📖",
        "color": "#1ABC9C",
        "reference": "箴言 2:6",
        "text": "因为、耶和华赐人智慧．知识和聪明都由他口而出．",
        "question": "这节关于\"智慧\"的经文如何触动你的心？"
    },
    {
        "id": 119,
        "category": "智慧",
        "categoryEn": "wisdom",
        "icon": "📖",
        "color": "#1ABC9C",
        "reference": "箴言 19:20",
        "text": "你要听劝教、受训诲、使你终久有智慧。",
        "question": "这节关于\"智慧\"的经文如何触动你的心？"
    },
    {
        "id": 120,
        "category": "智慧",
        "categoryEn": "wisdom",
        "icon": "📖",
        "color": "#1ABC9C",
        "reference": "雅各书 1:5",
        "text": "你们中间若有缺少智慧的、应当求那厚赐与众人、也不斥责人的　神、主就必赐给他。",
        "question": "这节关于\"智慧\"的经文如何触动你的心？"
    },
    {
        "id": 121,
        "category": "智慧",
        "categoryEn": "wisdom",
        "icon": "📖",
        "color": "#1ABC9C",
        "reference": "雅各书 3:17",
        "text": "惟独从上头来的智慧、先是清洁、后是和平、温良柔顺、满有怜悯、多结善果、没有偏见、没有假冒。",
        "question": "这节关于\"智慧\"的经文如何触动你的心？"
    },
    {
        "id": 122,
        "category": "智慧",
        "categoryEn": "wisdom",
        "icon": "📖",
        "color": "#1ABC9C",
        "reference": "传道书 7:12",
        "text": "因为智慧护庇人、好像银钱护庇人一样．惟独智慧能保全智慧人的生命、这就是知识的益处。",
        "question": "这节关于\"智慧\"的经文如何触动你的心？"
    },
    {
        "id": 123,
        "category": "智慧",
        "categoryEn": "wisdom",
        "icon": "📖",
        "color": "#1ABC9C",
        "reference": "但以理书 2:20-21",
        "text": "但以理说、　神的名是应当称颂的、从亘古直到永远、因为智慧能力都属乎他． 他改变时候、日期、废王、立王、将智慧赐与智慧人、将知识赐与聪明人．",
        "question": "这节关于\"智慧\"的经文如何触动你的心？"
    },
    {
        "id": 124,
        "category": "智慧",
        "categoryEn": "wisdom",
        "icon": "📖",
        "color": "#1ABC9C",
        "reference": "歌罗西书 2:2-3",
        "text": "要叫他们的心得安慰、因爱心互相联络、以致丰丰足足在悟性中有充足的信心、使他们真知　神的奥秘、就是基督． 所积蓄的一切智慧知识、都在他里面藏着。",
        "question": "这节关于\"智慧\"的经文如何触动你的心？"
    },
    {
        "id": 125,
        "category": "智慧",
        "categoryEn": "wisdom",
        "icon": "📖",
        "color": "#1ABC9C",
        "reference": "约伯记 12:12-13",
        "text": "年老的有智慧、寿高的有知识。 在　神有智慧和能力．他有谋略和知识。",
        "question": "这节关于\"智慧\"的经文如何触动你的心？"
    },
    {
        "id": 126,
        "category": "智慧",
        "categoryEn": "wisdom",
        "icon": "📖",
        "color": "#1ABC9C",
        "reference": "诗篇 19:7-8",
        "text": "耶和华的律法全备、能苏醒人心．耶和华的法度确定、能使愚人有智慧。 耶和华的训词正直、能快活人的心．耶和华的命令清洁、能明亮人的眼目。",
        "question": "这节关于\"智慧\"的经文如何触动你的心？"
    },
    {
        "id": 127,
        "category": "智慧",
        "categoryEn": "wisdom",
        "icon": "📖",
        "color": "#1ABC9C",
        "reference": "诗篇 111:10",
        "text": "敬畏耶和华是智慧的开端．凡遵行他命令的、是聪明人．耶和华是永远当赞美的。",
        "question": "这节关于\"智慧\"的经文如何触动你的心？"
    },
    {
        "id": 128,
        "category": "智慧",
        "categoryEn": "wisdom",
        "icon": "📖",
        "color": "#1ABC9C",
        "reference": "箴言 1:7",
        "text": "敬畏耶和华是知识的开端．愚妄人藐视智慧和训诲。",
        "question": "这节关于\"智慧\"的经文如何触动你的心？"
    },
    {
        "id": 129,
        "category": "智慧",
        "categoryEn": "wisdom",
        "icon": "📖",
        "color": "#1ABC9C",
        "reference": "箴言 3:13-14",
        "text": "得智慧、得聪明的、这人便为有福。 因为得智慧胜过得银子、其利益强如精金．",
        "question": "这节关于\"智慧\"的经文如何触动你的心？"
    },
    {
        "id": 130,
        "category": "智慧",
        "categoryEn": "wisdom",
        "icon": "📖",
        "color": "#1ABC9C",
        "reference": "箴言 8:10-11",
        "text": "你们当受我的教训、不受白银．宁得知识、胜过黄金。 因为智慧比珍珠〔或作红宝石〕更美．一切可喜爱的、都不足与比较。",
        "question": "这节关于\"智慧\"的经文如何触动你的心？"
    },
    {
        "id": 131,
        "category": "智慧",
        "categoryEn": "wisdom",
        "icon": "📖",
        "color": "#1ABC9C",
        "reference": "箴言 11:2",
        "text": "骄傲来、羞耻也来．谦逊人却有智慧。",
        "question": "这节关于\"智慧\"的经文如何触动你的心？"
    },
    {
        "id": 132,
        "category": "智慧",
        "categoryEn": "wisdom",
        "icon": "📖",
        "color": "#1ABC9C",
        "reference": "箴言 13:10",
        "text": "骄傲只启争竞．听劝言的、却有智慧。",
        "question": "这节关于\"智慧\"的经文如何触动你的心？"
    },
    {
        "id": 133,
        "category": "智慧",
        "categoryEn": "wisdom",
        "icon": "📖",
        "color": "#1ABC9C",
        "reference": "箴言 15:33",
        "text": "敬畏耶和华、是智慧的训诲．尊荣以前、必有谦卑。",
        "question": "这节关于\"智慧\"的经文如何触动你的心？"
    },
    {
        "id": 134,
        "category": "智慧",
        "categoryEn": "wisdom",
        "icon": "📖",
        "color": "#1ABC9C",
        "reference": "箴言 16:16",
        "text": "得智慧胜似得金子．选聪明强如选银子。",
        "question": "这节关于\"智慧\"的经文如何触动你的心？"
    },
    {
        "id": 135,
        "category": "智慧",
        "categoryEn": "wisdom",
        "icon": "📖",
        "color": "#1ABC9C",
        "reference": "箴言 18:15",
        "text": "聪明人的心得知识．智慧人的耳求知识。",
        "question": "这节关于\"智慧\"的经文如何触动你的心？"
    },
    {
        "id": 136,
        "category": "智慧",
        "categoryEn": "wisdom",
        "icon": "📖",
        "color": "#1ABC9C",
        "reference": "箴言 23:23",
        "text": "你当买真理．就是智慧、训诲、和聪明、也都不可卖。",
        "question": "这节关于\"智慧\"的经文如何触动你的心？"
    },
    {
        "id": 137,
        "category": "智慧",
        "categoryEn": "wisdom",
        "icon": "📖",
        "color": "#1ABC9C",
        "reference": "箴言 28:26",
        "text": "心中自是的、便是愚昧人．凭智慧行事的、必蒙拯救。",
        "question": "这节关于\"智慧\"的经文如何触动你的心？"
    },
    {
        "id": 138,
        "category": "智慧",
        "categoryEn": "wisdom",
        "icon": "📖",
        "color": "#1ABC9C",
        "reference": "传道书 2:26",
        "text": "神喜悦谁、就给谁智慧、知识、和喜乐．惟有罪人、　神使他劳苦、叫他将所收聚的、所堆积的、归给　神所喜悦的人．这也是虚空、也是捕风。",
        "question": "这节关于\"智慧\"的经文如何触动你的心？"
    },
    {
        "id": 139,
        "category": "智慧",
        "categoryEn": "wisdom",
        "icon": "📖",
        "color": "#1ABC9C",
        "reference": "以赛亚书 28:29",
        "text": "这也是出于万军之耶和华．他的谋略奇妙、他的智慧广大。",
        "question": "这节关于\"智慧\"的经文如何触动你的心？"
    },
    {
        "id": 140,
        "category": "智慧",
        "categoryEn": "wisdom",
        "icon": "📖",
        "color": "#1ABC9C",
        "reference": "以赛亚书 33:6",
        "text": "你一生一世必得安稳、有丰盛的救恩、并智慧、和知识．你以敬畏耶和华为至宝。",
        "question": "这节关于\"智慧\"的经文如何触动你的心？"
    },
    {
        "id": 141,
        "category": "智慧",
        "categoryEn": "wisdom",
        "icon": "📖",
        "color": "#1ABC9C",
        "reference": "耶利米书 9:23-24",
        "text": "耶和华如此说、智慧人不要因他的智慧夸口、勇士不要因他的勇力夸口、财主不要因他的财物夸口． 夸口的却因他有聪明、认识我是耶和华、又知道我喜悦在世上施行慈爱公平和公义、以此夸口．这是耶和华说的。",
        "question": "这节关于\"智慧\"的经文如何触动你的心？"
    },
    {
        "id": 142,
        "category": "智慧",
        "categoryEn": "wisdom",
        "icon": "📖",
        "color": "#1ABC9C",
        "reference": "哥林多前书 1:25",
        "text": "因　神的愚拙总比人智慧．　神的软弱总比人强壮。",
        "question": "这节关于\"智慧\"的经文如何触动你的心？"
    },
    {
        "id": 143,
        "category": "智慧",
        "categoryEn": "wisdom",
        "icon": "📖",
        "color": "#1ABC9C",
        "reference": "哥林多前书 3:18-19",
        "text": "人不可自欺．你们中间若有人、在这世界自以为有智慧、倒不如变作愚拙、好成为有智慧的。 因这世界的智慧、在　神看是愚拙．如经上记着说、『主叫有智慧的中了自己的诡计。』",
        "question": "这节关于\"智慧\"的经文如何触动你的心？"
    },
    {
        "id": 144,
        "category": "宽恕",
        "categoryEn": "forgiveness",
        "icon": "🤝",
        "color": "#3498DB",
        "reference": "以弗所书 4:32",
        "text": "并要以恩慈相待、存怜悯的心、彼此饶恕、正如　神在基督里饶恕了你们一样。",
        "question": "这节关于\"宽恕\"的经文如何触动你的心？"
    },
    {
        "id": 145,
        "category": "宽恕",
        "categoryEn": "forgiveness",
        "icon": "🤝",
        "color": "#3498DB",
        "reference": "诗篇 103:12",
        "text": "东离西有多远、他叫我们的过犯、离我们也有多远。",
        "question": "这节关于\"宽恕\"的经文如何触动你的心？"
    },
    {
        "id": 146,
        "category": "宽恕",
        "categoryEn": "forgiveness",
        "icon": "🤝",
        "color": "#3498DB",
        "reference": "诗篇 32:1-2",
        "text": "〔大卫的训诲诗。〕得赦免其过、遮盖其罪的、这人是有福的。 凡心里没有诡诈、耶和华不算为有罪的、这人是有福的。",
        "question": "这节关于\"宽恕\"的经文如何触动你的心？"
    },
    {
        "id": 147,
        "category": "宽恕",
        "categoryEn": "forgiveness",
        "icon": "🤝",
        "color": "#3498DB",
        "reference": "马太福音 6:14-15",
        "text": "你们饶恕人的过犯、你们的天父也必饶恕你们的过犯。 你们不饶恕人的过犯、你们的天父也必不饶恕你们的过犯。",
        "question": "这节关于\"宽恕\"的经文如何触动你的心？"
    },
    {
        "id": 148,
        "category": "宽恕",
        "categoryEn": "forgiveness",
        "icon": "🤝",
        "color": "#3498DB",
        "reference": "马可福音 11:25",
        "text": "你们站着祷告的时候、若想起有人得罪你们、就当饶恕他、好叫你们在天上的父、也饶恕你们的过犯。",
        "question": "这节关于\"宽恕\"的经文如何触动你的心？"
    },
    {
        "id": 149,
        "category": "宽恕",
        "categoryEn": "forgiveness",
        "icon": "🤝",
        "color": "#3498DB",
        "reference": "路加福音 6:37",
        "text": "你们不要论断人、就不被论断．你们不要定人的罪、就不被定罪．你们要饶恕人、就必蒙饶恕．〔饶恕原文作释放〕",
        "question": "这节关于\"宽恕\"的经文如何触动你的心？"
    },
    {
        "id": 150,
        "category": "宽恕",
        "categoryEn": "forgiveness",
        "icon": "🤝",
        "color": "#3498DB",
        "reference": "歌罗西书 3:13",
        "text": "倘若这人与那人有嫌隙、总要彼此包容、彼此饶恕．主怎样饶恕了你们、你们也要怎样饶恕人。",
        "question": "这节关于\"宽恕\"的经文如何触动你的心？"
    },
    {
        "id": 151,
        "category": "宽恕",
        "categoryEn": "forgiveness",
        "icon": "🤝",
        "color": "#3498DB",
        "reference": "约翰一书 1:9",
        "text": "我们若认自己的罪、　神是信实的、是公义的、必要赦免我们的罪、洗净我们一切的不义。",
        "question": "这节关于\"宽恕\"的经文如何触动你的心？"
    },
    {
        "id": 152,
        "category": "宽恕",
        "categoryEn": "forgiveness",
        "icon": "🤝",
        "color": "#3498DB",
        "reference": "以赛亚书 1:18",
        "text": "耶和华说、你们来、我们彼此辩论．你们的罪虽像朱红、必变成雪白．虽红如丹颜、必白如羊毛。",
        "question": "这节关于\"宽恕\"的经文如何触动你的心？"
    },
    {
        "id": 153,
        "category": "宽恕",
        "categoryEn": "forgiveness",
        "icon": "🤝",
        "color": "#3498DB",
        "reference": "弥迦书 7:18-19",
        "text": "神阿、有何神像你、赦免罪孽、饶恕你产业之余民的罪过．不永远怀怒、喜爱施恩。 必再怜悯我们、将我们的罪孽踏在脚下、又将我们的一切罪投于深海。",
        "question": "这节关于\"宽恕\"的经文如何触动你的心？"
    },
    {
        "id": 154,
        "category": "宽恕",
        "categoryEn": "forgiveness",
        "icon": "🤝",
        "color": "#3498DB",
        "reference": "出埃及记 34:6-7",
        "text": "耶和华在他面前宣告说、耶和华、耶和华、是有怜悯、有恩典的　神、不轻易发怒、并有丰盛的慈爱和诚实。 为千万人存留慈爱、赦免罪孽、过犯、和罪恶．万不以有罪的为无罪、必追讨他的罪、自父及子、直到三四代。",
        "question": "这节关于\"宽恕\"的经文如何触动你的心？"
    },
    {
        "id": 155,
        "category": "宽恕",
        "categoryEn": "forgiveness",
        "icon": "🤝",
        "color": "#3498DB",
        "reference": "民数记 14:18",
        "text": "耶和华不轻易发怒、并有丰盛的慈爱、赦免罪孽和过犯、万不以有罪的为无罪、必追讨他的罪、自父及子、直到三、四代。",
        "question": "这节关于\"宽恕\"的经文如何触动你的心？"
    },
    {
        "id": 156,
        "category": "宽恕",
        "categoryEn": "forgiveness",
        "icon": "🤝",
        "color": "#3498DB",
        "reference": "历代志下 7:14",
        "text": "这称为我名下的子民、若是自卑、祷告、寻求我的面、转离他们的恶行．我必从天上垂听、赦免他们的罪医治他们的地。",
        "question": "这节关于\"宽恕\"的经文如何触动你的心？"
    },
    {
        "id": 157,
        "category": "宽恕",
        "categoryEn": "forgiveness",
        "icon": "🤝",
        "color": "#3498DB",
        "reference": "诗篇 25:7-11",
        "text": "求你不要记念我幼年的罪愆、和我的过犯。耶和华阿、求你因你的恩惠、按你的慈爱记念我。 耶和华是良善正直的．所以他必指示罪人走正路。 他必按公平引领谦卑人、将他的道教训他们。 凡遵守他的约和他法度的人、耶和华都以慈爱诚实待他。 耶和华阿、求你因你的名赦免我的罪、因为我的罪重大。",
        "question": "这节关于\"宽恕\"的经文如何触动你的心？"
    },
    {
        "id": 158,
        "category": "宽恕",
        "categoryEn": "forgiveness",
        "icon": "🤝",
        "color": "#3498DB",
        "reference": "诗篇 51:1-3",
        "text": "〔大卫与拔示巴同室以后、先知拿单来见他．他作这诗、交与伶长。〕　神阿、求你按你的慈爱怜恤我、按你丰盛的慈悲涂抹我的过犯。 求你将我的罪孽洗除净尽、并洁除我的罪。 因为我知道我的过犯．我的罪常在我面前。",
        "question": "这节关于\"宽恕\"的经文如何触动你的心？"
    },
    {
        "id": 159,
        "category": "宽恕",
        "categoryEn": "forgiveness",
        "icon": "🤝",
        "color": "#3498DB",
        "reference": "诗篇 65:3",
        "text": "罪孽胜了我．至于我们的过犯、你都要赦免。",
        "question": "这节关于\"宽恕\"的经文如何触动你的心？"
    },
    {
        "id": 160,
        "category": "宽恕",
        "categoryEn": "forgiveness",
        "icon": "🤝",
        "color": "#3498DB",
        "reference": "诗篇 86:5",
        "text": "主阿、你本为良善、乐意饶恕人、有丰盛的慈爱、赐给凡求告你的人。",
        "question": "这节关于\"宽恕\"的经文如何触动你的心？"
    },
    {
        "id": 161,
        "category": "宽恕",
        "categoryEn": "forgiveness",
        "icon": "🤝",
        "color": "#3498DB",
        "reference": "诗篇 130:3-4",
        "text": "主耶和华阿、你若究察罪孽、谁能站得住呢． 但在你有赦免之恩、要叫人敬畏你。",
        "question": "这节关于\"宽恕\"的经文如何触动你的心？"
    },
    {
        "id": 162,
        "category": "宽恕",
        "categoryEn": "forgiveness",
        "icon": "🤝",
        "color": "#3498DB",
        "reference": "以赛亚书 43:25",
        "text": "惟有我为自己的缘故涂抹你的过犯、我也不记念你的罪恶。",
        "question": "这节关于\"宽恕\"的经文如何触动你的心？"
    },
    {
        "id": 163,
        "category": "宽恕",
        "categoryEn": "forgiveness",
        "icon": "🤝",
        "color": "#3498DB",
        "reference": "以赛亚书 44:22",
        "text": "我涂抹了你的过犯、像厚云消散．我涂抹了你的罪恶、如薄云灭没．你当归向我、因我救赎了你。",
        "question": "这节关于\"宽恕\"的经文如何触动你的心？"
    },
    {
        "id": 164,
        "category": "宽恕",
        "categoryEn": "forgiveness",
        "icon": "🤝",
        "color": "#3498DB",
        "reference": "以赛亚书 55:7",
        "text": "恶人当离弃自己的道路．不义的人当除掉自己的意念、归向耶和华、耶和华就必怜恤他．当归向我们的　神、因为　神必广行赦免。",
        "question": "这节关于\"宽恕\"的经文如何触动你的心？"
    },
    {
        "id": 165,
        "category": "宽恕",
        "categoryEn": "forgiveness",
        "icon": "🤝",
        "color": "#3498DB",
        "reference": "耶利米书 3:12",
        "text": "你去向北方宣告说、耶和华说、背道的以色列阿、回来吧．我必不怒目看你们．因为我是慈爱的、我必不永远存怒．这是耶和华说的。",
        "question": "这节关于\"宽恕\"的经文如何触动你的心？"
    },
    {
        "id": 166,
        "category": "宽恕",
        "categoryEn": "forgiveness",
        "icon": "🤝",
        "color": "#3498DB",
        "reference": "耶利米书 31:34",
        "text": "他们各人不再教导自己的邻舍、和自己的弟兄、说、你该认识耶和华．因为他们从最小的、到至大的、都必认识我．我要赦免他们的罪孽、不再记念他们的罪恶．这是耶和华说的。",
        "question": "这节关于\"宽恕\"的经文如何触动你的心？"
    },
    {
        "id": 167,
        "category": "宽恕",
        "categoryEn": "forgiveness",
        "icon": "🤝",
        "color": "#3498DB",
        "reference": "但以理书 9:9",
        "text": "主、我们的　神、是怜悯饶恕人的、我们却违背了他、",
        "question": "这节关于\"宽恕\"的经文如何触动你的心？"
    },
    {
        "id": 168,
        "category": "宽恕",
        "categoryEn": "forgiveness",
        "icon": "🤝",
        "color": "#3498DB",
        "reference": "马太福音 18:21-22",
        "text": "那时彼得进前来、对耶稣说、主阿、我弟兄得罪我、我当饶恕他几次呢。到七次可以么。 耶稣说、我对你说、不是到七次、乃是到七十个七次。",
        "question": "这节关于\"宽恕\"的经文如何触动你的心？"
    },
    {
        "id": 169,
        "category": "宽恕",
        "categoryEn": "forgiveness",
        "icon": "🤝",
        "color": "#3498DB",
        "reference": "路加福音 7:47-48",
        "text": "所以我告诉你、他许多的罪都赦免了．因为他的爱多．但那赦免少的、他的爱就少。 于是对那女人说、你的罪赦免了。",
        "question": "这节关于\"宽恕\"的经文如何触动你的心？"
    },
    {
        "id": 170,
        "category": "宽恕",
        "categoryEn": "forgiveness",
        "icon": "🤝",
        "color": "#3498DB",
        "reference": "使徒行传 3:19",
        "text": "所以你们当悔改归正、使你们的罪得以涂抹、这样、那安舒的日子、就必从主面前来到．",
        "question": "这节关于\"宽恕\"的经文如何触动你的心？"
    },
    {
        "id": 171,
        "category": "宽恕",
        "categoryEn": "forgiveness",
        "icon": "🤝",
        "color": "#3498DB",
        "reference": "使徒行传 10:43",
        "text": "众先知也为他作见证、说、凡信他的人、必因他的名、得蒙赦罪。",
        "question": "这节关于\"宽恕\"的经文如何触动你的心？"
    },
    {
        "id": 172,
        "category": "宽恕",
        "categoryEn": "forgiveness",
        "icon": "🤝",
        "color": "#3498DB",
        "reference": "罗马书 3:23-24",
        "text": "因为世人都犯了罪、亏缺了　神的荣耀。 如今却蒙　神的恩典、因基督耶稣的救赎、就白白的称义。",
        "question": "这节关于\"宽恕\"的经文如何触动你的心？"
    },
    {
        "id": 173,
        "category": "盼望",
        "categoryEn": "hope",
        "icon": "🌟",
        "color": "#E67E22",
        "reference": "耶利米书 29:11",
        "text": "耶和华说、我知道我向你们所怀的意念、是赐平安的意念、不是降灾祸的意念、要叫你们末后有指望。",
        "question": "这节关于\"盼望\"的经文如何触动你的心？"
    },
    {
        "id": 174,
        "category": "盼望",
        "categoryEn": "hope",
        "icon": "🌟",
        "color": "#E67E22",
        "reference": "罗马书 15:13",
        "text": "但愿使人有盼望的　神、因信、将诸般的喜乐平安、充满你们的心、使你们借着圣灵的能力、大有盼望。",
        "question": "这节关于\"盼望\"的经文如何触动你的心？"
    },
    {
        "id": 175,
        "category": "盼望",
        "categoryEn": "hope",
        "icon": "🌟",
        "color": "#E67E22",
        "reference": "罗马书 8:24-25",
        "text": "我们得救是在乎盼望．只是所见的盼望不是盼望．谁还盼望他所见的呢。〔有古卷作人所看见的何必再盼望呢〕 但我们若盼望那所不见的、就必忍耐等候。",
        "question": "这节关于\"盼望\"的经文如何触动你的心？"
    },
    {
        "id": 176,
        "category": "盼望",
        "categoryEn": "hope",
        "icon": "🌟",
        "color": "#E67E22",
        "reference": "罗马书 5:2-5",
        "text": "我们又借着他、因信得进入现在所站的这恩典中、并且欢欢喜喜盼望　神的荣耀。 不但如此、就是在患难中、也是欢欢喜喜的．因为知道患难生忍耐． 忍耐生老练．老练生盼望． 盼望不至于羞耻．因为所赐给我们的圣灵、将　神的爱浇灌在我们心里。",
        "question": "这节关于\"盼望\"的经文如何触动你的心？"
    },
    {
        "id": 177,
        "category": "盼望",
        "categoryEn": "hope",
        "icon": "🌟",
        "color": "#E67E22",
        "reference": "诗篇 39:7",
        "text": "主阿、如今我等甚么呢．我的指望在乎你。",
        "question": "这节关于\"盼望\"的经文如何触动你的心？"
    },
    {
        "id": 178,
        "category": "盼望",
        "categoryEn": "hope",
        "icon": "🌟",
        "color": "#E67E22",
        "reference": "诗篇 71:5",
        "text": "主耶和华阿、你是我所盼望的．从我年幼你是我所倚靠的。",
        "question": "这节关于\"盼望\"的经文如何触动你的心？"
    },
    {
        "id": 179,
        "category": "盼望",
        "categoryEn": "hope",
        "icon": "🌟",
        "color": "#E67E22",
        "reference": "诗篇 130:5",
        "text": "我等候耶和华、我的心等候．我也仰望他的话。",
        "question": "这节关于\"盼望\"的经文如何触动你的心？"
    },
    {
        "id": 180,
        "category": "盼望",
        "categoryEn": "hope",
        "icon": "🌟",
        "color": "#E67E22",
        "reference": "以赛亚书 40:31",
        "text": "但那等候耶和华的、必从新得力、他们必如鹰展翅上腾、他们奔跑却不困倦、行走却不疲乏。",
        "question": "这节关于\"盼望\"的经文如何触动你的心？"
    },
    {
        "id": 181,
        "category": "盼望",
        "categoryEn": "hope",
        "icon": "🌟",
        "color": "#E67E22",
        "reference": "哥林多前书 13:13",
        "text": "如今常存的有信、有望、有爱、这三样、其中最大的是爱。",
        "question": "这节关于\"盼望\"的经文如何触动你的心？"
    },
    {
        "id": 182,
        "category": "盼望",
        "categoryEn": "hope",
        "icon": "🌟",
        "color": "#E67E22",
        "reference": "希伯来书 6:19",
        "text": "我们有这指望如同灵魂的锚、又坚固又牢靠、且通入幔内。",
        "question": "这节关于\"盼望\"的经文如何触动你的心？"
    },
    {
        "id": 183,
        "category": "盼望",
        "categoryEn": "hope",
        "icon": "🌟",
        "color": "#E67E22",
        "reference": "彼得前书 1:3-4",
        "text": "愿颂赞归与我们主耶稣基督的父　神、他曾照自己的大怜悯、借耶稣基督从死里复活、重生了我们、叫我们有活泼的盼望、 可以得着不能朽坏、不能玷污、不能衰残、为你们存留在天上的基业。",
        "question": "这节关于\"盼望\"的经文如何触动你的心？"
    },
    {
        "id": 184,
        "category": "盼望",
        "categoryEn": "hope",
        "icon": "🌟",
        "color": "#E67E22",
        "reference": "诗篇 25:3",
        "text": "凡等候你的必不羞愧．惟有那无故行奸诈的、必要羞愧。",
        "question": "这节关于\"盼望\"的经文如何触动你的心？"
    },
    {
        "id": 185,
        "category": "盼望",
        "categoryEn": "hope",
        "icon": "🌟",
        "color": "#E67E22",
        "reference": "诗篇 33:18-22",
        "text": "耶和华的眼目、看顾敬畏他的人、和仰望他慈爱的人、 要救他们的命脱离死亡、并使他们在饥荒中存活。 我们的心向来等候耶和华．他是我们的帮助、我们的盾牌。 我们的心必靠他欢喜、因为我们向来倚靠他的圣名。 耶和华阿、求你照着我们所仰望你的、向我们施行慈爱。",
        "question": "这节关于\"盼望\"的经文如何触动你的心？"
    },
    {
        "id": 186,
        "category": "盼望",
        "categoryEn": "hope",
        "icon": "🌟",
        "color": "#E67E22",
        "reference": "诗篇 43:5",
        "text": "我的心哪、你为何忧闷、为何在我里面烦躁．应当仰望　神．因我还要称赞他．他是我脸上的光荣、〔原文作帮助〕是我的　神。",
        "question": "这节关于\"盼望\"的经文如何触动你的心？"
    },
    {
        "id": 187,
        "category": "盼望",
        "categoryEn": "hope",
        "icon": "🌟",
        "color": "#E67E22",
        "reference": "诗篇 62:5",
        "text": "我的心哪、你当默默无声、专等候　神．因为我的盼望是从他而来。",
        "question": "这节关于\"盼望\"的经文如何触动你的心？"
    },
    {
        "id": 188,
        "category": "盼望",
        "categoryEn": "hope",
        "icon": "🌟",
        "color": "#E67E22",
        "reference": "诗篇 121:7-8",
        "text": "耶和华要保护你、免受一切的灾害．他要保护你的性命。 你出你入、耶和华要保护你、从今时直到永远。",
        "question": "这节关于\"盼望\"的经文如何触动你的心？"
    },
    {
        "id": 189,
        "category": "盼望",
        "categoryEn": "hope",
        "icon": "🌟",
        "color": "#E67E22",
        "reference": "诗篇 146:5",
        "text": "以雅各的　神为帮助、仰望耶和华他　神的、这人便为有福。",
        "question": "这节关于\"盼望\"的经文如何触动你的心？"
    },
    {
        "id": 190,
        "category": "盼望",
        "categoryEn": "hope",
        "icon": "🌟",
        "color": "#E67E22",
        "reference": "以赛亚书 9:2",
        "text": "在黑暗中行走的百姓、看见了大光．住在死荫之地的人、有光照耀他们。",
        "question": "这节关于\"盼望\"的经文如何触动你的心？"
    },
    {
        "id": 191,
        "category": "盼望",
        "categoryEn": "hope",
        "icon": "🌟",
        "color": "#E67E22",
        "reference": "以赛亚书 25:8-9",
        "text": "他已经吞灭死亡直到永远．主耶和华必擦去各人脸上的眼泪、又除掉普天下他百姓的羞辱．因为这是耶和华说的。 到那日人必说、看哪、这是我们的　神．我们素来等候他、他必拯救我们、这是耶和华、我们素来等候他、我们必因他的救恩．欢喜快乐。",
        "question": "这节关于\"盼望\"的经文如何触动你的心？"
    },
    {
        "id": 192,
        "category": "盼望",
        "categoryEn": "hope",
        "icon": "🌟",
        "color": "#E67E22",
        "reference": "以赛亚书 30:18",
        "text": "耶和华必然等候、要施恩给你们．必然兴起、好怜悯你们．因为耶和华是公平的　神．凡等候他的都是有福的。",
        "question": "这节关于\"盼望\"的经文如何触动你的心？"
    },
    {
        "id": 193,
        "category": "盼望",
        "categoryEn": "hope",
        "icon": "🌟",
        "color": "#E67E22",
        "reference": "以赛亚书 35:10",
        "text": "并且耶和华救赎的民必归回、歌唱来到锡安．永乐必归到他们的头上、他们必得着欢喜快乐、忧愁叹息尽都逃避。",
        "question": "这节关于\"盼望\"的经文如何触动你的心？"
    },
    {
        "id": 194,
        "category": "盼望",
        "categoryEn": "hope",
        "icon": "🌟",
        "color": "#E67E22",
        "reference": "耶利米哀歌 3:21-24",
        "text": "我想起这事、心里就有指望。 我们不至消灭、是出于耶和华诸般的慈爱、是因他的怜悯、不至断绝。 每早晨这都是新的．你的诚实、极其广大。 我心里说、耶和华是我的分．因此、我要仰望他。",
        "question": "这节关于\"盼望\"的经文如何触动你的心？"
    },
    {
        "id": 195,
        "category": "盼望",
        "categoryEn": "hope",
        "icon": "🌟",
        "color": "#E67E22",
        "reference": "约珥书 3:16",
        "text": "耶和华必从锡安吼叫、从耶路撒冷发声．天地就震动．耶和华却要作他百姓的避难所、作以色列人的保障。",
        "question": "这节关于\"盼望\"的经文如何触动你的心？"
    },
    {
        "id": 196,
        "category": "盼望",
        "categoryEn": "hope",
        "icon": "🌟",
        "color": "#E67E22",
        "reference": "弥迦书 7:7",
        "text": "至于我、我要仰望耶和华、要等候那救我的　神．我的　神必应允我。",
        "question": "这节关于\"盼望\"的经文如何触动你的心？"
    },
    {
        "id": 197,
        "category": "盼望",
        "categoryEn": "hope",
        "icon": "🌟",
        "color": "#E67E22",
        "reference": "马太福音 12:21",
        "text": "外邦人都要仰望他的名。』",
        "question": "这节关于\"盼望\"的经文如何触动你的心？"
    },
    {
        "id": 198,
        "category": "盼望",
        "categoryEn": "hope",
        "icon": "🌟",
        "color": "#E67E22",
        "reference": "约翰福音 16:20-22",
        "text": "我实实在在的告诉你们、你们将要痛哭、哀号、世人倒要喜乐．你们将要忧愁、然而你们的忧愁、要变为喜乐。 妇人生产的时候、就忧愁、因为他的时候到了．既生了孩子、就不再记念那苦楚、因为欢喜世上生了一个人。 你们现在也是忧愁．但我要再见你们、你们的心就喜乐了．这喜乐、也没有人能夺去。",
        "question": "这节关于\"盼望\"的经文如何触动你的心？"
    },
    {
        "id": 199,
        "category": "盼望",
        "categoryEn": "hope",
        "icon": "🌟",
        "color": "#E67E22",
        "reference": "提多书 2:13",
        "text": "等候所盼望的福、并等候至大的　神、和〔或作无和字〕我们救主耶稣基督的荣耀显现。",
        "question": "这节关于\"盼望\"的经文如何触动你的心？"
    },
    {
        "id": 200,
        "category": "盼望",
        "categoryEn": "hope",
        "icon": "🌟",
        "color": "#E67E22",
        "reference": "希伯来书 11:39-40",
        "text": "这些人都是因信得了美好的证据、却仍未得着所应许的． 因为　神给我们预备了更美的事、叫他们若不与我们同得、就不能完全。",
        "question": "这节关于\"盼望\"的经文如何触动你的心？"
    }
];

function getCardsByCategory(categoryId) {
    return cards.filter(card => card.categoryEn === categoryId);
}

function getRandomCard(categoryId = null) {
    if (categoryId) {
        const categoryCards = getCardsByCategory(categoryId);
        return categoryCards[Math.floor(Math.random() * categoryCards.length)];
    }
    return cards[Math.floor(Math.random() * cards.length)];
}

function getCardById(id) {
    return cards.find(card => card.id === id);
}

// ==================== src/core/card-service.js ====================
/**
 * 按类别筛选经文
 * @param {Array} cards - 经文数组
 * @param {string} category - 主题类别筛选（'all' 表示全部）
 * @returns {Array} 筛选后的经文数组
 */
function filterCards(cards, category) {
    return cards.filter((card) => {
        return category === 'all' || card.category === category;
    });
}

/**
 * 随机抽取一节经文
 * @param {Array} cards - 经文数组
 * @returns {Object|null} 随机选中的经文
 */
function drawRandomCard(cards) {
    if (!cards.length) return null;
    const index = Math.floor(Math.random() * cards.length);
    return cards[index];
}

// ==================== src/core/storage-migration.js ====================
/**
 * 存储命名空间与历史数据迁移
 *
 * 背景：本应用早期是从「心语卡牌」项目复制而来，localStorage key 沿用了
 * heartTalk* 前缀。两个应用部署在同一域名（jialezhouxin.github.io）下，
 * localStorage 按源共享 → 两边的记录写进同一个数组，互相覆盖。
 *
 * 本模块：
 * 1. 提供 bible* 命名空间的新 key（STORAGE_KEYS）
 * 2. 首次启动时把 heartTalk* 里的圣经记录迁移到 bible*，并把旧 key 里
 *    属于心语卡牌的记录留下（不删），解除串台
 *
 * 原则：**凡心语卡牌还在用的 key，一律只复制、不删除。**
 * 已确认心语卡牌仍在读 heartTalkHistory 与 heartTalkTheme，故这两个 key
 * 无论内容如何都保留；heartTalkCheckIn / heartTalkDailyCard 心语卡牌不用，
 * 搬完即删。
 */

const STORAGE_KEYS = {
    history: 'bibleHistory',
    theme: 'bibleTheme',
    checkIn: 'bibleCheckIn',
    dailyCard: 'bibleDailyCard',
    migrationFlag: 'bibleStorageMigrated'
};

/** 旧 key（来自心语卡牌项目） */
const LEGACY_KEYS = {
    history: 'heartTalkHistory',
    theme: 'heartTalkTheme',
    checkIn: 'heartTalkCheckIn',
    dailyCard: 'heartTalkDailyCard'
};

/** 7 个经文主题，用于判定某条记录是否属于圣经应用 */
const VERSE_CATEGORIES = new Set([
    'comfort', 'love', 'faith', 'strength', 'wisdom', 'forgiveness', 'hope'
]);

/**
 * 判断一条历史记录是否属于圣经应用。
 * 保守策略：只有在能明确确认是经文记录时才返回 true，
 * 拿不准的一律留在旧 key（宁可少迁，也不误删心语卡牌的数据）。
 * @param {Object} item - 历史记录
 * @returns {boolean}
 */
function isVerseRecord(item) {
    if (!item || typeof item !== 'object') return false;
    const card = item.card;
    if (!card || typeof card !== 'object') return false;
    // 明确的经文特征：有出处且有原文
    const hasVerseFields = typeof card.reference === 'string' && card.reference
        && typeof card.text === 'string' && card.text;
    if (hasVerseFields) return true;
    // 主题属于 7 个经文主题，且不是心语卡牌的关系类类别
    return typeof card.category === 'string' && VERSE_CATEGORIES.has(card.category);
}

/**
 * 从 localStorage 安全读取并解析 JSON
 * @param {string} key
 * @returns {*} 解析结果，失败返回 null
 */
function readJSON(key) {
    try {
        const raw = localStorage.getItem(key);
        if (!raw) return null;
        return JSON.parse(raw);
    } catch {
        return null;
    }
}

/**
 * 执行一次性迁移。幂等：迁移过就跳过。
 * @returns {{migrated:boolean, movedHistory:number, keptLegacyHistory:number}}
 */
function migrateLegacyStorage() {
    const result = { migrated: false, movedHistory: 0, keptLegacyHistory: 0 };

    try {
        if (localStorage.getItem(STORAGE_KEYS.migrationFlag) === '1') {
            return result;
        }

        // ---- 历史记录：按记录特征分流 ----
        const legacyHistory = readJSON(LEGACY_KEYS.history);
        if (Array.isArray(legacyHistory) && legacyHistory.length) {
            const verseRecords = legacyHistory.filter(isVerseRecord);
            const otherRecords = legacyHistory.filter((item) => !isVerseRecord(item));

            if (verseRecords.length) {
                // 合并进新 key（若已有新数据则并集，按 id 去重）
                const existing = readJSON(STORAGE_KEYS.history);
                const merged = Array.isArray(existing) ? existing.slice() : [];
                const seen = new Set(merged.map((it) => it && it.id));
                verseRecords.forEach((it) => {
                    if (it && !seen.has(it.id)) {
                        // 旧数据没有来源字段，按「抽取金句」处理
                        merged.push(it.source ? it : { ...it, source: 'draw' });
                        seen.add(it.id);
                    }
                });
                merged.sort((a, b) => (b.id || 0) - (a.id || 0));
                localStorage.setItem(STORAGE_KEYS.history, JSON.stringify(merged));
                result.movedHistory = verseRecords.length;
            }

            // 旧 key 只保留不属于圣经的记录；空了就删掉，还给心语卡牌
            if (otherRecords.length) {
                localStorage.setItem(LEGACY_KEYS.history, JSON.stringify(otherRecords));
                result.keptLegacyHistory = otherRecords.length;
            } else {
                localStorage.removeItem(LEGACY_KEYS.history);
            }
        }

        // ---- 主题：继承旧值，但**不删旧 key** ----
        // 背景：heartTalkTheme 这个 key 心语卡牌自己还在用（heart-talk/src/main.js）。
        // 两个应用同源，删了它会把心语卡牌的主题设置一并抹掉。
        // 所以这里只「复制一份」过来，旧 key 留给心语卡牌。
        if (!localStorage.getItem(STORAGE_KEYS.theme)) {
            const legacyTheme = localStorage.getItem(LEGACY_KEYS.theme);
            if (legacyTheme) {
                localStorage.setItem(STORAGE_KEYS.theme, legacyTheme);
            }
        }

        // ---- 打卡 / 每日卡牌：整体搬运，然后删旧 key ----
        // 这两个 key 心语卡牌完全不用，可以安全清掉。
        [
            [LEGACY_KEYS.checkIn, STORAGE_KEYS.checkIn],
            [LEGACY_KEYS.dailyCard, STORAGE_KEYS.dailyCard]
        ].forEach(([oldKey, newKey]) => {
            const value = localStorage.getItem(oldKey);
            if (value !== null) {
                if (!localStorage.getItem(newKey)) {
                    localStorage.setItem(newKey, value);
                }
                localStorage.removeItem(oldKey);
            }
        });

        localStorage.setItem(STORAGE_KEYS.migrationFlag, '1');
        result.migrated = true;
    } catch (error) {
        // 迁移失败不能阻塞应用启动；下次启动会再试
        console.warn('存储迁移未完成:', error);
    }

    return result;
}

// ==================== src/core/history-store.js ====================
const HISTORY_KEY = STORAGE_KEYS.history;

function loadHistory() {
    try {
        const raw = localStorage.getItem(HISTORY_KEY);
        if (!raw) return [];
        const parsed = JSON.parse(raw);
        return Array.isArray(parsed) ? parsed : [];
    } catch {
        return [];
    }
}

function saveHistory(history) {
    try {
        localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
        return true;
    } catch {
        return false;
    }
}

function clearHistoryStore() {
    try {
        localStorage.removeItem(HISTORY_KEY);
        return true;
    } catch {
        return false;
    }
}

function updateHistoryItem(history, id, newAnswer) {
    try {
        const index = history.findIndex(item => item.id === id);
        if (index === -1) return null;
        
        const updatedItem = {
            ...history[index],
            answer: newAnswer,
            updatedAt: new Date().toLocaleString('zh-CN')
        };
        
        const newHistory = [...history];
        newHistory[index] = updatedItem;
        
        if (!saveHistory(newHistory)) {
            return null;
        }
        
        return newHistory;
    } catch {
        return null;
    }
}

function deleteHistoryItem(history, id) {
    try {
        const newHistory = history.filter(item => item.id !== id);
        
        if (!saveHistory(newHistory)) {
            return null;
        }
        
        return newHistory;
    } catch {
        return null;
    }
}

// ==================== src/core/history-filter.js ====================
/**
 * 灵修记录的筛选与导出
 */

const SOURCE_LABELS = {
    draw: '抽取金句',
    daily: '今日经文',
    note: '手记'
};

/**
 * 解析记录时间戳。
 * 历史时间戳是 zh-CN 的本地格式（如 2026/9/17 16:01:32），
 * 部分旧数据可能是 ISO 字符串，两种都要能解析。
 * @param {string} timestamp
 * @returns {Date}
 */
function parseTimestamp(timestamp) {
    const text = String(timestamp || '');
    // zh-CN 本地格式：斜杠分隔
    if (/^\d{4}\/\d{1,2}\/\d{1,2}/.test(text)) {
        const [datePart, timePart = ''] = text.split(' ');
        const [y, m, d] = datePart.split('/').map(Number);
        const [hh = 0, mm = 0, ss = 0] = timePart ? timePart.split(':').map(Number) : [];
        return new Date(y, m - 1, d, hh, mm, ss);
    }
    return new Date(text);
}

/**
 * 取当天零点
 * @returns {Date}
 */
function startOfToday() {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), now.getDate());
}

/**
 * 按日期范围筛选
 * @param {Array} history
 * @param {string} dateFilter - 'all' | 'today' | 'week' | 'month' | 'year'
 * @returns {Array}
 */
function filterByDate(history, dateFilter) {
    if (dateFilter === 'all' || !dateFilter) {
        return history;
    }

    const today = startOfToday();

    return history.filter(item => {
        const itemDate = parseTimestamp(item.timestamp);
        if (Number.isNaN(itemDate.getTime())) return true;

        switch (dateFilter) {
            case 'today':
                return itemDate >= today;
            case 'week': {
                const weekAgo = new Date(today);
                weekAgo.setDate(weekAgo.getDate() - 7);
                return itemDate >= weekAgo;
            }
            case 'month': {
                const monthAgo = new Date(today);
                monthAgo.setMonth(monthAgo.getMonth() - 1);
                return itemDate >= monthAgo;
            }
            case 'year': {
                const yearAgo = new Date(today);
                yearAgo.setFullYear(yearAgo.getFullYear() - 1);
                return itemDate >= yearAgo;
            }
            default:
                return true;
        }
    });
}

/**
 * 按主题筛选
 * @param {Array} history
 * @param {string} categoryFilter - 'all' | 主题 id | 'note'
 * @returns {Array}
 */
function filterByCategory(history, categoryFilter) {
    if (categoryFilter === 'all' || !categoryFilter) {
        return history;
    }
    return history.filter(item => (item.card || {}).category === categoryFilter);
}

/**
 * 按来源筛选
 * @param {Array} history
 * @param {string} sourceFilter - 'all' | 'draw' | 'daily' | 'note'
 * @returns {Array}
 */
function filterBySource(history, sourceFilter) {
    if (sourceFilter === 'all' || !sourceFilter) {
        return history;
    }
    // 旧数据没有 source 字段，视为抽卡
    return history.filter(item => (item.source || 'draw') === sourceFilter);
}

/**
 * 组合筛选（日期 + 主题 + 来源）
 * @param {Array} history
 * @param {Object} filters - { date, category, source }
 * @returns {Array}
 */
function filterHistory(history, filters = {}) {
    let result = [...history];

    if (filters.date && filters.date !== 'all') {
        result = filterByDate(result, filters.date);
    }

    if (filters.category && filters.category !== 'all') {
        result = filterByCategory(result, filters.category);
    }

    if (filters.source && filters.source !== 'all') {
        result = filterBySource(result, filters.source);
    }

    return result;
}

/**
 * 将灵修记录导出为 JSON
 * @param {Array} history
 * @returns {string}
 */
function exportToJSON(history) {
    const exportData = {
        exportDate: new Date().toISOString(),
        totalCount: history.length,
        records: history.map((item) => ({
            ...item,
            sourceLabel: SOURCE_LABELS[item.source || 'draw'] || item.source
        }))
    };
    return JSON.stringify(exportData, null, 2);
}

/**
 * 下载 JSON 文件
 * @param {string} jsonString
 * @param {string} filename
 */
function downloadJSON(jsonString, filename = '圣经金句灵修记录.json') {
    const blob = new Blob([jsonString], { type: 'application/json;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}

/**
 * 生成统计信息
 * @param {Array} history
 * @returns {Object}
 */
function generateHistoryStats(history) {
    const stats = {
        totalCount: history.length,
        byCategory: {},
        bySource: {},
        byDate: {}
    };

    history.forEach(item => {
        const card = item.card || {};

        const category = card.category || 'unknown';
        stats.byCategory[category] = (stats.byCategory[category] || 0) + 1;

        const source = item.source || 'draw';
        stats.bySource[source] = (stats.bySource[source] || 0) + 1;

        const date = parseTimestamp(item.timestamp);
        if (!Number.isNaN(date.getTime())) {
            const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
            stats.byDate[monthKey] = (stats.byDate[monthKey] || 0) + 1;
        }
    });

    return stats;
}

// ==================== src/core/history-export.js ====================
/**
 * 历史记录导出功能 - 图片和PDF纪念册
 */
/**
 * 生成历史记录纪念册图片
 * @param {Array} history - 历史记录数组
 * @param {Object} categoryNames - 主题名称映射
 * @returns {Promise<string>} 图片DataURL
 */
async function generateHistoryAlbumImage(history, categoryNames) {
    if (!history.length) {
        throw new Error('没有历史记录可导出');
    }

    // 创建临时容器
    const container = document.createElement('div');
    container.style.cssText = `
        position: fixed;
        left: -9999px;
        top: 0;
        width: 800px;
        background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
        padding: 40px;
        font-family: 'Noto Serif SC', serif;
    `;

    // 生成统计信息
    const stats = generateHistoryStats(history);

    // 构建纪念册HTML
    let albumHTML = `
        <div style="
            background: white;
            border-radius: 20px;
            padding: 50px;
            box-shadow: 0 20px 60px rgba(0,0,0,0.1);
            min-height: 1000px;
        ">
            <!-- 封面 -->
            <div style="text-align: center; margin-bottom: 50px; padding-bottom: 40px; border-bottom: 3px solid #e8f5e9;">
                <div style="font-size: 60px; margin-bottom: 20px;">📖</div>
                <h1 style="
                    font-size: 42px;
                    color: #2e7d32;
                    margin: 0 0 15px 0;
                    font-weight: 700;
                ">心语卡牌纪念册</h1>
                <p style="
                    font-size: 18px;
                    color: #666;
                    margin: 0;
                ">记录每一次心灵的对话</p>
                <p style="
                    font-size: 14px;
                    color: #999;
                    margin-top: 15px;
                ">生成时间：${new Date().toLocaleString('zh-CN')}</p>
            </div>

            <!-- 统计概览 -->
            <div style="margin-bottom: 40px; padding: 25px; background: #f8f9fa; border-radius: 15px;">
                <h2 style="font-size: 24px; color: #333; margin: 0 0 20px 0;">📊 对话统计</h2>
                <div style="display: flex; gap: 30px; flex-wrap: wrap;">
                    <div style="text-align: center;">
                        <div style="font-size: 36px; font-weight: bold; color: #2e7d32;">${stats.totalCount}</div>
                        <div style="font-size: 14px; color: #666;">总记录数</div>
                    </div>
                    ${Object.entries(stats.byCategory).map(([cat, count]) => `
                        <div style="text-align: center;">
                            <div style="font-size: 28px; font-weight: bold; color: #4caf50;">${count}</div>
                            <div style="font-size: 14px; color: #666;">${categoryNames[cat] || cat}</div>
                        </div>
                    `).join('')}
                </div>
            </div>

            <!-- 历史记录列表 -->
            <div>
                <h2 style="font-size: 24px; color: #333; margin: 0 0 25px 0;">💭 灵修记录</h2>
    `;

    // 添加每条记录
    history.slice(0, 20).forEach((item, index) => {
        const card = item.card || {};
        const categoryName = categoryNames[card.category] || card.category || '';
        
        albumHTML += `
            <div style="
                margin-bottom: 25px;
                padding: 20px;
                background: #fafafa;
                border-radius: 12px;
                border-left: 4px solid #4caf50;
            ">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
                    <span style="
                        font-size: 12px;
                        color: #fff;
                        background: ${getCategoryColor(card.category)};
                        padding: 4px 12px;
                        border-radius: 20px;
                    ">${categoryName}</span>
                    <span style="font-size: 12px; color: #999;">${item.timestamp}</span>
                </div>
                <div style="
                    font-size: 16px;
                    color: #333;
                    font-weight: 600;
                    margin-bottom: 10px;
                    line-height: 1.5;
                ">${escapeHtml(card.text || '')}</div>
                <div style="
                    font-size: 13px;
                    color: #8a7561;
                    margin-bottom: 10px;
                ">—— ${escapeHtml(card.reference || '')}</div>
                <div style="
                    font-size: 14px;
                    color: #555;
                    line-height: 1.6;
                    padding: 12px;
                    background: white;
                    border-radius: 8px;
                ">${escapeHtml(item.answer)}</div>
            </div>
        `;
    });

    if (history.length > 20) {
        albumHTML += `
            <div style="text-align: center; padding: 30px; color: #999; font-size: 14px;">
                ... 还有 ${history.length - 20} 条记录 ...
            </div>
        `;
    }

    albumHTML += `
            </div>
            
            <!-- 页脚 -->
            <div style="
                text-align: center;
                margin-top: 50px;
                padding-top: 30px;
                border-top: 2px solid #e8f5e9;
                color: #999;
                font-size: 14px;
            ">
                <p>记录神的话语，数算他的恩典</p>
                <p style="margin-top: 10px;">📖 圣经金句</p>
            </div>
        </div>
    `;

    container.innerHTML = albumHTML;
    document.body.appendChild(container);

    try {
        // 等待字体加载
        await document.fonts.ready;
        
        // 检测是否在 file:// 协议下运行
        const isFileProtocol = window.location.protocol === 'file:';
        if (isFileProtocol) {
            throw new Error('请使用 HTTP 服务器访问以生成图片');
        }

        // 使用 html2canvas 生成图片
        const canvas = await html2canvas(container.firstElementChild, {
            scale: 2,
            useCORS: true,
            allowTaint: true,
            backgroundColor: null,
            logging: false,
            width: 800,
            height: container.firstElementChild.scrollHeight
        });

        return canvas.toDataURL('image/png');
    } finally {
        document.body.removeChild(container);
    }
}

/**
 * 下载纪念册图片
 * @param {string} dataUrl - 图片DataURL
 */
function downloadAlbumImage(dataUrl) {
    const link = document.createElement('a');
    link.download = `圣经金句灵修记录_${new Date().toISOString().slice(0, 10)}.png`;
    link.href = dataUrl;
    link.click();
}

/**
 * 生成并下载PDF纪念册
 * @param {Array} history - 历史记录数组
 * @param {Object} categoryNames - 类别名称映射
 * @param {Object} categoryNames - 主题名称映射
 */
async function generatePDFAlbum(history, categoryNames) {
    // 由于PDF生成需要额外库，这里先提供图片导出
    // PDF功能可以通过引入 jspdf 或 html2pdf.js 实现
    const imageData = await generateHistoryAlbumImage(history, categoryNames);
    downloadAlbumImage(imageData);
}

/**
 * 转义 HTML
 * @param {string} text
 * @returns {string}
 */
function escapeHtml(text) {
    return String(text == null ? '' : text)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
}

/**
 * 获取主题对应的颜色
 * @param {string} category - 主题代码
 * @returns {string} 颜色代码
 */
function getCategoryColor(category) {
    const colors = {
        comfort: '#4A90E2',
        love: '#E74C3C',
        faith: '#9B59B6',
        strength: '#F39C12',
        wisdom: '#1ABC9C',
        forgiveness: '#3498DB',
        hope: '#E67E22'
    };
    return colors[category] || '#4caf50';
}

/**
 * 批量导出多条记录为图片（分页）
 * @param {Array} history - 历史记录数组
 * @param {Object} categoryNames - 类别名称映射
 * @param {Object} categoryNames - 主题名称映射
 * @param {number} itemsPerPage - 每页记录数
 * @returns {Promise<string[]>} 图片DataURL数组
 */
async function generatePagedAlbumImages(history, categoryNames, itemsPerPage = 10) {
    const images = [];
    const totalPages = Math.ceil(history.length / itemsPerPage);
    
    for (let i = 0; i < totalPages; i++) {
        const pageHistory = history.slice(i * itemsPerPage, (i + 1) * itemsPerPage);
        const imageData = await generateHistoryAlbumImage(pageHistory, categoryNames);
        images.push(imageData);
    }
    
    return images;
}

// ==================== src/ui/render.js ====================
function createElement(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
}

function renderCard({ currentCard, categoryNames, elements }) {
    const {
        emptyState,
        cardContent,
        cardCategory,
        cardLevel,
        cardQuestion,
        saveBtn,
        shareBtn
    } = elements;

    if (!currentCard) {
        emptyState.style.display = 'block';
        cardContent.style.display = 'none';
        saveBtn.style.display = 'none';
        shareBtn.style.display = 'none';
        return;
    }

    emptyState.style.display = 'none';
    cardContent.style.display = 'block';
    cardCategory.textContent = categoryNames[currentCard.category] || currentCard.category;

    // 副标题显示经文出处
    cardLevel.textContent = currentCard.reference || '';
    cardLevel.className = 'card-level verse-reference-label';

    // 正文显示经文原文
    cardQuestion.innerHTML = `
        <div class="verse-text">${escapeHtml(currentCard.text)}</div>
        <div class="verse-reference">${escapeHtml(currentCard.reference)}</div>
    `;

    saveBtn.style.display = 'inline-block';
    shareBtn.style.display = 'inline-block';
}

/**
 * 转义 HTML，防止经文文本破坏标签结构
 * @param {string} text
 * @returns {string}
 */
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text == null ? '' : String(text);
    return div.innerHTML;
}

function renderHistory({ history, categoryNames, historyList, onEdit, onDelete }) {
    historyList.replaceChildren();

    if (!history.length) {
        const empty = createElement('div', 'empty-state');
        empty.appendChild(createElement('p', '', '暂无灵修记录'));
        historyList.appendChild(empty);
        return;
    }

    const fragment = document.createDocumentFragment();
    history.forEach((item) => {
        const wrapper = createElement('div', 'history-item');
        wrapper.dataset.id = item.id;

        // 头部信息：时间戳 + 操作按钮
        const header = createElement('div', 'history-item-header');
        header.appendChild(createElement('span', 'timestamp', item.timestamp));
        
        // 操作按钮组
        const actions = createElement('div', 'history-item-actions');
        
        const editBtn = createElement('button', 'history-action-btn edit-btn', '✏️');
        editBtn.title = '编辑';
        editBtn.dataset.action = 'edit';
        editBtn.dataset.id = item.id;
        
        const deleteBtn = createElement('button', 'history-action-btn delete-btn', '🗑️');
        deleteBtn.title = '删除';
        deleteBtn.dataset.action = 'delete';
        deleteBtn.dataset.id = item.id;
        
        actions.appendChild(editBtn);
        actions.appendChild(deleteBtn);
        header.appendChild(actions);
        wrapper.appendChild(header);

        // 主题标签 + 来源 + 经文出处（容忍旧数据里缺失 card 的记录）
        const card = item.card || {};
        const SOURCE_LABELS = { draw: '抽卡', daily: '每日', note: '手记' };
        const source = item.source || 'draw';
        const tagsRow = createElement('div', 'history-item-tags');
        if (item.source || item.source === undefined) {
            const sourceTag = createElement('span', `source-tag source-${source}`, SOURCE_LABELS[source] || source);
            tagsRow.appendChild(sourceTag);
        }
        if (card.category && card.category !== 'note') {
            const categoryName = categoryNames[card.category] || card.category;
            const categoryTag = createElement('span', `category-tag category-${card.category}`, categoryName);
            tagsRow.appendChild(categoryTag);
        }

        if (tagsRow.childNodes.length) {
            wrapper.appendChild(tagsRow);
        }

        // 经文原文 + 我的感受
        if (card.text) {
            wrapper.appendChild(createElement('div', 'question verse-text', card.text));
            wrapper.appendChild(createElement('div', 'verse-reference', card.reference ? `—— ${card.reference}` : ''));
        } else if (card.reference) {
            wrapper.appendChild(createElement('div', 'verse-reference', `—— ${card.reference}`));
        }
        wrapper.appendChild(createElement('div', 'answer', item.answer));
        
        // 如果有更新时间，显示
        if (item.updatedAt) {
            wrapper.appendChild(createElement('div', 'updated-at', `编辑于 ${item.updatedAt}`));
        }

        // 绑定事件
        if (onEdit) {
            editBtn.addEventListener('click', () => onEdit(item));
        }
        if (onDelete) {
            deleteBtn.addEventListener('click', () => onDelete(item));
        }

        fragment.appendChild(wrapper);
    });

    historyList.appendChild(fragment);
}

/**
 * 渲染筛选控件
 * @param {Object} params - 参数对象
 * @param {HTMLElement} params.container - 容器元素
 * @param {Object} params.categoryNames - 主题名称映射
 * @param {Function} params.onFilterChange - 筛选变化回调
 */
function renderHistoryFilters({ container, categoryNames, onFilterChange }) {
    container.replaceChildren();
    
    const wrapper = createElement('div', 'history-filters');
    
    // 日期筛选
    const dateFilterGroup = createElement('div', 'filter-group');
    dateFilterGroup.appendChild(createElement('label', '', '时间：'));
    
    const dateSelect = createElement('select', 'filter-select');
    dateSelect.dataset.filterType = 'date';
    const dateOptions = [
        { value: 'all', label: '全部时间' },
        { value: 'today', label: '今天' },
        { value: 'week', label: '最近7天' },
        { value: 'month', label: '最近30天' },
        { value: 'year', label: '最近一年' }
    ];
    dateOptions.forEach(opt => {
        const option = document.createElement('option');
        option.value = opt.value;
        option.textContent = opt.label;
        dateSelect.appendChild(option);
    });
    dateFilterGroup.appendChild(dateSelect);
    wrapper.appendChild(dateFilterGroup);
    
    // 主题筛选
    const categoryFilterGroup = createElement('div', 'filter-group');
    categoryFilterGroup.appendChild(createElement('label', '', '主题：'));
    
    const categorySelect = createElement('select', 'filter-select');
    categorySelect.dataset.filterType = 'category';
    const categoryOptions = [
        { value: 'all', label: '全部主题' },
        ...Object.entries(categoryNames).map(([key, name]) => ({ value: key, label: name })),
        { value: 'note', label: '手记' }
    ];
    categoryOptions.forEach(opt => {
        const option = document.createElement('option');
        option.value = opt.value;
        option.textContent = opt.label;
        categorySelect.appendChild(option);
    });
    categoryFilterGroup.appendChild(categorySelect);
    wrapper.appendChild(categoryFilterGroup);

    // 来源筛选
    const sourceFilterGroup = createElement('div', 'filter-group');
    sourceFilterGroup.appendChild(createElement('label', '', '来源：'));

    const sourceSelect = createElement('select', 'filter-select');
    sourceSelect.dataset.filterType = 'source';
    [
        { value: 'all', label: '全部来源' },
        { value: 'draw', label: '抽取金句' },
        { value: 'daily', label: '今日经文' },
        { value: 'note', label: '手记' }
    ].forEach((opt) => {
        const option = document.createElement('option');
        option.value = opt.value;
        option.textContent = opt.label;
        sourceSelect.appendChild(option);
    });
    sourceFilterGroup.appendChild(sourceSelect);
    wrapper.appendChild(sourceFilterGroup);
    
    // 绑定事件
    if (onFilterChange) {
        const emit = () => onFilterChange({
            date: dateSelect.value,
            category: categorySelect.value,
            source: sourceSelect.value
        });
        dateSelect.addEventListener('change', emit);
        categorySelect.addEventListener('change', emit);
        sourceSelect.addEventListener('change', emit);
    }
    
    container.appendChild(wrapper);
}

/**
 * 渲染导出控件
 * @param {Object} params - 参数对象
 * @param {HTMLElement} params.container - 容器元素
 * @param {Function} params.onExportJSON - 导出JSON回调
 * @param {Function} params.onExportImage - 导出图片回调
 * @param {Function} params.onExportAlbum - 导出纪念册回调
 * @param {Function} params.onShowStats - 显示统计回调
 * @param {Function} params.onShowReport - 显示报告回调
 */
function renderExportControls({ container, onExportJSON, onExportImage, onExportAlbum, onShowStats, onShowReport }) {
    container.replaceChildren();
    
    const wrapper = createElement('div', 'export-controls');
    
    const exportBtn = createElement('button', 'btn btn-secondary export-btn', '📤 导出');
    exportBtn.title = '导出历史记录';
    
    const dropdown = createElement('div', 'export-dropdown');
    dropdown.style.display = 'none';
    
    const jsonOption = createElement('div', 'export-option', '📄 导出为 JSON');
    jsonOption.dataset.exportType = 'json';
    
    const imageOption = createElement('div', 'export-option', '🖼️ 导出为图片');
    imageOption.dataset.exportType = 'image';
    
    const albumOption = createElement('div', 'export-option', '📖 生成纪念册');
    albumOption.dataset.exportType = 'album';
    
    const statsOption = createElement('div', 'export-option', '📊 数据统计');
    statsOption.dataset.exportType = 'stats';
    
    const reportOption = createElement('div', 'export-option', '📋 我的报告');
    reportOption.dataset.exportType = 'report';
    
    dropdown.appendChild(jsonOption);
    dropdown.appendChild(imageOption);
    dropdown.appendChild(albumOption);
    dropdown.appendChild(statsOption);
    dropdown.appendChild(reportOption);
    
    wrapper.appendChild(exportBtn);
    wrapper.appendChild(dropdown);
    
    // 切换下拉菜单显示
    exportBtn.addEventListener('click', () => {
        const isVisible = dropdown.style.display !== 'none';
        dropdown.style.display = isVisible ? 'none' : 'block';
    });
    
    // 点击外部关闭下拉菜单
    document.addEventListener('click', (e) => {
        if (!wrapper.contains(e.target)) {
            dropdown.style.display = 'none';
        }
    });
    
    // 绑定导出事件
    if (onExportJSON) {
        jsonOption.addEventListener('click', () => {
            onExportJSON();
            dropdown.style.display = 'none';
        });
    }
    if (onExportImage) {
        imageOption.addEventListener('click', () => {
            onExportImage();
            dropdown.style.display = 'none';
        });
    }
    if (onExportAlbum) {
        albumOption.addEventListener('click', () => {
            onExportAlbum();
            dropdown.style.display = 'none';
        });
    }
    if (onShowStats) {
        statsOption.addEventListener('click', () => {
            onShowStats();
            dropdown.style.display = 'none';
        });
    }
    if (onShowReport) {
        reportOption.addEventListener('click', () => {
            onShowReport();
            dropdown.style.display = 'none';
        });
    }
    
    container.appendChild(wrapper);
}

// ==================== src/core/stats.js ====================
/**
 * 统计计算模块
 * 提供灵修记录的数据分析和报告生成功能
 */

// 主题名称/配色（以 cards.js 的 categories 为唯一真源）
const CATEGORY_NAMES = {};
const CATEGORY_COLORS = {};
categories.forEach((c) => {
    CATEGORY_NAMES[c.id] = c.name;
    CATEGORY_COLORS[c.id] = c.color;
});

/**
 * 解析历史记录时间戳为 Date 对象
 * @param {string} timestamp - 本地时间字符串 (zh-CN 格式)
 * @returns {Date}
 */
function parseTimestamp(timestamp) {
    return new Date(String(timestamp).replace(/\//g, '-'));
}

/**
 * 获取日期字符串 (YYYY-MM-DD)
 * @param {Date} date
 * @returns {string}
 */
function getDateString(date) {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
}

/**
 * 计算基础统计数据
 * @param {Array} history - 历史记录数组
 * @returns {Object}
 */
function calculateBasicStats(history) {
    if (!history || history.length === 0) {
        return {
            totalCount: 0,
            todayCount: 0,
            weekCount: 0,
            monthCount: 0
        };
    }

    const now = new Date();
    const today = getDateString(now);
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const monthAgo = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());

    let todayCount = 0;
    let weekCount = 0;
    let monthCount = 0;

    history.forEach(item => {
        const itemDate = parseTimestamp(item.timestamp);
        const itemDateStr = getDateString(itemDate);

        if (itemDateStr === today) {
            todayCount++;
        }
        if (itemDate >= weekAgo) {
            weekCount++;
        }
        if (itemDate >= monthAgo) {
            monthCount++;
        }
    });

    return {
        totalCount: history.length,
        todayCount,
        weekCount,
        monthCount
    };
}

/**
 * 计算主题分布
 * @param {Array} history - 历史记录数组
 * @returns {Array} - 饼图数据格式 [{name, value, color}]
 */
function calculateCategoryDistribution(history) {
    if (!history || history.length === 0) {
        return [];
    }

    const counts = {};
    history.forEach(item => {
        const cat = item.card?.category || 'unknown';
        counts[cat] = (counts[cat] || 0) + 1;
    });

    return Object.entries(counts).map(([category, count]) => ({
        name: CATEGORY_NAMES[category] || category,
        value: count,
        color: CATEGORY_COLORS[category] || '#999',
        category
    })).sort((a, b) => b.value - a.value);
}

/**
 * 计算来源分布（抽卡 / 每日 / 手记）
 * @param {Array} history - 历史记录数组
 * @returns {Array} - 饼图数据格式 [{name, value, color}]
 */
function calculateSourceDistribution(history) {
    if (!history || history.length === 0) {
        return [];
    }

    const SOURCE_NAMES = { draw: '抽取金句', daily: '今日经文', note: '手记' };
    const SOURCE_COLORS = { draw: '#4A90E2', daily: '#E67E22', note: '#1ABC9C' };

    const counts = {};
    history.forEach(item => {
        const src = item.source || 'draw';
        counts[src] = (counts[src] || 0) + 1;
    });

    return Object.entries(counts).map(([source, count]) => ({
        name: SOURCE_NAMES[source] || source,
        value: count,
        color: SOURCE_COLORS[source] || '#999',
        source
    })).sort((a, b) => b.value - a.value);
}

/**
 * 计算每日活跃度（最近 N 天）
 * @param {Array} history - 历史记录数组
 * @param {number} days - 天数
 * @returns {Array}
 */
function calculateDailyActivity(history, days = 7) {
    if (!history || history.length === 0) {
        return [];
    }

    const result = [];
    const now = new Date();

    for (let i = days - 1; i >= 0; i--) {
        const date = new Date(now);
        date.setDate(date.getDate() - i);
        const dateStr = getDateString(date);
        const dayName = i === 0 ? '今天' : i === 1 ? '昨天' : `${date.getMonth() + 1}/${date.getDate()}`;

        const count = history.filter(item => {
            const itemDate = getDateString(parseTimestamp(item.timestamp));
            return itemDate === dateStr;
        }).length;

        result.push({
            date: dateStr,
            dayName,
            count,
            isToday: i === 0
        });
    }

    return result;
}

/**
 * 生成报告洞察文字
 * @param {Array} history - 历史记录数组
 * @param {Object} stats - 统计数据
 * @returns {Array<string>}
 */
function generateInsights(history, stats) {
    if (!history || history.length === 0) {
        return ['开始记录经文，生成你的专属灵修报告吧！'];
    }

    const insights = [];
    const catDist = calculateCategoryDistribution(history);

    // 基础统计洞察
    if (stats.totalCount < 10) {
        insights.push(`你已记录 ${stats.totalCount} 条灵修笔记，继续加油！`);
    } else if (stats.totalCount < 50) {
        insights.push(`很棒！你已积累 ${stats.totalCount} 条灵修笔记，渐入佳境。`);
    } else {
        insights.push(`你已记录 ${stats.totalCount} 条灵修笔记，这是很可贵的坚持。`);
    }

    // 主题洞察
    if (catDist.length > 0) {
        const topCat = catDist[0];
        const percentage = Math.round((topCat.value / stats.totalCount) * 100);
        insights.push(`你在「${topCat.name}」主题的经文上最常受触动，占比 ${percentage}%。`);
    }

    // 活跃度洞察
    if (stats.weekCount >= 5) {
        insights.push('本周灵修很稳定，愿神的话继续滋养你。');
    } else if (stats.todayCount > 0) {
        insights.push('今天也有新的领受，感谢神的恩典。');
    }

    return insights;
}

/**
 * 生成完整报告数据
 * @param {Array} history - 历史记录数组
 * @param {number} streakDays - 连续打卡天数
 * @returns {Object}
 */
function generateFullReport(history, streakDays = 0) {
    const basicStats = calculateBasicStats(history);
    const categoryDist = calculateCategoryDistribution(history);
    const sourceDist = calculateSourceDistribution(history);
    const dailyActivity = calculateDailyActivity(history, 7);
    const insights = generateInsights(history, basicStats);

    return {
        stats: {
            ...basicStats,
            streakDays
        },
        categoryDistribution: categoryDist,
        sourceDistribution: sourceDist,
        dailyActivity,
        insights,
        generatedAt: new Date().toLocaleString('zh-CN')
    };
}

// ==================== src/core/check-in.js ====================
/**
 * 打卡记录模块
 * 管理用户连续打卡天数和打卡历史
 */
const CHECKIN_KEY = STORAGE_KEYS.checkIn;

/**
 * 获取日期字符串 (YYYY-MM-DD)
 * @param {Date} date
 * @returns {string}
 */
function getDateString(date) {
    return date.toISOString().split('T')[0];
}

/**
 * 加载打卡数据
 * @returns {Object} - { dates: string[], streak: number, lastDate: string|null }
 */
function loadCheckInData() {
    try {
        const raw = localStorage.getItem(CHECKIN_KEY);
        if (!raw) {
            return { dates: [], streak: 0, lastDate: null };
        }
        const parsed = JSON.parse(raw);
        return {
            dates: Array.isArray(parsed.dates) ? parsed.dates : [],
            streak: typeof parsed.streak === 'number' ? parsed.streak : 0,
            lastDate: parsed.lastDate || null
        };
    } catch {
        return { dates: [], streak: 0, lastDate: null };
    }
}

/**
 * 保存打卡数据
 * @param {Object} data
 * @returns {boolean}
 */
function saveCheckInData(data) {
    try {
        localStorage.setItem(CHECKIN_KEY, JSON.stringify(data));
        return true;
    } catch {
        return false;
    }
}

/**
 * 检查今天是否已打卡
 * @param {Object} checkInData
 * @returns {boolean}
 */
function isTodayCheckedIn(checkInData) {
    if (!checkInData || !checkInData.lastDate) {
        return false;
    }
    const today = getDateString(new Date());
    return checkInData.lastDate === today;
}

/**
 * 计算两个日期之间的天数差
 * @param {string} dateStr1 - YYYY-MM-DD
 * @param {string} dateStr2 - YYYY-MM-DD
 * @returns {number}
 */
function daysBetween(dateStr1, dateStr2) {
    const d1 = new Date(dateStr1);
    const d2 = new Date(dateStr2);
    const diffTime = Math.abs(d2 - d1);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

/**
 * 执行打卡
 * 如果今天已打卡则返回当前数据，否则更新打卡记录
 * @returns {Object} - 更新后的打卡数据
 */
function doCheckIn() {
    const data = loadCheckInData();
    const today = getDateString(new Date());

    // 今天已打卡，直接返回
    if (data.lastDate === today) {
        return data;
    }

    // 更新打卡日期列表
    if (!data.dates.includes(today)) {
        data.dates.push(today);
    }

    // 计算连续打卡天数
    if (!data.lastDate) {
        // 首次打卡
        data.streak = 1;
    } else {
        const daysDiff = daysBetween(data.lastDate, today);
        if (daysDiff === 1) {
            // 连续打卡
            data.streak += 1;
        } else if (daysDiff === 0) {
            // 同一天，不做任何操作
        } else {
            // 断签，重新计算
            data.streak = 1;
        }
    }

    data.lastDate = today;
    saveCheckInData(data);
    return data;
}

/**
 * 在保存回答时自动打卡
 * 这是主要的打卡入口，每次用户保存回答时调用
 * @returns {Object} - { isNewCheckIn: boolean, data: Object }
 */
function checkInOnSave() {
    const data = loadCheckInData();
    const wasCheckedIn = isTodayCheckedIn(data);

    const newData = doCheckIn();

    return {
        isNewCheckIn: !wasCheckedIn,
        data: newData
    };
}

/**
 * 获取连续打卡天数
 * @returns {number}
 */
function getStreakDays() {
    const data = loadCheckInData();
    return data.streak;
}

/**
 * 获取本月打卡天数
 * @returns {number}
 */
function getMonthlyCheckInCount() {
    const data = loadCheckInData();
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    return data.dates.filter(dateStr => {
        const date = new Date(dateStr);
        return date.getMonth() === currentMonth && date.getFullYear() === currentYear;
    }).length;
}

/**
 * 获取最近 N 天的打卡状态
 * @param {number} days
 * @returns {Array<{date: string, checked: boolean}>}
 */
function getRecentCheckInStatus(days = 7) {
    const data = loadCheckInData();
    const result = [];
    const now = new Date();

    for (let i = days - 1; i >= 0; i--) {
        const date = new Date(now);
        date.setDate(date.getDate() - i);
        const dateStr = getDateString(date);

        result.push({
            date: dateStr,
            dayName: i === 0 ? '今天' : i === 1 ? '昨天' : `${date.getMonth() + 1}/${date.getDate()}`,
            checked: data.dates.includes(dateStr),
            isToday: i === 0
        });
    }

    return result;
}

/**
 * 清除所有打卡数据
 * @returns {boolean}
 */
function clearCheckInData() {
    try {
        localStorage.removeItem(CHECKIN_KEY);
        return true;
    } catch {
        return false;
    }
}

// ==================== src/ui/stats-render.js ====================
/**
 * 统计渲染模块
 * 负责渲染统计图表和报告界面
 */
/**
 * 渲染统计概览卡片
 * @param {Object} params
 * @param {HTMLElement} params.container - 容器元素
 * @param {Array} params.history - 历史记录
 */
function renderStatsOverview({ container, history }) {
    const stats = calculateBasicStats(history);
    const streakDays = getStreakDays();
    const catDist = calculateCategoryDistribution(history);
    const topCategory = catDist.length > 0 ? catDist[0].name : '-';

    container.innerHTML = `
        <div class="stats-overview">
            <div class="stat-card stat-card-primary">
                <div class="stat-value">${stats.totalCount}</div>
                <div class="stat-label">总回答数</div>
            </div>
            <div class="stat-card stat-card-streak">
                <div class="stat-value">${streakDays}</div>
                <div class="stat-label">连续打卡</div>
            </div>
            <div class="stat-card">
                <div class="stat-value">${stats.weekCount}</div>
                <div class="stat-label">本周回答</div>
            </div>
            <div class="stat-card">
                <div class="stat-value">${stats.todayCount}</div>
                <div class="stat-label">今日回答</div>
            </div>
        </div>
        <div class="stats-top-category">
            <span class="stats-top-label">最活跃类别：</span>
            <span class="stats-top-value">${topCategory}</span>
        </div>
    `;
}

/**
 * 渲染 SVG 饼图
 * @param {Object} params
 * @param {HTMLElement} params.container - 容器元素
 * @param {Array} params.data - 饼图数据 [{name, value, color}]
 */
function renderPieChart({ container, data, title = '分布' }) {
    if (!data || data.length === 0) {
        container.innerHTML = '<div class="chart-empty">暂无数据</div>';
        return;
    }

    const total = data.reduce((sum, item) => sum + item.value, 0);
    const size = 200;
    const center = size / 2;
    const radius = 80;
    let currentAngle = -Math.PI / 2; // 从顶部开始

    let svgPaths = '';
    let legendItems = '';

    data.forEach(item => {
        const percentage = item.value / total;
        const angle = percentage * 2 * Math.PI;
        const endAngle = currentAngle + angle;

        // 计算路径
        const x1 = center + radius * Math.cos(currentAngle);
        const y1 = center + radius * Math.sin(currentAngle);
        const x2 = center + radius * Math.cos(endAngle);
        const y2 = center + radius * Math.sin(endAngle);
        const largeArcFlag = angle > Math.PI ? 1 : 0;

        const pathData = [
            `M ${center} ${center}`,
            `L ${x1} ${y1}`,
            `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
            'Z'
        ].join(' ');

        svgPaths += `<path d="${pathData}" fill="${item.color}" stroke="#fff" stroke-width="2" />`;

        // 图例
        const percentText = Math.round(percentage * 100);
        legendItems += `
            <div class="chart-legend-item">
                <span class="chart-legend-color" style="background-color: ${item.color}"></span>
                <span class="chart-legend-name">${item.name}</span>
                <span class="chart-legend-value">${item.value} (${percentText}%)</span>
            </div>
        `;

        currentAngle = endAngle;
    });

    // 中心文字显示总数
    const centerText = `
        <text x="${center}" y="${center - 5}" text-anchor="middle" class="chart-center-label">总计</text>
        <text x="${center}" y="${center + 20}" text-anchor="middle" class="chart-center-value">${total}</text>
    `;

    container.innerHTML = `
        <div class="chart-container">
            <div class="chart-title">${title}</div>
            <div class="chart-content">
                <svg viewBox="0 0 ${size} ${size}" class="pie-chart">
                    ${svgPaths}
                    ${centerText}
                </svg>
                <div class="chart-legend">
                    ${legendItems}
                </div>
            </div>
        </div>
    `;
}

/**
 * 渲染 SVG 柱状图
 * @param {Object} params
 * @param {HTMLElement} params.container - 容器元素
 * @param {Array} params.data - 柱状图数据 [{name, value}]
 * @param {string} params.title - 图表标题
 */
function renderBarChart({ container, data, title }) {
    if (!data || data.length === 0) {
        container.innerHTML = '<div class="chart-empty">暂无数据</div>';
        return;
    }

    const maxValue = Math.max(...data.map(d => d.value), 1);
    const chartHeight = 150;
    const barWidth = 40;
    const gap = 30;
    const totalWidth = data.length * (barWidth + gap) + gap;

    let bars = '';
    let labels = '';

    data.forEach((item, index) => {
        const x = gap + index * (barWidth + gap);
        const barHeight = (item.value / maxValue) * chartHeight;
        const y = chartHeight - barHeight;

        bars += `
            <rect x="${x}" y="${y}" width="${barWidth}" height="${barHeight}" 
                  class="bar-chart-rect" rx="4" />
            <text x="${x + barWidth / 2}" y="${y - 8}" text-anchor="middle" class="bar-chart-value">${item.value}</text>
        `;

        labels += `
            <text x="${x + barWidth / 2}" y="${chartHeight + 20}" text-anchor="middle" class="bar-chart-label">${item.name}</text>
        `;
    });

    container.innerHTML = `
        <div class="chart-container">
            <div class="chart-title">${title}</div>
            <svg viewBox="0 0 ${totalWidth} ${chartHeight + 40}" class="bar-chart">
                ${bars}
                ${labels}
            </svg>
        </div>
    `;
}

/**
 * 渲染活跃度热力图（最近7天）
 * @param {Object} params
 * @param {HTMLElement} params.container - 容器元素
 * @param {Array} params.history - 历史记录
 */
async function renderActivityHeatmap({ container, history }) {
    const activity = calculateDailyActivity(history, 7);

    const maxCount = Math.max(...activity.map(d => d.count), 1);

    let daysHtml = '';
    activity.forEach(day => {
        const intensity = day.count === 0 ? 0 : Math.ceil((day.count / maxCount) * 4);
        const intensityClass = `heatmap-day-intensity-${intensity}`;
        daysHtml += `
            <div class="heatmap-day ${intensityClass} ${day.isToday ? 'heatmap-day-today' : ''}">
                <div class="heatmap-day-count">${day.count > 0 ? day.count : ''}</div>
                <div class="heatmap-day-name">${day.dayName}</div>
            </div>
        `;
    });

    container.innerHTML = `
        <div class="heatmap-container">
            <div class="chart-title">最近7天活跃度</div>
            <div class="heatmap-days">
                ${daysHtml}
            </div>
            <div class="heatmap-legend">
                <span>少</span>
                <div class="heatmap-legend-box intensity-1"></div>
                <div class="heatmap-legend-box intensity-2"></div>
                <div class="heatmap-legend-box intensity-3"></div>
                <div class="heatmap-legend-box intensity-4"></div>
                <span>多</span>
            </div>
        </div>
    `;
}

/**
 * 渲染打卡日历
 * @param {Object} params
 * @param {HTMLElement} params.container - 容器元素
 */
function renderCheckInCalendar({ container }) {
    const checkInStatus = getRecentCheckInStatus(7);

    let daysHtml = '';
    checkInStatus.forEach(day => {
        daysHtml += `
            <div class="calendar-day ${day.checked ? 'calendar-day-checked' : ''} ${day.isToday ? 'calendar-day-today' : ''}">
                <div class="calendar-day-dot"></div>
                <div class="calendar-day-name">${day.dayName}</div>
            </div>
        `;
    });

    container.innerHTML = `
        <div class="calendar-container">
            <div class="chart-title">打卡记录</div>
            <div class="calendar-days">
                ${daysHtml}
            </div>
        </div>
    `;
}

/**
 * 渲染洞察列表
 * @param {Object} params
 * @param {HTMLElement} params.container - 容器元素
 * @param {Array} params.insights - 洞察文字数组
 */
function renderInsights({ container, insights }) {
    if (!insights || insights.length === 0) {
        container.innerHTML = '';
        return;
    }

    const itemsHtml = insights.map(insight => `
        <li class="insight-item">
            <span class="insight-bullet">💡</span>
            <span class="insight-text">${insight}</span>
        </li>
    `).join('');

    container.innerHTML = `
        <div class="insights-container">
            <div class="chart-title">智能洞察</div>
            <ul class="insights-list">
                ${itemsHtml}
            </ul>
        </div>
    `;
}

/**
 * 渲染完整统计报告
 * @param {Object} params
 * @param {HTMLElement} params.container - 容器元素
 * @param {Array} params.history - 历史记录
 * @param {Function} params.onExportImage - 导出图片回调
 */
async function renderFullStatsReport({ container, history, onExportImage }) {
    const report = generateFullReport(history, getStreakDays());

    container.innerHTML = `
        <div class="stats-report" id="statsReportContent">
            <div class="stats-report-header">
                <div class="stats-report-title">灵修报告</div>
                <div class="stats-report-date">生成于 ${report.generatedAt}</div>
            </div>
            <div class="stats-report-body">
                <div class="stats-overview-section" id="statsOverviewSection"></div>
                <div class="stats-charts-section">
                    <div class="stats-chart-container" id="categoryChartContainer"></div>
                    <div class="stats-chart-container" id="sourceChartContainer"></div>
                </div>
                <div class="stats-activity-section" id="activitySection"></div>
                <div class="stats-calendar-section" id="calendarSection"></div>
                <div class="stats-insights-section" id="insightsSection"></div>
            </div>
        </div>
        <div class="stats-actions">
            <button class="btn" id="exportStatsImageBtn">导出报告图片</button>
        </div>
    `;

    // 渲染各个部分
    const overviewSection = container.querySelector('#statsOverviewSection');
    const categoryChartContainer = container.querySelector('#categoryChartContainer');
    const sourceChartContainer = container.querySelector('#sourceChartContainer');
    const activitySection = container.querySelector('#activitySection');
    const calendarSection = container.querySelector('#calendarSection');
    const insightsSection = container.querySelector('#insightsSection');

    renderStatsOverview({ container: overviewSection, history });
    renderPieChart({ container: categoryChartContainer, data: report.categoryDistribution, title: '主题分布' });
    renderPieChart({ container: sourceChartContainer, data: report.sourceDistribution, title: '记录来源' });

    // 动态导入避免循环依赖
    const activity = calculateDailyActivity(history, 7);
    const maxCount = Math.max(...activity.map(d => d.count), 1);

    let daysHtml = '';
    activity.forEach(day => {
        const intensity = day.count === 0 ? 0 : Math.ceil((day.count / maxCount) * 4);
        const intensityClass = `heatmap-day-intensity-${intensity}`;
        daysHtml += `
            <div class="heatmap-day ${intensityClass} ${day.isToday ? 'heatmap-day-today' : ''}">
                <div class="heatmap-day-count">${day.count > 0 ? day.count : ''}</div>
                <div class="heatmap-day-name">${day.dayName}</div>
            </div>
        `;
    });

    activitySection.innerHTML = `
        <div class="heatmap-container">
            <div class="chart-title">最近7天活跃度</div>
            <div class="heatmap-days">
                ${daysHtml}
            </div>
            <div class="heatmap-legend">
                <span>少</span>
                <div class="heatmap-legend-box intensity-1"></div>
                <div class="heatmap-legend-box intensity-2"></div>
                <div class="heatmap-legend-box intensity-3"></div>
                <div class="heatmap-legend-box intensity-4"></div>
                <span>多</span>
            </div>
        </div>
    `;

    renderCheckInCalendar({ container: calendarSection });
    renderInsights({ container: insightsSection, insights: report.insights });

    // 绑定导出按钮
    const exportBtn = container.querySelector('#exportStatsImageBtn');
    if (exportBtn && onExportImage) {
        exportBtn.addEventListener('click', onExportImage);
    }
}

// ==================== src/core/daily-verse-service.js ====================
/**
 * 今日经文服务
 *
 * 用日期做种子在 200 条精选池里确定性地选一节，保证：
 * - 同一天内所有设备看到同一节
 * - 当天不变，隔天自动更换
 * - 同一出处只出现一次（池中有 2 处重复经文，抽前按出处去重）
 *
 * 「换一句」= 在当天内向后偏移若干位，偏移量存在本地，
 * 这样刷新页面仍然停留在用户自己换到的那一节。
 */

const OFFSET_KEY = 'bibleDailyOffset';

/**
 * 基于字符串生成确定性随机数（FNV-1a + Mulberry32）
 * @param {string} seedStr
 * @returns {number} 0-1
 */
function seededRandom(seedStr) {
    let seed = 2166136261;
    for (let i = 0; i < seedStr.length; i++) {
        seed ^= seedStr.charCodeAt(i);
        seed = Math.imul(seed, 16777619);
    }
    seed = seed >>> 0;
    let t = (seed += 0x6D2B79F5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
}

/**
 * 取本地日期字符串 YYYY-MM-DD
 * @param {Date} [date]
 * @returns {string}
 */
function getTodayString(date = new Date()) {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
}

/**
 * 按出处去重（池中「以赛亚书 41:10」「以赛亚书 40:31」各收了两次）
 * @param {Array} cards
 * @returns {Array}
 */
function dedupeByReference(cards) {
    const seen = new Set();
    return cards.filter((card) => {
        const ref = card.reference || `id-${card.id}`;
        if (seen.has(ref)) return false;
        seen.add(ref);
        return true;
    });
}

/**
 * 读取当天的偏移量
 * @param {string} today
 * @returns {number}
 */
function loadOffset(today) {
    try {
        const raw = localStorage.getItem(OFFSET_KEY);
        if (!raw) return 0;
        const parsed = JSON.parse(raw);
        return parsed && parsed.date === today && Number.isInteger(parsed.offset) ? parsed.offset : 0;
    } catch {
        return 0;
    }
}

/**
 * 保存当天的偏移量
 * @param {string} today
 * @param {number} offset
 */
function saveOffset(today, offset) {
    try {
        localStorage.setItem(OFFSET_KEY, JSON.stringify({ date: today, offset }));
    } catch {
        // 存储不可用时不影响阅读
    }
}

/**
 * 取今日经文
 * @param {Array} cards - 精选经文池
 * @returns {Object|null} 经文对象（附带 isDailyVerse 标记）
 */
function getTodayVerse(cards) {
    if (!cards || !cards.length) return null;

    const pool = dedupeByReference(cards);
    const today = getTodayString();
    const baseIndex = Math.floor(seededRandom(today) * pool.length);
    const offset = loadOffset(today);
    const index = (baseIndex + offset) % pool.length;

    return {
        ...pool[index],
        isDailyVerse: true,
        isDailyCard: true
    };
}

/**
 * 换一句：当天偏移 +1
 * @param {Array} cards
 * @returns {Object|null} 换过之后的经文
 */
function nextTodayVerse(cards) {
    const today = getTodayString();
    const pool = dedupeByReference(cards);
    const current = loadOffset(today);
    saveOffset(today, (current + 1) % Math.max(pool.length, 1));
    return getTodayVerse(cards);
}

/**
 * 今天是否已经为今日经文写下感受
 * @param {Array} history
 * @param {Array} cards
 * @returns {boolean}
 */
function isTodayVerseAnswered(history, cards) {
    const verse = getTodayVerse(cards);
    if (!verse) return false;
    const today = getTodayString();
    return history.some((item) => {
        if (!item || !item.card) return false;
        if (item.source !== 'daily') return false;
        const stamp = String(item.timestamp || '');
        return item.card.reference === verse.reference && stamp.startsWith(today.replace(/-/g, '/'));
    });
}

// ==================== src/ui/daily-verse-render.js ====================
/**
 * 今日经文 UI 渲染
 *
 * 卡片显示经文原文 + 出处，并提供「写下感受」「换一句」。
 * 同时显示连续打卡天数与最近 7 天日历（沿用打卡数据）。
 */

const WEEKDAY_NAMES = ['日', '一', '二', '三', '四', '五', '六'];

/**
 * 判断今天是否已写下感受
 * @param {Array} history
 * @param {Object} verse
 * @returns {boolean}
 */
function hasAnsweredToday(history, verse) {
    if (!verse) return false;
    const today = new Date();
    const todayStr = `${today.getFullYear()}/${today.getMonth() + 1}/${today.getDate()}`;
    return history.some((item) => {
        if (!item || !item.card || item.source !== 'daily') return false;
        const stamp = String(item.timestamp || '').replace(/-/g, '/');
        return item.card.reference === verse.reference && stamp.startsWith(todayStr);
    });
}

/**
 * 渲染迷你日历（最近 N 天，标记已记录的日子）
 * @param {Array} history
 * @param {number} days
 * @returns {string}
 */
function renderMiniCalendar(history, days = 7) {
    const stamps = new Set(
        history.map((item) => {
            const d = new Date(String(item.timestamp || '').replace(/\//g, '-'));
            if (Number.isNaN(d.getTime())) return null;
            return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
        }).filter(Boolean)
    );

    let html = '';
    for (let i = days - 1; i >= 0; i--) {
        const d = new Date();
        d.setDate(d.getDate() - i);
        const key = `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
        const done = stamps.has(key);
        const isToday = i === 0;
        const cls = ['calendar-day', done ? 'completed' : '', isToday ? 'today' : ''].filter(Boolean).join(' ');
        html += `
            <div class="${cls}" title="${key}">
                <span class="day-label">${WEEKDAY_NAMES[d.getDay()]}</span>
                <span class="day-dot"></span>
            </div>
        `;
    }
    return html;
}

/**
 * 转义 HTML
 * @param {string} text
 * @returns {string}
 */
function escapeHtml(text) {
    return String(text == null ? '' : text)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
}

/**
 * 渲染今日经文区域
 * @param {Object} params
 * @param {HTMLElement} params.container - 容器
 * @param {Object} params.verse - 今日经文
 * @param {Array} params.history - 灵修记录
 * @param {number} params.streak - 连续打卡天数
 * @param {Function} params.onAnswer - 点「写下感受」
 * @param {Function} params.onNext - 点「换一句」
 */
function renderTodayVerse({ container, verse, history = [], streak = 0, onAnswer, onNext }) {
    if (!container) return;

    if (!verse) {
        container.innerHTML = `
            <div class="daily-card-section">
                <div class="daily-card-empty"><p>暂时取不到今日经文</p></div>
            </div>
        `;
        return;
    }

    const answered = hasAnsweredToday(history, verse);

    container.innerHTML = `
        <div class="daily-card-section">
            <div class="daily-card-header">
                <div class="daily-card-title">
                    <span class="daily-icon">📖</span>
                    <span>今日经文</span>
                    ${streak > 0 ? `<span class="daily-streak">🔥 ${streak} 天</span>` : ''}
                </div>
                <div class="daily-calendar-mini">
                    ${renderMiniCalendar(history)}
                </div>
            </div>
            <div class="daily-card-content">
                <div class="daily-card-display ${answered ? 'answered' : ''}">
                    <div class="daily-card-badge">今日经文</div>
                    <div class="daily-verse-body">${escapeHtml(verse.text)}</div>
                    <div class="daily-verse-ref">—— ${escapeHtml(verse.reference)}</div>
                    ${answered ? `
                        <div class="daily-card-status answered">
                            <span>✓ 今天已写下感受</span>
                        </div>
                    ` : `
                        <div class="daily-card-actions">
                            <button class="btn" data-action="answer">✍️ 写下感受</button>
                            <button class="btn btn-secondary" data-action="next">🔄 换一句</button>
                        </div>
                    `}
                </div>
            </div>
        </div>
    `;

    container.querySelectorAll('[data-action]').forEach((btn) => {
        btn.addEventListener('click', () => {
            if (btn.dataset.action === 'answer' && onAnswer) onAnswer();
            if (btn.dataset.action === 'next' && onNext) onNext();
        });
    });
}

// ==================== src/core/verse-search-service.js ====================
/**
 * 经文检索服务
 *
 * 两种找法：
 * 1. 三级选择（卷 → 章 → 节）—— 知道出处时用，快且准
 * 2. 关键词搜索 —— 记得某句话但忘了在哪卷时用
 *
 * 全书全文（3.3MB）按需 import()，只在用户真正打开检索时才加载。
 */

let fullBibleModule = null;
let loadingPromise = null;

/**
 * 按需加载全本经文模块
 * @returns {Promise<Object>}
 */
async function loadFullBible() {
    if (fullBibleModule) return fullBibleModule;
    if (loadingPromise) return loadingPromise;

    loadingPromise = Promise.reject(new Error("未打包模块: ../data/bible-full.js（离线不可用）"))
        .then((mod) => {
            fullBibleModule = mod;
            return mod;
        })
        .catch((error) => {
            loadingPromise = null;
            throw error;
        });

    return loadingPromise;
}

/**
 * 全本是否已经加载过
 * @returns {boolean}
 */
function isFullBibleLoaded() {
    return fullBibleModule !== null;
}

/**
 * 取书卷列表
 * @returns {Promise<string[]>}
 */
async function getBooks() {
    const mod = await loadFullBible();
    return mod.books;
}

/**
 * 取某卷的章数
 * @param {string} book
 * @returns {Promise<number>}
 */
async function getChapters(book) {
    const mod = await loadFullBible();
    return mod.getChapterCount(book);
}

/**
 * 取某章有多少节
 * @param {string} book
 * @param {number} chapter
 * @returns {Promise<number>}
 */
async function getVersesInChapter(book, chapter) {
    const mod = await loadFullBible();
    return mod.getVerseCount(book, chapter);
}

/**
 * 取指定经文
 * @param {string} book
 * @param {number} chapter
 * @param {number} verse
 * @returns {Promise<string|null>}
 */
async function getVerse(book, chapter, verse) {
    const mod = await loadFullBible();
    return mod.getVerse(book, chapter, verse);
}

/**
 * 关键词搜索
 * @param {string} keyword
 * @param {Object} [options]
 * @param {string|null} [options.book] - 限定卷名
 * @param {number} [options.limit] - 最多返回条数（默认 200）
 * @returns {Promise<{items:Array, truncated:boolean}>}
 */
async function searchVerses(keyword, options = {}) {
    const limit = options.limit || 200;
    const mod = await loadFullBible();
    // 多取一条用于判断是否被截断
    const items = mod.searchVerses(keyword, { book: options.book || null, limit: limit + 1 });
    const truncated = items.length > limit;
    return {
        items: truncated ? items.slice(0, limit) : items,
        truncated
    };
}

/**
 * 把搜索结果按书卷分组
 * @param {Array} items
 * @returns {Array<{book:string, count:number, verses:Array}>}
 */
function groupByBook(items) {
    const groups = new Map();
    items.forEach((item) => {
        if (!groups.has(item.book)) {
            groups.set(item.book, { book: item.book, count: 0, verses: [] });
        }
        const group = groups.get(item.book);
        group.count++;
        group.verses.push(item);
    });
    return [...groups.values()];
}

// ==================== src/data/book-names.js ====================
/**
 * 书卷索引（轻量，约 0.5KB）
 *
 * 全本经文 3.3MB，gzip 后仍 1.2MB，弱网下要十几秒。但「按卷查找」的
 * 卷名下拉没必要等全本 —— 先把这个 66 个卷名的列表同步渲染出来，
 * 用户看到界面立刻可用，再去后台加载经文正文。
 *
 * 本文件由 scripts/build-bible-full.js 生成，勿手改。
 */

const BOOK_NAMES = [
    "创世纪",
    "出埃及记",
    "利未记",
    "民数记",
    "申命记",
    "约书亚记",
    "士师记",
    "路得记",
    "撒母耳记上",
    "撒母耳记下",
    "列王记上",
    "列王记下",
    "历代志上",
    "历代志下",
    "以斯拉记",
    "尼希米记",
    "以斯帖记",
    "约伯记",
    "诗篇",
    "箴言",
    "传道书",
    "雅歌",
    "以赛亚书",
    "耶利米书",
    "耶利米哀歌",
    "以西结书",
    "但以理书",
    "何西阿书",
    "约珥书",
    "阿摩司书",
    "俄巴底亚书",
    "约拿书",
    "弥迦书",
    "那鸿书",
    "哈巴谷书",
    "西番雅书",
    "哈该书",
    "撒迦利亚书",
    "玛拉基书",
    "马太福音",
    "马可福音",
    "路加福音",
    "约翰福音",
    "使徒行传",
    "罗马书",
    "哥林多前书",
    "哥林多后书",
    "加拉太书",
    "以弗所书",
    "腓立比书",
    "歌罗西书",
    "帖撒罗尼迦前书",
    "帖撒罗尼迦后书",
    "提摩太前书",
    "提摩太后书",
    "提多书",
    "腓利门书",
    "希伯来书",
    "雅各书",
    "彼得前书",
    "彼得后书",
    "约翰一书",
    "约翰二书",
    "约翰三书",
    "犹大书",
    "启示录"
];

// ==================== src/ui/verse-note-render.js ====================
/**
 * 「记一节经文」界面
 *
 * 两条找经文的路径：
 * - 按卷 / 章 / 节三级选择
 * - 关键词搜索（可限定书卷范围）
 *
 * 选中后回填经文原文，交给上层打开「写下感受」。
 */


/**
 * 转义 HTML
 * @param {string} text
 * @returns {string}
 */
function escapeHtml(text) {
    return String(text == null ? '' : text)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
}

/**
 * 填充下拉选项
 * @param {HTMLSelectElement} select
 * @param {Array<string|number>} values
 * @param {string} placeholder
 */
function fillOptions(select, values, placeholder) {
    select.replaceChildren();
    const first = document.createElement('option');
    first.value = '';
    first.textContent = placeholder;
    select.appendChild(first);

    values.forEach((value) => {
        const opt = document.createElement('option');
        opt.value = String(value);
        opt.textContent = String(value);
        select.appendChild(opt);
    });
}

/**
 * 渲染「记一节经文」界面
 * @param {Object} params
 * @param {HTMLElement} params.container - 容器
 * @param {Function} params.onPick - 选中经文回调，收到 {book, chapter, verse, text}
 */
function renderVerseNote({ container, onPick }) {
    if (!container) return;

    container.innerHTML = `
        <div class="verse-note-modal-content">
            <div class="verse-note-status" id="verseNoteStatus"></div>

            <div class="verse-note-tabs" role="tablist">
                <button class="verse-note-tab active" data-tab="browse" role="tab">按卷查找</button>
                <button class="verse-note-tab" data-tab="search" role="tab">关键词搜索</button>
            </div>

            <div class="verse-note-pane" data-pane="browse">
                <div class="verse-note-fields">
                    <label>卷
                        <select id="vnBook"></select>
                    </label>
                    <label>章
                        <select id="vnChapter"></select>
                    </label>
                    <label>节
                        <select id="vnVerse"></select>
                    </label>
                </div>
                <div class="verse-note-preview" id="vnPreview"></div>
            </div>

            <div class="verse-note-pane" data-pane="search" style="display: none;">
                <div class="verse-note-search-row">
                    <input type="search" id="vnKeyword" placeholder="输入经文中的词句，如「凡事都可行」" autocomplete="off">
                    <select id="vnScope" title="限定书卷范围"></select>
                    <button class="btn" id="vnSearchBtn">搜索</button>
                </div>
                <div class="verse-note-results" id="vnResults"></div>
            </div>
        </div>
    `;

    const statusEl = container.querySelector('#verseNoteStatus');
    const bookSel = container.querySelector('#vnBook');
    const chapterSel = container.querySelector('#vnChapter');
    const verseSel = container.querySelector('#vnVerse');
    const previewEl = container.querySelector('#vnPreview');
    const keywordEl = container.querySelector('#vnKeyword');
    const scopeSel = container.querySelector('#vnScope');
    const resultsEl = container.querySelector('#vnResults');

    /**
     * 确保全本已加载（失败则给出降级提示）
     * @returns {Promise<boolean>}
     */
    async function ensureLoaded() {
        if (isFullBibleLoaded()) {
            statusEl.style.display = 'none';
            return true;
        }
        statusEl.textContent = '正在加载经文库…';
        statusEl.style.display = 'block';
        try {
            await loadFullBible();
            statusEl.style.display = 'none';
            return true;
        } catch (error) {
            console.error('经文库加载失败:', error);
            statusEl.textContent = '经文库加载失败，请检查网络后重试。';
            statusEl.style.display = 'block';
            return false;
        }
    }

    // ---- 按卷查找的联动 ----
    bookSel.addEventListener('change', async () => {
        const book = bookSel.value;
        if (!book) {
            fillOptions(chapterSel, [], '章');
            fillOptions(verseSel, [], '节');
            previewEl.textContent = '';
            return;
        }
        const chapters = await getChapters(book);
        fillOptions(chapterSel, Array.from({ length: chapters }, (_, i) => i + 1), '章');
        fillOptions(verseSel, [], '节');
        previewEl.textContent = '';
    });

    chapterSel.addEventListener('change', async () => {
        const book = bookSel.value;
        const chapter = Number(chapterSel.value);
        if (!book || !chapter) {
            fillOptions(verseSel, [], '节');
            previewEl.textContent = '';
            return;
        }
        const count = await getVersesInChapter(book, chapter);
        fillOptions(verseSel, Array.from({ length: count }, (_, i) => i + 1), '节');
        previewEl.textContent = '';
    });

    verseSel.addEventListener('change', async () => {
        const book = bookSel.value;
        const chapter = Number(chapterSel.value);
        const verse = Number(verseSel.value);
        if (!book || !chapter || !verse) {
            previewEl.textContent = '';
            return;
        }
        const text = await getVerse(book, chapter, verse);
        if (!text) {
            previewEl.textContent = '找不到这一节';
            return;
        }
        const ref = `${book} ${chapter}:${verse}`;
        previewEl.innerHTML = `
            <div class="vn-text">${escapeHtml(text)}</div>
            <div class="vn-ref">—— ${escapeHtml(ref)}</div>
            <button class="btn" id="vnPickBrowse">✍️ 记下这节，写下感受</button>
        `;
        previewEl.querySelector('#vnPickBrowse').addEventListener('click', () => {
            onPick({ book, chapter, verse, text, reference: ref });
        });
    });

    // ---- 关键词搜索 ----
    function renderResults(items, truncated) {
        if (!items.length) {
            resultsEl.innerHTML = '<div class="verse-note-empty">没有找到匹配的经文，换个词试试</div>';
            return;
        }

        const groups = groupByBook(items);
        let html = truncated
            ? `<div class="verse-note-hint">结果较多，只显示前 ${items.length} 条。可用书卷范围收窄，或换更具体的词。</div>`
            : `<div class="verse-note-hint">共 ${items.length} 条</div>`;

        groups.forEach((group) => {
            html += `<div class="vn-group"><div class="vn-group-title">${escapeHtml(group.book)} (${group.count})</div>`;
            group.verses.forEach((v) => {
                const ref = `${v.book} ${v.chapter}:${v.verse}`;
                html += `
                    <button class="vn-result" data-book="${escapeHtml(v.book)}" data-chapter="${v.chapter}" data-verse="${v.verse}">
                        <span class="vn-result-ref">${escapeHtml(ref)}</span>
                        <span class="vn-result-text">${escapeHtml(v.text)}</span>
                    </button>
                `;
            });
            html += '</div>';
        });

        resultsEl.innerHTML = html;
        resultsEl.querySelectorAll('.vn-result').forEach((btn) => {
            btn.addEventListener('click', async () => {
                const book = btn.dataset.book;
                const chapter = Number(btn.dataset.chapter);
                const verse = Number(btn.dataset.verse);
                const text = await getVerse(book, chapter, verse);
                if (!text) return;
                onPick({ book, chapter, verse, text, reference: `${book} ${chapter}:${verse}` });
            });
        });
    }

    async function doSearch() {
        const keyword = keywordEl.value.trim();
        if (!keyword) {
            resultsEl.innerHTML = '<div class="verse-note-empty">请输入要搜索的词句</div>';
            return;
        }
        const ok = await ensureLoaded();
        if (!ok) {
            resultsEl.innerHTML = '<div class="verse-note-empty">经文库不可用</div>';
            return;
        }
        resultsEl.innerHTML = '<div class="verse-note-empty">搜索中…</div>';
        try {
            const { items, truncated } = await searchVerses(keyword, { book: scopeSel.value || null });
            renderResults(items, truncated);
        } catch (error) {
            console.error('搜索失败:', error);
            resultsEl.innerHTML = '<div class="verse-note-empty">搜索失败，请重试</div>';
        }
    }

    container.querySelector('#vnSearchBtn').addEventListener('click', doSearch);
    keywordEl.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            doSearch();
        }
    });

    /**
     * 先同步填上静态卷名（0.5KB，不用等全本），再在后台加载经文正文。
     * 否则弱网下卷名下拉会空十几秒。
     */
    function populateBookSelects(books) {
        if (!bookSel.options.length) {
            fillOptions(bookSel, books, '选择卷');
        }
        if (!scopeSel.options.length) {
            const all = document.createElement('option');
            all.value = '';
            all.textContent = '全部书卷';
            scopeSel.appendChild(all);
            books.forEach((b) => {
                const opt = document.createElement('option');
                opt.value = b;
                opt.textContent = b;
                scopeSel.appendChild(opt);
            });
        }
    }

    // ---- 标签切换 ----
    container.querySelectorAll('.verse-note-tab').forEach((tab) => {
        tab.addEventListener('click', () => {
            container.querySelectorAll('.verse-note-tab').forEach((t) => t.classList.remove('active'));
            tab.classList.add('active');
            container.querySelectorAll('.verse-note-pane').forEach((pane) => {
                pane.style.display = pane.dataset.pane === tab.dataset.tab ? '' : 'none';
            });
            ensureLoaded();
        });
    });

    // 打开即可用：卷名静态渲染（不用等全本），经文正文在后台加载
    populateBookSelects(BOOK_NAMES);
    ensureLoaded();
}

// ==================== src/core/voice-service.js ====================
/**
 * 语音服务 - 提供语音合成(TTS)和语音识别(ASR)功能
 * 使用 Web Speech API
 */

/**
 * 检查浏览器是否支持语音识别
 * @returns {boolean} 是否支持
 */
function isSpeechRecognitionSupported() {
    return !!(window.SpeechRecognition || window.webkitSpeechRecognition);
}

/**
 * 检查浏览器是否支持语音合成
 * @returns {boolean} 是否支持
 */
function isSpeechSynthesisSupported() {
    return 'speechSynthesis' in window;
}

/**
 * 创建语音合成器
 * @returns {Object|null} 语音合成器对象，不支持时返回 null
 */
function createSpeechSynthesizer() {
    if (!isSpeechSynthesisSupported()) {
        return null;
    }

    let voices = [];
    let isVoicesLoaded = false;

    const loadVoices = () => {
        voices = speechSynthesis.getVoices();
        isVoicesLoaded = true;
    };

    // Chrome 需要通过 voiceschanged 事件加载语音
    if ('onvoiceschanged' in speechSynthesis) {
        speechSynthesis.onvoiceschanged = loadVoices;
    }
    loadVoices();

    return {
        /**
         * 朗读文本
         * @param {string} text - 要朗读的文本
         * @param {Object} options - 配置选项
         * @param {Function} options.onStart - 开始朗读回调
         * @param {Function} options.onEnd - 朗读结束回调
         * @param {Function} options.onError - 错误回调
         * @param {number} options.rate - 语速 (0.1 - 2.0)
         * @param {number} options.pitch - 音调 (0 - 2)
         * @returns {SpeechSynthesisUtterance|null} 朗读实例
         */
        speak(text, options = {}) {
            const {
                onStart,
                onEnd,
                onError,
                rate = 0.9,
                pitch = 1.0
            } = options;

            // 每次重新创建 utterance（解决 Chrome 中文朗读 bug）
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = 'zh-CN';
            utterance.rate = rate;
            utterance.pitch = pitch;

            // 查找中文语音
            if (isVoicesLoaded && voices.length > 0) {
                const chineseVoice = voices.find(v =>
                    v.lang === 'zh-CN' || v.lang.startsWith('zh-')
                );
                if (chineseVoice) {
                    utterance.voice = chineseVoice;
                }
            }

            // 事件处理
            if (onStart) {
                utterance.onstart = onStart;
            }
            if (onEnd) {
                utterance.onend = onEnd;
            }
            if (onError) {
                utterance.onerror = (event) => {
                    onError(event.error, event);
                };
            }

            speechSynthesis.speak(utterance);
            return utterance;
        },

        /**
         * 停止朗读
         */
        cancel() {
            speechSynthesis.cancel();
        },

        /**
         * 暂停朗读
         */
        pause() {
            speechSynthesis.pause();
        },

        /**
         * 恢复朗读
         */
        resume() {
            speechSynthesis.resume();
        },

        /**
         * 是否正在朗读
         * @returns {boolean}
         */
        isSpeaking() {
            return speechSynthesis.speaking;
        },

        /**
         * 是否已暂停
         * @returns {boolean}
         */
        isPaused() {
            return speechSynthesis.paused;
        }
    };
}

/**
 * 创建语音识别器
 * @returns {Object|null} 语音识别器对象，不支持时返回 null
 */
function createSpeechRecognizer() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
        return null;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'zh-CN';
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.maxAlternatives = 1;

    let isActive = false;

    return {
        /**
         * 获取底层 Recognition 对象（用于直接事件绑定）
         * @returns {SpeechRecognition}
         */
        get native() {
            return recognition;
        },

        /**
         * 是否正在识别
         * @returns {boolean}
         */
        get isActive() {
            return isActive;
        },

        /**
         * 开始识别
         * @param {Object} options - 配置选项
         * @param {Function} options.onResult - 识别结果回调 (transcript, isFinal)
         * @param {Function} options.onError - 错误回调 (error, message)
         * @param {Function} options.onStart - 开始识别回调
         * @param {Function} options.onEnd - 识别结束回调
         */
        start(options = {}) {
            const {
                onResult,
                onError,
                onStart,
                onEnd
            } = options;

            // 重置事件处理器
            recognition.onresult = (event) => {
                let finalTranscript = '';
                let interimTranscript = '';

                for (let i = event.resultIndex; i < event.results.length; i++) {
                    const transcript = event.results[i][0].transcript;
                    if (event.results[i].isFinal) {
                        finalTranscript += transcript;
                    } else {
                        interimTranscript += transcript;
                    }
                }

                if (onResult) {
                    onResult(finalTranscript, interimTranscript, event.results);
                }
            };

            recognition.onerror = (event) => {
                let message = '语音识别出错';
                switch (event.error) {
                    case 'not-allowed':
                        message = '请允许麦克风权限';
                        break;
                    case 'audio-capture':
                        message = '无法访问麦克风';
                        break;
                    case 'no-speech':
                        message = '未检测到语音，请重试';
                        break;
                    case 'network':
                        message = '网络连接问题，请检查网络';
                        break;
                    case 'aborted':
                        message = '识别已取消';
                        break;
                    case 'language-not-supported':
                        message = '不支持该语言';
                        break;
                    default:
                        message = `识别错误: ${event.error}`;
                }

                if (onError) {
                    onError(event.error, message, event);
                }
            };

            recognition.onstart = () => {
                isActive = true;
                if (onStart) {
                    onStart();
                }
            };

            recognition.onend = () => {
                isActive = false;
                if (onEnd) {
                    onEnd();
                }
            };

            try {
                recognition.start();
            } catch (error) {
                if (onError) {
                    onError('start-failed', '启动识别失败，请重试');
                }
            }
        },

        /**
         * 停止识别
         */
        stop() {
            isActive = false;
            try {
                recognition.stop();
            } catch (error) {
                // 忽略停止时的错误
            }
        },

        /**
         * 中止识别
         */
        abort() {
            isActive = false;
            try {
                recognition.abort();
            } catch (error) {
                // 忽略中止时的错误
            }
        }
    };
}

/**
 * 请求麦克风权限
 * @returns {Promise<boolean>} 是否获得权限
 */
async function requestMicrophonePermission() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        // 立即停止所有轨道，我们只是检查权限
        stream.getTracks().forEach(track => track.stop());
        return true;
    } catch (error) {
        return false;
    }
}

/**
 * 获取语音功能支持状态
 * @returns {Object} 支持状态对象
 */
function getVoiceSupportStatus() {
    return {
        tts: isSpeechSynthesisSupported(),
        asr: isSpeechRecognitionSupported(),
        ttsChinese: isSpeechSynthesisSupported(), // TTS 中文支持通常可用
        asrChinese: isSpeechRecognitionSupported() // ASR 中文支持取决于浏览器
    };
}

// ==================== src/ui/voice-render.js ====================
/**
 * 语音功能 UI 渲染模块
 * 提供朗读按钮和语音输入按钮的渲染
 */

/**
 * 创建朗读按钮
 * @param {Object} options - 配置选项
 * @param {Function} options.onClick - 点击回调
 * @param {boolean} options.isActive - 是否正在朗读
 * @param {boolean} options.disabled - 是否禁用
 * @returns {HTMLElement} 按钮元素
 */
function createReadAloudButton(options = {}) {
    const { onClick, isActive = false, disabled = false } = options;

    const button = document.createElement('button');
    button.className = `voice-btn voice-read-btn ${isActive ? 'active' : ''}`;
    button.setAttribute('type', 'button');
    button.setAttribute('aria-label', isActive ? '停止朗读' : '朗读问题');
    button.setAttribute('aria-pressed', String(isActive));
    button.setAttribute('title', isActive ? '点击停止朗读' : '点击朗读问题');
    button.disabled = disabled;

    // 图标
    const iconSpan = document.createElement('span');
    iconSpan.setAttribute('aria-hidden', 'true');
    iconSpan.textContent = isActive ? '⏹️' : '🔊';
    button.appendChild(iconSpan);

    // 文本标签
    const labelSpan = document.createElement('span');
    labelSpan.className = 'voice-btn-label';
    labelSpan.textContent = isActive ? '停止' : '朗读';
    button.appendChild(labelSpan);

    // 键盘无障碍支持
    button.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            if (onClick) onClick();
        }
    });

    // 点击事件
    if (onClick) {
        button.addEventListener('click', onClick);
    }

    return button;
}

/**
 * 创建语音输入按钮
 * @param {Object} options - 配置选项
 * @param {Function} options.onClick - 点击回调
 * @param {boolean} options.isActive - 是否正在录音
 * @param {boolean} options.disabled - 是否禁用
 * @param {string} options.size - 按钮大小 ('small' | 'normal')
 * @returns {HTMLElement} 按钮元素
 */
function createVoiceInputButton(options = {}) {
    const { onClick, isActive = false, disabled = false, size = 'normal' } = options;

    const button = document.createElement('button');
    button.className = `voice-btn voice-input-btn ${isActive ? 'active' : ''} voice-btn-${size}`;
    button.setAttribute('type', 'button');
    button.setAttribute('aria-label', isActive ? '停止语音输入' : '开始语音输入');
    button.setAttribute('aria-pressed', String(isActive));
    button.setAttribute('title', isActive ? '点击停止录音' : '点击开始语音输入');
    button.disabled = disabled;

    // 图标
    const iconSpan = document.createElement('span');
    iconSpan.setAttribute('aria-hidden', 'true');
    iconSpan.textContent = isActive ? '⏹️' : '🎤';
    button.appendChild(iconSpan);

    // 只有 normal 大小显示文本标签
    if (size === 'normal') {
        const labelSpan = document.createElement('span');
        labelSpan.className = 'voice-btn-label';
        labelSpan.textContent = isActive ? '停止' : '语音输入';
        button.appendChild(labelSpan);
    }

    // 键盘无障碍支持
    button.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            if (onClick) onClick();
        }
    });

    // 点击事件
    if (onClick) {
        button.addEventListener('click', onClick);
    }

    return button;
}

/**
 * 创建语音状态指示器
 * @param {Object} options - 配置选项
 * @param {string} options.status - 状态类型 ('idle' | 'listening' | 'processing' | 'error')
 * @param {string} options.message - 状态消息
 * @returns {HTMLElement} 状态指示器元素
 */
function createVoiceStatusIndicator(options = {}) {
    const { status = 'idle', message = '' } = options;

    const indicator = document.createElement('div');
    indicator.className = `voice-status voice-status-${status}`;
    indicator.setAttribute('role', 'status');
    indicator.setAttribute('aria-live', 'polite');
    indicator.setAttribute('aria-atomic', 'true');

    // 图标
    const iconSpan = document.createElement('span');
    iconSpan.className = 'voice-status-icon';
    iconSpan.setAttribute('aria-hidden', 'true');

    switch (status) {
        case 'listening':
            iconSpan.textContent = '🎙️';
            break;
        case 'processing':
            iconSpan.textContent = '⏳';
            break;
        case 'error':
            iconSpan.textContent = '⚠️';
            break;
        default:
            iconSpan.textContent = '';
    }

    if (iconSpan.textContent) {
        indicator.appendChild(iconSpan);
    }

    // 消息文本
    if (message) {
        const textSpan = document.createElement('span');
        textSpan.className = 'voice-status-text';
        textSpan.textContent = message;
        indicator.appendChild(textSpan);
    }

    return indicator;
}

/**
 * 更新语音按钮状态
 * @param {HTMLElement} button - 按钮元素
 * @param {Object} options - 配置选项
 * @param {boolean} options.isActive - 是否激活
 * @param {string} options.type - 按钮类型 ('read' | 'input')
 */
function updateVoiceButtonState(button, options = {}) {
    const { isActive = false, type = 'read' } = options;

    if (!button) return;

    // 更新类名
    button.classList.toggle('active', isActive);

    // 更新 ARIA 属性
    button.setAttribute('aria-pressed', String(isActive));

    // 更新图标和标签
    const iconSpan = button.querySelector('span[aria-hidden="true"]');
    const labelSpan = button.querySelector('.voice-btn-label');

    if (iconSpan) {
        iconSpan.textContent = isActive ? '⏹️' : (type === 'read' ? '🔊' : '🎤');
    }

    if (labelSpan) {
        labelSpan.textContent = isActive ? '停止' : (type === 'read' ? '朗读' : '语音输入');
    }

    // 更新标题
    button.setAttribute('title', isActive
        ? (type === 'read' ? '点击停止朗读' : '点击停止录音')
        : (type === 'read' ? '点击朗读问题' : '点击开始语音输入')
    );

    button.setAttribute('aria-label', isActive
        ? (type === 'read' ? '停止朗读' : '停止语音输入')
        : (type === 'read' ? '朗读问题' : '开始语音输入')
    );
}

/**
 * 更新语音状态指示器
 * @param {HTMLElement} indicator - 指示器元素
 * @param {Object} options - 配置选项
 * @param {string} options.status - 状态类型
 * @param {string} options.message - 状态消息
 */
function updateVoiceStatusIndicator(indicator, options = {}) {
    const { status = 'idle', message = '' } = options;

    if (!indicator) return;

    // 更新类名
    indicator.className = `voice-status voice-status-${status}`;

    // 清空内容
    indicator.replaceChildren();

    // 图标
    const iconSpan = document.createElement('span');
    iconSpan.className = 'voice-status-icon';
    iconSpan.setAttribute('aria-hidden', 'true');

    switch (status) {
        case 'listening':
            iconSpan.textContent = '🎙️';
            break;
        case 'processing':
            iconSpan.textContent = '⏳';
            break;
        case 'error':
            iconSpan.textContent = '⚠️';
            break;
        default:
            iconSpan.textContent = '';
    }

    if (iconSpan.textContent) {
        indicator.appendChild(iconSpan);
    }

    // 消息文本
    if (message) {
        const textSpan = document.createElement('span');
        textSpan.className = 'voice-status-text';
        textSpan.textContent = message;
        indicator.appendChild(textSpan);
    }
}

/**
 * 创建带语音输入的文本域包装器
 * @param {Object} options - 配置选项
 * @param {HTMLElement} options.textarea - 文本域元素
 * @param {Function} options.onVoiceInput - 语音输入回调
 * @param {boolean} options.isListening - 是否正在录音
 * @returns {HTMLElement} 包装器元素
 */
function createTextareaWithVoiceInput(options = {}) {
    const { textarea, onVoiceInput, isListening = false } = options;

    const wrapper = document.createElement('div');
    wrapper.className = 'textarea-with-voice';

    // 将文本域移入包装器
    if (textarea && textarea.parentNode) {
        textarea.parentNode.insertBefore(wrapper, textarea);
        wrapper.appendChild(textarea);
    }

    // 创建语音输入容器
    const voiceContainer = document.createElement('div');
    voiceContainer.className = 'voice-input-container';

    // 状态指示器
    const statusIndicator = createVoiceStatusIndicator({
        status: isListening ? 'listening' : 'idle',
        message: isListening ? '正在聆听...' : ''
    });
    statusIndicator.id = `${textarea?.id || 'textarea'}-voice-status`;
    voiceContainer.appendChild(statusIndicator);

    // 语音输入按钮
    const voiceButton = createVoiceInputButton({
        onClick: onVoiceInput,
        isActive: isListening,
        size: 'small'
    });
    voiceButton.id = `${textarea?.id || 'textarea'}-voice-btn`;
    voiceContainer.appendChild(voiceButton);

    wrapper.appendChild(voiceContainer);

    return wrapper;
}

/**
 * 渲染卡牌区域的语音控制按钮
 * @param {Object} options - 配置选项
 * @param {HTMLElement} options.container - 容器元素
 * @param {Function} options.onReadAloud - 朗读回调
 * @param {boolean} options.isReading - 是否正在朗读
 * @param {boolean} options.disabled - 是否禁用
 */
function renderCardVoiceControls(options = {}) {
    const { container, onReadAloud, isReading = false, disabled = false } = options;

    if (!container) return;

    container.replaceChildren();

    const button = createReadAloudButton({
        onClick: onReadAloud,
        isActive: isReading,
        disabled
    });
    button.id = 'cardReadAloudBtn';

    container.appendChild(button);
}

/**
 * 渲染模态框的语音输入控制
 * @param {Object} options - 配置选项
 * @param {HTMLElement} options.container - 容器元素
 * @param {Function} options.onVoiceInput - 语音输入回调
 * @param {boolean} options.isListening - 是否正在录音
 * @param {string} options.status - 状态消息
 */
function renderModalVoiceControls(options = {}) {
    const { container, onVoiceInput, isListening = false, status = '' } = options;

    if (!container) return;

    container.replaceChildren();

    // 状态指示器
    const statusIndicator = createVoiceStatusIndicator({
        status: isListening ? 'listening' : (status ? 'processing' : 'idle'),
        message: status
    });

    // 语音输入按钮
    const voiceButton = createVoiceInputButton({
        onClick: onVoiceInput,
        isActive: isListening,
        size: 'small'
    });

    container.appendChild(statusIndicator);
    container.appendChild(voiceButton);
}

// ==================== src/main.js ====================
const state = {
    currentCard: null,
    currentCategory: 'all',
    // 先在 init() 里跑迁移，再从 localStorage 读记录
    history: [],
    historyFilters: {
        date: 'all',
        category: 'all',
        source: 'all'
    },
    editingItem: null,
    pendingSource: null,
    todayCard: null,
    voice: {
        isReading: false,
        isListening: false,
        synthesizer: null,
        recognizer: null,
        currentUtterance: null
    }
};

const UI_TIMING = {
    toastVisibleMs: 1800,
    toastExitMs: 180
};

const THEME_KEY = STORAGE_KEYS.theme;
const THEME_CHOICES = ['forest', 'warm', 'dark'];
const THEME_LABELS = {
    forest: '\u6d45\u7eff\u68ee\u6797',
    warm: '\u6696\u7eb8\u6cbb\u6108',
    dark: '\u591c\u95f4\u62a4\u773c'
};

const elements = {
    cardContainer: document.getElementById('cardContainer'),
    emptyState: document.getElementById('emptyState'),
    cardContent: document.getElementById('cardContent'),
    cardCategory: document.getElementById('cardCategory'),
    cardLevel: document.getElementById('cardLevel'),
    cardQuestion: document.getElementById('cardQuestion'),
    drawBtn: document.getElementById('drawBtn'),
    saveBtn: document.getElementById('saveBtn'),
    shareBtn: document.getElementById('shareBtn'),
    historyList: document.getElementById('historyList'),
    historyFiltersContainer: document.getElementById('historyFiltersContainer'),
    historyExportContainer: document.getElementById('historyExportContainer'),
    saveModal: document.getElementById('saveModal'),
    shareModal: document.getElementById('shareModal'),
    editModal: document.getElementById('editModal'),
    saveModalQuestion: document.getElementById('saveModalQuestion'),
    answerInput: document.getElementById('answerInput'),
    editModalQuestion: document.getElementById('editModalQuestion'),
    editAnswerInput: document.getElementById('editAnswerInput'),
    confirmSaveBtn: document.getElementById('confirmSaveBtn'),
    cancelSaveBtn: document.getElementById('cancelSaveBtn'),
    confirmEditBtn: document.getElementById('confirmEditBtn'),
    cancelEditBtn: document.getElementById('cancelEditBtn'),
    shareQuestion: document.getElementById('shareQuestion'),
    shareAnswer: document.getElementById('shareAnswer'),
    copyShareBtn: document.getElementById('copyShareBtn'),
    closeShareBtn: document.getElementById('closeShareBtn'),
    clearHistoryBtn: document.getElementById('clearHistoryBtn'),
    categoryFilters: document.getElementById('categoryFilters'),
    toastContainer: document.getElementById('toastContainer'),
    confirmModal: document.getElementById('confirmModal'),
    confirmMessage: document.getElementById('confirmMessage'),
    confirmOkBtn: document.getElementById('confirmOkBtn'),
    confirmCancelBtn: document.getElementById('confirmCancelBtn'),
    themeSelector: document.getElementById('themeSelector'),
    // 分享增强功能元素
    generateImageBtn: document.getElementById('generateImageBtn'),
    copyLinkBtn: document.getElementById('copyLinkBtn'),
    imagePreviewContainer: document.getElementById('imagePreviewContainer'),
    generatedImagePreview: document.getElementById('generatedImagePreview'),
    downloadImageBtn: document.getElementById('downloadImageBtn'),
    shareCardTemplate: document.getElementById('shareCardTemplate'),
    shareCardCategory: document.getElementById('shareCardCategory'),
    shareCardQuestion: document.getElementById('shareCardQuestion'),
    shareCardAnswer: document.getElementById('shareCardAnswer'),
    shareCardAnswerSection: document.getElementById('shareCardAnswerSection'),
    // 统计功能元素
    statsBtn: document.getElementById('statsBtn'),
    statsModal: document.getElementById('statsModal'),
    statsContainer: document.getElementById('statsContainer'),
    closeStatsBtn: document.getElementById('closeStatsBtn'),
    // 今日经文元素
    dailyCardSection: document.getElementById('dailyCardSection'),
    dailyCardContainer: document.getElementById('dailyCardContainer'),
    // 记一节经文元素
    verseNoteBtn: document.getElementById('verseNoteBtn'),
    verseNoteModal: document.getElementById('verseNoteModal'),
    verseNoteContainer: document.getElementById('verseNoteContainer'),
    closeVerseNoteBtn: document.getElementById('closeVerseNoteBtn'),
    // 语音功能元素
    cardVoiceControls: document.getElementById('cardVoiceControls'),
    saveVoiceWrapper: document.getElementById('saveVoiceWrapper'),
    editVoiceWrapper: document.getElementById('editVoiceWrapper')
};

// 当前生成的图片数据
let currentGeneratedImage = null;

// 主题名称以 cards.js 的 categories 为唯一真源（不再从 HTML 按钮文案反推）
const categoryNames = Object.fromEntries(categories.map((c) => [c.id, c.name]));

function getSavedAnswerForCurrentCard() {
    if (!state.currentCard) return '';
    const item = state.history.find((entry) => entry.card.id === state.currentCard.id);
    return item ? item.answer : '';
}

function refreshCardView() {
    renderCard({
        currentCard: state.currentCard,
        categoryNames,
        elements
    });

    // 渲染语音控制按钮
    renderCardVoiceSection();
}

function getFilteredHistory() {
    return filterHistory(state.history, state.historyFilters);
}

function refreshHistoryView() {
    const filteredHistory = getFilteredHistory();
    renderHistory({
        history: filteredHistory,
        categoryNames,
        historyList: elements.historyList,
        onEdit: openEditModal,
        onDelete: handleDeleteHistoryItem
    });
}

function handleHistoryFilterChange(filters) {
    state.historyFilters = { ...state.historyFilters, ...filters };
    refreshHistoryView();
}

function openEditModal(item) {
    state.editingItem = item;
    const card = item.card || {};
    elements.editModalQuestion.textContent = card.reference
        ? `${card.reference}　${card.text || ''}`
        : (card.question || '');
    elements.editAnswerInput.value = item.answer;
    elements.editModal.classList.add('active');
    elements.editAnswerInput.focus();

    // 渲染语音输入按钮
    renderEditModalVoiceControls();
}

function closeEditModal() {
    // 停止语音输入
    stopVoiceInput();
    elements.editModal.classList.remove('active');
    state.editingItem = null;
}

function saveEditedAnswer() {
    if (!state.editingItem) return;
    
    const newAnswer = elements.editAnswerInput.value.trim();
    if (!newAnswer) {
        showToast('回答内容不能为空', 'error');
        return;
    }
    
    const newHistory = updateHistoryItem(state.history, state.editingItem.id, newAnswer);
    if (newHistory === null) {
        showToast('保存失败，请重试', 'error');
        return;
    }
    
    state.history = newHistory;
    refreshHistoryView();
    closeEditModal();
    showToast('回答已更新', 'success');
}

async function handleDeleteHistoryItem(item) {
    const confirmed = await showConfirm('确定要删除这条历史记录吗？此操作不可恢复。');
    if (!confirmed) return;
    
    const newHistory = deleteHistoryItem(state.history, item.id);
    if (newHistory === null) {
        showToast('删除失败，请重试', 'error');
        return;
    }
    
    state.history = newHistory;
    refreshHistoryView();
    showToast('记录已删除', 'success');
}

function handleExportJSON() {
    const filteredHistory = getFilteredHistory();
    if (!filteredHistory.length) {
        showToast('没有可导出的记录', 'error');
        return;
    }
    
    const jsonString = exportToJSON(filteredHistory);
    downloadJSON(jsonString);
    showToast('JSON文件已下载', 'success');
}

async function handleExportImage() {
    const filteredHistory = getFilteredHistory();
    if (!filteredHistory.length) {
        showToast('没有可导出的记录', 'error');
        return;
    }
    
    try {
        showToast('正在生成图片...', 'info');
        const imageData = await generateHistoryAlbumImage(filteredHistory, categoryNames);
        downloadAlbumImage(imageData);
        showToast('图片已下载', 'success');
    } catch (error) {
        console.error('导出图片失败:', error);
        showToast(error.message || '生成图片失败，请重试', 'error');
    }
}

async function handleExportAlbum() {
    const filteredHistory = getFilteredHistory();
    if (!filteredHistory.length) {
        showToast('没有可导出的记录', 'error');
        return;
    }
    
    // 纪念册功能与导出图片相同
    await handleExportImage();
}

function getStoredTheme() {
    const value = localStorage.getItem(THEME_KEY);
    return THEME_CHOICES.includes(value) ? value : 'forest';
}

function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    if (!elements.themeSelector) return;
    elements.themeSelector.querySelectorAll('[data-theme-choice]').forEach((button) => {
        const active = button.dataset.themeChoice === theme;
        button.classList.toggle('active', active);
        button.setAttribute('aria-pressed', String(active));
    });
}

function setTheme(theme) {
    if (!THEME_CHOICES.includes(theme)) return;
    localStorage.setItem(THEME_KEY, theme);
    applyTheme(theme);
    showToast(`\u5df2\u5207\u6362\u5230${THEME_LABELS[theme]}\u98ce\u683c\u3002`, 'success');
}

function showToast(message, type = 'info') {
    const oldToasts = elements.toastContainer.querySelectorAll('.toast');
    if (oldToasts.length >= 2) {
        oldToasts[0].remove();
    }

    const toast = document.createElement('div');
    toast.className = `toast ${type === 'error' ? 'toast-error' : type === 'success' ? 'toast-success' : ''}`.trim();
    toast.textContent = message;
    elements.toastContainer.appendChild(toast);

    setTimeout(() => {
        toast.classList.add('toast-hide');
        setTimeout(() => {
            toast.remove();
        }, UI_TIMING.toastExitMs);
    }, UI_TIMING.toastVisibleMs);
}

function showConfirm(message) {
    return new Promise((resolve) => {
        elements.confirmMessage.textContent = message;
        elements.confirmModal.classList.add('active');

        const cleanUp = () => {
            elements.confirmModal.classList.remove('active');
            elements.confirmOkBtn.removeEventListener('click', onConfirm);
            elements.confirmCancelBtn.removeEventListener('click', onCancel);
            elements.confirmModal.removeEventListener('click', onOverlayClick);
            document.removeEventListener('keydown', onKeyDown);
        };

        const onConfirm = () => {
            cleanUp();
            resolve(true);
        };

        const onCancel = () => {
            cleanUp();
            resolve(false);
        };

        const onOverlayClick = (event) => {
            if (event.target === elements.confirmModal) {
                onCancel();
            }
        };

        const onKeyDown = (event) => {
            if (event.key === 'Escape') {
                onCancel();
            }
        };

        elements.confirmOkBtn.addEventListener('click', onConfirm);
        elements.confirmCancelBtn.addEventListener('click', onCancel);
        elements.confirmModal.addEventListener('click', onOverlayClick);
        document.addEventListener('keydown', onKeyDown);
    });
}

function drawCard() {
    const filtered = filterCards(cards, state.currentCategory);

    if (!filtered.length) {
        showToast('当前筛选条件下没有可用卡牌，请调整筛选后重试。', 'error');
        return;
    }

    state.currentCard = drawRandomCard(filtered);
    refreshCardView();
    elements.cardContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

function openSaveModal(source = 'draw') {
    if (!state.currentCard) return;
    state.pendingSource = source;
    elements.saveModalQuestion.textContent = state.currentCard.reference
        ? `${state.currentCard.reference}　${state.currentCard.text || ''}`
        : (state.currentCard.question || '');
    elements.answerInput.value = '';
    elements.saveModal.classList.add('active');
    elements.answerInput.focus();

    // 渲染语音输入按钮
    renderSaveModalVoiceControls();
}

function closeSaveModal() {
    // 停止语音输入
    stopVoiceInput();
    elements.saveModal.classList.remove('active');
}

function saveAnswer() {
    if (!state.currentCard) return;

    const answer = elements.answerInput.value.trim();
    if (!answer) {
        showToast('请先写下你的感受。', 'error');
        return;
    }

    const historyItem = {
        id: Date.now(),
        timestamp: new Date().toLocaleString('zh-CN'),
        card: state.currentCard,
        answer,
        source: state.pendingSource || 'draw'
    };
    state.pendingSource = null;

    state.history.unshift(historyItem);
    if (!saveHistory(state.history)) {
        showToast('保存失败，请检查浏览器存储权限。', 'error');
        return;
    }

    refreshHistoryView();
    closeSaveModal();

    // 打卡
    const checkInResult = checkInOnSave();
    if (checkInResult.isNewCheckIn) {
        showToast(`打卡成功！已连续打卡 ${checkInResult.data.streak} 天`, 'success');
    } else {
        showToast('回答已保存。', 'success');
    }

    // 刷新每日卡牌显示
    refreshDailyCardView();
}

function openShareModal() {
    if (!state.currentCard) return;

    elements.shareQuestion.textContent = state.currentCard.reference
        ? `${state.currentCard.reference}　${state.currentCard.text || ''}`
        : (state.currentCard.question || '');
    const answer = getSavedAnswerForCurrentCard() || '（点击“写下感受”后可展示你的感受）';
    elements.shareAnswer.textContent = answer;
    elements.shareModal.classList.add('active');
}

function closeShareModal() {
    elements.shareModal.classList.remove('active');
}

function fallbackCopy(text) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.focus();
    textarea.select();

    let ok = false;
    try {
        ok = document.execCommand('copy');
    } catch {
        ok = false;
    }

    document.body.removeChild(textarea);
    return ok;
}

async function copyShareLink() {
    if (!state.currentCard) return;

    const verse = state.currentCard.reference
        ? `${state.currentCard.text}\n—— ${state.currentCard.reference}`
        : (state.currentCard.question || '');
    const text = `圣经金句\n\n${verse}\n\n来自圣经金句`;

    try {
        if (navigator.clipboard?.writeText) {
            await navigator.clipboard.writeText(text);
            showToast('已复制到剪贴板。', 'success');
            return;
        }

        if (fallbackCopy(text)) {
            showToast('已复制到剪贴板。', 'success');
            return;
        }

        showToast('复制失败，请手动复制。', 'error');
    } catch {
        if (fallbackCopy(text)) {
            showToast('已复制到剪贴板。', 'success');
            return;
        }
        showToast('复制失败，请手动复制。', 'error');
    }
}

// ==================== 分享功能增强 ====================

/**
 * 生成分享图片
 * 使用 html2canvas 将隐藏模板转为图片
 */
async function generateShareImage() {
    if (!state.currentCard) {
        showToast('请先抽取一节经文', 'error');
        return;
    }

    try {
        showToast('正在生成分享图片...', 'info');

        // 更新分享卡片模板内容
        elements.shareCardCategory.textContent = categoryNames[state.currentCard.category] || state.currentCard.category;
        elements.shareCardQuestion.textContent = state.currentCard.text || state.currentCard.question || '';
        const shareRefEl = document.getElementById('shareCardRef');
        if (shareRefEl) shareRefEl.textContent = state.currentCard.reference ? `—— ${state.currentCard.reference}` : '';

        // 获取用户回答
        const answer = getSavedAnswerForCurrentCard();
        if (answer) {
            elements.shareCardAnswer.textContent = answer;
            elements.shareCardAnswerSection.style.display = 'block';
        } else {
            elements.shareCardAnswerSection.style.display = 'none';
        }

        // 临时将模板移到可视区域以便 html2canvas 渲染
        const originalPosition = elements.shareCardTemplate.style.position;
        const originalLeft = elements.shareCardTemplate.style.left;
        elements.shareCardTemplate.style.position = 'fixed';
        elements.shareCardTemplate.style.left = '-9999px';
        elements.shareCardTemplate.style.top = '-9999px';

        // 等待字体加载完成
        await document.fonts.ready;

        // 检测是否在 file:// 协议下运行
        const isFileProtocol = window.location.protocol === 'file:';
        if (isFileProtocol) {
            showToast('请使用 HTTP 服务器访问以生成图片（如 python -m http.server 8080）', 'error');
            // 恢复模板位置
            elements.shareCardTemplate.style.position = originalPosition;
            elements.shareCardTemplate.style.left = originalLeft;
            return;
        }

        // 使用 html2canvas 生成图片
        const canvas = await html2canvas(elements.shareCardTemplate.querySelector('.share-card-visual'), {
            scale: 2,
            useCORS: true,
            allowTaint: true,
            backgroundColor: null,
            logging: false,
            width: 600,
            height: 800
        });

        // 恢复模板位置
        elements.shareCardTemplate.style.position = originalPosition;
        elements.shareCardTemplate.style.left = originalLeft;

        // 转换为图片数据
        currentGeneratedImage = canvas.toDataURL('image/png');

        // 显示预览
        elements.generatedImagePreview.src = currentGeneratedImage;
        elements.imagePreviewContainer.style.display = 'block';

        showToast('分享图片生成成功！', 'success');
    } catch (error) {
        console.error('生成图片失败:', error);
        showToast('生成图片失败，请重试', 'error');
    }
}

/**
 * 下载生成的分享图片
 */
function downloadShareImage() {
    if (!currentGeneratedImage) {
        showToast('请先生成分享图片', 'error');
        return;
    }

    const link = document.createElement('a');
    link.download = `圣经金句_${Date.now()}.png`;
    link.href = currentGeneratedImage;
    link.click();

    showToast('图片下载已开始', 'success');
}

/**
 * 生成分享链接（Base64 编码）
 * 包含卡牌信息和用户回答
 */
function generateShareLink() {
    if (!state.currentCard) {
        showToast('请先抽取一节经文', 'error');
        return;
    }

    try {
        // 获取用户回答
        const answer = getSavedAnswerForCurrentCard();

        // 构建分享数据
        // 分享数据自带经文，不依赖对方本地有没有这条记录
        // （手记不在 200 条池里，靠 cardId 查找会失败）
        const shareData = {
            cardId: state.currentCard.id,
            category: state.currentCard.category,
            level: state.currentCard.level,
            question: state.currentCard.question,
            reference: state.currentCard.reference,
            text: state.currentCard.text,
            source: state.currentCard.isDailyVerse ? 'daily' : (state.currentCard.sourceHint || state.pendingSource || 'draw'),
            answer: answer || '',
            timestamp: Date.now()
        };

        // Base64 编码
        const encoded = btoa(encodeURIComponent(JSON.stringify(shareData)));
        const shareUrl = `${window.location.origin}${window.location.pathname}#share=${encoded}`;

        // 复制到剪贴板
        if (navigator.clipboard?.writeText) {
            navigator.clipboard.writeText(shareUrl).then(() => {
                showToast('分享链接已复制到剪贴板', 'success');
            }).catch(() => {
                fallbackCopy(shareUrl);
                showToast('分享链接已复制到剪贴板', 'success');
            });
        } else if (fallbackCopy(shareUrl)) {
            showToast('分享链接已复制到剪贴板', 'success');
        } else {
            showToast('复制失败，请手动复制', 'error');
        }
    } catch (error) {
        console.error('生成分享链接失败:', error);
        showToast('生成分享链接失败', 'error');
    }
}

/**
 * 处理分享链接
 * 解析 URL hash 中的分享数据并加载卡牌
 */
function handleShareLink() {
    const hash = window.location.hash;
    if (!hash.startsWith('#share=')) return;

    try {
        const encoded = hash.slice(7); // 移除 '#share='
        const decoded = decodeURIComponent(atob(encoded));
        const shareData = JSON.parse(decoded);

        // 优先用链接自带的经文（手记不在官方卡池里，按 id 找不到）
        let card = null;
        if (shareData.reference && shareData.text) {
            card = {
                id: shareData.cardId,
                category: shareData.category,
                reference: shareData.reference,
                text: shareData.text,
                question: shareData.question
            };
        } else {
            card = cards.find(c => c.id === shareData.cardId);
        }
        if (!card) {
            showToast('分享的经文不存在或已被删除', 'error');
            return;
        }

        // 设置当前卡牌
        state.currentCard = card;
        refreshCardView();

        // 如果有回答，添加到历史中
        if (shareData.answer) {
            const historyItem = {
                id: Date.now(),
                timestamp: new Date(shareData.timestamp || Date.now()).toLocaleString('zh-CN'),
                card: card,
                answer: shareData.answer,
                source: shareData.source || 'draw'
            };

            // 检查是否已存在相同经文的感受
            const existingIndex = state.history.findIndex(h => (h.card || {}).reference === card.reference);
            if (existingIndex === -1) {
                state.history.unshift(historyItem);
                saveHistory(state.history);
                refreshHistoryView();
            }
        }

        // 清除 hash
        window.history.replaceState(null, null, window.location.pathname);

        showToast('已加载分享的经文', 'success');
        elements.cardContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } catch (error) {
        console.error('解析分享链接失败:', error);
        showToast('分享链接无效或已过期', 'error');
    }
}

async function clearHistory() {
    const confirmed = await showConfirm('确定要清空所有历史记录吗？此操作不可恢复。');
    if (!confirmed) return;

    state.history = [];
    clearHistoryStore();
    refreshHistoryView();
    showToast('历史记录已清空。', 'success');
}

// ==================== 统计功能 ====================

function openStatsModal() {
    if (elements.statsModal && elements.statsContainer) {
        elements.statsModal.classList.add('active');
        renderFullStatsReport({
            container: elements.statsContainer,
            history: state.history,
            onExportImage: exportStatsImage
        });
    }
}

function closeStatsModal() {
    if (elements.statsModal) {
        elements.statsModal.classList.remove('active');
    }
}

async function exportStatsImage() {
    const statsContent = document.getElementById('statsReportContent');
    if (!statsContent) {
        showToast('报告内容未加载', 'error');
        return;
    }

    try {
        showToast('正在生成报告图片...', 'info');

        // 检测是否在 file:// 协议下运行
        const isFileProtocol = window.location.protocol === 'file:';
        if (isFileProtocol) {
            showToast('请使用 HTTP 服务器访问以生成图片（如 python -m http.server 8080）', 'error');
            return;
        }

        // 等待字体加载完成
        await document.fonts.ready;

        // 使用 html2canvas 生成图片
        const canvas = await html2canvas(statsContent, {
            scale: 2,
            useCORS: true,
            allowTaint: true,
            backgroundColor: '#ffffff',
            logging: false
        });

        // 转换为图片数据并下载
        const imageData = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.download = `圣经金句灵修报告_${Date.now()}.png`;
        link.href = imageData;
        link.click();

        showToast('报告图片已下载', 'success');
    } catch (error) {
        console.error('生成报告图片失败:', error);
        showToast('生成图片失败，请重试', 'error');
    }
}

function setActiveFilterButton(container, target) {
    if (!target.classList.contains('filter-btn')) return;
    container.querySelectorAll('.filter-btn').forEach((btn) => btn.classList.remove('active'));
    target.classList.add('active');
}

function setupEventListeners() {
    elements.drawBtn.addEventListener('click', drawCard);
    elements.saveBtn.addEventListener('click', () => openSaveModal('draw'));
    elements.shareBtn.addEventListener('click', openShareModal);
    elements.confirmSaveBtn.addEventListener('click', saveAnswer);
    elements.cancelSaveBtn.addEventListener('click', closeSaveModal);
    elements.closeShareBtn.addEventListener('click', closeShareModal);
    elements.copyShareBtn.addEventListener('click', copyShareLink);
    elements.clearHistoryBtn.addEventListener('click', clearHistory);
    
    // 编辑模态框事件
    if (elements.confirmEditBtn) {
        elements.confirmEditBtn.addEventListener('click', saveEditedAnswer);
    }
    if (elements.cancelEditBtn) {
        elements.cancelEditBtn.addEventListener('click', closeEditModal);
    }
    if (elements.editModal) {
        elements.editModal.addEventListener('click', (event) => {
            if (event.target === elements.editModal) closeEditModal();
        });
    }

    // 分享增强功能事件监听
    if (elements.generateImageBtn) {
        elements.generateImageBtn.addEventListener('click', generateShareImage);
    }
    if (elements.copyLinkBtn) {
        elements.copyLinkBtn.addEventListener('click', generateShareLink);
    }
    if (elements.downloadImageBtn) {
        elements.downloadImageBtn.addEventListener('click', downloadShareImage);
    }

    // 记一节经文事件
    if (elements.verseNoteBtn) {
        elements.verseNoteBtn.addEventListener('click', openVerseNoteModal);
    }
    if (elements.closeVerseNoteBtn) {
        elements.closeVerseNoteBtn.addEventListener('click', closeVerseNoteModal);
    }
    if (elements.verseNoteModal) {
        elements.verseNoteModal.addEventListener('click', (event) => {
            if (event.target === elements.verseNoteModal) closeVerseNoteModal();
        });
    }

    elements.themeSelector.addEventListener('click', (event) => {
        const button = event.target.closest('[data-theme-choice]');
        if (!button) return;
        setTheme(button.dataset.themeChoice);
    });

    elements.categoryFilters.addEventListener('click', (event) => {
        setActiveFilterButton(elements.categoryFilters, event.target);
        if (event.target.dataset.category) {
            state.currentCategory = event.target.dataset.category;
        }
    });

    elements.saveModal.addEventListener('click', (event) => {
        if (event.target === elements.saveModal) closeSaveModal();
    });

    elements.shareModal.addEventListener('click', (event) => {
        if (event.target === elements.shareModal) closeShareModal();
    });

    // 统计功能事件监听
    if (elements.statsBtn) {
        elements.statsBtn.addEventListener('click', openStatsModal);
    }
    if (elements.closeStatsBtn) {
        elements.closeStatsBtn.addEventListener('click', closeStatsModal);
    }
    if (elements.statsModal) {
        elements.statsModal.addEventListener('click', (event) => {
            if (event.target === elements.statsModal) closeStatsModal();
        });
    }

}

// ==================== 今日经文 ====================

// ==================== 记一节经文 ====================

function openVerseNoteModal() {
    if (!elements.verseNoteModal || !elements.verseNoteContainer) return;

    renderVerseNote({
        container: elements.verseNoteContainer,
        onPick: (verse) => {
            closeVerseNoteModal();
            // 把选中的经文当作当前卡牌，打开「写下感受」
            state.currentCard = {
                id: `note-${Date.now()}`,
                category: 'note',
                reference: verse.reference,
                text: verse.text,
                book: verse.book,
                chapter: verse.chapter,
                verse: verse.verse,
                sourceHint: 'note'
            };
            openSaveModal('note');
        }
    });

    elements.verseNoteModal.classList.add('active');
}

function closeVerseNoteModal() {
    if (elements.verseNoteModal) {
        elements.verseNoteModal.classList.remove('active');
    }
}

function initTodayVerse() {
    if (!elements.dailyCardContainer) return;

    renderTodayVerse({
        container: elements.dailyCardContainer,
        verse: getTodayVerse(cards),
        history: state.history,
        streak: getStreakDays(),
        onAnswer: () => openTodayVerseSave(),
        onNext: () => handleNextVerse()
    });
}

/**
 * 打开「写下感受」——把今日经文设为当前卡牌，来源记为 daily
 */
function openTodayVerseSave() {
    const verse = getTodayVerse(cards);
    if (!verse) {
        showToast('暂时取不到今日经文', 'error');
        return;
    }
    state.currentCard = verse;
    openSaveModal('daily');
}

/**
 * 换一句
 */
function handleNextVerse() {
    const verse = nextTodayVerse(cards);
    if (!verse) {
        showToast('暂时取不到今日经文', 'error');
        return;
    }
    state.currentCard = verse;
    initTodayVerse();
    showToast('已换一句', 'success');
}

function refreshDailyCardView() {
    initTodayVerse();
}

// ==================== 语音功能 ====================

/**
 * 初始化语音服务
 */
function initVoiceService() {
    state.voice.synthesizer = createSpeechSynthesizer();
}

/**
 * 处理朗读按钮点击
 */
function handleReadAloud() {
    if (!state.voice.synthesizer) {
        showToast('您的浏览器不支持语音朗读功能', 'error');
        return;
    }

    if (!state.currentCard) {
        showToast('请先抽取一节经文', 'error');
        return;
    }

    // 如果正在朗读，则停止
    if (state.voice.isReading) {
        state.voice.synthesizer.cancel();
        state.voice.isReading = false;
        renderCardVoiceControls({
            container: elements.cardVoiceControls,
            onReadAloud: handleReadAloud,
            isReading: false,
            disabled: false
        });
        return;
    }

    // 开始朗读
    state.voice.isReading = true;
    renderCardVoiceControls({
        container: elements.cardVoiceControls,
        onReadAloud: handleReadAloud,
        isReading: true,
        disabled: false
    });

    state.voice.synthesizer.speak(state.currentCard.question, {
        rate: 0.9,
        pitch: 1.0,
        onEnd: () => {
            state.voice.isReading = false;
            renderCardVoiceControls({
                container: elements.cardVoiceControls,
                onReadAloud: handleReadAloud,
                isReading: false,
                disabled: false
            });
        },
        onError: (error) => {
            console.error('语音朗读错误:', error);
            showToast('朗读失败，请重试', 'error');
            state.voice.isReading = false;
            renderCardVoiceControls({
                container: elements.cardVoiceControls,
                onReadAloud: handleReadAloud,
                isReading: false,
                disabled: false
            });
        }
    });
}

/**
 * 渲染卡牌区域的语音控制
 */
function renderCardVoiceSection() {
    if (!elements.cardVoiceControls) return;

    const hasTTS = state.voice.synthesizer !== null;
    renderCardVoiceControls({
        container: elements.cardVoiceControls,
        onReadAloud: hasTTS ? handleReadAloud : null,
        isReading: state.voice.isReading,
        disabled: !hasTTS
    });
}

/**
 * 渲染保存模态框的语音输入控制
 */
function renderSaveModalVoiceControls() {
    if (!elements.saveVoiceWrapper) return;

    const hasASR = isSpeechRecognitionSupported();
    renderModalVoiceControls({
        container: elements.saveVoiceWrapper,
        onVoiceInput: hasASR ? () => handleVoiceInput(elements.answerInput, 'save') : null,
        isListening: state.voice.isListening,
        status: state.voice.isListening ? '正在聆听...' : ''
    });
}

/**
 * 渲染编辑模态框的语音输入控制
 */
function renderEditModalVoiceControls() {
    if (!elements.editVoiceWrapper) return;

    const hasASR = isSpeechRecognitionSupported();
    renderModalVoiceControls({
        container: elements.editVoiceWrapper,
        onVoiceInput: hasASR ? () => handleVoiceInput(elements.editAnswerInput, 'edit') : null,
        isListening: state.voice.isListening,
        status: state.voice.isListening ? '正在聆听...' : ''
    });
}

/**
 * 处理语音输入
 * @param {HTMLTextAreaElement} textarea - 目标文本域
 * @param {string} context - 上下文 ('save' | 'edit')
 */
async function handleVoiceInput(textarea, context) {
    // 检查浏览器支持
    if (!isSpeechRecognitionSupported()) {
        showToast('您的浏览器不支持语音输入功能', 'error');
        return;
    }

    // 如果正在录音，则停止
    if (state.voice.isListening) {
        stopVoiceInput();
        return;
    }

    // 请求麦克风权限
    const hasPermission = await requestMicrophonePermission();
    if (!hasPermission) {
        showToast('需要麦克风权限才能使用语音输入', 'error');
        return;
    }

    // 创建识别器
    const recognizer = createSpeechRecognizer();
    if (!recognizer) {
        showToast('语音识别初始化失败', 'error');
        return;
    }

    state.voice.recognizer = recognizer;
    state.voice.isListening = true;

    // 更新UI
    if (context === 'save') {
        renderSaveModalVoiceControls();
    } else {
        renderEditModalVoiceControls();
    }

    // 保存原始值，用于追加
    let currentValue = textarea.value;
    if (currentValue && !currentValue.endsWith(' ')) {
        currentValue += ' ';
    }

    recognizer.start({
        onResult: (finalTranscript, interimTranscript) => {
            // 更新文本域内容
            const newText = currentValue + finalTranscript + interimTranscript;
            textarea.value = newText;

            // 触发 input 事件以更新任何监听器
            textarea.dispatchEvent(new Event('input', { bubbles: true }));
        },
        onError: (error, message) => {
            console.error('语音识别错误:', error, message);
            showToast(message, 'error');
            stopVoiceInput();
        },
        onEnd: () => {
            // 识别结束（可能是自动停止或用户停止）
            if (state.voice.isListening) {
                // 如果还在监听状态，重新启动以持续识别
                try {
                    recognizer.native.start();
                } catch (e) {
                    // 可能已经达到最大识别时间
                    stopVoiceInput();
                }
            }
        }
    });
}

/**
 * 停止语音输入
 */
function stopVoiceInput() {
    if (state.voice.recognizer) {
        state.voice.recognizer.stop();
        state.voice.recognizer = null;
    }
    state.voice.isListening = false;

    // 刷新UI
    if (elements.saveModal.classList.contains('active')) {
        renderSaveModalVoiceControls();
    }
    if (elements.editModal.classList.contains('active')) {
        renderEditModalVoiceControls();
    }
}

function init() {
    // 迁移旧命名空间（heartTalk* → bible*），解除与心语卡牌的 key 冲突。
    // 必须在读 history 之前跑，否则首次启动会看不到迁移过来的记录。
    migrateLegacyStorage();
    state.history = loadHistory();

    applyTheme(getStoredTheme());
    refreshCardView();
    refreshHistoryView();
    setupEventListeners();

    // 初始化筛选控件
    if (elements.historyFiltersContainer) {
        renderHistoryFilters({
            container: elements.historyFiltersContainer,
            categoryNames,
            onFilterChange: handleHistoryFilterChange
        });
    }

    // 初始化导出控件
    if (elements.historyExportContainer) {
        renderExportControls({
            container: elements.historyExportContainer,
            onExportJSON: handleExportJSON,
            onExportImage: handleExportImage,
            onExportAlbum: handleExportAlbum,
            onShowStats: openStatsModal
        });
    }

    // 初始化今日经文
    initTodayVerse();

    // 初始化语音服务
    initVoiceService();

    // 处理分享链接
    handleShareLink();
}

init();

})();
