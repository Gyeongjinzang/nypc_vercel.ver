// HTML 요소 가져오기
const birthYearSelect = document.getElementById('birthYear');
const birthPlaceSelect = document.getElementById('birthPlace');
const resultDiv = document.getElementById('places');
const checkButton = document.getElementById('checkButton');

// 데이터 샘플 (이 부분은 실제 데이터를 가져오는 로직으로 대체해야 합니다.)
const data = [
    // [연도, 지역, 장소명, 주소, 사진 URL, 에피소드, 링크]
    ['1940', 'seoul', '경복궁', '서울특별시 종로구 사직로 161', 'https://example.com/photo1.jpg', '역사적인 장소', 'https://example.com'],
    ['1950', 'busan', '자갈치시장', '부산광역시 중구 자갈치해안로 52', 'https://example.com/photo2.jpg', '부산의 대표시장', 'https://example.com'],
    // 추가 데이터...
];

// SVG 지역 클릭 이벤트
const regions = document.querySelectorAll('path'); // 모든 경로 요소 가져오기

regions.forEach(region => {
    region.addEventListener('click', function () {
        const selectedPlace = this.id; // 클릭한 지역의 ID를 가져옵니다.
        const selectedYear = birthYearSelect.value; // 선택된 연도

        // 선택된 지역을 강조 표시
        regions.forEach(r => r.style.fill = ''); // 모든 지역 색상 초기화
        this.style.fill = 'orange'; // 클릭한 지역 색상 설정

        // 결과 표시
        displayPlaces(data, selectedYear, selectedPlace);
    });
});

// 버튼 클릭 시 결과 표시
checkButton.addEventListener('click', () => {
    const selectedYear = birthYearSelect.value;
    const selectedPlace = birthPlaceSelect.value;

    // 선택된 지역과 연도에 대한 결과를 표시합니다.
    displayPlaces(data, selectedYear, selectedPlace);
});

// 장소 결과를 표시하는 함수
function displayPlaces(data, year, place) {
    // 선택된 연도와 지역에 대한 데이터 필터링
    let filteredData = data.filter(row => row[0] === year && row[1] === place);
    let placesHtml = '';

    // 선택된 조합에 대한 데이터가 있는지 확인
    if (filteredData.length > 0) {
        filteredData.forEach(row => {
            let placeName = row[2]; // 장소 이름
            let address = row[3]; // 주소
            let photoUrl = row[4]; // 사진 URL
            let episode = row[5]; // 에피소드
            let link = row[6]; // 관련 링크

            // 각 장소의 세부 정보를 HTML에 추가
            placesHtml += `
                <div class="place-item">
                    <h3>${placeName}</h3>
                    <p><strong>주소:</strong> ${address}</p>
                    ${photoUrl ? `<img src="${photoUrl}" alt="${placeName}" />` : ''}
                    <p><strong>에피소드:</strong> ${episode}</p>
                    <p><strong>관련 링크:</strong> ${link ? `<a href="${link}" target="_blank" rel="noopener noreferrer">여기 클릭</a>` : '링크 없음'}</p>
                </div>
            `;
        });
    } else {
        // 선택된 연도와 지역에 대한 데이터가 없을 때의 메시지
        placesHtml = `<p>선택된 ${year}년대의 ${place}에 대한 장소를 찾을 수 없습니다. 다른 조합을 시도해보세요.</p>`;
    }

    // DOM에 장소 또는 대체 메시지 표시
    resultDiv.innerHTML = placesHtml;
}
