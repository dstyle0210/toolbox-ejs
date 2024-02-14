# HTML 구조가이드

## link
- 연결에 대한 우선순위를 높이는 작업.
- 많은 연결이 존재할수록, 주로연결될 부분에 미리연결해놓을것.
- 추후에 사용하지만, 미리 준비해놔야 하는경우에 사용
```html
<!-- 미리로드 : 다운로드 우선순위 -->
<link rel="preload" as="style" href="//c.m.011st.com/MW/css/pui/page.min.css">
<link rel="preload" as="script" href="//c.m.011st.com/MW/js/pui/latest/vendor.js">
<!-- 미리연결 , CDN 이나, 외부연결 도메인 -->
<link rel="preconnect" href="//www.googletagmanager.com">

<!-- 직접연결 -->
<link rel="stylesheet" href="//c.m.011st.com/MW/css/pui/page.min.css">
```