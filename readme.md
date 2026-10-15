# 安徽省基础教育精品课申报材料生成系统 (jingpinke)

本系统面向安徽省2026年“基础教育精品课”遴选申报，专门为高中信息技术必修1《数据与计算》1.3节《信息及其特征》（执教教师：**刘家阳**，单位：**安徽省颍上县耿棚中学**）打造，支持一键动态构建并打包符合省一等奖标准的全套材料（DOCX + 规范排版 PDF 双格式）。

---

## 核心功能特色

1. **一键导出全套申报包 (ZIP)**：通过前端原生 JSZip 与 FileSaver，将教学设计、学习任务单、课件逐字讲稿、分层作业、学生实证样卷、脱敏数据集打包为压缩包。
2. **DOCX + PDF 双格式**：每篇核心文本材料均提供标准 OpenXML 真实单元格表格排版的 `.docx` 以及防格式走样的 `.pdf`。
3. **单文件离线双击运行**：根目录与 `public/index.html` 包含纯前端自包含版本，无网离线双击即可打开运行。
4. **统一大模型参数支持**：集成 `myusellm` 技能，预置 `apihub` 端点与秘钥参数。

---

## Docker 生产环境容器化部署

本项目已预置生产级多阶段 `Dockerfile`、`.dockerignore` 以及本地与远程一键部署脚本。

- **镜像名称**：`jingpinke`
- **容器名称**：`jingpinke`
- **宿主机对外端口**：`7884`（内部容器端口：`3000`）
- **本地数据持久化目录**：`D:\docker\jingpinke\data`
- **远程数据持久化目录**：`/bak/docker/jingpinke/data`

### 1. 本地 Windows 一键部署 (`redeploy.bat`)

确保本地已启动 Docker Desktop，双击运行根目录下的 `redeploy.bat`：
- 自动检测并依赖 `package-lock.json`
- 执行多阶段高速缓存构建
- 停止并清理旧容器与虚悬镜像
- 挂载持久化目录并启动容器
- 进行健康检查并验证 HTTP 200

访问地址：`http://localhost:7884`

### 2. 远程 Linux 服务器一键部署 (`upload2remote.bat`)

双击运行根目录下的 `upload2remote.bat`：
- 本地构建 `jingpinke` 镜像并打包导出为 `.tar`
- 通过 SCP 自动上传至服务器 `172.29.173.42`（用户 `gpzx`）
- 远程执行 `docker load` 载入镜像
- 自动创建并赋权持久化目录 `/bak/docker/jingpinke/data`
- 接入 `mynet` 容器网络并映射宿主机端口 `7884` 启动

访问地址：`http://172.29.173.42:7884`

### 关键依赖锁文件说明
- 构建采用多阶段方案，容器内依赖按 `package-lock.json` 以 `npm ci --legacy-peer-deps` 精确安装，避免因网络抖动造成依赖解析冲突或 SSL 中断。
- **若后续项目依赖变更或删除了锁文件**，必须先在终端执行以下命令重新生成锁文件（必须带 `--legacy-peer-deps`），再运行部署脚本：
  ```bash
  npm install --legacy-peer-deps --package-lock-only
  ```
