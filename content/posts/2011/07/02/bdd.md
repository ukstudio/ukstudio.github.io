---
aliases:
- /2011/07/02/bdd
date: "2011-07-02"
title: BDDについて自分なりにまとめてみた
---
BDDという言葉も割と人によって指すものが違うようなので「俺の中でのBDDはこうだよ」って内容のエントリ。別に絶対的なものでもないと思うので参考までに

## 結論から

とりあえず結論だけ知りたい人向けに。

* BDDにはふたつの種類がある
* 1. TDDの言い換えのBDD(開発寄り)
* 2. ATDD(受け入れテスト)でのBDD(ユーザ寄り)

## 振る舞い

BDDは振る舞い駆動開発と言われたりするように、テストという言葉のかわりに<strong>振る舞い</strong>という言葉を使う。日本語的には仕様と言うほうがわかりやすいかもしれない。多分、BDDのイメージが掴みにくいのはこの振る舞いという言葉にあると思う。と言うのも振る舞いと言うのは、人の立場よって変わるからだ。例えば、プログラマがあるクラスを実装している時に言う振る舞いはそのクラスのメソッドとかの仕様になる。逆にユーザレベルの人が言う振る舞いはアプリケーションの要件・動作を言うだろう。 つまり、BDDという言葉はTDDからATDDの両方にかかるので文脈によって指すものがかわってくる。この辺は<a href="http://twitter.com/#!/t_wada">@t_wada</a>さんの言う「誰のためのテストか」を考える方がわかりやすいだろう。

<div style="width:425px" id="__ss_7353562"> <strong style="display:block;margin:12px 0 4px"><a href="http://www.slideshare.net/t_wada/tddbc-fukuoka-day1" title="TDDBC Fukuoka Day1" target="_blank">TDDBC Fukuoka Day1</a></strong> <iframe src="http://www.slideshare.net/slideshow/embed_code/7353562?startSlide=24" width="425" height="355" frameborder="0" marginwidth="0" marginheight="0" scrolling="no"></iframe> <div style="padding:5px 0 12px"> View more <a href="http://www.slideshare.net/" target="_blank">presentations</a> from <a href="http://www.slideshare.net/t_wada" target="_blank">Takuto Wada</a> </div> </div>

## TDDの別名としてのBDD

TDDにかかるBDD、つまりプログラマの為のBDDについて説明する。そもそもBDDという言葉が生まれた背景にはTDDに対する誤解がある。いわゆる「TDDのテストはテストじゃないよ」ってやつ。その誤解を避けるために生まれたのがBDD。多分「誤解を避ける」というのもあまり適切な表現ではない。と言うのもこの表現だとTDDを実践していない人の誤解を避けるために生まれた印象をうける 実際はテストという言葉を使うことでTDDを実践する(しようとする)__プログラマ自身にもよくない影響がある。__例えばTDDの場合先にテストコードを書くので当然テストを書くときにテスト対象が存在しない。これは不自然だ。テスト対象がないことで、TDDに慣れていない人は「何をテストすればいいの?」と思うことも少なくない。

BDDではテストという言葉の変わりに__振る舞い__という言葉を使うと先程書いた。振る舞いという言葉を使うことで、テストという言葉から受ける違和感はなくなる。テスト対象が存在しなうちにテストを書くのは不自然だけど、なにかを実装する前に振る舞い(仕様)を決めるのは自然だ。 また、振る舞いに着目することでより良い設計ができるようになる。少なくとも僕はそう感じている。TDDでも先にテストコードを書くのでインターフェースに注意を向けることができるが、BDDの語彙を使うことでより実装と振る舞いを分離して考えられるからだと思う。

とは言え結局のところやることはTDDと変わらない。はたから見たら、TDDをしているのかBDDをしているのか区別つかないだろう。なのでここでひとつめの結論__BDDはTDDの言い換え__になる。もちろん使う言葉が違いプログラマに与える影響が違う以上、厳密にはTDDとBDDは違うものなのかもしれない。けれど個人的にはそこまでTDDとBDDの違いに厳密性を求めてないし、求める必要もないと思うので、__プログラマ視点で見たときはほぼ同じ__という結論。

## ATDDとBDD

