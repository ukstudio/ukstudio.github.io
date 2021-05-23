---
date: "2018-03-04T22:40:51+09:00"
title: イテレーション開発におけるゴールについて
---

<blockquote class="twitter-tweet" data-lang="en"><p lang="ja" dir="ltr">小さく回してゴールを修正しながら進むのがイテレーション開発だと僕は考えているので前提に含めていたんだけど、修正するのはゴールじゃなくて進め方だという派閥もある。(のでコミュニケーションミスが起きやすかった</p>&mdash; Takafumi ONAKA (@onk) <a href="https://twitter.com/onk/status/970262406189346816?ref_src=twsrc%5Etfw">March 4, 2018</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

「修正するのはゴールじゃなくて進め方だという派閥」と言うのをみて、そういう派閥もあるのか～と思って少し色々と考えてみた。個人的に勝手に考えているだけなので、onkさんが言っている派閥が自分と想像しているものと違う可能性はある。

最近はあまり聞かなくなった気もするけど、ウォーターフォール型の開発だと数ヶ月～数年の開発期間が終わって初めて動くソフトウェアを見ることになるので、顧客が想像していたものと違ったものがでてくる、かつもう取り返しがつかないという話があった。それを回避するために、定期的に動くソフトウェアを顧客に見せてフィードバックをもらいましょうねというのがイテレーション(イテレーティブな)開発のひとつの側面だったと記憶している。そういう前提から入っている身としては、修正するのはゴールじゃなくて進め方というのはちょっとびっくりしたのであった。

多分だけど、そういう派閥の人達は作るものとリリース日が決まっているなかで、そのリリース日までにどう作り上げるかというのが主題になっているのかなと思う。それは同じ作り手としては非常にわかる。

ゴールと一言に言っても人によって指しているものが違うのかもしれないが、自分としては最終的にデプロイされるサービス、プロダクトそのものを指すことが多い。その中にはサービスのコンセプト、ビジュアルデザイン、UI、アーキテクチャ、プロダクションコードなどもまるっと含まれるが、サービス開発の文脈でいうと、サービスのコンセプトからUIあたりの直にユーザーが触れるような部分にウェイトを置いている。

ユーザーに受け入れられないようなコンセプトのサービスを時間かけて作り上げるわけにもいかないし、ユーザーが使いこなせないようなUIのサービスを納品するわけにもいかない。そう考えると、個人的にはどう考えてもゴールは修正されるものだと思うんだよなぁ。。もちろん、プロセスの修正も大事ではある。

とは言え、すでに作るものが決まって動いているところに、唐突に「これはダメなんでやりなおしましょう！」みたいなのは中々難しいし、onkさんの言うコミュニケーションミスもそういう話なのかなーと思う。ゴールが決まっていると思っている人達にそこはゴールじゃない！とストレートに言うと反発されることもあるだろうし。(特にリリース日やスケジュールが別のところで既に決められてしまっている場合とか)

この辺りはチームや人の話になってくるので、それはそれで色々と思うところがあるのだが、何にせよ個人的にはゴールは修正するものということが言いたいのであった。