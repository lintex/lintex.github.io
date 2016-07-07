$(document).ready(function(){
	function dd()
	{
		function checkTime(i){
		if (i<10) 
		  {i="0" + i;}
		  return i;
		}
		var d= new Date();
		return(d.getFullYear()+"年"+(d.getMonth()+1) + "月"+d.getDate()+"日 "+checkTime(d.getHours())+":"+checkTime(d.getMinutes())+":"+checkTime(d.getSeconds()));
	}

	$("#commContent").hover(
		function () {
			$("#commContent").focus();
			if ($("#commContent").val()=='请输入您的观点...')
			{$("#commContent").val("");}
		},function () {
			if ($("#commContent").val()=='')
			{$("#commContent").val("请输入您的观点...");}
		}
	);


	$("#send").click(function(){ 

		var content = $.trim($("#commContent").val());
		if (content.length<10 || $("#commContent").val()=='请输入您的观点...')
		{
			alert('老板，您真是惜字如金啊！');
			$("#commContent").focus();
			return;
		}
		if (content.length>140)
		{
			alert('字数太多，一条评论而已，不用这么认真吧！');
			$("#commContent").focus();
			return;
		}
		var commAuthor = $("#commAuthor").val();
		var ID = $("#ID").val();
		$("#send").attr("disabled",true);
		$("#commContent").val("发布中......");

		ref = new Wilddog("https://lintex.wilddogio.com/blog2/comments/");
		ref.push({
			commName: commAuthor,
			commContent: content,
			commDate: dd(),
			postID: id
		}, function(err){
			if (err==null){
				//$("#comments").prepend("<li><b>"+commAuthor+"</b>："+content+"<br><i>"+dd()+"</i></li>");
		 		$("#cc").html(parseInt($("#cc").text())+1);
		 		$("#commContent").val("");
				ref = new Wilddog("https://lintex.wilddogio.com/blog2/posts/" + id + "/comments");
				ref.once("value", function(data) {
 					ref.set(parseInt(data.val())+1);
				});
				
			}else{
				alert('Sorry，出错了！');
				console.log("错误信息：", error);
		 		$("#commContent").val(content);
			}
		});

		$("#send").attr("disabled",false);
	});
});


		window.onload = function(){
	    var obtn = document.getElementById('returnTop');
		//获取页面可视区的高度
		var clientHeight = document.documentElement.clientHeight;
		var timer = null;
		var isTop = true;

		//滚动条滚动时触发
		window.onscroll = function(){
			var osTop = document.documentElement.scrollTop || document.body.scrollTop;
			if (osTop >= clientHeight){
				obtn.style.display = 'block';
			}else{
				obtn.style.display = 'none';
			}
			if(!isTop){
				clearInterval(timer);
			}
			isTop = false;
		}

		obtn.onclick = function(){
			//设置定时器
			timer = setInterval(function(){
				//获取滚动条距离顶部的高度
				var osTop = document.documentElement.scrollTop || document.body.scrollTop;
				var ispeed = Math.floor(-osTop / 6);
				document.documentElement.scrollTop = document.body.scrollTop = osTop +ispeed;
				isTop = true;
				console.log(osTop -ispeed);
				if (osTop == 0){
					clearInterval(timer);
				}
			},30);
		}
	}


	function getUrlParam(name){
		var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
		var r = window.location.search.substr(1).match(reg);  //匹配目标参数
		if (r!=null){
			return unescape(r[2]); //返回参数值
		}else if(name == "id"){
			return 14;
		} else if(name == "p"){
			return 1;
		}
	} 