---
title: 'MetalでWaveなストライプを描く'
description: 'Metalを触ったことがないので、勉強しつつWavyなストライプを書いてみる'
date: 2025-09-10
tags: [Shader]
cover: /thumbnails/003.webp
draft: true
---

Swift製のアプリを作るときに、ビジュアルの実装をする際に選択肢に上がる`Metal`。気になってはいたのですが、ちゃんと触ったことがないので勉強しつつ書いてみました。今回は `SwiftUI` をベースに進めていきます。

![Preview](/images/003/002.webp)

## 参考文献

この記事は以下のリンクを参考に書いています。

- [Metal入門・・・の前の基礎知識](https://qiita.com/shu223/items/b95e97d50c738ba6c39a)
- [Metalの概要](https://developer.apple.com/jp/metal/)

## そもそも Metal って？

> グラフィックスを駆使したアプリや美しいビジュアルで描く最先端のゲーム制作においても、機械学習のような高負荷の計算処理を実行において、Metalなら、Appleが設計した高機能GPUをすぐに利用できます。iPhone、iPad、Mac、Apple TV、Apple Vision Proのすべてにわたって、Appleシリコンの驚異的なパフォーマンスと効率を最大限に活用できます。
> https://developer.apple.com/jp/metal/

Apples silicon に乗ってる GPU へアクセスするためのAPIみたいです。ゲームなどのグラフィックス系はもちろん、機械学習など多くのパラメータを用いた演算が必要な場合も使用されるみたいです。

## Metal でシェーダーを実装してみる

```metal
//
//  Shaders.metal
//  最小構成: 三角形の頂点色をそのまま描画
//
//  - vertex_main: 頂点バッファ [[buffer(0)]] から座標/色を読み取り、そのまま出力
//  - fragment_main: 受け取った色を返すだけ

#include <metal_stdlib>
using namespace metal;

struct VertexIn {
    float2 position; // 画面座標 (NDC)
    float4 color;    // 色 (0..1), 16byte 揃えで安全
};

struct VertexOut {
    float4 position [[position]];
    float4 color;
};

vertex VertexOut vertex_main(uint vid [[vertex_id]],
                             const device VertexIn* vertices [[buffer(0)]]) {
    VertexOut out;
    VertexIn v = vertices[vid];
    out.position = float4(v.position, 0.0, 1.0); // そのままクリップ空間へ
    out.color = v.color;
    return out;
}

fragment float4 fragment_main(VertexOut in [[stage_in]]) {
    return in.color;
}

```

`vertex_main` と `fragment_main` の引数は後々 Swift 側から連携するパラメータと型を合わせる必要があります。

次に作成したシェーダーを利用するために `MTKViewDelegate` を実装していきます。

```swift
//
//  Renderer.swift
//  最小構成: 三角形を 1 つ描画
//
//  流れ:
//  - コマンドキュー作成
//  - シェーダ読み込み + パイプライン作成
//  - 頂点バッファ作成（3 頂点）
//  - draw(in:) で描画コマンド発行

import Foundation
import Metal
import MetalKit

final class Renderer: NSObject, MTKViewDelegate {
    private let device: MTLDevice
    private let commandQueue: MTLCommandQueue
    private let pipelineState: MTLRenderPipelineState
    private let vertexBuffer: MTLBuffer

    init(mtkView: MTKView) {
        guard let device = mtkView.device else { fatalError("MTKView に device が設定されていません") }
        self.device = device

        // コマンドキュー
        guard let commandQueue = device.makeCommandQueue() else { fatalError("CommandQueue を作れませんでした") }
        self.commandQueue = commandQueue

        // シェーダ（Shaders.metal の vertex_main / fragment_main）
        let library = try! device.makeDefaultLibrary(bundle: .main)
        let vfn = library.makeFunction(name: "vertex_main")
        let ffn = library.makeFunction(name: "fragment_main")

        // パイプライン
        let desc = MTLRenderPipelineDescriptor()
        desc.vertexFunction = vfn
        desc.fragmentFunction = ffn
        desc.colorAttachments[0].pixelFormat = mtkView.colorPixelFormat
        self.pipelineState = try! device.makeRenderPipelineState(descriptor: desc)

        // 頂点データ（NDC 空間でそのまま描ける座標 + 色）
        struct Vertex { var position: SIMD2<Float>; var color: SIMD4<Float> }
        let vertices: [Vertex] = [
            Vertex(position: SIMD2<Float>( 0.0,  0.6), color: SIMD4<Float>(1, 0, 0, 1)), // 上（赤）
            Vertex(position: SIMD2<Float>(-0.6, -0.6), color: SIMD4<Float>(0, 1, 0, 1)), // 左下（緑）
            Vertex(position: SIMD2<Float>( 0.6, -0.6), color: SIMD4<Float>(0, 0, 1, 1)), // 右下（青）
        ]
        self.vertexBuffer = device.makeBuffer(bytes: vertices,
                                              length: MemoryLayout<Vertex>.stride * vertices.count,
                                              options: .storageModeShared)!
        super.init()
    }

    func mtkView(_ view: MTKView, drawableSizeWillChange size: CGSize) {}

    func draw(in view: MTKView) {
        guard let passDesc = view.currentRenderPassDescriptor,
              let drawable = view.currentDrawable else { return }

        // コマンドバッファ & エンコーダ
        guard let cmd = commandQueue.makeCommandBuffer(),
              let enc = cmd.makeRenderCommandEncoder(descriptor: passDesc) else { return }

        enc.setRenderPipelineState(pipelineState)
        enc.setVertexBuffer(vertexBuffer, offset: 0, index: 0)
        enc.drawPrimitives(type: .triangle, vertexStart: 0, vertexCount: 3)
        enc.endEncoding()

        cmd.present(drawable)
        cmd.commit()
    }
}

```

上から見ていく前に、GPT5と会話してまとめてもらったのが以下。

- 初期化（init）：
  - GPU（🧑‍🍳 シェフ）呼んで
  - コマンドキュー（🏬 注文カウンター）を用意して
  - シェーダ（🗒️ レシピ）とパイプライン（🍳 調理セット）を準備して
  - 材料（🥕 頂点バッファ）を仕込む
- 描画（draw）：
  - 🖼️ キャンバス（RenderPassDescriptor）を出して
  - 📑 新しい紙（Drawable.texture）を渡して
  - 🤖 コマンド（描画命令）を書いて
  - 「できました！」って注文を出す（commit）
  - 最後に表に見せる（present）

それぞれのメソッドの詳細も見ていきます 🔍

```swift
guard let device = mtkView.device else { fatalError("MTKView に device が設定されていません") }
self.device = device
```

GPU と会話するための入口を確保する。

```swift
guard let commandQueue = device.makeCommandQueue() else { fatalError("CommandQueue を作れませんでした") }
self.commandQueue = commandQueue
```

コマンドキューを作る。
**コマンドキュー**は毎フレームの命令（コマンドバッファ）を生成する工場。

```swift
let library = try! device.makeDefaultLibrary(bundle: .main)
let vfn = library.makeFunction(name: "vertex_main")
let ffn = library.makeFunction(name: "fragment_main")
```

GPU に渡す処理（頂点・フラグメント関数）を読み込む。

```swift
let desc = MTLRenderPipelineDescriptor()
desc.vertexFunction = vfn
desc.fragmentFunction = ffn
desc.colorAttachments[0].pixelFormat = mtkView.colorPixelFormat
self.pipelineState = try! device.makeRenderPipelineState(descriptor: desc)
```

シェーダ、出力フォーマット、ブレンドなどをひとまとめにした「描画レシピ」をコンパイル。

```swift
struct Vertex {
  var position: SIMD2<Float>;
  var color: SIMD4<Float>
}

let vertices: [Vertex] = [
    Vertex(position: SIMD2<Float>( 0.0,  0.6), color: SIMD4<Float>(1, 0, 0, 1)), // 上（赤）
    Vertex(position: SIMD2<Float>(-0.6, -0.6), color: SIMD4<Float>(0, 1, 0, 1)), // 左下（緑）
    Vertex(position: SIMD2<Float>( 0.6, -0.6), color: SIMD4<Float>(0, 0, 1, 1)), // 右下（青）
]
self.vertexBuffer = device.makeBuffer(
  bytes: vertices,
  length: MemoryLayout<Vertex>.stride * vertices.count,
  options: .storageModeShared
)!
```

頂点配列を GPU が読めるメモリにコピーして保持する。
`MemoryLayout<Vertex>.stride * count`(構造体サイズ × 個数)でメモリのサイズピッタリを確保してる。
`.storageModeShared` で CPU/GPU 両方から見える領域に置いてる

```swift
let passDesc = view.currentRenderPassDescriptor
```

描画するキャンバスの設定取得する。

- どのテクスチャに描くか
- 背景色（clearColor）
- 前のフレーム残すか消すか（loadAction）

```swift
let drawable = view.currentDrawable
```

裏側で描画するための画面を取得する。

```swift
let cmd = commandQueue.makeCommandBuffer()
```

コマンドバッファ作成して、GPU に送る命令の箱を作る。

```swift
let enc = cmd.makeRenderCommandEncoder(descriptor: passDesc)
```

引数にキャンバス情報を渡して、「このキャンバスに描きます！」と宣言して、命令を書き込むペンを準備。

```swift
enc.setRenderPipelineState(pipelineState)
enc.setVertexBuffer(vertexBuffer, offset: 0, index: 0)
enc.drawPrimitives(type: .triangle, vertexStart: 0, vertexCount: 3)
enc.endEncoding()
```

- `setRenderPipelineState(pipelineState)` = どのレシピで描くか
- `setVertexBuffer(vertexBuffer, ...)` = 頂点データをセット
- `drawPrimitives(type:.triangle, vertexStart:0, vertexCount:3)` = 三角形描画コマンド
- `enc.endEncoding` = エンコーダ終了

```swift
cmd.present(drawable)
cmd.commit()
```

裏側で持ってた画面を表に出して見せるよう設定。
最後に commit して表示する。
