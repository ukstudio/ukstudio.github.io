---
aliases:
- /2008/01/11/ruby_tumblr_getimages
date: "2008-01-11"
title: Tumblrの全画像を取得するRubyスクリプトを書いた・・・けど
---
今じゃほとんどTumblrは使ってないんだけど、なんとなく画像を取得するスクリプトを書いてみた。iPod touchに放り込んでみようかなとか思ったのよ。

とりあえずコード。
<pre lang="ruby">
require 'open-uri'
require 'rexml/document'
require 'FileUtils'

res = open(url)
doc = REXML::Document.new(res.read)
total = REXML::XPath.first(doc, "/tumblr/posts").attributes['total'].to_i

0.step(total, 50){|n|
  image_list = []
  res = open(url + "&start=#{n}")
  doc = REXML::Document.new(res.read)

  data = REXML::XPath.match(doc, "/tumblr/posts/post")
  data.each{|i| image_list < < i.elements['photo-url'].text }

  image_list.each{|image|
    tempfile = open(image)
    FileUtils.cp(tempfile.path, image.split(/\//).last)
  }
}
</pre>
ちなみにXPathはどんなものかなんとなくは知っていたけれど使うのは初めて。

処理内容としてはTumblr APIを使って50件ずつ画像のURLを取得して、1個ずつカレントディレクトリにコピーすると言う至極単純な方法を選んだ。人によっては1000単位で画像があるだろうから(ちなみにオレは1000ちょいだった)かなり時間がかかると思う。

1つよくわからない現象が起きていて、とある画像を取得するタイミングで必ずエラーが発生する。どの画像かまでは調べてないけど、いつも同じ画像なのは確か。

</pre><pre lang="bash">
/opt/local/lib/ruby/1.8/FileUtils.rb:1407:in `fu_each_src_dest0': undefined method `to_str' for nil:NilClass (NoMethodError)
        from /opt/local/lib/ruby/1.8/FileUtils.rb:1393:in `fu_each_src_dest'
        from /opt/local/lib/ruby/1.8/FileUtils.rb:382:in `cp'
        from tumblr_getimages.rb:19
        from tumblr_getimages.rb:17:in `each'
        from tumblr_getimages.rb:17
        from tumblr_getimages.rb:10:in `step'
        from tumblr_getimages.rb:10
</pre>

とりあえず、openで取得したtempfileとtempfile#pathをpで表示してみた。以下がその問題が起きる部分。なぜにStringIO・・・?
<pre lang="bash">
#<file :/var/folders/ni/niHXwO9-GoO0yPJpz3WMm++++TI/-Tmp-/open-uri.1153.4>
"/var/folders/ni/niHXwO9-GoO0yPJpz3WMm++++TI/-Tmp-/open-uri.1153.4"
#</file><file :/var/folders/ni/niHXwO9-GoO0yPJpz3WMm++++TI/-Tmp-/open-uri.1153.5>
"/var/folders/ni/niHXwO9-GoO0yPJpz3WMm++++TI/-Tmp-/open-uri.1153.5"
#<stringio :0x5c4af4>
nil
</stringio></file></pre>

無理矢理な対処としてはコピーの処理の時にオブジェクトのクラスを調べて、StringIOを回避すればとりあえずは何とかなる。そのかわり、その画像はローカルに保存されないけれど。

<pre lang="ruby">
  FileUtils.cp(tempfile.path, image.split(/\//).last) if tempfile.kind_of?(Tempfile)
</pre>

ちなみに1000件も取得するのが途中で面倒になってしまったので最後まで取得できるかまでは試してない。一応100件ぐらいは取得できたけど。

tumblrのIDとか取得の開始地点、1回で取得する件数とかそのまま直書きしちゃってるけど、コマンドラインの引数で与えるようにすればそれなりに使い勝手がよくなるかもしれない。

本当はページ番号と1ページごとの件数を与えれば、そのページの画像を取得するようにするつもりだったんだけどね。他にもテキストとかがたんぶらってあったりすると画像の数が不確定で、そこらへんどううまく処理するかとか考えると結構時間かかりそうだったからやめた。

<h2>追記: 08/01/11 6:13</h2>
エラーが発生する画像を特定した。
<a href="http://data.tumblr.com/14065003_500.jpg">http://data.tumblr.com/14065003_500.jpg</a>

パっと見、普通の画像なんだけどな。試しにirbから取得してみる。
<pre lang="ruby">
>> require 'open-uri'
=> true
>> tempfile = open("http://data.tumblr.com/14065003_500.jpg")
=> #<stringio :0x3d4384>
</stringio></pre>
やっぱり、StringIOオブジェクトだ・・・なんでー?

<h2>追記: 08/01/11 10:25</h2>
ちょっとググってみたらruby-listの過去ログが引っかかった。

<a href="http://blade.nagaokaut.ac.jp/cgi-bin/scat.rb/ruby/ruby-list/40937">Re: multipartフォームから受け取ったオブジェクトにstatメソッドでエラー</a>

上のリンクはcgi.rbの話だけど、open-uriでもどうやら10kb未満の画像だとTempfileではなく、StringIOになる模様。ちなみに該当の画像は8kbでした。こやつめ、ハハハ。

<h2>追記 08/01/12 1:27</h2>
コードを修正しました。
<a href="http://uk-studio.net/2008/01/12/ruby_tumblr_getimages_2nd/">Tumblrの全画像を取得するRubyスクリプト改</a>