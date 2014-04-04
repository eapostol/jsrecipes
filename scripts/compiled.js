angular.module("MyApp",["ngRoute","ngAnimate","ngProgress","ngDisqus","ngTable"]).config(["$routeProvider","$locationProvider","$disqusProvider",function(t,e,n){n.setShortname("jsrecipes"),e.hashPrefix("!"),t.when("/",{templateUrl:"views/main.html",controller:"MainCtrl"}).when("/backend/:name",{templateUrl:"views/detail.html",controller:"MainCtrl"}).when("/frontend/:name",{templateUrl:"views/detail.html",controller:"MainCtrl"}).when("/general/:name",{templateUrl:"views/detail.html",controller:"MainCtrl"}).when("/feedback",{templateUrl:"views/feedback.html",controller:"MainCtrl",title:"Feedback"}).when("/contribute",{templateUrl:"views/contribute.html",controller:"MainCtrl",title:"Contribute"}).otherwise({templateUrl:"views/404.html",controller:"MainCtrl",title:"Not Found"})}]),angular.module("MyApp").controller("MainCtrl",["$scope","$rootScope","$route","$window","Posts","GitHub","$routeParams","ngProgress",function(t,e,n,o,r,i,l,s){t.$on("$routeChangeSuccess",function(){l.name?(s.start(),r.getBySlug(l.name,function(e){t.post=e,s.complete(),o.document.title=t.post.title+" - JS Recipes",i.lastCommit(e.file,function(e,n){return 0===n?t.lastUpdated="Unknown":void(t.lastUpdated=new Date(e[0].commit.committer.date).toLocaleString())})})):(e.title=n.current.title,r.getPosts(function(e){t.posts=e}),i.getContributors(function(e){t.contributors=e.slice(0,10)}))})}]),angular.module("MyApp").directive("markdown",["$http","$compile",function(t,e){var n=new Showdown.converter;return{link:function(o,r,i){i.$observe("file",function(i){i&&t.get("posts/"+i).success(function(t){var i=n.makeHtml(t);r.html(i),e(r.contents())(o),$("pre code").each(function(t,e){hljs.highlightBlock(e)})})})}}}]),angular.module("MyApp").directive("scroll",["$window",function(t){return function(){angular.element(t).bind("scroll",function(){this.pageYOffset>=150?$(".edit-on-github").fadeIn(200):$(".edit-on-github").fadeOut(200)})}}]),angular.module("MyApp").factory("GitHub",["$http",function(t){return{lastCommit:function(e,n){t.get("https://api.github.com/repositories/17648824/commits?path=posts/"+e).success(n).error(n)},getContributors:function(e){t.get("https://api.github.com/repos/sahat/jsrecipes/contributors").success(e).error(e)}}}]),angular.module("MyApp").factory("Posts",["$http",function(t){return{getPosts:function(e){t.get("posts/posts.json").success(e)},getBySlug:function(t,e){this.getPosts(function(n){var o=function(t,e,n){for(var r in t)r==e?n(t):t[r]instanceof Object&&o(t[r],e,n)};o(n,"slug",function(n){n.slug===t&&e(n)})})}}}]);