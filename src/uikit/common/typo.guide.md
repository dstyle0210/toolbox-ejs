# [U] Typo
- 텍스트 공통 CSS 클래스 입니다.
- 공통CSS 는 개발자 지원 및 긴급시 사용합니다.
- uikit 생성시 지양합니다.

## Typo > font

### 굵기
<div class="example">
    <strong class="t-normal">보통굵기( .t-normal )</strong>
    <span class="t-bold">두껍게( .t-bold )</span>
</div>

### 정렬
<div class="example">
    <div class="t-left">왼쪽(.t-left)</div>
    <div class="t-center">가운데(.t-center)</div>
    <div class="t-right">오른쪽(.t-right)</div>
</div>

### 크기
<div class="example">
    <%for(let i=11;i<14;i++){%>
    <span class="t-<%=i%>">글자크기(.t-<%=i%>)</span><br />
    <%}%>
    <%for(let i=14;i<33;i++){%>
    <%if(i%2==0){%><span class="t-<%=i%>">글자크기(.t-<%=i%>)</span><br /><%}%>
    <%}%>
    <span class="t-36">글자크기(.t-36)</span><br />
    <span class="t-40">글자크기(.t-40)</span>
</div>

## Typo > Heading
<div class="example">
<h1 class="hd-xl">헤딩 h1 (.hd-xl)</h1>
</div>