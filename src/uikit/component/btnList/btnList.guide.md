# [C] 버튼리스트

## 서비스 바로가기 형태 (.c-serviceBtns)

<div class="example">
    <%
    const data = Array(16).fill().map((a,idx)=>{
        return {idx,name:"테스트"+idx} 
    });
    %> 
    <include src="@src/uikit/component/btnList/serviceBtns.ejs" props="{btns:data}"></include>  
</div> 