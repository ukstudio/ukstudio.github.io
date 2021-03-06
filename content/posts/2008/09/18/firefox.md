---
aliases:
- /2008/09/18/firefox
date: "2008-09-18"
title: MacでFirefoxのプロファイルの使い分けと別バージョンの同時起動をする
---
Firefoxのプロファイルの使い分け(普段用/開発用)と別バージョン(2.0と3.1)の同時起動がしたかったのでちょっと設定してみた。

<h2>プロファイルの作成</h2>
まずは使い分けるためのプロファイルを作成する。今回作成したのは以下の3つ。
<ul>
<li>Firefox3.1</li>
<li>Firefox3.1_development</li>
<li>Firefox2.0</li>
</ul>

プロファイルの作成の仕方はTerminalから-Pオプションを付けて、Firefoxを起動させればいい。

<pre lang="bash">
$ /Applications/Firefox.app/Contents/MacOS/firefox -P
</pre>

プロファイルマネージャーが開くのでそこで「新しいプロファイルを作成」を選び、わかりやすいように名前をつける。

<h2>起動コマンドの作成</h2>
プロファイルを指定して起動させるには-P "プロファイル名"のオプションを付ける必要がある。毎回Terminalで指定して起動させるのも手間なので、起動コマンド用に3つ程ファイルを作成する。(後でapp化する)

ちなみにこんなことしなくても、複数のプロファイルがあれば起動時に使用するプロファイルを聞かれるので必要ない人は別にしなくても大丈夫。

<h3>Firefox3.1普段用</h3>
<pre lang="shell">
#!/bin/sh

/Applications/Shiretoko.app/Contents/MacOS/firefox -P Firefox3.1 &
exit 0
</pre>

<h3>Firefox3.1開発用</h3>
<pre lang="shell">
#!/bin/sh

/Applications/Shiretoko.app/Contents/MacOS/firefox -P Firefox3.1_development &
exit 0
</pre>

<h3>Firefox2.0</h3>
<pre lang="shell">
#!/bin/sh

/Applications/Firefox.app/Contents/MacOS/firefox -P Firefox2.0 -no-remote &
exit 0
</pre>

Firefox2.0のにだけ、-no-remoteオプションが付いているのは、同時起動を想定している為。別のバージョンを同時に起動する場合は、大抵は最初に起動しておく方は-no-remoteオプションは無し、後から起動する方に-no-remoteオプションを付けるようにしておけばいい。
<h2>app化</h2>
起動コマンドを作ったところで、せっかくなのでそれをapp化する。

app化に関しては<a href="http://www.pqrs.org/tekezo/macosx/doc/makeapp/">[Mac OS X] シェルスクリプトとかの CUI アプリケーションを Mac OS X 方式の .app にする方法 [簡単 5 ステップ]</a>を参照。

上記エントリのcore.shの部分をさっき作った起動コマンドスクリプトに置き換えればOK。Firefoxのアイコンは/Applications/Firefox.app/Contents/Resources/firefox.icnsを使用。Shiretokoのアイコンを使いたければ、/Applications/Shiretoko.app/(ry から取ってくればいい。

あとはapp化したのを直接クリックするなり、QuickSilverから呼びだすようにしておけばいい。

<table  border="0" cellpadding="5"><tr><td colspan="2"><a href="http://www.amazon.co.jp/Firefox-Hacks-Mozilla%E3%83%86%E3%82%AF%E3%83%8E%E3%83%AD%E3%82%B8%E5%BE%B9%E5%BA%95%E6%B4%BB%E7%94%A8%E3%83%86%E3%82%AF%E3%83%8B%E3%83%83%E3%82%AF-%E6%B1%9F%E6%9D%91-%E7%A7%80%E4%B9%8B/dp/487311375X%3FSubscriptionId%3D0G91FPYVW6ZGWBH4Y9G2%26tag%3D2004-05-22%26linkCode%3Dxm2%26camp%3D2025%26creative%3D165953%26creativeASIN%3D487311375X" target="_blank">Firefox 3 Hacks Mozillaテクノロジ徹底活用テクニック</a><img src='http://www.assoc-amazon.jp/e/ir?t=2004-05-22&l=ur2&o=9' width='1' height='1' border='0' alt='' /></td></tr><tr><td valign="top"><a href="http://www.amazon.co.jp/Firefox-Hacks-Mozilla%E3%83%86%E3%82%AF%E3%83%8E%E3%83%AD%E3%82%B8%E5%BE%B9%E5%BA%95%E6%B4%BB%E7%94%A8%E3%83%86%E3%82%AF%E3%83%8B%E3%83%83%E3%82%AF-%E6%B1%9F%E6%9D%91-%E7%A7%80%E4%B9%8B/dp/487311375X%3FSubscriptionId%3D0G91FPYVW6ZGWBH4Y9G2%26tag%3D2004-05-22%26linkCode%3Dxm2%26camp%3D2025%26creative%3D165953%26creativeASIN%3D487311375X" target="_blank"><img src="http://ecx.images-amazon.com/images/I/41664CPo6pL._SL160_.jpg" border="0" alt="Firefox 3 Hacks Mozillaテクノロジ徹底活用テクニック" /></a></td><td valign="top"><font size="-1">江村 秀之<br /><br />オライリージャパン  2008-08-27<br />売り上げランキング : 11045<br /><br /><br /><a href="http://www.amazon.co.jp/Firefox-Hacks-Mozilla%E3%83%86%E3%82%AF%E3%83%8E%E3%83%AD%E3%82%B8%E5%BE%B9%E5%BA%95%E6%B4%BB%E7%94%A8%E3%83%86%E3%82%AF%E3%83%8B%E3%83%83%E3%82%AF-%E6%B1%9F%E6%9D%91-%E7%A7%80%E4%B9%8B/dp/487311375X%3FSubscriptionId%3D0G91FPYVW6ZGWBH4Y9G2%26tag%3D2004-05-22%26linkCode%3Dxm2%26camp%3D2025%26creative%3D165953%26creativeASIN%3D487311375X" target="_blank">Amazonで詳しく見る</a></font><font size="-2"> by <a href="http://www.goodpic.com/mt/aws/index.html" >G-Tools</a></font></td></tr></table>