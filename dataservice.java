dataservice.java


@Service
public class DataService {

    // Google Sheets API를 사용하여 데이터 가져오는 로직
    public List<Map<String, Object>> getData(String birthYear, String birthPlace) {
        List<Map<String, Object>> data = new ArrayList<>();
        // ... 구글 시트 API를 사용하여 데이터를 가져오는 로직 추가
        return data; // 가져온 데이터 반환
    }
}