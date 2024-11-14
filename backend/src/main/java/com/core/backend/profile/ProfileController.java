package com.core.backend.profile;


import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/secured/profile")
@Validated
public class ProfileController {

    private final ProfileService profileService;

    @PostMapping
    public ResponseEntity<String> createProfile(@Valid @RequestBody ProfileDTO profileDTO) {
        profileService.createProfile(profileDTO);
        return ResponseEntity.ok("Profile created successfully");
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProfileResponse> getProfileById(@PathVariable String id) {
        Profile profile = profileService.getProfileUser(id);
        ProfileResponse response = ProfileResponse.fromProfile(profile);
        return ResponseEntity.ok(response);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ProfileResponse> updateProfile(@PathVariable String id, @Valid @RequestBody ProfileUpdateDTO profileUpdateDTO) {
        Profile profile = profileService.update(id, profileUpdateDTO);
        ProfileResponse response = ProfileResponse.fromProfile(profile);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteProfile(@PathVariable String id) {
        profileService.delete(id);
        return ResponseEntity.ok("Profile deleted successfully");
    }
}
