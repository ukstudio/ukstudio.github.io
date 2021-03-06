---
aliases:
- /2008/02/25/haskell_sec2
date: "2008-02-25"
title: ふつケル第2章
---
<h2>ハロー、ワールド</h2>
<pre lang="haskell">
main = putStrLn "Hello, World!"
</pre>

「main = 」は変数mainの定義. 「putStrLn "Hello, World!"」が変数mainの値となる。putStrLnは標準出力に文字列と開業を出力する時に使う関数で、正確に言うと<strong>文字列を1つ受けとり、その文字列と改行を出力するアクションを返す関数</strong>.

「putStrLn "Hello, World!"」の式を、Haskellでは<strong>"Hello,World!"にputStrLn関数を適用する</strong>と言うらしいけど、今一ピンとこないな. 普段Rubyやってるからかな. putStrLn関数を"Hello,World!"にあてはめて用いると言いなおせばまだわかるかな. ・・・あんまり変わらないか.

<h2>cat</h2>
<pre lang="haskell">
main = do cs < - getContents
          putStr cs
</pre>

1行目のcs < - getContentsとputStr csの2つの式が揃っているのには意味があるらしい。インデントに意味があるなんてPythonみたいなやつだ。複数の式のインデントを揃えることで、do式で1つのブロックに束ねることができる。この規則をレイアウトやオフサイドルールと言う。<strong>複数のアクションをdo式でまとめると上から下へ実行されることが保証される</strong>。

アクションの結果を得るときに「< -」を使う。このサンプルの場合だと、getContentsアクションで入力した文字列が変数csに結びつき、それを「<strong>変数を値(アクションの結果)に束縛する(bind)</strong>」と言う。値が変数を束縛するのか。値は寂しがりやさんだな。

このサンプルには遅延評価も関連してるが、ここではあまり詳しく触れてないのでスルー。

<h2>countline</h2>
</pre><pre lang="haskell">
main = do cs < - getContents
          print $ length $ lines cs
</pre>

Haskellにおいてリストはかなり重要。Haskellでは<strong>文字列もリスト</strong>となっている。リストには<strong>一種類の値しか入れられない</strong>。このあたりはRuby、JavaScriptあたりをやっていると忘れがちなので注意。

</pre><pre lang="haskell">
['a', 'b', 'c'] => "abc"
[1, 2, 'a'] => NG
</pre>

$演算子は+や-と同じような二項演算子。ここでは<strong>式を区切る</strong>ために使われている。$を()に置き換えると以下のようになる。

<pre lang="haskell">
main = do cs < - getContents
          print (length (lines cs))
</pre>

<h2>head</h2>
</pre><pre lang="haskell">
main = do cs < - getContents
          putStr $ firstNLines 10 cs

firstNLines n cs = unlines $ take n $ lines cs
</pre>

4行目のfirstNLinesは関数の定義。基本的にmainの時と同じだけど、今回は仮引数が登場している。nとcsがそれぞれ第1仮引数、第2引数。

</pre><pre lang="haskell">
関数名 仮引数1 仮引数2・・・ = 関数本体
</pre>

<h2>tail</h2>
<pre lang="haskell">
main = do cs < - getContents
          putStr $ lastNLines 10 cs

lastNLines n cs = unlines $ takeLast n $ lines cs
takeLast n ss = reverse $ take n $ reverse ss
</pre>

今迄に登場したものだけを使っているので、特別なことはなし。

<h2>練習問題</h2>

countbyte.hs
</pre><pre lang="haskell">
main = do cs < - getContents
          print $ length cs
</pre>

countword.hs
</pre><pre lang="haskell">
main = do cs < - getContents
          print $ length $ words cs
</pre>

とりあえずチャチャっと書いてみた。countword.hsは単語数だから問題ないと思うけど、countbyte.hsは日本語の全角文字とかも1byte扱いすると思う。と思ったらちゃんと計算してくれた。でも、ghciで"あ"のlengthをとると1が返ってくる。よくわからん。

</pre><pre lang="haskell">
Prelude> length "あ"
1
</pre>