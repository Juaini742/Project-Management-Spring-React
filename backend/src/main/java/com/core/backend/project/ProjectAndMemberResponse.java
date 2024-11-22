package com.core.backend.project;

import com.core.backend.projectMembe.ProjectMember;


public record ProjectAndMemberResponse(String id,
                                       String name,
                                       String description,
                                       ProjectMember.Member_role role) { }
