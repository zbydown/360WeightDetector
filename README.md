# 360WeightDetector
基于权重思想的360浏览器以及Chromium检测器
使用方法:添加<script type="text/javascript" src="360weightdetector.min.js"></script>
chrome_weight.result返回权重最高的结果，也就是检测出的浏览器 调用chrome_weight.sorted返回排序后的权重  调用chrome_weight.details返回未排序权重
使用exec方法可以重新检测，例如chrome_weight.exec("result")返回再次重新检测后的权重最高的结果，其他类推。
[在线Demo](http://173.255.247.235/360weightdetector_demo.html)  
程序流程图
![image](http://173.255.247.235/360.png)
