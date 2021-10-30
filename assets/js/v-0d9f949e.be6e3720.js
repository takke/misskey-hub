"use strict";(self.webpackChunkmisskey_hub=self.webpackChunkmisskey_hub||[]).push([[2641],{4975:(e,i,a)=>{a.r(i),a.d(i,{default:()=>d});const l=(0,a(6252).uE)('<h1 id="misskey-api" tabindex="-1"><a class="header-anchor" href="#misskey-api" aria-hidden="true">#</a> Misskey API</h1><p>MisskeyAPIを使ってMisskeyクライアント、Misskey連携Webサービス、Bot等(以下「アプリケーション」と呼びます)を開発できます。 ストリーミングAPIもあるので、リアルタイム性のあるアプリケーションを作ることも可能です。</p><p>APIを使い始めるには、まずアクセストークンを取得する必要があります。 このドキュメントでは、アクセストークンを取得する手順を説明した後、基本的なAPIの使い方を説明します。</p><h2 id="アクセストークンの取得" tabindex="-1"><a class="header-anchor" href="#アクセストークンの取得" aria-hidden="true">#</a> アクセストークンの取得</h2><p>基本的に、APIはリクエストにはアクセストークンが必要となります。 APIにリクエストするのが自分自身なのか、不特定の利用者に使ってもらうアプリケーションなのかによって取得手順は異なります。</p><ul><li>前者の場合: <a href="#%E8%87%AA%E5%88%86%E8%87%AA%E8%BA%AB%E3%81%AE%E3%82%A2%E3%82%AF%E3%82%BB%E3%82%B9%E3%83%88%E3%83%BC%E3%82%AF%E3%83%B3%E3%82%92%E6%89%8B%E5%8B%95%E7%99%BA%E8%A1%8C%E3%81%99%E3%82%8B">「自分自身のアクセストークンを手動発行する」</a>に進む</li><li>後者の場合: <a href="#%E3%82%A2%E3%83%97%E3%83%AA%E3%82%B1%E3%83%BC%E3%82%B7%E3%83%A7%E3%83%B3%E5%88%A9%E7%94%A8%E8%80%85%E3%81%AB%E3%82%A2%E3%82%AF%E3%82%BB%E3%82%B9%E3%83%88%E3%83%BC%E3%82%AF%E3%83%B3%E3%81%AE%E7%99%BA%E8%A1%8C%E3%82%92%E3%83%AA%E3%82%AF%E3%82%A8%E3%82%B9%E3%83%88%E3%81%99%E3%82%8B">「アプリケーション利用者にアクセストークンの発行をリクエストする」</a>に進む</li></ul><h3 id="自分自身のアクセストークンを手動発行する" tabindex="-1"><a class="header-anchor" href="#自分自身のアクセストークンを手動発行する" aria-hidden="true">#</a> 自分自身のアクセストークンを手動発行する</h3><p>「設定 &gt; API」で、自分のアクセストークンを発行できます。</p><p><a href="#API%E3%81%AE%E4%BD%BF%E3%81%84%E6%96%B9">「APIの使い方」へ進む</a></p><h3 id="アプリケーション利用者にアクセストークンの発行をリクエストする" tabindex="-1"><a class="header-anchor" href="#アプリケーション利用者にアクセストークンの発行をリクエストする" aria-hidden="true">#</a> アプリケーション利用者にアクセストークンの発行をリクエストする</h3><p>アプリケーション利用者のアクセストークンを取得するには、以下の手順で発行をリクエストします。</p><h4 id="step-1" tabindex="-1"><a class="header-anchor" href="#step-1" aria-hidden="true">#</a> Step 1</h4><p>UUIDを生成する。以後これをセッションIDと呼びます。</p><blockquote><p>このセッションIDは毎回生成し、使いまわさないようにしてください。</p></blockquote><h4 id="step-2" tabindex="-1"><a class="header-anchor" href="#step-2" aria-hidden="true">#</a> Step 2</h4><p><code>{_URL_}/miauth/{session}</code>をユーザーのブラウザで表示させる。<code>{session}</code>の部分は、セッションIDに置き換えてください。</p><blockquote><p>例: <code>{_URL_}/miauth/c1f6d42b-468b-4fd2-8274-e58abdedef6f</code></p></blockquote><p>表示する際、URLにクエリパラメータとしていくつかのオプションを設定できます:</p><ul><li><code>name</code> ... アプリケーション名 <ul><li><blockquote><p>例: <code>MissDeck</code></p></blockquote></li></ul></li><li><code>icon</code> ... アプリケーションのアイコン画像URL <ul><li><blockquote><p>例: <code>https://missdeck.example.com/icon.png</code></p></blockquote></li></ul></li><li><code>callback</code> ... 認証が終わった後にリダイレクトするURL <ul><li><blockquote><p>例: <code>https://missdeck.example.com/callback</code></p></blockquote></li><li>リダイレクト時には、<code>session</code>というクエリパラメータでセッションIDが付きます</li></ul></li><li><code>permission</code> ... アプリケーションが要求する権限 <ul><li><blockquote><p>例: <code>write:notes,write:following,read:drive</code></p></blockquote></li><li>要求する権限を<code>,</code>で区切って列挙します</li><li>どのような権限があるかは<a href="/api-doc">APIリファレンス</a>で確認できます</li></ul></li></ul><h4 id="step-3" tabindex="-1"><a class="header-anchor" href="#step-3" aria-hidden="true">#</a> Step 3</h4><p>ユーザーが発行を許可した後、<code>{_URL_}/api/miauth/{session}/check</code>にPOSTリクエストすると、レスポンスとしてアクセストークンを含むJSONが返ります。</p><p>レスポンスに含まれるプロパティ:</p><ul><li><code>token</code> ... ユーザーのアクセストークン</li><li><code>user</code> ... ユーザーの情報</li></ul><p><a href="#API%E3%81%AE%E4%BD%BF%E3%81%84%E6%96%B9">「APIの使い方」へ進む</a></p><h2 id="apiの使い方" tabindex="-1"><a class="header-anchor" href="#apiの使い方" aria-hidden="true">#</a> APIの使い方</h2><p><strong>APIはすべてPOSTで、リクエスト/レスポンスともにJSON形式です。RESTではありません。</strong> アクセストークンは、<code>i</code>というパラメータ名でリクエストに含めます。</p><ul><li><a href="/api-doc">APIリファレンス</a></li><li><a href="./stream">ストリーミングAPI</a></li></ul>',27),d={render:function(e,i){return l}}},7911:(e,i,a)=>{a.r(i),a.d(i,{data:()=>l});const l={key:"v-0d9f949e",path:"/docs/advanced/api.html",title:"Misskey API",lang:"ja-JP",frontmatter:{},excerpt:"",headers:[{level:2,title:"アクセストークンの取得",slug:"アクセストークンの取得",children:[{level:3,title:"自分自身のアクセストークンを手動発行する",slug:"自分自身のアクセストークンを手動発行する",children:[]},{level:3,title:"アプリケーション利用者にアクセストークンの発行をリクエストする",slug:"アプリケーション利用者にアクセストークンの発行をリクエストする",children:[]}]},{level:2,title:"APIの使い方",slug:"apiの使い方",children:[]}],filePathRelative:"docs/advanced/api.md",git:{updatedTime:1631291596e3,contributors:[{name:"syuilo",email:"Syuilotan@yahoo.co.jp",commits:1}]}}}}]);