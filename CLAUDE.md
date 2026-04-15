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
│   │   ├── ticker.js        # ティッカーアニメーション（汎用・統合版）
│   │   ├── verb-rotator.js  # TOPページverb切り替え
│   │   └── transitions.js   # ページ遷移アニメーション
│   └── img/
│       ├── hero-bg.mp4      # ヒーロー背景動画
│       ├── logo.svg         # ヘッダーロゴ（カラー）
│       └── logo-w.svg       # フッターロゴ（白）
├── news/
│   ├── index.html          # NEWS一覧
│   └── detail.html         # NEWS詳細
├── works/
│   └── index.html          # WORKS一覧
├── publishing/
│   └── index.html          # MUSIC PUBLISHING（楽曲ライセンス）
├── company/
│   └── index.html          # COMPANY（会社概要）
├── contact/
│   ├── index.html          # CONTACT（お問い合わせフォーム）
│   └── complete.html       # 送信完了ページ
└── privacy/
    └── index.html          # プライバシーポリシー
```

### ページ一覧

| ページ | パス | 説明 |
|--------|------|------|
| TOP | `/` | ヒーロー動画＋ローディングスクリーン＋ニューステロップ |
| NEWS一覧 | `/news/` | フィルター＋ニュース一覧＋ページネーション |
| NEWS詳細 | `/news/detail.html` | 記事本文＋サイドバー（関連ニュース） |
| WORKS | `/works/` | 作品一覧 |
| MUSIC PUBLISHING | `/publishing/` | 楽曲ライセンス案内＋フロー図＋FAQ＋管理楽曲 |
| COMPANY | `/company/` | ミッション＋事業内容＋会社概要＋アクセス |
| CONTACT | `/contact/` | お問い合わせフォーム |
| 送信完了 | `/contact/complete.html` | フォーム送信完了ページ |
| プライバシーポリシー | `/privacy/` | 情報セキュリティ・プライバシーポリシー |
| RELEASE一覧 | `/release/` | カテゴリ＋年フィルター付きリリース一覧 |
| RELEASE詳細（consumer） | `/release/consumer/` | コンシューマーゲームサントラ詳細ページ群 |
| RELEASE詳細（arcade） | `/release/arcade/` | アーケードゲームサントラ詳細ページ群 |
| RELEASE詳細（pachinko） | `/release/pachinko/` | パチスロ系サントラ詳細ページ群 |

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

- 背景色: `#444`
- ロゴ: `logo-w.svg`（白ロゴ）を使用
- ロゴサイズ: PC 2.2vw / SP 20px
- コピーライト表記: `© SEGA MUSIC INC. All Rights Reserved.`（年号なし）

### TOPページ MOVEアニメーション

- **MOVE**（`.hero .text-highlight`）は初期状態で非表示（`opacity: 0`）
- **2.8秒後**: フェードイン＋スライドアップで文字が出現
- **3.6秒後**: 青背景がスライドイン、文字が白に変化
- 他のテキスト（SOUNDS / THAT / YOU.）は通常のrevealアニメーション

### COMPANYページ 装飾スクロール

- **装飾テキスト**: "SOUNDS THAT MOVE YOU." を無限スクロール
- **スクロール速度**: 75px/秒（`ticker.js`内で統合管理）
- **配置**: `.company-mission`セクション内に配置（PC: 50%、SP: 48vw）
- **スタイル**: `opacity: 0.1`、フォントサイズ13.24vw（PC）/ 62px（SP）

### 下層ページ共通仕様

- **セクションタイトル**: 英語＋日本語を縦並びで表示
  - PC: 英語 1vw / 日本語 1.8vw
  - SP: 英語 13px / 日本語 11px
- **コンテンツ幅**: PC 10vw左右padding（min-width: 1200px）/ SP 100%（padding: 40px 20px）
- **SP改行**: `.br-sp`クラスでSP専用改行を実装
- **text-highlightアニメーション**: 下層ページ遷移時に初期状態を`opacity: 0`で非表示、アニメーションで表示

### JavaScriptリファクタリング（2026-03-24）

- **ticker.js統合**: `mission-ticker.js`を`ticker.js`に統合し、汎用的な`createTicker`関数で両方のティッカーを管理
- **verb-rotator.js改善**: 設定値を`CONFIG`オブジェクトに集約、マジックナンバーを定数化
- **W3C準拠対応**:
  - 装飾SVGに`aria-hidden="true"`と`focusable="false"`を追加
  - フォーム要素に`id`/`for`/`name`/`required`属性を追加
  - HTML5バリデーション・WCAG 2.1レベルAA準拠

### アセット管理

- **アイコン命名規則**: Publishing pageアイコンをわかりやすい名前に変更
  - `icon-tv-cm-movie.png` - TV・CM・映画
  - `icon-game-app.png` - ゲーム・アプリ
  - `icon-streaming.png` - 配信・ストリーミング
  - `icon-store-bgm.png` - 店舗・施設BGM
  - `icon-event-concert.png` - イベント・コンサート
  - `icon-merchandise.png` - 商品化・グッズ

