(window.webpackJsonp=window.webpackJsonp||[]).push([[43,3],{209:function(t,e,n){"use strict";n.r(e);var l={name:"CodeHighlight",props:{language:{type:String,default:"html"},collapsible:{type:Boolean,default:!0}},data:function(){return{collapsed:!0}},computed:{computedStyle:function(){return this.collapsed?"max-height: 0":"max-height: 400px"},computedButtonText:function(){return this.collapsed?"Show Example Code":"Hide Example Code"}}},o=n(5),component=Object(o.a)(l,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"code-highlight-container"},[t.collapsible?[n("client-only",[n("vue-code-highlight",{staticClass:"ov-hidden transition-all-025s",style:t.computedStyle,attrs:{language:t.language}},[t._t("default")],2)],1),t._v(" "),n("div",{staticClass:"d-flex content-center"},[n("b-button",{class:["text-uppercase",{"mt-4x":!t.collapsed}],attrs:{ghost:"",rounded:"",xsmall:""},on:{click:function(e){e.preventDefault(),t.collapsed=!t.collapsed}}},[t._v(t._s(t.computedButtonText))])],1)]:[n("client-only",[n("vue-code-highlight",{attrs:{language:t.language}},[t._t("default")],2)],1)]],2)}),[],!1,null,null,null);e.default=component.exports},261:function(t,e,n){"use strict";n.r(e);var l={name:"ThemesPage",layout:"home",head:function(){return{title:"Themes"}}},o=n(5),component=Object(o.a)(l,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("main",[t._m(0),t._v(" "),n("section",{staticClass:"mxi-6x mbi-6x bg-white px-6x py-12x"},[n("div",{staticClass:"w-max-800 mx-auto"},[n("h2",[t._v("Install SASS loader")]),t._v(" "),t._m(1),t._v(" "),n("code-highlight",{staticClass:"my-8x",attrs:{language:"shell",collapsible:!1}},[n("pre",[t._v("# yarn\nyarn add --dev sass sass-loader@10\n\n# npm\nnpm i -D sass sass-loader@10")])]),t._v(" "),n("h2",[t._v("Create app.scss")]),t._v(" "),n("code-highlight",{staticClass:"my-8x",attrs:{language:"scss",collapsible:!1}},[n("pre",[t._v('// ./assets/scss/app.scss\n\n// Custom variables, refer _settings.scss\n$color-primary: #00d4fa;\n$font-family: \'Inter\', sans-serif;\n$html-font-size: 10px;\n$body-font-size: 14px;\n\n// Required\n$assets-path: "@bigin/bigin-ui-ds/src/assets";\n@import "@bigin/bigin-ui-ds/src/scss/bigin-ui";\n          ')])]),t._v(" "),n("h2",[t._v("Update configuration")]),t._v(" "),n("p",{staticClass:"text-md lh-150p mt-2x"},[t._v("Adding app.scss to to config file")]),t._v(" "),n("code-highlight",{staticClass:"my-8x",attrs:{language:"js",collapsible:!1}},[n("pre",[t._v("// nuxt.config.js\n\nexport default {\n  ...,\n  css: ['@/assets/scss/app.scss'],\n  ...\n}\n          ")])])],1)])])}),[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("section",{staticClass:"w-max-800 mx-auto"},[n("div",{staticClass:"row row-lg items-center"},[n("div",{staticClass:"col-md-6 py-6x"},[n("h1",[t._v("Themes")]),t._v(" "),n("p",{staticClass:"text-xl c-grey-6 mt-4x"},[t._v("Customize appearence of elements")])]),t._v(" "),n("div",{staticClass:"col-md-6 fof md:fol"},[n("img",{staticClass:"w100p wmx320 mxa",attrs:{src:"images/content@2x.png",alt:"Themes"}})])])])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("p",{staticClass:"text-md lh-150p mt-2x"},[t._v("\n          Following Nuxt's documentation at\n          "),n("a",{attrs:{href:"https://nuxtjs.org/docs/directory-structure/assets#sass"}},[t._v("nuxtjs.org")])])}],!1,null,null,null);e.default=component.exports;installComponents(component,{CodeHighlight:n(209).default})}}]);