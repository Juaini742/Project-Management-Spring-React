package product_management.productAttributeValue;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@Entity
@Table(name = "product_attribute_values")
public class ProductAttributeValue {

    public ProductAttributeValue(Integer attributeId, String value) {
        this.attributeId = attributeId;
        this.value = value;
    }

    public ProductAttributeValue() {
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "attribute_id", nullable = false)
    private Integer attributeId;

    @Column(nullable = false)
    private String value;

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now();
}
