(window.webpackJsonp=window.webpackJsonp||[]).push([[76],{503:function(e,n,s){"use strict";s.r(n);var a=s(0),o=Object(a.a)({},(function(){var e=this,n=e._self._c;return n("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[n("blockquote",[n("p",[n("strong",[e._v("摘要：")]),e._v(" 我们日常在下载第三方依赖的时候，都会用到一个命令npm install，那么你知道，在运行这个命令的时候都会发生什么吗？")])]),e._v(" "),n("p",[e._v("本文分享自华为云社区《"),n("a",{attrs:{href:"https://bbs.huaweicloud.com/blogs/348904",target:"_blank",rel:"noopener noreferrer"}},[e._v("运行npm install命令的时候会发生什么？"),n("OutboundLink")],1),e._v("》，作者： gentle_zhou。")]),e._v(" "),n("p",[e._v("npm（node package manager），是随同Node.js一起安装的第三方包管理器；通过npm，我们可以安装、共享、分发代码，管理项目的依赖关系。")]),e._v(" "),n("p",[e._v("我们日常在下载第三方依赖的时候，都会用到一个命令npm install，然后依赖包就会被安装到node_modules目录下；但是我们在运行这个命令的时候都会发生什么呢？带着好奇心，我去调研学习了一番。")]),e._v(" "),n("p",[n("strong",[e._v("大致的流程是")]),e._v("：npm install命令输入 > 检查node_modules目录下是否存在指定的依赖 > 如果已经存在则不必重新安装 > 若不存在，继续下面的步骤 > 向 registry（本地电脑的.npmrc文件里有对应的配置地址）查询模块压缩包的网址 > 下载压缩包，存放到根目录里的.npm目录里 > 解压压缩包到当前项目的node_modules目录中。")]),e._v(" "),n("p",[n("img",{attrs:{src:"https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/66ee714fea26413b89b992b6d5b5ab6d~tplv-k3u1fbpfcp-zoom-1.image",alt:""}})]),e._v(" "),n("p",[e._v("（上面的图片就显示了项目中依赖如果过多的尴尬：等待时间过长，下载下来依赖过多导致node_modules过大）")]),e._v(" "),n("p",[e._v("下面会介绍一下npm处理依赖的早前和当前的方式 以及 几种不同的install命令下载方式。")]),e._v(" "),n("h2",{attrs:{id:"早期版本-递归"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#早期版本-递归"}},[e._v("#")]),e._v(" 早期版本：递归")]),e._v(" "),n("p",[e._v("在npm早期版本里，npm处理依赖的方式很粗暴简单。它会严格按照根目录下package.json文件的结构以及各个子依赖包的package.json文件的结构，递归地把依赖安装到它们各自的node_modules目录里。这样如果是个小项目，只需要几个依赖且这些依赖不会依赖别的依赖，那么这样的树形结构就还算清晰明了（node_modules的结构与package.json里的结构一一对应且层级结构明显）。")]),e._v(" "),n("p",[e._v("但如果我们的项目是个大项目，里面的依赖非常多（导致嵌套层级非常深），且不同的层级可能会引用同一个依赖（导致重复冗余），就不是我们想要的情形了。")]),e._v(" "),n("h2",{attrs:{id:"当前版本-扁平化"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#当前版本-扁平化"}},[e._v("#")]),e._v(" 当前版本：扁平化")]),e._v(" "),n("p",[e._v("于是，为了解决以上递归管理依赖带来的问题，npm在 3.X版本里做了一次更新，引入了扁平化管理（dedupe）的方式。dedupe是dedeplicated的缩写，即duplicates were remove，把重复的移除。")]),e._v(" "),n("p",[e._v("扁平化管理的思路就是首先遍历package.json文件下dependencies和devDependencies字段里的依赖，作为依赖树的根节点；然后在每个根节点依赖下面都会有其依赖的依赖，作为其子节点；npm会开启多进程从每个根节点开始逐步往下寻找更深层次的节点。而package.json文件下dependencies和devDependencies字段里的依赖会被安装在node_modules根目录下。在遍历这些依赖的时候，如果发现有重复的依赖模块（重复：模块名相同且semantic version兼容；这里的兼容，是指语义化版本都会有一段版本允许范围，如果两个依赖的版本号是在这个范围交际里就说明是兼容；比如依赖X依赖于依赖Y@^1.0.0，而依赖Z依赖于依赖Y@^1.1.0，则Y@^1.1.0就是兼容版本），就直接将其丢弃。")]),e._v(" "),n("p",[e._v("但是如果仅仅这样，其实也有风险。在大项目中，很有可能会碰到依赖A依赖于依赖C-1.0版本，依赖B依赖于依赖C-2.0版本；而在执行npm install命令的时候，会按照package.json里面的依赖顺序依次解析，因此依赖C-1.0和依赖C-2.0的在文件里的放置顺序会导致Node_modules的依赖结构产生变化。而且为了让开发者可以使用最新的依赖包，package.json文件里通常只会锁定大版本（即文件里依赖如果是^1.1.0版本，npm就会去仓库中获取符合1.x.x形式的最新版本），因此某些依赖包小版本更新后，也会造成依赖结构的改变。所以，为了解决npm install命令导致的这种不确定问题，npm 5.x版本里还新增了package-lock.json文件。")]),e._v(" "),n("p",[e._v("package-lock.json文件可以保证每次执行npm install后生成的node_modules目录结构一定是完全相同的。下图就是package-lock.json中其中一个依赖的信息，有name-包名，version-包的版本号，dependencies-和node_modules中包结构一一对应的对象，resolved-包具体的安装来源，integrity-包的hash值，requires-对应子依赖的依赖：")]),e._v(" "),n("p",[n("img",{attrs:{src:"https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9f47f1eca9f1485b84575d607eda1de4~tplv-k3u1fbpfcp-zoom-1.image",alt:""}})]),e._v(" "),n("p",[e._v("注：并不是所有的子依赖都有dependencies这个属性，只有子依赖的依赖和当前已安装在根目录的Node_modules中的依赖起了冲突之后，才会有这个属性。")]),e._v(" "),n("p",[e._v("置于为何说package-lock.json 文件 和 node_modules 目录结构是一一对应的。还是举刚刚前面提及的那个依赖冲突导致依赖结构产生变化的例子，“依赖A依赖于依赖C-1.0版本，依赖B依赖于依赖C-2.0版本”，此时因为package-lock.json文件的存在，我们会把依赖C-1.0版本安装在依赖A的node_modules目录下（对应依赖A在package.json文件里的dependencies属性），依赖C-2.0版本安装在根目录下。这可以保障每次安装生成的依赖目录结构保持相同。")]),e._v(" "),n("p",[e._v("package-lock.json 文件还有个优点，就是它会缓存每个包的具体版本和下载链接，在后期再去install的时候，就不需要再去远程仓库进行查询操作了，减少了大量网络请求。")]),e._v(" "),n("h2",{attrs:{id:"几种不同的install命令下载方式"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#几种不同的install命令下载方式"}},[e._v("#")]),e._v(" 几种不同的install命令下载方式")]),e._v(" "),n("ol",[n("li",[e._v("npm install xxx #（XXX是某依赖包）安装依赖模块至项目node_modules目录下，不会修改package.json文件里的内容")]),e._v(" "),n("li",[e._v("npm install -g xxx #安装依赖模块到全局（而不是项目node_modules目录下），不会将该依赖模块写到package.json文件里的dependencies和devDependencies字段里")]),e._v(" "),n("li",[e._v("npm install --save xxx #安装依赖模块到项目node_modules目录下，并将依赖写入到package.json文件里的dependencies字段中；该依赖是开发和生产环境里都需要的")]),e._v(" "),n("li",[e._v("npm install --save-dev xxx #安装依赖模块到项目node_modules目录下，并将依赖写入到package.json文件里的devDependencies字段中")])])])}),[],!1,null,null,null);n.default=o.exports}}]);