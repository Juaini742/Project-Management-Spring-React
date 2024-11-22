package product_management.productCategory;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@Entity
@Table(name = "product_categories")
public class ProductCategory {

    public ProductCategory(String name, String slug, Integer parentCategoryId, String description, Boolean isActive, LocalDateTime createdAt, LocalDateTime updatedAt) {
        this.name = name;
        this.slug = slug;
        this.parentCategoryId = parentCategoryId;
        this.description = description;
        this.isActive = isActive;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    public ProductCategory() {

    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false)
    private String name;

    @Column(unique = true, nullable = false)
    private String slug;

    // Self-referencing relation ignored, just as a plain property
    @Column(name = "parent_category_id")
    private Integer parentCategoryId;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(name = "is_active", nullable = false)
    private Boolean isActive = true;

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    @Column(name = "updated_at")
    private LocalDateTime updatedAt = LocalDateTime.now();
}
