package com.core.backend.user;

import com.core.backend.profile.Profile;
import com.core.backend.profile.ProfileRepository;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/secured/user")
public class UserController {

    private final UserService userService;
    private final ProfileRepository profileRepository;

    @GetMapping
    public ResponseEntity<String> test(@RequestParam String id) {
        return ResponseEntity.ok(id);
    }

    @GetMapping("/me")
    public ResponseEntity<UserResponse> getMe() {
        User user = userService.getMe();
        Profile profile = profileRepository
                .findByUserId(user.getId())
                .orElseThrow(() -> new RuntimeException("Profile not found"));

        UserResponse response = new UserResponse(user.getId(), user.getEmail(), user.getRole(), profile);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/friend")
    public ResponseEntity<List<UserResponse>> findAllUserNotFriend() {
        List<UserResponse> users = userService.findAllUserNotFriend();
        return ResponseEntity.ok(users);
    }

    @GetMapping("/available")
    public ResponseEntity<List<UserResponse>> getAvailableUserForProject(@RequestParam String userId, @RequestParam String projectId) {
        List<UserResponse> users = userService.getAvailableUserForProject(userId, projectId);
        return ResponseEntity.ok(users);
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
