# mip-lmb-script

mip-lmb-script 辣妈帮mip:URL跳转、关闭元素显示、点击切换元素显示组件

标题|内容
----|----
类型|通用
所需脚本|https://c.mipcdn.com/extensions/platform/v1/mip-lmb-script/mip-lmb-script.js

## 示例

### 使用列子
```html
		<mip-lmb-script id="lmb-script"></mip-lmb-script>
		<div on="tap:lmb-script.urlJump(http://www.lamabang.com/)">URL跳转</div>
		<span class="close" id="closeId" on="tap:lmb-script.closeEle(closeId)">点我关闭×</span>
		<div  id="toggleId" on="tap:lmb-script.toggleEle(toggleId)">点我切换显示×××</div>
		<select id="pageSelect">
			<option value="https://www.baidu.com" selected="">第1页</option>								
			<option value="https://www.baidu.com" >第2页</option>
			<option value="https://www.baidu.com" >第3页</option>
			<option value="https://www.baidu.com">第4页</option>
		</select>
```

## urlJump(url) URL跳转接口
### 参数 url

说明：组件url，跳转地址  
必选项：是  
类型：字符串  
单位：无  
默认值：无  

## closeEle(closeId) 关闭元素显示
### 参数 closeId

说明：组件closeId，要关闭元素的ID   
必选项：是  
类型：字符串  
单位：无  
默认值：无

## toggleEle(toggleId) 点击切换元素显示
### 参数 toggleId

说明：组件toggleId，要切换显示的元素id    
必选项：是  
类型：字符串  
单位：无  
默认值：无

## 选择分页跳转组件
### 参数 无

说明：分页select元素的id必须为pageSelect，value值为跳转url    







