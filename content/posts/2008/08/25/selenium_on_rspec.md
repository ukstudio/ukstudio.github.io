---
aliases:
- /2008/08/25/selenium_on_rspec
date: "2008-08-25"
title: Selenium on Rspecを軽く試してみた
---
とりあえずはScaffoldで簡単なアプリを作って、そのテストケースを作成、実行してみるところまで。そんな難しいことはしない。Railsは2.0.2を使用。2.1だとSeleniumにパッチを当てなきゃいけないので面倒。2.1の人は<a href="http://clearspace.openqa.org/docs/DOC-1072">Selenium on Rails patch for RoR 2.1</a>からパッチをあててください。

<h3>準備</h3>
まずは準備としてプラグインのインストールと、Scaffoldで簡単なアプリを作成する。
<pre lang="ruby">
$ rails _2.0.2_ blog
$ cd blog
$ ruby script/plugin install http://svn.openqa.org/svn/selenium-on-rails/selenium-on-rails
$ ruby script/generate scaffold entry title:string description:text
$ rake db:migrate
</pre>

ここまでできたらtest環境でサーバーを起動し、seleniumがちゃんと起動するか確認する。
<pre lang="ruby">
$ ruby script/server -e test
</pre>

そうすると下記エラーがでるが、sessionをデータベースであつかうように変更するととりあえず回避できる。原因はよくわかんない。
<blockquote>
CGI::Session::CookieStore::TamperedWithCookie in SeleniumController#support_file
</blockquote>

sessionをデータベースで扱うようにするにはconfig/environment.rbの47行目のコメントアウトをはずし、migrateする。
<pre lang="ruby">
config.action_controller.session_store = :active_record_store
</pre>

<pre lang="bash">
$ rake db:sessions:create
$ rake db:migrate
$ rake db:test:prepare
$ ruby script/server -e test
</pre>

ブラウザでhttp://localhost:3000/selenium/を表示して以下のような画面になればOK。

[caption id="attachment_171" align="alignnone" width="300" caption="Selenium初期画面"]<a href="http://ukstudio.jp/wp-content/uploads/2008/08/init-selenium.jpg"><img src="http://ukstudio.jp/wp-content/uploads/2008/08/init-selenium.jpg" alt="Selenium初期画面" title="Selenium初期画面" width="300" height="240" class="size-medium wp-image-171" /></a>[/caption]

<h3>テストケースの作成</h3>
次にテストケースを作成する。SeleniumはテストケースをHTMLで書くので手書きでも書けるけど、面倒なのでFirefoxのaddonの1つ、<a href="https://addons.mozilla.org/ja/firefox/addon/2079">Selenium IDE</a>を使用する。

Selenium IDEを使用すると、自分の操作を記録しそのままテストケースに変換できるので非常にラク。Selenium IDEを開き、右上の赤いボタンを押すと操作の記録が始まる。あとはテストしたい操作を手動で行なえばいい。

[caption id="attachment_177" align="aligncenter" width="242" caption="Selenium IDE"]<a href="http://ukstudio.jp/wp-content/uploads/2008/08/selenium-ide.jpg"><img src="http://ukstudio.jp/wp-content/uploads/2008/08/selenium-ide.jpg" alt="Selenium IDE" title="Selenium IDE" width="242" height="300" class="size-medium wp-image-177" /></a>[/caption]

今回のテストは「/entriesにアクセスし、そこから/entries/newに移動、タイトルと詳細を入力・保存し、/entries/showでタイトルが実際に表示されている」という内容にした。基本的には記録ボタンを押し、そのまま普通に入力していけばいい。最期の「タイトルが実際に表示されている」というものに関しては文言を範囲選択し、右クリックしverifyTextPresentを選択すればいい。

[caption id="attachment_180" align="aligncenter" width="251" caption="verityTextPresent"]<a href="http://ukstudio.jp/wp-content/uploads/2008/08/selenium-ide-veritytextpresent1.jpg"><img src="http://ukstudio.jp/wp-content/uploads/2008/08/selenium-ide-veritytextpresent1.jpg" alt="verityTextPresent" title="verityTextPresent" width="251" height="300" class="size-medium wp-image-180" /></a>[/caption]

ここまでできたらもう一度赤いボタンを押し、操作の記録を終了させる。最期に今の操作をテストケースとして出力させればいい。

出力方法はIDEのウィンドウにフォーカスを合わせて、ファイル > テストケースに名前をつけて保存。ここではファイル名はadd_entryとしといた。本来なら命名規約的なものもあった方がいいかもしれないけどここでは気にしないことにする。保存先はseleniumに読み込ませるため、RAILS_ROOT/test/selenium/以下に保存。

以上でテストケースの作成は完了。

<h3>テストの実行</h3>
もう一度http://localhost:3000/selenium/を開くと、今つくったテストケースが読み込まれているはず。あとはそのテストを右側のSelenium TestRunnerから実行すると、ブラウザがガチャガチャ動いてテストケースを実行してくれる。

今回はさっきのテストケースを作ってから何も変更を加えていないので、オールグリーンになるはず。

<h3>まとめ</h3>
かなり単純なケースだけど、大体テストケースの作成から実行までを試してみた。まぁとりあえず導入してみるには丁度いいレベルかなと。Selenium IDEを使用すればプログラマ/エンジニアじゃなくてもテスト書けそうだし。

あとは確かSelenium on Railsの機能にfixturesのロード機能とかあった気がするので、その辺りも調べていきたいと思う。