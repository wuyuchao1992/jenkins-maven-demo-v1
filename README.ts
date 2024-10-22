import org.json.JSONObject;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestTemplate;

public class TokenExtractor {

    public static String extractTokenFromResponse(ResponseEntity<String> response) {
        // 获取响应体的内容
        String responseBody = response.getBody();

        // 使用 JSONObject 解析响应体
        JSONObject jsonResponse = new JSONObject(responseBody);

        // 提取 data.token 字段
        String token = jsonResponse.getJSONObject("data").getString("token");

        // 返回 token
        return token;
    }

    public static void main(String[] args) {
        // 假设我们要发送登录请求并获取 token
        RestTemplate restTemplate = new RestTemplate();
        String loginUrl = "https://example.com/api/login";
        
        // 模拟发送 POST 请求并获取响应 (此处省略了请求的具体细节)
        ResponseEntity<String> response = restTemplate.getForEntity(loginUrl, String.class);

        // 从响应中提取 token
        String token = extractTokenFromResponse(response);

        // 输出提取到的 token
        System.out.println("Token: " + token);
    }
}