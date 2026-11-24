// YesPlayMusic 音源插件汇总 —— 运行时逻辑
//
// 数据来源：
//   1. 官方插件 —— data.js 里的 OFFICIAL_REPOS，固定展示；
//   2. 社区插件 —— 打了 yesplaymusic-plugin 标签的仓库（GitHub Search API 自动发现）
//      加上 data.js 里 MANUAL_COMMUNITY_REPOS 手动补录的仓库，合并后按星标排序。

const GITHUB = "https://api.github.com";
const TOPIC = "yesplaymusic-plugin";
const MAIN_REPO = "qier222/YesPlayMusic"; // 播放器本体，不是插件，需排除

// 拉取仓库详情
async function fetchRepo(repo) {
  const res = await fetch(`${GITHUB}/repos/${repo}`, {
    headers: { Accept: "application/vnd.github+json" },
  });
  if (!res.ok) throw new Error(`${repo}: HTTP ${res.status}`);
  return res.json();
}

// 拉取打了 topic 标签的仓库（自动发现的插件）
async function fetchTopicPlugins() {
  try {
    const url = `${GITHUB}/search/repositories?q=topic:${TOPIC}&sort=stars&order=desc&per_page=50`;
    const res = await fetch(url, { headers: { Accept: "application/vnd.github+json" } });
    if (!res.ok) return [];
    const data = await res.json();
    return data.items || [];
  } catch {
    return [];
  }
}

// 把 GitHub 仓库数据规整成卡片需要的字段
function normalize(repo, known) {
  const full = repo.full_name;
  const k = known[full] || {};
  return {
    repo: full,
    name: k.name || repo.name || full,
    desc: k.desc || repo.description || "",
    stars: repo.stargazers_count ?? 0,
    author: (repo.owner && repo.owner.login) || full.split("/")[0],
    avatar: (repo.owner && repo.owner.avatar_url) || "",
    license: (repo.license && repo.license.spdx_id) || "",
    updated: repo.updated_at || "",
    url: repo.html_url || `https://github.com/${full}`,
    install: `github.com/${full}`,
  };
}

// 图标多级回退：icon.png → icon.jpg → icon.webp → 作者头像
function iconSources(item) {
  const base = `https://raw.githubusercontent.com/${item.repo}/HEAD/`;
  return [base + "icon.png", base + "icon.jpg", base + "icon.webp", item.avatar].filter(Boolean);
}

function formatStars(n) {
  if (n >= 1000) return (n / 1000).toFixed(n >= 10000 ? 0 : 1) + "k";
  return String(n);
}

function formatTime(iso) {
  const t = new Date(iso);
  if (Number.isNaN(t.getTime())) return "";
  const diff = Date.now() - t.getTime();
  const day = 86400000;
  if (diff < day) return "今天更新";
  if (diff < 30 * day) return `${Math.floor(diff / day)} 天前更新`;
  if (diff < 365 * day) return `${Math.floor(diff / (30 * day))} 个月前更新`;
  return `${Math.floor(diff / (365 * day))} 年前更新`;
}

function makeIcon(item) {
  const img = document.createElement("img");
  img.className = "card-icon";
  img.alt = item.name;
  img.loading = "lazy";
  const sources = iconSources(item);
  let idx = 0;
  img.src = sources[0];
  img.onerror = () => {
    idx += 1;
    if (idx < sources.length) {
      img.src = sources[idx];
    } else {
      img.onerror = null;
      img.style.visibility = "hidden";
    }
  };
  return img;
}

