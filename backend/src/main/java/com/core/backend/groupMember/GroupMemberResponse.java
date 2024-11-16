package com.core.backend.groupMember;

import java.sql.Timestamp;

public record GroupMemberResponse(String id, String groupName, String userEmail, String roleGroup, Timestamp joinedAt) {

}
