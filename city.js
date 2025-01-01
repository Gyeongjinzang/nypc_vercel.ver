<!DOCTYPE html>
<html lang="ko">
<head>
  <title>구글 시트 API 예제</title>
  <meta charset="utf-8" />
  <style>
    body {
      font-family: Arial, sans-serif;
    }
    #content {
      white-space: pre-wrap;
      margin: 20px;
    }
    h1 {
      text-align: center;
    }
  </style>
</head>
<body>
  <h1>구글 시트 API 예제</h1>
  <pre id="content"></pre>

  <script type="text/javascript">
    const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
    const SPREADSHEET_ID = '1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms'; // 구글 시트 ID
    const RANGE = 'Sheet1!A1:z1000'; // 읽을 셀 범위

    async function fetchData() {
      let response;
      try {
        // 구글 시트에서 값을 가져오기
        response = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${RANGE}?key=${API_KEY}`);
        const data = await response.json();

        // 반환된 값 확인
        if (!data.values || data.values.length === 0) {
          document.getElementById('content').innerText = '값을 찾을 수 없습니다.';
          return;
        }

        // 결과를 형식화하여 출력
        const output = data.values.map(row => {
          return `연도: ${row[0]}, 지역: ${row[1]}, 장소: ${row[2]}, 주소: ${row[3]}, 사진 URL: ${row[4]}, 에피소드: ${row[5]}`;
        }).join('\n');

        document.getElementById('content').innerText = output;

      } catch (err) {
        document.getElementById('content').innerText = `오류 발생: ${err.message}`;
      }
    }

    // 데이터를 가져오는 함수 호출
    fetchData();
  </script>
</body>
</html>