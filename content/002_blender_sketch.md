---
title: 'Blenderで下絵を設定する'
description: 'Blenderで下絵を設定する方法をいつも忘れるのでメモしました'
date: 2025-08-28
tags: [3DCG]
cover: /thumbnails/002.png
draft: false
---

Blender でトポロジーを学ぶ際に下絵をつけるのですが、毎回方法を忘れてしまうのでメモしました。

## 設定の手順

### 1. Image > Reference を追加

画面左上の「Add」から、`Image` > `Reference` を追加
![Referenceの選択画面](/images/002/001.png)

### 2. Opacity を下げる

右上の「Scene Collection」から、追加した Reference を選択。<br/>
下のプロパティから「Opacity」を選択し、見やすくなるよう透過度を調整。
![透過度の調整](/images/002/002.png)

### 3. Selectable を false にする

モデルにフォーカスした際に一緒に画像を選択したくないので、選択できないようにします。<br/>
右上のフィルターのアイコンをクリック。「Restriction Toggles」から左から２番目の `Selectable` をアクティブにする
![Selectableをアクティブにする](/images/002/003.png)

アクティブにできたら、Reference のカーソルアイコンをクリックして選択不可にする。
![Selectableをアクティブにする](/images/002/004.png)

これで完了です。以下のように下絵の設定ができました🎉

![下絵を設定した](/images/002/005.png)

## おわり

🙏🙏🙏