### UI/UX調整（2026-03-25）

- **外部リンクアイコン**: フッターの外部リンク（コンプライアンス/リスク管理、ウェブアクセシビリティ方針）に8x8pxの外部リンクSVGアイコンを追加
  - `margin-left: 8px`、`vertical-align: -0.1em`で中央配置
- **コピーライト表記**: 全ページで`© SEGA MUSIC Inc.`に統一（"Inc."を小文字に変更）
  - TOPページの`.copyright span`から`text-transform: uppercase`を削除
- **モバイルレイアウト調整**:
  - フッターリンクをSPで縦積み表示（`flex-direction: column`、`gap: 12px`）
  - コピーライトをSPでも表示（画面右下、ニューステロップの上、`bottom: 60px`）
- **ハンバーガーメニュー**: モバイルナビのスライドイン遅延を調整
  - News: 0.05s / Works: 0.1s / Music Publishing: 0.15s / Company: 0.2s / Store: 0.25s
  - `:nth-child()`セレクタをclose button考慮して修正（2番目から開始）
- **ナビゲーション**: RELEASEリンクを全ページから削除（PC/SPナビ両方）
- **ページ遷移アニメーション**: PDFファイル（`.pdf`で終わるリンク）も遷移演出をスキップするように追加

### RELEASEページ 大幅リニューアル（2026-04-14）

- **レイアウト変更**: 2カラム構成（PCサイドバー + メインコンテンツ）
  - `.release-layout`: `grid-template-columns: 13vw 1fr; gap: 0 3.3vw; margin-top: -3.97vw`
  - `.release-sidebar`: PCでsticky（`top: 5.5vw`）、SPでsticky（`top: 56px`）
- **フィルターUI**: ピル型ボタン（`border-radius: 99px`）
  - カテゴリ: ALL / consumer / arcade / pachinko / maimai など
  - YEARフィルター: `#yearBar`、ALL + 各年のピル
  - アクティブ状態: `background: var(--blue)` + 白テキスト（カテゴリ・年とも）
  - PCでは縦積み（`flex-direction: column`）、SPでは横スクロール（`flex-direction: row`）
- **カード表示**: 4カラムグリッド（`.release-grid`）
  - ロールオーバー: `rgba(26, 85, 227, 0.82)` の青オーバーレイ
  - SP: タイトルフォントサイズ 13px
- **フィルター切替アニメーション**: staggered fadeUp（18ms間隔、最大300ms上限）
  - `requestAnimationFrame` × 2でCSS transitionを確実にトリガー
- **bfcache対応**: `pageshow` イベントでカードの `opacity: 0` / `translateY` をリセット
- **RELEASES配列のリンク管理**:
  - `url: ""` → クリック不可div（`.release-card--no-link`）
  - `local: true` → 内部リンク（`target`なし）
  - `url: "https://..."` → 外部リンク（`target="_blank"`）
- **詳細ページ作成済み**（wave-master.comソースから）:
  - `consumer/gosega.html` — GO SEGA（4disc / 108tracks）
  - `consumer/puyopop.html` — ぷよぷよパズルポップ（39tracks、YouTube: pBN_QzlI1I8）
  - `consumer/br.html` — BURNING RANGERS（既存）
  - `arcade/src.html` — SEGA RALLY CHAMPIONSHIP（2disc / 43tracks、YouTube: 3wQ_BDjZIAc, kHHcW7Ff_SY）
  - `arcade/swdc.html` — SEGA World Drivers Championship（37tracks）
  - `arcade/astrocitymini.html` — ASTRO CITY mini（15tracks、YouTube: sV6utJsZ9GQ）
  - `pachinko/du3.html` — DISC UP ULTRAREMIX（34tracks）
  - `pachinko/du25th.html` — DISC UP 25th Anniversary Collection（既存）

### 詳細ページ（rd-*）共通仕様

- **構成**: `rd-layout`（ジャケット + info）、`rd-youtube`（任意）、`rd-tracklist`、`article__back`
- **YouTube埋め込み**: ソースにYouTubeがある場合は `rd-youtube` セクションを追加
  - `rd-youtube__heading` は左寄せ、"LISTEN"
  - `rd-youtube__video-wrap`: `aspect-ratio: 16/9`、中央寄せ（`align-items: center; width: 100%`）
- **トラックリスト**: `rd-tracklist__credit` でコンポーザークレジットを表示（`font-size: 0.86vw; color: var(--muted)`）
- **breadcrumb**: パンくずリストで階層を表示（HOME > RELEASE > タイトル）

### ページ遷移アニメーション修正（2026-04-14）

- **bfcache（戻るボタン）バグ修正**: `transitions.js`の`handlePopState()`を空にし、`pageshow`イベントで両オーバーレイをリセット
  - `page-transition`オーバーレイ: `classList.remove('is-active', 'is-entering')`
  - `page-enter-overlay`: `style.display = 'none'`

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
