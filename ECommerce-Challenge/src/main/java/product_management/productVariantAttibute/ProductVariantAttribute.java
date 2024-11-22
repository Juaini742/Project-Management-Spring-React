package product_management.productVariantAttibute;

import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@Entity
@Table(name = "product_variant_attributes")
public class ProductVariantAttribute {

    public ProductVariantAttribute(Integer variantId, Integer attributeValueId) {
        this.variantId = variantId;
        this.attributeValueId = attributeValueId;
    }

    public ProductVariantAttribute() {
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "variant_id", nullable = false)
    private Integer variantId;

    @Column(name = "attribute_value_id", nullable = false)
    private Integer attributeValueId;
}