ATDDはAcceptance Test Driven Developmentの略でAcceptance Testというのは受け入れテストのこと。TDDのよりレイヤの高いものだと思えばいい。<a href="http://t.co/MKI3PST">Growing Object-Oriented Software, Guided by Tes</a>tの画像がわかりやすいので拝借。

<img src="/images/2011-07-02-growing-circle.png">

ATDDのひとつのサイクルでひとつの受け入れテストが完了し、それを繰り返すことでアプリケーションを実装していく。__受け入れテストはどちらかと言えば顧客のためのテスト。__受け入れという名の通り、このテストがパスすればその機能は実装が完了したとわかり、顧客の立場からすると要件が正しく実装されていること、進捗が管理しやすいなどの利点がある。

これとBDDに何が関係するのかと言うと、上で書いたように<strong>BDDの振る舞いはユーザレベルで見たときはアプリケーションの要件・動作を指す。</strong>顧客は大抵の場合、ユーザレベルなのでこの場合での振る舞いは受け入れ条件となり得る。つまり、ATDDをBDDでやることは可能と言える。ATDDをBDDでやるメリットは、BDDでは振る舞いの言葉を使うのでより顧客・ユーザに近い言葉で受け入れテストを記述できるようになる(例:<a href="http://cukes.info/">cucumber</a>の日本語での記述とか)。

これがふたつめの結論の<strong>ATDDでのBDD</strong>。

ちなみにATDD自体も結構あやふやなやつで、何をテストするのかは受け入れ基準による。もし受け入れ基準が「とあるクラスに正しくメソッドが実装されていること」だとしたらどうなるか。これはややこしいけれど、ATDDのサイクルとTDDのサイクルの距離が大分近くなると思う。場合によってはTDDで書いたテストコードがそのまま受け入れ基準となり得ることもある。それでもTDDとATDDは目的が違うのでその辺は意識した方がいい。

## Outside-In

BDDは上で説明したように、コンテキストで「振る舞い」が指すものが変わる。とは言え、根源となる思想はあってそのひとつがOutside-In。Outside-Inと言うのは__外側から見た振る舞いを軸に内部を作りこんでいく__ということ。人によって見る位置が違うので「外側」がどこか変わってくる。プログラマならメソッドやクラスの外だし、ユーザならアプリケーションの外側。なので、BDDがなにかを一言で答えるとしたら__振る舞いに着目して、それを軸に内側を作りこんでいくこと__になるのかなぁ。

## 再び結論

長々と書いて逆に混乱してきた人もいるかもしれないのでさくっとまとめ。

* 結局は'誰が'、'誰の為に'、'何を'テストしているのかが重要である
* TDDはDeveloper Testing。つまり僕達のためのもの。
* ATDDはCustomer Testing。つまり顧客のためのもの。
* BDDは振る舞いに着目する。状況・目的によって「振る舞い」が指すものが変わる。それに合わせて語彙も変わる。

なんちゃらDDはいっぱいあって、しかもそれらが色々な軸で交わったりしてすごいややこしい。TDD/BDD/ATDDと誰かが言った時は、大抵の場合暗黙のコンテキストがあるのでそこに気をつけよう。わからなかったら聞こう。__「それは誰の為のテストで何をテストしているんですか?」__

個人的にはBDDという言葉を使わないのは誰の為のテストかわかりづらいから。なので大体の場合はTDDとATDDのふたつを使うことが多い。BDDが僕達にくれたものは大きいけれど、その知見はTDD/ATDDに十分反映されている(もしくはされつつある)ので、__普通にTDD/ATDDと言えばいいじゃないか__って意見。BDDって言葉を使うとややこしくなるので僕は使いません。

おまえの言うBDDは間違ってる!!という人は突っ込みいただけるとありがたいです。

## See also
* <a href="http://d.hatena.ne.jp/digitalsoul/20090819/1250686015">BDDの導入 - Dan North - Digital Romanticism</a>
* <a href="http://d.hatena.ne.jp/digitalsoul/20090928/1254147487">ストーリーについて - Dan North - Digital Romanticism</a>
* <a href="http://www.slideshare.net/haru01/xpcustomertesting">XP Customer Testing</a>