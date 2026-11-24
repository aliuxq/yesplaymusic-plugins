// YesPlayMusic 音源插件汇总 —— 静态数据
//
// 这里维护「手动收录」的插件信息，用于补充 GitHub 上拿不到的元数据：
//   1. OFFICIAL_REPOS  —— 官方插件（作者是 YesPlayMusic 官方 qier222），固定列在最上方；
//   2. MANUAL_COMMUNITY_REPOS —— 社区插件里「没打 yesplaymusic-plugin 标签」的，手动补录；
//   3. KNOWN  —— 已知插件的中文简介与显示名，覆盖 GitHub 自带的英文/原始描述。
//
// 打了 yesplaymusic-plugin 标签的社区插件会自动被发现，无需在这里登记。

// 官方插件（固定展示，不参与社区星标排序）
const OFFICIAL_REPOS = [
  "qier222/ypm-plugin-plex",
  "qier222/ypm-plugin-jellyfin",
  "qier222/ypm-plugin-emby",
  "qier222/ypm-plugin-subsonic",
];

// 社区插件里尚未打 yesplaymusic-plugin 标签的，手动补充仓库名（会实时查询星标）
const MANUAL_COMMUNITY_REPOS = [
  "aliuxq/ypm-plugin-netease",
];

// 已知插件的中文显示名与简介（覆盖 GitHub 原始描述，让展示统一、易读）
const KNOWN = {
  "qier222/ypm-plugin-plex": {
    name: "Plex",
    desc: "官方插件，连接自建的 Plex 媒体服务器，播放你的私人音乐库。",
  },
  "qier222/ypm-plugin-jellyfin": {
    name: "Jellyfin",
    desc: "官方插件，连接自建的 Jellyfin 媒体服务器，播放你的私人音乐库。",
  },
  "qier222/ypm-plugin-emby": {
    name: "Emby",
    desc: "官方插件，连接自建的 Emby 媒体服务器，播放你的私人音乐库。",
  },
  "qier222/ypm-plugin-subsonic": {
    name: "Subsonic / Navidrome",
    desc: "官方插件，连接 Subsonic / Navidrome 等兼容的自建音乐服务器。",
  },
  "aliuxq/ypm-plugin-netease": {
    name: "网易云音乐",
    desc: "扫码登录网易云，浏览歌单、每日推荐、私人 FM 与排行榜，播放红心歌曲和收藏专辑。",
  },
  "lymzzyh/ypm-plugin-netease": {
    name: "网易云音乐",
    desc: "网易云音乐源：扫码登录，支持我的云盘、四档音质与多语言界面。",
  },
  "limnea/ypm-plugin-netease": {
    name: "网易云音乐",
    desc: "网易云音乐源：扫码登录，播放歌单、每日推荐和私人 FM，支持评论与个人主页。",
  },
  "lymzzyh/ypm-plugin-qqmusic": {
    name: "QQ 音乐",
    desc: "QQ 音乐音源插件：登录后使用 QQ 音乐曲库、歌单与播放。",
  },
};
