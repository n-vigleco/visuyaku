# visuyaku

[![Deploy](https://github.com/n-vigleco/visuyaku/actions/workflows/deploy.yml/badge.svg)](https://github.com/n-vigleco/visuyaku/actions/workflows/deploy.yml)

厄年を、見える形に。

生まれ年から数え年を計算し、男性・女性の前厄・本厄・後厄を同じ時間軸で比較できる静的Webアプリです。

**公開URL:** [https://tmp.vigle.co/visuyaku/](https://tmp.vigle.co/visuyaku/)

## 主な機能

- 生まれ年と性別から対象年の数え年を計算
- 男性・女性の厄年を同じグラフに表示
- 前後1年を月単位で表示
- 前後12年、80歳までの長期表示
- 選択した年と現在位置をグラフ上に表示
- 入力状態をURLへ反映し、そのまま共有可能
- ブラウザだけで動作し、入力データを外部へ送信しない

## 計算上の前提

数え年は「対象年 - 生まれ年 + 1」で計算します。一般的な目安として、男性は数え年25・42・61歳、女性は19・33・37・61歳を本厄とし、その前年を前厄、翌年を後厄として表示します。

厄年の時期や年齢の扱いは地域・神社・寺院によって異なります。実際の祈祷や参拝では、お参り先の案内も確認してください。

## URLパラメータ

| パラメータ | 内容 | 例 |
| --- | --- | --- |
| `birthyear` | 生まれ年 | `1990` |
| `sex` | `male` または `female` | `male` |
| `year` | グラフの基準年 | `2026` |
| `view` | `1y`、`12y`、`80y` | `1y` |

例:

```text
https://tmp.vigle.co/visuyaku/?birthyear=1990&sex=male&year=2026&view=1y
```

以前の `birthdate` および `dob` パラメータも読み込み可能ですが、共有URLは `birthyear` に統一されます。

## ローカル開発

必要環境はNode.js 22以降です。

```sh
npm install
npm run build
```

ソースは `site/index.html` です。`npm run build` により、Cloudflare Workers Static Assets用の `dist/index.html` と `dist/visuyaku/index.html` が生成されます。

ローカルでCloudflareと同じ配信構成を確認する場合:

```sh
npx wrangler dev
```

## 構成

```text
site/index.html               アプリ本体
scripts/build.mjs             配信用ディレクトリの生成
wrangler.jsonc                Worker、ルート、Static Assets設定
.github/workflows/deploy.yml  mainへのpush時の自動デプロイ
```

`tmp.vigle.co/visuyaku*` に一致するリクエストは、Workerコードを実行せずCloudflare Workers Static Assetsから配信されます。

## 自動デプロイの初期設定

GitHubリポジトリで一度だけ次の設定が必要です。

1. Cloudflareの **My Profile > API Tokens** でトークンを作成します。
2. テンプレートは **Edit Cloudflare Workers** を選び、対象アカウントと `vigle.co` に限定します。
3. GitHubの **Settings > Secrets and variables > Actions** を開きます。
4. Repository secretとして `CLOUDFLARE_API_TOKEN` を登録します。

設定後は `main` ブランチへのpushで、自動的にビルドと本番デプロイが実行されます。手動実行はGitHubの **Actions > Deploy > Run workflow** から行えます。

ローカルから手動デプロイする場合:

```sh
npm run deploy
```

## 更新手順

1. `site/index.html` を編集します。
2. `npm run build` で生成処理を確認します。
3. 変更を `main` へpushします。
4. GitHub Actionsの `Deploy` が成功したことを確認します。

## 同系統のツールを増やす場合

小さな静的ツールは、ツールごとにリポジトリとWorkerを分け、`tmp.vigle.co/<tool-name>/` を割り当てる形が管理しやすい構成です。各リポジトリで同じActions構成を使い、Cloudflare APIトークンは対象Workerやゾーンに必要な範囲だけ許可します。
