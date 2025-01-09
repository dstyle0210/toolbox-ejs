# 웹접근성 확보

## 스와이퍼 계열
- 움직이는 컨덴츠는 "재생/정지" 을 단일버튼을 통해 제공해야 함.
- 여러정보를 한곳에 보여주는 경우는 "이전/다음" 을 단일버튼을 통해 제공해야 함.

## 입력요소
- 아이디/비밀번호는 "선택적으로 각각" 저장할수 있도록 옵션을 "체크박스"로 표시해야 함.



## 링크

### a엘리먼트를 열림닫힘 으로 사용
```html
<!-- 접히고 닫히는 기능의 경우 aria-extend 추가, aria-extend는 button 인 경우에만 적용 되므로, role=button 추가 -->
<a href="#" role="button" aria-expanded="false">열기</a> <!-- tts 소리 : 접힘 -->
<a href="#" role="button" aria-expanded="true">닫기</a> <!-- tts 소리 : 확장됨 -->
```

## 텍스트
```html 
<!-- 토글 기능의 경우, 뒤에 숨김텍스트를 추가 -->
<a href="#">좋아요<span class="tts">설정하기</span></a>
<a href="#">좋아요<span class="tts">해제하기</span></a>

<!-- 삭제선이나, 연속된 금액이 있는 경우, 상세 설명 추가 -->
<div>
    <span class="tts">판매가격</span>19,800원
    <del><span class="tts">할인전 가격</span>25,000원</del>
</div>

<!-- 숫자만 표시되는 경우(ex : 별점) 의미를 제시해야 함 -->
<div>별점 : <span class="tts">5점 만점 중</span>4.5<span class="tts">점</span></div> <!-- 표시는 "별점 : 4.5 " 만 보일것임 -->
<div> 테스트 좋은상품 <span class="reviewCount"><span class="tts">상품평 수</span>(100)</span></div> <!-- 상품평 숫자임을 정보전달 -->
```

## 그외
```html
<hr aria-hidden="true" /> <!-- hr은 시각적 구분선 이므로, 시각요소 및 포커싱을 없애기 위해 hidden 추가 -->
```
- 모달계열은 열리면, 모달레이어에 포커스 꼿아줄것.
- 모달레이어가 닫힐 경우, opener 에 다시 포커스 꼿아줄것


## 색상비
- 배경색 대비 텍스트는 3:1 비율로 할 것


