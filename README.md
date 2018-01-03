# WebApp開発用共通設定  
1. 作った経緯
1. 導入の仕方
1. 主な機能
1. package.json
<!-- 1. gulpfile.ts -->

---
## 作った経緯
ようやくwebアプリの開発に携われると思い、モダンなAppを作ってやるぜと意気込んでいたところ  
「各ブラウザの各バージョンでどのベンダープレフィックスが必要かがわからない」  
などという戯言からモダンな書き方を否定されたので、諸悪の根源たるベンダープレフィックスを自動化しました。あと画像圧縮もね。  
どの環境であっても、このあたりは使えるかと思います。

---
## 導入の仕方
node.jsが入っていれば、適当なディレクトリにコピーして `npm i` のコマンドを叩いたら終わりです。  

---
## 主な機能

### sass/scss から cssへのコンパイル
`gulp css`

source/sass(scss)/をcssにコンパイルします。デフォルトではscssを使用します。  
コンパイル後にpostCSSを介してベンダープレフィックスやメディアクエリの最適化を行います。  
最適化されたファイルは `./publish/css/` に出力されます。
### jpg,png,gif,svgの圧縮
`gulp img`
`./source/img/` 下に存在するjpg,pngの画像を圧縮します。  
デフォルトでは80%のクオリティを維持するようになっています。  
圧縮前の画像は、 `./_bk/YYYYMMDDHH24MI/ファイル` の構成でバックアップされます。

---
## package.json
中身を見ればわかりますがこのへんが `--save-dev` で入っています。

gulpfileでconstするやつ
1. gulp
1. gulp-plumber
1. gulp-postcss
1. gulp-rename
1. gulp-sass
1. gulp-sourcemaps
1. gulp-imagemin
1. imagemin-mozjpeg
1. imagemin-pngquant

constしなくていいやつ
1. npm
1. autoprefixer
1. css-mqpacker
1. data-utils
1. typescript-require

**typescript-require は gulpfile.js を直接編集するのであれば必要ありません。**

## Todo
1. [ ] gulpfileの調整なしでsass,scssの両コンパイルに対応 
1. [ ] 画像圧縮にバッファを使用する用に改修
1. [ ] gulpfile.tsの調整