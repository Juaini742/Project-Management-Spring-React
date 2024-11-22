package com.core.backend.friend;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/secured/friend")
@Validated
public class FriendController {

    private final FriendService friendService;

    @PostMapping
    public ResponseEntity<String> create(@Valid @RequestBody FriendDTO friendDTO) {
        friendService.create(friendDTO);
        return ResponseEntity.ok("Friend created successfully");
    }

    @GetMapping("/accepted")
    public ResponseEntity<FriendResponse> get() {
        FriendResponse friends = friendService.getFriend();
        return ResponseEntity.ok(friends);
    }

    @GetMapping("/pending")
    public ResponseEntity<FriendResponse> getFriendStatus() {
        FriendResponse friends = friendService.getPendingFriend();
        return ResponseEntity.ok(friends);
    }

    @PutMapping("/status")
    public ResponseEntity<String> updateStatus(@RequestBody FriendDTO friendDTO) {
        if ("accepted".equalsIgnoreCase(friendDTO.getStatus())) {
            friendService.accept(friendDTO.getEmail());
        } else if ("rejected".equalsIgnoreCase(friendDTO.getStatus())) {
            friendService.rejected(friendDTO.getEmail());
        } else {
            throw new RuntimeException("Invalid status");
        }
        return ResponseEntity.ok("Friend status successfully");
    }

    @DeleteMapping("{id}")
    public ResponseEntity<String> delete(@PathVariable String id) {
        friendService.deleteFriendById(id);
        return ResponseEntity.ok("Friend deleted successfully");
    }
}
