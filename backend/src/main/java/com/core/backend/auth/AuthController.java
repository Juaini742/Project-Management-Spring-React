package com.core.backend.auth;


import com.core.backend.user.UserDTO;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/public/auth")
@Validated
@Transactional
public class AuthController {

    private final AuthService authService;

    @GetMapping
    public ResponseEntity<String> hello() {
        return ResponseEntity.ok("Hello from secured endpoint");
    }

    @PostMapping("/register")
    public ResponseEntity<String> register(@Valid @RequestBody UserDTO userDTO) {
        authService.register(userDTO);
        return ResponseEntity.ok("User registered successfully");
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(HttpServletResponse resp, @Valid @RequestBody UserDTO userDTO) {
        String token = authService.authenticate(userDTO);
        Cookie cookie = new Cookie("token", token);
        cookie.setHttpOnly(true);
        cookie.setSecure(true);
        cookie.setMaxAge(3600);
        cookie.setPath("/");
        resp.addCookie(cookie);

        return ResponseEntity.ok("User login successfully");
    }
}
