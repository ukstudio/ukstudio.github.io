---
aliases:
- /2007/11/18/ruby_amazon
date: "2007-11-18"
title: Ruby/Amazonライブラリ
---
URL:<a href="http://www.caliban.org/ruby/ruby-amazon.shtml">http://www.caliban.org/ruby/ruby-amazon.shtml</a>

ちょっとAWSを使うプログラムを書こうと思ったので、準備としてRuby/Amazonライブラリを試してみた。
<h2>Ruby/Amazonのインストール</h2>
<ol>
<li>ライブラリのアーカイブを<a href="http://www.caliban.org/ruby/ruby-amazon.shtml#files">ダウンロード</a></li>
<li>アーカイブを解凍</li>
<li>解凍してできたディレクトリにsetup.rbがあるので、それを使用してインストール</li>
</ol>
<pre lang="bash">
% ruby setup.rb config
% ruby setup.rb setup
% ruby setup.rb install
</pre>
<h2>ISBN/ASINで検索</h2>
<h3>ソースコード</h3>
<pre lang="ruby">
#! ruby -Ku

require 'amazon/search'
include Amazon::Search

DEV_TOKEN = "****************"
ASSOCIATE_ID = "ukstudio0c-22"

request = Request.new(DEV_TOKEN, ASSOCIATE_ID, "jp")

# ASIN/ISBNで検索
res = request.asin_search("4274066428", LITE) # HEAVYを指定した場合、詳細な情報が得られる

# ヒット数
puts res.products.size #=> 1 ASINでの検索なので1件のみ該当

# ヒットした製品の情報
puts res.products[0]
</pre>
<h3>実行結果</h3>
<pre lang="bash">
asin             = "4274066428"
authors          = ["Dave Thomas", "Chad Fowler", "Andy Hunt", "田和 勝", "まつもと ゆきひろ"]
availability     = "通常24時間以内に発送"
catalog          = "Book"
image_url_large  = "http://ecx.images-amazon.com/images/I/4151YFZ27NL.jpg"
image_url_medium = "http://ecx.images-amazon.com/images/I/21QGW56WGCL.jpg"
image_url_small  = "http://ecx.images-amazon.com/images/I/11V7Q88BZ3L.jpg"
list_price       = "￥ 3,990"
manufacturer     = "オーム社"
our_price        = "￥ 3,990"
product_name     = "プログラミングRuby 第2版 言語編"
release_date     = "2006/08/26"
url              = "http://www.amazon.co.jp/gp/product/4274066428%3ftag=ukstudio0c-22%26link_code=xm2%26camp=2025%26dev-t=0GTT93KAWBX07WMKM002"
used_price       = "￥ 3,200"
</pre>
<h2>キーワード検索</h2>
<h3>ソースコード</h3>
Requestオブジェクトを作るところまでは同じなので省略。
<pre lang="ruby">
res = request.keyword_search("ruby", 'books', LITE) # booksはモードの指定。musicとか。

# ヒット数
puts res.products.size #=> 11/18日現在、10件ヒットした。なんか少ないな・・・

# ヒットした製品のタイトルを表示
res.products.each{|item|
  puts item.product_name
}
</pre>
<h3>実行結果</h3>
<pre lang="bash">
The Ruby (ザ・ルビー) 2007年 12月号 [雑誌]
Ruby on Rails入門―優しいRailsの育て方
たのしいRuby 第2版 Rubyではじめる気軽なプログラミング
プログラミングRuby 第2版 言語編
プログラミングRuby 第2版 ライブラリ編
Rubyではじめるゲームプログラミング―人気の国産言語で、誰でも簡単にゲームが作れる! (I/O BOOKS)
基礎Ruby on Rails (IMPRESS KISO SERIES)
Rubyレシピブック 第2版 268の技
はじめよう Ruby on Rails
WEB+DB PRESS Vol.38
</pre>
<h3>追記(07-11-19)</h3>
キーワード検索で10件しかヒットしなかったのはkeyword_searchメソッドにALL_PAGESオプションを指定してなかったためでした。
<h3>キーワードがヒットしなかった場合</h3>
検索したキーワードで何もヒットしなかった場合、例外が発生するみたいなので例外処理が必要。
<pre lang="bash">
/opt/local/lib/ruby/site_ruby/1.8/amazon/search.rb:1172:in `get_args': There are no exact matches for the search. (Amazon::Search::Request::SearchError)
</pre>