function makeCard(item, official) {
  const card = document.createElement("article");
  card.className = "card";

  const head = document.createElement("div");
  head.className = "card-head";
  head.appendChild(makeIcon(item));

  const titleBox = document.createElement("div");
  titleBox.className = "card-title";
  const name = document.createElement("p");
  name.className = "card-name";
  name.textContent = item.name;
  const repo = document.createElement("p");
  repo.className = "card-repo";
  repo.textContent = item.repo;
  titleBox.appendChild(name);
  titleBox.appendChild(repo);
  head.appendChild(titleBox);
  card.appendChild(head);

  const desc = document.createElement("p");
  desc.className = "card-desc";
  desc.textContent = item.desc || "（暂无描述）";
  card.appendChild(desc);

  const meta = document.createElement("div");
  meta.className = "card-meta";
  const star = document.createElement("span");
  star.className = "meta-item stars";
  star.textContent = `★ ${formatStars(item.stars)}`;
  meta.appendChild(star);
  if (item.license) {
    const lic = document.createElement("span");
    lic.className = "meta-item";
    lic.textContent = item.license;
    meta.appendChild(lic);
  }
  if (item.updated) {
    const upd = document.createElement("span");
    upd.className = "meta-item";
    upd.textContent = formatTime(item.updated);
    meta.appendChild(upd);
  }
  card.appendChild(meta);

  const actions = document.createElement("div");
  actions.className = "card-actions";
  const copyBtn = document.createElement("button");
  copyBtn.className = "btn primary";
  copyBtn.textContent = "复制安装链接";
  copyBtn.onclick = () => copyInstall(copyBtn, item.install);
  const ghBtn = document.createElement("button");
  ghBtn.className = "btn";
  ghBtn.textContent = "查看仓库";
  ghBtn.onclick = () => window.open(item.url, "_blank", "noopener");
  actions.appendChild(copyBtn);
  actions.appendChild(ghBtn);
  card.appendChild(actions);

  return card;
}

async function copyInstall(btn, text) {
  try {
    await navigator.clipboard.writeText(text);
  } catch {
    const ta = document.createElement("textarea");
    ta.value = text;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand("copy");
    ta.remove();
  }
  const old = btn.textContent;
  btn.textContent = "已复制 ✓";
  btn.classList.add("primary");
  setTimeout(() => {
    btn.textContent = old;
  }, 1600);
}

function showLoading(el) {
  el.innerHTML = "";
  const p = document.createElement("p");
  p.className = "loading";
  p.textContent = "正在加载…";
  el.appendChild(p);
}

function showEmpty(el, text) {
  el.innerHTML = "";
  const p = document.createElement("p");
  p.className = "empty";
  p.textContent = text;
  el.appendChild(p);
}

async function main() {
  const officialEl = document.getElementById("official-list");
  const communityEl = document.getElementById("community-list");
  showLoading(officialEl);
  showLoading(communityEl);

  // 1. 自动发现打了 topic 的仓库
  const topicItems = await fetchTopicPlugins();
  const topicMap = new Map(topicItems.map((r) => [r.full_name, r]));

  // 2. 官方插件：优先从 topic 结果取，缺失时单独查询
  const official = [];
  await Promise.all(
    OFFICIAL_REPOS.map(async (repo) => {
      try {
        const data = topicMap.get(repo) || (await fetchRepo(repo));
        official.push(normalize(data, KNOWN));
      } catch {
        // 单个插件查询失败不阻塞整体
      }
    })
  );
  official.sort((a, b) => OFFICIAL_REPOS.indexOf(a.repo) - OFFICIAL_REPOS.indexOf(b.repo));

  // 3. 手动补录的社区插件（没打 topic 的）
  const manualCommunity = [];
  await Promise.all(
    MANUAL_COMMUNITY_REPOS.map(async (repo) => {
      try {
        const data = await fetchRepo(repo);
        manualCommunity.push(normalize(data, KNOWN));
      } catch {
        // 忽略
      }
    })
  );

  // 4. 自动发现的社区插件：排除官方、播放器本体、已手动收录的
  const excluded = new Set([...OFFICIAL_REPOS, MAIN_REPO, ...MANUAL_COMMUNITY_REPOS]);
  const autoCommunity = topicItems
    .filter((r) => !excluded.has(r.full_name))
    .map((r) => normalize(r, KNOWN));

  // 5. 合并社区插件并按星标降序
  const seen = new Set();
  const community = [];
  for (const item of [...manualCommunity, ...autoCommunity]) {
    if (seen.has(item.repo)) continue;
    seen.add(item.repo);
    community.push(item);
  }
  community.sort((a, b) => b.stars - a.stars);

  // 6. 渲染
  officialEl.innerHTML = "";
  if (official.length) {
    for (const item of official) officialEl.appendChild(makeCard(item, true));
  } else {
    showEmpty(officialEl, "暂时没有官方插件数据");
  }

  communityEl.innerHTML = "";
  if (community.length) {
    for (const item of community) communityEl.appendChild(makeCard(item, false));
  } else {
    showEmpty(communityEl, "暂时没有社区插件数据");
  }
}

main();
