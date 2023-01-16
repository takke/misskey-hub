import{_ as t,o as l,c as o,a as e,b as i,e as a,d as s,r as d}from"./app.bc5577ec.js";const r={},c=a('<h1 id="misskey-setup-and-installation-guide" tabindex="-1"><a class="header-anchor" href="#misskey-setup-and-installation-guide" aria-hidden="true">#</a> Misskey Setup and Installation Guide</h1><p>We thank you for your interest in setting up your Misskey server! This guide describes how to install and setup Misskey.</p><hr><h2 id="_1-install-dependencies" tabindex="-1"><a class="header-anchor" href="#_1-install-dependencies" aria-hidden="true">#</a> <em>1.</em> Install dependencies</h2><p>Please install and setup these softwares:</p><h4 id="dependencies" tabindex="-1"><a class="header-anchor" href="#dependencies" aria-hidden="true">#</a> Dependencies \u{1F4E6}</h4>',6),p={href:"https://nodejs.org/en/",target:"_blank",rel:"noopener noreferrer"},u=s("Node.js"),m=s(" (18.13.x)"),h={href:"https://www.postgresql.org/",target:"_blank",rel:"noopener noreferrer"},v=s("PostgreSQL"),b=s(" (15.x)"),k={href:"https://redis.io/",target:"_blank",rel:"noopener noreferrer"},y=s("Redis"),g={href:"https://www.ffmpeg.org/",target:"_blank",rel:"noopener noreferrer"},_=s("FFmpeg"),f=a(`<p>If you are using Debian/Ubuntu, you should install the <code>build-essential</code> package.</p><p>corepack must be enabled.</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">sudo</span> corepack <span class="token builtin class-name">enable</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="_2-create-misskey-user" tabindex="-1"><a class="header-anchor" href="#_2-create-misskey-user" aria-hidden="true">#</a> <em>2.</em> Create Misskey user</h2><p>Running misskey as root is not a good idea so we create a user for that. In debian for exemple :</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>adduser --disabled-password --disabled-login misskey
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="_3-install-misskey" tabindex="-1"><a class="header-anchor" href="#_3-install-misskey" aria-hidden="true">#</a> <em>3.</em> Install Misskey</h2>`,7),x=a("<li><p>Connect to the <code>misskey</code> user</p><p><code>sudo -iu misskey</code></p></li><li><p>Clone the Misskey repository</p><p><code>git clone --recursive https://github.com/misskey-dev/misskey.git</code></p></li><li><p>Navigate to the repository</p><p><code>cd misskey</code></p></li>",3),w=s("Check out the "),q={href:"https://github.com/misskey-dev/misskey/releases/latest",target:"_blank",rel:"noopener noreferrer"},E=s("latest release"),N=e("p",null,[e("code",null,"git checkout master")],-1),M=e("li",null,[e("p",null,"Download submodules"),e("p",null,[e("code",null,"git submodule update --init")])],-1),S=e("li",null,[e("p",null,"Install Misskey's dependencies"),e("p",null,[e("code",null,"pnpm install --frozen-lockfile")])],-1),D=a(`<h2 id="_4-configure-misskey" tabindex="-1"><a class="header-anchor" href="#_4-configure-misskey" aria-hidden="true">#</a> <em>4.</em> Configure Misskey</h2><ol><li><p>Copy the <code>.config/example.yml</code> and rename it to <code>default.yml</code>.</p><p><code>cp .config/example.yml .config/default.yml</code></p></li><li><p>Edit <code>default.yml</code></p></li></ol><h2 id="_5-build-misskey" tabindex="-1"><a class="header-anchor" href="#_5-build-misskey" aria-hidden="true">#</a> <em>5.</em> Build Misskey</h2><p>Build misskey with the following:</p><p><code>NODE_ENV=production pnpm run build</code></p><p>If you&#39;re on Debian, you will need to install the <code>build-essential</code>, <code>python</code> package.</p><h2 id="_6-init-db" tabindex="-1"><a class="header-anchor" href="#_6-init-db" aria-hidden="true">#</a> <em>6.</em> Init DB</h2><ol><li><p>Create the appropriate PostgreSQL users with respective passwords, and empty database as named in the configuration file. Make sure the database connection also works correctly when run from the user that will later run Misskey, or it could cause problems later. The encoding of the database should be UTF-8.</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>sudo -u postgres psql
create database misskey with encoding = &#39;UTF8&#39;;
create user misskey with encrypted password &#39;{YOUR_PASSWORD}&#39;;
grant all privileges on database misskey to misskey;
\\q
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>Run the database initialisation <code>pnpm run init</code></p></li></ol><h2 id="_7-that-is-it" tabindex="-1"><a class="header-anchor" href="#_7-that-is-it" aria-hidden="true">#</a> <em>7.</em> That is it.</h2><p>Well done! Now, you have an environment that run to Misskey.</p><h3 id="launch-normally" tabindex="-1"><a class="header-anchor" href="#launch-normally" aria-hidden="true">#</a> Launch normally</h3><p>Just <code>NODE_ENV=production pnpm run start</code>. GLHF!</p><h3 id="launch-with-systemd" tabindex="-1"><a class="header-anchor" href="#launch-with-systemd" aria-hidden="true">#</a> Launch with systemd</h3><ol><li><p>Create a systemd service here</p><p><code>/etc/systemd/system/misskey.service</code></p></li><li><p>Edit it, and paste this and save:</p><details class="custom-container details"><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>[Unit]
Description=Misskey daemon

[Service]
Type=simple
User=misskey
ExecStart=/usr/bin/npm start
WorkingDirectory=/home/misskey/misskey
Environment=&quot;NODE_ENV=production&quot;
TimeoutSec=60
StandardOutput=journal
StandardError=journal
SyslogIdentifier=misskey
Restart=always

[Install]
WantedBy=multi-user.target
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details></li><li><p>Reload systemd and enable the misskey service.</p><p><code>sudo systemctl daemon-reload; sudo systemctl enable misskey</code></p></li><li><p>Start the misskey service.</p><p><code>sudo systemctl start misskey</code></p></li></ol><p>You can check if the service is running with <code>systemctl status misskey</code>.</p><h3 id="launch-with-openrc" tabindex="-1"><a class="header-anchor" href="#launch-with-openrc" aria-hidden="true">#</a> Launch with OpenRC</h3><ol><li><p>Copy the following text to <code>/etc/init.d/misskey</code>:</p><details class="custom-container details"><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token shebang important">#!/sbin/openrc-run</span>

<span class="token assign-left variable">name</span><span class="token operator">=</span>misskey
<span class="token assign-left variable">description</span><span class="token operator">=</span><span class="token string">&quot;Misskey daemon&quot;</span>

<span class="token assign-left variable">command</span><span class="token operator">=</span><span class="token string">&quot;/usr/bin/npm&quot;</span>
<span class="token assign-left variable">command_args</span><span class="token operator">=</span><span class="token string">&quot;start&quot;</span>
<span class="token assign-left variable">command_user</span><span class="token operator">=</span><span class="token string">&quot;misskey&quot;</span>

<span class="token assign-left variable">supervisor</span><span class="token operator">=</span><span class="token string">&quot;supervise-daemon&quot;</span>
<span class="token assign-left variable">supervise_daemon_args</span><span class="token operator">=</span><span class="token string">&quot; -d /home/misskey/misskey -e NODE_ENV=<span class="token entity" title="\\&quot;">\\&quot;</span>production<span class="token entity" title="\\&quot;">\\&quot;</span>&quot;</span>

<span class="token assign-left variable">pidfile</span><span class="token operator">=</span><span class="token string">&quot;/run/<span class="token variable">\${RC_SVCNAME}</span>.pid&quot;</span>

<span class="token function-name function">depend</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	need net
	use logger

	<span class="token comment"># alternatively, uncomment if using nginx reverse proxy</span>
	<span class="token comment">#use logger nginx</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details></li><li><p>Set the service to start on boot</p><p><code>rc-update add misskey</code></p></li><li><p>Start the Misskey service</p><p><code>rc-service misskey start</code></p></li></ol><p>You can check if the service is running with <code>rc-service misskey status</code>.</p><h3 id="how-to-update-your-misskey-server-to-the-latest-version" tabindex="-1"><a class="header-anchor" href="#how-to-update-your-misskey-server-to-the-latest-version" aria-hidden="true">#</a> How to update your Misskey server to the latest version</h3><ol><li><code>git checkout master</code></li><li><code>git pull</code></li><li><code>git submodule update --init</code></li><li><code>NODE_ENV=production pnpm install --frozen-lockfile</code></li><li><code>NODE_ENV=production pnpm run build</code></li><li><code>pnpm run migrate</code></li><li>Restart your Misskey process to apply changes</li><li>Enjoy</li></ol><p>If you encounter any problems with updating, please try the following:</p><ol><li><code>pnpm run clean</code> or <code>pnpm run clean-all</code></li><li>Retry update (Don&#39;t forget <code>pnpm install</code></li></ol>`,22);function C(I,R){const n=d("ExternalLinkIcon");return l(),o("div",null,[c,e("ul",null,[e("li",null,[e("strong",null,[e("a",p,[u,i(n)])]),m]),e("li",null,[e("strong",null,[e("a",h,[v,i(n)])]),b]),e("li",null,[e("strong",null,[e("a",k,[y,i(n)])])]),e("li",null,[e("strong",null,[e("a",g,[_,i(n)])])])]),f,e("ol",null,[x,e("li",null,[e("p",null,[w,e("a",q,[E,i(n)])]),N]),M,S]),D])}var O=t(r,[["render",C],["__file","manual.html.vue"]]);export{O as default};
