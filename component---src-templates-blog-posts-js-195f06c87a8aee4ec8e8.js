(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{Clsn:function(e,t,a){"use strict";a.r(t),a.d(t,"pageQuery",(function(){return s}));var l=a("q1tI"),n=a.n(l),r=a("Wbzz"),o=a("Bl7J"),i=a("vrFN");t.default=function(e){var t,a=e.data,l=e.location,s=e.pageContext,c=(null===(t=a.site.siteMetadata)||void 0===t?void 0:t.title)||"Title",m=a.allMarkdownRemark.nodes;return 0===m.length?n.a.createElement(o.a,{location:l,title:c},n.a.createElement(i.a,{title:"All posts"}),n.a.createElement("p",null,'No blog posts found. Add markdown posts to "content/blog" (or the directory you specified for the "gatsby-source-filesystem" plugin in gatsby-config.js).')):n.a.createElement(o.a,{location:l,title:c},n.a.createElement(i.a,{title:"All posts"}),n.a.createElement("ol",{style:{listStyle:"none"}},m.map((function(e){var t=e.frontmatter.title||e.fields.slug;return n.a.createElement("li",{key:e.fields.slug},n.a.createElement("article",{className:"post-list-item",itemScope:!0,itemType:"http://schema.org/Article"},n.a.createElement("header",null,n.a.createElement("h2",null,n.a.createElement(r.Link,{to:e.fields.slug,itemProp:"url"},n.a.createElement("span",{itemProp:"headline"},t))),n.a.createElement("small",null,e.frontmatter.date)),n.a.createElement("section",null,n.a.createElement("p",{dangerouslySetInnerHTML:{__html:e.frontmatter.description||e.excerpt},itemProp:"description"}))))}))),n.a.createElement("nav",{className:"blog-post-nav"},n.a.createElement("ul",{style:{display:"flex",flexWrap:"wrap",justifyContent:"space-between",listStyle:"none",padding:0}},n.a.createElement("li",null,n.a.createElement(r.Link,{to:s.prevPath,rel:"prev"},"← Prev")),n.a.createElement("li",null,s.nextPath&&n.a.createElement(r.Link,{to:s.nextPath,rel:"next"},"Next →")))))};var s="1377637787"}}]);
//# sourceMappingURL=component---src-templates-blog-posts-js-195f06c87a8aee4ec8e8.js.map