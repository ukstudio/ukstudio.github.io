---
title: HT-03AのGmailアプリからメールを送るとmultipart/alternativeになる
date: 2009-07-16
aliases:
- /2009/07/16/android_alternative
---
先日もエントリを書いたように、今現在HT-03Aを使っているのですが、ひとつ問題が。

まぁタイトルのまんまなのですが、標準のGmailアプリからメールを送るとヘッダがmultipart/alternativeになってしまいます。もちろんWebからだとtext/plainで送れます。multipart/alternativeについては詳しくは書きませんが、多分大抵の場合、HTMLメールとして受け取ることになると思います。

<img src="http://img.skitch.com/20090716-e9kguk8wruw5t8p4a45qcruark.jpg" alt="alternative"/>

それの何が問題かと言うと、携帯に送った場合それがデコメとして認識されて受け取った側が返信する際にデコメ作成画面になってしまうということです。

要はメールを受けとる > 返信ボタンを押す > デコメ作成画面になる > 一々テキストメールに変更しなければならないといった感じに手間が増えてしまうのです。

全部の携帯がそうかはわかりませんが、auのある携帯ではそういう動作になるようです(型番は忘れた)

とりあえず、仕方がないので今のところは、Gmailアプリで受信(通知がくる) > メーラー(標準でついてくるGmail以外のメールを受信するやつ)でGmailを再度受信 > そっちで返信 とやるとなんとかtext/plainで送れます。非常に面倒です。他になにかいい方法があれば教えてください。

ちなみに、この件でDoCoMoのサポセンに問合せたところ、「標準のGmailアプリではテキストメールしか送れません。細かいことはGmailのヘルプを参照してください。」と言われてしまいどうしたもんかなーといったところです。

もし、誰か標準のGmailアプリでtext/plainでメールを送る方法をご存知でしたら教えてもらえるとありがたいです。