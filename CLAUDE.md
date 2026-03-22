# SEGA MUSIC — Design Guidelines

## デザイントーン

**スタイル**: Editorial Brutalist

- 白ベース（`#F2F0EA`）＋ 青差し色（`#1A55E3`）
- 大胆なタイポグラフィ主体のレイアウト
- 幾何学的グラフィック要素（ドットグリッド、斜めクリップ、アウトライン文字）
- クールでエネルギッシュ、カッコよさで語るビジュアル言語

## フォント

- **Display**: `Big Shoulders Display` (wght 700/900) — 見出し・デコラティブ
- **Body**: `DM Sans` (wght 300/400/500/700) — 本文・UI

## カラートークン

| 変数 | 値 | 用途 |
|------|----|------|
| `--paper` | `#F2F0EA` | 背景ベース |
| `--ink` | `#0C0C0C` | メインテキスト |
| `--muted` | `#7A7A7A` | サブテキスト |
| `--dim` | `#B8B6AF` | 装飾・ルール |
| `--rule` | `#D8D5CC` | ボーダー |
| `--blue` | `#1A55E3` | メインアクセント・タグ背景・ホバー背景 |
| `--blue-d` | `#1340C0` | ホバー |
| `--blue-l` | `#4A7FF5` | ライトアクセント |

> **Note**: `--blue-xl` / `--blue-xxl` は廃止。タグ背景やホバー背景には `--blue` を直接使用。

## レイアウト原則

- PC専用（1512px基準）、スクロールなし1画面
- ヒーロー: 左54%テキスト / 右46%ブルーグラフィックパネル（斜めクリップ）
- ヘッダー: 上部フロート型グラスモーフィズムピル（`backdrop-filter:blur(20px)`）
- ニューステロップ: 画面下部の無限スクロールticker（`var(--ink)`背景）

## UIパターン

- ボタン: `clip-path: polygon()` でシャンファードコーナー
- ホバー: 下線がscaleXで伸びるアニメーション
- グラフィック装飾: ドットグリッド、アウトライン巨大文字、座標マーカー
- アニメーション: `fadeUp` staggered reveal（ページロード時）

## コンセプトコピー

**SOUND THAT MOVES YOU.**

---

## 実装仕様

### ディレクトリ構成

```
htdocs/
├── index.html              # TOP（ヒーロー＋ローディング＋ティッカー）
├── assets/
│   ├── css/
│   │   └── style.css       # 全ページ共通スタイル
│   ├── js/
│   │   ├── ticker.js           # ニューステロップアニメーション（TOP）
│   │   ├── mission-ticker.js   # 装飾スクロールアニメーション（COMPANY）
│   │   └── transitions.js      # ページ遷移アニメーション
│   └── img/
│       └── hero-bg.mp4     # ヒーロー背景動画
├── news/
│   ├── index.html          # NEWS一覧
│   └── detail.html         # NEWS詳細
├── works/
│   └── index.html          # WORKS一覧
├── licensing/
│   └── index.html          # LICENSING
├── company/
│   └── index.html          # COMPANY（会社概要）
└── contact/
    ├── index.html          # CONTACT（お問い合わせフォーム）
    └── complete.html       # 送信完了ページ
```

### ページ一覧

| ページ | パス | 説明 |
|--------|------|------|
| TOP | `/` | ヒーロー動画＋ローディングスクリーン＋ニューステロップ |
| NEWS一覧 | `/news/` | フィルター＋ニュース一覧＋ページネーション |
| NEWS詳細 | `/news/detail.html` | 記事本文＋サイドバー（関連ニュース） |
| WORKS | `/works/` | 作品一覧 |
| LICENSING | `/licensing/` | ライセンス案内＋フロー図＋FAQ |
| COMPANY | `/company/` | ミッション＋事業内容＋会社概要＋アクセス |
| CONTACT | `/contact/` | お問い合わせフォーム |
| 送信完了 | `/contact/complete.html` | フォーム送信完了ページ |

### フォント（実装）

- **Onest** (wght 300/400/500/800) — 見出し・ナビ・ロゴ
- **DM Sans** (wght 300/400/500/700) — 本文・ティッカー

※ Google Fonts経由で読み込み

### レイアウト

- **PC/SP共通**: `100vw × 100vh`、スクロールなし
- **ブレークポイント**: 768px（SP切り替え）
- **ティッカー高さ**: 44px（CSS変数 `--ticker-height`）

### ニューステロップ

- JSで電光掲示板風の無限スクロール実装
- スクロール速度: 50px/秒
- タグカラー:
  - Release: `rgba(255,255,255,0.1)` / `rgba(255,255,255,0.55)`
  - Event: `rgba(255,140,0,0.2)` / `#FFB347`
  - Archive: `rgba(255,255,255,0.1)` / `rgba(255,255,255,0.55)`
  - Interview: `rgba(100,220,100,0.1)` / `#7EDA8F`

### 動画アセット

- 配置先: `htdocs/assets/img/hero-bg.mp4`
- 自動再生・ミュート・ループ設定済み

### フッター

- 背景色: `#444`（変更済み）
- SEGAロゴ: `white`（視認性向上のため変更）
- MUSICロゴ: `var(--blue)`

### TOPページ MOVEアニメーション

- **MOVE**（`.hero .text-highlight`）は初期状態で非表示（`opacity: 0`）
- **2.8秒後**: フェードイン＋スライドアップで文字が出現
- **3.6秒後**: 青背景がスライドイン、文字が白に変化
- 他のテキスト（SOUNDS / THAT / YOU.）は通常のrevealアニメーション

### COMPANYページ 装飾スクロール

- **装飾テキスト**: "SOUNDS THAT MOVE YOU." を無限スクロール
- **スクロール速度**: 75px/秒（`mission-ticker.js`）
- **配置**: `.company-mission`セクション内に配置（PC: 50%、SP: 48vw）
- **スタイル**: `opacity: 0.1`、フォントサイズ13.24vw（PC）/ 62px（SP）

### 下層ページ共通仕様

- **セクションタイトル**: 英語＋日本語を縦並びで表示
  - PC: 英語 1vw / 日本語 1.8vw
  - SP: 英語 13px / 日本語 11px
- **コンテンツ幅**: PC 10vw左右padding（min-width: 1200px）/ SP 100%（padding: 40px 20px）
- **SP改行**: `.br-sp`クラスでSP専用改行を実装
- **text-highlightアニメーション**: 下層ページ遷移時に初期状態を`opacity: 0`で非表示、アニメーションで表示

---

## Figmaデザインファイル

**ファイル**: [SEGA MUSIC — Company Page Design](https://www.figma.com/design/HrrTW9IbFhKU2uyPZnIO7R)

| ページ | node-id |
|--------|---------|
| Company | 1-2 |
| TOP | 7-2 |
| NEWS一覧 | 8-2 |
| NEWS詳細 | 10-2 |
| Licensing | 12-2 |
| Contact | 17-2 |
