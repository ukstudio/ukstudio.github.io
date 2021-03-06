---
aliases:
- /2008/02/15/vim_ruby_on_rails
date: "2008-02-15"
title: VimでRuby on Railsの開発する為の環境構築
---
ちょこっとだけ環境整えたので忘備録エントリとして。

<h2>Vim/Rubyのインストール</h2>
Ruby(.rb)とeruby(.rhtml)ファイルでシンタックスハイライトとオムニ補完が有効になる拡張。gemからインストール可能。

<pre lang="bash">
$ sudo gem install vim-ruby
$ vim-ruby-install.rb
</pre>

vim-ruby-install.rbを実行するとインストール先の選択肢が表示される。1が自分のみ、2が全体へのインストールになる。基本的にどちらでもいいと思うけど、今回は1を選択しといた。

オムニ補完の<c -X></c><c -O>の入力が面倒なのと、補完がRailsのメソッド名にも対応するように.vimrcを修正する。タブで補完できるInsertTabWrapper()は<a href="http://subtech.g.hatena.ne.jp/cho45/20071108/1194475703">Vim の自動補完候補表示 - 冬通りに消え行く制服ガールは、夢物語にリアルを求めない。 - subtech</a>よりコピペ。

<pre>
set nocompatible

syntax on

"omni
function InsertTabWrapper()
  if pumvisible()
    return "\<c -n>"
  endif
  let col = col('.') - 1
  if !col || getline('.')[col -1] !~ '\k\|< \|/'
    return "\<tab>"
  elseif exists('&omnifunc') && &omnifunc == ''
    return "\</c><c -n>"
  else
    return "\</c><c -x>\</c><c -o>"
  endif
endfunction
inoremap <tab> <c -r>=InsertTabWrapper()<cr>

" rubycomplete.vim
let g:rubycomplete_buffer_loading = 1
let g:rubycomplete_rails = 1
let g:rubycomplete_classes_in_global = 1
</cr></c></tab></c></pre>

<h2>Rails.vimのインストール</h2>
<a href="http://d.hatena.ne.jp/secondlife/20061222/1166781841">rails.vim まとめ - 川o・-・）＜2nd life</a>を参考にインストール。インストール方法は・・・リンク先参照でw

.vimrcに以下を追記。

<pre>
" rails.vim
let g:rails_level=4
let g:rails_default_file="app/controllers/application.rb"
</pre>

対応ファイル切り替えがかなり便利。

まだ補完と対応ファイル切り替えぐらいしか機能を使えてないので、追々使い方を学んでいこうと思う。

<h2>追記: 2/18 omni補完でvimが落ちる問題</h2>
omni補完をするとvimが落ちる問題が発生している。

<pre lang="bash">
im: Caught deadly signal ABRT
Vim: preserving files...
Vim: Finished.
</pre>

普通のRubyプログラム上では問題なく補完できる。(例えば10.toで<tab>10.to_sに補完とか)問題はRailsの方の補完で例えばmodelでvalida</tab><tab>とすると上記のエラーと共にvimが落ちる。とりあえず、rails.vimを外すとちゃんと補完できるようだけど、ファイル切り替えが便利なので悩み所。うまく共存させる方法はないのかな。</tab></c>