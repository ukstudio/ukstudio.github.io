---
aliases:
- /2012/01/11/rails3_primary_key_foreign_key_big_int
date: "2012-01-11"
title: rails3でprimary keyとforeign keyをbig intにする
---
以下は、PostgreSQLの例。
<code><pre>ActiveRecord::ConnectionAdapters::PostgreSQLAdapter::NATIVE_DATABASE_TYPES[:primary_key] = 'bigserial primary key' </pre></code>
外部キーの場合、<code>t.references :user</code>とか書いてると、ActiveRecord側でintegerがハードコーディングされているのでlimitオプションを付けるしかなさそう。
<code><pre>t.references :user, :limit => 8</pre></code>