---
aliases:
- /2009/07/16/ht_03a_gtalk
date: "2009-07-16"
title: HT-03AでGtalkまわりでハマッったのでメモ
---
なんだか変なところではまるな、android。

Gtalkでチャットをする時は大体クライアント側でその人を登録すると思うんですが、連絡帳にすでにその人が登録してあった場合、マージ的なことはしてくれません。具体的な例で説明した方がわかりやすいと思うので具体例しめします。

<ol>
<li>連絡帳にすでにAさんが登録してあり、携帯アドレスとGmailアドレスが登録されています</li>
<li>その人とGtalkで会話したいのですが、連絡帳に登録してあっても一度フレンド登録しないといけなません</li>
<li>なのでフレンド登録する</li>
<li>無事会話できるが、連絡帳にAさんが2人存在してしまう(手動で登録したものと、Gtalkでフレンド登録したもの)</li>
<li>Gmailの連絡帳で、アカウントの統合ができるので統合する</li>
<li>Gtalkで会話できなくなる</li>
</ol>

で、じゃあ2つ登録されてしまったアカウントはどうしたらいいのかと言うと、<strong>Gtalkでフレンド登録された時に作られたアカウントの方に、最初から登録されていた方のデータをうつしてください。</strong>

ちなみに僕は一度Gtalkのフレンドリストが全部消えたのですが、多分連絡帳整理の際に一度連絡先を全て消したためだと思います。Gtalkのフレンドリストが消えないようにするには、上記のようにフレンド登録されたアカウントはそのまま残しておかないとダメなんだと思います。

ちなみに、僕が知ってる範囲ですが、フレンド登録されているアカウントかどうかの区別はチャットができるかできないかでしか判断できないと思います。具体的に言うと連絡帳をWebで見たときに「チャット」のリンクがあるかどうかぐらいだと思います。