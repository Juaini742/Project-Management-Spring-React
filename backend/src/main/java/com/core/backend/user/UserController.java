package com.core.backend.user;

import com.core.backend.auth.AuthService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.http.server.ServletServerHttpRequest;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;
import java.util.Optional;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/secured/user")
public class UserController {

    private final UserService userService;

    @GetMapping
    public ResponseEntity<String> test() {
        return ResponseEntity.ok("ok");
    }

    @GetMapping("/me")
    public ResponseEntity<UserResponse> getMe() {
        User user = userService.getMe();
        UserResponse response = new UserResponse(user.getId(), user.getEmail(), user.getRole());
        return ResponseEntity.ok(response);
    }

    @PostMapping("/logout")
    public ResponseEntity<String> logout(HttpServletRequest request, HttpServletResponse resp) {
        Cookie[] cookies = request.getCookies();

        if (cookies != null) {
            Optional<Cookie> cookie = Arrays
                    .stream(cookies)
                    .filter(c -> "token".equals(c.getName())).findFirst();

            if (cookie.isPresent()) {
                Cookie token = cookie.get();
                token.setHttpOnly(true);
                token.setSecure(true);
                token.setPath("/");
                token.setMaxAge(0);
                resp.addCookie(token);
                SecurityContextHolder.clearContext();
                return ResponseEntity.ok("Logout successfully");
            }
        }
        return null;
    }
}
