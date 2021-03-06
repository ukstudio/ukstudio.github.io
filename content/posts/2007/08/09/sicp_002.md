---
aliases:
- /2007/08/09/sicp_002
date: "2007-08-09"
title: SICP第1章 手続きによる抽象の構築(1)
---
<h2>1.1 プログラムの要素</h2>
<dl> <dt>基本式</dt> <dd>言語が関わる最も単純なものを表す</dd> <dt>組合せ法</dt> <dd>より単純なものから合成物を作る</dd> <dt>抽象化法</dt> <dd>合成物に名をつけ、単一のものとして扱う</dd> </dl>
<h3>1.1.1式</h3>
schemeでは前置記法を採用している。慣れるまでが大変かも？
<pre lang="scheme">
(+ 137 349)
;;137 + 349

(+ 21 35 12 7)
;;21 + 35 + 12 + 7

(+ (* 3 5) (- 10 6))
;;(3 * 5) + (10 - 6)</pre>
<h3>1.1.2 組合せの評価</h3>
defineをつかって値と名前の対応付け。いわゆる変数の宣言。

当たり前だけど、値と名前の対応付けを解釈系は記憶している。その記憶のことを(大域)環境という。大域があるなら局所もあるのかな。
<h2>1.1.3 組合せの評価</h2>
<ol> 組合せの評価
	<li>組合せの部分式を評価する</li>
	<li>最左部分式の値である手続き(演算子)を、残りの部分式の値である引数(被演算子)に作用させる</li>
</ol>
<blockquote> すなわち評価の規則は、本質的に再帰的(recursive)である</blockquote>
一般的評価規則の例外を特殊形式(special forms)と言い、defineもそのうちの１つ。
<h3>1.1.4 合成手続き</h3>
合成手続きの作り方。例として二乗を返す合成手続きをサンプルにあげている。基本手続きが変数ならこっちは関数みたいなもの?
<pre lang="scheme">
(define (square x) (* x x))</pre>
<h3>1.1.5 手続き作用の置き換えモデル</h3>
作用的順序と正規順序の違いについて。

<dl> <dt>作用的順序</dt> <dd>引数を評価し、作用させる</dd> <dt>正規的順序</dt> <dd>完全に展開し、簡約する</dd> </dl>通常lispは作用的順序の評価を行うらしい。正規順序は必要になるまで評価を行わないってことだと思うけど、遅延評価って意味なのかな。遅延評価を知らないから何とも言えないけど。
<h3>1.1.6 条件式と述語</h3>
特殊形式「cond」と「if」について。condの方は条件(述語)を複数指定できるけど、ifは1つのみ。他の言語でいうelseifがcondにはあるけど、(schemeの)ifにはelseしかない感じ。

論理演算も使えて、andやor、notがある。andとorは特殊形式で、notは通常の手続き。手続きっていう言葉の意味が自分の中でちょっと曖昧かもしれない。
<h3>問題1.1</h3>
手計算でやって、実際に動かして答え合わせをした。
<h3>問題1.2
<pre lang="scheme">
(/ (+ 5 4) (- 2 (- 3 (+ 6 (/ 4 5)))))(* 3 (- 6 2) (- 2 7)))
;;-37/150</pre>
</h3>
<h3>問題1.3</h3>
<pre lang="scheme">
(define (square x) (* x x))
(define (square_add x y) (+ (square x) (square y)))

(define (ex1_3 x y z)
  (if (&lt; x y)
    (cond ((&lt; x z) (square_add y z))
              (else (square_add x y)))
    (cond ((&lt; y z) (square_add x z))
              (else (square_add x y)))
  )
)</pre>
結構時間かけちゃった。あらかじめsquareとsquare_addを定義してなるべく()を減らす作戦。書き終わった後に気づいたんだけど、最初の分岐はifなのにその次はcondなんだよね。両方ifでいいのにね。
<h3>問題1.4</h3>
問題の意味がうまく汲み取れないけど、多分「Schemeはこんなこともできるんだぜ!すげーだろ!」ってことを言ってるんだと思う。
<pre lang="scheme">
((if (&gt; b 0) + -) a b))
a = 3,b = -2
(- 3 -2) -&gt; 5
a = 3, b = 2
(+ 3 2) -&gt; 5</pre>
引数の値によって手続きも変えられるってことかな。
<h3>問題1.5</h3>
これも結構理解できるまで時間がかかった。

作用的順序の場合(test 0 (p))で先に(p)を評価する。けれど(p)の評価した時の結果が(p)だから無限ループになる。
<pre lang="scheme">
(test 0 (p))
(p)を先に評価
(test 0 (p))
以降繰り返し...</pre>
正規順序の場合は、(p)を評価するのは後回しにするから無限ループにはならないで済む
<pre lang="scheme">
(test 0 (p))
(if( (= 0 0)) 0 p))
(= 0 0)が#tだから0を返す</pre>