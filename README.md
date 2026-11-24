# YesPlayMusic 音源插件汇总

<p align="center">
  <a href="https://aliuxq.github.io/yesplaymusic-plugins/">
    <img src="https://img.shields.io/badge/%E5%9C%A8%E7%BA%BF%E8%AE%BF%E9%97%AE-%E7%AB%8B%E5%8D%B3%E6%89%93%E5%BC%80-2563eb?style=for-the-badge&logo=github&logoColor=white" alt="在线访问" />
  </a>
</p>

一个第三方整理的 [YesPlayMusic](https://github.com/qier222/YesPlayMusic) 音源插件汇总页，收录官方与社区插件。

- **官方插件**：由 YesPlayMusic 官方维护（Plex / Jellyfin / Emby / Subsonic），固定列在最上方；
- **社区插件**：由社区开发者维护，按 GitHub 星标数排行，每次打开页面实时拉取最新数据。

> 社区插件顺序仅代表热度（星标数），不代表质量、安全性或任何推荐倾向。
> 本项目是第三方汇总，非 YesPlayMusic 官方项目。

## 使用

打开页面后，每个插件卡片上都有「复制安装链接」按钮，点击复制后，在 YesPlayMusic 中：

**设置 → 插件 → 安装插件**，粘贴即可一键安装。

## 数据来源

- 社区插件通过 GitHub 公开接口实时拉取所有打了 [`yesplaymusic-plugin`](https://github.com/topics/yesplaymusic-plugin) 标签的仓库；
- 官方插件与部分未打标签的社区插件在 [`data.js`](./data.js) 中手动维护。

## 收录你的插件

想让你的插件出现在社区列表里，二选一：

1. **给仓库打标签**（推荐，自动收录）：在仓库主页点击「About」右侧的齿轮，添加 `yesplaymusic-plugin` 标签；
2. **补充简介**：前往本仓库提 Pull Request，在 [`data.js`](./data.js) 的 `KNOWN` 里加上你的插件的中文简介。

## 本地预览

纯静态页面，无需构建。直接用任意静态服务器打开即可：

```bash
python -m http.server 8000
# 浏览器打开 http://localhost:8000
```

## 部署

本项目通过 GitHub Pages 托管。推送 `main` 分支后，在仓库 **Settings → Pages → Source** 选择 **GitHub Actions** 即可自动部署（工作流见 `.github/workflows/pages.yml`）。

## 协议

[MIT](./LICENSE)
