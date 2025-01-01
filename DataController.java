import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;
import java.util.Map;

@Controller
public class DataController {

    @Autowired
    private DataService dataService;

    @GetMapping("/")
    public String home() {
        return "index"; // 메인 페이지로 이동
    }

    @PostMapping("/search")
    public String search(@RequestParam("birthYear") String birthYear, 
                         @RequestParam("birthPlace") String birthPlace, Model model) {
        List<Map<String, Object>> data = dataService.getData(birthYear, birthPlace);
        model.addAttribute("data", data);
        return "result"; // 결과 페이지로 이동
    }
}
