$(document).ready(function(){

	var itme_to_left;
	var el;
	$("h1").hover(
	  function () {
		el = this; 
		itme_to_left = setInterval(function(){el.scrollLeft+=5;},10);
	  },
	  function () {
		if (itme_to_left) {
			clearInterval(itme_to_left);
			itme_to_left = null;
		}
		el.scrollLeft = 0;
	  }
	);

	function dd()
	{
		var d= new Date();
		return(d.getYear()+"年"+(d.getMonth()+1) + "月"+d.getDate()+"日 "+d.getHours()+":"+d.getMinutes());
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

		ref = new Wilddog("https://lintex.wilddogio.com/blog/comments/" + id);
		ref.push({
			commName: "commAuthor",
			commContent: "content",
			commDate: new Date()
		}, function(err){
			if (err==null){
				alert('Sorry，出错了！');
		 		$("#commContent").val(content);
			}else{
				$("#comments").prepend("<li><b>"+commAuthor+"</b>："+content+"<br><i>"+dd()+"</i></li>");
		 		$("#cc").html(parseInt($("#cc").text())+1);
		 		$("#commContent").val("");
			}
		});


		// $.ajax({ 
		// 	type: "post", 
		// 	url : "/cc.php", 
		// 	data: 'commContent='+content+'&commAuthor='+commAuthor+'&ID='+ID,
		// 	error: function(){
		// 		alert('Sorry，出错了！');
		// 		$("#commContent").val(content);
		// 	},
		// 	success: function(){
		// 		$("#comments").prepend("<li><b>"+commAuthor+"</b>："+content+"<br><i>"+dd()+"</i></li>");
		// 		$("#cc").html(parseInt($("#cc").text())+1);
		// 		$("#commContent").val("");
		// 	} 
		// });
		$("#send").attr("disabled",false);
	});
});