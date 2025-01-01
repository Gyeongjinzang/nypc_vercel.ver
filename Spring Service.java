import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.google.api.services.sheets.v4.Sheets;
import com.google.api.services.sheets.v4.model.ValueRange;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
public class DataService {

    @Autowired
    private Sheets sheetsService; // Google Sheets API 클라이언트 주입
    private static final String SPREADSHEET_ID = "1d5q0Kltz3AopUa5LROw6CE9iIXM7RTaNl-Cv_owFtlE"; // 구글 스프레드시트 ID

    // Google Sheets API를 사용하여 데이터 가져오는 로직
    public List<Map<String, Object>> getData(String birthYear, String birthPlace) {
        List<Map<String, Object>> result = new ArrayList<>();
        try {
            // 특정 범위의 데이터를 요청
            ValueRange response = sheetsService.spreadsheets().values()
                    .get(SPREADSHEET_ID, "Sheet1!A2:z1000").execute();
            List<List<Object>> values = response.getValues();

            // 가져온 데이터를 Java 구조로 변환
if (values != null && !values.isEmpty()) {
    for (List<Object> row : values) {
        // 각 행(row)에서 데이터 추출
        if (row.size() >= 7) { // 행이 최소 7개 열을 가지고 있는지 확인
            String year = (String) row.get(0);
            String place = (String) row.get(1);
            String placeName = (String) row.get(2);
            String address = (String) row.get(3);
            String photoUrl = (String) row.get(4);
            String episode = (String) row.get(5);
            String link = (String) row.get(6);

            // 가져온 데이터를 로그에 출력하여 확인
            System.out.printf("Year: %s, Place: %s, Name: %s, Address: %s, Photo: %s, Episode: %s, Link: %s%n", 
                year, place, placeName, address, photoUrl, episode, link);

            // 필터링 조건 확인
            if (year.equals(birthYear) && place.equals(birthPlace)) {
                Map<String, Object> placeData = Map.of(
                    "year", year,
                    "place", place,
                    "placeName", placeName,
                    "address", address,
                    "photoUrl", photoUrl,
                    "episode", episode,
                    "link", link
                );
                result.add(placeData);
            }
        }
    }
}

        } catch (Exception e) {
            e.printStackTrace();
        }
        return result;
    }
}
