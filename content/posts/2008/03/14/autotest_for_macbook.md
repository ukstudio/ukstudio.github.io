---
aliases:
- /2008/03/14/autotest_for_macbook
date: "2008-03-14"
title: MacBookにRailsの自動テスト環境を構築した
---
なんかautotestが流行りつつある今日この頃ですが、みなさまいかがお過ごしでしょうか。とりあえず丁度うちの会社でも自動テストしようかーみたいな話がでてたので構築してみましたよ!

<h2>ZenTestのインストール</h2>
とりあえずは定番のZenTest(autotest)とRedGreen(結果の色付け)をインストールします。

<pre lang="bash">
$ sudo gem install ZenTest
$ sudo gem install RedGreen
</pre>

次にautotestの設定ファイルの作成。example_dot_autotest.rbのパスは人によって違うと思うので適当に読み替えてください。

<pre lang="bash">
cp /opt/local/lib/ruby/gems/1.8/gems/ZenTest-3.9.1/example_dot_autotest.rb ~/.autotest
</pre>

~/.autotestの15行目のコメントアウトを解除。

<pre lang="ruby">
require 'autotest/redgreen'
</pre>

RAILS_ROOTでautotestを実行。起動時に全部のテストを実行するのでちょっとだけ重くなるかもしれません。それ以降はテストファイルやモデル、コントローラファイルなどを修正する度に該当のテストが走ります。

<pre lang="bash">
$ cd RAILS_ROOT
$ autotest
</pre>

実行するテストはtest/unit、もしくはRailsにRSpecが入れてあればRspecのテストを実行します。

なんかspec_serverを立ち上げておくと処理が早くなるらしいですがよくわかってないです。まぁとりあえず設定しといて損はなさそうです。

<pre lang="bash">
$ vi spec/spec.opts # 最下行に --drb を追記。drbでテスト用サーバへ繋ぐようになります。
$ ruby script/spec_server
</pre>

テストの結果は成功なら緑色のバーが、失敗なら赤色のバーが表示されます。

<h2>結果通知用にGrowlとScreenの設定をする</h2>

これでも自動テストは走るので問題ないですが、結果を見るのがちょっと面倒ですね。ということでGrowlとScreenで結果が見えるようにしましょう。

screenの場合は<a href="http://kakutani.com/20070912.html#p02">角谷さんのエントリーを</a>見るといいと思います。基本的にそのまま~/.autotestにコピペするだけで問題ないはずです。

<pre lang="ruby">
require 'autotest/screen'   # コメントアウトを外す

Autotest::HOOKS.delete(:interrupt)
Autotest::Screen.statusline = %q[|%c %m/%d|%w %=]

class Autotest::Screen
  SCREEN_COLOR[:green] = 'gw'
  SCREEN_COLOR[:yellow] = 'yk'

  Autotest.add_hook :run_command do |at|
    message 'Running' if execute?
  end

  Autotest.add_hook :quit do |at|
    clear if execute?
  end

  Autotest.add_hook :ran_command do |at|
    return unless execute?
    results = [at.results].flatten.join("¥n")
    output = results.slice(/(¥d+)¥sexamples?,¥s*(¥d+)¥s.*failures?(?:,¥s*(¥d+)¥s.*pendings?)?/)
    if output
      ex,fail,pend = $~.captures.map {|e| e.to_i}
      if 0 < fail
        message "FAIL #{ex}ex, F:#{fail} ", :red
      elsif 0 < pend
        message "Pend #{ex}ex, F:#{fail} P:#{pend}", :yellow
      else
        message "All Green #{ex}ex", :green
      end
    end
  end
end
</pre>

この設定でscreenとautotestを起動しておくと、ステータスバーの右側にテストの結果が表示されます。

<img src="http://img.skitch.com/20080314-d6gq6bsmbbxh99ynx349bfcckf.jpg" alt="autotest"/>

これ貼ってから気づいたけど、Terminalから透けてみえる絵がなんかあれですなw

次にGlowlの設定ですが、Leopardではruby-growlのインストールが必要っぽいです。とりあえずmacportsからインストールしておきましょう。それとGrowlの設定でリモートを許可しておきましょう。

<pre lang="bash">
$ sudo port install ruby-glowl
</pre>

<img src="http://img.skitch.com/20080314-r92e97nip77qfj7u4p2a1ch8e6.jpg" alt="Growl"/>

Growlで結果を通知するにはgrowlnotifyのインストールが必要です。もしインストールしていなければ<a href="http://growl.info/">本家</a>からdmgファイルをDLし、その中にあるinstall.shを実行します。

<pre lang="bash">
$ cp -r /Volumes/Growl\ 1.1.2/Extras/growlnotify ~/tmp
$ cd ~/tmp/growlnotify
$ sudo ./install.sh
$ growlnotify -m "hoge" # growlの通知が表示されればインストール完了
</pre>

~/.autotestを修正し、glowlで結果が通知されるようにします。

<pre lang="ruby">
require 'autotest/glowl' # コメントアウトを解除
</pre>

これでテストが失敗したとき、失敗から成功になったときにGrowlが通知してくれます。Growlの見た目を変更しようと思ったけれど、個人的にscreenだけで十分だったので今回はナシ。

とりあえず自動テストはテストを書くのが楽しくなりますな。オススメ。