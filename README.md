# visuyaku

生年月日から数え年の厄年を計算し、男性・女性の前厄・本厄・後厄を同じ時間軸で比較する静的Webアプリです。

## URL parameters

- `birthdate=1990-04-01`
- `sex=male` または `female`
- `year=2026`
- `view=1y`、`12y`、`80y`

## Development

```sh
npm install
npm run build
```

ソースは `site/index.html` にあります。ビルドすると、Cloudflare Workers Static Assets用に
`dist/visuyaku/index.html` が生成されます。

## Deployment

Cloudflare Workers BuildsをGitHubリポジトリへ接続し、次のコマンドでデプロイします。

```sh
npm run deploy
```

Workerコードは実行せず、静的アセットとして `tmp.vigle.co/visuyaku/` から直接配信します。
