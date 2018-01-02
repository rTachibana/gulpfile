# WebApp開発用共通設定  
1. 作った経緯
1. 主な機能
1. package.json
<!-- 1. gulpfile.ts -->

---
## 作った経緯
ようやくwebアプリの開発に携われると思い、モダンなAppを作ってやるぜと意気込んでいたところ
「各ブラウザの挙動、どのバージョンでベンダープレフィックスが必要かがわからない」  
などという言い訳でモダンな書き方がを否定されたので、諸悪の根源たるベンダープレフィックスを自動化しました。
あと画像圧縮もね。
どの環境であっても、このあたりは使えるかと思います。

---
## 主な機能

<!-- ### sass/scss から cssへのコンパイル
`gulp css`

sass/scssをlib-sassでcssにコンパイルし、
postCSSを介してベンダープレフィックスやmediaQueryの最適化を行います。 -->
### jpg,pngの圧縮
`gulp img`
`./source/img/`下に存在するjpg,pngの画像を圧縮します。
gifやsvgにも対応できますが現状では処理を入れていません。
圧縮前の画像は、`./`の_bkフォルダ内に
年月日時分秒/ファイル の構成でバックアップされます。

---
## package.json
中身を見ればわかりますがこのへんが `--save-dev` で入っています。
1. npm
1. gulp
1. gulp-plumber
1. gulp-postcss
1. gulp-rename
1. gulp-sass
1. gulp-sourcemaps
1. typescript-require
1. gulp-imagemin
1. imagemin-mozjpeg
1. imagemin-pngquant

**typescript-require は gulpfile.js を直接編集するのであれば必要ありません。**

<!-- ---
## gulpfile.ts -->
