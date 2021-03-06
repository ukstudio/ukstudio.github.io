---
aliases:
- /2008/11/26/rails_22_i18n
date: "2008-11-26"
title: Rails2.2のi18n(国際化)を簡単に試してみた
---
11月21日にRails2.2が正式リリースされた。 RCなどでチェックしてた人は既に知っているかもしれないけど、2.2からデフォルトでi18n(国際化)対応がされている。

ちなみにi18nというのはinternationalizationの頭と後ろのiとn、文字数が18文字というところから来てるらしい。

とりあえず、まずはアプリの作成。

<pre lang="bash">
$ rails i18n_demo
</pre>

作成されたファイル群の中にconfig/locales/en.ymlというファイルが出来ていると思うけど、これが翻訳ファイルになる。今回は英語と日本語を用意しようと思うので、en.ymlをコピーしてja.ymlを作成する。

<pre lang="bash">
$ cp config/locales/en.yml config/locales/ja.yml
</pre>

翻訳ファイルを修正しようにも、そもそもアプリケーションが出来ていないので、scaffoldで簡単に作ってしまおう。

<pre lang="bash">
$ ruby script/generate scaffold entry title:string body:text
$ rake db:migrate
</pre>

とりあえずは適当にサイトタイトル的なものでも作ってみよう。翻訳ファイルに関しては元々あった内容は削除してしまっていい。

<pre lang="ruby">
# config/locales/ja.yml
ja:
  site_title: サイトタイトル
</pre>

一応英語も。

<pre lang="ruby">
# config/locales/en.yml
en:
  site_title: SiteTitle
</pre>

Viewの修正。

<pre lang="ruby">
# app/views/entries/index.html.erb
<h1><%= I18n.t :site_title %></h1>
</pre>

この状態でサーバーを起動し、http://localhost:3000/entriesにアクセスしてみる。「SiteTitle」という文字が表示されているはずだ。この状態だとまだ言語がデフォルトの英語の設定になっている。多分、ブラウザの言語設定とかは見てなさげ?。ちょっとソースを見てないのでまだ未確認。もしかしたら、リクエストのヘッダーを見て言語を決める部分は自分で実装しなきゃいけないのかもしれない。

なんにせよ、日本語で表示したい場合は以下のようにする。

<pre lang="ruby">
# config/environment.rb
# 最下行に追加
I18n.default_locale = "ja"
</pre>

これで再度アクセスすれば「サイトタイトル」と表示されているはずだ。

次にGETパラメータで言語が切り替わるようにしてみよう。

<pre lang="ruby">
# app/controllers/application.rb

before_filter :set_locale
def set_locale
  I18n.locale = params[:locale]
end
</pre>

これでhttp://localhost:3000/entries?locale=enで「SiteTitle」と表示されているはずだ。

次にモデルの日本語化をしてみよう。まずはエラーメッセージを出すためにバリデーションを追加する。

<pre lang="ruby">
# app/model/entry.rb
class Entry < ActiveRecord::Base
  validates_presence_of :title, :body
end
</pre>

http://localhost:3000/entry/newでフォームに何も入力せず送信すればエラーがでるので英語で表示されていることを確認する。

<a href="http://ukstudio.jp/wp-content/uploads/2008/11/082611_i18n_en_error.jpg"><img src="http://ukstudio.jp/wp-content/uploads/2008/11/082611_i18n_en_error.jpg" alt="" title="082611_i18n_en_error" width="300" height="281" class="alignnone size-medium wp-image-257" /></a>

普通のバリデーションのエラーとは違うエラーがでているけど、これは翻訳ファイルをちゃんと書いてないからでているエラー。英語の方はちょっと面倒なので無視するが、とりあえず日本語化をすすめる。

<pre lang="ruby">
#config/locales/ja.yml
ja:
  site_title: サイトタイトル
    activerecord:
      errors:
        template:
          header: "{{model}}でエラーが発生しました。"
          body:   以下のエラー内容を確認してください。
        messages:
          blank:  が空白です。
      models:
        entry: エントリー
      attributes:
        entry:
          title: タイトル
          body: 本文
</pre>

以上の修正をして、もう一度エラーを出してみるとエラーが日本語に変わっているはずだ。翻訳ファイルのどの部分がどの部分に対応してるかは雰囲気でわかると思う。

<a href="http://ukstudio.jp/wp-content/uploads/2008/11/081126_i18n_ja_error.jpg"><img src="http://ukstudio.jp/wp-content/uploads/2008/11/081126_i18n_ja_error.jpg" alt="" title="081126_i18n_ja_error" width="300" height="225" class="alignnone size-medium wp-image-258" /></a>

今回は必要な部分だけ翻訳したけど、もうちょっとちゃんとした翻訳ファイルが必要なら<a href="http://i18n-demo.phusion.nl/pages/setup">Railsをローカライズする</a>も参考にするといいと思う。

諸々めんどくせー!って人は松田さんの<a href="http://blog.dio.jp/2008/11/22/japanizing-rails-2-2-by-i18n-generators">Rails 2.2の I18nによる日本語化を最も簡単に行う方法</a>へどうぞ。gemで一発です。

まだ2.2はリリースされたばかりで、i18nまわりの日本語の情報はあまり多くはないと思うけど、そこまで複雑な仕組みでもないし、翻訳ファイルに関して言えば基本的な部分(ActiveRecordとか)は使い回しができるので手間もそこまで大きくはないと思う。ブラウザの言語設定での判断もそのうちプラグインがでてくるんじゃないかと思っている。

「国際化とか必要ないよー」の人も、バリデーションのエラーを日本語化するのにgettextを入れる必要がなくなったりとこれでかなりラクになるんじゃなかろうか。