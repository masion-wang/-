# kjcgpj

> 中国公路学会科技成果评价系统

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).


# Directory description
- src
	- assets
		- css	// CSS文件目录
		- fonts	// 字体文件目录
		- img 	// 图片存放目录
		- js
			- util.js	// 公用JS（编写公用方法），编写时需做好注释（模块描述、编写人、参数调用、备注等等）
	- components	// 组件目录
	- router	// 路由目录
		- index.js	// 路由配置文件
	- view	// 页面展示目录
	main.js	// 项目入口文件
	